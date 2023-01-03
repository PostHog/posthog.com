const { createContentDigest } = require('gatsby-core-utils')
const Slugger = require('github-slugger')
const slugger = new Slugger()

const retrievePages = (type, regex) => {
    return {
        query: `
            {
              docs: allMdx(filter: {slug: {regex: "${regex}"}}) {
                nodes {
                  id
                  headings {
                    value
                    depth
                  }
                  fields {
                    pageViews
                  }
                  rawBody
                  excerpt
                  frontmatter {
                    title
                  }
                  slug
                  internal {
                    contentDigest
                  }
                }
              }
            }
        `,
        transformer: ({ data }) =>
            data.docs.nodes
                .filter(({ frontmatter }) => frontmatter.title)
                .map(({ id, frontmatter, headings, ...page }) => {
                    return {
                        ...page,
                        headings: headings.map((heading) => ({
                            ...heading,
                            fragment: slugger.slug(heading.value),
                        })),
                        id,
                        title: frontmatter.title,
                        type,
                    }
                }),
    }
}

if (!process.env.GATSBY_ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY || !process.env.GATSBY_ALGOLIA_INDEX_NAME) {
    console.warn('No Algolia keys present in environment, skipping sending information to algolia')
}

module.exports = {
    // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
    resolve: `gatsby-plugin-algolia`,
    options: {
        appId: process.env.GATSBY_ALGOLIA_APP_ID,
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.GATSBY_ALGOLIA_INDEX_NAME,
        queries: [
            retrievePages('docs', '/^docs/'),
            retrievePages('manual', '/^manual/'),
            retrievePages('handbook', '/^handbook/'),
            retrievePages('tutorial', '/^tutorials/'),
            retrievePages('blog', '/^blog/'),
            retrievePages('customers', '/^customers/'),
            {
                query: `
                            {
                              endpoints: allApiEndpoint {
                                nodes {
                                  id
                                  url
                                  title: name
                                  schema {
                                    httpVerb
                                    path
                                  }
                                  internal {
                                    contentDigest
                                  }
                                }
                              }
                            }
                        `,
                transformer: ({ data }) => {
                    return data.endpoints.nodes.map(({ url, ...endpoint }) => {
                        return {
                            ...endpoint,
                            slug: url.slice(1),
                            type: 'api',
                        }
                    })
                },
            },
            {
                query: `
                            {
                              questions: allQuestion(filter: {permalink: {ne: null}}) {
                                nodes {
                                  id
                                  title: subject
                                  replies {
                                    body
                                  }
                                  permalink
                                  internal {
                                    contentDigest
                                  }
                                }
                              }
                            }
                        `,
                transformer: ({ data }) => {
                    return data.questions.nodes.map(({ replies, permalink, ...question }) => {
                        return {
                            ...question,
                            excerpt: replies?.[0]?.body,
                            slug: `questions/${permalink || ''}`,
                            type: 'question',
                        }
                    })
                },
            },
            {
                query: `{ query: sitePage { id } }`,
                transformer: () => {
                    return [
                        {
                            id: createContentDigest('docs'),
                            title: 'Docs',
                            type: 'docs',
                            slug: 'docs',
                            headings: [
                                { value: 'Get started', depth: 2 },
                                { value: 'Important links', depth: 2 },
                            ],
                            internal: {
                                contentDigest: createContentDigest('docs'),
                            },
                        },
                        {
                            id: createContentDigest('handbook'),
                            title: 'Handbook',
                            type: 'handbook',
                            slug: 'handbook',
                            headings: [
                                { value: 'Company', depth: 2 },
                                { value: 'How we work', depth: 2 },
                                { value: 'People', depth: 2 },
                                { value: 'Engineering', depth: 2 },
                                { value: 'Design', depth: 2 },
                                { value: 'Sales & marketing', depth: 2 },
                            ],
                            internal: {
                                contentDigest: createContentDigest('handbook'),
                            },
                        },
                        {
                            id: createContentDigest('blog'),
                            title: 'Blog',
                            type: 'blog',
                            slug: 'blog',
                            headings: [
                                { value: 'Inside PostHog', depth: 2 },
                                { value: 'Product updates', depth: 2 },
                                { value: 'Guides', depth: 2 },
                                { value: 'Startups', depth: 2 },
                                { value: 'Open source', depth: 2 },
                                { value: 'CEO diaries', depth: 2 },
                            ],
                            internal: {
                                contentDigest: createContentDigest('blog'),
                            },
                        },
                        {
                            id: createContentDigest('pricing'),
                            title: 'Pricing',
                            type: 'manual',
                            slug: 'pricing',
                            headings: [
                                { value: 'Products', depth: 2 },
                                { value: 'Pricing calculator', depth: 2 },
                                { value: 'What comes in PostHog?', depth: 2 },
                                { value: 'Want to self-host PostHog?', depth: 2 },
                                { value: 'Compare all plans', depth: 2 },
                                { value: 'Questions', depth: 2 },
                            ],
                            internal: {
                                contentDigest: createContentDigest('pricing'),
                            },
                        },
                        {
                            id: createContentDigest('using-posthog'),
                            title: 'Product manual',
                            type: 'manual',
                            slug: 'using-posthog',
                            headings: [
                                { value: '1. Product analytics', depth: 2 },
                                { value: '2. Visualize', depth: 2 },
                                { value: '3. Optimize', depth: 2 },
                                { value: '4. Data', depth: 2 },
                                { value: '5. Project settings', depth: 2 },
                            ],
                            internal: {
                                contentDigest: createContentDigest('using-posthog'),
                            },
                        },
                        {
                            id: createContentDigest('questions'),
                            title: 'Questions',
                            type: 'community',
                            slug: 'questions',
                            headings: [
                                { value: 'Features', depth: 2 },
                                { value: 'Deployment', depth: 2 },
                                { value: 'Data', depth: 2 },
                            ],
                            internal: {
                                contentDigest: createContentDigest('questions'),
                            },
                        },
                        {
                            id: createContentDigest('roadmap'),
                            title: 'Roadmap',
                            type: 'community',
                            slug: 'roadmap',
                            headings: [
                                { value: 'Under consideration', depth: 2 },
                                { value: 'In progress', depth: 2 },
                                { value: 'Recently shipped', depth: 2 },
                            ],
                            internal: {
                                contentDigest: createContentDigest('roadmap'),
                            },
                        },
                    ]
                },
            },
        ],
        chunkSize: 10000,
        /*settings: {
            // optional, any index settings
            // Note: by supplying settings, you will overwrite all existing settings on the index
        },*/
        mergeSettings: false, // optional, defaults to false. See notes on mergeSettings below
        concurrentQueries: true, // default: true
        dryRun: false, // default: false, only calculate which objects would be indexed, but do not push to Algolia
        continueOnFailure: false, // default: false, don't fail the build if Algolia indexing fails
        algoliasearchOptions: undefined, // default: { timeouts: { connect: 1, read: 30, write: 30 } }, pass any different options to the algoliasearch constructor
    },
}
