import { expect, test, type Page } from '@playwright/test'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'

const routes = [
    { name: 'home', path: '/' },
    { name: 'pricing', path: '/pricing' },
    { name: 'product-analytics', path: '/product-analytics' },
    { name: 'session-replay', path: '/session-replay' },
    { name: 'blog', path: '/blog/karpathy-autoresearch-query-engine-bug' },
    { name: 'comparison', path: '/blog/posthog-vs-ga4' },
    { name: 'docs', path: '/docs/product-analytics' },
    { name: 'surveys', path: '/surveys' },
    { name: 'handbook', path: '/handbook/engineering/posthog-com/technical-architecture' },
    { name: 'customers', path: '/customers' },
] as const

const screenshotDirectory = path.resolve(__dirname, '../.visual-regression/screenshots')

// A fixed instant so anything that renders "now" (relative dates, copyright
// year, countdowns) comes out identically on every run.
const FIXED_NOW = new Date('2026-01-15T12:00:00Z')

// Deterministic Math.random replacement. The homepage, customers page and
// other "shuffle this content" widgets pick with Math.random(); without a
// fixed seed the same page can render different content on consecutive runs.
const seedRandom = () => {
    let state = 42
    Math.random = () => {
        // mulberry32
        state = (state + 0x6d2b79f5) | 0
        let t = state
        t = Math.imul(t ^ (t >>> 15), t | 1)
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296
    }
}

test.beforeEach(async ({ page }) => {
    await page.route(
        /(us\.i\.posthog\.com|app\.posthog\.com|api\.inkeep\.com|youtube\.com|wistia\.(com|net))/,
        (route) => route.abort()
    )

    // Fix the browser clock but let timers keep running on real time, so
    // time-derived rendering is identical between runs without freezing
    // setTimeout-based code (lazy loading, hydration).
    await page.clock.install({ now: FIXED_NOW, shouldAdvanceTime: true })
    await page.addInitScript(seedRandom)

    await page.addInitScript(() => {
        window.localStorage.setItem('ph_optout', 'true')
    })
})

// "3 days ago", "a month ago", "Solved 2 hours ago" and friends come from
// dayjs(...).fromNow() driven by live data (community questions, docs
// activity). The underlying timestamps change between runs even for the same
// build, so they will always diff. Replace them with a stable token.
const normalizeVolatileText = async (page: Page) => {
    await page.evaluate(() => {
        const relativeTime = /\b(?:an?|a few|\d+)\s+(?:second|minute|hour|day|week|month|year)s?\s+ago\b/gi
        const iso = /\b\d{4}-\d{2}-\d{2}(?:[T ]\d{2}:\d{2}(?::\d{2}(?:\.\d+)?)?(?:Z|[+-]\d{2}:?\d{2})?)?\b/g

        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
        const nodes: Text[] = []
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
            nodes.push(node as Text)
        }
        for (const node of nodes) {
            if (!node.data) continue
            node.data = node.data.replace(relativeTime, '[time ago]').replace(iso, '[date]')
        }
    })
}

// rough-notation picks a fresh random seed for every sketch stroke, so its
// drawn annotations differ on every load and would diff on every run.
const hideVolatileElements = `
    iframe, video, .rough-annotation { visibility: hidden !important; }
`

const disableMotion = `
    *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        caret-color: transparent !important;
        scroll-behavior: auto !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
    }
    ${hideVolatileElements}
`

const settlePage = async (page: Page) => {
    await page.evaluate(async () => {
        await document.fonts.ready

        // The site renders page content inside inner scroll containers (e.g
        // `.app-scroll-viewport`), not in the document: `window.scrollTo` is a
        // no-op on many pages. Scroll every scrollable element (and window, for
        // plain-scrolling pages) to the end so lazy/virtualised content fully
        // renders, then reset to the top before capture.
        const scrollables = [
            window,
            ...Array.from(document.querySelectorAll<HTMLElement>('*')).filter(
                (el) => el.scrollHeight > el.clientHeight && el.clientHeight > 0
            ),
        ]

        for (const scroller of scrollables) {
            const height = scroller instanceof Window ? document.documentElement.scrollHeight : scroller.scrollHeight
            const step = window.innerHeight
            for (let y = 0; y < height; y += step) {
                scroller.scrollTo(0, y)
                await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
            }
            scroller.scrollTo(0, 0)
        }

        const images = Array.from(document.images)
        await Promise.all(
            images.map(async (image) => {
                if (image.complete) {
                    await image.decode().catch(() => undefined)
                    return
                }
                await Promise.race([
                    new Promise((resolve) => image.addEventListener('load', resolve, { once: true })),
                    new Promise((resolve) => image.addEventListener('error', resolve, { once: true })),
                    new Promise((resolve) => window.setTimeout(resolve, 5_000)),
                ])
            })
        )

        // Gatsby hydration and lazy components can continue changing a full page after
        // the initial image set has loaded. Require three consecutive stable samples,
        // while bounding the wait so a dynamic widget cannot stall the whole suite.
        let stableSamples = 0
        let previousHeight = 0
        let previousElements = 0
        const deadline = Date.now() + 5_000

        while (stableSamples < 3 && Date.now() < deadline) {
            await new Promise((resolve) => window.setTimeout(resolve, 250))
            const height = document.documentElement.scrollHeight
            const elements = document.body.getElementsByTagName('*').length

            if (height === previousHeight && elements === previousElements) {
                stableSamples += 1
            } else {
                stableSamples = 0
                previousHeight = height
                previousElements = elements
            }
        }
    })
}

for (const route of routes) {
    test(`${route.name} page`, async ({ page }, testInfo) => {
        const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' })

        expect(response, `${route.path} did not return a document response`).not.toBeNull()
        expect(response?.status(), `${route.path} returned an unsuccessful status`).toBeLessThan(400)

        await expect(page.locator('body')).toBeVisible()
        await page.addStyleTag({ content: disableMotion })
        await settlePage(page)
        await normalizeVolatileText(page)

        await mkdir(screenshotDirectory, { recursive: true })
        await page.screenshot({
            path: path.join(screenshotDirectory, `${route.name}--${testInfo.project.name}.png`),
            fullPage: true,
            animations: 'disabled',
            caret: 'hide',
        })
    })
}
