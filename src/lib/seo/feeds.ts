// The RSS feeds: /rss.xml (blog posts) and /changelog.rss (the last 50 shipped roadmap items). The
// endpoints in src/pages pass these options to @astrojs/rss. Each item's author is in <dc:creator>.
import type { RSSFeedItem, RSSOptions } from '@astrojs/rss'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { nodes } from '../../data-layer'
import { type ContentNode, excerpt, getContent } from '../../data-layer/content'
import type { RoadmapNode } from '../../data-layer/types'
import { stripFrontmatter } from '../../data-layer/utils'
import { authorsFor } from '../content/people'
import { siteMetadata } from '../head'
import { changelogDescription } from './changelog'

const { siteUrl } = siteMetadata

const NAMESPACES = {
    dc: 'http://purl.org/dc/elements/1.1/',
    atom: 'http://www.w3.org/2005/Atom',
}

const escapeXml = (value: string) =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const channelData = (feedUrl: string) =>
    `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>` +
    `<language>en</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`

const creator = (name?: string) => (name ? `<dc:creator>${escapeXml(name)}</dc:creator>` : undefined)

const IMAGE_TYPES: Record<string, string> = {
    gif: 'image/gif',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
    png: 'image/png',
    svg: 'image/svg+xml',
    webp: 'image/webp',
}

const imageType = (url: string) => IMAGE_TYPES[url.split('?')[0].split('.').pop()?.toLowerCase() ?? ''] ?? 'image/png'

const absolute = (url: string) => (url.startsWith('/') && !url.startsWith('//') ? `${siteUrl}${url}` : url)

// MDX syntax that CommonMark would print as text: import statements (which can span lines), one-line
// exports, and {/* comments */}. JSX elements are raw HTML to CommonMark, and `skipHtml` drops them.
const IMPORT_STATEMENT = /^import\s+(?:[\w$*{}\s,]+?\s+from\s+)?(['"])[^'"\n]+\1;?[ \t]*$/gm
const EXPORT_STATEMENT = /^export\s.*$/gm
const JSX_COMMENT = /\{\/\*[\s\S]*?\*\/\}/g

function mdxToMarkdown(rawBody: string): string {
    // Odd segments are fenced code blocks, which stay as written.
    return stripFrontmatter(rawBody)
        .split(/(^```[\s\S]*?^```)/m)
        .map((segment, index) =>
            index % 2
                ? segment
                : segment.replace(IMPORT_STATEMENT, '').replace(EXPORT_STATEMENT, '').replace(JSX_COMMENT, '')
        )
        .join('')
}

/** The post body as HTML, for `content:encoded`. Markdown is rendered; MDX components are left out. */
export function postHtml(rawBody: string): string {
    return renderToStaticMarkup(
        createElement(Markdown, {
            remarkPlugins: [remarkGfm],
            skipHtml: true,
            urlTransform: absolute,
            children: mdxToMarkdown(rawBody),
        })
    )
}

const postDate = (node: ContentNode) => (node.frontmatter.date ? new Date(node.frontmatter.date) : undefined)

/** /rss.xml: every blog post (frontmatter `rootPage: /blog`), newest first. */
export function blogFeed(): RSSOptions {
    const posts = getContent()
        .filter((node) => node.frontmatter.rootPage === '/blog')
        .sort((a, b) => (postDate(b)?.getTime() ?? 0) - (postDate(a)?.getTime() ?? 0))

    const items: RSSFeedItem[] = posts.map((node) => {
        const image = node.frontmatter.featuredImage?.publicURL as string | undefined
        const author = authorsFor([node.frontmatter.author].flat().filter(Boolean))[0]?.name
        return {
            title: node.frontmatter.title,
            description: excerpt(node, 150),
            pubDate: postDate(node),
            link: `${siteUrl}${node.fields.slug}`,
            content: postHtml(node.rawBody),
            customData: creator(author),
            ...(image ? { enclosure: { url: absolute(image), length: 0, type: imageType(image) } } : {}),
        }
    })

    return {
        title: "PostHog's RSS Feed",
        description: siteMetadata.description,
        site: siteUrl,
        trailingSlash: false,
        xmlns: { blog: `${siteUrl}/blog`, ...NAMESPACES },
        customData: channelData(`${siteUrl}/rss.xml`),
        items,
    }
}

/** /changelog.rss: the 50 most recent shipped roadmap items. */
export function changelogFeed(): RSSOptions {
    const roadmaps = nodes<RoadmapNode>('Roadmap')
        .filter((node) => node.complete === true && node.date)
        .sort((a, b) => new Date(b.date as string).getTime() - new Date(a.date as string).getTime())
        .slice(0, 50)

    const items: RSSFeedItem[] = roadmaps.map((node) => {
        const team = node.teams?.data?.[0]?.attributes?.name
        const topic = node.topic?.data?.attributes?.label
        const description = changelogDescription(node.description)
        const profile = node.profiles?.data?.[0]?.attributes
        const author = [profile?.firstName, profile?.lastName].filter(Boolean).join(' ')
        const media = node.media?.data?.attributes
        return {
            title: node.title,
            description,
            pubDate: new Date(node.date as string),
            link: `${siteUrl}/changelog?id=${node.strapiID}`,
            content: description,
            categories: [team && `${team} Team`, topic].filter((category): category is string => !!category),
            customData: `<guid isPermaLink="false">posthog-changelog-${node.strapiID}</guid>${creator(author) ?? ''}`,
            ...(media?.url
                ? { enclosure: { url: media.url, length: 0, type: media.mime || imageType(media.url) } }
                : {}),
        }
    })

    return {
        title: 'PostHog Changelog',
        description: 'New features, improvements, and fixes shipped in PostHog.',
        site: `${siteUrl}/changelog`,
        trailingSlash: false,
        xmlns: NAMESPACES,
        customData: channelData(`${siteUrl}/changelog.rss`),
        items,
    }
}
