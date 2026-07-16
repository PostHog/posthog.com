import React, { useState, useEffect, useRef } from 'react'
import Link from 'components/Link'
import { useAppActions, useAppSettings, useAppUIState } from '../../context/App'
import { GlassIcon, PricingIcon, DemoIcon } from 'components/OSIcons'
import {
    HOME_SILHOUETTE,
    SELF_DRIVING_SILHOUETTE,
    DOWNLOAD_SILHOUETTE,
    DOCS_SILHOUETTE,
    TALK_TO_A_HUMAN_SILHOUETTE,
    WHY_POSTHOG_SILHOUETTE,
    CHANGELOG_SILHOUETTE,
    HANDBOOK_SILHOUETTE,
    STORE_SILHOUETTE,
    WORK_HERE_SILHOUETTE,
    TRASH_SILHOUETTE,
    CONTEXT_WAREHOUSE_SILHOUETTE,
} from 'components/OSIcons/glyphs'
import { AppItem } from 'components/OSIcons/AppIcon'
import ContextMenu from 'components/RadixUI/ContextMenu'
import CloudinaryImage from 'components/CloudinaryImage'
import DesktopIcon from './DesktopIcon'
import { Screensaver } from '../Screensaver'
import { useInactivityDetection } from '../../hooks/useInactivityDetection'
import NotificationsPanel from 'components/NotificationsPanel'
import Wallpapers, { getWallpaperGlow } from './Wallpapers'
import HedgeHogModeEmbed from 'components/HedgehogMode'
import ReactConfetti from 'react-confetti'
import { useToast } from '../../context/Toast'
import { navigate } from 'gatsby'

interface Product {
    name: string
    slug: string
    Icon: React.ComponentType<any>
    color?: string
}

export const useProductLinks = () => {
    // Memoized: the list is static, so this avoids rebuilding the array and all the
    // icon JSX elements on every render (which also gave consumers a new identity each time).
    return React.useMemo(
        () => [
            {
                label: 'Home',
                Icon: <GlassIcon path={HOME_SILHOUETTE} />,
                url: '/',
                source: 'desktop',
            },
            {
                label: 'Self-driving product',
                Icon: <GlassIcon path={SELF_DRIVING_SILHOUETTE} />,
                url: '/self-driving',
                source: 'desktop',
            },
            {
                label: 'Context warehouse',
                Icon: <GlassIcon path={CONTEXT_WAREHOUSE_SILHOUETTE} />,
                url: '/data-stack',
                source: 'desktop',
            },
            {
                label: 'Pricing',
                Icon: <PricingIcon />,
                url: '/pricing',
                source: 'desktop',
            },
            {
                label: 'Docs',
                Icon: <GlassIcon path={DOCS_SILHOUETTE} fillRule="evenodd" />,
                url: '/docs',
                source: 'desktop',
            },
            {
                // Not a glass glyph — a baked light/dark isometric image (see DemoIcon).
                label: 'Demo',
                Icon: <DemoIcon />,
                url: '/demo',
                source: 'desktop',
            },
            {
                label: 'Talk to a human',
                Icon: <GlassIcon path={TALK_TO_A_HUMAN_SILHOUETTE} />,
                url: '/talk-to-a-human',
                source: 'desktop',
            },
        ],
        []
    )
}

export const apps: AppItem[] = [
    {
        label: 'Why PostHog?',
        Icon: <GlassIcon path={WHY_POSTHOG_SILHOUETTE} />,
        url: '/about',
        source: 'desktop',
    },
    {
        label: 'Changelog',
        Icon: <GlassIcon path={CHANGELOG_SILHOUETTE} />,
        url: '/changelog',
        source: 'desktop',
    },
    // {
    //     label: 'Cool tech events',
    //     Icon: <AppIcon name="invite" />,
    //     url: '/events',
    //     source: 'desktop',
    // },
    {
        label: 'Company handbook',
        Icon: <GlassIcon path={HANDBOOK_SILHOUETTE} />,
        url: '/handbook',
        source: 'desktop',
    },
    {
        label: 'Store',
        Icon: <GlassIcon path={STORE_SILHOUETTE} />,
        url: '/merch',
        source: 'desktop',
    },
    {
        label: 'Careers',
        Icon: <GlassIcon path={WORK_HERE_SILHOUETTE} />,
        url: '/careers',
        source: 'desktop',
    },
    {
        label: 'Trash',
        Icon: <GlassIcon path={TRASH_SILHOUETTE} fillRule="evenodd" />,
        url: '/trash',
        source: 'desktop',
    },
]

// Fixed offset for icon layout — avoids CLS from context taskbarHeight (59 → measured) on SSR hydrate.
// #taskbar is 42px inside AppContainer's p-2 (8px) top padding.
const APP_CONTAINER_TOP_PADDING = 8
const TASKBAR_HEIGHT = 42
const DESKTOP_TOP_OFFSET = APP_CONTAINER_TOP_PADDING + TASKBAR_HEIGHT

