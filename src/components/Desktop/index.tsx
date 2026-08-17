import React, { useState, useEffect, useRef } from 'react'
import Link from 'components/Link'
import { useAppActions, useAppSettings, useAppUIState } from '../../context/App'
import { GlassIcon, DemoIcon, RenderedIcon } from 'components/OSIcons'
import { AppItem } from 'components/OSIcons/AppIcon'
import ContextMenu from 'components/RadixUI/ContextMenu'
import CloudinaryImage from 'components/CloudinaryImage'
import DesktopIcon from './DesktopIcon'
// TEMPORARY — icon set bake-off. Remove with OSIcons/iconSets.ts + OSIcons/RenderedIcon.tsx.
import IconSetSwitcher from './IconSetSwitcher'
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
                Icon: <RenderedIcon name="home" />,
                url: '/',
                source: 'desktop',
            },
            {
                label: 'Self-driving product',
                Icon: <RenderedIcon name="self-driving" />,
                url: '/self-driving',
                source: 'desktop',
            },
            {
                label: 'Context warehouse',
                Icon: <RenderedIcon name="context-warehouse" />,
                url: '/context-warehouse',
                source: 'desktop',
            },
            {
                label: 'Pricing',
                Icon: <RenderedIcon name="pricing" />,
                url: '/pricing',
                source: 'desktop',
            },
            {
                label: 'Docs',
                Icon: <RenderedIcon name="docs" />,
                url: '/docs',
                source: 'desktop',
            },
            {
                // No render supplied for demo.mov — still the baked light/dark isometric pair.
                label: 'Demo',
                Icon: <DemoIcon />,
                url: '/demo',
                source: 'desktop',
            },
            {
                label: 'Talk to a human',
                Icon: <RenderedIcon name="talk-to-a-human" />,
                url: '/talk-to-a-human',
                source: 'desktop',
            },
        ],
        []
    )
}

export const apps: AppItem[] = [
    {
        label: 'About us',
        Icon: <RenderedIcon name="about-us" />,
        url: '/about',
        source: 'desktop',
    },
    {
        label: 'Changelog',
        Icon: <RenderedIcon name="changelog" />,
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
        Icon: <RenderedIcon name="handbook" />,
        url: '/handbook',
        source: 'desktop',
    },
    {
        label: 'Store',
        Icon: <RenderedIcon name="store" />,
        url: '/merch',
        source: 'desktop',
    },
    {
        label: 'Careers',
        Icon: <RenderedIcon name="careers" />,
        url: '/careers',
        source: 'desktop',
    },
    {
        label: 'Trash',
        Icon: <RenderedIcon name="trash" />,
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
        height: `calc(100dvh - ${DESKTOP_TOP_OFFSET + 32}px)`,
        maxHeight: `calc(100dvh - ${DESKTOP_TOP_OFFSET + 32}px)`,
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
            {/* TEMPORARY — icon set bake-off overlay. Delete this line when a set is picked. */}
            <IconSetSwitcher />
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
