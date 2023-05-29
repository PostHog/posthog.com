import { GatsbyNode } from 'gatsby'
import { buildGatsbyImageDataObject } from '@imgix/gatsby/dist/pluginHelpers'
import path from 'path'
import sizeOf from 'image-size'
import { generateImageData } from 'gatsby-plugin-image'
import mime from 'mime'
import fs from 'fs'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions, schema }) => {
    const diff = await fetch(
        `https://api.github.com/repos/posthog/posthog.com/compare/master...${
            process.env.VERCEL_GIT_COMMIT_REF || 'master'
        }`
    ).then((res) => res.json())

    const generateImgixGatsbyImageData = (imagePath, args) => {
        const branch = diff.files.some(({ file }) => imagePath === file)
            ? process.env.VERCEL_GIT_COMMIT_REF || 'master'
            : 'master'
        console.log(branch, imagePath)
        const imageURL = `https://raw.githubusercontent.com/PostHog/posthog.com/${branch}/${imagePath}`
        const dimensions = sizeOf(imagePath)
        const { width, height } = args
        return {
            gatsbyImageData: buildGatsbyImageDataObject({
                url: imageURL,
                imgixClientOptions: {
                    domain: process.env.IMIGIX_URL,
                    secureURLToken: process.env.IMGIX_TOKEN,
                },
                resolverArgs: {
                    breakpoints: [750, 1080, 1366, 1920],
                    layout: 'fullWidth',
                    ...(width ? { width } : null),
                    ...(height ? { height } : null),
                },
                dimensions: { width: dimensions.width, height: dimensions.height },
            }),
            url: imageURL,
        }
    }

    const generateStaticGatsbyImageData = (imagePath) => {
        const dimensions = sizeOf(imagePath)
        const { width, height } = dimensions
        const filename = imagePath.replaceAll('/', '-')
        const publicPath = path.join(process.cwd(), `public`, `static`, filename)
        fs.copyFileSync(imagePath, publicPath)
        const src = `/static/${filename}`
        const sourceMetadata = {
            width,
            height,
            format: mime.getType(imagePath)?.split('/')[1],
        }
        const imageDataArgs = {
            pluginName: `gatsby-source-local-images`,
            sourceMetadata,
            filename,
            generateImageSource: () => ({ src, width, height, format: 'auto' }),
        }
        return { gatsbyImageData: generateImageData(imageDataArgs), url: src }
    }

    const { createTypes } = actions
    createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
      avatar: File @link(from: "avatar___NODE")
      teamMember: Mdx
      name: String
      childMdx: Mdx
      ts: Date
    }
    type MdxFields {
      slug: String
      contributors: [Contributors]
      appConfig: [AppConfig]
    }
    type AshbyJobPostingTableOfContents {
      value: String,
      url: String,
      depth: Int,
    }
    type AshbyJobPostingFields {
      tableOfContents: [AshbyJobPostingTableOfContents]
    }
    type AppConfig {
      key: String
      name: String
      required: Boolean
      type: String
      hint: String
      description: String
    }
    type Contributors {
      avatar: File @link(from: "avatar___NODE")
      url: String
      username: String
      teamData: TeamData
    }
    type Frontmatter {
      authorData: [AuthorsJson] @link(by: "handle", from: "author")
      badge: String
    }
    type TeamData {
      name: String
      jobTitle: String
    }
    type SidebarsJson implements Node {
      docs: [SidebarNav]
      handbook: [SidebarNav]
    }
    type SidebarNav {
      children: [SidebarNav]
      name: String
      url: String
    }
    type Plugin implements Node {
      name: String,
      url: String,
      description: String,
      verified: Boolean,
      maintainer: String,
      displayOnWebsiteLib: Boolean,
      type: String
      markdown: File @link(from: "markdown___NODE")
      logo: File @link(from: "logo___NODE")
      slug: String
    }
    type NavsJsonMainSubItemsSectionsItems implements Node {
      icon: String,
      title: String,
      url: String,
      badge: String
    }
    type ApiEndpoint implements Node {
      id: String,
      name: String,
      url: String,
      items: String,
    }
    type ApiComponents implements Node {
      id: String,
      components: String,
    }
    type Integration implements Node {
      url: String,
      name: String,
      description: String,
      verified: Boolean,
      maintainer: String,
      imageUrl: String,
    }
    type Plugin implements Node {
      name: String,
      url: String,
      description: String,
      verified: Boolean,
      maintainer: String,
      displayOnWebsiteLib: Boolean
      type: String,
      markdown: File,
      logo: File,
      slug: String,
      imageLink: String,
    }
    type AshbyJobTableOfContents {
      value: String,
      url: String,
      depth: Int
    }
    type AshbyJobPostingFields {
      title: String,
      slug: String,
      tableOfContents: [AshbyJobTableOfContents],
      html: String,
      title: String,
      slug: String
    }
    type AshbyJobPostingFormDefFieldsSectionsFieldsField {
      type: String,
      title: String,
      isNullable: Boolean,
      path: String
      selectableValues: [AshbyJobPostingSelectableValue!]
    }
    type AshbyJobPostingSelectableValue {
      label: String!
      value: String!
    }
    type AshbyJobPostingFormDefFieldsSectionsFields {
      descriptionPlain: String,
      isRequired: Boolean,
      field: AshbyJobPostingFormDefFieldsSectionsFieldsField
    }
    type AshbyJobPostingFormDefFieldsSections {
      fields: [AshbyJobPostingFormDefFieldsSectionsFields]
    }
    type AshbyJobPostingFormDef {
      sections: [AshbyJobPostingFormDefFieldsSections]
    }
    type AshbyJobPostingInfo {
      descriptionHtml: String,
      applicationFormDefinition: AshbyJobPostingFormDef
    }
    type AshbyJobPosting implements Node {
      fields: AshbyJobPostingFields
      externalLink: String,
      departmentName: String,
      isListed: Boolean,
      publishedDate: Date,
      title: String,
      locationName: String,
      info: AshbyJobPostingInfo,
      parent: AshbyJob,
    }
    type AshbyJobCustomFields {
      value: String,
      title: String,
    }
    type AshbyJob implements Node {
      customFields: [AshbyJobCustomFields],
    }
    type GitHubUser  {
      username: String,
      avatar: String,
      url: String
    }
    type PostHogIssue implements Node {
      user: GitHubUser
      url: String
      title: String
      number: Int
      comments: Int
    }
    type PostHogPull implements Node {
      user: GitHubUser
      url: String
      title: String
      number: Int
    }
  `)

    const getImageData = async (source, context, field) => {
        try {
            const { relativePath, absolutePath } = await context.nodeModel.findRootNodeAncestor(source)
            const relativeImagePath = source[field]
            return {
                relativeFilePath: relativePath,
                relativeImagePath,
                absoluteImagePath: path.join(path.dirname(absolutePath), relativeImagePath),
            }
        } catch (err) {
            return null
        }
    }

    const imageFields = ['featuredImage', 'headshot', 'thumbnail', 'logo', 'ogImage']
    const frontmatterFields = schema.buildObjectType({
        name: 'Frontmatter',
        interfaces: ['Node'],
        fields: {
            ...Object.fromEntries(
                imageFields.map((field) => [
                    field,
                    {
                        type: 'ImgixAsset',
                        resolve: (source, _args, context) => getImageData(source, context, field),
                    },
                ])
            ),
            images: {
                type: '[ImgixAsset]',
                resolve: async (source, _args, context) => {
                    try {
                        const { relativePath, absolutePath } = await context.nodeModel.findRootNodeAncestor(source)
                        const relativeImagePaths = source.images
                        return relativeImagePaths.map((relativeImagePath) => ({
                            relativeFilePath: relativePath,
                            relativeImagePath,
                            absoluteImagePath: path.join(path.dirname(absolutePath), relativeImagePath),
                        }))
                    } catch (err) {
                        return null
                    }
                },
            },
        },
    })
    const imgixAsset = schema.buildObjectType({
        name: 'ImgixAsset',
        fields: {
            absolutePath: {
                type: 'String',
                resolve: async (source) => source?.absoluteImagePath,
            },
            publicURL: {
                type: 'String',
                resolve: async (source, args) => {
                    try {
                        const { relativeFilePath, relativeImagePath } = source
                        if (!relativeFilePath || !relativeImagePath) return null
                        const imagePath = `contents/${path.join(path.dirname(relativeFilePath), relativeImagePath)}`
                        if (process.env.NODE_ENV?.toLowerCase() === 'development') {
                            return generateStaticGatsbyImageData(imagePath).url
                        } else {
                            return generateImgixGatsbyImageData(imagePath, args).url
                        }
                    } catch (err) {
                        return null
                    }
                },
            },
            gatsbyImageData: {
                type: 'GatsbyImageData',
                args: {
                    width: 'Int',
                    height: 'Int',
                },
                resolve: async (source, args) => {
                    try {
                        const { relativeFilePath, relativeImagePath } = source
                        if (!relativeFilePath || !relativeImagePath) return null
                        const imagePath = `contents/${path.join(path.dirname(relativeFilePath), relativeImagePath)}`
                        if (process.env.NODE_ENV?.toLowerCase() === 'development') {
                            return generateStaticGatsbyImageData(imagePath).gatsbyImageData
                        } else {
                            return generateImgixGatsbyImageData(imagePath, args).gatsbyImageData
                        }
                    } catch (err) {
                        return null
                    }
                },
            },
        },
    })
    createTypes([
        schema.buildObjectType({
            name: 'Mdx',
            interfaces: ['Node'],
            fields: {
                isFuture: {
                    type: 'Boolean!',
                    resolve: (source) => new Date(source.frontmatter.date) > new Date(),
                },
            },
        }),
        imgixAsset,
        frontmatterFields,
        schema.buildObjectType({
            name: 'MdxFrontmatterProductHero',
            interfaces: ['Node'],
            fields: {
                image: {
                    type: 'ImgixAsset',
                    resolve: (source, _args, context) => getImageData(source, context, 'image'),
                },
            },
        }),
        schema.buildObjectType({
            name: 'MdxFrontmatterProductMainCTA',
            interfaces: ['Node'],
            fields: {
                image: {
                    type: 'ImgixAsset',
                    resolve: (source, _args, context) => getImageData(source, context, 'image'),
                },
            },
        }),
        schema.buildObjectType({
            name: 'MdxFrontmatterProductTestimonial',
            interfaces: ['Node'],
            fields: {
                image: {
                    type: 'ImgixAsset',
                    resolve: (source, _args, context) => getImageData(source, context, 'image'),
                },
            },
        }),
        schema.buildObjectType({
            name: 'MdxFrontmatterProductSections',
            interfaces: ['Node'],
            fields: {
                image: {
                    type: 'ImgixAsset',
                    resolve: (source, _args, context) => getImageData(source, context, 'image'),
                },
            },
        }),
    ])
}
