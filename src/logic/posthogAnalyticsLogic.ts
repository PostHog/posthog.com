import { kea, actions, reducers, listeners, events, selectors } from 'kea'

export const posthogAnalyticsLogic = kea([
    actions(() => ({
        posthogFound: (posthog) => ({ posthog }),
    })),

    reducers(() => ({
        posthog: [
            window.posthog,
            {
                posthogFound: (_, { posthog }) => posthog,
            },
        ],
    })),
])
