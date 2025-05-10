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

export const IconBold = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path
            fillRule="evenodd"
            d="M5 5.438C5 4.123 6.05 3 7.417 3h5.5c2.885 0 5.166 2.382 5.166 5.25a5.293 5.293 0 0 1-1.148 3.3A5.284 5.284 0 0 1 19 15.75c0 2.867-2.282 5.25-5.167 5.25H7.417C6.05 21 5 19.877 5 18.562V5.438Zm7.917 5.062c1.165 0 2.166-.975 2.166-2.25S14.082 6 12.917 6H8v4.5h4.917ZM8 13.5h5.833c1.165 0 2.167.975 2.167 2.25S14.998 18 13.833 18H8v-4.5Z"
            clipRule="evenodd"
        />
    </BaseIcon>
)

export const IconDice = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path d="M8.822 7.73a1.75 1.75 0 0 1 2.16.915l3.169 6.797.068.166a1.751 1.751 0 0 1-.755 2.076l-.159.083-6.798 3.17a1.75 1.75 0 0 1-2.24-.688l-.085-.159-3.17-6.797a1.75 1.75 0 0 1 .847-2.326l6.797-3.169.166-.067Zm.515 1.411-.047.017-6.797 3.17a.25.25 0 0 0-.121.332l3.17 6.796.025.044a.25.25 0 0 0 .307.078l6.798-3.17.042-.026a.251.251 0 0 0 .095-.259l-.017-.047-3.17-6.797a.25.25 0 0 0-.285-.138Zm4.846-5.863a1.75 1.75 0 0 1 2.173-.881l5.169 1.882.165.07a1.75 1.75 0 0 1 .934 2.001l-.053.17-1.882 5.17a1.75 1.75 0 0 1-2.071 1.099l-.171-.053-5.17-1.881a1.75 1.75 0 0 1-1.045-2.243l1.882-5.17.07-.164Zm1.66.53a.25.25 0 0 0-.299.103l-.021.045-1.88 5.168a.25.25 0 0 0 .149.32l5.168 1.882.048.012a.25.25 0 0 0 .272-.162l1.88-5.168.013-.049a.25.25 0 0 0-.116-.249l-.046-.022-5.168-1.88Z" />
        <path d="M6.41 13.352a1 1 0 1 1-1.812.845 1 1 0 0 1 1.812-.845ZM10.399 14.803a1 1 0 1 1-1.813.845 1 1 0 0 1 1.813-.845ZM18.44 7.842a1 1 0 1 1-1.88-.684 1 1 0 0 1 1.88.684Z" />
    </BaseIcon>
)

export const IconFullScreen = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M3 4.75C3 3.7835 3.7835 3 4.75 3H8.25C8.66421 3 9 3.33579 9 3.75C9 4.16421 8.66421 4.5 8.25 4.5H4.75C4.61193 4.5 4.5 4.61193 4.5 4.75V8.25C4.5 8.66421 4.16421 9 3.75 9C3.33579 9 3 8.66421 3 8.25V4.75ZM15 3.75C15 3.33579 15.3358 3 15.75 3H19.25C20.2165 3 21 3.7835 21 4.75V8.25C21 8.66421 20.6642 9 20.25 9C19.8358 9 19.5 8.66421 19.5 8.25V4.75C19.5 4.61193 19.3881 4.5 19.25 4.5H15.75C15.3358 4.5 15 4.16421 15 3.75ZM3.75 15C4.16421 15 4.5 15.3358 4.5 15.75V19.25C4.5 19.3881 4.61193 19.5 4.75 19.5H8.25C8.66421 19.5 9 19.8358 9 20.25C9 20.6642 8.66421 21 8.25 21H4.75C3.7835 21 3 20.2165 3 19.25V15.75C3 15.3358 3.33579 15 3.75 15ZM20.25 15C20.6642 15 21 15.3358 21 15.75V19.25C21 20.2165 20.2165 21 19.25 21H15.75C15.3358 21 15 20.6642 15 20.25C15 19.8358 15.3358 19.5 15.75 19.5H19.25C19.3881 19.5 19.5 19.3881 19.5 19.25V15.75C19.5 15.3358 19.8358 15 20.25 15Z"/>
    </BaseIcon>
)

export const IconLink = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path
            fillRule="evenodd"
            d="M6.641 9.298a4.75 4.75 0 0 1 6.718 0l.343.343a4.733 4.733 0 0 1 1.354 2.766.75.75 0 0 1-1.488.186 3.233 3.233 0 0 0-.927-1.891l-.343-.343a3.25 3.25 0 0 0-4.596 0l-3.343 3.343a3.25 3.25 0 0 0 0 4.596l.343.343a3.25 3.25 0 0 0 4.596 0l.172-.171a.75.75 0 0 1 1.06 1.06l-.171.172a4.75 4.75 0 0 1-6.718 0l-.343-.343a4.75 4.75 0 0 1 0-6.718l3.343-3.343Z"
            clipRule="evenodd"
        />
        <path
            fillRule="evenodd"
            d="M13.641 5.298a4.75 4.75 0 0 1 6.718 0l.343.343a4.75 4.75 0 0 1 0 6.718l-3.343 3.343a4.75 4.75 0 0 1-6.718 0l-.343-.343a4.733 4.733 0 0 1-1.354-2.766.75.75 0 1 1 1.488-.186c.087.691.395 1.36.927 1.891l.343.343a3.25 3.25 0 0 0 4.596 0l3.343-3.343a3.25 3.25 0 0 0 0-4.596l-.343-.343a3.25 3.25 0 0 0-4.596 0l-.172.171a.75.75 0 1 1-1.06-1.06l.171-.172Z"
            clipRule="evenodd"
        />
    </BaseIcon>
)
