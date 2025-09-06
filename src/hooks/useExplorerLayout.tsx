import { useState, useEffect } from 'react'

const LAYOUT_STORAGE_KEY = 'posthog-explorer-layout'

export function useExplorerLayout(defaultLayout: 'grid' | 'list' = 'grid') {
  const [isListLayout, setIsListLayout] = useState<boolean>(defaultLayout === 'list')

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLayout = localStorage.getItem(LAYOUT_STORAGE_KEY)
      if (savedLayout && (savedLayout === 'grid' || savedLayout === 'list')) {
        setIsListLayout(savedLayout === 'list')
      }
    } catch (error) {
      // localStorage might not be available (SSR, private browsing, etc.)
      console.warn('Failed to load layout preference from localStorage:', error)
    }
  }, [])

  // Save to localStorage when layout changes
  const updateLayout = (value: string) => {
    if (value !== 'grid' && value !== 'list') return
    setIsListLayout(value === 'list')
    try {
      localStorage.setItem(LAYOUT_STORAGE_KEY, value)
    } catch (error) {
      // localStorage might not be available
      console.warn('Failed to save layout preference to localStorage:', error)
    }
  }

  return {
    isListLayout,
    setLayoutValue: updateLayout,
    currentLayout: isListLayout ? 'list' : 'grid',
  }
}
