import React from 'react'
import { useRoadmaps } from 'hooks/useRoadmaps'
import Link from 'components/Link'
import dayjs from 'dayjs'
import Markdown from 'components/Squeak/components/Markdown'
import { ChangelogEmojiReactions } from 'components/EmojiReactions'
import { ChangelogPRMetadata } from 'components/ChangelogPRMetadata'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { IconPencil, IconPlus, IconShieldLock } from '@posthog/icons'
import OSButton from 'components/OSButton'
import Tooltip from 'components/RadixUI/Tooltip'
import RoadmapWindow from 'components/Roadmap/RoadmapWindow'

type ProductConfig = {
    topic?: string // Filter by product tag/label (topic.label)
    teams?: string[] // Filter by team name(s)
}

const productConfigMap: Record<string, ProductConfig> = {
    'product analytics': { topic: 'Product analytics', teams: ['product analytics', 'analytics platform'] },
    'web analytics': { topic: 'Web analytics', teams: ['web analytics'] },
    'session replay': { topic: 'Session replay', teams: ['replay'] },
    'feature flags': { topic: 'Feature flags', teams: ['feature flags'] },
    experiments: { topic: 'Experiments', teams: ['experiments'] },
    surveys: { topic: 'Surveys', teams: ['surveys'] },
    'data warehouse': { topic: 'Data warehouse', teams: ['data warehouse', 'clickhouse'] },
    'data pipelines': { topic: 'CDP', teams: ['batch exports'] },
    workflows: { topic: 'Workflows', teams: ['workflows'] },
    'error tracking': { topic: 'Error tracking', teams: ['error tracking'] },
    'llm analytics': { topic: 'LLM analytics', teams: ['llm analytics'] },
    'posthog ai': { topic: 'PostHog AI', teams: ['posthog ai'] },
    endpoints: { topic: 'endpoints' },
    logs: { topic: 'logs', teams: ['logs'] },
    'customer analytics': { teams: ['customer analytics'] },
}

const buildRoadmapFilters = (config: ProductConfig) => {
    const filters: Record<string, any>[] = []

    if (config.topic) {
        filters.push({ topic: { label: { $eqi: config.topic } } })
    }

    if (config.teams && config.teams.length > 0) {
        config.teams.forEach((team) => {
            filters.push({ teams: { name: { $eqi: team } } })
        })
    }

    return filters
}

export const ProductChangelog = ({ product }: { product: string }) => {
    const { isModerator } = useUser()
    const { addWindow } = useApp()
    const config = productConfigMap[product.toLowerCase()] || {}
    const orFilters = buildRoadmapFilters(config)
    const fiveMonthsAgo = dayjs().subtract(5, 'month').format('YYYY-MM-DD')

    const handleAddFeature = () => {
        addWindow(
            React.createElement(RoadmapWindow, {
                location: { pathname: `add-roadmap` },
                key: `add-roadmap`,
                newWindow: true,
                status: 'complete',
            }) as unknown as never
        )
    }

    const handleEditRoadmap = (id: number) => {
        addWindow(
            React.createElement(RoadmapWindow, {
                location: { pathname: `edit-roadmap-${id}` },
                key: `edit-roadmap-${id}`,
                newWindow: true,
                id: id,
                status: 'complete',
            }) as unknown as never
        )
    }

    const { roadmaps, isLoading } = useRoadmaps({
        params: {
            pagination: { limit: 32 },
            sort: { dateCompleted: 'desc' },
            filters: {
                complete: { $eq: true },
                dateCompleted: { $gte: fiveMonthsAgo },
                ...(orFilters.length > 0 && { $or: orFilters }),
            },
        },
    })

    if (isLoading) {
        return (
            <div className="w-full py-4">
                <p className="text-muted">Loading changelog...</p>
            </div>
        )
    }

    if (!roadmaps || roadmaps.length === 0) {
        return (
            <div className="w-full py-4">
                <p className="text-muted">No changelog entries found for {product}.</p>
            </div>
        )
    }

    return (
        <div className="w-full">
            {isModerator && (
                <div className="mb-4">
                    <Tooltip
                        trigger={
                            <OSButton variant="secondary" size="md" icon={<IconPlus />} onClick={handleAddFeature}>
                                Add changelog
                            </OSButton>
                        }
                        delay={0}
                    >
                        <IconShieldLock className="size-6 inline-block relative -top-px text-secondary" /> Add changelog
                    </Tooltip>
                </div>
            )}
            <div>
                {roadmaps.map((roadmap: { id: number; attributes: Record<string, any> }) => {
                    const { title, squeakId, dateCompleted, description, teams, githubPRMetadata } =
                        roadmap?.attributes || {}
                    const teamName = teams?.data?.[0]?.attributes?.name

                    return (
                        <div
                            key={squeakId || roadmap.id}
                            className="border-t border-primary py-6 first:border-t-0 first:pt-0 mt-0"
                        >
                            <div className="flex items-start justify-between gap-2">
                                <h2 className="m-0">{title}</h2>
                                {isModerator && (
                                    <Tooltip
                                        trigger={
                                            <OSButton
                                                size="md"
                                                icon={<IconPencil />}
                                                onClick={() => handleEditRoadmap(roadmap.id)}
                                            />
                                        }
                                        delay={0}
                                    >
                                        <IconShieldLock className="size-6 inline-block relative -top-px text-secondary" />{' '}
                                        Edit changelog
                                    </Tooltip>
                                )}
                            </div>
                            <p className="m-0 mt-1 text-sm text-secondary">
                                {dateCompleted && dayjs(dateCompleted).format('MMM D, YYYY')} | {teamName} Team
                            </p>

                            {description && (
                                <div className="mt-3">
                                    <Markdown>{description}</Markdown>
                                </div>
                            )}

                            <div className="mt-4 flex flex-row flex-wrap gap-1">
                                <ChangelogEmojiReactions roadmapId={roadmap.id} />
                            </div>

                            {githubPRMetadata && (
                                <div className="flex flex-row gap-x-7 text-sm mt-4">
                                    <ChangelogPRMetadata githubPRMetadata={githubPRMetadata} truncated={true} />
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
            <Link to="/changelog" className="inline-block mt-6">
                View full changelog →
            </Link>
        </div>
    )
}
