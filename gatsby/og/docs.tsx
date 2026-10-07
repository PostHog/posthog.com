import fs from 'fs'
import path from 'path'
import React from 'react'
import type { ImageSource, Renderer } from 'takumi-js/node'
import { DOCS_WORDMARK, DocsOg, type DocsContributor } from '../../src/templates/OG/docs'
import { ogRenderLimit, renderOgJpeg, writeOgJpeg } from './takumi'

const wordmark: ImageSource = {
    src: DOCS_WORDMARK,
    data: fs.readFileSync(path.resolve(__dirname, '../../src/templates/OG/images/posthog-wordmark-color.svg')),
}

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

const sectionName = (slug: string) => {
    if (slug.startsWith('/docs')) return 'Docs'
    if (slug.startsWith('/tutorials')) return 'Tutorials'
    return 'Handbook'
}

export async function createDocsOgImages(renderer: Renderer, posts: DocsPost[], menus: MenuItem[], dir: string) {
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
                const trail = menus.find((item) => item.url === fields.slug)?.breadcrumb || []
                const bytes = await renderOgJpeg(
                    renderer,
                    <DocsOg
                        title={title}
                        timeToRead={timeToRead}
                        excerpt={excerpt}
                        lastUpdated={lastUpdated}
                        breadcrumbs={[{ name: sectionName(fields.slug) }, ...trail]}
                        contributors={contributors}
                    />,
                    [wordmark]
                )
                writeOgJpeg(dir, fields.slug, bytes)
            })
        )
    )
}
