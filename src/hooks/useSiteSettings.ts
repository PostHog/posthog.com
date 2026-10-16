import { useState, useEffect, useCallback } from 'react'
import defaultDesktopData from '../data/settings/desktop.json'
import defaultMenuData from '../data/settings/menu.json'

export interface DesktopIconConfig {
    id: string
    label: string
    icon: string
    url: string
    external?: boolean
    section?: 'products' | 'apps'
}

export interface MenuItemChild {
    name: string
    url: string
    icon?: string
}

export interface MenuItemConfig {
    id: string
    name: string
    url: string
    icon?: string
    badge?: string
    items?: MenuItemChild[]
    mobileLink?: string
}

const SETTINGS_EVENT = 'posthog-settings-changed'

export function useSiteSettings() {
    const [desktopIcons, setDesktopIcons] = useState<DesktopIconConfig[]>(() => {
        if (typeof window !== 'undefined') {
            const cached = localStorage.getItem('posthog-custom-desktop')
            if (cached) {
                try {
                    const parsed = JSON.parse(cached)
                    return parsed.icons || parsed
                } catch (e) {}
            }
        }
        return defaultDesktopData.icons as DesktopIconConfig[]
    })

    const [menuItems, setMenuItems] = useState<MenuItemConfig[]>(() => {
        if (typeof window !== 'undefined') {
            const cached = localStorage.getItem('posthog-custom-menu')
            if (cached) {
                try {
                    return JSON.parse(cached)
                } catch (e) {}
            }
        }
        return defaultMenuData as MenuItemConfig[]
    })

    const [loading, setLoading] = useState(false)

    // Sync from server on mount
    const fetchLatest = useCallback(async () => {
        if (typeof window === 'undefined') return
        try {
            setLoading(true)
            const res = await fetch('/api/admin-settings')
            if (res.ok) {
                const data = await res.json()
                if (data.desktop?.icons) {
                    setDesktopIcons(data.desktop.icons)
                    localStorage.setItem('posthog-custom-desktop', JSON.stringify(data.desktop))
                }
                if (Array.isArray(data.menu)) {
                    setMenuItems(data.menu)
                    localStorage.setItem('posthog-custom-menu', JSON.stringify(data.menu))
                }
            }
        } catch (e) {
            console.warn('Could not fetch latest site settings from server, using local fallback:', e)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchLatest()

        const handleSettingsChange = (e: any) => {
            if (e.detail?.type === 'desktop' && e.detail.data) {
                setDesktopIcons(e.detail.data.icons || e.detail.data)
            } else if (e.detail?.type === 'menu' && e.detail.data) {
                setMenuItems(e.detail.data)
            } else {
                fetchLatest()
            }
        }

        window.addEventListener(SETTINGS_EVENT, handleSettingsChange)
        return () => window.removeEventListener(SETTINGS_EVENT, handleSettingsChange)
    }, [fetchLatest])

    const saveDesktopSettings = async (icons: DesktopIconConfig[]) => {
        setDesktopIcons(icons)
        if (typeof window !== 'undefined') {
            localStorage.setItem('posthog-custom-desktop', JSON.stringify({ icons }))
            window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: { type: 'desktop', data: { icons } } }))
        }
        try {
            const res = await fetch('/api/admin-settings?type=desktop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ icons }),
            })
            return await res.json()
        } catch (e: any) {
            console.error('Error saving desktop settings to server:', e)
            throw e
        }
    }

    const saveMenuSettings = async (items: MenuItemConfig[]) => {
        setMenuItems(items)
        if (typeof window !== 'undefined') {
            localStorage.setItem('posthog-custom-menu', JSON.stringify(items))
            window.dispatchEvent(new CustomEvent(SETTINGS_EVENT, { detail: { type: 'menu', data: items } }))
        }
        try {
            const res = await fetch('/api/admin-settings?type=menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(items),
            })
            return await res.json()
        } catch (e: any) {
            console.error('Error saving menu settings to server:', e)
            throw e
        }
    }

    const resetDesktopSettings = async () => {
        return await saveDesktopSettings(defaultDesktopData.icons as DesktopIconConfig[])
    }

    const resetMenuSettings = async () => {
        return await saveMenuSettings(defaultMenuData as MenuItemConfig[])
    }

    return {
        desktopIcons,
        menuItems,
        loading,
        fetchLatest,
        saveDesktopSettings,
        saveMenuSettings,
        resetDesktopSettings,
        resetMenuSettings,
    }
}

export default useSiteSettings
