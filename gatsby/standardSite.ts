/**
 * Standard.site document sync.
 *
 * Publishes one `site.standard.document` record per blog post to PostHog's PDS,
 * so individual posts are discoverable/searchable across the AT Protocol network
 * (see https://standard.site). Runs at build time from gatsby/onPostBuild.ts.
 *
 * Companion pieces (see scripts/standard-site/README.md):
 *  - The publication record (one-time) already exists at PUBLICATION_URI below, verified via
 *    static/.well-known/site.standard.publication/blog.
 *  - The rendered <link rel="site.standard.document"> tag is emitted per post via
 *    src/templates/BlogPost.tsx -> src/components/seo.tsx, using the SAME deterministic
 *    rkey (the post's filename / last slug segment), so the tag and the record always agree.
 *
 * Behaviour:
 *  - Enabled when AWS_CODEPIPELINE === 'true' (production build) OR STANDARD_SITE_SYNC === 'true'.
 *  - Requires BSKY_APP_PASSWORD (a posthog.com Bluesky app password) for real writes.
 *  - STANDARD_SITE_DRY_RUN === 'true' computes records + writes the manifest but makes no PDS calls.
 *  - Changed-only: only writes records that are new or whose content changed.
 *  - Never throws in a way that fails the build — sync problems are logged, not fatal.
 */

import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'
import dayjs from 'dayjs'

const HANDLE = 'posthog.com'
const DID = 'did:plc:go7eemqz4y5nhonj4kg5w2p6'
const PUBLICATION_URI = `at://${DID}/site.standard.publication/blog`
const DOC_COLLECTION = 'site.standard.document'
const PLC_DIRECTORY = 'https://plc.directory'

// Lexicon limits (site.standard.document): title<=5000, description<=30000, tag item<=1280.
const TITLE_MAX = 5000
const DESCRIPTION_MAX = 30000
const TAG_MAX = 1280
// textContent has no documented max; cap generously to keep records well under PDS record-size limits.
const TEXT_CONTENT_MAX = 100_000

// Managed fields, in canonical order, used for change detection.
const MANAGED_FIELDS = ['$type', 'site', 'path', 'title', 'description', 'publishedAt', 'tags', 'textContent']

interface BlogPostNode {
    fields?: { slug?: string }
    excerpt?: string
    html?: string
    frontmatter?: {
        title?: string
        date?: string
        tags?: string[]
        seo?: { metaDescription?: string } | null
    }
}

interface StandardSiteDocument {
    $type: string
    site: string
    path: string
    title: string
    description?: string
    publishedAt: string
    tags?: string[]
    textContent?: string
}

// --- atproto client (dependency-free, uses global fetch) -------------------

async function xrpc(url: string, init?: RequestInit): Promise<any> {
    const res = await fetch(url, init)
    const text = await res.text()
    let body: any
    try {
        body = text ? JSON.parse(text) : {}
    } catch {
        body = { raw: text }
    }
    if (!res.ok) {
        throw new Error(`${init?.method || 'GET'} ${url} -> ${res.status}: ${JSON.stringify(body)}`)
    }
    return body
}

async function resolvePds(did: string): Promise<string> {
    const doc = await xrpc(`${PLC_DIRECTORY}/${encodeURIComponent(did)}`)
    const pds = (doc.service || []).find((s: any) => s.type === 'AtprotoPersonalDataServer')?.serviceEndpoint
    if (!pds) throw new Error(`No PDS endpoint in DID document for ${did}`)
    return pds
}

async function createSession(pds: string, identifier: string, password: string): Promise<string> {
    const session = await xrpc(`${pds}/xrpc/com.atproto.server.createSession`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
    })
    return session.accessJwt
}

