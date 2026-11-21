import { readFile } from 'node:fs/promises';
import { captureEpisode } from '../../scripts/capture-browser.mjs';

const target = JSON.parse(await readFile(new URL('targets.json', import.meta.url)));
if (!process.argv.includes('--shot') && !process.argv.includes('--list')) process.argv.push('--shot', '7');
await captureEpisode(import.meta.url, {url:'https://akribos.de'}, async ({page,go,snap}) => {
  const q = new URLSearchParams({layout:'single', focus:'1', tab:`1.1:${target.resource}:A:${target.reference}`, active:'1.1'});
  await go(`/${target.reference}?${q}`);
  const consent = page.getByRole('button', {name:'Analyse ablehnen'});
  await page.getByRole('button', {name:'Konto-Menü'}).waitFor();
  if (await consent.count()) await consent.click();
  const verse = page.locator(`.flow-column[data-resource-id="${target.resource}"] [data-verse-key="${target.verseKey}"]`).first();
  await verse.getByRole('button', {name:target.word, exact:true}).click();
  const notice = page.getByText(target.notice, {exact:false}).filter({visible:true}).first();
  await notice.waitFor();
  const strong = page.locator('.lexicon-tab header').filter({visible:true}).first();
  await snap(7, [strong,notice], {size:[745,270],offset:[-255,8],point:notice});
});
