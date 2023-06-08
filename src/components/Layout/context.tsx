import { Flag, Flask, Graph, RewindPlay, Stack, Toggle } from 'components/NewIcons'
import React, { createContext } from 'react'

export const Context = createContext<any>(undefined)

export const LayoutProvider = ({
    children,
    parent,
}: {
    children: React.ReactNode
    parent?: 'Products' | 'Pricing' | 'Docs' | 'Community' | 'About'
}) => {
    const menu = [
        {
            name: 'Products',
            url: '/product-analytics',
            internal: [
                {
                    name: 'Product analytics',
                    Icon: Graph,
                },
                {
                    name: 'Session replay',
                    Icon: RewindPlay,
                },
                {
                    name: 'Feature flags',
                    Icon: Toggle,
                },
                {
                    name: 'A/B testing',
                    Icon: Flask,
                },
            ],
        },
        {
            name: 'Pricing',
            url: '/pricing',
        },
        {
            name: 'Docs',
            url: '/docs',
            internal: [
                {
                    name: 'Getting started',
                    Icon: Flag,
                },
                {
                    name: 'Product OS',
                    Icon: Stack,
                },
                {
                    name: 'Getting started',
                    Icon: Flag,
                },
                {
                    name: 'Product analytics',
                    Icon: Graph,
                },
                {
                    name: 'Session replay',
                    Icon: RewindPlay,
                },
                {
                    name: 'Feature flags',
                    Icon: Toggle,
                },
                {
                    name: 'A/B testing',
                    Icon: Flask,
                },
            ],
        },
        {
            name: 'Community',
            url: '/questions',
        },
        {
            name: 'Company',
            url: '/about',
        },
    ]

    return <Context.Provider value={{ menu, parent }}>{children}</Context.Provider>
}
