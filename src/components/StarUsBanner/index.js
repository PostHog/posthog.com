import { Close } from 'components/Icons/Icons'
import Link from 'components/Link'
import { AnimatePresence, motion } from 'framer-motion'
import usePostHog from '../../hooks/usePostHog'
import React, { useEffect, useState } from 'react'
import GitHubButton from 'react-github-btn'

export default function StarUsBanner() {
    const posthog = usePostHog()
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
                    className="lg:flex hidden fixed lg:bottom-[23px] bottom-[80px] z-[9998] w-[350px] left-[calc(50%_-_175px)] justify-center items-center"
                >
                    <div className="flex space-x-4 bg-yellow py-[12px] px-[25px] text-white rounded-full w-full sm:w-auto sm:items-center">
                        <p className="mx-auto m-0 sm:pr-1 text-[15px] font-semibold flex items-center space-x-4">
                            {posthog?.isFeatureEnabled('london-banner') ? (
                                <Link to="/hosthog/london" className="text-white hover:text-white">
                                    Come say &#128075; at our London meet-up!
                                </Link>
                            ) : (
                                <>
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
                                </>
                            )}
                        </p>
                        <button className="text-white ml-auto" onClick={handleClick}>
                            <Close className="w-3 h-3 relative hover:scale-[1.1] active:top-[0.5px] active:scale-[.99]" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
