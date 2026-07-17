// Prefetches the PostHog OpenAPI schema while gatsby boots. The schema endpoint takes
// ~9s of server-side generation, which would otherwise stall "source and transform
// nodes" — starting the fetch before gatsby's compile/bootstrap phases hides most of
// that wait. gatsby/sourceNodes.ts reads the result (or falls back to fetching inline),
// keyed on the `.pending` marker so a crashed or failed prefetch never blocks the build.
import fs from 'fs'
import path from 'path'

const OUT = path.resolve(process.cwd(), '.api-spec-prefetch.json')
const PENDING = `${OUT}.pending`
const url = process.env.POSTHOG_OPEN_API_SPEC_URL || 'https://app.posthog.com/api/schema/'

try {
    fs.rmSync(OUT, { force: true })
    fs.writeFileSync(PENDING, JSON.stringify({ pid: process.pid, url }))
} catch {
    // If we can't even write the marker, the build just fetches inline.
}

try {
    const res = await fetch(url, { headers: { Accept: 'application/json' } })
    if (!res.ok) throw new Error(`status ${res.status}`)
    const text = await res.text()
    JSON.parse(text) // validate before publishing the file
    // The envelope records which URL the spec came from, so a build configured with a
    // different POSTHOG_OPEN_API_SPEC_URL never consumes a leftover file from this run.
    fs.writeFileSync(`${OUT}.tmp`, `{"url":${JSON.stringify(url)},"spec":${text}}`)
    fs.renameSync(`${OUT}.tmp`, OUT)
    console.log('[prefetch-api-spec] done')
} catch (e) {
    console.warn(`[prefetch-api-spec] failed, build will fetch inline: ${e.message}`)
} finally {
    try {
        fs.rmSync(PENDING, { force: true })
    } catch {
        // Stale markers expire by mtime in sourceNodes, so this is best-effort.
    }
}
