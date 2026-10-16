import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fs from 'fs'
import path from 'path'

const AUTHORS_FILE = path.resolve(process.cwd(), 'src/data/authors.json')

export interface AuthorRecord {
    handle: string
    name: string
    role?: string
    link_type?: string
    link_url?: string
    profile_id?: number
    image?: string
    [key: string]: any
}

export function getAuthorsList(): AuthorRecord[] {
    try {
        if (fs.existsSync(AUTHORS_FILE)) {
            const raw = fs.readFileSync(AUTHORS_FILE, 'utf8')
            const list = JSON.parse(raw)
            if (Array.isArray(list)) {
                return list
            }
        }
    } catch (e) {
        console.error('Error reading authors.json:', e)
    }
    return []
}

export function saveAuthorRecord(author: { name: string; handle?: string; role?: string }): AuthorRecord {
    const list = getAuthorsList()
    
    let handle = (author.handle || author.name || '')
        .toLowerCase()
        .replace(/[^a-z0-9\-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')

    if (!handle) {
        handle = `author-${Date.now()}`
    }

    const name = author.name?.trim() || handle.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    const role = author.role?.trim() || 'Author'

    const existingIndex = list.findIndex((a) => a.handle.toLowerCase() === handle)

    if (existingIndex >= 0) {
        list[existingIndex] = {
            ...list[existingIndex],
            name,
            role,
        }
        fs.writeFileSync(AUTHORS_FILE, JSON.stringify(list, null, 4), 'utf8')
        return list[existingIndex]
    } else {
        const newRecord: AuthorRecord = {
            handle,
            name,
            role,
        }
        list.push(newRecord)
        fs.writeFileSync(AUTHORS_FILE, JSON.stringify(list, null, 4), 'utf8')
        return newRecord
    }
}

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    try {
        if (req.method === 'GET') {
            const list = getAuthorsList().sort((a, b) => a.name.localeCompare(b.name))
            return res.json({
                total: list.length,
                authors: list,
            })
        }

        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
            const { name, handle, role } = body || {}

            if (!name && !handle) {
                return res.status(400).json({ error: 'Name or handle is required' })
            }

            const record = saveAuthorRecord({ name, handle, role })
            const allAuthors = getAuthorsList().sort((a, b) => a.name.localeCompare(b.name))

            return res.json({
                success: true,
                author: record,
                authors: allAuthors,
            })
        }

        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    } catch (err: any) {
        console.error('Error in admin-authors API:', err)
        return res.status(500).json({ error: err.message || 'Internal server error' })
    }
}
