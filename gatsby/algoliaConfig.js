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

if (!process.env.GATSBY_ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY || !process.env.GATSBY_ALGOLIA_INDEX_NAME) {
    console.warn('No Algolia keys present in environment, skipping sending information to algolia')
}

console.log(process.env.GATSBY_ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY, process.env.GATSBY_ALGOLIA_INDEX_NAME)

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
                              questions: allQuestion {
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
