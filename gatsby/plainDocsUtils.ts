import path from 'path'
import fs from 'fs'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { compiler } from 'markdown-to-jsx'

/**
 * Plain docs portal — "for agents or boring humans".
 *
 * Renders a minimal, black-and-white HTML page for every docs page, built from the
 * SAME stripped markdown that `generateRawMarkdownPages` already writes to
 * `public/<slug>.md`. Because we start from that cleaned markdown (chrome, sidebars,
 * TOC and survey already removed by the turndown pass), the output is genuinely plain
 * with zero coupling to the site's OS-desktop React runtime.
 *
 * Output: `public/docs/plain/<slug>/index.html` for each `/docs/...` page, plus an
 * index at `public/docs/plain/index.html`. Served statically by Gatsby/Vercel, no
 * client JS. Run from `onPostBuild`, immediately after the `.md` files are generated.
 */

type DocPage = { fields: { slug: string }; frontmatter: { title: string } }

const escapeHtml = (value: string): string =>
    value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// Deliberately minimal: a single readable column, system fonts, black on white.
// No theme variables, no dark mode — this is the "boring" portal on purpose.
const PLAIN_CSS = `
:root { color-scheme: light; }
* { box-sizing: border-box; }
body {
    margin: 0;
    background: #fff;
    color: #111;
    font: 16px/1.6 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.plain-container { max-width: 720px; margin: 0 auto; padding: 2rem 1.25rem 4rem; }
.plain-nav {
    font-size: 0.8125rem;
    padding-bottom: 1rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid #ddd;
}
.plain-nav a { color: #111; margin-right: 1rem; }
.plain-content h1 { font-size: 1.9rem; line-height: 1.2; margin: 0 0 1rem; }
.plain-content h2 { font-size: 1.4rem; margin: 2rem 0 0.75rem; }
.plain-content h3 { font-size: 1.15rem; margin: 1.75rem 0 0.5rem; }
.plain-content h4, .plain-content h5, .plain-content h6 { font-size: 1rem; margin: 1.5rem 0 0.5rem; }
.plain-content p, .plain-content ul, .plain-content ol { margin: 0 0 1rem; }
.plain-content li { margin: 0.25rem 0; }
.plain-content a { color: #111; text-decoration: underline; }
.plain-content img { max-width: 100%; height: auto; border: 1px solid #ddd; }
.plain-content code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.875em;
    background: #f4f4f4;
    border: 1px solid #e2e2e2;
    border-radius: 3px;
    padding: 0.1em 0.3em;
}
.plain-content pre {
    background: #f6f6f6;
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    padding: 1rem;
    overflow-x: auto;
}
.plain-content pre code { background: none; border: 0; padding: 0; font-size: 0.85rem; }
.plain-content blockquote {
    margin: 0 0 1rem;
    padding-left: 1rem;
    border-left: 3px solid #ccc;
    color: #444;
}
.plain-content table { border-collapse: collapse; width: 100%; margin: 0 0 1rem; display: block; overflow-x: auto; }
.plain-content th, .plain-content td { border: 1px solid #ccc; padding: 0.4rem 0.6rem; text-align: left; }
.plain-content hr { border: 0; border-top: 1px solid #ddd; margin: 2rem 0; }
.plain-footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #ddd; font-size: 0.8125rem; color: #555; }
.plain-index ul { list-style: none; padding: 0; }
.plain-index li { margin: 0.35rem 0; }
`

// Turndown keeps the ReaderView footer (feedback prompt, community questions) in the
// generated markdown. Those are chrome, not content — trim from the first such marker.
const stripTrailingChrome = (markdown: string): string => {
    const markers = [
        /\n#{2,3}\s*Community questions/i,
        /\n#{2,3}\s*Was this page useful\?/i,
        /\nWas this page useful\?/i,
    ]
    let cut = markdown.length
    for (const marker of markers) {
        const match = markdown.match(marker)
        if (match && typeof match.index === 'number' && match.index < cut) {
            cut = match.index
        }
    }
    return markdown.slice(0, cut).trim()
}

// Keep navigation inside the portal: rewrite internal `.md` links so `/docs/*` links
// point at their plain counterpart, and any other `.md` link points at the styled page.
const rewriteLinks = (html: string): string =>
    html.replace(/href="(\/[^"#]*?)\.md(#[^"]*)?"/g, (_match, pathPart: string, hash?: string) => {
        const anchor = hash || ''
        if (pathPart === '/docs') return `href="/docs/plain${anchor}"`
        if (pathPart.startsWith('/docs/')) return `href="/docs/plain${pathPart.slice('/docs'.length)}${anchor}"`
        // Non-docs markdown link → send boring humans to the normal styled page.
        return `href="${pathPart}${anchor}"`
    })

const plainSlugFor = (slug: string): string =>
    slug === '/docs' ? '/docs/plain' : `/docs/plain${slug.slice('/docs'.length)}`

