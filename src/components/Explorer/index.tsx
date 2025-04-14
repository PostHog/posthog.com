import React from 'react'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import * as Icons from '@posthog/icons'
import { Link, navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { productMenu } from '../../navs'
import { Accordion } from '../RadixUI/Accordion'
import { FileMenu } from '../RadixUI/FileMenu'
const selectOptions = [
    {
        label: 'Products',
        items: [
            { value: 'products', label: 'Products', icon: productMenu.icon, color: productMenu.color },
            ...productMenu.children.map((item) => ({
                value: item.slug,
                label: item.name,
                icon: item.icon,
                color: item.color
            }))
        ],
    },
]

type ExplorerOption = 'features' | 'pricing' | 'customers' | 'comparison' | 'docs' | 'tutorials' | 'questions' | 'team' | 'roadmap' | 'changelog'

interface AccordionItem {
    title: string
    content: React.ReactNode
}

interface ExplorerProps {
    template: 'generic' | 'product' | 'feature'
    slug: string
    title: string
    accentImage?: React.ReactNode
    teamName?: string
    roadmapCategory?: string
    changelogCategory?: string
    indexLinks?: ExplorerOption[]
    sidebarContent?: React.ReactNode | AccordionItem[]
    children?: React.ReactNode
}

export default function Explorer({
    template,
    slug,
    title,
    accentImage,
    teamName,
    roadmapCategory,
    changelogCategory,
    indexLinks = [],
    sidebarContent,
    children,
}: ExplorerProps) {
    // Find the product in the menu based on slug only if template is "product"
    const product = template === 'product' ? productMenu.children.find((item) => item.slug === slug) : null
    const ProductIcon = product ? Icons[product.icon as keyof typeof Icons] : null

    // Create a map of options for easy lookup
    const enabledIndexLinks = new Set(indexLinks)
    
    // Replace individual boolean checks with Set.has()
    const showFeatures = enabledIndexLinks.has('features')
    const showPricing = enabledIndexLinks.has('pricing')
    const showCustomers = enabledIndexLinks.has('customers')
    const showComparison = enabledIndexLinks.has('comparison')
    const showDocs = enabledIndexLinks.has('docs')
    const showTutorials = enabledIndexLinks.has('tutorials')
    const showQuestions = enabledIndexLinks.has('questions')
    const showTeam = enabledIndexLinks.has('team')
    const showRoadmap = enabledIndexLinks.has('roadmap')
    const showChangelog = enabledIndexLinks.has('changelog')

    const renderSidebarContent = () => {
        if (!sidebarContent) return null

        if (Array.isArray(sidebarContent)) {
            return sidebarContent.map((item, index) => (
                <Accordion
                    key={index}
                    data-scheme="primary"
                    className=""
                    defaultValue="item-0"
                    items={[
                        {
                            trigger: item.title,
                            content: item.content
                        }
                    ]}
                />
            ))
        }

        return sidebarContent
    }

    const sidebarContentBlock = (
        <>
            {renderSidebarContent()}
            {template === 'product' && product && ProductIcon && (
                <>
                    <Accordion
                        data-scheme="primary"
                        className=""
                        defaultValue="item-0"
                        items={[
                            {
                                trigger: (
                                    <>
                                        <ProductIcon className={`text-${product.color} size-5 inline-block`} />
                                        <span className="flex-1">{product.name}</span>
                                    </>
                                ),
                                content: (
                                    <>
                                        <p className="text-sm">
                                            {product.description}
                                        </p>
                                        <p>
                                            <span className="text-sm text-secondary">Pricing starts at</span><br />
                                            <span className="font-bold text-[15px]">${product.startsAt}</span><span className="text-sm text-secondary">/{product.denomination}</span>
                                        </p>
                                        <p>
                                            <span className="text-sm text-secondary">Monthly free tier{product.sharesFreeTier ? '*' : ''}</span><br />
                                            <span className="font-bold text-[15px]">{product.freeTier?.toLocaleString()}</span><span className="text-sm text-secondary">/{product.denomination}</span>
                                            {product.sharesFreeTier && (
                                                <span className="block text-xs italic text-secondary mt-1">
                                                    *Shares free tier with {productMenu.children.find((item) => item.slug === product.sharesFreeTier)?.name}
                                                </span>
                                            )}
                                        </p>
                                    </>
                                )
                            },
                        ]}
                    />
    
                    <Accordion
                        data-scheme="primary"
                        className=""
                        defaultValue="item-0"
                        contentClassName=""
                        items={[
                            {
                                trigger: "Learn more",
                                content: (
                                    <div className="space-y-1">
                                        <OSButton 
                                            variant="underline" 
                                            asLink 
                                            align="left" 
                                            width="full" 
                                            size="md" 
                                            icon={<Icons.IconCursor className="text-green" />} 
                                            to="https://app.posthog.com/signup"
                                            className="text-primary hover:text-primary"
                                        >
                                            Try it – free
                                        </OSButton>
    
                                        <OSButton 
                                            variant="underline" 
                                            asLink 
                                            align="left" 
                                            width="full" 
                                            size="md" 
                                            icon={<Icons.IconHeadset className="text-purple" />} 
                                            to="/talk-to-a-human"
                                            className="text-primary hover:text-primary"
                                        >
                                            Talk to a human
                                        </OSButton>
    
                                        <OSButton 
                                            variant="underline" 
                                            asLink 
                                            align="left" 
                                            width="full" 
                                            size="md" 
                                            icon={<Icons.IconQuestion className="text-blue" />} 
                                            to="#"
                                            className="text-primary hover:text-primary"
                                        >
                                            FAQ
                                        </OSButton>
                                    </div>
                                )
                            },
                        ]}
                    />
    
                    <Accordion 
                        data-scheme="primary"
                        className=""
                        defaultValue="item-0"
                        contentClassName=""
                        items={[
                            {
                                trigger: "Works with...",
                                content: (
                                    <div className="space-y-1">
                                        {product && product.worksWith && product.worksWith.map((productSlug) => {
                                            const relatedProduct = productMenu.children.find((item) => item.slug === productSlug)
                                            if (!relatedProduct) return null
                                            const ProductIcon = Icons[relatedProduct.icon as keyof typeof Icons]
                                            return (
                                                <OSButton 
                                                    key={productSlug}
                                                    variant="underline" 
                                                    asLink 
                                                    align="left" 
                                                    width="full" 
                                                    size="md" 
                                                    icon={<ProductIcon className={`text-${relatedProduct.color}`} />} 
                                                    to={`/${relatedProduct.slug}`} 
                                                    className="text-primary hover:text-primary"
                                                >
                                                    {relatedProduct.name}
                                                </OSButton>
                                            )
                                        })}
                                    </div>
                                )
                            },
                        ]}
                    />
                </>
            )}
        </>
    )

    const handleValueChange = (value: string) => {
        navigate(`/${value}`)
    }

    return (
        <div className="@container w-full h-full flex flex-col min-h-1">
            <HeaderBar showHome showBack showForward showSearch />
            <div data-scheme="secondary" className="bg-primary px-2 pb-2 border-b border-primary">
                <Select
                    groups={selectOptions}
                    placeholder="Select..."
                    ariaLabel="Products"
                    defaultValue={slug}
                    onValueChange={handleValueChange}
                    className="w-full"
                    dataScheme="primary"
                />
            </div>
            <div className="flex flex-grow min-h-0">
                <aside data-scheme="secondary" className="w-64 bg-primary p-2 border-r border-primary h-full">
                    <ScrollArea>
                        <div className="space-y-3">
                            {sidebarContentBlock}
                        </div>
                    </ScrollArea>
                </aside>
                <main data-scheme="primary" className="@container flex-1 bg-primary relative h-full">
                    <ScrollArea className="px-4">
                        <DebugContainerQuery />
                        {accentImage && (
                            <div className="absolute right-0 top-6">
                                <div className="relative max-w-md @4xl:max-w-lg @5xl:max-w-xl @6xl:max-w-2xl transition-all duration-700 ease-out opacity-25 @xl:opacity-50">
                                    {accentImage}
                                    <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[var(--bg)] to-[color-mix(in_srgb,var(--bg)_0%,transparent)]" />
                                    <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-b from-[color-mix(in_srgb,var(--bg)_0%,transparent)] to-[var(--bg)]" />
                                </div>
                            </div>
                        )}
                        <div className="p-6 relative">
                            <h1>{title}</h1>
                            {children}
                        </div>
                        {template === 'product' && (
                            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-2 p-2 relative max-w-4xl">
                                {showFeatures && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={React.createElement(Icons[product.icon as keyof typeof Icons], { className: `text-${product.color}` })}
                                            to={`/${slug}/features`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Features
                                        </OSButton>
                                    </div>
                                )}
                                {showPricing && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconCreditCard className="text-blue" />}
                                            to={`/${slug}/pricing`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Pricing
                                        </OSButton>
                                    </div>
                                )}
                                {showCustomers && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconMegaphone className="text-orange" />}
                                            to={`/${slug}/customers`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Social proof
                                        </OSButton>
                                    </div>
                                )}
                                {showComparison && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconListCheck className="text-lime-green" />}
                                            to={`/${slug}/vs`}
                                            className="text-primary hover:text-primary"
                                        >
                                            PostHog vs...
                                        </OSButton>
                                    </div>
                                )}
                                {showDocs && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconBook className="text-blue" />}
                                            to={`/docs/${slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Docs
                                        </OSButton>
                                    </div>
                                )}
                                {showTutorials && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconBook className="text-purple" />}
                                            to={`/tutorials/${slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Tutorials
                                        </OSButton>
                                    </div>
                                )}
                                {showQuestions && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconMessage className="text-red" />}
                                            to={`/questions/topic/${slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Questions?
                                        </OSButton>
                                    </div>
                                )}
                                {showTeam && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconPeople className="text-purple" />}
                                            to={`/teams/${teamName || slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Team
                                        </OSButton>
                                    </div>
                                )}
                                {showRoadmap && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconGanttChart className="text-seagreen" />}
                                            to={`/roadmap?product=${roadmapCategory || slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Roadmap
                                        </OSButton>
                                    </div>
                                )}
                                {showChangelog && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconCalendar className="text-blue" />}
                                            to={`/changelog?product=${changelogCategory || slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Changelog
                                        </OSButton>
                                    </div>
                                )}
                            </div>
                        )}
                    </ScrollArea>
                </main>
            </div>
        </div>
    )
}