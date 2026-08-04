import Link from 'components/Link'
import React from 'react'

import { TEMPLATE_COLLECTIONS, TemplateCollection } from '../../constants/templateCollections'

/** The collections that lead `/templates`. Counts are live, so none advertises an empty room. */

interface CollectionCardsProps {
    /** How many templates each collection holds, keyed by collection id. */
    counts: Record<string, number>
    onSelect: (collection: TemplateCollection) => void
}

function CollectionCard({
    collection,
    count,
    featured,
    onSelect,
}: {
    collection: TemplateCollection
    count: number
    featured?: boolean
    onSelect: (collection: TemplateCollection) => void
}): JSX.Element {
    const body = (
        <>
            <div className="flex items-baseline justify-between gap-2">
                <h3 className={`font-bold text-primary ${featured ? 'text-xl' : 'text-base'}`}>{collection.title}</h3>
                <span className="text-sm text-muted tabular-nums">{count}</span>
            </div>
            <p className={`mt-1 text-secondary ${featured ? 'text-base' : 'text-sm'}`}>{collection.description}</p>
        </>
    )

    // Only self-driving has its own route today; the rest filter the library in place.
    const className = `block rounded border-b-2 border-${collection.token} bg-primary p-4 text-left transition-colors hover:bg-accent`

    if (collection.hasStaticPage) {
        return (
            <Link to={`/templates/${collection.id}`} state={{ newWindow: true }} className={className}>
                {body}
            </Link>
        )
    }

    return (
        <button type="button" onClick={() => onSelect(collection)} className={`${className} w-full`}>
            {body}
        </button>
    )
}

export default function CollectionCards({ counts, onSelect }: CollectionCardsProps): JSX.Element {
    const featured = TEMPLATE_COLLECTIONS.filter((c) => c.featured)
    const rest = TEMPLATE_COLLECTIONS.filter((c) => !c.featured)

    return (
        <div className="mb-10 space-y-3">
            {featured.map((collection) => (
                <CollectionCard
                    key={collection.id}
                    collection={collection}
                    count={counts[collection.id] ?? 0}
                    featured
                    onSelect={onSelect}
                />
            ))}
            <div className="grid grid-cols-1 gap-3 @md:grid-cols-3">
                {rest.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                        count={counts[collection.id] ?? 0}
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </div>
    )
}