const pageShell = ({
    title,
    canonicalSlug,
    bodyHtml,
    isIndex,
}: {
    title: string
    canonicalSlug: string
    bodyHtml: string
    isIndex: boolean
}): string => {
    const mdUrl = `${canonicalSlug}.md`
    const chatgpt = `https://chatgpt.com/?q=${encodeURIComponent(
        `Read from https://posthog.com${mdUrl} so I can ask questions about it`
    )}`
    const claude = `https://claude.ai/new?q=${encodeURIComponent(
        `Read from https://posthog.com${mdUrl} so I can ask questions about it`
    )}`

    const nav = isIndex
        ? `<a href="/docs">Styled docs</a><a href="/llms.txt">llms.txt</a>`
        : `<a href="${canonicalSlug}">Styled version</a>` +
          `<a href="${mdUrl}">Markdown</a>` +
          `<a href="${chatgpt}" rel="nofollow">Open in ChatGPT</a>` +
          `<a href="${claude}" rel="nofollow">Open in Claude</a>` +
          `<a href="/docs/plain">All plain docs</a>`

    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escapeHtml(title)} - Plain docs - PostHog</title>
<link rel="canonical" href="https://posthog.com${canonicalSlug}" />
<style>${PLAIN_CSS}</style>
</head>
<body>
<div class="plain-container">
<nav class="plain-nav">${nav}</nav>
<main class="plain-content ${isIndex ? 'plain-index' : ''}">
${bodyHtml}
</main>
<footer class="plain-footer">
Plain version of the PostHog docs — no styling, no scripts. <a href="${
        isIndex ? '/docs' : canonicalSlug
    }">View the full styled version</a>.
</footer>
</div>
</body>
</html>
`
}

const renderMarkdownToHtml = (markdown: string): string | null => {
    try {
        const element = compiler(markdown, { wrapper: React.Fragment, forceWrapper: true })
        return rewriteLinks(renderToStaticMarkup(element))
    } catch (error) {
        return null
    }
}

export const generatePlainDocsPages = (docsPages: DocPage[]) => {
    console.log('Generating plain docs pages...')
    const publicPath = path.resolve(__dirname, '../public')

    // Docs only (the incoming list may include handbook/blog when this helper is reused).
    const docsOnly = docsPages.filter((page) => page.fields.slug === '/docs' || page.fields.slug.startsWith('/docs/'))

    const generated: DocPage[] = []

    for (const page of docsOnly) {
        const { slug } = page.fields
        const mdPath = path.join(publicPath, `${slug}.md`)
        if (!fs.existsSync(mdPath)) {
            continue
        }

        const markdown = stripTrailingChrome(fs.readFileSync(mdPath, 'utf8'))
        const bodyHtml = renderMarkdownToHtml(markdown)
        if (!bodyHtml) {
            continue
        }

        const outputPath = path.join(publicPath, plainSlugFor(slug), 'index.html')
        fs.mkdirSync(path.dirname(outputPath), { recursive: true })
        fs.writeFileSync(
            outputPath,
            pageShell({
                title: page.frontmatter.title || 'Untitled',
                canonicalSlug: slug,
                bodyHtml,
                isIndex: false,
            }),
            'utf8'
        )
        generated.push(page)
    }

    // Landing page: a plain index of everything in the portal, grouped by section.
    const bySection = new Map<string, DocPage[]>()
    for (const page of generated) {
        const segments = page.fields.slug.split('/').filter(Boolean) // ['docs', '<section>', ...]
        const section = segments.length > 1 ? segments[1] : 'overview'
        if (!bySection.has(section)) bySection.set(section, [])
        bySection.get(section)!.push(page)
    }

    const sectionTitle = (section: string): string =>
        section
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')

    const indexBody =
        `<h1>PostHog docs — plain version</h1>` +
        `<p>Every docs page, rendered as a plain black-and-white HTML page with no styling or scripts — for agents or boring humans. ` +
        `Every page is also available as raw Markdown (append <code>.md</code> to any docs URL) and indexed in <a href="/llms.txt">llms.txt</a>.</p>` +
        Array.from(bySection.keys())
            .sort((a, b) => a.localeCompare(b))
            .map((section) => {
                const items = bySection
                    .get(section)!
                    .sort((a, b) => (a.frontmatter.title || '').localeCompare(b.frontmatter.title || ''))
                    .map(
                        (page) =>
                            `<li><a href="${plainSlugFor(page.fields.slug)}">${escapeHtml(
                                page.frontmatter.title || page.fields.slug
                            )}</a></li>`
                    )
                    .join('')
                return `<h2>${escapeHtml(sectionTitle(section))}</h2><ul>${items}</ul>`
            })
            .join('')

    const indexPath = path.join(publicPath, 'docs', 'plain', 'index.html')
    fs.mkdirSync(path.dirname(indexPath), { recursive: true })
    fs.writeFileSync(
        indexPath,
        pageShell({ title: 'Plain docs', canonicalSlug: '/docs', bodyHtml: indexBody, isIndex: true }),
        'utf8'
    )

    console.log(`✅ Generated ${generated.length} plain docs pages in /docs/plain/`)
}
