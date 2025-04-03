import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { IconMinus, IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { Provider as WindowProvider } from '../../context/Window'
import Desktop from 'components/Desktop'
import { DarkModeToggle } from 'components/MainNav'

const sizeDefaults = {
    max: {
        width: 1200,
        height: 800,
    },
    min: {
        width: 300,
        height: 200,
    },
}

const Window = ({ item, constraintsRef }) => {
    const { minimizeWindow, bringToFront, closeWindow, focusedWindow } = useApp()
    const controls = useDragControls()
    const [size, setSize] = useState({ width: 767, height: 600 })
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handleDoubleClick = () => {
        setSize((prev) => (prev.width === sizeDefaults.max.width ? sizeDefaults.min : sizeDefaults.max))
    }

    return (
        <WindowProvider appWindow={item}>
            <AnimatePresence>
                {!item.minimized && (
                    <motion.div
                        className={`absolute flex flex-col border border-light-7 dark:border-dark-7 rounded overflow-hidden !select-auto shadow-xl ${
                            focusedWindow === item ? 'ACTIVE CLASSES HERE CORY' : ''
                        }`}
                        style={{
                            width: size.width,
                            height: size.height,
                            zIndex: item.zIndex,
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

                            const constrainedX = Math.min(Math.max(0, newX), bounds.width - size.width)
                            const constrainedY = Math.min(Math.max(0, newY), bounds.height - size.height)

                            setPosition({
                                x: constrainedX,
                                y: constrainedY,
                            })
                        }}
                        animate={{ x: position.x, y: position.y }}
                        onMouseDown={() => bringToFront(item)}
                    >
                        <div
                            data-scheme="tertiary"
                            onDoubleClick={handleDoubleClick}
                            className="flex-shrink-0 w-full flex items-center justify-between p-2 bg-primary cursor-move"
                            onPointerDown={(e) => controls.start(e)}
                        >
                            <p className="m-0 text-sm font-semibold">{item.meta?.title && item.meta.title}</p>
                            <div className="flex space-x-2">
                                <button onClick={() => minimizeWindow(item)}>
                                    <IconMinus className="size-4" />
                                </button>
                                <button onClick={() => closeWindow(item)}>
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

const TaskBar = () => {
    const { windows, focusedWindow, bringToFront, minimizeWindow } = useApp()
    return (
        <AnimatePresence>
            {windows.length > 0 && (
                <motion.div
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
                                    <button
                                        onClick={() => (active ? minimizeWindow(appWindow) : bringToFront(appWindow))}
                                        className={`text-sm py-1 px-2 font-semibold border border-border dark:border-dark ${
                                            active ? 'bg-white dark:bg-black' : ''
                                        }`}
                                    >
                                        {appWindow.meta?.title}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                    <div className="w-[160px]">
                        <DarkModeToggle />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function Wrapper() {
    const constraintsRef = useRef(null)
    const { windows } = useApp()
    return (
        <div ref={constraintsRef} className="fixed inset-0 size-full">
            <Desktop />
            {windows.map((item) => (
                <Window item={item} key={item.key} constraintsRef={constraintsRef} />
            ))}
            <TaskBar />
        </div>
    )
}
