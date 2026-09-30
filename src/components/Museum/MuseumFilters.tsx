import { OSSelect } from 'components/OSForm'
import type { MuseumCategory, MuseumCollection, MuseumType } from 'hooks/useMuseum'
import React from 'react'

export type MuseumSort = 'newest' | 'oldest'

export type MuseumFilterState = {
    category: string | null
    type: string | null
    collection: string | null
    sort: MuseumSort
}

export const EMPTY_FILTERS: MuseumFilterState = { category: null, type: null, collection: null, sort: 'newest' }

export const filtersFromSearch = (search: string): MuseumFilterState => {
    const params = new URLSearchParams(search)
    return {
        category: params.get('category'),
        type: params.get('type'),
        collection: params.get('collection'),
        sort: params.get('sort') === 'oldest' ? 'oldest' : 'newest',
    }
}

export const filtersToSearch = ({ category, type, collection, sort }: MuseumFilterState): string => {
    const params = new URLSearchParams()
    if (category) {
        params.set('category', category)
    }
    if (type) {
        params.set('type', type)
    }
    if (collection) {
        params.set('collection', collection)
    }
    if (sort !== 'newest') {
        params.set('sort', sort)
    }
    return params.toString()
}

export const CollectionChip = ({
    label,
    active,
    onClick,
}: {
    label: string
    active: boolean
    onClick: () => void
}): JSX.Element => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`rounded-full border px-2.5 py-0.5 text-[13px] transition-colors ${
            active
                ? 'border-primary bg-accent font-semibold text-primary'
                : 'border-primary bg-primary text-secondary hover:text-primary'
        }`}
    >
        {label}
    </button>
)

// Main filters (category, type, sort) are dropdowns; collections sit below them as a lighter chip row
export default function MuseumFilters({
    filters,
    onChange,
    categories,
    types,
    collections,
}: {
    filters: MuseumFilterState
    onChange: (filters: MuseumFilterState) => void
    categories: MuseumCategory[]
    types: MuseumType[]
    collections: MuseumCollection[]
}): JSX.Element {
    const visibleTypes = filters.category ? types.filter((type) => type.category?.slug === filters.category) : types

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
                <div className="w-44 shrink-0">
                    <OSSelect
                        label="Category"
                        showLabel={false}
                        size="sm"
                        value={filters.category || ''}
                        onChange={(value: string) => {
                            const category = value || null
                            // A type from another category would filter everything out
                            const keepType = types.some(
                                (type) => type.slug === filters.type && (!category || type.category?.slug === category)
                            )
                            onChange({ ...filters, category, type: keepType ? filters.type : null })
                        }}
                        options={[
                            { label: 'All categories', value: '' },
                            ...categories.map((category) => ({ label: category.name, value: category.slug })),
                        ]}
                        className="h-8 !py-0"
                    />
                </div>
                {visibleTypes.length > 0 && (
                    <div className="w-44 shrink-0">
                        <OSSelect
                            label="Type"
                            showLabel={false}
                            size="sm"
                            value={filters.type || ''}
                            onChange={(value: string) => onChange({ ...filters, type: value || null })}
                            options={[
                                { label: 'All types', value: '' },
                                ...visibleTypes.map((type) => ({ label: type.name, value: type.slug })),
                            ]}
                            className="h-8 !py-0"
                        />
                    </div>
                )}
                <div className="w-36 shrink-0">
                    <OSSelect
                        label="Sort"
                        showLabel={false}
                        size="sm"
                        value={filters.sort}
                        onChange={(value: MuseumSort) => onChange({ ...filters, sort: value })}
                        options={[
                            { label: 'Newest first', value: 'newest' },
                            { label: 'Oldest first', value: 'oldest' },
                        ]}
                        className="h-8 !py-0"
                    />
                </div>
            </div>
            {collections.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-muted">Collections</span>
                    {collections.map((collection) => (
                        <CollectionChip
                            key={collection.slug}
                            label={collection.name}
                            active={filters.collection === collection.slug}
                            onClick={() =>
                                onChange({
                                    ...filters,
                                    collection: filters.collection === collection.slug ? null : collection.slug,
                                })
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
