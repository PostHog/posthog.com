import { MenuType } from 'components/RadixUI/MenuBar'
import React from 'react'
import { handbookSidebar } from '../../../navs'
import * as Icons from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import { APP_COUNT } from 'constants/index'
import SearchableProductMenu from './SearchableProductMenu'
import {
    categoryOrder,
    categoryDisplayNames,
    categoryIcons,
    buildCategoryMenuItems,
    buildProductMenuItems,
    popularProducts,
    newestProducts,
} from 'constants/productNavigation'
import useProduct from 'hooks/useProduct'
import {
    IconXNotTwitter,
    IconSubstack,
    IconYouTube,
    IconLinkedIn,
    IconGithub,
    IconInstagram,
    IconDictator,
    IconSparksJoy,
} from 'components/OSIcons'
import { useApp } from '../../../context/App'
import { navigate } from 'gatsby'

// Process handbookSidebar into menu item structure
const processHandbookSidebar = (items: any[], isRoot = true): any[] => {
    return items
        .filter((item, idx) => {
            // Omit the first 'Handbook' item at the root level
            if (isRoot && idx === 0 && item.name === 'Handbook') return false
            return !!item.name
        })
        .map((item) => {
            if (item.children) {
                return {
                    type: 'submenu' as const,
                    label: item.name,
                    ...(item.url ? { link: item.url } : {}),
                    items: processHandbookSidebar(item.children, false),
                }
            }
            // If no url and no children, mark as disabled (label-like)
            if (!item.url && !item.children) {
                return {
                    type: 'item' as const,
                    label: item.name,
                    disabled: true,
                }
            }
            return {
                type: 'item' as const,
                label: item.name,
                ...(item.url ? { link: item.url } : {}),
            }
        })
}

// Build Product OS menu items with categories
const buildProductOSMenuItems = (allProducts: any[]) => {
    const items: any[] = [
        {
            type: 'item',
            label: `Browse all apps (${APP_COUNT})`,
            link: '/products',
            icon: <Icons.IconApps className="size-4 text-red" />,
            mobileDestination: '/products',
        },
        {
            type: 'separator',
        },
        {
            type: 'submenu' as const,
            label: 'Search apps',
            link: '/products',
            items: <SearchableProductMenu products={allProducts} />,
            icon: <Icons.IconSearch className="size-4 text-gray" />,
            mobileDestination: '/products',
        },
        {
            type: 'submenu',
            label: 'Popular products',
            items: buildProductMenuItems(popularProducts, allProducts),
            icon: <Icons.IconTrending className="size-4 text-green" />,
            mobileDestination: '/products',
        },
        {
            type: 'submenu',
            label: 'New products',
            items: buildProductMenuItems(newestProducts, allProducts),
            icon: <Icons.IconPresent className="size-4 text-blue" />,
            mobileDestination: '/products',
        },
        {
            type: 'separator',
        },
        {
            type: 'item',
            label: 'Categories',
            disabled: true,
        },
    ]

    // Add category submenus
    categoryOrder.forEach((category) => {
        const categoryProducts = allProducts.filter((product: any) => product.category === category)
        if (categoryProducts.length === 0) return

        const categoryItems = buildCategoryMenuItems(category, allProducts)
        if (categoryItems.length > 0) {
            // Get the icon for this category
            let iconElement = null
            const iconConfig = categoryIcons[category]
            if (iconConfig) {
                const IconComponent = Icons[iconConfig.icon as keyof typeof Icons]
                if (IconComponent) {
                    iconElement = React.createElement(IconComponent, {
                        className: `size-4 text-${iconConfig.color}`,
                    })
                }
            }

            // Prepend MCP link as the first item in 'Utilities, add-ons, & packages'
            if (category === 'product_os') {
                categoryItems.unshift({
                    type: 'item' as const,
                    label: 'MCP',
                    link: '/docs/model-context-protocol',
                    icon: React.createElement(Icons.IconPlug, { className: 'size-4 text-gray' }),
                })
            }

            items.push({
                type: 'submenu',
                label: categoryDisplayNames[category] || category,
                icon: iconElement,
                items: categoryItems,
            })
        }
    })

    return items
}

