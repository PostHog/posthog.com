import { MenuType } from 'components/RadixUI/MenuBar'
import React from 'react'
import { IconApps, IconLogomark } from '@posthog/icons'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'

interface ProductMenuItem {
    name: string
    url: string
    icon: string
    color: string
}

interface ProductMenu {
    children: ProductMenuItem[]
}

const getProductMenuItems = () => {
    const products = (productMenu as ProductMenu).children
        .filter((product) => {
            const key = product.url.replace('/', '')
            // Only filter out the "All products" entry
            return key !== 'products'
        })
        .map((product) => {
            const IconComponent = Icons[product.icon as keyof typeof Icons]
            return {
                type: 'item' as const,
                label: product.name,
                link: product.url,
                icon: <IconComponent className={`text-${product.color} size-4`} />,
            }
        })

    // Add separator and "All Products" at the bottom
    return [
        ...products,
        { type: 'separator' as const },
        {
            type: 'item' as const,
            label: 'All Products',
            link: '/products',
            icon: <IconApps className="text-red size-4" />,
        },
    ]
}

export const menuData: MenuType[] = [
    {
        trigger: (
            <>
                <IconLogomark className="size-6" />
            </>
        ),
        items: [
            {
                type: 'item',
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
            {
                type: 'item',
                label: 'Display options',
                link: '/display-options',
            },
        ],
    },
    {
        trigger: 'Products',
        items: getProductMenuItems(),
    },
    {
        trigger: 'Pricing',
        items: [
            {
                type: 'item',
                label: 'Plans & usage-based pricing',
                link: '/pricing',
            },
            {
                type: 'item',
                label: 'Pricing calculator',
                link: '/calculator',
            },
            {
                type: 'item',
                label: 'Add-ons',
                link: '/addons',
            },
            {
                type: 'item',
                label: 'Pricing philosophy',
                link: '/pricing/philosophy',
            },
            {
                type: 'item',
                label: 'How we do sales',
                link: '/sales',
            },
            {
                type: 'item',
                label: 'Founder stack',
                link: '/founders',
            },
            {
                type: 'item',
                label: 'Enterprise',
                link: '/enterprise',
            },
        ],
    },
    {
        trigger: 'Docs',
        items: [
            {
                type: 'item',
                label: 'Getting started',
                link: '/docs/getting-started/install',
            },
            { type: 'separator' },
            {
                type: 'submenu',
                label: 'Product OS',
                items: [
                    {
                        type: 'item',
                        label: 'What is Product OS?',
                        link: '/docs/product-os',
                    },
                    {
                        type: 'item',
                        label: 'Notebooks',
                        link: '/docs/notebooks',
                    },
                    {
                        type: 'item',
                        label: 'Toolbar',
                        link: '/docs/toolbar',
                    },
                    {
                        type: 'item',
                        label: 'Max AI',
                        link: '/docs/max-ai',
                    },
                ],
            },
            { type: 'separator' },
            {
                type: 'submenu',
                label: 'Products',
                items: [
                    {
                        type: 'item',
                        label: 'Email Link',
                    },
                    {
                        type: 'item',
                        label: 'Messages',
                    },
                    {
                        type: 'item',
                        label: 'Notes',
                    },
                ],
            },
            { type: 'separator' },
            {
                type: 'submenu',
                label: 'Self-host',
                items: [
                    {
                        type: 'item',
                        label: 'Overview',
                        link: '/docs/self-host',
                    },
                    {
                        type: 'item',
                        label: 'Configure',
                        link: '/docs/self-host/configure',
                    },
                    {
                        type: 'item',
                        label: 'Troubleshooting',
                        link: '/docs/self-host/deploy/troubleshooting',
                    },
                ],
            },
        ],
    },
    {
        trigger: 'Company',
        items: [
            {
                type: 'item',
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
            { type: 'separator' },
            {
                type: 'submenu',
                label: 'Share',
                items: [
                    {
                        type: 'item',
                        label: 'Email Link',
                    },
                    {
                        type: 'item',
                        label: 'Messages',
                    },
                    {
                        type: 'item',
                        label: 'Notes',
                    },
                ],
            },
            { type: 'separator' },
            {
                type: 'item',
                label: 'Print…',
                shortcut: '⌘ P',
            },
        ],
    },
    {
        trigger: (
            <>
                <span className="ml-1">More</span>
            </>
        ),
        items: [
            {
                type: 'item',
                label: 'New Tab',
                shortcut: '⌘ T',
            },
            {
                type: 'item',
                label: 'New Window',
                shortcut: '⌘ N',
            },
            {
                type: 'item',
                label: 'New Incognito Window',
                disabled: true,
            },
        ],
    },
]
