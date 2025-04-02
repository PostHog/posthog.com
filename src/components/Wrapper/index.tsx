import React, { useEffect, useRef, useState } from 'react'
import { motion, useDragControls } from 'framer-motion'
import { IconX } from '@posthog/icons'
import { Resizable } from 'react-resizable'
import 'react-resizable/css/styles.css'

const Window = ({ item, onClose, constraintsRef, bringToFront }) => {
    const controls = useDragControls()
    const [size, setSize] = useState({ width: 767, height: 600 })

    const onResize = (_event, { size }) => {
        setSize({ width: size.width, height: size.height })
    }

    return (
        <Resizable
            width={size.width}
            height={size.height}
            onResize={onResize}
            minConstraints={[300, 200]}
            maxConstraints={[1200, 800]}
        >
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
                    className="flex-shrink-0 w-full flex items-center justify-end p-2 bg-accent dark:bg-accent-dark border-b border-border dark:border-border-dark cursor-move"
                    onPointerDown={(e) => controls.start(e)}
                >
                    <button onClick={onClose}>
                        <IconX className="size-4" />
                    </button>
                </div>
                <div className="w-full flex-grow overflow-auto">{item.element}</div>
            </motion.div>
        </Resizable>
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

    useEffect(() => {
        const existingElement = elements.find((el) => el.key === element.key)
        if (existingElement) {
            bringToFront(existingElement)
        } else {
            setElements((prev) => [...prev, { element, zIndex: elements.length, key: element.key }])
        }
    }, [element])

    return (
        <div ref={constraintsRef} className="fixed inset-0 size-full">
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
