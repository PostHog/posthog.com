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

// App icon mapping for different skins
type AppIconVariants = {
    classic?: string
    modern?: string
    default: string
}

type AppIconName =
    | 'doc'
    | 'pricing'
    | 'notebook'
    | 'tour'
    | 'map'
    | 'spreadsheet'
    | 'forums'
    | 'games'
    | 'photobooth'
    | 'contact'
    | 'posthog'
    | 'folder'
    | 'presentation'

const PRODUCT_ICON_MAP: Record<AppIconName, AppIconVariants> = {
    doc: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/doc_classic_7f14381c43.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/doc_2fa451a8e4.png',
    },
    folder: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/folder_classic_d2fdf96f82.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/folder_af7d0524aa.png',
    },
    presentation: {
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/presentation_f329e94fe5.png',
    },
    pricing: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/pricing_b461c2e5dd.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/pricing_04a97aa301.png',
    },
    notebook: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/document_bb8267664e.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/document_001e7ec29a.png',
    },
    tour: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/tour_8ae29710fc.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/tour_2994e40ea9.png',
    },
    map: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/roadmap_3691544cec.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/roadmap_ac25f48fe0.png',
    },
    spreadsheet: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/spreadsheet_classic_8ea2ebdb10.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/spreadsheet_2d556ac08a.png',
    },
    forums: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/forums_a48a37683e.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/forums_b1926ec5fa.png',
    },
    games: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/games_6931a0e3a5.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/games_96649d6774.png',
    },
    photobooth: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/photobooth_db172dc28e.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/photobooth_f46836ce68.png',
    },
    contact: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/contact_4af3eed18f.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/contact_5331716a3a.png',
    },
    posthog: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_95648ff771.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_bdd451f4e8.png',
    },
}

export interface AppIconProps extends IconProps {
    name: AppIconName
    className?: string
}

export const AppIcon = ({ name, className, ...props }: AppIconProps) => {
    const getCurrentSkin = (): string => {
        if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('skin') || 'modern'
        }
        return 'modern'
    }

    const getIconUrl = (iconName: AppIconName): string => {
        const iconVariants = PRODUCT_ICON_MAP[iconName]
        if (!iconVariants) {
            console.warn(`AppIcon: Unknown icon name "${iconName}"`)
            return ''
        }

        const currentSkin = getCurrentSkin()

        // Check if the current skin has a specific variant
        if (currentSkin in iconVariants) {
            return iconVariants[currentSkin as keyof AppIconVariants] || iconVariants.default
        }

        // Fall back to default
        return iconVariants.default
    }

    const iconUrl = getIconUrl(name)

    return <IconImage url={iconUrl} className={className} {...props} />
}

export interface IconImageProps extends IconProps {
    url: string
    className?: string
}

export const IconAndroid = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 14" width="100%" height="100%" {...props}>
        <path
            fill="#32DE84"
            d="M17.855 4.055l1.99-3.449A.404.404 0 0019.7.055a.4.4 0 00-.55.146l-2.016 3.493A12.302 12.302 0 0012 2.6c-1.863 0-3.595.392-5.134 1.094L4.85.201a.402.402 0 00-.551-.146.402.402 0 00-.146.551l1.99 3.449C2.71 5.915.384 9.39 0 13.458h24c-.384-4.068-2.71-7.543-6.145-9.403zM6.49 10.088a1.006 1.006 0 110-2.013 1.006 1.006 0 010 2.013zm11.018 0a1.006 1.006 0 110-2.013 1.006 1.006 0 010 2.013z"
        />
    </BaseIcon>
)

export const IconApple = (props: IconProps) => (
    <BaseIcon viewBox="0 0 21 24" width="100%" height="100%" {...props}>
        <path
            fill="currentColor"
            d="M16.844 23.016c-1.3 1.262-2.736 1.066-4.104.47-1.454-.607-2.784-.645-4.32 0-1.913.826-2.928.586-4.08-.47C-2.164 16.32-1.204 6.12 6.188 5.736c1.793.096 3.048.991 4.104 1.066 1.57-.32 3.072-1.234 4.752-1.114 2.018.163 3.528.96 4.536 2.393-4.152 2.496-3.168 7.968.646 9.504-.764 2.004-1.743 3.984-3.384 5.448l.002-.017zM10.148 5.664C9.954 2.688 12.366.24 15.14 0c.382 3.432-3.12 6-4.992 5.664z"
        />
    </BaseIcon>
)