export function useMenuData(): MenuType[] {
    const allProducts = useProduct() as any[]
    const { isMobile } = useApp()

    // Define main navigation items (excluding logo menu)
    const mainNavItems: MenuType[] = [
        {
            trigger: 'Product OS',
            items: buildProductOSMenuItems(allProducts),
            mobileLink: '/products', // Direct link on mobile
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
                    link: '/pricing#calculator',
                },
                {
                    type: 'item',
                    label: 'Add-ons',
                    link: '/pricing#addons',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'item',
                    label: 'PostHog for...',
                    disabled: true,
                },
                {
                    type: 'item',
                    label: 'Founder stack',
                    link: '/founder-stack',
                },
                {
                    type: 'item',
                    label: 'Startups',
                    link: '/startups',
                },
                { type: 'separator' },
                {
                    type: 'item',
                    label: 'Mildly interesting reads',
                    disabled: true,
                },
                {
                    type: 'item',
                    label: 'Pricing philosophy',
                    link: '/pricing#philosophy',
                },
                {
                    type: 'item',
                    label: 'How we do "sales"',
                    link: '/sales',
                },
                {
                    type: 'item',
                    label: 'Side project insurance',
                    link: '/side-project-insurance',
                },
                {
                    type: 'item',
                    label: "You'll hate PostHog if...",
                    link: '/vibe-check',
                },
                {
                    type: 'item',
                    label: "Don't get discount bamboozled",
                    link: '/discounts',
                },
                {
                    type: 'item',
                    label: 'Social validation for enterprise',
                    link: '/enterprise',
                },
                { type: 'separator' },
                {
                    type: 'item',
                    label: 'Learn more',
                    disabled: true,
                },
                {
                    type: 'item',
                    label: 'Watch a demo',
                    link: '/demo',
                },
                {
                    type: 'item',
                    label: 'Talk to a human',
                    link: '/talk-to-a-human',
                },
            ],
        },
        {
            trigger: 'Docs',
            link: '/docs',
            items: [],
            hideChevron: true,
        },
        {
            trigger: 'Community',
            items: [
                {
                    type: 'item',
                    label: 'PostHog newspaper',
                    link: '/community',
                    icon: <Icons.IconNewspaper className="size-4 text-orange" />,
                },
                {
                    type: 'item' as const,
                    label: 'Forums',
                    link: '/questions',
                    icon: <Icons.IconMessage className="size-4 text-green" />,
                },
                {
                    type: 'item',
                    label: 'Merch store',
                    link: '/merch',
                    icon: <Icons.IconStore className="size-4 text-purple" />,
                },
                {
                    type: 'item',
                    label: 'Events',
                    link: '/events',
                    icon: <Icons.IconCalendar className="size-4 text-red" />,
                },
                {
                    type: 'item',
                    label: 'Incubator',
                    link: '/community-incubator',
                    icon: <Icons.IconFlask className="size-4 text-seagreen" />,
                },
                {
                    type: 'item',
                    label: 'Cool tech jobs',
                    link: '/cool-tech-jobs',
                    icon: <Icons.IconLaptop className="size-4 text-blue" />,
                },
                {
                    type: 'item',
                    label: 'Places',
                    link: '/places',
                    icon: <Icons.IconMap className="size-4 text-red" />,
                },
                {
                    type: 'separator',
                },
                {
                    type: 'item',
                    label: 'Content',
                    disabled: true,
                },
                {
                    type: 'item',
                    label: 'Newsletter',
                    link: '/newsletter',
                },
                {
                    type: 'item',
                    label: 'Blog',
                    link: '/blog',
                },
                {
                    type: 'item',
                    label: 'Product Engineer Handbook',
                    link: '/product-engineer',
                },
                {
                    type: 'item',
                    label: 'Product engineers hub',
                    link: '/product-engineers',
                },
                {
                    type: 'item',
                    label: 'Founders hub',
                    link: '/founders',
                },
            ],
        },
        {
            trigger: 'Company',
            items: [
                {
                    type: 'item',
                    label: 'About',
                    link: '/about',
                },
                {
                    type: 'item',
                    label: 'Customers',
                    link: '/customers',
                },
                {
                    type: 'item',
                    label: 'Blog',
                    link: '/blog',
                },
                {
                    type: 'submenu',
                    label: 'Handbook',
                    link: '/handbook',
                    items: processHandbookSidebar(handbookSidebar),
                    mobileDestination: '/handbook',
                },
                {
                    type: 'item',
                    label: 'Roadmap',
                    link: '/roadmap',
                },
                {
                    type: 'item',
                    label: 'Changelog',
                    link: '/changelog',
                },
                {
                    type: 'item',
                    label: 'Media',
                    link: '/media',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'item',
                    label: 'People',
                    link: '/people',
                },
                {
                    type: 'item',
                    label: 'Small teams',
                    link: '/teams',
                },
                {
                    type: 'item',
                    label: 'Careers',
                    link: '/careers',
                },
                {
                    type: 'item',
                    label: 'Partnerships',
                    link: '/partnerships',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'item',
                    label: 'X',
                    link: 'https://x.com/posthog',
                    icon: <IconXNotTwitter className="size-4 text-black dark:text-white" />,
                    external: true,
                    mobileDestination: false, // Omit from mobile menu
                },
                {
                    type: 'item',
                    label: 'LinkedIn',
                    link: 'https://www.linkedin.com/company/posthog',
                    icon: <IconLinkedIn className="size-4" />,
                    external: true,
                    mobileDestination: false, // Omit from mobile menu
                },
                {
                    type: 'item',
                    label: 'Substack',
                    link: 'https://newsletter.posthog.com',
                    icon: <IconSubstack className="size-4" />,
                    external: true,
                    mobileDestination: false, // Omit from mobile menu
                },
                {
                    type: 'item',
                    label: 'YouTube',
                    link: 'https://www.youtube.com/@posthog',
                    icon: <IconYouTube className="size-4" />,
                    external: true,
                    mobileDestination: false, // Omit from mobile menu
                },
                {
                    type: 'item',
                    label: 'Instagram',
                    link: 'https://www.instagram.com/teamposthog',
                    icon: <IconInstagram className="size-4" />,
                    external: true,
                    mobileDestination: false, // Omit from mobile menu
                },
                {
                    type: 'item',
                    label: 'GitHub',
                    link: 'https://github.com/posthog',
                    icon: <IconGithub className="size-4" />,
                    external: true,
                    mobileDestination: false, // Omit from mobile menu
                },
            ],
        },
        {
            trigger: 'More',
            items: [
                {
                    type: 'item',
                    label: 'DeskHog',
                    link: '/deskhog',
                    icon: <Icons.IconDeskHog className="size-4 text-seagreen" />,
                },
                {
                    type: 'item',
                    label: 'Things that spark joy',
                    link: '/sparks-joy',
                    icon: <IconSparksJoy className="size-4" />,
                },
                // {
                //     type: 'item',
                //     label: 'Video library',
                //     link: '/videos',
                //     icon: <Icons.IconFolderOpenFilled className="size-4 text-orange" />,
                // },
                {
                    type: 'item',
                    label: 'Services',
                    link: '/services',
                    icon: <Icons.IconLaptop className="size-4 text-blue" />,
                },
                {
                    type: 'separator',
                },
                {
                    type: 'item',
                    label: 'Display options',
                    onClick: () => {
                        navigate('/display-options', { state: { newWindow: true } })
                    },
                    icon: <Icons.IconBrightness className="size-4 text-yellow" />,
                    shortcut: [','],
                    mobileDestination: false, // Already exposed as a system item in the mobile logo menu
                },
                {
                    type: 'item',
                    label: 'System status',
                    link: 'https://status.posthog.com',
                    external: true,
                    icon: <Icons.IconPulse className="size-4 text-red" />,
                },
                {
                    type: 'separator',
                },
                {
                    type: 'item',
                    label: 'Terms',
                    link: '/terms',
                    icon: <Icons.IconDocument className="size-4 text-blue" />,
                },
                {
                    type: 'item',
                    label: 'Privacy',
                    link: '/privacy',
                    icon: <Icons.IconLock className="size-4 text-seagreen" />,
                },
                {
                    type: 'item',
                    label: "DPA generator (it's fun!)",
                    link: '/dpa',
                    icon: <Icons.IconMagicWand className="size-4 text-purple" />,
                },
                {
                    type: 'item',
                    label: 'BAA generator (less fun)',
                    link: '/baa',
                    icon: <Icons.IconNotebook className="size-4 text-lilac" />,
                },
                {
                    type: 'item',
                    label: 'SOC 2',
                    link: '/handbook/company/security#soc-2',
                    icon: <Icons.IconShieldLock className="size-4 text-teal" />,
                },
                {
                    type: 'item',
                    label: 'HIPAA',
                    link: '/docs/privacy/hipaa-compliance',
                    icon: <Icons.IconStethoscope className="size-4 text-red" />,
                },
                {
                    type: 'item',
                    label: 'Subprocessors',
                    link: '/subprocessors',
                    icon: <Icons.IconServer className="size-4 text-orange" />,
                },
            ],
        },
    ]

    return [
        {
            trigger: (
                <>
                    <div className="flex items-center">
                        <Logo
                            layout="logomark"
                            variant="mono"
                            color="currentColor"
                            className="text-primary 2xs:hidden md:block size-8 md:size-6"
                            width="auto"
                        />
                        <Logo
                            variant="mono"
                            color="currentColor"
                            className="text-primary hidden 2xs:flex md:hidden w-auto h-5"
                            width="auto"
                        />
                    </div>
                </>
            ),
            items: [],
            link: '/',
            hideChevron: true,
        },
        ...(!isMobile ? mainNavItems : []),
    ]
}

