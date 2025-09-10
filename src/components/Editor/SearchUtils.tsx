import React from 'react'
import Fuse from 'fuse.js'
import Markdown from 'markdown-to-jsx'

// Utility to prepare a preview of text by truncating it
export const preparePreviewText = (text: string, limit: number): string => {
    // Replace line breaks with spaces for the preview
    const singleLine = text.replace(/(\r\n|\n|\r)/gm, ' ')
    return singleLine.length <= limit ? singleLine : singleLine.substring(0, limit).trim() + '...'
}

// Process Markdown for highlighting
export const processMarkdownForHighlighting = (markdownText: string, searchTerm: string): string => {
    if (!searchTerm || searchTerm.length < 2) return markdownText

    // Escape regex special characters in the search term
    const escapedSearchTerm = searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

    // Create a regex that matches the term (not requiring word boundaries for short terms)
    const regex =
        searchTerm.length <= 3
            ? new RegExp(`(${escapedSearchTerm})`, 'gi')
            : new RegExp(`\\b(${escapedSearchTerm})\\b`, 'gi')

    // Create highlighted version - using just bold, not double emphasis
    return markdownText.replace(regex, '**$1**')
}

// Utility to generate highlighted text based on Fuse.js matches
export const generateHighlightedText = (
    text: string,
    indices: readonly [number, number][],
    searchTerm: string
): string => {
    if (!indices || indices.length === 0) return text

    // If we have a search term, try to find matches
    if (searchTerm && searchTerm.length > 1) {
        // Escape regex special characters in the search term
        const escapedSearchTerm = searchTerm.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')

        // For short search terms, don't use word boundaries
        const regex =
            searchTerm.length <= 3
                ? new RegExp(`(${escapedSearchTerm})`, 'gi')
                : new RegExp(`\\b${escapedSearchTerm}\\b`, 'gi')

        // Use standard <strong> tags for highlighting
        const wholeWordResult = text.replace(regex, (match) => `<strong>${match}</strong>`)

        // If we found matches, return this result
        if (wholeWordResult !== text) {
            return wholeWordResult
        }
    }

    // If the search term is very short, be more permissive with matching
    const strictMatching = searchTerm && searchTerm.length <= 2

    // Filter out very short matches unless they exactly match the search term
    const filteredIndices = strictMatching
        ? indices.filter(([start, end]) => {
              const matchedText = text.substring(start, end + 1).toLowerCase()
              return matchedText === searchTerm.toLowerCase() || end - start >= 1
          })
        : indices

    if (filteredIndices.length === 0) return text

    // Sort indices to ensure proper order
    const sortedIndices = [...filteredIndices].sort((a, b) => a[0] - b[0])

    // Check if there are any indices to process
    if (sortedIndices.length === 0) return text

    // Merge overlapping or adjacent indices
    const mergedIndices: [number, number][] = []
    let currentStart = sortedIndices[0][0]
    let currentEnd = sortedIndices[0][1]

    for (let i = 1; i < sortedIndices.length; i++) {
        const [start, end] = sortedIndices[i]

        // If the current index overlaps or is adjacent to the previous one, merge them
        if (start <= currentEnd + 1) {
            currentEnd = Math.max(currentEnd, end)
        } else {
            // Otherwise, add the previous range and start a new one
            mergedIndices.push([currentStart, currentEnd])
            currentStart = start
            currentEnd = end
        }
    }

    // Add the last range
    mergedIndices.push([currentStart, currentEnd])

    // Generate the highlighted text
    let result = ''
    let lastIndex = 0

    mergedIndices.forEach(([start, end]) => {
        // Add text before match
        result += text.substring(lastIndex, start)
        // Add highlighted match with standard strong tag
        result += `<strong>${text.substring(start, end + 1)}</strong>`
        lastIndex = end + 1
    })

    // Add remaining text
    result += text.substring(lastIndex)

    return result
}

