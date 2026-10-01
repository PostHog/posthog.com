'use strict'
/* eslint-disable @typescript-eslint/no-var-requires */
// Seeds /museum content into a squeak-strapi instance (Strapi v4) from the JSON in ./data.
//
// Run from the posthog.com root, pointing at a local squeak-strapi checkout that has the
// museum content types (PostHog/squeak-strapi, posthog/museum-artifacts-exhibits) and has
// been built with `yarn build`. It writes to whatever database that checkout's .env uses:
//   STRAPI_DIR=../squeak-strapi node scripts/museum-seed/seed.js
//
// Images are not uploaded here. They're already on Cloudinary (data/assets.json), so this
// creates Media Library entries that point at those Cloudinary URLs.
// Re-running is safe: records are matched on slug and skipped if they already exist.
const fs = require('fs')
const path = require('path')

const SEED = path.join(__dirname, 'data')
const STRAPI_DIR = path.resolve(process.env.STRAPI_DIR || '../squeak-strapi')
const read = (f) => JSON.parse(fs.readFileSync(path.join(SEED, f), 'utf8'))
const MIME = { webp: 'image/webp', mp4: 'video/mp4', png: 'image/png', jpg: 'image/jpeg', gif: 'image/gif' }

async function main() {
    if (!fs.existsSync(path.join(STRAPI_DIR, 'package.json')))
        throw new Error(`No squeak-strapi checkout at ${STRAPI_DIR}. Set STRAPI_DIR.`)
    process.chdir(STRAPI_DIR)
    const strapiFactory = require(require.resolve('@strapi/strapi', { paths: [STRAPI_DIR] }))
    const distDir = fs.existsSync(path.join(STRAPI_DIR, 'dist')) ? path.join(STRAPI_DIR, 'dist') : undefined
    const strapi = await strapiFactory({ appDir: STRAPI_DIR, distDir }).load()
    const es = strapi.entityService

    const assets = read('assets.json')
    // Media Library entry pointing at a file that is already on Cloudinary
    const upload = async (rel) => {
        if (!rel) return null
        const asset = assets[rel]
        if (!asset)
            throw new Error(
                `${rel} is not in assets.json. Upload it to Cloudinary and add it to data/assets.json first.`
            )
        const name = path.basename(rel)
        const existing = await strapi.db.query('plugin::upload.file').findOne({ where: { url: asset.url } })
        if (existing) return existing
        return strapi.db.query('plugin::upload.file').create({
            data: {
                name,
                alternativeText: name,
                hash: asset.public_id.replace(/\//g, '_'),
                ext: `.${asset.format}`,
                mime: MIME[asset.format] || `${asset.resource_type}/${asset.format}`,
                size: Math.round((asset.bytes / 1024) * 100) / 100,
                width: asset.width || null,
                height: asset.height || null,
                url: asset.url,
                provider: 'cloudinary',
                provider_metadata: { public_id: asset.public_id, resource_type: asset.resource_type },
                folderPath: '/',
            },
        })
    }
    const upsert = async (uid, slug, data) => {
        const [found] = await es.findMany(uid, { filters: { slug }, limit: 1 })
        return found || es.create(uid, { data })
    }

    const ids = { category: {}, type: {}, collection: {}, artifact: {} }
    for (const c of read('categories.json'))
        ids.category[c.slug] = (await upsert('api::museum-category.museum-category', c.slug, c)).id
    for (const t of read('types.json'))
        ids.type[t.slug] = (
            await upsert('api::museum-type.museum-type', t.slug, { ...t, category: ids.category[t.category] })
        ).id
    for (const c of read('collections.json'))
        ids.collection[c.slug] = (await upsert('api::museum-collection.museum-collection', c.slug, c)).id

    const artifacts = read('artifacts.json')
    const skipped = []
    for (const a of artifacts) {
        if (!a.date) {
            skipped.push(a.slug)
            continue
        }
        const hero = await upload(a.heroImage)
        const gallery = []
        for (const g of a.gallery) gallery.push((await upload(g)).id)
        const videos = []
        for (const v of a.videos) videos.push({ url: (await upload(v)).url })
        const saved = await upsert('api::museum-artifact.museum-artifact', a.slug, {
            title: a.title,
            slug: a.slug,
            date: a.date,
            datePrecision: a.datePrecision,
            plaque: a.plaque,
            context: a.context,
            curatorNotes: a.curatorNotes,
            links: a.links,
            videos: videos.length ? videos : null,
            heroImage: hero && hero.id,
            gallery,
            category: ids.category[a.category],
            type: a.type ? ids.type[a.type] : null,
            collections: a.collections.map((s) => ids.collection[s]),
        })
        ids.artifact[a.slug] = saved.id
        console.log('artifact', a.slug)
    }
    // Related links are stored on one artifact; the frontend shows them on both
    for (const a of artifacts) {
        const targets = a.relatedArtifacts.map((s) => ids.artifact[s]).filter(Boolean)
        if (ids.artifact[a.slug] && targets.length)
            await es.update('api::museum-artifact.museum-artifact', ids.artifact[a.slug], {
                data: { relatedArtifacts: targets },
            })
    }
    console.log(`Done: ${Object.keys(ids.artifact).length} artifacts.`)
    if (skipped.length) console.log(`Skipped ${skipped.length} with no date yet: ${skipped.join(', ')}`)
    await strapi.destroy()
    process.exit(0)
}
main().catch((e) => {
    console.error(e)
    process.exit(1)
})
