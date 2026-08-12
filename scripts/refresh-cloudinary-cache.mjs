// Refreshes .cloudinary-resources.json — the Cloudinary metadata cache that preview
// builds restore to skip the ~140s onPreInit crawl (see gatsby/onCreateNode.ts).
//
// This is a dependency-free replacement for running a full Gatsby build in
// .github/workflows/cache-warmup.yml: it performs the same paginated crawl of the
// Cloudinary resource list and writes the same public_id → resource map.
import fs from 'fs'
import path from 'path'

const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const OUT = path.join(repoRoot, '.cloudinary-resources.json')

// Overridable so tests can point the crawl at a mock server.
const apiBase = process.env.CLOUDINARY_API_BASE || 'https://api.cloudinary.com'

function readCloudNameFromEnvFile() {
    try {
        const envFile = fs.readFileSync(path.join(repoRoot, '.env.production'), 'utf-8')
        const match = envFile.match(/^GATSBY_CLOUDINARY_CLOUD_NAME=(.+)$/m)
        return match?.[1]?.trim()
    } catch {
        return undefined
    }
}

const cloudName = process.env.GATSBY_CLOUDINARY_CLOUD_NAME || readCloudNameFromEnvFile()
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudName || !apiKey || !apiSecret) {
    console.error(
        'Missing Cloudinary configuration (GATSBY_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)'
    )
    process.exit(1)
}

const auth = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`

const cache = {}
let nextCursor = null
let pages = 0

do {
    const url = `${apiBase}/v1_1/${cloudName}/resources/image?type=upload&max_results=500${
        nextCursor ? `&next_cursor=${nextCursor}` : ''
    }`
    const res = await fetch(url, { headers: { Authorization: auth }, signal: AbortSignal.timeout(60_000) })
    if (!res.ok) {
        console.error(`Cloudinary request failed (${res.status}): ${await res.text()}`)
        process.exit(1)
    }
    const { resources, next_cursor } = await res.json()
    if (!Array.isArray(resources)) {
        console.error('Unexpected Cloudinary response: no resources array')
        process.exit(1)
    }
    resources.forEach((resource) => {
        cache[resource.public_id] = resource
    })
    nextCursor = next_cursor
    pages++
} while (nextCursor)

// Same format gatsby/onCreateNode.ts writes and reads (public_id → resource map).
fs.writeFileSync(OUT, JSON.stringify(cache))
console.log(`Wrote ${Object.keys(cache).length} Cloudinary resources (${pages} pages) to ${OUT}`)
