import { MenuType, MenuItemType } from 'components/RadixUI/MenuBar'
import React from 'react'
import { companyMenu, docsMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import SearchableProductMenu from './SearchableProductMenu'
import useProduct from '../../hooks/useProduct'
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
import { useAppSettings } from '../../context/App'
import { IconChevronDown } from '@posthog/icons'
import { useHedgehogMode } from 'components/HedgehogMode'
import { navigate } from 'gatsby'
import { useSmallTeamsMenuItems } from './SmallTeamsMenuItems'

interface DocsMenuItem {
    name: string
    url?: string
    icon?: string
    color?: string
    children?: DocsMenuItem[]
}

interface DocsMenu {
    children: DocsMenuItem[]
}

const getMenuIcon = (items: DocsMenuItem[], link: string, fallbackIcon: keyof typeof Icons, fallbackColor: string) => {
    const sourceItem = items.find((item) => item.url === link)
    const IconComponent = Icons[(sourceItem?.icon || fallbackIcon) as keyof typeof Icons]

    return IconComponent ? <IconComponent className={`size-4 text-${sourceItem?.color || fallbackColor}`} /> : undefined
}

// Add mobile destinations for docs menu items based on the product data
const addDocsMenuMobileDestinations = (items: any[], allProducts: any[]): any[] => {
    return items.map((item) => {
        // For docs product items, add mobile destination based on slug from product data
        if (item.type === 'submenu' && item.label && !item.mobileDestination) {
            // Find matching product by name to get its slug
            const product = allProducts.find((p) => p.name === item.label)
            if (product && product.slug) {
                return {
                    ...item,
                    mobileDestination: `/docs/${product.slug}`,
                    items: item.items, // Keep items for desktop
                }
            }
        }

        // Recursively process nested items
        if (item.items && Array.isArray(item.items)) {
            return {
                ...item,
                items: addDocsMenuMobileDestinations(item.items, allProducts),
            }
        }

        return item
    })
}

// Recursively group items under section dividers at any level
const groupBySectionDividers = (items: DocsMenuItem[]): any[] => {
    const processedItems: any[] = []
    let currentSection: DocsMenuItem | null = null
    let currentSectionItems: any[] = []

    for (const item of items) {
        // Handle divider type: add separator for menu, skip otherwise
        if ((item as any).type === 'divider') {
            if (currentSection) {
                currentSectionItems.push({ type: 'separator' as const })
            } else {
                processedItems.push({ type: 'separator' as const })
            }
            continue
        }
        if (!item.name) continue

        // If this is a section header (only has name)
        if (!item.url && !item.children && !item.icon && !item.color) {
            // If we have a previous section, add it to processed items
            if (currentSection) {
                processedItems.push({
                    type: 'submenu' as const,
                    label: currentSection.name,
                    items: currentSectionItems,
                })
            }
            // Start a new section
            currentSection = item
            currentSectionItems = []
        } else {
            // Process the item recursively
            const processedItem = processMenuItemWithGrouping(item)
            if (processedItem) {
                if (currentSection) {
                    currentSectionItems.push(processedItem)
                } else {
                    processedItems.push(processedItem)
                }
            }
        }
    }

    // Add the last section if it exists
    if (currentSection && currentSectionItems.length > 0) {
        processedItems.push({
            type: 'submenu' as const,
            label: currentSection.name,
            items: currentSectionItems,
        })
    }

    return processedItems
}

const processMenuItemWithGrouping = (item: DocsMenuItem): any => {
    // Handle divider type: add separator for menu, skip otherwise
    if ((item as any).type === 'divider') {
        return { type: 'separator' as const }
    }
    if (!item.name) return null

    // Special case: If this is the Product OS menu, filter out 'Docs' and 'Overview' from its children
    let children = item.children
    if (item.name === 'Product OS' && Array.isArray(children)) {
        children = children.filter((child) => child.name !== 'Docs' && child.name !== 'Overview')
    }

    // If the item has children, process them recursively with grouping
    if (children) {
        const baseItem: any = {
            type: 'submenu' as const,
            label: item.name,
        }
        if (item.url) {
            baseItem.link = item.url
        }
        // Always set icon and color for submenus if present
        if (item.icon) {
            const IconComponent = Icons[item.icon as keyof typeof Icons]
            if (IconComponent) {
                baseItem.icon = <IconComponent className={`text-${item.color || 'gray'} size-4`} />
            }
        }
        let grouped = groupBySectionDividers(children)
        // FLATTEN: If the first child is a submenu with the same label, bring its children up one level
        if (grouped.length > 0 && grouped[0].type === 'submenu' && grouped[0].label === item.name) {
            grouped = [...grouped[0].items, ...grouped.slice(1)]
        } else if (grouped.length === 1 && grouped[0].type === 'submenu' && Array.isArray(grouped[0].items)) {
            grouped = grouped[0].items
        }
        baseItem.items = grouped
        return baseItem
    }

    // If the item has a URL, it's a regular menu item
    if (item.url) {
        const baseItem: any = {
            type: 'item' as const,
            label: item.name,
            link: item.url,
        }
        if (item.icon) {
            const IconComponent = Icons[item.icon as keyof typeof Icons]
            if (IconComponent) {
                baseItem.icon = <IconComponent className={`text-${item.color || 'gray'} size-4`} />
            }
        }
        return baseItem
    }

    // If the item only has a name, it's a section divider (handled in grouping)
    return null
}

type DocsSubGroup = {
    label: string
    items: string[]
    icon?: keyof typeof Icons
    color?: string
}

type DocsGroup = {
    label: string
    items: (string | DocsSubGroup)[]
    overflow?: string
    collapse?: boolean
    catchAll?: boolean
    icon?: keyof typeof Icons
    color?: string
}

const DOCS_GROUPS: DocsGroup[] = [
    { label: 'Get started', items: ['Install PostHog', 'SDKs & frameworks', 'Self-driving'] },
    { label: 'Products', items: ['PostHog Web', 'PostHog Desktop', 'PostHog Slack', 'PostHog MCP', 'PostHog CLI'] },
    {
        label: 'Tools',
        items: [
            {
                label: 'Analytics',
                icon: 'IconGraph',
                color: 'blue',
                items: [
                    'Product Analytics',
                    'Web Analytics',
                    'Customer Analytics',
                    'Revenue Analytics',
                    'MCP Analytics',
                ],
            },
            'Session Replay',
            'AI Observability',
            'Error Tracking',
        ],
        overflow: 'More tools',
        icon: 'IconApps',
        color: 'blue',
    },
    { label: 'Context', items: ['Data Warehouse', 'Data pipelines', 'Semantic layer'] },
    {
        label: 'Reference',
        collapse: true,
        icon: 'IconBook',
        color: 'lilac',
        items: [
            'API',
            'New to PostHog',
            'AI engineering',
            'Toolbar & features',
            'Self-host & deploy',
            'Billing',
            'Privacy & GDPR',
            'How PostHog works',
            'Glossary',
        ],
    },
]

export const getDocsMenuItems = (): MenuItemType[] => {
    const items = groupBySectionDividers((docsMenu as DocsMenu).children)
        // Remove any item (submenu or section divider) with label 'Docs'
        .filter((item) => !(item.type === 'submenu' && item.label === 'Docs'))
        // Drop nav-derived separators; grouping below supplies its own
        .filter((item) => item.type !== 'separator' && item.label)

    const byLabel = new Map<string, MenuItemType>(items.map((item) => [item.label as string, item]))
    const explicitlyGrouped = new Set(
        DOCS_GROUPS.flatMap((group) => group.items).flatMap((entry) =>
            typeof entry === 'string' ? entry : entry.items
        )
    )
    const byLabelAsc = (a: MenuItemType, b: MenuItemType) =>
        (a.label as string).localeCompare(b.label as string, undefined, { sensitivity: 'base' })

    const iconFor = (source: { icon?: keyof typeof Icons; color?: string }) => {
        const IconComponent = source.icon && Icons[source.icon]
        return IconComponent ? <IconComponent className={`text-${source.color || 'gray'} size-4`} /> : undefined
    }

    const resolve = (entry: string | DocsSubGroup): MenuItemType | undefined => {
        if (typeof entry === 'string') return byLabel.get(entry)
        const children = entry.items.map((label) => byLabel.get(label)).filter(Boolean) as MenuItemType[]
        if (children.length === 0) return undefined
        return { type: 'submenu' as const, label: entry.label, icon: iconFor(entry), items: children }
    }

    const grouped: MenuItemType[] = []

    const unclaimed = () => items.filter((item) => !explicitlyGrouped.has(item.label as string)).sort(byLabelAsc)

    DOCS_GROUPS.forEach((group) => {
        const named = group.catchAll ? unclaimed() : (group.items.map(resolve).filter(Boolean) as MenuItemType[])

        if (group.collapse) {
            if (named.length === 0) return
            if (grouped.length > 0) grouped.push({ type: 'separator' as const })
            grouped.push({ type: 'submenu' as const, label: group.label, icon: iconFor(group), items: named })
            return
        }

        const groupItems = [...named]

        if (group.overflow) {
            const rest = unclaimed()
            if (rest.length > 0) {
                groupItems.push({
                    type: 'submenu' as const,
                    label: group.overflow,
                    icon: iconFor(group),
                    items: rest,
                })
            }
        }

        if (groupItems.length === 0) return

        if (grouped.length > 0) grouped.push({ type: 'separator' as const })
        grouped.push({ type: 'label' as const, label: group.label })
        grouped.push(...groupItems)
    })

    // Icons stay on the top level only; nested levels are noisy and inconsistently sourced.
    const stripIcons = (menuItems: MenuItemType[]): MenuItemType[] =>
        menuItems.map(({ icon, ...item }) => (item.items ? { ...item, items: stripIcons(item.items) } : item))

    return grouped.map((item) => (item.items ? { ...item, items: stripIcons(item.items) } : item))
}

const mergedDocsMenu = (allProducts: any[]) => {
    const docsItems = getDocsMenuItems()
    const itemsWithMobileDestinations = addDocsMenuMobileDestinations(docsItems, allProducts)
    return [...DocsItemsStart, ...itemsWithMobileDestinations, ...DocsItemsEnd]
}

// Build Products menu items
const buildProductsMenuItems = (allProducts: any[]) => {
    const items: any[] = [
        {
            type: 'item',
            label: 'PostHog Desktop',
            link: '/desktop',
            icon: <Icons.IconCoffee className="size-4 text-brown" />,
        },
        {
            type: 'item',
            label: 'PostHog Web',
            link: '/products',
            icon: <Icons.IconBolt className="size-4 text-red" />,
        },
        {
            type: 'item',
            label: 'PostHog Slack',
            link: '/slack',
            icon: <Icons.IconAtSign className="size-4 text-sky-blue" />,
        },
        {
            type: 'item',
            label: 'PostHog MCP',
            link: '/mcp',
            icon: <Icons.IconPlug className="size-4 text-gray" />,
        },
        {
            type: 'item',
            label: 'PostHog CLI',
            link: '/docs/cli',
            icon: <Icons.IconTerminal className="size-4 text-green" />,
        },
        {
            type: 'item',
            label: 'Context Warehouse',
            link: '/context-warehouse',
            icon: <Icons.IconDatabase className="size-4 text-blue" />,
        },
        {
            type: 'separator',
        },
        {
            type: 'item',
            label: 'PostHog Research',
            link: '/research',
            icon: <Icons.IconBrain className="size-4 text-purple" />,
        },
        {
            type: 'separator',
        },
        {
            type: 'submenu' as const,
            label: 'Browse tools',
            link: '/products',
            items: <SearchableProductMenu products={allProducts} />,
            icon: <Icons.IconApps className="size-4 text-red" />,
            mobileDestination: '/products', // Desktop shows the searchable submenu; mobile links to the tools list
        },
    ]

    return items
}

export function useMenuData(): MenuType[] {
    const smallTeamsMenuItems = useSmallTeamsMenuItems()
    const allProducts = useProduct() as any[]
    const { isMobile } = useAppSettings()
    const [hedgehogModeEnabled, setHedgehogModeEnabled] = useHedgehogMode()

    // Define main navigation items (excluding logo menu)
    const mainNavItems: MenuType[] = [
        {
            trigger: 'Products',
            items: buildProductsMenuItems(allProducts),
        },
        {
            trigger: 'Pricing',
            link: '/pricing',
            items: [],
            hideChevron: true,
        },
        {
            trigger: 'Docs',
            // The docs tree is too deep to browse inside a hamburger; mobile goes to the homepage instead
            mobileLink: '/docs',
            items: mergedDocsMenu(allProducts),
        },
        {
            trigger: 'Community',
            items: [
                {
                    type: 'item',
                    label: 'Newsletter',
                    link: '/newsletter',
                    icon: <Icons.IconNewspaper className="size-4 text-orange" />,
                },
                {
                    type: 'item',
                    label: 'Blog',
                    link: '/blog',
                    icon: <Icons.IconPencil className="size-4 text-yellow" />,
                },
                {
                    type: 'item',
                    label: 'Founders hub',
                    link: '/founders',
                    icon: <Icons.IconRocket className="size-4 text-purple" />,
                },
                {
                    type: 'item' as const,
                    label: 'Forums',
                    link: '/questions',
                    icon: <Icons.IconMessage className="size-4 text-green" />,
                },
                { type: 'separator' },
                {
                    type: 'item',
                    label: 'Startups',
                    link: '/startups',
                    icon: <Icons.IconPresent className="size-4 text-purple" />,
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
            ],
        },
        {
            trigger: 'Company',
            items: [
                {
                    type: 'item',
                    label: 'About',
                    link: '/about',
                    icon: getMenuIcon(companyMenu.children, '/about', 'IconLogomark', 'gray'),
                },
                {
                    type: 'item',
                    label: 'Customers',
                    link: '/customers',
                    icon: getMenuIcon(companyMenu.children, '/customers', 'IconPerson', 'yellow'),
                },
                {
                    type: 'item',
                    label: 'Handbook',
                    link: '/handbook',
                    icon: getMenuIcon(companyMenu.children, '/handbook', 'IconBook', 'seagreen'),
                },
                {
                    type: 'item',
                    label: 'Roadmap',
                    link: '/roadmap',
                    icon: getMenuIcon(companyMenu.children, '/roadmap', 'IconMap', 'orange'),
                },
                {
                    type: 'item',
                    label: 'Changelog',
                    link: '/changelog',
                    icon: getMenuIcon(companyMenu.children, '/changelog', 'IconCalendar', 'red'),
                },
                {
                    type: 'item',
                    label: 'Media',
                    link: '/media',
                    icon: getMenuIcon(companyMenu.children, '/media', 'IconNewspaper', 'salmon'),
                },
                {
                    type: 'separator',
                },
                {
                    type: 'item',
                    label: 'People',
                    link: '/people',
                    icon: getMenuIcon(companyMenu.children, '/people', 'IconPeople', 'blue'),
                },
                {
                    type: 'submenu',
                    label: 'Small teams',
                    link: '/small-teams',
                    items: smallTeamsMenuItems,
                    icon: getMenuIcon(companyMenu.children, '/small-teams', 'IconShieldPeople', 'teal'),
                },
                {
                    type: 'item',
                    label: 'Careers',
                    link: '/careers',
                    icon: getMenuIcon(companyMenu.children, '/careers', 'IconLaptop', 'purple'),
                },
                {
                    type: 'item',
                    label: 'Partnerships',
                    link: '/partnerships',
                    icon: getMenuIcon(companyMenu.children, '/partnerships', 'IconPuzzle', 'lilac'),
                },
                {
                    type: 'separator',
                },
                {
                    type: 'submenu',
                    label: 'Like and subscribe',
                    icon: <Icons.IconMegaphone className="size-4 text-orange" />,
                    mobileDestination: false, // Omit from mobile menu
                    items: [
                        {
                            type: 'item',
                            label: 'X',
                            link: 'https://x.com/posthog',
                            icon: <IconXNotTwitter className="size-4 text-black dark:text-white" />,
                            external: true,
                        },
                        {
                            type: 'item',
                            label: 'LinkedIn',
                            link: 'https://www.linkedin.com/company/posthog',
                            icon: <IconLinkedIn className="size-4" />,
                            external: true,
                        },
                        {
                            type: 'item',
                            label: 'Substack',
                            link: 'https://newsletter.posthog.com',
                            icon: <IconSubstack className="size-4" />,
                            external: true,
                        },
                        {
                            type: 'item',
                            label: 'YouTube',
                            link: 'https://www.youtube.com/@posthog',
                            icon: <IconYouTube className="size-4" />,
                            external: true,
                        },
                        {
                            type: 'item',
                            label: 'Instagram',
                            link: 'https://www.instagram.com/teamposthog',
                            icon: <IconInstagram className="size-4" />,
                            external: true,
                        },
                        {
                            type: 'item',
                            label: 'GitHub',
                            link: 'https://github.com/posthog',
                            icon: <IconGithub className="size-4" />,
                            external: true,
                        },
                    ],
                },
            ],
        },
        {
            trigger: (
                <>
                    <span>More</span>
                </>
            ),
            items: [
                {
                    type: 'item',
                    label: 'DeskHog',
                    link: '/deskhog',
                    icon: <Icons.IconDeskHog className="size-4 text-seagreen" />,
                },
                {
                    type: 'submenu',
                    label: 'Things that spark joy',
                    icon: <IconSparksJoy className="size-4" />,
                    items: [
                        {
                            type: 'item',
                            onClick: () => setHedgehogModeEnabled(!hedgehogModeEnabled),
                            node: (
                                <span className="px-2.5 flex w-full justify-between items-center gap-2">
                                    <span>Hedgehog mode</span>
                                    {/* Presentational toggle — the whole row is the clickable menu item */}
                                    <span className="relative inline-flex items-center justify-center h-2 w-8 flex-shrink-0">
                                        <span
                                            aria-hidden
                                            className="pointer-events-none absolute w-full h-full rounded-md bg-[#c4c4c4] dark:bg-[#5A5A5A]"
                                        />
                                        <span
                                            aria-hidden
                                            className={`pointer-events-none absolute left-0 inline-block h-4 w-4 rounded-full transition-transform ease-in-out duration-200 ${
                                                hedgehogModeEnabled
                                                    ? 'translate-x-5 bg-teal'
                                                    : 'translate-x-0 bg-[#555] dark:bg-[#999]'
                                            }`}
                                        />
                                    </span>
                                </span>
                            ),
                        },
                        {
                            type: 'separator',
                        },
                        {
                            type: 'item',
                            label: 'Browse all',
                            link: '/sparks-joy',
                        },
                        {
                            type: 'separator',
                        },
                        {
                            type: 'item',
                            label: 'Games',
                            disabled: true,
                        },
                        // Games section
                        ...SparksJoyItems.games.map((item) => ({
                            type: 'item' as const,
                            label: item.label,
                            link: item.link,
                        })),
                        {
                            type: 'item',
                            label: 'Sorta like games',
                            disabled: true,
                        },
                        // Not games section
                        ...SparksJoyItems.notGames.map((item) => ({
                            type: 'item' as const,
                            label: item.label,
                            link: item.link,
                        })),
                    ],
                },
                // {
                //     type: 'item',
                //     label: 'Video library',
                //     link: '/videos',
                //     icon: <Icons.IconFolderOpenFilled className="size-4 text-orange" />,
                // },
                {
                    type: 'submenu',
                    label: 'Sexy legal documents',
                    icon: <Icons.IconTie className="size-4 text-brown dark:text-creamsicle-dark" />,
                    items: [
                        {
                            type: 'item',
                            label: 'Terms',
                            link: '/terms',
                        },
                        {
                            type: 'item',
                            label: 'Privacy',
                            link: '/privacy',
                        },
                        {
                            type: 'item',
                            label: "DPA generator (it's fun!)",
                            link: '/dpa',
                        },
                        {
                            type: 'item',
                            label: 'BAA generator (less fun)',
                            link: '/baa',
                        },
                        {
                            type: 'item',
                            label: 'SOC ✌️',
                            link: '/handbook/company/security#soc-2',
                        },
                        {
                            type: 'item',
                            label: 'HIPAA',
                            link: '/docs/privacy/hipaa-compliance',
                        },
                        {
                            type: 'item',
                            label: 'Subprocessors',
                            link: '/subprocessors',
                        },
                    ],
                },
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
                    label: 'Keyboard shortcuts',
                    link: '/kbd',
                    icon: <Icons.IconKeyboard className="size-4 text-primary" />,
                    shortcut: ['.'],
                },
                {
                    type: 'item',
                    label: 'System status',
                    link: 'https://status.posthog.com',
                    external: true,
                    icon: <Icons.IconPulse className="size-4 text-red" />,
                },
            ],
        },
    ]

    // Define base logo menu items (system items)
    const baseLogoMenuItems = [
        {
            type: 'item' as const,
            label: 'About PostHog',
            link: '/about',
        },
        {
            type: 'item' as const,
            label: 'About this website',
            link: '/credits',
        },
        {
            type: 'item' as const,
            label: 'Display options',
            onClick: () => {
                navigate('/display-options', { state: { newWindow: true } })
            },
            shortcut: [','],
        },
    ]

    // Process main nav items for mobile menu
    const processMobileNavItems = (): MenuItemType[] => {
        const mobileItems: MenuItemType[] = []

        mainNavItems.forEach((menu) => {
            if (menu.link) {
                mobileItems.push({
                    type: 'item' as const,
                    label: typeof menu.trigger === 'string' ? menu.trigger : 'Menu',
                    link: menu.link,
                })
            }
            // If menu has mobileLink, convert to simple item
            else if (menu.mobileLink) {
                mobileItems.push({
                    type: 'item' as const,
                    label: typeof menu.trigger === 'string' ? menu.trigger : 'Menu',
                    link: menu.mobileLink,
                })
            } else {
                // Process items and filter out those with mobileDestination === false
                const filteredItems: MenuItemType[] = []
                const menuItemsCopy = [...menu.items]

                // Apply mobile destinations for docs menu if this is the Docs menu
                const itemsToProcess =
                    typeof menu.trigger === 'string' && menu.trigger === 'Docs'
                        ? addDocsMenuMobileDestinations(menuItemsCopy, allProducts)
                        : menuItemsCopy

                for (let i = 0; i < itemsToProcess.length; i++) {
                    const item = itemsToProcess[i]

                    // Skip items marked for mobile omission
                    if (item.mobileDestination === false) {
                        // Remove preceding separator if it would be orphaned
                        if (
                            filteredItems.length > 0 &&
                            filteredItems[filteredItems.length - 1].type === 'separator' &&
                            (i === itemsToProcess.length - 1 || itemsToProcess[i + 1].type === 'separator')
                        ) {
                            filteredItems.pop()
                        }
                        continue
                    }

                    // Convert submenus with mobileDestination to simple items
                    if (item.type === 'submenu' && item.mobileDestination) {
                        filteredItems.push({
                            ...item,
                            type: 'item' as const,
                            link: item.mobileDestination,
                            items: undefined,
                        })
                    }
                    // Convert submenus with links to simple items
                    else if (item.type === 'submenu' && item.link) {
                        filteredItems.push({
                            ...item,
                            type: 'item' as const,
                            items: undefined,
                        })
                    } else {
                        filteredItems.push(item)
                    }
                }

                const processedItems = filteredItems

                // Only add menu if it has items after filtering
                if (processedItems.length > 0) {
                    mobileItems.push({
                        type: 'submenu' as const,
                        label: typeof menu.trigger === 'string' ? menu.trigger : 'More',
                        items: processedItems,
                    })
                }
            }
        })

        return mobileItems
    }

    // On mobile, include main navigation items in the logo menu
    const logoMenuItems = isMobile
        ? [
              {
                  type: 'item' as const,
                  label: 'Home',
                  link: '/',
              },
              { type: 'separator' as const },
              // Main navigation items processed for mobile
              ...processMobileNavItems(),
              { type: 'separator' as const },
              // System items
              ...baseLogoMenuItems,
          ]
        : [
              {
                  type: 'item' as const,
                  label: 'Home',
                  link: '/',
              },
              // Desktop: only show system items
              ...baseLogoMenuItems,
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
                        <IconChevronDown className="size-6 inline-block md:hidden text-muted" />
                    </div>
                </>
            ),
            items: logoMenuItems,
            mobileLink: undefined,
            hideChevron: true,
        },
        // On desktop, show main navigation items
        ...(!isMobile ? mainNavItems : []),
    ]
}

