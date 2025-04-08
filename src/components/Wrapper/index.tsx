import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import {
    IconCollapse45,
    IconExpand45,
    IconMinus,
    IconX,
    IconCode,
    IconTextWidth,
    IconLightBulb,
    IconDay,
    IconNight,
    IconLaptop,
    IconChevronRight,
    IconLogomark,
    IconApps,
    IconSearch,
    IconChatHelp,
    IconUser,
    IconLetter,
    IconUpload,
    IconLock,
    IconMessage,
    IconApp,
} from '@posthog/icons'
import { useApp } from '../../context/App'
import { Provider as WindowProvider } from '../../context/Window'
import Desktop from 'components/Desktop'
import { DarkModeToggle } from 'components/DarkModeToggle'
import { Popover } from 'components/RadixUI/Popover'
import { Root as PopoverRoot } from '@radix-ui/react-popover'
import { Root as Toggle } from '@radix-ui/react-toggle'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { Fieldset } from 'components/OSFieldset'
import MenuBar, { MenuType } from 'components/RadixUI/MenuBar'
import { productMenu } from '../../navs/index.js'
import * as Icons from '@posthog/icons'
import OSButton from 'components/OSButton'
import { useUser } from 'hooks/useUser'
import { useLocation } from '@reach/router'
import { CallToAction } from 'components/CallToAction'
import { SignupCTA } from 'components/SignupCTA'
import HoverTooltip from 'components/Tooltip'
import dayjs from 'dayjs'
import usePostHog from 'hooks/usePostHog'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import MediaUploadModal from 'components/MediaUploadModal'
import SideModal from 'components/Modal/SideModal'
import { Authentication } from 'components/Squeak'
import Link from 'components/Link'

interface ProductMenuItem {
    name: string
    url: string
    icon: string
    color: string
}

interface ProductMenu {
    children: ProductMenuItem[]
}

const getSizeDefaults = () => ({
    max: {
        width: window.innerWidth * 0.9,
        height: window.innerHeight * 0.9,
    },
    min: {
        width: window.innerWidth * 0.2,
        height: window.innerHeight * 0.2,
    },
})

const getProductMenuItems = () => {
    const products = (productMenu as ProductMenu).children
        .filter((product) => {
            const key = product.url.replace('/', '')
            // Only filter out the "All products" entry
            return key !== 'products'
        })
        .map((product) => {
            const IconComponent = Icons[product.icon as keyof typeof Icons]
            return {
                type: 'item' as const,
                label: product.name,
                link: product.url,
                icon: <IconComponent className={`text-${product.color} size-4`} />,
            }
        })

    // Add separator and "All Products" at the bottom
    return [
        ...products,
        { type: 'separator' as const },
        {
            type: 'item' as const,
            label: 'All Products',
            link: '/products',
            icon: <IconApps className="text-red size-4" />,
        },
    ]
}

