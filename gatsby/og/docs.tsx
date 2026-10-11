import fs from 'fs'
import path from 'path'
import React from 'react'
import type { ImageSource, Renderer } from 'takumi-js/node'
import { DocsOg, type DocsContributor } from '../../src/templates/OG/docs'
import { fitTitleFontSize, ogRenderLimit, renderOgJpeg, writeOgJpeg } from './takumi'

const imagesDir = path.resolve(__dirname, '../../src/templates/OG/images')
const brandDir = path.resolve(__dirname, '../../static/brand')

const readImage = (src: string, name: string): ImageSource => ({
    src,
    data: fs.readFileSync(path.join(imagesDir, name)),
})

const docsImages: ImageSource[] = [
    readImage('grass', 'grass.jpg'),
    readImage('wizard-hog', 'wizard-hog.png'),
    { src: 'logo', data: fs.readFileSync(path.join(brandDir, 'posthog-logo.svg')) },
]

type MenuItem = {
    url: string
    breadcrumb?: { name: string }[]
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

export async function createDocsOgImages(renderer: Renderer, posts: DocsPost[], _menus: MenuItem[], dir: string) {
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
                    />,
                    docsImages
                )
                writeOgJpeg(dir, fields.slug, bytes)
            })
        )
    )
}
