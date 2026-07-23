import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { IconPeople } from '@posthog/icons'
import Link from 'components/Link'

export interface QuarterGridTeam {
    slug: string
    name: string
    miniCrest?: Parameters<typeof getImage>[0]
    featureCount: number
}

const TeamCard = ({
    team,
    active,
    onClick,
}: {
    team: QuarterGridTeam
    active: boolean
    onClick: () => void
}): JSX.Element => {
    const crest = team.miniCrest ? getImage(team.miniCrest) : undefined

    return (
        <button
            data-roadmap-item=""
            type="button"
            aria-haspopup="dialog"
            aria-expanded={active}
            onClick={onClick}
            className={`flex w-full items-center gap-2.5 rounded-md border border-primary p-2.5 text-left hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red dark:focus-visible:ring-yellow ${
                active ? 'bg-accent' : 'bg-primary'
            }`}
        >
            {crest ? (
                <GatsbyImage image={crest} alt={`${team.name} team mini crest`} className="size-9 shrink-0" />
            ) : (
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary bg-accent">
                    <IconPeople className="size-5 text-secondary" />
                </span>
            )}
            <span className="min-w-0">
                <span className="block truncate text-sm font-bold leading-snug text-primary">{team.name}</span>
                {team.featureCount > 0 && (
                    <span className="mt-0.5 block text-xs text-secondary">{team.featureCount} on the roadmap</span>
                )}
            </span>
        </button>
    )
}

/**
 * Compact grid of team cards below the feature board. Cards open the shared drawer with the
 * team's quarterly objectives; the grid itself never scrolls — the Editor window owns the
 * page's only vertical scrollbar.
 */
const TeamQuarterSection = ({
    teams,
    totalTeams,
    quarter,
    year,
    activeTeamSlug,
    onTeamClick,
}: {
    teams: QuarterGridTeam[]
    totalTeams: number
    quarter: number
    year: number
    activeTeamSlug?: string
    onTeamClick: (slug: string) => void
}): JSX.Element => (
    <section aria-labelledby="teams" className="flex flex-col gap-3">
        <header className="px-1">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 id="teams" className="m-0 text-xl text-primary">
                    What teams are working on this quarter
                </h2>
                <span className="shrink-0 whitespace-nowrap text-sm text-secondary">
                    {teams.length} of {totalTeams} teams
                </span>
            </div>
            <p className="mb-0 mt-1 text-sm text-secondary">
                Every quarter, each team sets Q{quarter} {year} goals using our{' '}
                <Link to="/handbook/company/goal-setting" state={{ newWindow: true }}>
                    HOGS process
                </Link>
                . Click a team to see its current goals and roadmap features.
            </p>
        </header>
        {teams.length === 0 ? (
            <p className="m-0 px-1 text-sm text-muted">No teams match.</p>
        ) : (
            <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0 @xl:grid-cols-3 @3xl:grid-cols-4 @5xl:grid-cols-6">
                {teams.map((team) => (
                    <li key={team.slug} className="m-0 list-none p-0">
                        <TeamCard
                            team={team}
                            active={activeTeamSlug === team.slug}
                            onClick={() => onTeamClick(team.slug)}
                        />
                    </li>
                ))}
            </ul>
        )}
    </section>
)

export default TeamQuarterSection