export const menuData: MenuType[] = [
    {
        trigger: (
            <>
                <IconLogomark className="size-6" />
            </>
        ),
        items: [
            {
                type: 'item',
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
            {
                type: 'item',
                label: 'Display options',
                link: '/display-options',
            },
        ],
    },
    {
        trigger: 'Products',
        items: getProductMenuItems(),
    },
    {
        trigger: 'Pricing',
        items: [
            {
                type: 'item',
                label: 'Plans & usage-based pricing',
                link: '/pricing',
            },
            {
                type: 'item',
                label: 'Pricing calculator',
                link: '/calculator',
            },
            {
                type: 'item',
                label: 'Add-ons',
                link: '/addons',
            },
            {
                type: 'item',
                label: 'Pricing philosophy',
                link: '/pricing/philosophy',
            },
            {
                type: 'item',
                label: 'How we do sales',
                link: '/sales',
            },
            {
                type: 'item',
                label: 'Founder stack',
                link: '/founders',
            },
            {
                type: 'item',
                label: 'Enterprise',
                link: '/enterprise',
            },
        ],
    },
    {
        trigger: 'Docs',
        items: [
            {
                type: 'item',
                label: 'Getting started',
                link: '/docs/getting-started/install',
            },
            { type: 'separator' },
            {
                type: 'submenu',
                label: 'Product OS',
                items: [
                    {
                        type: 'item',
                        label: 'What is Product OS?',
                        link: '/docs/product-os',
                    },
                    {
                        type: 'item',
                        label: 'Notebooks',
                        link: '/docs/notebooks',
                    },
                    {
                        type: 'item',
                        label: 'Toolbar',
                        link: '/docs/toolbar',
                    },
                    {
                        type: 'item',
                        label: 'Max AI',
                        link: '/docs/max-ai',
                    },
                ],
            },
            { type: 'separator' },
            {
                type: 'submenu',
                label: 'Products',
                items: [
                    {
                        type: 'item',
                        label: 'Email Link',
                    },
                    {
                        type: 'item',
                        label: 'Messages',
                    },
                    {
                        type: 'item',
                        label: 'Notes',
                    },
                ],
            },
            { type: 'separator' },
            {
                type: 'submenu',
                label: 'Self-host',
                items: [
                    {
                        type: 'item',
                        label: 'Overview',
                        link: '/docs/self-host',
                    },
                    {
                        type: 'item',
                        label: 'Configure',
                        link: '/docs/self-host/configure',
                    },
                    {
                        type: 'item',
                        label: 'Troubleshooting',
                        link: '/docs/self-host/deploy/troubleshooting',
                    },
                ],
            },
        ],
    },
    {
        trigger: 'Company',
        items: [
            {
                type: 'item',
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
            { type: 'separator' },
            {
                type: 'submenu',
                label: 'Share',
                items: [
                    {
                        type: 'item',
                        label: 'Email Link',
                    },
                    {
                        type: 'item',
                        label: 'Messages',
                    },
                    {
                        type: 'item',
                        label: 'Notes',
                    },
                ],
            },
            { type: 'separator' },
            {
                type: 'item',
                label: 'Print…',
                shortcut: '⌘ P',
            },
        ],
    },
    {
        trigger: (
            <>
                <span className="ml-1">More</span>
            </>
        ),
        items: [
            {
                type: 'item',
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
        ],
    },
]

const fixedAppSizes = {
    '/display-options': {
        max: {
            width: 600,
            height: 400,
        },
        min: {
            width: 600,
            height: 400,
        },
    },
}

const Window = ({ item, constraintsRef, taskbarHeight }: { item: any; constraintsRef: any; taskbarHeight: number }) => {
    const { minimizeWindow, bringToFront, closeWindow, focusedWindow } = useApp()
    const controls = useDragControls()
    const [sizeDefaults, setSizeDefaults] = useState(fixedAppSizes[item.key] || getSizeDefaults())
    const [previousSize, setPreviousSize] = useState({ width: sizeDefaults.max.width, height: sizeDefaults.max.height })
    const [size, setSize] = useState({ width: sizeDefaults.max.width, height: sizeDefaults.max.height })
    const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 })
    const [position, setPosition] = useState(() => ({
        x: window.innerWidth / 2 - size.width / 2,
        y: window.innerHeight / 2 - size.height / 2,
    }))
    const [wasMinimized, setWasMinimized] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setSizeDefaults(getSizeDefaults())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (item.minimized) {
            setWasMinimized(true)
        }
    }, [item.minimized])

    const handleDoubleClick = () => {
        setSize((prev) => (prev.width === sizeDefaults.max.width ? sizeDefaults.min : sizeDefaults.max))
    }

    const expandWindow = () => {
        setPreviousSize(size)
        setPreviousPosition(position)
        setPosition({ x: 0, y: 0 })
        setSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight })
    }

    const collapseWindow = () => {
        setSize(previousSize)
        setPosition(previousPosition)
    }

    const getClockRewindPosition = () => {
        const activeWindowsButton = document.querySelector('[data-active-windows]')
        if (!activeWindowsButton) return { x: 0, y: 0 }
        const rect = activeWindowsButton.getBoundingClientRect()
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        }
    }

    const handleMinimize = () => {
        minimizeWindow(item)
        // Trigger the animation in the TaskBarMenu
        const taskbarMenu = document.querySelector('#taskbar')
        if (taskbarMenu) {
            const event = new CustomEvent('windowMinimized')
            taskbarMenu.dispatchEvent(event)
        }
    }

    return (
        <WindowProvider appWindow={item}>
            <AnimatePresence>
                {!item.minimized && (
                    <motion.div
                        layoutId={`window-${item.key}`}
                        className={`absolute flex flex-col border rounded overflow-hidden !select-auto  ${
                            focusedWindow === item
                                ? 'shadow-2xl border-light-7 dark:border-dark-7'
                                : 'shadow-lg border-light-4 dark:border-dark-4'
                        }`}
                        style={{
                            width: size.width,
                            height: size.height,
                            zIndex: item.zIndex,
                        }}
                        initial={
                            wasMinimized
                                ? {
                                      scale: 0.005,
                                      x: getClockRewindPosition().x - size.width / 2,
                                      y: getClockRewindPosition().y - size.height / 2,
                                  }
                                : { scale: 0.005 }
                        }
                        animate={{
                            scale: 1,
                            x: Math.round(position.x),
                            y: Math.round(position.y),
                            transition: {
                                scale: {
                                    duration: 0.3,
                                    ease: [0.2, 0.2, 0.8, 1],
                                },
                            },
                        }}
                        exit={{
                            scale: 0.005,
                            x: getClockRewindPosition().x - size.width / 2,
                            y: getClockRewindPosition().y - size.height / 2,
                            transition: {
                                scale: {
                                    duration: 0.23,
                                    ease: [0.2, 0.2, 0.8, 1],
                                },
                                x: {
                                    duration: 0.23,
                                    ease: [0.2, 0.2, 0.8, 1],
                                },
                                y: {
                                    duration: 0.23,
                                    ease: [0.2, 0.2, 0.8, 1],
                                },
                            },
                        }}
                        drag
                        dragControls={controls}
                        dragListener={false}
                        dragMomentum={false}
                        dragConstraints={constraintsRef}
                        onDragEnd={(event, info) => {
                            if (!constraintsRef.current) return

                            const bounds = constraintsRef.current.getBoundingClientRect()
                            const newX = position.x + info.offset.x
                            const newY = position.y + info.offset.y

                            const constrainedX = Math.round(Math.min(Math.max(0, newX), bounds.width - size.width))
                            const constrainedY = Math.round(Math.min(Math.max(0, newY), bounds.height - size.height))

                            setPosition({
                                x: constrainedX,
                                y: constrainedY,
                            })
                        }}
                        onMouseDown={() => bringToFront(item)}
                    >
                        <div
                            data-scheme="tertiary"
                            onDoubleClick={handleDoubleClick}
                            className="flex-shrink-0 w-full flex items-center justify-between p-2 bg-primary cursor-move"
                            onPointerDown={(e) => controls.start(e)}
                        >
                            <p className="m-0 text-sm font-semibold line-clamp-1">
                                {item.meta?.title && item.meta.title}
                            </p>
                            <div className="flex space-x-2">
                                <button onClick={handleMinimize}>
                                    <IconMinus className="size-4" />
                                </button>
                                <button onClick={size.width >= window?.innerWidth ? collapseWindow : expandWindow}>
                                    {size.width >= window?.innerWidth ? (
                                        <IconCollapse45 className="size-4" />
                                    ) : (
                                        <IconExpand45 className="size-4" />
                                    )}
                                </button>
                                <button
                                    onClick={() => {
                                        // Set minimized first to trigger exit animation
                                        minimizeWindow(item)
                                        // Then close after animation duration
                                        setTimeout(() => closeWindow(item), 250)
                                    }}
                                >
                                    <IconX className="size-4" />
                                </button>
                            </div>
                        </div>
                        <div className="w-full flex-grow overflow-auto">{item.element}</div>
                        <motion.div
                            className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                            drag
                            dragMomentum={false}
                            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
                            onDrag={(_event, info) => {
                                setSize((prev) => ({
                                    width: Math.min(
                                        Math.max(prev.width + info.delta.x, sizeDefaults.min.width),
                                        sizeDefaults.max.width
                                    ),
                                    height: Math.min(
                                        Math.max(prev.height + info.delta.y, sizeDefaults.min.height),
                                        sizeDefaults.max.height
                                    ),
                                }))
                            }}
                        />
                        <motion.div
                            className="absolute right-0 top-0 w-1 h-full cursor-ew-resize"
                            drag="x"
                            dragMomentum={false}
                            dragConstraints={{ left: 0, right: 0 }}
                            onDrag={(_event, info) => {
                                setSize((prev) => ({
                                    ...prev,
                                    width: Math.min(
                                        Math.max(prev.width + info.delta.x, sizeDefaults.min.width),
                                        sizeDefaults.max.width
                                    ),
                                }))
                            }}
                        />
                        <motion.div
                            className="absolute bottom-0 left-0 w-full h-1 cursor-ns-resize"
                            drag="y"
                            dragMomentum={false}
                            dragConstraints={{ top: 0, bottom: 0 }}
                            onDrag={(_event, info) => {
                                setSize((prev) => ({
                                    ...prev,
                                    height: Math.min(
                                        Math.max(prev.height + info.delta.y, sizeDefaults.min.height),
                                        sizeDefaults.max.height
                                    ),
                                }))
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </WindowProvider>
    )
}

const colorModeOptions: ToggleOption[] = [
    {
        label: 'System',
        value: 'system',
        icon: <IconLaptop className="size-5" />,
    },
    {
        label: 'Light',
        value: 'light',
        icon: <IconDay className="size-5" />,
        default: true,
    },
    {
        label: 'Dark',
        value: 'dark',
        icon: <IconNight className="size-5" />,
    },
]

const SiteOptionsButton = () => {
    const [colorMode, setColorMode] = useState('system')
    const handleColorModeChange = (value: string) => {
        window.__setPreferredTheme(value)
        setColorMode(value)
    }

    useEffect(() => {
        const colorMode = localStorage.getItem('theme') || 'system'
        setColorMode(colorMode)
    }, [])

    return (
        <Popover title="Settings" dataScheme="secondary" trigger={<span>Site options</span>} contentClassName="w-80">
            <div className="w-full h-full bg-primary text-primary">
                <Fieldset legend="Display">
                    <div className="grid grid-cols-2 gap-2">
                        <label className="pt-1.5 text-[15px]">Color mode</label>
                        <ToggleGroup
                            title="Color mode"
                            options={colorModeOptions}
                            onValueChange={handleColorModeChange}
                            value={colorMode}
                        />
                    </div>
                </Fieldset>
            </div>
        </Popover>
    )
}

const TaskBarMenu = ({ children }: { children?: React.ReactNode }) => {
    const { windows, bringToFront, focusedWindow } = useApp()
    const [isAnimating, setIsAnimating] = useState(false)
    const totalWindows = windows.length
    const [isOpen, setIsOpen] = useState(false)
    const { user, logout, notifications, fetchUser } = useUser()
    const [showMediaUploadModal, setShowMediaUploadModal] = useState(false)
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [showNotifications, setShowNotifications] = useState(false)
    const location = useLocation()
    const posthog = usePostHog()
    const isLoggedIn = !!user
    const [fullWidthContent, setFullWidthContent] = useState(true)
    const [enterpriseMode, setEnterpriseMode] = useState(false)
    const [hedgehogModeEnabled, setHedgehogModeEnabled] = useState(false)
    const [compact, setCompact] = useState(false)

    useEffect(() => {
        let mounted = true
        if (!user && !isLoggedIn) {
            fetchUser().catch(() => {
                if (mounted) {
                    // Only update state if component is still mounted
                    setShowAuthModal(true)
                }
            })
        }
        return () => {
            mounted = false
        }
    }, [user, isLoggedIn, fetchUser])

    useEffect(() => {
        // Reset animation state after it completes
        if (isAnimating) {
            const timer = setTimeout(() => setIsAnimating(false), 500)
            return () => clearTimeout(timer)
        }
    }, [isAnimating])

    useEffect(() => {
        const handleWindowMinimized = () => {
            setIsAnimating(true)
        }

        const taskbar = document.querySelector('#taskbar')
        if (taskbar) {
            taskbar.addEventListener('windowMinimized', handleWindowMinimized)
            return () => {
                taskbar.removeEventListener('windowMinimized', handleWindowMinimized)
            }
        }
    }, [])

    const handleWindowClick = (window: any) => {
        bringToFront(window)
        setIsOpen(false)
    }

    return (
        <motion.div
            id="taskbar"
            data-scheme="primary"
            initial={{ translateY: '100%' }}
            animate={{ translateY: 0 }}
            exit={{ translateY: '100%' }}
            className="fixed top-0 left-0 w-full bg-accent border-b border-primary z-50 flex justify-between pl-0.5 pr-2"
        >
            <MenuBar menus={menuData} />
            <aside className="flex items-center gap-px py-0.5">
                <OSButton variant="ghost" size="md">
                    <IconSearch className="size-5" />
                </OSButton>
                <OSButton variant="ghost" size="md">
                    <IconChatHelp className="size-5" />
                </OSButton>
                <PopoverRoot open={isOpen} onOpenChange={setIsOpen}>
                    <Popover
                        trigger={
                            <motion.div
                                animate={
                                    isAnimating
                                        ? {
                                              scale: [1, 1.2, 1],
                                              rotate: [0, -5, 5, -5, 5, 0],
                                          }
                                        : {}
                                }
                                transition={{
                                    duration: 0.5,
                                    ease: 'easeInOut',
                                    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                                }}
                            >
                                <OSButton
                                    variant="ghost"
                                    size="md"
                                    data-active-windows
                                    className="border-2 border-primary"
                                >
                                    <span className="text-sm font-semibold">{totalWindows}</span>
                                </OSButton>
                            </motion.div>
                        }
                        title="Active Windows"
                        dataScheme="primary"
                    >
                        <div className="flex flex-col gap-1 min-w-[200px]">
                            {windows.map((window) => (
                                <button
                                    key={window.key}
                                    onClick={() => handleWindowClick(window)}
                                    className="text-left px-2 py-1.5 rounded hover:bg-accent dark:hover:bg-accent-dark text-sm flex items-center gap-2"
                                >
                                    <span
                                        className={`truncate ${
                                            window.minimized ? 'italic' : focusedWindow === window ? 'font-bold' : ''
                                        }`}
                                    >
                                        {window.meta?.title || 'Untitled'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </Popover>
                </PopoverRoot>
                <Popover
                    title={isLoggedIn ? 'Account' : 'Sign in'}
                    trigger={
                        <div>
                            <OSButton variant="ghost" size="md">
                                {isLoggedIn ? (
                                    <div className="relative">
                                        <img
                                            src={getAvatarURL(user?.profile)}
                                            className={`size-5 rounded-full bg-${
                                                user?.profile?.color ?? 'white dark:bg-dark'
                                            }`}
                                            alt=""
                                        />
                                        {notifications?.length > 0 && (
                                            <span className="absolute -top-1 -right-1 size-2 bg-red rounded-full" />
                                        )}
                                    </div>
                                ) : (
                                    <IconUser className="size-5" />
                                )}
                            </OSButton>
                        </div>
                    }
                    dataScheme="primary"
                >
                    <div className="w-full h-full bg-primary text-primary">
                        {isLoggedIn ? (
                            <>
                                <div className="px-2 py-1.5 border-b border-light dark:border-dark">
                                    <p className="m-0 text-sm font-semibold">
                                        {user?.profile?.firstName} {user?.profile?.lastName}
                                    </p>
                                    <p className="m-0 text-xs opacity-60">{user?.email}</p>
                                </div>
                                <ul className="list-none text-left m-0 p-0 pb-[3px] space-y-[2px]">
                                    <li className="bg-border/20 dark:bg-border-dark/20 border-b border-light dark:border-dark text-[13px] px-2 py-1.5 text-primary/50 dark:text-primary-dark/60 z-20 m-0 !mb-[3px] font-semibold">
                                        Go to...
                                    </li>
                                    <li className="px-1">
                                        <Link
                                            className="group/item text-sm px-2 py-2 rounded-sm hover:bg-accent dark:hover:bg-accent-dark block"
                                            to="https://app.posthog.com"
                                        >
                                            <IconApp className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                            PostHog app
                                        </Link>
                                    </li>
                                    <li className="bg-border/20 dark:bg-border-dark/20 border-y border-light dark:border-dark text-[13px] px-2 py-1.5 !my-1 text-primary/50 dark:text-primary-dark/60 z-20 m-0 font-semibold">
                                        Community
                                    </li>
                                    <li className="px-1">
                                        <Link
                                            className="group/item text-sm px-2 py-2 rounded-sm hover:bg-accent dark:hover:bg-accent-dark block"
                                            to="/questions"
                                        >
                                            <IconMessage className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                            Forums
                                        </Link>
                                    </li>
                                    <li className="px-1">
                                        <Link
                                            className="group/item flex items-center text-sm px-2 py-2 rounded-sm hover:bg-accent dark:hover:bg-accent-dark justify-between"
                                            to="/community/notifications"
                                        >
                                            <span>
                                                <IconLetter className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                Notifications
                                            </span>
                                            {notifications?.length > 0 && (
                                                <span className="ml-auto text-xs bg-red text-white px-1.5 py-0.5 rounded-full">
                                                    {notifications.length}
                                                </span>
                                            )}
                                        </Link>
                                    </li>
                                    <li className="px-1">
                                        <Link
                                            className="group/item flex items-center text-sm px-2 py-2 rounded-sm hover:bg-accent dark:hover:bg-accent-dark"
                                            to={`/community/profiles/${user?.profile?.id}`}
                                        >
                                            <IconUser className="opacity-50 inline-block w-6 group-hover/parent:opacity-75 mr-2" />
                                            My profile
                                        </Link>
                                    </li>
                                    <li className="px-1">
                                        <button
                                            onClick={() => {
                                                setShowMediaUploadModal(true)
                                                posthog?.capture('opened media upload modal')
                                            }}
                                            className="group/item flex items-center text-sm px-2 py-2 rounded-sm hover:bg-accent dark:hover:bg-accent-dark w-full"
                                        >
                                            <IconUpload className="opacity-50 inline-block w-6 group-hover/parent:opacity-75 mr-2" />
                                            Upload media
                                        </button>
                                    </li>
                                    <li className="px-1">
                                        <button
                                            onClick={() => {
                                                logout()
                                                posthog?.capture('logged out')
                                            }}
                                            className="group/item flex items-center text-sm px-2 py-2 rounded-sm hover:bg-accent dark:hover:bg-accent-dark w-full"
                                        >
                                            <IconLock className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                            Community logout
                                        </button>
                                    </li>
                                    <li className="bg-border/20 dark:bg-border-dark/20 border-y border-light dark:border-dark text-[13px] px-2 py-1.5 !my-1 text-primary/50 dark:text-primary-dark/60 z-20 m-0 font-semibold">
                                        Site settings
                                    </li>
                                    <li className="px-1">
                                        <DarkModeToggle />
                                    </li>
                                    <li className="hidden md:block px-1">
                                        <button
                                            onClick={() => {
                                                setFullWidthContent(!fullWidthContent)
                                                if (posthog) {
                                                    posthog.people.set({
                                                        preferred_viewing_mode: !fullWidthContent ? 'wide' : 'standard',
                                                    })
                                                }
                                            }}
                                            className="group/item text-sm px-2 py-2 rounded-sm hover:bg-accent dark:hover:bg-accent-dark flex justify-between items-center w-full"
                                        >
                                            <div>
                                                <IconTextWidth className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                <span>Wide mode</span>
                                            </div>
                                            <Toggle
                                                pressed={fullWidthContent}
                                                onPressedChange={(pressed) => {
                                                    setFullWidthContent(pressed)
                                                    if (posthog) {
                                                        posthog.people.set({
                                                            preferred_viewing_mode: pressed ? 'wide' : 'standard',
                                                        })
                                                    }
                                                }}
                                                className="group data-[state=on]:bg-green data-[state=off]:bg-accent rounded-full w-8 h-4 relative"
                                            >
                                                <span className="block w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-200 ease-in-out group-data-[state=on]:translate-x-4" />
                                            </Toggle>
                                        </button>
                                    </li>
                                    {location.pathname === '/' && (
                                        <li className="px-1">
                                            <button
                                                onClick={() => setEnterpriseMode(!enterpriseMode)}
                                                className="group/item text-sm px-2 py-2 rounded-sm hover:bg-accent dark:hover:bg-accent-dark flex justify-between items-center w-full"
                                            >
                                                <div>
                                                    <IconCode className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                    <span>Enterprise mode</span>
                                                </div>
                                                <Toggle
                                                    pressed={enterpriseMode}
                                                    onPressedChange={setEnterpriseMode}
                                                    className="group data-[state=on]:bg-green data-[state=off]:bg-accent rounded-full w-8 h-4 relative"
                                                >
                                                    <span className="block w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-200 ease-in-out group-data-[state=on]:translate-x-4" />
                                                </Toggle>
                                            </button>
                                        </li>
                                    )}
                                    {!compact && (
                                        <li className="px-1">
                                            <button
                                                onClick={() => setHedgehogModeEnabled(!hedgehogModeEnabled)}
                                                className="group/item text-sm px-2 py-2 rounded-sm hover:bg-accent dark:hover:bg-accent-dark flex justify-between items-center w-full"
                                            >
                                                <div>
                                                    <IconLightBulb className="opacity-50 group-hover/item:opacity-75 inline-block mr-2 w-6" />
                                                    <span>Hedgehog mode</span>
                                                </div>
                                                <Toggle
                                                    pressed={hedgehogModeEnabled}
                                                    onPressedChange={setHedgehogModeEnabled}
                                                    className="group data-[state=on]:bg-green data-[state=off]:bg-accent rounded-full w-8 h-4 relative"
                                                >
                                                    <span className="block w-3 h-3 bg-white rounded-full absolute top-0.5 left-0.5 transition-all duration-200 ease-in-out group-data-[state=on]:translate-x-4" />
                                                </Toggle>
                                            </button>
                                        </li>
                                    )}
                                </ul>
                            </>
                        ) : (
                            <div className="p-2">
                                <SignupCTA />
                            </div>
                        )}
                    </div>
                </Popover>
            </aside>
        </motion.div>
    )
}

const TaskBar = () => {
    const { windows, focusedWindow, bringToFront, minimizeWindow } = useApp()
    return (
        <AnimatePresence>
            {windows.length > 0 && (
                <motion.div
                    id="taskbar"
                    data-scheme="secondary"
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: '100%' }}
                    className="fixed bottom-0 left-0 w-full p-0.5 bg-primary border-t border-primary z-50 flex justify-between"
                >
                    <ul className="m-0 p-0 list-none flex space-x-1">
                        {windows.map((appWindow) => {
                            const active = !appWindow.minimized && focusedWindow === appWindow
                            return (
                                <li key={appWindow.key}>
                                    <motion.button
                                        layoutId={`window-${appWindow.key}`}
                                        onClick={() => (active ? minimizeWindow(appWindow) : bringToFront(appWindow))}
                                        className={`text-sm py-1 px-2 font-semibold border border-border dark:border-dark ${
                                            active ? 'bg-white dark:bg-black' : ''
                                        }`}
                                    >
                                        {appWindow.meta?.title}
                                    </motion.button>
                                </li>
                            )
                        })}
                    </ul>
                    <SiteOptionsButton />
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function Wrapper() {
    const constraintsRef = useRef(null)
    const { windows } = useApp()
    const [taskbarHeight, setTaskbarHeight] = useState(0)

    useEffect(() => {
        const updateTaskbarHeight = () => {
            const height = document.querySelector('#taskbar')?.getBoundingClientRect().height || 0
            setTaskbarHeight(height)
        }

        // Initial calculation
        updateTaskbarHeight()

        // Update on window resize
        window.addEventListener('resize', updateTaskbarHeight)
        return () => window.removeEventListener('resize', updateTaskbarHeight)
    }, [])

    return (
        <div ref={constraintsRef} className="fixed inset-0 size-full">
            <TaskBarMenu>
                <SiteOptionsButton />
            </TaskBarMenu>
            <Desktop menuBarOffset={taskbarHeight} />
            {windows.map((item) => (
                <Window item={item} key={item.key} constraintsRef={constraintsRef} taskbarHeight={taskbarHeight} />
            ))}
            <TaskBar />
        </div>
    )
}
