// Redirects aged-out SDK reference URLs to the unversioned "latest" page.
//
// Only the newest MAX_VERSIONS_PER_SDK versions are built (gatsby/sourceNodes.ts), so versioned
// URLs 404 forever once they age out, and AI assistants keep requesting them long after.
//
// Wired up as a `rewrites` entry in vercel.json, not `redirects`: Vercel checks the filesystem
// before rewrites, so this only runs when nothing was built at the requested path — the versioned
// pages that do still exist are served normally.
import { SUPPORTED_SDK_IDS, VERSION_PLACEHOLDER } from '../src/components/SdkReferences/utils'

// `<sdk>-<version>`, where version is a semver, `latest`, or the placeholder we used to leak.
const VERSIONED_SLUG = new RegExp(`^(posthog-[a-z-]+)-(\\d[\\w.+-]*|latest|${VERSION_PLACEHOLDER})$`)

const MARKDOWN_SUFFIX = '.md'

/** Type ids are source identifiers, occasionally dotted (e.g. `PostHogConfig.PostHogDataMode`). */
const TYPE_ID = /^[\w$.-]+$/

const isSupportedSdk = (id: string): boolean => (SUPPORTED_SDK_IDS as readonly string[]).includes(id)

const stripMarkdown = (value: string): string =>
    value.endsWith(MARKDOWN_SUFFIX) ? value.slice(0, -MARKDOWN_SUFFIX.length) : value

/** Maps a requested reference path to the page it should land on, or null to 404. */
export const resolveReferenceRedirect = (rawSlug: string, rawType?: string): string | null => {
    // The extension is on whichever segment came last.
    const wantsMarkdown = rawType ? rawType.endsWith(MARKDOWN_SUFFIX) : rawSlug.endsWith(MARKDOWN_SUFFIX)
    const slug = stripMarkdown(rawSlug)
    const stripped = rawType ? stripMarkdown(rawType) : undefined
    // Anything else never named a type page, and this value ends up in a Location header.
    const type = stripped && TYPE_ID.test(stripped) ? stripped : undefined

    const versioned = VERSIONED_SLUG.exec(slug)
    const sdk = versioned ? versioned[1] : slug

    // Fail closed on unknown SDKs rather than redirecting into another 404.
    if (!isSupportedSdk(sdk)) {
        return null
    }

    // A versioned type URL has an unversioned twin worth trying; an unversioned one that got here
    // has no page at all, so fall back to the SDK's reference page.
    const target = versioned && type ? `/docs/references/${sdk}/types/${type}` : `/docs/references/${sdk}`

    // Never redirect a path to itself. This also bounds the versioned-type case to two hops:
    // `<sdk>-1.2.3/types/Gone` -> `<sdk>/types/Gone` -> `<sdk>`, then it 404s instead of looping.
    const requested = `/docs/references/${slug}${type ? `/types/${type}` : ''}`
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

    // These URLs are permanently gone, so let the edge absorb the volume.
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400')
    res.setHeader('Location', target)
    return res.status(301).end()
}

export default handler
