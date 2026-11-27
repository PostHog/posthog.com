import React, { useState, useRef, useEffect } from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { SearchProvider } from './SearchProvider'
import { SearchBar } from './SearchBar'
import { getProseClasses } from '../../constants/index'
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import ViewerFilters from 'components/Viewer/ViewerFilters'

interface EditorProps {
    slug?: string
    title?: string
    type?: string
    maxWidth?: number | string
    children?: React.ReactNode
    hasTabs?: boolean
    /** Keep the full-height tabbed content shell transparent instead of using the accent surface. */
    transparentBackground?: boolean
    hasPadding?: boolean
    availableFilters?: {
        label: string
        value?: any
        options: {
            label: string
            value: any
        }[]
        onChange?: (value: string) => void
        operator: string
        filter?: (obj: any, value: any) => boolean
        initialValue?: any
    }[]
    onSearchChange?: (query: string) => void
    showFilters?: boolean
    disableFilterChange?: boolean
    dataToFilter?: any
    onFilterChange?: (data: any) => void
    actionButtons?: EditorActionButtons
    handleFilterChange?: (filters: any) => void
    availableGroups?: {
        label: string
        value: string
    }[]
    onGroupChange?: (group: string) => void
    sortOptions?: {
        label: string
        value: string
        icon?: string
        color?: string
    }[]
    onSortChange?: (sort: string) => void
    defaultSortValue?: string
    proseSize?: 'sm' | 'base' | 'lg'
    cta?: {
        url: string
        label: string
    }
    bookmark?: {
        title: string
        description: string
    }
    extraMenuOptions?: React.ReactNode
    articleRef?: React.RefObject<HTMLDivElement>
    hideToolbar?: boolean
    /** Grey out the text-formatting buttons (undo/redo/bold/italic/strikethrough/align) for read-only content */
    disableFormatting?: boolean
    scrollable?: boolean
    className?: string
}

type EditorAction = 'bold' | 'italic' | 'strikethrough' | 'undo' | 'redo' | 'leftAlign' | 'centerAlign' | 'rightAlign'

type EditorActionButtons = Partial<Record<EditorAction, EditorActionButton>>

type EditorActionButton = {
    onClick: () => void
    active?: boolean
    disabled?: boolean
}

const ScrollWrapper = ({
    scrollable,
    isScrollRoot,
    children,
}: {
    scrollable: boolean
    isScrollRoot: boolean
    children: React.ReactNode
}) => (scrollable ? <ScrollArea isScrollRoot={isScrollRoot}>{children}</ScrollArea> : <>{children}</>)

export function Editor({
    title,
    type,
    hasTabs = false,
    transparentBackground = false,
    children,
    availableFilters,
    maxWidth: initialMaxWidth,
    onSearchChange,
    disableFilterChange = false,
    dataToFilter,
    onFilterChange,
    handleFilterChange,
    availableGroups,
    onGroupChange,
    sortOptions,
    onSortChange,
    defaultSortValue,
    proseSize = 'sm',
    hasPadding = true,
    articleRef,
    scrollable = true,
    className = '',
}: EditorProps) {
    const [showSearch, setShowSearch] = useState(false)
    const searchContentRef = useRef(null)
    const { focusedWindow } = useApp()
    const { appWindow } = useWindow()
    const [maxWidth] = useState(initialMaxWidth ?? 768)
    const fullWidthContent = typeof maxWidth === 'string' && maxWidth === '100%'

    const closeSearch = () => {
        setShowSearch(false)
    }

    // Add Shift+F keyboard shortcut for search
    useEffect(() => {
        const handleSearchKeyDown = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.shadowRoot ||
                (target instanceof HTMLElement && target.closest('.mdxeditor'))
            ) {
                return
            }
            // Only handle Shift+F if this window is the focused/active window
            if (e.key === 'F' && e.shiftKey && focusedWindow === appWindow) {
                e.preventDefault()
                setShowSearch(true)
            }
        }

        document.addEventListener('keydown', handleSearchKeyDown)
        return () => {
            document.removeEventListener('keydown', handleSearchKeyDown)
        }
    }, [focusedWindow, appWindow])

    return (
        <SearchProvider onSearchChange={onSearchChange}>
            <div className={`@container w-full h-full flex flex-col min-h-1 ${className}`}>
                <div className="flex flex-col flex-grow min-h-0">
                    <main
                        data-app="Editor"
                        data-scheme="primary"
                        className="@container/editor flex-1 relative h-full flex flex-col"
                    >
                        <SearchBar
                            visible={showSearch}
                            onClose={closeSearch}
                            contentRef={onSearchChange ? undefined : searchContentRef}
                            dataScheme="secondary"
                            className="bg-primary -top-px right-8"
                            onSearch={onSearchChange}
                        />

                        {hasTabs ? (
                            <div
                                data-scheme="primary"
                                className={`${transparentBackground ? 'bg-transparent' : 'bg-accent'} h-full`}
                            >
                                <article
                                    data-scheme="primary"
                                    className={`${getProseClasses(proseSize)} h-full mx-auto transition-all ${
                                        fullWidthContent ? 'max-w-full' : 'max-w-4xl'
                                    }`}
                                >
                                    {title && (
                                        <h1 className="text-2xl font-bold">
                                            {title}
                                            {type && <span className="opacity-40">.{type}</span>}
                                        </h1>
                                    )}
                                    {availableFilters && availableFilters.length > 0 && (
                                        <div className="mb-2 mt-4">
                                            <ViewerFilters
                                                availableFilters={availableFilters}
                                                dataToFilter={dataToFilter}
                                                onFilterChange={onFilterChange}
                                                handleFilterChange={handleFilterChange}
                                                disableFilterChange={disableFilterChange}
                                                availableGroups={availableGroups}
                                                onGroupChange={onGroupChange}
                                                sortOptions={sortOptions}
                                                onSortChange={onSortChange}
                                                defaultSortValue={defaultSortValue}
                                            />
                                        </div>
                                    )}
                                    <div className="relative h-full" ref={searchContentRef}>
                                        {children}
                                    </div>
                                </article>
                            </div>
                        ) : (
                            <ScrollWrapper scrollable={scrollable} isScrollRoot={focusedWindow === appWindow}>
                                <article
                                    ref={articleRef ?? undefined}
                                    className={`${getProseClasses(proseSize)} ${
                                        hasPadding ? 'py-4 px-4 @xl:px-8' : ''
                                    } mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-4xl'}`}
                                >
                                    {title && (
                                        <h1 className="text-2xl font-bold">
                                            {title}
                                            {type && <span className="opacity-40">.{type}</span>}
                                        </h1>
                                    )}
                                    {availableFilters && availableFilters.length > 0 && (
                                        <div className="mb-2 mt-4">
                                            <ViewerFilters
                                                availableFilters={availableFilters}
                                                dataToFilter={dataToFilter}
                                                onFilterChange={onFilterChange}
                                                handleFilterChange={handleFilterChange}
                                                disableFilterChange={disableFilterChange}
                                                availableGroups={availableGroups}
                                                onGroupChange={onGroupChange}
                                                sortOptions={sortOptions}
                                                onSortChange={onSortChange}
                                                defaultSortValue={defaultSortValue}
                                            />
                                        </div>
                                    )}
                                    <div className="relative">
                                        <div ref={searchContentRef}>{children}</div>
                                    </div>
                                </article>
                            </ScrollWrapper>
                        )}
                    </main>
                </div>
            </div>
        </SearchProvider>
    )
}

// Add default export for backward compatibility
export default Editor
