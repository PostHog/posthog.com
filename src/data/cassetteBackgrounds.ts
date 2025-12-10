export interface CassetteLabelBackground {
    name: string
    url: string
    backgroundSize?: string
    backgroundRepeat?: string
    backgroundPosition?: string
}

export const cassetteLabelBackgrounds: CassetteLabelBackground[] = [
    {
        name: 'None',
        url: '',
    },
    {
        name: 'Purple hearts',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/purple_hearts_107e563a6b.jpg',
        backgroundRepeat: 'repeat',
    },
    {
        name: 'Blue stars',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/blue_stars_949d228efb.gif',
        backgroundRepeat: 'repeat',
    },
    {
        name: 'Rainbow squares',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/rainbow_squares_89c8732dd5.gif',
        backgroundRepeat: 'repeat',
    },
    {
        name: 'Pink stars',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/pink_stars_191ffea97f.gif',
        backgroundRepeat: 'repeat',
    },
    {
        name: 'Straight fire',
        url: 'https://res.cloudinary.com/dmukukwp6/image/upload/flames_66082da2eb.gif',
        backgroundRepeat: 'repeat',
        backgroundSize: '100%',
    },
]
