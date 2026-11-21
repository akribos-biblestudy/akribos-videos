import {readFile} from 'node:fs/promises';
import {captureEpisode} from '../../scripts/capture-browser.mjs';
const target=JSON.parse(await readFile(new URL('targets.json',import.meta.url)));
await captureEpisode(import.meta.url,{login:true},async ({page,go,snap,origin,selected})=>{
  if (selected.has(6) && (!['127.0.0.1','localhost','[::1]'].includes(new URL(origin).hostname)
    || process.env.AKRIBOS_CAPTURE_DEMO_SUBMIT !== '1'))
    throw new Error('For the confirmation use an isolated localhost demo and set AKRIBOS_CAPTURE_DEMO_SUBMIT=1.');
  await go(target.reader); await page.getByRole('button',{name:'Konto-Menü'}).click();
  const entry=page.getByRole('menuitem',{name:'Feedback geben'});
  await snap(1,entry,{size:[415,255],point:entry});
  await entry.click();
  const category=page.getByLabel('Art des Feedbacks');
  await category.selectOption('suggestion');
  await snap(2,[page.getByRole('heading',{name:'Feedback geben'}),category],{size:[690,245],offset:[0,6]});
  await category.selectOption('content');
  const resource=page.locator('select[name=resourceId]'),location=page.locator('input[name=location]');
  await resource.selectOption(target.resource);
  await location.fill(target.location);
  await snap(3,[resource,location],{size:[690,220],point:location});
  const description=page.locator('textarea[name=description]'),correction=page.locator('textarea[name=suggestion]');
  await description.fill(target.description);
  await correction.fill(target.suggestion);
  await snap(4,[description,correction],{size:[700,340]});
  const submit=page.getByRole('button',{name:'Feedback senden'});
  await submit.scrollIntoViewIfNeeded();
  await snap(5,[page.locator('input[type=file]'),submit],{size:[700,246],scroll:false,point:submit});
  if (selected.has(6)) {
    await submit.click();
    const success=page.getByRole('status').filter({hasText:'Vielen Dank! Dein Feedback wurde gespeichert.'});
    await success.waitFor();
    await snap(6,[page.getByRole('heading',{name:'Feedback geben'}),success],{size:[700,270],offset:[0,26]});
  }
});
