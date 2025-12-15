import { useEffect, useRef } from 'react'
import { cycleToNextWallpaper } from '../utils/wallpaper'
import { useApp } from '../context/App'

const FIVE_MINUTES = 5 * 60 * 1000

export default function useWallpaperCycler({
    intervalMs = FIVE_MINUTES,
}: {
    intervalMs?: number
} = {}): void {
    const { siteSettings, updateSiteSettings } = useApp()
    const siteSettingsRef = useRef(siteSettings)

    useEffect(() => {
        siteSettingsRef.current = siteSettings
    }, [siteSettings])

    useEffect(() => {
        if (!siteSettings.cycleWallpaper) {
            return
        }

        if (typeof window === 'undefined') {
            return
        }

        const tick = () => {
            cycleToNextWallpaper(siteSettingsRef.current, updateSiteSettings)
        }

        const interval = window.setInterval(tick, intervalMs)
        return () => window.clearInterval(interval)
    }, [intervalMs, siteSettings.cycleWallpaper, updateSiteSettings])
}
