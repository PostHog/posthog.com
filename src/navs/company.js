export const companyMenu = {
    name: 'Company',
    url: '/company',
    children: [
        { name: 'About', icon: 'IconLogomark', url: '/about' },
        {
            name: 'Roadmap',
            icon: 'IconMap',
            color: 'orange',
            url: '/roadmap',
        },
        {
            name: 'WIP',
            icon: 'IconHourglass',
            color: 'seagreen',
            url: '/wip',
        },
        {
            name: 'Changelog',
            icon: 'IconCalendar',
            color: 'red',
            url: '/changelog/2024',
        },
        { name: 'People', icon: 'IconProfile', color: 'blue', url: '/people' },
        {
            name: 'Teams',
            icon: 'IconPeople',
            color: 'purple',
            url: '/teams',
        },
        { name: 'Handbook', icon: 'IconBook', color: 'seagreen', url: '/handbook' },
        {
            name: 'Blog',
            icon: 'IconNewspaper',
            color: 'yellow',
            url: 'https://posthog.com/blog',
        },
        { name: 'Careers', icon: 'IconLaptop', color: 'purple', url: '/careers' },
    ],
}

export default companyMenu
