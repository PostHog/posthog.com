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
                        path_ranking: 1,
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
            retrievePages('handbook', '/^handbook/'),
            retrievePages('tutorial', '/^tutorials/'),
            retrievePages('blog', '/^blog/'),
            retrievePages('customers', '/^customers/'),
            retrievePages('apps', '/^apps/'),
            retrievePages('cdp', '/^cdp/'),
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
                            path_ranking: 1,
                        }
                    })
                },
            },
            {
                query: `
                            {
                              questions: allSqueakQuestion(filter: {permalink: {ne: null}, archived: {ne: true}}) {
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
                            path_ranking: 5,
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
                            path_ranking: 1,
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
                            path_ranking: 1,
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
                            path_ranking: 1,
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
                            type: 'docs',
                            slug: 'pricing',
                            path_ranking: 1,
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
                            id: createContentDigest('questions'),
                            title: 'Questions',
                            type: 'community',
                            slug: 'questions',
                            path_ranking: 5,
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
                            path_ranking: 1,
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
