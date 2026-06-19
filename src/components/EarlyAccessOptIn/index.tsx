import React from 'react'
import OSButton from 'components/OSButton'

/**
 * Which stage the early access feature is in, which drives the call to action:
 * - `register_interest` — we're gathering interest before the beta opens ("concept" stage).
 * - `request_access` — the beta is open and people can ask to join ("beta" stage).
 */
export type EarlyAccessState = 'register_interest' | 'request_access'

const DEFAULT_LABELS: Record<EarlyAccessState, string> = {
    register_interest: 'Register interest',
    request_access: 'Get early access',
}

export interface EarlyAccessOptInProps {
    /**
     * URL of the early access feature in the PostHog app (e.g. an
     * `/early_access_features/{id}` page). This MUST point at the app, not a local
     * enrollment call: logins are not shared between posthog.com and the app, so the
     * visitor's website identity is anonymous and enrolling it here would be meaningless.
     * The signed-in user opts into the beta in the app instead.
     */
    to: string
    /**
     * The early access stage, which sets the default CTA copy. Defaults to `request_access`.
     */
    state?: EarlyAccessState
    /** Override the CTA copy. Defaults to the label for `state`. */
    label?: string
    /** Optional extra classes for the button. */
    className?: string
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

/**
 * A small opt-in button for a PostHog early access feature.
 *
 * Deliberately a *link* to the app rather than a local `posthog.updateEarlyAccessFeatureEnrollment`
 * call. posthog.com and the PostHog app do not share identity, so the person we'd enrol from the
 * marketing site is not the logged-in user we care about. Linking to the early access feature in the
 * app lets the right (signed-in) user join the beta. Don't re-add local enrollment here.
 */
export default function EarlyAccessOptIn({
    to,
    state = 'request_access',
    label,
    className = '',
    size = 'md',
}: EarlyAccessOptInProps): JSX.Element {
    return (
        <OSButton variant="primary" size={size} asLink external to={to} className={className}>
            {label || DEFAULT_LABELS[state]}
        </OSButton>
    )
}
