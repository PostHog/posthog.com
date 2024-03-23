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
                resolve(source, args, context, info) {
                    const metafieldNodesIds = source.metafields___NODE
                    let productIds = []

                    for (const metafieldNodeId of metafieldNodesIds) {
                        const metafieldNode = context.nodeModel.getNodeById({
                            id: metafieldNodeId,
                        })

                        if (metafieldNode.key === 'image_products') {
                            productIds = productIds.concat(JSON.parse(metafieldNode.value))
                        }
                    }

                    return productIds.map((shopifyId) => {
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
                },
            },
        },
    }
    createResolvers(resolvers)
}
