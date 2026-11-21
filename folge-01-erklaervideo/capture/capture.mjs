import { readFile, mkdtemp, mkdir, rename, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

const here = path.dirname(fileURLToPath(import.meta.url));
const { values } = parseArgs({ options: {
  config: { type: 'string', default: path.join(here, 'shots.json') },
  output: { type: 'string', default: path.resolve(here, '../screenshots') },
  shot: { type: 'string', multiple: true }, list: { type: 'boolean' }, help: { type: 'boolean' }
} });
if (values.help) {
  console.log('node capture.mjs [--list] [--shot ID ...] [--config FILE] [--output DIRECTORY]\nEnvironment: AKRIBOS_URL, AKRIBOS_USERNAME, AKRIBOS_PASSWORD');
  process.exit(0);
}

function readerURL(origin, shot) {
  const query = new URLSearchParams({ layout: shot.resources.length === 1 ? 'single' : 'columns-' + shot.resources.length, focus: '1' });
  for (const [index, id] of shot.resources.entries()) {
    const tab = (index + 1) + '.1';
    query.append('tab', [tab, id, 'A', shot.reference].join(':'));
    query.append('active', tab);
  }
  return origin + '/' + encodeURIComponent(shot.reference).replaceAll('%2C', ',') + '?' + query;
}

const settle = page => page.evaluate(async () => {
  await document.fonts.ready;
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
});

async function scrollTo(page, spec) {
  const target = spec.heading
    ? page.getByRole('heading', { name: spec.heading, exact: true }).first()
    : page.locator(spec.selector).first();
  await target.evaluate((el, { block = 'start', offset = 0 }) => {
    el.scrollIntoView({ block, behavior: 'instant' });
    let p = el.parentElement;
    while (p && !(p.scrollHeight > p.clientHeight && /auto|scroll/.test(getComputedStyle(p).overflowY))) p = p.parentElement;
    (p || document.scrollingElement).scrollBy({ top: -offset, behavior: 'instant' });
  }, spec);
}

async function clipFor(page, spec) {
  if (!spec || !spec.from) return spec;
  const anchor = page.locator(spec.from).first();
  const rect = await anchor.boundingBox();
  if (!rect) throw new Error('Crop anchor is hidden: ' + spec.from);
  let bottom = rect.y + Math.min(rect.height, spec.maxHeight ?? rect.height);
  if (spec.throughElementText) {
    const end = await anchor.getByText(spec.throughElementText, { exact: true }).boundingBox();
    if (!end) throw new Error('Crop end is hidden: ' + spec.throughElementText);
    bottom = Math.min(rect.y + rect.height, end.y + end.height + (spec.paddingBottom ?? 0));
  } else if (spec.throughText) {
    bottom = await page.locator(spec.textContainer).first().evaluate((el, text) => {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        const index = walker.currentNode.textContent.indexOf(text);
        if (index < 0) continue;
        const range = new Range();
        range.setStart(walker.currentNode, index);
        range.setEnd(walker.currentNode, index + text.length);
        return range.getBoundingClientRect().bottom;
      }
      throw new Error('End of definition is missing: ' + text);
    }, spec.throughText) + (spec.paddingBottom ?? 0);
  }
  const pad = spec.paddingX ?? 0;
  const top = spec.paddingTop ?? 0;
  return {
    x: pad < 0 ? Math.ceil(rect.x - pad) : Math.floor(rect.x - pad),
    y: Math.floor(rect.y - top),
    width: (spec.throughElementText ? Math.floor : spec.throughText ? Math.round : Math.ceil)(rect.width + 2 * pad),
    height: (spec.throughText ? Math.round : Math.floor)(bottom - rect.y + top)
  };
}

async function login(browser, origin) {
  const context = await browser.newContext({ locale: 'de-DE' });
  try {
    const page = await context.newPage();
    await page.goto(origin + '/login');
    if (new URL(page.url()).origin !== origin) throw new Error('Login changed origin.');
    await page.getByLabel('E-Mail-Adresse').fill(process.env.AKRIBOS_USERNAME);
    await page.getByRole('button', { name: 'Weiter', exact: true }).click();
    await page.locator('input[type=password]').waitFor();
    if (new URL(page.url()).origin !== origin) throw new Error('Password page changed origin.');
    await page.locator('input[type=password]').fill(process.env.AKRIBOS_PASSWORD);
    await page.getByRole('button', { name: 'Anmelden', exact: true }).click();
    await page.waitForURL(url => url.origin === origin && url.pathname !== '/login');
    return await context.storageState();
  } finally {
    await context.close();
  }
}

