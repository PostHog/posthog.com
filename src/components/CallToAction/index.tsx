// @todo - add/use to, href, and onClick props

import React from 'react'
import { Link } from 'gatsby'

import { mergeClassList } from '../../lib/utils'

import rocketImg from './images/rocket.svg'
import calendarImg from './images/calendar.svg'
import githubImg from './images/github.svg'
import handbookImg from './images/handbook.svg'
import roadmapImg from './images/roadmap.svg'
import checkImg from './images/check.svg'
import bookImg from './images/book.svg'
import downArrow from './images/down-arrow.svg'
import readDarkImg from './images/read-dark.svg'

interface CallToActionProps {
    onClick?: () => void
    className?: string
    type?: string
    icon?: string
    iconBg?: string
    children: any
    width?: string
    href?: string
    to?: string
}

const icons = {
    rocket: rocketImg,
    calendar: calendarImg,
    github: githubImg,
    handbook: handbookImg,
    roadmap: roadmapImg,
    check: checkImg,
    book: bookImg,
    'down-arrow': downArrow,
    'read-dark': readDarkImg,
    none: null,
}

const buttonTypeClasses = {
    primary: 'button-primary rounded text-white hover:text-white',
    secondary: 'button-secondary rounded text-white hover:text-white',
    button: 'button rounded text-white hover:text-white',
    custom: '',
}

export const CallToAction = ({
    className = '',
    type = 'primary',
    icon = 'none',
    iconBg = 'bg-white relative',
    children,
    width = '64',
    href,
    to,
    onClick,
}: CallToActionProps) => {
    const iconNode = icons[icon] ? (
        <span className={`${iconBg} icon inline-block mr-3 bg-opacity-10 rounded rounded-sm px-3 py-2`}>
            <img src={icons[icon]} className="h-4 w-4 mb-0" alt="Get started with PostHog" />
        </span>
    ) : null

    const widthClass = `w-full sm:w-${width}`
    const baseClasses = `px-4 py-2 ${widthClass} rounded inline-flex items-center justify-between font-bold text-sm relative select-none`
    const classList = mergeClassList(baseClasses, buttonTypeClasses[type], className)

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
