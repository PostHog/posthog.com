import React, { useState, useEffect, lazy, Suspense } from 'react'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import { IconDemoThumb, AppIcon } from 'components/OSIcons'
import { AppItem } from 'components/OSIcons/AppIcon'
import ContextMenu from 'components/RadixUI/ContextMenu'
import CloudinaryImage from 'components/CloudinaryImage'
import DraggableDesktopIcon from './DraggableDesktopIcon'
const Screensaver = lazy(() => import('../Screensaver').then((m) => ({ default: m.Screensaver })))
import { useInactivityDetection } from '../../hooks/useInactivityDetection'
const NotificationsPanel = lazy(() => import('components/NotificationsPanel'))
import useTheme from '../../hooks/useTheme'
import { motion } from 'framer-motion'
const HedgeHogModeEmbed = lazy(() => import('components/HedgehogMode'))

declare global {
    interface Window {
        __desktopLoaded?: boolean
    }
}

export const Wallpaper = ({ wallpaper }: { wallpaper: string }): JSX.Element | null => {
    switch (wallpaper) {
        case 'hogzilla':
            return (
                <div className="select-none flex items-end justify-end absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#FFF1D5] to-[#DAE0EB] dark:opacity-0"></div>
                    <CloudinaryImage
                        loading="lazy"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_bf40c5e271.png"
                        alt=""
                        width={2574}
                        height={1256}
                        className="absolute inset-0 flex items-end justify-end"
                        imgClassName="max-w-none md:max-h-[628px] h-auto md:h-full w-[700px] md:w-auto z-10"
                    />
                </div>
            )
        case 'startup-monopoly':
            return (
                <div className="select-none block absolute inset-0">
                    <CloudinaryImage
                        loading="lazy"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/startup_monopoly_2ac9d45ce3.png"
                        alt=""
                        width={1087}
                        height={540}
                        className="absolute right-0 top-0 w-[1087px] h-[540px]"
                    />
                </div>
            )
        case 'office-party':
            return (
                <div className="select-none block absolute inset-0">
                    <div
                        className="absolute inset-0 opacity-100"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/dmukukwp6/image/upload/carpet_light_27d74f73b5.png')",
                            backgroundSize: '200px 198px',
                            backgroundRepeat: 'repeat',
                        }}
                    />
                    <div
                        className="absolute inset-0 opacity-0 dark:opacity-100"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/dmukukwp6/image/upload/carpet_dark_f1c9f5ce39.png')",
                            backgroundSize: '200px 198px',
                            backgroundRepeat: 'repeat',
                        }}
                    />
                    <CloudinaryImage
                        loading="lazy"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/office_cc4ae8675f.png"
                        alt=""
                        width={997}
                        height={858}
                        className="absolute bottom-24 left-24 md:bottom-12 md:left-36 w-[498.5px] h-[429px]"
                    />
                </div>
            )
        case 'keyboard-garden':
        default:
            return (
                <div>
                    <div
                        className="absolute inset-0 opacity-100"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/dmukukwp6/image/upload/keyboard_garden_bg_light_03a349af5c.png')",
                            backgroundSize: '100px 100px',
                            backgroundRepeat: 'repeat',
                        }}
                    />
                    <div
                        className="absolute inset-0 opacity-0 dark:opacity-100"
                        style={{
                            backgroundImage:
                                "url('https://res.cloudinary.com/dmukukwp6/image/upload/keyboard_garden_bg_dark_9ab088797a.png')",
                            backgroundSize: '200px 200px',
                            backgroundRepeat: 'repeat',
                        }}
                    />
                    <div className="absolute bottom-4 md:bottom-12 -right-4 xs:right-8 md:right-0">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/keyboard_garden_light_opt_compressed_5094746caf.png"
                            alt=""
                            width={1401}
                            height={1400}
                            className="size-[300px] md:size-[700px] dark:hidden"
                        />
                        <CloudinaryImage
                            loading="lazy"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/keyboard_garden_dark_opt_15e213413c.png"
                            alt=""
                            width={1401}
                            height={1400}
                            className="size-[300px] md:size-[700px] hidden dark:block"
                        />
                    </div>
                </div>
            )
        case '2001-bliss':
            return (
                <div
                    className="select-none block absolute inset-0 bg-repeat bg-center"
                    style={{
                        backgroundImage:
                            "url('https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_1x_27e9e47112.jpg')",
                        backgroundSize: '1180px 738px',
                    }}
                >
                    <CloudinaryImage
                        loading="lazy"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_1x_27e9e47112.jpg"
                        alt=""
                        width={1180}
                        height={738}
                        imgClassName="hidden"
                    />
                    <div className="absolute inset-0 bg-white/60 dark:bg-black/60"></div>
                </div>
            )
        case 'parade':
            return (
                <div className="select-none flex items-end fixed inset-0">
                    <CloudinaryImage
                        loading="lazy"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/parade_light_ffe041646a.png"
                        alt=""
                        width={1565}
                        height={744}
                        imgClassName="dark:hidden w-full"
                    />
                    <CloudinaryImage
                        loading="lazy"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/parade_dark_238d90c5ef.png"
                        alt=""
                        width={1565}
                        height={744}
                        imgClassName="hidden dark:block"
                    />
                </div>
            )
        case 'coding-at-night':
            return (
                <div className="select-none flex items-end fixed inset-0">
                    <CloudinaryImage
                        loading="lazy"
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/coding_at_night_5d7d21791e.png"
                        alt=""
                        width={2360}
                        height={696}
                        className="w-full"
                    />
                </div>
            )
    }
}

