import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import { IconX } from '@posthog/icons'
import CommunityLayout, { SectionTitle } from 'components/Community/Layout'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import Select from 'components/Select'
import Spinner from 'components/Spinner'
import Tooltip from 'components/Tooltip'
import { useUser } from 'hooks/useUser'
import useCommunityAlerts, { AlertTeam, AlertTopic } from 'hooks/useCommunityAlerts'
import useTopicsNav from '../../navs/useTopicsNav'

const Warning = ({ children }: { children: React.ReactNode }) => (
    <span className="text-red dark:text-yellow font-semibold">{children}</span>
)

// Unpublished teams are hidden from /teams but still receive alerts, so mark them rather
// than filtering them out — otherwise the page would under-report who gets pinged.
const DraftMarker = ({ team }: { team: AlertTeam }) =>
    team.draft ? (
        <Tooltip content="This team is unpublished, so it doesn't show on /teams — but it still gets alerts">
            <span className="opacity-60 text-sm">(draft)</span>
        </Tooltip>
    ) : null

// The channel ID itself is edited on the team's own page — here we only surface whether one
// is set, because a team with no channel is silently doing nothing on every topic it's
// subscribed to.
const TeamChip = ({ team, onRemove }: { team: AlertTeam; onRemove: () => void }) => (
    <span className="inline-flex items-center gap-1 border border-primary rounded bg-accent px-2 py-0.5 text-sm">
        <Link to={`/teams/${team.slug}`} state={{ newWindow: true }}>
            {team.name}
        </Link>
        <DraftMarker team={team} />
        {!team.slackChannel && (
            <Tooltip
                content="No Slack channel set on this team, so nothing is posted. Set one on the team's page."
                placement="top"
            >
                <span>
                    <Warning>no channel</Warning>
                </span>
            </Tooltip>
        )}
        <Tooltip content={`Stop notifying ${team.name}`} placement="top">
            <button onClick={onRemove} className="opacity-60 hover:opacity-100">
                <IconX className="size-3" />
            </button>
        </Tooltip>
    </span>
)

export default function CommunityAlerts() {
    const { isModerator, isValidating } = useUser()
    const topicsNav = useTopicsNav()
    const { topics, teams, loading, error, subscribeTeam, unsubscribeTeam } = useCommunityAlerts()
    const [problemsOnly, setProblemsOnly] = useState(false)

    useEffect(() => {
        if (!isValidating && !isModerator) {
            navigate('/questions')
        }
    }, [isModerator, isValidating])

    const unwired = topics.filter((topic) => topic.teams.length === 0)
    const silent = teams.filter((team) => team.topicIDs.length > 0 && !team.slackChannel)
    const visibleTopics = problemsOnly ? unwired : topics

    // Group first (alphabetically), ungrouped last — an ungrouped topic never shows up in the
    // ask-a-question picker, so those are worth seeing together at the bottom.
    const sortedTopics = [...visibleTopics].sort((a, b) => {
        if (a.group !== b.group) {
            if (!a.group) return 1
            if (!b.group) return -1
            return a.group.localeCompare(b.group)
        }
        return a.label.localeCompare(b.label)
    })

    if (!isModerator) return null

    const topicRows = sortedTopics.map((topic: AlertTopic) => {
        const unsubscribed = teams.filter((team) => !topic.teams.some((subscribed) => subscribed.id === team.id))
        return {
            key: `topic-${topic.id}`,
            cells: [
                {
                    content: (
                        <>
                            <div className="font-semibold">{topic.label}</div>
                            <div className="text-sm opacity-60">
                                {topic.group ?? <Warning>no topic group — can&apos;t be picked when asking</Warning>}
                            </div>
                        </>
                    ),
                },
                {
                    content:
                        topic.teams.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                                {topic.teams.map((team) => (
                                    <TeamChip
                                        key={team.id}
                                        team={team}
                                        onRemove={() => unsubscribeTeam(topic.id, team.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <Warning>Nobody is notified</Warning>
                        ),
                },
                {
                    content: (
                        <Select
                            search
                            placeholder="Add team..."
                            value={undefined}
                            onChange={(teamID) => teamID && subscribeTeam(topic.id, teamID)}
                            options={unsubscribed.map((team) => ({ label: team.name, value: team.id }))}
                        />
                    ),
                },
            ],
        }
    })

    return (
        <CommunityLayout menu={topicsNav} title="Question alerts">
            <SectionTitle>Question alerts</SectionTitle>

            <p className="text-sm opacity-75">
                When someone asks a question, PostHog posts it to the Slack channel of every team subscribed to that
                question&apos;s topic. Set which teams a topic notifies here; set each team&apos;s Slack channel on its
                own team page. Changes take effect immediately — no deploy.
            </p>
            <p className="text-sm opacity-75">
                A question only notifies Slack when it is <em>created</em>. Adding a topic to an existing question
                updates the messages already posted, but never sends a new one.
            </p>

            {loading && <Spinner />}
            {/* Rendered outside the table block so a failed save doesn't blank the page. */}
            {error && <p className="border border-primary rounded bg-accent p-3 text-red dark:text-yellow">{error}</p>}

            {!loading && topics.length > 0 && (
                <>
                    {(unwired.length > 0 || silent.length > 0) && (
                        <div className="bg-accent border border-primary p-4 rounded mb-6">
                            <ul className="list-disc m-0 pl-4 text-sm space-y-1">
                                {unwired.length > 0 && (
                                    <li>
                                        <Warning>{unwired.length}</Warning> topic{unwired.length === 1 ? '' : 's'}{' '}
                                        notify nobody: {unwired.map((topic) => topic.label).join(', ')}
                                    </li>
                                )}
                                {silent.length > 0 && (
                                    <li>
                                        <Warning>{silent.length}</Warning> team{silent.length === 1 ? '' : 's'}{' '}
                                        subscribe to topics but have no Slack channel, so nothing is posted. Set one on{' '}
                                        {silent.map((team, i) => (
                                            <React.Fragment key={team.id}>
                                                {i > 0 && ', '}
                                                <Link to={`/teams/${team.slug}`} state={{ newWindow: true }}>
                                                    {team.name}
                                                </Link>
                                            </React.Fragment>
                                        ))}
                                        .
                                    </li>
                                )}
                            </ul>
                            {unwired.length > 0 && (
                                <label className="flex items-center gap-2 text-sm mt-3 mb-0">
                                    <input
                                        type="checkbox"
                                        checked={problemsOnly}
                                        onChange={(e) => setProblemsOnly(e.target.checked)}
                                    />
                                    Only show topics that notify nobody
                                </label>
                            )}
                        </div>
                    )}

                    <OSTable
                        rowAlignment="top"
                        columns={[
                            { name: 'Topic', width: 'minmax(200px, 1fr)' },
                            { name: 'Notifies', width: 'minmax(300px, 2fr)' },
                            { name: 'Add', width: 'minmax(180px, auto)' },
                        ]}
                        rows={topicRows}
                    />
                </>
            )}
        </CommunityLayout>
    )
}
