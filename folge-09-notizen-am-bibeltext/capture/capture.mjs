import { readFile } from 'node:fs/promises';
import { captureEpisode } from '../../scripts/capture-browser.mjs';
import { openVerse, openVerseMenu } from '../../scripts/capture-study.mjs';

const target = JSON.parse(await readFile(new URL('targets.json', import.meta.url), 'utf8'));
await captureEpisode(import.meta.url, { login:true }, async capture => {
  const { page, go, snap } = capture;
  await page.setViewportSize({ width: 1320, height: 870 });
  async function openNotes(verse) {
    const { number } = await openVerse(capture, verse);
    const menu = await openVerseMenu(page, number);
    const notes = menu.getByRole('menuitem', {name:/Notizen zu/});
    return notes;
  }
  const notes = await openNotes(target);
  await snap(1, notes, { size:[405,255], point:notes });
  await notes.click();
  const dialog = page.getByTestId('reader-notes-panel');
  const open = dialog.getByTestId('reader-notes-open-document').filter({hasText:target.document});
  await open.click();
  const side = page.getByTestId('reader-notes-sidecar');
  await side.getByRole('button',{name:/Notizen für .* anzeigen/}).click();
  const current = side.getByTestId('reader-notes-current-context');
  // This panel follows the first visible verse after the sidecar changes the column width.
  const reference = current.getByText(target.verseName,{exact:true});
  for (let i=0; i<24 && !await reference.isVisible(); i++) {
    const currentVerse = Number((await current.innerText()).match(/\d+,(\d+)/)?.[1]);
    const expectedVerse = Number(target.verseKey.split(':').at(-1));
    if (!currentVerse) throw new Error('Reader panel has no verse context.');
    await page.locator('.flow-column[data-resource-id="' + target.resource + '"]').first().evaluate((node, dy) => {
      let scroller = node;
      while (scroller && !(scroller.scrollHeight > scroller.clientHeight && /auto|scroll/.test(getComputedStyle(scroller).overflowY))) scroller = scroller.parentElement;
      (scroller || document.scrollingElement).scrollBy(0,dy);
    },currentVerse < expectedVerse ? 13 : -13);
    await page.waitForTimeout(270);
  }
  await reference.waitFor();
  const select = current.locator('select[name=resourceId]');
  await select.selectOption('');
  await snap(2,current,{size:[450,357],point:select});
  await current.getByTestId('reader-notes-open-document').filter({hasText:target.document}).click();
  const editor = side.getByTestId('reader-notes-sidecar-editor');
  await snap(3,editor.getByTestId('reader-notes-sidecar-body'),{size:[620,490],offset:[-90,40]});
  const full = side.getByRole('link',{name:'Im vollständigen Notiz-Editor öffnen'});
  await go(await full.getAttribute('href'));
  const add = page.getByRole('button',{name:'Bibelstelle hinzufügen'});
  const form = add.locator('xpath=ancestor::form[1]');
  await form.locator('input:not([type=hidden])').fill(target.otherReference);
  await snap(4,form.locator('..'),{size:[405,335],point:add});
  const other = await openNotes({...target, reference:target.otherReference,verseKey:target.otherVerseKey});
  await other.click();
  const found = dialog.getByTestId('reader-notes-open-document').filter({hasText:target.document});
  await snap(5,found,{size:[475,272],point:found});
});
