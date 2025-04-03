import React from 'react'
import { Accordion } from 'radix-ui'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { IconChevronDown } from '@posthog/icons'

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
                <main data-scheme="primary" className="flex-1 bg-primary p-2">
                    color test:
                    <div data-scheme="primary" className="bg-primary text-primary border border-primary p-4">
                        <p className="text-secondary">Primary text</p>
                        <input
                            className="bg-input hover:bg-input-hover border-input hover:border-input-hover text-muted"
                            placeholder="Placeholder text"
                        />
                    </div>
                    <div data-scheme="secondary" className="bg-primary text-primary border border-primary p-4">
                        <p className="text-secondary">Secondary text</p>
                        <input
                            className="bg-input hover:bg-input-hover border-input hover:border-input-hover text-muted"
                            placeholder="Placeholder text"
                        />
                    </div>
                    <div data-scheme="tertiary" className="bg-primary text-primary border border-primary p-4">
                        <p className="text-secondary">Tertiary text</p>
                        <input
                            className="bg-input hover:bg-input-hover border-input hover:border-input-hover text-muted"
                            placeholder="Placeholder text"
                        />
                    </div>
                </main>
            </div>
        </div>
    )
}
