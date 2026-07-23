import React from 'react'
import {
    IconBolt,
    IconClockRewind,
    IconConfetti,
    IconCursor,
    IconCursorClick,
    IconDay,
    IconImage,
    IconLaptop,
    IconMagicWand,
    IconNight,
    IconRocket,
    IconShare,
    IconStar,
    IconX,
} from '@posthog/icons'
import { useApp, SiteSettings } from '../../context/App'
import { useToast } from '../../context/Toast'
import { themeOptions } from '../../hooks/useTheme'
import { useHedgehogMode } from 'components/HedgehogMode'

export type SpotlightAction = {
    id: string
    label: string
    icon: React.ReactNode
    keywords: string[]
    // Toggles stay open so Enter can re-run them; one-shots close the palette
    keepOpen?: boolean
    perform: () => void
}

/**
 * Command-palette actions surfaced by SpotlightSearch when trigger words
 * match. A hook rather than a constant because actions close over app context
 * (settings, window management) and toasts.
 *
 * Actions are for things search can't do — no plain navigations here; pages
 * are what the search results themselves are for. Also not here (and why):
 * dance mode (a TapePlayer-internal window, no route), the hedgehog generator
 * (opened via addWindow from MediaLibrary, no route), and enterprise/theo
 * modes (Layout context, which isn't an ancestor of the overlay).
 */
