import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

// Takes the share image of every home page: a 1200x630 screenshot of / and of each translated copy (/pt, ...),
// saved as static/images/og/home-<code>.jpg. gatsby/i18n.ts picks the image for each page.
//
// Run it against a dev server when the home page copy changes:
//   pnpm start
//   node scripts/home-og-images.mjs [baseUrl] [code ...]
// With no codes, it takes every locale in src/i18n/locales.

const [baseUrl = 'http://localhost:8001', ...codes] = process.argv.slice(2)
const localesDirectory = fileURLToPath(new URL('../src/i18n/locales/', import.meta.url))
const outputDirectory = fileURLToPath(new URL('../static/images/og/', import.meta.url))
const locales = codes.length
    ? codes
    : fs
          .readdirSync(localesDirectory)
          .filter((file) => file.endsWith('.yml'))
          .map((file) => file.replace(/\.yml$/, ''))

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const browser = await puppeteer.launch({ headless: 'new' })
try {
    for (const code of locales) {
        // A fresh page for each shot: a second navigation in a hydrated page hangs on beforeunload.
        const page = await browser.newPage()
        page.on('dialog', (dialog) => dialog.accept().catch(() => {}))
        // The home page animates without end, and a screenshot waits for it to settle. Reduced motion stops the
        // animations, and the demos show their last frame.
        await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }])
        await page.setViewport({ width: 1200, height: 630 })
        await page.evaluateOnNewDocument(() => {
            // Light mode, and no cookie banner over the page.
            localStorage.setItem('theme', 'light')
            localStorage.setItem('siteSettings', JSON.stringify({ colorMode: 'light', theme: 'light' }))
            localStorage.setItem('cookie_consent', 'acknowledged')
        })
        console.log(`Loading ${code}`)
        await page.goto(`${baseUrl}${code === 'en' ? '/' : `/${code}`}`, {
            waitUntil: 'domcontentloaded',
            timeout: 180000,
        })
        // The site never goes network-idle, so wait for hydration and the window animation instead.
        await sleep(12000)
        await page.evaluate(() => document.fonts.ready)
        const file = `${outputDirectory}home-${code}.jpg`
        await Promise.race([
            page.screenshot({ path: file, type: 'jpeg', quality: 90 }),
            sleep(60000).then(() => {
                throw new Error(`Timed out taking ${file}`)
            }),
        ])
        console.log(`Saved ${file}`)
        await page.close()
    }
} finally {
    await browser.close()
}
