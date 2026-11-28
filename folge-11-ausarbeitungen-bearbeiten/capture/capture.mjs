import { readFile } from 'node:fs/promises';
import { captureEpisode } from '../../scripts/capture-browser.mjs';
import { openDocumentFromBoard } from '../../scripts/capture-study.mjs';

const target = JSON.parse(await readFile(new URL('targets.json', import.meta.url), 'utf8'));
await captureEpisode(import.meta.url, { login:true }, async capture => {
  const { page, snap, selected } = capture;
  await page.setViewportSize({ width: 1320, height: 870 });
  const {card,link} = await openDocumentFromBoard(capture,target.title);
  await snap(1,card,{size:[405,275],point:link});
  await link.click();
  const workflow = page.getByTestId('sermon-workflow');
  const save = workflow.getByRole('button',{name:'Arbeitsstand speichern'});
  await snap(2,workflow,{size:[400,477],point:save});
  const collections = page.getByTestId('preparation-collections');
  const collection = collections.getByRole('link',{name:target.collection,exact:true});
  await snap(3,collections,{size:[387,346],point:collection});
  const files = page.getByTestId('document-attachments');
  if (selected.has(4)) await files.getByText(target.attachment,{exact:true}).waitFor();
  await snap(4,files,{size:[390,335],point:files.getByRole('button',{name:'Dateien hinzufügen'})});
  const deliveries = page.getByTestId('sermon-deliveries');
  if (selected.has(5)) await deliveries.getByText(target.location,{exact:false}).waitFor();
  await snap(5,deliveries,{size:[390,400]});
});
