import React from 'react'
import Link from 'components/Link'
import useRoadmapEarlyAccessFeatures, { RoadmapEarlyAccessFeature } from 'hooks/useRoadmapEarlyAccessFeatures'

type RoadmapStage = Extract<RoadmapEarlyAccessFeature['stage'], 'concept' | 'alpha' | 'beta'>

const STAGES: Array<{ stage: RoadmapStage; title: string; headerClassName: string }> = [
    { stage: 'concept', title: '[?] CONCEPT', headerClassName: 'text-[#F1A82C] border-[#F1A82C]' },
    { stage: 'alpha', title: '[→] ALPHA', headerClassName: 'text-[#1D4AFF] border-[#1D4AFF]' },
    { stage: 'beta', title: '[✓] BETA', headerClassName: 'text-[#00FF00] border-[#00FF00]' },
]

const featureUrl = (flagKey: string): string => `/roadmap?feature=${encodeURIComponent(flagKey)}`

const stripMarkdown = (text: string): string => text.replace(/[*_~`#]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

export default function TerminalRoadmap(): JSX.Element {
    const { features, loading } = useRoadmapEarlyAccessFeatures({ teamSlug: 'self-driving' })

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-6">
                {STAGES.map(({ stage, title, headerClassName }) => {
                    const stageFeatures = features.filter((feature) => feature.stage === stage).slice(0, 3)

                    return (
                        <section key={stage} className="space-y-3">
                            <div className={`border-b pb-2 text-sm font-bold ${headerClassName}`}>{title}</div>
                            {stageFeatures.map((feature) => (
                                <Link
                                    key={feature.flagKey}
                                    to={featureUrl(feature.flagKey)}
                                    state={{ newWindow: true }}
                                    className="block space-y-1 hover:opacity-75"
                                >
                                    <div className="flex items-start gap-2">
                                        {typeof feature.waitlistCount === 'number' && feature.waitlistCount > 0 && (
                                            <span className="shrink-0 rounded bg-[#F1A82C]/20 px-2 py-0.5 text-[12px] text-[#F1A82C]">
                                                {feature.waitlistCount}★
                                            </span>
                                        )}
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm font-bold leading-tight text-[rgba(238,239,233,0.9)]">
                                                {feature.name.substring(0, 60)}
                                                {feature.name.length > 60 ? '...' : ''}
                                            </div>
                                            {feature.description && (
                                                <div className="mt-1 text-[12px] leading-tight text-[#666]">
                                                    {stripMarkdown(feature.description).substring(0, 80)}
                                                    {stripMarkdown(feature.description).length > 80 ? '...' : ''}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {!loading && stageFeatures.length === 0 && (
                                <div className="text-[12px] text-[#666]">No items in this stage.</div>
                            )}
                            {loading && stageFeatures.length === 0 && (
                                <div className="text-[12px] text-[#666]">Loading roadmap...</div>
                            )}
                        </section>
                    )
                })}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-[#333] text-[14px]">
                <span className="text-[#666]">Have opinions about what we should build next? </span>
                <Link
                    to="/roadmap"
                    className="text-[#1D4AFF] hover:text-[#F1A82C] underline"
                    state={{ newWindow: true }}
                >
                    Vote on our roadmap
                </Link>
            </div>
        </div>
    )
}
