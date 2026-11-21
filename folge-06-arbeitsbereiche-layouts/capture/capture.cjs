const {
  capture,
  reader,
  nav,
  settle,
  word,
  signIn,
} = require('../../folge-02-orientierung/capture/session.cjs')
async function workspaces(p, take) {
  await signIn(p)
  await nav(p, reader('Joh3,16', ['ELB1905', 'GERKINGCOMMENTS', 'GREEKDE']))
  await word(p, '43:3:16', 'G25').click()
  await p.locator('.definition-section').waitFor()
  await settle(p)
  const layout = p.getByRole('button', { name: 'Kachelanordnung wählen' }).first()
  await layout.click()
  const three = p.getByText('Drei Spalten', { exact: true }).first()
  await three.waitFor()
  await take()
  await p.keyboard.press('Escape')
  const divider = p.getByRole('separator', { name: 'Spaltenbreite anpassen' }).first()
  const br = await divider.boundingBox()
  await p.mouse.move(br.x + br.width / 2, br.y + 200)
  await p.mouse.down()
  await p.mouse.move(br.x + 95, br.y + 200, { steps: 6 })
  await p.mouse.up()
  await take()
  const ws = p.getByRole('button', { name: 'Arbeitsbereiche', exact: true })
  await ws.click()
  const add = p.getByRole('menuitem', { name: 'Neuer Arbeitsbereich', exact: false })
  await add.waitFor()
  await take()
  await add.click()
  const dialog = p.getByRole('dialog')
  const input = dialog.locator('input').first()
  await input.fill('Johannes studieren')
  await take()
  await dialog.getByRole('button', { name: 'Abbrechen' }).click()
  await ws.click()
  const saved = p.getByRole('menuitem', { name: 'Johannes studieren', exact: true })
  await saved.waitFor()
  await take()
}
capture(__dirname, workspaces).catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
