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

const stops = [
  { label: 'unpin-top',      y: 0 },
  { label: 'unpin-scroll400', y: 400 },
  { label: 'unpin-scroll900', y: 900 },
  { label: 'unpin-scroll1400',y: 1400 },
]

for (const s of stops) {
  await page.evaluate((y) => window.scrollTo(0, y), s.y)
  await new Promise((r) => setTimeout(r, 500))
  const n = getNextIndex()
  const fp = path.join(dir, `screenshot-${n}-${s.label}.png`)
  await page.screenshot({ path: fp, fullPage: false })
  console.log(`Saved: ${fp}`)
}

await browser.close()
