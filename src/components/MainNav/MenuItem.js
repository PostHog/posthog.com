import React, { useState, useRef } from 'react'
import { Minus, Plus, Chevron } from '../Icons/Icons'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import Link from '../Link'
import Submenu from './Submenu'

export default function MenuItem({ menuItem }) {
    const [hovered, setHovered] = useState(false)
    const { title, url, sub, classes = '' } = menuItem
    const breakpoints = useBreakpoint()
    const handleSubClick = () => {
        setHovered(!hovered)
    }
    const referenceElement = useRef(null)

    return (
        <li
            onMouseEnter={() => !breakpoints.md && setHovered(true)}
            onMouseLeave={() => !breakpoints.md && setHovered(false)}
            className="group whitespace-nowrap"
        >
            <span ref={referenceElement} className="flex justify-between items-center space-x-2">
                <Link
                    onClick={breakpoints.md && sub && handleSubClick}
                    to={url}
                    className={`${classes} font-semibold text-[15px] text-almost-black hover:text-almost-black`}
                >
                    {title}
                </Link>
                {sub &&
                    (breakpoints.md ? (
                        <Plus
                            render={(icon) => (
                                <button
                                    className="text-almost-black flex-grow flex justify-end"
                                    onClick={handleSubClick}
                                >
                                    {hovered ? <Minus /> : icon}
                                </button>
                            )}
                            open={hovered}
                        />
                    ) : (
                        <Chevron className="text-almost-black" />
                    ))}
            </span>

            {sub && hovered && <Submenu referenceElement={referenceElement} menu={sub} />}
        </li>
    )
}
