import { Close } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
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
        visible && (
            <div className=" p-3 text-center flex items-center relative justify-center">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="bg-red absolute inset-0 w-full h-full transition-all duration-1000"
                />
                <p className="m-0 flex justify-center items-center space-x-3 text-white font-semibold">
                    <span>Star us on GitHub</span>
                    <span className="h-[28px] w-[125px]">
                        <GitHubButton
                            className="text-tan hover:text-tan"
                            href="https://github.com/posthog/posthog"
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star posthog/posthog on GitHub"
                        >
                            Star
                        </GitHubButton>
                    </span>
                </p>
                <button onClick={handleClick} className="absolute right-4">
                    <Close className="  w-3 h-3" />
                </button>
            </div>
        )
    )
}
