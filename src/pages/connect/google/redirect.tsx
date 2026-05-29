import React, { useEffect, useRef, useState } from 'react'
import { navigate } from 'gatsby'
import SEO from 'components/seo'
import { CallToAction } from 'components/CallToAction'
import { IconSpinner } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../../context/Toast'

// Landing page for the Google OAuth flow. Strapi redirects the browser here with
// an `access_token` query param after a successful Google auth; we exchange it for
// a Squeak session and then send the user back to the community.
export default function GoogleRedirect(): JSX.Element {
    const { loginWithProvider } = useUser()
    const { addToast } = useToast()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const hasRun = useRef(false)

    useEffect(() => {
        if (hasRun.current) return
        hasRun.current = true

        const params = new URLSearchParams(window.location.search)
        const accessToken = params.get('access_token')

        // Drop the access_token from the address bar/history right away so it
        // isn't retained in browser history or leaked via the Referer header.
        if (window.location.search) {
            window.history.replaceState({}, '', window.location.pathname)
        }

        if (!accessToken) {
            setErrorMessage('Missing access token. Please try signing in again.')
            return
        }

        const completeLogin = async () => {
            const user = await loginWithProvider({ provider: 'google', accessToken })

            if (!user || 'error' in user) {
                setErrorMessage((user && 'error' in user && user.error) || 'There was an error signing in with Google.')
                return
            }

            addToast({
                title: 'Successfully signed in to PostHog.com',
                description: 'Welcome back!',
            })
            navigate('/community', { replace: true })
        }
        completeLogin()
    }, [])

    return (
        <>
            <SEO title="Signing in" noindex />
            <div data-scheme="primary" className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
                {errorMessage ? (
                    <>
                        <p className="text-red font-semibold m-0">{errorMessage}</p>
                        <CallToAction type="primary" size="sm" to="/community">
                            Back to community
                        </CallToAction>
                    </>
                ) : (
                    <>
                        <IconSpinner className="size-8 animate-spin" />
                        <p className="m-0">Signing you in&hellip;</p>
                    </>
                )}
            </div>
        </>
    )
}
