import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, useSearchBox, useRefinementList, useHits } from 'react-instantsearch-hooks-web'
import { Hit } from 'instantsearch.js'
import Link from 'components/Link'
import { classNames } from 'lib/utils'

const searchClient = algoliasearch('7VNQB5W0TX', 'e9ff9279dc8771a35a26d586c73c20a8')

type Result = Hit<{
    id: string
    type: 'blog' | 'docs' | 'api' | 'question' | 'handbook'
    slug: string
    title: string
    excerpt: string
}>

const SearchBox = () => {
    const { query, refine, clear, isSearchStalled } = useSearchBox()

    return (
        <div className="relative flex items-center border-2 rounded border-gray-accent-light">
            <input className="w-full py-1 px-2" value={query} onChange={(event) => refine(event.target.value)} />

            <button className="absolute right-4" onClick={clear}>
                ✕
            </button>
        </div>
    )
}

const RefinementList = () => {
    const { items, refine } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })

    return (
        <div className="ais-RefinementList">
            <ul className="flex items-center flex-wrap space-x-2 list-none p-0">
                {items.map((item) => (
                    <li
                        key={item.value}
                        className={classNames('rounded p-0.5', item.isRefined && 'bg-gray-accent-light')}
                    >
                        <label className="flex items-center space-x-1 text-gray-accent-dark">
                            <input
                                className="sr-only"
                                type="checkbox"
                                value={item.value}
                                checked={item.isRefined}
                                onChange={() => refine(item.value)}
                            />
                            <span className="ais-RefinementList-labelText">{item.label}</span>
                            <span className="ais-RefinementList-count">{item.count}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Hits = () => {
    const { hits } = useHits<Result>()

    return (
        <div className="overflow-y-scroll overscroll-none text-left">
            {hits.length > 0 ? (
                <ol className="list-none m-0">
                    {hits.map((hit) => {
                        return (
                            <li key={hit.objectID} className="focus-within:bg-gray-accent-light rounded">
                                <Link
                                    className="w-full p-2 text-red font-semibold flex flex-col space-y-1"
                                    to={'/' + hit.slug}
                                >
                                    <span>{hit.title}</span>
                                    <p className="text-sm m-0 text-gray">{hit.excerpt}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ol>
            ) : (
                <div className="w-full flex items-center justify-center">No results</div>
            )}
        </div>
    )
}

export default function SearchResults() {
    return (
        <div
            className="z-50 p-8 bg-white rounded-md shadow w-full max-w-2xl flex flex-col space-y-2"
            style={{ zIndex: '999999', height: '500px' }}
        >
            <InstantSearch searchClient={searchClient} indexName="dev_posthog_com">
                <SearchBox />
                <RefinementList />
                <Hits />
            </InstantSearch>
        </div>
    )
}
