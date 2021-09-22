import { kea } from 'kea'
import { posthogAnalyticsLogic } from './posthogAnalyticsLogic'

export const scrollspyCaptureLogic = kea({
    key: (props) => props.key,

    actions: {
        reportScrollUpdated: (elementId: string) => ({ elementId }),
        setLastUpdatedAt: (lastUpdatedAt: number) => ({ lastUpdatedAt }),
        setLastElementViewed: (elementId: string) => ({ elementId }),
    },

    reducers: {
        lastUpdatedAt: [
            null as null | number,
            {
                setLastUpdatedAt: (_, { lastUpdatedAt }) => lastUpdatedAt,
            },
        ],
        lastElementViewed: [
            null as null | string,
            {
                setLastElementViewed: (_, { elementId }) => elementId,
            },
        ],
    },

    listeners: ({ actions, values }) => ({
        reportScrollUpdated: async ({ elementId }, breakpoint) => {
            await breakpoint(2000)
            const now = new Date().valueOf()
            const lastUpdatedAt = values.lastUpdatedAt || now
            const secondsElapsed = (now - lastUpdatedAt) / 1000
            if (values.lastElementViewed) {
                // Send an event upon completion of viewing the last element.
                values.posthog?.capture('section heading viewed', {
                    element_id: elementId,
                    seconds_elapsed: secondsElapsed,
                })
            }
            actions.setLastUpdatedAt(now)
            actions.setLastElementViewed(elementId)
        },
    }),

    connect: {
        values: [posthogAnalyticsLogic, ['posthog']],
    },

    events: ({ actions }) => ({
        afterMount: () => {
            const now = new Date().valueOf()
            actions.setLastUpdatedAt(now)
        },
    }),
})
