import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fs from 'fs'
import path from 'path'

const CONTENTS_DIR = path.resolve(process.cwd(), 'contents')
const PAGES_DIR = path.resolve(process.cwd(), 'src/pages')

const PROTECTED_PAGES = new Set([
    'index',
    'about',
    'careers',
    'faq',
    'display-options',
    '404',
    'admin',
    'questions',
])

function generatePageTsx(slug: string, title: string): string {
    const cleanTitle = (title || slug).replace(/'/g, "\\'")
    const componentName =
        slug
            .replace(/[^a-zA-Z0-9]/g, ' ')
            .split(' ')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join('') + 'Page'

    return `import { graphql } from 'gatsby'
import React from 'react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from '@mdx-js/react'
import { shortcodes } from '../mdxGlobalComponents'
import ReaderView from 'components/ReaderView'
import { SEO } from 'components/seo'

export default function ${componentName || 'DynamicPage'}({ data }: { data: any }) {
    const { mdx } = data || {}
    if (!mdx) return null

    return (
        <>
            <SEO title={mdx.frontmatter?.title || '${cleanTitle}'} />
            <ReaderView hideLeftSidebar>
                <div className="max-w-5xl mx-auto px-4 py-8">
                    <MDXProvider components={shortcodes}>
                        <MDXRenderer>{mdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
            </ReaderView>
        </>
    )
}

export const query = graphql\`
    {
        mdx(fields: { slug: { eq: "/${slug}" } }) {
            body
            frontmatter {
                title
            }
        }
    }
\`
`
}

interface PageFrontmatter {
    title?: string
    sidebar?: string
    showTitle?: boolean
    hideAnchor?: boolean
    description?: string
    [key: string]: any
}

function parseFrontmatterAndBody(raw: string): { frontmatter: PageFrontmatter; content: string } {
    const lines = raw.split('\n')
    if (lines[0]?.trim() !== '---') {
        return { frontmatter: {}, content: raw }
    }

    let endIdx = -1
    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '---') {
            endIdx = i
            break
        }
    }

    if (endIdx === -1) {
        return { frontmatter: {}, content: raw }
    }

    const yamlLines = lines.slice(1, endIdx)
    const content = lines.slice(endIdx + 1).join('\n')
    const frontmatter: Record<string, any> = {}

    for (let line of yamlLines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const colonIdx = trimmed.indexOf(':')
        if (colonIdx === -1) continue

        const key = trimmed.slice(0, colonIdx).trim()
        let val = trimmed.slice(colonIdx + 1).trim()

        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1)
        } else if (val === 'true') {
            val = true as any
        } else if (val === 'false') {
            val = false as any
        }

        frontmatter[key] = val
    }

    return { frontmatter, content }
}

