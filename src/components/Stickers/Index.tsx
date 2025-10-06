import React from 'react'
import * as AllStickers from './Stickers'

// Country to flag component mapping
const countryFlagMapping: Record<string, keyof typeof AllStickers> = {
    AR: 'StickerFlagAR',
    AT: 'StickerFlagAT',
    BE: 'StickerFlagBE',
    BG: 'StickerFlagBG',
    BR: 'StickerFlagBR',
    CA: 'StickerFlagCA',
    CL: 'StickerFlagCL',
    CO: 'StickerFlagCO',
    CY: 'StickerFlagCY',
    CZ: 'StickerFlagCZ',
    DE: 'StickerFlagDE',
    DK: 'StickerFlagDK',
    DO: 'StickerFlagDO',
    ES: 'StickerFlagES',
    FI: 'StickerFlagFI',
    FR: 'StickerFlagFR',
    GB: 'StickerFlagGB',
    GR: 'StickerFlagGR',
    HR: 'StickerFlagHR',
    HU: 'StickerFlagHU',
    IE: 'StickerFlagIE',
    IL: 'StickerFlagIL',
    NL: 'StickerFlagNL',
    NO: 'StickerFlagNO',
    PL: 'StickerFlagPL',
    PR: 'StickerFlagPR',
    PT: 'StickerFlagPT',
    RS: 'StickerFlagRS',
    SE: 'StickerFlagSE',
    US: 'StickerFlagUS',
    UY: 'StickerFlagUY',
}

