import React from 'react'
import { Accordion as RadixAccordion } from 'radix-ui'
import * as Icons from '@posthog/icons'

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Item> {
    children: React.ReactNode
    className?: string
    skin?: boolean
}

// border-primary border-x overflow-hidden first:mt-0 first:rounded-t last:rounded-b

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, className, skin, ...props }, forwardedRef) => (
        <RadixAccordion.Item
            className={`border-t border-primary first:border-t-0 [&_h3]:my-0 focus-within:relative focus-within:z-10 ${
                skin ? 'focus-within:shadow-[0_0_2px_2px] focus-within:shadow-border' : ''
            } ${className}`}
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
    skin?: boolean
}

// border-b border-primary

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, skin, ...props }, forwardedRef) => (
        <RadixAccordion.Header className="flex">
            <RadixAccordion.Trigger
                className={`group flex flex-1 items-center justify-between px-2 py-1 text-sm leading-none select-none ${
                    skin ? 'first:rounded-t last:rounded-b bg-accent hover:bg-accent' : ''
                } text-primary outline-none ${className}`}
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
    skin?: boolean
}

// data-[state=open]:border-b

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, skin, ...props }, forwardedRef) => (
        <RadixAccordion.Content
            className={`overflow-hidden select-none ${
                skin ? 'bg-primary text-primary border-primary border-t' : ''
            } data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown p-2 last:rounded-b [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 ${className}`}
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
    triggerClassName?: string
    skin?: boolean
}

export const Accordion = ({
    items,
    className,
    defaultValue,
    onValueChange,
    contentClassName,
    triggerClassName,
    skin = true,
    ...props
}: AccordionRootProps) => {
    return (
        <RadixAccordion.Root
            className={`${skin ? 'rounded border border-primary' : ''} ${className}`}
            type="single"
            collapsible
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            {...props}
        >
            {items.map(({ value, trigger, content }, index) => (
                <AccordionItem key={value || `item-${index}`} value={value || `item-${index}`}>
                    <AccordionTrigger className={triggerClassName} skin={skin}>
                        {trigger}
                    </AccordionTrigger>
                    <AccordionContent className={contentClassName} skin={skin}>
                        {content}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </RadixAccordion.Root>
    )
}

export { AccordionItem, AccordionTrigger, AccordionContent }
