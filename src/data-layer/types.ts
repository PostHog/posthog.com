// Node types the data layer writes, one interface per node type. Queries and pages read them with
// `nodes<NodeTypes['SqueakTeam']>('SqueakTeam')`, or import the interface directly.
//
// Strapi entries keep many attributes that no query reads. Their known fields are typed, and `Loose`
// keeps the rest reachable as `unknown`.
import type { ImageData } from './images'
import type { Tool } from '../data/tools'

export type Loose = { [key: string]: unknown }

/** `Omit` that keeps the known keys of a type with an index signature (`Omit` collapses them into it). */
export type Without<T, K extends PropertyKey> = { [P in keyof T as P extends K ? never : P]: T[P] }

/* Strapi */

export interface StrapiEntity<A> {
    id: number
    attributes: A
}

export interface StrapiRelation<A> {
    data: StrapiEntity<A> | null
}

export interface StrapiRelationList<A> {
    data: StrapiEntity<A>[]
}

export interface StrapiImageFormat {
    url: string
    width: number
    height: number
    ext?: string
    mime?: string
    hash?: string
    name?: string
    size?: number
}

export interface StrapiMediaAttributes extends Loose {
    name: string
    url: string
    alternativeText: string | null
    caption: string | null
    width: number | null
    height: number | null
    ext: string | null
    mime: string | null
    formats: Partial<Record<'thumbnail' | 'small' | 'medium' | 'large', StrapiImageFormat>> | null
    provider_metadata?: { public_id: string; resource_type?: string } | null
}

export type StrapiMedia = StrapiRelation<StrapiMediaAttributes>

/** A Cloudinary asset as the Cloudinary transformer extended it, so components build responsive images. */
export interface CloudinaryFields {
    cloudName: string
    publicId: string
    originalWidth?: number
    originalHeight?: number
    originalFormat?: string
    gatsbyImageData: ImageData | null
}

/** A Strapi media field plus its Cloudinary fields. `publicId` is missing when there is no image. */
export type CloudinaryMedia = StrapiMedia & Partial<CloudinaryFields>

/** A link to another node: its `id`, and the Strapi id. */
export interface NodeRef {
    id: string
    squeakId: number
}

/* Squeak */

export interface SqueakProfileAttributes extends Loose {
    firstName: string | null
    lastName: string | null
    biography?: string | null
    company?: string | null
    companyRole: string | null
    github: string | null
    linkedin?: string | null
    twitter?: string | null
    website?: string | null
    location: string | null
    country: string | null
    pronouns?: string | null
    color: string | null
    pineappleOnPizza?: boolean | null
    startDate: string | null
    avatar?: StrapiMedia
    teams?: StrapiRelationList<Partial<SqueakTeamAttributes>>
    leadTeams?: StrapiRelationList<Partial<SqueakTeamAttributes>>
    quotes?: { id: number; quote: string }[]
}

export interface SqueakProfileNode extends Without<SqueakProfileAttributes, 'avatar'> {
    id: string
    squeakId: number
    avatar: StrapiMediaAttributes | null
}

export interface SqueakTopicAttributes extends Loose {
    label: string
    slug: string
}

export interface SqueakTopicNode extends SqueakTopicAttributes {
    id: string
    squeakId: number
}

export interface SqueakTopicGroupNode extends Loose {
    id: string
    squeakId: number
    label: string
    slug: string | null
    /** The group's topics, embedded. */
    topics: SqueakTopicNode[]
}

export interface SqueakCrestOptions extends Loose {
    textColor?: string | null
    textShadow?: string | null
    fontSize?: string | null
    frame?: string | null
    frameColor?: string | null
    plaque?: string | null
    plaqueColor?: string | null
    imageScale?: number | null
    imageXOffset?: number | null
    imageYOffset?: number | null
}

export interface SqueakTeamImage extends Loose {
    id: number
    caption: string | null
    image: StrapiMedia
}

