import { readFile } from 'node:fs/promises';
import { captureEpisode } from '../../scripts/capture-browser.mjs';
import { captureAccountMenu, labelPoint, openVerse, openVerseMenu } from '../../scripts/capture-study.mjs';

const target = JSON.parse(await readFile(new URL('targets.json', import.meta.url), 'utf8'));
await captureEpisode(import.meta.url, { login: true }, async capture => {
  const { page, snap } = capture;
  await page.setViewportSize({ width: 880, height: 760 });
  const { verse, number } = await openVerse(capture, target);
  let menu = await openVerseMenu(page, number);
  const swatch = menu.locator('.swatch[aria-checked="true"]').first();
  const id = await swatch.getAttribute('aria-label');
  // Recreate the unmarked before-state locally. Reloading restores the prepared highlight.
  const remove = url => url.search === '?/removeHighlight';
  await page.route(remove, route => route.fulfill({
    contentType:'application/json', body:JSON.stringify({type:'success',status:200,data:'[{}]'})
  }));
  await Promise.all([page.waitForResponse(r => remove(new URL(r.url()))), swatch.click()]);
  await menu.waitFor({state:'hidden'});
  await snap(1, number, { size: [640, 305], point: number });
  menu = await openVerseMenu(page, number);
  const copy = menu.getByRole('menuitem', { name: 'Vers kopieren' });
  const link = menu.getByRole('menuitem', { name: 'Link kopieren' });
  await copy.focus();
  await snap(2, menu, { size: [390, 220], point: labelPoint(copy) });
  await link.focus();
  await snap(3, menu, { size: [400, 210], point: labelPoint(link) });
  const color = menu.getByLabel(id, {exact: true});
  await color.focus();
  await snap(4, menu, {size:[385,205],point:color});
  await page.unroute(remove);
  await openVerse(capture, target);
  await snap(5, verse, { size: [830, 340] });
  await captureAccountMenu(capture,{profileShot:6,menuShot:7,destination:'/account'});
  const appearance = page.getByRole('button',{name:'Darstellung',exact:true});
  await snap(8, appearance, {size:[570,285],point:appearance});
  await appearance.click();
  const colorInputs = page.locator('form[action$="renameHighlightStyle"] input[name=name]');
  await colorInputs.first().waitFor();
  const i = (await colorInputs.evaluateAll(nodes => nodes.map(node => node.value))).indexOf(target.colorName);
  if (i < 0) throw new Error('Missing prepared color '+target.colorName);
  const row = colorInputs.nth(i).locator('xpath=ancestor::li[1]');
  const save = row.getByRole('button',{name:'Speichern'});
  await snap(9,row,{size:[690,210],offset:[0,-13],point:save});
  const create = page.locator('form[action$="addHighlightStyle"]');
  await create.locator('[name=color]').fill(target.extraColor);
  await create.locator('[name=name]').fill(target.extraColorName);
  await snap(10,create,{size:[680,125],offset:[0,-17],point:create.getByRole('button')});
  const show = row.getByRole('link',{name:'Verse anzeigen'});
  await snap(11,row,{size:[680,195],point:show});
  await show.click();
  const ref = page.getByText(target.verseName,{exact:true}).first();
  await snap(12,ref.locator('..'),{size:[730,325],point:ref});
});
