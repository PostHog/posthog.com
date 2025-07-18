import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
    IconSearch,
    IconChatHelp,
    IconUser,
    IconApp,
    IconMessage,
    IconNotification,
    IconLock,
    IconBookmark,
    IconUpload,
} from '@posthog/icons'
import { useApp } from '../../context/App'

import MenuBar, { MenuType, MenuItemType } from 'components/RadixUI/MenuBar'
import ActiveWindowsPanel from 'components/ActiveWindowsPanel'
import OSButton from 'components/OSButton'
import { useUser } from 'hooks/useUser'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import { useMenuData } from './menuData'
import CloudinaryImage from 'components/CloudinaryImage'
import MediaUploadModal from 'components/MediaUploadModal'

export default function TaskBarMenu() {
    const {
        windows,
        bringToFront,
        focusedWindow,
        openSearch,
        openSignIn,
        siteSettings,
        openNewChat,
        setIsNotificationsPanelOpen,
        setIsActiveWindowsPanelOpen,
        addWindow,
    } = useApp()
    const [isAnimating, setIsAnimating] = useState(false)
    const totalWindows = windows.length

    const { user, notifications, logout, isModerator } = useUser()
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

    const handleActiveWindowsClick = () => {
        setIsActiveWindowsPanelOpen(true)
    }

    const handleSignInClick = () => {
        // Close the menu by blurring the active element
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur()
        }
        openSignIn()
    }

    const accountMenu: MenuType[] = [
        {
            trigger: (
                <>
                    {isLoggedIn ? (
                        <>
                            <div className="relative">
                                <CloudinaryImage
                                    src={getAvatarURL(user?.profile)}
                                    className={`size-6 rounded-full overflow-hidden bg-${
                                        user?.profile?.color ?? 'white dark:bg-dark'
                                    }`}
                                    width={48}
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
                                    onClick: () => setIsNotificationsPanelOpen(true),
                                    icon: (
                                        <IconNotification className="opacity-50 group-hover/item:opacity-75 size-4" />
                                    ),
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
                      ...(isModerator
                          ? [
                                {
                                    type: 'item' as const,
                                    label: 'Moderator tools',
                                    disabled: true,
                                },
                                {
                                    type: 'item' as const,
                                    label: 'Upload media',
                                    icon: <IconUpload className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                    onClick: () =>
                                        addWindow(
                                            <MediaUploadModal
                                                newWindow
                                                location={{ pathname: `media-upload` }}
                                                key={`media-upload`}
                                            />
                                        ),
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
                                onClick={handleActiveWindowsClick}
                                disabled={totalWindows <= 0}
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
                                <span className="text-[13px] font-semibold relative -top-px">{totalWindows}</span>
                            </button>
                        </motion.div>
                    )}
                    <MenuBar menus={accountMenu} className="[&_button]:px-2" />
                </aside>
            </div>
            <ActiveWindowsPanel />
        </>
    )
}
