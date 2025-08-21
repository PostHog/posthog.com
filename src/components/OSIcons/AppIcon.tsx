import React from 'react'
import { BaseIcon, type IconProps } from './Icons'
import Link from 'components/Link'
import { useRef } from 'react'
import useTheme from '../../hooks/useTheme'

// App icon mapping for different skins
type AppIconVariants = {
    classic?: string
    modern?: string
    default: string
}

// Single source of truth: keys of this map define available app icon names
const PRODUCT_ICON_MAP = {
    doc: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/doc_classic_7f14381c43.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/doc_2fa451a8e4.png',
    },
    folder: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/folder_classic_d2fdf96f82.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/folder_af7d0524aa.png',
    },
    hedgehog_mode: {
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/hedgehog_mode_eaf3d50472.png',
    },
    hogpaint: {
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/arthog_ed871b96df.png',
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
    trash: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/trash_classic_94fddf05b4.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/trash_modern_a550bcaa95.png',
    },
    video: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/video_classic_beadf43e4b.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/video_4159554b6d.png',
    },
    page: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/page_classic_0100e05522.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/page_modern_e1fe37aea9.png',
    },
    pdf: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/pdf_classic_069acad91b.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/pdf_64c653db35.png',
    },
    pdf_locked: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/pdf_locked_classic_395a6801c4.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/pdf_locked_20a3464430.png',
    },
    canvas: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/canvas_classic_28b592aed7.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/canvas_d05d4932e0.png',
    },
    report: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/report_classic_84c2e01c55.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/report_096e46a740.png',
    },
    invite: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/invite_classic_e9486b8295.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/invite_8454a37bed.png',
    },
    script: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/script_classic_84c2e01c55.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/script_8454a37bed.png',
    },
    ga: {
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/ga3_1651ec493f.png',
    },
    ai: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/ai_classic_e50b339fec.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/as_modern_090d1c5c71.png',
    },
    aiMax: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_AI_Max_Style_Classic_a0cd524bfa.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_AI_Max_Style_Modern_9f8861dbe7.png',
    },
    aiRaquel: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_AI_Raquel_Style_Classic_7221f83f53.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_AI_Raquel_Style_Modern_855fde6b8c.png',
    },
    aiAnnika: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_AI_Annika_Style_Classic_329d288881.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_AI_Annika_Style_Modern_bc9041eaa2.png',
    },
    aiMarius: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_AI_Marius_Style_Classic_fbbbab893a.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_AI_Marius_Style_Modern_44be9d2af2.png',
    },
    shoppingBag: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_Shopping_Bag_Style_Classic_89fbc3ebcf.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Icon_Shopping_Bag_Style_Modern_cd937c7872.png',
    },
    spreadsheetSearch: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Spreadsheet_Search_Classic_e8d1d6eb40.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Spreadsheet_Search_Modern_617622de0d.png',
    },
    documentCanvas: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Document_Canvas_Classic_c3eddc70af.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Document_Canvas_Default_8f086dde22.png',
    },
    dataBlender: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Data_Blender_Classic_ea3737691d.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Data_Blender_Modern_bfec81580c.png',
    },
    SQL: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/SQL_Classic_638e548261.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/SQL_Modern_c78fa1805c.png',
    },
    dataIn: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Data_In_Classic_b58bd17dbf.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Data_In_Modern_cf968580e4.png',
    },
    dataOut: {
        classic: 'https://res.cloudinary.com/dmukukwp6/image/upload/Data_Out_Classic_9ed0e7c3dc.png',
        default: 'https://res.cloudinary.com/dmukukwp6/image/upload/Data_Out_Modern_b3a6093647.png',
    },
} as const satisfies Record<string, AppIconVariants>

type AppIconName = keyof typeof PRODUCT_ICON_MAP

const isAppIconName = (value: string): value is AppIconName => value in PRODUCT_ICON_MAP

export interface AppIconProps extends IconProps {
    name: AppIconName
    className?: string
}

export interface IconImageProps extends IconProps {
    url: string
    className?: string
}

export const IconImage = ({ url, className }: IconImageProps) => (
    <BaseIcon viewBox="0 0 40 40" width="100%" height="100%" className={`size-10 ${className ? className : ''}`}>
        <image width="40" height="40" href={url} />
    </BaseIcon>
)

export const AppIcon = ({ name, className, ...props }: AppIconProps) => {
    const getCurrentSkin = (): 'modern' | 'classic' => {
        if (typeof document !== 'undefined') {
            const skin = document.body.getAttribute('data-skin')
            return skin === 'classic' ? 'classic' : 'modern'
        }
        return 'modern'
    }

    const getIconUrl = (iconName: AppIconName): string => {
        const iconVariants = PRODUCT_ICON_MAP[iconName] as AppIconVariants
        if (!iconVariants) {
            console.warn(`AppIcon: Unknown icon name "${iconName}"`)
            return ''
        }

        const currentSkin = getCurrentSkin()

        // Prefer skin-specific variant if available, else fall back to default
        if (currentSkin === 'modern' && iconVariants.modern) {
            return iconVariants.modern
        }
        if (currentSkin === 'classic' && iconVariants.classic) {
            return iconVariants.classic
        }
        return iconVariants.default
    }

    const iconUrl = getIconUrl(name)

    return <IconImage url={iconUrl} className={className} {...props} />
}

