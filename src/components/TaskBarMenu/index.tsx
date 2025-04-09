import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { IconSearch, IconChatHelp, IconUser } from '@posthog/icons'
import { useApp } from '../../context/App'

import { Popover } from 'components/RadixUI/Popover'
import { Root as PopoverRoot } from '@radix-ui/react-popover'
import MenuBar, { MenuType } from 'components/RadixUI/MenuBar'
import OSButton from 'components/OSButton'
import { useUser } from 'hooks/useUser'
import getAvatarURL from 'components/Squeak/util/getAvatar'
import { menuData } from './menuData'

export default function TaskBarMenu() {
    const { windows, bringToFront, focusedWindow } = useApp()
    const [isAnimating, setIsAnimating] = useState(false)
    const totalWindows = windows.length
    const [isWindowPopoverOpen, setIsWindowPopoverOpen] = useState(false)
    const { user, notifications } = useUser()

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

    return (
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
                    <div className="w-full h-full bg-primary text-primary"></div>
                </Popover>
            </aside>
        </motion.div>
    )
}
