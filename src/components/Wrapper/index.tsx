import React, { useRef, useState } from 'react'
import { useApp } from '../../context/App'
import Desktop from 'components/Desktop'
import TaskBarMenu from 'components/TaskBarMenu'
import AppWindow from 'components/AppWindow'
import { AnimatePresence, motion } from 'framer-motion'
import CookieBannerToast from 'components/CookieBanner/ToastVersion'
import Dock from 'components/Desktop/Dock'
import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player'

export default function Wrapper() {
    const {
        windows,
        constraintsRef,
        compact,
        closingAllWindowsAnimation,
        setClosingAllWindowsAnimation,
        closeAllWindows,
    } = useApp()
    const [shakeReady, setShakeReady] = useState(false)

    return (
        <div className="fixed inset-0 size-full flex flex-col">
            {!compact && <TaskBarMenu />}
            <div ref={constraintsRef} className="flex-grow relative">
                <Desktop />
                <AnimatePresence onExitComplete={() => setClosingAllWindowsAnimation(false)}>
                    {windows.map((item, index) => {
                        return (
                            <motion.div
                                key={item.key}
                                animate={
                                    shakeReady
                                        ? {
                                              x: [0, (Math.random() - 0.5) * 45],
                                              y: [0, (Math.random() - 0.5) * 22],
                                              rotate: [0, (Math.random() - 0.5) * 15],
                                              transition: {
                                                  delay: index * 0.05,
                                                  duration: 0.1,
                                              },
                                          }
                                        : {}
                                }
                                exit={{
                                    y: window.innerHeight + 200,
                                    transition: {
                                        delay: index * 0.05,
                                        ease: 'easeInOut',
                                    },
                                }}
                            >
                                <AppWindow item={item} key={item.key} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
            {!compact && <Dock />}
            <CookieBannerToast />
            <AnimatePresence>
                {closingAllWindowsAnimation && (
                    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 size-full z-50">
                        <DotLottiePlayer
                            src="/lotties/hogzilla-swipe.lottie"
                            autoplay
                            onEvent={(event) => {
                                if (event === PlayerEvents.Play) {
                                    setTimeout(() => {
                                        setShakeReady(true)
                                    }, 2200)
                                }
                                if (event === PlayerEvents.Complete) {
                                    closeAllWindows()
                                    setShakeReady(false)
                                }
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
