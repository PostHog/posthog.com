import React, { useState, useEffect } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import { IconRefresh } from '@posthog/icons'
import Link from 'components/Link'

export default function Tooling(): JSX.Element {
    return (
        <>
            <SEO
                title="Tooling - PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Editor>
                <div className="space-y-6 leading-relaxed">
                    <h2 className="text-2xl font-bold">How we build things on the internet has changed a lot.</h2>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg">Until ~2020: The prehistoric days of software development</h3>
                            <p>
                                Analytics, A/B testing, error tracking, and other dev tools required manual
                                implementation using dozens of vendors. (Entire companies were built <em>just</em>{' '}
                                around routing data various places!)
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg">2020-2024: Multi-product SaaS companies</h3>
                            <p>
                                We started seeing consolidation in B2B SaaS. It became more common to have multiple
                                tools in the same UI.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg">2025+: Just write a prompt</h3>
                            <p>
                                AI now makes it possible to both analyze data <em>and</em> build new features with
                                tooling in place.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <p>But building with AI still has two major flaws:</p>
                        <ol className="list-decimal list-inside pl-0 space-y-2">
                            <li>
                                <strong>AI is prone to yolo-ing.</strong> Sure, Claude can vibe code a lightweight
                                analytics stack or a feature flag. But without proper infrastructure, it won't scale.
                                And your tokens are better spent on building your core product than the tooling to
                                support it.
                            </li>
                            <li>
                                <strong>Context is key.</strong> Customer data still lives across various point
                                solutions (database, CRM, support tool, analytics stack). And if you're asking AI to
                                analyze data or write code – its output can only be as good as the context it has.
                            </li>
                        </ol>
                    </div>

                    <div className="space-y-3">
                        <p>PostHog solves this in a few ways:</p>
                        <ol className="list-decimal list-inside pl-0 space-y-2">
                            <li>
                                <strong>Unified data stack.</strong> Your data might originate elsewhere, but{' '}
                                <em>everything</em> can be pushed into PostHog where it can be transformed, queried, and
                                even exported.
                            </li>
                            <li>
                                <strong>MCP.</strong> PostHog's dozens of tools are available to your LLM. You no longer
                                need to learn a UI to run analysis or perform tasks like creating an experiment, survey,
                                or feature flag.
                            </li>
                            <li>
                                <strong>PostHog Code.</strong> Our AI code editor automatically analyzes signals from
                                customer data, proposes improvements, and writes pull requests – <em>automatically</em>.
                            </li>
                        </ol>
                    </div>

                    <hr className="border-border" />

                    <p>
                        How we run analysis and build software has changed, but what <em>hasn't</em> changed is the need
                        for good data, good tooling, and a seamless way for them to operate together in harmony.
                    </p>
                </div>
            </Editor>
        </>
    )
}
