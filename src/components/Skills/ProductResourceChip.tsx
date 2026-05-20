import React from 'react'
import Link from 'components/Link'
import type { ResolvedResource } from 'hooks/skillsResourceRegistry'

export default function ProductResourceChip({ resource }: { resource: ResolvedResource }) {
    const Icon = resource.Icon
    const content = (
        <>
            <Icon className={`size-4 flex-shrink-0 text-${resource.color}`} />
            <span className="truncate">{resource.name}</span>
        </>
    )

    if (resource.href) {
        return (
            <Link
                to={resource.href}
                state={{ newWindow: true }}
                className="inline-flex items-center gap-1.5 rounded-sm border border-primary bg-accent/30 dark:bg-accent-dark/30 px-2 py-1 text-sm hover:bg-accent dark:hover:bg-accent-dark"
            >
                {content}
            </Link>
        )
    }

    return (
        <span className="inline-flex items-center gap-1.5 rounded-sm border border-primary bg-primary px-2 py-1 text-sm text-secondary">
            {content}
        </span>
    )
}