export const IconImage = ({ url, className, ...props }: IconImageProps) => (
    <BaseIcon viewBox="0 0 40 40" width="100%" height="100%" className={`size-10 ${className ? className : ''}`}>
        <image width="40" height="40" href={url} />
    </BaseIcon>
)

export const IconBold = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path
            fillRule="evenodd"
            d="M5 5.438C5 4.123 6.05 3 7.417 3h5.5c2.885 0 5.166 2.382 5.166 5.25a5.293 5.293 0 0 1-1.148 3.3A5.284 5.284 0 0 1 19 15.75c0 2.867-2.282 5.25-5.167 5.25H7.417C6.05 21 5 19.877 5 18.562V5.438Zm7.917 5.062c1.165 0 2.166-.975 2.166-2.25S14.082 6 12.917 6H8v4.5h4.917ZM8 13.5h5.833c1.165 0 2.167.975 2.167 2.25S14.998 18 13.833 18H8v-4.5Z"
            clipRule="evenodd"
        />
    </BaseIcon>
)

export const IconDemoThumb = (props: IconProps) => (
    <BaseIcon viewBox="0 0 48 48" width="48" height="48" {...props}>
        <image
            width="48"
            height="32"
            y="8"
            href="https://res.cloudinary.com/dmukukwp6/image/upload/demo_thumb_0a5b84dd36.png"
        />
        <path
            d="M20.3808 15.899C19.409 15.31 18.1667 16.0097 18.1667 17.1462V30.8539C18.1667 31.9903 19.409 32.69 20.3808 32.101L31.6897 25.2472C32.6263 24.6795 32.6263 23.3205 31.6897 22.7528L20.3808 15.899Z"
            fill="white"
        />
    </BaseIcon>
)

export const IconDice = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path d="M8.822 7.73a1.75 1.75 0 0 1 2.16.915l3.169 6.797.068.166a1.751 1.751 0 0 1-.755 2.076l-.159.083-6.798 3.17a1.75 1.75 0 0 1-2.24-.688l-.085-.159-3.17-6.797a1.75 1.75 0 0 1 .847-2.326l6.797-3.169.166-.067Zm.515 1.411-.047.017-6.797 3.17a.25.25 0 0 0-.121.332l3.17 6.796.025.044a.25.25 0 0 0 .307.078l6.798-3.17.042-.026a.251.251 0 0 0 .095-.259l-.017-.047-3.17-6.797a.25.25 0 0 0-.285-.138Zm4.846-5.863a1.75 1.75 0 0 1 2.173-.881l5.169 1.882.165.07a1.75 1.75 0 0 1 .934 2.001l-.053.17-1.882 5.17a1.75 1.75 0 0 1-2.071 1.099l-.171-.053-5.17-1.881a1.75 1.75 0 0 1-1.045-2.243l1.882-5.17.07-.164Zm1.66.53a.25.25 0 0 0-.299.103l-.021.045-1.88 5.168a.25.25 0 0 0 .149.32l5.168 1.882.048.012a.25.25 0 0 0 .272-.162l1.88-5.168.013-.049a.25.25 0 0 0-.116-.249l-.046-.022-5.168-1.88Z" />
        <path d="M6.41 13.352a1 1 0 1 1-1.812.845 1 1 0 0 1 1.812-.845ZM10.399 14.803a1 1 0 1 1-1.813.845 1 1 0 0 1 1.813-.845ZM18.44 7.842a1 1 0 1 1-1.88-.684 1 1 0 0 1 1.88.684Z" />
    </BaseIcon>
)

export const IconDictator = (props: IconProps) => (
    <BaseIcon viewBox="0 0 48 48" width="100%" height="100%" {...props}>
        <image
            width="48"
            height="48"
            y="0"
            href="https://res.cloudinary.com/dmukukwp6/image/upload/dictator_93244f3ec2.png"
        />
    </BaseIcon>
)

