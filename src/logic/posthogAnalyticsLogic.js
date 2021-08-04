import { kea } from 'kea'
import { getCookie } from 'lib/utils'

export const posthogAnalyticsLogic = kea({
    actions: {
        posthogFound: (posthog) => ({ posthog }),
        setFeatureFlags: (featureFlags) => ({ featureFlags }),
    },

    reducers: {
        featureFlags: [
            {},
            {
                setFeatureFlags: (state, { featureFlags }) => {
                    const flags = {}
                    for (const flag of featureFlags) {
                        flags[flag] = true
                    }
                    return flags
                },
            },
        ],
        posthog: [
            null,
            {
                posthogFound: (_, { posthog }) => posthog,
            },
        ],
    },

    listeners: ({ actions }) => ({
        posthogFound: ({ posthog }) => {
            if (posthog.onFeatureFlags) {
                posthog.onFeatureFlags(actions.setFeatureFlags)
            }
            const variant = Math.round(Math.random() * 100)
            posthog.capture('set experiment variant', {
                $set_once: {
                    experiment_variant: variant,
                },
            })
        },
    }),

    events: ({ actions, cache }) => ({
        afterMount: () => {
            if (typeof window !== 'undefined') {
                if (window.posthog) {
                    actions.posthogFound(window.posthog)
                } else {
                    // check every 300ms if posthog is now there
                    cache.posthogInterval = window.setInterval(() => {
                        if (window.posthog) {
                            actions.posthogFound(window.posthog)
                            window.clearInterval(cache.posthogInterval)
                        }
                    }, 300)
                }
            }
        },
        beforeUnmount: () => {
            if (typeof window !== 'undefined') {
                window.clearInterval(cache.posthogInterval)
            }
        },
    }),

    selectors: {
        activeFeatureFlags: [
            (s) => [s.featureFlags],
            (featureFlags) =>
                Object.entries(featureFlags)
                    .filter(([, value]) => !!value)
                    .map(([key]) => key),
        ],
        isLoggedIn: [
            (s) => [s.posthog],
            (posthog) => {
                const token = posthog?.config.token
                if (token) {
                    const rawCookie = getCookie(`ph_${token}_posthog`)
                    const cookie = JSON.parse(rawCookie)
                    return !!cookie['$user_id']
                }
            },
        ],
    },
})
