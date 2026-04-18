import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const url = 'http://localhost:3000'
const dir = './temporary screenshots'
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const getNextIndex = () =>
  fs.readdirSync(dir).filter((f) => f.endsWith('.png')).length + 1

const browser = await puppeteer.launch()

// ── Desktop pass ──────────────────────────────────────────
const desktopPage = await browser.newPage()
await desktopPage.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await desktopPage.goto(url, { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 2500))

// Cache the beer pin start position while the page is unpinned (scrollY=0),
// because once GSAP pins the section its bounding rect no longer reflects document offset.
async function getBeerPinStart(page) {
  await page.evaluate(() => window.scrollTo(0, 0))
  await new Promise((r) => setTimeout(r, 400))
  return page.evaluate(() => {
    const beer = document.querySelector('.beer-section')
    if (!beer) return 0
    return beer.getBoundingClientRect().top + window.scrollY
  })
}

async function scrollToBeerProgress(page, pinStart, progress) {
  await page.evaluate(
    ({ pinStart, progress }) => {
      const vh = window.innerHeight
      const pinRange = 2 * vh
      window.scrollTo(0, pinStart + progress * pinRange)
    },
    { pinStart, progress },
  )
  await new Promise((r) => setTimeout(r, 800))
}

const beerPinStart = await getBeerPinStart(desktopPage)
console.log('desktop pinStart =', beerPinStart)

const desktopStops = [
  { label: 'beer-dt-0pct',   progress: 0.0 },
  { label: 'beer-dt-25pct',  progress: 0.25 },
  { label: 'beer-dt-50pct',  progress: 0.5 },
  { label: 'beer-dt-75pct',  progress: 0.75 },
  { label: 'beer-dt-100pct', progress: 1.0 },
]

for (const stop of desktopStops) {
  await scrollToBeerProgress(desktopPage, beerPinStart, stop.progress)
  const n = getNextIndex()
  const filepath = path.join(dir, `screenshot-${n}-${stop.label}.png`)
  await desktopPage.screenshot({ path: filepath, fullPage: false })
  console.log(`Saved: ${filepath}`)
}

// ── Mobile pass ───────────────────────────────────────────
const mobilePage = await browser.newPage()
await mobilePage.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await mobilePage.goto(url, { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 2500))

async function scrollToMobileBeer(page, offset) {
  await page.evaluate((o) => {
    const beer = document.querySelector('.beer-section')
    if (!beer) return
    const top = beer.getBoundingClientRect().top + window.scrollY
    window.scrollTo(0, top + o)
  }, offset)
  await new Promise((r) => setTimeout(r, 700))
}

const mobileStops = [
  { label: 'beer-mb-enter',  offset: -600 },
  { label: 'beer-mb-mid',    offset: -200 },
  { label: 'beer-mb-over',   offset: 100 },
  { label: 'beer-mb-below',  offset: 400 },
]

for (const stop of mobileStops) {
  await scrollToMobileBeer(mobilePage, stop.offset)
  const n = getNextIndex()
  const filepath = path.join(dir, `screenshot-${n}-${stop.label}.png`)
  await mobilePage.screenshot({ path: filepath, fullPage: false })
  console.log(`Saved: ${filepath}`)
}

await browser.close()
