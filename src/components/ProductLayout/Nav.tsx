import Link from 'components/Link'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import slugify from 'slugify'
import { useLocation } from '@reach/router'
import { Analytics, SessionRecording, FeatureFlags, AbTesting } from 'components/ProductIcons'
import { Platform } from 'components/NotProductIcons'

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

export default function Nav() {
    const { pathname } = useLocation()
    const [activeStyles, setActiveStyles] = useState({})
    const activeItem = useRef<HTMLLIElement>(null)

    const setStyles = useCallback(() => {
        if (activeItem?.current) {
            const bounding = activeItem.current.getBoundingClientRect()
            setActiveStyles({ width: bounding?.width, left: activeItem.current.offsetLeft })
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', setStyles)
        return () => {
            window.removeEventListener('resize', setStyles)
        }
    }, [])

    useEffect(() => {
        setStyles()
    }, [pathname])

    return (
        <nav className="relative z-10 -mx-5 overflow-x-auto">
            <div className="relative flex max-w-screen-2xl mx-auto md:border-b md:border-gray-accent-light md:border-dashed px-4 pb-2.5 md:pb-0">
                <ul className="list-none flex p-0 m-auto space-x-1 md:space-x-4  whitespace-nowrap">
                    {nav.map((navItem) => {
                        const { label, url, icon } = navItem
                        const active = pathname === url
                        return (
                            <li
                                ref={active ? activeItem : null}
                                id={`product-nav-${slugify(url, { lower: true })}`}
                                key={label}
                                className="first:ml-auto last:mr-auto"
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
                            </li>
                        )
                    })}
                </ul>
                <div
                    style={activeStyles}
                    className="h-[3px] md:h-[2px] bg-red rounded-md absolute bottom-3 md:bottom-[-1px] z-10 transition-all duration-500"
                />
            </div>
        </nav>
    )
}
