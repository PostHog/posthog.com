import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, useSearchBox, useRefinementList, useHits } from 'react-instantsearch-hooks-web'
import { Hit } from 'instantsearch.js'
import Link from 'components/Link'
import { classNames } from 'lib/utils'

const searchClient = algoliasearch('7VNQB5W0TX', 'e9ff9279dc8771a35a26d586c73c20a8')

type Result = Hit<{
    id: string
    type: 'blog' | 'docs' | 'api' | 'question' | 'handbook' | 'manual'
    title: string
    slug: string
    headings: {
        value: string
        depth: number
    }[]
    excerpt: string
}>

const SearchBox = () => {
    const { query, refine, isSearchStalled } = useSearchBox()

    return (
        <div className="relative flex items-center rounded">
            <input
                className="w-full py-2 px-3 bg-black/5 focus:outline-none rounded"
                placeholder="Search..."
                value={query}
                onChange={(event) => refine(event.target.value)}
            />

            <kbd
                className="absolute right-4 text-xs font-code bg-black/10 rounded px-1 py-0.5 text-black/40"
                style={{ fontSize: '10px' }}
            >
                ESC
            </kbd>
        </div>
    )
}

const RefinementList = () => {
    const { items, refine } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })

    const formatLabel = (label: Result['type']): string => {
        return {
            blog: 'Blog',
            docs: 'Docs',
            handbook: 'Handbook',
            api: 'API',
            tutorial: 'Tutorials',
            manual: 'Manual',
            question: 'Questions',
        }[label]
    }

    return (
        <div className="ais-RefinementList">
            <ul className="flex items-center flex-wrap space-x-2 list-none p-0">
                {items.map((item) => (
                    <li
                        key={item.value}
                        className={classNames('rounded px-1 py-0.5', item.isRefined && 'bg-gray-accent-light')}
                    >
                        <label className="flex items-center text-gray-accent-dark cursor-pointer">
                            <input
                                className="sr-only"
                                tabIndex={-1}
                                type="checkbox"
                                value={item.value}
                                checked={item.isRefined}
                                onChange={() => refine(item.value)}
                            />
                            <span className="ais-RefinementList-labelText">
                                {formatLabel(item.label as Result['type'])}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const Hits = () => {
    const [currentResult, setCurrentResult] = React.useState<Result | null>(null)
    const { hits } = useHits<Result>()

    return (
        <div className="grid grid-cols-2 min-h-0 flex-grow">
            <section className="overscroll-none text-left" style={{ overflowY: 'scroll' }}>
                {hits.length > 0 ? (
                    <ol className="list-none m-0">
                        {hits.map((hit) => {
                            return (
                                <li
                                    key={hit.objectID}
                                    className="focus-within:bg-gray-accent-light rounded hover:bg-gray-accent-light"
                                    onMouseOver={() => setCurrentResult(hit)}
                                    onFocus={() => setCurrentResult(hit)}
                                >
                                    <Link
                                        className="w-full px-3 py-2 text-red font-semibold flex flex-col space-y-1 focus:outline-none"
                                        to={'/' + hit.slug}
                                    >
                                        <span className="line-clamp-1">{hit.title}</span>
                                        <p className="text-sm m-0 text-gray line-clamp-2">{hit.excerpt}</p>
                                    </Link>
                                </li>
                            )
                        })}
                    </ol>
                ) : (
                    <div className="w-full flex items-center justify-center">No results</div>
                )}
            </section>
            <section className="overflow-y-scroll bg-tan p-6 h-full">
                {currentResult ? (
                    <div className="text-left mt-4">
                        <span className="block text-center text-xs font-semibold text-red uppercase">
                            {currentResult.type}
                        </span>
                        <h4 className="text-center">{currentResult.title}</h4>
                        <p className="text-black/70">{currentResult.excerpt}</p>
                        <span className="text-xs text-gray font-semibold mb-3">On this page</span>
                        <ol className="list-none m-0 text-sm text-gray font-semibold space-y-2">
                            {currentResult?.headings
                                ?.filter(({ depth }) => depth <= 2)
                                .map((heading) => {
                                    return (
                                        <li key={heading.value}>
                                            <span>{heading.value}</span>
                                        </li>
                                    )
                                })}
                        </ol>
                    </div>
                ) : null}
            </section>
        </div>
    )
}

export default function SearchResults() {
    return (
        <div className="z-50 p-6 bg-white rounded-md shadow flex flex-col space-y-2 h-full">
            <InstantSearch searchClient={searchClient} indexName="dev_posthog_com">
                <SearchBox />
                <RefinementList />
                <Hits />
            </InstantSearch>
        </div>
    )
}
