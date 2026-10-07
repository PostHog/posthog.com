import React, { useMemo, useState } from 'react'
import { IconPlus, IconSearch, IconWarning, IconX } from '@posthog/icons'
import { Popover } from 'components/RadixUI/Popover'
import { Checkbox } from 'components/RadixUI/Checkbox'
import Tooltip from 'components/RadixUI/Tooltip'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import { IconTag } from 'components/OSIcons'
import { useUser } from 'hooks/useUser'
import { AlertTeam, ForumTopic, useForumAlerts } from './hooks'
import TopicIcon from './TopicIcon'

type AlertTarget = { kind: 'topic' | 'tag'; id: number; label: string }

const subscribesTo = (team: AlertTeam, target: AlertTarget) =>
    (target.kind === 'topic' ? team.topicIds : team.tagIds).includes(target.id)

const TeamChip = ({ team, onRemove }: { team: AlertTeam; onRemove: () => void }) => {
    const chip = (
        <span
            className={`inline-flex items-center gap-1 rounded-full border pl-2 pr-0.5 text-sm leading-6 ${
                team.slackChannel
                    ? 'border-primary bg-primary'
                    : 'border-red dark:border-yellow text-red dark:text-yellow'
            }`}
        >
            {!team.slackChannel && <IconWarning className="size-3.5" />}
            {team.name}
            <button
                onClick={onRemove}
                aria-label={`Stop alerting ${team.name}`}
                className="size-5 rounded-full flex items-center justify-center text-muted hover:text-primary hover:bg-accent"
            >
                <IconX className="size-3" />
            </button>
        </span>
    )
    return team.slackChannel ? (
        chip
    ) : (
        <Tooltip trigger={chip} delay={0}>
            {team.name} has no Slack channel, so it gets nothing. Set one on its team page.
        </Tooltip>
    )
}

const TeamPicker = ({
    teams,
    target,
    onToggle,
}: {
    teams: AlertTeam[]
    target: AlertTarget
    onToggle: (team: AlertTeam, subscribed: boolean) => void
}) => {
    const [query, setQuery] = useState('')
    const visible = useMemo(() => {
        const q = query.trim().toLowerCase()
        return q ? teams.filter((team) => team.name.toLowerCase().includes(q)) : teams
    }, [teams, query])

    return (
        <Popover
            dataScheme="primary"
            align="start"
            contentClassName="w-64 !p-0"
            trigger={
                <span className="flex">
                    <OSButton size="xs" icon={<IconPlus />} aria-label={`Add a team to ${target.label}`} />
                </span>
            }
        >
            <div className="flex flex-col text-sm">
                <label className="m-2 flex items-center gap-2 rounded border border-primary px-2 py-1 text-muted">
                    <IconSearch className="size-3.5" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find a team…"
                        className="w-full bg-transparent border-none p-0 text-sm text-primary focus:ring-0"
                    />
                </label>
                <ul className="max-h-72 overflow-y-auto list-none m-0 p-0 pb-1">
                    {visible.map((team) => {
                        const checked = subscribesTo(team, target)
                        const id = `alert-${target.kind}-${target.id}-${team.id}`
                        return (
                            <li key={team.id} className="flex items-center gap-2 px-3 py-1 hover:bg-accent">
                                <Checkbox id={id} checked={checked} onCheckedChange={() => onToggle(team, !checked)} />
                                <label
                                    htmlFor={id}
                                    className={`flex-1 cursor-pointer ${checked ? 'font-semibold' : ''}`}
                                >
                                    {team.name}
                                </label>
                                {!team.slackChannel && <IconWarning className="size-3.5 text-red dark:text-yellow" />}
                            </li>
                        )
                    })}
                    {visible.length === 0 && <li className="px-3 py-2 text-muted">No teams</li>}
                </ul>
            </div>
        </Popover>
    )
}

const AlertRow = ({
    target,
    icon,
    teams,
    uncovered,
    onToggle,
}: {
    target: AlertTarget
    icon: React.ReactNode
    teams: AlertTeam[]
    uncovered: boolean
    onToggle: (team: AlertTeam, subscribed: boolean) => void
}) => {
    const subscribers = teams.filter((team) => subscribesTo(team, target))
    return (
        <li className="flex flex-col @lg:flex-row @lg:items-start gap-2 px-4 py-2.5 border-t border-primary first:border-t-0">
            <div className="@lg:w-48 shrink-0 flex items-center gap-2 leading-6 font-medium">
                {icon}
                <span className="truncate">{target.label}</span>
            </div>
            <div className="flex-1 flex flex-wrap items-center gap-1.5">
                {subscribers.map((team) => (
                    <TeamChip key={team.id} team={team} onRemove={() => onToggle(team, false)} />
                ))}
                {!subscribers.length && (
                    <span className={`text-sm leading-6 ${uncovered ? 'text-red dark:text-yellow' : 'text-muted'}`}>
                        {uncovered ? 'No team gets these posts' : 'Only the topic’s teams'}
                    </span>
                )}
                <TeamPicker teams={teams} target={target} onToggle={onToggle} />
            </div>
        </li>
    )
}

