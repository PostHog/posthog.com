import { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { productAnalytics } from './productData/product_analytics'
import { cdp } from './productData/cdp'
import { dataWarehouse } from './productData/data_warehouse'
import { featureFlags } from './productData/feature_flags'
import { experiments } from './productData/experiments'
import { errorTracking } from './productData/error_tracking'
import { llmAnalytics } from './productData/llm_analytics'
import { workflows } from './productData/workflows'

export interface Integration {
    name: string
    slug: string
    categories: string[]
    posthogProducts: string[]
    integrationTypes: string[]
    useCase: string
    domain: string
    iconUrl?: string
    status?: string
}

interface BaseIntegration {
    name: string
    categories: string[]
    posthogProducts: string[]
    integrationTypes: string[]
    useCase: string
    domain: string
}

export const POSTHOG_PRODUCT_COLORS: Record<string, string> = {
    [productAnalytics.name]: productAnalytics.color,
    [cdp.name]: cdp.color,
    'Data Warehouse': dataWarehouse.color,
    [featureFlags.name]: featureFlags.color,
    [experiments.name]: experiments.color,
    [errorTracking.name]: errorTracking.color,
    [llmAnalytics.name]: llmAnalytics.color,
    [workflows.name]: workflows.color,
}

export const ALL_CATEGORIES = 'All categories'
export const ALL_TYPES = 'All types'

export const INTEGRATION_TYPES: string[] = [
    'Realtime Destination',
    'Native',
    'Source',
    'Via Workflows',
    'API-based',
    'MCP',
]

export const POSTHOG_CDN_ICONS: Record<string, string> = {
    ABsmartly: '/static/services/absmartly.com.png',
    Accoil: '/static/services/accoil.com.png',
    Acoustic: '/static/services/acoustic.com.png',
    ActiveCampaign: '/static/services/activecampaign.png',
    Airship: '/static/services/airship.com.png',
    Airtable: '/static/services/airtable.png',
    'Algolia Insights': '/static/services/algolia.com.png',
    'Amazon S3': '/static/services/aws-kinesis.png',
    Amplitude: '/static/services/amplitude.com.png',
    'Angler AI': '/static/services/getangler.ai.png',
    Attentive: '/static/services/attentive.com.png',
    Attio: '/static/services/attio.png',
    Avo: '/static/services/avo.png',
    'AWS Kinesis': '/static/services/aws-kinesis.png',
    BigQuery: '/static/services/bigquery.png',
    'Blend AI': '/static/services/blend.com.png',
    Braze: '/static/services/braze.png',
    Brevo: '/static/services/brevo.png',
    'Calliper Cloud': '/static/services/cloud.com.png',
    Canny: '/static/services/canny.io.png',
    Canvas: '/static/services/supernova.ai.png',
    Clearbit: '/static/services/clearbit.png',
    CleverTap: '/static/services/clevertap.com.png',
    ClickUp: '/static/services/clickup.svg',
    'Customer.io': '/static/services/customerio.png',
    Discord: '/static/services/discord.png',
    Drip: '/static/services/drip.com.png',
    Encharge: '/static/services/encharge.io.png',
    'Engage.so': '/static/services/engage.png',
    Fullstory: '/static/services/fullstory.com.png',
    Gameball: '/static/services/gameball.co.png',
    GitHub: '/static/services/github.png',
    GitLab: '/static/services/gitlab.png',
    Gleap: '/static/services/gleap.png',
    'Google Ads Conversions': '/static/services/google-ads.png',
    'Google Cloud Storage': '/static/services/google-cloud-storage.png',
    'Google Pub/Sub': '/static/services/google-cloud.png',
    HubSpot: '/static/services/hubspot.png',
    Hyperengage: '/static/services/hyperengage.io.png',
    'Inleads AI': '/static/services/inleads.ai.png',
    Insider: '/static/services/insider.com.png',
    Intercom: '/static/services/intercom.png',
    Iterable: '/static/services/iterable.com.png',
    Jira: '/static/services/jira.png',
    'June.so': '/static/services/june.png',
    Kameleoon: '/static/services/kameleoon.com.png',
    Klaviyo: '/static/services/klaviyo.png',
    Knock: '/static/services/knock.png',
    Koala: '/static/services/koala.com.png',
    'Kudosity SMS': '/static/services/kudosity.png',
    LaunchDarkly: '/static/services/launchdarkly.com.png',
    Launchpad: '/static/services/launchpad.com.png',
    Linear: '/static/services/linear.png',
    'LinkedIn Ads Conversions': '/static/services/linkedin.png',
    LiveLike: '/static/services/livelike.com.png',
    Loops: '/static/services/loops.png',
    m3ter: '/static/services/m3ter.com.png',
    Mailgun: '/static/services/mailgun.png',
    Mailjet: '/static/services/mailjet.png',
    Make: '/static/services/make.png',
    'Meta Ads Conversions': '/static/services/meta-ads.png',
    Metronome: '/static/services/metronome.com.png',
    'Microsoft Teams': '/static/services/microsoft-teams.png',
    Mixpanel: '/static/services/mixpanel.com.png',
    'Moloco MCM': '/static/services/moloco.com.png',
    MSSQL: '/static/services/sql-azure.png',
    MySQL: '/static/services/mysql.png',
    OneSignal: '/static/services/onesignal.svg',
    Optimizely: '/static/services/optimizely.com.png',
    Outfunnel: '/static/services/outfunnel.com.png',
    Pipedrive: '/static/services/pipedrive.com.png',
    'Pinterest Conversions API': '/static/services/pinterest.com.png',
    PlayerZero: '/static/services/playerzero.ai.png',
    Postgres: '/static/services/postgres.png',
    PostHog: '/static/posthog-icon.svg',
    Prodeology: '/static/services/prodeology.com.png',
    Pushwoosh: '/static/services/pushwoosh.com.png',
    Recombee: '/static/services/recombee.com.png',
    'Reddit Conversions API': '/static/services/reddit.png',
    'RevX Cloud': '/static/services/revx.io.png',
    Ripe: '/static/services/ripe.com.png',
    RudderStack: '/static/services/rudderstack.png',
    Salesforce: '/static/services/salesforce.png',
    Saleswings: '/static/services/saleswingsapp.com.png',
    Schematic: '/static/services/schematichq.com.png',
    Sendgrid: '/static/services/sendgrid.png',
    Slack: '/static/services/slack.png',
    'Snapchat Ads Conversions': '/static/services/snapchat.png',
    Snowflake: '/static/services/snowflake.png',
    Sprig: '/static/services/sprig.com.png',
    StackAdapt: '/static/services/stackadapt.com.png',
    Stripe: '/static/services/stripe.png',
    'TikTok Ads Conversions': '/static/services/tiktok.png',
    Topsort: '/static/services/topsort.com.png',
    Userlist: '/static/services/userlist.png',
    Usermaven: '/static/services/usermaven.com.png',
    UserMotion: '/static/services/usermotion.com.png',
    Userpilot: '/static/services/userpilot.com.png',
    Voucherify: '/static/services/voucherify.io.png',
    Voyage: '/static/services/voyagesms.com.png',
    VWO: '/static/services/vwo.com.png',
    Xtremepush: '/static/services/xtremepush.com.png',
    Zapier: '/static/services/zapier.png',
    Zendesk: '/static/services/zendesk.png',
    Convex: 'https://cdn.simpleicons.org/convex',
    OpenRouter: 'https://openrouter.ai/favicon.ico',
    Vercel: 'https://cdn.simpleicons.org/vercel/FFFFFF',
}

export function integrationSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
}

