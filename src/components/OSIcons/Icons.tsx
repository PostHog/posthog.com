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

export const IconTableOfContents: IconComponent<IconProps> = forwardRef(function IconTableOfContents(
    props,
    ref
): JSX.Element {
    return (
        <BaseIcon ref={ref} {...props}>
            <path
                fillRule="evenodd"
                d="M2 5.75A.75.75 0 0 1 2.75 5h18.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 5.75ZM7 12a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H7.75A.75.75 0 0 1 7 12Zm0 6.25a.75.75 0 0 1 .75-.75h13.5a.75.75 0 0 1 0 1.5H7.75a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
            />
            <path d="M2 12a.75.75 0 0 1 1.5 0v6.25a.75.75 0 0 1-1.5 0V12Z" />
        </BaseIcon>
    )
})

export const IconClockRewind: IconComponent<IconProps> = forwardRef(function IconClockRewind(props, ref): JSX.Element {
    return (
        <BaseIcon ref={ref} {...props}>
            <path
                fillRule="evenodd"
                d="M12 7a.75.75 0 0 1 .75.75v3.94l3.28 3.28a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1-.22-.53V7.75A.75.75 0 0 1 12 7ZM2.75 4a.75.75 0 0 1 .75.75V8h3.25a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 2 8.75v-4A.75.75 0 0 1 2.75 4Z"
                clipRule="evenodd"
            />
            <path
                fillRule="evenodd"
                d="M11.986 3.5A8.516 8.516 0 0 0 4.14 8.695a.75.75 0 0 1-1.381-.584A10.016 10.016 0 0 1 11.986 2C17.516 2 22 6.476 22 12s-4.484 10-10.014 10c-4.36 0-8.068-2.783-9.443-6.666a.75.75 0 1 1 1.414-.5 8.516 8.516 0 0 0 8.03 5.666c4.702 0 8.513-3.807 8.513-8.5s-3.81-8.5-8.514-8.5Z"
                clipRule="evenodd"
            />
        </BaseIcon>
    )
})

export const IconCollapse: IconComponent<IconProps> = forwardRef(function IconCollapse(props, ref): JSX.Element {
    return (
        <BaseIcon ref={ref} {...props}>
            <path
                fillRule="evenodd"
                d="M13 4.75a.75.75 0 0 1 .75.75V10c0 .138.112.25.25.25h4.5a.75.75 0 0 1 0 1.5H14A1.75 1.75 0 0 1 12.25 10V5.5a.75.75 0 0 1 .75-.75ZM4.75 13a.75.75 0 0 1 .75-.75H10c.966 0 1.75.784 1.75 1.75v4.5a.75.75 0 0 1-1.5 0V14a.25.25 0 0 0-.25-.25H5.5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
            />
        </BaseIcon>
    )
})

export const IconExpand: IconComponent<IconProps> = forwardRef(function IconExpand(props, ref): JSX.Element {
    return (
        <BaseIcon ref={ref} {...props}>
            <path
                fillRule="evenodd"
                d="M7.25 10.5a.75.75 0 0 1 .75.75v4.5c0 .138.112.25.25.25h4.5a.75.75 0 0 1 0 1.5h-4.5a1.75 1.75 0 0 1-1.75-1.75v-4.5a.75.75 0 0 1 .75-.75ZM10.5 7.25a.75.75 0 0 1 .75-.75h4.5c.966 0 1.75.784 1.75 1.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.25.25 0 0 0-.25-.25h-4.5a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
            />
        </BaseIcon>
    )
})

export const IconSquare: IconComponent<IconProps> = forwardRef(function IconSquare(props, ref): JSX.Element {
    return (
        <BaseIcon ref={ref} {...props}>
            <path
                fillRule="evenodd"
                d="M7 4.5h10A2.5 2.5 0 0 1 19.5 7v10a2.5 2.5 0 0 1-2.5 2.5H7A2.5 2.5 0 0 1 4.5 17V7A2.5 2.5 0 0 1 7 4.5ZM7 6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Z"
                clipRule="evenodd"
            />
        </BaseIcon>
    )
})