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
                        return <AppWindow item={item} key={item.key} />
                    })}
                </AnimatePresence>
            </div>
            {isMobile && !compact && <Dock />}
            <CookieBannerToast />
        </div>
    )
}
