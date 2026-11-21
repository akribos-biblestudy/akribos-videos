const {
  capture, reader, nav, signIn, settle,
} = require('../../folge-02-orientierung/capture/session.cjs')

async function workspaces(p, take, config) {
  await signIn(p)
  const url = new URL(reader(config.reference, ['ELB1905', 'GERKINGCOMMENTS']))
  url.searchParams.set('layout', 'columns-3')
  url.searchParams.append('tab', '1.2:SCH1951:A:' + config.reference)
  await nav(p, url.href)
  const layout = p.getByRole('button', { name: 'Kachelanordnung wählen' }).first()
  const two = p.getByRole('menuitemradio', { name: /Zwei Spalten/ })
  const toggle = p.getByTestId('reader-notes-sidecar-toggle')
  const closeNotes = p.getByRole('button', { name: 'Notizbereich schließen' })
  const workspaces = p.getByRole('button', { name: 'Arbeitsbereiche', exact: true })
  const left = p.getByRole('group', { name: 'Tabs für Bereich 1', exact: true })
  const right = p.getByRole('group', { name: 'Tabs für Bereich 2', exact: true })
  const tab = left.locator('[draggable=true][aria-label="SCH"]')
  const target = right.locator('[draggable=true][aria-label="Kommentar: Ger de Koning"]')
  const divider = p.getByRole('separator', { name: 'Spaltenbreite anpassen' }).first()

  await layout.waitFor()
  await take()
  await layout.click()
  await two.waitFor()
  await take()
  await two.click()
  await p.getByRole('group', { name: 'Tabs für Bereich 3', exact: true }).waitFor({ state: 'hidden' })
  await layout.click()
  await toggle.waitFor()
  await take()
  await toggle.click()
  await closeNotes.waitFor()
  await p.getByRole('searchbox', { name: 'Dokumente durchsuchen' }).waitFor()
  await take()
  await closeNotes.click()
  await closeNotes.waitFor({ state: 'hidden' })

  await tab.waitFor()
  await target.waitFor()
  await take()
  await tab.dragTo(target, { sourcePosition: { x: 26, y: 20 }, targetPosition: { x: 44, y: 20 } })
  await right.locator('[draggable=true][aria-label="SCH"]').waitFor()
  await tab.waitFor({ state: 'detached' })
  await left.getByRole('tab', { name: /ELB/ }).waitFor()
  await settle(p)

  const box = await divider.boundingBox()
  const x = box.x + box.width / 2
  const y = box.y + box.height / 2
  await take()
  await p.mouse.move(x, y)
  await p.mouse.down()
  await p.mouse.move(x + config.dividerDragCssPx, y, { steps: 18 })
  await p.mouse.up()
  await p.waitForFunction(
    ({ oldX, delta }) => document.querySelector('[role=separator]').getBoundingClientRect().x >= oldX + delta - 2,
    { oldX: box.x, delta: config.dividerDragCssPx },
  )
  await take()
  await workspaces.click()
  const add = p.getByRole('menuitem', { name: /Neuer Arbeitsbereich/ })
  await add.waitFor()
  await take()
  await add.click()
  const dialog = p.getByRole('dialog')
  const input = dialog.locator('input').first()
  await input.fill(config.workspaceName)
  const create = dialog.getByRole('button', { name: 'Anlegen' })
  await create.waitFor()
  await take()

  // The named workspace is part of this episode's prepared demo data.
  await dialog.getByRole('button', { name: 'Abbrechen' }).click()
  await workspaces.click()
  const saved = p.getByRole('menuitem', { name: config.workspaceName, exact: true })
  await saved.waitFor()
  await take()
}

// Keep the browser image at its captured size and reserve space above its toolbar for the camera move.
async function addTopMargin(page, png, config) {
  const framed = await page.evaluate(async ({ encoded, margin }) => {
    const bytes = Uint8Array.from(atob(encoded), (char) => char.charCodeAt(0))
    const screenshot = await createImageBitmap(new Blob([bytes], { type: 'image/png' }))
    const canvas = document.createElement('canvas')
    canvas.width = screenshot.width
    canvas.height = screenshot.height + margin
    const context = canvas.getContext('2d')
    context.fillStyle = '#f6f5ef'
    context.fillRect(0, 0, canvas.width, margin)
    context.drawImage(screenshot, 0, margin)
    screenshot.close()
    return canvas.toDataURL('image/png').split(',')[1]
  }, { encoded: png.toString('base64'), margin: config.topMarginCssPx * config.deviceScaleFactor })
  return Buffer.from(framed, 'base64')
}

capture(__dirname, workspaces, addTopMargin).catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