import type { AppIconName } from 'components/OSIcons/AppIcon'

// Export Fun stuff items for use in sparks-joy page and menu
export const SparksJoyItems = {
    games: [
        {
            label: 'Hedgehog mode',
            link: '/sparks-joy/hedgehog-mode',
            iconName: 'hedgehog_mode' as AppIconName,
            customIcon: null,
        },
        {
            label: 'HogWars',
            link: '/sparks-joy/hogwars',
            iconName: 'hogwars' as AppIconName,
            customIcon: null,
        },
        {
            label: 'Dictator or tech bro?',
            link: '/sparks-joy/dictator-or-tech-bro',
            iconName: null,
            customIcon: <IconDictator />,
        },
    ],
    notGames: [
        {
            label: 'PostHog FM',
            link: '/fm',
            iconName: null,
            customIcon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path
                        fill="#000"
                        d="M21.5 5.75a.25.25 0 0 0-.25-.25H2.75a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h18.5a.25.25 0 0 0 .25-.25zM10 12a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m7 0a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0m1.5 0a3 3 0 0 1-3 3h-7a3 3 0 1 1 3-3c0 .547-.15 1.058-.405 1.5h1.81A3 3 0 0 1 12.5 12a3 3 0 1 1 6 0m4.5 6.25A1.75 1.75 0 0 1 21.25 20H2.75A1.75 1.75 0 0 1 1 18.25V5.75C1 4.784 1.784 4 2.75 4h18.5c.966 0 1.75.784 1.75 1.75z"
                    />
                </svg>
            ),
        },
        {
            label: 'Photobooth',
            link: '/photobooth',
            iconName: 'photobooth' as AppIconName,
            customIcon: null,
        },
        {
            label: 'HogPaint',
            link: '/paint',
            iconName: 'hogpaint' as AppIconName,
            customIcon: null,
        },
        {
            label: 'Coloring book.pdf',
            link: '/coloring-book.pdf',
            iconName: 'pdf' as AppIconName,
            customIcon: null,
        },
        {
            label: 'Post-It note training',
            link: '/academy',
            iconName: 'postIt' as AppIconName,
            customIcon: null,
        },
        {
            label: '404 page',
            link: '/404',
            iconName: 'blueScreen' as AppIconName,
            customIcon: null,
        },
    ],
}

