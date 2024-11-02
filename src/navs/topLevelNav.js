import { pricingMenu } from './pricing'

const topLevelNav = [
    {
        name: 'Products',
        url: '/product-analytics',
        children: [
            {
                name: 'Product analytics',
                icon: 'IconGraph',
                color: 'blue',
                url: '/product-analytics',
                children: [
                    {
                        name: 'Features',
                        url: '/product-analytics',
                    },
                    {
                        name: 'Pricing',
                        url: '/product-analytics/pricing',
                    },
                    {
                        name: 'Compare',
                        url: '/product-analytics/compare',
                    },
                    {
                        name: 'Docs',
                        url: '/docs/product-analytics',
                    },
                    {
                        name: 'Tutorials',
                        url: '/tutorials/product-analytics',
                    },
                    {
                        name: 'Questions?',
                        url: '/questions/product-analytics',
                    },
                ],
            },
            {
                name: 'Web analytics',
                icon: 'IconPieChart',
                color: '[#36C46F]',
                url: '/web-analytics',
                children: [
                    {
                        name: 'Features',
                        url: '/web-analytics',
                    },
                    {
                        name: 'Pricing',
                        url: '/web-analytics/pricing',
                    },
                    {
                        name: 'Compare',
                        url: '/web-analytics/compare',
                    },
                    {
                        name: 'Docs',
                        url: '/docs/web-analytics',
                    },
                    {
                        name: 'Tutorials',
                        url: '/tutorials/web-analytics',
                    },
                    {
                        name: 'Questions?',
                        url: '/questions/web-analytics',
                    },
                ],
            },
            {
                name: 'Session replay',
                icon: 'IconRewindPlay',
                color: 'yellow',
                url: '/session-replay',
                children: [
                    {
                        name: 'Features',
                        url: '/session-replay',
                    },
                    {
                        name: 'Pricing',
                        url: '/session-replay/pricing',
                    },
                    {
                        name: 'Compare',
                        url: '/session-replay/compare',
                    },
                    {
                        name: 'Docs',
                        url: '/docs/session-replay',
                    },
                    {
                        name: 'Tutorials',
                        url: '/tutorials/session-replay',
                    },
                    {
                        name: 'Questions?',
                        url: '/questions/session-replay',
                    },
                ],
            },
            {
                name: 'Feature flags',
                icon: 'IconToggle',
                color: 'seagreen',
                url: '/feature-flags',
                children: [
                    {
                        name: 'Features',
                        url: '/feature-flags',
                    },
                    {
                        name: 'Pricing',
                        url: '/feature-flags/pricing',
                    },
                    {
                        name: 'Compare',
                        url: '/feature-flags/compare',
                    },
                    {
                        name: 'Docs',
                        url: '/docs/feature-flags',
                    },
                    {
                        name: 'Tutorials',
                        url: '/tutorials/feature-flags',
                    },
                    {
                        name: 'Questions?',
                        url: '/questions/feature-flags',
                    },
                ],
            },
            {
                name: 'Experiments',
                icon: 'IconFlask',
                color: 'purple',
                url: '/experiments',
                children: [
                    {
                        name: 'Features',
                        url: '/experiments',
                    },
                    {
                        name: 'Pricing',
                        url: '/experiments/pricing',
                    },
                    {
                        name: 'Compare',
                        url: '/experiments/compare',
                    },
                    {
                        name: 'Docs',
                        url: '/docs/experiments',
                    },
                    {
                        name: 'Tutorials',
                        url: '/tutorials/experiments',
                    },
                    {
                        name: 'Questions?',
                        url: '/questions/experiments',
                    },
                ],
            },
            {
                name: 'Surveys',
                icon: 'IconMessage',
                color: 'salmon',
                url: '/surveys',
                children: [
                    {
                        name: 'Features',
                        url: '/surveys',
                    },
                    {
                        name: 'Pricing',
                        url: '/surveys/pricing',
                    },
                    {
                        name: 'Compare',
                        url: '/surveys/compare',
                    },
                    {
                        name: 'Docs',
                        url: '/docs/surveys',
                    },
                    {
                        name: 'Tutorials',
                        url: '/tutorials/surveys',
                    },
                    {
                        name: 'Questions?',
                        url: '/questions/surveys',
                    },
                ],
            },
            {
                name: 'CDP',
                icon: 'IconPlug',
                color: 'sky-blue',
                url: '/cdp',
                children: [
                    {
                        name: 'Features',
                        url: '/cdp',
                    },
                    {
                        name: 'Pricing',
                        url: '/cdp/pricing',
                    },
                    {
                        name: 'Compare',
                        url: '/cdp/compare',
                    },
                    {
                        name: 'Docs',
                        url: '/docs/cdp',
                    },
                    {
                        name: 'Tutorials',
                        url: '/tutorials/cdp',
                    },
                    {
                        name: 'Questions?',
                        url: '/questions/cdp',
                    },
                ],
            },
            {
                name: 'Data warehouse',
                icon: 'IconDatabase',
                color: 'lilac',
                url: '/data-warehouse',
                children: [
                    {
                        name: 'Features',
                        url: '/data-warehouse',
                    },
                    {
                        name: 'Pricing',
                        url: '/data-warehouse/pricing',
                    },
                    {
                        name: 'Compare',
                        url: '/data-warehouse/compare',
                    },
                    {
                        name: 'Docs',
                        url: '/docs/data-warehouse',
                    },
                    {
                        name: 'Tutorials',
                        url: '/tutorials/data-warehouse',
                    },
                    {
                        name: 'Questions?',
                        url: '/questions/data-warehouse',
                    },
                ],
            },
            {
                name: 'Product OS',
                icon: 'IconStack',
                color: 'blue',
                url: '/product-os',
            },
        ],
    },
    pricingMenu,
    // communityMenu,
    // companyMenu,
]

export default topLevelNav
