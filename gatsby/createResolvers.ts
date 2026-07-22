import { GatsbyNode } from 'gatsby'

export const createResolvers: GatsbyNode['createResolvers'] = ({ createResolvers, getNodeAndSavePathDependency }) => {
    const resolvers = {
        Contributors: {
            teamData: {
                resolve: async (source, args, context, info) => {
                    const data = await context.nodeModel.runQuery({
                        query: {
                            filter: {
                                frontmatter: {
                                    github: { eq: source.username },
                                },
                            },
                        },
                        type: 'Mdx',
                        firstOnly: true,
                    })
                    return {
                        name: data && data.frontmatter && data.frontmatter.name,
                        jobTitle: data && data.frontmatter && data.frontmatter.jobTitle,
                    }
                },
            },
        },
        File: {
            category: {
                type: 'String',
                resolve: async (source) => {
                    const folder = source.relativePath.split('/')[0]
                    const category = (folder.charAt(0).toUpperCase() + folder.slice(1)).replaceAll('-', ' ')
                    return category
                },
            },
        },
        ShopifyProduct: {
            imageProducts: {
                type: ['ShopifyProduct'],
                async resolve(source, args, context, info) {
                    const metafields = source.metafields
                    let productIds = []

                    for (const metafield of metafields) {
                        if (metafield.key === 'image_products') {
                            productIds = productIds.concat(JSON.parse(metafield.value))
                        }
                    }

                    const products = await Promise.all(
                        productIds.map((shopifyId) => {
                            return context.nodeModel.runQuery({
                                query: {
                                    filter: {
                                        shopifyId: {
                                            eq: shopifyId,
                                        },
                                    },
                                },
                                type: 'ShopifyProduct',
                                firstOnly: true,
                            })
                        })
                    )

                    // Referenced products may have been deleted or unpublished, in which case
                    // runQuery returns null. Filter those out so `imageProducts` never contains null.
                    return products.filter(Boolean)
                },
            },
        },
    }
    createResolvers(resolvers)
}
