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

const sectionFor = (url: string): string | undefined =>
    getActiveMenuSection<NamedNode>(docsMenu.children as NamedNode[], url)?.name

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
    test('the section that owns a URL wins over an earlier section that links to it', () => {
        const sections: NamedNode[] = [
            {
                name: 'First',
                url: '/docs/first',
                children: [{ name: 'A link to Second', url: '/docs/second' }],
            },
            {
                name: 'Second',
                url: '/docs/second',
                children: [{ name: 'Pricing', url: '/docs/second/pricing' }],
            },
        ]

        assert.equal(getActiveMenuSection(sections, '/docs/second')?.name, 'Second')
        assert.equal(getActiveMenuSection(sections, '/docs/second/pricing')?.name, 'Second')
        assert.equal(getActiveMenuSection(sections, '/docs/first')?.name, 'First')
    })

    test('a section without children never wins, because it has no sidebar', () => {
        const sections: NamedNode[] = [
            {
                name: 'First',
                url: '/docs/first',
                children: [{ name: 'A link to Second', url: '/docs/second' }],
            },
            { name: 'Second', url: '/docs/second' },
        ]

        assert.equal(getActiveMenuSection(sections, '/docs/second')?.name, 'First')
    })

    test('a querystring on a nav URL does not stop the match', () => {
        const sections: NamedNode[] = [
            { name: 'First', url: '/docs/first?tab=web', children: [{ name: 'Child', url: '/docs/first/child' }] },
        ]

        assert.equal(getActiveMenuSection(sections, '/docs/first')?.name, 'First')
    })

    test('an unlisted URL matches no section', () => {
        const sections: NamedNode[] = [{ name: 'First', url: '/docs/first', children: [] }]

        assert.equal(getActiveMenuSection(sections, '/docs/nowhere'), undefined)
    })
})

describe('the real docs nav', () => {
    // Self-driving is the first section and it links to both of these, so before the owner pass
    // they both rendered the Self-driving sidebar.
    test('PostHog Desktop pages use the PostHog Desktop sidebar', () => {
        assert.equal(sectionFor('/docs/posthog-desktop'), 'PostHog Desktop')
        assert.equal(sectionFor('/docs/posthog-desktop/pricing'), 'PostHog Desktop')
    })

    test('PostHog Slack pages use the PostHog Slack sidebar', () => {
        assert.equal(sectionFor('/docs/slack'), 'PostHog Slack')
    })

    test('Self-driving pages still use the Self-driving sidebar', () => {
        assert.equal(sectionFor('/docs/self-driving'), 'Self-driving')
        assert.equal(sectionFor('/docs/self-driving/pricing'), 'Self-driving')
    })

    test('every docs URL resolves to a section that lists it', () => {
        const urls = collectURLs(docsMenu.children as NamedNode[])
        assert.ok(urls.size > 500, `expected the docs nav to hold hundreds of URLs, got ${urls.size}`)

        for (const url of urls) {
            const section = getActiveMenuSection<NamedNode>(docsMenu.children as NamedNode[], url)
            assert.ok(section, `${url} resolves to no section`)
            const listed = section.url?.split('?')[0] === url || collectURLs(section.children).has(url)
            assert.ok(listed, `${url} resolves to "${section.name}", which does not list it`)
        }
    })

    test('every docs URL resolves to a section with a sidebar to render', () => {
        for (const url of collectURLs(docsMenu.children as NamedNode[])) {
            const section = getActiveMenuSection<NamedNode>(docsMenu.children as NamedNode[], url)
            assert.ok(section?.children?.length, `${url} resolves to "${section?.name}", which has no children`)
        }
    })
})
