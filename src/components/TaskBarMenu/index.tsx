import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    IconSearch,
    IconChatHelp,
    IconUser,
    IconApp,
    IconMessage,
    IconLetter,
    IconLock,
    IconBookmark,
} from '@posthog/icons'
import { useApp } from '../../context/App'

import { Popover } from 'components/RadixUI/Popover'
import { Root as PopoverRoot } from '@radix-ui/react-popover'
import MenuBar, { MenuType, MenuItemType } from 'components/RadixUI/MenuBar'
import OSButton from 'components/OSButton'
import { useUser } from 'hooks/useUser'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import { useMenuData } from './menuData'
import Link from 'components/Link'
import Orders from 'components/MainNav'
import { StrapiRecord, ProfileData } from 'lib/strapi'
import { Avatar as MainNavAvatar } from 'components/MainNav'
import Wizard from 'components/Wizard'
import ScrollArea from 'components/RadixUI/ScrollArea'
import NotificationsPanel from 'components/NotificationsPanel'

export default function TaskBarMenu() {
    const { windows, bringToFront, focusedWindow, openSearch, openSignIn, siteSettings, openNewChat } = useApp()
    const [isAnimating, setIsAnimating] = useState(false)
    const totalWindows = windows.length
    const [isWindowPopoverOpen, setIsWindowPopoverOpen] = useState(false)
    const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false)
    const { user, notifications, logout } = useUser()
    const menuData = useMenuData()

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
        // Close the menu by blurring the active element
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
        openSignIn()
    }

    const handleNotificationsClick = () => {
        // Close the menu by blurring the active element
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
        setIsNotificationsPanelOpen(true)
    }

    const handleCloseNotificationsPanel = () => {
        setIsNotificationsPanelOpen(false)
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
                                    className={`size-6 rounded-full bg-${user?.profile?.color ?? 'white dark:bg-dark'}`}
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
                          external: true,
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
                                    label: `Notifications${
                                        notifications?.length > 0 ? ` (${notifications.length})` : ''
                                    }`,
                                    onClick: handleNotificationsClick,
                                    icon: <IconLetter className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                },
                                {
                                    type: 'item' as const,
                                    label: 'My profile',
                                    link: `/community/profiles/${user?.profile.id}`,
                                    icon: <IconUser className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                },
                                {
                                    type: 'item' as const,
                                    label: 'Bookmarks',
                                    link: '/bookmarks',
                                    icon: <IconBookmark className="opacity-50 group-hover/item:opacity-75 size-4" />,
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
            <div
                id="taskbar"
                data-scheme="primary"
                className="w-full bg-accent border-b border-primary top-0 z-50 flex justify-between pl-0.5 pr-2"
            >
                <MenuBar menus={menuData} className="[&_button]:px-2" />
                <aside className="flex items-center gap-px py-0.5">
                    <MenuBar
                        menus={[
                            {
                                trigger: <span className="text-red font-semibold">Get started - free</span>,
                                items: [
                                    {
                                        type: 'item',
                                        label: 'Sign up',
                                        link: 'https://app.posthog.com/signup',
                                        external: true,
                                    },
                                    {
                                        type: 'item',
                                        label: 'Install with AI',
                                    },
                                    {
                                        type: 'item',
                                        label: 'Talk to a human',
                                    },
                                    {
                                        type: 'separator',
                                    },
                                    {
                                        type: 'item',
                                        label: 'Login',
                                    },
                                ],
                            },
                        ]}
                        className="[&_button]:px-2"
                    />
                    <OSButton onClick={() => openSearch()} variant="ghost" size="md">
                        <IconSearch className="size-5" />
                    </OSButton>
                    <OSButton onClick={() => openNewChat({ path: `ask-max` })} variant="ghost" size="md">
                        <IconChatHelp className="size-5" />
                    </OSButton>
                    {siteSettings.experience === 'posthog' && (
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
                                        <button
                                            onClick={(e) => {
                                                if (totalWindows <= 0) {
                                                    return e.stopPropagation()
                                                }
                                            }}
                                            data-scheme="primary"
                                            data-active-windows
                                            className={`min-w-6 h-5 px-1.5 py-1 inline-flex justify-center items-center rounded
                                            border-[1.5px] 
                                            border-t-4 
                                            
                                             
                                            dark:hover:bg-dark 
                                            hover:bg-light

                                            text-secondary
                                            dark:text-primary
                                            hover:text-primary

                                            ${
                                                totalWindows > 1
                                                    ? 'bg-light dark:bg-dark border-[#4d4f46] dark:border-[#eaecf6]'
                                                    : 'bg-accent border-primary dark:border-[#eaecf6]'
                                            }
                                        `}
                                        >
                                            <span className="text-[13px] font-semibold relative -top-px">
                                                {totalWindows}
                                            </span>
                                        </button>
                                    </motion.div>
                                }
                                title="Active Windows"
                                dataScheme="primary"
                            >
                                <div className="flex flex-col gap-px min-w-[200px]">
                                    {windows.map((window) => (
                                        <button
                                            key={window.key}
                                            onClick={() => handleWindowClick(window)}
                                            className="text-primary text-left px-2 py-1.5 rounded hover:bg-accent text-sm flex items-center gap-2"
                                        >
                                            <span
                                                className={`truncate ${
                                                    window.minimized
                                                        ? 'italic'
                                                        : focusedWindow === window
                                                        ? 'font-bold'
                                                        : ''
                                                }`}
                                            >
                                                {window.meta?.title || 'Untitled'}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </Popover>
                        </PopoverRoot>
                    )}
                    <MenuBar menus={accountMenu} className="[&_button]:px-2" />
                </aside>
            </div>
            <NotificationsPanel isOpen={isNotificationsPanelOpen} onClose={handleCloseNotificationsPanel} />
        </>
    )
}
