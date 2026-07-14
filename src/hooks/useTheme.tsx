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
            classes: '',
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
            // Semi-transparent scrim behind labels — Hogzilla's busy artwork washes out plain white text.
            classes: 'wallpaper-hogzilla:bg-black/50 dark:wallpaper-hogzilla:bg-black/60',
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
            classes: 'wallpaper-startup-monopoly:bg-black/50 dark:wallpaper-startup-monopoly:bg-black/60',
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
