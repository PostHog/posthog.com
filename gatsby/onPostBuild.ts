import path from 'path'
import fs from 'fs'

import { GatsbyNode } from 'gatsby'
import {
    generateRawMarkdownPages,
    generateApiSpecMarkdown,
    generateOpenApiSpec,
    generateChangelogMd,
    generateLlmsTxt,
    generateSdkReferencesMarkdown,
    generateSdkTypeMarkdown,
    generatePricingMd,
    generatePlatformMd,
    generateProductPagesMarkdown,
} from './rawMarkdownUtils'
import { MARKDOWN_CONTENT_PATHS } from '../src/constants'
import { SdkReferenceData } from '../src/templates/sdk/SdkReference.js'
import { syncStandardSiteDocuments } from './standardSite'

const generateMarkdownArtifacts = async (graphql: any) => {
    // Generate API spec markdown files first
    try {
        const openApiSpecUrl = process.env.POSTHOG_OPEN_API_SPEC_URL || 'https://app.posthog.com/api/schema/'
        const spec = await fetch(openApiSpecUrl, {
            headers: {
                Accept: 'application/json',
            },
        }).then((res) => res.json())

        generateOpenApiSpec(spec)
        generateApiSpecMarkdown(spec)
    } catch (error) {
        console.error('Failed to generate API spec markdown:', error)
    }

    // Generate SDK references markdown files

    const sdkReferencesQuery = (await graphql(`
        query {
            allSdkReferences {
                nodes {
                    info {
                        description
                        id
                        specUrl
                        slugPrefix
                        title
                        version
                    }
                    referenceId
                    hogRef
                    id
                    categories
                    classes {
                        description
                        functions {
                            category
                            description
                            details
                            examples {
                                code
                                name
                                id
                            }
                            id
                            params {
                                description
                                isOptional
                                name
                                type
                            }
                            path
                            releaseTag
                            showDocs
                            returnType {
                                id
                                name
                            }
                            title
                        }
                        id
                        title
                    }
                    types {
                        example
                        id
                        name
                        path
                        properties {
                            description
                            name
                            type
                        }
                    }
                    version
                }
            }
        }
    `)) as { data: { allSdkReferences: { nodes: SdkReferenceData[] } } }

    sdkReferencesQuery.data.allSdkReferences.nodes.forEach((node) => {
        generateSdkReferencesMarkdown(node)
        generateSdkTypeMarkdown(node)
    })

    // Generate pricing.md from billing API data
    try {
        const billingUrl = `${process.env.BILLING_SERVICE_URL}/api/products-v2?display_friendly=true`
        const billingData = await fetch(billingUrl, {
            headers: { 'Content-Type': 'application/json' },
        }).then((res) => res.json())
        generatePricingMd(billingData.products)
    } catch (error) {
        console.error('Failed to generate pricing.md:', error)
    }

    // Generate markdown files for llms.txt file and LLM ingestion (after pages are built)
    // Convert HTML files to markdown using turndown
    // Build regex from MARKDOWN_CONTENT_PATHS constant (e.g., "/^/(docs|handbook)/")
    const markdownPathsRegex = `/^/(${MARKDOWN_CONTENT_PATHS.map((p) => p.replace('/', '')).join('|')})/`
    const docsQuery = (await graphql(`
        query {
            allMdx(filter: { fields: { slug: { regex: "${markdownPathsRegex}" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
        }
    `)) as { data: { allMdx: { nodes: Array<{ fields: { slug: string }; frontmatter: { title: string } }> } } }

    const filteredPages = await generateRawMarkdownPages(docsQuery.data.allMdx.nodes)
    // Only include docs pages in llms.txt (not handbook)
    const docsPages = filteredPages.filter((page) => page.fields.slug.startsWith('/docs'))
    generateLlmsTxt(docsPages)

    // Generate the self-driving platform overview + per-product markdown for LLMs/agents
    generatePlatformMd()
    generateProductPagesMarkdown()

    // Generate changelog.md (+ per-year archives) from build-time Roadmap nodes for LLMs/agents.
    // The /changelog page renders a virtualized UI, so the HTML-scrape path can't cover it.
    try {
        const changelogQuery = (await graphql(`
            query {
                allRoadmap(
                    filter: { complete: { eq: true }, date: { ne: null } }
                    sort: { fields: date, order: DESC }
                ) {
                    nodes {
                        strapiID
                        title
                        description
                        date
                        cta {
                            label
                            url
                        }
                        teams {
                            data {
                                attributes {
                                    name
                                }
                            }
                        }
                        topic {
                            data {
                                attributes {
                                    label
                                }
                            }
                        }
                    }
                }
                allChangelogVideo(sort: { fields: publishedAt, order: DESC }) {
                    nodes {
                        videoId
                        publishedAt
                        title
                    }
                }
            }
        `)) as {
            data?: {
                allRoadmap?: { nodes: any[] }
                allChangelogVideo?: { nodes: any[] }
            }
        }
        generateChangelogMd(
            changelogQuery.data?.allRoadmap?.nodes || [],
            changelogQuery.data?.allChangelogVideo?.nodes || []
        )
    } catch (error) {
        console.error('Failed to generate changelog markdown:', error)
    }
}