export const useSpotlightActions = (): SpotlightAction[] => {
    const {
        siteSettings,
        updateSiteSettings,
        closeAllWindows,
        setScreensaverPreviewActive,
        setConfetti,
        copyDesktopParams,
    } = useApp()
    const { addToast } = useToast()
    const [hedgehogModeEnabled, setHedgehogModeEnabled] = useHedgehogMode()

    const darkMode = siteSettings.theme === 'dark'

    const toast = (icon: React.ReactNode, message: string) =>
        addToast({
            description: (
                <>
                    {icon}
                    {message}
                </>
            ),
            duration: 2000,
        })

    // Light/dark toggle (not the `\` shortcut's 3-way system cycle — an
    // explicit "switch to X" action shouldn't land on "system")
    const toggleTheme = () => {
        const nextMode = darkMode ? 'light' : 'dark'
        if (typeof window !== 'undefined' && window.__setPreferredTheme) {
            window.__setPreferredTheme(nextMode)
            updateSiteSettings({
                ...siteSettings,
                theme: nextMode,
                colorMode: nextMode,
            })
            toast(
                nextMode === 'light' ? (
                    <IconDay className="size-5 inline-block mr-1" />
                ) : (
                    <IconNight className="size-5 inline-block mr-1" />
                ),
                `Switched to ${nextMode} mode`
            )
        }
    }

    const changeWallpaper = () => {
        const currentIndex = themeOptions.findIndex((theme) => theme.value === siteSettings.wallpaper)
        const nextWallpaper = themeOptions[(currentIndex + 1) % themeOptions.length]
        updateSiteSettings({
            ...siteSettings,
            wallpaper: nextWallpaper.value as SiteSettings['wallpaper'],
        })
        toast(<IconImage className="size-5 inline-block mr-1" />, `Wallpaper: ${nextWallpaper.label}`)
    }

    const cycleCursor = () => {
        const cursors: SiteSettings['cursor'][] = ['default', 'xl', 'james']
        const next = cursors[(cursors.indexOf(siteSettings.cursor) + 1) % cursors.length]
        updateSiteSettings({ ...siteSettings, cursor: next })
        toast(<IconCursor className="size-5 inline-block mr-1" />, `Cursor: ${next}`)
    }

    return [
        {
            id: 'toggle-theme',
            label: darkMode ? 'Switch to light mode' : 'Switch to dark mode',
            icon: darkMode ? <IconDay /> : <IconNight />,
            keywords: ['dark', 'light', 'theme', 'appearance', 'color mode', 'night'],
            keepOpen: true,
            perform: toggleTheme,
        },
        {
            id: 'change-wallpaper',
            label: 'Change wallpaper',
            icon: <IconImage />,
            keywords: ['wallpaper', 'background', 'desktop'],
            keepOpen: true,
            perform: changeWallpaper,
        },
        {
            id: 'hedgehog-mode',
            label: hedgehogModeEnabled ? 'Put the hedgehogs away' : 'Release the hedgehogs',
            icon: <IconStar />,
            keywords: ['hedgehog', 'hedgehogs'],
            keepOpen: true,
            perform: () => setHedgehogModeEnabled(!hedgehogModeEnabled),
        },
        {
            id: 'retro-mode',
            label: siteSettings.skinMode === 'classic' ? 'Exit retro mode' : 'Enter retro mode',
            icon: <IconClockRewind />,
            keywords: ['retro', 'classic', '90s', 'old school'],
            keepOpen: true,
            perform: () =>
                updateSiteSettings({
                    ...siteSettings,
                    skinMode: siteSettings.skinMode === 'classic' ? 'modern' : 'classic',
                }),
        },
        {
            id: 'reduce-transparency',
            label: siteSettings.reduceTransparency ? 'Turn off reduce transparency' : 'Turn on reduce transparency',
            icon: <IconBolt />,
            keywords: ['transparency', 'blur', 'frosted', 'visual', 'separation', 'accessibility', 'heater'],
            keepOpen: true,
            perform: () => {
                const next = !siteSettings.reduceTransparency
                updateSiteSettings({ ...siteSettings, reduceTransparency: next })
                if (next) {
                    toast(
                        <IconBolt className="size-5 inline-block mr-1" />,
                        'Reduce transparency on - solid window backgrounds'
                    )
                }
            },
        },
        {
            id: 'performance-boost',
            label: siteSettings.performanceBoost ? 'Turn off performance boost' : 'Turn on performance boost',
            icon: <IconRocket />,
            keywords: ['performance', 'boost', 'speed', 'fps'],
            keepOpen: true,
            perform: () => updateSiteSettings({ ...siteSettings, performanceBoost: !siteSettings.performanceBoost }),
        },
        {
            id: 'cursor',
            label: 'Change cursor',
            icon: <IconCursor />,
            keywords: ['cursor', 'pointer', 'mouse'],
            keepOpen: true,
            perform: cycleCursor,
        },
        {
            id: 'click-behavior',
            label:
                siteSettings.clickBehavior === 'double' ? 'Switch to single-click mode' : 'Switch to double-click mode',
            icon: <IconCursorClick />,
            keywords: ['click behavior', 'double click', 'single click', 'clicks'],
            keepOpen: true,
            perform: () =>
                updateSiteSettings({
                    ...siteSettings,
                    clickBehavior: siteSettings.clickBehavior === 'double' ? 'single' : 'double',
                }),
        },
        {
            id: 'boring-mode',
            // One-way from here: boring mode unmounts the desktop (and this
            // palette with it) — exiting happens from the boring-mode header
            label: 'Enter boring mode',
            icon: <IconLaptop />,
            keywords: ['boring', 'normal', 'simple', 'plain'],
            perform: () => updateSiteSettings({ ...siteSettings, experience: 'boring' }),
        },
        {
            id: 'copy-desktop',
            label: 'Copy link to this desktop',
            icon: <IconShare />,
            keywords: ['share desktop', 'copy link', 'share', 'desktop'],
            perform: () => {
                copyDesktopParams()
                toast(<IconShare className="size-5 inline-block mr-1" />, 'Desktop link copied to clipboard')
            },
        },
        {
            id: 'close-windows',
            label: 'Close all windows',
            icon: <IconX />,
            keywords: ['close all', 'windows', 'clean up'],
            perform: () => closeAllWindows(),
        },
        {
            id: 'screensaver',
            label: 'Start screensaver',
            icon: <IconMagicWand />,
            keywords: ['screensaver', 'screen saver'],
            perform: () => setScreensaverPreviewActive(true),
        },
        {
            id: 'confetti',
            label: 'Celebrate with confetti',
            icon: <IconConfetti />,
            keywords: ['confetti', 'party', 'celebrate'],
            perform: () => setConfetti(true),
        },
    ]
}
