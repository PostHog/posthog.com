const fetch = require(`node-fetch`)
const algoliaConfig = require('./gatsby/algoliaConfig')
const qs = require('qs')
const fs = require('fs')
const path = require('path')

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
})

// External docs sources - configure multiple repos that can contribute docs
// Each source defines where to find docs AND how to map paths to the site
const externalDocsSources = [
    {
        name: 'posthog-monorepo',
        // GitHub source configuration
        github: {
            repo: 'PostHog/posthog',
            path: 'docs/published', // Only clone published docs
        },
        // Local path where docs are cloned to
        path: process.env.POSTHOG_REPO_PATH
            ? `${process.env.POSTHOG_REPO_PATH}/docs/published`
            : path.join(process.cwd(), '.posthog-monorepo-cache'),
        // Path mapping: /foo.md → /handbook/engineering/foo
        pathTransform: (slug) => `/handbook/engineering${slug}`,
        // Optional: ref/branch being used (for logging/override)
        // Note: clone script uses POSTHOG_MONOREPO_REF (generated from name)
        ref: process.env.POSTHOG_MONOREPO_REF,
    },
    // Future sources can be added here, e.g.:
    // {
    //     name: 'posthog-cloud-docs',
    //     github: {
    //         repo: 'PostHog/posthog-cloud',
    //         path: 'docs',
    //     },
    //     path: path.join(process.cwd(), '.cloud-docs-cache'),
    //     pathTransform: (slug) => `/docs/cloud${slug}`,
    //     ref: process.env.CLOUD_DOCS_REF,
    // },
]

// Export for use in createPages.ts
module.exports.externalDocsSources = externalDocsSources

// Build gatsby-source-filesystem plugins for each available source
const externalDocsPlugins = externalDocsSources
    .map((source) => {
        const pathExists = fs.existsSync(source.path)
        console.log(`🔍 External docs source: ${source.name}`, {
            path: source.path,
            pathExists,
            ref: source.ref || 'not set',
            willActivate: pathExists,
        })

        return pathExists
            ? {
                  resolve: `gatsby-source-filesystem`,
                  options: {
                      name: source.name,
                      path: source.path,
                      ignore: [`**/*.{png,jpg,jpeg,gif,svg,webp,mp4,avi,mov}`],
                  },
              }
            : null
    })
    .filter(Boolean)

const getQuestionPages = async (base) => {
    const fetchQuestions = async (page) => {
        const questionQuery = qs.stringify({
            populate: '*',
            pagination: {
                page,
                pageSize: 100,
            },
        })

        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions?${questionQuery}`)

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}, Text: ${await response.text()}`)
                }

                return response.json()
            } catch (error) {
                if (attempt === 3) {
                    console.error(`Failed to fetch questions after 3 attempts: ${error.message}`)
                    throw error
                }
                console.log(`Attempt ${attempt} failed: ${error.message}. Retrying...`)
                // Simple delay between retries (1 second)
                await new Promise((resolve) => setTimeout(resolve, 1000))
            }
        }
    }

    const initialResponse = await fetchQuestions(1)
    const totalPages = initialResponse.meta.pagination.pageCount

    const allResponses = await Promise.all(Array.from({ length: totalPages }, (_, i) => fetchQuestions(i + 1)))

    const questions = allResponses.flatMap((response) =>
        response.data.map((question) => ({ path: `${base}/questions/${question.attributes.permalink}` }))
    )

    return questions
}

module.exports = {
    flags: {
        DEV_SSR: false,
    },
    siteMetadata: {
        title: 'PostHog',
        titleTemplate: '%s',
        description:
            'The single platform for engineers to analyze, test, observe, and deploy new features. Product analytics, session replay, feature flags, experiments, CDP, and more.',
        url: 'https://posthog.com', // No trailing slash allowed!
        image: '/images/og/default.png', // Path to your image you placed in the 'static' folder
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
            resolve: `gatsby-mapbox-locations`,
            options: {
                mapboxToken: process.env.MAPBOX_TOKEN,
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
        `gatsby-plugin-smoothscroll`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `contents`,
                path: `${__dirname}/contents`,
                ignore: [`**/*.{png,jpg,jpeg,gif,svg,webp,mp4,avi,mov}`],
            },
        },
        {
            resolve: 'gatsby-plugin-mdx',
            options: {
                shouldBlockNodeFromTransformation: (node) =>
                    node.internal.type === 'File' &&
                    node.url &&
                    new URL(node.url).hostname === 'raw.githubusercontent.com',
                extensions: ['.mdx', '.md'],
                gatsbyRemarkPlugins: [
                    { resolve: 'gatsby-remark-autolink-headers', options: { icon: false } },
                    {
                        resolve: require.resolve('./plugins/gatsby-remark-video'),
                    },
                ],
            },
        },
        `gatsby-transformer-json`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `menuItems`,
                path: `${__dirname}/src/menuItems`,
                ignore: [`**/*.{png,jpg,jpeg,gif,svg,webp,mp4,avi,mov}`],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `navs`,
                path: `${__dirname}/src/navs`,
                ignore: [`**/*.{png,jpg,jpeg,gif,svg,webp,mp4,avi,mov}`],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `authors`,
                path: `${__dirname}/src/data/authors.json`,
                ignore: [`**/*.{png,jpg,jpeg,gif,svg,webp,mp4,avi,mov}`],
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `testimonials`,
                path: `${__dirname}/src/data/testimonials.json`,
                ignore: [`**/*.{png,jpg,jpeg,gif,svg,webp,mp4,avi,mov}`],
            },
        },
        // External docs plugins - dynamically added based on available sources
        ...externalDocsPlugins,
        {
            resolve: `gatsby-source-strapi-pages`,
            options: {
                strapiURL: process.env.STRAPI_URL,
                strapiKey: process.env.STRAPI_API_KEY,
            },
        },
        `gatsby-plugin-image`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'PostHog | How developers build successful products',
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

                    const questionPages = await getQuestionPages(site.siteMetadata.siteUrl)

                    return [...transformedPages, ...questionPages, ...plugins]
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
        {
            resolve: require.resolve(`./plugins/gatsby-transformer-cloudinary`),
            options: {
                transformTypes: [
                    `RoadmapMedia`,
                    `SqueakTeamCrest`,
                    `SqueakTeamMiniCrest`,
                    `SqueakRoadmapMedia`,
                    `SqueakTeamTeamImage`,
                    `MdxFrontmatterFeaturedImageChildImageSharp`,
                    `MdxFrontmatterThumbnailChildImageSharp`,
                    `MdxFrontmatterImagesChildImageSharp`,
                    `MdxFrontmatterLogoChildImageSharp`,
                    `MdxFrontmatterLogoDarkChildImageSharp`,
                    `MdxFrontmatterIconChildImageSharp`,
                ],
            },
        },
        // {
        //     resolve: 'gatsby-plugin-no-sourcemaps',
        // },
        ...(!process.env.GATSBY_ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY || !process.env.GATSBY_ALGOLIA_INDEX_NAME
            ? []
            : [algoliaConfig]),
    ].filter(Boolean), // Remove null plugins (e.g., monorepo docs if not available)
}
