import { useEffect, useState } from 'react'
import type { SelfDrivingFeed } from '../../../../api/self-driving-prs'

const FEED_URL = '/api/self-driving-prs'
const REFRESH_MS = 15 * 60 * 1000
const CLOCK_MS = 60 * 1000
const FETCH_TIMEOUT_MS = 8000

const fetchFeed = async (): Promise<SelfDrivingFeed> => {
    const response = await fetch(FEED_URL, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) })
    if (!response.ok) throw new Error(`${FEED_URL} returned ${response.status}`)
    const feed: SelfDrivingFeed = await response.json()
    if (feed.pullRequests.length === 0) throw new Error(`${FEED_URL} returned no pull requests`)
    return feed
}

export function useSelfDrivingFeed(): { feed: SelfDrivingFeed | null; failed: boolean; now: number | null } {
    const [feed, setFeed] = useState<SelfDrivingFeed | null>(null)
    const [failed, setFailed] = useState(false)
    const [now, setNow] = useState<number | null>(null)

    useEffect(() => {
        let mounted = true
        const load = () =>
            fetchFeed()
                .then((loaded) => {
                    if (!mounted) return
                    setFeed(loaded)
                    setFailed(false)
                })
                .catch(() => mounted && setFailed(true))
        load()
        const refresh = window.setInterval(() => !document.hidden && load(), REFRESH_MS)
        return () => {
            mounted = false
            window.clearInterval(refresh)
        }
    }, [])

    useEffect(() => {
        setNow(Date.now())
        const clock = window.setInterval(() => setNow(Date.now()), CLOCK_MS)
        return () => window.clearInterval(clock)
    }, [])

    return { feed, failed, now }
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

const CONVENTIONAL_COMMIT_PREFIX = /^\w+(?:\([^)]+\))?!?:\s*/

export const titleSummary = (title: string | null, number: number): string =>
    title?.replace(CONVENTIONAL_COMMIT_PREFIX, '').trim() || `Pull request #${number}`

export const repositoryLabel = (repository: string): string => repository.replace(/^posthog\//i, '')
