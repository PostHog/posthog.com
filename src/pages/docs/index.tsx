import CloudinaryImage from 'components/CloudinaryImage'
import React, { useEffect } from 'react'
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
import { Search, CmdK, Ctrl, K } from 'components/Icons/Icons'
import { SearchUI } from 'components/SearchUI'
import { DebugContainerQuery } from "components/DebugContainerQuery"

const keyboardShortcut =
    'box-content p-[5px] border border-b-2 border-primary  rounded-[3px] inline-flex text-black/35 dark:text-white/40'

const ProductLink = ({ icon, name, url, color }: { icon: string; name: string; url: string; color: string }) => {
    const Icon = Icons[icon as keyof typeof Icons] as any
    return (
        <Link
            to={url}
            className="flex items-center border border-primary hover:border-black/50 dark:hover:border-white/50 px-1 py-0.5 rounded-sm text-secondary hover:text-primary dark:hover:text-primary-dark relative hover:top-[-.5px] active:top-[.5px] hover:scale-[1.01] active:scale-[.995]"
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
        <ul className="list-none p-0 m-0 max-w-4xl divide-y divide-primary">
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
        <div
            data-scheme="primary"
            className="pl-4 grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-2 @4xl:gap-4 relative items-start"
        >
            {children
                .filter((child) => child.url && child.name)
                .slice(0, 8) // Limit to 8 items for better layout
                .map((child, index) => {
                    const Icon = child.icon ? (Icons[child.icon as keyof typeof Icons] as any) : Icons.IconBook
                    return (
                        <ZoomHover key={index} className="items-center text-center [&>span]:w-full">
                            <Link
                                to={child.url}
                                className="bg-accent border border-transparent hover:border-primary px-2 py-4 rounded flex flex-col h-full justify-start items-center gap-2 w-full font-medium"
                            >
                                <div>
                                    <Icon className={`size-6 text-${child.color || 'primary'}`} />
                                </div>
                                <div className="text-sm leading-tight">{child.name}</div>
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
    const [isMac, setIsMac] = React.useState<boolean | undefined>(undefined)
    useEffect(() => {
        setIsMac(typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('macintosh'))
    }, [])

    // Create accordion items
    const accordionItems = [
        // Top level sections from Product OS
        ...topLevelSections.map((section: any) => ({
            value: section.name?.toLowerCase()?.replace(/\s+/g, '-') || 'section',
            trigger: <span className="bg-primary pr-2 relative z-10">{section.name}</span>,
            content: renderSectionContent(section.children || []),
        })),
        // Products section
        {
            value: 'products',
            trigger: <span className="bg-primary pr-2 relative z-10">Products</span>,
            content: (
                <div
                    data-scheme="primary"
                    className="pl-4 grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-2 @4xl:gap-4 relative items-start"
                >
                    {productSections.map((product: any, index: number) => {
                        const Icon = product.icon ? (Icons[product.icon as keyof typeof Icons] as any) : Icons.IconApps
                        return (
                            <ZoomHover key={index} className="items-center text-center [&>span]:w-full">
                                <Link
                                    to={product.url}
                                    className="bg-accent border border-transparent hover:border-primary px-2 py-4 rounded flex flex-col h-full justify-start items-center gap-2 w-full font-medium"
                                >
                                    <div>
                                        <Icon className={`size-6 text-${product.color || 'primary'}`} />
                                    </div>
                                    <div className="text-sm leading-tight">{product.name}</div>
                                </Link>
                            </ZoomHover>
                        )
                    })}
                </div>
            ),
        },
    ]

    const imagePositioning =
        'absolute @3xl:top-1/2 @3xl:left-1/2  opacity-100 @sm:opacity-80 @md:opacity-100 transition-all duration-300 @2xl:scale-75 @3xl:scale-90 @4xl:scale-100 @5xl:scale-110'


    return (
        <div data-scheme="secondary" className="bg-primary h-full text-primary">
            <SEO title="Documentation - PostHog" />
            <ScrollArea>
                <section
                    id="hero"
                    className="@container not-prose relative aspect-[3/1] @2xl:aspect-[4/1] @6xl:aspect-[5/1] overflow-hidden border-b border-primary mb-4 bg-red-carpet bg-[length:150px_150px]"
                >
                    {/* Background container for positioned graphics */}
                    {/* Example of positioned graphics - replace with your actual graphics */}
                    {/* Left section graphics */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center">
                        <div className="relative">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/top_middle_04506a5dc1.png"
                                alt=""
                                width={588}
                                height={434}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%-65%)] 
                            translate-y-[calc(-50%-60%)] 
                            @2xl:translate-x-[calc(-50%-65%)] 
                            @2xl:translate-y-[calc(-50%-50%)] 
                            @3xl:translate-x-[calc(-50%-70%)] 
                            @3xl:translate-y-[calc(-50%-50%)] 
                            @4xl:translate-x-[calc(-50%-70%)] 
                            @4xl:translate-y-[calc(-50%-60%)] 
                            @5xl:translate-x-[calc(-50%-70%)] 
                            @5xl:translate-y-[calc(-50%-70%)] 
                            @6xl:translate-x-[calc(-50%-80%)] 
                            @6xl:translate-y-[calc(-50%-70%)] 
                            @7xl:translate-x-[calc(-50%-90%)] 
                            @7xl:translate-y-[calc(-50%-65%)] 
                            w-[294px] h-auto`}
                            />
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/top_right_c86eb1a286.png"
                                alt=""
                                width={551}
                                height={517}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%+25%)] 
                            translate-y-[calc(-50%-65%)] 
                            @lg:translate-x-[calc(-50%+55%)] 
                            @lg:translate-y-[calc(-50%-65%)] 
                            @2xl:translate-x-[calc(-50%+55%)] 
                            @2xl:translate-y-[calc(-50%-50%)] 
                            @3xl:translate-x-[calc(-50%+55%)] 
                            @3xl:translate-y-[calc(-50%-60%)] 
                            @4xl:translate-x-[calc(-50%+55%)] 
                            @4xl:translate-y-[calc(-50%-65%)] 
                            @5xl:translate-x-[calc(-50%+55%)] 
                            @5xl:translate-y-[calc(-50%-75%)] 
                            @6xl:translate-x-[calc(-50%+65%)] 
                            @6xl:translate-y-[calc(-50%-70%)] 
                            w-[275px] h-auto`}
                            />
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/right_6de2023571.png"
                                alt=""
                                width={585}
                                height={488}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%+110%)] 
                            translate-y-[calc(-50%-25%)] 
                            @lg:translate-x-[calc(-50%+120%)] 
                            @lg:translate-y-[calc(-50%-10%)] 
                            @2xl:translate-x-[calc(-50%+110%)] 
                            @2xl:translate-y-[calc(-50%-10%)] 
                            @3xl:translate-x-[calc(-50%+120%)] 
                            @3xl:translate-y-[calc(-50%-20%)] 
                            @4xl:translate-x-[calc(-50%+145%)] 
                            @4xl:translate-y-[calc(-50%-25%)] 
                            @5xl:translate-x-[calc(-50%+150%)] 
                            @5xl:translate-y-[calc(-50%-30%)] 
                            @6xl:translate-x-[calc(-50%+160%)] 
                            @6xl:translate-y-[calc(-50%-30%)] 
                            @7xl:translate-x-[calc(-50%+170%)] 
                            @7xl:translate-y-[calc(-50%-30%)] 
                            w-[292.5px] h-[244px] `}
                            />

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/bottom_right_fb4051ba15.png"
                                alt=""
                                width={389}
                                height={333}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%+70%)] 
                            translate-y-[calc(-50%+70%)] 
                            @lg:translate-x-[calc(-50%+80%)] 
                            @lg:translate-y-[calc(-50%+75%)] 
                            @xl:translate-x-[calc(-50%+120%)] 
                            @xl:translate-y-[calc(-50%+85%)] 
                            @2xl:translate-x-[calc(-50%+110%)] 
                            @2xl:translate-y-[calc(-50%+65%)] 
                            @3xl:translate-x-[calc(-50%+120%)] 
                            @3xl:translate-y-[calc(-50%+65%)] 
                            @4xl:translate-x-[calc(-50%+145%)] 
                            @4xl:translate-y-[calc(-50%+75%)] 
                            @5xl:translate-x-[calc(-50%+160%)] 
                            @5xl:translate-y-[calc(-50%+85%)] 
                            @6xl:translate-x-[calc(-50%+170%)] 
                            @6xl:translate-y-[calc(-50%+85%)] 
                            @7xl:translate-x-[calc(-50%+180%)] 
                            @7xl:translate-y-[calc(-50%+85%)] 
                            w-[194.5px] h-auto `}
                            />

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/top_right_c86eb1a286.png"
                                alt=""
                                width={551}
                                height={517}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%-5%)] 
                            translate-y-[calc(-50%+120%)] 
                            @xl:translate-x-[calc(-50%-5%)] 
                            @xl:translate-y-[calc(-50%+70%)] 
                            @2xl:translate-x-[calc(-50%+5%)] 
                            @2xl:translate-y-[calc(-50%+55%)] 
                            @3xl:translate-x-[calc(-50%+5%)] 
                            @3xl:translate-y-[calc(-50%+60%)] 
                            @4xl:translate-x-[calc(-50%+5%)] 
                            @4xl:translate-y-[calc(-50%+70%)] 
                            @5xl:translate-x-[calc(-50%+15%)] 
                            @5xl:translate-y-[calc(-50%+75%)] 
                            w-[275px] h-auto`}
                            />

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/bottom_left_19eb019249.png"
                                alt=""
                                width={366}
                                height={338}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%-50%)] 
                            translate-y-[calc(-50%+70%)] 
                            @xl:translate-x-[calc(-50%-120%)] 
                            @xl:translate-y-[calc(-50%+70%)] 
                            @2xl:translate-x-[calc(-50%-100%)] 
                            @2xl:translate-y-[calc(-50%+60%)] 
                            @3xl:translate-x-[calc(-50%-115%)] 
                            @3xl:translate-y-[calc(-50%+65%)] 
                            @4xl:translate-x-[calc(-50%-125%)] 
                            @4xl:translate-y-[calc(-50%+70%)] 
                            @5xl:translate-x-[calc(-50%-125%)] 
                            @5xl:translate-y-[calc(-50%+80%)] 
                            @6xl:translate-x-[calc(-50%-135%)] 
                            @6xl:translate-y-[calc(-50%+80%)] 
                            w-[183px] h-auto `}
                            />

                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/left_00fbb9dca8.png"
                                alt=""
                                width={560}
                                height={483}
                                className={`${imagePositioning} 
                            translate-x-[calc(-50%-125%)] 
                            translate-y-[calc(-50%+20%)] @xl:translate-x-[calc(-50%-140%)] @xl:translate-y-[calc(-50%+0%)] 
                            @2xl:translate-x-[calc(-50%-120%)] 
                            @2xl:translate-y-[calc(-50%+0%)] 
                            @3xl:translate-x-[calc(-50%-140%)] 
                            @3xl:translate-y-[calc(-50%+0%)] 
                            @4xl:translate-x-[calc(-50%-150%)] 
                            @4xl:translate-y-[calc(-50%+0%)] 
                            @5xl:translate-x-[calc(-50%-150%)] 
                            @5xl:translate-y-[calc(-50%+0%)] 
                            @6xl:translate-x-[calc(-50%-160%)] 
                            @6xl:translate-y-[calc(-50%+0%)] 
                            @7xl:translate-x-[calc(-50%-180%)] 
                            @7xl:translate-y-[calc(-50%+5%)] 
                            w-[280px] h-auto `}
                            />
                        </div>

                        {/* Text overlay - keeping this as is */}
                        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
                            <h1 className="text-2xl lg:text-3xl font-bold mb-1 @3xl:mb-2">Documentation</h1>
                        </div>
                    </div>
                </section>
                <div className="flex @4xl:flex-row flex-col gap-4 @4xl:gap-8 h-full p-2 @xl:p-4">
                    <section className="flex-1">
                        <SearchUI initialFilter="docs" hideFilters isRefinedClassName="bg-white" className="mb-4" />
                        <ScrollArea>
                            <div className="@md:-ml-3">
                                {accordionItems.map((item, index) => (
                                    <Accordion
                                        key={index}
                                        skin={false}
                                        triggerClassName="flex-row-reverse [&>svg]:!-rotate-90 [&[data-state=open]>svg]:!rotate-0 [&>span]:relative [&>span]:after:absolute [&>span]:after:right-0 [&>span]:after:top-1/2 [&>span]:after:h-px [&>span]:after:w-full [&>span]:after:bg-border [&>span]:after:content-['']"
                                        defaultValue={item.value}
                                        items={[item]}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </section>

                    <aside className="@4xl:max-w-xs text-sm">
                        <ScrollArea>
                            <h6 className="text-lg">About our docs</h6>
                            <p>There are a few ways to explore our docs:</p>
                            <p>
                                <strong className="text-base">On our website</strong> (You are here)
                            </p>
                            <ul>
                                <li>
                                    <AskMax linkOnly className="underline font-medium">
                                        Ask Max
                                    </AskMax>
                                    , our trusty AI chatbot. Start a chat on any docs page and Max will have the
                                    relevant context.
                                </li>
                                <li>Search with the icon at the top right</li>
                            </ul>
                            <p>
                                You can also ask a question at the end of each docs article. They get cross-posted to
                                our{' '}
                                <Link to="/questions" className="underline font-medium" state={{ newWindow: true }}>
                                    community forums
                                </Link>
                                .
                            </p>
                            <p>
                                <strong className="text-base">In the product</strong>
                            </p>
                            <ul>
                                <li>Look for tooltips that link to docs - they open right inside the product</li>
                                <li>Ask Max in the product</li>
                            </ul>

                            <hr className="my-4" />

                            <h6 className="text-lg">Feedback</h6>

                            <p>
                                Our docs are perpetually a work in progress. The{' '}
                                <Link to="/teams/content" className="underline font-medium" state={{ newWindow: true }}>
                                    Content team
                                </Link>{' '}
                                is responsible for what you see here. At the end of each page, you can provide feedback
                                about what was (or wasn't) helpful. We read all feedback.
                            </p>
                        </ScrollArea>
                    </aside>
                </div>
            </ScrollArea>
        </div>
    )
}

export default DocsIndex
