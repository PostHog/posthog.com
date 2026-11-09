import { MenuType, MenuItemType } from 'components/RadixUI/MenuBar'
import React from 'react'
import { companyMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import { Logo } from '@posthog/brand/logo'
import { taskbarProducts } from './taskbarProducts'
import {
    IconXNotTwitter,
    IconSubstack,
    IconYouTube,
    IconLinkedIn,
    IconGithub,
    IconInstagram,
    IconSparksJoy,
    IconDiscord,
} from 'components/OSIcons'
import { useAppSettings } from '../../context/App'
import { IconChevronDown } from '@posthog/icons'
import { navigate } from 'gatsby'
import { PRODUCT_CATEGORIES, buildProductMenuItems } from 'constants/productNavigation'
import { TWIG_URL } from '../../constants'

interface DocsMenuItem {
    name: string
    url?: string
    icon?: string
    color?: string
    children?: DocsMenuItem[]
}

const getMenuIcon = (items: DocsMenuItem[], link: string, fallbackIcon: keyof typeof Icons, fallbackColor: string) => {
    const sourceItem = items.find((item) => item.url === link)
    const IconComponent = Icons[(sourceItem?.icon || fallbackIcon) as keyof typeof Icons]

    return IconComponent ? <IconComponent className={`size-4 text-${sourceItem?.color || fallbackColor}`} /> : undefined
}

// Static Docs menu. Edit this list directly when a docs section moves or a new one is added.
const docsMenuItems: MenuItemType[] = [
    { type: 'item', label: 'Overview', link: '/docs', icon: <Icons.IconHome className="size-4 text-purple" /> },
    { type: 'separator' },
    { type: 'label', label: 'Get started' },
    {
        type: 'item',
        label: 'Install PostHog',
        link: '/docs/getting-started/install',
        icon: <Icons.IconWrench className="size-4 text-salmon" />,
    },
    {
        type: 'item',
        label: 'SDKs & frameworks',
        link: '/docs/libraries',
        icon: <Icons.IconBox className="size-4 text-blue" />,
    },
    {
        type: 'item',
        label: 'Self-driving',
        link: '/docs/self-driving',
        icon: <Icons.IconFlag className="size-4 text-red" />,
    },
    { type: 'separator' },
    { type: 'label', label: 'Products' },
    {
        type: 'submenu',
        label: 'Analytics',
        icon: <Icons.IconGraph className="size-4 text-blue" />,
        items: [
            { type: 'item', label: 'Product Analytics', link: '/docs/product-analytics' },
            { type: 'item', label: 'Web Analytics', link: '/docs/web-analytics' },
            { type: 'item', label: 'Customer Analytics', link: '/docs/customer-analytics' },
            { type: 'item', label: 'Revenue Analytics', link: '/docs/revenue-analytics' },
            { type: 'item', label: 'MCP Analytics', link: '/docs/mcp-analytics' },
        ],
    },
    {
        type: 'item',
        label: 'Session Replay',
        link: '/docs/session-replay',
        icon: <Icons.IconRewindPlay className="size-4 text-yellow" />,
    },
    {
        type: 'item',
        label: 'AI Observability',
        link: '/docs/ai-observability',
        icon: <Icons.IconLlmAnalytics className="size-4 text-[#681291]" />,
    },
    {
        type: 'item',
        label: 'Error Tracking',
        link: '/docs/error-tracking',
        icon: <Icons.IconWarning className="size-4 text-orange" />,
    },
    {
        type: 'submenu',
        label: 'More products',
        icon: <Icons.IconApps className="size-4 text-blue" />,
        items: [
            { type: 'item', label: 'Application metrics', link: '/docs/metrics' },
            { type: 'item', label: 'Business Knowledge', link: '/docs/business-knowledge' },
            { type: 'item', label: 'Distributed tracing', link: '/docs/distributed-tracing' },
            { type: 'item', label: 'Endpoints', link: '/docs/endpoints' },
            { type: 'item', label: 'Experiments', link: '/docs/experiments' },
            { type: 'item', label: 'Feature Flags', link: '/docs/feature-flags' },
            { type: 'item', label: 'Logs', link: '/docs/logs' },
            { type: 'item', label: 'PostHog AI', link: '/docs/posthog-ai' },
            { type: 'item', label: 'Replay Vision', link: '/docs/replay-vision' },
            { type: 'item', label: 'Skills', link: '/docs/skills' },
            { type: 'item', label: 'Support', link: '/docs/support' },
            { type: 'item', label: 'Surveys', link: '/docs/surveys' },
            { type: 'item', label: 'Workflows', link: '/docs/workflows' },
        ],
    },
    { type: 'separator' },
    { type: 'label', label: 'Apps' },
    {
        type: 'item',
        label: 'PostHog Web',
        link: '/docs/self-driving/web',
        icon: <Icons.IconGlobe className="size-4 text-blue" />,
    },
    {
        type: 'item',
        label: 'PostHog Slack',
        link: '/docs/slack',
        icon: <Icons.IconAtSign className="size-4 text-purple" />,
    },
    {
        type: 'item',
        label: 'PostHog MCP',
        link: '/docs/model-context-protocol',
        icon: <Icons.IconPlug className="size-4 text-purple" />,
    },
    {
        type: 'item',
        label: 'PostHog CLI',
        link: '/docs/cli',
        icon: <Icons.IconTerminal className="size-4 text-seagreen" />,
    },
    { type: 'separator' },
    { type: 'label', label: 'Context' },
    {
        type: 'item',
        label: 'Data Warehouse',
        link: '/docs/data-warehouse',
        icon: <Icons.IconDatabase className="size-4 text-lilac" />,
    },
    {
        type: 'item',
        label: 'Data pipelines',
        link: '/docs/data-pipelines',
        icon: <Icons.IconPlug className="size-4 text-sky-blue" />,
    },
    {
        type: 'item',
        label: 'Semantic layer',
        link: '/docs/semantic-layer',
        icon: <Icons.IconListCheck className="size-4 text-purple" />,
    },
    { type: 'separator' },
    {
        type: 'submenu',
        label: 'Reference',
        icon: <Icons.IconBook className="size-4 text-lilac" />,
        items: [
            { type: 'item', label: 'API', link: '/docs/api' },
            { type: 'item', label: 'New to PostHog', link: '/docs/new-to-posthog/getting-hogpilled' },
            { type: 'item', label: 'AI engineering', link: '/docs/ai-engineering' },
            { type: 'item', label: 'Toolbar & features', link: '/docs/toolbar' },
            { type: 'item', label: 'Self-host & deploy', link: '/docs/self-host' },
            { type: 'item', label: 'Billing', link: '/docs/billing/estimating-usage-costs' },
            { type: 'item', label: 'Privacy & GDPR', link: '/docs/privacy' },
            { type: 'item', label: 'How PostHog works', link: '/docs/how-posthog-works' },
            { type: 'item', label: 'Glossary', link: '/docs/glossary' },
        ],
    },
    { type: 'separator' },
    {
        type: 'item',
        label: 'Playground',
        link: TWIG_URL,
        external: true,
        icon: <Icons.IconPlay className="size-4 text-orange" />,
    },
    {
        type: 'item',
        label: 'Pocket guides',
        link: '/pocket-guides',
        icon: <Icons.IconCompass className="size-4 text-blue" />,
    },
    {
        type: 'item',
        label: 'Tutorials',
        link: '/tutorials',
        icon: <Icons.IconGraduationCap className="size-4 text-purple" />,
    },
    { type: 'item', label: 'Templates', link: '/templates', icon: <Icons.IconMagic className="size-4 text-green" /> },
]

const docsProductIconFallbacks = {
    'business-knowledge': { Icon: Icons.IconBook, color: 'purple' },
    'customer-analytics': { Icon: Icons.IconPeople, color: 'blue' },
    'revenue-analytics': { Icon: Icons.IconPiggyBank, color: 'green' },
    skills: { Icon: Icons.IconMagic, color: 'purple' },
}

const docsProductHandleOverrides = { 'posthog-ai': 'posthog_ai' }

const addDocsProductIcons = (items: MenuItemType[], allProducts: any[]): MenuItemType[] =>
    items.map((item) => {
        if (item.type !== 'submenu' || !['Analytics', 'More products'].includes(item.label)) return item

        return {
            ...item,
            items: item.items?.map((child) => {
                const slug = child.link?.replace(/^\/docs\//, '')
                const product = allProducts.find(
                    (product) =>
                        product.handle ===
                            docsProductHandleOverrides[slug as keyof typeof docsProductHandleOverrides] ||
                        product.docsSlug === slug ||
                        product.slug?.replace(/^docs\//, '') === slug
                )
                const fallback = docsProductIconFallbacks[slug as keyof typeof docsProductIconFallbacks]
                const Icon = product?.Icon || fallback?.Icon

                return Icon
                    ? {
                          ...child,
                          icon: <Icon className={`size-4 text-${product?.color || fallback?.color || 'gray'}`} />,
                      }
                    : child
            }),
        }
    })

// Build Products menu items
const buildProductsMenuItems = (allProducts: any[]) =>
    PRODUCT_CATEGORIES.flatMap(({ label, handles }, index) => [
        ...(index > 0 ? [{ type: 'separator' }] : []),
        { type: 'label', label },
        ...buildProductMenuItems(handles, allProducts),
    ])

export function useMenuData(): MenuType[] {
    const { isMobile } = useAppSettings()

    // Define main navigation items (excluding logo menu)
    const mainNavItems: MenuType[] = [
        {
            trigger: 'Products',
            items: [
                ...buildProductsMenuItems(taskbarProducts),
                { type: 'separator' },
                { type: 'label', label: 'Platform' },
                {
                    type: 'item',
                    label: 'Self-driving',
                    link: '/self-driving',
                    icon: <Icons.IconFlag className="size-4 text-red" />,
                },
                {
                    type: 'item',
                    label: 'PostHog AI',
                    link: '/ai',
                    icon: <Icons.IconAI className="size-4 text-lilac" />,
                },
                {
                    type: 'item',
                    label: 'PostHog MCP',
                    link: '/mcp',
                    icon: <Icons.IconPlug className="size-4 text-gray" />,
                },
                {
                    type: 'item',
                    label: 'PostHog in Slack',
                    link: '/slack',
                    icon: <Icons.IconAtSign className="size-4 text-sky-blue" />,
                },
            ],
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
            items: addDocsProductIcons(docsMenuItems, taskbarProducts),
        },
        {
            trigger: 'Community',
            items: [
                { type: 'label', label: 'Read' },
                {
                    type: 'item',
                    label: 'Blog',
                    link: '/blog',
                    icon: <Icons.IconPencil className="size-4 text-yellow" />,
                },
                {
                    type: 'item',
                    label: 'Newsletter',
                    link: '/newsletter',
                    icon: <Icons.IconNewspaper className="size-4 text-red" />,
                },
                { type: 'separator' },
                { type: 'label', label: 'Chat' },
                {
                    type: 'item' as const,
                    label: 'Forums',
                    link: '/forum',
                    icon: <Icons.IconMessage className="size-4 text-green" />,
                },
                {
                    type: 'item',
                    label: 'Discord',
                    link: 'https://discord.gg/t57vmkcm95',
                    external: true,
                    // Stroke the filled brand path so it matches the outline icons around it
                    icon: (
                        <IconDiscord className="size-4 text-blue" fill="none" stroke="currentColor" strokeWidth={1.2} />
                    ),
                },
                { type: 'separator' },
                { type: 'label', label: 'Meet' },
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
                    label: 'Students',
                    link: '/students',
                    icon: <Icons.IconGraduationCap className="size-4 text-blue" />,
                },
                {
                    type: 'item',
                    label: 'Places',
                    link: '/places',
                    icon: <Icons.IconMap className="size-4 text-red" />,
                },
                { type: 'separator' },
                { type: 'label', label: 'Fun stuff' },
                {
                    type: 'item',
                    label: 'Merch',
                    link: '/merch',
                    icon: <Icons.IconStore className="size-4 text-purple" />,
                },
                {
                    type: 'item',
                    label: 'Side projects',
                    link: '/side-projects',
                    icon: getMenuIcon(companyMenu.children, '/side-projects', 'IconRocket', 'purple'),
                },
                {
                    type: 'item',
                    label: 'Things that spark joy',
                    link: '/sparks-joy',
                    icon: <IconSparksJoy className="size-4" />,
                },
            ],
        },
        {
            trigger: 'Company',
            items: [
                { type: 'label', label: 'Meta' },
                {
                    type: 'item',
                    label: 'About',
                    link: '/about',
                    icon: getMenuIcon(companyMenu.children, '/about', 'IconLogomark', 'gray'),
                },
                {
                    type: 'item',
                    label: 'Handbook',
                    link: '/handbook',
                    icon: getMenuIcon(companyMenu.children, '/handbook', 'IconBook', 'seagreen'),
                },
                {
                    type: 'item',
                    label: 'People',
                    link: '/people',
                    icon: getMenuIcon(companyMenu.children, '/people', 'IconPeople', 'blue'),
                },
                {
                    type: 'item',
                    label: 'Teams',
                    link: '/teams',
                    icon: getMenuIcon(companyMenu.children, '/teams', 'IconShieldPeople', 'teal'),
                },
                {
                    type: 'item',
                    label: 'Careers',
                    link: '/careers',
                    icon: getMenuIcon(companyMenu.children, '/careers', 'IconLaptop', 'purple'),
                },
                {
                    type: 'item',
                    label: 'Changelog',
                    link: '/changelog',
                    icon: getMenuIcon(companyMenu.children, '/changelog', 'IconCalendar', 'red'),
                },
                {
                    type: 'item',
                    label: 'Roadmap',
                    link: '/roadmap',
                    icon: getMenuIcon(companyMenu.children, '/roadmap', 'IconMap', 'orange'),
                },
                {
                    type: 'item',
                    label: 'AI Research',
                    link: '/research',
                    icon: <Icons.IconBrain className="size-4 text-purple" />,
                },
                { type: 'separator' },
                { type: 'label', label: 'Follow us', mobileDestination: false }, // Every item below is desktop-only
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
            trigger: (
                <>
                    <span>More</span>
                </>
            ),
            items: [
                { type: 'label', label: 'Work with us' },
                {
                    type: 'item',
                    label: 'Enterprise',
                    link: '/enterprise',
                    icon: <Icons.IconBuilding className="size-4 text-blue" />,
                },
                {
                    type: 'item',
                    label: 'Services',
                    link: '/services',
                    icon: <Icons.IconLaptop className="size-4 text-blue" />,
                },
                {
                    type: 'item',
                    label: 'Partnerships',
                    link: '/partnerships',
                    icon: getMenuIcon(companyMenu.children, '/partnerships', 'IconPuzzle', 'lilac'),
                },
                {
                    type: 'item',
                    label: 'Startups',
                    link: '/startups',
                    icon: <Icons.IconPresent className="size-4 text-purple" />,
                },
                {
                    type: 'item',
                    label: 'Customers',
                    link: '/customers',
                    icon: getMenuIcon(companyMenu.children, '/customers', 'IconPerson', 'yellow'),
                },
                {
                    type: 'item',
                    label: 'Compare',
                    link: '/compare',
                    icon: <Icons.IconColumns className="size-4 text-lilac" />,
                },
                { type: 'separator' },
                { type: 'label', label: 'Legal' },
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
                    link: '/docs/privacy/soc2',
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
                { type: 'separator' },
                { type: 'label', label: 'Misc' },
                {
                    type: 'item',
                    label: 'Display options',
                    onClick: () => {
                        navigate('/display-options', { state: { newWindow: true } })
                    },
                    icon: <Icons.IconBrightness className="size-4 text-yellow" />,
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
                    type: 'item',
                    label: 'Media',
                    link: '/media',
                    icon: getMenuIcon(companyMenu.children, '/media', 'IconNewspaper', 'salmon'),
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
            icon: getMenuIcon(companyMenu.children, '/about', 'IconLogomark', 'gray'),
        },
        {
            type: 'item' as const,
            label: 'Display options',
            onClick: () => {
                navigate('/display-options', { state: { newWindow: true } })
            },
            icon: <Icons.IconBrightness className="size-4 text-yellow" />,
        },
    ]

    const homeLogoMenuItem = {
        type: 'item' as const,
        label: 'Home',
        link: '/',
        icon: <Icons.IconHome className="size-4 text-purple" />,
    }

    // Process main nav items for mobile menu
    const processMobileNavItems = (): MenuItemType[] => {
        const mobileItems: MenuItemType[] = []

        mainNavItems.forEach((menu) => {
            const link = menu.link || menu.mobileLink
            if (link) {
                mobileItems.push({
                    type: 'item' as const,
                    label: typeof menu.trigger === 'string' ? menu.trigger : 'Menu',
                    link,
                })
            } else {
                // Process items and filter out those with mobileDestination === false
                const filteredItems: MenuItemType[] = []
                const menuItemsCopy = [...menu.items]

                const itemsToProcess = menuItemsCopy

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

    // On mobile, the logo menu is the full navigation. On desktop, the logo is a
    // direct link to the homepage, because every item is also in the menus next to it.
    const logoMenuItems = isMobile
        ? [
              homeLogoMenuItem,
              { type: 'separator' as const },
              // Main navigation items processed for mobile
              ...processMobileNavItems(),
              { type: 'separator' as const },
              // System items
              ...baseLogoMenuItems,
          ]
        : []

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
            link: isMobile ? undefined : '/',
            mobileLink: undefined,
            hideChevron: true,
        },
        // On desktop, show main navigation items
        ...(!isMobile ? mainNavItems : []),
    ]
}

// Helper hook to extract menu data for AddressBar select options
export function useMenuSelectOptions() {
    // Build the select groups
    const selectGroups = [
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
