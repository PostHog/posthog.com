import React from 'react'
import Link from 'components/Link'
import { Share, formatPct } from './data'
import './ShareBars.css'

// Horizontal share bars. Bars scale to the largest value so small shares stay readable.
const SHARE_BAR_STAGGER_MS = 40

export function ShareBars({
    items,
    detail,
    icon,
    href,
    labelOf = (item) => item.label,
    labelClassName = '',
}: {
    items: Share[]
    detail?: (item: Share) => React.ReactNode
    icon?: (item: Share) => React.ReactNode
    // Makes a row's label a link, for example to the docs for a tool category.
    href?: (item: Share) => string | undefined
    // The text shown for a row, when it differs from `item.label`, which stays the hover title.
    labelOf?: (item: Share) => string
    labelClassName?: string
}): JSX.Element {
    const max = Math.max(...items.map((item) => item.value), 0.0001)
    return (
        <ul className="list-none m-0 p-0 flex flex-col gap-1.5">
            {items.map((item, index) => (
                <li key={item.label} className="grid grid-cols-[minmax(0,10rem)_1fr_auto] items-center gap-2 text-sm">
                    <span className="flex items-center gap-1.5 min-w-0 text-primary" title={item.label}>
                        {icon && <span className="size-4 shrink-0 flex items-center justify-center">{icon(item)}</span>}
                        {href?.(item) ? (
                            <Link
                                to={href(item) as string}
                                state={{ newWindow: true }}
                                className={`truncate text-primary underline decoration-dotted underline-offset-2 hover:decoration-solid ${labelClassName}`}
                            >
                                {labelOf(item)}
                            </Link>
                        ) : (
                            <span className={`truncate ${labelClassName}`}>{labelOf(item)}</span>
                        )}
                    </span>
                    <span className="h-3 rounded-sm bg-accent overflow-hidden">
                        <span
                            className="share-bar-fill block h-full rounded-sm"
                            style={{
                                width: `${Math.max((item.value / max) * 100, 0.5)}%`,
                                backgroundColor: item.color,
                                animationDelay: `${index * SHARE_BAR_STAGGER_MS}ms`,
                            }}
                        />
                    </span>
                    <span className="tabular-nums text-secondary text-right min-w-[4.5rem]">
                        {formatPct(item.value)}
                        {detail && <span className="block text-xs text-muted">{detail(item)}</span>}
                    </span>
                </li>
            ))}
        </ul>
    )
}