async function listAllRecords(pds: string, jwt: string): Promise<Map<string, any>> {
    const byRkey = new Map<string, any>()
    let cursor: string | undefined
    do {
        const params = new URLSearchParams({ repo: DID, collection: DOC_COLLECTION, limit: '100' })
        if (cursor) params.set('cursor', cursor)
        const page = await xrpc(`${pds}/xrpc/com.atproto.repo.listRecords?${params}`, {
            headers: { authorization: `Bearer ${jwt}` },
        })
        for (const rec of page.records || []) {
            const rkey = rec.uri?.split('/').pop()
            if (rkey) byRkey.set(rkey, rec.value)
        }
        cursor = page.cursor
    } while (cursor)
    return byRkey
}

async function putRecord(pds: string, jwt: string, rkey: string, record: StandardSiteDocument): Promise<void> {
    await xrpc(`${pds}/xrpc/com.atproto.repo.putRecord`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${jwt}` },
        body: JSON.stringify({ repo: DID, collection: DOC_COLLECTION, rkey, record, validate: false }),
    })
}

async function deleteRecord(pds: string, jwt: string, rkey: string): Promise<void> {
    await xrpc(`${pds}/xrpc/com.atproto.repo.deleteRecord`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${jwt}` },
        body: JSON.stringify({ repo: DID, collection: DOC_COLLECTION, rkey }),
    })
}

// --- record building -------------------------------------------------------

// Blog slug is always /blog/<filename> (no frontmatter overrides), so the rkey
// is just the last path segment — identical to what BlogPost.tsx renders.
export function rkeyFromSlug(slug: string): string {
    return slug.replace(/^\/blog\//, '').replace(/\/$/, '')
}

export function htmlToText(html?: string): string {
    if (!html) return ''
    try {
        const { document } = new JSDOM(html).window
        const text = document.body?.textContent || ''
        return text.replace(/\s+/g, ' ').trim().slice(0, TEXT_CONTENT_MAX)
    } catch {
        return ''
    }
}

export function buildRecord(node: BlogPostNode): { rkey: string; record: StandardSiteDocument } | null {
    const slug = node.fields?.slug
    const title = node.frontmatter?.title
    const date = node.frontmatter?.date
    if (!slug || !title || !date) return null

    const rkey = rkeyFromSlug(slug)
    if (!rkey) return null

    const description = (node.frontmatter?.seo?.metaDescription || node.excerpt || '').slice(0, DESCRIPTION_MAX)
    const tags = (node.frontmatter?.tags || [])
        .filter((t): t is string => typeof t === 'string' && t.length > 0)
        .map((t) => t.slice(0, TAG_MAX))
    const textContent = htmlToText(node.html)

    const record: StandardSiteDocument = {
        $type: DOC_COLLECTION,
        site: PUBLICATION_URI,
        path: `/${rkey}`, // appended to publication url -> https://posthog.com/blog/<rkey>
        title: title.slice(0, TITLE_MAX),
        publishedAt: toPublishedAt(String(date)),
    }
    if (description) record.description = description
    if (tags.length) record.tags = tags
    if (textContent) record.textContent = textContent

    return { rkey, record }
}

// Frontmatter dates are usually date-only (YYYY-MM-DD). Interpret those as UTC midnight so the
// timestamp is stable regardless of build-machine timezone (dayjs(date) would use local time).
function toPublishedAt(date: string): string {
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return `${date}T00:00:00.000Z`
    const d = dayjs(date)
    return d.isValid() ? d.toISOString() : date
}

// Canonical string of the managed fields, for change detection.
export function canonical(value: any): string {
    const picked: Record<string, any> = {}
    for (const key of MANAGED_FIELDS) {
        if (value?.[key] !== undefined) picked[key] = value[key]
    }
    return JSON.stringify(picked)
}

// --- orchestration ---------------------------------------------------------

const POSTS_QUERY = `
    query {
        allMdx(
            filter: {
                fields: { slug: { regex: "/^/blog//" } }
                isFuture: { eq: false }
                frontmatter: { date: { ne: null } }
            }
        ) {
            nodes {
                fields {
                    slug
                }
                excerpt(pruneLength: 250)
                html
                frontmatter {
                    title
                    date
                    tags
                    seo {
                        metaDescription
                    }
                }
            }
        }
    }
`

function writeManifest(records: Array<{ rkey: string; record: StandardSiteDocument }>): void {
    try {
        const manifest = records.map(({ rkey, record }) => ({
            rkey,
            uri: `at://${DID}/${DOC_COLLECTION}/${rkey}`,
            path: record.path,
            title: record.title,
            publishedAt: record.publishedAt,
            tags: record.tags || [],
            descriptionLength: record.description?.length || 0,
            textContentLength: record.textContent?.length || 0,
        }))
        const outPath = path.resolve(__dirname, '../public/standard-site-documents.json')
        fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2))
        console.log(`[standard.site] Wrote manifest: ${outPath} (${manifest.length} documents)`)
    } catch (err) {
        console.error('[standard.site] Failed to write manifest:', (err as Error).message)
    }
}

