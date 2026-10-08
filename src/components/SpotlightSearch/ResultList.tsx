import React from 'react'
import { configForType } from './categories'
import type { ResultGroup, SpotlightSearchResult } from './types'
import SpotlightRow, { spotlightOptionId } from './SpotlightRow'

const SkeletonRow = () => (
    <li aria-hidden className="flex items-center gap-3 rounded-lg px-2.5 py-2">
        <div className="rounded-md animate-pulse size-8 shrink-0 bg-accent" />
        <div className="min-w-0 flex-1 space-y-1.5">
            <div className="h-3.5 w-1/3 animate-pulse rounded bg-accent" />
            <div className="w-2/3 h-3 rounded animate-pulse bg-accent" />
        </div>
    </li>
)

type ResultListProps = {
    loading: boolean
    query: string
    groups: ResultGroup[]
    activeFilter: string | null
    selectedIndex: number
    indexOffset: number
    itemRefs: React.MutableRefObject<(HTMLLIElement | null)[]>
    onSelectIndex: (index: number) => void
    onApplyFilter: (type: string, options: { keepQuery: boolean }) => void
    onOpenResult: (result: SpotlightSearchResult) => void
}

export default function ResultList({
    loading,
    query,
    groups,
    activeFilter,
    selectedIndex,
    indexOffset,
    itemRefs,
    onSelectIndex,
    onApplyFilter,
    onOpenResult,
}: ResultListProps): JSX.Element | null {
    if (loading && (query || activeFilter)) {
        return (
            <ul role="presentation" className="p-0 m-0 list-none">
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
            </ul>
        )
    }

    if (groups.length === 0) {
        return !query && activeFilter ? (
            <p className="m-0 px-2.5 py-4 text-center text-sm text-secondary">
                Type to search {configForType(activeFilter).label.toLowerCase()}...
            </p>
        ) : null
    }

    let flatIndex = indexOffset - 1

    return (
        <>
            {groups.map((group) => {
                const groupConfig = configForType(group.type)
                return (
                    <div key={group.type} role="group" aria-label={groupConfig.label}>
                        {!activeFilter && (
                            <h5 className="m-0 px-2.5 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                                <button
                                    onClick={() => onApplyFilter(group.type, { keepQuery: true })}
                                    title={`Only show ${groupConfig.label.toLowerCase()}`}
                                    className="tracking-wide uppercase hover:text-primary"
                                >
                                    {groupConfig.label}
                                </button>
                            </h5>
                        )}
                        <ul role="presentation" className="p-0 m-0 list-none">
                            {group.results.map((result) => {
                                flatIndex++
                                const index = flatIndex
                                return (
                                    <SpotlightRow
                                        key={result.url}
                                        id={spotlightOptionId('result', index)}
                                        ref={(element) => (itemRefs.current[index] = element)}
                                        selected={index === selectedIndex}
                                        icon={groupConfig.icon}
                                        onActive={() => onSelectIndex(index)}
                                        onSelect={() => onOpenResult(result)}
                                        trailing={
                                            <span className="ml-auto hidden shrink-0 text-xs text-secondary @md:block max-w-[200px] truncate">
                                                {result.url}
                                            </span>
                                        }
                                    >
                                        <div className="min-w-0">
                                            <p className="m-0 truncate text-[15px] font-semibold text-primary">
                                                {result.title}
                                            </p>
                                            <p className="m-0 text-sm truncate text-secondary">{result.excerpt}</p>
                                        </div>
                                    </SpotlightRow>
                                )
                            })}
                        </ul>
                    </div>
                )
            })}
        </>
    )
}
