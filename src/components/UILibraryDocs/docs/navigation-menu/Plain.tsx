import React from 'react'
import { NavigationMenu } from 'components/UI/NavigationMenu'

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

export default function NavigationMenuPlain(): JSX.Element {
    return (
        <NavigationMenu.Root>
            <NavigationMenu.List appearance="plain">
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
