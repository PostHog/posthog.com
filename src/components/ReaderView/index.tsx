import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SidebarState {
    isOpen: boolean
    width: number
}

const leftSidebarWidth = '300px'
const rightSidebarWidth = '250px'

export default function ReaderView() {
    const [isNavVisible, setIsNavVisible] = useState(true)
    const [isTocVisible, setIsTocVisible] = useState(true)

    const toggleNav = useCallback(() => {
        setIsNavVisible((prev) => !prev)
    }, [])

    const toggleToc = useCallback(() => {
        setIsTocVisible((prev) => !prev)
    }, [])

    return (
        <div className="w-full h-full flex-grow overflow-auto flex flex-col bg-light dark:bg-dark gap-2">
            {/* First row */}
            <div className="flex w-full gap-2">
                <motion.div
                    className="flex-shrink-0"
                    animate={{ width: isNavVisible ? leftSidebarWidth : 'auto' }}
                    transition={{ duration: 0.2 }}
                >
                    home
                    <button className="border border-light bg-white" onClick={toggleNav}>
                        toggle nav
                    </button>
                </motion.div>
                <div className="flex-grow dark:bg-accent-dark flex justify-between">
                    <div>back, forward</div>
                    <div>search</div>
                </div>
                <motion.div
                    className="flex-shrink-0 flex justify-end"
                    animate={{ width: isTocVisible ? rightSidebarWidth : 'auto' }}
                    transition={{ duration: 0.2 }}
                >
                    <button className="border border-light bg-white" onClick={toggleToc}>
                        toggle ToC
                    </button>
                </motion.div>
            </div>

            {/* Second row */}
            <div className="flex w-full h-full gap-2">
                <AnimatePresence>
                    {isNavVisible && (
                        <motion.div
                            id="nav"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: leftSidebarWidth, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 overflow-hidden"
                        >
                            navigation
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="flex-grow bg-white dark:bg-accent-dark">main content</div>
                <AnimatePresence>
                    {isTocVisible && (
                        <motion.div
                            id="toc"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: rightSidebarWidth, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="flex-shrink-0 overflow-hidden"
                        >
                            table of contents
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Third row */}
            <div className="flex w-full gap-2">
                <motion.div
                    className="flex-shrink-0"
                    animate={{ width: isNavVisible ? leftSidebarWidth : 'auto' }}
                    transition={{ duration: 0.2 }}
                >
                    home, sidebar
                </motion.div>
                <div className="flex-grow dark:bg-accent-dark flex justify-between">
                    <div>Questions?</div>
                    <div>text sizing</div>
                </div>
                <motion.div
                    className="flex-shrink-0 flex justify-end"
                    animate={{ width: isTocVisible ? rightSidebarWidth : 'auto' }}
                    transition={{ duration: 0.2 }}
                >
                    edit buttons
                </motion.div>
            </div>
        </div>
    )
}
