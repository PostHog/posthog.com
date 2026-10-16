import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fs from 'fs'
import path from 'path'

const COMMENTS_FILE = path.resolve(process.cwd(), 'src/data/comments.json')

export interface CommentRecord {
    id: string
    postSlug: string
    parentId?: string | null
    content: string
    createdAt: string
    authorType: 'user' | 'admin' | 'guest'
    userId?: string
    authorName: string
    authorEmail: string
    notifyReplies: boolean
    avatar?: string
    status: 'approved' | 'pending' | 'spam'
}

function normalizeSlug(slug: string): string {
    if (!slug) return ''
    return slug
        .replace(/^\/blog\//, '')
        .replace(/^\//, '')
        .replace(/\/$/, '')
        .trim()
}

export function getCommentsList(): CommentRecord[] {
    try {
        if (fs.existsSync(COMMENTS_FILE)) {
            const raw = fs.readFileSync(COMMENTS_FILE, 'utf8')
            const list = JSON.parse(raw)
            if (Array.isArray(list)) return list
        }
    } catch (e) {
        console.error('Error reading comments.json:', e)
    }
    return []
}

export function saveCommentsList(comments: CommentRecord[]) {
    try {
        fs.writeFileSync(COMMENTS_FILE, JSON.stringify(comments, null, 4), 'utf8')
    } catch (e) {
        console.error('Error saving comments.json:', e)
    }
}

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    try {
        const comments = getCommentsList()
        const action = (req.query.action as string) || ''
        const rawSlug = (req.query.postSlug as string) || (req.query.slug as string) || ''
        const postSlug = normalizeSlug(rawSlug)

        // GET: Fetch comments
        if (req.method === 'GET') {
            if (action === 'all') {
                // Return all comments sorted newest first (for admin panel)
                const sorted = [...comments].sort(
                    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                )
                return res.json({
                    total: sorted.length,
                    comments: sorted,
                })
            }

            // Filter for specific post
            let filtered = comments
            if (postSlug) {
                filtered = comments.filter((c) => normalizeSlug(c.postSlug) === postSlug)
            }

            // Sort: oldest first for natural conversation flow
            filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

            return res.json({
                postSlug,
                total: filtered.length,
                comments: filtered,
            })
        }

        // POST: Add new comment or reply
        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
            const {
                postSlug: reqSlug,
                parentId,
                content,
                authorType = 'guest',
                userId,
                authorName,
                authorEmail,
                notifyReplies = true,
                avatar,
            } = body

            const targetSlug = normalizeSlug(reqSlug || postSlug)
            if (!targetSlug) {
                return res.status(400).json({ error: 'postSlug wajib diisi.' })
            }

            if (!content || !content.trim()) {
                return res.status(400).json({ error: 'Isi komentar tidak boleh kosong.' })
            }

            if (!authorName || !authorName.trim()) {
                return res.status(400).json({ error: 'Nama pengirim komentar wajib diisi.' })
            }

            if (!authorEmail || !authorEmail.trim() || !authorEmail.includes('@')) {
                return res.status(400).json({ error: 'Email pengirim wajib diisi dengan format valid.' })
            }

            const newComment: CommentRecord = {
                id: `cmt-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                postSlug: targetSlug,
                parentId: parentId || null,
                content: content.trim(),
                createdAt: new Date().toISOString(),
                authorType: authorType === 'admin' ? 'admin' : authorType === 'user' ? 'user' : 'guest',
                userId: userId || undefined,
                authorName: authorName.trim(),
                authorEmail: authorEmail.trim().toLowerCase(),
                notifyReplies: Boolean(notifyReplies),
                avatar: avatar || undefined,
                status: 'approved',
            }

            comments.push(newComment)
            saveCommentsList(comments)

            return res.status(201).json({
                success: true,
                message: 'Komentar berhasil dikirim!',
                comment: newComment,
            })
        }

        // DELETE: Delete comment
        if (req.method === 'DELETE') {
            const commentId = (req.query.id as string) || ''
            if (!commentId) {
                return res.status(400).json({ error: 'ID komentar wajib diberikan.' })
            }

            const initialCount = comments.length
            // Remove the comment and any child replies
            const remaining = comments.filter((c) => c.id !== commentId && c.parentId !== commentId)

            if (remaining.length === initialCount) {
                return res.status(404).json({ error: 'Komentar tidak ditemukan.' })
            }

            saveCommentsList(remaining)
            return res.json({
                success: true,
                message: `Komentar berhasil dihapus.`,
                deletedId: commentId,
            })
        }

        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    } catch (err: any) {
        console.error('Error in comments API:', err)
        return res.status(500).json({ error: err.message || 'Internal server error' })
    }
}
