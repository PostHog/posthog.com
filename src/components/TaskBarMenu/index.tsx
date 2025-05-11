import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconSearch, IconChatHelp, IconUser, IconApp, IconMessage, IconLetter, IconLock } from '@posthog/icons'
import { useApp } from '../../context/App'

import { Popover } from 'components/RadixUI/Popover'
import { Root as PopoverRoot } from '@radix-ui/react-popover'
import MenuBar, { MenuType, MenuItemType } from 'components/RadixUI/MenuBar'
import OSButton from 'components/OSButton'
import { useUser } from 'hooks/useUser'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import { menuData } from './menuData'
import { Authentication } from 'components/Squeak'
import Link from 'components/Link'
import Orders from 'components/MainNav'
import { StrapiRecord, ProfileData } from 'lib/strapi'
import { Avatar as MainNavAvatar } from 'components/MainNav'

export default function TaskBarMenu() {
    const { windows, bringToFront, focusedWindow } = useApp()
    const [isAnimating, setIsAnimating] = useState(false)
    const totalWindows = windows.length
    const [isWindowPopoverOpen, setIsWindowPopoverOpen] = useState(false)
    const { user, notifications, logout } = useUser()
    const [showAuthPanel, setShowAuthPanel] = useState(false)

    const isLoggedIn = !!user

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
        setIsWindowPopoverOpen(false)
    }

    const handleSignInClick = () => {
        setShowAuthPanel(true)
        // Close the menu by blurring the active element
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
    }

    const accountMenu: MenuType[] = [
        {
            trigger: (
                <>
                    {isLoggedIn ? (
                        <>
                            <div className="relative">
                                <img
                                    src={getAvatarURL(user?.profile)}
                                    className={`size-6 rounded-full bg-${
                                        user?.profile?.color ?? 'white dark:bg-dark'
                                    }`}
                                    alt=""
                                />
                                {notifications?.length > 0 && (
                                    <span className="absolute top-4 -right-1 size-2.5 bg-red border border-accent rounded-full" />
                                )}
                            </div>
                        
                        </>
                    ) : (
                        <IconUser className="size-6" />
                    )}
                </>
            ),
            items: user
                ? [
                      {
                          type: 'item' as const,
                          label: 'Go to...',
                          disabled: true,
                      },
                      {
                          type: 'item' as const,
                          label: 'PostHog app',
                          link: 'https://app.posthog.com',
                          icon: <IconApp className="opacity-50 group-hover/item:opacity-75 size-4" />,
                      },
                      {
                          type: 'item' as const,
                          label: 'Community',
                          disabled: true,
                      },
                      {
                          type: 'item' as const,
                          label: 'Forums',
                          link: '/questions',
                          icon: <IconMessage className="opacity-50 group-hover/item:opacity-75 size-4" />,
                      },
                      ...(user?.profile
                          ? [
                                {
                                    type: 'item' as const,
                                    label: 'Notifications',
                                    link: '/community/notifications',
                                    icon: <IconLetter className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                },
                                {
                                    type: 'item' as const,
                                    label: 'My profile',
                                    link: `/community/profiles/${user?.profile.id}`,
                                    icon: <IconUser className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                },
                            ]
                          : []),
                      {
                          type: 'separator' as const,
                      },
                      {
                          type: 'item' as const,
                          label: 'Community logout',
                          onClick: () => logout(),
                          icon: <IconLock className="opacity-50 group-hover/item:opacity-75 size-4" />,
                      },
                  ]
                : [
                    {
                        type: 'item' as const,
                        label: 'Sign in',
                        onClick: handleSignInClick,
                    },
                ],
        },
    ]

    return (
        <>
            <motion.div
                id="taskbar"
                data-scheme="primary"
                initial={{ translateY: '100%' }}
                animate={{ translateY: 0 }}
                exit={{ translateY: '100%' }}
                className="w-full bg-accent border-b border-primary z-50 flex justify-between pl-0.5 pr-2"
            >
                <MenuBar menus={menuData} className="[&_button]:px-2" />
                <aside className="flex items-center gap-px py-0.5">
                    {/* <OSButton variant="primary" size="xs">Get started - free</OSButton> */}
                    <OSButton variant="ghost" size="md">
                        <IconSearch className="size-5" />
                    </OSButton>
                    <OSButton variant="ghost" size="md">
                        <IconChatHelp className="size-5" />
                    </OSButton>
                    <PopoverRoot open={isWindowPopoverOpen} onOpenChange={setIsWindowPopoverOpen}>
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
                                        onClick={(e) => {
                                            if (totalWindows <= 0) {
                                                return e.stopPropagation()
                                            }
                                        }}
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
                    <MenuBar menus={accountMenu} className="[&_button]:px-2" />
                </aside>
            </motion.div>
            {showAuthPanel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-dark rounded shadow-lg p-6 relative">
                        <button
                            onClick={() => setShowAuthPanel(false)}
                            className="absolute top-2 right-2 text-2xl"
                            aria-label="Close"
                        >✕</button>
                        <Authentication initialView="sign-in" showBanner={false} showProfile={false} />
                    </div>
                </div>
            )}
        </>
    )
}
