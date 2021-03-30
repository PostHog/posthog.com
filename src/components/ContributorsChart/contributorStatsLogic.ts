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
                        'https://app.posthog.com/api/dashboard/2868/?share_token=6j6-3tr86CgbNK_4PmyYHxHQYTdvEg'
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
