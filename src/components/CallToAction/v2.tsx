// @todo - add/use to, href, and onClick props

import React from 'react'
import { Link } from 'gatsby'
import { mergeClassList } from '../../lib/utils'

import rocketImg from './images/rocket.svg'
import calendarImg from './images/calendar.svg'

interface V2CallToActionProps {
    width?: 'auto' | 'fixed'
    icon?: string
    color?: 'primary' | 'secondary' | 'light' | 'dark'
    style?: 'slanted' | 'standard'
    state?: 'current' | null
    iconBg?: ''
    children: any

    href?: string
    to?: string
    onClick?: () => void
}

const icons = {
    rocket: rocketImg,
    calendar: calendarImg,
    none: null,
}

export const V2CallToAction = ({
    width = 'auto',
    icon = 'none',
    color = 'primary',
    style = 'slanted',
    state,
    href,
    to,
    onClick,
    children,
}: V2CallToActionProps) => {
    const iconBg = 'something-related-to-color?'
    const iconNode = icons[icon] ? (
        <span
            className={`${iconBg} icon inline-block bg-opacity-10 bg-yellow-100 rounded rounded-sm pl-3 pr-8 py-2 mr-8`}
        >
            <img src={icons[icon]} className="h-4 w-4 mb-0" alt="Get started with PostHog" />
        </span>
    ) : null

    const baseClasses = 'button'
    const widthClass = width == 'auto' ? 'w-auto' : null
    const colorClass = `button--${color}` // .button--primary .button--secondary .button--light .button--dark
    const styleClass = style == 'slanted' ? 'button--slanted' : null // .button--slanted
    const stateClass = state == 'current' ? 'button--current' : null // .button--current

    const classList = mergeClassList(baseClasses, widthClass, colorClass, styleClass, stateClass)

    const innerHtml = (
        <>
            {iconNode}
            <span className="mx-auto button-label">{children}</span>
        </>
    )

    return href ? (
        <a href={href} className={classList}>
            {innerHtml}
        </a>
    ) : to ? (
        <Link to={to} className={classList}>
            {innerHtml}
        </Link>
    ) : (
        <button onClick={onClick} className={classList}>
            {innerHtml}
        </button>
    )
}
