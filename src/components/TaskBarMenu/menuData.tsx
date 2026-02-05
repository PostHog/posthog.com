import { MenuType, MenuItemType } from 'components/RadixUI/MenuBar'
import React from 'react'
import { docsMenu, handbookSidebar } from '../../navs'
import * as Icons from '@posthog/icons'
import { useSmallTeamsMenuItems } from './SmallTeamsMenuItems'
import Logo from 'components/Logo'
import { APP_COUNT } from '../../constants'
import SearchableProductMenu from './SearchableProductMenu'
import {
    categoryOrder,
    categoryDisplayNames,
    categoryIcons,
    buildCategoryMenuItems,
    buildProductMenuItems,
    popularProducts,
    newestProducts,
} from '../../constants/productNavigation'
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
import { useApp } from '../../context/App'
import { IconChevronDown } from '@posthog/icons'
import { navigate } from 'gatsby'

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

const getDocsMenuItems = () => {
    let items = groupBySectionDividers((docsMenu as DocsMenu).children)

    // Remove any item (submenu or section divider) with label 'Docs'
    items = items.filter((item) => {
        // Remove if submenu with label 'Docs'
        if (item.type === 'submenu' && item.label === 'Docs') return false
        return true
    })

    return items
}

const mergedDocsMenu = (allProducts: any[]) => {
    const docsItems = getDocsMenuItems()
    const itemsWithMobileDestinations = addDocsMenuMobileDestinations(docsItems, allProducts)
    return [...DocsItemsStart, ...itemsWithMobileDestinations, ...DocsItemsEnd]
}

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
    const smallTeamsMenuItems = useSmallTeamsMenuItems()
    const allProducts = useProduct() as any[]
    const { animateClosingAllWindows, windows, setScreensaverPreviewActive, isMobile } = useApp()

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
            items: mergedDocsMenu(allProducts),
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
                    label: 'customers.mdx',
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
                    type: 'submenu',
                    label: 'Small teams',
                    items: smallTeamsMenuItems,
                },
                {
                    type: 'item',
                    label: 'Careers',
                    link: '/careers',
                },
                {
                    type: 'separator',
                },
                {
                    type: 'submenu',
                    label: 'Like and subscribe',
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
            // If menu has mobileLink, convert to simple item
            if (menu.mobileLink) {
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
                  label: 'home.mdx',
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
              // Desktop: only show system items
              ...baseLogoMenuItems,
              { type: 'separator' as const },
              {
                  type: 'item' as const,
                  label: 'Start screensaver',
                  onClick: () => {
                      setScreensaverPreviewActive(true)
                  },
                  shortcut: ['Shift', 'Z'],
              },
              {
                  type: 'item' as const,
                  label: 'Close all windows',
                  disabled: windows.length < 1,
                  onClick: () => {
                      animateClosingAllWindows()
                  },
                  shortcut: ['Shift', 'X'],
              },
          ]

    return [
        {
            trigger: (
                <>
                    <div className="flex items-center">
                        <Logo noText className="size-8 2xs:hidden md:block md:size-6" fill="primary" classic />
                        <Logo className="hidden 2xs:flex md:hidden h-5 w-auto" fill="primary" classic />
                        <IconChevronDown className="size-6 inline-block md:hidden text-muted" />
                    </div>
                </>
            ),
            items: logoMenuItems,
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
        icon: <Icons.IconBook className="size-4 text-purple" />,
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
        icon: <Icons.IconBook className="size-4 text-purple" />,
    },
    {
        type: 'item' as const,
        label: 'Dashboard templates',
        link: '/templates',
        icon: <Icons.IconDashboard className="size-4 text-blue" />,
    },
    {
        type: 'item' as const,
        label: 'Tracks',
        link: '/tracks',
        icon: <Icons.IconGraduationCap className="size-4 text-black" />,
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
