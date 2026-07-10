import React from 'react'

import { IconEye, IconFlag, IconMagic, IconRocket, IconWarning } from '@posthog/icons'
import OSButton from 'components/OSButton'
import WizardCommand from 'components/WizardCommand'
import ManualFallback from './ManualFallback'

export type DropErrorCode =
    | 'github_denied'
    | 'github_auth'
    | 'grant_exchange'
    | 'email_unavailable'
    | 'grant_expired'
    | 'resume_expired'
    | 'install_timeout'
    | 'no_repos'
    | 'fetch_failed'
    | 'consent_denied'
    | 'consent_failed'
    | 'provisioning_failed'
    | 'rate_limited'
    | 'unknown'

type ErrorSpec = {
    message: string
    /** Restartable errors offer "Connect GitHub" again; terminal ones lead with the fallback. */
    restartable: boolean
}

/**
 * Mirrors the "Error handling on posthog.com" table in wizard-drop-rfc.md. Every code gets the
 * manual-signup fallback; only restartable ones also get a fresh "Connect GitHub" action.
 */
const ERRORS: Record<DropErrorCode, ErrorSpec> = {
    github_denied: { message: 'GitHub authorization was cancelled, so we stopped there.', restartable: true },
    github_auth: { message: "We couldn't complete the GitHub connection.", restartable: true },
    grant_exchange: { message: "We couldn't finish connecting your GitHub account.", restartable: true },
    email_unavailable: {
        // 502 from github/grants: the GitHub App is missing the email-read permission (our
        // misconfiguration). Reconnecting won't help, so this is terminal + manual fallback.
        message:
            "Something went wrong on our end while connecting GitHub. Please use the manual setup below. We're on it.",
        restartable: false,
    },
    grant_expired: { message: 'Your GitHub connection expired. Reconnecting only takes a click.', restartable: true },
    resume_expired: {
        message: 'This session expired before we could finish. Reconnecting only takes a click.',
        restartable: true,
    },
    install_timeout: {
        message:
            "We couldn't detect the GitHub App installation. If you finished installing it, reconnect and we'll pick it up.",
        restartable: true,
    },
    no_repos: {
        message:
            "The installation doesn't grant access to any repositories. Re-install the app and select at least one repository.",
        restartable: true,
    },
    fetch_failed: { message: "We couldn't load your repositories.", restartable: true },
    consent_denied: {
        message:
            'No changes were made to your PostHog account. You can also log in and connect GitHub from onboarding.',
        restartable: false,
    },
    consent_failed: {
        message: "We couldn't complete authorization with your existing PostHog account. No changes were made.",
        restartable: false,
    },
    provisioning_failed: { message: "We couldn't create your account automatically.", restartable: false },
    rate_limited: { message: "We're getting a lot of requests right now.", restartable: false },
    unknown: { message: 'Something went wrong.', restartable: false },
}

export function ErrorPanel({
    code,
    retryAfter,
    onConnect,
    onRetry,
}: {
    code: string
    retryAfter?: number
    onConnect: () => void
    /** Inline retry for transient repo-list failures (doesn't restart the whole flow). */
    onRetry?: () => void
}): JSX.Element {
    const spec = ERRORS[(code in ERRORS ? code : 'unknown') as DropErrorCode]
    return (
        <div>
            <p className="flex items-center gap-2.5 font-semibold text-red dark:text-yellow mb-1">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-red text-white dark:bg-yellow dark:text-black">
                    <IconWarning className="size-4" />
                </span>
                <span>{spec.message}</span>
            </p>
            {code === 'rate_limited' && retryAfter ? (
                <p className="text-sm opacity-70 mb-3">Try again in about {Math.ceil(retryAfter / 60)} minute(s).</p>
            ) : null}
            <div className="flex gap-2 items-center">
                {code === 'fetch_failed' && onRetry ? (
                    <OSButton variant="primary" size="md" onClick={onRetry}>
                        Try again
                    </OSButton>
                ) : spec.restartable ? (
                    <OSButton variant="primary" size="md" onClick={onConnect}>
                        Connect GitHub
                    </OSButton>
                ) : null}
            </div>
            <ManualFallback prominent={!spec.restartable} />
        </div>
    )
}

export function SuccessPanel({ email }: { email?: string }): JSX.Element {
    return (
        <div>
            <p className="font-semibold mb-1">🎉 You're all set. A pull request is on its way.</p>
            <p className="text-sm mb-0">
                We created your PostHog account and the wizard is instrumenting your repository in the background. A
                pull request will appear on your repo shortly, and we've emailed
                {email ? <strong> {email}</strong> : ' you'} a link to set your password.
            </p>

            <div className="mt-4 pt-4 border-t border-border">
                <p className="flex items-center gap-1.5 font-semibold mb-1">
                    <IconRocket className="size-5 text-red shrink-0" />
                    While you wait, make your product self-driving
                </p>
                <p className="text-sm opacity-80 mb-3">
                    Once PostHog is capturing events, it doesn't stop at dashboards. It watches your product and ships
                    improvements for you to review.
                </p>
                <ul className="list-none m-0 p-0 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                        <IconEye className="size-5 shrink-0 text-blue" />
                        <span>
                            <strong>Scouts</strong> watch your product data and surface what actually matters.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <IconMagic className="size-5 shrink-0 text-purple" />
                        <span>
                            <strong>Agents</strong> investigate each report, draft a fix, and open a pull request.
                        </span>
                    </li>
                    <li className="flex items-start gap-2">
                        <IconFlag className="size-5 shrink-0 text-green" />
                        <span>
                            You <strong>review and merge</strong> from your inbox, then PostHog measures the result and
                            learns from it.
                        </span>
                    </li>
                </ul>
                <div className="mt-4">
                    <OSButton variant="primary" size="md" asLink to="/docs/self-driving" state={{ newWindow: true }}>
                        Explore self-driving
                    </OSButton>
                </div>
            </div>
        </div>
    )
}

/**
 * The account exists but no wizard run does, so deliberately NO signup link here (a fresh signup
 * with the same email would bounce into the existing-user path).
 */
export function DegradedPanel(): JSX.Element {
    return (
        <div>
            <p className="flex items-center gap-2.5 font-semibold mb-1">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-yellow text-black">
                    <IconWarning className="size-4" />
                </span>
                <span>Your account is ready, but we couldn't open the pull request.</span>
            </p>
            <p className="text-sm mb-3">
                Check your email for a link to access your new PostHog account (existing accounts: just log in), then
                run the wizard locally to finish the setup:
            </p>
            <WizardCommand slim />
        </div>
    )
}

export function ExistingUserPanel({ onContinue }: { onContinue: () => void }): JSX.Element {
    return (
        <div>
            <p className="font-semibold mb-1">Looks like you already have a PostHog account.</p>
            <p className="text-sm mb-3">
                We'll send you to PostHog to log in and approve connecting this repository to one of your projects.
                Nothing changes until you approve.
            </p>
            <OSButton variant="primary" size="md" onClick={onContinue}>
                Continue to PostHog
            </OSButton>
        </div>
    )
}
