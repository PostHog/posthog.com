import { kea, actions, reducers } from 'kea'
import type { PostHog } from 'posthog-js'

export const posthogAnalyticsLogic = kea([
    actions(() => ({
        posthogFound: (posthog) => ({ posthog }),
    })),

    reducers(() => ({
        posthog: [
            typeof window !== 'undefined' ? window.posthog : undefined,
            {
                posthogFound: (_, { posthog }) => posthog,
            },
        ],
    })),
])
