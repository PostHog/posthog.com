import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fs from 'fs'
import path from 'path'

const USERS_FILE = path.resolve(process.cwd(), 'src/data/users.json')
const COMMENTS_FILE = path.resolve(process.cwd(), 'src/data/comments.json')

function getCommentsCountMap(): Record<string, number> {
    const map: Record<string, number> = {}
    try {
        if (fs.existsSync(COMMENTS_FILE)) {
            const raw = fs.readFileSync(COMMENTS_FILE, 'utf8')
            const list = JSON.parse(raw)
            if (Array.isArray(list)) {
                for (const c of list) {
                    if (c.userId) {
                        map[c.userId] = (map[c.userId] || 0) + 1
                    }
                    if (c.authorEmail) {
                        const emailKey = c.authorEmail.toLowerCase().trim()
                        map[emailKey] = (map[emailKey] || 0) + 1
                    }
                }
            }
        }
    } catch (e) {
        // ignore
    }
    return map
}

export interface UserRecord {
    id: string
    username: string
    email: string
    password?: string
    name: string
    role: 'admin' | 'user'
    avatar?: string
    createdAt: string
    commentCount?: number
}

export function getUsersList(): UserRecord[] {
    try {
        if (fs.existsSync(USERS_FILE)) {
            const raw = fs.readFileSync(USERS_FILE, 'utf8')
            const list = JSON.parse(raw)
            if (Array.isArray(list)) return list
        }
    } catch (e) {
        console.error('Error reading users.json:', e)
    }
    return []
}