export interface SqueakTeamAttributes extends Loose {
    name: string
    slug: string
    description: string | null
    tagline: string | null
    slackChannel?: string | null
    createdAt: string
    /** Slack emoji names. Join with SlackEmoji by `name`. */
    emojis: string[] | null
    crestOptions: SqueakCrestOptions | null
    crest: StrapiMedia
    miniCrest: StrapiMedia
    teamImage: SqueakTeamImage | null
    profiles: StrapiRelationList<SqueakProfileAttributes>
    leadProfiles: StrapiRelationList<Loose>
    roadmaps: StrapiRelationList<Loose>
}

export interface SqueakTeamNode extends Without<
    SqueakTeamAttributes,
    'crest' | 'miniCrest' | 'teamImage' | 'roadmaps'
> {
    id: string
    squeakId: number
    crest: CloudinaryMedia
    miniCrest: CloudinaryMedia
    teamImage: (Partial<SqueakTeamImage> & Partial<CloudinaryFields>) | null
    /** SqueakRoadmap ids. */
    roadmaps: NodeRef[]
}

export interface GithubPage {
    title: string
    html_url: string
    number: number
    closed_at: string | null
    reactions: { total_count: number; plus1: number; minus1: number; hooray: number; heart: number; eyes: number }
}

export interface RoadmapCta {
    label: string
    url: string
}

export interface SqueakRoadmapAttributes extends Loose {
    title: string
    description: string | null
    slug: string | null
    category: string | null
    dateCompleted: string | null
    projectedCompletion: string | null
    milestone: boolean | null
    complete: boolean | null
    betaAvailable: boolean | null
    githubUrls: string[] | null
    cta?: RoadmapCta | null
    likes?: StrapiRelationList<Loose>
    image?: StrapiMedia
    teams?: StrapiRelationList<Partial<SqueakTeamAttributes>>
    topic?: StrapiRelation<SqueakTopicAttributes>
    profiles?: StrapiRelationList<SqueakProfileAttributes>
}

export interface SqueakRoadmapNode extends Without<SqueakRoadmapAttributes, 'image' | 'teams'> {
    id: string
    squeakId: number
    media: CloudinaryMedia | null
    /** The image URL, when there is an image. */
    url?: string
    /** SqueakTeam ids. */
    teams: NodeRef[]
    /** One entry per github.com URL. An issue that could not be fetched is `{}`. */
    githubPages: (GithubPage | Record<string, never>)[]
}

export interface MapboxLocationNode {
    id: string
    /** The SqueakProfile `id`. */
    profileId: string
    location: string
    coordinates: { latitude: number; longitude: number }
}

/* Other Strapi types */

export interface RoadmapNode extends Without<SqueakRoadmapAttributes, 'image' | 'category'> {
    id: string
    strapiID: number
    /** dateCompleted, else projectedCompletion. */
    date: string | null
    year: number | null
    /** The Strapi `category`. */
    type: string | null
    media: CloudinaryMedia | null
}

export interface PostCategoryAttributes extends Loose {
    label: string
    folder: string | null
    post_tags?: StrapiRelationList<{ label: string; folder: string | null }>
}

export interface PostCategoryNode {
    id: string
    attributes: PostCategoryAttributes
}

export interface CommunityStatsNode {
    id: string
    /** null for the site-wide totals. */
    topicId: number | null
    topicSlug: string | null
    topicLabel: string | null
    questions: number
    resolved: number
    replies: number
    helpful: number
}

export interface SdkReferencesNode extends Loose {
    /** e.g. posthog-js-1.2.3, or posthog-js-latest. */
    id: string
    referenceId: string
    version: string
    hogRef: string
    info: Loose & {
        id: string
        title: string
        version: string
        description?: string
        slugPrefix?: string
        specUrl?: string
    }
    categories: string[]
    classes: (Loose & { id: string; title: string; functions: Loose[] })[]
    types: (Loose & { id: string; name: string })[]
}

export interface EventAttributes extends Loose {
    name: string
    description: string | null
    date: string | null
    startTime?: string | null
    private?: boolean | null
    format?: string | null
    audience?: string | null
    speakerTopic?: string | null
    attendees?: number | null
    vibeScore?: number | null
    video?: string | null
    presentation?: string | null
    link?: string | null
    location?: (Loose & { label?: string; lat?: number; lng?: number; venue?: Loose | null }) | null
    partners?: unknown
    photos?: StrapiRelationList<StrapiMediaAttributes>
    speakers?: StrapiRelationList<SqueakProfileAttributes>
}

