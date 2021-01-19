import { kea } from 'kea'

export const pluginLibraryLogic = kea({
    actions: {
        setFilter: (filter) => ({ filter }),
        setModalOpen: (open) => ({ open }),
        setActivePlugin: (activePlugin) => ({ activePlugin }),
        setPluginLoading: (pluginLoading) => ({ pluginLoading }),
    },
    reducers: {
        filter: [
            'all',
            {
                setFilter: (_, { filter }) => filter,
            },
        ],
        modalOpen: [
            false,
            {
                setModalOpen: (_, { open }) => open,
            },
        ],
        activePlugin: [
            {},
            {
                setActivePlugin: (_, { activePlugin }) => activePlugin,
            },
        ],
        pluginLoading: [
            false,
            {
                setPluginLoading: (_, { pluginLoading }) => pluginLoading,
            },
        ],
    },
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
