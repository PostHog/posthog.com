import { kea, actions, reducers, afterMount } from 'kea'

export const posthogAnalyticsLogic = kea([
    actions(() => ({
        setPosthog: (posthog) => ({ posthog }),
    })),

    reducers(() => ({
        posthog: [
            undefined,
            {
                setPosthog: (_, { posthog }) => posthog,
            },
        ],
    })),

    afterMount(({ actions }) => {
        actions.setPosthog(typeof window !== 'undefined' ? window.posthog : undefined)
    }),
])
