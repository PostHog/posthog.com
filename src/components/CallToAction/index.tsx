import cntl from 'cntl'
import Link from 'components/Link'
import usePostHog from '../../hooks/usePostHog'
import React from 'react'

const sizes = {
    sm: `
    rounded-sm
    after:rounded-sm
    text-sm
    font-semibold
    px-3
    py-1.5
    shadow-[0px_1.5px_#CD8407,inset_0px_-1px_#B17816]
    active:bottom-[-1.5px]
    active:shadow-[0px_0px_#CD8407,inset_0px_-2px_#B17816]
    active:after:h-[calc(100%+1.5px)]
    after:h-[calc(100%+3px)]
    hover:after:h-[calc(100%+4px)]
    hover:bottom-[1px]
    hover:shadow-[0px_2.5px_#CD8407,inset_0px_-1px_#B17816]
    `,
    md: `
    rounded-md
    after:rounded-md
    text-base
    font-bold
    px-4
    py-2
    shadow-[0px_2.5px_#CD8407,inset_0px_-2px_#B17816]
    active:bottom-[-2.5px]
    active:shadow-[0px_0px_#CD8407,inset_0px_-2px_#B17816]
    active:after:h-[calc(100%+1.5px)]
    after:h-[calc(100%+4px)]
    hover:after:h-[calc(100%+5px)]
    hover:bottom-[1px]
    hover:shadow-[0px_3.5px_#CD8407,inset_0px_-2px_#B17816]
    `,
    lg: `
    rounded-md
    after:rounded-md
    text-base
    font-bold
    px-5
    py-2.5
    shadow-[0px_2.5px_#CD8407,inset_0px_-2px_#B17816]
    active:bottom-[-2.5px]
    active:shadow-[0px_0px_#CD8407,inset_0px_-2px_#B17816]
    active:after:h-[calc(100%+1.5px)]
    after:h-[calc(100%+4px)]
    hover:after:h-[calc(100%+5px)]
    hover:bottom-[1px]
    hover:shadow-[0px_3.5px_#CD8407,inset_0px_-2px_#B17816]
    `,
}

const primary = cntl`
    bg-yellow
    text-primary
    hover:text-primary
    dark:text-primary
    dark:hover:text-primary
`

const secondary = cntl`
    bg-white
    dark:text-primary
    dark:hover:text-primary
`

const outline = cntl`
    bg-transparent
    text-primary
    hover:text-primary
    dark:text-primary-dark
    dark:hover:text-primary-dark
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
    relative
    after:absolute
    after:border-[1.5px]
    after:border-button
    after:w-full
    after:inset-0
    text-center
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
