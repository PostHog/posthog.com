import React, { createContext, useContext, useState, ReactNode } from 'react'

// Define the context type
interface SearchContextType {
    searchQuery: string
    setSearchQuery: (query: string) => void
}

// Create context with default values
const SearchContext = createContext<SearchContextType>({
    searchQuery: '',
    setSearchQuery: () => {
        // This is a placeholder function that will be replaced by the actual implementation
    },
})

// Hook to use the search context
export const useSearch = (): SearchContextType => useContext(SearchContext)

// Props for the provider component
interface SearchProviderProps {
    children: ReactNode
    onSearchChange?: (query: string) => void
}

// Provider component that wraps children and provides search functionality
export const SearchProvider: React.FC<SearchProviderProps> = ({ children, onSearchChange }) => {
    const [searchQuery, setSearchQueryInternal] = useState('')

    // Wrapper for setSearchQuery to also call onSearchChange if provided
    const setSearchQuery = (query: string) => {
        setSearchQueryInternal(query)
        if (onSearchChange) {
            onSearchChange(query)
        }
    }

    return <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>{children}</SearchContext.Provider>
}

export default SearchProvider
