import { IMenu } from 'components/PostLayout/types'

export const postsMenu: IMenu[] = [
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
                url: '/founders/ops-finance',
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
                url: '/founders/sales-customer-success',
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
                url: '/product engineers/growth',
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
                url: '/blog/categories/ceo-diaries',
            },
            {
                name: 'PostHog news',
                url: '/blog/categories/posthog-news',
            },
            {
                name: 'Inside PostHog',
                url: '/blog/categories/inside-posthog',
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
                url: '/tutorials/categories/product-os',
            },
            {
                name: 'Product analytics',
                url: '/tutorials/categories/product-analytics',
            },
            {
                name: 'Session replay',
                url: '/tutorials/categories/session-replay',
            },
            {
                name: 'Feature flags',
                url: '/tutorials/categories/feature-flags',
            },
            {
                name: 'A/B testing',
                url: '/tutorials/categories/experimentation',
            },
            {
                name: 'Surveys',
                url: '/tutorials/categories/surveys',
            },
            {
                name: 'CDP',
                url: '/tutorials/categories/cdp',
            },
        ],
    },
    {
        name: 'Newsletter',
        url: '/newsletter/',
    },
    {
        name: 'PostHog news',
        url: '/blog/categories/posthog-news',
    },
    {
        name: 'Spotlight',
        url: '/blog/spotlight',
    },
]
