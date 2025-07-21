import React, { useRef } from 'react'
import { useApp } from '../../context/App'
import Desktop from 'components/Desktop'
import TaskBarMenu from 'components/TaskBarMenu'
import AppWindow from 'components/AppWindow'
import { AnimatePresence, motion } from 'framer-motion'
import CookieBannerToast from 'components/CookieBanner/ToastVersion'
import Dock from 'components/Desktop/Dock'

export default function Wrapper() {
    const { windows, constraintsRef, updateWindow, compact, isMobile } = useApp()

    return (
        <div className="fixed inset-0 size-full flex flex-col">
            {!compact && <TaskBarMenu />}
            <div ref={constraintsRef} className="flex-grow relative">
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
                                onAnimationStartCapture={() => updateWindow(item, { animating: true })}
                                onAnimationComplete={() => updateWindow(item, { animating: false })}
                            >
                                <AppWindow item={item} key={item.key} constraintsRef={constraintsRef} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
            {isMobile && !compact && <Dock />}
            <CookieBannerToast />
        </div>
    )
}
