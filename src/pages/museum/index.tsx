import React, { useEffect, useMemo, useState } from 'react'
import { navigate } from 'gatsby'
import Explorer from 'components/Explorer'
import SEO from 'components/seo'
import OSButton from 'components/OSButton'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import { IconSpinner } from '@posthog/icons'
import MuseumCard from 'components/Museum/MuseumCard'
import { useArtifactForm } from 'components/Museum/ArtifactForm'
import { useExhibitForm } from 'components/Museum/ExhibitForm'
import { formatDate } from 'components/Museum/utils'
import { useArtifacts, useExhibits, useMuseumTaxonomy } from 'hooks/useMuseum'
import { useUser } from 'hooks/useUser'
import { useWindow } from '../../context/Window'

type Filters = { category?: string; type?: string; collection?: string; sort: 'newest' | 'oldest' }

const FilterButton = ({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) => (
    <OSButton size="sm" align="left" width="full" active={active} onClick={onClick}>
        {children}
    </OSButton>
)

export default function Museum({ location }: { location: { search: string } }): JSX.Element {
    const { artifacts, isLoading, mutate } = useArtifacts()
    const { exhibits, mutate: mutateExhibits } = useExhibits()
    const { categories, types, collections } = useMuseumTaxonomy()
    const { isModerator } = useUser()
    const openArtifactForm = useArtifactForm()
    const openExhibitForm = useExhibitForm()
    const { appWindow } = useWindow()
    const [filters, setFilters] = useState<Filters>({ sort: 'newest' })

    const search = appWindow?.location?.search ?? location?.search
    useEffect(() => {
        const params = new URLSearchParams(search)
        setFilters({
            category: params.get('category') || undefined,
            type: params.get('type') || undefined,
            collection: params.get('collection') || undefined,
            sort: params.get('sort') === 'oldest' ? 'oldest' : 'newest',
        })
    }, [search])

    const updateFilters = (next: Partial<Filters>) => {
        const updated = { ...filters, ...next }
        setFilters(updated)
        const params = new URLSearchParams()
        if (updated.category) params.set('category', updated.category)
        if (updated.type) params.set('type', updated.type)
        if (updated.collection) params.set('collection', updated.collection)
        if (updated.sort === 'oldest') params.set('sort', 'oldest')
        const query = params.toString()
        navigate(query ? `/museum?${query}` : '/museum', { replace: true })
    }

    const filtered = useMemo(() => {
        const matches = artifacts.filter(({ attributes }) => {
            if (filters.category && attributes.category?.data?.attributes.slug !== filters.category) return false
            if (filters.type && attributes.type?.data?.attributes.slug !== filters.type) return false
            if (
                filters.collection &&
                !attributes.collections?.data?.some((collection) => collection.attributes.slug === filters.collection)
            )
                return false
            return true
        })
        return filters.sort === 'oldest' ? [...matches].reverse() : matches
    }, [artifacts, filters])

    const categoryTypes = types.filter((type) => type.attributes.category?.data?.attributes.slug === filters.category)

    return (
        <>
            <SEO
                title="Museum - PostHog"
                description="Billboards, ads, launch videos, merch, and everything else we've made to get your attention."
                image="/images/og/default.png"
            />
            <Explorer
                template="generic"
                slug="museum"
                title="Museum"
                rightActionButtons={
                    <ToggleGroup
                        title="Sort"
                        hideTitle
                        options={[
                            { label: 'Newest', value: 'newest' },
                            { label: 'Oldest', value: 'oldest' },
                        ]}
                        value={filters.sort}
                        onValueChange={(sort) => updateFilters({ sort: sort as Filters['sort'] })}
                        className="-my-1 ml-2"
                    />
                }
                leftSidebarContent={[
                    {
                        title: 'Category',
                        content: (
                            <div className="space-y-px">
                                <FilterButton
                                    active={!filters.category}
                                    onClick={() => updateFilters({ category: undefined, type: undefined })}
                                >
                                    All
                                </FilterButton>
                                {categories.map(({ id, attributes: { name, slug } }) => (
                                    <React.Fragment key={id}>
                                        <FilterButton
                                            active={filters.category === slug && !filters.type}
                                            onClick={() => updateFilters({ category: slug, type: undefined })}
                                        >
                                            {name}
                                        </FilterButton>
                                        {filters.category === slug &&
                                            categoryTypes.map((type) => (
                                                <div key={type.id} className="pl-4">
                                                    <FilterButton
                                                        active={filters.type === type.attributes.slug}
                                                        onClick={() => updateFilters({ type: type.attributes.slug })}
                                                    >
                                                        {type.attributes.name}
                                                    </FilterButton>
                                                </div>
                                            ))}
                                    </React.Fragment>
                                ))}
                            </div>
                        ),
                    },
                    {
                        title: 'Collections',
                        content: (
                            <div className="space-y-px">
                                {collections.map(({ id, attributes: { name, slug } }) => (
                                    <FilterButton
                                        key={id}
                                        active={filters.collection === slug}
                                        onClick={() =>
                                            updateFilters({
                                                collection: filters.collection === slug ? undefined : slug,
                                            })
                                        }
                                    >
                                        {name}
                                    </FilterButton>
                                ))}
                            </div>
                        ),
                    },
                ]}
            >
                <div className="@container not-prose space-y-8">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <p className="m-0 max-w-xl text-secondary">
                            Billboards, ads, launch videos, merch, and everything else we've made to get your attention.
                        </p>
                        {isModerator && (
                            <div className="flex gap-2">
                                <OSButton
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => openArtifactForm(undefined, () => mutate())}
                                >
                                    Add artifact
                                </OSButton>
                                <OSButton
                                    size="sm"
                                    variant="primary"
                                    onClick={() => openExhibitForm(undefined, () => mutateExhibits())}
                                >
                                    Curate exhibit
                                </OSButton>
                            </div>
                        )}
                    </div>

                    {exhibits.length > 0 && (
                        <section>
                            <h2 className="mb-3 text-lg">Exhibits</h2>
                            <div className="grid gap-4 @md:grid-cols-2 @3xl:grid-cols-3">
                                {exhibits.map(({ id, attributes: exhibit }) => (
                                    <MuseumCard
                                        newWindow
                                        key={id}
                                        to={`/museum/exhibits/${exhibit.slug}`}
                                        image={
                                            exhibit.coverImage?.data?.attributes.url ||
                                            exhibit.stops?.[0]?.artifact.data?.attributes.heroImage?.data?.attributes
                                                .url
                                        }
                                        title={exhibit.title}
                                        meta={`${exhibit.stops?.length || 0} artifacts`}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    <section>
                        <h2 className="mb-3 text-lg">Artifacts</h2>
                        {isLoading ? (
                            <IconSpinner className="size-6 animate-spin opacity-50" />
                        ) : filtered.length === 0 ? (
                            <p className="text-secondary">Nothing here yet.</p>
                        ) : (
                            <div className="grid gap-4 @md:grid-cols-2 @3xl:grid-cols-3">
                                {filtered.map(({ id, attributes: artifact }) => (
                                    <MuseumCard
                                        newWindow
                                        key={id}
                                        to={`/museum/artifacts/${artifact.slug}`}
                                        image={artifact.heroImage?.data?.attributes.url}
                                        title={artifact.title}
                                        meta={[
                                            formatDate(artifact.date, artifact.datePrecision),
                                            artifact.type?.data?.attributes.name ||
                                                artifact.category?.data?.attributes.name,
                                        ]
                                            .filter(Boolean)
                                            .join(' · ')}
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </div>
            </Explorer>
        </>
    )
}
