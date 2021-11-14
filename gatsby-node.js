const path = require('path')

exports.createPages = require('./gatsby/createPages')
exports.onCreateNode = require('./gatsby/onCreateNode')
exports.createSchemaCustomization = require('./gatsby/createSchemaCustomization')
exports.sourceNodes = require('./gatsby/sourceNodes')

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
