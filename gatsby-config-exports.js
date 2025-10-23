/**
 * Shared exports from gatsby-config.js
 *
 * This file exists because Gatsby validates the gatsby-config.js export
 * and doesn't allow custom properties. We need to export externalDocsSources
 * for use in clone-external-docs.js and createPages.ts.
 */

const path = require('path')

// External docs sources configuration
const externalDocsSources = [
    {
        name: 'posthog-monorepo',
        github: {
            repo: 'PostHog/posthog',
            path: 'docs/published',
        },
        path: process.env.POSTHOG_REPO_PATH
            ? `${process.env.POSTHOG_REPO_PATH}/docs/published`
            : path.join(process.cwd(), '.posthog-monorepo-cache'),
        pathTransform: (slug) => `/handbook/engineering${slug}`,
        ref: process.env.POSTHOG_MONOREPO_REF,
    },
]

module.exports = { externalDocsSources }
