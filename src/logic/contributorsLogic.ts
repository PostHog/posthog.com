import { kea } from 'kea'
import { Contributor } from 'types'
import { ignoreContributors, mvpWinners } from '../pages-content/community-constants'

const coolHedgehog = {
    login: "the-cool-hedgehog",
    profile: "https://github.com/PostHog/posthog",
    avatar_url: "https://posthog.com/static/cool-hedgehog-2e771b8385a05bfe25cfdea4bbb775a3.svg",
    contributions:['code', 'doc', 'plugin', 'bug'],
    mvpWins: 2,
    level: 99
}

export const contributorsLogic = kea({
    actions: {
        processSearchInput: (query: string) => ({ query }),
        setSearchQuery: (query: string) => ({ query }),
    },
    reducers: {
        searchQuery: [
            '',
            {
                setSearchQuery: (_: null, { query }: { query: string }) => query,
            },
        ],
    },
    listeners: ({ actions }) => ({
        processSearchInput: async ({ query }: { query: string }, breakpoint: (ms: number) => Promise<any>) => {
            // pause for 100ms and break if `setUsername`
            // was called again during this time
            await breakpoint(100)

            actions.setSearchQuery(query)
        },
    }),
    selectors: {
        filteredContributors: [
            (s) => [s.searchQuery, s.contributors],
            (searchQuery: string, contributors: Contributor[]) =>
                contributors.filter((contributor: Contributor) => contributor.login.includes(searchQuery)),
        ],
    },
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

                    const sortedContributors = contributors.sort((a: Contributor, b: Contributor) => {
                        if (b.level > a.level) {
                            return 1
                        } else if (a.level === b.level) {
                            return b.mvpWins > a.mvpWins ? 1 : -1
                        } else {
                            return -1
                        }
                    })


                    return [coolHedgehog, ...sortedContributors]
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
