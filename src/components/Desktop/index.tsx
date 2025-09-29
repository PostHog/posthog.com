import React, { useState, useEffect } from 'react'
import { IconRewindPlay, IconX } from '@posthog/icons'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import useProduct from 'hooks/useProduct'
import { IconDice, IconDemoThumb, IconMessages, IconImage, AppIcon } from 'components/OSIcons'
import { AppItem } from 'components/OSIcons/AppIcon'
import ContextMenu from 'components/RadixUI/ContextMenu'
import CloudinaryImage from 'components/CloudinaryImage'
import DraggableDesktopIcon from './DraggableDesktopIcon'
import { Screensaver } from '../Screensaver'
import { useInactivityDetection } from '../../hooks/useInactivityDetection'
import NotificationsPanel from 'components/NotificationsPanel'
import useTheme from '../../hooks/useTheme'
import { motion } from 'framer-motion'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import HedgeHogModeEmbed from 'components/HedgehogMode'
import ReactConfetti from 'react-confetti'
import OSButton from 'components/OSButton'

interface Product {
    name: string
    slug: string
    Icon: React.ComponentType<any>
    color?: string
}

export const productLinks: AppItem[] = [
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
]

export const apps: AppItem[] = [
    {
        label: 'Why PostHog?',
        Icon: <AppIcon name="posthog" />,
        url: '/about',
        source: 'desktop',
    },
    {
        label: 'Roadmap',
        Icon: <AppIcon name="map" />,
        url: '/roadmap',
        source: 'desktop',
    },
    {
        label: 'Forums',
        Icon: <AppIcon name="forums" />,
        url: '/questions',
        source: 'desktop',
    },
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

const validateIconPositions = (positions: IconPositions, constraintsRef: React.RefObject<HTMLDivElement>): boolean => {
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

export default function Desktop() {
    const {
        constraintsRef,
        siteSettings,
        screensaverPreviewActive,
        setScreensaverPreviewActive,
        setConfetti,
        confetti,
        compact,
    } = useApp()
    const [iconPositions, setIconPositions] = useState<IconPositions>(generateInitialPositions())
    const { isInactive, dismiss } = useInactivityDetection({
        enabled: !siteSettings.screensaverDisabled,
    })
    const [rendered, setRendered] = useState(false)
    const { getWallpaperClasses } = useTheme()

    function generateInitialPositions(): IconPositions {
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
        productLinks.forEach((app, index) => {
            const columnIndex = Math.floor(index / maxIconsPerColumn)
            const positionInColumn = index % maxIconsPerColumn

            positions[app.label] = {
                x: paddingHorizontal + columnIndex * columnSpacing,
                y: startY + positionInColumn * iconHeight,
            }

            currentColumn = Math.max(currentColumn, columnIndex + 1)
        })

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

        return positions
    }

    useEffect(() => {
        const savedPositions = localStorage.getItem(STORAGE_KEY)
        if (savedPositions) {
            try {
                const parsedPositions = JSON.parse(savedPositions)

                // Validate that all positions are within viewport bounds
                if (validateIconPositions(parsedPositions, constraintsRef)) {
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

        setRendered(true)

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
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
                    {/* Hogzilla */}
                    <div className="hidden select-none wallpaper-hogzilla:flex items-end justify-end absolute inset-0">
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
                        <div className="absolute bottom-4 md:bottom-12 -right-4 xs:right-8 md:right-0">
                            <CloudinaryImage
                                loading="lazy"
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
                            <div className="absolute -left-20 md:-left-40 bottom-20 md:bottom-48">
                                <OSButton
                                    asLink
                                    zoomHover="lg"
                                    to="/blog/series-e"
                                    tooltip="We raised a Series E"
                                    state={{ newWindow: true }}
                                    className="hover:!border-transparent active:!bg-transparent"
                                >
                                    <CloudinaryImage
                                        loading="lazy"
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/series_e_b3934cffe7.png"
                                        alt="We raised a Series E"
                                        width={452}
                                        height={569}
                                        className="w-24 md:w-auto md:max-w-[226px] inline-block"
                                    />
                                </OSButton>
                            </div>
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
                        onDismiss={() => {
                            setScreensaverPreviewActive(false)
                            dismiss()
                        }}
                    />
                )}
                <HedgeHogModeEmbed />
            </ContextMenu>
            <NotificationsPanel />
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
