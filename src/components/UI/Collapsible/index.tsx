import React from 'react'
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible'
import { IconChevronRight } from '@posthog/icons'
import { disclosureChevron, focusRing } from '../styles'
import { mergeClassName } from '../utils'

const collapsibleTrigger = `group flex cursor-default select-none items-center gap-1 rounded py-1 text-left text-sm font-semibold text-primary data-[disabled]:text-muted ${focusRing}`

const Trigger = React.forwardRef<HTMLButtonElement, BaseCollapsible.Trigger.Props>(function CollapsibleTrigger(
    { className, children, ...props },
    ref
) {
    return (
        <BaseCollapsible.Trigger ref={ref} className={mergeClassName(collapsibleTrigger, className)} {...props}>
            <IconChevronRight aria-hidden className={disclosureChevron} />
            {children}
        </BaseCollapsible.Trigger>
    )
})

const collapsiblePanel =
    'h-[var(--collapsible-panel-height)] overflow-hidden text-sm text-primary transition-[height] duration-200 ease-out data-[starting-style]:h-0 data-[ending-style]:h-0 motion-reduce:transition-none'

const Panel = React.forwardRef<HTMLDivElement, BaseCollapsible.Panel.Props>(function CollapsiblePanel(
    { className, children, ...props },
    ref
) {
    return (
        <BaseCollapsible.Panel ref={ref} className={mergeClassName(collapsiblePanel, className)} {...props}>
            <div className="pb-2 pl-5 pt-1 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">{children}</div>
        </BaseCollapsible.Panel>
    )
})

export const Collapsible = { Root: BaseCollapsible.Root, Trigger, Panel }
