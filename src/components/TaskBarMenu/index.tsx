import React, { useCallback, useEffect, useRef, useState } from 'react'
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
    IconCode,
    IconFeatures,
    IconPlay,
    IconPencil,
    IconPeople,
    IconPinFilled,
} from '@posthog/icons'
import { useAppActions, useAppSettings } from '../../context/App'

import MenuBar, { MenuType } from 'components/RadixUI/MenuBar'
import ActiveWindowsPanel from 'components/ActiveWindowsPanel'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'
import { useUser } from 'hooks/useUser'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import { useMenuData } from './menuData'
import CloudinaryImage from 'components/CloudinaryImage'
import MediaUploadModal from 'components/MediaUploadModal'
import KeyboardShortcut from 'components/KeyboardShortcut'

function TaskBarMenu() {
    const {
        openSearch,
        openSignIn,
        openNewChat,
        setIsNotificationsPanelOpen,
        setIsActiveWindowsPanelOpen,
        addWindow,
        taskbarRef,
        updateTaskbarHeight,
    } = useAppActions()
    const { posthogInstance } = useAppSettings()
    const [isAnimating, setIsAnimating] = useState(false)

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

    const handleTaskbarRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (taskbarRef) {
                const ref = taskbarRef as React.MutableRefObject<HTMLDivElement | null>
                ref.current = node
            }
            if (node) {
                updateTaskbarHeight()
            }
        },
        [taskbarRef, updateTaskbarHeight]
    )

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

    const avatarURL = getAvatarURL(user?.profile)

    const accountMenu: MenuType[] = [
        {
            trigger: (
                <>
                    {isLoggedIn ? (
                        <>
                            <div className="relative">
                                {avatarURL ? (
                                    <CloudinaryImage
                                        src={avatarURL}
                                        imgClassName={`size-6 rounded-full overflow-hidden bg-${
                                            user?.profile?.color ?? 'white dark:bg-dark'
                                        }`}
                                        width={48}
                                        alt=""
                                    />
                                ) : (
                                    <IconUser className="size-6" />
                                )}
                                {notifications?.length > 0 && (
                                    <span className="absolute top-4 -right-1 size-2.5 bg-red border border-bg-primary rounded-full" />
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
                                {
                                    type: 'item' as const,
                                    label: 'Components',
                                    link: '/components',
                                    icon: <IconCode className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                },
                                {
                                    type: 'item' as const,
                                    label: 'Art library',
                                    link: '/art-library',
                                    icon: <IconPencil className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                },
                                {
                                    type: 'item' as const,
                                    label: 'Feature matrix',
                                    link: '/feature-matrix',
                                    icon: <IconFeatures className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                },
                                {
                                    type: 'item' as const,
                                    label: 'Team directory',
                                    link: '/team-directory',
                                    icon: <IconPeople className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                },
                                {
                                    type: 'item' as const,
                                    label: 'HogWatch 3000',
                                    link: '/hogwatch',
                                    icon: <IconPlay className="opacity-50 group-hover/item:opacity-75 size-4" />,
                                },
                                {
                                    type: 'item' as const,
                                    label: 'Image annotation',
                                    link: '/image-annotator',
                                    icon: <IconPinFilled className="opacity-50 group-hover/item:opacity-75 size-4" />,
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
                          type: 'separator' as const,
                      },
                      {
                          type: 'item' as const,
                          label: 'Community',
                          disabled: true,
                      },
                      {
                          type: 'item' as const,
                          label: 'Sign in to the community',
                          onClick: handleSignInClick,
                      },
                  ],
        },
    ]

    return (
        <>
            <div className="z-50">
                <div
                    ref={handleTaskbarRef}
                    id="taskbar"
                    data-scheme="primary"
                    data-menu-container
                    style={{
                        transformOrigin: '50% 50%',
                        transformStyle: 'preserve-3d',
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                    className="bg-primary/50 backdrop-blur-3xl will-change-[transform,backdrop-filter] transform-gpu skin-classic:bg-accent wallpaper-keyboard-garden:dark:bg-black/15 border-secondary rounded pl-0.5 pr-2 shadow-2xl"
                >
                    {/* Top and bottom edges of the 3D box — visible during rotation */}
                    <div
                        aria-hidden="true"
                        className="absolute top-0 left-0 right-0 bg-accent pointer-events-none"
                        style={{
                            height: '20px',
                            transform: 'rotateX(-90deg)',
                            transformOrigin: '50% 0%',
                        }}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute bottom-0 left-0 right-0 bg-accent pointer-events-none"
                        style={{
                            height: '20px',
                            transform: 'rotateX(90deg)',
                            transformOrigin: '50% 100%',
                        }}
                    />
                    <div className="mx-auto transition-all duration-300 flex justify-between items-center w-full max-w-full">
                        <MenuBar
                            menus={menuData}
                            className="[&_button]:px-2 [&_button:not(:first-child)]:hidden md:[&_button:not(:first-child)]:flex"
                        />
                        <aside data-scheme="secondary" className="flex items-center gap-0.5 py-1">
                            {/* <MenuBar
                        menus={[
                            {
                                trigger: <span className="text-red font-semibold">Get started - free</span>,
                                items: [
                                    {
                                        type: 'item',
                                        label: 'Sign up',
                                        link: '/start',
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
                    /> */}
                            <div className="relative mr-1">
                                <OSButton
                                    variant="primary"
                                    size="md"
                                    asLink
                                    to={
                                        posthogInstance
                                            ? posthogInstance.replace(/"/g, '')
                                            : 'https://app.posthog.com/signup'
                                    }
                                    className=""
                                >
                                    {posthogInstance ? 'Open PostHog' : 'Get started – free'}
                                </OSButton>
                            </div>
                            <Tooltip
                                trigger={
                                    <OSButton onClick={() => openSearch()} size="sm" className="relative top-px">
                                        <IconSearch className="size-5" />
                                    </OSButton>
                                }
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <p className="text-sm mb-0">Search</p>
                                    <KeyboardShortcut text="/" size="sm" />
                                </div>
                            </Tooltip>
                            <Tooltip
                                trigger={
                                    <OSButton
                                        onClick={() => openNewChat({ path: `ask-max` })}
                                        size="sm"
                                        className="relative top-px"
                                    >
                                        <IconChatHelp className="size-5" />
                                    </OSButton>
                                }
                            >
                                <div className="flex flex-col items-center gap-1">
                                    <p className="text-sm mb-0">Ask Max</p>
                                    <div className="flex items-center gap-1">
                                        <KeyboardShortcut text="Shift" size="sm" />
                                        <KeyboardShortcut text="?" size="sm" />
                                    </div>
                                </div>
                            </Tooltip>
                            <MenuBar menus={accountMenu} className="[&_button]:px-2" />
                        </aside>
                    </div>
                </div>
            </div>
            <ActiveWindowsPanel />
        </>
    )
}

// Memoized so it survives Wrapper re-renders (e.g. the navigate() on window
// open/close); it still updates when it reads changed context.
export default React.memo(TaskBarMenu)
