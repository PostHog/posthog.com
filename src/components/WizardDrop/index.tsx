import React, { useCallback, useEffect, useRef, useState } from 'react'

import { IconSpinner } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { useActiveFeatureFlags } from '../../hooks/useActiveFeatureFlags'
import usePostHog from '../../hooks/usePostHog'
import type {
    GrantRepository,
    ProvisionApiResponse,
    ReposApiResponse,
    SessionResponse,
} from '../../lib/wizard-drop/types'
import ManualFallback from './ManualFallback'
import RepoPicker from './RepoPicker'
import { DegradedPanel, ErrorPanel, ExistingUserPanel, SuccessPanel } from './states'

const FEATURE_FLAG = 'wizard-drop'
/** Local/dev bypass for the flag gate: `localStorage.setItem('wizard-drop-preview', '1')`. */
const PREVIEW_STORAGE_KEY = 'wizard-drop-preview'

const INSTALL_POLL_INTERVAL_MS = 5000
const INSTALL_POLL_TIMEOUT_MS = 5 * 60 * 1000

type View =
    | { kind: 'loading' }
    | { kind: 'idle' }
    | { kind: 'connecting' }
    | { kind: 'awaiting_install'; installUrl: string }
    | { kind: 'ready'; repositories: GrantRepository[]; installationId: number }
    | { kind: 'provisioning'; repositories: GrantRepository[]; installationId: number }
    | { kind: 'existing_user'; url: string }
    | { kind: 'success' }
    | { kind: 'degraded' }
    | { kind: 'error'; code: string; retryAfter?: number }

/**
 * The "drop" flow: connect GitHub → pick a repo → we provision a PostHog account and open an
 * instrumentation PR from a cloud wizard run. See README.md for the state diagram and
 * wizard-drop-rfc.md (repo root) for the architecture. All server work happens in the
 * /api/wizard/* Gatsby Functions; this component is a state machine over their responses.
 */
