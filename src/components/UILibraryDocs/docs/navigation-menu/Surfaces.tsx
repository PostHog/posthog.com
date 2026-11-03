import React from 'react'
import { NavigationMenu } from 'components/UI/NavigationMenu'
import { DemoRow, DemoRows } from 'components/UILibraryDocs/DemoLayout'

const appearances = [
    { appearance: 'raised', label: 'Raised (default)' },
    { appearance: 'outlined', label: 'Outlined' },
    { appearance: 'plain', label: 'Plain' },
] as const

export default function Surfaces(): JSX.Element {
    return (
        <DemoRows>
            {appearances.map(({ appearance, label }) => (
                <DemoRow key={appearance} label={label}>
                    <NavigationMenu.Root>
                        <NavigationMenu.List appearance={appearance} aria-label={`${appearance} product navigation`}>
                            <NavigationMenu.Item>
                                <NavigationMenu.Trigger>
                                    Products
                                    <NavigationMenu.Icon />
                                </NavigationMenu.Trigger>
                                <NavigationMenu.Content>
                                    <ul className="w-48">
                                        <li>
                                            <NavigationMenu.Link href="/product-analytics">
                                                Product analytics
                                            </NavigationMenu.Link>
                                        </li>
                                        <li>
                                            <NavigationMenu.Link href="/session-replay">
                                                Session replay
                                            </NavigationMenu.Link>
                                        </li>
                                    </ul>
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>
                            <NavigationMenu.Item>
                                <NavigationMenu.Trigger>
                                    Company
                                    <NavigationMenu.Icon />
                                </NavigationMenu.Trigger>
                                <NavigationMenu.Content>
                                    <ul className="w-48">
                                        <li>
                                            <NavigationMenu.Link href="/about">About</NavigationMenu.Link>
                                        </li>
                                        <li>
                                            <NavigationMenu.Link href="/careers">Careers</NavigationMenu.Link>
                                        </li>
                                    </ul>
                                </NavigationMenu.Content>
                            </NavigationMenu.Item>
                        </NavigationMenu.List>
                        <NavigationMenu.Popup />
                    </NavigationMenu.Root>
                </DemoRow>
            ))}
        </DemoRows>
    )
}
