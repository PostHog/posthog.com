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
import { Search } from 'components/Icons/Icons'

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
        fragment: string
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
    const [category, setCategory] = useState<Category>(
        props.initialFilter
            ? (categories.find((category) => category.type === props.initialFilter) as Category)
            : categories[0]
    )
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
                    className="search-results z-50 bg-white rounded overflow-hidden shadow-xl flex flex-col h-full"
                    onKeyDown={handleKeyDown}
                >
                    <SearchBox />
                    <Hits activeOption={activeOption} />
                    <RefinementList
                        initialFilter={props.initialFilter}
                        category={category}
                        setCategory={setCategory}
                        refine={refine}
                        items={items}
                    />
                </div>
            )}
        </Combobox>
    )
}

const SearchBox = () => {
    const { query, refine } = useSearchBox()

    return (
        <div className="relative flex items-center border-b border-gray-accent-light/50">
            <div className="absolute left-4 z-20">
                <Search className="w-5 h-5 opacity-40" />
            </div>
            <Combobox.Input
                className="w-full py-3 pl-11 pr-4 font-medium focus:outline-none border-none ring-0 focus:ring-0 placeholder:text-black/25"
                placeholder="Search PostHog.com..."
                autoComplete="off"
                onKeyDown={(event: React.KeyboardEvent) => (event.key === 'Tab' ? event.preventDefault() : null)}
                value={query}
                onChange={(event) => refine(event.target.value)}
            />

            <kbd
                className="hidden md:block absolute right-4 text-xs border border-b-2 border-gray-accent-light/50 rounded-sm px-1.5 py-0.5 text-black/40 font-sans"
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
        <RadioGroup value={props.category} onChange={props.setCategory} className="bg-tan/25 -mt-[1px]">
            <RadioGroup.Label className="sr-only">Filter results by category</RadioGroup.Label>
            <div className="flex items-center md:flex-wrap list-none p-0 overflow-auto">
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
                                item.type === 'not-all' ? 'sr-only' : '',
                                'relative px-3 first:px-5 py-2 ui-checked:text-red before:absolute before:top-[-1px] before:left-0 before:right-0 before:h-[2px] ui-checked:before:h-[3px] ui-checked:before:bg-red ui-not-checked:before:bg-transparent ui-not-checked:hover:before:bg-black/40 ui-not-checked:text-gray-accent-dark cursor-pointer'
                            )}
                        >
                            {({ checked }) => (
                                <label
                                    className={classNames(
                                        'flex items-baseline select-none space-x-1',
                                        result?.count !== 0 && 'cursor-pointer'
                                    )}
                                >
                                    <span className="text-sm ui-checked:font-bold">{item.name}</span>
                                    {item.type !== 'all' && (
                                        <span
                                            className={classNames(
                                                'text-xs',
                                                checked ? 'text-black/40' : 'text-black/40'
                                            )}
                                        >
                                            {result?.count || 0}
                                        </span>
                                    )}
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
        <div className="grid md:grid-cols-2 min-h-0 flex-grow border-b border-gray-accent-light">
            <section className="overscroll-none text-left overflow-y-auto border-r border-gray-accent-light/50">
                {hits.length > 0 ? (
                    <Combobox.Options as="ol" className="list-none m-0" static hold>
                        {hits.map((hit) => {
                            return (
                                <Combobox.Option
                                    key={hit.objectID}
                                    value={hit}
                                    className="group ui-active:bg-tan/50 hover:bg-tan/50 border-b border-t mt-[-1px] border-gray-accent-light/25 hover:border-gray-accent-light/30 ui-active:border-gray-accent-light/30 last:border-b-0 pl-3 pr-2"
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
                                <h3 className="mb-0 text-xl">No results</h3>
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
                                <p className="text-sm mb-4 opacity-80">
                                    Our team monitor the Questions page. Somone's bound to know the answer!
                                </p>

                                <CallToAction type="primary" size="sm" width="full" className="" href="/questions">
                                    Ask a question
                                </CallToAction>
                            </div>
                        </div>
                    </>
                )}
            </section>
            <section className="hidden md:block overflow-y-auto bg-tan/50 p-2 h-full">
                {activeOption ? (
                    <div className="p-6 bg-white rounded border border-gray-accent-light/40">
                        <div className="text-left">
                            <span
                                className={`block text-sm font-semibold text-black/50 ${
                                    activeOption.type === 'api' ? 'uppercase' : 'capitalize'
                                } mb-1`}
                            >
                                {activeOption.type}
                            </span>
                            <h4 className="text-2xl mb-3 leading-[1.125]">{activeOption.title}</h4>
                            <p className="text-black/70 text-[15px] mb-0">{activeOption.excerpt}</p>
                            {activeOption.type !== 'question' ? (
                                <span className="block text-xs text-gray font-semibold mt-5 mb-3">On this page</span>
                            ) : (
                                <></>
                            )}
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
                                                    <Link to={`/${activeOption.slug}#${heading.fragment}`}>
                                                        {heading.value}
                                                    </Link>
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
