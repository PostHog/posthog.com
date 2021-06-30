const path = require('path')
const fetch = require(`node-fetch`)

exports.createPages = require('./gatsby/createPages')
exports.onCreateNode = require('./gatsby/onCreateNode')

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // Only update the `/app` page.
    if (page.path.match(/^\/plugins/)) {
        // page.matchPath is a special key that's used for matching pages
        // with corresponding routes only on the client.
        // page.matchPath = '/plugins/*'
        // Update the page.
        // createPage(page)
    }
}

exports.sourceNodes = async ({ actions: { createNode }, createContentDigest }) => {
    let result = await fetch(`https://raw.githubusercontent.com/PostHog/plugin-repository/main/repository.json`)
    let resultData = await result.json()
    const plugins = {}
    for (let i = 0; i < resultData.length; i++) {
        const plugin = resultData[i]
        const id = plugin.url.split('/').pop() || plugin.name
        plugins[id] = { ...plugin, markdown: '' }
    }
    await Promise.all(
        Object.keys(plugins)
            .filter((id) => {
                const plugin = plugins[id]
                return plugin.displayOnWebsiteLib && plugin.url.includes('github.com/')
            })
            .map((id) => {
                const plugin = plugins[id]
                return fetch(`https://raw.githubusercontent.com/${plugin.url.split('github.com/')[1]}/main/README.md`)
                    .then((response) => {
                        if (response.status === 200) {
                            return response.text()
                        }
                    })
                    .then((response) => {
                        const markdown = response || ''
                        plugins[id] = { ...plugin, markdown }
                    })
            })
    )
    // pretty messy way to handle this async logic

    createNode({
        plugins: Object.values(plugins),
        // wanted to keep plugins as an object
        id: `plugin-data`,
        parent: null,
        children: [],
        internal: {
            type: `Plugin`,
            contentDigest: createContentDigest(resultData),
        },
    })
}

exports.onCreateWebpackConfig = ({ stage, actions }) => {
    actions.setWebpackConfig({
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            alias: {
                '~': path.resolve(__dirname, 'src'),
                lib: path.resolve(__dirname, 'src', 'lib'),
                types: path.resolve(__dirname, 'src', 'types'),
                images: path.resolve(__dirname, 'src', 'images'),
                components: path.resolve(__dirname, 'src', 'components'),
                logic: path.resolve(__dirname, 'src', 'logic'),
            },
        },
    })
}
