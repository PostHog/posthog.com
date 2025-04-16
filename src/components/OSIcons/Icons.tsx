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

export const IconBold = () => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%">
        <path fillRule="evenodd" d="M5 5.438C5 4.123 6.05 3 7.417 3h5.5c2.885 0 5.166 2.382 5.166 5.25a5.293 5.293 0 0 1-1.148 3.3A5.284 5.284 0 0 1 19 15.75c0 2.867-2.282 5.25-5.167 5.25H7.417C6.05 21 5 19.877 5 18.562V5.438Zm7.917 5.062c1.165 0 2.166-.975 2.166-2.25S14.082 6 12.917 6H8v4.5h4.917ZM8 13.5h5.833c1.165 0 2.167.975 2.167 2.25S14.998 18 13.833 18H8v-4.5Z" clipRule="evenodd"/>
    </BaseIcon>
)