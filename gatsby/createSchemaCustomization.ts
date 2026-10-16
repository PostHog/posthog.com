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
      commits: [Commit]
      templateConfigs: [TemplateConfig]
    }
    type Commit {
      author: GitHubUser
      date: Date
      message: String
      url: String
    }
    type TemplateConfigField {
      key: String
      type: String
      label: String
      required: Boolean
      description: String
      default: JSON
    }
    type TemplateConfig {
      templateId: String
      name: String
      type: String
      inputs_schema: [TemplateConfigField]
    }
    type GitHubUser {
      avatar_url: String
      html_url: String
      login: String
      type: String
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
    type SqueakMediaAttributes {
      url: String
    }
    type SqueakMediaData {
      attributes: SqueakMediaAttributes
    }
    type SqueakProfileThumbnail {
      url: String
    }
    type SqueakProfileFormats {
      thumbnail: SqueakProfileThumbnail
    }
    type SqueakProfileAvatar {
      url: String
      formats: SqueakProfileFormats
      data: SqueakMediaData
    }
    type SqueakProfileQuote {
      id: ID
      quote: String
    }
    type SqueakTeamDataAttributes {
      id: ID
      name: String
      slug: String
    }
    type SqueakTeamDataItem {
      id: ID
      attributes: SqueakTeamDataAttributes
    }
    type SqueakTeamData {
      id: ID
      data: [SqueakTeamDataItem]
    }
    type SqueakProfile implements Node {
      squeakId: Int
      github: String
      firstName: String
      lastName: String
      companyRole: String
      avatar: SqueakProfileAvatar
      quotes: [SqueakProfileQuote]
      color: String
      biography: String
      country: String
      location: String
      pronouns: String
      pineappleOnPizza: Boolean
      startDate: Date
      teams: SqueakTeamData
      leadTeams: SqueakTeamData
      isTeamLead: Boolean
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
    type FrontmatterFilters {
      type: [String]
      maintainer: String
    }
    type FrontmatterFeatures {
      eventCapture: Boolean
      userIdentification: Boolean
      autoCapture: Boolean
      sessionRecording: Boolean
      featureFlags: Boolean
      groupAnalytics: Boolean
      errorTracking: Boolean
      surveys: Boolean
      llmAnalytics: Boolean
    }
    type Frontmatter {
      authorData: [AuthorsJson] @link(by: "handle", from: "author")
      badge: String
      seo: FrontmatterSEO
      hideFromIndex: Boolean
      price: String
      platformLogo: String
      platformIconName: String
      platformSourceType: String
      featuredImageCaption: String
      description: String
      thumbnail: File @fileByRelativePath
      icon: File @fileByRelativePath
      filters: FrontmatterFilters
      documentation: String
      features: FrontmatterFeatures
      featuredTutorial: Boolean
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
      nextURL: String,
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
    type RoadmapCTA {
      url: String
      label: String
    }
    type SqueakTopicAttributes {
      id: ID
      label: String
      slug: String
    }
    type SqueakTopicData {
      id: ID
      attributes: SqueakTopicAttributes
    }
    type SqueakTopicRelation {
      id: ID
      data: SqueakTopicData
    }
    type Roadmap implements Node {
      strapiID: Int
      squeakId: Int
      date: Date @dateformat
      title: String
      description: String
      complete: Boolean
      type: String
      year: Int
      category: String
      projectedCompletion: Date @dateformat
      dateCompleted: Date @dateformat
      githubPRMetadata: GitHubPRMetadata
      cta: RoadmapCTA
      teams: SqueakTeamData
      topic: SqueakTopicRelation
      features: JSON
    }
    type GitHubPRMetadata {
      url: String
      html_url: String
      review_comments_url: String
      comments_url: String
      commits_url: String
      number: Int
      comments: Int
      review_comments: Int
      commits: Int
      additions: Int
      deletions: Int
      changed_files: Int
      user: GitHubUser
      commenters: [GitHubUser]
      reviewers: [GitHubUser]
      reviews_url: String
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
    type PostHogPipeline implements Node {
      mdx: Mdx @link(by: "frontmatter.templateId", from: "pipelineId")
      introSnippet: String
      installationSnippet: String
      inputs_schema: [PostHogPipelineInputSchema]
      name: String
      slug: String
      type: String
      category: [String]
      description: String
      icon_url: String
      status: String
    }
    type PostHogPipelineInputSchema {
      key: String
      type: String
      label: String
      secret: Boolean
      required: Boolean
      description: String
    }
    type SdkReferences implements Node {
      info: SdkReferencesInfo
      referenceId: String
      hogRef: String
      id: String
      categories: [String]
      classes: [SdkReferencesClass]
      types: [SdkReferencesType]
      version: String
    }
    type SdkReferencesInfo {
      description: String
      id: String
      specUrl: String
      slugPrefix: String
      title: String
      version: String
    }
    type SdkReferencesClass {
      description: String
      functions: [SdkReferencesFunction]
      id: String
      title: String
    }
    type SdkReferencesFunction {
      category: String
      description: String
      details: String
      examples: [SdkReferencesFunctionExample]
      id: String
      params: [SdkReferencesFunctionParam]
      path: String
      releaseTag: String
      showDocs: Boolean
      returnType: SdkReferencesFunctionReturnType
      title: String
    }
    type SdkReferencesFunctionExample {
      code: String
      name: String
      id: String
    }
    type SdkReferencesFunctionParam {
      description: String
      isOptional: Boolean
      name: String
      type: String
    }
    type SdkReferencesFunctionReturnType {
      id: String
      name: String
    }
    type SdkReferencesType {
      example: String
      id: String
      name: String
      path: String
      properties: [SdkReferencesTypeProperty]
    }
    type SdkReferencesTypeProperty {
      description: String
      name: String
      type: String
    }
    type GitHubStats implements Node {
      owner: String
      repo: String
      stars: Int
      forks: Int
      commits: Int
      contributors: Int
    }
    type ProductData implements Node {
      products: [ProductDataProducts]
    }
    type ProductDataProducts {
      description: String
      docs_url: String
      headline: String
      image_url: String
      icon_key: String
      inclusion_only: Boolean
      contact_support: Boolean
      legacy_product: Boolean
      name: String
      type: String
      unit: String
      usage_key: String
      addons: [ProductDataProductsAddons]
      plans: [ProductDataProductsPlans]
      features: [ProductDataProductsFeatures]
    }
    type ProductDataProductsPlans {
      description: String
      docs_url: String
      image_url: String
      name: String
      plan_key: String
      product_key: String
      unit: String
      flat_rate: Boolean
      unit_amount_usd: String
      free_allocation: Int
      included_if: String
      contact_support: Boolean
      note: String
      features: [ProductDataProductsPlansFeatures]
      tiers: [ProductDataProductsPlansTiers]
    }
    type ProductDataProductsPlansTiers {
      current_amount_usd: String
      current_usage: Int
      flat_amount_usd: String
      unit_amount_usd: String
      up_to: Int
      projected_usage: Int
      projected_amount_usd: String
    }
    type ProductDataProductsAddons {
      contact_support: Boolean
      description: String
      docs_url: String
      image_url: String
      icon_key: String
      inclusion_only: Boolean
      legacy_product: Boolean
      name: String
      type: String
      unit: String
      usage_key: String
      headline: String
      plans: [ProductDataProductsPlans]
      features: [ProductDataProductsFeatures]
    }
    type ProductDataProductsFeatures {
      key: String
      name: String
      description: String
      limit: String
      note: String
      unit: String
      entitlement_only: Boolean
      is_plan_default: Boolean
      category: String
      icon_key: String
      type: String
    }
    type ProductDataProductsAddonsFeatures {
        key: String
        name: String
        description: String
        category: String
        limit: String
        note: String
        entitlement_only: Boolean
        is_plan_default: Boolean
        unit: String
    }
    type ProductDataProductsAddonsPlansFeatures {
        key: String
        name: String
        description: String
        category: String
        limit: String
        note: String
        entitlement_only: Boolean
        is_plan_default: Boolean
        unit: String
    }
    type ProductDataProductsPlansFeatures {
        key: String
        name: String
        description: String
        category: String
        limit: String
        note: String
        entitlement_only: Boolean
        is_plan_default: Boolean
        unit: String
    }
    type StrapiImage implements Node {
        id: ID!
        url: String!
    }
    type SqueakCrestOption {
        textColor: String
        textShadow: String
        fontSize: String
        frame: String
        frameColor: String
        plaque: String
        plaqueColor: String
        imageScale: Int
        imageXOffset: Int
        imageYOffset: Int
    }
    type GithubReactions {
        hooray: Int
        heart: Int
        eyes: Int
        plus1: Int
        minus1: Int
        total_count: Int
    }
    type GithubPage {
        title: String
        html_url: String
        number: String
        closed_at: String
        reactions: GithubReactions
    }
    type SqueakLikeData {
        id: ID
    }
    type SqueakLikes {
        data: [SqueakLikeData]
    }
    type SqueakRoadmap implements Node {
        id: ID!
        squeakId: Int
        title: String
        description: String
        image: StrapiImage
        tagline: String
        slug: String
        createdAt: Date @dateformat
        dateCompleted: Date @dateformat
        projectedCompletion: Date @dateformat
        category: String
        milestone: Boolean
        completed: Boolean
        complete: Boolean
        betaAvailable: Boolean
        githubUrls: [String]
        githubPages: [GithubPage]
        teams: [SqueakTeam]
        cta: RoadmapCTA
        likes: SqueakLikes
    }
    type SqueakTopic implements Node {
        id: ID!
        squeakId: Int
        slug: String
        label: String
    }
    type SqueakTopicGroup implements Node {
        id: ID!
        squeakId: Int
        slug: String
        label: String
        topics: [SqueakTopic]
    }
    type SqueakMedia {
        data: SqueakMediaData
        publicId: String
        gatsbyImageData(width: Int, height: Int): JSON
    }
    type SqueakProfileAttributes {
        country: String
        firstName: String
        lastName: String
        companyRole: String
        location: String
        startDate: Date
        pineappleOnPizza: Boolean
        color: String
        avatar: SqueakProfileAvatar
        leadTeams: SqueakTeamData
    }
    type SqueakProfileDataItem {
        id: ID
        attributes: SqueakProfileAttributes
    }
    type SqueakProfilesData {
        id: ID
        data: [SqueakProfileDataItem]
    }
    type SqueakTeam implements Node {
        name: String
        slug: String
        tagline: String
        description: String
        createdAt: Date
        crest: SqueakMedia
        miniCrest: SqueakMedia
        crestOptions: SqueakCrestOption
        roadmaps: [SqueakRoadmap]
        profiles: SqueakProfilesData
        leadProfiles: SqueakProfilesData
        teamImage: JSON
    }
    type EventVenue {
        name: String
    }
    type EventLocation {
        label: String
        lat: Float
        lng: Float
        venue: EventVenue
    }
    type EventPartner {
        name: String
        url: String
    }
    type EventPhotoAttributes {
        url: String
    }
    type EventPhotoData {
        attributes: EventPhotoAttributes
    }
    type EventPhoto {
        data: [EventPhotoData]
    }
    type EventSpeakerAttributes {
        firstName: String
        lastName: String
    }
    type EventSpeakerData {
        attributes: EventSpeakerAttributes
    }
    type EventSpeaker {
        data: [EventSpeakerData]
    }
    type EventAttributes {
        name: String
        description: String
        date: Date
        private: Boolean
        format: [String]
        audience: [String]
        speakerTopic: String
        attendees: Int
        vibeScore: Float
        video: String
        presentation: String
        link: String
        location: EventLocation
        partners: [EventPartner]
        photos: EventPhoto
        speakers: EventSpeaker
    }
    type Event implements Node {
        attributes: EventAttributes
    }
    type ChangelogVideo implements Node {
        videoId: String!
        publishedAt: Date! @dateformat
        title: String!
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
              namespace: String!
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
              inventoryPolicy: String
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
            type ShopifyProductCategory {
              id: String!
              name: String!
              level: Int!
              parentId: String
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
              createdAt: Date
              category: ShopifyProductCategory
            }
          `
    )
}
