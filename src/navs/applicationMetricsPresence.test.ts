/**
 * Application metrics is a product in private alpha. It should appear wherever the
 * other APM signals (logs, traces) appear so people can find it and see that it is
 * in alpha. These tests pin the two pieces of that presence:
 *
 *   1. a docs changelog page, wired into productConfigMap and the docs nav
 *      (scripts/check-product-changelogs.js enforces all three together)
 *   2. a `metrics` tool entry so it surfaces in product/tool listings with an
 *      alpha badge
 *
 * Run: pnpm test:navs
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { docsMenu } from './index.js'

const here = dirname(fileURLToPath(import.meta.url))

interface NamedNode {
    name?: string
    url?: string
    children?: NamedNode[]
}

const walk = (nodes?: NamedNode[]): NamedNode[] => (nodes ?? []).flatMap((node) => [node, ...walk(node.children)])

const metricsSection = (docsMenu.children as NamedNode[]).find((section) => section.url === '/docs/metrics')

describe('the application metrics changelog', () => {
    test('has a docs changelog page', () => {
        assert.ok(
            existsSync(join(here, '../../contents/docs/metrics/changelog.mdx')),
            'expected contents/docs/metrics/changelog.mdx to exist'
        )
    })

    test('the page renders ProductChangelog for metrics', () => {
        const page = readFileSync(join(here, '../../contents/docs/metrics/changelog.mdx'), 'utf8')
        assert.match(page, /<ProductChangelog\s+product=["']Metrics["']/)
    })

    test('is linked from the metrics docs nav', () => {
        const urls = walk([metricsSection as NamedNode]).map((node) => node.url)
        assert.ok(
            urls.includes('/docs/metrics/changelog'),
            'expected /docs/metrics/changelog in the metrics docs nav section'
        )
    })

    test('has a productConfigMap entry so it does not render the whole company changelog', () => {
        const component = readFileSync(join(here, '../components/Docs/ProductChangelog.tsx'), 'utf8')
        assert.match(component, /\bmetrics\s*:\s*\{[^}]*(topic|teams)/)
    })
})

describe('the application metrics tool', () => {
    test('has a metrics handle in src/data/tools.ts', () => {
        const tools = readFileSync(join(here, '../data/tools.ts'), 'utf8')
        assert.match(tools, /handle:\s*'metrics'/)
    })

    test('is badged as in alpha', () => {
        const tools = readFileSync(join(here, '../data/tools.ts'), 'utf8')
        const entry = tools.match(/\{[^{}]*handle:\s*'metrics'[^{}]*\}/)?.[0] ?? ''
        assert.match(entry, /status:\s*'alpha'/, 'expected the metrics tool to carry an alpha status badge')
    })
})
