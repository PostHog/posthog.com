import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import SearchResults from './SearchResults'
import { InstantSearch } from 'react-instantsearch-hooks-web'
import algoliasearch from 'algoliasearch/lite'
import usePostHog from '../../hooks/usePostHog'

type SearchContextValue = {
    isVisible: boolean
    open: (from: SearchLocation, filter?: SearchResultType) => void
    close: () => void
}

export type SearchLocation =
    | 'slash'
    | 'ctrl-k'
    | 'sidebar'
    | 'docs-dropdown'
    | 'using-ph-dropdown'
    | 'handbook-dropdown'
    | 'questions'
    | 'mobile-header'
    | '404'
export type SearchResultType = 'blog' | 'docs' | 'api' | 'question' | 'handbook' | 'apps'

const searchClient = algoliasearch(
    process.env.GATSBY_ALGOLIA_APP_ID as string,
    process.env.GATSBY_ALGOLIA_SEARCH_API_KEY as string
)

const SearchContext = React.createContext<SearchContextValue>({
    isVisible: false,
    open: (_location, _filter) => {
        /* noop */
    },
    close: () => {
        /* noop */
    },
})

export const SearchProvider: React.FC = ({ children }) => {
    const posthog = usePostHog()
    const [isVisible, setIsVisible] = React.useState<boolean>(false)
    const [initialFilter, setInitialFilter] = React.useState<SearchResultType | undefined>(undefined)

    React.useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.shadowRoot)
                return
            if (event.key === '/' && !isVisible) {
                event.preventDefault()
                open('slash')
            } else if (event.key === 'k' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault()

                if (isVisible) {
                    close()
                } else {
                    open('ctrl-k')
                }
            }
        }

        window.addEventListener('keydown', handler)

        return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [isVisible])

    const open = (from: SearchLocation, filter?: SearchResultType) => {
        posthog?.capture('web search opened', {
            filter,
            from,
        })

        setInitialFilter(filter)
        setIsVisible(true)
    }

    const close = () => {
        posthog?.capture('web search closed')
        setIsVisible(false)
        setInitialFilter(undefined)
    }

    return (
        <SearchContext.Provider value={{ isVisible, open, close }}>
            {children}

            <Transition.Root show={isVisible} as={Fragment}>
                <Dialog open={isVisible} onClose={close}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-tan/75 dark:bg-primary/75 transition-opacity z-[999999]" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto z-[999999]">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-100"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-100"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl md:mx-4 h-[90vh] md:h-[600px] z-[999999]">
                                    <InstantSearch
                                        searchClient={searchClient}
                                        indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME as string}
                                        stalledSearchDelay={750}
                                    >
                                        <SearchResults initialFilter={initialFilter} />
                                    </InstantSearch>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    return React.useContext(SearchContext)
}
