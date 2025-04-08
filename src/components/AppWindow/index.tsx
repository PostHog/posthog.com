import React, { useEffect, useState, useMemo } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { IconCollapse45, IconExpand45, IconMinus, IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { Provider as WindowProvider } from '../../context/Window'

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
}

const snapThreshold = -50

export default function AppWindow({ item, constraintsRef }: { item: any; constraintsRef: any }) {
    const { minimizeWindow, bringToFront, closeWindow, focusedWindow, taskbarHeight } = useApp()
    const controls = useDragControls()
    const [sizeDefaults, setSizeDefaults] = useState(fixedAppSizes[item.key] || getSizeDefaults())
    const [previousSize, setPreviousSize] = useState({ width: sizeDefaults.max.width, height: sizeDefaults.max.height })
    const [size, setSize] = useState({ width: sizeDefaults.max.width, height: sizeDefaults.max.height })
    const [previousPosition, setPreviousPosition] = useState({ x: 0, y: 0 })
    const [position, setPosition] = useState(() => ({
        x: window.innerWidth / 2 - size.width / 2,
        y: window.innerHeight / 2 - size.height / 2,
    }))
    const [snapIndicator, setSnapIndicator] = useState<'left' | 'right' | null>(null)

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

        const bounds = constraintsRef.current.getBoundingClientRect()
        const newX = position.x + info.offset.x
        const newY = position.y + info.offset.y

        let finalX = newX
        let finalWidth = size.width
        let finalY = newY

        if (snapIndicator === 'left' || snapIndicator === 'right') {
            finalX = snapIndicator === 'left' ? 0 : bounds.width / 2
            finalWidth = bounds.width / 2
            finalY = bounds.top
        } else {
            finalX = Math.round(Math.min(Math.max(0, newX), bounds.width - size.width))
            finalY = Math.round(Math.min(Math.max(bounds.top, newY), Math.max(bounds.top, bounds.height - size.height)))
        }

        setPosition({
            x: finalX,
            y: finalY,
        })

        if (snapIndicator) {
            setSize((prev) => ({
                ...prev,
                width: finalWidth,
                height: bounds.height,
            }))
        }

        setSnapIndicator(null)
    }

    const windowPosition = useMemo(() => {
        const activeWindowsPosition = getActiveWindowsButtonPosition()
        return {
            x: activeWindowsPosition.x - size.width / 2,
            y: activeWindowsPosition.y - size.height / 2,
        }
    }, [size.width, size.height])

    return (
        <WindowProvider appWindow={item}>
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
                    </>
                )}
            </AnimatePresence>
        </WindowProvider>
    )
}
