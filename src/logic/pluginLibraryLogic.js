import { kea } from 'kea'

export const pluginLibraryLogic = kea({
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
    events: ({ actions }) => ({
        afterMount: () => {
            actions.loadPlugins()
        },
    }),
})