export interface EventNode {
    id: string
    strapiID: number
    attributes: EventAttributes
}

export interface AchievementAttributes extends Loose {
    title: string
    description: string | null
    points: number | null
    icon: StrapiMedia
    achievement_group?: StrapiRelation<Loose>
}

export interface AchievementNode extends AchievementAttributes {
    id: string
    strapiID: number
}

export interface AchievementGroupAttributes extends Loose {
    Title: string
    description: string | null
    tiered: boolean | null
    icon: StrapiMedia
    achievements: StrapiRelationList<AchievementAttributes>
}

export interface AchievementGroupNode extends AchievementGroupAttributes {
    id: string
    strapiID: number
}

export interface Reward {
    handle: string
    title: string
    description: string
    price: number
    image: string | null
    merchStoreHandle: string | null
    discountType?: string | null
    discountAmount?: number | null
}

export interface RewardNode extends Reward {
    id: string
}

/* PostHog services */

export interface McpToolNode {
    id: string
    name: string
    title: string
    summary: string
    category: string
    feature: string
}

export interface BillingTier {
    up_to: number | null
    unit_amount_usd: string | null
    flat_amount_usd?: string | null
    current_amount_usd?: string | null
    current_usage?: number | null
}

export interface BillingFeature extends Loose {
    key: string
    name: string
    description?: string | null
    category?: string | null
    limit?: number | null
    note?: string | null
    unit?: string | null
    entitlement_only?: boolean
    is_plan_default?: boolean
}

export interface BillingPlan extends Loose {
    plan_key: string
    product_key: string
    name: string
    description?: string | null
    docs_url?: string | null
    image_url?: string | null
    unit?: string | null
    unit_amount_usd?: string | null
    flat_rate?: boolean
    free_allocation?: number | null
    included_if?: string | null
    contact_support?: boolean | null
    features: BillingFeature[]
    tiers: BillingTier[] | null
}

export interface BillingProduct extends Loose {
    name: string
    type: string
    description?: string | null
    docs_url?: string | null
    image_url?: string | null
    icon_key?: string | null
    unit?: string | null
    usage_key?: string | null
    inclusion_only?: boolean | null
    contact_support?: boolean | null
    legacy_product?: boolean | null
    plans: BillingPlan[]
    addons?: BillingProduct[]
    features?: BillingFeature[]
}

/** A single node with every billing product. */
export interface ProductDataNode {
    id: string
    products: BillingProduct[]
}

export interface ProductUsageStatsNode {
    id: string
    product: string
    unique_users: number | null
    unique_orgs: number | null
}

export type PipelineType = 'transformation' | 'destination' | 'source_webhook'

export interface PipelineInput extends Loose {
    key: string
    type: string
    label?: string
    secret?: boolean
    required?: boolean
    description?: string
}

export interface HogFunctionTemplate extends Loose {
    id: string
    name: string
    description: string | null
    icon_url: string | null
    status: string
    type: string
    category: string[]
    inputs_schema: PipelineInput[]
}

/** The Mdx page of a pipeline is the content node whose `frontmatter.templateId` is `pipelineId`. */
export interface PostHogPipelineNode extends Without<HogFunctionTemplate, 'type'> {
    pipelineId: string
    slug: string
    type: PipelineType
    introSnippet?: string
    installationSnippet?: string
}

export interface HogFlowTemplate extends Loose {
    id: string
    name: string
    description: string | null
    image_url: string | null
    created_at: string
    created_by: (Loose & { first_name: string; last_name: string }) | null
}

export interface PostHogWorkflowTemplateNode extends HogFlowTemplate {
    templateId: string
    fields: { slug: string }
}

export interface PostHogSourceNode {
    id: string
    sourceId: string
    slug: string
    name: string
    icon_url: string | null
    docsUrl: string | null
    unreleased: boolean
    beta: boolean
    featured: boolean
    caption: string | null
    sourceFields: unknown[]
    tables: unknown[]
    permissionsCaption: string | null
    featureFlag: string | null
}

