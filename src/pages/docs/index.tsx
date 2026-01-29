import CloudinaryImage from 'components/CloudinaryImage'
import React, { useEffect } from 'react'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import { IconSearch } from '@posthog/icons'
import { docsMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import AskMax from 'components/AskMax'
import ZoomHover from 'components/ZoomHover'
import { Accordion } from 'components/RadixUI/Accordion'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { SearchUI } from 'components/SearchUI'
import SmallTeam from 'components/SmallTeam'
import { useApp } from '../../context/App'

// Process docsMenu to extract structure
const processDocsMenu = () => {
    const productOSSection = docsMenu.children.find((item) => item.name === 'Product OS')
    const productSections = docsMenu.children.filter((item) => item.name !== 'Product OS')

    const featuredIntegrationItems = [
        'Install and configure',
        'SDKs',
        'Frameworks',
        'API',
        'Advanced',
        'Tools',
        'AI engineering',
        'Getting HogPilled',
    ]

    const featuredAIPlatformItems = [
        'PostHog AI',
        'Twig',
        'Model Context Protocol (MCP)',
        'AI wizard',
        'AI engineering',
    ]

    const developerAppsSection = { name: 'Developer apps', children: [] }
    const integrationSection = { name: 'Integration', children: [] }
    // hardcode a few AI sections for now, until dedicated product docs are created
    const AIPlatformSection = {
        name: 'AI platform',
        children: [
            {
                name: 'MCP',
                url: '/docs/model-context-protocol',
                icon: 'IconMagic',
                color: 'blue',
            },
            {
                name: 'AI wizard',
                url: '/docs/ai-engineering/ai-wizard',
                icon: 'IconMagicWand',
                color: 'purple',
            },
        ],
    }

    productSections?.forEach((product) => {
        if (featuredAIPlatformItems.includes(product.name)) {
            AIPlatformSection.children.unshift(product)
        } else {
            developerAppsSection.children.push(product)
        }
    })

    productOSSection?.children?.forEach((child) => {
        if (featuredAIPlatformItems.includes(child.name)) {
            AIPlatformSection.children.push(child)
        } else if (featuredIntegrationItems.includes(child.name)) {
            integrationSection.children.push(child)
        }
    })

    return [integrationSection, AIPlatformSection, developerAppsSection]
}


const renderSectionContent = (children: any[]) => {

    return (
        <div
            data-scheme="primary"
            className="pl-4 grid grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-2 @4xl:gap-4 relative items-start"
        >
            {children
                .filter((child) => child.url && child.name)
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
    const topLevelSections = processDocsMenu()
    const [isMac, setIsMac] = React.useState<boolean | undefined>(undefined)
    useEffect(() => {
        setIsMac(typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('macintosh'))
    }, [])

    // Create accordion items
    const accordionItems = topLevelSections.map((section: any) => ({
        value: section.name?.toLowerCase()?.replace(/\s+/g, '-') || 'section',
        trigger: (
            <span data-scheme="secondary" className="bg-primary pr-2 relative z-10">
                {section.name}
            </span>
        ),
        content: renderSectionContent(section.children || []),
    }))

    const imagePositioning =
        'absolute @3xl:top-1/2 @3xl:left-1/2  opacity-100 @sm:opacity-80 @md:opacity-100 transition-all duration-300 @2xl:scale-75 @3xl:scale-90 @4xl:scale-100 @5xl:scale-110'

    const { websiteMode } = useApp()

    return (
        <div data-scheme="secondary" className={`${!websiteMode && 'bg-primary'} h-full text-primary`}>
            <SEO title="Documentation - PostHog" />
            <ScrollArea className={`${websiteMode && '@container'}`}>
                <section
                    id="hero"
                    className={`@container not-prose relative aspect-[3/1] overflow-hidden border-b border-primary mb-4 bg-red-carpet bg-[length:150px_150px] ${websiteMode ? '@2xl:aspect-none h-36 @6xl:h-48 w-full mt-8' : '@2xl:aspect-[4/1] @6xl:aspect-[5/1]'}`}
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
                <div className={`flex @4xl:flex-row flex-col gap-4 @4xl:gap-8 h-full py-2 @xl:py-4 ${websiteMode ? '' : 'px-2 @xl:px-4'}`}>
                    <section className="flex-1">
                        <SearchUI
                            initialFilter="docs"
                            hideFilters
                            isRefinedClassName="bg-white"
                            className="mb-4"
                            autoFocus={false}
                        />
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
                            <p>
                                <AskMax linkOnly className="underline font-medium">
                                    Ask PostHog AI
                                </AskMax>
                                , our trusty AI chatbot. Start a chat on any docs page and PostHog AI will have the
                                relevant context.
                            </p>
                            <p>
                                Search with the <IconSearch className="size-4 inline-block" /> icon at the top right.
                            </p>
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
                            <p>Look for tooltips that link to docs - they open right inside the product.</p>
                            <p>Ask PostHog AI in the product.</p>

                            <hr className="my-4" />

                            <h6 className="text-lg">Feedback</h6>

                            <p>
                                Our docs are perpetually a work in progress. The
                                <SmallTeam slug="content" /> is responsible for what you see here.
                            </p>
                            <p>
                                At the end of each page, you can provide feedback about what was (or wasn't) helpful. We
                                read all feedback.
                            </p>
                        </ScrollArea>
                    </aside>
                </div>
            </ScrollArea>
        </div>
    )
}

export default DocsIndex
