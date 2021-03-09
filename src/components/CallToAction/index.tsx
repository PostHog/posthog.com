// @todo - add/use to, href, and onClick props

import React from 'react'
import { Link } from 'gatsby'

import rocketImg from './images/rocket.svg'
import calendarImg from './images/calendar.svg'
import githubImg from './images/github.svg'
import handbookImg from './images/handbook.svg'

interface CallToActionProps {
    onClick?: void
    className?: string
    type?: string
    icon?: string
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
    none: null,
}

const buttonTypeClasses = {
    secondary: 'bg-transparent border-2 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10',
    primary: 'bg-primary border-primary hover:border-primary-dark hover:bg-primary-dark text-white',
    custom: '',
}

export const CallToAction = ({
    className = '',
    type = 'primary',
    icon = 'none',
    children,
    width = '56',
    href,
    to,
    onClick,
}: CallToActionProps) => {
    const iconNode = icons[icon] ? (
        <div className="bg-opacity-10 bg-yellow-100 rounded rounded-sm p-1 mr-8">
            <img src={icons[icon]} className="h-4 w-4 mb-0" alt="Get started with PostHog" />
        </div>
    ) : null

    const widthClass = `w-${width}`
    const baseClasses = `p-2 ${widthClass} uppercase rounded-sm flex items-center justify-between mx-auto`
    const classList = [baseClasses, buttonTypeClasses[type], className].join(' ')

    const innerHtml = (
        <>
            {iconNode}
            <div className="mr-8">{children}</div>
            <span></span>
        </>
    )

    if (href) {
        return (
            <a href={href} target="_blank" className={classList} rel="noreferrer">
                {innerHtml}
            </a>
        )
    } else if (to) {
        return (
            <Link to={to} className={classList}>
                {innerHtml}
            </Link>
        )
    } else {
        return (
            <button onClick={onClick} className={classList}>
                {innerHtml}
            </button>
        )
    }
}
