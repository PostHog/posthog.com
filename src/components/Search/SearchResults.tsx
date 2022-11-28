import React, { useEffect, useState } from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, useSearchBox, useRefinementList, useHits } from 'react-instantsearch-hooks-web'
import { Hit } from 'instantsearch.js'
import Link from 'components/Link'
import { classNames } from 'lib/utils'
import { useSearch, SearchResultType } from './SearchContext'
import { Combobox } from '@headlessui/react'

const searchClient = algoliasearch('7VNQB5W0TX', 'e9ff9279dc8771a35a26d586c73c20a8')

type Result = Hit<{
    id: string
    type: 'blog' | 'docs' | 'api' | 'question' | 'handbook' | 'manual'
    title: string
    slug: string
    schema?: {
        httpVerb: string
        path: string
    }[]
    headings: {
        value: string
        depth: number
    }[]
    excerpt: string
}>

const categories = [
    {
        type: 'docs',
        name: 'Docs',
    },
    {
        type: 'manual',
        name: 'Manual',
    },
    {
        type: 'blog',
        name: 'Blog',
    },
    {
        type: 'tutorial',
        name: 'Tutorials',
    },
    {
        type: 'question',
        name: 'Questions',
    },
    {
        type: 'handbook',
        name: 'Handbook',
    },
    {
        type: 'api',
        name: 'API',
    },
]

type SearchResultsProps = {
    initialFilter?: SearchResultType
}

export default function SearchResults(props: SearchResultsProps) {
    const { close } = useSearch()

    return (
        <Combobox value={{} as Result} onChange={close}>
            {({ activeOption }) => (
                <div className="z-50 p-6 bg-white rounded-md shadow flex flex-col space-y-2 h-full">
                    <InstantSearch searchClient={searchClient} indexName="dev_posthog_com">
                        <SearchBox />
                        <RefinementList initialFilter={props.initialFilter} />
                        <Hits activeOption={activeOption} />
                    </InstantSearch>
                </div>
            )}
        </Combobox>
    )
}

const SearchBox = () => {
    const { query, refine } = useSearchBox()

    return (
        <div className="relative flex items-center rounded">
            <Combobox.Input
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

type RefinementListProps = {
    initialFilter?: SearchResultType
}

const RefinementList: React.FC<RefinementListProps> = (props) => {
    const [selected, setSelected] = useState<typeof categories[number] | null>(null)
    const { items, refine } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })

    useEffect(() => {
        if (props.initialFilter) {
            refine(props.initialFilter)
            setSelected(categories.find(({ type }) => type === props.initialFilter) || null)
        }
    }, [props.initialFilter])

    const updateSelected = (category: typeof categories[number]) => {
        setSelected((selected) => {
            refine(category.type)

            if (selected?.type === category.type) {
                return null
            } else if (selected?.type) {
                refine(selected.type)
            }

            return category
        })
    }

    return (
        <fieldset className="border-none py-2">
            <legend className="sr-only">Filter results by category</legend>
            <ul className="flex items-center flex-wrap space-x-2 list-none p-0">
                {categories.map((item) => {
                    const result = items.find((res) => res.value === item.type)
                    const isSelected = selected?.type === item.type

                    return (
                        <li
                            key={item.type}
                            className={classNames(
                                'rounded px-1.5 py-0.5',
                                isSelected ? 'bg-red text-white' : 'text-gray-accent-dark bg-gray-accent-light'
                            )}
                        >
                            <label className={classNames('flex items-center', result?.count !== 0 && 'cursor-pointer')}>
                                <input
                                    className="sr-only"
                                    tabIndex={-1}
                                    type="checkbox"
                                    disabled={!result?.count}
                                    value={item.type}
                                    checked={isSelected}
                                    onChange={() => updateSelected(item)}
                                />
                                <span className="text-sm mr-2">{item.name}</span>
                                <span className={classNames('text-xs', isSelected ? 'text-white/80' : 'text-black/40')}>
                                    {result?.count || 0}
                                </span>
                            </label>
                        </li>
                    )
                })}
            </ul>
        </fieldset>
    )
}

type HitsProps = {
    activeOption: Result | null
}

const Hits: React.FC<HitsProps> = ({ activeOption }) => {
    const { hits } = useHits<Result>()

    return (
        <div className="grid grid-cols-2 min-h-0 flex-grow">
            <section className="overscroll-none text-left overflow-y-scroll">
                {hits.length > 0 ? (
                    <Combobox.Options as="ol" className="list-none m-0" static>
                        {hits.map((hit) => {
                            return (
                                <Combobox.Option
                                    key={hit.objectID}
                                    value={hit}
                                    className="ui-active:bg-gray-accent-light rounded hover:bg-gray-accent-light"
                                >
                                    <Link
                                        className="w-full px-3 py-2 text-red font-semibold flex flex-col space-y-1 focus:outline-none"
                                        to={'/' + hit.slug}
                                    >
                                        <span className="line-clamp-1">{hit.title}</span>
                                        <p className="text-sm m-0 text-gray line-clamp-2">{hit.excerpt}</p>
                                    </Link>
                                </Combobox.Option>
                            )
                        })}
                    </Combobox.Options>
                ) : (
                    <div className="w-full flex items-center justify-center">No results</div>
                )}
            </section>
            <section className="overflow-y-scroll bg-tan p-10 h-full">
                {activeOption ? (
                    <div className="text-left">
                        <span className="block text-center text-xs font-semibold text-red uppercase">
                            {activeOption.type}
                        </span>
                        <h4 className="text-center">{activeOption.title}</h4>
                        <p className="text-black/70">{activeOption.excerpt}</p>
                        <span className="block text-xs text-gray font-semibold mb-3">On this page</span>
                        {activeOption.type === 'api' ? (
                            <ol className="list-none m-0 text-sm text-gray font-semibold space-y-2">
                                {activeOption?.schema?.map((endpoint, index) => {
                                    return (
                                        <li
                                            key={activeOption.type + endpoint.httpVerb + endpoint.path + index}
                                            className="font-code text-xs whitespace-nowrap space-x-2 flex items-center"
                                        >
                                            <span className="uppercase">{endpoint.httpVerb}</span>
                                            <div className="text-ellipsis flex-shrink overflow-hidden">
                                                <span>{endpoint.path}</span>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ol>
                        ) : (
                            <ol className="list-none m-0 text-sm text-gray font-semibold space-y-2">
                                {activeOption?.headings
                                    ?.filter(({ depth }) => depth <= 2)
                                    .map((heading, index) => {
                                        return (
                                            <li key={activeOption.type + heading.value + index}>
                                                <span>{heading.value}</span>
                                            </li>
                                        )
                                    })}
                            </ol>
                        )}
                    </div>
                ) : null}
            </section>
        </div>
    )
}