export const IconFlutter = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path
            fill="#54C5F8"
            d="M19.076 11.231h-6.153l-5.384 5.385 3.076 3.076 8.461-8.46ZM6 15.078 2.924 12l10-10h6.154L6 15.078Z"
        />
        <path fill="#01579B" d="M10.616 19.692 12.923 22h6.154l-5.385-5.384-3.076 3.076Z" />
        <path fill="url(#a)" d="m10.616 19.692 4.563-1.58-1.487-1.496-3.076 3.076Z" />
        <path fill="#29B6F6" d="M10.615 13.538 7.54 16.615l3.076 3.076 3.076-3.076-3.076-3.077Z" />
        <path
            fill="url(#b)"
            d="m19.077 11.231-5.384 5.384L19.077 22h-6.154l-2.307-2.308-3.078-3.077 5.385-5.384h6.154ZM12.923 2l-10 10 3.078 3.078L19.077 2h-6.154Z"
        />
        <defs>
            <radialGradient
                id="b"
                cx="0"
                cy="0"
                r="1"
                gradientTransform="translate(3.378 3.364) scale(24.4688)"
                gradientUnits="userSpaceOnUse"
            >
                <stop stopColor="#fff" stopOpacity=".1" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="a" x1="11.512" x2="13.804" y1="20.287" y2="17.995" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1A237E" stopOpacity=".4" />
                <stop offset="1" stopColor="#1A237E" stopOpacity="0" />
            </linearGradient>
        </defs>
    </BaseIcon>
)

export const IconFullScreen = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 4.75C3 3.7835 3.7835 3 4.75 3H8.25C8.66421 3 9 3.33579 9 3.75C9 4.16421 8.66421 4.5 8.25 4.5H4.75C4.61193 4.5 4.5 4.61193 4.5 4.75V8.25C4.5 8.66421 4.16421 9 3.75 9C3.33579 9 3 8.66421 3 8.25V4.75ZM15 3.75C15 3.33579 15.3358 3 15.75 3H19.25C20.2165 3 21 3.7835 21 4.75V8.25C21 8.66421 20.6642 9 20.25 9C19.8358 9 19.5 8.66421 19.5 8.25V4.75C19.5 4.61193 19.3881 4.5 19.25 4.5H15.75C15.3358 4.5 15 4.16421 15 3.75ZM3.75 15C4.16421 15 4.5 15.3358 4.5 15.75V19.25C4.5 19.3881 4.61193 19.5 4.75 19.5H8.25C8.66421 19.5 9 19.8358 9 20.25C9 20.6642 8.66421 21 8.25 21H4.75C3.7835 21 3 20.2165 3 19.25V15.75C3 15.3358 3.33579 15 3.75 15ZM20.25 15C20.6642 15 21 15.3358 21 15.75V19.25C21 20.2165 20.2165 21 19.25 21H15.75C15.3358 21 15 20.6642 15 20.25C15 19.8358 15.3358 19.5 15.75 19.5H19.25C19.3881 19.5 19.5 19.3881 19.5 19.25V15.75C19.5 15.3358 19.8358 15 20.25 15Z"
        />
    </BaseIcon>
)

export const IconJavaScript = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path fill="#F7DF1E" d="M24 0H0v24h24V0z" />
        <path
            fill="#000"
            d="M16.122 18.75c.483.79 1.112 1.37 2.225 1.37.934 0 1.531-.467 1.531-1.113 0-.773-.613-1.047-1.642-1.497l-.564-.242c-1.627-.693-2.708-1.562-2.708-3.398 0-1.691 1.289-2.979 3.303-2.979 1.434 0 2.465.5 3.207 1.806l-1.756 1.127c-.387-.693-.804-.966-1.451-.966-.66 0-1.08.419-1.08.966 0 .677.42.95 1.387 1.37l.564.241c1.916.822 2.998 1.66 2.998 3.543 0 2.03-1.595 3.143-3.737 3.143-2.095 0-3.448-.998-4.11-2.306l1.833-1.065zm-7.967.196c.354.628.677 1.16 1.452 1.16.74 0 1.208-.29 1.208-1.418V11.02h2.255v7.699c0 2.335-1.369 3.398-3.367 3.398-1.806 0-2.852-.934-3.384-2.06l1.836-1.111z"
        />
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

