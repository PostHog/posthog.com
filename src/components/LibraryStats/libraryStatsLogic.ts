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

export const libraryStatsLogic = kea({
    loaders: {
        libraries: [
            [] as Library[],
            {
                loadLibraryStats: async () => {
                    for (let i = 0; i < librariesList.length; ++i) {
                        const library = librariesList[i]
                        const repoRes = await (await fetch(`https://api.github.com/repos/${library.path}`)).json()

                        librariesList[i]['stars'] = repoRes.stargazers_count
                        librariesList[i]['openIssues'] = 0
                        librariesList[i]['pullRequests'] = 0
                        librariesList[i]['lastCommit'] = '-'

                        if (typeof repoRes.open_issues_count === 'number' && repoRes.open_issues_count > 0) {
                            const pullRequestsRes = await (
                                await fetch(`https://api.github.com/repos/${library.path}/pulls?state=open`)
                            ).json()

                            librariesList[i]['openIssues'] = repoRes.open_issues_count - pullRequestsRes.length
                            librariesList[i]['pullRequests'] = pullRequestsRes.length
                        }

                        const commitsRes = await (
                            await fetch(`https://api.github.com/repos/${library.path}/commits`)
                        ).json()

                        if (commitsRes) {
                            librariesList[i]['lastCommit'] = new Date(
                                commitsRes[0].commit.author.date
                            ).toLocaleDateString('en-GB')
                        }
                    }

                    return librariesList.sort((a, b) => b.stars - a.stars)
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