const CDN_BASE = 'https://us.posthog.com'

function domainFromIconUrl(iconUrl: string): string {
    const match = iconUrl.match(/\/static\/services\/([^.]+)/)
    if (match) return `${match[1]}.com`
    return ''
}

const API_CATEGORY_MAP: Record<string, string> = {
    'Customer Success': 'Support & CX',
    'Customer Service': 'Support & CX',
    'Customer Data Platforms': 'Analytics',
    'Email Marketing': 'CRM & Marketing',
    CRM: 'CRM & Marketing',
    Marketing: 'CRM & Marketing',
    Advertising: 'CRM & Marketing',
    Advertisement: 'CRM & Marketing',
    'Attribution Platforms': 'CRM & Marketing',
    Communication: 'CRM & Marketing',
    'Business Messaging': 'Messaging & Notifications',
    'SMS & Push Notifications': 'Messaging & Notifications',
    'Event Messaging': 'Messaging & Notifications',
    Analytics: 'Analytics',
    'Heatmap Recording': 'Analytics',
    'Data Warehouse': 'Data Warehousing',
    'Databases & Object Storage': 'Data Warehousing',
    'Data Ingestion': 'Data Warehousing',
    'ETL Platforms': 'Data Warehousing',
    'Streaming Platforms': 'Data Warehousing',
    DevOps: 'Developer Tools',
    'Incident Management': 'Developer Tools',
    'Error Reporting & Monitoring': 'Developer Tools',
    'Error tracking': 'Developer Tools',
    Serverless: 'Developer Tools',
    'Authentication Platforms': 'Developer Tools',
    'A/B Testing & Feature Experimentation': 'Developer Tools',
    Automation: 'Productivity',
    Productivity: 'Productivity',
    Custom: 'Developer Tools',
    Surveys: 'Support & CX',
    'User Engagement Platforms': 'User Engagement Platforms',
    'Consent Management Platform': 'Developer Tools',
    'Monitoring & Alerts': 'Developer Tools',
}

