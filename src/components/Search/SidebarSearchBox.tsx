import React from 'react'
import { useSearch } from './SearchContext'
import { Search, CmdK, Ctrl, K } from 'components/Icons/Icons'
import { SearchResultType } from './SearchContext'
import cntl from 'cntl'

type SearchBoxProps = {
    placeholder?: string
    filter?: SearchResultType
}

const keyboardShortcut = cntl`
    box-content p-[5px] border border-b-2 border-gray-accent-light rounded-[3px] inline-flex 
`

export const SidebarSearchBox: React.FC<SearchBoxProps> = ({ placeholder, filter }) => {
    const { open } = useSearch()

    return (
        <button
            type="button"
            onClick={() => open(filter)}
            className="flex items-center relative m-0 mb-2 w-full text-sm text-gray focus:outline-none shadow-xl border border-gray/10 border-b-gray/30 hover:border-gray/20 rounded relative active:top-[0] hover:scale-[1.01] active:scale-[1]"
        >
            <div className="absolute left-4 z-20">
                <Search className="w-4 h-4" />
            </div>

            <div className="flex items-center justify-between pl-10 pr-2 py-2 text-left text-[15px] font-medium text-black/30 bg-white/50 dark:bg-gray-accent-dark dark:text-white w-full z-10">
                <span>{placeholder || 'Search...'}</span>
                <span>
                    {typeof window !== 'undefined' && window.navigator.userAgent.toLowerCase().includes('macintosh') ? (
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
            </div>
        </button>
    )
}

export default SidebarSearchBox
