import React, { useState, useEffect, useRef } from 'react'
import Link from 'components/Link'
import { useAppActions, useAppSettings, useAppUIState } from '../../context/App'
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
import DraggableDesktopIcon from './DraggableDesktopIcon'
import { Screensaver } from '../Screensaver'
import { useInactivityDetection } from '../../hooks/useInactivityDetection'
import NotificationsPanel from 'components/NotificationsPanel'
import Wallpapers, { getWallpaperGlow } from './Wallpapers'
import { motion } from 'framer-motion'
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
                label: 'demo.mov',
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

interface IconPosition {
    x: number
    y: number
}

type IconPositions = Record<string, IconPosition>

const STORAGE_KEY = 'desktop-icon-positions'

const validateIconPositions = (
    positions: IconPositions,
    constraintsRef: React.RefObject<HTMLDivElement>,
    productLinks: ReturnType<typeof useProductLinks>
): boolean => {
    const iconWidth = 112
    const iconHeight = 84
    const allApps = [...productLinks, ...apps]

    for (const app of allApps) {
        if (!positions[app.label]) {
            return false
        }
    }

    // Get current viewport dimensions
    const containerWidth =
        constraintsRef.current?.getBoundingClientRect().width ||
        (typeof window !== 'undefined' ? window.innerWidth : 1200)
    const containerHeight =
        constraintsRef.current?.getBoundingClientRect().height ||
        (typeof window !== 'undefined' ? window.innerHeight : 800)

    for (const position of Object.values(positions)) {
        // Check if icon is completely outside viewport bounds
        if (
            position.x < 0 ||
            position.y < 0 ||
            position.x + iconWidth > containerWidth ||
            position.y + iconHeight > containerHeight
        ) {
            return false
        }
    }
    return true
}

function Desktop() {
    const productLinks = useProductLinks()
    const { constraintsRef, setScreensaverPreviewActive, setConfetti, updateSiteSettings } = useAppActions()
    const { siteSettings, compact, posthogInstance } = useAppSettings()
    const { screensaverPreviewActive, confetti } = useAppUIState()

    const [iconPositions, setIconPositions] = useState<IconPositions>({})
    const { isInactive, dismiss } = useInactivityDetection({
        enabled: !siteSettings.screensaverDisabled,
    })
    const [rendered, setRendered] = useState(false)
    const [navVisible, setNavVisible] = useState(false)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const { addToast } = useToast()
    function generateInitialPositions(columns = 2): IconPositions {
        const positions: IconPositions = {}

        // Default positions if container isn't available yet
        const containerWidth =
            constraintsRef.current?.getBoundingClientRect().width ||
            (typeof window !== 'undefined' ? window.innerWidth : 1200)
        const containerHeight =
            constraintsRef.current?.getBoundingClientRect().height ||
            (typeof window !== 'undefined' ? window.innerHeight : 800)

        const iconWidth = 112
        const iconHeight = 84
        const paddingHorizontal = 4
        const paddingVertical = 20
        const columnSpacing = 128 // Space between columns (icon width + gap)

        const startY = paddingVertical
        const availableHeight = containerHeight - paddingVertical * 2 // Top and bottom padding
        const maxIconsPerColumn = Math.floor(availableHeight / iconHeight)

        // Position productLinks starting from the left
        let currentColumn = 0
        const leftIcons = columns === 1 ? [...productLinks, ...apps] : productLinks
        leftIcons.forEach((app, index) => {
            const columnIndex = Math.floor(index / maxIconsPerColumn)
            const positionInColumn = index % maxIconsPerColumn

            positions[app.label] = {
                x: paddingHorizontal + columnIndex * columnSpacing,
                y: startY + positionInColumn * iconHeight,
            }

            currentColumn = Math.max(currentColumn, columnIndex + 1)
        })

        if (columns === 1) {
            return positions
        }

        // Start from the rightmost position and flow left
        const rightmostStart = containerWidth - paddingHorizontal - iconWidth
        // Ensure at least one column gap from productLinks
        const minStartFromLeft = (currentColumn + 1) * columnSpacing + paddingHorizontal
        const rightStartColumn = Math.max(rightmostStart, minStartFromLeft)

        apps.forEach((app, index) => {
            const columnIndex = Math.floor(index / maxIconsPerColumn)
            const positionInColumn = index % maxIconsPerColumn

            positions[app.label] = {
                x: rightStartColumn - columnIndex * columnSpacing,
                y: startY + positionInColumn * iconHeight,
            }
        })

        if (columns > 1) {
            const isAnyIconOutOfBounds = Object.values(positions).some(
                (position) =>
                    position.x < 0 ||
                    position.y < 0 ||
                    position.x + iconWidth > containerWidth ||
                    position.y + iconHeight > containerHeight
            )

            if (isAnyIconOutOfBounds) {
                return generateInitialPositions(1)
            }
        }

        return positions
    }

    useEffect(() => {
        const savedPositions = localStorage.getItem(STORAGE_KEY)
        if (savedPositions) {
            try {
                const parsedPositions = JSON.parse(savedPositions)

                // Validate that all positions are within viewport bounds
                if (validateIconPositions(parsedPositions, constraintsRef, productLinks)) {
                    setIconPositions(parsedPositions)
                } else {
                    // Some icons are out of bounds, reset to initial positions
                    setIconPositions(generateInitialPositions())
                }
            } catch (error) {
                console.error('Error parsing saved positions:', error)
                setIconPositions(generateInitialPositions())
            }
        } else {
            setIconPositions(generateInitialPositions())
        }

        const handleResize = () => {
            setIconPositions(generateInitialPositions())
        }

        setTimeout(() => {
            setRendered(true)
        }, 400)

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
            }
        }
    }, [posthogInstance])

    const handlePositionChange = (appLabel: string, position: IconPosition) => {
        const newPositions = { ...iconPositions, [appLabel]: position }
        setIconPositions(newPositions)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions))
    }

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
    const allApps = [...productLinks, ...apps].map((app) =>
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
                    {
                        type: 'item',
                        children: (
                            <button
                                onClick={() => {
                                    localStorage.removeItem(STORAGE_KEY)
                                    setIconPositions(generateInitialPositions())
                                }}
                            >
                                Reset icons
                            </button>
                        ),
                    },
                ]}
            >
                <div
                    data-scheme="primary"
                    data-app="Desktop"
                    className="fixed size-full top-0 pt-12"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <Wallpapers wallpaper={siteSettings.wallpaper} reduceMotion={siteSettings.performanceBoost} />

                    <nav>
                        <motion.ul
                            initial={{ opacity: 0 }}
                            animate={{ opacity: rendered ? 1 : 0 }}
                            className="list-none m-0 -mt-2 md:mt-0 p-0 grid sm:grid-cols-4 grid-cols-3 gap-2"
                        >
                            {allApps.map((app) => {
                                const position = iconPositions[app.label] || { x: 0, y: 0 }

                                return (
                                    <DraggableDesktopIcon
                                        key={app.label}
                                        app={app}
                                        initialPosition={position}
                                        onPositionChange={(newPosition) => handlePositionChange(app.label, newPosition)}
                                    />
                                )
                            })}
                        </motion.ul>
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
