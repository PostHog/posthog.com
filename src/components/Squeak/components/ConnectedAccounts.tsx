import React, { useState } from 'react'
import { CallToAction } from 'components/CallToAction'
import { Logo } from '@posthog/brand/logo'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../../context/Toast'
import { SQUEAK_HOST } from 'lib/strapi'
import { isPostHogEmail } from 'lib/employee'
import { IconCheck } from '@posthog/icons'

// Account-settings section for linking/unlinking PostHog OAuth.
//  - Employee accounts (provider 'posthog') are OAuth-only: shown connected,
//    disconnect disabled (the backend refuses to unlink a passwordless account).
//  - Community accounts (provider 'local') can connect (additive, keeps password)
//    and disconnect freely.
const ConnectedAccounts: React.FC<{ hideHeading?: boolean; stacked?: boolean }> = ({
    hideHeading = false,
    stacked = false,
}) => {
    const { user, unlinkProvider } = useUser()
    const { addToast } = useToast()
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState<string | null>(null)

    if (!user) return null

    // Employee status is the email domain, NOT the provider — a community member
    // who created their account via OAuth also has provider 'posthog' but is not an
    // employee.
    const isEmployee = isPostHogEmail(user.email)
    // Accounts with no password (employees AND OAuth-created community accounts)
    // can't disconnect — it would lock them out. provider 'local' means a password
    // exists, so a linked local account is the only safely-disconnectable case.
    const isOAuthOnly = user.provider === 'posthog'
    const isLinked = isOAuthOnly || !!user.hasPosthogLogin

    const handleConnect = () => {
        // The OAuth redirect page reads this intent and links to the current
        // account (rather than starting a fresh sign-in).
        localStorage.setItem('posthog_oauth_intent', 'link')
        window.location.href = `${SQUEAK_HOST}/api/connect/posthog`
    }

    const handleDisconnect = async () => {
        setBusy(true)
        setError(null)
        const res = await unlinkProvider()
        setBusy(false)
        if ('error' in res) {
            setError(res.error || 'Could not disconnect PostHog.')
            return
        }
        addToast({ title: 'PostHog login disconnected', description: 'You can reconnect anytime.' })
    }

    return (
        <div data-scheme="primary" className="space-y-2">
            {!hideHeading && <h2>Connected accounts</h2>}
            <div className={`flex gap-3 @container ${stacked ? 'flex-col' : 'items-center justify-between'}`}>
                <div className="flex items-center gap-3 min-w-0">
                    <div className="flex items-center justify-center size-10 shrink-0 rounded border border-primary bg-primary">
                        <Logo layout="logomark" className="h-5 w-auto" />
                    </div>
                    <div className="min-w-0">
                        <p className="m-0 font-semibold leading-tight">PostHog</p>
                        <p className="m-0 text-sm text-muted">
                            {isLinked ? 'Sign in with your PostHog account' : 'Connect to sign in with PostHog'}
                        </p>
                    </div>
                </div>
                <div className={`flex items-center gap-2 ${stacked ? 'justify-between' : 'shrink-0'}`}>
                    {isLinked && (
                        <span
                            className="inline-flex items-center gap-1 rounded-full border border-green/30 bg-green/10 px-2 py-0.5 text-sm font-semibold text-green"
                            title={isOAuthOnly && !isEmployee ? 'Set a password to disconnect' : undefined}
                        >
                            <IconCheck className="size-3.5" />
                            Connected
                        </span>
                    )}
                    {!isLinked ? (
                        <CallToAction type="secondary" size="sm" onClick={handleConnect}>
                            Connect
                        </CallToAction>
                    ) : isEmployee ? (
                        <span className="text-sm text-muted" title="Required for PostHog employees">
                            Required
                        </span>
                    ) : !isOAuthOnly ? (
                        <button
                            type="button"
                            disabled={busy}
                            onClick={handleDisconnect}
                            className="text-red dark:text-yellow text-sm font-bold disabled:opacity-50"
                        >
                            Disconnect
                        </button>
                    ) : null}
                </div>
            </div>
            {error && <p className="text-red text-sm font-bold m-0">{error}</p>}
        </div>
    )
}

export default ConnectedAccounts
