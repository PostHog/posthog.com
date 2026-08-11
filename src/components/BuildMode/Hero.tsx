import React, { useState } from 'react'
import usePostHog from 'hooks/usePostHog'
import OSButton from 'components/OSButton'
import { LOGO_SRC } from './Masthead'

/** Email capture, same mechanics as NewsletterForm: a `newsletter_subscribed` event. */
function SubscribeForm({ className = '', placement }: { className?: string; placement: string }): JSX.Element {
    const posthog = usePostHog()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        posthog?.capture('newsletter_subscribed', { email, placement })
        setSubmitted(true)
    }

    if (submitted) {
        return <p className={`m-0 text-sm font-bold ${className}`}>You're in – see you in your inbox. 🦔</p>
    }

    return (
        <form onSubmit={handleSubmit} className={`flex w-full max-w-sm items-center gap-2 ${className}`}>
            <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@builder.com"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded border border-input bg-input px-3 py-1.5 text-sm text-primary placeholder:text-muted focus:border-input-hover focus:outline-none"
            />
            <OSButton variant="primary" size="md">
                Subscribe
            </OSButton>
        </form>
    )
}

/**
 * Wordmark left, subscribe right — rendered at the top of the page and again
 * as the footer. `placement` tags the subscribe event so the two convert separately.
 */
export function HeroHeader({ placement }: { placement: string }): JSX.Element {
    return (
        <div className="flex flex-col items-start gap-4 py-4 @2xl:flex-row @2xl:items-center @2xl:justify-between @2xl:gap-8">
            <img src={LOGO_SRC} alt="build mode" className="h-auto w-32 shrink-0 grow-0" />
            <SubscribeForm placement={placement} />
        </div>
    )
}

/** The statement hero: the tagline as display type, the pitch as its deck. */
export default function Hero({ className = '' }: { className?: string }): JSX.Element {
    return (
        <div className={`flex flex-col items-start gap-5 ${className}`}>
            <h2 className="m-0 max-w-3xl text-4xl font-bold leading-[1.05] @2xl:text-5xl @4xl:text-6xl">
                Tools, tactics, and taste for{' '}
                <span className="box-decoration-clone rounded-xs bg-highlight px-2 text-red">product builders.</span>
            </h2>
            <p className="m-0 max-w-2xl text-lg text-secondary">
                Advice on building great products, lessons (and mistakes) from building PostHog, and deep dives into
                the strategies of top startups.
            </p>
        </div>
    )
}
