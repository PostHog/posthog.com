import React, { useState, useRef } from 'react'
import { Minus, Plus, Chevron } from '../Icons/Icons'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import Link from '../Link'
import Submenu from './Submenu'
import { menuItem as menuItemClass, link } from './classes'

export default function MenuItem({ menuItem }) {
    const [hovered, setHovered] = useState(false)
    const { title, url, sub, classes = '', hideBorder } = menuItem
    const breakpoints = useBreakpoint()
    const handleSubClick = () => {
        setHovered(!hovered)
    }
    const referenceElement = useRef(null)
    return (
        <li
            onMouseEnter={() => !breakpoints.md && setHovered(true)}
            onMouseLeave={() => !breakpoints.md && setHovered(false)}
            className={menuItemClass(hideBorder)}
        >
            <span ref={referenceElement} className="flex justify-between items-center">
                <Link onClick={breakpoints.md && sub && handleSubClick} to={url} className={link(classes)}>
                    {title}
                </Link>
                {sub &&
                    (breakpoints.md ? (
                        <button
                            className="text-primary dark:text-primary-dark flex-grow flex justify-end mr-4"
                            onClick={handleSubClick}
                        >
                            {hovered ? <Minus /> : <Plus />}
                        </button>
                    ) : (
                        <Chevron className="text-gray mt-1 -ml-3" />
                    ))}
            </span>

            {sub && hovered && <Submenu referenceElement={referenceElement} menu={sub} parentURL={url} />}
        </li>
    )
}
