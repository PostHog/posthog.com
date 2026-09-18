import React, { useState, useMemo, useEffect, useRef } from 'react'
import { IconSearch } from '@posthog/icons'
import Link from 'components/Link'
import { BROWSE_TOOLS_HANDLES } from 'constants/productNavigation'

interface Product {
    name: string
    slug: string
    Icon?: React.ComponentType<any>
    color?: string
    description?: string
    category?: string
    handle?: string
    status?: string
}

interface SearchableProductMenuProps {
    products: Product[]
    // Injected by MenuBar so selecting a product closes the whole menu, matching
    // the behavior of regular menu items.
    onCloseMenu?: () => void
}

const SearchableProductMenu: React.FC<SearchableProductMenuProps> = ({ products, onCloseMenu }) => {
    const [searchTerm, setSearchTerm] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    // Custom labels for specific products
    const customLabels: Record<string, string> = {
        // 'cdp': 'CDP'
    }

    // Focus the input when the component mounts
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    // Simple fuzzy search - matches if all characters appear in order (case insensitive)
    const filteredProducts = useMemo(() => {
        // Build the curated list in the specified order (shared with ProductSwitcher)
        let filtered = BROWSE_TOOLS_HANDLES.map((handle) =>
            products.find((product) => product.handle === handle)
        ).filter((product): product is Product => Boolean(product))

        if (searchTerm.trim()) {
            const searchLower = searchTerm.toLowerCase()
            filtered = filtered.filter((product) => {
                const displayName = customLabels[product.slug] || product.name
                const searchableText = displayName.toLowerCase()

                // Simple fuzzy matching: check if all search characters appear in order
                let searchIndex = 0
                for (let i = 0; i < searchableText.length && searchIndex < searchLower.length; i++) {
                    if (searchableText[i] === searchLower[searchIndex]) {
                        searchIndex++
                    }
                }
                return searchIndex === searchLower.length
            })
        }

        return filtered
    }, [products, searchTerm])

    return (
        <div className="p-1 min-w-[280px] max-w-[320px]">
            {/* Search input */}
            <div className="relative mb-2">
                <IconSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 size-4 text-muted" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full !pl-8 pr-3 py-2 text-sm bg-accent border border-input rounded text-primary placeholder-muted focus:outline-none focus:ring-1 focus:ring-blue"
                />
            </div>

            {/* Results */}
            <div className="max-h-[400px] overflow-y-auto">
                {filteredProducts.length > 0 ? (
                    <>
                        {filteredProducts.map((product, index) => {
                            // Handle icon rendering
                            const isDisabled = product.status === 'WIP'
                            let iconElement = null
                            if (product.Icon) {
                                iconElement = React.createElement(product.Icon, {
                                    className: isDisabled
                                        ? 'text-muted size-4'
                                        : `text-${product.color || 'gray'} size-4`,
                                })
                            }

                            return (
                                <Link
                                    key={`${product.slug}-${index}-${searchTerm}`}
                                    to={`/${product.slug}`}
                                    state={{ newWindow: true }}
                                    onClick={() => onCloseMenu?.()}
                                    className="flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-accent text-primary no-underline group"
                                >
                                    <span
                                        className="flex items-center justify-center"
                                        style={{ width: 16, minWidth: 16 }}
                                    >
                                        {iconElement}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">
                                            {customLabels[product.slug] || product.name}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </>
                ) : (
                    <div className="text-center py-4 text-muted text-sm">No tools found for "{searchTerm}"</div>
                )}
            </div>
        </div>
    )
}

export default SearchableProductMenu
