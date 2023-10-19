import { IMenu } from 'components/PostLayout/types'

export const postsMenu: IMenu[] = [
    {
        name: 'All posts',
        url: '/posts',
        icon: 'Newspaper',
        color: 'blue',
    },
    {
        name: 'Founders',
        url: '/founders',
        icon: 'Rocket',
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
        icon: 'Helmet',
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
        url: '/blog/',
        icon: 'Newspaper',
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
        icon: 'Calendar',
        color: 'salmon',
    },
    {
        name: 'Customer stories',
        url: '/customers',
        icon: 'Person',
        color: 'yellow',
    },
    {
        name: 'Guides & tutorials',
        url: '/tutorials',
        icon: 'Map',
        color: 'red',
        children: [
            {
                name: 'Product OS',
                url: '/tutorials/product-os',
                icon: 'Stack',
                color: 'salmon',
            },
            {
                name: 'Product analytics',
                url: '/tutorials/product-analytics',
                icon: 'Graph',
                color: 'blue',
            },
            {
                name: 'Session replay',
                url: '/tutorials/session-replay',
                color: 'yellow',
                icon: 'RewindPlay',
            },
            {
                name: 'Feature flags',
                url: '/tutorials/feature-flags',
                icon: 'Toggle',
                color: 'seagreen',
            },
            {
                name: 'A/B testing',
                url: '/tutorials/experimentation',
                icon: 'Flask',
                color: 'purple',
            },
            {
                name: 'Surveys',
                url: '/tutorials/surveys',
                icon: 'Message',
                color: 'blue',
            },
            {
                name: 'CDP',
                url: '/tutorials/cdp',
                color: 'yellow',
                icon: 'Person',
            },
        ],
    },
    {
        name: 'Newsletter',
        url: '/newsletter/',
        icon: 'Newspaper',
        color: 'green',
    },
    {
        name: 'Spotlight',
        url: '/spotlight',
        icon: 'Spotlight',
        color: 'blue',
    },
]
