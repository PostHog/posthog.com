import cntl from 'cntl'
import Link from 'components/Link'
import usePostHog from '../../hooks/usePostHog'
import React from 'react'

const sizes = {
    xs: 'text-sm font-bold',
    sm: 'text-sm font-bold',
    md: 'text-[15px] font-bold',
    lg: 'text-base font-bold',
}

const primary = cntl`
    bg-button-shadow
    text-bg-dark
`

const secondary = cntl`
    text-primary
    border-yellow
    dark:border-white
    border-text-primary
    dark:border-white
    border-2
    text-primary
    dark:text-primary-dark
`

const outline = cntl`
    bg-white
    border-black/10
    hover:border-black/30
    border
    text-primary
    hover:text-primary
`

const buttonTypes = {
    primary,
    secondary,
    outline,
    custom: '',
}

export const outerButton = (type: keyof typeof buttonTypes = 'primary', width = 'auto', className = '') => cntl`
    rounded-md
    inline-block
    inline-flex
    cta
    relative
    w-${width}
    ${buttonTypes[type] || ''}
    ${className}
`

export const innerButton = (
    type: keyof typeof buttonTypes = 'primary',
    width = 'auto',
    className = '',
    size: keyof typeof sizes = 'lg'
) => cntl`
    !bg-yellow
    text-center
    select-none
    rounded-md
    text-primary
    cta
    px-5 py-2 font-semibold inline-flex -translate-y-1 hover:-translate-y-1.5 active:-translate-y-0.5 active:transition-all
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
            className={outerButton(type, width, className)}
            onClick={onClick}
            to={url}
            event={event}
        >
            <span className={innerButton(type, width, className, size)}>{children}</span>
        </Link>
    )
}
