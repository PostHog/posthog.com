import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import React from 'react'
import type { ImageSource, Renderer } from 'takumi-js/node'
import { DocsOg, type DocsContributor } from '../../src/templates/OG/docs'
import { fitTitleFontSize, ogRenderLimit, renderOgJpeg, writeOgJpeg } from './takumi'

const require = createRequire(__filename)
const imagesDir = path.resolve(__dirname, '../../src/templates/OG/images')
const brandDir = path.resolve(__dirname, '../../static/brand')
const hogDir = path.dirname(require.resolve('@posthog/brand/hoggies/png'))

const readImage = (src: string, name: string): ImageSource => ({
    src,
    data: fs.readFileSync(path.join(imagesDir, name)),
})

const DEFAULT_HOG = 'wizard-hog'

// The product page character for each docs section. These are the same illustrations
// the product pages use, shipped as square PNGs in @posthog/brand.
const productHogs: { prefix: string; src: string; file: string }[] = [
    { prefix: '/docs/product-analytics', src: 'hog-product-analytics', file: 'chart-hog.png' },
    { prefix: '/docs/web-analytics', src: 'hog-web-analytics', file: 'cursor-hog.png' },
    { prefix: '/docs/session-replay', src: 'hog-session-replay', file: 'director.png' },
    { prefix: '/docs/replay-vision', src: 'hog-replay-vision', file: 'director.png' },
    { prefix: '/docs/feature-flags', src: 'hog-feature-flags', file: 'traffic-controller.png' },
    { prefix: '/docs/experiments', src: 'hog-experiments', file: 'experiment.png' },
    { prefix: '/docs/surveys', src: 'hog-surveys', file: 'survey.png' },
    { prefix: '/docs/error-tracking', src: 'hog-error-tracking', file: 'stop.png' },
    { prefix: '/docs/logs', src: 'hog-logs', file: 'magnifying-glass.png' },
    { prefix: '/docs/workflows', src: 'hog-workflows', file: 'workflows.png' },
    { prefix: '/docs/ai-observability', src: 'hog-ai-observability', file: 'research.png' },
    { prefix: '/docs/ai-evals', src: 'hog-ai-evals', file: 'research.png' },
    { prefix: '/docs/endpoints', src: 'hog-endpoints', file: 'doc-brown.png' },
    { prefix: '/docs/support', src: 'hog-support', file: 'lifeguard.png' },
]

// Product hogs that are not in the brand package.
const remoteProductHogs: { prefix: string; src: string; url: string }[] = [
    {
        prefix: '/docs/data-warehouse',
        src: 'hog-data-warehouse',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/f_png/posthog.com/contents/images/products/data-warehouse/warehouse-hog.png',
    },
    {
        prefix: '/docs/posthog-ai',
        src: 'hog-posthog-ai',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/f_png/ai_max_e80de99727.png',
    },
]

const hogByPrefix = [...productHogs, ...remoteProductHogs].sort((a, b) => b.prefix.length - a.prefix.length)

const docsImages: ImageSource[] = [
    readImage('grass', 'grass.jpg'),
    readImage(DEFAULT_HOG, 'wizard-hog.png'),
    ...productHogs.map((hog) => ({ src: hog.src, data: fs.readFileSync(path.join(hogDir, hog.file)) })),
    { src: 'logo', data: fs.readFileSync(path.join(brandDir, 'posthog-logo.svg')) },
]

const loadRemoteHogs = async (): Promise<ImageSource[]> =>
    Promise.all(
        remoteProductHogs.map(async (hog) => {
            const response = await fetch(hog.url)
            if (!response.ok) throw new Error(`Could not load the ${hog.src} image`)
            return { src: hog.src, data: Buffer.from(await response.arrayBuffer()) }
        })
    )

type MenuItem = {
    url: string
    breadcrumb?: { name: string; url?: string }[]
}

type DocsPost = {
    frontmatter: { title?: string }
    timeToRead?: number
    excerpt?: string
    fields?: {
        slug: string
        contributors?: { username?: string; avatar?: string }[]
    }
    parent?: { fields?: { lastUpdated?: string } }
}

const DOCS_TITLE_WIDTH = 640
const DOCS_TITLE_LINE_HEIGHT = 0.94
const DOCS_TITLE_MIN = 48

const docsTitleSize = async (renderer: Renderer, title: string) => {
    const column = { width: DOCS_TITLE_WIDTH, lineHeight: DOCS_TITLE_LINE_HEIGHT, min: DOCS_TITLE_MIN }
    return (
        (await fitTitleFontSize(renderer, title, { ...column, max: 92, maxLines: 1 })) ??
        (await fitTitleFontSize(renderer, title, { ...column, max: 52, maxLines: 2 })) ??
        DOCS_TITLE_MIN
    )
}

const matchesPrefix = (url: string, prefix: string) => url === prefix || url.startsWith(`${prefix}/`)

const hogSrcFor = (slug: string, menus: MenuItem[]) => {
    const menu = menus.find((item) => item.url === slug)
    const urls = [slug, ...(menu?.breadcrumb ?? []).flatMap((crumb) => (crumb.url ? [crumb.url] : [])).reverse()]
    for (const url of urls) {
        const normalized = url.split('?')[0].split('#')[0].replace(/\/$/, '')
        const match = hogByPrefix.find((hog) => matchesPrefix(normalized, hog.prefix))
        if (match) return match.src
    }
    return DEFAULT_HOG
}

export async function createDocsOgImages(renderer: Renderer, posts: DocsPost[], menus: MenuItem[], dir: string) {
    const images = [...docsImages, ...(await loadRemoteHogs())]
    await Promise.all(
        posts.map((post) =>
            ogRenderLimit(async () => {
                const { title } = post.frontmatter
                const { timeToRead, excerpt, fields, parent } = post
                const lastUpdated = parent?.fields?.lastUpdated
                if (!title || !timeToRead || !excerpt || !lastUpdated || !fields?.contributors) return

                const contributors: DocsContributor[] = fields.contributors.map((contributor) => ({
                    username: contributor.username || '',
                    avatar: contributor.avatar,
                }))
                const bytes = await renderOgJpeg(
                    renderer,
                    <DocsOg
                        title={title}
                        titleFontSize={await docsTitleSize(renderer, title)}
                        timeToRead={timeToRead}
                        excerpt={excerpt}
                        lastUpdated={lastUpdated}
                        contributors={contributors}
                        hog={hogSrcFor(fields.slug, menus)}
                    />,
                    images
                )
                writeOgJpeg(dir, fields.slug, bytes)
            })
        )
    )
}
