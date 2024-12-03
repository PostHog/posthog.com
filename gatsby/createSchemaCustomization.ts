import { GatsbyNode } from 'gatsby'

export const createSchemaCustomization: GatsbyNode['createSchemaCustomization'] = async ({ actions, schema }) => {
    const { createTypes } = actions
    createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
      avatar: String
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
      avatar: String
      url: String
      username: String
      teamData: TeamData
      profile: SqueakProfile @link(by: "github", from: "url")
    }
    type FrontmatterSEO {
      metaTitle: String
      metaDescription: String
    }
    type AuthorsJson implements Node {
      profile: SqueakProfile @link(by: "squeakId", from: "profile_id")
    }
    type Frontmatter {
      authorData: [AuthorsJson] @link(by: "handle", from: "author")
      badge: String
      seo: FrontmatterSEO
      hideFromIndex: Boolean
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
      slug: String,
      locations: [String],
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
    type PostTagAttributes {
        label: String
        folder: String
    }
    type PostTagData {
      attributes: PostTagAttributes
    }
    type PostTags {
        data: [PostTagData]
    }
    type PostCategoryAttributes {
        label: String
        folder: String
        post_tags: PostTags
    }
    type PostCategory implements Node {
      attributes: PostCategoryAttributes
    }
    type ProductSectionsSectionsFeatures {
      title: String
      description: String
      icon: String
    }
    type ProductSectionsSections {
      featuresType: String
      features: [ProductSectionsSectionsFeatures]
    }
    type MdxFrontmatterProductSections implements Node {
      sections: [ProductSectionsSections]
    }
    type Roadmap implements Node {
      year: Int
    }
    type ProductDataProductsPlans {
      contact_support: Boolean
      unit_amount_usd: Float
    }
    type SlackEmoji implements Node {
      name: String
      url: String
      localFile: File @link(from: "fields.localFile")
    }
    type G2Review implements Node {
      attributes: G2ReviewAttributes
    }
    type G2ReviewAttributes {
      title: String
      star_rating: Float
      submitted_at: Date
      comment_answers: G2ReviewCommentAnswers
    }
    type G2ReviewCommentAnswers {
      love: G2ReviewCommentAnswer
      hate: G2ReviewCommentAnswer
      benefits: G2ReviewCommentAnswer
    }
    type G2ReviewCommentAnswer {
      value: String
    }
    type CloudinaryImage implements Node {
      folder: String
      secure_url: String
      public_id: String
    }
    type PostHogDestination implements Node {
      mdx: Mdx @link(by: "frontmatter.templateId", from: "destinationId")
    }
  `)
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
    ])

    createTypes(
        `
            type ShopifyCollection implements Node {
              handle: String!
              products: [ShopifyProduct!] @link(by: "shopifyId", from: "products.shopifyId")
            }
            type ShopifySelectedOption {
              name: String!
              value: String!
            }
            type ShopifyProductOption {
              name: String!
              shopifyId: String!
              values: [String!]!
            }
            type ShopifyMetafield implements Node {
              key: String!
              value: String!
            }
            type ShopifyProductVariant implements Node {
              availableForSale: Boolean!
              id: ID!
              media: [ShopifyMedia!]!
              price: Float!
              product: ShopifyProduct!
              sku: String
              shopifyId: String!
              title: String!
              selectedOptions: [ShopifySelectedOption!]!
            }
            type ShopifyImage {
              width: Int
              height: Int
              originalSrc: String

            }
            type ShopifyMediaPreviewImage {
              image: ShopifyImage
            }
            type ShopifyMedia {
              preview: ShopifyMediaPreviewImage
              mediaContentType: String!
            }
            type ShopifyMoneyV2 {
              amount: Float!
            }
            type ShopifyProductPriceRangeV2 {
              maxVariantPrice: ShopifyMoneyV2!
              minVariantPrice: ShopifyMoneyV2!
            }
            type ShopifyFeaturedImage {
              localFile: File
              width: Int
              height: Int
              originalSrc: String
            }
            type ShopifyProduct implements Node {
              descriptionHtml: String
              description: String!
              featuredMedia: ShopifyMedia
              handle: String!
              id: ID!
              priceRangeV2: ShopifyProductPriceRangeV2!
              shopifyId: String!
              status: String!
              title: String!
              variants: [ShopifyProductVariant!]!
              media: [ShopifyMedia!]!
              metafields: [ShopifyMetafield!]!
              options: [ShopifyProductOption!]!
              tags: [String!]!
              totalInventory: Int!
              featuredImage: ShopifyImage @proxy(from: "featuredMedia.preview.image")
              imageProducts: [ShopifyProduct]
            }
          `
    )
}
