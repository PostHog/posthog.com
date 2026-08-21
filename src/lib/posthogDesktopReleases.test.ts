import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { getLatestDesktopReleaseUrl } from './posthogDesktopReleases.ts'

const VERSION = '0.60.360'
const RELEASE_URL = `https://github.com/PostHog/posthog/releases/tag/desktop-v${VERSION}`

describe('getLatestDesktopReleaseUrl', () => {
    test('reads the latest Desktop release URL from the release feed', async () => {
        const fetchImpl = async () => Response.json({ releases: [{ version: VERSION, htmlUrl: RELEASE_URL }] })
        assert.equal(await getLatestDesktopReleaseUrl(fetchImpl), RELEASE_URL)
    })

    test('rejects an invalid release feed', async () => {
        const fetchImpl = async () => Response.json({ releases: [] })
        await assert.rejects(getLatestDesktopReleaseUrl(fetchImpl), /no valid release/)
    })

    test('rejects release URLs outside the Desktop monorepo tags', async () => {
        const fetchImpl = async () =>
            Response.json({
                releases: [{ version: VERSION, htmlUrl: 'https://example.com/download' }],
            })
        await assert.rejects(getLatestDesktopReleaseUrl(fetchImpl), /no valid release/)
    })
})
