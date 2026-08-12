import React, { useState } from 'react'
import { IconInfo } from '@posthog/icons'
import usePostHog from 'hooks/usePostHog'
import OSButton from 'components/OSButton'
import Tooltip from 'components/Tooltip'
import { LOGO_SRC } from './Masthead'

/**
 * Email capture, same mechanics as NewsletterForm: a `newsletter_subscribed` event.
 * That event is what subscribes the reader on Substack, so this carries the same
 * third-party disclosure as every other subscribe surface on the site.
 */
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
        return (
            <p className={`m-0 text-sm font-bold ${className}`}>
                You're in – look for build mode from Substack in your inbox. 🦔
            </p>
        )
    }

    return (
        <div className={`w-full max-w-sm ${className}`}>
            <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
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
            <p className="m-0 mt-1.5 text-xs text-secondary">
                We'll share your email with{' '}
                <span className="inline-flex whitespace-nowrap">
                    Substack
                    <Tooltip
                        content="Substack's embed form isn't very pretty, so we made our own. But we need to let you know we'll subscribe you on your behalf. Thanks in advance!"
                        tooltipClassName="max-w-md"
                    >
                        <span>
                            <IconInfo className="relative -top-px ml-0.5 inline-block size-4" />
                        </span>
                    </Tooltip>
                </span>
            </p>
        </div>
    )
}

/**
 * Wordmark, plus an optional subscribe form. Used as the page header (wordmark
 * only) and again as the footer (wordmark + subscribe). `placement` tags the
 * subscribe event so header and footer convert separately.
 */
export function HeroHeader({ placement }: { placement?: string }): JSX.Element {
    return (
        <div className="flex flex-col items-start gap-4 py-4 @2xl:flex-row @2xl:items-center @2xl:justify-between @2xl:gap-8">
            <img src={LOGO_SRC} alt="build mode" className="h-auto w-32 shrink-0 grow-0" />
            {placement ? <SubscribeForm placement={placement} /> : null}
        </div>
    )
}

/** The statement hero: the tagline as display type, the pitch as its deck, then subscribe. */
export default function Hero({ className = '', placement }: { className?: string; placement: string }): JSX.Element {
    return (
        <div className={`flex flex-col items-start gap-5 ${className}`}>
            <h1 className="m-0 max-w-3xl text-4xl font-bold leading-[1.05] @2xl:text-5xl @4xl:text-6xl">
                Tools, tactics, and taste for{' '}
                <span className="box-decoration-clone rounded-xs bg-highlight px-2 text-red">product builders.</span>
            </h1>
            <p className="m-0 max-w-2xl text-lg text-secondary">
                Advice on building great products, lessons (and mistakes) from building PostHog, and deep dives into the
                strategies of top startups.
            </p>
            <SubscribeForm placement={placement} />
        </div>
    )
}