export default function ForumAlerts({ topics, loading }: { topics: ForumTopic[]; loading?: boolean }) {
    const { isModerator } = useUser()
    const { teams, isLoading, loadFailed, setTopicSubscription, setTagSubscription } = useForumAlerts()
    const [gapsOnly, setGapsOnly] = useState(false)
    const [error, setError] = useState('')

    const toggle = (target: AlertTarget) => async (team: AlertTeam, subscribed: boolean) => {
        setError('')
        try {
            await (target.kind === 'topic' ? setTopicSubscription : setTagSubscription)(team.id, target.id, subscribed)
        } catch (err) {
            setError((err as Error).message)
        }
    }

    const topicHasTeams = (topic: ForumTopic) => teams.some((team) => team.topicIds.includes(topic.id))
    const tagHasTeams = (tagId: number) => teams.some((team) => team.tagIds.includes(tagId))
    const gaps = topics.flatMap((topic) =>
        topicHasTeams(topic)
            ? []
            : [
                  `#${topic.attributes.slug}`,
                  ...(topic.attributes.tags?.data ?? [])
                      .filter((tag) => !tagHasTeams(tag.id))
                      .map((tag) => `#${topic.attributes.slug}/${tag.attributes.slug}`),
              ]
    )
    const silentTeams = teams.filter((team) => !team.slackChannel && (team.topicIds.length || team.tagIds.length))

    if (!isModerator) {
        return <div className="px-6 py-12 text-center text-secondary">Only staff can manage Slack alerts.</div>
    }

    if (loadFailed) {
        return (
            <div className="px-6 py-12 text-center text-secondary">
                The teams could not be loaded, so Slack alerts can’t be shown. The server may not support forum alerts
                yet.
            </div>
        )
    }

    return (
        <div className="@container">
            <header className="px-4 @xl:px-5 pt-4 pb-3 border-b border-primary">
                <h1 className="text-2xl font-bold text-primary leading-tight m-0">Slack alerts</h1>
                <p className="text-sm text-secondary m-0 mt-0.5">
                    When a post goes live, each team that follows its topic or one of its tags gets one message in its
                    Slack channel.
                </p>
            </header>
            <div className="px-4 @xl:px-5 py-4 space-y-4">
                {(gaps.length > 0 || silentTeams.length > 0) && (
                    <div className="flex flex-col gap-1.5 rounded border border-primary bg-accent px-3 py-2 text-sm">
                        {gaps.length > 0 && (
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span className="flex items-center gap-1.5">
                                    <IconWarning className="size-4 text-red dark:text-yellow" />
                                    {gaps.length === 1
                                        ? '1 place alerts no team'
                                        : `${gaps.length} places alert no team`}
                                </span>
                                <label className="flex items-center gap-1.5 text-secondary cursor-pointer">
                                    <Checkbox
                                        id="forum-alerts-gaps-only"
                                        checked={gapsOnly}
                                        onCheckedChange={(checked) => setGapsOnly(!!checked)}
                                    />
                                    Show only these
                                </label>
                            </div>
                        )}
                        {silentTeams.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5">
                                <IconWarning className="size-4 text-red dark:text-yellow" />
                                No Slack channel:
                                {silentTeams.map((team, index) => (
                                    <React.Fragment key={team.id}>
                                        {index > 0 && ', '}
                                        <Link to={`/teams/${team.slug}`} state={{ newWindow: true }}>
                                            {team.name}
                                        </Link>
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {error && <p className="m-0 text-sm text-red dark:text-yellow">{error}</p>}
                {(loading || isLoading) && !topics.length ? (
                    <div className="h-40 rounded border border-primary bg-accent animate-pulse" />
                ) : (
                    topics.map((topic) => {
                        const covered = topicHasTeams(topic)
                        const tags = (topic.attributes.tags?.data ?? []).filter(
                            (tag) => !gapsOnly || (!covered && !tagHasTeams(tag.id))
                        )
                        if (gapsOnly && covered) return null
                        const topicTarget: AlertTarget = { kind: 'topic', id: topic.id, label: 'All posts' }
                        return (
                            <section key={topic.id} className="rounded border border-primary overflow-hidden">
                                <h2 className="m-0 flex items-center gap-2 px-4 py-2 bg-accent border-b border-primary text-base font-semibold">
                                    <TopicIcon icon={topic.attributes.icon} className="size-4 text-secondary" />#
                                    {topic.attributes.slug}
                                </h2>
                                <ul className="list-none m-0 p-0">
                                    <AlertRow
                                        target={topicTarget}
                                        icon={<TopicIcon icon={topic.attributes.icon} className="size-4 text-muted" />}
                                        teams={teams}
                                        uncovered={!covered}
                                        onToggle={toggle(topicTarget)}
                                    />
                                    {tags.map((tag) => {
                                        const tagTarget: AlertTarget = {
                                            kind: 'tag',
                                            id: tag.id,
                                            label: tag.attributes.label,
                                        }
                                        return (
                                            <AlertRow
                                                key={tag.id}
                                                target={tagTarget}
                                                icon={<IconTag className="size-4 text-muted" />}
                                                teams={teams}
                                                uncovered={!covered}
                                                onToggle={toggle(tagTarget)}
                                            />
                                        )
                                    })}
                                </ul>
                            </section>
                        )
                    })
                )}
            </div>
        </div>
    )
}
