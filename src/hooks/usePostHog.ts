import type { PostHog } from '@posthog/types'

const usePostHog = (): PostHog | undefined => {
    return typeof window !== 'undefined' ? window.posthog : undefined
}

export default usePostHog
