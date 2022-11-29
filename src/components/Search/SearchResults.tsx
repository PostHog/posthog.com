import React, { useEffect, useState } from 'react'
import { useSearchBox, useRefinementList, useHits } from 'react-instantsearch-hooks-web'
import { Hit } from 'instantsearch.js'
import Link from 'components/Link'
import { classNames } from 'lib/utils'
import { useSearch, SearchResultType } from './SearchContext'
import { navigate } from 'gatsby'
import { Combobox, RadioGroup } from '@headlessui/react'
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'

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
                    className="search-results z-50 bg-white rounded-md shadow-xl flex flex-col space-y-2 h-full"
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
        <div className="relative flex items-center rounded pt-6 px-5">
            <Combobox.Input
                className="w-full py-2 px-3 bg-black/5 focus:outline-none rounded"
                placeholder="Search PostHog.com..."
                autoComplete="off"
                onKeyDown={(event: React.KeyboardEvent) => (event.key === 'Tab' ? event.preventDefault() : null)}
                value={query}
                onChange={(event) => refine(event.target.value)}
            />

            <kbd
                className="hidden md:block absolute right-8 text-xs bg-gray-accent-light rounded px-1 py-0.5 text-black/40 font-sans"
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
        <RadioGroup value={props.category} onChange={props.setCategory} className="border-none py-2 md:px-5">
            <RadioGroup.Label className="sr-only">Filter results by category</RadioGroup.Label>
            <div className="flex items-center md:flex-wrap list-none p-0 overflow-auto px-5 md:px-0">
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
                                'rounded-full px-2 py-0.5 ui-checked:bg-red ui-checked:text-white ui-not-checked:text-gray-accent-dark ui-not-checked:bg-white border ui-not-checked:border-gray-accent-light ui-checked:border-red first:hidden mr-2'
                            )}
                        >
                            {({ checked }) => (
                                <label
                                    className={classNames(
                                        'flex items-baseline select-none space-x-1',
                                        result?.count !== 0 && 'cursor-pointer'
                                    )}
                                >
                                    <span className="text-sm">{item.name}</span>
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
        <div className="grid md:grid-cols-2 min-h-0 flex-grow border-t border-gray-accent-light/50">
            <section className="overscroll-none text-left overflow-y-scroll border-r border-gray-accent-light/50">
                {hits.length > 0 ? (
                    <Combobox.Options as="ol" className="list-none m-0" static hold>
                        {hits.map((hit) => {
                            return (
                                <Combobox.Option
                                    key={hit.objectID}
                                    value={hit}
                                    className="group ui-active:bg-tan/50 hover:bg-gray-accent-light border-b border-gray-accent-light/50 pl-3 pr-2"
                                >
                                    <Link
                                        className="w-full px-2 py-3 text-black/75 group-hover:text-black/100 font-semibold flex flex-col space-y-0.5 focus:outline-none leading-tight"
                                        to={'/' + hit.slug}
                                    >
                                        <span
                                            className={`text-[13px] font-normal ${
                                                hit.type === 'api' ? 'uppercase' : 'capitalize'
                                            } text-gray rounded-full`}
                                        >
                                            {hit.type}
                                        </span>

                                        <span className="line-clamp-1 font-semibold">{hit.title}</span>
                                        {/* <p className="text-sm font-normal m-0 text-gray line-clamp-2">{hit.excerpt}</p> */}
                                        <span className="text-[13px] font-normal">
                                            <span className="text-black opacity-[35%]">posthog.com/</span>
                                            <span className="text-black/50">{hit.slug}</span>
                                        </span>
                                    </Link>
                                </Combobox.Option>
                            )
                        })}
                    </Combobox.Options>
                ) : (
                    <>
                        <div className="p-8">
                            <div className="text-center">
                                <h3 className="mb-0 text-lg">No results</h3>
                                <p className="text-[15px] opacity-75 mb-0">
                                    This doesn't happen often, but we're stumped!
                                </p>
                            </div>

                            <div className="text-center mb-4">
                                <StaticImage
                                    placeholder="none"
                                    loading="eager"
                                    quality={100}
                                    objectFit="contain"
                                    alt=""
                                    src="../../../contents/images/media/social-media-headers/hogs/detective_hog.png"
                                    className="max-w-[150px]"
                                />
                            </div>

                            <div className="border border-gray-accent-light p-4 rounded bg-tan/50">
                                <h5 className="text-base opacity-75 mb-0">Tip: Ask the community</h5>
                                <p className="text-sm mb-4">
                                    Our team monitors the Questions page. Somone's bound to know the answer!
                                </p>

                                <CallToAction type="primary" size="sm" width="full" className="" href="/questions">
                                    Ask a question
                                </CallToAction>
                            </div>
                        </div>
                    </>
                )}
            </section>
            <section className="hidden md:block overflow-y-scroll bg-tan/50 p-2 h-full">
                {activeOption ? (
                    <div className="p-6 bg-white rounded border border-gray-accent-light/25">
                        <div className="text-left">
                            <span
                                className={`block text-sm font-semibold text-black/50 ${
                                    activeOption.type === 'api' ? 'uppercase' : 'capitalize'
                                } mb-0`}
                            >
                                {activeOption.type}
                            </span>
                            <h4 className="text-2xl">{activeOption.title}</h4>
                            <p className="text-black/70 text-[15px]">{activeOption.excerpt}</p>
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
                                <ol className="list-none m-0 text-gray font-semibold space-y-2">
                                    {activeOption?.headings
                                        ?.filter(({ depth }) => depth <= 2)
                                        .map((heading, index) => {
                                            return (
                                                <li
                                                    key={activeOption.type + heading.value + index}
                                                    className="text-sm jumpTo pl-6"
                                                >
                                                    <span>{heading.value}</span>
                                                </li>
                                            )
                                        })}
                                </ol>
                            )}
                        </div>
                    </div>
                ) : null}
            </section>
        </div>
    )
}
