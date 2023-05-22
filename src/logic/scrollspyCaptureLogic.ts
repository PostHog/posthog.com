import { kea, key, actions, reducers, listeners, connect, events } from 'kea'

import type { scrollspyCaptureLogicType } from './scrollspyCaptureLogicType'

export const scrollspyCaptureLogic = kea<scrollspyCaptureLogicType>([
    key((props) => props.key as string),

    actions({
        reportScrollUpdated: (elementId) => ({ elementId }),
        setLastUpdatedAt: (lastUpdatedAt) => ({ lastUpdatedAt }),
        setLastElementViewed: (elementId) => ({ elementId }),
    }),

    reducers(() => ({
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
    })),

    listeners(({ actions, values }) => ({
        reportScrollUpdated: async ({ elementId }, breakpoint) => {
            await breakpoint(2000)
            const now = new Date().valueOf()
            const lastUpdatedAt = values.lastUpdatedAt || now
            const secondsElapsed = (now - lastUpdatedAt) / 1000
            if (values.lastElementViewed) {
                // Send an event upon completion of viewing the last element.
                typeof window !== 'undefined' &&
                    window.posthog?.capture('section heading viewed', {
                        element_id: elementId,
                        seconds_elapsed: secondsElapsed,
                    })
            }
            actions.setLastUpdatedAt(now)
            actions.setLastElementViewed(elementId)
        },
    })),

    events(({ actions }) => ({
        afterMount: () => {
            const now = new Date().valueOf()
            actions.setLastUpdatedAt(now)
        },
    })),
])
