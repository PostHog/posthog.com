/**
 * One-time import of docs links into the Strapi CTA field for changelog entries.
 *
 * For each completed roadmap (changelog) entry that has no CTA, this script
 * finds the first /docs link in the entry's own description and writes it to
 * the entry's CTA field as "Read the docs". It does not touch entries that
 * already have a CTA, and it does not import the generic topic fallbacks —
 * those stay derived at render time (see src/components/Changelog/docsLinks.ts).
 *
 * Usage:
 *   npx --yes tsx@4.20.6 scripts/import-changelog-docs-ctas.ts           # dry run: list planned writes
 *   STRAPI_TOKEN=... npx --yes tsx@4.20.6 scripts/import-changelog-docs-ctas.ts --write
 *
 * Reads use the public API (STRAPI_API_HOST or GATSBY_SQUEAK_API_HOST).
 * Writes require STRAPI_TOKEN with update permission on the roadmap type.
 */
import path from 'path'
import dotenv from 'dotenv'
import qs from 'qs'
import { getDescriptionDocsPath } from '../src/components/Changelog/docsLinks'

dotenv.config({ path: path.resolve(process.cwd(), '.env.production') })
dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const apiHost = process.env.STRAPI_API_HOST || process.env.GATSBY_SQUEAK_API_HOST
const write = process.argv.includes('--write')

type RoadmapEntry = {
    id: number
    attributes: {
        title?: string
        description?: string
        dateCompleted?: string
        projectedCompletion?: string
        cta?: { label?: string; url?: string }
    }
}

const fetchCompletedRoadmaps = async (): Promise<RoadmapEntry[]> => {
    const entries: RoadmapEntry[] = []
    let page = 1
    let pageCount = 1
    while (page <= pageCount) {
        const query = qs.stringify(
            {
                pagination: { page, pageSize: 100 },
                filters: { complete: { $eq: true } },
                populate: { cta: true, topic: true },
            },
            { encodeValuesOnly: true }
        )
        const res = await fetch(`${apiHost}/api/roadmaps?${query}`)
        if (!res.ok) throw new Error(`Failed to fetch roadmaps (page ${page}): ${res.status}`)
        const { data, meta } = await res.json()
        entries.push(...(data || []))
        pageCount = meta?.pagination?.pageCount || page
        page++
    }
    return entries
}

const updateRoadmapCta = async (id: number, url: string) => {
    const res = await fetch(`${apiHost}/api/roadmaps/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ data: { cta: { label: 'Read the docs', url } } }),
        headers: {
            Authorization: `Bearer ${process.env.STRAPI_TOKEN}`,
            'content-type': 'application/json',
        },
    })
    const { error } = await res.json()
    if (error) throw new Error(JSON.stringify(error))
}

const main = async () => {
    if (!apiHost) throw new Error('Set STRAPI_API_HOST or GATSBY_SQUEAK_API_HOST')
    if (write && !process.env.STRAPI_TOKEN) throw new Error('--write requires STRAPI_TOKEN')

    const entries = await fetchCompletedRoadmaps()
    const changelogEntries = entries.filter(
        ({ attributes }) => attributes.dateCompleted || attributes.projectedCompletion
    )
    const toImport = changelogEntries
        .map((entry) => ({ entry, docsPath: getDescriptionDocsPath(entry.attributes.description) }))
        .filter(({ entry, docsPath }) => docsPath && !entry.attributes.cta?.url)

    console.log(`${changelogEntries.length} changelog entries, ${toImport.length} with an empty CTA and a docs link`)

    let failures = 0
    for (const { entry, docsPath } of toImport) {
        if (write) {
            try {
                await updateRoadmapCta(entry.id, docsPath as string)
                console.log(`updated ${entry.id}: ${entry.attributes.title} -> ${docsPath}`)
            } catch (err) {
                failures++
                console.error(`failed ${entry.id}: ${entry.attributes.title}`, err)
            }
        } else {
            console.log(`would update ${entry.id}: ${entry.attributes.title} -> ${docsPath}`)
        }
    }

    if (!write) console.log('Dry run — pass --write with STRAPI_TOKEN set to apply')
    if (failures) process.exit(1)
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})
