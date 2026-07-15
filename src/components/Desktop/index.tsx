import React, { useState, useEffect, useRef } from 'react'
import Link from 'components/Link'
import { useApp, useAppActions, useAppSettings, useAppUIState } from '../../context/App'
import { GlassIcon, PricingIcon, DemoIcon } from 'components/OSIcons'
import {
    HOME_SILHOUETTE,
    SELF_DRIVING_SILHOUETTE,
    SKILLS_SILHOUETTE,
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
                label: 'Self-driving products',
                Icon: <GlassIcon path={SELF_DRIVING_SILHOUETTE} />,
                url: '/self-driving',
                source: 'desktop',
            },
            {
                label: 'Agent skills',
                Icon: <GlassIcon path={SKILLS_SILHOUETTE} fillRule="evenodd" />,
                url: '/skills',
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
        label: 'Work here',
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

function Desktop() {
    const productLinks = useProductLinks()
    const { taskbarHeight } = useApp()
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

    const iconListClassName = 'list-none m-0 p-0 flex flex-col pointer-events-auto w-28'

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

                    <nav
                        className="flex flex-col sm:flex-row sm:justify-between items-start px-1"
                        style={{ paddingTop: taskbarHeight + 16 }}
                    >
                        <ul className={iconListClassName}>
                            {leftApps.map((app) => (
                                <DesktopIcon key={app.label} app={app} />
                            ))}
                        </ul>
                        <ul className={iconListClassName}>
                            {rightApps.map((app) => (
                                <DesktopIcon key={app.label} app={app} />
                            ))}
                        </ul>
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
