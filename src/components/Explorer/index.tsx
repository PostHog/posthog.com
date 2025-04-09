import React from 'react'
import { Accordion } from 'radix-ui'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import * as Icons from '@posthog/icons'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { productMenu } from '../../navs'

const selectOptions = [
    {
        label: 'Products',
        items: [
            { value: 'product-os', label: 'Product OS' },
            { value: 'product-analytics', label: 'Product Analytics' },
            { value: 'web-analytics', label: 'Web Analytics' },
            { value: 'session-replay', label: 'Session Replay' },
            { value: 'feature-flags', label: 'Feature Flags' },
            { value: 'experiments', label: 'Experiments' },
            { value: 'surveys', label: 'Surveys' },
            { value: 'data-warehouse', label: 'Data Warehouse' },
            { value: 'cdp', label: 'Data Pipelines' },
            { value: 'ai-engineering', label: 'LLM Observability' },
            { value: 'error-tracking', label: 'Error Tracking' },
        ],
    },
]

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof Accordion.Item> {
    children: React.ReactNode
    className?: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Item
            className={`border-primary border-x overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] focus-within:shadow-mauve12 [&_h3]:mb-0 ${className}`}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </Accordion.Item>
    )
)
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof Accordion.Trigger> {
    children: React.ReactNode
    className?: string
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Header className="flex">
            <Accordion.Trigger
                className={`group flex flex-1 cursor-default items-center justify-between bg-primary px-2 py-1 text-sm leading-none text-primary border-b border-primary outline-none hover:bg-mauve2 ${className}`}
                {...props}
                ref={forwardedRef}
            >
                <span className="flex-1 flex items-center gap-1 text-left">{children}</span>
                <Icons.IconChevronDown
                    className="size-6 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
                    aria-hidden
                />
            </Accordion.Trigger>
        </Accordion.Header>
    )
)
AccordionTrigger.displayName = 'AccordionTrigger'

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof Accordion.Content> {
    children: React.ReactNode
    className?: string
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <Accordion.Content
            className={`overflow-hidden bg-mauve2 text-[15px] text-mauve11 data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown data-[state=open]:border-primary data-[state=open]:border-b ${className}`}
            {...props}
            ref={forwardedRef}
        >
            <div className="p-2 text-sm">{children}</div>
        </Accordion.Content>
    )
)
AccordionContent.displayName = 'AccordionContent'

type ExplorerOption = 'features' | 'pricing' | 'customers' | 'comparison' | 'docs' | 'tutorials' | 'questions' | 'team' | 'roadmap' | 'changelog'

interface ExplorerProps {
    slug: string
    title: string
    accentImage?: React.ReactNode
    teamName?: string
    roadmapCategory?: string
    changelogCategory?: string
    indexLinks?: ExplorerOption[]
    children?: React.ReactNode
}

export default function Explorer({
    slug,
    title,
    accentImage,
    teamName,
    roadmapCategory,
    changelogCategory,
    indexLinks = [],
    children,
}: ExplorerProps) {
    const location = useLocation()
    const currentPath = location.pathname
    const isMatchingPath = currentPath === `/${slug}` || currentPath.startsWith(`/${slug}/`)

    // Find the product in the menu based on slug
    const product = productMenu.children.find((item) => item.slug === slug)
    if (!product) {
        throw new Error(`Product with slug "${slug}" not found in product menu`)
    }
    const ProductIcon = Icons[product.icon as keyof typeof Icons]

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

    return (
        <div className="@container w-full h-full flex flex-col min-h-1">
            <HeaderBar showHome showBack showForward showSearch />
            <div data-scheme="secondary" className="bg-primary px-2 pb-2 border-b border-primary">
                <Select
                    groups={selectOptions}
                    placeholder="Select..."
                    ariaLabel="Products"
                    defaultValue="product-analytics"
                    className="w-full"
                    dataScheme="primary"
                />
            </div>
            <div className="flex flex-grow min-h-0">
                <aside data-scheme="secondary" className="w-64 bg-primary p-2 border-r border-primary h-full">
                    <ScrollArea>
                        <Accordion.Root
                            data-scheme="primary"
                            className="rounded "
                            type="single"
                            defaultValue="item-1"
                            collapsible
                        >
                            <AccordionItem value="item-1">
                                <AccordionTrigger>
                                    <ProductIcon className={`text-${product.color} size-5 inline-block`} />
                                    <span className="flex-1">{product.name}</span>
                                </AccordionTrigger>
                                <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2">
                                <AccordionTrigger>Is it unstyled?</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It's unstyled by default, giving you freedom over the look and feel.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3">
                                <AccordionTrigger>Can it be animated?</AccordionTrigger>
                                <AccordionContent>
                                    Yes! You can animate the Accordion with CSS or JavaScript.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion.Root>
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
                        {isMatchingPath && (
                            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-2 p-2 relative max-w-4xl">
                                {showFeatures && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<Icons.IconPresent className="text-purple" />}
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