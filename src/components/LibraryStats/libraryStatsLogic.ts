import { kea } from 'kea'
import { librariesList } from './libraries'

export interface Library {
    name: string
    path: string
    lastCommit: string
    stars: number
    openIssues: number
    pullRequests: number
}

const ONE_HOUR = 1000 * 60 * 60

export const libraryStatsLogic = kea({
    loaders: {
        libraries: [
            [] as Library[],
            {
                loadLibraryStats: async () => {
                    // Try to load a cache first to prevent GitHub rate limiting
                    const statsCacheTimestamp = localStorage.getItem('library_stats_timestamp')
                    if (statsCacheTimestamp && new Date().getTime() - Number(statsCacheTimestamp) < ONE_HOUR) {
                        const librariesListCache = localStorage.getItem('library_stats_timestamp_cache')
                        if (librariesListCache) {
                            return JSON.parse(librariesListCache)
                        }
                    }

                    for (let i = 0; i < librariesList.length; ++i) {
                        const library = librariesList[i]
                        const repoRes = await (await fetch(`https://api.github.com/repos/${library.path}`)).json()

                        librariesList[i]['stars'] = repoRes.stargazers_count
                        librariesList[i]['openIssues'] = 0
                        librariesList[i]['pullRequests'] = 0
                        librariesList[i]['lastCommit'] = new Date(repoRes.pushed_at).toLocaleDateString('en-GB')

                        if (typeof repoRes.open_issues_count === 'number' && repoRes.open_issues_count > 0) {
                            const pullRequestsRes = await (
                                await fetch(`https://api.github.com/repos/${library.path}/pulls?state=open`)
                            ).json()

                            librariesList[i]['openIssues'] = repoRes.open_issues_count - pullRequestsRes.length
                            librariesList[i]['pullRequests'] = pullRequestsRes.length
                        }
                    }

                    const sortedLibraries = librariesList.sort((a, b) => b.stars - a.stars)
                    localStorage.setItem('library_stats_timestamp_cache', JSON.stringify(sortedLibraries))
                    localStorage.setItem('library_stats_timestamp', String(new Date().getTime()))

                    return sortedLibraries
                },
            },
        ],
    },
    events: ({ actions }) => ({
        afterMount: () => {
            // only load in the frontend
            if (typeof window !== 'undefined') {
                actions.loadLibraryStats()
            }
        },
    }),
})