export interface EarlyAccessFeatureNode {
    id: string
    name: string
    description: string
    stage: string
    documentationUrl: string | null
    flagKey: string
    /** A UUIDv7: the roadmap derives a "created" date from it. */
    featureId: string
    /** Signups on the waitlist survey, or null when unknown. */
    waitlistCount: number | null
    payload: Loose & { survey_id?: string; survey_question_id?: string }
    assignee: { type: string; name: string } | null
}

export interface PageViewsNode {
    id: string
    /** A normalized pathname without a trailing slash, e.g. /docs/feature-flags. */
    pathname: string
    count: number
}

export interface ApiEndpointNode {
    id: string
    name: string
    url: string
    /** JSON: the OpenAPI operations of the group. */
    items: string
    /** JSON: `{ schemas }`, every schema the operations reference. */
    components: string
    nextURL: string | null
    previousURL: string | null
}

/* Ashby */

export interface AshbyCustomField extends Loose {
    id: string
    title: string
    objectType?: string
    fieldType?: string
    selectableValues?: { label: string; value: string; isArchived?: boolean }[]
}

export type AshbyCustomFieldNode = AshbyCustomField

/** A job's custom field. `value` is a label, or a JSON string of labels for a list. */
export interface AshbyJobCustomField extends Loose {
    id: string
    title: string
    value: string | null
}

export interface AshbyJobNode extends Loose {
    id: string
    title: string
    status: string
    customFields: AshbyJobCustomField[]
}

export interface AshbyTableOfContentsEntry {
    value: string
    url: string
    depth: number
}

export interface AshbyJobPostingInfo extends Loose {
    id: string
    title: string
    descriptionHtml?: string
    applicationFormDefinition?: { sections: { fields: Loose[] }[] }
}

export interface AshbyJobPosting extends Loose {
    /** Ashby's own id. Applications send it back to Ashby. */
    id: string
    title: string
    jobId: string
    departmentName: string
    teamName?: string
    locationName?: string
    locationIds?: { primaryLocationId: string; secondaryLocationIds: string[] }
    isListed: boolean
    publishedDate: string
    externalLink: string
}

export interface AshbyJobPostingNode extends AshbyJobPosting {
    info: AshbyJobPostingInfo
    /** The job's custom fields. null when the job is not open. */
    parent: { id: string; customFields: AshbyJobCustomField[] } | null
    fields: {
        /** The title without " (Remote)". */
        title: string
        slug: string
        locations: string[]
        html?: string
        tableOfContents?: AshbyTableOfContentsEntry[]
    }
}

/* Shopify */

export interface ShopifyImage {
    width: number | null
    height: number | null
    originalSrc: string
}

export interface ShopifyMedia {
    mediaContentType?: string
    preview: { image: ShopifyImage | null } | null
}

export interface ShopifyMetafield {
    key: string
    value: string
    namespace: string
}

export interface ShopifyProductVariant {
    inventoryPolicy: string
    availableForSale: boolean
    media: ShopifyMedia[]
    price: number
    product: { shopifyId: string; title: string; featuredMedia: ShopifyMedia | null }
    selectedOptions: { name: string; value: string }[]
    shopifyId: string
    sku: string | null
    title: string
}

export interface ShopifyProductNode {
    id: string
    shopifyId: string
    handle: string
    title: string
    description: string
    descriptionHtml: string
    status: string
    tags: string[]
    totalInventory: number
    createdAt: string
    category: { id: string; name: string; level: number; parentId: string | null } | null
    featuredMedia: ShopifyMedia | null
    /** featuredMedia.preview.image */
    featuredImage: ShopifyImage | null
    media: ShopifyMedia[]
    metafields: ShopifyMetafield[]
    options: { shopifyId: string; name: string; values: string[] }[]
    priceRangeV2: { maxVariantPrice: { amount: number }; minVariantPrice: { amount: number } }
    variants: ShopifyProductVariant[]
}

export interface ShopifyCollectionNode {
    id: string
    handle: string
    /** Join with ShopifyProduct by `shopifyId`. */
    products: { shopifyId: string }[]
}

export interface MerchNavigationNode {
    id: string
    url: string
    title: string
    handle: string
}

/* Other services */

export interface SlackEmojiNode {
    id: string
    name: string
    /** An image URL, or "alias:<name>". */
    url: string
    /** The image, as the downloaded file was exposed. null for aliases. */
    localFile: { publicURL: string } | null
}

