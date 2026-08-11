import { buildWizardCommand } from 'components/PlatformInstall/buildCommand'

import { ScoutSpec } from './types'

/**
 * Builds the `#createScout=` deep link that prefills PostHog's "Create a scout" modal, with the
 * payload in the fragment so it never reaches logs. Mirrors the app's `scoutTemplateDeepLink.ts`.
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
 * A SKILL.md's body, for the app's Instructions field. Stripped here rather than at the query
 * because the page itself renders the complete file.
 */
export function scoutInstructions(raw?: string): string {
    if (!raw) {
        return ''
    }
    const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/)
    return (match ? raw.slice(match[0].length) : raw).trim()
}

/** Falls back to the bare inbox URL – landing on the troop beats a broken payload. */
export function buildScoutDeepLink(scout?: ScoutSpec): string {
    if (!scout?.name || !scout?.description) {
        return INBOX_CONFIG_URL
    }

    const body = scoutInstructions(scout.raw)

    const payload = base64UrlEncode(
        JSON.stringify({
            name: scout.name,
            description: scout.description,
            ...(body ? { body } : {}),
            // Attribution for the app's scout-created capture; older decoders ignore unknown fields.
            source: 'pocket_guide',
        })
    )

    return `${INBOX_CONFIG_URL}#createScout=${payload}`
}

/**
 * The command that sets up self-driving. Delegates to `buildWizardCommand` so the display stays
 * clean and the copy stays pinned, matching every other wizard command on the site.
 */
export function buildSelfDrivingCommand(): { displayCommand: string; copyCommand: string } {
    return buildWizardCommand({ subcommand: 'self-driving' })
}
