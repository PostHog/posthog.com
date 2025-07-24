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
    },
    {
        label: 'Products',
        Icon: <AppIcon name="folder" />,
        url: '/products',
    },
    {
        label: 'Pricing',
        Icon: <AppIcon name="pricing" />,
        url: '/pricing',
    },
    {
        label: 'customers.mdx',
        Icon: <AppIcon name="spreadsheet" />,
        url: '/customers',
    },
    {
        label: 'demo.mov',
        Icon: IconDemoThumb,
        url: '/demo',
        className: 'size-14 -my-1',
    },
    {
        label: 'Docs',
        Icon: <AppIcon name="notebook" />,
        url: '/docs',
    },
    {
        label: 'Talk to a human',
        Icon: <AppIcon name="contact" />,
        url: '/talk-to-a-human',
    },
]

export const apps: AppItem[] = [
    {
        label: 'Why PostHog?',
        Icon: <AppIcon name="tour" />,
        url: '/why',
    },
    {
        label: 'Company',
        Icon: <AppIcon name="posthog" />,
        url: '/about',
    },
    {
        label: 'Roadmap',
        Icon: <AppIcon name="map" />,
        url: '/roadmap',
    },
    {
        label: 'Forums',
        Icon: <AppIcon name="forums" />,
        url: '/questions',
    },
    {
        label: 'Fun stuff',
        Icon: <AppIcon name="games" />,
        url: '/sparks-joy',
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
    const iconHeight = 85

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
    const { constraintsRef, siteSettings } = useApp()
    const [iconPositions, setIconPositions] = useState<IconPositions>({})
    const { isInactive, dismiss } = useInactivityDetection({
        enabled: !siteSettings.screensaverDisabled,
    })

    const generateInitialPositions = (): IconPositions => {
        const positions: IconPositions = {}

        // Default positions if container isn't available yet
        const containerWidth =
            constraintsRef.current?.getBoundingClientRect().width ||
            (typeof window !== 'undefined' ? window.innerWidth : 1200)
        const containerHeight =
            constraintsRef.current?.getBoundingClientRect().height ||
            (typeof window !== 'undefined' ? window.innerHeight : 800)

        const iconWidth = 112
        const iconHeight = 85
        const padding = 16
        const columnSpacing = 128 // Space between columns (icon width + gap)

        const startY = padding
        const availableHeight = containerHeight - padding * 2 // Top and bottom padding
        const maxIconsPerColumn = Math.floor(availableHeight / iconHeight)

        // Position productLinks starting from the left
        let currentColumn = 0
        productLinks.forEach((app, index) => {
            const columnIndex = Math.floor(index / maxIconsPerColumn)
            const positionInColumn = index % maxIconsPerColumn

            positions[app.label] = {
                x: padding + columnIndex * columnSpacing,
                y: startY + positionInColumn * iconHeight,
            }

            currentColumn = Math.max(currentColumn, columnIndex + 1)
        })

        // Position apps starting from the right, but create new columns if needed
        const totalAppsColumns = Math.ceil(apps.length / maxIconsPerColumn)
        // Calculate the rightmost possible starting position for apps
        const rightmostStart = containerWidth - padding - iconWidth - (totalAppsColumns - 1) * columnSpacing
        // Ensure at least one column gap from productLinks
        const minStartFromLeft = (currentColumn + 1) * columnSpacing + padding
        const rightStartColumn = Math.max(rightmostStart, minStartFromLeft)

        apps.forEach((app, index) => {
            const columnIndex = Math.floor(index / maxIconsPerColumn)
            const positionInColumn = index % maxIconsPerColumn

            positions[app.label] = {
                x: rightStartColumn + columnIndex * columnSpacing,
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
                            <Link to="/display-options" state={{ newWindow: true }}>
                                Display options
                            </Link>
                        ),
                    },
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
                    <div
                        className={`fixed inset-0 -z-10 
                        wallpaper-hogzilla:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_bf40c5e271.png')] wallpaper-hogzilla:bg-contain 
                        wallpaper-hogzilla:bg-no-repeat
                        wallpaper-hogzilla:bg-right-bottom

                        wallpaper-office-party:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/carpet_light_27d74f73b5.png')]
                        dark:wallpaper-office-party:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/carpet_dark_f1c9f5ce39.png')]

                        wallpaper-office-party:bg-repeat 
                        wallpaper-office-party:bg-[length:200px_198px]
                        wallpaper-keyboard-garden:bg-[#E1D7C2]
                        dark:wallpaper-keyboard-garden:bg-[#37422D]

                        wallpaper-2001-bliss:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_1x_27e9e47112.jpg')]
                        wallpaper-2001-bliss:bg-cover
                        wallpaper-2001-bliss:bg-no-repeat
                        wallpaper-2001-bliss:bg-center

                        wallpaper-coding-at-night:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/coding_at_night_5d7d21791e.png')]
                        wallpaper-coding-at-night:bg-[#54618E]
                        wallpaper-coding-at-night:bg-contain
                        wallpaper-coding-at-night:bg-no-repeat
                        wallpaper-coding-at-night:bg-bottom

                        wallpaper-parade:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/parade_light_ffe041646a.png')] 
                        dark:wallpaper-parade:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/parade_dark_238d90c5ef.png')] 
                        wallpaper-parade:bg-contain 
                        wallpaper-parade:bg-no-repeat
                        wallpaper-parade:bg-left-bottom

                        wallpaper-startup-monopoly:bg-[url('https://res.cloudinary.com/dmukukwp6/image/upload/startup_monopoly_2ac9d45ce3.png')] 
                        wallpaper-startup-monopoly:bg-[length:1087px_540px]
                        wallpaper-startup-monopoly:bg-no-repeat
                        wallpaper-startup-monopoly:bg-right-top
                        wallpaper-startup-monopoly:bg-[#FEFCED]
                        dark:wallpaper-startup-monopoly:bg-[#1d1f27]
                        
                    `}
                    />
                    <div className="hidden wallpaper-office-party:block absolute bottom-24 left-24">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/office_cc4ae8675f.png"
                            alt="Office party"
                            width={997}
                            height={858}
                            className="w-[498.5px] h-[429px]"
                        />
                    </div>
                    <div className="hidden wallpaper-keyboard-garden:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/keyboard_garden_7b4f9e93b6.png"
                            alt="Office party"
                            width={1242}
                            height={1128}
                            className="w-[621px] h-[564px]"
                        />
                    </div>
                    <div className="hidden wallpaper-2001-bliss:block absolute inset-0 bg-white/60 dark:bg-black/60"></div>

                    <nav>
                        <ul className="list-none m-0 p-0 grid sm:grid-cols-4 grid-cols-3 gap-2 md:mt-0 mt-4">
                            {allApps.map((app) => {
                                const position = iconPositions[app.label]
                                if (!position) return null

                                return (
                                    <DraggableDesktopIcon
                                        key={app.label}
                                        app={app}
                                        initialPosition={position}
                                        onPositionChange={(newPosition) => handlePositionChange(app.label, newPosition)}
                                    />
                                )
                            })}
                        </ul>
                    </nav>
                </div>
                <Screensaver isActive={isInactive} onDismiss={dismiss} />
            </ContextMenu>
            <NotificationsPanel />
        </>
    )
}