export const ConfettiOverlay = ({
    active,
    onComplete,
}: {
    active: boolean
    onComplete: () => void
}): JSX.Element | null => {
    const [ConfettiComponent, setConfettiComponent] = useState<React.ElementType | null>(null)

    useEffect(() => {
        if (active && !ConfettiComponent) {
            import('react-confetti').then((m) => setConfettiComponent(m.default as React.ElementType))
        }
    }, [active, ConfettiComponent])

    if (!active || !ConfettiComponent) return null

    const Confetti = ConfettiComponent as React.ComponentType<{
        onConfettiComplete: () => void
        recycle: boolean
        numberOfPieces: number
    }>

    return (
        <div className="fixed inset-0">
            <Confetti onConfettiComplete={onComplete} recycle={false} numberOfPieces={1000} />
        </div>
    )
}

export const useProductLinks = (): AppItem[] => {
    const { posthogInstance, openNewChat } = useApp()

    return [
        {
            label: 'home.mdx',
            Icon: <AppIcon name="doc" />,
            url: '/',
            source: 'desktop',
        },
        {
            label: 'Product OS',
            Icon: <AppIcon name="folder" />,
            url: '/products',
            source: 'desktop',
        },
        {
            label: 'Pricing',
            Icon: <AppIcon name="pricing" />,
            url: '/pricing',
            source: 'desktop',
        },
        {
            label: 'customers.mdx',
            Icon: <AppIcon name="spreadsheet" />,
            url: '/customers',
            source: 'desktop',
        },
        {
            label: 'demo.mov',
            Icon: IconDemoThumb,
            url: '/demo',
            className: 'size-14 -my-1',
            source: 'desktop',
        },
        {
            label: 'Docs',
            Icon: <AppIcon name="notebook" />,
            url: '/docs',
            source: 'desktop',
        },
        {
            label: 'Talk to a human',
            Icon: <AppIcon name="envelope" />,
            url: '/talk-to-a-human',
            source: 'desktop',
        },
        {
            label: 'Ask a question',
            Icon: <AppIcon name="forums" />,
            onClick: () => openNewChat({ path: `ask-max` }),
            source: 'desktop',
        },
        ...(posthogInstance
            ? [
                  {
                      label: 'Open app ↗',
                      Icon: <AppIcon name="computerCoffee" />,
                      url: 'https://app.posthog.com',
                      external: true,
                      source: 'desktop',
                  },
              ]
            : [
                  {
                      label: 'Sign up ↗',
                      Icon: <AppIcon name="compass" />,
                      url: 'https://app.posthog.com/signup',
                      external: true,
                      source: 'desktop',
                  },
              ]),
    ]
}

export const apps: AppItem[] = [
    {
        label: 'Why PostHog?',
        Icon: <AppIcon name="posthog" />,
        url: '/about',
        source: 'desktop',
    },
    {
        label: 'Changelog',
        Icon: <AppIcon name="invite" />,
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
        Icon: <AppIcon name="handbook" />,
        url: '/handbook',
        source: 'desktop',
    },
    {
        label: 'Store',
        Icon: <AppIcon name="shoppingBag" />,
        url: '/merch',
        source: 'desktop',
    },
    {
        label: 'Work here',
        Icon: <AppIcon name="typewriter" />,
        url: '/careers',
        source: 'desktop',
    },
    {
        label: 'Trash',
        Icon: <AppIcon name="trash" />,
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
    const iconHeight = 75
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

export default function Desktop(): JSX.Element {
    const productLinks = useProductLinks()
    const {
        constraintsRef,
        siteSettings,
        screensaverPreviewActive,
        setScreensaverPreviewActive,
        setConfetti,
        confetti,
        compact,
        posthogInstance,
    } = useApp()
    const [iconPositions, setIconPositions] = useState<IconPositions>(generateInitialPositions())
    const { isInactive, dismiss } = useInactivityDetection({
        enabled: !siteSettings.screensaverDisabled,
    })
    const [rendered, setRendered] = useState(false)
    const { getWallpaperClasses } = useTheme()

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
        const iconHeight = 75
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
        }
    }, [posthogInstance])

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.__desktopLoaded = true
            window.dispatchEvent(new CustomEvent('desktopLoaded'))
        }
    }, [])

    const handlePositionChange = (appLabel: string, position: IconPosition) => {
        const newPositions = { ...iconPositions, [appLabel]: position }
        setIconPositions(newPositions)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions))
    }

    const allApps = [...productLinks, ...apps]

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
                <div data-scheme="primary" data-app="Desktop" className="fixed size-full">
                    <div className={`fixed inset-0 -z-10 ${getWallpaperClasses()}`} />
                    <Wallpaper wallpaper={siteSettings.wallpaper} />

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
                    <Suspense fallback={null}>
                        <Screensaver
                            isActive={isInactive || screensaverPreviewActive}
                            onDismiss={() => {
                                setScreensaverPreviewActive(false)
                                dismiss()
                            }}
                        />
                    </Suspense>
                )}
                <Suspense fallback={null}>
                    <HedgeHogModeEmbed />
                </Suspense>
            </ContextMenu>
            <Suspense fallback={null}>
                <NotificationsPanel />
            </Suspense>
            <ConfettiOverlay active={confetti} onComplete={() => setConfetti(false)} />
        </>
    )
}
