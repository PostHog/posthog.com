import { kea, actions, reducers, events, listeners, selectors } from 'kea'
import { loaders } from 'kea-loaders'
import { actionToUrl, urlToAction } from 'kea-router'
import { pluginInstallationMd } from '../pages-content/plugin-installation'
import { getPluginImageSrc } from '../lib/utils'

import type { pluginLibraryLogicType } from './pluginLibraryLogicType'

export const toPathName = (pluginName: string) => pluginName.toLowerCase().replace(/ /g, '-')

export const pluginLibraryLogic = kea<pluginLibraryLogicType>([
    actions({
        setFilter: (filter) => ({ filter }),
        setActivePlugin: (activePlugin) => ({ activePlugin }),
        openLibrary: true,
        openPlugin: (pluginName) => ({ pluginName }),
        openPluginPath: (pathname) => ({ pathname }),
    }),

    reducers(() => ({
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
                openPlugin: (_, { pluginName }) => pluginName,
                openLibrary: () => '',
            },
        ],
        pluginPathname: [
            '',
            {
                openPluginPath: (_, { pathname }) => pathname,
                openPlugin: (_, { pluginName }) => toPathName(pluginName),
                openLibrary: () => '',
            },
        ],
        pluginLoading: [
            false,
            {
                openPlugin: () => true,
                setActivePlugin: () => false,
            },
        ],
    })),

    loaders(() => ({
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
    })),

    selectors({
        filteredPlugins: [
            (s) => [s.plugins, s.filter],
            (plugins, filter) =>
                plugins.filter((p) => p.displayOnWebsiteLib && (filter === 'all' || filter === p.type)),
        ],
        pluginMatch: [
            (s) => [s.pluginPathname, s.filteredPlugins],
            (pluginPathname, filteredPlugins) =>
                filteredPlugins.find((plugin) => toPathName(plugin.name) === pluginPathname),
        ],
    }),

    events(({ actions }) => ({
        afterMount: () => {
            // only load in the frontend
            if (typeof window !== 'undefined') {
                actions.loadPlugins()
            }
        },
    })),

    listeners(({ values, actions }) => ({
        openPlugin: async ({ pluginName }) => {
            if (typeof window === 'undefined') {
                return
            }

            const { setActivePlugin } = actions
            const plugin = values.filteredPlugins.filter((plugin) => plugin.name === pluginName)[0]
            let markdown = `# ${plugin.name} \n ${plugin.description} \n ${pluginInstallationMd}`
            if (plugin.url.includes('github.com/')) {
                try {
                    const response = await window.fetch(
                        `https://raw.githubusercontent.com/${plugin.url.split('github.com/')[1]}/main/README.md`
                    )
                    if (response.status === 200) {
                        markdown = await response.text()
                    }
                } catch (e) {
                    // can't load the readme, revert to default text
                }
            }

            if (!markdown.includes('Installation')) {
                markdown += pluginInstallationMd
            }

            plugin['markdown'] = markdown
                .split(/!\[.*\]\(.*\)/)
                .join('')
                .split(/<img\s+[^>]*>/)
                .join('')
            plugin['imageSrc'] = getPluginImageSrc(plugin)
            setActivePlugin(plugin)
        },
        loadPluginsSuccess: () => {
            const { openPluginPath } = actions
            openPluginPath(window.location.pathname.split('/plugins/')[1])
        },
        openPluginPath: () => {
            const { pluginMatch, pluginsLoading } = values
            if (pluginsLoading) {
                return
            }
            if (pluginMatch) {
                actions.openPlugin(pluginMatch.name)
            } else {
                actions.openLibrary()
            }
        },
    })),

    actionToUrl(() => ({
        openLibrary: () => '/plugins/',
        openPlugin: ({ pluginName }) => `/plugins/${toPathName(pluginName)}`,
        openPluginPath: ({ pathname }) => `/plugins/${pathname}`,
    })),

    urlToAction(({ actions }) => ({
        '/plugins': () => actions.openLibrary(),
        '/plugins/': () => actions.openLibrary(),
        '/plugins/:pathname': ({ pathname }) => actions.openPluginPath(pathname),
    })),
])
