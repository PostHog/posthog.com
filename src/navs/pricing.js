export const pricingMenu = {
    name: 'Pricing',
    url: '/pricing',
    icon: 'IconReceipt',
    children: [
        {
            name: 'PostHog Cloud',
            icon: 'IconCloud',
            color: 'blue',
            url: '/pricing',
        },
        // {
        //     name: 'Event types',
        //     icon: 'IconCursorClick',
        //     color: 'purple',
        //     url: '/events',
        // },
        {
            name: 'Add-ons',
            icon: 'IconPuzzle',
            color: 'seagreen',
            url: '/addons',
        },
        {
            name: 'Pricing philosophy',
            icon: 'IconLightBulb',
            color: 'yellow',
            url: '/pricing/philosophy',
        },
        {
            name: 'How we do "sales"',
            icon: 'IconPercentage',
            color: 'green',
            url: '/sales',
        },
    ],
}

export default pricingMenu