export interface G2ReviewNode extends Loose {
    id: string
    attributes: Loose & {
        title: string
        star_rating: number
        submitted_at: string
        comment_answers: Partial<Record<'love' | 'hate' | 'benefits', { value: string }>>
    }
}

export interface CloudinaryImageNode extends Loose {
    id: string
    public_id: string
    folder: string
    secure_url: string
    width: number
    height: number
    format: string
}

export interface ChangelogVideoNode {
    id: string
    videoId: string
    publishedAt: string
    title: string
}

export interface ResearchMergedPrNode {
    id: string
    title: string
    url: string
    repo: string
    author: string
    mergedAt: string | null
}

export interface SelfDrivingPullRequestNode {
    id: string
    prNumber: number
    title: string
    /** The conventional-commit title, split. */
    type: string
    scope: string
    summary: string
    url: string
    state: 'merged' | 'draft' | 'open'
    openedAt: string
    mergedAt: string | null
}

export interface GitContributor {
    avatar: string
    url: string
    username: string
}

export interface GitCommit {
    author: { login: string; avatar_url: string; html_url: string } | null
    date: string
    message: string
    url: string
}

export interface GitMetadataNode {
    id: string
    /** e.g. contents/docs/feature-flags/index.mdx */
    path: string
    contributors: GitContributor[]
    commits: GitCommit[]
    gitLogLatestDate: string
}

/* Local files */

export type ToolNode = Tool & { id: string }

export interface Author {
    handle: string
    name: string
    role?: string
    link_type?: string
    link_url?: string
    /** Join with SqueakProfile by `squeakId`. */
    profile_id?: number
}

export interface AuthorsJsonNode extends Author {
    id: string
}

export interface Testimonial {
    featuresUsed: string[]
    quote: string
    author: { name: string; role?: string; company?: { name: string; url?: string } }
}

export interface TestimonialsJsonNode extends Testimonial {
    id: string
}

export interface AgentSkillNode {
    id: string
    product: string
    name: string
    description: string
    /** products/<product>/skills/<skill> */
    sourcePath: string
    mcpTools: string[]
}

/** Every node type, by name: `nodes<NodeTypes['SqueakTeam']>('SqueakTeam')`. */
export interface NodeTypes {
    SqueakProfile: SqueakProfileNode
    SqueakTopic: SqueakTopicNode
    SqueakTopicGroup: SqueakTopicGroupNode
    SqueakTeam: SqueakTeamNode
    SqueakRoadmap: SqueakRoadmapNode
    MapboxLocation: MapboxLocationNode
    Roadmap: RoadmapNode
    PostCategory: PostCategoryNode
    CommunityStats: CommunityStatsNode
    SdkReferences: SdkReferencesNode
    Event: EventNode
    Achievement: AchievementNode
    AchievementGroup: AchievementGroupNode
    Reward: RewardNode
    McpTool: McpToolNode
    ProductData: ProductDataNode
    ProductUsageStats: ProductUsageStatsNode
    PostHogPipeline: PostHogPipelineNode
    PostHogWorkflowTemplate: PostHogWorkflowTemplateNode
    PostHogSource: PostHogSourceNode
    EarlyAccessFeature: EarlyAccessFeatureNode
    PageViews: PageViewsNode
    ApiEndpoint: ApiEndpointNode
    AshbyCustomField: AshbyCustomFieldNode
    AshbyJob: AshbyJobNode
    AshbyJobPosting: AshbyJobPostingNode
    ShopifyProduct: ShopifyProductNode
    ShopifyCollection: ShopifyCollectionNode
    MerchNavigation: MerchNavigationNode
    SlackEmoji: SlackEmojiNode
    G2Review: G2ReviewNode
    CloudinaryImage: CloudinaryImageNode
    ChangelogVideo: ChangelogVideoNode
    ResearchMergedPr: ResearchMergedPrNode
    SelfDrivingPullRequest: SelfDrivingPullRequestNode
    GitMetadata: GitMetadataNode
    Tool: ToolNode
    AuthorsJson: AuthorsJsonNode
    TestimonialsJson: TestimonialsJsonNode
    AgentSkill: AgentSkillNode
}
