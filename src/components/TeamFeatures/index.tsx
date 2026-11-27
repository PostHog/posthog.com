import React from 'react'
import { useFeatureOwnership } from '../../hooks/useFeatureOwnership'
import SmallTeam from '../SmallTeam'
import Link from '../Link'
import { Fieldset } from 'components/OSFieldset'

interface TeamFeaturesProps {
    teamSlug: string
    className?: string
}

export default function TeamFeatures({ teamSlug, className = '' }: TeamFeaturesProps): JSX.Element | null {
    const { features } = useFeatureOwnership({ teamSlug })

    return features.length > 0 ? (
        <Fieldset legend="Feature ownership" className={className}>
            <div className="@container/team-features">
                {/* Each item's -mt-px pulls the top row's dividers outside the list, where overflow-hidden clips
                    them, so no column starts with a line. */}
                <ul className="grid @2xl/team-features:grid-cols-2 @6xl/team-features:grid-cols-3 gap-x-8 overflow-hidden">
                    {features.map((feature) => (
                        <li
                            key={feature.slug}
                            className="grid @xs/team-features:grid-cols-2 gap-x-4 gap-y-1 text-sm border-t border-primary -mt-px py-2"
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
                                <div className="@xs/team-features:col-span-2 flex flex-wrap gap-2 italic">
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
                            {feature.notes && (
                                <div className="@xs/team-features:col-span-2 text-sm">{feature.notes}</div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </Fieldset>
    ) : null
}
