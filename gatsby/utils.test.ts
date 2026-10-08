/**
 * getPublicID must ignore the transformation and version segments that Cloudinary allows
 * before the public ID, and must keep folder segments that are part of it.
 *
 * Run: pnpm test:gatsby-utils
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { getPublicID } from './utils.ts'

const BASE = 'https://res.cloudinary.com/dmukukwp6/image/upload/'

describe('getPublicID', () => {
    test('reads a plain public ID', () => {
        assert.equal(getPublicID(`${BASE}workflows_beta_cover_a04e206b7a.jpg`), 'workflows_beta_cover_a04e206b7a')
    })

    test('keeps the folders of a public ID', () => {
        assert.equal(
            getPublicID(`${BASE}posthog.com/contents/images/blog/posthog-ceo-diary-blog.png`),
            'posthog.com/contents/images/blog/posthog-ceo-diary-blog'
        )
    })

    test('removes a transformation segment', () => {
        assert.equal(getPublicID(`${BASE}q_auto,f_auto/marketing_hiring_fbb1d110d0.png`), 'marketing_hiring_fbb1d110d0')
    })

    test('removes chained transformation segments', () => {
        assert.equal(
            getPublicID(`${BASE}e_trim/w_500,c_limit,q_auto,f_auto/generated_1_80c991e813.png`),
            'generated_1_80c991e813'
        )
    })

    test('removes a version segment', () => {
        assert.equal(
            getPublicID(`${BASE}v1711365816/posthog.com/contents/images/blog/risotto-startup.jpg`),
            'posthog.com/contents/images/blog/risotto-startup'
        )
    })

    test('removes a transformation segment and a version segment together', () => {
        assert.equal(
            getPublicID(`${BASE}f_auto,q_auto/v1/posthog.com/contents/images/enterprise/ftbq1l9oz8t9kwiqwgww.jpg`),
            'posthog.com/contents/images/enterprise/ftbq1l9oz8t9kwiqwgww'
        )
    })

    test('keeps a public ID that has no file extension', () => {
        assert.equal(getPublicID(`${BASE}q_auto/posthog.com/contents/images/hog`), 'posthog.com/contents/images/hog')
    })
})
