import { kea, BreakPointFunction, actions, reducers, listeners, selectors, events } from 'kea'
import { loaders } from 'kea-loaders'
import { Contributor } from 'types'
import { ignoreContributors, mvpWinners } from '../pages-content/community-constants'

import type { contributorsLogicType } from './contributorsLogicType'

export const contributorsLogic = kea<contributorsLogicType>([
    actions({
        processSearchInput: (query: string) => ({ query }),
        setSearchQuery: (query: string) => ({ query }),
    }),
    reducers({
        searchQuery: [
            '',
            {
                setSearchQuery: (_, { query }: { query: string }) => query,
            },
        ],
    }),
    listeners(({ actions }) => ({
        processSearchInput: async ({ query }: { query: string }, breakpoint: BreakPointFunction) => {
            // pause for 100ms and break if `setUsername`
            // was called again during this time
            await breakpoint(100)

            actions.setSearchQuery(query)
        },
    })),
    loaders({
        contributors: [
            [] as Contributor[],
            {
                loadContributors: async () => {
                    const contributorsRes = await fetch(
                        'https://raw.githubusercontent.com/PostHog/posthog/master/.all-contributorsrc#'
                    )
                    const fileContent = await contributorsRes.text()
                    const parsedContent = JSON.parse(fileContent.replace(/"badgeTemplate": ".*",/, ''))

                    const contributors = parsedContent.contributors.filter(
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

                    for (const contributor of contributors) {
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

                    return sortedContributors
                },
            },
        ],
    }),
    selectors(() => ({
        filteredContributors: [
            (s) => [s.searchQuery, s.contributors],
            (searchQuery: string, contributors: Contributor[]) =>
                contributors.filter((contributor: Contributor) => contributor.login.includes(searchQuery)),
        ],
    })),
    events(({ actions }) => ({
        afterMount: () => {
            // only load in the frontend
            if (typeof window !== 'undefined') {
                actions.loadContributors()
            }
        },
    })),
])
