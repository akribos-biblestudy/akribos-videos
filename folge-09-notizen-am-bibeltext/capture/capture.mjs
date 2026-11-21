import { readFile } from 'node:fs/promises';
import { captureEpisode } from '../../scripts/capture-browser.mjs';
import { openVerse, openVerseMenu } from '../../scripts/capture-study.mjs';

const target = JSON.parse(await readFile(new URL('targets.json', import.meta.url), 'utf8'));
await captureEpisode(import.meta.url,{login:true},async capture => {
  const {page,go,snap} = capture;
  await page.setViewportSize({width:1320,height:870});
  const numberToNotes = async (showSteps=false) => {
    const {number}=await openVerse(capture,target);
    if (showSteps) await snap(1,number,{size:[625,290],point:number});
    const menu=await openVerseMenu(page,number);
    const notes=menu.getByRole('menuitem',{name:/Notizen zu/});
    if (showSteps) await snap(2,notes,{size:[408,252],point:notes});
    await notes.click();
    return page.getByTestId('reader-notes-panel');
  };
  const dialog=await numberToNotes(true);
  const openDocument=panel=>panel.getByTestId('reader-notes-open-document').filter({hasText:target.document}).click();
  await openDocument(dialog);
  const side=page.getByTestId('reader-notes-sidecar');
  const overview=side.getByRole('button',{name:/Notizen für .* anzeigen/});
  await overview.click();
  const current=side.getByTestId('reader-notes-current-context');
  const actual=current.getByText(target.verseName,{exact:true});
  const expected=Number(target.verseKey.split(':').at(-1));
  for(let i=0;i<24 && !await actual.isVisible();i++){
    const n=Number((await current.innerText()).match(/\d+,(\d+)/)?.[1]);
    if(!n)throw new Error('Missing reader context.');
    await page.locator('.flow-column[data-resource-id="'+target.resource+'"]').first().evaluate((node,dy)=>{
      let el=node;
      while(el && !(el.scrollHeight>el.clientHeight && /auto|scroll/.test(getComputedStyle(el).overflowY))) el=el.parentElement;
      (el||document.scrollingElement).scrollBy(0,dy);
    },n<expected?13:-13);
    await page.waitForTimeout(270);
  }
  await actual.waitFor();
  const selector=current.locator('select[name=resourceId]');
  await selector.selectOption('');
  await snap(3,current,{size:[453,364],point:selector});
  await openDocument(current);
  const content=side.getByTestId('reader-notes-sidecar-body');
  const reference=content.locator('a').filter({hasText:target.bodyReference}).first();
  await reference.waitFor();
  await snap(4,[side.getByTestId('reader-notes-sidecar-title'),content.locator('p').first()],{size:[770,395],offset:[-80,0]});
  await snap(5,content.locator('p').first(),{size:[465,200]});
  // Keep the original paragraph and insert the quotation on its own line.
  await content.click(); await page.keyboard.press('Control+End');
  await reference.hover();
  const pop=page.getByTestId('bible-reference-preview');
  const insert=pop.getByRole('button',{name:'Bibeltext einfügen'});
  await insert.waitFor();
  await snap(6,[reference,pop],{size:[510,306],keepHover:true,scroll:false});
  await insert.hover();
  await snap(7,pop,{size:[480,242],point:insert,keepHover:true,scroll:false});
  const rendered=content.locator('blockquote').last();
  const original=await content.innerText();
  await insert.click();
  await rendered.waitFor();
  try {
    await snap(8,rendered,{size:[420,230],offset:[24,0]});
  } finally {
    await content.focus();await page.keyboard.press('Control+z');
    await page.waitForFunction(s=>document.querySelector('[data-testid="reader-notes-sidecar-body"]')?.innerText===s,original);
    await page.waitForTimeout(1000);
  }
  await page.setViewportSize({width:900,height:750});
  await go('/account?tab=appearance');
  const standard=page.getByTestId('default-bible-settings');
  await standard.locator('select').selectOption(target.resource);
  await snap(9,standard,{size:[648,223],point:standard.locator('select')});
  await page.setViewportSize({width:1320,height:870});
  await openDocument(await numberToNotes());
  await snap(10,overview,{size:[420,175],point:overview});
  await overview.click();
  const filter=side.getByLabel('Nur Notizen zum aktuellen Kapitel');
  await snap(11,filter.locator('..'),{size:[450,220],point:filter});
  await filter.check();
  const extra=side.getByText(target.chapterDocument,{exact:true});
  await extra.waitFor();
  await snap(12,[filter.locator('..'),extra],{size:[427,330],offset:[5,30]});
});
