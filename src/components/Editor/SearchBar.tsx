import React, { useEffect, useState } from 'react'
import { IconSearch, IconX } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { useSearch } from './SearchProvider'

interface SearchBarProps {
    visible: boolean
    onClose: () => void
}

export const SearchBar: React.FC<SearchBarProps> = ({ visible, onClose }) => {
    const { searchQuery, setSearchQuery } = useSearch()
    const [inputValue, setInputValue] = useState(searchQuery)

    // Sync input value with searchQuery when it changes externally
    useEffect(() => {
        setInputValue(searchQuery)
    }, [searchQuery])

    // Reset when closing
    useEffect(() => {
        if (!visible) {
            setInputValue('')
        }
    }, [visible])

    // Handle Escape key to close search
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose()
        }
    }

    // Handle search input with debounce
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputValue(value)
    }

    // Update the global search state after a brief delay (debounce)
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(inputValue)
        }, 200) // 200ms debounce

        return () => clearTimeout(timer)
    }, [inputValue, setSearchQuery])

    if (!visible) return null

    return (
        <div className="-top-px right-8 absolute bg-accent w-64 p-1.5 rounded-b border border-primary border-t-0 z-10 flex items-center gap-1">
            <input
                placeholder="Search this page..."
                className="w-full p-1 rounded border border-input text-primary text-sm"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
            />
            <OSButton variant="ghost" size="xs" icon={<IconX />} onClick={onClose} />
        </div>
    )
}

export default SearchBar