export default function WizardDrop(): JSX.Element | null {
    const posthog = usePostHog()
    const flags = useActiveFeatureFlags()
    const [view, setView] = useState<View>({ kind: 'loading' })
    const [identity, setIdentity] = useState<{ ghLogin?: string; email?: string }>({})
    const [selectedRepo, setSelectedRepo] = useState<string | undefined>(undefined)
    const initialized = useRef(false)
    const wasAwaitingInstall = useRef(false)

    const preview = typeof window !== 'undefined' && window.localStorage?.getItem(PREVIEW_STORAGE_KEY) === '1'
    const enabled = !!flags?.includes(FEATURE_FLAG) || preview

    const capture = useCallback(
        (event: string, properties?: Record<string, unknown>) => {
            posthog?.capture?.(event, properties)
        },
        [posthog]
    )

    const toError = useCallback(
        (code: string, retryAfter?: number) => {
            capture('wizard drop errored', { code })
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
            capture('wizard drop install detected')
            wasAwaitingInstall.current = false
        }
        capture('wizard drop repo selected', {
            repo_count: data.repositories.length,
            auto: data.repositories.length === 1,
        })
        setSelectedRepo(data.repositories.length === 1 ? data.repositories[0].full_name : undefined)
        setView({ kind: 'ready', repositories: data.repositories, installationId: data.installation_id })
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
            if (justConnected) capture('wizard drop github connected')
            await loadRepos()
        },
        [capture, loadRepos]
    )

    // Entry point: interpret redirect params from the API functions, then resume or start fresh.
    useEffect(() => {
        if (!enabled || initialized.current) return
        initialized.current = true
        capture('wizard drop viewed')

        const params = new URLSearchParams(window.location.search)
        const drop = params.get('drop')
        const code = params.get('code')
        if (drop) {
            params.delete('drop')
            params.delete('code')
            const query = params.toString()
            window.history.replaceState(
                {},
                '',
                window.location.pathname + (query ? `?${query}` : '') + window.location.hash
            )
        }
        if (drop === 'done') {
            capture('wizard drop provision succeeded', { via: 'consent' })
            setView({ kind: 'success' })
        } else if (drop === 'degraded') {
            capture('wizard drop provision degraded', { via: 'consent' })
            setView({ kind: 'degraded' })
        } else if (drop === 'error') {
            toError(code || 'unknown')
        } else {
            void checkSession(drop === 'connected')
        }
    }, [enabled, capture, checkSession, toError])

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
        capture('wizard drop github connect clicked')
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
        setView({ kind: 'idle' })
    }, [])

    const provision = useCallback(async () => {
        if (view.kind !== 'ready' || !selectedRepo) return
        capture('wizard drop provision clicked', { repository: selectedRepo })
        setView({ ...view, kind: 'provisioning' })
        let data: ProvisionApiResponse
        try {
            data = await fetch('/api/wizard/provision', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ installation_id: view.installationId, repository: selectedRepo }),
            }).then((res) => res.json())
        } catch {
            toError('provisioning_failed')
            return
        }
        if (data.status === 'success') {
            capture('wizard drop provision succeeded')
            setView({ kind: 'success' })
        } else if (data.status === 'degraded') {
            capture('wizard drop provision degraded')
            setView({ kind: 'degraded' })
        } else if (data.status === 'requires_auth') {
            setView({ kind: 'existing_user', url: data.url })
        } else {
            toError(data.code ?? 'provisioning_failed', 'retry_after' in data ? data.retry_after : undefined)
        }
    }, [view, selectedRepo, capture, toError])

    const continueAsExistingUser = useCallback(() => {
        if (view.kind !== 'existing_user') return
        capture('wizard drop existing user redirected')
        window.location.assign(view.url)
    }, [view, capture])

    if (!enabled) return null

    return (
        <div className="not-prose border border-border rounded-md p-5 bg-accent/40 my-6">
            <p className="text-sm font-semibold mb-2 opacity-70">New: skip the terminal</p>
            {view.kind === 'idle' || view.kind === 'connecting' ? (
                <div>
                    <p className="mb-3">
                        Don't even want to run one command? Connect GitHub, pick a repository, and we'll do the rest in
                        the cloud: create your PostHog account, instrument your code, and open a pull request — you just
                        review and merge.
                    </p>
                    <OSButton variant="primary" size="md" onClick={connect} disabled={view.kind === 'connecting'}>
                        {view.kind === 'connecting' ? (
                            <>
                                <IconSpinner className="size-4 animate-spin" /> Redirecting to GitHub…
                            </>
                        ) : (
                            'Connect GitHub'
                        )}
                    </OSButton>
                </div>
            ) : view.kind === 'loading' ? (
                <p className="flex items-center gap-2 text-sm opacity-70 mb-0">
                    <IconSpinner className="size-4 animate-spin" /> Loading…
                </p>
            ) : view.kind === 'awaiting_install' ? (
                <div>
                    <p className="mb-3">
                        Almost there — install the PostHog GitHub App and choose which repository we can open a pull
                        request on. We'll pick it up here automatically.
                    </p>
                    <div className="flex items-center gap-3">
                        <OSButton
                            variant="primary"
                            size="md"
                            onClick={() => {
                                capture('wizard drop install opened')
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
                        Connected as <strong>{identity.ghLogin}</strong>
                        {identity.email ? <span className="opacity-70"> ({identity.email})</span> : null}.{' '}
                        {view.repositories.length === 1
                            ? 'We found one repository:'
                            : 'Pick the repository to instrument:'}
                    </p>
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
                            disabled={!selectedRepo || view.kind === 'provisioning'}
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
                <SuccessPanel email={identity.email} />
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
            {view.kind === 'idle' || view.kind === 'connecting' ? <ManualFallback /> : null}
        </div>
    )
}
