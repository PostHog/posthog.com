import React, { useCallback, useEffect, useRef, useState } from 'react'

import { IconSpinner } from '@posthog/icons'
import OSButton from 'components/OSButton'
import WizardCommand from 'components/WizardCommand'
import { getLogo } from '../../constants/logos'
import usePostHog from '../../hooks/usePostHog'
import type { GrantRepository, ProvisionApiResponse, ReposApiResponse, SessionResponse } from '../../lib/wizard/types'
import RepoPicker from './RepoPicker'
import { DegradedPanel, ErrorPanel, ExistingUserPanel, SuccessPanel } from './states'

const INSTALL_POLL_INTERVAL_MS = 5000
const INSTALL_POLL_TIMEOUT_MS = 5 * 60 * 1000

/** Lightweight client-side sanity check; the provisioning API is the authoritative validator. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** GitHub's mark: a black glyph that reads correctly on the orange primary button in both themes. */
const GitHubMark = (): JSX.Element => (
    <img src={getLogo('github')} alt="" aria-hidden="true" className="w-full h-full" />
)

/**
 * The active-flow steps (install, repo picker, outcomes) render in this subtle inset panel so their
 * form controls stay legible on the hero's textured background. The idle CTA deliberately sits
 * inline on the hero instead, so the provisioning flow is part of the hero, not a box beneath it.
 *
 * The `tone` recolors the whole panel border so failure states read as failures at a glance rather
 * than blending into the neutral panel: `error` (hard failure) and `warning` (degraded/partial
 * success). The fill stays neutral (a colored wash clashes with the hero's tan texture); the framed
 * border plus the badged icon/heading inside carry the signal. Red doesn't read well on dark, so we
 * swap to yellow there, following the repo convention.
 */
function FlowPanel({
    children,
    tone = 'default',
}: {
    children: React.ReactNode
    tone?: 'default' | 'error' | 'warning'
}): JSX.Element {
    const toneBorder = {
        default: 'border-border',
        error: 'border-red/40 dark:border-yellow/40',
        warning: 'border-yellow/50',
    }[tone]
    return (
        <div
            className={`not-prose mt-4 rounded-md border ${toneBorder} bg-white/70 dark:bg-accent-dark/70 backdrop-blur-sm p-4 max-w-xl text-left mx-auto @lg:mx-0`}
        >
            {children}
        </div>
    )
}

type View =
    | { kind: 'loading' }
    | { kind: 'idle' }
    | { kind: 'connecting' }
    | { kind: 'awaiting_install'; installUrl: string }
    | { kind: 'ready'; repositories: GrantRepository[] }
    | { kind: 'provisioning'; repositories: GrantRepository[] }
    | { kind: 'existing_user'; url: string }
    | { kind: 'success' }
    | { kind: 'degraded' }
    | { kind: 'error'; code: string; retryAfter?: number }

/**
 * The provisioning flow, rendered inside the wizard hero: connect GitHub → pick a repo → we provision a
 * PostHog account and open an instrumentation PR from a cloud wizard run. See README.md for the
 * state diagram and wizard-provisioning-rfc.md (repo root) for the architecture. All server work happens in
 * the /api/wizard/* Gatsby Functions; this component is a state machine over their responses.
 *
 * The `posthog-com-wizard-provisioning` experiment gate lives in the hero (`useWizardProvisioningEnabled`), which mounts this
 * component only for the `test` variant, so this component assumes it's enabled and never self-hides.
 */
