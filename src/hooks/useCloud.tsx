import usePostHog from './usePostHog'

type Cloud = 'eu' | 'us'

export default function useCloud(): Cloud | null {
    const posthog = usePostHog()
    const isEU = posthog?.isFeatureEnabled?.('direct-to-eu-cloud')
    const isUS = posthog?.isFeatureEnabled?.('direct-to-us-cloud')
    const cloud = isEU ? 'eu' : isUS ? 'us' : null
    return cloud
}
