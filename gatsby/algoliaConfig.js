const slugify = require('slugify')

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
            data.docs.nodes.map(({ id, frontmatter, headings, ...page }) => {
                return {
                    ...page,
                    headings: headings.map((heading) => ({
                        ...heading,
                        fragment: slugify(heading.value, { lower: true }),
                    })),
                    id,
                    title: frontmatter.title,
                    type,
                }
            }),
    }
}

if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY || !process.env.ALGOLIA_INDEX_NAME) {
    console.warn('No Algolia keys present in environment, skipping sending information to algolia')
}

module.exports = {
    // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
    resolve: `gatsby-plugin-algolia`,
    options: {
        appId: process.env.ALGOLIA_APP_ID,
        // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
        // Tip: use Search API key with GATSBY_ prefix to access the service from within components
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME,
        queries: [
            retrievePages('docs', '/^docs/'),
            retrievePages('manual', '/^manual/'),
            retrievePages('handbook', '/^handbook/'),
            retrievePages('tutorial', '/^tutorials/'),
            retrievePages('blog', '/^blog/'),
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
                    return data.endpoints.nodes.map((endpoint) => {
                        return {
                            ...endpoint,
                            type: 'api',
                        }
                    })
                },
            },
            {
                query: `
                            {
                              questions: allQuestion {
                                nodes {
                                  id
                                  title: subject
                                  replies {
                                    body
                                  }
                                  internal {
                                    contentDigest
                                  }
                                }
                              }
                            }
                        `,
                transformer: ({ data }) => {
                    return data.questions.nodes.map(({ replies, ...question }) => {
                        return {
                            ...question,
                            excerpt: replies?.[0]?.body,
                            type: 'question',
                        }
                    })
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
