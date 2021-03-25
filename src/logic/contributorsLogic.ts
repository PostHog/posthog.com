import { kea } from 'kea'
import { Contributor } from 'types'
import { ignoreContributors, mvpWinners } from '../pages-content/community-constants'

export const contributorsLogic = kea({
    actions: {},
    loaders: {
        contributors: [
            [] as Contributor[],
            {
                loadContributors: async () => {
                    const contributorsRes = await fetch(
                        'https://raw.githubusercontent.com/PostHog/posthog/master/.allcontributorsrc#'
                    )
                    const fileContent = await contributorsRes.text()
                    const parsedContent = JSON.parse(fileContent.replace(/"badgeTemplate": ".*",/, ''))

                    let contributors = parsedContent.contributors.filter(
                        (contributor: Contributor) => !ignoreContributors.has(contributor.login)
                    )

                    const contributorLevelsRes = await fetch(
                        'https://data.heroku.com/dataclips/zzzdzthiltszdhfliisfdhpqxocr.json'
                    )
                    const contributorLevelsJson = await contributorLevelsRes.json()

                    const levelMap: Record<string, number> = {}

                    for (const row of contributorLevelsJson.values) {
                        levelMap[row[0]] = row[1]
                    }

                    for (let contributor of contributors) {
                        contributor['level'] = levelMap[contributor.login] || 0
                        contributor['mvpWins'] = mvpWinners[contributor.login] || 0
                    }

                    return contributors.sort((a: Contributor, b: Contributor) => {
                        if (b.level > a.level) {
                            return 1
                        } else if (a.level === b.level) {
                            return b.mvpWins > a.mvpWins ? 1 : -1
                        } else {
                            return -1
                        }
                    })
                },
            },
        ],
    },
    events: ({ actions }) => ({
        afterMount: () => {
            // only load in the frontend
            if (typeof window !== 'undefined') {
                actions.loadContributors()
            }
        },
    }),
})
