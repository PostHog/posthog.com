import { kea } from 'kea'

export const pluginLibraryLogic = kea({
    actions: {
        setFilter: (filter) => ({ filter }),
    },
    reducers: { filter: ['all', { setFilter: (_, { filter }) => filter }] },
    loaders: () => ({
        plugins: [
            [],
            {
                loadPlugins: async () => {
                    const response = await window.fetch(
                        'https://raw.githubusercontent.com/PostHog/plugin-repository/main/repository.json'
                    )
                    return await response.json()
                },
            },
        ],
    }),
    selectors: {
        filteredPlugins: [
            (s) => [s.plugins, s.filter],
            (plugins, filter) =>
                plugins.filter((p) => p.displayOnWebsiteLib && (filter === 'all' || filter === p.type)),
        ],
    },
    events: ({ actions }) => ({
        afterMount: () => {
            // only load in the frontend
            if (typeof window !== 'undefined') {
                actions.loadPlugins()
            }
        },
    }),
})
