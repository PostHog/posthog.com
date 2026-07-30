import { ScoutSpec } from './types'

/**
 * Builds the `#createScout=` deep link that opens PostHog's "Create a scout" modal with this
 * template prefilled.
 *
 * The payload is URL-safe base64 in the URL *fragment*, so it never reaches server logs. It
 * carries name, description, and instructions only — the app deliberately refuses to accept
 * scheduling or emit posture from a URL, and nothing is created until the user reviews the form
 * and submits it themselves.
 *
 * Mirrors the decoder in posthog/posthog at
 * `frontend/src/scenes/inbox/utils/scoutTemplateDeepLink.ts`. Keep the two in sync.
 */

const INBOX_CONFIG_URL = 'https://app.posthog.com/inbox/config'

/** URL-safe base64 of a UTF-8 string, padding stripped. */
function base64UrlEncode(value: string): string {
    const bytes = new TextEncoder().encode(value)
    let binary = ''
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte)
    })
    // btoa is browser-only; this module is imported by components that render at build time,
    // so fall back to Buffer when there's no window.
    const base64 = typeof btoa === 'function' ? btoa(binary) : Buffer.from(value, 'utf-8').toString('base64')
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/**
 * Returns the full deep link, or the bare inbox config URL when the template has no scout spec
 * — landing on the scout troop is a reasonable degrade, and better than a broken payload.
 */
export function buildScoutDeepLink(scout?: ScoutSpec): string {
    if (!scout?.name || !scout?.description) {
        return INBOX_CONFIG_URL
    }

    const payload = base64UrlEncode(
        JSON.stringify({
            name: scout.name,
            description: scout.description,
            ...(scout.body ? { body: scout.body } : {}),
        })
    )

    return `${INBOX_CONFIG_URL}#createScout=${payload}`
}

/**
 * The command that sets up self-driving from scratch. Kept here as a single source so swapping
 * in a future per-template command (`npx @posthog/wizard template <name>`) is a one-line change.
 */
export function buildWizardCommand(): string {
    return 'npx -y @posthog/wizard@latest self-driving'
}
