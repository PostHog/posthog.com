import cntl from 'cntl'
import Link from 'components/Link'
import usePostHog from '../../hooks/usePostHog'
import React from 'react'

const sizes = {
    sm: (color) => `
    rounded-sm
    after:rounded-sm
    text-xs
    font-semibold
    px-4
    py-2
    active:bottom-[-1.5px]
    active:after:h-[calc(100%+1.5px)]
    after:h-[calc(100%+3px)]
    hover:after:h-[calc(100%+4px)]
    hover:bottom-[1px]
    ${
        color
            ? `
    active:shadow-[0px_0px_#CD8407,inset_0px_-2px_#B17816]
    shadow-[0px_1.5px_#CD8407,inset_0px_-1px_#B17816]
    hover:shadow-[0px_2.5px_#CD8407,inset_0px_-1px_#B17816]
    `
            : `
    active:shadow-[0px_0px_rgb(255_255_255_/_85%),inset_0px_-2px_white]
    shadow-[0px_1.5px_rgb(255_255_255_/_85%),inset_0px_-1px_white]
    hover:shadow-[0px_2.5px_rgb(255_255_255_/_85%),inset_0px_-1px_white]
    `
    }
    
    `,
    md: (color) => `
    rounded-sm
    after:rounded-sm
    text-[13px]
    font-semibold
    px-4
    py-2
    active:bottom-[-1.5px]
    active:after:h-[calc(100%+1.5px)]
    after:h-[calc(100%+3px)]
    hover:after:h-[calc(100%+4px)]
    hover:bottom-[1px]
    ${
        color
            ? `
    shadow-[0px_2.5px_#CD8407,inset_0px_-2px_#B17816]
    active:shadow-[0px_0px_#CD8407,inset_0px_-2px_#B17816]
    hover:shadow-[0px_3.5px_#CD8407,inset_0px_-2px_#B17816]
    `
            : `
    shadow-[0px_2.5px_rgb(255_255_255_/_85%),inset_0px_-2px_white]
    active:shadow-[0px_0px_rgb(255_255_255_/_85%),inset_0px_-2px_white]
    hover:shadow-[0px_3.5px_rgb(255_255_255_/_85%),inset_0px_-2px_white]
    `
    }
    
    `,
    lg: (color) => `
    rounded-[8px]
    after:rounded-[8px]
    text-base
    font-bold
    px-5
    py-2.5
    active:bottom-[-2.5px]
    active:after:h-[calc(100%+1.5px)]
    after:h-[calc(100%+4px)]
    hover:after:h-[calc(100%+5px)]
    hover:bottom-[1px]
    ${
        color
            ? `
    shadow-[0px_2.5px_#CD8407,inset_0px_-2px_#B17816]
    active:shadow-[0px_0px_#CD8407,inset_0px_-2px_#B17816]
    hover:shadow-[0px_3.5px_#CD8407,inset_0px_-2px_#B17816]
    `
            : `
    shadow-[0px_2.5px_rgb(255_255_255_/_85%),inset_0px_-2px_white]
    active:shadow-[0px_0px_rgb(255_255_255_/_85%),inset_0px_-2px_white]
    hover:shadow-[0px_3.5px_rgb(255_255_255_/_85%),inset_0px_-2px_white]
    `
    }
    `,
}

const primary = cntl`
    bg-orange
    text-primary
    hover:text-primary
    dark:text-primary
    dark:hover:text-primary
`

const secondary = cntl`
    bg-white
    text-primary
    hover:text-primary
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
    size: keyof typeof sizes = 'lg',
    color = true
) =>
    type === 'custom'
        ? ''
        : cntl`
    relative
    after:absolute
    after:border-[1.5px]
    ${color ? `after:border-button` : `after:border-white`}
    ${color ? `` : `!text-white`}
    after:w-full
    after:inset-0
    text-center
    w-${width}
    ${buttonTypes[type] || ''}    
    ${sizes[size](color)}
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
    className,
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
            className={button(type, width, className, size, color)}
            onClick={onClick}
            to={url}
            event={event}
        >
            {children}
        </Link>
    )
}
