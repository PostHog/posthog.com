import CloudinaryImage from 'components/CloudinaryImage'
import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import { CallToAction } from 'components/CallToAction'
import { IconLightBulb } from '@posthog/icons'
import KeyboardShortcut from 'components/KeyboardShortcut'
import { docsMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import AskMax from 'components/AskMax'
import { defaultQuickQuestions } from 'hooks/useInkeepSettings'
import ReaderView from 'components/ReaderView'
import ZoomHover from 'components/ZoomHover'
import { AppLink, IconPresentation } from 'components/OSIcons'
import { Accordion } from 'components/RadixUI/Accordion'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { useApp } from '../../context/App'

const ProductLink = ({ icon, name, url, color }: { icon: string; name: string; url: string; color: string }) => {
    const Icon = Icons[icon as keyof typeof Icons] as any
    return (
        <Link
            to={url}
            className="flex items-center border border-light dark:border-dark hover:border-black/50 dark:hover:border-white/50 px-1 py-0.5 rounded-sm text-primary/75 dark:text-primary-dark/75 hover:text-primary dark:hover:text-primary-dark relative hover:top-[-.5px] active:top-[.5px] hover:scale-[1.01] active:scale-[.995]"
        >
            <Icon className={`w-4 h-4 mr-1 text-${color}`} />
            <span className="text-sm">{name}</span>
        </Link>
    )
}

const ProductItem = ({ product }: { product: any }) => {
    const Icon = Icons[product.icon as keyof typeof Icons] as any
    return (
        <li className="flex flex-col @lg:flex-row justify-between gap-4 py-5">
            <div className="flex gap-2">
                <div>
                    <Icon className={`w-6 h-6 text-${product.color}`} />
                </div>
                <div className="flex-1">
                    <Link
                        to={product.url}
                        className="text-primary dark:text-primary-dark hover:underline hover:text-primary dark:hover:text-primary-dark"
                    >
                        <strong>{product.name}</strong>
                    </Link>
                    <p className="mb-0 text-[15px] opacity-75">{product.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                        {product.children
                            ?.filter((child: any) => child.featured)
                            ?.map((child: any, index: number) => (
                                <ProductLink key={index} {...child} />
                            ))}
                    </div>
                </div>
            </div>
            <aside className="@lg:pt-1">
                <CallToAction to={product.url} type="outline" size="md" className="!w-full sm:!w-auto">
                    Visit
                </CallToAction>
            </aside>
        </li>
    )
}

const ProductList = () => {
    const products = docsMenu.children
        .filter((item) => item.name !== 'Product OS')
        .concat(docsMenu.children.find((item) => item.name === 'Product OS') || [])
        .filter(Boolean)

    return (
        <ul className="list-none p-0 m-0 max-w-4xl divide-y divide-light dark:divide-dark">
            {products.map((product, index) => (
                <ProductItem key={index} product={product} />
            ))}
        </ul>
    )
}

// Process docsMenu to extract structure
const processDocsMenu = () => {
    const productOSSection = docsMenu.children.find((item) => item.name === 'Product OS')
    const productSections = docsMenu.children.filter((item) => item.name !== 'Product OS')

    // Items to filter out completely
    const skipItems = [
        'Docs',
        'Overview',
        'PostHog explained',
        'Resources',
        'Privacy',
        'How PostHog works',
        'Self-host',
        'Billing',
    ]

    // Group Product OS children by section headers
    const topLevelSections: any[] = []

    if (productOSSection?.children) {
        let currentSection: any = null
        let inSkippedSection = false

        for (const child of productOSSection.children) {
            // Skip filtered items
            if (!child.name) {
                continue
            }

            // Items with just a name (no URL) are section headers
            if (!child.url && child.name) {
                // Check if this section header should be skipped
                if (skipItems.includes(child.name)) {
                    inSkippedSection = true
                    continue
                } else {
                    inSkippedSection = false
                    // Save the previous section if it has children
                    if (currentSection && currentSection.children.length > 0) {
                        topLevelSections.push(currentSection)
                    }

                    // Start a new section
                    currentSection = {
                        name: child.name,
                        icon: getIconForSection(child.name),
                        color: getColorForSection(child.name),
                        children: [],
                    }
                }
            } else if (!inSkippedSection && currentSection && child.name && (child.url || (child as any).children)) {
                // Only add items to the current section if we're not in a skipped section
                currentSection.children.push(child)
            }
        }

        // Don't forget the last section
        if (currentSection && currentSection.children.length > 0) {
            topLevelSections.push(currentSection)
        }
    }

    return {
        topLevelSections,
        productSections,
    }
}

// Helper functions to assign icons and colors to sections from original data
const getIconForSection = (sectionName: string) => {
    const productOSSection = docsMenu.children.find((item) => item.name === 'Product OS')

    if (!productOSSection?.children) return 'IconBook'

    // Find the section in the original data
    const sectionIndex = productOSSection.children.findIndex((child) => child.name === sectionName)

    if (sectionIndex === -1) return 'IconBook'

    // Look for an item with an icon in this section
    for (let i = sectionIndex; i < productOSSection.children.length; i++) {
        const item = productOSSection.children[i]

        // Stop at the next section header
        if (!item.url && item.name && i > sectionIndex) break

        // If this item has an icon, use it
        if (item.icon) return item.icon
    }

    return 'IconBook'
}

const getColorForSection = (sectionName: string) => {
    const productOSSection = docsMenu.children.find((item) => item.name === 'Product OS')

    if (!productOSSection?.children) return 'primary'

    // Find the section in the original data
    const sectionIndex = productOSSection.children.findIndex((child) => child.name === sectionName)

    if (sectionIndex === -1) return 'primary'

    // Look for an item with a color in this section
    for (let i = sectionIndex; i < productOSSection.children.length; i++) {
        const item = productOSSection.children[i]

        // Stop at the next section header
        if (!item.url && item.name && i > sectionIndex) break

        // If this item has a color, use it
        if ((item as any).color) return (item as any).color
    }

    // Default colors for sections that don't have explicit colors
    const defaultColors: { [key: string]: string } = {
        Integration: 'blue',
        'Winning with PostHog': 'yellow',
        'Tools and features': 'purple',
    }

    return defaultColors[sectionName] || 'primary'
}

const renderSectionContent = (children: any[]) => {
    return (
        <div className="pl-4 grid grid-cols-[repeat(auto-fit,minmax(7rem,10rem))] gap-4 relative">
            {children
                .filter((child) => child.url && child.name)
                .slice(0, 8) // Limit to 8 items for better layout
                .map((child, index) => {
                    const Icon = child.icon ? (Icons[child.icon as keyof typeof Icons] as any) : Icons.IconBook
                    return (
                        <ZoomHover key={index} className="items-center text-center">
                            <Link
                                to={child.url}
                                className="bg-accent p-4 rounded flex flex-col justify-center items-center gap-2 w-full"
                            >
                                <div>
                                    <Icon className={`size-6 text-${child.color || 'primary'}`} />
                                </div>
                                <div className="text-sm">{child.name}</div>
                            </Link>
                        </ZoomHover>
                    )
                })}
        </div>
    )
}

export const DocsIndex = () => {
    const { openSearch } = useApp()
    const { topLevelSections, productSections } = processDocsMenu()

    // Create accordion items
    const accordionItems = [
        // Top level sections from Product OS
        ...topLevelSections.map((section: any) => ({
            value: section.name?.toLowerCase()?.replace(/\s+/g, '-') || 'section',
            trigger: (
                <span className="bg-primary pr-2 relative z-10 flex items-center gap-2">
                    {section.icon &&
                        (() => {
                            const Icon = Icons[section.icon as keyof typeof Icons] as any
                            return <Icon className={`size-4 text-${(section as any).color || 'primary'}`} />
                        })()}
                    {section.name}
                </span>
            ),
            content: renderSectionContent(section.children || []),
        })),
        // Products section
        {
            value: 'products',
            trigger: (
                <span className="bg-primary pr-2 relative z-10 flex items-center gap-2">
                    <Icons.IconApps className="size-4 text-salmon" />
                    Products
                </span>
            ),
            content: (
                <div className="pl-4 grid grid-cols-[repeat(auto-fit,minmax(7rem,10rem))] gap-4 relative">
                    {productSections.map((product: any, index: number) => {
                        const Icon = product.icon ? (Icons[product.icon as keyof typeof Icons] as any) : Icons.IconApps
                        return (
                            <ZoomHover key={index} className="items-center text-center">
                                <Link
                                    to={product.url}
                                    className="bg-accent p-4 rounded flex flex-col justify-center items-center gap-2 w-full"
                                >
                                    <div>
                                        <Icon className={`size-6 text-${product.color || 'primary'}`} />
                                    </div>
                                    <div className="text-sm">{product.name}</div>
                                </Link>
                            </ZoomHover>
                        )
                    })}
                </div>
            ),
        },
    ]

    return (
        <ScrollArea>
            <div data-scheme="secondary" className="p-5 bg-primary">
                <SEO title="Documentation - PostHog" />

                <div className="flex gap-8">
                    <section className="flex-1">
                        <h2>Docs</h2>
                        <button
                            onClick={() => openSearch('docs')}
                            className="px-4 py-2 bg-white rounded-md border border-border w-full text-left hover:scale-[1.002] active:scale-[1] transition-transform mb-2"
                        >
                            <span className="opacity-50">Search...</span>
                        </button>
                        {accordionItems.map((item, index) => (
                            <Accordion
                                key={index}
                                skin={false}
                                triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:relative [&>span]:after:absolute [&>span]:after:right-0 [&>span]:after:top-1/2 [&>span]:after:h-px [&>span]:after:w-full [&>span]:after:bg-border [&>span]:after:content-['']"
                                defaultValue={item.value}
                                items={[item]}
                            />
                        ))}
                    </section>

                    <aside className="max-w-xs text-sm">
                        <h6>About our docs</h6>
                        <p>There are a few ways to explore our docs:</p>
                        <p>
                            <strong>On our website</strong> (You are here)
                        </p>
                        <ul>
                            <li>
                                <Link to="#" state={{ newWindow: true }}>
                                    Ask Max
                                </Link>
                                , our trusty AI chatbot. Start a chat on any docs page and Max will have the relevant
                                context.
                            </li>
                            <li>Search with the icon at the top right</li>
                        </ul>
                        <p>
                            You can also ask a question at the end of each docs article. They get cross-posted to our{' '}
                            <Link to="#" state={{ newWindow: true }}>
                                community forums
                            </Link>
                            .
                        </p>
                        <p>
                            <strong>In the product</strong>
                        </p>
                        <ul>
                            <li>Look for tooltips that link to docs - they open right inside the product</li>
                            <li>Ask Max in the product</li>
                        </ul>
                    </aside>
                </div>

                <section className="mb-8 flex flex-col-reverse lg:flex-row bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md p-4 md:p-8 lg:pr-0 shadow-xl">
                    <div className="@container flex-1 text-center sm:text-left">
                        <h2>New to PostHog?</h2>
                        <p className="text-[15px] md:pr-4">
                            The getting started guide covers adding PostHog to your app or site, sending events,
                            identifying users, creating actions and insights, and assigning properties to users and
                            users to groups.
                        </p>
                        <CallToAction
                            to="/docs/getting-started/install"
                            type="primary"
                            size="md"
                            className="!w-full sm:!w-auto"
                        >
                            Get started
                        </CallToAction>

                        <div className="flex gap-2 justify-center @md:justify-start lg:justify-start @sm:items-center mt-6">
                            <IconLightBulb className="size-8 flex-[0_0_2rem] @md:flex-[0_0_auto] @md:size-10 text-primary dark:text-primary-dark opacity-50 bg-accent dark:bg-accent-dark rounded-sm p-2" />
                            <p className="text-sm m-0 text-left leading-relaxed">
                                <strong>Tip:</strong>{' '}
                                <AskMax linkOnly className="text-red dark:text-yellow font-semibold">
                                    Chat with Max AI
                                </AskMax>{' '}
                                for quick answers to questions.{' '}
                                <span className="@md:inline-block">
                                    Open by typing <KeyboardShortcut text="?" /> or search with{' '}
                                    <KeyboardShortcut text="/" />.
                                </span>
                            </p>
                        </div>
                    </div>
                    <aside>
                        <figure className="m-0">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/adventure-hog.png"
                                alt="This hog knows where he's headed"
                                width={342}
                                placeholder="blurred"
                                className="w-full sm:w-[345px]"
                            />
                        </figure>
                    </aside>
                </section>

                <section className="@container">
                    <h4 className="mb-2">Product documentation</h4>
                    <div className="max-w-4xl">
                        <SidebarSearchBox filter="docs" />
                    </div>

                    <ProductList />

                    <div className="flex flex-col @3xl:grid md:grid-cols-3 gap-4 mt-8">
                        <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                            <h3 className="text-xl mb-2">Data</h3>
                            <p className="text-[15px]">
                                Learn how to manage events and customer data for use with all PostHog products.
                            </p>
                            <CallToAction to="/docs/data" type="outline" size="md" className="!w-full sm:!w-auto">
                                Explore
                            </CallToAction>
                        </div>
                        <div className="@container border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                            <h3 className="text-xl mb-2">Templates</h3>
                            <p className="text-[15px]">
                                Instantly analyze data and collect feedback with dashboard and survey templates.
                            </p>
                            <div className="flex flex-col @[14rem]:flex-row  items-start @[14rem]:items-center gap-4">
                                <CallToAction to="/templates" type="outline" size="md" className="!w-full sm:!w-auto">
                                    Browse templates
                                </CallToAction>
                            </div>
                        </div>
                        <div className="border border-light dark:border-dark bg-accent dark:bg-accent-dark p-6 xl:p-8 rounded">
                            <h3 className="text-xl mb-2">API</h3>
                            <p className="text-[15px]">
                                Push or pull data to build custom functionality or create bespoke views for your
                                business needs.
                            </p>
                            <CallToAction to="/docs/api" type="outline" size="md" className="!w-full sm:!w-auto">
                                Explore
                            </CallToAction>
                        </div>
                    </div>
                </section>
            </div>
        </ScrollArea>
    )
}

export default DocsIndex
