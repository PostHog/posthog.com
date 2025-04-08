import React from 'react'
import { Accordion } from 'radix-ui'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { IconBook, IconCalendar, IconChevronDown, IconCreditCard, IconGanttChart, IconGraph, IconListCheck, IconMegaphone, IconMessage, IconPeople, IconPresent } from '@posthog/icons'
import { Link } from 'gatsby'
import { useLocation } from '@reach/router'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ScrollArea from 'components/RadixUI/ScrollArea'

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
                <IconChevronDown
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

interface ExplorerProps {
    children?: React.ReactNode
    features?: boolean
    pricing?: boolean
    customers?: boolean
    comparison?: boolean
    docs?: boolean
    tutorials?: boolean
    questions?: boolean
    team?: boolean
    roadmap?: boolean
    changelog?: boolean
    slug: string
    teamName?: string
    roadmapCategory?: string
    changelogCategory?: string
    accentImage?: React.ReactNode
}

export default function Explorer({
    children,
    features = false,
    pricing = false,
    customers = false,
    comparison = false,
    docs = false,
    tutorials = false,
    questions = false,
    team = false,
    roadmap = false,
    changelog = false,
    slug,
    teamName,
    roadmapCategory,
    changelogCategory,
    accentImage
}: ExplorerProps) {
    const location = useLocation()
    const currentPath = location.pathname
    const isMatchingPath = currentPath === `/${slug}` || currentPath.startsWith(`/${slug}/`)

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
            <div className="flex h-full">
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
                                    <IconGraph className="text-blue size-5 inline-block" />
                                    <span className="flex-1">Product Analytics</span>
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
                        {accentImage && (<div className="absolute right-0 top-6">
                                <div className="relative max-w-md @4xl:max-w-lg @5xl:max-w-xl @6xl:max-w-2xl transition-all duration-700 ease-out opacity-25 @xl:opacity-50">
                                    {accentImage}
                                    <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[var(--bg)] to-[color-mix(in_srgb,var(--bg)_0%,transparent)]" />
                                    <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-b from-[color-mix(in_srgb,var(--bg)_0%,transparent)] to-[var(--bg)]" />
                                </div>
                            </div>)
                        }
                        <div className="p-6 relative">
                            <h1>Product analytics with autocapture</h1>
                            {children}
                        </div>
                        {isMatchingPath && (
                            <div className="grid grid-cols-1 @sm:grid-cols-2 gap-2 p-2 relative max-w-4xl">
                                {features && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconPresent className="text-purple" />}
                                            to={`/${slug}/features`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Features
                                        </OSButton>
                                    </div>
                                )}
                                {pricing && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconCreditCard className="text-blue" />}
                                            to={`/${slug}/pricing`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Pricing
                                        </OSButton>
                                    </div>
                                )}
                                {customers && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconMegaphone className="text-orange" />}
                                            to={`/${slug}/customers`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Social proof
                                        </OSButton>
                                    </div>
                                )}
                                {comparison && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconListCheck className="text-lime-green" />}
                                            to={`/${slug}/vs`}
                                            className="text-primary hover:text-primary"
                                        >
                                            PostHog vs...
                                        </OSButton>
                                    </div>
                                )}
                                {docs && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconBook className="text-blue" />}
                                            to={`/docs/${slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Docs
                                        </OSButton>
                                    </div>
                                )}
                                {tutorials && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconBook className="text-purple" />}
                                            to={`/tutorials/${slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Tutorials
                                        </OSButton>
                                    </div>
                                )}
                                {questions && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconMessage className="text-red" />}
                                            to={`/questions/topic/${slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Questions?
                                        </OSButton>
                                    </div>
                                )}
                                {team && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconPeople className="text-purple" />}
                                            to={`/teams/${teamName || slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Team
                                        </OSButton>
                                    </div>
                                )}
                                {roadmap && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconGanttChart className="text-seagreen" />}
                                            to={`/roadmap?product=${roadmapCategory || slug}`}
                                            className="text-primary hover:text-primary"
                                        >
                                            Roadmap
                                        </OSButton>
                                    </div>
                                )}
                                {changelog && (
                                    <div>
                                        <OSButton
                                            variant="underline"
                                            asLink
                                            align="left"
                                            width="full"
                                            size="xl"
                                            icon={<IconCalendar className="text-blue" />}
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
