const fetch = require('node-fetch')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const files = {}
const frontmatterImages = ['featuredImage', 'headshot', 'icon', 'logo', 'thumbnail']
const simpleGit = require('simple-git')
const git = simpleGit()
const fs = require('fs')
const path = require('path')
const mime = require('mime')
const sizeOf = require('image-size')

const generateImageNode = ({ publicURL, srcSet, mime, width = 0, height = 0 }) => {
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
    return data
}

exports.onPreInit = async function (_, options) {
    const { strapiURL, strapiKey } = options
    if (!strapiURL || !strapiKey) return
    if (process.env.VERCEL_ENV === 'production') {
        const diff = await git.diffSummary(['HEAD', 'HEAD~1'])
        let filesUpdated = 0
        if (diff?.files?.length > 0) {
            for (const { file } of diff.files) {
                const regex = new RegExp('.md$|.mdx$')
                if (regex.test(file)) {
                    const res = await fetch(`${strapiURL}/api/github-sync?path=${file}`, {
                        headers: {
                            Authorization: `Bearer ${strapiKey}`,
                        },
                    })
                    if (res.ok) {
                        filesUpdated++
                    }
                }
            }
        }
        if (filesUpdated) {
            console.log(`Updated ${filesUpdated} file(s) in Strapi`)
        }
    }

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
                        if (process.env.VERCEL_ENV !== 'production') {
                            const relativeImagePath = node?.frontmatter[key]
                            if (relativeImagePath) {
                                const filePath = node?.fileAbsolutePath
                                const imagePath = path.resolve(
                                    filePath.substring(0, filePath.lastIndexOf('/')),
                                    relativeImagePath
                                )
                                if (fs.existsSync(imagePath)) {
                                    const mimeType = mime.getType(imagePath)
                                    const publicURL = `data:${mimeType};charset=utf-8;base64,${fs.readFileSync(
                                        imagePath,
                                        {
                                            encoding: 'base64',
                                        }
                                    )}`
                                    const dimensions = sizeOf(imagePath)
                                    const data = generateImageNode({
                                        publicURL,
                                        srcSet: '',
                                        mime: mimeType,
                                        width: dimensions.width,
                                        height: dimensions.height,
                                    })
                                    createNodeField({
                                        node,
                                        name: key,
                                        value: data,
                                    })
                                }
                            }
                        } else {
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
                                const data = generateImageNode({ publicURL, srcSet, width, height, mime })
                                createNodeField({
                                    node,
                                    name: key,
                                    value: data,
                                })
                            }
                        }
                    }
                }
                if (ogImage) {
                    const url = `${strapiURL}${ogImage}`
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
