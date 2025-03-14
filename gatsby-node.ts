import path from 'path'
import { GatsbyNode } from 'gatsby'
const axios = require('axios')

export { createPages } from './gatsby/createPages'
export { onCreateNode, onPreInit } from './gatsby/onCreateNode'
export { createSchemaCustomization } from './gatsby/createSchemaCustomization'
export { sourceNodes } from './gatsby/sourceNodes'
export { onPostBuild } from './gatsby/onPostBuild'
export { createResolvers } from './gatsby/createResolvers'
export { onPreBootstrap } from './gatsby/onPreBootstrap'

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
export const onCreatePage: GatsbyNode['onCreatePage'] = async ({ page, actions }) => {
    const { createPage } = actions
    if (page.path.match(/^\/community\/profiles/)) {
        page.matchPath = '/community/profiles/*'
        createPage(page)
    }
    if (page.path.match(/^\/next\-steps/)) {
        page.matchPath = '/next-steps/*'
        createPage(page)
    }
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ stage, actions }) => {
    actions.setWebpackConfig({
        cache: process.env.NODE_ENV === 'development' || {
            compression: 'gzip',
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            alias: {
                '~': path.resolve(__dirname, 'src'),
                lib: path.resolve(__dirname, 'src', 'lib'),
                types: path.resolve(__dirname, 'src', 'types'),
                images: path.resolve(__dirname, 'src', 'images'),
                components: path.resolve(__dirname, 'src', 'components'),
                logic: path.resolve(__dirname, 'src', 'logic'),
                hooks: path.resolve(__dirname, 'src', 'hooks'),
            },
        },
    })
}

exports.createPages = async ({ actions }) => {
    const { createPage } = actions

    try {
        const response = await axios.get('https://jobs.ashbyhq.com/supabase')
        const jobData = JSON.parse(response.data)
        const jobs = jobData?.jobBoard?.jobPostings || []

        // Create the jobs page with the data
        createPage({
            path: '/jobs',
            component: require.resolve('./src/templates/jobs.tsx'),
            context: {
                jobs: jobs,
            },
        })
    } catch (error) {
        console.error('Error fetching jobs:', error)
    }
}
