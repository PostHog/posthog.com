import React from 'react'
import { Accordion as RadixAccordion } from 'radix-ui'
import * as Icons from '@posthog/icons'

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Item> {
    children: React.ReactNode
    className?: string
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <RadixAccordion.Item
            className={`border-t border-primary first:border-t-0 [&_h3]:my-0 focus-within:relative focus-within:z-10 ${className}`}
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

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <RadixAccordion.Header className="flex">
            <RadixAccordion.Trigger
                className={`group flex flex-1 items-center justify-between py-3 text-base leading-snug select-none text-primary outline-none ${className}`}
                {...props}
                ref={forwardedRef}
            >
                <span className="flex-1 flex items-center gap-1 text-left">{children}</span>
                <Icons.IconPlus className="size-4 shrink-0 group-data-[state=open]:hidden" aria-hidden />
                <Icons.IconMinus className="size-4 shrink-0 hidden group-data-[state=open]:block" aria-hidden />
            </RadixAccordion.Trigger>
        </RadixAccordion.Header>
    )
)
AccordionTrigger.displayName = 'AccordionTrigger'

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof RadixAccordion.Content> {
    children: React.ReactNode
    className?: string
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
    ({ children, className, ...props }, forwardedRef) => (
        <RadixAccordion.Content
            className="overflow-hidden data-[state=closed]:animate-slideUp data-[state=open]:animate-slideDown"
            {...props}
            ref={forwardedRef}
        >
            <div className={`text-base pb-3 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0 ${className ?? ''}`}>
                {children}
            </div>
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
    type?: 'single' | 'multiple'
    className?: string
    defaultValue?: string | string[]
    onValueChange?: ((value: string) => void) | ((value: string[]) => void)
    contentClassName?: string
    triggerClassName?: string
    dataScheme?: string
    defaultOpenAll?: boolean // New prop to open all items by default when type is 'multiple'
}

export const Accordion = ({
    items,
    className,
    type = 'multiple',
    defaultValue,
    onValueChange,
    contentClassName,
    triggerClassName,
    dataScheme = 'primary',
    defaultOpenAll = false,
    ...props
}: AccordionRootProps) => {
    // Calculate default value based on type and defaultOpenAll
    const calculatedDefaultValue = React.useMemo(() => {
        if (defaultValue !== undefined) {
            // Radix requires defaultValue to be an array when type is 'multiple';
            // accept a string from callers and wrap it for ergonomics.
            if (type === 'multiple' && typeof defaultValue === 'string') {
                return defaultValue ? [defaultValue] : []
            }
            return defaultValue
        }

        if (type === 'multiple' && defaultOpenAll) {
            // Open all items by default for multiple type
            return items.map((item, index) => item.value || `item-${index}`)
        }

        return undefined
    }, [defaultValue, type, defaultOpenAll, items])

    return (
        <RadixAccordion.Root
            className={className}
            type={type as any}
            collapsible
            defaultValue={calculatedDefaultValue as any}
            onValueChange={onValueChange as any}
            data-scheme={dataScheme}
            {...props}
        >
            {items.map(({ value, trigger, content }, index) => (
                <AccordionItem key={value || `item-${index}`} value={value || `item-${index}`}>
                    <AccordionTrigger className={triggerClassName}>{trigger}</AccordionTrigger>
                    <AccordionContent className={contentClassName}>{content}</AccordionContent>
                </AccordionItem>
            ))}
        </RadixAccordion.Root>
    )
}

export { AccordionItem, AccordionTrigger, AccordionContent }