function Desktop() {
    const productLinks = useProductLinks()
    const { setScreensaverPreviewActive, setConfetti, updateSiteSettings } = useAppActions()
    const { siteSettings, compact } = useAppSettings()
    const { screensaverPreviewActive, confetti } = useAppUIState()

    const { isInactive, dismiss } = useInactivityDetection({
        enabled: !siteSettings.screensaverDisabled,
    })
    const [navVisible, setNavVisible] = useState(false)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const { addToast } = useToast()

    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
            }
        }
    }, [])

    const handleMouseEnter = () => {
        if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current)
            hoverTimeoutRef.current = null
        }
        setNavVisible(true)
    }

    const handleMouseLeave = () => {
        hoverTimeoutRef.current = setTimeout(() => {
            setNavVisible(false)
        }, 2000)
    }

    // Drive the desktop icons' hover-glow color from the active wallpaper (light + dark).
    const glow = getWallpaperGlow(siteSettings.wallpaper)
    const applyGlow = (items: AppItem[]) =>
        items.map((app) =>
            React.isValidElement(app.Icon) && app.Icon.type === GlassIcon
                ? {
                      ...app,
                      Icon: React.cloneElement(app.Icon as React.ReactElement, {
                          glowColor: glow.light,
                          glowColorDark: glow.dark,
                      }),
                  }
                : app
        )
    const leftApps = applyGlow(productLinks)
    const rightApps = applyGlow(apps)

    // Mobile: one continuous wrapping grid (avoids a gap when left apps don't fill a row).
    // sm+: classic left/right desktop columns that wrap into extra columns when short on height.
    // Left uses wrap (new columns grow right); right uses wrap-reverse (new columns grow left)
    // so the primary column stays pinned to the screen edge.
    const mobileIconListClassName = 'list-none m-0 p-0 flex flex-row flex-wrap pointer-events-auto w-full sm:hidden'
    const desktopIconListClassName = 'list-none m-0 p-0 flex flex-col content-start pointer-events-auto'
    // Top padding is DESKTOP_TOP_OFFSET + 16; leave a matching bottom cushion so icons don't kiss the edge.
    const desktopIconListStyle = {
        height: `calc(100vh - ${DESKTOP_TOP_OFFSET + 32}px)`,
        maxHeight: `calc(100vh - ${DESKTOP_TOP_OFFSET + 32}px)`,
    } as const

    const handleScreensaverDismiss = () => {
        addToast({
            title: 'Screensaver dismissed',
            description: 'Want to disable it permanently?',
            duration: 10000,
            actionLabel: 'Disable screensaver',
            onAction: () => {
                updateSiteSettings({ ...siteSettings, screensaverDisabled: true })
                addToast({
                    title: 'Screensaver disabled',
                    description: (
                        <>
                            Change this setting in{' '}
                            <Link
                                to="/display-options"
                                className="text-red dark:text-yellow font-semibold"
                                state={{ newWindow: true }}
                            >
                                Display options
                            </Link>
                            .
                        </>
                    ),
                    duration: 10000,
                    onUndo: () => {
                        updateSiteSettings({ ...siteSettings, screensaverDisabled: false })
                    },
                })
            },
        })
        setScreensaverPreviewActive(false)
        dismiss()
    }

    return (
        <>
            <ContextMenu
                menuItems={[
                    {
                        type: 'item',
                        children: (
                            <Link to="/about" state={{ newWindow: true }}>
                                About PostHog
                            </Link>
                        ),
                    },
                    {
                        type: 'item',
                        children: (
                            <Link to="/display-options" state={{ newWindow: true }}>
                                Display options
                            </Link>
                        ),
                        shortcut: [','],
                    },
                    {
                        type: 'item',
                        children: (
                            <Link to="/kbd" state={{ newWindow: true }}>
                                Keyboard shortcuts
                            </Link>
                        ),
                        shortcut: ['.'],
                    },
                ]}
            >
                <div
                    data-scheme="primary"
                    data-app="Desktop"
                    className="fixed inset-0 pointer-events-none"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Wallpapers wallpaper={siteSettings.wallpaper} reduceMotion={siteSettings.performanceBoost} />

                    <nav className="px-1" style={{ paddingTop: DESKTOP_TOP_OFFSET + 16 }}>
                        <ul className={mobileIconListClassName}>
                            {[...leftApps, ...rightApps].map((app) => (
                                <DesktopIcon key={app.label} app={app} />
                            ))}
                        </ul>
                        <div className="hidden sm:flex sm:justify-between items-start">
                            <ul className={`${desktopIconListClassName} flex-wrap`} style={desktopIconListStyle}>
                                {leftApps.map((app) => (
                                    <DesktopIcon key={app.label} app={app} />
                                ))}
                            </ul>
                            <ul
                                className={`${desktopIconListClassName} flex-wrap-reverse`}
                                style={desktopIconListStyle}
                            >
                                {rightApps.map((app) => (
                                    <DesktopIcon key={app.label} app={app} />
                                ))}
                            </ul>
                        </div>
                    </nav>
                </div>
                {!compact && (
                    <Screensaver
                        isActive={isInactive || screensaverPreviewActive}
                        onDismiss={handleScreensaverDismiss}
                    />
                )}
                <HedgeHogModeEmbed />
            </ContextMenu>
            <NotificationsPanel />
            {confetti && (
                <div className="fixed inset-0 pointer-events-none">
                    <ReactConfetti
                        onConfettiComplete={() => setConfetti(false)}
                        recycle={false}
                        numberOfPieces={1200}
                        gravity={0.12}
                        initialVelocityY={20}
                        initialVelocityX={10}
                        tweenDuration={200}
                    />
                    <ReactConfetti
                        recycle={false}
                        numberOfPieces={800}
                        confettiSource={{ x: 0, y: 0, w: window.innerWidth, h: window.innerHeight }}
                        initialVelocityY={-8}
                        initialVelocityX={5}
                        gravity={0.15}
                        tweenDuration={1}
                    />
                </div>
            )}
        </>
    )
}

// Memoized so the static desktop chrome doesn't re-render when Wrapper re-renders
// (e.g. on the navigate() that every window open/close triggers). It takes no
// props, so it only re-renders on its own state/context changes.
export default React.memo(Desktop)
