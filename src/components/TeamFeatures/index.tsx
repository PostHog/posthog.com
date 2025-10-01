import React from 'react'
import { useFeatureOwnership } from '../../hooks/useFeatureOwnership'
import SmallTeam from '../SmallTeam'
import Link from '../Link'

interface TeamFeaturesProps {
    teamSlug: string
    renderWrapper?: (content: JSX.Element) => JSX.Element
}

export default function TeamFeatures({ teamSlug, renderWrapper }: TeamFeaturesProps): JSX.Element | null {
    const { getAllFeatures } = useFeatureOwnership()
    const allFeatures = getAllFeatures()

    // Filter features owned by this team
    const teamFeatures = allFeatures.filter((feature) => feature.owner.includes(teamSlug))

    if (teamFeatures.length === 0) {
        return null
    }

    const content = (
        <div>
            <ul>
                {teamFeatures.map((feature) => (
                    <li
                        key={feature.slug}
                        className="grid @xs/team-stats:grid-cols-2 gap-x-4 gap-y-1 text-sm border-t first:border-t-0 border-primary py-2 first:pt-0 last:pb-0"
                    >
                        <strong className="font-semibold ">{feature.feature}</strong>

                        <div>
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
                        </div>

                        {feature.owner.length > 1 ? (
                            <div className="@xs/team-stats:col-span-2 flex flex-wrap gap-2 italic">
                                <span className="text-secondary">Shared with: </span>
                                {feature.owner
                                    .filter((ownerSlug) => ownerSlug !== teamSlug)
                                    .map((ownerSlug) => (
                                        <SmallTeam
                                            key={ownerSlug}
                                            slug={ownerSlug}
                                            noMiniCrest
                                            className="border-b border-primary border-dashed"
                                        />
                                    ))}
                            </div>
                        ) : null}
                        {feature.notes && <div className="@xs/team-stats:col-span-2 text-sm">{feature.notes}</div>}
                    </li>
                ))}
            </ul>
        </div>
    )

    return renderWrapper ? renderWrapper(content) : content
}
