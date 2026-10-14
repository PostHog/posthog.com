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

const sectionFor = (url: string): string | undefined => getActiveMenuSection<NamedNode>(docsSections, url)?.name

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
                { name: 'Home', url: '/docs/first' },
                { name: 'A link to Second', url: '/docs/second' },
            ],
        },
        {
            name: 'Second',
            url: '/docs/second',
            children: [{ name: 'Pricing', url: '/docs/second/pricing' }],
        },
        { name: 'Third', url: '/docs/third' },
    ]

    test('the first section that lists a URL wins', () => {
        assert.equal(getActiveMenuSection(sections, '/docs/first')?.name, 'First')
        assert.equal(getActiveMenuSection(sections, '/docs/second')?.name, 'First')
        assert.equal(getActiveMenuSection(sections, '/docs/second/pricing')?.name, 'Second')
    })

    test('a section that only owns a URL, with no sidebar to show, is the last resort', () => {
        assert.equal(getActiveMenuSection(sections, '/docs/third')?.name, 'Third')
    })

    test('an unknown URL resolves to no section', () => {
        assert.equal(getActiveMenuSection(sections, '/docs/nowhere'), undefined)
    })
})

describe('the real docs nav', () => {
    // Self-driving is the single home for its products (Slack, Desktop, MCP, CLI, Web) — the
    // standalone sections for those products are flat drop-down links with no sidebar of their own.
    test('product pages always use the Self-driving sidebar', () => {
        assert.equal(sectionFor('/docs/slack'), 'Self-driving')
        assert.equal(sectionFor('/docs/slack/setup'), 'Self-driving')
        assert.equal(sectionFor('/docs/posthog-desktop'), 'Self-driving')
        assert.equal(sectionFor('/docs/posthog-desktop/pricing'), 'Self-driving')
        assert.equal(sectionFor('/docs/model-context-protocol'), 'Self-driving')
        assert.equal(sectionFor('/docs/model-context-protocol/tools'), 'Self-driving')
        assert.equal(sectionFor('/docs/cli'), 'Self-driving')
        assert.equal(sectionFor('/docs/self-driving/web'), 'Self-driving')
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

    test('every docs URL listed in a sidebar resolves to a section with a sidebar to render', () => {
        const inSomeSidebar = new Set<string>()
        for (const section of docsSections) {
            collectURLs(section.children, inSomeSidebar)
        }

        for (const url of collectURLs(docsSections)) {
            const section = getActiveMenuSection<NamedNode>(docsSections, url)
            if (inSomeSidebar.has(url)) {
                assert.ok(section?.children?.length, `${url} resolves to "${section?.name}", which has no children`)
            }
        }
    })
})