export const IconMessages = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path d="M16.5022 9.25C16.5022 9.11193 16.3903 9 16.2522 9H3.7522C3.61413 9 3.5022 9.11193 3.5022 9.25V17.75C3.5022 17.8881 3.61413 18 3.7522 18H6.0022C6.41641 18 6.7522 18.3358 6.7522 18.75V19.9756L10.1379 18.0947L10.2239 18.0537C10.3122 18.0184 10.4066 18 10.5022 18H16.2522C16.3903 18 16.5022 17.8881 16.5022 17.75V14.7881C16.5016 14.7754 16.5002 14.7628 16.5002 14.75C16.5002 14.7369 16.5015 14.7239 16.5022 14.7109V9.25ZM18.0022 14H20.2522C20.3903 14 20.5022 13.8881 20.5022 13.75V5.25C20.5022 5.11193 20.3903 5 20.2522 5H8.0022C7.86413 5 7.7522 5.11193 7.7522 5.25V7.5H16.2522C17.2187 7.5 18.0022 8.2835 18.0022 9.25V14ZM22.0022 13.75C22.0022 14.7165 21.2187 15.5 20.2522 15.5H18.0022V17.75C18.0022 18.7165 17.2187 19.5 16.2522 19.5H10.6956L6.36646 21.9053C6.13429 22.0343 5.85128 22.031 5.62231 21.8965C5.39328 21.7617 5.2522 21.5157 5.2522 21.25V19.5H3.7522C2.7857 19.5 2.0022 18.7165 2.0022 17.75V9.25C2.0022 8.2835 2.7857 7.5 3.7522 7.5H6.2522V5.25C6.2522 4.2835 7.0357 3.5 8.0022 3.5H20.2522C21.2187 3.5 22.0022 4.2835 22.0022 5.25V13.75Z" />
    </BaseIcon>
)

export const IconPlayhead = (props: IconProps) => (
    <BaseIcon viewBox="0 0 11 15" width="100%" height="100%" {...props}>
        <path
            fill="#111"
            d="M9.578.25a.938.938 0 0 1 .728 1.528L6.25 6.77v7.522h-1.5v-7.56L.726 1.777A.938.938 0 0 1 1.453.25h8.125Z"
        />
    </BaseIcon>
)

export const IconReactNative = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path fill="#58C4DC" d="M12.035 10.067a1.916 1.916 0 1 0 0 3.83 1.916 1.916 0 0 0 0-3.83Z" />
        <path
            fill="#58C4DC"
            d="M21.999 12c0-1.504-1.393-2.823-3.61-3.691.03-.196.056-.389.075-.579.219-2.16-.302-3.72-1.465-4.392-1.302-.752-3.14-.206-5 1.281C10.14 3.132 8.302 2.586 7 3.338c-1.163.671-1.684 2.231-1.465 4.392.019.19.045.384.075.58-.185.07-.366.146-.54.224C3.09 9.424 2 10.656 2 12c0 1.504 1.393 2.823 3.61 3.69-.03.196-.056.39-.075.58-.22 2.16.302 3.72 1.465 4.392.4.227.853.343 1.313.336 1.102 0 2.389-.58 3.686-1.618 1.297 1.038 2.585 1.618 3.688 1.618.46.007.913-.11 1.313-.336 1.163-.672 1.684-2.232 1.465-4.392-.019-.19-.046-.384-.075-.58C20.607 14.825 22 13.504 22 12m-6.321-8.046c.295-.007.587.065.846.208.808.466 1.17 1.732.994 3.471a9.26 9.26 0 0 1-.043.36 16.828 16.828 0 0 0-2.822-.592c-.58-.771-1.224-1.49-1.926-2.15 1.103-.853 2.138-1.297 2.95-1.297m-.379 9.951c-.357.62-.745 1.22-1.164 1.8-.71.073-1.423.11-2.136.109-.714 0-1.427-.036-2.136-.11-.418-.579-.805-1.18-1.16-1.799A20.47 20.47 0 0 1 7.73 12 20.993 20.993 0 0 1 9.86 8.3a20.791 20.791 0 0 1 4.275-.003A21.045 21.045 0 0 1 16.268 12c-.291.651-.615 1.287-.972 1.905m1.457-.705c.224.61.408 1.235.55 1.87-.618.193-1.249.345-1.888.455.243-.366.478-.747.706-1.143.225-.39.436-.785.635-1.18m-6.097 3.521c.44.027.887.043 1.341.043.454 0 .905-.016 1.344-.043-.417.5-.866.971-1.344 1.412a14.81 14.81 0 0 1-1.34-1.412Zm-2.075-1.2c-.639-.11-1.27-.26-1.889-.453.142-.634.325-1.258.548-1.868.197.395.407.79.635 1.18.229.391.465.777.706 1.143m-1.34-4.729a14.963 14.963 0 0 1-.547-1.86A14.983 14.983 0 0 1 8.58 8.48a22.111 22.111 0 0 0-1.34 2.316m6.1-3.52a20.945 20.945 0 0 0-2.684 0c.415-.5.862-.971 1.34-1.412.478.44.927.912 1.344 1.412Zm2.78 2.341a20.776 20.776 0 0 0-.71-1.143c.64.11 1.273.262 1.893.456a15.082 15.082 0 0 1-.548 1.867 19.927 19.927 0 0 0-.635-1.18M6.482 7.635c-.178-1.739.186-3.005.994-3.471.258-.143.55-.215.846-.208.812 0 1.847.443 2.95 1.296-.703.66-1.348 1.38-1.928 2.152-.955.116-1.9.314-2.822.59a9.346 9.346 0 0 1-.042-.359M5.46 9.403l.333-.141c.222.936.523 1.852.9 2.738a16.991 16.991 0 0 0-.9 2.744c-1.799-.738-2.84-1.76-2.84-2.744 0-.933.917-1.88 2.508-2.597Zm2.016 10.434c-.808-.466-1.172-1.733-.994-3.471.011-.12.026-.238.042-.36.923.278 1.867.476 2.823.592.58.771 1.224 1.491 1.926 2.152-1.538 1.188-2.942 1.58-3.795 1.087m10.04-3.471c.177 1.74-.186 3.005-.994 3.471-.852.494-2.257.1-3.794-1.087a16.946 16.946 0 0 0 1.926-2.152c.955-.116 1.9-.314 2.822-.592.017.122.03.24.043.36m.69-1.624A17.057 17.057 0 0 0 17.31 12c.377-.888.678-1.806.9-2.744 1.794.737 2.839 1.76 2.839 2.744 0 .984-1.042 2.006-2.84 2.744"
        />
    </BaseIcon>
)

