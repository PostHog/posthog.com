import React, { useRef } from 'react'
import { useApp } from '../../context/App'
import Desktop from 'components/Desktop'
import TaskBarMenu from 'components/TaskBarMenu'
import AppWindow from 'components/AppWindow'
import { AnimatePresence, motion } from 'framer-motion'

export default function Wrapper() {
    const constraintsRef = useRef(null)
    const { windows } = useApp()

    return (
        <div className="fixed inset-0 size-full flex flex-col">
            <TaskBarMenu />
            <div ref={constraintsRef} className="flex-grow">
                <Desktop />
                <AnimatePresence>
                    {windows.map((item) => {
                        return (
                            <motion.div
                                key={item.key}
                                exit={{
                                    scale: 0.005,
                                    transition: {
                                        scale: {
                                            duration: 0.23,
                                            ease: [0.2, 0.2, 0.8, 1],
                                        },
                                    },
                                }}
                            >
                                <AppWindow item={item} key={item.key} constraintsRef={constraintsRef} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </div>
    )
}
