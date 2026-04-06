import React, { useState, useEffect, useRef, useCallback } from 'react'
import { IconPlay, IconRewindPlay, IconX } from '@posthog/icons'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import { IconDemoThumb, AppIcon, IconChangelogThumb } from 'components/OSIcons'
import { AppItem } from 'components/OSIcons/AppIcon'
import ContextMenu from 'components/RadixUI/ContextMenu'
import CloudinaryImage from 'components/CloudinaryImage'
import DraggableDesktopIcon from './DraggableDesktopIcon'
import { Screensaver } from '../Screensaver'
import { useInactivityDetection } from '../../hooks/useInactivityDetection'
import NotificationsPanel from 'components/NotificationsPanel'
import useTheme from '../../hooks/useTheme'
import { motion } from 'framer-motion'
import HedgeHogModeEmbed from 'components/HedgehogMode'
import ReactConfetti from 'react-confetti'
import { useToast } from '../../context/Toast'
import usePostHog from '../../hooks/usePostHog'
import MediaPlayer from 'components/MediaPlayer'
import { CallToAction } from 'components/CallToAction'

declare global {
    interface Window {
        __desktopLoaded?: boolean
    }
}

interface Product {
    name: string
    slug: string
    Icon: React.ComponentType<any>
    color?: string
}

