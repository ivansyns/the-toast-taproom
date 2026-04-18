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
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle2' })
await new Promise((r) => setTimeout(r, 2500))

const stops = [
  { label: 'hero-mb-0', scrollY: 0 },
  { label: 'hero-mb-mid', scrollY: 844 },
  { label: 'hero-mb-end', scrollY: 2300 },
]

for (const s of stops) {
  await page.evaluate((y) => window.scrollTo(0, y), s.scrollY)
  await new Promise((r) => setTimeout(r, 800))
  const n = getNextIndex()
  const fp = path.join(dir, `screenshot-${n}-${s.label}.png`)
  await page.screenshot({ path: fp, fullPage: false })
  console.log(`Saved: ${fp}`)
}

await browser.close()
