const {
  capture,
  showFirstResult,
  reader,
  nav,
  settle,
  word,
  search,
  field,
} = require('../../folge-02-orientierung/capture/session.cjs')
async function strong(p, take, config) {
  await nav(p, reader('Joh14,27', ['ELB1905', 'GREEKDE']))
  const greek = word(p, '43:14:27', 'G1515')
  await greek.scrollIntoViewIfNeeded()
  await field(p).fill('Joh 14,27')
  await field(p).press('Enter')
  await p.locator('[data-verse-key="43:14:27"].highlighted').first().waitFor()
  await settle(p)
  await take()
  if ((await greek.innerText()).trim() !== 'Frieden') throw Error('Expected Frieden at Johannes 14,27')
  await greek.click()
  const def = p.locator('.definition-section')
  await def.waitFor()
  await def.getByText(/Friede zwischen Personen/).first().waitFor()
  await take()
  await p.setViewportSize(config.statisticViewport)
  await nav(p, reader('Joh14,27', ['ELB1905']))
  let list = await search(p, 'G25')
  await showFirstResult(list)
  await take()
  await list.locator('.result-scroll').evaluate((scroll) => {
    const chart = scroll.querySelector('.gloss-summary')
    scroll.scrollTop += chart.getBoundingClientRect().top - scroll.getBoundingClientRect().top - 8
  })
  await take()
  await p.setViewportSize({ width: config.width, height: config.height })
  await nav(p, reader('1Mo1,1', ['ELB1905', 'STRONGS_HEBREW']))
  list = await search(p, 'H430')
  const first = list.locator('.result-card').first()
  await first.waitFor()
  await showFirstResult(list)
  await take()
  await first.locator('strong').click()
  const heb = word(p, '1:1:1', 'H430')
  await heb.waitFor()
  await heb.click()
  await def.waitFor()
  await take()
}
capture(__dirname, strong).catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
