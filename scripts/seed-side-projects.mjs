// One-off migration: push the bundled side projects seed (src/data/sideProjects.json) into
// the Squeak Strapi side-projects collection, skipping any entry whose title already exists.
//
// Usage:
//   SQUEAK_JWT=<moderator jwt> node scripts/seed-side-projects.mjs
//
// The JWT is a signed-in moderator's token (the `jwt` key in localStorage on posthog.com).
// SQUEAK_API_HOST overrides the target host if needed.

import { readFile } from 'node:fs/promises'

const API_HOST = process.env.SQUEAK_API_HOST || 'https://better-animal-d658c56969.strapiapp.com'
const JWT = process.env.SQUEAK_JWT

if (!JWT) {
    console.error('Set SQUEAK_JWT to a signed-in moderator JWT before running.')
    process.exit(1)
}

const seed = JSON.parse(await readFile(new URL('../src/data/sideProjects.json', import.meta.url), 'utf8'))

const existingTitles = new Set()
let page = 1
let pageCount = 1
while (page <= pageCount) {
    const response = await fetch(
        `${API_HOST}/api/side-projects?pagination%5Bpage%5D=${page}&pagination%5BpageSize%5D=100&fields%5B0%5D=title`
    )
    if (!response.ok) {
        console.error(`Failed to list existing projects: ${response.status} ${response.statusText}`)
        process.exit(1)
    }
    const { data, meta } = await response.json()
    for (const entry of data || []) {
        existingTitles.add(entry.attributes.title.trim().toLowerCase())
    }
    pageCount = meta?.pagination?.pageCount || 1
    page += 1
}

let created = 0
let skipped = 0
for (const project of seed) {
    if (existingTitles.has(project.title.trim().toLowerCase())) {
        skipped += 1
        continue
    }
    const { tags = [], ...fields } = project
    const response = await fetch(`${API_HOST}/api/side-projects`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JWT}`,
        },
        body: JSON.stringify({ data: { ...fields, tags } }),
    })
    if (!response.ok) {
        const body = await response.text()
        console.error(`Failed to create "${project.title}": ${response.status} ${body}`)
        process.exit(1)
    }
    created += 1
    console.log(`Created "${project.title}"`)
}

console.log(`Done: ${created} created, ${skipped} already existed.`)
