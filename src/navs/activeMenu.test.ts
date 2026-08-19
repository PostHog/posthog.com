/**
 * Sidebar section matching, against a small fixture and against the real docs nav.
 *
 * Run: pnpm test:navs
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { getActiveMenuSection } from './activeMenu.ts'
import type { MenuNode } from './activeMenu.ts'
import { docsMenu } from './index.js'

interface NamedNode extends MenuNode {
    name: string
    children?: NamedNode[]
}

const docsSections = docsMenu.children as NamedNode[]

const sectionFor = (url: string, search?: string): string | undefined =>
    getActiveMenuSection<NamedNode>(docsSections, url, search)?.name

/** Every URL in the tree, with the querystring removed. */
const collectURLs = (items: NamedNode[] | undefined, found: Set<string> = new Set()): Set<string> => {
    for (const item of items ?? []) {
        if (item.url) {
            found.add(item.url.split('?')[0])
        }
        collectURLs(item.children, found)
    }
    return found
}

describe('getActiveMenuSection', () => {
    const sections: NamedNode[] = [
        {
            name: 'First',
            url: '/docs/first',
            children: [
                { name: 'A plain link to Second', url: '/docs/second' },
                { name: 'A context link to Third', url: '/docs/third?nav=first' },
                { name: 'A plain link to Fourth', url: '/docs/fourth' },
            ],
        },
        {
            name: 'Second',
            url: '/docs/second',
            children: [{ name: 'Pricing', url: '/docs/second/pricing' }],
        },
        {
            name: 'Third',
            url: '/docs/third',
            children: [{ name: 'Pricing', url: '/docs/third/pricing' }],
        },
        { name: 'Fourth', url: '/docs/fourth' },
    ]

    test('a ?nav= link wins when the page carries the same query', () => {
        assert.equal(getActiveMenuSection(sections, '/docs/third', '?nav=first')?.name, 'First')
    })

    test('the section that owns a URL wins over an earlier section that links to it', () => {
        assert.equal(getActiveMenuSection(sections, '/docs/second')?.name, 'Second')
        assert.equal(getActiveMenuSection(sections, '/docs/third')?.name, 'Third')
        assert.equal(getActiveMenuSection(sections, '/docs/second/pricing')?.name, 'Second')
    })

    test('a section without children loses to a section that links to the page', () => {
        // Fourth owns /docs/fourth but has no sidebar to show, so First keeps the page.
        assert.equal(getActiveMenuSection(sections, '/docs/fourth')?.name, 'First')
    })

    test('a section without children is still the last resort', () => {
        const orphan: NamedNode[] = [{ name: 'Fourth', url: '/docs/fourth' }]

        assert.equal(getActiveMenuSection(orphan, '/docs/fourth')?.name, 'Fourth')
    })

    test('a ?nav= link alone does not claim the page', () => {
        const linkOnly: NamedNode[] = [
            { name: 'First', url: '/docs/first', children: [{ name: 'Third', url: '/docs/third?nav=first' }] },
        ]

        // Pass 3 skips the ?nav= link, so only the pass 4 fallback can match it.
        assert.equal(getActiveMenuSection(linkOnly, '/docs/third')?.name, 'First')
        assert.equal(getActiveMenuSection(linkOnly, '/docs/nowhere'), undefined)
    })
})

describe('the real docs nav', () => {
    // Self-driving is the first section and it links to all of these, so before pass 2 they all
    // rendered the Self-driving sidebar.
    test('a product page uses its own sidebar', () => {
        assert.equal(sectionFor('/docs/posthog-desktop'), 'PostHog Desktop')
        assert.equal(sectionFor('/docs/posthog-desktop/pricing'), 'PostHog Desktop')
        assert.equal(sectionFor('/docs/slack'), 'PostHog Slack')
    })

    test('MCP falls to AI engineering, which lists its pages', () => {
        // The standalone "PostHog MCP" section has no children, so it cannot win pass 2. AI
        // engineering nests posthogMcpNav, so the MCP pages are reachable from there.
        assert.equal(sectionFor('/docs/model-context-protocol'), 'AI engineering')
    })

    test('the same product page keeps the Self-driving sidebar when opened from there', () => {
        assert.equal(sectionFor('/docs/posthog-desktop', '?nav=self-driving'), 'Self-driving')
        assert.equal(sectionFor('/docs/slack', '?nav=self-driving'), 'Self-driving')
        assert.equal(sectionFor('/docs/model-context-protocol', '?nav=self-driving'), 'Self-driving')
    })

    test('Self-driving pages use the Self-driving sidebar', () => {
        assert.equal(sectionFor('/docs/self-driving'), 'Self-driving')
        assert.equal(sectionFor('/docs/self-driving/pricing'), 'Self-driving')
    })

    test('every docs URL resolves to a section that lists it', () => {
        const urls = collectURLs(docsSections)
        assert.ok(urls.size > 500, `expected the docs nav to hold hundreds of URLs, got ${urls.size}`)

        for (const url of urls) {
            const section = getActiveMenuSection<NamedNode>(docsSections, url)
            assert.ok(section, `${url} resolves to no section`)
            const listed = section.url?.split('?')[0] === url || collectURLs(section.children).has(url)
            assert.ok(listed, `${url} resolves to "${section.name}", which does not list it`)
        }
    })

    test('every docs URL resolves to a section with a sidebar to render', () => {
        for (const url of collectURLs(docsSections)) {
            const section = getActiveMenuSection<NamedNode>(docsSections, url)
            assert.ok(section?.children?.length, `${url} resolves to "${section?.name}", which has no children`)
        }
    })
})
