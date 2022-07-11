import React, { useState, useRef } from 'react'
import { Minus, Plus, Chevron } from '../Icons/Icons'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import Link from '../Link'
import Submenu from './Submenu'
import { menuItem as menuItemClass, link } from './classes'
import { CallToAction } from 'components/CallToAction'
import { usePopper } from 'react-popper'

export default function MenuItem({ menuItem, referenceElement }) {
    const [hovered, setHovered] = useState(false)
    const { title, url, sub, hideBorder, cta, classes = '' } = menuItem
    const breakpoints = useBreakpoint()
    const handleSubClick = () => {
        setHovered(!hovered)
    }

    const [popperElement, setPopperElement] = useState(null)
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: sub?.placement,
    })
    return (
        <li
            onMouseEnter={() => !breakpoints.md && setHovered(true)}
            onMouseLeave={() => !breakpoints.md && setHovered(false)}
            className={menuItemClass(hideBorder)}
        >
            <span className="flex justify-between items-center">
                {cta ? (
                    <CallToAction
                        size="sm"
                        onClick={breakpoints.md && sub && handleSubClick}
                        to={url}
                        className={`mx-auto lg:mx-0 ${classes}`}
                    >
                        {title}
                    </CallToAction>
                ) : (
                    <Link
                        onClick={breakpoints.md && sub && handleSubClick}
                        to={url}
                        className={link(classes, sub && hovered)}
                    >
                        <span>{title}</span>
                        {sub && !breakpoints.md && <Chevron className="text-gray mt-1 -ml-3" />}
                    </Link>
                )}
                {sub && breakpoints.md && (
                    <button
                        className={`text-primary rounded- dark:text-primary-dark flex-grow flex justify-end mr-4`}
                        onClick={handleSubClick}
                    >
                        {hovered ? <Minus /> : <Plus />}
                    </button>
                )}
            </span>

            {sub && hovered && (
                <div ref={setPopperElement} style={!breakpoints.md ? styles.popper : {}} {...attributes.popper}>
                    <Submenu referenceElement={referenceElement} menu={sub} parentURL={url} />
                </div>
            )}
        </li>
    )
}
