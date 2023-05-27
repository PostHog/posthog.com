import { GatsbyNode } from 'gatsby'
import { buildGatsbyImageDataObject } from '@imgix/gatsby/dist/pluginHelpers'
import path from 'path'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions, schema }) => {
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

    const imageFields = ['featuredImage']
    const frontmatterFields = schema.buildObjectType({
        name: 'Frontmatter',
        interfaces: ['Node'],
        fields: Object.fromEntries(imageFields.map((field) => [field, { type: 'ImgixAsset' }])),
    })
    const imageTypes = imageFields.map((field) => {
        return schema.buildObjectType({
            name: 'ImgixAsset',
            interfaces: ['Node'],
            fields: {
                publicURL: {
                    type: 'String',
                    resolve: async (source, _args, context, _info) => {
                        const relativeImagePath = source[field]
                        const { relativePath } = await context.nodeModel.findRootNodeAncestor(source)
                        const imagePath = `https://raw.githubusercontent.com/PostHog/posthog.com/master/contents/${path.join(
                            path.dirname(relativePath),
                            relativeImagePath
                        )}`
                        return `https://${process.env.IMIGIX_URL}/${imagePath}?s=${process.env.IMGIX_TOKEN}`
                    },
                },
                gatsbyImageData: {
                    type: 'GatsbyImageData',
                    resolve: async (source, _args, context, _info) => {
                        const relativeImagePath = source[field]
                        const { relativePath } = await context.nodeModel.findRootNodeAncestor(source)
                        const imagePath = `https://raw.githubusercontent.com/PostHog/posthog.com/master/contents/${path.join(
                            path.dirname(relativePath),
                            relativeImagePath
                        )}`
                        return buildGatsbyImageDataObject({
                            // Image url, required. See note in section 'Note about url and imgixClientOptions' about what to do based on what kind of url this is
                            url: imagePath,
                            // Any extra configuration to pass to new ImgixClient from @imgix/js-core (see [here](https://github.com/imgix/js-core#configuration) for more information)
                            imgixClientOptions: {
                                domain: process.env.IMIGIX_URL,
                                secureURLToken: process.env.IMGIX_TOKEN,
                            },
                            // Mimicking GraphQL field args
                            resolverArgs: {
                                // The gatsby-plugin-image layout parameter
                                layout: 'fullWidth',
                                // Imgix params, optional
                                imgixParams: {},
                                // Imgix params for the placeholder image, optional
                                placeholderImgixParams: {},
                                // The width or max-width (depending on the layout setting) of the image in px, optional.
                                width: 100,
                                // The height or max-height (depending on the layout setting) of the image in px, optional.
                                height: 200,
                                // The aspect ratio of the srcsets to generate, optional
                                aspectRatio: 2,
                                // Custom srcset breakpoints to use, optional
                                breakpoints: [100, 200],
                                // Custom 'sizes' attribute to set, optional
                                sizes: '100vw',
                                // Custom srcset max width, optional
                                srcSetMaxWidth: 8000,
                                // Custom srcset min width, optional
                                srcSetMinWidth: 100,
                                // The factor used to scale the srcsets up, optional.
                                // E.g. if srcsetMinWidth is 100, then the srcsets are generated as follows
                                // while (width < maxWidth) nextSrcSet = prevSrcSet * (1 + widthTolerance)
                                widthTolerance: 0.08,
                            },
                            // source width and of the uncropped image
                            dimensions: { width: 5000, height: 3000 },
                        })
                    },
                },
            },
        })
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
        ...imageTypes,
        frontmatterFields,
    ])
}
