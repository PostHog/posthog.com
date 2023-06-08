import cntl from 'cntl'
import Link from 'components/Link'
import usePostHog from '../../hooks/usePostHog'
import React from 'react'

const sizes = {
    xs: 'text-sm font-bold px-4 py-2',
    sm: 'text-sm font-bold px-6 py-2.5',
    md: 'text-base font-bold px-5 py-3',
    lg: 'text-base font-bold px-6 py-3',
}

const primary = cntl`
    bg-yellow
    !text-white
`

const secondary = cntl`
    bg-white
    !text-primary
    dark:!text-white
    
`

const outline = cntl`
    bg-transparent
    !text-primary
    dark:!text-white
`

const buttonTypes = {
    primary,
    secondary,
    outline,
}

export const button = (
    type: keyof typeof buttonTypes = 'primary',
    width = 'auto',
    className = '',
    size: keyof typeof sizes = 'lg'
) =>
    type === 'custom'
        ? ''
        : cntl`
    rounded-md
    shadow-[0px_2.5px_#CD8407,inset_0px_-2px_#B17816]
    active:bottom-[-2.5px]
    active:shadow-[0px_0px_#CD8407,inset_0px_-2px_#B17816]
    relative
    after:absolute
    after:border-[1.5px]
    after:border-[#B17816]
    after:w-full
    active:after:h-[calc(100%+1.5px)]
    after:h-[calc(100%+4px)]
    after:inset-0
    after:rounded-md
    hover:after:h-[calc(100%+5px)]
    hover:bottom-[1px]
    hover:shadow-[0px_3.5px_#CD8407,inset_0px_-2px_#B17816]
    w-${width}
    ${buttonTypes[type] || ''}    
    ${sizes[size]}
    ${className}
`

export type CTAPropsType = {
    type?: keyof typeof buttonTypes
    width?: string
    size?: keyof typeof sizes
    href?: string
    to?: string
    onClick?: () => void
    children?: JSX.Element | string
    className?: string
    external?: boolean
    externalNoIcon?: boolean
    state?: any
    event?: any
}

export interface TrackedCTAPropsType extends CTAPropsType {
    event: {
        name: string
        [key: string]: any
    }
}

export const TrackedCTA = ({ event: { name: eventName, ...event }, ...props }: TrackedCTAPropsType): JSX.Element => {
    const posthog = usePostHog()

    return (
        <CallToAction
            {...props}
            onClick={() => {
                posthog?.capture(eventName, event)
                props.onClick && props.onClick()
            }}
        />
    )
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
    externalNoIcon,
    state = {},
    event,
}: CTAPropsType): JSX.Element => {
    const url = to || href
    return (
        <Link
            state={state}
            external={external}
            externalNoIcon={externalNoIcon}
            className={button(type, width, className, size)}
            onClick={onClick}
            to={url}
            event={event}
        >
            {children}
        </Link>
    )
}
