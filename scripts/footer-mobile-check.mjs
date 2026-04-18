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
await new Promise((r) => setTimeout(r, 1500))

// Take a tall screenshot of just the footer by capturing its bounding box.
const clip = await page.evaluate(() => {
  const f = document.querySelector('footer')
  if (!f) return null
  f.scrollIntoView({ block: 'start' })
  const r = f.getBoundingClientRect()
  return { x: 0, y: r.top + window.scrollY - window.scrollY, width: window.innerWidth, height: Math.min(r.height, 1400) }
})

await new Promise((r) => setTimeout(r, 700))

if (clip) {
  const n = getNextIndex()
  const fp = path.join(dir, `screenshot-${n}-footer-mobile.png`)
  await page.screenshot({ path: fp, clip })
  console.log(`Saved: ${fp}`)
}

await browser.close()
