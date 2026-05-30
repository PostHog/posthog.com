import React, { useEffect, useRef, useState } from 'react'
import { useApp } from '../../context/App'
import Desktop from 'components/Desktop'
import TaskBarMenu from 'components/TaskBarMenu'
import AppWindow from 'components/AppWindow'
import { AnimatePresence, motion } from 'framer-motion'
import CookieBannerToast from 'components/CookieBanner/ToastVersion'
import { DotLottiePlayer, PlayerEvents } from '@dotlottie/react-player'
import WebsiteFooter from 'components/WebsiteFooter'

export default function Wrapper() {
    const {
        windows,
        constraintsRef,
        compact,
        closingAllWindowsAnimation,
        setClosingAllWindowsAnimation,
        closeAllWindows,
        websiteMode,
        searchOpen,
    } = useApp()
    const [shakeReady, setShakeReady] = useState(false)
    const dotLottieRef = useRef<any>(null)

    useEffect(() => {
        if (closingAllWindowsAnimation) {
            dotLottieRef.current.play()
        }
    }, [closingAllWindowsAnimation])

    // Companion to the .reader-content-container a[aria-current='page'] CSS
    // rule in global.css: that rule visually strips the link, but the <a>
    // still has href + default tab focus. Without this, keyboard users land
    // on invisible focus stops and Enter still triggers navigation.
    // Runs after every render so newly-rendered MDX content is also covered.
    useEffect(() => {
        if (typeof document === 'undefined') return
        document.querySelectorAll('.reader-content-container a[aria-current="page"]').forEach((el) => {
            el.setAttribute('tabindex', '-1')
            el.setAttribute('aria-disabled', 'true')
        })
    })

    return (
        <div
            data-scheme="primary"
            className={`${
                websiteMode
                    ? 'max-w-7xl mx-auto border-x border-primary bg-primary shadow-xl min-h-screen'
                    : 'fixed inset-0 size-full'
            } flex flex-col`}
            id="app-container"
        >
            {!compact && <TaskBarMenu />}
            <div ref={constraintsRef} className={`flex-grow relative`}>
                <Desktop />
                <AnimatePresence>
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
                                    y: typeof window !== 'undefined' ? window.innerHeight + 200 : 0,
                                    transition: {
                                        delay: index * 0.05,
                                        ease: 'easeInOut',
                                    },
                                }}
                            >
                                <AppWindow item={item} key={item.key} chrome={item.key !== 'search'} />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
            {websiteMode && <WebsiteFooter />}
            {/*             
            {!compact && <Dock />}
            */}
            <CookieBannerToast />
            <AnimatePresence>
                <motion.div
                    exit={{ opacity: 0 }}
                    className={`fixed inset-0 size-full z-[999999] ${closingAllWindowsAnimation ? 'block' : 'hidden'}`}
                >
                    <DotLottiePlayer
                        className="size-full"
                        src="/lotties/hogzilla-swipe.lottie"
                        ref={dotLottieRef}
                        onEvent={(event) => {
                            if (event === PlayerEvents.Play) {
                                setTimeout(() => {
                                    setShakeReady(true)
                                    setTimeout(() => {
                                        closeAllWindows()
                                        setShakeReady(false)
                                    }, 500)
                                }, 2200)
                            }
                            if (event === PlayerEvents.Complete) {
                                setClosingAllWindowsAnimation(false)
                                dotLottieRef.current.stop()
                            }
                        }}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    )
}