// Enhanced StickerTrophy component that accepts a label prop
const StickerTrophyWithLabel = React.forwardRef<SVGSVGElement, AllStickers.StickerProps & { label?: string }>(
    (props, ref) => {
        const { label = '7', ...stickerProps } = props

        return (
            <AllStickers.BaseSticker ref={ref} {...stickerProps}>
                <path
                    opacity="0.35"
                    d="M25.8394 23.0522C29.5895 21.595 35.28 17.8466 35.28 11.9682C35.28 9.95543 34.4059 8.70155 33.6726 8.00423C32.7503 7.12691 30.6569 6.63443 29.3594 6.61247C29.2882 5.08823 28.8983 3.86819 27.3586 3.86819H9.72216C8.18208 3.86819 6.91668 5.08823 6.8454 6.61247C5.54796 6.63443 4.33008 7.12691 3.40776 8.00423C2.67408 8.70155 1.8 9.95543 1.8 11.9682C1.8 17.8474 7.49088 21.5953 11.241 23.0526C12.1763 24.318 13.6112 23.5667 14.7445 24.2734L15.0739 24.9584C13.2246 25.542 11.16 28.3536 11.16 30.3934V31.2282C11.16 32.8162 12.452 34.1082 14.04 34.1082H23.04C24.628 34.1082 25.92 32.8162 25.92 31.2282V30.3934C25.92 28.3536 24.5754 26.622 22.7261 26.0384L22.7279 26.0176C23.8615 25.3105 24.9037 24.3176 25.8394 23.0522Z"
                    fill="black"
                />
                <path
                    d="M25.1194 22.3322C28.8695 20.875 34.56 17.1266 34.56 11.2482C34.56 9.23543 33.6859 7.98155 32.9526 7.28423C32.0303 6.40691 30.8124 5.91443 29.515 5.89247C29.4437 4.36823 28.1783 3.14819 26.6382 3.14819H9.0018C7.46172 3.14819 6.19632 4.36823 6.12504 5.89247C4.8276 5.91443 3.60972 6.40691 2.6874 7.28423C1.95408 7.98155 1.08 9.23543 1.08 11.2482C1.08 17.1274 6.77088 20.8753 10.521 22.3326C11.4563 23.598 12.4985 24.5909 13.6318 25.2976L13.6336 25.3184C11.7846 25.902 10.44 27.6336 10.44 29.6734V30.5082C10.44 32.0962 11.732 33.3882 13.32 33.3882H22.32C23.908 33.3882 25.2 32.0962 25.2 30.5082V29.6734C25.2 27.6336 23.8554 25.902 22.0061 25.3184L22.0079 25.2976C23.1415 24.5905 24.1837 23.5976 25.1194 22.3322Z"
                    fill="#F2F2F2"
                />
                <path
                    d="M12.7804 21.24C12.7372 21.24 12.6929 21.2346 12.649 21.2238C9.46152 20.4271 2.88 16.9625 2.88 11.34C2.88 9.96551 3.44988 9.13499 3.92796 8.68031C4.536 8.10215 5.34888 7.78355 6.21648 7.78355C7.77852 7.78355 9.36 8.88155 9.36 10.98C9.36 12.2213 8.43264 12.9625 7.51644 13.0532C6.4872 13.1551 5.61996 12.4942 5.41044 11.4458C5.35176 11.1535 5.54148 10.8688 5.83416 10.8104C6.12648 10.751 6.41088 10.9415 6.46956 11.2342C6.59052 11.84 7.03512 12.0172 7.41024 11.9786C7.84332 11.9358 8.28 11.6104 8.28 10.98C8.28 9.51767 7.24356 8.86355 6.21648 8.86355C5.62716 8.86355 5.07852 9.07631 4.67244 9.46295C4.20624 9.90611 3.96 10.5552 3.96 11.34C3.96 16.3256 9.99036 19.4461 12.911 20.1762C13.2005 20.2486 13.3762 20.5416 13.3038 20.831C13.2426 21.0762 13.0223 21.24 12.7804 21.24Z"
                    fill="#40396E"
                />
                <path
                    d="M22.8596 21.24C22.6177 21.24 22.3974 21.0762 22.3362 20.8307C22.2638 20.5412 22.4399 20.2482 22.729 20.1758C25.6496 19.4461 31.68 16.3256 31.68 11.34C31.68 10.5552 31.4338 9.90611 30.9676 9.46295C30.5615 9.07631 30.0128 8.86355 29.4235 8.86355C28.3964 8.86355 27.36 9.51767 27.36 10.98C27.36 11.6104 27.7967 11.9358 28.2298 11.9786C28.6067 12.0172 29.0491 11.84 29.1704 11.2342C29.2288 10.9418 29.5132 10.7514 29.8058 10.8104C30.0985 10.8688 30.2879 11.1535 30.2296 11.4458C30.02 12.4945 29.1542 13.1569 28.1236 13.0532C27.2074 12.9625 26.28 12.2213 26.28 10.98C26.28 8.88119 27.8615 7.78355 29.4235 7.78355C30.2911 7.78355 31.104 8.10215 31.712 8.68031C32.1901 9.13499 32.76 9.96551 32.76 11.34C32.76 16.9625 26.1785 20.4271 22.991 21.2238C22.9471 21.235 22.9028 21.24 22.8596 21.24Z"
                    fill="#40396E"
                />
                <path
                    d="M9.0018 6.12C9.0018 6.16932 9 6.21756 9 6.26688C9 15.9282 12.9488 23.76 17.82 23.76C22.6912 23.76 26.64 15.9282 26.64 6.26688C26.64 6.21756 26.6382 6.16896 26.6382 6.12H9.0018Z"
                    fill="#F4A22D"
                />
                <text
                    fill="#423F3F"
                    xmlSpace="preserve"
                    style={{ whiteSpace: 'pre' }}
                    fontFamily="Londrina Solid"
                    fontSize="14"
                    letterSpacing="0em"
                >
                    <tspan x="50%" y="19.489" textAnchor="middle">
                        {label}
                    </tspan>
                </text>
                <path
                    d="M22.32 30.6H13.32V29.7652C13.32 28.8346 14.0746 28.08 15.0052 28.08H20.6348C21.5654 28.08 22.32 28.8346 22.32 29.7652V30.6Z"
                    fill="#F4A22D"
                />
                <path d="M18.792 28.8H16.848L16.2 21.96H19.44L18.792 28.8Z" fill="#F4A22D" />
                <path
                    opacity="0.5"
                    d="M26.5997 7.92C26.6252 7.37568 26.64 6.82488 26.64 6.26688C26.64 6.21756 26.6382 6.16896 26.6382 6.12H9.0018C9.0018 6.16932 9 6.21756 9 6.26688C9 6.82452 9.01476 7.37532 9.04032 7.92H26.5997Z"
                    fill="white"
                />
                <path
                    opacity="0.35"
                    d="M16.2324 23.4518C16.2324 23.4518 17.6627 24.0206 19.3518 23.4864C21.0406 22.9522 20.2651 24.2618 20.2651 24.2618C20.2651 24.2618 18.2833 25.4336 15.4739 24.2964C15.5948 23.8997 16.2324 23.4518 16.2324 23.4518Z"
                    fill="#40396E"
                />
                <path
                    d="M26.6382 6.11999C26.6382 6.16931 26.64 6.21755 26.64 6.26687C26.64 6.54695 26.6364 6.82559 26.6292 7.10243C26.6227 7.37495 26.6123 7.64567 26.5997 7.91459C26.5997 7.91639 26.5997 7.91819 26.5993 7.91999C26.2253 15.8335 23.1937 22.2109 19.2924 23.5127L18.86 28.08H20.6348C21.5654 28.08 22.32 28.8346 22.32 29.7652V30.6H13.32V29.7652C13.32 28.8346 14.0746 28.08 15.0052 28.08H16.78L16.3472 23.5123C12.4459 22.2109 9.41436 15.8335 9.04032 7.91999C9.04032 7.91819 9.04032 7.91639 9.03996 7.91459C9.02736 7.64531 9.01692 7.37495 9.01044 7.10243C9.0036 6.82559 9 6.54731 9 6.26687C9 6.21755 9.0018 6.16895 9.0018 6.11999H26.6382ZM26.6382 5.03999H9.0018C8.40708 5.03999 7.92432 5.52095 7.9218 6.11567L7.92108 6.16895C7.92036 6.20171 7.92 6.23411 7.92 6.26687C7.92 6.55595 7.92396 6.84359 7.9308 7.12943C7.93728 7.40915 7.94808 7.68815 7.96104 7.96571C8.33976 15.9732 11.268 22.3751 15.3338 24.269L15.5927 27H15.0052C13.4806 27 12.24 28.2406 12.24 29.7652V30.6C12.24 31.1965 12.7235 31.68 13.32 31.68H22.32C22.9165 31.68 23.4 31.1965 23.4 30.6V29.7652C23.4 28.2406 22.1594 27 20.6348 27H20.0473L20.3062 24.269C24.372 22.3751 27.3002 15.9736 27.6786 7.97111C27.6786 7.96787 27.679 7.96355 27.679 7.95959C27.6919 7.68131 27.7024 7.40591 27.7092 7.12835C27.7164 6.84395 27.72 6.55667 27.72 6.26723C27.72 6.23447 27.7196 6.20171 27.7189 6.16931L27.7182 6.11603C27.7157 5.52095 27.2329 5.03999 26.6382 5.03999Z"
                    fill="#40396E"
                />
            </AllStickers.BaseSticker>
        )
    }
)

