import path from 'path'
import fs from 'fs/promises'
import { GatsbyNode } from 'gatsby'
const axios = require('axios')

export { createPages } from './gatsby/createPages'
export { onCreateNode, onPreInit } from './gatsby/onCreateNode'
export { createSchemaCustomization } from './gatsby/createSchemaCustomization'
export { sourceNodes } from './gatsby/sourceNodes'
export { onPostBuild } from './gatsby/onPostBuild'
export { createResolvers } from './gatsby/createResolvers'
export { onPreBootstrap } from './gatsby/onPreBootstrap'

// Implement the Gatsby API "onCreatePage". This is
// called after every page is created.
export const onCreatePage: GatsbyNode['onCreatePage'] = async ({ page, actions }) => {
    const { createPage, deletePage } = actions

    // Add build time to credits page using environment variable
    if (page.path === '/credits/') {
        // Use Vercel's VERCEL_ENV variable or current time as fallback
        const buildDate = process.env.VERCEL_GIT_COMMIT_SHA
            ? new Date() // This will be the actual build time when deployed
            : new Date()

        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
            timeZone: 'America/Los_Angeles',
        }
        const buildTime = buildDate.toLocaleString('en-US', options)

        deletePage(page)
        createPage({
            ...page,
            context: {
                ...page.context,
                buildTime,
                // Also pass the commit SHA if available for debugging
                commitSha: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'local',
            },
        })
    }

    if (page.path.match(/^\/community\/profiles/)) {
        page.matchPath = '/community/profiles/*'
        createPage(page)
    }
    if (page.path.match(/^\/next\-steps/)) {
        page.matchPath = '/next-steps/*'
        createPage(page)
    }
    // Add client-side routing for custom presentations
    if (page.path.match(/^\/for\//)) {
        page.matchPath = '/for/*'
        createPage(page)
    }
}

export const onCreateBabelConfig: GatsbyNode['onCreateBabelConfig'] = ({ actions }) => {
    actions.setBabelPlugin({
        name: '@babel/plugin-transform-react-jsx',
        options: {
            runtime: 'automatic',
        },
    })
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ stage, actions }) => {
    actions.setWebpackConfig({
        ...(process.env.GATSBY_MINIMAL === 'true'
            ? {
                  devtool: false,
              }
            : null),
        cache: process.env.NODE_ENV === 'development' || {
            compression: 'gzip',
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx'],
            modules: [
                path.resolve(__dirname, '.cache', 'gatsby-source-git', 'posthog-main-repo', 'docs'),
                path.resolve(__dirname, 'contents', 'docs'),
                'node_modules',
            ],
            alias: {
                '~': path.resolve(__dirname, 'src'),
                lib: path.resolve(__dirname, 'src', 'lib'),
                types: path.resolve(__dirname, 'src', 'types'),
                images: path.resolve(__dirname, 'src', 'images'),
                components: path.resolve(__dirname, 'src', 'components'),
                constants: path.resolve(__dirname, 'src', 'constants'),
                logic: path.resolve(__dirname, 'src', 'logic'),
                hooks: path.resolve(__dirname, 'src', 'hooks'),
                // Mapping
                docs: path.resolve(__dirname, '.cache', 'gatsby-source-git', 'posthog-main-repo', 'docs'),
                onboarding: path.resolve(
                    __dirname,
                    '.cache',
                    'gatsby-source-git',
                    'posthog-main-repo',
                    'docs',
                    'onboarding'
                ),
                'scenes/onboarding/OnboardingDocsContentWrapper': path.resolve(
                    __dirname,
                    'src',
                    'components',
                    'Docs',
                    'OnboardingContentWrapper.tsx'
                ),
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