export const DocsItemsStart = [
    {
        type: 'item' as const,
        label: 'Overview',
        link: '/docs',
        icon: <Icons.IconHome className="size-4 text-purple" />,
    },
    {
        type: 'separator' as const,
    },
]

export const DocsItemsEnd = [
    { type: 'separator' as const },
    {
        type: 'item' as const,
        label: 'Tutorials',
        link: '/tutorials',
        icon: <Icons.IconGraduationCap className="size-4 text-purple" />,
    },
]

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
        {
            label: 'BrickHog',
            link: '/sparks-joy/brickhog',
            iconName: 'games' as AppIconName,
            customIcon: null,
        },
        {
            label: 'HogPatch: The Game',
            link: '/sparks-joy/hogpatch',
            iconName: 'games' as AppIconName,
            customIcon: null,
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
            label: 'Context warehouse',
            items: [
                {
                    value: 'products',
                    label: 'Context warehouse',
                    icon: <Icons.IconApps className="size-4 text-red" />,
                },
            ],
        },
        {
            label: 'Pricing',
            items: [
                { value: 'pricing', label: 'Usage-based pricing' },
                { value: 'platform-packages', label: 'Platform packages' },
                { value: 'sales', label: 'How we do sales' },
                { value: 'startups', label: 'Startups' },
            ],
        },
        {
            label: 'Docs',
            items: [{ value: 'docs', label: 'Documentation' }],
        },
        {
            label: 'Library',
            items: [{ value: 'blog', label: 'Blog' }],
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
