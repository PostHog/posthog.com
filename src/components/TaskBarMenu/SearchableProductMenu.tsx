import React, { useState, useMemo } from 'react'
import { IconSearch } from '@posthog/icons'
import Link from 'components/Link'
import { APP_COUNT } from '../../constants'
import * as Icons from '@posthog/icons'

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
}

const SearchableProductMenu: React.FC<SearchableProductMenuProps> = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('')

  // Simple fuzzy search - matches if all characters appear in order (case insensitive)
  const filteredProducts = useMemo(() => {
    let filtered = products

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase()
      filtered = products.filter((product) => {
        const searchableText = product.name.toLowerCase()

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

    // Sort alphabetically by name
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
  }, [products, searchTerm])

  return (
    <div className="p-1 min-w-[280px] max-w-[320px]">
      {/* Search input */}
      <div className="relative mb-2">
        <IconSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 size-4 text-muted" />
        <input
          type="text"
          placeholder="Search apps..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full !pl-8 pr-3 py-2 text-sm bg-accent border border-input rounded text-primary placeholder-muted focus:outline-none focus:ring-1 focus:ring-blue"
          autoFocus
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
                  className: isDisabled ? 'text-muted size-4' : `text-${product.color || 'gray'} size-4`,
                })
              }

              return (
                <Link
                  key={`${product.slug}-${index}-${searchTerm}`}
                  to={`/${product.slug}`}
                  state={{ newWindow: true }}
                  className="flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-accent text-primary no-underline group"
                >
                  <span className="flex items-center justify-center" style={{ width: 16, minWidth: 16 }}>
                    {iconElement}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{product.name}</div>
                    {product.description && (
                      <div className="text-xs text-muted truncate">
                        {product.description}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}

            <div className="border-t border-border mt-2 pt-2">
              <Link
                to="/products"
                state={{ newWindow: true }}
                className="flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-accent-2 text-primary no-underline font-medium"
              >
                <Icons.IconApps className="size-4 text-red" />
                Browse all apps ({APP_COUNT})
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-4 text-muted text-sm">
            No apps found for "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchableProductMenu
