import { Close } from 'components/Icons/Icons'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export const ProductHuntBadgeLayoutWrapper = ({ children }) => {
    return (
        <>
            <ProductHuntBadge />
            {children}
        </>
    )
}

function ProductHuntBadge() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const hideProductHuntBadge = window?.localStorage?.getItem('hide-product-hunt-badge')
            setVisible(hideProductHuntBadge !== 'true')
        }
    }, [])

    const handleClick = () => {
        setVisible(false)
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('hide-product-hunt-badge', 'true')
        }
    }

    return (
        visible && (
            <div className="text-white flex flex-col md:flex-row items-center justify-center py-3 px-4 relative">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    className="bg-red absolute inset-0 w-full h-full transition-all duration-1000"
                />
                <p className="mb-2 mr-0 md:mb-0 md:mr-4 font-bold text-sm md:text-base">
                    Nov 18: We're trending on ProductHunt!
                </p>
                <a
                    className="relative"
                    href="https://www.producthunt.com/posts/posthog-3?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-posthog-3"
                    target="_blank"
                    rel="noreferrer"
                >
                    <img
                        src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=320054&theme=light"
                        alt="PostHog - An all-in-one product analytics suite you can self-host | Product Hunt"
                        className="max-w-[180px] md:max-w-[200px]"
                    />
                </a>
                <button onClick={handleClick} className="absolute right-4">
                    <Close className="h-3 w-3 md:w-4 md:h-4" />
                </button>
            </div>
        )
    )
}
