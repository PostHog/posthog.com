import React from 'react'
import { Accordion as RadixAccordion } from 'radix-ui'
import * as Icons from '@posthog/icons'

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Item> {
    children: React.ReactNode
    className?: string
}

// border-primary border-x overflow-hidden first:mt-0 first:rounded-t last:rounded-b

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <RadixAccordion.Item
            className={`not-prose border-t border-primary first:border-t-0 [&_h3]:mb-0 focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_2px_2px] focus-within:shadow-border ${className}`}
            {...props}
            ref={forwardedRef}
        >
            {children}
        </RadixAccordion.Item>
    )
)
AccordionItem.displayName = 'AccordionItem'

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Trigger> {
    children: React.ReactNode
    className?: string
}

// border-b border-primary

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <RadixAccordion.Header className="flex">
            <RadixAccordion.Trigger
                className={`group flex flex-1 items-center justify-between px-2 py-1 text-sm leading-none first:rounded-t last:rounded-b text-primary bg-accent outline-none hover:bg-accent ${className}`}
                {...props}
                ref={forwardedRef}
            >
                <span className="flex-1 flex items-center gap-1 text-left">{children}</span>
                <Icons.IconChevronDown
                    className="size-6 transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
                    aria-hidden
                />
            </RadixAccordion.Trigger>
        </RadixAccordion.Header>
    )
)
AccordionTrigger.displayName = 'AccordionTrigger'

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Content> {
    children: React.ReactNode
    className?: string
}

// data-[state=open]:border-b

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <RadixAccordion.Content
            className={`overflow-hidden bg-primary text-primary data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown border-primary border-t p-2 last:rounded-b [&>p:last-child]:mb-0 ${className}`}
            {...props}
            ref={forwardedRef}
            asChild
        >
            <div className="text-sm">{children}</div>
        </RadixAccordion.Content>
    )
)
AccordionContent.displayName = 'AccordionContent'

interface AccordionRootProps
    extends Omit<
        React.ComponentPropsWithoutRef<typeof RadixAccordion.Root>,
        'type' | 'value' | 'defaultValue' | 'onValueChange'
    > {
    items: {
        value?: string
        trigger: React.ReactNode
        content: React.ReactNode
    }[]
    className?: string
    defaultValue?: string
    onValueChange?: (value: string) => void
    contentClassName?: string
}

export const Accordion = ({
    items,
    className,
    defaultValue,
    onValueChange,
    contentClassName,
    ...props
}: AccordionRootProps) => {
    return (
        <RadixAccordion.Root
            className={`rounded border border-primary ${className}`}
            type="single"
            collapsible
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            {...props}
        >
            {items.map(({ value, trigger, content }, index) => (
                <AccordionItem key={value || `item-${index}`} value={value || `item-${index}`}>
                    <AccordionTrigger>{trigger}</AccordionTrigger>
                    <AccordionContent className={contentClassName}>{content}</AccordionContent>
                </AccordionItem>
            ))}
        </RadixAccordion.Root>
    )
}

export { AccordionItem, AccordionTrigger, AccordionContent }