// Helper hook to extract menu data for AddressBar select options
export function useMenuSelectOptions() {
    // Build the select groups
    const selectGroups = [
        {
            label: 'Product OS',
            items: [
                {
                    value: 'products',
                    label: 'Product OS',
                    icon: <Icons.IconApps className="size-4 text-red" />,
                },
            ],
        },
        {
            label: 'Pricing',
            items: [
                { value: 'pricing', label: 'Plans & usage-based pricing' },
                { value: 'pricing#calculator', label: 'Pricing calculator' },
                { value: 'pricing#addons', label: 'Add-ons' },
                { value: 'founder-stack', label: 'Founder stack' },
                { value: 'startups', label: 'Startups' },
            ],
        },
        {
            label: 'Docs',
            items: [{ value: 'docs', label: 'Documentation' }],
        },
        {
            label: 'Library',
            items: [
                { value: 'blog', label: 'Blog' },
                { value: 'product-engineers', label: 'Product engineers hub' },
                { value: 'founders', label: 'Founders hub' },
            ],
        },
        {
            label: 'Company',
            items: [
                { value: 'about', label: 'About' },
                { value: 'customers', label: 'Customers' },
                { value: 'handbook', label: 'Handbook' },
                { value: 'roadmap', label: 'Roadmap' },
                { value: 'changelog', label: 'Changelog' },
                { value: 'people', label: 'People' },
                { value: 'teams', label: 'Teams' },
                { value: 'careers', label: 'Careers' },
            ],
        },
        {
            label: 'More',
            items: [
                { value: 'sparks-joy', label: 'Things that spark joy', icon: <IconSparksJoy className="size-4" /> },
                { value: 'merch', label: 'Merch' },
                { value: 'deskhog', label: 'DeskHog' },
                {
                    value: 'trash',
                    label: 'Trash',
                    icon: <Icons.IconTrash className="size-4 text-gray dark:text-white" />,
                },
            ],
        },
    ]

    return selectGroups
}
