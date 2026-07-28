import React from 'react'
import Link from 'components/Link'
import useRoadmapEarlyAccessFeatures, { RoadmapEarlyAccessFeature } from 'hooks/useRoadmapEarlyAccessFeatures'
import { ROADMAP_STAGE_STYLES } from 'components/Roadmap/roadmapStageStyles'

type RoadmapStage = Extract<RoadmapEarlyAccessFeature['stage'], 'concept' | 'alpha' | 'beta'>

const STAGES: Array<{ stage: RoadmapStage; title: string; description: string }> = [
    { stage: 'concept', title: 'Concept', description: 'Ideas we have committed to exploring.' },
    { stage: 'alpha', title: 'Alpha', description: 'In testing with a small group of users.' },
    { stage: 'beta', title: 'Beta', description: 'Ready to enable and try in PostHog.' },
]

const featureUrl = (flagKey: string): string => `/roadmap?feature=${encodeURIComponent(flagKey)}`

const stripMarkdown = (text: string): string => text.replace(/[*_~`#]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')

export default function CustomRoadmapSlide(): JSX.Element {
    const { features, loading } = useRoadmapEarlyAccessFeatures({ teamSlug: 'self-driving' })

    return (
        <div data-scheme="primary" className="h-full bg-primary text-primary p-4 @md:p-8 overflow-auto">
            <h2 className="text-3xl @md:text-4xl font-bold mb-6 text-center">Roadmap</h2>

            <div className="grid @lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
                {STAGES.map(({ stage, title, description }) => {
                    const stageFeatures = features.filter((feature) => feature.stage === stage).slice(0, 3)
                    const styles = ROADMAP_STAGE_STYLES[stage]

                    return (
                        <section key={stage} className="border border-primary rounded overflow-hidden">
                            <header className={`border-b px-4 py-2 ${styles.border} ${styles.surface}`}>
                                <h3 className={`text-sm @md:text-base text-center mb-0 font-semibold ${styles.text}`}>
                                    {title}
                                </h3>
                                <p className="mb-0 mt-1 text-center text-xs text-secondary">{description}</p>
                            </header>
                            <div className="divide-y divide-primary overflow-y-auto">
                                {stageFeatures.map((feature) => (
                                    <Link
                                        key={feature.flagKey}
                                        to={featureUrl(feature.flagKey)}
                                        state={{ newWindow: true }}
                                        className="block p-3 text-primary hover:bg-accent"
                                    >
                                        <div className="flex gap-2">
                                            {typeof feature.waitlistCount === 'number' && feature.waitlistCount > 0 && (
                                                <span
                                                    className={`h-min shrink-0 rounded border px-2 py-1 text-xs font-semibold ${styles.border} ${styles.surface} ${styles.text}`}
                                                >
                                                    {feature.waitlistCount} interested
                                                </span>
                                            )}
                                            <div className="min-w-0 flex-1">
                                                <h4 className="mb-1 truncate text-sm font-bold leading-tight">
                                                    {feature.name}
                                                </h4>
                                                {feature.description && (
                                                    <p className="m-0 line-clamp-2 text-xs">
                                                        {stripMarkdown(feature.description)}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                                {!loading && stageFeatures.length === 0 && (
                                    <p className="m-0 p-3 text-center text-xs text-secondary">
                                        Nothing in this stage right now.
                                    </p>
                                )}
                                {loading && stageFeatures.length === 0 && (
                                    <p className="m-0 p-3 text-center text-xs text-secondary">Loading roadmap…</p>
                                )}
                            </div>
                        </section>
                    )
                })}
            </div>

            <div className="text-center mt-6">
                <p className="text-sm text-secondary">
                    Have opinions about what we should build next?{' '}
                    <Link to="/roadmap" className="text-primary underline" state={{ newWindow: true }}>
                        Vote on our roadmap.
                    </Link>
                </p>
            </div>
        </div>
    )
}
