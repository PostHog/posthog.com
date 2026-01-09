import { themeOptions, type ThemeOption } from '../hooks/useTheme'
import type { SiteSettings } from '../context/App'

export const getNextWallpaper = (currentWallpaperValue: string | null | undefined): ThemeOption => {
    const currentIndex = themeOptions.findIndex((theme) => theme.value === currentWallpaperValue)
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themeOptions.length
    return themeOptions[nextIndex]
}

export const cycleToNextWallpaper = (
    siteSettings: SiteSettings,
    updateSiteSettings: (siteSettings: SiteSettings) => void
): ThemeOption => {
    const nextWallpaper = getNextWallpaper(siteSettings.wallpaper)

    updateSiteSettings({
        ...siteSettings,
        wallpaper: nextWallpaper.value as SiteSettings['wallpaper'],
    })

    return nextWallpaper
}
