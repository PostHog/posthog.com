export interface FeaturesPageData {
    key: string
    title: string
    href: string
    icon: string
}

export interface FeatureComparisonData {
    title: string
    posthog: boolean
    amplitude: boolean
    mixpanel: boolean
    heap: boolean
}

export interface LibraryPluginType {
    id: number
    name: string
    description?: string
    url: string
    imageLink: string
    maintainer?: string
}

export interface MenuProps {
    blogArticleSlug?: string
    isHomePage?: boolean
    activeKey: string
}

export interface MenuQueryNodeType {
    node: {
        name: string
        link: string
        a: string
    }
}

export interface MenuQueryType {
    allMenuItemsJson: {
        edges: MenuQueryNodeType[]
    }
}

export type MenuItemType = {
    title: string
    url: string
    sub?: {
        component?: string
    }
    hideBorder?: boolean
    classes?: string
    cta?: string
}

export interface Contributor {
    login: string
    name: string
    avatar_url: string
    profile: string
    contributions: string[]
    level: number
    mvpWins: number
}

export interface AuthorsData {
    handle: string
    image: string
    link_type: 'twitter' | 'linkedin' | 'github'
    link_url: string
    name: string
    role: string
}

export type Heading = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export interface BillingV2FeatureType {
    key: string
    name: string
    description?: string
    unit?: string
    limit?: number
    note?: string
    group?: AvailableFeature
}

export interface BillingV2TierType {
    unit_amount_usd: string
    current_amount_usd?: string | null
    up_to: number | null
}

export interface BillingProductV2Type {
    usage_key: 'events' | 'recordings' | 'enterprise' | 'base'
    type: string
    name: string
    description: string
    image_url?: string
    docs_url?: string
    inclusion_only: boolean
    unit?: string
    plans: BillingV2PlanType[]
    addons?: BillingProductV2Type[]
}

export interface BillingV2PlanType {
    key: string
    name: string
    description: string
    image_url?: string
    docs_url?: string
    free_allocation?: number
    included_if?: 'no_active_subscription' | 'has_subscription' | null
    note?: string
    plan_key: string
    product_key: string
    tiers?: BillingV2TierType[]
    unit?: 'event' | 'recording'
    features?: BillingV2FeatureType[]
    unit_amount_usd?: string | null
    contact_support?: boolean
}

export enum AvailableFeature {
    EVENTS = 'events',
    TRACKED_USERS = 'tracked_users',
    DATA_RETENTION = 'data_retention',
    SUBSCRIPTIONS = 'subscriptions',
    DASHBOARD_COLLABORATION = 'dashboard_collaboration',
    DASHBOARD_PERMISSIONING = 'dashboard_permissioning',
    INGESTION_TAXONOMY = 'ingestion_taxonomy',
    PATHS_ADVANCED = 'paths_advanced',
    CORRELATION_ANALYSIS = 'correlation_analysis',
    GROUP_ANALYTICS = 'group_analytics',
    TAGGING = 'tagging',
    BEHAVIORAL_COHORT_FILTERING = 'behavioral_cohort_filtering',
    SESSION_RECORDINGS = 'session_recordings',
    RECORDINGS_PLAYLISTS = 'recordings_playlists',
    RECORDINGS_PERFORMANCE = 'recordings_performance',
    RECORDINGS_FILE_EXPORT = 'recordings_file_export',
    BOOLEAN_FLAGS = 'boolean_flags',
    MULTIVARIATE_FLAGS = 'multivariate_flags',
    EXPERIMENTATION = 'experimentation',
    APPS = 'apps',
    SLACK_INTEGRATION = 'slack_integration',
    MICROSOFT_TEAMS_INTEGRATION = 'microsoft_teams_integration',
    DISCORD_INTEGRATION = 'discord_integration',
    ZAPIER = 'zapier',
    APP_METRICS = 'app_metrics',
    TEAM_MEMBERS = 'team_members',
    API_ACCESS = 'api_access',
    ORGANIZATIONS_PROJECTS = 'organizations_projects',
    PROJECT_BASED_PERMISSIONING = 'project_based_permissioning',
    ROLE_BASED_ACCESS = 'role_based_access',
    GOOGLE_LOGIN = 'google_login',
    SAML = 'saml',
    SSO_ENFORCEMENT = 'sso_enforcement',
    WHITE_LABELLING = 'white_labelling',
    COMMUNITY_SUPPORT = 'community_support',
    DEDICATED_SUPPORT = 'dedicated_support',
    EMAIL_SUPPORT = 'email_support',
    ACCOUNT_MANAGER = 'account_manager',
    TRAINING = 'training',
    CONFIGURATION_SUPPORT = 'configuration_support',
    TERMS_AND_CONDITIONS = 'terms_and_conditions',
    SECURITY_ASSESSMENT = 'security_assessment',
    BESPOKE_PRICING = 'bespoke_pricing',
    INVOICE_PAYMENTS = 'invoice_payments',
    SUPPORT_SLAS = 'support_slas',
}
