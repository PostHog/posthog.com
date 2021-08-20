import React, { useState } from 'react'
import { Minus, Plus, Chevron } from '../Icons/Icons'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import Link from '../Link'
import Submenu from './Submenu'

export default function MenuItem({ menuItem }) {
    const [subOpen, setSubOpen] = useState(false)
    const { title, url, sub } = menuItem
    const breakpoints = useBreakpoint()

    const handleSubClick = () => setSubOpen(!subOpen)
    const [referenceElement, setReferenceElement] = useState(null)

    return (
        <li className="group w-full">
            <div ref={setReferenceElement} className="flex justify-between items-center space-x-2">
                <Link
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
                                    {subOpen ? <Minus /> : icon}
                                </button>
                            )}
                            open={subOpen}
                        />
                    ) : (
                        <Chevron className="opacity-50 group-hover:opacity-100 transition-opacity" />
                    ))}
            </div>

            {sub && <Submenu referenceElement={referenceElement} menu={sub} open={subOpen} />}
        </li>
    )
}
