import { kea } from 'kea'
import { loadersPlugin } from 'kea-loaders'
import { resetContext } from 'kea'

resetContext({
    plugins: [loadersPlugin({})],
})

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
