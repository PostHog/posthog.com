import { useState, useEffect } from 'react'

export interface ThemeOption {
    label: string
    value: string
    background?: {
        thumb?: {
            light?: string
            dark?: string
        }
        classes?: string // Full Tailwind classes that Tailwind can see
    }
}

export const themeOptions: ThemeOption[] = [
    {
        label: 'Keyboard garden',
        value: 'keyboard-garden',
        background: {
            thumb: {
                light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_keyboard_garden_light_272a92dc4c.png',
                dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_keyboard_garden_dark_d8b80b34db.png',
            },
            classes: 'wallpaper-keyboard-garden:bg-[#E1D7C2] dark:wallpaper-keyboard-garden:bg-[#37422D]',
        },
    },
    {
        label: 'Hogzilla',
        value: 'hogzilla',
        background: {
            thumb: {
                light: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_light_1b27bcadcf.png',
                dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_dark_7f240e0422.png',
            },
        },
    },
    {
        label: 'Startup Monopoly',
        value: 'startup-monopoly',
        background: {
            thumb: {
                light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_startup_monopoly_light_b38ca0c4e5.png',
                dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_startup_monopoly_dark_699c375497.png',
            },
            classes: 'wallpaper-startup-monopoly:bg-[#FEFCED] dark:wallpaper-startup-monopoly:bg-[#1d1f27]',
        },
    },
    {
        label: 'Office party',
        value: 'office-party',
        background: {
            thumb: {
                light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_office_party_light_192b0c000f.png',
                dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_office_party_dark_1d95807317.png',
            },
        },
    },
    {
        label: '2001 bliss',
        value: '2001-bliss',
        background: {
            thumb: {
                light: 'https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_light_0b2e4ef53c.jpg',
                dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_dark_703ec033d6.jpg',
            },
        },
    },
    {
        label: 'Parade',
        value: 'parade',
        background: {
            thumb: {
                light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_parade_light_7e7662c9dd.png',
                dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_parade_dark_cc5b24c520.png',
            },
        },
    },
    {
        label: 'Coding at night',
        value: 'coding-at-night',
        background: {
            thumb: {
                light: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_coding_at_night_2df33d2f3d.png',
                dark: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_coding_at_night_2df33d2f3d.png',
            },
            classes: 'wallpaper-coding-at-night:bg-[#54618E] dark:wallpaper-coding-at-night:bg-[#54618E]',
        },
    },
]

const generateThemeClasses = (theme: ThemeOption) => {
    const { background } = theme

    // Only return predefined classes (colors, etc.)
    return background?.classes || ''
}

export const getWallpaperClasses = () => {
    return themeOptions.map(generateThemeClasses).join(' ')
}

export const getThemeSpecificBackgroundColors = () => {
    return themeOptions
        .filter((theme) => theme.background?.classes)
        .map((theme) => theme.background?.classes || '')
        .join(' ')
}

export default function useTheme() {
    return {
        themeOptions,
        getWallpaperClasses,
        getThemeSpecificBackgroundColors,
    }
}
