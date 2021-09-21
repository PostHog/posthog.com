// @todo - add/use to, href, and onClick props

import React, { MouseEventHandler } from 'react'
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
    outline:
        'text-center select-none rounded-full bg-tan bg-opacity-75 dark:bg-primary text-primary text-opacity-80 hover:text-opacity-100 dark:text-primary-dark hover:text-primary border-opacity-10 hover:border-opacity-25 active:border-opacity-50 border-primary dark:border-primary-dark font-bold px-5 py-2 border-3',
}

interface CallToActionProps {
    onClick?: MouseEventHandler
    className?: string
    icon?: keyof typeof icons
    type?: keyof typeof buttonTypeClasses
    iconBg?: string
    children: React.ReactNode
    width?: string
    href?: string
    to?: string
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
}: CallToActionProps): JSX.Element => {
    const iconNode = icons[icon] ? (
        <span className={`${iconBg} icon inline-block mr-3 bg-opacity-10 rounded-sm px-3 py-2`}>
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
