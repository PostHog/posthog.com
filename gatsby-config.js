const fetch = require(`node-fetch`)
const algoliaConfig = require('./gatsby/algoliaConfig')

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
    siteMetadata: {
        title: 'PostHog',
        titleTemplate: '%s',
        description:
            'Open-source product analytics built for developers. Automate the collection of every event on your website or app, without sending data to third-parties. Quickly deploy on your own infrastructure, with full access to the underlying data.',
        url: 'https://posthog.com', // No trailing slash allowed!
        image: '/banner.png', // Path to your image you placed in the 'static' folder
        twitterUsername: '@PostHog',
        siteUrl: 'https://posthog.com', // required by gatsby-plugin-sitemap
    },
    trailingSlash: 'never',
    plugins: [
        {
            resolve: `gatsby-source-ashby`,
            options: {
                apiKey: process.env.ASHBY_API_KEY,
            },
        },
        {
            resolve: `gatsby-source-squeak`,
            options: {
                apiHost: process.env.GATSBY_SQUEAK_API_HOST,
            },
        },
        {
            resolve: 'gatsby-plugin-mailchimp',
            options: {
                endpoint:
                    'https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&amp;id=97194afa0a',
            },
        },
        {
            resolve: 'gatsby-plugin-breakpoints',
            options: {
                queries: {
                    xs: '(max-width: 390px)',
                    sm: '(max-width: 767px)',
                    md: '(max-width: 1023px)',
                    lg: '(max-width: 1279px)',
                    xl: '(max-width: 1535px)',
                    '2xl': '(max-width: 2560px)',
                },
            },
        },
        'gatsby-plugin-react-helmet',
        `gatsby-plugin-sass`,
        `gatsby-plugin-smoothscroll`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `contents`,
                path: `${__dirname}/contents`,
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                shouldBlockNodeFromTransformation: (node) =>
                    node.internal.type === 'File' &&
                    node.url &&
                    node.url.includes('https://raw.githubusercontent.com/'),
                extensions: ['.mdx', '.md'],
                gatsbyRemarkPlugins: [
                    `gatsby-remark-static-images`,
                    { resolve: 'gatsby-remark-autolink-headers', options: { icon: false } },
                    {
                        resolve: require.resolve(`./plugins/gatsby-remark-mermaid`),
                    },
                    {
                        resolve: require.resolve('./plugins/gatsby-remark-video'),
                    },
                ],
                plugins: [`gatsby-remark-static-images`],
            },
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `menuItems`,
                path: `${__dirname}/src/menuItems`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `navs`,
                path: `${__dirname}/src/navs`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `authors`,
                path: `${__dirname}/src/data/authors.json`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `testimonials`,
                path: `${__dirname}/src/data/testimonials.json`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `authorImages`,
                path: `${__dirname}/static/images/authors`,
            },
        },
        {
            resolve: `gatsby-source-strapi-pages`,
            options: {
                strapiURL: process.env.STRAPI_URL,
                strapiKey: process.env.STRAPI_API_KEY,
            },
        },
        `gatsby-plugin-image`,
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'PostHog - The open source Product OS',
                short_name: 'starter',
                start_url: '/',
                background_color: '#E5E7E0',
                theme_color: '#E5E7E0',
                display: 'minimal-ui',
                icon: 'src/images/posthog-icon-white.svg', // This path is relative to the root of the site.
            },
        },
        `gatsby-plugin-postcss`,
        {
            resolve: `gatsby-plugin-sitemap`,
            options: {
                excludes: [],
                createLinkInHead: true,
                query: `
                {
                  site {
                    siteMetadata {
                        siteUrl
                    }
                  }
                  allSitePage {
                    nodes {
                      path
                    }
                  }
                }`,
                resolveSiteUrl: ({ site }) => {
                    return site.siteMetadata.siteUrl
                },
                resolvePages: async ({ allSitePage: { nodes: allPages }, site }) => {
                    const transformedPages = allPages.map(({ path }) => {
                        return {
                            path: `${site.siteMetadata.siteUrl}${path}`,
                        }
                    })

                    let plugins = []
                    try {
                        const pluginsResponse = await fetch(
                            'https://raw.githubusercontent.com/PostHog/plugin-repository/main/repository.json'
                        )
                        plugins = await pluginsResponse.json()
                    } catch (e) {
                        console.log(e)
                    }

                    plugins = plugins.map((plugin) => ({
                        path: `${site.siteMetadata.siteUrl}/plugins/` + plugin.name.toLowerCase().replace(/ /g, '-'),
                    }))

                    return [...transformedPages, ...plugins]
                },
                serialize: async ({ path }) => {
                    let changefreq = 'monthly'
                    let priority = 0.7

                    if (path === '/') {
                        priority = 1.0
                        changefreq = 'monthly'
                    } else if (path.includes('blog')) {
                        if (path === '/blog') {
                            changefreq = 'weekly'
                        } else {
                            changefreq = 'yearly'
                        }
                    } else if (path.includes('product')) {
                        priority = 0.8
                    } else if (path.includes('docs')) {
                        priority = 0.9
                    } else if (path.includes('handbook')) {
                        priority = 0.6
                    } else if (path.includes('pricing')) {
                        priority = 0.8
                    } else if (path.includes('plugins')) {
                        priority = 0.8
                        changefreq = 'daily'
                    }

                    return {
                        url: path,
                        changefreq: changefreq,
                        priority: priority,
                    }
                },
            },
        },
        {
            resolve: `gatsby-plugin-react-svg`,
            options: {
                rule: {
                    include: /svgs/,
                },
            },
        },
        {
            resolve: `gatsby-plugin-feed`,
            options: {
                setup: (options) => ({
                    ...options,
                    custom_namespaces: {
                        blog: 'https://posthog.com/blog',
                    },
                }),
                query: `
                {
                  site {
                    siteMetadata {
                      title
                      description
                      siteUrl
                    }
                  }
                }
              `,
                feeds: [
                    {
                        serialize: ({ query: { site, allMdx } }) => {
                            let {
                                siteMetadata: { siteUrl },
                            } = site

                            let allMdxs = allMdx.edges.map((edge) => {
                                let { node } = edge
                                let { frontmatter, excerpt, slug, id, html } = node
                                let { date, title, authors, featuredImage } = frontmatter
                                return {
                                    description: excerpt,
                                    date,
                                    title,
                                    url: `${siteUrl}/${slug}`,
                                    guid: id,
                                    author: authors && authors[0].name,
                                    custom_elements: [
                                        {
                                            'content:encoded': {
                                                _cdata: html,
                                            },
                                        },
                                    ],
                                    enclosure: {
                                        url: featuredImage ? `${siteUrl}${featuredImage.publicURL}` : null,
                                    },
                                }
                            })

                            return allMdxs
                        },
                        query: `
                        {
                            allMdx(
                              sort: { order: DESC, fields: [frontmatter___date] }
                              filter: { frontmatter: { rootPage: { eq: "/blog" } } }
                            ) {
                              edges {
                                node {
                                  id
                                  slug
                                  html
                                  excerpt(pruneLength: 150)
                                  frontmatter {
                                    date(formatString: "MMMM DD, YYYY")
                                    title
                                    featuredImage {
                                      publicURL
                                    }
                                    authors: authorData {
                                        handle
                                        name
                                        role
                                        link_type
                                        link_url
                                    }
                                  }
                                }
                              }
                            }
                          }
                        `,
                        output: '/rss.xml',
                        title: "PostHog's RSS Feed",
                        // optional configuration to insert feed reference in pages:
                        // if `string` is used, it will be used to create RegExp and then test if pathname of
                        // current page satisfied this regular expression;
                        // if not provided or `undefined`, all pages will have feed reference inserted
                    },
                ],
            },
        },
        ...(!process.env.GATSBY_ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY || !process.env.GATSBY_ALGOLIA_INDEX_NAME
            ? []
            : [algoliaConfig]),
    ],
}
