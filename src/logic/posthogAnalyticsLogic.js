import { kea } from 'kea'
import { getCookie } from 'lib/utils'

const decide_api_version = process.env.GATSBY_POSTHOG_DECIDE_API_VERSION

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
                    let flags = {}
                    if (decide_api_version < 2 || Array.isArray(featureFlags)) {
                        for (const flag of featureFlags) {
                            flags[flag] = true
                        }
                    } else {
                        flags = featureFlags
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
                    .filter(([, value]) => value === true) // exclude non-boolean flags
                    .map(([key]) => key),
        ],
        isLoggedIn: [
            (s) => [s.posthog],
            (posthog) => {
                const token = posthog?.config?.token
                if (token) {
                    const rawCookie = getCookie(`ph_${token}_posthog`)
                    if (!rawCookie) return false
                    const cookie = JSON.parse(rawCookie)
                    return !!cookie['$user_id']
                }
            },
        ],
    },
})
