import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fs from 'fs'
import path from 'path'
import { getAuthorsList, saveAuthorRecord } from './admin-authors'

const BLOG_DIR = path.resolve(process.cwd(), 'contents/blog')

interface Frontmatter {
    date?: string
    title?: string
    rootPage?: string
    sidebar?: string
    showTitle?: boolean
    hideAnchor?: boolean
    author?: string[]
    featuredImage?: string
    featuredImageType?: string
    category?: string
    tags?: string[]
    description?: string
    [key: string]: any
}

function parseFrontmatterAndBody(raw: string): { frontmatter: Frontmatter; content: string } {
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

    let currentKey: string | null = null
    let isMultiline = false

    for (let line of yamlLines) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue

        // Check if this line is an indented continuation (multiline >- or |)
        if (isMultiline && currentKey && (line.startsWith(' ') || line.startsWith('\t'))) {
            const val = trimmed.replace(/^['"](.*)['"]$/, '$1')
            frontmatter[currentKey] = frontmatter[currentKey] ? `${frontmatter[currentKey]} ${val}` : val
            continue
        } else {
            isMultiline = false
        }

        // List item under an array key
        if (trimmed.startsWith('- ') && currentKey) {
            const val = trimmed.slice(2).trim().replace(/^['"](.*)['"]$/, '$1')
            if (!Array.isArray(frontmatter[currentKey])) {
                frontmatter[currentKey] = []
            }
            frontmatter[currentKey].push(val)
            continue
        }

        // Standard Key: value (key must start at column 0 or be alphanumeric)
        const match = line.match(/^([a-zA-Z0-9_]+)\s*:\s*(.*)$/)
        if (match) {
            const key = match[1].trim()
            let val = match[2].trim()

            if (val === '>-' || val === '>' || val === '|') {
                currentKey = key
                isMultiline = true
                frontmatter[key] = ''
                continue
            }

            if (!val) {
                currentKey = key
                frontmatter[key] = []
                continue
            }

            // Clean quotes and booleans
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                val = val.slice(1, -1)
            } else if (val === 'true') {
                frontmatter[key] = true
                currentKey = null
                continue
            } else if (val === 'false') {
                frontmatter[key] = false
                currentKey = null
                continue
            }

            frontmatter[key] = val
            currentKey = key
        }
    }

    return { frontmatter, content }
}

function serializeFrontmatter(fm: Frontmatter, content: string): string {
    const lines: string[] = ['---']

    if (fm.date) lines.push(`date: ${fm.date}`)
    if (fm.title) lines.push(`title: ${JSON.stringify(fm.title)}`)
    lines.push(`rootPage: /blog`)
    lines.push(`sidebar: Blog`)
    lines.push(`showTitle: ${fm.showTitle ?? true}`)
    lines.push(`hideAnchor: ${fm.hideAnchor ?? true}`)

    if (Array.isArray(fm.author) && fm.author.length > 0) {
        lines.push(`author:`)
        for (const a of fm.author) {
            lines.push(`  - ${a}`)
        }
    } else if (typeof fm.author === 'string' && fm.author) {
        lines.push(`author:`)
        lines.push(`  - ${fm.author}`)
    }

    if (fm.featuredImage) {
        lines.push(`featuredImage: ${JSON.stringify(fm.featuredImage)}`)
    }
    lines.push(`featuredImageType: ${fm.featuredImageType || 'full'}`)

    if (fm.category) {
        lines.push(`category: ${JSON.stringify(fm.category)}`)
    }

    if (Array.isArray(fm.tags) && fm.tags.length > 0) {
        lines.push(`tags:`)
        for (const t of fm.tags) {
            lines.push(`  - ${t}`)
        }
    }

    if (fm.description) {
        lines.push(`description: ${JSON.stringify(fm.description)}`)
    }

    lines.push('---')
    lines.push('')
    lines.push(content.trim())
    lines.push('')

    return lines.join('\n')
}

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
    // Enable CORS for local development
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    try {
        if (!fs.existsSync(BLOG_DIR)) {
            return res.status(500).json({ error: `Blog directory not found: ${BLOG_DIR}` })
        }

        // GET: List all posts or get a single post
        if (req.method === 'GET') {
            const requestedFile = req.query.file as string | undefined

            // Single post requested
            if (requestedFile) {
                // Prevent path traversal
                const safeName = path.basename(requestedFile)
                const filePath = path.join(BLOG_DIR, safeName)

                if (!fs.existsSync(filePath)) {
                    return res.status(404).json({ error: 'Post file not found' })
                }

                const raw = fs.readFileSync(filePath, 'utf8')
                const { frontmatter, content } = parseFrontmatterAndBody(raw)
                const slug = safeName.replace(/\.(md|mdx)$/, '')

                return res.json({
                    filename: safeName,
                    slug,
                    frontmatter,
                    content,
                })
            }

            // List all posts
            const files = fs.readdirSync(BLOG_DIR).filter((f) => {
                return (
                    (f.endsWith('.md') || f.endsWith('.mdx')) &&
                    !f.startsWith('_') &&
                    fs.statSync(path.join(BLOG_DIR, f)).isFile()
                )
            })

            const posts: any[] = []
            const categoriesSet = new Set<string>()
            const tagsSet = new Set<string>()

            for (const file of files) {
                try {
                    const filePath = path.join(BLOG_DIR, file)
                    const stat = fs.statSync(filePath)
                    const raw = fs.readFileSync(filePath, 'utf8')
                    const { frontmatter, content } = parseFrontmatterAndBody(raw)
                    const slug = file.replace(/\.(md|mdx)$/, '')

                    if (frontmatter.category) categoriesSet.add(frontmatter.category)
                    if (Array.isArray(frontmatter.tags)) {
                        frontmatter.tags.forEach((t) => tagsSet.add(t))
                    }

                    posts.push({
                        filename: file,
                        slug,
                        title: frontmatter.title || slug,
                        date: frontmatter.date || '',
                        category: frontmatter.category || '',
                        tags: frontmatter.tags || [],
                        author: frontmatter.author || [],
                        featuredImage: frontmatter.featuredImage || '',
                        description: frontmatter.description || content.slice(0, 160).replace(/[#*`_\[\]]/g, ''),
                        size: stat.size,
                        updatedAt: stat.mtime.toISOString(),
                    })
                } catch (e) {
                    console.error(`Error reading ${file}:`, e)
                }
            }

            // Sort newest first
            posts.sort((a, b) => {
                const dateA = a.date ? new Date(a.date).getTime() : 0
                const dateB = b.date ? new Date(b.date).getTime() : 0
                return dateB - dateA
            })

            const allAuthors = getAuthorsList().sort((a, b) => a.name.localeCompare(b.name))

            return res.json({
                total: posts.length,
                categories: Array.from(categoriesSet).sort(),
                tags: Array.from(tagsSet).sort(),
                authors: allAuthors,
                posts,
            })
        }

        // POST: Create a new post
        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
            let { title, slug, content = '', date, author, newAuthor, category, tags, featuredImage, description } = body || {}

            if (!title) {
                return res.status(400).json({ error: 'Title is required' })
            }

            // Save new author if provided
            if (newAuthor && (newAuthor.name || newAuthor.handle)) {
                const saved = saveAuthorRecord(newAuthor)
                if (!author || (Array.isArray(author) && author.length === 0)) {
                    author = [saved.handle]
                } else if (Array.isArray(author) && !author.includes(saved.handle)) {
                    author = [saved.handle, ...author]
                }
            }

            // Generate clean slug
            let finalSlug = slug
                ? slug
                      .toLowerCase()
                      .replace(/[^a-z0-9\-]/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '')
                : title
                      .toLowerCase()
                      .replace(/[^a-z0-9\-]/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '')

            if (!finalSlug) {
                finalSlug = `post-${Date.now()}`
            }

            const filename = `${finalSlug}.md`
            const filePath = path.join(BLOG_DIR, filename)

            if (fs.existsSync(filePath)) {
                return res.status(409).json({ error: `A post with slug "${finalSlug}" already exists.` })
            }

            const postDate = date || new Date().toISOString().slice(0, 10)
            const authorsList = Array.isArray(author) ? author : author ? [author] : ['james-hawkins']
            
            // Ensure all author handles are registered in authors.json
            const currentAuthors = getAuthorsList()
            for (const h of authorsList) {
                if (h && !currentAuthors.some((a) => a.handle.toLowerCase() === h.toLowerCase())) {
                    saveAuthorRecord({ handle: h, name: h })
                }
            }

            const tagsList = Array.isArray(tags)
                ? tags
                : typeof tags === 'string'
                ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
                : []

            const fileContent = serializeFrontmatter(
                {
                    date: postDate,
                    title,
                    author: authorsList,
                    category: category || 'PostHog news',
                    tags: tagsList,
                    featuredImage: featuredImage || '',
                    description: description || '',
                },
                content
            )

            fs.writeFileSync(filePath, fileContent, 'utf8')

            return res.status(201).json({
                success: true,
                filename,
                slug: finalSlug,
                url: `/blog/${finalSlug}`,
            })
        }

        // PUT: Update an existing post
        if (req.method === 'PUT') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
            let {
                filename: targetFilename,
                title,
                content = '',
                date,
                author,
                newAuthor,
                category,
                tags,
                featuredImage,
                description,
            } = body || {}

            if (!targetFilename) {
                return res.status(400).json({ error: 'Filename is required for updating' })
            }

            const safeName = path.basename(targetFilename)
            const filePath = path.join(BLOG_DIR, safeName)

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ error: 'Post file not found' })
            }

            // Save new author if provided
            if (newAuthor && (newAuthor.name || newAuthor.handle)) {
                const saved = saveAuthorRecord(newAuthor)
                if (!author || (Array.isArray(author) && author.length === 0)) {
                    author = [saved.handle]
                } else if (Array.isArray(author) && !author.includes(saved.handle)) {
                    author = [saved.handle, ...author]
                }
            }

            const rawExisting = fs.readFileSync(filePath, 'utf8')
            const { frontmatter: existingFm } = parseFrontmatterAndBody(rawExisting)

            const postDate = date || existingFm.date || new Date().toISOString().slice(0, 10)
            const authorsList = Array.isArray(author)
                ? author
                : author
                ? [author]
                : existingFm.author || ['james-hawkins']

            // Ensure all author handles are registered in authors.json
            const currentAuthors = getAuthorsList()
            for (const h of authorsList) {
                if (h && !currentAuthors.some((a) => a.handle.toLowerCase() === h.toLowerCase())) {
                    saveAuthorRecord({ handle: h, name: h })
                }
            }

            const tagsList = Array.isArray(tags)
                ? tags
                : typeof tags === 'string'
                ? tags.split(',').map((t: string) => t.trim()).filter(Boolean)
                : existingFm.tags || []

            const updatedFm: Frontmatter = {
                ...existingFm,
                date: postDate,
                title: title ?? existingFm.title,
                author: authorsList,
                category: category ?? existingFm.category,
                tags: tagsList,
                featuredImage: featuredImage !== undefined ? featuredImage : existingFm.featuredImage,
                description: description !== undefined ? description : existingFm.description,
            }

            const fileContent = serializeFrontmatter(updatedFm, content)
            fs.writeFileSync(filePath, fileContent, 'utf8')

            const slug = safeName.replace(/\.(md|mdx)$/, '')
            return res.json({
                success: true,
                filename: safeName,
                slug,
                url: `/blog/${slug}`,
            })
        }

        // DELETE: Delete a post
        if (req.method === 'DELETE') {
            const fileToDelete = req.query.file as string | undefined
            if (!fileToDelete) {
                return res.status(400).json({ error: 'Filename parameter "file" is required' })
            }

            const safeName = path.basename(fileToDelete)
            const filePath = path.join(BLOG_DIR, safeName)

            if (!fs.existsSync(filePath)) {
                return res.status(404).json({ error: 'Post file not found' })
            }

            fs.unlinkSync(filePath)
            return res.json({ success: true, message: `Deleted ${safeName}` })
        }

        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    } catch (err: any) {
        console.error('Error in admin-posts API:', err)
        return res.status(500).json({ error: err.message || 'Internal server error' })
    }
}
