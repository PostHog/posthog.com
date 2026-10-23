import React from 'react'
import { NavigationMenu } from 'components/UI/NavigationMenu'

const products = [
    { href: '/product-analytics', title: 'Product analytics', description: 'Trends, funnels, and retention.' },
    { href: '/web-analytics', title: 'Web analytics', description: 'Traffic, sources, and conversions.' },
    { href: '/session-replay', title: 'Session replay', description: 'Watch how people use your app.' },
    { href: '/feature-flags', title: 'Feature flags', description: 'Roll out features safely.' },
    { href: '/experiments', title: 'Experiments', description: 'Test changes on real users.' },
    { href: '/error-tracking', title: 'Error tracking', description: 'Find and fix exceptions.' },
]

const menus = [
    {
        label: 'Docs',
        links: [
            { href: '/docs/getting-started/install', title: 'Install PostHog' },
            { href: '/docs/libraries', title: 'SDKs' },
            { href: '/docs/api', title: 'API' },
        ],
    },
    {
        label: 'Company',
        links: [
            { href: '/about', title: 'About' },
            { href: '/handbook', title: 'Handbook' },
            { href: '/careers', title: 'Careers' },
        ],
    },
]

export default function NavigationMenuOutlined(): JSX.Element {
    return (
        <NavigationMenu.Root>
            <NavigationMenu.List surface="outlined">
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger>
                        Products
                        <NavigationMenu.Icon />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <ul className="grid w-[26rem] max-w-full grid-cols-[repeat(auto-fill,minmax(12rem,1fr))]">
                            {products.map((product) => (
                                <li key={product.href}>
                                    <NavigationMenu.Link href={product.href}>
                                        <span className="font-semibold">{product.title}</span>
                                        <span className="leading-snug text-secondary">{product.description}</span>
                                    </NavigationMenu.Link>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                {menus.map((menu) => (
                    <NavigationMenu.Item key={menu.label}>
                        <NavigationMenu.Trigger>
                            {menu.label}
                            <NavigationMenu.Icon />
                        </NavigationMenu.Trigger>
                        <NavigationMenu.Content>
                            <ul className="w-44">
                                {menu.links.map((link) => (
                                    <li key={link.href}>
                                        <NavigationMenu.Link href={link.href}>{link.title}</NavigationMenu.Link>
                                    </li>
                                ))}
                            </ul>
                        </NavigationMenu.Content>
                    </NavigationMenu.Item>
                ))}
            </NavigationMenu.List>
            <NavigationMenu.Popup />
        </NavigationMenu.Root>
    )
}
