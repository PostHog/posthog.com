import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fs from 'fs'
import path from 'path'

const SETTINGS_DIR = path.resolve(process.cwd(), 'src/data/settings')
const DESKTOP_FILE = path.join(SETTINGS_DIR, 'desktop.json')
const MENU_FILE = path.join(SETTINGS_DIR, 'menu.json')

function ensureDir() {
    if (!fs.existsSync(SETTINGS_DIR)) {
        fs.mkdirSync(SETTINGS_DIR, { recursive: true })
    }
}

function readJSON<T>(filePath: string, fallback: T): T {
    try {
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, 'utf8')
            return JSON.parse(raw)
        }
    } catch (e) {
        console.error(`Error reading ${filePath}:`, e)
    }
    return fallback
}

function writeJSON(filePath: string, data: any): void {
    ensureDir()
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
}

export default async function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
        return res.status(200).end()
    }

    try {
        ensureDir()
        const type = (req.query.type as string) || req.body?.type

        if (req.method === 'GET') {
            if (type === 'desktop') {
                const data = readJSON(DESKTOP_FILE, { icons: [] })
                return res.json(data)
            }

            if (type === 'menu') {
                const data = readJSON(MENU_FILE, [])
                return res.json(data)
            }

            // Return both
            const desktop = readJSON(DESKTOP_FILE, { icons: [] })
            const menu = readJSON(MENU_FILE, [])
            return res.json({ desktop, menu })
        }

        if (req.method === 'POST') {
            const payload = req.body

            if (type === 'desktop') {
                const iconsData = payload.icons ? payload : { icons: payload }
                writeJSON(DESKTOP_FILE, iconsData)
                return res.json({ success: true, message: 'Desktop settings updated successfully', data: iconsData })
            }

            if (type === 'menu') {
                const menuData = Array.isArray(payload) ? payload : payload.items || payload.menu || []
                writeJSON(MENU_FILE, menuData)
                return res.json({ success: true, message: 'Menu settings updated successfully', data: menuData })
            }

            return res.status(400).json({ error: 'Invalid settings type specified (use ?type=desktop or ?type=menu)' })
        }

        return res.status(405).json({ error: `Method ${req.method} not allowed` })
    } catch (error: any) {
        console.error('Error handling admin settings:', error)
        return res.status(500).json({ error: error.message || 'Internal server error' })
    }
}
