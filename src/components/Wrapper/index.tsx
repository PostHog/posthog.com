import React, { useEffect, useRef, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { IconX } from '@posthog/icons'

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
    const [size, setSize] = useState({ width: 767, height: 600 })

    const handleDoubleClick = () => {
        setSize((prev) => (prev.width === sizeDefaults.max.width ? sizeDefaults.min : sizeDefaults.max))
    }

    return (
        <motion.div
            className="cursor-default absolute bg-light dark:bg-dark flex flex-col border border-border dark:border-border-dark rounded overflow-hidden"
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
                className="flex-shrink-0 w-full flex items-center justify-end p-2 bg-accent dark:bg-accent-dark border-b border-border dark:border-border-dark cursor-move"
                onPointerDown={(e) => controls.start(e)}
            >
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
                onDrag={(event, info) => {
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
    )
}

export default function Wrapper({ element }) {
    const [elements, setElements] = useState([])
    const constraintsRef = useRef(null)

    const handleClose = (item) => {
        const newElements = elements.filter((el) => el !== item)
        setElements(newElements)
    }

    const bringToFront = (item) => {
        const newElements = elements.map((el) => ({
            ...el,
            zIndex: el === item ? elements.length : el.zIndex < item.zIndex ? el.zIndex : el.zIndex - 1,
        }))
        setElements(newElements)
    }

    const replaceFocusedElement = (newElement) => {
        const focusedElement = elements.reduce(
            (highest, current) => (current.zIndex > (highest?.zIndex ?? -1) ? current : highest),
            null
        )
        if (focusedElement) {
            setElements(elements.map((el) => (el === focusedElement ? { ...el, element: newElement.element } : el)))
        } else {
            setElements([...elements, newElement])
        }
    }

    useEffect(() => {
        const existingElement = elements.find((el) => el.key === element.key)
        const newElement = { element, zIndex: elements.length, key: element.key }
        if (existingElement) {
            bringToFront(existingElement)
        } else {
            replaceFocusedElement(newElement)
        }
    }, [element])

    return (
        <div ref={constraintsRef} className="fixed inset-0 size-full">
            hello world
            {elements.map((item) => (
                <Window
                    item={item}
                    key={item.key}
                    onClose={() => handleClose(item)}
                    constraintsRef={constraintsRef}
                    bringToFront={bringToFront}
                />
            ))}
        </div>
    )
}
