const privateHosts = new Set([
    'argocd-internal.internal.posthog.dev',
    'billing.posthog.com',
    'grafana.prod-eu.posthog.dev',
    'grafana.prod-us.posthog.dev',
    'metabase.prod-eu.posthog.dev',
    'metabase.prod-us.posthog.dev',
    'ops.posthog.dev',
    'posthog.bamboohr.com',
    'posthog.lightning.force.com',
    'posthog.slack.com',
    'posthog.vitally-eu.io',
    'posthog-superdays.vercel.app',
    'posthoghelp.zendesk.com',
    'quote.posthog.com',
    'quote.posthog.net',
    'runbooks.posthog.com',
    'sdk-scanner.posthog.dev',
    'security.posthog.dev',
])

const privateRepositories = new Set([
    'billing',
    'charts',
    'clickhouse-superday',
    'company-internal',
    'demohog',
    'hogbot',
    'hogspy',
    'incidents-analysis',
    'lead-gateway',
    'mobile-replay-data-transformer',
    'posthog-cloud',
    'posthog-cloud-infra',
    'posthog-salesforce',
    'product-internal',
    'requests-for-comments-internal',
    'squeak-strapi',
    'twig.com',
])

const privateProjects = new Map([
    ['us.posthog.com', new Set(['2', '99423'])],
    ['app.posthog.com', new Set(['2', '99423'])],
    ['eu.posthog.com', new Set(['1', '30021'])],
])

const privatePathPrefixes = new Map([
    ['admin.shopify.com', ['/store/posthog']],
    [
        'app.ashbyhq.com',
        [
            '/admin/organizational-settings/custom-fields/job/6d49283a-1662-40aa-a6ee-002767eed7e2',
            '/admin/organizational-settings/custom-fields/job/6897f288-b46e-4d51-9bd9-aeb20ad8e62f',
        ],
    ],
    ['app.buildbetter.app', ['/folders/14521', '/folders/14593', '/folders/15381', '/folders/18024']],
    ['app.clay.com', ['/workspaces/268768']],
    ['app.deel.com', ['/organization-chart/organization/834ac289-7c04-4d93-91f0-8922c5664b77']],
    ['app.lemlist.com', ['/teams/tea_kvdy3nLu9KEA4QPiD']],
    ['console.cloudinary.com', ['/console/c-112bd66abc0aa594ac70f206d45dc7']],
    ['dashboard.stripe.com', ['/customers/cus_Rqm805zKTuxdqU']],
    ['fly.customer.io', ['/workspaces/127208']],
])

function isPrivateUrl(value) {
    let url
    try {
        url = new URL(value, 'https://posthog.com')
    } catch {
        return false
    }
    if (!['http:', 'https:'].includes(url.protocol)) {
        return false
    }
    if (privateHosts.has(url.hostname)) {
        return true
    }
    if (
        privatePathPrefixes
            .get(url.hostname)
            ?.some((prefix) => url.pathname === prefix || url.pathname.startsWith(prefix + '/'))
    ) {
        return true
    }
    switch (url.hostname) {
        case 'console.cloud.google.com':
            return url.searchParams.get('project') === 'posthog-301601'
        case 'us-26000.app.gong.io':
            return url.searchParams.get('workspace-id') === '8823646477612786274'
        case 'us.posthog.com':
        case 'app.posthog.com':
        case 'eu.posthog.com':
            return (
                (url.hostname === 'app.posthog.com' && url.pathname === '/dashboard/54139') ||
                privateProjects.get(url.hostname).has(/^\/project\/(\d+)(?:\/|$)/.exec(url.pathname)?.[1])
            )
        case 'app.incident.io':
            return /^\/posthog(?:\/|$)/.test(url.pathname)
        case 'app.slack.com':
            return /^\/client\/TSS5W8YQZ(?:\/|$)/.test(url.pathname)
        case 'github.com': {
            const [, owner, repository] = url.pathname.toLowerCase().split('/')
            return owner === 'posthog' && privateRepositories.has(repository)
        }
        default:
            return false
    }
}

module.exports = { isPrivateUrl }
