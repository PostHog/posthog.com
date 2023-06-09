import cntl from 'cntl'
import Link from 'components/Link'
import usePostHog from '../../hooks/usePostHog'
import React from 'react'

const sizes = {
    sm: cntl`
    rounded-sm
    text-xs
    font-semibold
    px-4
    py-2
    translate-y-[-2px]
    hover:translate-y-[-3px]
    active:translate-y-[-1px]
    border-[1.5px]
    mx-[-1.5px]
    `,
    md: cntl`
    rounded-sm
    text-[13px]
    font-bold
    px-4
    py-2
    translate-y-[-2px]
    hover:translate-y-[-4px]
    active:translate-y-[-1px]
    border-[1.5px]
    mx-[-1.5px]
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
    `,
}

const primary = cntl`
    bg-orange
    text-primary
    hover:text-primary
    dark:text-primary
    dark:hover:text-primary
    border-button
    dark:border-orange
`

const secondary = cntl`
    bg-white
    text-primary
    hover:text-primary
    dark:text-primary
    dark:hover:text-primary
    border-button
    dark:border-white
    
`

const outline = cntl`
    border-[1.5px]
    text-primary
    hover:text-primary
    dark:text-primary-dark
    dark:hover:text-primary-dark
`

const containerTypes = {
    primary: cntl`
        bg-button-shadow
    `,
    secondary: cntl`
        bg-orange
    `,
    outline: cntl``,
}

const containerSizes = {
    sm: cntl`border-[1.5px] dark:border-transparent rounded-sm`,
    md: cntl`border-[1.5px] dark:border-transparent rounded-md`,
    lg: cntl`border-[1.5px] dark:border-transparent rounded-[8px]`,
}

const container = (type, size, width) => cntl`
    ${containerTypes[type]}
    ${containerSizes[size]}
    w-${width}
    text-primary
    inline-block
    border-button
    text-center
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
    size: keyof typeof sizes = 'lg',
    color = true
) =>
    type === 'custom'
        ? ''
        : cntl`
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
