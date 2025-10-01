import React from 'react'
import { useFeatureOwnership } from '../../hooks/useFeatureOwnership'
import SmallTeam from '../SmallTeam'
import Link from '../Link'

export default function FeatureOwnershipTable(): JSX.Element {
    const { getAllFeatures } = useFeatureOwnership()
    const features = getAllFeatures()

    return (
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
    )
}
