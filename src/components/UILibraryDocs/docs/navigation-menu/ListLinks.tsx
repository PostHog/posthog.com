import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { NavigationMenu } from 'components/UI/NavigationMenu'

const docsLinks = [
    { href: '/docs/getting-started/install', title: 'Install PostHog' },
    { href: '/docs/libraries', title: 'SDKs' },
    { href: '/docs/api', title: 'API' },
]

export default function NavigationMenuListLinks(): JSX.Element {
    return (
        <NavigationMenu.Root>
            <NavigationMenu.List>
                <NavigationMenu.Item>
                    <NavigationMenu.Trigger>
                        Docs
                        <NavigationMenu.Icon />
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Content>
                        <ul className="w-44">
                            {docsLinks.map((link) => (
                                <li key={link.href}>
                                    <NavigationMenu.Link href={link.href}>{link.title}</NavigationMenu.Link>
                                </li>
                            ))}
                        </ul>
                    </NavigationMenu.Content>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Link render={<GatsbyLink to="/pricing" />}>Pricing</NavigationMenu.Link>
                </NavigationMenu.Item>
                <NavigationMenu.Item>
                    <NavigationMenu.Link href="https://github.com/PostHog/posthog" target="_blank" rel="noreferrer">
                        GitHub
                    </NavigationMenu.Link>
                </NavigationMenu.Item>
            </NavigationMenu.List>
            <NavigationMenu.Popup />
        </NavigationMenu.Root>
    )
}
