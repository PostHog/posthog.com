import fs from 'fs'
import path from 'path'
import React from 'react'
import type { ImageSource, Renderer } from 'takumi-js/node'
import { BLOG_WORDMARK, BlogOg, type BlogAuthor } from '../../src/templates/OG/blog'
import { ogRenderLimit, renderOgJpeg, writeOgJpeg } from './takumi'

const DEFAULT_AVATAR = 'https://res.cloudinary.com/dmukukwp6/image/upload/contributor_posthog_e8c595ea3d.png'

const wordmark: ImageSource = {
    src: BLOG_WORDMARK,
    data: fs.readFileSync(path.resolve(__dirname, '../../src/templates/OG/images/posthog-wordmark-white.svg')),
}

type BlogAuthorNode = {
    name?: string
    role?: string
    profile?: { avatar?: { url?: string } }
}

type BlogPost = {
    fields: { slug: string }
    frontmatter: {
        title?: string
        featuredImage?: { publicURL?: string }
        authorData?: BlogAuthorNode[]
    }
}

const firstAuthor = (authors?: BlogAuthorNode[]): BlogAuthor | undefined => {
    const author = authors?.[0]
    if (!author?.name) return undefined
    return {
        name: author.name,
        role: author.role,
        image: author.profile?.avatar?.url || DEFAULT_AVATAR,
    }
}

export async function createBlogOgImages(renderer: Renderer, posts: BlogPost[], dir: string) {
    await Promise.all(
        posts.map((post) =>
            ogRenderLimit(async () => {
                const { title, authorData, featuredImage } = post.frontmatter
                const bytes = await renderOgJpeg(
                    renderer,
                    <BlogOg title={title || ''} image={featuredImage?.publicURL} author={firstAuthor(authorData)} />,
                    [wordmark]
                )
                writeOgJpeg(dir, post.fields.slug, bytes)
            })
        )
    )
}
