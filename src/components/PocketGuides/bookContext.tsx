import { createContext, useContext } from 'react'

import { InboxTemplate } from 'components/SelfDrivingInbox/types'

import { BookPageEntry } from './bookModel'

/** The page's own data, so a figure can render this use case's report without prop drilling. */
export interface BookEntry {
    entry: BookPageEntry
    pages: BookPageEntry[]
    /**
     * The Learn tab's route root, when the book is embedded there. Unset in the standalone
     * reader, where a page's own url is already its route.
     */
    basePath?: string
}

const EntryContext = createContext<BookEntry | null>(null)
export const EntryProvider = EntryContext.Provider

export function useEntry(): BookEntry | null {
    return useContext(EntryContext)
}

export function useTemplate(): InboxTemplate | undefined {
    return useEntry()?.entry.template
}