// Create a proper preview of highlighted text
export const createHighlightedPreview = (
    fullText: string,
    highlightedText: string | undefined,
    limit: number
): string => {
    if (!highlightedText) return preparePreviewText(fullText, limit)

    // Check if the first highlighted portion is within our limit
    const firstHighlightMatch = highlightedText.match(/<span class="bg-yellow\/20.*?<\/span>/)

    if (!firstHighlightMatch) {
        // No highlights found, use regular preview
        return preparePreviewText(fullText, limit)
    }

    const firstHighlightPos = highlightedText.indexOf(firstHighlightMatch[0])

    // If highlight is within the preview limit, just truncate normally
    if (firstHighlightPos < limit) {
        // Get the HTML up to a reasonable length including the first highlight
        const endPos = Math.min(limit + 50, highlightedText.length)
        let truncated = highlightedText.substring(0, endPos)

        // Make sure we don't cut in the middle of a span
        const lastSpanClose = truncated.lastIndexOf('</span>')
        if (lastSpanClose > 0 && lastSpanClose < truncated.length - 7) {
            truncated = truncated.substring(0, lastSpanClose + 7)
        }

        // Add ellipsis if we truncated
        if (truncated.length < highlightedText.length) {
            truncated += '...'
        }

        return truncated
    } else {
        // If the first highlight is beyond our limit, center the preview around it
        const startPos = Math.max(0, firstHighlightPos - 20)
        const endPos = Math.min(firstHighlightPos + 100, highlightedText.length)

        // Get text around the highlight
        let truncated = (startPos > 0 ? '...' : '') + highlightedText.substring(startPos, endPos)

        // Make sure we don't cut in the middle of a span
        const lastSpanClose = truncated.lastIndexOf('</span>')
        if (lastSpanClose > 0 && lastSpanClose < truncated.length - 7) {
            truncated = truncated.substring(0, lastSpanClose + 7)
        }

        // Add ellipsis if we truncated at the end
        if (endPos < highlightedText.length) {
            truncated += '...'
        }

        return truncated
    }
}

// Component to safely render HTML with highlights
interface HighlightedTextProps {
    text: string
    highlights?: string
    isMarkdown?: boolean
}

export const HighlightedText: React.FC<HighlightedTextProps> = ({ text, highlights, isMarkdown }) => {
    // If no highlights provided, just render the text normally
    if (!highlights) {
        return isMarkdown ? <Markdown>{text}</Markdown> : <>{text}</>
    }

    // Add highlights
    return <span dangerouslySetInnerHTML={{ __html: highlights }} />
}

// Component for rendering markdown with highlighted search terms
interface HighlightedMarkdownProps {
    content: string
    searchTerm: string
    truncate?: boolean
    limit?: number
}

export const HighlightedMarkdown: React.FC<HighlightedMarkdownProps> = ({
    content,
    searchTerm,
    truncate = false,
    limit = 75,
}) => {
    // Create processed content - either full or truncated
    const processedContent = truncate ? preparePreviewText(content, limit) : content

    // If we have a search term, highlight it with markdown bold
    const highlightedContent = searchTerm
        ? processMarkdownForHighlighting(processedContent, searchTerm)
        : processedContent

    return <Markdown>{highlightedContent}</Markdown>
}

// Interface for Fuse.js result with matches
export interface FuseResult<T> {
    item: T
    matches?: Array<{
        key: string
        indices: Array<[number, number]>
    }>
}

// Create a configured Fuse.js instance
export const createFuseInstance = <T extends unknown>(
    items: T[],
    searchKeys: string[] | { name: string; weight: number }[]
): Fuse<T> => {
    return new Fuse(items, {
        keys: searchKeys,
        includeMatches: true,
        threshold: 0.3, // More permissive threshold for better matches
        ignoreLocation: true, // Don't consider location for matching
        findAllMatches: true, // Find all matches in the text
        minMatchCharLength: 2, // Allow matching shorter strings
        // Match anywhere in the text
        location: 0,
        distance: 100,
        // These properties are supported in Fuse.js but might not be in the TypeScript definitions
        // Explicitly cast to allow these properties
        ...({
            tokenize: true, // Break the text into tokens (words) for matching
            matchAllTokens: false, // Only require some tokens to match
        } as unknown as Record<string, unknown>),
        isCaseSensitive: false,
    })
}

// Process items with search term to add highlighting
export const processItemsWithHighlighting = <T extends Record<string, any>>(
    fuse: Fuse<T>,
    items: T[],
    searchTerm: string
): Array<{ item: T; highlightedFields: Record<string, string> }> => {
    if (!searchTerm) {
        return items.map((item) => ({ item, highlightedFields: {} }))
    }

    // Get search results with match information
    const results = fuse.search(searchTerm) as FuseResult<T>[]

    if (results.length === 0) {
        return [] // No matches found
    }

    // Process matches and add highlighting
    return results.map(({ item, matches = [] }) => {
        // Generate highlighted text for each matched field
        const highlightedFields = matches.reduce((acc: Record<string, string>, match) => {
            if (!match.key) return acc

            const keyParts = match.key.split('.')
            const fieldPath = keyParts.length > 1 ? keyParts.slice(1).join('.') : keyParts[0] // Extract field path

            // Use the path to get the text value from the item
            const text = fieldPath.split('.').reduce((obj, part) => obj?.[part], item as any)

            if (text && typeof text === 'string') {
                acc[fieldPath] = generateHighlightedText(text, match.indices, searchTerm)
            }

            return acc
        }, {})

        return {
            item,
            highlightedFields,
        }
    })
}
