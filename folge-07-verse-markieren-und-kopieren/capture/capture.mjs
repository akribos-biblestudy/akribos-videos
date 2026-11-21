import { readFile } from 'node:fs/promises';
import { captureEpisode } from '../../scripts/capture-browser.mjs';
import { openVerse, openVerseMenu } from '../../scripts/capture-study.mjs';

const target = JSON.parse(await readFile(new URL('targets.json', import.meta.url), 'utf8'));
await captureEpisode(import.meta.url, { login:true }, async capture => {
  const { page, go, snap } = capture;
  await page.setViewportSize({ width: 880, height: 760 });
  const { verse, number } = await openVerse(capture, target);
  let menu = await openVerseMenu(page, number);
  const swatch = menu.locator('.swatch[aria-pressed="true"]').first();
  await swatch.waitFor();
  // Replay the before-state in this browser only. The prepared mark stays in the demo account.
  const removeRequest = url => url.search === '?/removeHighlight';
  await page.route(removeRequest, route => route.fulfill({
    contentType:'application/json', body:JSON.stringify({type:'success',status:200,data:'[{}]'})
  }));
  await Promise.all([page.waitForResponse(response => removeRequest(new URL(response.url()))), swatch.click()]);
  await menu.waitFor({state:'hidden'});
  await snap(1, number, { size: [645, 300], point: number });
  menu = await openVerseMenu(page, number);
  const copy = menu.getByRole('menuitem', { name: 'Vers kopieren' });
  const link = menu.getByRole('menuitem', { name: 'Link kopieren' });
  await copy.focus();
  await snap(2, copy, { size: [400, 220], point: copy });
  await link.focus();
  await snap(3, link, { size: [410, 210], point: link });
  await page.unroute(removeRequest);
  await openVerse(capture, target);
  menu = await openVerseMenu(page, number);
  const markedColor = await menu.locator('.swatch[aria-pressed="true"]').first().getAttribute('aria-label');
  await page.keyboard.press('Escape');
  await snap(4, verse, { size: [845, 360] });
  await go('/account?tab=appearance');
  // Each link belongs to its own palette row. The configured verse must be in the selected color.
  const links = page.getByRole('link', { name: 'Verse anzeigen' });
  await links.first().waitFor();
  const urls = await links.evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
  let reference;
  for (const url of urls) {
    await go(url);
    const candidate = page.getByText(target.verseName, { exact: true });
    if (await candidate.count()) { reference = candidate; break; }
  }
  if (!reference) throw new Error('Missing verse in highlight lists: ' + target.verseName + ' (' + markedColor + ')');
  await snap(5, reference.locator('..'), { size: [760, 365], point: reference });
});
