// @todo - add/use to, href, and onClick props

import React from 'react'

import rocketImg from './images/rocket.svg'
import calendarImg from './images/calendar.svg'

interface CallToActionProps {
    onClick?: void
    className?: string
    type?: string
    icon?: string
    children: any
}

const icons = {
    rocket: rocketImg,
    calendar: calendarImg,
    none: null,
}

export const CallToAction = ({ className = '', type, icon = 'none', children }: CallToActionProps) => {
    const iconNode = icons[icon] ? (
        <div className="bg-opacity-10 bg-yellow-100 rounded rounded-sm p-1 mr-8">
            <img src={icons[icon]} className="h-4 w-4 mb-0" alt="Get started with PostHog" />
        </div>
    ) : null

    const baseClasses = 'p-2 w-56 uppercase rounded-sm text-white flex items-center justify-between mx-auto'
    const classList =
        type == 'secondary'
            ? baseClasses.concat(
                  ' bg-transparent border-2 border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10 ',
                  className
              )
            : baseClasses.concat(
                  ' bg-primary border-primary hover:border-primary-dark hover:bg-primary-dark text-white ',
                  className
              )

    return (
        <button className={classList}>
            {iconNode}
            <div className="mr-8">{children}</div>
        </button>
    )
}
