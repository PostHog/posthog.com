import React from 'react'
import { Accordion } from 'radix-ui'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { IconChevronDown, IconCreditCard, IconMegaphone, IconPresent } from '@posthog/icons'
import { Link } from 'gatsby'
import OSButton from 'components/OSButton'

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
                {children}
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

export default function Explorer() {
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
                <aside data-scheme="secondary" className="w-64 bg-primary p-2 border-r border-primary">
                    <Accordion.Root
                        data-scheme="primary"
                        className="rounded "
                        type="single"
                        defaultValue="item-1"
                        collapsible
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Product Analytics</AccordionTrigger>
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
                </aside>
                <main data-scheme="primary" className="flex-1 bg-primary p-4">
                    <h1>Product analytics with autocapture</h1>
                    <p>
                        PostHog is the only product analytics platform built to natively work with{' '}
                        <Link to="/session-replay">session replays</Link>,{' '}
                        <Link to="/feature-flags">feature flags</Link>, <Link to="/experiments">experiments</Link>, and{' '}
                        <Link to="/surveys">surveys</Link>.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <OSButton
                                variant="ghost"
                                asLink
                                align="left"
                                width="full"
                                size="xl"
                                icon={<IconPresent className="text-purple" />}
                                to="/product-analytics/features"
                                className="text-primary hover:text-primary"
                            >
                                Features
                            </OSButton>
                        </div>
                        <div>
                            <OSButton
                                variant="ghost"
                                asLink
                                align="left"
                                width="full"
                                size="xl"
                                icon={<IconCreditCard className="text-blue" />}
                                to="/product-analytics/pricing"
                                className="text-primary hover:text-primary"
                            >
                                Pricing
                            </OSButton>
                        </div>
                        <div>
                            <OSButton
                                variant="ghost"
                                asLink
                                align="left"
                                width="full"
                                size="xl"
                                icon={<IconMegaphone className="text-orange" />}
                                to="/product-analytics/customers"
                                className="text-primary hover:text-primary"
                            >
                                Social proof
                            </OSButton>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}
