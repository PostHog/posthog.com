import React, { useState } from 'react'
import { IconChevronRight } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'

export type ForumMenuItem =
    | { label: string; icon?: React.ReactNode; onClick: () => void; danger?: boolean; hasSubmenu?: boolean }
    | 'divider'

// A small action menu in a popover, styled like the Markdown actions menu.
export default function ForumMenu({
    trigger,
    items,
    align = 'end',
}: {
    trigger: React.ReactNode
    items: ForumMenuItem[]
    align?: 'start' | 'center' | 'end'
}) {
    const [open, setOpen] = useState(false)

    return (
        <Popover dataScheme="primary" align={align} open={open} onOpenChange={setOpen} trigger={trigger}>
            <div className="min-w-48 flex flex-col">
                {items.map((item, index) =>
                    item === 'divider' ? (
                        <hr key={index} className="my-1 border-primary" />
                    ) : (
                        <button
                            key={item.label}
                            onClick={() => {
                                setOpen(false)
                                item.onClick()
                            }}
                            className={`flex items-center gap-2 px-2 py-1 text-sm rounded hover:bg-accent transition-colors w-full text-left ${
                                item.danger ? 'text-red dark:text-yellow font-semibold' : ''
                            }`}
                        >
                            {item.icon && <span className="size-4 flex text-secondary">{item.icon}</span>}
                            <span className="flex-1">{item.label}</span>
                            {item.hasSubmenu && <IconChevronRight className="size-3.5 text-muted" />}
                        </button>
                    )
                )}
            </div>
        </Popover>
    )
}