export const IconVolumeFull = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path d="M14 3.75a.75.75 0 0 0-1.154-.632L6.842 6.961A.25.25 0 0 1 6.707 7H3.75A1.75 1.75 0 0 0 2 8.75v6.5c0 .966.784 1.75 1.75 1.75h2.957a.25.25 0 0 1 .135.04l6.004 3.842A.75.75 0 0 0 14 20.25V3.75ZM19.718 4.222a.75.75 0 0 1 1.06 0A10.968 10.968 0 0 1 24 12c0 3.037-1.232 5.788-3.222 7.778a.75.75 0 1 1-1.06-1.06A9.468 9.468 0 0 0 22.5 12a9.468 9.468 0 0 0-2.782-6.718.75.75 0 0 1 0-1.06ZM17.42 7.581a.75.75 0 0 0-1.061 1.06 4.733 4.733 0 0 1 1.391 3.36c0 1.311-.53 2.498-1.391 3.358a.75.75 0 1 0 1.06 1.06A6.233 6.233 0 0 0 19.25 12c0-1.725-.7-3.289-1.83-4.419Z" />
    </BaseIcon>
)

export const IconVolumeHalf = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path d="M13.61 3.092a.75.75 0 0 1 .39.658v16.5a.75.75 0 0 1-1.154.632l-6.004-3.843A.25.25 0 0 0 6.707 17H3.75A1.75 1.75 0 0 1 2 15.25v-6.5C2 7.784 2.784 7 3.75 7h2.957a.25.25 0 0 0 .135-.04l6.004-3.842a.75.75 0 0 1 .764-.026ZM17.42 7.581a.75.75 0 1 0-1.061 1.06 4.733 4.733 0 0 1 1.391 3.36c0 1.311-.53 2.498-1.391 3.358a.75.75 0 1 0 1.06 1.06A6.233 6.233 0 0 0 19.25 12c0-1.725-.7-3.289-1.83-4.419Z" />
    </BaseIcon>
)

export const IconVolumeMuted = (props: IconProps) => (
    <BaseIcon viewBox="0 0 24 24" width="100%" height="100%" {...props}>
        <path d="M14 5.94V3.75a.75.75 0 0 0-1.154-.632L6.842 6.961A.25.25 0 0 1 6.707 7H3.75A1.75 1.75 0 0 0 2 8.75v6.5c0 .727.443 1.35 1.074 1.615L.22 19.72a.75.75 0 1 0 1.06 1.06l16.5-16.5a.75.75 0 0 0-1.06-1.06L14 5.94ZM12.846 20.882l-5.822-3.726L14 10.18v10.07a.75.75 0 0 1-1.154.632Z" />
    </BaseIcon>
)
