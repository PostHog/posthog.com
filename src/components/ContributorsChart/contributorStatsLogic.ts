import { kea } from 'kea'

export const contributorStatsLogic = kea({
    loaders: {
        datasets: [
            [],
            {
                loadDatasets: async () => {
                    const datasetsRes = await fetch(
                        'https://app.posthog.com/api/dashboard/2779/?share_token=zNJCq1F_hNWClJknv2csag2I9XypOQ'
                    )
                    const datasetsJson = await datasetsRes.json()

                    return datasetsJson.items[0].result
                },
            },
        ],
    },
    events: ({ actions }) => ({
        afterMount: () => {
            // only load in the frontend
            if (typeof window !== 'undefined') {
                actions.loadDatasets()
            }
        },
    }),
})
