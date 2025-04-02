import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useDragControls } from 'framer-motion'
import { IconX } from '@posthog/icons'
import { useApp } from '../../context/App'
import { Provider as WindowProvider } from '../../context/Window'
import Desktop from 'components/Desktop'

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

const Window = ({ item, onClose, constraintsRef, bringToFront }) => {
    const controls = useDragControls()
    const [size, setSize] = useState({ width: sizeDefaults.max.width, height: sizeDefaults.max.height })

    const handleDoubleClick = () => {
        setSize((prev) => (prev.width === sizeDefaults.max.width ? sizeDefaults.min : sizeDefaults.max))
    }

    return (
        <WindowProvider appWindow={item}>
            <motion.div
                className="absolute bg-light dark:bg-dark flex flex-col border border-border dark:border-border-dark rounded overflow-hidden !select-auto"
                style={{
                    width: size.width,
                    height: size.height,
                    zIndex: item.zIndex,
                }}
                drag
                dragControls={controls}
                dragListener={false}
                dragMomentum={false}
                whileDrag={{ scale: 1.01 }}
                dragConstraints={constraintsRef}
                onMouseDown={() => bringToFront(item)}
            >
                <div
                    onDoubleClick={handleDoubleClick}
                    className="flex-shrink-0 w-full flex items-center justify-between p-2 bg-accent dark:bg-accent-dark border-b border-border dark:border-border-dark cursor-move"
                    onPointerDown={(e) => controls.start(e)}
                >
                    <p className="m-0 text-sm font-semibold">{item.meta?.title && item.meta.title}</p>
                    <button onClick={onClose}>
                        <IconX className="size-4" />
                    </button>
                </div>
                <div className="w-full flex-grow overflow-auto">{item.element}</div>
                <motion.div
                    className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
                    drag
                    dragMomentum={false}
                    dragConstraints={{
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                    }}
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
            </motion.div>
        </WindowProvider>
    )
}

const TaskBar = () => {
    const { windows, focusedWindow, bringToFront } = useApp()
    return (
        <AnimatePresence>
            {windows.length > 0 && (
                <motion.div
                    initial={{ translateY: '100%' }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: '100%' }}
                    className="fixed bottom-0 left-0 w-full p-2 bg-accent dark:bg-accent-dark z-50"
                >
                    <ul className="m-0 p-0 list-none flex space-x-1">
                        {windows.map((appWindow) => {
                            const active = focusedWindow === appWindow
                            return (
                                <li key={appWindow.key}>
                                    <button
                                        onClick={() => bringToFront(appWindow)}
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
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function Wrapper() {
    const constraintsRef = useRef(null)
    const { handleClose, bringToFront, windows } = useApp()
    return (
        <div ref={constraintsRef} className="fixed inset-0 size-full">
            <Desktop />
            {windows.map((item) => (
                <Window
                    item={item}
                    key={item.key}
                    onClose={() => handleClose(item)}
                    constraintsRef={constraintsRef}
                    bringToFront={bringToFront}
                />
            ))}
            <TaskBar />
        </div>
    )
}
