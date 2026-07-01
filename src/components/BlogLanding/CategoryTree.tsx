import React, { useState } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { IconChevronRight } from '@posthog/icons'
import { motion } from 'framer-motion'
import OSButton from 'components/OSButton'
import { CategoryMenuItem } from './useCategoryMenu'

/**
 * Handbook-style category nav, but tuned for a landing sidebar: clicking a category row only
 * toggles its collapsible (it does NOT navigate) — the whole layout should stay put. Only the
 * article links inside navigate. Unlike the shared `TreeMenu`, the category icon renders on
 * every row (collapsible or not), so icons are consistent.
 */
const CategoryRow = ({ item }: { item: CategoryMenuItem }) => {
    const [open, setOpen] = useState(false)
    const hasChildren = !!item.children?.length

    // Category with no articles: a plain, non-interactive label (nothing to expand or link to).
    if (!hasChildren) {
        return (
            <div className="flex items-center gap-1 px-1.5 py-1 text-sm text-primary">
                {item.icon}
                <span>{item.name}</span>
            </div>
        )
    }

    return (
        <Collapsible.Root open={open} onOpenChange={setOpen}>
            <OSButton
                align="left"
                width="full"
                size="md"
                hover="background"
                icon={item.icon}
                onClick={() => setOpen((o) => !o)}
            >
                <span className="flex-1 text-left">{item.name}</span>
                <motion.span animate={{ rotate: open ? 90 : 0 }} className="flex shrink-0">
                    <IconChevronRight className="size-4 opacity-60" />
                </motion.span>
            </OSButton>
            <Collapsible.Content>
                <div className="space-y-px mt-px mb-1">
                    {item.children!.map((child) => (
                        <OSButton
                            key={child.url}
                            asLink
                            to={child.url}
                            align="left"
                            width="full"
                            size="md"
                            hover="background"
                            className="pl-8"
                        >
                            <span className="text-[13px] leading-tight line-clamp-2 text-secondary">{child.name}</span>
                        </OSButton>
                    ))}
                </div>
            </Collapsible.Content>
        </Collapsible.Root>
    )
}

export default function CategoryTree({ items }: { items: CategoryMenuItem[] }) {
    return (
        <div className="not-prose space-y-px">
            {items.map((item) => (
                <CategoryRow key={item.url} item={item} />
            ))}
        </div>
    )
}
