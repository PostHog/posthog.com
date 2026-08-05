import { CallToAction } from 'components/CallToAction'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import React, { useEffect } from 'react'

const SAFE_DEEP_LINK_PATH = /^[a-zA-Z0-9/_-]{1,128}$/

export default function CodeOpenPage(): JSX.Element {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const raw = (params.get('to') || 'open').replace(/^\/+/, '')
        const to = SAFE_DEEP_LINK_PATH.test(raw) ? raw : 'open'
        window.location.href = `posthog-code://${to}`
    }, [])

    return (
        <>
            <SEO
                title="Open PostHog Desktop"
                description="Open the PostHog Desktop desktop app, or download it if you haven't yet."
                noindex
            />
            <Editor slug="/code/open" maxWidth="100%" hasPadding={false}>
                <div className="@container not-prose font-rounded">
                    <div className="max-w-xl mx-auto px-4 @xl:px-8 py-16 text-center">
                        <h1 className="text-3xl mb-3">Opening PostHog Desktop…</h1>
                        <p className="mb-8 text-base leading-relaxed">
                            Your browser should be asking to launch the app - say yes and you're in. If nothing's
                            happening, download PostHog Desktop below.
                        </p>

                        <div className="flex flex-wrap gap-3 justify-center mb-6">
                            <CallToAction type="primary" size="md" to="/code/download">
                                Download PostHog Desktop
                            </CallToAction>
                            <CallToAction type="secondary" size="md" to="/docs/posthog-desktop">
                                Read the docs
                            </CallToAction>
                        </div>
                    </div>
                </div>
            </Editor>
        </>
    )
}
