import { GatsbyNode } from 'gatsby'
import { buildGatsbyImageDataObject } from '@imgix/gatsby/dist/pluginHelpers'
import path from 'path'
import fs from 'fs'
import mime from 'mime'
import sizeOf from 'image-size'
import { GatsbyImageProps, IGetImageDataArgs, ImageDataLike } from 'gatsby-plugin-image'
import { randomUUID } from 'crypto'

function getImageData(...args) {
    const fieldName = args[4]
    const { frontmatter, fileAbsolutePath } = args[0]
    const field = frontmatter && frontmatter[fieldName]
    if (field && fileAbsolutePath) {
        const imagePath = path.resolve(
            path.join(fileAbsolutePath.substring(0, fileAbsolutePath.lastIndexOf('/'))),
            field
        )

        if (fs.existsSync(imagePath)) {
            const { width, height } = sizeOf(imagePath) ?? {}
            let data

            if (process.env.IMGIX_DOMAIN && process.env.IMGIX_TOKEN && process.env.VERCEL_GIT_COMMIT_REF) {
                // create imgix image
                const gitHubURL = `https://raw.githubusercontent.com/PostHog/posthog.com/${
                    process.env.VERCEL_GIT_COMMIT_REF
                }/contents/${imagePath.split('contents/')[1]}`
                const gatsbyImageData = buildGatsbyImageDataObject({
                    url: gitHubURL,
                    imgixClientOptions: {
                        domain: process.env.IMGIX_DOMAIN,
                        secureURLToken: process.env.IMGIX_TOKEN,
                    },
                    resolverArgs: {
                        layout: 'constrained',
                        imgixParams: {},
                        placeholderImgixParams: {},
                    },
                    dimensions: { width: width ?? 0, height: height ?? 0 },
                })
                return gatsbyImageData
            } else {
                // create local image
                const imageName = imagePath.replaceAll('/', '-') + path.basename(imagePath)
                const publicPath = path.join(process.cwd(), `public`, `static`, imageName)
                fs.copyFileSync(imagePath, publicPath)
                const publicURL = `/static/${imageName}`
                const mimeType = mime.getType(imagePath)
                data = generateImageNode({
                    publicURL,
                    srcSet: '',
                    mime: mimeType,
                    width: width,
                    height: height,
                })
            }
            return data
        }
    }
}

const generateImageNode = ({ publicURL, srcSet, mime, width = 0, height = 0 }): ImageDataLike => {
    const data = {
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

export const createResolvers: GatsbyNode['createResolvers'] = ({ createResolvers }) => {
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
        Reply: {
            teamMember: {
                type: `Mdx`,
                resolve: async (source, args, context, info) => {
                    const team = context.nodeModel.runQuery({
                        type: `Mdx`,
                        query: {
                            filter: {
                                frontmatter: { name: { eq: source?.fullName } },
                                fields: { slug: { regex: '/^/team/' } },
                            },
                        },
                        firstOnly: true,
                    })
                    const teamMember = await team
                    return teamMember
                },
            },
        },
        Mdx: {
            featuredImageImgix: {
                type: 'GatsbyImageData',
                resolve: (...args) => getImageData(...args, 'featuredImage'),
            },
            headshotImgix: {
                type: 'GatsbyImageData',
                resolve: (...args) => getImageData(...args, 'headshot'),
            },
            iconImgix: {
                type: 'GatsbyImageData',
                resolve: (...args) => getImageData(...args, 'icon'),
            },
            logoImgix: {
                type: 'GatsbyImageData',
                resolve: (...args) => getImageData(...args, 'logo'),
            },
            thumbnailImgix: {
                type: 'GatsbyImageData',
                resolve: (...args) => getImageData(...args, 'thumbnail'),
            },
        },
    }
    createResolvers(resolvers)
}
