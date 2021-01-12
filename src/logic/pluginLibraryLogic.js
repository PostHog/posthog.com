import { kea } from 'kea'
import api from '../lib/api'
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
                    const response = await api.get(
                        'https://raw.githubusercontent.com/PostHog/plugin-repository/main/repository.json'
                    )
                    return response
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
