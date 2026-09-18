import React, { useRef, useState } from 'react'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import Input from 'components/OSForm/input'
import Wizard from 'components/Wizard'
import { IconSpinner } from '@posthog/icons'

interface PostHogDisambiguationProps {
    pendingToken: string
    emailInUse: boolean
    onSuccess: () => void
}

// Shown on the OAuth landing page when a non-employee PostHog login matches no
// linked account: let them create a fresh community account, or prove ownership
// of an existing one (any email) and link it. When the OAuth email already maps
// to an account we skip straight to the link form.
const PostHogDisambiguation: React.FC<PostHogDisambiguationProps> = ({ pendingToken, emailInUse, onSuccess }) => {
    const { createWithProvider, linkExisting } = useUser()
    const [mode, setMode] = useState<'choose' | 'link'>(emailInUse ? 'link' : 'choose')
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [busy, setBusy] = useState(false)
    // Synchronous re-entrancy guard: the submit CallToAction fires both its onClick
    // AND the form's native submit in one click, so a state-based `busy` flag (async)
    // wouldn't block the second call — a ref set before any await does.
    const inFlight = useRef(false)

    const handleCreate = async () => {
        if (inFlight.current) return
        inFlight.current = true
        setBusy(true)
        setError(null)
        try {
            const res = await createWithProvider({ pendingToken })
            if (!res || 'error' in res) {
                return setError((res && 'error' in res && res.error) || 'Could not create your account.')
            }
            onSuccess()
        } finally {
            inFlight.current = false
            setBusy(false)
        }
    }

    const handleLink = async (e?: React.FormEvent) => {
        e?.preventDefault()
        if (inFlight.current) return
        inFlight.current = true
        setBusy(true)
        setError(null)
        try {
            const res = await linkExisting({ pendingToken, identifier, password })
            if (!res || 'error' in res) {
                return setError((res && 'error' in res && res.error) || 'Could not connect your account.')
            }
            onSuccess()
        } finally {
            inFlight.current = false
            setBusy(false)
        }
    }

    return (
        <div className="size-full">
            <Wizard
                leftNavigation={
                    mode === 'choose' ? (
                        <button
                            type="button"
                            className="text-sm text-red dark:text-yellow font-semibold"
                            onClick={() => setMode('link')}
                        >
                            I already have an account
                        </button>
                    ) : !emailInUse ? (
                        <button
                            type="button"
                            className="text-sm text-red dark:text-yellow font-semibold"
                            onClick={() => setMode('choose')}
                        >
                            Back
                        </button>
                    ) : undefined
                }
                rightNavigation={
                    mode === 'choose' ? (
                        <CallToAction type="primary" size="sm" disabled={busy} onClick={handleCreate}>
                            {busy ? <IconSpinner className="size-4 animate-spin my-0.5" /> : 'Create a new account'}
                        </CallToAction>
                    ) : (
                        <CallToAction type="primary" size="sm" disabled={busy} onClick={() => handleLink()}>
                            {busy ? <IconSpinner className="size-4 animate-spin my-0.5" /> : 'Log in and connect'}
                        </CallToAction>
                    )
                }
            >
                <div className="bg-accent px-6 py-5 flex-1">
                    <div data-scheme="primary">
                        {mode === 'choose' ? (
                            <>
                                <h3 className="text-base font-semibold leading-tight mb-2">Welcome to PostHog.com</h3>
                                <p className="text-sm mb-0">
                                    Create a new community account, or connect one you already have.
                                </p>
                            </>
                        ) : (
                            <>
                                <h3 className="text-base font-semibold leading-tight">Connect your existing account</h3>
                                <p className="text-sm mb-3">
                                    Log in to link PostHog sign-in to your posthog.com account.
                                </p>
                                <form onSubmit={handleLink} className="space-y-2">
                                    <Input
                                        label="Email"
                                        type="email"
                                        size="sm"
                                        direction="row"
                                        name="email"
                                        value={identifier}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setIdentifier(e.target.value)
                                        }
                                    />
                                    <Input
                                        label="Password"
                                        type="password"
                                        size="sm"
                                        direction="row"
                                        name="password"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                    <button type="submit" className="hidden" />
                                </form>
                            </>
                        )}
                        {error && <p className="text-red dark:text-yellow text-sm font-bold mt-2 mb-0">{error}</p>}
                    </div>
                </div>
            </Wizard>
        </div>
    )
}

export default PostHogDisambiguation
