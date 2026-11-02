import fs from 'fs'
import path from 'path'
import React from 'react'
import type { ImageSource, Renderer } from 'takumi-js/node'
import { CustomerOg } from '../../src/templates/OG/customer'
import { DOCS_WORDMARK } from '../../src/templates/OG/docs'
import { ogRenderLimit, renderOgJpeg, writeOgJpeg } from './takumi'

const wordmark: ImageSource = {
    src: DOCS_WORDMARK,
    data: fs.readFileSync(path.resolve(__dirname, '../../src/templates/OG/images/posthog-wordmark-color.svg')),
}

type CustomerPost = {
    fields: { slug: string }
    frontmatter: {
        title?: string
        featuredImage?: { publicURL?: string }
        logo?: { publicURL?: string }
    }
}

export async function createCustomerOgImages(renderer: Renderer, posts: CustomerPost[], dir: string) {
    await Promise.all(
        posts.map((post) =>
            ogRenderLimit(async () => {
                const { title, featuredImage, logo } = post.frontmatter
                const bytes = await renderOgJpeg(
                    renderer,
                    <CustomerOg title={title || ''} logo={logo?.publicURL} image={featuredImage?.publicURL} />,
                    [wordmark]
                )
                writeOgJpeg(dir, post.fields.slug, bytes)
            })
        )
    )
}
