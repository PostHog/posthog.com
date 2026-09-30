import { IconSpinner } from '@posthog/icons'
import Editor from 'components/Editor'
import ExhibitCard from 'components/Museum/ExhibitCard'
import { useExhibitForm } from 'components/Museum/ExhibitForm'
import MuseumFilters, {
    EMPTY_FILTERS,
    filtersFromSearch,
    filtersToSearch,
    type MuseumFilterState,
} from 'components/Museum/MuseumFilters'
import OSButton from 'components/OSButton'
import SEO from 'components/seo'
import { navigate } from 'gatsby'
import { useMuseumExhibits, useMuseumTaxonomy } from 'hooks/useMuseum'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useMemo, useState } from 'react'
import { useWindow } from '../../context/Window'

export default function MuseumPage({ location }: { location: { search: string } }): JSX.Element {
    const { exhibits, isLoading, error, refresh } = useMuseumExhibits()
    const { categories, types, collections } = useMuseumTaxonomy()
    const { isModerator } = useUser()
    const openExhibitForm = useExhibitForm()
    const [filters, setFilters] = useState<MuseumFilterState>(EMPTY_FILTERS)

    // Same URL sync as /side-projects: the app window's location is the source of truth, since
    // re-navigating an open /museum window only updates appWindow.location
    const { appWindow } = useWindow()
    const windowSearch = appWindow?.location?.search
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setFilters(filtersFromSearch(windowSearch ?? window.location.search))
        }
    }, [location?.search, windowSearch])

    const updateFilters = (next: MuseumFilterState) => {
        setFilters(next)
        if (typeof window === 'undefined') {
            return
        }
        const search = filtersToSearch(next)
        navigate(search ? `${window.location.pathname}?${search}` : window.location.pathname, { replace: true })
    }

    const filteredExhibits = useMemo(() => {
        const matches = exhibits.filter(
            (exhibit) =>
                (!filters.category || exhibit.category?.slug === filters.category) &&
                (!filters.type || exhibit.type?.slug === filters.type) &&
                (!filters.collection ||
                    exhibit.collections.some((collection) => collection.slug === filters.collection))
        )
        const direction = filters.sort === 'oldest' ? 1 : -1
        return matches.sort((a, b) => direction * a.date.localeCompare(b.date) || a.title.localeCompare(b.title))
    }, [exhibits, filters])

    const hasActiveFilters = Boolean(filters.category || filters.type || filters.collection)
    const activeCollection = collections.find((collection) => collection.slug === filters.collection)

    return (
        <>
            <SEO
                title="Marketing museum - PostHog"
                description="A walk through PostHog's marketing history: launches, campaigns, billboards, merch, videos, ads, and the weird stuff in between."
                image="/images/og/default.png"
            />
            <Editor
                hideToolbar
                hasPadding={false}
                type="museum"
                proseSize="base"
                maxWidth="100%"
                bookmark={{
                    title: 'Marketing museum',
                    description: "A walk through PostHog's marketing history",
                }}
            >
                <div
                    data-scheme="primary"
                    className="@container not-prose mx-auto flex min-h-full max-w-7xl flex-col gap-6 bg-transparent p-4 text-primary @xl:p-6"
                >
                    <header className="px-2">
                        <h1 className="m-0 text-2xl @xl:text-3xl">The PostHog marketing museum</h1>
                        <p className="mb-0 mt-2 max-w-3xl text-base leading-relaxed text-secondary">
                            Launches, campaigns, billboards, merch, videos, ads, and the weird stuff in between. Pick an
                            exhibit to see the story behind it.
                        </p>
                    </header>

                    <div className="px-2">
                        <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
                            <MuseumFilters
                                filters={filters}
                                onChange={updateFilters}
                                categories={categories}
                                types={types}
                                collections={collections}
                            />
                            {isModerator && (
                                <OSButton
                                    variant="primary"
                                    size="sm"
                                    onClick={() => openExhibitForm(undefined, () => refresh())}
                                >
                                    Add exhibit
                                </OSButton>
                            )}
                        </div>

                        <div className="mb-4 flex items-center gap-2 text-sm text-secondary">
                            <span>
                                {isLoading
                                    ? 'Loading…'
                                    : hasActiveFilters
                                    ? `${filteredExhibits.length} of ${exhibits.length} exhibits`
                                    : `${exhibits.length} exhibits`}
                            </span>
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={() => updateFilters({ ...EMPTY_FILTERS, sort: filters.sort })}
                                    className="font-semibold underline hover:text-primary"
                                >
                                    Clear filters
                                </button>
                            )}
                        </div>
                        {activeCollection?.description && (
                            <p className="mb-6 mt-0 max-w-3xl border-l-2 border-primary pl-3 text-sm text-secondary">
                                {activeCollection.description}
                            </p>
                        )}

                        {isLoading ? (
                            <div className="flex items-center justify-center py-16">
                                <IconSpinner className="size-8 animate-spin opacity-50" />
                            </div>
                        ) : error && exhibits.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="m-0 text-secondary">
                                    Couldn't load the museum – check your connection and try again.
                                </p>
                                <OSButton size="md" className="mt-2" onClick={refresh}>
                                    Try again
                                </OSButton>
                            </div>
                        ) : filteredExhibits.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="m-0 text-secondary">No exhibits match the current filters.</p>
                                {hasActiveFilters && (
                                    <OSButton size="md" className="mt-2" onClick={() => updateFilters(EMPTY_FILTERS)}>
                                        Clear filters
                                    </OSButton>
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 @md:grid-cols-2 @3xl:grid-cols-3 @5xl:grid-cols-4">
                                {filteredExhibits.map((exhibit) => (
                                    <ExhibitCard key={exhibit.id} exhibit={exhibit} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Editor>
        </>
    )
}
