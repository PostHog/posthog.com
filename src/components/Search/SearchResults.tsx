import React, { useEffect, useState } from 'react'
import { useSearchBox, useRefinementList, useHits } from 'react-instantsearch-hooks-web'
import { Hit } from 'instantsearch.js'
import Link from 'components/Link'
import { classNames } from 'lib/utils'
import { useSearch, SearchResultType } from './SearchContext'
import { navigate } from 'gatsby'
import { Combobox, RadioGroup } from '@headlessui/react'
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList'

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

type Category = typeof categories[number]

const categories = [
    {
        type: 'all',
        name: 'All',
    },
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

// Mod function that can handle negative numbers
function mod(n: number, m: number) {
    return ((n % m) + m) % m
}

type SearchResultsProps = {
    initialFilter?: SearchResultType
}

export default function SearchResults(props: SearchResultsProps) {
    const [category, setCategory] = useState<Category>(categories[0])
    const { items, refine } = useRefinementList({ attribute: 'type', sortBy: ['name:asc'] })
    const { close } = useSearch()

    const onSelect = (result: Result) => {
        close()
        navigate('/' + result.slug)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault()

            setCategory((category) => {
                const typeSet = new Set(items.map((item) => item.value))

                const extendedItems = categories.reduce<typeof categories[number][]>((acc, category) => {
                    if (category.type === 'all' || typeSet.has(category.type)) {
                        return [...acc, category]
                    } else {
                        return acc
                    }
                }, [])

                const currentIdx = extendedItems.findIndex((item) => item.name === category.name)

                if (items.length === 0 || items.length === -1) {
                    return category
                }

                return !event.shiftKey
                    ? extendedItems[mod(currentIdx + 1, extendedItems.length)]
                    : extendedItems[mod(currentIdx - 1, extendedItems.length)]
            })
        }
    }

    const compareResults = (a: Result, b: Result) => {
        return a.objectID === b.objectID
    }

    return (
        <Combobox value={{} as Result} onChange={onSelect} by={compareResults}>
            {({ activeOption }) => (
                <div
                    className="z-50 p-6 bg-white rounded-md shadow flex flex-col space-y-2 h-full"
                    onKeyDown={handleKeyDown}
                >
                    <SearchBox />
                    <RefinementList
                        initialFilter={props.initialFilter}
                        category={category}
                        setCategory={setCategory}
                        refine={refine}
                        items={items}
                    />
                    <Hits activeOption={activeOption} />
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
                autoComplete="off"
                onKeyDown={(event: React.KeyboardEvent) => (event.key === 'Tab' ? event.preventDefault() : null)}
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
    category: Category
    setCategory: React.Dispatch<React.SetStateAction<Category>>
    items: RefinementListItem[]
    refine: (value: string) => void
}

const RefinementList: React.FC<RefinementListProps> = (props) => {
    const [selected, setSelected] = React.useState<Category>(props.category)

    useEffect(() => {
        if (props.initialFilter) {
            props.refine(props.initialFilter)
        }
    }, [props.initialFilter])

    useEffect(() => {
        if (selected.type !== 'all') {
            props.refine(selected.type)
        }

        if (props.category.type !== 'all') {
            props.refine(props.category.type)
        }

        setSelected(props.category)
    }, [props.category])

    return (
        <RadioGroup value={props.category} onChange={props.setCategory} className="border-none py-2">
            <RadioGroup.Label className="sr-only">Filter results by category</RadioGroup.Label>
            <div className="flex items-center flex-wrap space-x-2 list-none p-0">
                {categories.map((item) => {
                    const result = props.items.find((res) => res.value === item.type)

                    return (
                        <RadioGroup.Option
                            key={item.type}
                            value={item}
                            disabled={!result?.count}
                            onClick={() => {
                                if (item.type === props.category.type) {
                                    props.setCategory(categories[0])
                                }
                            }}
                            className={classNames(
                                item.type === 'all' ? 'sr-only' : '',
                                'rounded px-1.5 py-0.5 ui-checked:bg-red ui-checked:text-white ui-not-checked:text-gray-accent-dark ui-not-checked:bg-gray-accent-light'
                            )}
                        >
                            {({ checked }) => (
                                <label
                                    className={classNames(
                                        'flex items-center select-none',
                                        result?.count !== 0 && 'cursor-pointer'
                                    )}
                                >
                                    <span className="text-sm mr-2">{item.name}</span>
                                    <span
                                        className={classNames('text-xs', checked ? 'text-white/80' : 'text-black/40')}
                                    >
                                        {result?.count || 0}
                                    </span>
                                </label>
                            )}
                        </RadioGroup.Option>
                    )
                })}
            </div>
        </RadioGroup>
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
                    <Combobox.Options as="ol" className="list-none m-0" static hold>
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
