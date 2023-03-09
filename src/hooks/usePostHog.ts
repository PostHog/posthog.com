import type { PostHog } from 'posthog-js'

const usePostHog = (): PostHog | undefined => {
    return typeof window !== 'undefined' ? ((window as any).posthog as PostHog) : undefined
}

export default usePostHog