export const onPostBuild: GatsbyNode['onPostBuild'] = async ({ graphql }) => {
    if (process.env.GATSBY_MINIMAL === 'true') return

    await generateMarkdownArtifacts(graphql)

    // Publish/update Standard.site document records for blog posts.
    // Self-gates on env (STANDARD_SITE_SYNC) and BSKY_APP_PASSWORD; safe no-op otherwise.
    await syncStandardSiteDocuments(graphql)

    // Strapi sync + OG image generation run in GitHub Actions from this JSON.
    const { data } = await graphql(`
        query {
            allRoadmap(filter: { complete: { ne: false } }) {
                nodes {
                    title
                    description
                    date
                    cta {
                        url
                        label
                    }
                    media {
                        data {
                            attributes {
                                url
                            }
                        }
                    }
                }
            }
            allMDXPosts: allMdx(
                filter: {
                    fields: {
                        slug: {
                            regex: "/^/blog|^/tutorials|^/customers|^/spotlight|^/founders|^/product-engineers|^/features|^/newsletter/"
                        }
                    }
                    frontmatter: { date: { ne: null } }
                }
            ) {
                nodes {
                    parent {
                        ... on File {
                            relativePath
                        }
                    }
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                        category
                        tags
                        authorData {
                            name
                        }
                        featuredImage {
                            publicURL
                            childImageSharp {
                                gatsbyImageData(width: 650, height: 350)
                            }
                        }
                        authorData {
                            profile_id
                        }
                        crosspost
                        hideFromIndex
                    }
                    excerpt(pruneLength: 250)
                }
            }
            blog: allMdx(
                filter: { fields: { slug: { regex: "/^/blog|^/spotlight|^/founders|^/product-engineers/" } } }
            ) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        featuredImage {
                            publicURL
                        }
                        authorData {
                            name
                            role
                            profile {
                                avatar {
                                    url
                                }
                            }
                        }
                    }
                }
            }
            docsHandbook: allMdx(filter: { fields: { slug: { regex: "/^/handbook|^/docs/" } } }) {
                nodes {
                    fields {
                        slug
                        contributors {
                            username
                            avatar
                        }
                    }
                    frontmatter {
                        title
                        description
                        showTitle
                        hideAnchor
                        hideLastUpdated
                        availability {
                            free
                            selfServe
                            enterprise
                        }
                    }
                    parent {
                        ... on File {
                            fields {
                                lastUpdated: gitLogLatestDate(formatString: "MMM D, YYYY")
                            }
                        }
                    }
                    timeToRead
                    excerpt(pruneLength: 500)
                }
            }
            tutorials: allMdx(filter: { fields: { slug: { regex: "/^/tutorials/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        featuredImage {
                            publicURL
                        }
                    }
                }
            }
            customers: allMdx(filter: { fields: { slug: { regex: "/^/customers/" } } }) {
                nodes {
                    fields {
                        slug
                    }
                    frontmatter {
                        featuredImage {
                            publicURL
                        }
                        logo {
                            publicURL
                        }
                        title
                    }
                }
            }
            careers: allAshbyJobPosting(filter: { isListed: { eq: true } }) {
                nodes {
                    title
                    fields {
                        slug
                    }
                    parent {
                        ... on AshbyJob {
                            customFields {
                                title
                                value
                            }
                        }
                    }
                }
            }
        }
    `)

    if (!data) {
        throw new Error('Failed to query post-build data')
    }

    data.careers.nodes = data.careers.nodes.map((job) => ({
        ...job,
        parent: job.parent
            ? {
                  customFields: (job.parent.customFields || []).filter(({ title }) => title === 'Timezone(s)'),
              }
            : null,
    }))

    const outPath = path.resolve(__dirname, '../public/post-build-data.json')
    fs.writeFileSync(outPath, JSON.stringify(data))
    console.log(`Wrote post-build data to ${outPath}`)
}
