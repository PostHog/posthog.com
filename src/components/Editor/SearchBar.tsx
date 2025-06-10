import React, { useEffect, useRef, useState } from 'react'
import { IconSearch, IconX } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { useSearch } from './SearchProvider'
import Mark from 'mark.js'
import debounce from 'lodash/debounce'

interface SearchBarProps {
    visible: boolean
    onClose: () => void
    contentRef: React.RefObject<HTMLElement>
    className?: string
}

export const SearchBar: React.FC<SearchBarProps> = ({ visible, onClose, contentRef, className }) => {
    const { searchQuery, setSearchQuery } = useSearch()
    const [inputValue, setInputValue] = useState(searchQuery)
    const markedRef = useRef(null)
    const duplicateContainerRef = useRef<HTMLDivElement>(null)

    // Sync input value with searchQuery when it changes externally
    useEffect(() => {
        setInputValue(searchQuery)
    }, [searchQuery])

    // Reset when closing
    useEffect(() => {
        if (!visible) {
            setInputValue('')
            if (duplicateContainerRef.current) {
                duplicateContainerRef.current.remove()
                contentRef.current.style.display = 'block'
            }
        } else {
            createDuplicateForHighlighting()
        }
    }, [visible])

    const createDuplicateForHighlighting = () => {
        if (!contentRef.current) return

        if (duplicateContainerRef.current) {
            duplicateContainerRef.current.remove()
        }

        const duplicate = document.createElement('div')
        const clone = contentRef.current.cloneNode(true) as HTMLElement

        duplicate.appendChild(clone)
        duplicate.className = 'highlight-container'

        contentRef.current?.parentElement?.appendChild(duplicate)
        contentRef.current.style.display = 'none'

        duplicateContainerRef.current = duplicate

        markedRef.current = new Mark(duplicate)

        if (inputValue) {
            markedRef.current.unmark()
            markedRef.current.mark(inputValue)
        }
    }

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
    const debouncedSetSearchQuery = React.useCallback(
        debounce((value) => {
            setSearchQuery(value)
            if (markedRef.current && duplicateContainerRef.current) {
                markedRef.current.unmark()
                markedRef.current.mark(value)
            }
        }, 200),
        []
    )

    useEffect(() => {
        debouncedSetSearchQuery(inputValue)
    }, [inputValue, debouncedSetSearchQuery])

    useEffect(() => {
        return () => {
            if (duplicateContainerRef.current) {
                duplicateContainerRef.current.remove()
            }
        }
    }, [])

    if (!visible) return null

    return (
        <div
            className={`absolute bg-accent w-64 p-1.5 rounded-b border border-primary border-t-0 z-10 flex items-center gap-1 ${className}`}
        >
            <input
                placeholder="Search this page..."
                className="w-full p-1 rounded border border-input text-primary text-sm"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                onBlur={() => {
                    if (duplicateContainerRef.current) {
                        duplicateContainerRef.current.remove()
                    }
                    onClose()
                }}
            />
            <OSButton variant="ghost" size="xs" icon={<IconX />} onClick={onClose} />
        </div>
    )
}

export default SearchBar