function mapApiCategories(apiCategories: string[]): string[] {
    const mapped = new Set<string>()
    for (const cat of apiCategories) {
        mapped.add(API_CATEGORY_MAP[cat] || cat)
    }
    return Array.from(mapped)
}

const MANUAL_INTEGRATIONS: Record<string, BaseIntegration> = {
    'amazon-s3': {
        name: 'Amazon S3',
        categories: ['Data Warehousing'],
        posthogProducts: ['Data Warehouse', 'CDP'],
        integrationTypes: ['Native'],
        useCase: 'Export event data to Amazon S3 for storage, warehouse sync, and downstream processing.',
        domain: 'aws.amazon.com',
    },
    bigquery: {
        name: 'BigQuery',
        categories: ['Data Warehousing'],
        posthogProducts: ['Data Warehouse'],
        integrationTypes: ['Native', 'Source'],
        useCase: 'Export PostHog events into BigQuery for analysis, or query BigQuery data within PostHog.',
        domain: 'cloud.google.com',
    },
    convex: {
        name: 'Convex',
        categories: ['Developer Tools'],
        posthogProducts: ['Product Analytics'],
        integrationTypes: [],
        useCase: 'Track events from your Convex application in PostHog.',
        domain: 'convex.dev',
    },
    github: {
        name: 'GitHub',
        categories: ['Developer Tools'],
        posthogProducts: ['Error Tracking'],
        integrationTypes: ['Native'],
        useCase: 'Create GitHub issues directly from PostHog errors.',
        domain: 'github.com',
    },
    gitlab: {
        name: 'GitLab',
        categories: ['Developer Tools'],
        posthogProducts: ['Error Tracking'],
        integrationTypes: ['Native'],
        useCase: 'Create GitLab issues directly from PostHog errors.',
        domain: 'gitlab.com',
    },
    jira: {
        name: 'Jira',
        categories: ['Developer Tools'],
        posthogProducts: ['Error Tracking'],
        integrationTypes: ['Native'],
        useCase: 'Create Jira tickets directly from PostHog error events.',
        domain: 'atlassian.com',
    },
    linear: {
        name: 'Linear',
        categories: ['Developer Tools'],
        posthogProducts: ['Error Tracking'],
        integrationTypes: ['Native'],
        useCase: 'Create Linear issues directly from PostHog errors.',
        domain: 'linear.app',
    },
    'microsoft-teams': {
        name: 'Microsoft Teams',
        categories: ['Productivity'],
        posthogProducts: ['Error Tracking', 'CDP'],
        integrationTypes: ['Native', 'Realtime Destination'],
        useCase: 'Send error alerts and event notifications to Microsoft Teams channels.',
        domain: 'microsoft.com',
    },
    mssql: {
        name: 'MSSQL',
        categories: ['Data Warehousing'],
        posthogProducts: ['Data Warehouse'],
        integrationTypes: ['Native'],
        useCase: 'Query external Microsoft SQL Server data within PostHog.',
        domain: 'microsoft.com',
    },
    mysql: {
        name: 'MySQL',
        categories: ['Data Warehousing'],
        posthogProducts: ['Data Warehouse'],
        integrationTypes: ['Native', 'Source'],
        useCase: 'Query external MySQL data within PostHog.',
        domain: 'mysql.com',
    },
    onesignal: {
        name: 'OneSignal',
        categories: ['Messaging & Notifications'],
        posthogProducts: ['CDP', 'Workflows'],
        integrationTypes: ['Realtime Destination', 'Via Workflows'],
        useCase:
            'Send user events to trigger push notifications in OneSignal. Conditionally send messages based on user behavior.',
        domain: 'onesignal.com',
    },
    openrouter: {
        name: 'OpenRouter',
        categories: ['AI & LLM'],
        posthogProducts: ['LLM Analytics'],
        integrationTypes: ['Native'],
        useCase: 'Track LLM calls made via OpenRouter in PostHog.',
        domain: 'openrouter.ai',
    },
    postgres: {
        name: 'Postgres',
        categories: ['Data Warehousing'],
        posthogProducts: ['Data Warehouse'],
        integrationTypes: ['Native', 'Source'],
        useCase: 'Query external Postgres data within PostHog.',
        domain: 'postgresql.org',
    },
    rudderstack: {
        name: 'RudderStack',
        categories: ['Analytics'],
        posthogProducts: ['CDP'],
        integrationTypes: ['Native'],
        useCase: 'Send and receive event data between RudderStack and PostHog.',
        domain: 'rudderstack.com',
    },
    segment: {
        name: 'Segment',
        categories: ['Analytics'],
        posthogProducts: ['CDP'],
        integrationTypes: ['Native'],
        useCase: 'Send and receive event data between Segment and PostHog.',
        domain: 'segment.com',
    },
    slack: {
        name: 'Slack',
        categories: ['Productivity'],
        posthogProducts: ['Error Tracking', 'Workflows', 'CDP'],
        integrationTypes: ['Native', 'Via Workflows', 'Realtime Destination'],
        useCase: 'Send error alerts, trigger workflow notifications, or forward event data to Slack.',
        domain: 'slack.com',
    },
    snowflake: {
        name: 'Snowflake',
        categories: ['Data Warehousing'],
        posthogProducts: ['Data Warehouse'],
        integrationTypes: ['Native', 'Source'],
        useCase: 'Export event data into Snowflake for advanced analysis, or query Snowflake data within PostHog.',
        domain: 'snowflake.com',
    },
    stripe: {
        name: 'Stripe',
        categories: ['Payments & Billing'],
        posthogProducts: ['Product Analytics'],
        integrationTypes: ['API-based', 'Source'],
        useCase: 'Track subscription and payment events in PostHog.',
        domain: 'stripe.com',
    },
    vercel: {
        name: 'Vercel',
        categories: ['Developer Tools', 'AI & LLM'],
        posthogProducts: ['Feature Flags', 'Experiments'],
        integrationTypes: ['Native', 'MCP'],
        useCase: 'Sync PostHog feature flags into Vercel. Run experiments defined in PostHog in a Vercel app.',
        domain: 'vercel.com',
    },
}

