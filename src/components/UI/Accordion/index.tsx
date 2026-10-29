import React from 'react'
import { Accordion as BaseAccordion } from '@base-ui/react/accordion'
import { IconChevronRight } from '@posthog/icons'
import { disclosureChevron, focusRing } from '../styles'
import { mergeClassName, withClassName } from '../utils'
import { wrapText } from '../truncation'

const Root = withClassName(BaseAccordion.Root, 'w-full')

const Item = withClassName(BaseAccordion.Item, 'border-t border-primary first:border-t-0')

const Header = withClassName(BaseAccordion.Header, 'my-0 flex')

const accordionTrigger = `group flex w-full flex-1 cursor-default select-none items-center gap-1 py-3 text-left text-base leading-snug text-primary data-[disabled]:text-muted ${focusRing}`

const Trigger = React.forwardRef<HTMLButtonElement, BaseAccordion.Trigger.Props>(function AccordionTrigger(
    { className, children, ...props },
    ref
) {
    return (
        <BaseAccordion.Trigger ref={ref} className={mergeClassName(accordionTrigger, className)} {...props}>
            <IconChevronRight aria-hidden className={disclosureChevron} />
            <span className={`flex flex-1 items-center gap-1 ${wrapText}`}>{children}</span>
        </BaseAccordion.Trigger>
    )
})

const accordionPanel =
    'h-[var(--accordion-panel-height)] overflow-hidden text-base text-primary transition-[height] duration-200 ease-out data-[starting-style]:h-0 data-[ending-style]:h-0 motion-reduce:transition-none'

const Panel = React.forwardRef<HTMLDivElement, BaseAccordion.Panel.Props>(function AccordionPanel(
    { className, children, ...props },
    ref
) {
    return (
        <BaseAccordion.Panel ref={ref} className={mergeClassName(accordionPanel, className)} {...props}>
            <div className="pb-3 pl-5 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">{children}</div>
        </BaseAccordion.Panel>
    )
})

export const Accordion = { Root, Item, Header, Trigger, Panel }
