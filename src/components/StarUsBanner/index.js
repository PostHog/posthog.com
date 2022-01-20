import { Close } from 'components/Icons/Icons'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import GitHubButton from 'react-github-btn'

export default function StarUsBanner() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hideBanner = window?.localStorage?.getItem('hide-banner')
            setVisible(hideBanner !== 'true')
        }
    }, [])

    const handleClick = () => {
        setVisible(false)
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('hide-banner', 'true')
        }
    }
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="star-us-banner"
                    initial={{ translateY: 'calc(100% + 23px)', opacity: 0 }}
                    animate={{ translateY: '0%', opacity: 1 }}
                    exit={{ translateY: 'calc(100% + 23px)', opacity: 1 }}
                    className="fixed bottom-[23px] z-[9998] w-full flex justify-center items-center"
                >
                    <div className="flex items-center space-x-4 bg-red py-[12px] px-[25px] text-white rounded-full ">
                        <p className="m-0 text-base font-semibold flex items-center space-x-4">
                            <span>Star us on GitHub</span>
                            <span className="h-[28px] w-[125px]">
                                <GitHubButton
                                    className="text-red hover:text-red"
                                    href="https://github.com/posthog/posthog"
                                    data-size="large"
                                    data-show-count="true"
                                    aria-label="Star posthog/posthog on GitHub"
                                >
                                    Star
                                </GitHubButton>
                            </span>
                        </p>
                        <button className="text-white" onClick={handleClick}>
                            <Close className="w-3 h-3" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