export default function WizardProvisioning(): JSX.Element {
    const posthog = usePostHog()
    const [view, setView] = useState<View>({ kind: 'loading' })
    const [identity, setIdentity] = useState<{ ghLogin?: string; email?: string }>({})
    const [selectedRepo, setSelectedRepo] = useState<string | undefined>(undefined)
    // Editable account email, always shown, defaulted to whatever GitHub gave us (may be empty
    // if the GitHub account exposes no verified email). The provision call sends this value.
    const [email, setEmail] = useState('')
    const initialized = useRef(false)
    const wasAwaitingInstall = useRef(false)

    const capture = useCallback(
        (event: string, properties?: Record<string, unknown>) => {
            posthog?.capture?.(event, properties)
        },
        [posthog]
    )

    const toError = useCallback(
        (code: string, retryAfter?: number) => {
            capture('wizard errored', { code })
            setView({ kind: 'error', code, retryAfter })
        },
        [capture]
    )

    const loadRepos = useCallback(async (): Promise<void> => {
        let data: ReposApiResponse
        try {
            data = await fetch('/api/wizard/repos').then((res) => res.json())
        } catch {
            toError('fetch_failed')
            return
        }
        if ('error' in data) {
            if (data.error === 'not_connected') setView({ kind: 'idle' })
            else if (data.error === 'grant_expired') toError('grant_expired')
            else toError('fetch_failed')
            return
        }
        if (!data.installed) {
            const installUrl = data.install_url
            setView((prev) => (prev.kind === 'awaiting_install' ? prev : { kind: 'awaiting_install', installUrl }))
            return
        }
        if (data.repositories.length === 0) {
            toError('no_repos')
            return
        }
        if (wasAwaitingInstall.current) {
            capture('wizard install detected')
            wasAwaitingInstall.current = false
        }
        capture('wizard repo selected', {
            repo_count: data.repositories.length,
            auto: data.repositories.length === 1,
        })
        setSelectedRepo(data.repositories.length === 1 ? data.repositories[0].full_name : undefined)
        setView({ kind: 'ready', repositories: data.repositories })
    }, [capture, toError])

    const checkSession = useCallback(
        async (justConnected: boolean): Promise<void> => {
            setView({ kind: 'loading' })
            let session: SessionResponse
            try {
                session = await fetch('/api/wizard/session').then((res) => res.json())
            } catch {
                setView({ kind: 'idle' })
                return
            }
            if (!session.connected) {
                setView({ kind: 'idle' })
                return
            }
            setIdentity({ ghLogin: session.gh_login, email: session.email })
            if (justConnected) capture('wizard github connected')
            await loadRepos()
        },
        [capture, loadRepos]
    )

    // Entry point: interpret redirect params from the API functions, then resume or start fresh.
    useEffect(() => {
        if (initialized.current) return
        initialized.current = true
        capture('wizard viewed')

        const params = new URLSearchParams(window.location.search)
        const status = params.get('wizard')
        const code = params.get('code')
        if (status) {
            params.delete('wizard')
            params.delete('code')
            const query = params.toString()
            window.history.replaceState(
                {},
                '',
                window.location.pathname + (query ? `?${query}` : '') + window.location.hash
            )
        }
        if (status === 'done') {
            capture('wizard provision succeeded', { via: 'consent' })
            setView({ kind: 'success' })
        } else if (status === 'degraded') {
            capture('wizard provision degraded', { via: 'consent' })
            setView({ kind: 'degraded' })
        } else if (status === 'error') {
            toError(code || 'unknown')
        } else {
            void checkSession(status === 'connected')
        }
    }, [capture, checkSession, toError])

    // Default the editable email to GitHub's once it's known, without clobbering user edits.
    // Intentionally keyed only on identity.email (re-running on `email` would fight user edits).
    useEffect(() => {
        if (identity.email && !email) setEmail(identity.email)
    }, [identity.email])

    // Poll for the GitHub App installation while the user completes it in another tab.
    useEffect(() => {
        if (view.kind !== 'awaiting_install') return
        wasAwaitingInstall.current = true
        const startedAt = Date.now()
        const interval = setInterval(() => {
            if (Date.now() - startedAt > INSTALL_POLL_TIMEOUT_MS) {
                toError('install_timeout')
                return
            }
            void loadRepos()
        }, INSTALL_POLL_INTERVAL_MS)
        return () => clearInterval(interval)
    }, [view.kind, loadRepos, toError])

    const connect = useCallback(() => {
        capture('wizard github connect clicked')
        setView({ kind: 'connecting' })
        window.location.assign('/api/wizard/github-start')
    }, [capture])

    const startOver = useCallback(async () => {
        try {
            await fetch('/api/wizard/logout', { method: 'POST' })
        } catch {
            // Cookie clearing is best-effort; the UI resets regardless.
        }
        setIdentity({})
        setSelectedRepo(undefined)
        setEmail('')
        setView({ kind: 'idle' })
    }, [])

    const emailValid = EMAIL_RE.test(email.trim())

    const provision = useCallback(async () => {
        if (view.kind !== 'ready' || !selectedRepo || !emailValid) return
        // Each repo names its own installation; the run targets the one that owns the picked repo.
        const repo = view.repositories.find((r) => r.full_name === selectedRepo)
        if (!repo) return
        capture('wizard provision clicked', { repository: selectedRepo })
        setView({ ...view, kind: 'provisioning' })
        let data: ProvisionApiResponse
        try {
            data = await fetch('/api/wizard/provision', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    installation_id: repo.installation_id,
                    repository: selectedRepo,
                    email: email.trim(),
                }),
            }).then((res) => res.json())
        } catch {
            toError('provisioning_failed')
            return
        }
        if (data.status === 'success') {
            capture('wizard provision succeeded')
            setView({ kind: 'success' })
        } else if (data.status === 'degraded') {
            capture('wizard provision degraded')
            setView({ kind: 'degraded' })
        } else if (data.status === 'requires_auth') {
            setView({ kind: 'existing_user', url: data.url })
        } else {
            toError(data.code ?? 'provisioning_failed', 'retry_after' in data ? data.retry_after : undefined)
        }
    }, [view, selectedRepo, email, emailValid, capture, toError])

    const continueAsExistingUser = useCallback(() => {
        if (view.kind !== 'existing_user') return
        capture('wizard existing user redirected')
        window.location.assign(view.url)
    }, [view, capture])

    // Idle/connecting is the hero's primary call to action: the GitHub button leads, with the
    // terminal command demoted to a muted "prefer the terminal?" secondary. It sits inline on the
    // hero (no panel) so the provisioning flow reads as part of the hero rather than a box beneath it.
    if (view.kind === 'idle' || view.kind === 'connecting') {
        const connecting = view.kind === 'connecting'
        return (
            <div className="not-prose">
                <OSButton
                    variant="primary"
                    size="lg"
                    icon={connecting ? <IconSpinner className="w-full h-full animate-spin" /> : <GitHubMark />}
                    onClick={connect}
                    disabled={connecting}
                >
                    {connecting ? 'Redirecting to GitHub…' : 'Connect GitHub'}
                </OSButton>
                <div className="mt-4 flex flex-wrap items-center justify-center @lg:justify-start gap-x-2 gap-y-1 text-sm">
                    <span className="opacity-70 shrink-0">Prefer the terminal?</span>
                    <WizardCommand slim />
                </div>
            </div>
        )
    }

    const tone = view.kind === 'error' ? 'error' : view.kind === 'degraded' ? 'warning' : 'default'

    return (
        <FlowPanel tone={tone}>
            {view.kind === 'loading' ? (
                <p className="flex items-center gap-2 text-sm opacity-70 mb-0">
                    <IconSpinner className="size-4 animate-spin" /> Loading…
                </p>
            ) : view.kind === 'awaiting_install' ? (
                <div>
                    <p className="mb-3">
                        Almost there. Install the PostHog GitHub App and choose which repository we can open a pull
                        request on, and we'll pick it up here automatically.
                    </p>
                    <div className="flex flex-col @sm:flex-row @sm:items-center gap-3">
                        <OSButton
                            variant="primary"
                            size="md"
                            icon={<GitHubMark />}
                            onClick={() => {
                                capture('wizard install opened')
                                window.open(view.installUrl, '_blank', 'noopener')
                            }}
                        >
                            Install the GitHub App
                        </OSButton>
                        <span className="flex items-center gap-2 text-sm opacity-70">
                            <IconSpinner className="size-4 animate-spin" /> Waiting for the installation…
                        </span>
                    </div>
                </div>
            ) : view.kind === 'ready' || view.kind === 'provisioning' ? (
                <div>
                    <p className="mb-3">
                        Connected as <strong>{identity.ghLogin}</strong>.{' '}
                        {view.repositories.length === 1
                            ? 'We found one repository:'
                            : 'Pick the repository to instrument:'}
                    </p>
                    <label className="block text-sm mb-3">
                        <span className="opacity-70">Email for your PostHog account</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={view.kind === 'provisioning'}
                            placeholder="you@company.com"
                            className="mt-1 block w-full max-w-sm rounded border border-border bg-white px-2 py-1.5 text-sm dark:bg-accent-dark"
                        />
                        <span className="mt-1 block text-xs opacity-60">
                            {identity.email
                                ? "Pulled from GitHub. Change it if you'd rather use a different address."
                                : "GitHub didn't share a verified email, so enter the one you'd like to use."}
                        </span>
                    </label>
                    <div className="flex flex-col @md:flex-row @md:items-center gap-3">
                        {view.repositories.length === 1 ? (
                            <code className="text-sm">{view.repositories[0].full_name}</code>
                        ) : (
                            <RepoPicker
                                repositories={view.repositories}
                                value={selectedRepo}
                                onChange={setSelectedRepo}
                                disabled={view.kind === 'provisioning'}
                            />
                        )}
                        <OSButton
                            variant="primary"
                            size="md"
                            onClick={provision}
                            disabled={!selectedRepo || !emailValid || view.kind === 'provisioning'}
                        >
                            {view.kind === 'provisioning' ? (
                                <>
                                    <IconSpinner className="size-4 animate-spin" /> Setting things up…
                                </>
                            ) : (
                                'Set up PostHog for me'
                            )}
                        </OSButton>
                    </div>
                    <button
                        className="text-xs underline opacity-60 hover:opacity-100 mt-3"
                        onClick={startOver}
                        disabled={view.kind === 'provisioning'}
                    >
                        Not you? Start over
                    </button>
                </div>
            ) : view.kind === 'existing_user' ? (
                <ExistingUserPanel onContinue={continueAsExistingUser} />
            ) : view.kind === 'success' ? (
                <SuccessPanel email={email.trim() || identity.email} />
            ) : view.kind === 'degraded' ? (
                <DegradedPanel />
            ) : (
                <ErrorPanel
                    code={view.code}
                    retryAfter={view.retryAfter}
                    onConnect={connect}
                    onRetry={() => {
                        setView({ kind: 'loading' })
                        void loadRepos()
                    }}
                />
            )}
        </FlowPanel>
    )
}
