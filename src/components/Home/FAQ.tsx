import React, { useState } from 'react'
import OSButton from 'components/OSButton'
import { AccordionItem, AccordionTrigger, AccordionContent } from 'components/RadixUI/Accordion'
import { Accordion as RadixAccordionPrimitives } from 'radix-ui'

export const FAQ = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<string[]>([])

    const allValues = React.useMemo(() => {
        const values: string[] = []
        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.props.trigger) {
                values.push(child.props.trigger)
            }
        })
        return values
    }, [children])

    return (
        <div>
            <div className="flex justify-end mb-2">
                <OSButton variant="secondary" size="sm" onClick={() => setValue(allValues)}>
                    Expand all
                </OSButton>
            </div>
            <RadixAccordionPrimitives.Root
                className="rounded border border-primary"
                type="multiple"
                value={value}
                onValueChange={setValue}
                data-scheme="primary"
            >
                {children}
            </RadixAccordionPrimitives.Root>
        </div>
    )
}

export const FAQItem = ({ trigger, children }: { trigger: string; children: React.ReactNode }) => (
    <AccordionItem value={trigger} skin>
        <AccordionTrigger skin className="!text-base font-bold">
            {trigger}
        </AccordionTrigger>
        <AccordionContent skin>{children}</AccordionContent>
    </AccordionItem>
)

export default FAQ
