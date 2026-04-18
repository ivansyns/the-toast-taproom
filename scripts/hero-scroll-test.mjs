import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

const url = 'http://localhost:3000'
const dir = './temporary screenshots'
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

const getNextIndex = () =>
  fs.readdirSync(dir).filter((f) => f.endsWith('.png')).length + 1

const browser = await puppeteer.launch()
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 2500))

// Pinned range = 3 viewports. Post-hero starts around 4*vh once the pin-spacer ends.
const stops = [
  { label: 'the-toast-0pct', scrollPx: 0 },
  { label: 'taproom-15pct',  progress: 0.15 },
  { label: 'eyebrow-35pct',  progress: 0.35 },
  { label: 'tagline-52pct',  progress: 0.52 },
  { label: 'tags-68pct',     progress: 0.68 },
  { label: 'bottom-85pct',   progress: 0.85 },
  { label: 'nav-past-hero',  scrollPx: null, past: true },
]

for (const stop of stops) {
  await page.evaluate((s) => {
    if (s.past) {
      const hero = document.querySelector('.hero')
      const pinEnd = 3 * window.innerHeight
      const heroBottom = (hero ? hero.offsetHeight : window.innerHeight) + pinEnd
      window.scrollTo(0, heroBottom + 20)
      return
    }
    if (s.scrollPx != null) {
      window.scrollTo(0, s.scrollPx)
      return
    }
    const vh = window.innerHeight
    window.scrollTo(0, s.progress * vh * 3)
  }, stop)

  await new Promise((r) => setTimeout(r, 900))
  const n = getNextIndex()
  const filepath = path.join(dir, `screenshot-${n}-${stop.label}.png`)
  await page.screenshot({ path: filepath, fullPage: false })
  console.log(`Saved: ${filepath}`)
}

await browser.close()
