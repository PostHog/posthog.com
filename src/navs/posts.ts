import { IMenu } from 'components/PostLayout/types'

export const postsMenu: IMenu[] = [
    {
        name: 'All posts',
        url: '/posts',
    },
    {
        name: 'Founders',
        url: '/founders',
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
        ],
    },
    {
        name: 'Changelog',
        url: '/changelog/',
    },
    {
        name: 'Customer stories',
        url: '/customers/',
    },
    {
        name: 'Guides & tutorials',
        url: '/tutorials',
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
    },
    {
        name: 'PostHog news',
        url: '/posthog-news',
    },
    {
        name: 'Spotlight',
        url: '/spotlight',
    },
]
