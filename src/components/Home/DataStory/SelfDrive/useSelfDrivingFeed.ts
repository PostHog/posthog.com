import { RefObject, useEffect, useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { useInView } from 'framer-motion'
import type { SelfDrivingFeed, SelfDrivingPullRequest } from '../../../../api/self-driving-prs'

const FEED_URL = '/api/self-driving-prs'
const REFRESH_MS = 15 * 60 * 1000
const CLOCK_MS = 60 * 1000
const FEED_SIZE = 10
const BUILD_TIME_REPOSITORY = 'posthog/posthog'

interface BuildTimePullRequest {
    prNumber: number
    title: string
    url: string
    state: string
    mergedAt: string | null
}

export type { SelfDrivingPullRequest }

export function useSelfDrivingFeed(ref: RefObject<HTMLElement>): {
    feed: SelfDrivingFeed
    loading: boolean
    now: number | null
} {
    const data = useStaticQuery(graphql`
        {
            allSelfDrivingPullRequest {
                nodes {
                    prNumber
                    title
                    url
                    state
                    mergedAt
                }
            }
        }
    `)
    const buildTimeFeed = useMemo<SelfDrivingFeed>(() => {
        const nodes: BuildTimePullRequest[] = data?.allSelfDrivingPullRequest?.nodes ?? []
        const pullRequests = nodes
            .filter((node) => node.state === 'merged' && node.mergedAt)
            .map((node) => ({
                repository: BUILD_TIME_REPOSITORY,
                number: node.prNumber,
                title: node.title,
                url: node.url,
                mergedAt: node.mergedAt as string,
            }))
            .sort((a, b) => Date.parse(b.mergedAt) - Date.parse(a.mergedAt))
            .slice(0, FEED_SIZE)
        return { pullRequests, mergedLast7Days: null }
    }, [data])

    const [liveFeed, setLiveFeed] = useState<SelfDrivingFeed | null>(null)
    const [loading, setLoading] = useState(true)
    const [now, setNow] = useState<number | null>(null)
    const inView = useInView(ref, { amount: 0.2 })

    useEffect(() => {
        if (!inView) return
        const load = () => {
            if (document.hidden) return
            fetch(FEED_URL)
                .then((response) => (response.ok ? response.json() : null))
                .then((feed: SelfDrivingFeed | null) => {
                    if (feed && feed.pullRequests.length > 0) setLiveFeed(feed)
                })
                .catch(() => undefined)
                .finally(() => setLoading(false))
        }
        load()
        const refresh = window.setInterval(load, REFRESH_MS)
        return () => window.clearInterval(refresh)
    }, [inView])

    useEffect(() => {
        setNow(Date.now())
        if (!inView) return
        const clock = window.setInterval(() => setNow(Date.now()), CLOCK_MS)
        return () => window.clearInterval(clock)
    }, [inView])

    return { feed: liveFeed ?? buildTimeFeed, loading, now }
}

const MINUTE_MS = 60 * 1000
const HOUR_MS = 60 * MINUTE_MS
const DAY_MS = 24 * HOUR_MS

export const timeAgo = (mergedAt: string, now: number | null): string => {
    if (now === null) return ''
    const elapsed = Math.max(0, now - Date.parse(mergedAt))
    if (elapsed < MINUTE_MS) return 'just now'
    if (elapsed < HOUR_MS) return `${Math.floor(elapsed / MINUTE_MS)} min ago`
    if (elapsed < DAY_MS) return `${Math.floor(elapsed / HOUR_MS)} h ago`
    return `${Math.floor(elapsed / DAY_MS)} d ago`
}

export const parseTitle = (title: string | null, number: number): { type: string; scope: string; summary: string } => {
    const match = (title ?? '').match(/^(\w+)(?:\(([^)]+)\))?!?:\s*(.+)$/)
    if (match) return { type: match[1].toLowerCase(), scope: match[2] ?? '', summary: match[3].trim() }
    return { type: '', scope: '', summary: title || `Pull request #${number}` }
}

export const repositoryLabel = (repository: string): string => repository.replace(/^posthog\//i, '')
