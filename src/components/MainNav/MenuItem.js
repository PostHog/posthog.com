import React, { useState, useRef } from 'react'
import { Minus, Plus, Chevron } from '../Icons/Icons'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import Link from '../Link'
import Submenu from './Submenu'
import { menuItem as menuItemClass, link } from './classes'
import { CallToAction } from 'components/CallToAction'
import { RenderInClient } from 'components/RenderInClient'
import usePostHog from '../../hooks/usePostHog'

export const MenuItemLink = ({ menuItem, hovered, urlOverride }) => {
    const breakpoints = useBreakpoint()
    const { title, url, sub, classes = '' } = menuItem
    console.log(menuItem)

    return (
        <Link
            onClick={breakpoints.md && sub && handleSubClick}
            to={urlOverride || url}
            className={link(classes, sub && hovered)}
        >
            <span>{title}</span>
            {sub && !breakpoints.md && <Chevron className="text-black/25 dark:text-white/50 mt-1 -ml-3" />}
        </Link>
    )
}

export default function MenuItem({ menuItem, referenceElement }) {
    const [hovered, setHovered] = useState(false)
    const { title, url, sub, hideBorder, cta, classes = '' } = menuItem
    const posthog = usePostHog()
    const breakpoints = useBreakpoint()
    const handleSubClick = () => {
        setHovered(!hovered)
    }

    return (
        <li
            onMouseEnter={() => !breakpoints.md && setHovered(true)}
            onMouseLeave={(e) => !e.target.shadowRoot && !breakpoints.md && setHovered(false)}
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
                ) : title === 'Login' ? (
                    <RenderInClient
                        placeholder={<MenuItemLink menuItem={menuItem} hovered={hovered} />}
                        render={() => (
                            <MenuItemLink
                                menuItem={menuItem}
                                urlOverride={`https://${
                                    posthog?.isFeatureEnabled('direct-to-eu-cloud') ? 'eu' : 'app'
                                }.posthog.com/signup`}
                                hovered={hovered}
                            />
                        )}
                    />
                ) : (
                    <MenuItemLink menuItem={menuItem} hovered={hovered} />
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

            {sub && hovered && <Submenu referenceElement={referenceElement} menu={sub} parentURL={url} />}
        </li>
    )
}
