// Browser capture shared by the tutorials. Each episode supplies its UI actions.
import { readFile, writeFile, mkdtemp, mkdir, rename, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { parseArgs } from 'node:util';

const require = createRequire(new URL('../folge-01-erklaervideo/capture/package.json', import.meta.url));
export async function captureEpisode(moduleURL, options, record) {
  const episode = path.dirname(path.dirname(fileURLToPath(moduleURL)));
  const script = path.join(episode, 'episode.json');
  const spec = JSON.parse(await readFile(script, 'utf8'));
  const { values } = parseArgs({ options: {
    output: { type: 'string' }, shot: { type: 'string', multiple: true },
    'update-framing': { type: 'boolean' }, list: { type: 'boolean' }
  } });
  if (values.list) {
    spec.scenes.forEach((scene, i) => console.log(i+1, scene.title, scene.image));
    return;
  }
  const selected = new Set((values.shot ?? spec.scenes.map((_, i) => String(i+1))).map(Number));
  if ([...selected].some(n => !Number.isInteger(n) || n < 1 || n > spec.scenes.length))
    throw new Error('Unknown --shot number; see --list.');
  const base = new URL(process.env.AKRIBOS_URL || options.url || '');
  if (!['https:', 'http:'].includes(base.protocol) || base.username || base.password || base.pathname !== '/' || base.search || base.hash)
    throw new Error('AKRIBOS_URL must contain the origin only.');
  if (options.login && (!process.env.AKRIBOS_USERNAME || !process.env.AKRIBOS_PASSWORD))
    throw new Error('Set AKRIBOS_USERNAME and AKRIBOS_PASSWORD for the prepared demo account.');
  if (values.output && values['update-framing'])
    throw new Error('Use --update-framing with the episode screenshot directory.');
  const output = path.resolve(values.output ?? path.join(episode,'screenshots'));
  const { chromium } = require('playwright');
  const browser = await chromium.launch();
  await mkdir(output, { recursive: true });
  const stage = await mkdtemp(path.join(output,'.capture-'));
  const frames = new Map();
  const viewport = { width: 1280, height: 800 }, scale = 2;
  try {
    const context = await browser.newContext({ viewport, deviceScaleFactor:scale, colorScheme:'light', locale:'de-DE', timezoneId:'Europe/Berlin' });
    const origin = base.origin;
    await context.addCookies(Object.entries({'tour-guest-done':'1','reader-font-scale':'115','theme':'light'})
      .map(([name,value]) => ({name,value,url:origin})));
    const page = await context.newPage();
    page.setDefaultTimeout(15000);
    async function go(relative) {
      const url = new URL(relative, origin);
      if (url.origin !== origin) throw new Error('Expected an Akribos URL on the configured origin.');
      await page.goto(url.href, {waitUntil:'domcontentloaded'});
    }
    if (options.login) {
      await go('/login');
      if (new URL(page.url()).origin !== origin) throw new Error('Login origin changed.');
      await page.getByLabel('E-Mail-Adresse').fill(process.env.AKRIBOS_USERNAME);
      await page.getByRole('button', {name:'Weiter',exact:true}).click();
      await page.locator('input[type=password]').waitFor();
      if (new URL(page.url()).origin !== origin) throw new Error('Login origin changed.');
      await page.locator('input[type=password]').fill(process.env.AKRIBOS_PASSWORD);
      await page.getByRole('button', {name:'Anmelden',exact:true}).click();
      await page.waitForURL(url => url.origin === origin && url.pathname !== '/login');
    }
    async function snap(n, anchor, { size, offset=[0,0], point, scroll=true, keepHover=false }={}) {
      if (!selected.has(n)) return;
      const viewport = page.viewportSize();
      const anchors = Array.isArray(anchor) ? anchor : [anchor];
      if (scroll) await anchors[0].scrollIntoViewIfNeeded();
      await page.evaluate(async () => { await document.fonts.ready; await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); });
      if (!keepHover) await page.mouse.move(1,viewport.height-2);
      await page.waitForTimeout(300);
      const boxes = await Promise.all(anchors.map(a=>a.boundingBox()));
      if (boxes.some(r=>!r)) throw new Error('Missing focal element for shot '+n);
      const left = Math.min(...boxes.map(r=>r.x)), top = Math.min(...boxes.map(r=>r.y));
      const right = Math.max(...boxes.map(r=>r.x+r.width)), bottom = Math.max(...boxes.map(r=>r.y+r.height));
      const [width,height] = size ?? [Math.min(viewport.width,right-left+48),Math.min(viewport.height,bottom-top+48)];
      const x = Math.min(viewport.width-width,Math.max(0,(left+right-width)/2 +offset[0]));
      const y = Math.min(viewport.height-height,Math.max(0,(top+bottom-height)/2 +offset[1]));
      const frame = {focus:[x,y,width,height].map(v=>Math.round(v*scale))};
      if (point) {
        const r=await point.boundingBox();
        if (!r) throw new Error('Missing pointer target for shot '+n);
        const px=Math.round((r.x+r.width/2)*scale),py=Math.round((r.y+r.height/2)*scale);
        if(px<frame.focus[0] || px>frame.focus[0]+frame.focus[2] || py<frame.focus[1] || py>frame.focus[1]+frame.focus[3])
          throw new Error('Pointer outside focal rectangle in shot '+n);
        frame.point=[px,py];
      }
      const filename=path.basename(spec.scenes[n-1].image);
      await page.screenshot({path:path.join(stage,filename),animations:'disabled',caret:'hide'});
      frames.set(n,{filename,frame});
    }
    await record({page,go,snap,origin,episode,selected});
    if(frames.size!==selected.size) throw new Error('Some selected scenes were not captured.');
    for(const [n,{filename,frame}] of frames) {
      await rename(path.join(stage,filename),path.join(output,filename));
      if (values['update-framing']) {
        delete spec.scenes[n-1].point;
        Object.assign(spec.scenes[n-1],frame);
      }
      console.log(n, filename, JSON.stringify(frame));
    }
    if(values['update-framing']) await writeFile(script,JSON.stringify(spec,null,2)+'\n');
  } finally {
    await browser.close();
    await rm(stage,{recursive:true,force:true});
  }
}
