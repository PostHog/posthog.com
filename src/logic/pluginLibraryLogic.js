import { kea } from 'kea'
import { pluginInstallationMd } from '../pages-content/plugin-installation'
import { getPluginImageSrc } from '../lib/utils'
import { router } from 'kea-router'

export const pluginLibraryLogic = kea({
    actions: {
        setFilter: (filter) => ({ filter }),
        setActivePlugin: (activePlugin) => ({ activePlugin }),
        openPlugin: (pluginName) => ({ pluginName }),
        closeModal: () => true,
    },
    reducers: ({ actions }) => ({
        filter: [
            'all',
            {
                setFilter: (_, { filter }) => filter,
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
                [actions.openPlugin]: () => true,
                [actions.setActivePlugin]: () => false,
            },
        ],
        modalOpen: [
            false,
            {
                [actions.openPlugin]: () => true,
                [actions.closeModal]: () => false,
            },
        ],
    }),
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

    listeners: ({ values, actions }) => ({
        openPlugin: async ({ pluginName }) => {
            const pluginPath = pluginName.toLowerCase().replaceAll(' ', '-')
            const { push } = router.actions
            push(`/plugins/${pluginPath}`)

            const { setActivePlugin } = actions
            let plugin = values.filteredPlugins.filter((plugin) => plugin.name === pluginName)[0]
            let markdown = `# ${plugin.name} \n ${plugin.description} \n ${pluginInstallationMd}`
            if (plugin.url.includes('github')) {
                const response = await window.fetch(
                    `https://raw.githubusercontent.com/${plugin.url.split('hub.com/')[1]}/main/README.md`
                )
                if (response.status === 200) {
                    markdown = await response.text()
                }
            }
            if (!markdown.includes('Installation')) {
                markdown += pluginInstallationMd
            }
            plugin['markdown'] = markdown.split(/!\[.*\]\(.*\)/).join('')
            plugin['imageSrc'] = getPluginImageSrc(plugin)

            setActivePlugin(plugin)
        },
        closeModal: () => {
            if (window.location.pathname !== '/plugins') {
                const { push } = router.actions
                push('/plugins')
            }
        },
        [router.actions.locationChanged]: ({ pathname }) => {
            if (pathname === '/plugins') {
                actions.closeModal()
            }
        },
    }),
})
