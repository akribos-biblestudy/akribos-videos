import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { captureEpisode } from '../../scripts/capture-browser.mjs';

const config = JSON.parse(await readFile(new URL('targets.json', import.meta.url)));
await captureEpisode(import.meta.url, {login:true}, async ({page,go,snap}) => {
  await page.setViewportSize({width:840,height:800});
  await go('/notes');
  const start = page.getByRole('link',{name:'Importieren',exact:true});
  await snap(1, [page.getByRole('heading',{name:'Notizen',exact:true}),start], {size:[840,270],point:start});
  await start.click();
  await page.locator('input[type=file]').setInputFiles(fileURLToPath(new URL(config.importFile, import.meta.url)));
  const preview = page.getByRole('button',{name:'Importvorschau erstellen'});
  await snap(2, [page.locator('input[type=file]'),preview], {size:[840,250],point:preview});
  await preview.click();
  const confirm = page.getByRole('button',{name:'Als privates Dokument importieren'});
  await snap(3, confirm, {size:[840,220],offset:[-120,-35],point:confirm});

  await page.setViewportSize({width:950,height:850});
  await go(config.notePath);
  const editor = page.locator('.ProseMirror');
  await editor.waitFor();
  for (const [i,section] of config.sections.entries()) {
    const heading = editor.getByRole('heading',{name:section.heading,exact:true});
    const last = editor.getByText(section.lastLine,{exact:false}).last();
    await heading.evaluate(node=>node.scrollIntoView({block:'center',behavior:'instant'}));
    // Each selected line is decorated by the real editor, so its destination can be verified.
    const links = section.references.map(reference=>editor.locator(`[data-reference="${reference}"]`).first());
    for (const link of links) await link.waitFor({state:'attached'});
    await snap(4+i, [heading,last], {size:section.frame,offset:[-135,0],scroll:false});
  }
  const verse = editor.locator('[data-reference="Joh3,16"]').first();
  await verse.evaluate(node=>node.scrollIntoView({block:'center',behavior:'instant'}));
  await verse.hover();
  const open = page.getByText('Bibelstelle öffnen',{exact:true});
  await open.waitFor();
  await snap(8, page.locator('.verse-hover-popup.interactive'), {size:[405,265],point:open,scroll:false,keepHover:true});
  await go(config.notePath);
  const menu = page.locator('details.export-menu');
  await menu.locator('summary').click();
  await snap(9,menu.locator('div'),{size:[355,205],point:menu.getByText('Word (.docx)',{exact:true})});
});
