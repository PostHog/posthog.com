// @todo - add/use to, href, and onClick props

import React from 'react'
import { Link } from 'gatsby'

import { mergeClassList } from '../../lib/utils'

import rocketImg from './../CallToAction/images/rocket.svg'
import calendarImg from './../CallToAction/images/calendar.svg'
import githubImg from './../CallToAction/images/github.svg'
import handbookImg from './../CallToAction/images/handbook.svg'
import roadmapImg from './../CallToAction/images/roadmap.svg'
import checkImg from './../CallToAction/images/check.svg'
import bookImg from './../CallToAction/images/book.svg'
import downArrow from './../CallToAction/images/down-arrow.svg'
import readDarkImg from './../CallToAction/images/read-dark.svg'

interface ProductFeatureNewProps {
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

const sizeClasses = {
    full: 'FULLCLASS', //
    half: 'HALFCLASS',
    third: 'THIRDCLASS',

    large: 'LARGE',
    medium: 'MEDIUM',
    custom: 'SMALL',
    primary: 'primary_class',
}

export const ProductFeatureNew = ({
    className = '',
    type = 'primary',
    icon = 'none',
    iconBg = 'bg-white relative',

    children,
    //width = 'full', // full | half
    href,
    to,
    onClick,
}: ProductFeatureNewProps) => {
    const iconNode = icons[icon] ? (
        <span className={`${iconBg} icon inline-block bg-opacity-10 rounded rounded-sm px-3 py-2`}>
            <img src={icons[icon]} className="h-4 w-4 mb-0" alt="Get started with PostHog" />
        </span>
    ) : null

    //const widthClass = `${width}`
    //const baseClasses = `${widthClass} baseClasses`
    const baseClasses = `baseClassesgroup `

    const classList = mergeClassList(baseClasses, sizeClasses[type], className)

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
        <div onClick={onClick} className={classList}>
            {innerHtml}
        </div>
    )
}
