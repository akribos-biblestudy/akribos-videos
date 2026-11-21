import {readFile} from 'node:fs/promises';
import {captureEpisode} from '../../scripts/capture-browser.mjs';
const t=JSON.parse(await readFile(new URL('targets.json',import.meta.url)));
function reader(ids) {
  const q=new URLSearchParams({layout:ids.length===1?'single':'columns-'+ids.length,focus:'1'});
  ids.forEach((id,i)=>{q.append('tab',`${i+1}.1:${id}:A:${t.reference}`); q.append('active',`${i+1}.1`);});
  return '/'+t.reference+'?'+q;
}
await captureEpisode(import.meta.url,{url:'https://akribos.de'},async ({page,go,snap})=>{
  await go(reader([t.elberfelder]));
  const consent=page.getByRole('button',{name:'Analyse ablehnen'});
  await page.getByRole('button',{name:'Konto-Menü'}).waitFor();
  if(await consent.count()) await consent.click();
  const plus=page.getByRole('button',{name:'Ressource in Bereich 1 öffnen'});
  await snap(1,plus,{size:[695,240],offset:[160,42],point:plus});
  await plus.click();
  const chooser=page.getByRole('dialog');
  const elb=chooser.getByRole('button',{name:/Elberfelder 1932 mit Strongs/}),lut=chooser.getByRole('button',{name:/Luther 1912 mit Strongs/});
  await snap(2,[elb,lut],{size:[595,280]});
  await chooser.getByRole('button',{name:'Schlachter 1951 Schlachter 1951'}).click();
  const verse=page.locator(`.flow-column[data-resource-id="${t.schlachter}"] [data-verse-key="${t.verseKey}"]`).first();
  await verse.evaluate(el=>el.scrollIntoView({block:'center',behavior:'instant'}));
  const geliebt=verse.getByRole('button',{name:t.word,exact:true});
  await snap(3,geliebt,{size:[640,190],point:geliebt});
  await geliebt.click();
  const root=page.getByRole('heading',{name:/ἀγαπ/}).first();
  const meaning=page.getByRole('heading',{name:'Bedeutung',exact:true}).first();
  await meaning.waitFor();
  await snap(4,[root,meaning],{size:[850,540],offset:[-175,28]});
  await go(reader([t.elberfelder,t.menge]));
  const v=id=>page.locator(`.flow-column[data-resource-id="${id}"] [data-verse-key="${t.verseKey}"]`).first();
  for(const id of [t.elberfelder,t.menge]) await v(id).evaluate(el=>el.scrollIntoView({block:'start',behavior:'instant'}));
  await snap(5,[v(t.elberfelder),v(t.menge)],{scroll:false,size:[1250,365],offset:[0,-73]});
});
