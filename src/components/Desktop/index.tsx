import React, { useState, useEffect } from 'react'
import { IconRewindPlay } from '@posthog/icons'
import Link from 'components/Link'
import { useApp } from '../../context/App'
import useProduct from 'hooks/useProduct'
import { IconDice, IconDemoThumb, IconMessages, IconImage, AppIcon } from 'components/OSIcons'
import { AppItem } from 'components/OSIcons/AppIcon'
import ContextMenu from 'components/RadixUI/ContextMenu'
import CloudinaryImage from 'components/CloudinaryImage'
import DraggableDesktopIcon from './DraggableDesktopIcon'

interface Product {
    name: string
    slug: string
    Icon: React.ComponentType<any>
    color?: string
}

const productLinks: AppItem[] = [
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
        label: 'notable customers.mdx',
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
]

const apps: AppItem[] = [
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
        label: 'Games',
        Icon: <AppIcon name="games" />,
        url: '/games',
    },
    {
        label: 'Photo booth',
        Icon: <AppIcon name="photobooth" />,
        url: '/photobooth',
    },
    {
        label: 'Talk to a human',
        Icon: <AppIcon name="contact" />,
        url: '/talk-to-a-human',
    },
]

interface IconPosition {
    x: number
    y: number
}

type IconPositions = Record<string, IconPosition>

const STORAGE_KEY = 'desktop-icon-positions'

export default function Desktop() {
    const { constraintsRef } = useApp()
    const [iconPositions, setIconPositions] = useState<IconPositions>({})

    const generateInitialPositions = (): IconPositions => {
        const positions: IconPositions = {}

        // Default positions if container isn't available yet
        const containerWidth =
            constraintsRef.current?.getBoundingClientRect().width ||
            (typeof window !== 'undefined' ? window.innerWidth : 1200)

        const leftColumnX = 16
        const rightColumnX = containerWidth - 112 - 16 // 112px icon width + 16px padding
        const startY = 16
        const iconSpacing = 105 // gap-y-5 = 20px + icon height ~85px

        // Position productLinks on the left
        productLinks.forEach((app, index) => {
            positions[app.label] = {
                x: leftColumnX,
                y: startY + index * iconSpacing,
            }
        })

        // Position apps on the right
        apps.forEach((app, index) => {
            positions[app.label] = {
                x: rightColumnX,
                y: startY + index * iconSpacing,
            }
        })

        return positions
    }

    useEffect(() => {
        const savedPositions = localStorage.getItem(STORAGE_KEY)
        if (savedPositions) {
            try {
                setIconPositions(JSON.parse(savedPositions))
            } catch (error) {
                console.error('Error parsing saved positions:', error)
                setIconPositions(generateInitialPositions())
            }
        } else {
            setIconPositions(generateInitialPositions())
        }
    }, [])

    const handlePositionChange = (appLabel: string, position: IconPosition) => {
        const newPositions = { ...iconPositions, [appLabel]: position }
        setIconPositions(newPositions)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newPositions))
    }

    const allApps = [...productLinks, ...apps]

    return (
        <ContextMenu
            menuItems={[
                {
                    type: 'item',
                    children: (
                        <Link to="/site-settings" state={{ newWindow: true }}>
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
                    className={`absolute bottom-0 right-0 size-full -z-10 
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
                        dark:wallpaper-startup-monopoly:bg-[#393836]
                        
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
                    <ul className="list-none m-0 p-0">
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
        </ContextMenu>
    )
}