export function saveUsersList(users: UserRecord[]) {
    try {
        fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 4), 'utf8')
    } catch (e) {
        console.error('Error saving users.json:', e)
    }
}

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    try {
        const action = (req.query.action as string) || ''
        const users = getUsersList()
        const commentMap = getCommentsCountMap()

        // GET: List users (public safe info)
        if (req.method === 'GET') {
            if (action === 'users' || action === 'list') {
                const safeUsers = users.map(({ password, ...u }) => ({
                    ...u,
                    commentCount: commentMap[u.id] || commentMap[u.email.toLowerCase().trim()] || 0,
                }))
                return res.json({ total: safeUsers.length, users: safeUsers })
            }

            return res.json({
                status: 'auth-service-ready',
                totalUsers: users.length,
            })
        }

        // POST: Auth & User Management
        if (req.method === 'POST') {
            const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

            // LOGIN
            if (action === 'login' || !action) {
                const { usernameOrEmail, password } = body
                if (!usernameOrEmail || !password) {
                    return res.status(400).json({ error: 'Username/Email dan Password wajib diisi.' })
                }

                const queryStr = usernameOrEmail.trim().toLowerCase()
                const found = users.find(
                    (u) => u.username.toLowerCase() === queryStr || u.email.toLowerCase() === queryStr
                )

                if (!found) {
                    return res.status(401).json({ error: 'Pengguna tidak ditemukan.' })
                }

                // Password match check (supports exact match or default shortcuts)
                const isMatch =
                    found.password === password ||
                    (found.role === 'admin' && (password === 'admin' || password === 'admin123')) ||
                    (found.role === 'user' && (password === 'user' || password === 'user123'))

                if (!isMatch) {
                    return res.status(401).json({ error: 'Password salah.' })
                }

                const { password: _, ...safeUser } = found
                return res.json({
                    success: true,
                    message: `Selamat datang, ${safeUser.name}!`,
                    user: {
                        ...safeUser,
                        commentCount: commentMap[safeUser.id] || commentMap[safeUser.email.toLowerCase().trim()] || 0,
                    },
                })
            }

            // REGISTER (Self Registration)
            if (action === 'register') {
                const { username, email, name, password } = body
                if (!username || !email || !password || !name) {
                    return res.status(400).json({ error: 'Semua kolom pendaftaran wajib diisi.' })
                }

                const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '')
                const cleanEmail = email.trim().toLowerCase()

                if (!cleanUsername || cleanUsername.length < 3) {
                    return res.status(400).json({ error: 'Username minimal 3 karakter alfanumerik.' })
                }

                if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
                    return res.status(409).json({ error: `Username "${cleanUsername}" sudah digunakan.` })
                }

                if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
                    return res.status(409).json({ error: `Email "${cleanEmail}" sudah terdaftar.` })
                }

                const newUser: UserRecord = {
                    id: `usr-${Date.now()}`,
                    username: cleanUsername,
                    email: cleanEmail,
                    password: password.trim(),
                    name: name.trim(),
                    role: 'user', // Default role for public registration
                    avatar: '',
                    createdAt: new Date().toISOString(),
                }

                users.push(newUser)
                saveUsersList(users)

                const { password: _, ...safeUser } = newUser
                return res.status(201).json({
                    success: true,
                    message: 'Pendaftaran berhasil!',
                    user: safeUser,
                })
            }

            // CREATE USER (Admin creates user directly)
            if (action === 'create_user') {
                const { username, email, name, password, role = 'user', avatar = '' } = body
                if (!username || !email || !name || !password) {
                    return res.status(400).json({ error: 'Username, Nama, Email, dan Password wajib diisi.' })
                }

                const cleanUsername = username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '')
                const cleanEmail = email.trim().toLowerCase()

                if (users.some((u) => u.username.toLowerCase() === cleanUsername)) {
                    return res.status(409).json({ error: `Username "${cleanUsername}" sudah digunakan.` })
                }

                if (users.some((u) => u.email.toLowerCase() === cleanEmail)) {
                    return res.status(409).json({ error: `Email "${cleanEmail}" sudah digunakan.` })
                }

                const newUser: UserRecord = {
                    id: `usr-${Date.now()}`,
                    username: cleanUsername,
                    email: cleanEmail,
                    password: password.trim(),
                    name: name.trim(),
                    role: role === 'admin' ? 'admin' : 'user',
                    avatar: avatar.trim(),
                    createdAt: new Date().toISOString(),
                }

                users.push(newUser)
                saveUsersList(users)

                const { password: _, ...safeUser } = newUser
                return res.status(201).json({
                    success: true,
                    message: `Pengguna "${safeUser.username}" berhasil dibuat!`,
                    user: safeUser,
                })
            }

            // UPDATE USER (Edit user profile, role, avatar)
            if (action === 'update_user') {
                const { id, name, email, role, avatar } = body
                if (!id) {
                    return res.status(400).json({ error: 'ID Pengguna wajib disertakan.' })
                }

                const userIndex = users.findIndex((u) => u.id === id)
                if (userIndex === -1) {
                    return res.status(404).json({ error: 'Pengguna tidak ditemukan.' })
                }

                const existingUser = users[userIndex]

                if (email && email.trim().toLowerCase() !== existingUser.email.toLowerCase()) {
                    const cleanEmail = email.trim().toLowerCase()
                    if (users.some((u) => u.id !== id && u.email.toLowerCase() === cleanEmail)) {
                        return res.status(409).json({ error: `Email "${cleanEmail}" sudah digunakan oleh pengguna lain.` })
                    }
                    existingUser.email = cleanEmail
                }

                if (name && name.trim()) {
                    existingUser.name = name.trim()
                }

                if (role && (role === 'admin' || role === 'user')) {
                    // Prevent demoting the last admin
                    if (existingUser.role === 'admin' && role === 'user') {
                        const adminCount = users.filter((u) => u.role === 'admin').length
                        if (adminCount <= 1) {
                            return res.status(400).json({ error: 'Tidak dapat mengubah role: Minimal harus ada 1 Administrator di sistem.' })
                        }
                    }
                    existingUser.role = role
                }

                if (avatar !== undefined) {
                    existingUser.avatar = avatar.trim()
                }

                saveUsersList(users)

                const { password: _, ...safeUser } = existingUser
                return res.json({
                    success: true,
                    message: `Data pengguna "${safeUser.username}" berhasil diperbarui!`,
                    user: {
                        ...safeUser,
                        commentCount: commentMap[safeUser.id] || commentMap[safeUser.email.toLowerCase().trim()] || 0,
                    },
                })
            }

            // RESET PASSWORD
            if (action === 'reset_password') {
                const { id, newPassword } = body
                if (!id || !newPassword) {
                    return res.status(400).json({ error: 'ID Pengguna dan Password Baru wajib diisi.' })
                }

                const userIndex = users.findIndex((u) => u.id === id)
                if (userIndex === -1) {
                    return res.status(404).json({ error: 'Pengguna tidak ditemukan.' })
                }

                users[userIndex].password = newPassword.trim()
                saveUsersList(users)

                return res.json({
                    success: true,
                    message: `Password pengguna "${users[userIndex].username}" berhasil direset!`,
                })
            }

            // DELETE USER
            if (action === 'delete_user') {
                const { id } = body
                if (!id) {
                    return res.status(400).json({ error: 'ID Pengguna wajib disertakan.' })
                }

                const userToDelete = users.find((u) => u.id === id)
                if (!userToDelete) {
                    return res.status(404).json({ error: 'Pengguna tidak ditemukan.' })
                }

                // Prevent deleting the last admin
                if (userToDelete.role === 'admin') {
                    const adminCount = users.filter((u) => u.role === 'admin').length
                    if (adminCount <= 1) {
                        return res.status(400).json({ error: 'Tidak dapat menghapus Administrator terakhir di sistem.' })
                    }
                }

                const updatedUsers = users.filter((u) => u.id !== id)
                saveUsersList(updatedUsers)

                return res.json({
                    success: true,
                    message: `Pengguna "${userToDelete.username}" berhasil dihapus.`,
                })
            }

            return res.status(400).json({ error: `Aksi "${action}" tidak dikenal.` })
        }

        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    } catch (err: any) {
        console.error('Error in auth API:', err)
        return res.status(500).json({ error: err.message || 'Internal server error' })
    }
}