StickerTrophyWithLabel.displayName = 'StickerTrophyWithLabel'

// Props for the Stickers component
interface StickersProps {
    // Country-based usage
    country?: string
    location?: string
    // Name-based usage
    name?: keyof typeof AllStickers | 'StickerTrophy'
    label?: string
    // Additional props
    className?: string
    [key: string]: any
}

const Stickers: React.FC<StickersProps> = ({ country, location, name, label, className = 'w-8 h-8', ...props }) => {
    // Handle name-based rendering
    if (name) {
        if (name === 'StickerTrophy') {
            return <StickerTrophyWithLabel className={className} label={label} {...props} />
        }

        const StickerComponent = AllStickers[name as keyof typeof AllStickers]
        if (StickerComponent) {
            return <StickerComponent className={className} {...props} />
        }

        // Fallback if sticker name not found
        console.warn(`Sticker with name "${name}" not found`)
        return null
    }

    // Handle country-based rendering
    if (country) {
        const flagComponentName = countryFlagMapping[country.toUpperCase()]
        if (flagComponentName) {
            const FlagComponent = AllStickers[flagComponentName]
            if (FlagComponent) {
                return <FlagComponent className={`text-white ${className}`} {...props} />
            }
        }

        // Fallback to unknown flag for unsupported countries
        return <AllStickers.StickerFlagUnknown className={className} {...props} />
    }

    // No valid props provided
    console.warn('Stickers component requires either "country" or "name" prop')
    return null
}

export default Stickers

// Re-export all sticker components for backward compatibility
export * from './Stickers'
