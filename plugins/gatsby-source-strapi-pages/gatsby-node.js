const fetch = require('node-fetch')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const files = {}

exports.onPreInit = async function (_, options) {
    const { strapiURL, strapiKey } = options
    if (!strapiURL || !strapiKey) return
    const createStrapiPageNodes = async (limit = 100, page = 1) => {
        const strapiPages = await fetch(
            `${strapiURL}/api/markdowns?populate=*&pagination[pageSize]=${limit}&pagination[page]=${page}`,
            {
                headers: {
                    Authorization: `Bearer ${strapiKey}`,
                },
            }
        )
            .then((res) => res.json())
            .catch((err) => console.error(err))
        const { data, meta } = strapiPages
        if (data) {
            data.forEach(({ id, attributes }) => {
                const { contributors, lastUpdated, ogImage } = attributes
                files[attributes.path] = { contributors, lastUpdated, ogImage: ogImage?.data?.attributes?.url }
            })
        }
        if (meta?.pagination?.pageCount > page) {
            return await createStrapiPageNodes(limit, page + 1)
        }
    }

    await createStrapiPageNodes()
}

exports.onCreateNode = async function (
    { node, getNode, actions, getCache, cache, store, createNodeId },
    { strapiURL, cdnURL }
) {
    const { createNodeField, createNode } = actions
    //Create GitHub contributor nodes for handbook & docs
    if (node.internal.type === `MarkdownRemark` || node.internal.type === 'Mdx') {
        const parent = getNode(node.parent)
        if (parent.internal.type === 'File') {
            const file = files[`contents/${parent.relativePath}`]
            if (file) {
                const { contributors, lastUpdated, ogImage } = file
                if (ogImage) {
                    const url = `${cdnURL || strapiURL}${ogImage}`
                    const image = await createRemoteFileNode({
                        url,
                        parentNodeId: node.id,
                        createNode,
                        cache,
                        getCache,
                        createNodeId,
                        store,
                    }).catch((err) => console.error(err))
                    if (image) {
                        node.ogImage___NODE = image.id
                    }
                }
                if (contributors) {
                    try {
                        const contributorsNode = await Promise.all(
                            contributors.map(async (contributor) => {
                                const { avatar, url, username } = contributor
                                const fileNode =
                                    avatar &&
                                    (await createRemoteFileNode({
                                        url: avatar,
                                        parentNodeId: node.id,
                                        createNode,
                                        cache,
                                        getCache,
                                        createNodeId,
                                        store,
                                    }).catch((err) => console.error(err)))
                                return {
                                    avatar___NODE: fileNode && fileNode.id,
                                    url,
                                    username,
                                }
                            })
                        )
                        createNodeField({
                            node,
                            name: `contributors`,
                            value: contributorsNode,
                        })
                    } catch (error) {
                        console.error(error)
                    }
                }

                createNodeField({
                    node: parent,
                    name: 'gitLogLatestDate',
                    value: lastUpdated || new Date(),
                })
            } else {
                createNodeField({
                    node: parent,
                    name: 'gitLogLatestDate',
                    value: new Date(),
                })
            }
        }
    }
}
