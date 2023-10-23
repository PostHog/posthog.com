import { IMenu } from 'components/PostLayout/types'

export const postsMenu: IMenu[] = [
    {
        name: 'All posts',
        url: '/posts',
        icon: 'IconNewspaper',
        color: 'blue',
    },
    {
        name: 'Founders',
        url: '/founders',
        icon: 'IconRocket',
        color: 'purple',
        children: [
            {
                name: 'Being a founder',
                url: '/founders/being-a-founder',
            },
            {
                name: 'Culture',
                url: '/founders/culture',
            },
            {
                name: 'Fundraising',
                url: '/founders/fundraising',
            },
            {
                name: 'Growth',
                url: '/founders/growth',
            },
            {
                name: 'Marketing',
                url: '/founders/marketing',
            },
            {
                name: 'Ops & finance',
                url: '/founders/ops-and-finance',
            },
            {
                name: 'People',
                url: '/founders/people',
            },
            {
                name: 'Product',
                url: '/founders/product',
            },
            {
                name: 'Product-market fit',
                url: '/founders/product-market-fit',
            },
            {
                name: 'Revenue',
                url: '/founders/revenue',
            },
            {
                name: 'Sales & CS',
                url: '/founders/sales-and-cs',
            },
        ],
    },
    {
        name: 'Product engineers',
        url: '/product-engineers',
        icon: 'IconHelmet',
        color: 'orange',
        children: [
            {
                name: 'AB testing',
                url: '/product-engineers/ab-testing',
            },
            {
                name: 'Feature management',
                url: '/product-engineers/feature-management',
            },
            {
                name: 'Growth engineering',
                url: '/product-engineers/growth',
            },
            {
                name: 'Product analytics',
                url: '/product-engineers/product-analytics',
            },
            {
                name: 'User research',
                url: '/product-engineers/user-research',
            },
            {
                name: 'Engineering',
                url: '/product-engineers/engineering',
            },
        ],
    },
    {
        name: 'Blog',
        url: '/blog',
        icon: 'IconNewspaper',
        color: 'teal',
        children: [
            {
                name: 'CEO diaries',
                url: '/blog/ceo-diaries',
            },
            {
                name: 'PostHog news',
                url: '/blog/posthog-news',
            },
            {
                name: 'Inside PostHog',
                url: '/blog/inside-posthog',
            },
            {
                name: 'Using PostHog',
                url: '/blog/using-posthog',
            },
            {
                name: 'General',
                url: '/blog/general',
            },
        ],
    },
    {
        name: 'Changelog',
        url: '/changelog',
        icon: 'IconCalendar',
        color: 'salmon',
    },
    {
        name: 'Customer stories',
        url: '/customers',
        icon: 'IconPerson',
        color: 'yellow',
    },
    {
        name: 'Guides & tutorials',
        url: '/tutorials',
        icon: 'IconMap',
        color: 'red',
        children: [
            {
                name: 'Product OS',
                url: '/tutorials/product-os',
                icon: 'IconStack',
                color: 'salmon',
            },
            {
                name: 'Product analytics',
                url: '/tutorials/product-analytics',
                icon: 'IconGraph',
                color: 'blue',
            },
            {
                name: 'Session replay',
                url: '/tutorials/session-replay',
                color: 'yellow',
                icon: 'IconRewindPlay',
            },
            {
                name: 'Feature flags',
                url: '/tutorials/feature-flags',
                icon: 'IconToggle',
                color: 'seagreen',
            },
            {
                name: 'A/B testing',
                url: '/tutorials/experimentation',
                icon: 'IconFlask',
                color: 'purple',
            },
            {
                name: 'Surveys',
                url: '/tutorials/surveys',
                icon: 'IconMessage',
                color: 'blue',
            },
            {
                name: 'CDP',
                url: '/tutorials/cdp',
                color: 'yellow',
                icon: 'IconPerson',
            },
        ],
    },
    {
        name: 'Newsletter',
        url: '/newsletter',
        icon: 'IconLetter',
        color: 'green',
    },
    {
        name: 'Spotlight',
        url: '/spotlight',
        icon: 'IconSpotlight',
        color: 'blue',
    },
]
