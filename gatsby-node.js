const path = require('path')

exports.createPages = require('./gatsby/createPages')
exports.onCreateNode = require('./gatsby/onCreateNode')
exports.createSchemaCustomization = require('./gatsby/createSchemaCustomization')
exports.sourceNodes = require('./gatsby/sourceNodes')
exports.onPostBuild = require('./gatsby/onPostBuild.js')

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    // Only update the `/app` page.
    if (page.path.match(/^\/next\-steps/)) {
        page.matchPath = '/next-steps/*'
        createPage(page)
    }
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
