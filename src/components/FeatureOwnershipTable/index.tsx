import React from 'react'
import { useFeatureOwnership } from '../../hooks/useFeatureOwnership'
import SmallTeam from '../SmallTeam'

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
                                            <SmallTeam key={teamSlug} slug={teamSlug} />
                                        ))}
                                    </div>
                                ) : null}
                                {feature.notes && <div className="mt-1 text-sm">{feature.notes}</div>}
                            </td>
                            <td className="align-top">
                                {feature.label !== false && <span className="lemon-tag gh-tag">{feature.label}</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
