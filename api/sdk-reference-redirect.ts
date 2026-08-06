/**
 * Fallback for SDK reference URLs that no longer exist, redirecting them to the
 * unversioned "latest" page.
 *
 * Only the newest MAX_VERSIONS_PER_SDK versions per SDK are built (see
 * gatsby/sourceNodes.ts), which for fast-moving SDKs is a week or two of releases.
 * Every versioned URL older than that 404s forever, and AI assistants and search
 * engines keep requesting them long after — they were the single largest source of
 * 404s on the site.
 *
 * Wired up as a `rewrites` entry in vercel.json, not `redirects`: Vercel checks the
 * filesystem before rewrites, so this only runs when nothing was built at the
 * requested path. The versioned pages that do still exist are served normally.
 *
 * Handles: `/docs/references/<sdk>-<version>`, its `/types/<Type>` children, and the
 * `.md` sibling of either.
 */
import { SUPPORTED_SDK_IDS } from '../src/components/SdkReferences/utils'

/**
 * `<sdk>-<version>`, where version is a semver, `latest`, or the literal `<version>`
 * placeholder the pinned latest row used to leak into type crosslinks.
 */
const VERSIONED_SLUG = /^(posthog-[a-z-]+)-(\d[\w.+-]*|latest|<version>)$/

const MARKDOWN_SUFFIX = '.md'

const isSupportedSdk = (id: string): boolean => (SUPPORTED_SDK_IDS as readonly string[]).includes(id)

const stripMarkdown = (value: string): string =>
    value.endsWith(MARKDOWN_SUFFIX) ? value.slice(0, -MARKDOWN_SUFFIX.length) : value

/**
 * Map a requested reference path to the unversioned page it should land on, or null to
 * let the request 404.
 */
export const resolveReferenceRedirect = (rawSlug: string, rawType?: string): string | null => {
    // The extension is on whichever segment came last.
    const wantsMarkdown = rawType ? rawType.endsWith(MARKDOWN_SUFFIX) : rawSlug.endsWith(MARKDOWN_SUFFIX)
    const slug = stripMarkdown(rawSlug)
    const type = rawType ? stripMarkdown(rawType) : undefined

    const versioned = VERSIONED_SLUG.exec(slug)
    const sdk = versioned ? versioned[1] : slug

    // Fail closed on anything that isn't a known SDK, rather than redirecting into
    // another 404.
    if (!isSupportedSdk(sdk)) {
        return null
    }

    // A versioned type URL has an unversioned twin worth trying. An unversioned one
    // that reached this function has no page at all (the type carries no properties or
    // example, so createPages skipped it), so fall back to the SDK's reference page.
    const target = versioned && type ? `/docs/references/${sdk}/types/${type}` : `/docs/references/${sdk}`

    const requested = `/docs/references/${slug}${type ? `/types/${type}` : ''}`
    // Never redirect a path to itself — that would loop. This also bounds the
    // versioned-type case to two hops: `<sdk>-1.2.3/types/Gone` -> `<sdk>/types/Gone`
    // -> `<sdk>`, and the third would be a self-redirect, so it 404s instead.
    if (target === requested) {
        return null
    }

    return wantsMarkdown ? `${target}${MARKDOWN_SUFFIX}` : target
}

const handler = async (req: any, res: any) => {
    const { slug, type } = req.query
    const target =
        typeof slug === 'string' ? resolveReferenceRedirect(slug, typeof type === 'string' ? type : undefined) : null

    if (!target) {
        // Short cache: an unknown SDK today may ship docs tomorrow.
        res.setHeader('Cache-Control', 'public, max-age=60, s-maxage=600')
        return res.status(404).send('Not found')
    }

    // These URLs are permanently gone, and the volume is high enough that it's worth
    // letting the edge absorb it.
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400')
    res.setHeader('Location', target)
    return res.status(301).end()
}

export default handler
