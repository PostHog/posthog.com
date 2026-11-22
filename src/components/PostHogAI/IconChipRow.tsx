import React from 'react'
import Link from 'components/Link'

export type IconItem = {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    name: string
    description?: string
    to?: string
}

// With `to`, the icon and the name are one link
export default function IconChipRow({ items }: { items: IconItem[] }): JSX.Element {
    return (
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 @sm:grid-cols-2">
            {items.map(({ Icon, color, name, description, to }) => {
                const title = (
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                        <Icon className={`size-4 shrink-0 ${color}`} />
                        <span className={to ? 'group-hover:underline' : undefined}>{name}</span>
                    </div>
                )
                return (
                    <div key={name}>
                        {to ? (
                            <Link to={to} state={{ newWindow: true }} className="group block !no-underline">
                                {title}
                            </Link>
                        ) : (
                            title
                        )}
                        {description && <p className="mb-0 mt-0.5 text-sm text-secondary">{description}</p>}
                    </div>
                )
            })}
        </div>
    )
}
