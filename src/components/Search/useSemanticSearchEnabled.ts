import usePostHog from '../../hooks/usePostHog'

/**
 * Gates the Inkeep semantic search engine (see README.md).
 * PostHog feature flag, with a localStorage escape hatch for local dev
 * (posthog-js doesn't load without GATSBY_POSTHOG_API_KEY) and QA:
 *   localStorage.setItem('website-semantic-search', 'true')
 */
export const useSemanticSearchEnabled = (): boolean => {
    const posthog = usePostHog()
    return Boolean(
        posthog?.isFeatureEnabled?.('website-semantic-search') ||
            (typeof window !== 'undefined' && window.localStorage?.getItem('website-semantic-search') === 'true')
    )
}
