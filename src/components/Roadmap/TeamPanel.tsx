import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { EarlyAccessFeature } from 'hooks/useEarlyAccessFeatures'
import { QuarterObjectives } from './TeamObjectives'

export interface TeamPanelTeam {
    slug: string
    name: string
    miniCrest?: Parameters<typeof getImage>[0]
}

/**
 * Drawer content for a team: its current-quarter objectives plus its roadmap features.
 * Feature rows are rendered by the caller (via renderFeature) so this file doesn't import
 * the board's card components back out of the orchestrator.
 */
const TeamPanel = ({
    team,
    objectivesBody,
    quarter,
    year,
    features,
    renderFeature,
}: {
    team: TeamPanelTeam
    objectivesBody?: string
    quarter: number
    year: number
    features: EarlyAccessFeature[]
    renderFeature: (feature: EarlyAccessFeature) => React.ReactNode
}): JSX.Element => {
    const crest = team.miniCrest ? getImage(team.miniCrest) : undefined

    return (
        <div data-scheme="primary" className="flex h-full min-h-0 flex-col bg-primary">
            <header className="shrink-0 border-b border-primary px-4 py-4 pr-14">
                <div className="flex items-center gap-3">
                    {crest && (
                        <GatsbyImage image={crest} alt={`${team.name} team mini crest`} className="size-10 shrink-0" />
                    )}
                    <div className="min-w-0">
                        <h2 className="m-0 text-2xl leading-tight">{team.name} Team</h2>
                        <Link
                            to={`/teams/${team.slug}`}
                            state={{ newWindow: true }}
                            className="text-sm font-semibold text-red dark:text-yellow"
                        >
                            Visit team page
                        </Link>
                    </div>
                </div>
            </header>

            <ScrollArea className="min-h-0 flex-1">
                <div className="flex flex-col gap-6 p-4">
                    <div>
                        <h3 className="mb-2 mt-0 text-sm">
                            This quarter (Q{quarter} {year})
                        </h3>
                        {objectivesBody ? (
                            <QuarterObjectives body={objectivesBody} quarter={quarter} year={year} />
                        ) : (
                            <p className="m-0 text-sm italic text-secondary">This team hasn't set goals yet.</p>
                        )}
                    </div>
                    {features.length > 0 && (
                        <div>
                            <h3 className="mb-2 mt-0 text-sm">On the roadmap</h3>
                            <ul className="m-0 flex list-none flex-col gap-2 p-0">
                                {features.map((feature) => (
                                    <li key={feature.flagKey} className="m-0 list-none p-0">
                                        {renderFeature(feature)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    )
}

export default TeamPanel