export async function syncStandardSiteDocuments(graphql: any): Promise<void> {
    const enabled = process.env.AWS_CODEPIPELINE === 'true' || process.env.STANDARD_SITE_SYNC === 'true'
    if (!enabled) return

    const dryRun = process.env.STANDARD_SITE_DRY_RUN === 'true'
    const password = process.env.BSKY_APP_PASSWORD

    if (!dryRun && !password) {
        console.warn('[standard.site] BSKY_APP_PASSWORD not set — skipping document sync (no-op).')
        return
    }

    try {
        const result = await graphql(POSTS_QUERY)
        if (result.errors) {
            console.error('[standard.site] GraphQL query failed:', result.errors)
            return
        }
        const nodes: BlogPostNode[] = result.data?.allMdx?.nodes || []
        const desired = nodes.map(buildRecord).filter((r): r is { rkey: string; record: StandardSiteDocument } => !!r)
        console.log(`[standard.site] ${desired.length} blog documents computed from ${nodes.length} posts.`)

        writeManifest(desired)

        if (dryRun) {
            console.log('[standard.site] Dry run — no records written.')
            return
        }

        const pds = await resolvePds(DID)
        const jwt = await createSession(pds, HANDLE, password as string)
        const existing = await listAllRecords(pds, jwt)

        let created = 0
        let updated = 0
        let unchanged = 0
        for (const { rkey, record } of desired) {
            const prev = existing.get(rkey)
            if (!prev) {
                await putRecord(pds, jwt, rkey, record)
                created++
            } else if (canonical(prev) !== canonical(record)) {
                await putRecord(pds, jwt, rkey, record)
                updated++
            } else {
                unchanged++
            }
            if (created + updated > 0 && (created + updated) % 50 === 0) {
                console.log(`[standard.site] …${created + updated} writes so far`)
            }
        }

        // Orphan cleanup, guarded against mass-deletion from a partial/broken query.
        const desiredRkeys = new Set(desired.map((d) => d.rkey))
        const orphans = [...existing.keys()].filter((rkey) => !desiredRkeys.has(rkey))
        let deleted = 0
        if (orphans.length) {
            if (desired.length >= existing.size * 0.8) {
                for (const rkey of orphans) {
                    await deleteRecord(pds, jwt, rkey)
                    deleted++
                }
            } else {
                console.warn(
                    `[standard.site] Skipping deletion of ${orphans.length} orphan(s) — desired (${desired.length}) is <80% of existing (${existing.size}). Possible partial query.`
                )
            }
        }

        console.log(
            `[standard.site] Sync complete: ${created} created, ${updated} updated, ${unchanged} unchanged, ${deleted} deleted.`
        )
    } catch (err) {
        // Never fail the build over a sync hiccup.
        console.error('[standard.site] Document sync error (non-fatal):', (err as Error).message)
    }
}
