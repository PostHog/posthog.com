export interface ProfileBackground {
    id: string
    name: string
    url: string
    backgroundSize?: string
    backgroundRepeat?: string
    backgroundPosition?: string
}

export const profileBackgrounds: ProfileBackground[] = [
    {
        id: 'purple-hearts',
        name: 'Purple hearts',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/purple_hearts_107e563a6b.jpg',
        backgroundRepeat: 'repeat',
    },
    {
        id: 'blue-stars',
        name: 'Blue stars',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/blue_stars_949d228efb.gif',
        backgroundRepeat: 'repeat',
    },
    {
        id: 'rainbow-squares',
        name: 'Rainbow squares',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/rainbow_squares_89c8732dd5.gif',
        backgroundRepeat: 'repeat',
    },
    {
        id: 'pink-stars',
        name: 'Pink stars',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/pink_stars_191ffea97f.gif',
        backgroundRepeat: 'repeat',
    },
]
