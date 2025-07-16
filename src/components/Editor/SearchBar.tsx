import React, { useEffect, useRef, useState } from 'react'
import { IconSearch, IconX } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { useSearch } from './SearchProvider'
import Mark from 'mark.js'
import debounce from 'lodash/debounce'

interface SearchBarProps {
    visible: boolean
    onClose: () => void
    contentRef?: React.RefObject<HTMLElement>
    className?: string
    dataScheme?: string
    onSearch?: (search: string) => void
    disableHighlight?: boolean
}

export const SearchBar: React.FC<SearchBarProps> = ({
    visible,
    onClose,
    contentRef,
    className,
    dataScheme = 'primary',
    onSearch,
    disableHighlight = false,
}) => {
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
            onSearch?.('') // Clear the search filter when closing

            // Only handle duplicate content if highlighting is enabled
            if (!disableHighlight && contentRef?.current && duplicateContainerRef.current) {
                duplicateContainerRef.current.remove()
                contentRef.current.style.display = 'block'
            }
        } else {
            // Only create duplicate for highlighting if enabled
            if (!disableHighlight) {
                createDuplicateForHighlighting()
            }
        }
    }, [visible, onSearch, disableHighlight])

    const createDuplicateForHighlighting = () => {
        if (!contentRef?.current || disableHighlight) return

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
        onSearch?.(value)
    }

    // Update the global search state after a brief delay (debounce)
    const debouncedSetSearchQuery = React.useCallback(
        debounce((value) => {
            setSearchQuery(value)
            if (!disableHighlight && markedRef.current && duplicateContainerRef.current) {
                markedRef.current.unmark()
                markedRef.current.mark(value)
            }
        }, 200),
        [disableHighlight]
    )

    useEffect(() => {
        debouncedSetSearchQuery(inputValue)
    }, [inputValue, debouncedSetSearchQuery])

    useEffect(() => {
        return () => {
            if (!disableHighlight && duplicateContainerRef.current) {
                duplicateContainerRef.current.remove()
            }
        }
    }, [disableHighlight])

    if (!visible) return null

    return (
        <div
            data-scheme={dataScheme}
            className={`absolute w-64 p-1.5 border border-t-0 border-primary rounded-b z-20 flex items-center gap-1 ${className}`}
        >
            <input
                placeholder="Search this page..."
                className="w-full p-1 rounded border border-input text-primary text-sm bg-light dark:bg-dark"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                autoFocus
                onBlur={() => {
                    if (!disableHighlight && duplicateContainerRef.current) {
                        duplicateContainerRef.current.remove()
                        if (contentRef?.current) {
                            contentRef.current.style.display = 'block'
                        }
                    }
                    onSearch?.('') // Clear search on blur
                    onClose()
                }}
            />
            <OSButton
                variant="ghost"
                size="xs"
                icon={<IconX />}
                onClick={() => {
                    onSearch?.('') // Clear search when clicking X
                    onClose()
                }}
                className="rounded-full !p-1.5"
            />
        </div>
    )
}

export default SearchBar
