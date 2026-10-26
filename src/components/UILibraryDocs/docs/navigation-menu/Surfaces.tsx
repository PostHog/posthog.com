import React from 'react'
import { NavigationMenu } from 'components/UI/NavigationMenu'

export default function Surfaces(): JSX.Element {
    return (
        <div className="flex flex-col gap-5">
            {(['plain', 'outlined', 'raised'] as const).map((appearance) => (
                <div key={appearance} className="flex flex-col gap-2">
                    <span className="text-sm font-medium capitalize">{appearance}</span>
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
                                <NavigationMenu.Link href="/docs">Docs</NavigationMenu.Link>
                            </NavigationMenu.Item>
                        </NavigationMenu.List>
                        <NavigationMenu.Popup />
                    </NavigationMenu.Root>
                </div>
            ))}
        </div>
    )
}
