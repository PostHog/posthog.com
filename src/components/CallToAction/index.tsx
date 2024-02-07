import cntl from 'cntl'
import Link from 'components/Link'
import usePostHog from '../../hooks/usePostHog'
import React from 'react'

const sizes = {
    xs: cntl`
    rounded-[4px]
    text-[12px]
    font-bold
    px-2
    py-0.5
    translate-y-[-2px]
    hover:translate-y-[-3px]
    active:translate-y-[-1px]
    border-[1px]
    mx-[-1.5px]
    group-disabled:hover:!translate-y-[-2px]
    `,
    sm: cntl`
    rounded-[6px]
    text-[13px]
    font-bold
    px-3.5
    py-1.5
    translate-y-[-2px]
    hover:translate-y-[-3px]
    active:translate-y-[-1px]
    border-[1.5px]
    mx-[-1.5px]
    group-disabled:hover:!translate-y-[-2px]
    `,
    md: cntl`
    rounded-[6px]
    text-[14px]
    font-bold
    px-4
    py-1.5
    translate-y-[-2px]
    hover:translate-y-[-4px]
    active:translate-y-[-1px]
    border-[1.5px]
    mx-[-1.5px]
    group-disabled:hover:!translate-y-[-2px]
    `,
    lg: cntl`
    rounded-[8px]
    text-[15px]
    font-bold
    border-[1.5px]
    px-5
    py-2
    -translate-y-1
    hover:-translate-y-1.5
    active:-translate-y-0.5
    mx-[-1.5px]
    group-disabled:hover:!-translate-y-1
    `,
    absurd: cntl`
    rounded-[8px]
    text-2xl
    font-bold
    border-[1.5px]
    px-5
    py-2
    -translate-y-1
    hover:-translate-y-1.5
    active:-translate-y-0.5
    mx-[-1.5px]
    group-disabled:hover:!-translate-y-1
    `,
}

const primary = cntl`
    bg-orange
    text-primary
    hover:text-primary
    dark:text-primary
    dark:hover:text-primary
    border-button
    dark:border-button-dark
    dark:bg-orange
`

const secondary = cntl`
    bg-white
    text-primary
    hover:text-primary
    dark:text-primary-dark
    dark:hover:text-primary-dark
    border-button
    dark:border-orange
    dark:bg-dark
`

const outline = cntl`
    border-yellow
    bg-white
    text-primary
    hover:text-primary
    dark:bg-dark
    dark:text-primary-dark
    dark:hover:text-primary-dark
`

const custom = cntl`
    bg-dark
    text-primary-dark
    hover:text-primary-dark
`

const containerTypes = {
    primary: cntl`
        bg-button-shadow
        dark:bg-button-shadow-dark
    `,
    secondary: cntl`
        bg-orange
        dark:bg-button-secondary-shadow-dark
        dark:border-button-secondary-dark
    `,
    outline: cntl`
        bg-yellow/50
        border-dark/30
        dark:bg-white/10
        dark:border-white/20
    `,
    custom: cntl`
        bg-white/20
        border-white/30
    `,
}

const containerSizes = {
    xs: cntl`border-[1px] relative top-[1px] rounded-[4px]`,
    sm: cntl`border-[1.5px] relative top-[1px] rounded-[6px]`,
    md: cntl`border-[1.5px] relative top-[2px] rounded-[6px]`,
    lg: cntl`border-[1.5px] relative top-[2px] rounded-[8px]`,
    absurd: cntl`border-[1.5px] relative top-[2px] rounded-[8px]`,
}

export const container = (type = 'primary', size = 'lg', width = 'auto') => cntl`
    ${containerTypes[type]}
    ${containerSizes[size]}
    w-${width}
    text-primary
    inline-block
    border-button
    text-center
    group
    disabled:opacity-50
    disabled:cursor-not-allowed
`

export const child = (
    type: keyof typeof buttonTypes = 'primary',
    width = 'auto',
    className = '',
    size: keyof typeof sizes = 'lg',
    color = true
) => button(type, width, `block active:transition-all active:duration-100 select-none ${className}`, size, color)

const buttonTypes = {
    primary,
    secondary,
    outline,
    custom,
}

export const button = (
    type: keyof typeof buttonTypes = 'primary',
    width = 'auto',
    className = '',
    size: keyof typeof sizes = 'lg',
    color = true
) =>
    cntl`
    relative
    ${color ? `` : `!text-white`}
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
    childClassName?: string
    external?: boolean
    externalNoIcon?: boolean
    state?: any
    event?: any
    color?: boolean
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
    className = '',
    childClassName = '',
    external,
    externalNoIcon,
    state = {},
    event,
    color = true,
}: CTAPropsType): JSX.Element => {
    const url = to || href
    return (
        <Link
            state={state}
            external={external}
            externalNoIcon={externalNoIcon}
            onClick={onClick}
            to={url}
            event={event}
            className={`${container(type, size, width)} ${className}`}
        >
            <span
                className={`${button(
                    type,
                    width,
                    `block active:transition-all active:duration-100 select-none`,
                    size,
                    color
                )} ${childClassName}`}
            >
                {children}
            </span>
        </Link>
    )
}
