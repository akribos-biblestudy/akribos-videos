/* Shared Playwright session for the five reader episodes. */
const fs = require('node:fs/promises')
const path = require('node:path')
const { parseArgs } = require('node:util')
const { createRequire } = require('node:module')
const repo = path.resolve(__dirname, '../..')
const { chromium } = createRequire(path.join(repo, 'folge-01-erklaervideo/capture/package.json'))(
  'playwright',
)

function address() {
  if (!process.env.AKRIBOS_URL) throw Error('Set AKRIBOS_URL to your prepared Akribos instance.')
  const url = new URL(process.env.AKRIBOS_URL)
  if (
    !['http:', 'https:'].includes(url.protocol) ||
    url.pathname !== '/' ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  )
    throw Error('Expected the Akribos origin without a path or credentials.')
  return url.origin
}
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function reader(ref, resources, groups = [], anchors = []) {
  const query = new URLSearchParams({
    layout: resources.length === 1 ? 'single' : 'columns-' + resources.length,
    focus: '1',
  })
  resources.forEach((id, i) => {
    const tab = i + 1 + '.1'
    query.append('tab', [tab, id, groups[i] || 'A', anchors[i] || ref].join(':'))
    query.append('active', tab)
  })
  return address() + '/' + ref + '?' + query
}
const nav = async (p, url) => {
  await p.goto(url)
  await settle(p)
}
async function settle(p) {
  await p.evaluate(() => document.fonts.ready.then(() => true))
  await wait(450)
}
const field = (p) => p.getByRole('searchbox', { name: /Bibelstelle oder Suche in/ }).first()
const group = (p, i) => p.locator('button[aria-label^="Tabgruppe für"]').nth(i)
const word = (p, key, strong) =>
  p
    .locator(
      '.flow-column[data-resource-id="ELB1905"] [data-verse-key="' +
        key +
        '"] button[data-strong="' +
        strong +
        '"]',
    )
    .first()
async function signIn(p) {
  const origin = address()
  for (const key of ['AKRIBOS_USERNAME', 'AKRIBOS_PASSWORD'])
    if (!process.env[key]) throw Error('Missing ' + key)
  await nav(p, origin + '/login?redirectTo=%2Faccount')
  if (new URL(p.url()).origin !== origin) throw Error('Login changed origin')
  await p.getByLabel('E-Mail-Adresse').fill(process.env.AKRIBOS_USERNAME)
  await p.getByRole('button', { name: 'Weiter', exact: true }).click()
  await p.locator('input[type=password]').waitFor()
  if (new URL(p.url()).origin !== origin) throw Error('Password page changed origin')
  await p.locator('input[type=password]').fill(process.env.AKRIBOS_PASSWORD)
  await p.getByRole('button', { name: 'Anmelden', exact: true }).click()
  await p.waitForURL((u) => u.origin === origin && u.pathname != '/login')
  await settle(p)
}
async function search(p, value) {
  await field(p).fill(value)
  await field(p).press('Enter')
  const list = p.locator('.tab-search-results')
  await list.locator('.result-card').first().waitFor()
  await settle(p)
  return list
}

async function capture(dir, sequence, transformScreenshot) {
  const { values } = parseArgs({
    options: {
      output: { type: 'string' },
      help: { type: 'boolean' },
    },
  })
  if (values.help) {
    console.log('node capture/capture.cjs [--output DIRECTORY]')
    return
  }
  const episode = path.dirname(dir)
  const config = JSON.parse(await fs.readFile(path.join(dir, 'profile.json'), 'utf8'))
  const board = JSON.parse(await fs.readFile(path.join(episode, 'episode.json'), 'utf8'))
  const output = values.output ? path.resolve(values.output) : episode
  const dest = path.join(output, 'screenshots')
  await fs.mkdir(dest, { recursive: true })
  const stage = await fs.mkdtemp(path.join(dest, '.capture-'))
  const browser = await chromium.launch()
  try {
    const context = await browser.newContext({
      viewport: { width: config.width, height: config.height },
      deviceScaleFactor: config.deviceScaleFactor,
      locale: 'de-DE',
      colorScheme: 'light',
    })
    await context.addCookies(
      Object.entries({
        'tour-guest-done': '1',
        'reader-font-scale': String(config.readerFontScale),
        theme: 'light',
      }).map(([name, value]) => ({ name, value, url: address() })),
    )
    const p = await context.newPage()
    p.setDefaultTimeout(18000)
    let index = 0
    const files = []
    async function take() {
      const image = board.scenes[index++].image
      if (path.posix.dirname(image) !== 'screenshots' || !image.endsWith('.png'))
        throw Error('Expected a PNG in screenshots/: ' + image)
      const name = path.posix.basename(image)
      if (files.includes(name)) throw Error('Duplicate output filename: ' + name)
      files.push(name)
      await settle(p)
      await p.mouse.move(1, p.viewportSize().height - 2)
      const target = path.join(stage, name)
      const options = { animations: 'disabled', caret: 'hide' }
      if (transformScreenshot) {
        const original = await p.screenshot(options)
        await fs.writeFile(target, await transformScreenshot(p, original, config))
      } else {
        await p.screenshot({ ...options, path: target })
      }
      console.log(name)
    }
    await sequence(p, take, config)
    if (index !== board.scenes.length) throw Error('Number of shots differs from episode.json')
    for (const file of files) await fs.rename(path.join(stage, file), path.join(dest, file))
  } finally {
    await browser.close()
    await fs.rm(stage, { recursive: true, force: true })
  }
}
async function showFirstResult(list) {
  await list.locator('.result-scroll').evaluate((el) => {
    const first = el.querySelector('.result-card')
    el.scrollTop += first.getBoundingClientRect().top - el.getBoundingClientRect().top - 8
  })
}
module.exports = { capture, reader, nav, settle, field, group, word, signIn, search, showFirstResult }
