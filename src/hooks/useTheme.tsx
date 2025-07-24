import { useState, useEffect } from 'react'

export interface ThemeOption {
  label: string
  value: string
  background?: {
    image?: {
      light?: {
        url?: string
        thumb?: string
      }
      dark?: {
        url?: string
        thumb?: string
      }
    }
    size?: string
    repeat?: string
    position?: string
    classes?: string // Full Tailwind classes that Tailwind can see
  }
}

export const themeOptions: ThemeOption[] = [
  {
    label: 'Keyboard garden',
    value: 'keyboard-garden',
    background: {
      image: {
        light: {
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_keyboard_garden_light_272a92dc4c.png'
        },
        dark: {
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_keyboard_garden_dark_d8b80b34db.png'
        }
      },
      classes: 'wallpaper-keyboard-garden:bg-[#E1D7C2] dark:wallpaper-keyboard-garden:bg-[#37422D]',
    },
  },
  {
    label: 'Hogzilla',
    value: 'hogzilla',
    background: {
      image: {
        light: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_bf40c5e271.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_light_1b27bcadcf.png'
        },
        dark: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_bf40c5e271.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/hogzilla_dark_7f240e0422.png'
        }
      },
      size: 'contain',
      repeat: 'no-repeat',
      position: 'right-bottom',
    },
  },
  {
    label: 'Startup Monopoly',
    value: 'startup-monopoly',
    background: {
      image: {
        light: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/startup_monopoly_2ac9d45ce3.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_startup_monopoly_light_b38ca0c4e5.png'
        },
        dark: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/startup_monopoly_2ac9d45ce3.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_startup_monopoly_dark_699c375497.png'
        }
      },
      size: '1087px_540px',
      repeat: 'no-repeat',
      position: 'right-top',
      classes: 'wallpaper-startup-monopoly:bg-[#FEFCED] dark:wallpaper-startup-monopoly:bg-[#1d1f27]',
    },
  },
  {
    label: 'Office party',
    value: 'office-party',
    background: {
      image: {
        light: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/carpet_light_27d74f73b5.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_office_party_light_192b0c000f.png'
        },
        dark: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/carpet_dark_f1c9f5ce39.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_office_party_dark_1d95807317.png'
        }
      },
      repeat: 'repeat',
      size: '200px_198px',
    },
  },
  {
    label: '2001 bliss',
    value: '2001-bliss',
    background: {
      image: {
        light: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_1x_27e9e47112.jpg',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_light_0b2e4ef53c.jpg'
        },
        dark: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_1x_27e9e47112.jpg',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/bliss_8bit_dark_703ec033d6.jpg'
        }
      },
      size: 'cover',
      repeat: 'no-repeat',
      position: 'center',
    },
  },
  {
    label: 'Parade',
    value: 'parade',
    background: {
      image: {
        light: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/parade_light_ffe041646a.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_parade_light_7e7662c9dd.png'
        },
        dark: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/parade_dark_238d90c5ef.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_parade_dark_cc5b24c520.png'
        }
      },
      size: 'contain',
      repeat: 'no-repeat',
      position: 'left-bottom',
    },
  },
  {
    label: 'Coding at night',
    value: 'coding-at-night',
    background: {
      image: {
        light: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/coding_at_night_5d7d21791e.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_coding_at_night_2df33d2f3d.png'
        },
        dark: {
          url: 'https://res.cloudinary.com/dmukukwp6/image/upload/coding_at_night_5d7d21791e.png',
          thumb: 'https://res.cloudinary.com/dmukukwp6/image/upload/thumb_coding_at_night_2df33d2f3d.png'
        }
      },
      size: 'contain',
      repeat: 'no-repeat',
      position: 'bottom',
      classes: 'wallpaper-coding-at-night:bg-[#54618E] dark:wallpaper-coding-at-night:bg-[#54618E]',
    },
  },
]

const generateThemeClasses = (theme: ThemeOption) => {
  const { value, background } = theme
  const classes: string[] = []

  if (background?.image) {
    // Handle light/dark specific images
    if (background.image.light?.url) {
      classes.push(`wallpaper-${value}:bg-[url('${background.image.light.url}')]`)
    }
    if (background.image.dark?.url) {
      classes.push(`dark:wallpaper-${value}:bg-[url('${background.image.dark.url}')]`)
    }
  }

  // Handle background properties
  if (background?.size) {
    const sizeClass = background.size.includes('px') ? `[length:${background.size}]` : background.size
    classes.push(`wallpaper-${value}:bg-${sizeClass}`)
  }

  if (background?.repeat) {
    classes.push(`wallpaper-${value}:bg-${background.repeat}`)
  }

  if (background?.position) {
    classes.push(`wallpaper-${value}:bg-${background.position}`)
  }

  // Add predefined classes (colors, etc.)
  if (background?.classes) {
    classes.push(background.classes)
  }

  return classes.join(' ')
}

export const getWallpaperClasses = () => {
  return themeOptions.map(generateThemeClasses).join(' ')
}

export const getThemeSpecificBackgroundColors = () => {
  return themeOptions
    .filter(theme => theme.background?.classes)
    .map(theme => theme.background?.classes || '')
    .join(' ')
}

export default function useTheme() {
  return {
    themeOptions,
    getWallpaperClasses,
    getThemeSpecificBackgroundColors,
  }
}
