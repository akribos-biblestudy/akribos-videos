import { readFile } from 'node:fs/promises';
import { captureEpisode } from '../../scripts/capture-browser.mjs';
import { captureAccountMenu, openVerse } from '../../scripts/capture-study.mjs';

const target = JSON.parse(await readFile(new URL('targets.json', import.meta.url), 'utf8'));
await captureEpisode(import.meta.url, {login:true}, async capture => {
  const { page, snap } = capture;
  await page.setViewportSize({width:1180,height:700});
  await openVerse(capture,target);
  await captureAccountMenu(capture,{profileShot:1,menuShot:2,destination:'/notes'});
  const nav = page.getByRole('link',{name:'Ausarbeitungen',exact:true}).last();
  await snap(3,nav,{size:[640,260],offset:[-55,-18],point:nav});
  await nav.click();
  const card=page.getByTestId('sermon-card').filter({has:page.getByRole('link',{name:target.title,exact:true})});
  const title=card.getByRole('link',{name:target.title,exact:true});
  await title.waitFor();
  const column = label => page.locator('section[aria-label="'+label+'"]').filter({has:card}).first();
  // Use the board's accessible move command. Return the prepared card to Research after capture.
  if(await column('Recherche').count()) {
    await title.focus(); await page.keyboard.press('Alt+ArrowLeft');
  }
  const idea = column('Idee');
  await idea.waitFor();
  const board=page.getByRole('group',{name:'Arbeitsstand',exact:true});
  await board.evaluate(node=>node.scrollIntoView({block:'start'}));
  const ideaHeading=idea.getByRole('heading').first();
  await snap(4,ideaHeading,{size:[910,360],offset:[305,156],scroll:false});
  await title.focus(); await page.keyboard.press('Alt+ArrowRight');
  const research=column('Recherche');
  await research.waitFor();
  const researchHeading=research.getByRole('heading').first();
  await snap(5,researchHeading,{size:[595,267],offset:[-15,108]});
  await page.setViewportSize({width:940,height:615});
  const form=page.locator('form[method=get]').last();
  const format=form.locator('[name=format]'), series=form.locator('[name=series]');
  await form.evaluate(n=>n.scrollIntoView({block:'start'}));
  await snap(6,format,{size:[455,102],offset:[0,0],point:format,scroll:false});
  await format.selectOption({label:target.format});
  await series.selectOption({label:target.series});
  await snap(7,series,{size:[455,102],offset:[0,0],point:series,scroll:false});
  const apply=form.getByRole('button',{name:'Filtern'});
  await snap(8,[format,apply],{size:[938,116],point:apply,scroll:false});
  await apply.click();
  await page.setViewportSize({width:1220,height:690});
  await snap(9,card,{size:[416,250],point:title});
});
