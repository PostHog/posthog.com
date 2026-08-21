import React, { useEffect, useRef, useState } from 'react'
import { navigate } from 'gatsby'
import SEO from 'components/seo'
import { CallToAction } from 'components/CallToAction'
import { IconSpinner } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../../context/Toast'
import PostHogDisambiguation from 'components/Squeak/components/Classic/PostHogDisambiguation'
import {
    OAUTH_PENDING_KEY,
    OAUTH_RETURN_TO_KEY,
    clearOAuthFlow,
} from 'components/Squeak/components/Classic/posthogOAuthFlow'
import Wizard from 'components/Wizard'
import { useWindow } from '../../../context/Window'
import { useApp } from '../../../context/App'

// Landing page for the PostHog OAuth flow. Strapi finishes the PKCE exchange
// with oauth.posthog.com server-side, then redirects the browser here with
// `?access_token=<PostHog provider token>`. We hand that token to
// `/api/auth/posthog/resolve`, which keys off the durable OIDC `sub` and returns
// either a session (JWT), a "needs disambiguation" state, or an error. A `link`
// intent (set when connecting from account settings) instead links the identity
// to the already-logged-in account.
export default function PostHogRedirect(): JSX.Element {
    const { appWindow } = useWindow()
    const { closeWindow, openSignIn } = useApp()
    const { loginWithProvider, linkCurrent, getJwt } = useUser()
    const { addToast } = useToast()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    // Restore any disambiguation state saved before a remount, so the flow keeps
    // going instead of trying to replay a token the server has already consumed.
    const [pending, setPending] = useState<{ pendingToken: string; emailInUse: boolean } | null>(() => {
        if (typeof window === 'undefined') return null
        const saved = sessionStorage.getItem(OAUTH_PENDING_KEY)
        return saved ? JSON.parse(saved) : null
    })
    const hasRun = useRef(false)

    // End the flow and send the user back to where they started, falling back to
    // closing the window (which lands on the home page) when no origin was saved.
    const finish = () => {
        const returnTo = sessionStorage.getItem(OAUTH_RETURN_TO_KEY)
        clearOAuthFlow()
        if (returnTo) {
            navigate(returnTo, { replace: true })
        } else {
            closeWindow(appWindow!)
        }
    }

    const handleSuccess = () => {
        addToast({ title: 'Successfully signed in to PostHog.com', description: 'Welcome!' })
        finish()
    }

    useEffect(() => {
        if (hasRun.current) return
        hasRun.current = true

        // A remount after the token was consumed restores `pending` above; never
        // replay the exchange with a token the server has already used.
        if (pending) return

        const params = new URLSearchParams(window.location.search)
        const accessToken = params.get('access_token')
        const oauthError = params.get('error')
        const oauthErrorDescription = params.get('error_description')

        // Strip the provider access_token through the router, not around it. A raw
        // history.replaceState leaves the token on the stored desktop window record,
        // and the next window navigation puts it back in the URL and remounts this
        // page into a loop. Routing the change updates that record too.
        if (window.location.search) {
            navigate(window.location.pathname, { replace: true })
        }

        // Always consume any pending "connect from settings" intent up front, so a
        // flow that was abandoned mid-OAuth can't leak it into a later sign-in.
        const intent = localStorage.getItem('posthog_oauth_intent')
        localStorage.removeItem('posthog_oauth_intent')

        // The OAuth provider can redirect back with an error (e.g. the user declined
        // consent) and no access_token — surface it instead of "Missing access token".
        if (oauthError) {
            setErrorMessage(oauthErrorDescription || 'PostHog sign-in was cancelled or did not complete.')
            return
        }

        if (!accessToken) {
            setErrorMessage('Missing access token. Please try signing in again.')
            return
        }

        const run = async () => {
            // Proactive link from account settings — only when actually signed in.
            // (A stale intent on a logged-out sign-in falls through to normal login.)
            if (intent === 'link' && (await getJwt())) {
                const linkRes = await linkCurrent({ accessToken })
                if ('error' in linkRes) {
                    setErrorMessage(linkRes.error || 'Could not connect PostHog.')
                    return
                }
                addToast({ title: 'PostHog login connected' })
                finish()
                return
            }

            const result = await loginWithProvider({ provider: 'posthog', accessToken })

            if (result && 'status' in result && result.status === 'needs_disambiguation') {
                const next = { pendingToken: result.pendingToken, emailInUse: result.emailInUse }
                // Persist so a remount restores the screen rather than re-exchanging.
                sessionStorage.setItem(OAUTH_PENDING_KEY, JSON.stringify(next))
                setPending(next)
                return
            }

            if (!result || 'error' in result) {
                setErrorMessage(
                    (result && 'error' in result && result.error) || 'There was an error signing in with PostHog.'
                )
                return
            }

            addToast({
                title: 'Successfully signed in to PostHog.com',
                description: 'Welcome back!',
            })
            finish()
        }

        run()
    }, [])

    const handleTryAgain = () => {
        clearOAuthFlow()
        if (appWindow) {
            closeWindow(appWindow)
        }
        openSignIn()
    }

    return (
        <>
            <SEO title="Signing in" noindex />
            {errorMessage ? (
                <Wizard
                    rightNavigation={
                        <CallToAction type="primary" size="sm" onClick={handleTryAgain}>
                            Try again
                        </CallToAction>
                    }
                >
                    <div className="bg-accent px-6 py-5 flex-1">
                        <div data-scheme="primary">
                            <h3 className="text-base font-semibold leading-tight mb-2">Couldn&apos;t sign you in</h3>
                            <p className="text-sm text-red dark:text-yellow font-semibold mb-0">{errorMessage}</p>
                        </div>
                    </div>
                </Wizard>
            ) : pending ? (
                <PostHogDisambiguation
                    pendingToken={pending.pendingToken}
                    emailInUse={pending.emailInUse}
                    onSuccess={handleSuccess}
                />
            ) : (
                <Wizard>
                    <div className="bg-accent px-6 py-5 flex-1">
                        <div data-scheme="primary" className="flex items-center gap-2">
                            <IconSpinner className="size-5 animate-spin flex-shrink-0" />
                            <p className="text-sm m-0">Signing you in&hellip;</p>
                        </div>
                    </div>
                </Wizard>
            )}
        </>
    )
}