async function prepare(page, shot, origin) {
  if (shot.collection) {
    await page.goto(origin + '/lists');
    const links = page.locator('a[href^="/lists/"]').filter({ has: page.getByText(shot.collection, { exact: true }) });
    await links.first().waitFor();
    const paths = await links.evaluateAll(anchors => anchors.map(a => a.pathname));
    let found = false;
    for (const path of paths) {
      await page.goto(origin + path);
      if (paths.length === 1 || await page.locator('.comment-body').getByText(shot.question, { exact: true }).count()) {
        found = true;
        break;
      }
    }
    if (!found) throw new Error('The example discussion is missing from collections named ' + shot.collection);
  } else {
    await page.goto(readerURL(origin, shot));
    await page.locator('.reader-tile').first().waitFor();
  }
  await settle(page);
  // The reader restores its URL workspace and scrolls after hydration.
  await page.waitForTimeout(500);
  const input = page.getByRole('searchbox', { name: /Bibelstelle oder Suche in/ }).first();
  const verse = shot.verseKey ? page.locator('.flow-column[data-resource-id="' + shot.resources[0] + '"] [data-verse-key="' + shot.verseKey + '"]').first() : undefined;
  if (['input', 'resource', 'word'].includes(shot.action)) {
    // Fresh browser contexts can initially show the chapter start. Commit the actual
    // verse through the UI before capturing linked tabs or opening the word study.
    await input.fill(shot.referenceInput);
    await input.press('Enter');
    const selected = '[data-verse-key="' + shot.referenceKey + '"].highlighted';
    await page.locator(selected).first().waitFor();
    await input.blur();
    await page.waitForTimeout(400);
  }
  switch (shot.action) {
    case 'resource': {
      const tile = page.locator('.reader-tile').last();
      if (shot.ready) await page.locator(shot.ready).first().waitFor();
      if (shot.readyText) await tile.getByText(shot.readyText, { exact: false }).first().waitFor();
      if (await tile.getByText('Keine Einträge', { exact: false }).count()) throw new Error('Missing resource data');
      break;
    }
    case 'input':
      await input.fill(shot.value);
      break;
    case 'word':
      await page.locator(shot.word).first().click();
      await page.locator('.definition-section').first().waitFor();
      await page.getByRole('heading', { name: 'Fundstellen', exact: true }).waitFor({ state: 'attached' });
      break;
    case 'search': {
      await input.fill(shot.value);
      await input.press('Enter');
      const results = page.getByLabel(/Suchergebnisse in Elberfelder/);
      if (shot.bookButton) {
        const button = results.locator('button[aria-label^="' + shot.bookButton + '"]');
        await button.locator('.bar').click();
        await results.getByRole('button', { name: 'Buchfilter aufheben' }).waitFor();
      }
      await results.locator('header').getByText(shot.resultCount + ' Treffer', { exact: true }).waitFor();
      break;
    }
    case 'highlight': {
      await scrollTo(page, shot.scroll);
      await page.waitForTimeout(250);
      const number = verse.locator('a.verse-number');
      await number.click();
      const swatch = page.locator('.swatches .swatch').first();
      await swatch.waitFor();
      if (await swatch.getAttribute('aria-pressed') !== 'true') {
        throw new Error('The capture account must already have this verse marked with the first (yellow) swatch.');
      }
      if (shot.openPalette) {
        // The original before-state used the same account. Replay the native optimistic UI
        // locally; the transient removal is never sent to the server.
        await page.route('**/*', route => {
          const request = route.request();
          if (['GET', 'HEAD', 'OPTIONS'].includes(request.method())) return route.continue();
          if (request.method() === 'POST' && new URL(request.url()).search === '?/removeHighlight') {
            return route.fulfill({ contentType: 'application/json',
              body: JSON.stringify({ type: 'success', status: 200, data: '[{}]' }) });
          }
          return route.abort();
        });
        await swatch.click();
        await swatch.waitFor({ state: 'hidden' });
        await number.click();
        await swatch.waitFor();
        if (await swatch.getAttribute('aria-pressed') !== 'false') throw new Error('Palette still shows an active color.');
      } else {
        await page.keyboard.press('Escape');
        await swatch.waitFor({ state: 'hidden' });
      }
      break;
    }
    case 'note': {
      await verse.locator('a.verse-number').click();
      await page.getByRole('menuitem', { name: /Notizen zu .* öffnen/ }).click();
      await page.getByRole('dialog').getByRole('button', { name: new RegExp(escapeRegExp(shot.document) + ' Notiz') }).click();
      const side = page.getByTestId('reader-notes-sidecar');
      await side.getByText(shot.ending, { exact: true }).waitFor();
      const handle = await page.getByTestId('reader-notes-sidecar-resize').boundingBox();
      if (!handle) throw new Error('Note resize handle missing.');
      const x = handle.x + handle.width / 2, y = handle.y + handle.height / 2;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - shot.widenBy, y, { steps: 8 });
      await page.mouse.up();
      break;
    }
    case 'collection':
      await page.getByRole('link', { name: 'Johannes 15,9', exact: true }).first().waitFor();
      break;
    case 'discussion': {
      const card = page.locator('li[id^="note-"]').filter({ has: page.getByRole('link', { name: shot.verse, exact: true }) });
      for (const message of [shot.question, shot.answer]) await card.locator('.comment-body').getByText(message, { exact: true }).waitFor();
      await card.evaluate((el, offset) => window.scrollBy({ top: el.getBoundingClientRect().top - offset, behavior: 'instant' }), shot.offset);
      break;
    }
    default: throw new Error('Unknown action: ' + shot.action);
  }
  if (shot.scroll && shot.action !== 'highlight') {
    for (const position of [shot.scroll].flat()) {
      await scrollTo(page, position);
      await settle(page);
    }
  }
}
function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function main() {
  const config = JSON.parse(await readFile(values.config, 'utf8'));
  const shots = config.shots.map(spec => ({ ...config.defaults, ...spec }));
  for (const shot of shots) {
    if (path.basename(shot.file) !== shot.file || !shot.file.endsWith('.png')) throw new Error('Expected PNG basename: ' + shot.file);
    if (!config.profiles[shot.profile]) throw new Error('Unknown profile: ' + shot.profile);
  }
  if (new Set(shots.map(s => s.file)).size !== shots.length || new Set(shots.map(s => s.id)).size !== shots.length) throw new Error('Duplicate shot id or filename');
  if (values.list) {
    for (const shot of shots) console.log(shot.id.padEnd(18), shot.file);
    return;
  }
  const ids = values.shot ?? shots.map(s => s.id);
  for (const id of ids) if (!shots.some(s => s.id === id)) throw new Error('Unknown shot: ' + id);
  const selected = shots.filter(s => ids.includes(s.id));
  const privateShots = selected.some(s => s.private);
  const required = privateShots ? ['AKRIBOS_URL', 'AKRIBOS_USERNAME', 'AKRIBOS_PASSWORD'] : ['AKRIBOS_URL'];
  for (const key of required) if (!process.env[key]) throw new Error('Missing ' + key);
  const url = new URL(process.env.AKRIBOS_URL);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('AKRIBOS_URL must be the origin, e.g. http://localhost:5173');
  const origin = url.origin;
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();
  try {
    const state = privateShots ? await login(browser, origin) : undefined;
    await mkdir(values.output, { recursive: true });
    const stage = await mkdtemp(path.join(values.output, '.capture-'));
    try {
      for (const shot of selected) {
        console.log(shot.id, '→', shot.file);
        const { width, height, scale, readerFont } = config.profiles[shot.profile];
        const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: scale,
          locale: 'de-DE', colorScheme: 'light', serviceWorkers: 'block', storageState: shot.private ? state : undefined });
        try {
          await context.addCookies(Object.entries({ 'tour-guest-done': '1', 'reader-font-scale': String(readerFont), theme: 'light' })
            .map(([name, value]) => ({ name, value, url: origin })));
          const page = await context.newPage();
          page.setDefaultTimeout(12000);
          await prepare(page, shot, origin);
          await page.mouse.move(1, height - 2);
          await settle(page);
          // Let the reader's navigation, menu and panel transitions reach their end positions.
          await page.waitForTimeout(350);
          const clip = await clipFor(page, shot.crop);
          // Playwright clips use page coordinates, DOM rectangles use viewport coordinates.
          if (clip && shot.crop.from) {
            const scroll = await page.evaluate(() => ({ x: window.scrollX, y: window.scrollY }));
            clip.x += scroll.x;
            clip.y += scroll.y;
          }
          await page.screenshot({ path: path.join(stage, shot.file), clip, animations: 'disabled', caret: 'hide' });
        } finally { await context.close(); }
      }
      for (const shot of selected) await rename(path.join(stage, shot.file), path.join(values.output, shot.file));
    } finally { await rm(stage, { recursive: true, force: true }); }
  } finally { await browser.close(); }
}

main().catch(error => { console.error(error.message); process.exitCode = 1; });
