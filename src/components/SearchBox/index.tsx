import React from 'react'
import { DocSearchModal } from '@docsearch/react'
import { createPortal } from 'react-dom'

type SearchBoxProps = {
    placeholder?: string
}

export const SearchBox: React.FC<SearchBoxProps> = ({ placeholder }) => {
    const [query, setQuery] = React.useState<string>('')
    const [searchOpen, setSearchOpen] = React.useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (query.trim()) {
            setSearchOpen(true)
        }
    }

    return (
        <>
            {searchOpen &&
                createPortal(
                    <DocSearchModal
                        initialScrollY={window.scrollY}
                        appId="B763I3AO0D"
                        indexName="posthog"
                        apiKey="f1386529b9fafc5c3467e0380f19de4b"
                        initialQuery={query}
                        onClose={() => setSearchOpen(false)}
                    />,
                    document.body
                )}

            <form onSubmit={handleSubmit} className="flex items-center relative m-0 w-full max-w-lg">
                <div className="absolute left-4 w-4 h-4">
                    <svg className="opacity-50" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                        <g opacity="1" clipPath="url(#a)">
                            <path
                                d="m18 15.964-4.794-4.793A7.2 7.2 0 1 0 .001 7.2a7.2 7.2 0 0 0 11.17 6.006L15.963 18 18 15.964ZM2.04 7.2A5.16 5.16 0 0 1 7.2 2.043 5.16 5.16 0 1 1 2.04 7.2Z"
                                fill="#90794B"
                            />
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path fill="#fff" d="M0 0h18v18H0z" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <input
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                    name="docs-search"
                    placeholder={placeholder || 'Search...'}
                    autoFocus={true}
                    className="pl-10 py-3 text-base text-left text-gray bg-white dark:bg-gray-accent-dark dark:text-white rounded-full w-full md:w-[300px] mdlg:w-[400px] lg:w-[375px] xl:w-[500px] ring-red shadow-lg"
                />

                <button className="hidden px-6 py-2.5 bg-red text-lg shadow-md rounded-sm text-white font-bold">
                    Search
                </button>
            </form>
        </>
    )
}

export default SearchBox