export type { AppIconName }

export interface AppItem {
    Icon?: React.ElementType | React.ReactElement | string
    parentIcon?: React.ElementType | React.ReactElement | string | AppIconName
    type?: string
    color?: string
    background?: string
    label: string
    url?: string
    className?: string
    extension?: string
    children?: React.ReactNode
    hasDragged?: boolean
    orientation?: 'row' | 'column'
}

export const AppLink = ({
    Icon,
    parentIcon,
    color,
    background,
    label,
    url,
    className,
    extension,
    children,
    hasDragged,
    orientation = 'column',
}: AppItem) => {
    const ref = useRef<HTMLSpanElement>(null)
    const { getThemeSpecificBackgroundColors } = useTheme()

    // Helper function to get conditional child icon classes based on parentIcon type
    const getChildIconClasses = () => {
        if (typeof parentIcon === 'string' && parentIcon === 'page') {
            // Custom classes for page parentIcon
            return `size-5 text-white absolute bottom-1 right-1 border-[1.5px] border-black rotate-1 mt-[-.125rem] ${
                color ? `bg-${color}` : ''
            }`
        }
        // Default fallback classes
        return `size-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-[-.125rem]`
    }

    const renderIcon = () => {
        const iconToRender = parentIcon || Icon

        // If no icon to render at all, return null
        if (!iconToRender) return null

        // Check if it's an AppIconName string (for AppIcon component)
        if (typeof iconToRender === 'string') {
            // Check if it's a valid AppIconName
            const validAppIconName = isAppIconName(iconToRender)
            if (validAppIconName && parentIcon) {
                return <AppIcon name={iconToRender} className={className} />
            }
            // Otherwise treat as URL
            return <IconImage url={iconToRender} className={`${parentIcon ? '' : `text-${color}`} ${className}`} />
        }

        if (React.isValidElement(iconToRender)) {
            return React.cloneElement(iconToRender as React.ReactElement<any>, {
                className: `${parentIcon ? '' : `text-${color}`} ${className}`,
            })
        }

        // Icon is a ComponentType
        const IconComponent = iconToRender as React.ComponentType<any>
        return <IconComponent className={`${parentIcon ? '' : `text-${color}`} ${className}`} />
    }

    const renderChildIcon = () => {
        if (!parentIcon || !Icon) return null

        if (typeof Icon === 'string') {
            return <IconImage url={Icon} className={getChildIconClasses()} />
        }

        if (React.isValidElement(Icon)) {
            return React.cloneElement(Icon as React.ReactElement<any>, {
                className: getChildIconClasses(),
            })
        }

        // Icon is a ComponentType
        const IconComponent = Icon as React.ComponentType<any>

        return <IconComponent className={getChildIconClasses()} />
    }

    const baseBackgroundColors = `
        bg-[rgba(238,239,233,0.75)] 
        group-hover:bg-[rgba(238,239,233,1)] 
        dark:bg-[rgba(1,1,1,0.75)] 
        dark:group-hover:bg-[rgba(1,1,1,1)]
    `

    const themeSpecificColors = getThemeSpecificBackgroundColors()
    const backgroundMatchedColors = `${baseBackgroundColors} ${themeSpecificColors}`

    const content = (
        <>
            <span className="relative">
                {renderIcon()}
                {renderChildIcon()}
                {children}
            </span>
            <figcaption
                className={`text-sm font-medium leading-tight ${orientation === 'row' ? 'text-left' : 'text-center'}`}
            >
                <span className={`inline-block leading-tight`}>
                    <span
                        className={`skin-classic:underline decoration-dotted decoration-primary underline-offset-[3px] ${
                            background ? background : backgroundMatchedColors
                        }  rounded-[2px] px-0.5 py-0`}
                    >
                        {label}
                        {extension && <span className="opacity-75">.{extension}</span>}
                    </span>
                </span>
            </figcaption>
        </>
    )

    const commonClassName = 'group items-center select-none text-primary'

    const orientationClassName =
        orientation === 'row'
            ? 'flex w-full gap-2'
            : 'inline-flex flex-col justify-center w-auto max-w-28 space-y-1 text-center'

    return (
        <figure ref={ref}>
            {url ? (
                <Link
                    to={url}
                    state={{ newWindow: true }}
                    className={`${commonClassName} ${orientationClassName}`}
                    onClick={(e) => {
                        if (hasDragged) {
                            e.preventDefault()
                            e.stopPropagation()
                        }
                    }}
                >
                    {content}
                </Link>
            ) : (
                <span className={`${commonClassName} ${orientationClassName} cursor-not-allowed opacity-75`}>
                    {content}
                </span>
            )}
        </figure>
    )
}
