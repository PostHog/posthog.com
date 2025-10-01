import React, { useMemo, useState } from 'react'
import { useFeatureOwnership } from '../../hooks/useFeatureOwnership'
import SmallTeam from '../SmallTeam'
import Link from '../Link'
import { OSInput } from '../OSForm'

export default function FeatureOwnershipTable(): JSX.Element {
    const { getAllFeatures } = useFeatureOwnership()
    const [searchQuery, setSearchQuery] = useState('')
    const allFeatures = getAllFeatures()

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

            return false
        })
    }, [allFeatures, searchQuery])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setSearchQuery('')
        }
    }

    const handleClearSearch = () => {
        setSearchQuery('')
    }

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
                <table className="w-full">
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
                                <td className="align-top">{feature.feature}</td>
                                <td className="align-top">
                                    {feature.owner.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {feature.owner.map((teamSlug) => (
                                                <SmallTeam key={teamSlug} slug={teamSlug} noMiniCrest />
                                            ))}
                                        </div>
                                    ) : null}
                                    {feature.notes && <div className="mt-1 text-sm">{feature.notes}</div>}
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
                                                        {label}
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
                                                    {feature.label}
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
