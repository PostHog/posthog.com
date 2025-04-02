import React, { forwardRef, type ComponentProps } from 'react'

// this is temporary until we're done adding new icons, then these can all move to @posthog/icons

type BaseIconProps = ComponentProps<'svg'>
export type IconProps = Omit<BaseIconProps, 'children'>
type IconComponent<T> = React.FunctionComponent<T & React.RefAttributes<SVGSVGElement>>

export const BaseIcon: IconComponent<BaseIconProps> = forwardRef(function BaseIcon(
    { className, ...props }: BaseIconProps,
    ref
): JSX.Element {
    const customClassName = className ? ` ${className}` : ''
    return (
        <svg
            ref={ref}
            className={'LemonIcon' + customClassName} // We use .LemonIcon for compatibility with existing app icons, but this may change
            width="100%"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
        />
    )
})

export const IconTextWidthFixed: IconComponent<IconProps> = forwardRef(function IconTextWidthFixed(
    props,
    ref
): JSX.Element {
    return (
        <BaseIcon ref={ref} {...props}>
            <path d="M10.64 11.4V4.62H8.168V3h6.828v1.62h-2.46v6.78H10.64Z" />
            <path
                fillRule="evenodd"
                d="M16.125 12.375c.483 0 .875.392.875.875v6.5a.875.875 0 0 1-1.75 0v-6.5c0-.483.392-.875.875-.875ZM7 12.375c.483 0 .875.392.875.875v6.5a.875.875 0 0 1-1.75 0v-6.5c0-.483.392-.875.875-.875Z"
                clipRule="evenodd"
            />
            <path d="M7.5 15.5h8v1.75h-8z" />
        </BaseIcon>
    )
})