function serializePage(fm: PageFrontmatter, content: string): string {
    const lines: string[] = ['---']

    if (fm.title) lines.push(`title: ${JSON.stringify(fm.title)}`)
    if (fm.sidebar) lines.push(`sidebar: ${JSON.stringify(fm.sidebar)}`)
    if (fm.showTitle !== undefined) lines.push(`showTitle: ${fm.showTitle}`)
    if (fm.hideAnchor !== undefined) lines.push(`hideAnchor: ${fm.hideAnchor}`)
    if (fm.description) lines.push(`description: ${JSON.stringify(fm.description)}`)

    // Preserve any extra frontmatter keys
    for (const [k, v] of Object.entries(fm)) {
        if (['title', 'sidebar', 'showTitle', 'hideAnchor', 'description'].includes(k)) continue
        if (typeof v === 'string') {
            lines.push(`${k}: ${JSON.stringify(v)}`)
        } else if (typeof v === 'boolean' || typeof v === 'number') {
            lines.push(`${k}: ${v}`)
        }
    }

    lines.push('---')
    lines.push('')
    lines.push(content.trim())
    lines.push('')

    return lines.join('\n')
}

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    try {
        if (!fs.existsSync(CONTENTS_DIR)) {
            return res.status(500).json({ error: `Contents directory not found: ${CONTENTS_DIR}` })
        }

        // GET: List all standalone pages or fetch a specific page
        if (req.method === 'GET') {
            const requestedFile = req.query.file as string | undefined

            if (requestedFile) {
                const safeName = path.basename(requestedFile)
                const filePath = path.join(CONTENTS_DIR, safeName)

                if (!fs.existsSync(filePath)) {
                    return res.status(404).json({ error: 'Page file not found' })
                }

                const raw = fs.readFileSync(filePath, 'utf8')
                const { frontmatter, content } = parseFrontmatterAndBody(raw)
                const slug = safeName.replace(/\.(md|mdx)$/, '')

                return res.json({
                    filename: safeName,
                    slug: `/${slug}`,
                    frontmatter,
                    content,
                })
            }

            // List standalone files in contents/
            const files = fs.readdirSync(CONTENTS_DIR).filter((f) => {
                return (
                    (f.endsWith('.md') || f.endsWith('.mdx')) &&
                    !f.startsWith('_') &&
                    fs.statSync(path.join(CONTENTS_DIR, f)).isFile()
                )
            })

            const pages: any[] = []

            for (const file of files) {
                try {
                    const filePath = path.join(CONTENTS_DIR, file)
                    const stat = fs.statSync(filePath)
                    const raw = fs.readFileSync(filePath, 'utf8')
                    const { frontmatter, content } = parseFrontmatterAndBody(raw)
                    const slug = file.replace(/\.(md|mdx)$/, '')

                    pages.push({
                        filename: file,
                        slug: `/${slug}`,
                        title: frontmatter.title || slug,
                        description: frontmatter.description || content.slice(0, 160).replace(/[#*`_\[\]]/g, ''),
                        size: stat.size,
                        updatedAt: stat.mtime.toISOString(),
                    })
                } catch (e) {
                    console.error(`Error reading ${file}:`, e)
                }
            }

            pages.sort((a, b) => a.slug.localeCompare(b.slug))

            return res.json({
                total: pages.length,
                pages,
            })
        }

        // POST: Create a new page
        if (req.method === 'POST') {
            const body = req.body || {}
            let filename = body.filename as string | undefined
            const slug = body.slug as string | undefined
            const title = body.title as string | undefined
            const content = body.content as string | undefined
            const frontmatter = body.frontmatter || {}

            if (!slug && !filename) {
                return res.status(400).json({ error: 'Either slug or filename is required' })
            }

            const cleanSlug = (slug || filename || 'untitled')
                .replace(/\.(md|mdx)$/, '')
                .replace(/^\//, '')
                .replace(/[^a-z0-9_-]/gi, '-')
                .toLowerCase()

            if (!filename) {
                filename = `${cleanSlug}.mdx`
            }

            const safeName = path.basename(filename)
            const targetPath = path.join(CONTENTS_DIR, safeName)

            if (fs.existsSync(targetPath)) {
                return res.status(409).json({ error: `File already exists: ${safeName}` })
            }

            const pageTitle = title || frontmatter.title || cleanSlug
            const fm: PageFrontmatter = {
                title: pageTitle,
                sidebar: frontmatter.sidebar || 'Docs',
                showTitle: frontmatter.showTitle ?? true,
                ...frontmatter,
            }

            const rawContent = serializePage(fm, content || `# ${fm.title}\n\nPage content goes here.`)
            fs.writeFileSync(targetPath, rawContent, 'utf8')

            // Automatically create src/pages/${cleanSlug}.tsx for live Gatsby routing
            if (!PROTECTED_PAGES.has(cleanSlug)) {
                const pageTsxPath = path.join(PAGES_DIR, `${cleanSlug}.tsx`)
                if (!fs.existsSync(pageTsxPath)) {
                    fs.writeFileSync(pageTsxPath, generatePageTsx(cleanSlug, pageTitle), 'utf8')
                }
            }

            return res.status(201).json({
                success: true,
                filename: safeName,
                slug: `/${cleanSlug}`,
            })
        }

        // PUT: Update an existing page
        if (req.method === 'PUT') {
            const body = req.body || {}
            const filename = body.filename as string | undefined

            if (!filename) {
                return res.status(400).json({ error: 'filename is required' })
            }

            const safeName = path.basename(filename)
            const targetPath = path.join(CONTENTS_DIR, safeName)

            if (!fs.existsSync(targetPath)) {
                return res.status(404).json({ error: `File not found: ${safeName}` })
            }

            const cleanSlug = safeName.replace(/\.(md|mdx)$/, '')
            const existingRaw = fs.readFileSync(targetPath, 'utf8')
            const existing = parseFrontmatterAndBody(existingRaw)

            const updatedTitle =
                body.title !== undefined ? body.title : (body.frontmatter?.title || existing.frontmatter.title)

            const updatedFm: PageFrontmatter = {
                ...existing.frontmatter,
                ...(body.frontmatter || {}),
                title: updatedTitle,
                description: body.description !== undefined ? body.description : existing.frontmatter.description,
            }

            const updatedContent = body.content !== undefined ? body.content : existing.content
            const newRaw = serializePage(updatedFm, updatedContent)

            fs.writeFileSync(targetPath, newRaw, 'utf8')

            // Ensure src/pages/${cleanSlug}.tsx exists for live Gatsby routing
            if (!PROTECTED_PAGES.has(cleanSlug)) {
                const pageTsxPath = path.join(PAGES_DIR, `${cleanSlug}.tsx`)
                if (!fs.existsSync(pageTsxPath)) {
                    fs.writeFileSync(pageTsxPath, generatePageTsx(cleanSlug, updatedTitle || cleanSlug), 'utf8')
                }
            }

            return res.json({
                success: true,
                filename: safeName,
                slug: `/${cleanSlug}`,
            })
        }

        // DELETE: Delete a page
        if (req.method === 'DELETE') {
            const requestedFile = (req.query.file as string) || (req.body?.filename as string)

            if (!requestedFile) {
                return res.status(400).json({ error: 'filename or file parameter is required' })
            }

            const safeName = path.basename(requestedFile)
            const targetPath = path.join(CONTENTS_DIR, safeName)

            if (!fs.existsSync(targetPath)) {
                return res.status(404).json({ error: `File not found: ${safeName}` })
            }

            // Guard against deleting home/index
            if (['index.mdx', 'home.mdx'].includes(safeName)) {
                return res.status(403).json({ error: `Cannot delete core site page: ${safeName}` })
            }

            const cleanSlug = safeName.replace(/\.(md|mdx)$/, '')

            fs.unlinkSync(targetPath)

            // Remove generated src/pages/${cleanSlug}.tsx if not a protected route
            if (!PROTECTED_PAGES.has(cleanSlug)) {
                const pageTsxPath = path.join(PAGES_DIR, `${cleanSlug}.tsx`)
                if (fs.existsSync(pageTsxPath)) {
                    try {
                        fs.unlinkSync(pageTsxPath)
                    } catch (e) {
                        console.error(`Failed to unlink ${pageTsxPath}:`, e)
                    }
                }
            }

            return res.json({ success: true, deleted: safeName })
        }

        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    } catch (err: any) {
        console.error('Error in admin-pages API:', err)
        return res.status(500).json({ error: err.message || 'Internal server error' })
    }
}
