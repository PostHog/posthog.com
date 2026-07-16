import {
    appendVariantCookies,
    evaluateSiteExperimentVariant,
    getRewriteUrl,
    getSiteExperimentConfig,
    isBot,
    shouldRewriteToExperiment,
    shouldRunSiteExperiment,
} from './src/lib/siteExperimentMiddleware'

// Site-wide A/B experiments: /handbook/engineering/posthog-com/site-experiments

// Runs on all paths except /api/* — static assets must pass through so test
// users rewrite to the experimental deployment (hashed filenames differ per build).
// A short-TTL routing cookie avoids a /flags call on every sub-resource.
export const config = {
    matcher: ['/((?!api/).*)'],
}

function passThrough(): Response {
    return new Response(null, {
        headers: {
            'x-middleware-next': '1',
        },
    })
}

function rewriteTo(url: URL): Response {
    return new Response(null, {
        headers: {
            'x-middleware-rewrite': url.toString(),
        },
    })
}

export default async function middleware(request: Request): Promise<Response> {
    const url = new URL(request.url)

    if (!shouldRunSiteExperiment(url.pathname)) {
        return passThrough()
    }

    const experimentConfig = getSiteExperimentConfig()
    if (!experimentConfig?.enabled) {
        return passThrough()
    }

    if (isBot(request.headers.get('user-agent'))) {
        return passThrough()
    }

    const assignment = await evaluateSiteExperimentVariant(request, experimentConfig)

    if (!shouldRewriteToExperiment(assignment.variant)) {
        const response = passThrough()
        return appendVariantCookies(response, request, experimentConfig, assignment)
    }

    const rewriteTarget = getRewriteUrl(request, experimentConfig.deploymentUrl)
    const response = rewriteTo(rewriteTarget)
    return appendVariantCookies(response, request, experimentConfig, assignment)
}
