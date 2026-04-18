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
await page.goto(url, { waitUntil: 'domcontentloaded' })

// Capture intro frames at: 250ms, 800ms, 1500ms, 2400ms, 3600ms
const stops = [
  { label: 'intro-250ms',  wait: 250 },
  { label: 'intro-800ms',  wait: 550 },
  { label: 'intro-1500ms', wait: 700 },
  { label: 'intro-2400ms', wait: 900 },
  { label: 'intro-3600ms', wait: 1200 },
  { label: 'intro-settled',wait: 2500 },
]

for (const stop of stops) {
  await new Promise((r) => setTimeout(r, stop.wait))
  const n = getNextIndex()
  const fp = path.join(dir, `screenshot-${n}-${stop.label}.png`)
  await page.screenshot({ path: fp, fullPage: false })
  console.log(`Saved: ${fp}`)
}

await browser.close()
