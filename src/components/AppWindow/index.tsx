import React, { useEffect, useState, useMemo } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { IconChevronDown, IconDocument, IconMinus, IconX, IconCollapse, IconExpand, IconSquare } from '@posthog/icons'
import { useApp } from '../../context/App'
import { Provider as WindowProvider, AppWindow as AppWindowType } from '../../context/Window'
import { ContextMenu } from 'radix-ui'
import Tooltip from 'components/RadixUI/Tooltip'
import OSButton from 'components/OSButton'
import { Button } from 'components/Squeak/components/SubscribeButton'
import MenuBar from 'components/RadixUI/MenuBar'
import { Popover } from '../RadixUI/Popover'
import { FileMenu } from '../RadixUI/FileMenu'
import { IMenu } from 'components/PostLayout/types'
import { navigate } from 'gatsby'

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
} as const

const snapThreshold = -50

export default function AppWindow({ item, constraintsRef }: { item: AppWindowType; constraintsRef: any }) {
    const { minimizeWindow, bringToFront, closeWindow, focusedWindow, taskbarHeight } = useApp()
    const controls = useDragControls()
    const initialSizeKey = item.key as keyof typeof fixedAppSizes
    const hasFixedSize = Object.prototype.hasOwnProperty.call(fixedAppSizes, initialSizeKey)
    const [sizeDefaults, setSizeDefaults] = useState(hasFixedSize ? fixedAppSizes[initialSizeKey] : getSizeDefaults())
    const [previousSize, setPreviousSize] = useState({ width: sizeDefaults.max.width, height: sizeDefaults.max.height })
    const [size, setSize] = useState({ width: sizeDefaults.max.width, height: sizeDefaults.max.height })
    const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 })
    const [position, setPosition] = useState(() => ({
        x: window.innerWidth / 2 - size.width / 2,
        y: window.innerHeight / 2 - size.height / 2,
    }))
    const [snapIndicator, setSnapIndicator] = useState<'left' | 'right' | null>(null)
    const [windowOptionsTooltipVisible, setWindowOptionsTooltipVisible] = useState(false)
    const [menu, setMenu] = useState<IMenu[]>([])
    const [history, setHistory] = useState<string[]>([])
    const [activeHistoryIndex, setActiveHistoryIndex] = useState(0)
    useEffect(() => {
        const handleResize = () => {
            setSizeDefaults(getSizeDefaults())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleDoubleClick = () => {
        setSize((prev) => (prev.width === sizeDefaults.max.width ? sizeDefaults.min : sizeDefaults.max))
    }

    const expandWindow = () => {
        setPreviousSize(size)
        setPreviousPosition(position)
        setPosition({ x: 0, y: taskbarHeight })
        setSize({ width: window.innerWidth, height: window.innerHeight - taskbarHeight })
    }

    const collapseWindow = () => {
        setSize(previousSize)
        setPosition(previousPosition)
    }

    const getActiveWindowsButtonPosition = () => {
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

    const handleDrag = (_event: any, info: any) => {
        if (!constraintsRef.current) return

        const bounds = constraintsRef.current.getBoundingClientRect()
        const newX = position.x + info.offset.x

        if (newX < snapThreshold) {
            setSnapIndicator('left')
        } else if (newX > bounds.width - size.width - snapThreshold) {
            setSnapIndicator('right')
        } else {
            setSnapIndicator(null)
        }
    }

    const handleDragEnd = (_event: any, info: any) => {
        if (!constraintsRef.current) return

        if (snapIndicator !== null) {
            handleSnapToSide(snapIndicator)
            setSnapIndicator(null)
            return
        }

        const bounds = constraintsRef.current.getBoundingClientRect()
        const newX = position.x + info.offset.x
        const newY = position.y + info.offset.y

        setPosition({
            x: Math.round(Math.min(Math.max(0, newX), bounds.width - size.width)),
            y: Math.round(Math.min(Math.max(bounds.top, newY), Math.max(bounds.top, bounds.height - size.height))),
        })
    }

    const windowPosition = useMemo(() => {
        const activeWindowsPosition = getActiveWindowsButtonPosition()
        return {
            x: activeWindowsPosition.x - size.width / 2,
            y: activeWindowsPosition.y - size.height / 2,
        }
    }, [size.width, size.height])

    const canGoBack = history.length > 0 && activeHistoryIndex > 0
    const canGoForward = activeHistoryIndex < history.length - 1

    const handleSnapToSide = (side: 'left' | 'right') => {
        if (!constraintsRef.current) return

        const bounds = constraintsRef.current.getBoundingClientRect()
        const finalX = side === 'left' ? 0 : bounds.width / 2
        const finalWidth = bounds.width / 2

        setPosition({
            x: finalX,
            y: bounds.top,
        })

        setSize((prev) => ({
            ...prev,
            width: finalWidth,
            height: bounds.height,
        }))
    }

    useEffect(() => {
        if (!item?.fromHistory) {
            setHistory((prev) => [...prev, item.path])
            setActiveHistoryIndex(history.length)
        }
    }, [item?.path])

    const goBack = () => {
        if (canGoBack) {
            setActiveHistoryIndex(activeHistoryIndex - 1)
            navigate(history[activeHistoryIndex - 1], {
                state: {
                    fromHistory: true,
                },
            })
        }
    }

    const goForward = () => {
        if (canGoForward) {
            setActiveHistoryIndex(activeHistoryIndex + 1)
            navigate(history[activeHistoryIndex + 1], {
                state: {
                    fromHistory: true,
                },
            })
        }
    }

    return (
        <WindowProvider
            appWindow={item}
            menu={menu}
            setMenu={setMenu}
            goBack={goBack}
            goForward={goForward}
            canGoBack={canGoBack}
            canGoForward={canGoForward}
        >
            <AnimatePresence>
                {!item.minimized && (
                    <>
                        {snapIndicator && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.3 }}
                                exit={{ opacity: 0 }}
                                className="fixed inset-0 border pointer-events-none rounded-md"
                                style={{
                                    left: snapIndicator === 'left' ? 0 : '50%',
                                    width: '50%',
                                    top: taskbarHeight,
                                    height: `calc(100% - ${taskbarHeight}px)`,
                                }}
                            />
                        )}
                        <motion.div
                            className={`@container absolute flex flex-col border rounded overflow-hidden !select-auto  ${
                                focusedWindow === item
                                    ? 'shadow-2xl border-light-7 dark:border-dark-7'
                                    : 'shadow-lg border-light-4 dark:border-dark-4'
                            }`}
                            style={{
                                width: size.width,
                                height: size.height,
                                zIndex: item.zIndex,
                            }}
                            initial={{
                                scale: 0.005,
                                x: windowPosition.x,
                                y: windowPosition.y,
                            }}
                            animate={{
                                scale: 1,
                                x: position.x,
                                y: position.y,
                                transition: {
                                    scale: {
                                        duration: 0.3,
                                        ease: [0.2, 0.2, 0.8, 1],
                                    },
                                },
                            }}
                            exit={{
                                scale: 0.005,
                                x: windowPosition.x,
                                y: windowPosition.y,
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
                            onDrag={handleDrag}
                            onDragEnd={handleDragEnd}
                            onMouseDown={() => bringToFront(item)}
                        >
                            <div
                                data-scheme="tertiary"
                                onDoubleClick={handleDoubleClick}
                                className="flex-shrink-0 w-full flex @md:grid grid-cols-[minmax(100px,auto)_1fr_minmax(100px,auto)] gap-1 items-center py-0.5 pl-1.5 bg-primary cursor-move"
                                onPointerDown={(e) => controls.start(e)}
                            >
                                <MenuBar
                                    menus={[
                                        {
                                            trigger: (
                                                <>
                                                    <IconDocument className="size-5" />
                                                    <IconChevronDown className="size-6 -mx-1.5 text-muted group-hover:text-primary data-[state=open]:text-primary" />
                                                </>
                                            ),
                                            items: [
                                                {
                                                    type: 'submenu',
                                                    label: 'Ask Max about this page',
                                                    items: [
                                                        {
                                                            type: 'item',
                                                            label: 'New Max chat',
                                                        },
                                                        {
                                                            type: 'separator',
                                                        },
                                                        {
                                                            type: 'item',
                                                            label: 'No open chats',
                                                            disabled: true,
                                                        },
                                                    ],
                                                },
                                                {
                                                    type: 'item',
                                                    label: 'Bookmark',
                                                },
                                                {
                                                    type: 'separator',
                                                },
                                                {
                                                    type: 'item',
                                                    label: 'Close',
                                                    onClick: () => {
                                                        minimizeWindow(item)
                                                        setTimeout(() => closeWindow(item), 250)
                                                    },
                                                },
                                            ],
                                        },
                                    ]}
                                />

<div className="flex-1 truncate flex items-center justify-start @md:justify-center">
                                {menu && menu.length > 0 ? (
                                        <Popover
                                            trigger={
                                                <button className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark text-left items-center justify-center text-sm font-semibold flex select-none">
                                                    {item.meta?.title && item.meta.title}
                                                    <IconChevronDown className="size-6 -m-1" />
                                                </button>
                                            }
                                            dataScheme="primary"
                                            contentClassName="w-auto p-0 border border-border dark:border-border-dark"
                                        >
                                            <FileMenu menu={menu} />
                                        </Popover>
                                    ) : (
                                        <div className="text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark text-left items-center justify-center text-sm font-semibold flex select-none">
                                            {item.meta?.title && item.meta.title}
                                        </div>
                                    )}
                                </div>
                                <div className="flex">
                                    <OSButton variant="ghost" size="xs" onClick={handleMinimize} className="!px-1.5">
                                        <IconMinus className="size-4 relative top-1" />
                                    </OSButton>

                                    <ContextMenu.Root onOpenChange={() => setWindowOptionsTooltipVisible(false)}>
                                        <ContextMenu.Trigger
                                            className="data-[highlighted]:bg-accent data-[state=open]:bg-accent"
                                            asChild
                                        >
                                            <OSButton
                                                variant="ghost"
                                                size="xs"
                                                onClick={
                                                    size.width >= window?.innerWidth ? collapseWindow : expandWindow
                                                }
                                                onMouseEnter={() => {
                                                    setWindowOptionsTooltipVisible(true)
                                                }}
                                                onMouseLeave={() => {
                                                    setWindowOptionsTooltipVisible(false)
                                                }}
                                                className="!px-1.5 group"
                                            >
                                                <Tooltip
                                                    trigger={
                                                        <span>
                                                            <IconSquare className="size-5 group-hover:hidden" />
                                                            {size.width >= window?.innerWidth ? (
                                                                <IconCollapse className="size-6 -m-0.5 hidden group-hover:block" />
                                                            ) : (
                                                                <IconExpand className="size-6 -m-0.5 hidden group-hover:block" />
                                                            )}
                                                        </span>
                                                    }
                                                    open={windowOptionsTooltipVisible}
                                                >
                                                    Right click for more options
                                                </Tooltip>
                                            </OSButton>
                                        </ContextMenu.Trigger>
                                        <ContextMenu.Portal>
                                            <ContextMenu.Content
                                                className="min-w-[220px] rounded-md bg-white dark:bg-accent-dark p-1 shadow-xl"
                                                data-scheme="primary"
                                            >
                                                <ContextMenu.Label className="px-2.5 text-[13px] leading-[25px] text-muted">
                                                    Snap to...
                                                </ContextMenu.Label>
                                                <ContextMenu.Item
                                                    className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-sm leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input-bg data-[disabled]:text-muted"
                                                    onClick={() => handleSnapToSide('left')}
                                                >
                                                    Left half
                                                    <div className="ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary">
                                                        Shift+←
                                                    </div>
                                                </ContextMenu.Item>
                                                <ContextMenu.Item
                                                    className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-sm leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input-bg data-[disabled]:text-muted"
                                                    onClick={() => handleSnapToSide('right')}
                                                >
                                                    Right half
                                                    <div className="ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary">
                                                        Shift+→
                                                    </div>
                                                </ContextMenu.Item>
                                                <ContextMenu.Separator className="m-[5px] h-px bg-border" />
                                                <ContextMenu.Label className="px-2.5 text-[13px] leading-[25px] text-muted">
                                                    Resize
                                                </ContextMenu.Label>
                                                <ContextMenu.Item
                                                    disabled={size.width === window?.innerWidth}
                                                    className="group relative flex h-[25px] select-none items-center rounded px-2.5 text-sm leading-none text-primary hover:bg-primary outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-input-bg data-[disabled]:text-muted"
                                                    onClick={expandWindow}
                                                >
                                                    Maximize
                                                    <div className="ml-auto pl-5 text-secondary group-data-[disabled]:text-muted group-data-[highlighted]:text-primary">
                                                        Shift+↑
                                                    </div>
                                                </ContextMenu.Item>
                                            </ContextMenu.Content>
                                        </ContextMenu.Portal>
                                    </ContextMenu.Root>

                                    <OSButton
                                        variant="ghost"
                                        size="xs"
                                        onClick={() => {
                                            // Set minimized first to trigger exit animation
                                            minimizeWindow(item)
                                            // Then close after animation duration
                                            setTimeout(() => closeWindow(item), 250)
                                        }}
                                        className="!px-1.5"
                                    >
                                        <IconX className="size-4" />
                                    </OSButton>
                                </div>
                            </div>
                            <div className="w-full flex-grow overflow-hidden">{item.element}</div>
                            <motion.div
                                data-scheme="tertiary"
                                className="group absolute right-0 top-0 w-1.5 bottom-6 cursor-ew-resize"
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
                            >
                                <div className="relative w-full h-full">
                                    <div className="hidden group-hover:block absolute inset-y-0 right-0 w-[2px] bg-light-8" />
                                    <div className="hidden group-hover:block absolute -bottom-6 h-6 right-0 w-[2px] bg-light-8" />
                                </div>
                            </motion.div>
                            <motion.div
                                data-scheme="tertiary"
                                className="group absolute bottom-0 left-0 right-6 h-1.5 cursor-ns-resize"
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
                            >
                                <div className="relative w-full h-full">
                                    <div className="hidden group-hover:block absolute inset-x-0 bottom-0 h-[2px] bg-light-8" />
                                    <div className="hidden group-hover:block absolute bottom-0 -right-6 w-6 h-[2px] bg-light-8" />
                                </div>
                            </motion.div>
                            <motion.div
                                className="group absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center"
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
                            >
                                <div className="hidden group-hover:block relative w-full h-full border-b border-r border-transparent overflow-hidden rounded-bl">
                                    <div className="absolute -bottom-10 -right-10 group-hover:-bottom-5 group-hover:-right-5 transition-all h-8 w-8 bg-accent-2 border-t border-light-8 -rotate-45" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </WindowProvider>
    )
}
