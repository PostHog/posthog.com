import React from 'react'
import { useRoadmaps } from 'hooks/useRoadmaps'
import Link from 'components/Link'
import dayjs from 'dayjs'
import Markdown from 'components/Squeak/components/Markdown'
import { ChangelogEmojiReactions } from 'components/EmojiReactions'

const productToTeamsMap: Record<string, string[]> = {
    'product analytics': ['product analytics', 'platform features'],
    'web analytics': ['web analytics'],
    'session replay': ['replay'],
    'feature flags': ['feature flags'],
    experiments: ['experiments'],
    surveys: ['surveys'],
    'data warehouse': ['data warehouse'],
    'data pipelines': ['cdp'],
    'revenue analytics': ['cdp'],
    'error tracking': ['error tracking'],
    'llm analytics': ['llm analytics'],
    'marketing analytics': ['web analytics'],
}

export const ProductChangelog = ({ product }: { product: string }) => {
    const teams = productToTeamsMap[product.toLowerCase()] || []

    const { roadmaps, isLoading } = useRoadmaps({
        params: {
            pagination: { limit: 30 },
            sort: { dateCompleted: 'desc' },
            filters: {
                complete: { $eq: true },
                ...(teams.length > 0 && {
                    $or: teams.map((team) => ({
                        teams: { name: { $eqi: team } },
                    })),
                }),
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
            <div className="space-y-8">
                {roadmaps.map((roadmap: { id: number; attributes: Record<string, any> }) => {
                    const { title, squeakId, dateCompleted, description, teams } = roadmap?.attributes || {}
                    const teamName = teams?.data?.[0]?.attributes?.name

                    return (
                        <article
                            key={squeakId || roadmap.id}
                            className="border-t border-primary pt-6 first:border-t-0 first:pt-0"
                        >
                            <h3 className="m-0 text-xl leading-tight">{title}</h3>
                            <p className="m-0 mt-1 text-sm opacity-60">
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
                        </article>
                    )
                })}
            </div>
            <Link to="/changelog" className="inline-block mt-6 text-sm font-semibold text-red dark:text-yellow">
                View full changelog →
            </Link>
        </div>
    )
}