export const useProductLinks = () => {
    const { posthogInstance, openNewChat, siteSettings, updateSiteSettings } = useApp()
    const { addToast } = useToast()
    const posthog = usePostHog()

    return [
        {
            label: 'home.mdx',
            Icon: <AppIcon name="doc" />,
            url: '/',
            source: 'desktop',
        },
        {
            label: 'Product OS',
            Icon: <AppIcon name={posthog?.getFeatureFlag?.('data-positioning') === 'test' ? 'notebook' : 'folder'} />,
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
        {
            label: 'Switch to website mode',
            Icon: <AppIcon name="switch" />,
            onClick: () => {
                updateSiteSettings({ ...siteSettings, experience: 'boring' })
                posthog?.capture('switched site mode', {
                    value: 'website',
                    source: 'desktop',
                })
                addToast({
                    title: 'Switched to website mode',
                    description: 'Hover the logo to return to OS mode.',
                    duration: 5000,
                    onUndo: () => {
                        updateSiteSettings({ ...siteSettings, experience: 'posthog' })
                    },
                })
            },
            source: 'desktop',
        },
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

function ActionFigureWallpaper() {
    const { addWindow } = useApp()

    const handlePriceClick = () => {
        addWindow(
            <MediaPlayer
                newWindow
                location={{ pathname: `action-figure` }}
                key={`action-figure`}
                videoId="xxBqKIBBxQw"
            />
        )
    }

    return (
        <button
            onClick={handlePriceClick}
            className="hidden select-none wallpaper-action-figure:flex fixed inset-0 items-center justify-center overflow-hidden bg-[#d4c9b8] dark:bg-[#2a2520]"
        >
            {/* Text + logo */}
            <div className="absolute right-[90px] top-[10%] flex justify-center z-10">
                <div className="relative">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/Frame_aa13fcacc0.png"
                        alt="Introducing James Hawkins — The Ultra-Action Figure"
                        className="w-[clamp(280px,50vw,600px)]"
                    />
                    <div className="absolute right-0 -bottom-0 translate-y-1/2">
                        <motion.div
                            animate={{ scale: [1, 1.12, 1] }}
                            transition={{
                                duration: 1.2,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_143844_23796aaece.png"
                                alt="Only $996"
                                className="w-[clamp(80px,13vw,160px)]"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Right James figure */}
            <div className="absolute -bottom-2 -right-12 w-[clamp(220px,50vw,600px)] z-10">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2026_03_24_at_11_06_31_1_08dd25932a.png"
                    alt=""
                />
            </div>

            {/* Left James figure */}
            <div className="absolute -bottom-2 -right-20 w-[clamp(400px,80vw,1000px)] z-10">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2026_03_24_at_11_06_54_1_99fa60ee4d.png"
                    alt=""
                />
            </div>
        </button>
    )
}

const ACTION_FIGURE_DISMISSED_KEY = 'action-figure-toast-dismissed'

function ActionFigurePopup() {
    const { addWindow, siteSettings } = useApp()
    const { addToast, removeToast } = useToast()
    const toastId = useRef<number | null>(null)
    const [hasDismissed, setHasDismissed] = useState(() => {
        try {
            return localStorage.getItem(ACTION_FIGURE_DISMISSED_KEY) === 'true'
        } catch {
            return false
        }
    })

    const isActive = siteSettings.wallpaper === 'action-figure'

    const dismiss = () => {
        setHasDismissed(true)
        if (toastId.current) {
            removeToast(toastId.current!)
        }
        try {
            localStorage.setItem(ACTION_FIGURE_DISMISSED_KEY, 'true')
        } catch {
            // localStorage may be unavailable
        }
    }

    useEffect(() => {
        if (!isActive || hasDismissed) return

        const timer = setTimeout(() => {
            const newToastId = addToast({
                title: 'New PostHog Heroes action figures',
                description: (
                    <div>
                        <button
                            onClick={() => {
                                addWindow(
                                    <MediaPlayer
                                        newWindow
                                        location={{ pathname: `action-figure` }}
                                        key={`action-figure`}
                                        videoId="xxBqKIBBxQw"
                                    />
                                )
                            }}
                            className="relative rounded overflow-hidden group w-[calc(100%+15px)] mt-3"
                        >
                            <img
                                src="https://img.youtube.com/vi/xxBqKIBBxQw/mqdefault.jpg"
                                alt="Watch the action figure reveal"
                                className="w-full aspect-video object-cover rounded"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                                <div className="size-11 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-colors shadow-lg">
                                    <IconPlay className="size-5 text-black ml-0.5" />
                                </div>
                            </div>
                        </button>
                        <CallToAction
                            size="sm"
                            className="!w-[calc(100%+15px)] mt-1"
                            to="/merch?product=james-hawkins-ultra-action-figure"
                            state={{ newWindow: true }}
                        >
                            Order yours today
                        </CallToAction>
                    </div>
                ),
                actionLabel: 'Close',
                actionAsIcon: <IconX className="size-4" />,
                verticalAlign: 'items-start',
                duration: 999999999,
                onAction: () => dismiss(),
                actionClassName: '!absolute -top-2 -right-2',
            })
            toastId.current = newToastId
        }, 1000)

        return () => clearTimeout(timer)
    }, [isActive, hasDismissed])

    return null
}

export default function Desktop() {
    const productLinks = useProductLinks()
    const {
        constraintsRef,
        siteSettings,
        screensaverPreviewActive,
        setScreensaverPreviewActive,
        setConfetti,
        confetti,
        compact,
        windows,
        websiteMode,
        posthogInstance,
        updateSiteSettings,
    } = useApp()
    const [iconPositions, setIconPositions] = useState<IconPositions>(generateInitialPositions())
    const { isInactive, dismiss } = useInactivityDetection({
        enabled: !siteSettings.screensaverDisabled,
    })
    const [rendered, setRendered] = useState(false)
    const [navVisible, setNavVisible] = useState(false)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const { getWallpaperClasses } = useTheme()
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
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current)
            }
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

    const allApps = [...productLinks, ...apps]

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
                    className={`fixed size-full ${websiteMode ? '-z-10 inset-0' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className={`fixed inset-0 -z-10 ${getWallpaperClasses()}`} />
                    {/* Hogzilla */}
                    <div className="hidden select-none wallpaper-hogzilla:flex items-end justify-end absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-[#FFF1D5] to-[#DAE0EB] dark:opacity-0"></div>
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_bf40c5e271.png"
                            alt=""
                            width={2574}
                            height={1256}
                            className="absolute inset-0 flex items-end justify-end"
                            imgClassName="max-w-none md:max-h-[628px] h-auto md:h-full w-[700px] md:w-auto z-10"
                        />
                    </div>

                    {/* Startup Monopoly */}
                    <div className="hidden select-none wallpaper-startup-monopoly:block absolute inset-0">
                        <CloudinaryImage
                            loading="lazy"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/startup_monopoly_2ac9d45ce3.png"
                            alt=""
                            width={1087}
                            height={540}
                            className="absolute right-0 top-0 w-[1087px] h-[540px]"
                        />
                    </div>

                    {/* Office party */}
                    <div className="hidden select-none wallpaper-office-party:block absolute inset-0">
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

                    {/* Keyboard garden */}
                    <div className="hidden select-none wallpaper-keyboard-garden:block">
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
                        <div
                            className={`absolute ${
                                websiteMode
                                    ? 'bottom-4 -right-4 @[2600px]:right-4'
                                    : 'bottom-4 md:bottom-12 -right-4 xs:right-8 md:right-0'
                            }`}
                        >
                            <CloudinaryImage
                                loading="lazy"
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/keyboard_garden_light_opt_compressed_5094746caf.png"
                                width={1401}
                                height={1400}
                                className={`${websiteMode ? '' : 'size-[300px] md:size-[700px]'} dark:hidden`}
                                style={
                                    websiteMode
                                        ? {
                                              width: 'clamp(8rem, calc(4rem + (100vw - 80rem) * 0.45), 42rem)',
                                              height: 'clamp(8rem, calc(4rem + (100vw - 80rem) * 0.45), 42rem)',
                                          }
                                        : undefined
                                }
                                draggable={false}
                            />
                            <CloudinaryImage
                                loading="lazy"
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/keyboard_garden_dark_opt_15e213413c.png"
                                width={1401}
                                height={1400}
                                className={`${websiteMode ? '' : 'size-[300px] md:size-[700px]'} hidden dark:block`}
                                style={
                                    websiteMode
                                        ? {
                                              width: 'clamp(8rem, calc(4rem + (100vw - 80rem) * 0.45), 42rem)',
                                              height: 'clamp(8rem, calc(4rem + (100vw - 80rem) * 0.45), 42rem)',
                                          }
                                        : undefined
                                }
                                draggable={false}
                            />
                        </div>
                    </div>

                    {/* 2001 bliss */}
                    <div
                        className="hidden select-none wallpaper-2001-bliss:block absolute inset-0 bg-repeat bg-center"
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

                    {/* Parade */}
                    <div className="hidden select-none wallpaper-parade:flex items-end fixed inset-0">
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

                    {/* Coding at night */}
                    <div className="hidden select-none wallpaper-coding-at-night:flex items-end fixed inset-0">
                        <CloudinaryImage
                            loading="lazy"
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/coding_at_night_5d7d21791e.png"
                            alt=""
                            width={2360}
                            height={696}
                            className="w-full"
                        />
                    </div>

                    {/* Action figure (April Fools) */}
                    <ActionFigureWallpaper />

                    {!websiteMode && (
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
                                            onPositionChange={(newPosition) =>
                                                handlePositionChange(app.label, newPosition)
                                            }
                                        />
                                    )
                                })}
                            </motion.ul>
                        </nav>
                    )}
                </div>
                {!compact && !websiteMode && (
                    <Screensaver
                        isActive={isInactive || screensaverPreviewActive}
                        onDismiss={handleScreensaverDismiss}
                    />
                )}
                {!websiteMode && <HedgeHogModeEmbed />}
            </ContextMenu>
            <NotificationsPanel />
            <ActionFigurePopup />
            {confetti && (
                <div className="fixed inset-0">
                    <ReactConfetti
                        onConfettiComplete={() => setConfetti(false)}
                        recycle={false}
                        numberOfPieces={1000}
                    />
                </div>
            )}
        </>
    )
}
