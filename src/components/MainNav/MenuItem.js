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
            className="group whitespace-nowrap lg:flex lg:justify-center"
        >
            <span ref={referenceElement} className="flex justify-between items-center">
                <Link
                    onClick={breakpoints.md && sub && handleSubClick}
                    to={url}
                    className={
                        classes ||
                        'font-semibold px-4 py-3 lg:py-2 text-[15px] transition-colors dark:text-white dark:hover:text-white text-almost-black hover:text-almost-black'
                    }
                >
                    {title}
                </Link>
                {sub &&
                    (breakpoints.md ? (
                        <Plus
                            render={(icon) => (
                                <button
                                    className="text-primary dark:text-primary-dark flex-grow flex justify-end"
                                    onClick={handleSubClick}
                                >
                                    {hovered ? <Minus /> : icon}
                                </button>
                            )}
                            open={hovered}
                        />
                    ) : (
                        <Chevron className="text-gray mt-1 -ml-3" />
                    ))}
            </span>

            {sub && hovered && <Submenu referenceElement={referenceElement} menu={sub} />}
        </li>
    )
}
