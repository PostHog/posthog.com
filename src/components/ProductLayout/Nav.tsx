import Link from 'components/Link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import slugify from 'slugify'
import { useLocation } from '@reach/router'
import { Analytics, SessionRecording, FeatureFlags, AbTesting } from 'components/ProductIcons'
import { Platform } from 'components/NotProductIcons'
import Slider from 'react-slick'
import { AnimatePresence, motion } from 'framer-motion'

const nav = [
    {
        label: 'Product analytics',
        url: '/product-analytics',
        icon: <Analytics className="w-5" />,
    },
    {
        label: 'Session replay',
        url: '/session-replay',
        icon: <SessionRecording className="w-5" />,
    },
    {
        label: 'Feature flags',
        url: '/feature-flags',
        icon: <FeatureFlags className="w-5" />,
    },
    {
        label: 'A/B testing',
        url: '/ab-testing',
        icon: <AbTesting className="w-5" />,
    },
    {
        label: 'Product OS',
        url: '/product-os',
        icon: <Platform className="w-5" />,
    },
]

const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToScroll: 1,
    autoplay: false,
    variableWidth: true,
    draggable: true,
    centerMode: true,
}

export default function Nav() {
    const { pathname } = useLocation()
    const sliderRef = useRef(null)

    useEffect(() => {
        sliderRef?.current && sliderRef?.current?.slickGoTo(nav.findIndex((navItem) => navItem.url === pathname))
    }, [pathname])

    return (
        <nav className="z-10 -mx-5">
            <div className="px-4 pb-2.5 md:pb-0 relative after:w-full after:md:border-b after:border-gray-accent-light after:border-dashed after:absolute after:bottom-0">
                <div className="product-nav z-10 relative">
                    <Slider ref={sliderRef} {...sliderSettings}>
                        {nav.map((navItem) => {
                            const { label, url, icon } = navItem
                            const active = pathname === url
                            return (
                                <div
                                    className="relative"
                                    id={`product-nav-${slugify(url, { lower: true })}`}
                                    key={label}
                                >
                                    <Link
                                        className={`flex space-x-2 items-center ${
                                            active
                                                ? '!text-red !font-bold'
                                                : '!text-primary/75 hover:border-gray-accent-light hover:bg-gray-accent-light'
                                        } px-3 py-1.5 mb-1.5 text-sm [font-variation-settings:_'wght'_700] whitespace-nowrap rounded relative hover:scale-[1.01] active:scale-[.99] tracking-[-.1px] group`}
                                        to={url}
                                    >
                                        <span className={`text-black ${active ? 'opacity-100' : 'opacity-70'} `}>
                                            {icon}
                                        </span>
                                        <span>{label}</span>
                                    </Link>
                                    <AnimatePresence>
                                        {active && (
                                            <motion.div
                                                transition={{ duration: 0.2 }}
                                                initial={{ translateY: 50, opacity: 0 }}
                                                animate={{ translateY: 0, opacity: '100%' }}
                                                exit={{ translateY: 50, opacity: 0 }}
                                                className="h-[3px] md:h-[2px] bg-red rounded-md absolute bottom-0 z-10 transition-all duration-500 w-full left-0"
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </div>
        </nav>
    )
}
