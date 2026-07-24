import { expect, test } from '@playwright/test'
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
    { name: 'tutorial', path: '/tutorials/openrouter-observability' },
    { name: 'handbook', path: '/handbook/engineering/posthog-com/technical-architecture' },
    { name: 'customer', path: '/customers/elevenlabs' },
] as const

const screenshotDirectory = path.resolve(__dirname, '../.visual-regression/screenshots')

test.beforeEach(async ({ page }) => {
    await page.route(
        /(us\.i\.posthog\.com|app\.posthog\.com|api\.inkeep\.com|youtube\.com|wistia\.(com|net))/,
        (route) => route.abort()
    )

    await page.addInitScript(() => {
        window.localStorage.setItem('ph_optout', 'true')
    })
})

for (const route of routes) {
    test(`${route.name} page`, async ({ page }, testInfo) => {
        const response = await page.goto(route.path, { waitUntil: 'domcontentloaded' })

        expect(response, `${route.path} did not return a document response`).not.toBeNull()
        expect(response?.status(), `${route.path} returned an unsuccessful status`).toBeLessThan(400)

        await expect(page.locator('body')).toBeVisible()
        await page.addStyleTag({
            content: `
                *, *::before, *::after {
                    animation-delay: 0s !important;
                    animation-duration: 0s !important;
                    caret-color: transparent !important;
                    scroll-behavior: auto !important;
                    transition-delay: 0s !important;
                    transition-duration: 0s !important;
                }
                iframe, video { visibility: hidden !important; }
            `,
        })
        await page.evaluate(async () => {
            await document.fonts.ready

            for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
                window.scrollTo(0, y)
                await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
            }
            window.scrollTo(0, 0)

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

        await mkdir(screenshotDirectory, { recursive: true })
        await page.screenshot({
            path: path.join(screenshotDirectory, `${route.name}--${testInfo.project.name}.png`),
            fullPage: true,
            animations: 'disabled',
            caret: 'hide',
        })
    })
}
