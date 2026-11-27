import React from 'react'

export type IconItem = {
    Icon: React.ComponentType<{ className?: string }>
    color: string
    name: string
    description: React.ReactNode
}

export default function IconChipRows({ items }: { items: IconItem[] }): JSX.Element {
    const rows = Array.from({ length: Math.ceil(items.length / 2) }, (_, i) => items.slice(i * 2, i * 2 + 2))
    return (
        <div className="divide-y divide-primary">
            {rows.map((row) => (
                <div
                    key={row[0].name}
                    className="grid grid-cols-1 divide-y divide-primary py-5 first:pt-0 last:pb-0 @sm:grid-cols-2 @sm:gap-x-10 @sm:divide-y-0"
                >
                    {row.map(({ Icon, color, name, description }) => (
                        <div key={name} className="py-5 first:pt-0 last:pb-0 @sm:py-0">
                            <div className="flex items-center gap-2 text-base font-semibold text-primary">
                                <Icon className={`size-5 shrink-0 ${color}`} />
                                <span>{name}</span>
                            </div>
                            <p className="mb-0 mt-1 text-sm leading-relaxed text-secondary">{description}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
