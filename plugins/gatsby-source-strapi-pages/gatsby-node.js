const fetch = require('node-fetch')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const files = {}
const frontmatterImages = ['featuredImage', 'headshot', 'icon', 'logo', 'thumbnail']

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
                const { ogImage, ...other } = attributes
                files[attributes.path] = {
                    ogImage: ogImage?.data?.attributes?.url,
                    ...other,
                }
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
    { strapiURL }
) {
    const { createNodeField, createNode } = actions
    //Create GitHub contributor nodes for handbook & docs
    if (node.internal.type === `MarkdownRemark` || node.internal.type === 'Mdx') {
        const parent = getNode(node.parent)
        if (parent.internal.type === 'File') {
            const file = files[`contents/${parent.relativePath}`]
            if (file) {
                const { contributors, lastUpdated, ogImage, frontmatter, ...other } = file
                if (frontmatter) {
                    createNodeField({
                        node,
                        name: `frontmatter`,
                        value: frontmatter,
                    })
                    for (const key of frontmatterImages) {
                        if (other[key]?.data) {
                            const {
                                attributes: { url, formats, width, height, mime },
                            } = other[key]?.data
                            const publicURL = `${strapiURL}${url}`
                            const srcSet = formats
                                ? Object.keys(formats)
                                      .map((format) => {
                                          if (formats[format]) {
                                              const { url, width } = formats[format]
                                              return `${strapiURL + url} ${width}w`
                                          } else {
                                              return ''
                                          }
                                      })
                                      .join(',\n')
                                : ''
                            const data = {
                                publicURL,
                                layout: 'constrained',
                                width,
                                height,
                                images: {
                                    fallback: {
                                        src: publicURL,
                                        srcSet,
                                        sizes: '(min-width: 1000px) 1000px, 100vw',
                                    },
                                    sources: [
                                        {
                                            type: mime,
                                            srcSet,
                                            sizes: '(min-width: 1000px) 1000px, 100vw',
                                        },
                                    ],
                                },
                            }
                            createNodeField({
                                node,
                                name: key,
                                value: data,
                            })
                        }
                    }
                }
                if (ogImage) {
                    const url = `${strapiURL}${ogImage}`
                    const image = await createRemoteFileNode({
                        url,
                        parentNodeId: node.id,
                        createNode,
                        createNodeId,
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

                                return {
                                    avatar,
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
