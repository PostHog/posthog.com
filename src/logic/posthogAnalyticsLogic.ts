import { kea, actions, reducers, listeners, afterMount } from 'kea'

export const posthogAnalyticsLogic = kea([
    actions(() => ({
        setPosthog: (posthog) => ({ posthog }),
        setFeatureFlags: (flags) => ({ flags }),
    })),

    reducers(() => ({
        posthog: [
            undefined,
            {
                setPosthog: (_, { posthog }) => (posthog && typeof window !== 'undefined' ? window.posthog : undefined),
            },
        ],
        featureFlags: [
            undefined,
            {
                setFeatureFlags: (_, { flags }) => flags,
            },
        ],
    })),

    listeners(({ actions }) => ({
        setPosthog: async ({ posthog }, breakpoint) => {
            await breakpoint(1000)
            posthog.onFeatureFlags &&
                posthog?.onFeatureFlags(() => {
                    actions.setFeatureFlags(window.posthog?.featureFlags?.flagCallReported)
                })
        },
    })),

    afterMount(({ actions }) => {
        actions.setPosthog(typeof window !== 'undefined' ? window.posthog : undefined)
    }),
])
