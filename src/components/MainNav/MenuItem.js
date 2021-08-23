import React, { useState, useRef } from 'react'
import { Minus, Plus, Chevron } from '../Icons/Icons'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import Link from '../Link'
import Submenu from './Submenu'

export default function MenuItem({ menuItem }) {
    const [hovered, setHovered] = useState(false)
    const { title, url, sub } = menuItem
    const breakpoints = useBreakpoint()

    const handleSubClick = () => {
        setHovered(!hovered)
    }
    const referenceElement = useRef(null)

    return (
        <li
            onMouseEnter={() => !breakpoints.md && setHovered(true)}
            onMouseLeave={() => !breakpoints.md && setHovered(false)}
            className="group w-full"
        >
            <span ref={referenceElement} className="flex justify-between items-center space-x-2">
                <Link
                    disablePrefetch
                    onClick={breakpoints.md && sub && handleSubClick}
                    to={url}
                    className="lg:opacity-50 opacity-100 group-hover:opacity-100 text-[15px] text-white hover:text-white lg:dark:text-white lg:dark:hover:text-white lg:text-almost-black lg:hover:text-almost-black transition-opacity"
                >
                    {title}
                </Link>
                {sub &&
                    (breakpoints.md ? (
                        <Plus
                            render={(icon) => (
                                <button className="flex-grow flex justify-end" onClick={handleSubClick}>
                                    {hovered ? <Minus /> : icon}
                                </button>
                            )}
                            open={hovered}
                        />
                    ) : (
                        <Chevron className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    ))}
            </span>

            {sub && hovered && <Submenu referenceElement={referenceElement} menu={sub} />}
        </li>
    )
}
