import { defineConfig, devices } from '@playwright/test'

const baseURL = process.env.BASE_URL || 'http://127.0.0.1:8001'

export default defineConfig({
    testDir: '.',
    testMatch: 'pages.spec.ts',
    outputDir: '../.visual-regression/results',
    timeout: 90_000,
    expect: {
        timeout: 15_000,
    },
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 4 : undefined,
    reporter: process.env.CI
        ? [['line'], ['html', { outputFolder: '../.visual-regression/report', open: 'never' }]]
        : [['list'], ['html', { outputFolder: '../.visual-regression/report', open: 'never' }]],
    use: {
        baseURL,
        colorScheme: 'light',
        locale: 'en-US',
        timezoneId: 'UTC',
        reducedMotion: 'reduce',
        serviceWorkers: 'block',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'desktop',
            use: {
                ...devices['Desktop Chrome'],
                viewport: { width: 1440, height: 1000 },
            },
        },
        {
            name: 'mobile',
            use: {
                ...devices['Pixel 7'],
                viewport: { width: 412, height: 915 },
            },
        },
    ],
})
