/**
 * The metrics product is called out as "Application metrics" in the docs, not plain
 * "Metrics", so it isn't confused with experiment/revenue/usage/dashboard metrics.
 *
 * Run: pnpm test:navs
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { docsMenu } from './index.js'

interface NamedNode {
    name?: string
    url?: string
    children?: NamedNode[]
}

const metricsSection = (docsMenu.children as NamedNode[]).find((section) => section.url === '/docs/metrics')

describe('the metrics docs section', () => {
    test('is named "Application metrics" in the docs nav', () => {
        assert.equal(metricsSection?.name, 'Application metrics')
    })

    test('is not named plain "Metrics" anywhere in the section', () => {
        const walk = (nodes?: NamedNode[]): string[] =>
            (nodes ?? []).flatMap((node) => [node.name ?? '', ...walk(node.children)])
        assert.ok(
            !walk([metricsSection as NamedNode]).includes('Metrics'),
            'expected no plain "Metrics" name inside the /docs/metrics section'
        )
    })

    test('its overview frontmatter uses the "Application metrics" title', () => {
        const here = dirname(fileURLToPath(import.meta.url))
        const frontmatter = readFileSync(join(here, '../../contents/docs/metrics/index.mdx'), 'utf8').split(
            /^---$/m
        )[1]
        assert.match(frontmatter ?? '', /title:\s*Application metrics/i)
    })
})
