import type { PostHog } from '../types/posthog'

const usePostHog = (): PostHog | undefined => {
    return typeof window !== 'undefined' ? window.posthog : undefined
}

export default usePostHog
