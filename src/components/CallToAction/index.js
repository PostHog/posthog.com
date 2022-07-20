import cntl from 'cntl'
import Link from 'components/Link'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React from 'react'

const sizes = {
    xs: 'text-[14px] font-bold px-3 py-[4px] border-2',
    sm: 'text-[15px] font-bold px-4 py-[6px] border-2',
    md: 'text-[16px] font-bold px-5 py-[7px] border-2',
    lg: 'text-[17px] font-bold px-6 py-[8px] border-3 ',
}

const primary = cntl`
    bg-red
    border-red
    dark:bg-primary-dark
    text-white
    dark:text-primary
    hover:text-white
    hover:dark:text-primary
    hover:bg-red-hover
    hover:border-red-hover
    active:bg-red-active
    active:border-red-active
    dark:primary-dark
    button-shadow
`

const secondary = cntl`
    bg-white
    border-white
    text-primary
    hover:text-primary
`

const outline = cntl`
    bg-tan
    bg-opacity-75
    dark:bg-primary
    text-primary
    text-opacity-80
    hover:text-opacity-100
    dark:text-primary-dark
    hover:text-primary
    border-opacity-10
    hover:border-opacity-25
    active:border-opacity-50
    border-primary
    dark:border-primary-dark
`

const buttonTypes = {
    primary,
    secondary,
    outline,
    custom: '',
}

const button = (type = 'primary', width = 'auto', className = '', size = 'lg') => cntl`
    text-center
    select-none
    rounded-sm
    inline-block
    cta
    relative
    active:top-[1px]
    active:scale-[.97]
    w-${width}
    ${buttonTypes[type] || ''}
    ${sizes[size]}
    ${className}
`

export const TrackedCTA = ({ event: { name: eventName, ...event }, ...props }) => {
    const { posthog } = useValues(posthogAnalyticsLogic)

    return <CallToAction {...props} onClick={() => posthog?.capture(eventName, event)} />
}

export const CallToAction = ({
    type = 'primary',
    width = 'auto',
    size = 'lg',
    href,
    to,
    onClick,
    children,
    className,
    external,
    state = {},
    event,
}) => {
    const url = to || href
    return (
        <Link
            state={state}
            external={external}
            className={button(type, width, className, size)}
            onClick={onClick}
            to={url}
            event={event}
        >
            {children}
        </Link>
    )
}
