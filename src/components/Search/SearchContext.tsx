import { Dialog, Transition } from '@headlessui/react'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React, { Fragment } from 'react'
import SearchResults from './SearchResults'

type SearchContextValue = {
    isVisible: boolean
    open: () => void
    close: () => void
}

const SearchContext = React.createContext<SearchContextValue>({
    isVisible: false,
    open: () => {
        /* noop */
    },
    close: () => {
        /* noop */
    },
})

export const SearchProvider: React.FC = ({ children }) => {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [isVisible, setIsVisible] = React.useState<boolean>(false)

    React.useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.key === '/' && !isVisible) {
                event.preventDefault()
                open()
            } else if (event.key === 'k' && event.ctrlKey) {
                event.preventDefault()

                if (isVisible) {
                    close()
                } else {
                    open()
                }
            }
        }

        window.addEventListener('keydown', handler)

        return () => {
            window.removeEventListener('keydown', handler)
        }
    }, [isVisible])

    const open = () => {
        setIsVisible(true)
        posthog?.capture('web search opened')
    }

    const close = () => {
        setIsVisible(false)
        posthog?.capture('web search closed')
    }

    return (
        <SearchContext.Provider value={{ isVisible, open, close }}>
            {children}

            <Transition.Root show={isVisible} as={Fragment}>
                <Dialog open={isVisible} onClose={() => setIsVisible(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto" style={{ zIndex: '999999' }}>
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-2xl">
                                    <SearchResults />
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
