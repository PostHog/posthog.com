import { kea, actions, reducers, listeners, afterMount } from 'kea'

export const posthogAnalyticsLogic = kea([
    actions(() => ({
        setPosthog: (posthog) => ({ posthog }),
    })),

    reducers(() => ({
        posthog: [
            undefined,
            {
                setPosthog: (_, { posthog }) => (posthog && typeof window !== 'undefined' ? window.posthog : undefined),
            },
        ],
    })),

    afterMount(({ actions }) => {
        actions.setPosthog(typeof window !== 'undefined' ? window.posthog : undefined)
    }),
])
