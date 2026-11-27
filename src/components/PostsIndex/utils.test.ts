import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import type { PostSummary } from './types.ts'
import { getAuthorName, getByline, getReadingTime, getSubtitle } from './utils.ts'

const makePost = (overrides?: Partial<PostSummary>): PostSummary => ({
    id: 'test-post-1',
    fields: {
        wordCount: 500,
        slug: '/compare/test-tool',
        pageViews: 100,
    },
    excerpt: 'Test excerpt',
    frontmatter: {
        title: 'PostHog vs TestTool',
        shortDate: 'Nov 21',
        fullDate: 'Nov 21, 2026',
        authors: [{ name: 'Jane Doe' }],
    },
    ...overrides,
})

describe('getByline', () => {
    test('includes date, author, and reading time by default', () => {
        const post = makePost({ fields: { wordCount: 600, slug: '/blog/test' } })
        assert.equal(getByline(post, post.frontmatter.shortDate), 'Nov 21 · Jane Doe · 3 min read')
    })

    test('omits author when author is missing', () => {
        const post = makePost({
            frontmatter: {
                title: 'No Author',
                shortDate: 'Nov 21',
                fullDate: 'Nov 21, 2026',
                authors: [],
            },
        })
        assert.equal(getByline(post, post.frontmatter.fullDate), 'Nov 21, 2026 · 3 min read')
    })

    test('omits reading time when hideReadingTime is true', () => {
        const post = makePost()
        assert.equal(getByline(post, post.frontmatter.shortDate, { hideReadingTime: true }), 'Nov 21 · Jane Doe')
    })

    test('omits reading time when hideReadingTime is true without author', () => {
        const post = makePost({
            frontmatter: {
                title: 'No Author',
                shortDate: 'Nov 21',
                fullDate: 'Nov 21, 2026',
                authors: [],
            },
        })
        assert.equal(getByline(post, post.frontmatter.fullDate, { hideReadingTime: true }), 'Nov 21, 2026')
    })

    test('omits reading time when wordCount is 0 or missing', () => {
        const post = makePost({ fields: { wordCount: 0, slug: '/test' } })
        assert.equal(getByline(post, post.frontmatter.shortDate), 'Nov 21 · Jane Doe')
    })

    test('multi-item positive control fixture preserves parity across post list', () => {
        const posts: PostSummary[] = [
            makePost({ id: '1', fields: { wordCount: 200, slug: '/a' }, frontmatter: { title: 'A', shortDate: 'Jan 1', fullDate: 'Jan 1, 2026', authors: [{ name: 'Alice' }] } }),
            makePost({ id: '2', fields: { wordCount: 1500, slug: '/b' }, frontmatter: { title: 'B', shortDate: 'Feb 2', fullDate: 'Feb 2, 2026', authors: [{ name: 'Bob' }] } }),
            makePost({ id: '3', fields: { wordCount: 4000, slug: '/c' }, frontmatter: { title: 'C', shortDate: 'Mar 3', fullDate: 'Mar 3, 2026', authors: [] } }),
        ]

        // When reading time is included
        const defaultBylines = posts.map((p) => getByline(p, p.frontmatter.shortDate))
        assert.deepEqual(defaultBylines, [
            'Jan 1 · Alice · 1 min read',
            'Feb 2 · Bob · 8 min read',
            'Mar 3 · 20 min read',
        ])

        // When reading time is hidden (e.g. on /compare)
        const hiddenBylines = posts.map((p) => getByline(p, p.frontmatter.shortDate, { hideReadingTime: true }))
        assert.deepEqual(hiddenBylines, [
            'Jan 1 · Alice',
            'Feb 2 · Bob',
            'Mar 3',
        ])
    })
})

describe('getReadingTime', () => {
    test('returns 1 min read for small word counts', () => {
        assert.equal(getReadingTime(makePost({ fields: { wordCount: 50, slug: '/a' } })), '1 min read')
        assert.equal(getReadingTime(makePost({ fields: { wordCount: 200, slug: '/a' } })), '1 min read')
    })

    test('rounds up for larger word counts', () => {
        assert.equal(getReadingTime(makePost({ fields: { wordCount: 201, slug: '/a' } })), '2 min read')
        assert.equal(getReadingTime(makePost({ fields: { wordCount: 1000, slug: '/a' } })), '5 min read')
    })
})
