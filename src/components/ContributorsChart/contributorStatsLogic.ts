import { kea } from 'kea'

interface Dataset {
    labels: string[]
    breakdown_value: string
    data: number[]
}

export const contributorStatsLogic = kea({
    loaders: {
        datasets: [
            [] as Dataset[],
            {
                loadDatasets: async () => {
                    const datasetsRes = await fetch(
                        'https://app.posthog.com/api/dashboard/2779/?share_token=zNJCq1F_hNWClJknv2csag2I9XypOQ'
                    )
                    const datasetsJson = await datasetsRes.json()

                    const sortedDatasets = datasetsJson.items[0].result.sort((a: Dataset, b: Dataset) => {
                        const aTotal = a.data.reduce((aggregate, current) => aggregate + current)
                        const bTotal = b.data.reduce((aggregate, current) => aggregate + current)
                        if (bTotal > aTotal) {
                            return 1
                        }
                        return -1
                    })

                    return sortedDatasets.slice(0, 15)
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
