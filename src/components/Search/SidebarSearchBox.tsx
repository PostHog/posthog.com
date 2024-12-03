import React, { useEffect } from 'react'
import { useSearch } from './SearchContext'
import { Search, CmdK, Ctrl, K } from 'components/Icons/Icons'
import { SearchResultType } from './SearchContext'

type SearchBoxProps = {
    placeholder?: string
    filter?: SearchResultType
}

const keyboardShortcut =
    'box-content p-[5px] border border-b-2 border-gray-accent-light dark:border-gray-accent-light/40 rounded-[3px] inline-flex text-black/35 dark:text-white/40'

export const SidebarSearchBox: React.FC<SearchBoxProps> = ({ placeholder, filter }) => {
    const [isMac, setIsMac] = React.useState<boolean | undefined>(undefined)
    const { open } = useSearch()

    useEffect(() => {
        setIsMac(typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('macintosh'))
    }, [])

    return (
        <button
            type="button"
            onClick={() => open('sidebar', filter)}
            className="flex items-center m-0 mb-2 w-full text-sm text-gray focus:outline-none border border-light dark:border-dark hover:border-black/50 dark:hover:border-white/50 rounded-md relative active:top-[.5px] hover:scale-[1.005] active:scale-[1]"
        >
            <div className="absolute left-4 z-20">
                <Search className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-between pl-10 pr-2 py-2 text-left text-[15px] font-medium text-black/30 dark:text-primary-dark/30 bg-white/50 dark:bg-gray-accent-dark dark:text-white w-full z-10 rounded-md">
                <span className="dark:opacity-50">{placeholder || 'Search' + (filter === "docs" ? " docs" : "") + '...'}</span>
                {isMac !== undefined && (
                    <span className="hidden md:block">
                        {isMac ? (
                            <kbd className="">
                                <CmdK className={keyboardShortcut} />
                            </kbd>
                        ) : (
                            <kbd className="space-x-1">
                                <Ctrl className={keyboardShortcut} />
                                <K className={keyboardShortcut} />
                            </kbd>
                        )}
                    </span>
                )}
            </div>
        </button>
    )
}

export default SidebarSearchBox
