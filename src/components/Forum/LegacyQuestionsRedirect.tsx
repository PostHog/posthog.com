import { useEffect } from 'react'
import { navigate } from 'gatsby'

const LEGACY_TOPIC_SEGMENTS = ['topic', 'topics']

export const forumPathForLegacyQuestionsPath = (path: string) => {
    const [segment] = path.replace(/^\/questions\/?/, '').split('/')
    if (!segment) return '/forum'
    if (segment === 'subscriptions') return '/forum/following'
    if (LEGACY_TOPIC_SEGMENTS.includes(segment)) return '/forum'
    return `/forum/p/${segment}`
}

export default function LegacyQuestionsRedirect({ path }: { path: string }) {
    useEffect(() => {
        navigate(forumPathForLegacyQuestionsPath(path), { replace: true })
    }, [path])
    return null
}
