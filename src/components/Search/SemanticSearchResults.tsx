import CloudinaryImage from 'components/CloudinaryImage'
import React, { useMemo, useState } from 'react'
import Link from 'components/Link'
import { classNames } from 'lib/utils'
import { useSearch, SearchResultType } from './SearchContext'
import { navigate } from 'gatsby'
import { Combobox, RadioGroup } from '@headlessui/react'
import { CallToAction } from 'components/CallToAction'
import { Search } from 'components/Icons/Icons'
import usePostHog from '../../hooks/usePostHog'
import { categories } from './SearchResults'
import { SemanticSearchResult } from './useInkeepSearch'
import { useHybridSearch, HybridSearchResult } from './useHybridSearch'

type Category = (typeof categories)[number]

// Mod function that can handle negative numbers
function mod(n: number, m: number) {
    return ((n % m) + m) % m
}

type SemanticSearchResultsProps = {
    initialFilter?: SearchResultType
}

const resultURL = (result: SemanticSearchResult) => result.url + (result.fragment ? `#${result.fragment}` : '')

export default function SemanticSearchResults(props: SemanticSearchResultsProps): JSX.Element {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState<Category>(
        props.initialFilter
            ? (categories.find((category) => category.type === props.initialFilter) as Category)
            : categories[0]
    )
    const { results, loading, error } = useHybridSearch(query)
    const { close } = useSearch()
    const posthog = usePostHog()

    const countByType = useMemo(() => {
        const counts: Record<string, number> = {}
        results.forEach((result) => {
            counts[result.type] = (counts[result.type] || 0) + 1
        })
        return counts
    }, [results])

    const filteredResults = useMemo(
        () => (category.type === 'all' ? results : results.filter((result) => result.type === category.type)),
        [results, category]
    )

    const onSelect = (result: HybridSearchResult | null) => {
        if (!result) return
        posthog?.capture('web search result clicked', {
            title: result.title,
            slug: result.url.slice(1),
            category: category.type,
            query,
            type: result.type,
            searchEngine: 'hybrid',
            searchSources: result.sources,
        })

        close()
        navigate(resultURL(result))
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Tab') {
            event.preventDefault()

            setCategory((category) => {
                const availableCategories = categories.filter(
                    (item) => item.type === 'all' || countByType[item.type] > 0
                )
                if (availableCategories.length === 0) return category

                const currentIdx = availableCategories.findIndex((item) => item.type === category.type)

                return !event.shiftKey
                    ? availableCategories[mod(currentIdx + 1, availableCategories.length)]
                    : availableCategories[mod(currentIdx - 1, availableCategories.length)]
            })
        }
    }

    const compareResults = (a: SemanticSearchResult | null, b: SemanticSearchResult | null) => {
        return a?.url === b?.url && a?.fragment === b?.fragment
    }

    return (
        <Combobox value={null} onChange={onSelect} by={compareResults} nullable>
            {({ activeOption }: { activeOption: SemanticSearchResult | null }) => (
                <div
                    className="search-results z-[50] bg-white rounded overflow-hidden shadow-xl flex flex-col h-full"
                    onKeyDown={handleKeyDown}
                >
                    <div className="relative flex items-center border-b border-input dark:border-black dark:border-b-2">
                        <div className="absolute left-4 z-20">
                            <Search className="w-5 h-5 opacity-40" />
                        </div>
                        <Combobox.Input
                            className="w-full py-3 pl-11 pr-4 font-medium focus:outline-none bg-white border-none ring-0 focus:ring-0 placeholder:text-black/25 dark:placeholder:text-white/25"
                            placeholder="Search PostHog.com..."
                            autoComplete="off"
                            onKeyDown={(event: React.KeyboardEvent) =>
                                event.key === 'Tab' ? event.preventDefault() : null
                            }
                            value={query}
                            displayValue={() => query}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <kbd
                            role="button"
                            className="hidden md:block absolute right-4 text-xs border border-b-2 border-input dark:/50 rounded-sm px-1.5 py-0.5 text-black/40 dark:text-white/40 font-sans cursor-pointer"
                            onClick={close}
                            style={{ fontSize: '10px' }}
                        >
                            ESC
                        </kbd>
                    </div>

                    <div className="grid md:grid-cols-2 min-h-0 flex-grow border-b border-primary dark:">
                        <section className="overscroll-none bg-white text-left overflow-y-auto border-r border-input dark:/50">
                            {loading ? (
                                <ol className="list-none m-0 p-0 dark:bg-black">
                                    {new Array(5).fill({}).map((_, index) => (
                                        <li
                                            key={index}
                                            className="px-2 py-3 space-y-1 border-y border-input dark:/80 -mt-px"
                                        >
                                            <div className="w-24 bg-accent-light/60 /80 h-3.5 animate-pulse rounded-sm"></div>
                                            <div className="w-64 bg-accent-light/60 /80 h-5 animate-pulse rounded-sm"></div>
                                            <div className="w-32 bg-accent-light/60 /80 h-3 animate-pulse rounded-sm"></div>
                                        </li>
                                    ))}
                                </ol>
                            ) : filteredResults.length > 0 ? (
                                <Combobox.Options as="ol" className="list-none m-0 p-0 dark:bg-black" static hold>
                                    {filteredResults.map((result) => {
                                        return (
                                            <Combobox.Option
                                                key={resultURL(result)}
                                                value={result}
                                                className="group ui-active:bg-tan/50 dark:ui-active:bg-accent-dark hover:bg-tan/50 hover:bg-accent border-b border-t -mt-px border-input hover:border-primary/30 dark:/80 dark:hover:/90 ui-active:border-primary/30 dark:ui-active:/90 last:border-b-0 pl-3 pr-2"
                                            >
                                                <Link
                                                    className="w-full px-2 py-3 text-black/75 dark:text-white/75 group-hover:text-black/100 dark:group-hover:text-white/100 font-semibold flex flex-col space-y-0.5 focus:outline-none leading-tight"
                                                    to={resultURL(result)}
                                                    onClick={() => close()}
                                                >
                                                    <span
                                                        className={`text-[13px] font-normal ${
                                                            result.type === 'api' ? 'uppercase' : 'capitalize'
                                                        } text-black/60 dark:text-white/60 rounded-full`}
                                                    >
                                                        {result.type}
                                                    </span>
                                                    <span className="flex space-x-2 items-center">
                                                        <span className="line-clamp-1 font-semibold">
                                                            {result.title}
                                                        </span>
                                                    </span>
                                                    <span className="text-[13px] font-normal">
                                                        <span className="text-black dark:text-white opacity-[35%]">
                                                            posthog.com
                                                        </span>
                                                        <span className="text-black/50 dark:text-white/50">
                                                            {result.url}
                                                        </span>
                                                    </span>
                                                </Link>
                                            </Combobox.Option>
                                        )
                                    })}
                                </Combobox.Options>
                            ) : query.trim().length >= 3 && !loading ? (
                                <div className="p-8">
                                    <div className="text-center">
                                        <h3 className="mb-0 text-xl">{error ? 'Search error' : 'No results'}</h3>
                                        <p className="text-[15px] opacity-75 mb-0">
                                            {error
                                                ? 'Something went wrong. Try again?'
                                                : "This doesn't happen often, but we're stumped!"}
                                        </p>
                                    </div>

                                    <div className="text-center mb-4">
                                        <CloudinaryImage
                                            placeholder="none"
                                            loading="eager"
                                            quality={100}
                                            objectFit="contain"
                                            alt=""
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/media/social-media-headers/hogs/detective_hog.png"
                                            className="max-w-[150px]"
                                        />
                                    </div>

                                    <div className="border border-primary dark: p-4 rounded bg-tan/50 dark:bg-primary">
                                        <h5 className="text-base opacity-75 mb-0">Tip: Ask the community</h5>
                                        <p className="text-sm mb-4 opacity-80">
                                            Our team monitor the Questions page. Somone's bound to know the answer!
                                        </p>

                                        <CallToAction
                                            type="primary"
                                            size="sm"
                                            width="full"
                                            className=""
                                            href="/questions"
                                        >
                                            Ask a question
                                        </CallToAction>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 text-center">
                                    <p className="text-[15px] opacity-50 mb-0">Start typing to search…</p>
                                </div>
                            )}
                        </section>
                        <section className="hidden md:block overflow-y-auto bg-tan/50 dark:bg-primary p-2 h-full">
                            {activeOption ? (
                                <div className="p-6 bg-white rounded border border-primary/40 dark:">
                                    <div className="text-left">
                                        <span
                                            className={`block text-sm font-semibold text-black/50 dark:text-white/50 ${
                                                activeOption.type === 'api' ? 'uppercase' : 'capitalize'
                                            } mb-1`}
                                        >
                                            {activeOption.type}
                                        </span>
                                        <h4 className="text-2xl mb-3 leading-[1.125]">{activeOption.title}</h4>
                                        <p className="text-black/70 dark:text-white/80 text-[15px] mb-0">
                                            {activeOption.excerpt}
                                        </p>
                                        {activeOption.fragment && (
                                            <span className="block mt-5">
                                                <span className="block text-xs text-black/60 dark:text-white/60 font-semibold mb-3">
                                                    Jump to section
                                                </span>
                                                <Link
                                                    to={resultURL(activeOption)}
                                                    onClick={() => close()}
                                                    className="text-sm font-semibold text-black/60 dark:text-white/60 hover:text-black/90 dark:hover:text-white/90"
                                                >
                                                    {activeOption.fragment.replace(/-/g, ' ')}
                                                </Link>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </section>
                    </div>

                    <RadioGroup value={category} onChange={setCategory} className="bg-tan/25 -mt-[1px]">
                        <RadioGroup.Label className="sr-only">Filter results by category</RadioGroup.Label>
                        <div className="flex items-center md:flex-wrap list-none p-0 overflow-auto dark:border-t dark:border-black">
                            {categories.map((item) => {
                                const count = item.type === 'all' ? results.length : countByType[item.type] || 0

                                return (
                                    <RadioGroup.Option
                                        key={item.type}
                                        value={item}
                                        disabled={!count && item.type !== 'all'}
                                        onClick={() => {
                                            if (item.type === category.type) {
                                                setCategory(categories[0])
                                            }
                                        }}
                                        className={
                                            'relative px-3 first:px-5 py-2 before:absolute before:top-[-1px] before:left-0 before:right-0 before:h-[2px] ui-checked:before:h-[3px] ui-checked:before:bg-red ui-not-checked:before:bg-transparent ui-not-checked:hover:before:bg-black/40 ui-not-checked:text-gray-accent-dark dark:ui-not-checked:text-gray-accent-light cursor-pointer'
                                        }
                                    >
                                        <label
                                            className={classNames(
                                                'flex items-baseline select-none space-x-1',
                                                count !== 0 && 'cursor-pointer'
                                            )}
                                        >
                                            <span className="text-sm ui-checked:font-bold">{item.name}</span>
                                            {item.type !== 'all' && (
                                                <span className="text-xs text-black/40 dark:text-white/40">
                                                    {count}
                                                </span>
                                            )}
                                        </label>
                                    </RadioGroup.Option>
                                )
                            })}
                        </div>
                    </RadioGroup>
                </div>
            )}
        </Combobox>
    )
}
