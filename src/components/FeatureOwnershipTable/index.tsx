import React, { useMemo, useState, useRef, useEffect } from 'react'
import { useFeatureOwnership } from '../../hooks/useFeatureOwnership'
import SmallTeam from '../SmallTeam'
import Link from '../Link'
import { OSInput } from '../OSForm'
import Mark from 'mark.js'

// Helper function to extract text from React nodes
const extractTextFromReactNode = (node: React.ReactNode): string => {
    if (typeof node === 'string') {
        return node
    }
    if (typeof node === 'number') {
        return String(node)
    }
    if (Array.isArray(node)) {
        return node.map(extractTextFromReactNode).join(' ')
    }
    if (React.isValidElement(node)) {
        return extractTextFromReactNode(node.props.children)
    }
    return ''
}

export default function FeatureOwnershipTable(): JSX.Element {
    const { features: allFeatures } = useFeatureOwnership()
    const [searchQuery, setSearchQuery] = useState('')
    const tableRef = useRef<HTMLTableElement>(null)
    const markedRef = useRef<Mark | null>(null)

    // Filter features based on search query
    const features = useMemo(() => {
        if (!searchQuery.trim()) {
            return allFeatures
        }

        const searchLower = searchQuery.toLowerCase()
        return allFeatures.filter((feature) => {
            // Search in feature name
            if (feature.feature.toLowerCase().includes(searchLower)) {
                return true
            }

            // Search in owner team slugs (e.g., "platform-analytics", "replay")
            if (feature.owner.some((teamSlug) => teamSlug.toLowerCase().includes(searchLower))) {
                return true
            }

            // Search in label(s)
            if (feature.label !== false) {
                if (Array.isArray(feature.label)) {
                    if (feature.label.some((label) => label.toLowerCase().includes(searchLower))) {
                        return true
                    }
                } else if (feature.label.toLowerCase().includes(searchLower)) {
                    return true
                }
            }

            // Search in notes if they exist (extract text from React nodes)
            if (feature.notes) {
                const notesText = extractTextFromReactNode(feature.notes)
                if (notesText.toLowerCase().includes(searchLower)) {
                    return true
                }
            }

            return false
        })
    }, [allFeatures, searchQuery])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)

        // Apply highlighting after a brief delay
        setTimeout(() => {
            if (tableRef.current && value.trim()) {
                if (markedRef.current) {
                    markedRef.current.unmark()
                }
                // Highlight in feature names and labels
                const searchableElements = tableRef.current.querySelectorAll('[data-searchable]')
                if (searchableElements.length > 0) {
                    const elements = Array.from(searchableElements) as HTMLElement[]
                    markedRef.current = new Mark(elements)
                    markedRef.current.mark(value, {
                        separateWordSearch: false,
                        accuracy: 'partially',
                    })
                }
            } else if (markedRef.current) {
                markedRef.current.unmark()
            }
        }, 100)
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSearchQuery('')
            if (markedRef.current) {
                markedRef.current.unmark()
            }
        }
    }

    const handleClearSearch = () => {
        setSearchQuery('')
        if (markedRef.current) {
            markedRef.current.unmark()
        }
    }

    // Cleanup highlighting on unmount
    useEffect(() => {
        return () => {
            if (markedRef.current) {
                markedRef.current.unmark()
            }
        }
    }, [])

    return (
        <>
            <div>
                <OSInput
                    type="text"
                    label="Search features"
                    showLabel={false}
                    placeholder="Search features or labels..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleSearchKeyDown}
                    onClear={handleClearSearch}
                    showClearButton={true}
                    size="sm"
                    width="full"
                    name="feature-search"
                />
            </div>

            <div className="overflow-x-auto">
                <table ref={tableRef} className="w-full">
                    <thead>
                        <tr>
                            <th className="text-left">Feature</th>
                            <th className="text-left">Owner</th>
                            <th className="text-left">Label</th>
                        </tr>
                    </thead>
                    <tbody>
                        {features.map((feature) => (
                            <tr key={feature.slug}>
                                <td className="align-top">
                                    <span data-searchable>{feature.feature}</span>
                                </td>
                                <td className="align-top">
                                    {feature.owner.length > 0 ? (
                                        <div className="flex flex-wrap gap-2" data-searchable>
                                            {feature.owner.map((teamSlug) => (
                                                <SmallTeam key={teamSlug} slug={teamSlug} noMiniCrest />
                                            ))}
                                        </div>
                                    ) : null}
                                    {feature.notes && (
                                        <div className="mt-1 text-sm" data-searchable>
                                            {feature.notes}
                                        </div>
                                    )}
                                </td>
                                <td className="align-top">
                                    {feature.label !== false && (
                                        <div className="flex flex-wrap gap-2">
                                            {Array.isArray(feature.label) ? (
                                                feature.label.map((label) => (
                                                    <Link
                                                        key={label}
                                                        to={`https://github.com/PostHog/posthog/issues?q=sort%3Aupdated-desc+state%3Aopen+label%3A${encodeURIComponent(
                                                            label
                                                        )}`}
                                                        className="lemon-tag gh-tag !no-underline hover:!underline"
                                                        externalNoIcon
                                                    >
                                                        <span data-searchable>{label}</span>
                                                    </Link>
                                                ))
                                            ) : (
                                                <Link
                                                    to={`https://github.com/PostHog/posthog/issues?q=sort%3Aupdated-desc+state%3Aopen+label%3A${encodeURIComponent(
                                                        feature.label
                                                    )}`}
                                                    className="lemon-tag gh-tag !no-underline hover:!underline"
                                                    externalNoIcon
                                                >
                                                    <span data-searchable>{feature.label}</span>
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {features.length === 0 && searchQuery && (
                <div className="text-center py-8">
                    <p className="text-secondary">No features found matching "{searchQuery}"</p>
                </div>
            )}
        </>
    )
}