interface TemplateNode {
    templateId: string
    name: string
    description: string
    iconUrl: string
    status: string
    categories: string
}

export default function useIntegrations() {
    const data = useStaticQuery(graphql`
        query IntegrationTemplatesQuery {
            allIntegrationTemplate {
                nodes {
                    templateId
                    name
                    description
                    iconUrl
                    status
                    categories
                }
            }
        }
    `)

    const { integrations, categories } = useMemo(() => {
        const manualByName = new Map<string, Integration>()
        for (const [slug, entry] of Object.entries(MANUAL_INTEGRATIONS)) {
            manualByName.set(entry.name.toLowerCase(), {
                ...entry,
                slug,
            })
        }

        const merged = new Map<string, Integration>()

        for (const manual of manualByName.values()) {
            merged.set(manual.name.toLowerCase(), manual)
        }

        const templates = data.allIntegrationTemplate.nodes as TemplateNode[]
        for (const template of templates) {
            const key = template.name.toLowerCase()
            if (merged.has(key)) continue

            const apiCategories: string[] = JSON.parse(template.categories || '[]')
            const iconUrl = template.iconUrl
                ? template.iconUrl.startsWith('http')
                    ? template.iconUrl
                    : `${CDN_BASE}${template.iconUrl}`
                : undefined

            merged.set(key, {
                name: template.name,
                slug: integrationSlug(template.name),
                categories: mapApiCategories(apiCategories),
                posthogProducts: ['CDP'],
                integrationTypes: ['Realtime Destination'],
                useCase: template.description,
                domain: template.iconUrl ? domainFromIconUrl(template.iconUrl) : '',
                iconUrl,
                status: template.status,
            })
        }

        const allIntegrations = Array.from(merged.values())
        const allCategories = Array.from(new Set(allIntegrations.flatMap((i) => i.categories))).sort()

        return { integrations: allIntegrations, categories: allCategories }
    }, [data])

    const getIntegration = (slug: string): Integration | undefined => {
        return integrations.find((i) => i.slug === slug)
    }

    return {
        integrations,
        getIntegration,
        integrationSlug,
        categories,
        POSTHOG_PRODUCT_COLORS,
        POSTHOG_CDN_ICONS,
        INTEGRATION_TYPES,
    }
}
