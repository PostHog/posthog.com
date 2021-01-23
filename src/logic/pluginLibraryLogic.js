import { kea } from 'kea'
import { pluginInstallationMd } from '../pages-content/plugin-installation'
import { getPluginImageSrc } from '../lib/utils'

export const pluginLibraryLogic = kea({
    actions: {
        setFilter: (filter) => ({ filter }),
        setActivePlugin: (activePlugin) => ({ activePlugin }),
        setOpenPlugin: (pluginName) => ({ pluginName }),
        setPluginPathname: (pathname) => ({ pathname }),
    },
    reducers: () => ({
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
        activePluginName: [
            '',
            {
                setOpenPlugin: (_, { pluginName }) => pluginName ?? '',
            },
        ],
        pluginPathname: [
            '',
            {
                setPluginPathname: (_, { pathname }) => pathname,
                setOpenPlugin: (_, { pluginName }) => (pluginName ? pluginName.toLowerCase().replaceAll(' ', '-') : ''),
            },
        ],
        pluginLoading: [
            false,
            {
                setOpenPlugin: () => true,
                setActivePlugin: () => false,
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
        pluginMatch: [
            (s) => [s.pluginPathname, s.filteredPlugins],
            (pluginPathname, filteredPlugins) =>
                filteredPlugins.filter((plugin) => plugin.name.toLowerCase().replaceAll(' ', '-') === pluginPathname),
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
        setOpenPlugin: async ({ pluginName }) => {
            if (!pluginName) {
                return
            }
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
        loadPluginsSuccess: () => {
            const { setPluginPathname } = actions
            setPluginPathname(window.location.pathname.split('plugins/')[1])
        },
        setPluginPathname: () => {
            const { pluginMatch } = values
            const { setOpenPlugin } = actions
            setOpenPlugin(pluginMatch[0] ? pluginMatch[0].name : '')
        },
    }),
    actionToUrl: ({ values }) => ({
        setOpenPlugin: ({ pluginName }) => (!pluginName ? '/plugins/' : `/plugins/${values.pluginPathname}`),
    }),
    urlToAction: ({ actions, values }) => ({
        '/plugins': () => actions.setOpenPlugin(''),
        '/plugins/': () => actions.setOpenPlugin(''),
        '/plugins/:pathname': ({ pathname }) =>
            values.filteredPlugins && !values.openPlugin ? actions.setPluginPathname(pathname) : () => {},
    }),
})
