import React from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import Link from 'components/Link'
import {
    StickerCloudCross,
    StickerFork,
    StickerMindMap,
    StickerRun,
    StickerServers,
} from 'components/Stickers/Stickers'
import CloudinaryImage from 'components/CloudinaryImage'
import WizardCommand from 'components/WizardCommand'

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
                    <h1 className="text-2xl font-bold pt-4">How we build things on the internet has changed a lot.</h1>

                    <div className="grid grid-cols-1 @2xl:grid-cols-3 @2xl:gap-x-8">
                        <div className="flex flex-row-reverse @2xl:flex-col gap-8 @2xl:gap-0">
                            <div className="@2xl:flex-[0_0_160px] flex justify-end @2xl:justify-start @2xl:items-end mb-4">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/e_trim,q_auto,f_auto/generated_1775135240320_9aa6601fa2.png"
                                    imgClassName="h-36"
                                />
                            </div>
                            <div className="flex-1 relative pl-8 @2xl:pl-0 @2xl:pt-4">
                                {/* Dot + horizontal line to next column */}
                                <div className="absolute left-0 top-0.5 @2xl:absolute size-6 rounded-full bg-border border-light border-4 z-10" />
                                <div className="hidden @2xl:block h-[2px] bg-border top-3 absolute left-1 -right-12 mt-px" />
                                {/* Vertical line (mobile) */}
                                <div className="@2xl:hidden absolute top-6 -bottom-6 left-2.5 w-[2px] bg-border" />
                                <p className="text-sm font-semibold text-secondary mt-1 @2xl:mt-4 mb-2">1995 - 2020</p>
                                <h3 className="text-lg m-0 mb-1 leading-tight">
                                    The prehistoric days of software development
                                </h3>
                                <p className="m-0">
                                    Analytics, A/B testing, error tracking, and other dev tools required manual
                                    implementation using dozens of vendors. (Entire companies were built <em>just</em>{' '}
                                    around routing data various places!)
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row-reverse @2xl:flex-col pt-4 @2xl:pt-0 gap-8 @2xl:gap-0">
                            <div className="@2xl:flex-[0_0_160px] flex justify-end @2xl:justify-start @2xl:items-end mb-4">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/multitasker_45f89df425.png"
                                    imgClassName="h-36"
                                />
                            </div>
                            <div className="flex-1 relative pl-8 @2xl:pl-0 @2xl:pt-4">
                                <div className="absolute left-0 top-0.5 @2xl:absolute size-6 rounded-full bg-border border-light border-4" />
                                <div className="hidden @2xl:block h-[2px] bg-border top-3 absolute left-1 -right-12 mt-px" />
                                <div className="@2xl:hidden absolute top-6 -bottom-6 left-2.5 w-[2px] bg-border" />
                                <p className="text-sm font-semibold text-secondary mt-1 @2xl:mt-4 mb-2">2020 - 2024</p>
                                <h3 className="text-lg m-0 mb-1 leading-tight">Multi-product SaaS companies</h3>
                                <p className="m-0">
                                    We started seeing consolidation in B2B SaaS. It became more common to have multiple
                                    tools in the same UI.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row-reverse @2xl:flex-col gap-8 @2xl:gap-0">
                            <div className="@2xl:flex-[0_0_160px] flex justify-end @2xl:justify-start @2xl:items-end mb-4">
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/wizard_89e1cf3a73.png"
                                    imgClassName="h-40"
                                />
                            </div>

                            <div className="flex-1 relative pl-8 @2xl:pl-0 @2xl:pt-4">
                                <div className="absolute left-0 top-0.5 @2xl:absolute size-6 rounded-full bg-border border-light border-4" />
                                {/* No line after last dot */}
                                <p className="text-sm font-semibold text-secondary mt-1 @2xl:mt-4 mb-2">
                                    2025 - current
                                </p>
                                <h3 className="text-lg m-0 mb-1 leading-tight">Just write a prompt</h3>
                                <p className="m-0">
                                    AI now makes it possible to both analyze data <em>and</em> build new features with
                                    tooling in place.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-lg mb-8">
                            Writing code has become easier, but building with AI still has two major flaws:
                        </h2>
                        <ol className="list-none pl-0 space-y-2">
                            <li className="relative pl-20">
                                <StickerCloudCross className="size-16 absolute left-0 -top-2" />
                                <h3 className="text-base mt-0">1. AI-built infrastructure works until it doesn't</h3>
                                <p>
                                    It's easy to vibe code a lightweight analytics stack or feature flag system. But it
                                    won't scale with any real volume – and querying it gets expensive fast. Your tokens
                                    are better spent on your product, not on reinventing PostHog.
                                </p>
                            </li>
                            <li className="relative pl-20">
                                <StickerMindMap className="size-16 absolute left-0 -top-2" />
                                <h3 className="text-base mt-0">2. Context is key</h3>
                                <p>
                                    Customer data still lives across various point solutions (database, CRM, support
                                    tool, analytics stack). And if you're asking AI to analyze data or write code – its
                                    output can only be as good as the context it has.
                                </p>
                            </li>
                        </ol>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-lg mb-8">PostHog solves this in a few ways:</h2>
                        <ol className="list-none pl-0 space-y-2">
                            <li className="relative pl-20">
                                <StickerServers className="size-16 absolute left-0 -top-2" />
                                <h3 className="text-base mt-0">1. Unified data stack</h3>
                                <p>
                                    Your data might originate elsewhere, but <em>everything</em> can be pushed into
                                    PostHog where it can be transformed, queried, and even exported.
                                </p>
                            </li>

                            <li className="relative pl-20">
                                <StickerRun className="size-16 absolute left-0 -top-2" />
                                <h3 className="text-base mt-0">2. MCP</h3>
                                <p>
                                    PostHog's dozens of tools are available to your LLM. You no longer need to learn a
                                    UI to run analysis or perform tasks like creating an experiment, survey, or feature
                                    flag.
                                </p>
                            </li>

                            <li className="relative pl-20">
                                <StickerFork className="size-16 absolute left-0 -top-2" />
                                <h3 className="text-base mt-0">3. PostHog Code</h3>
                                <p>
                                    Our{' '}
                                    <Link to="/code" state={{ newWindow: true }}>
                                        AI code editor
                                    </Link>{' '}
                                    automatically analyzes signals from customer data, proposes improvements, and writes
                                    pull requests – <em>automatically</em>.
                                </p>
                            </li>
                        </ol>
                    </div>

                    <hr className="border-border" />

                    <p>
                        How we run analysis and build software has changed, but what <em>hasn't</em> changed is the need
                        for good data, good tooling, and a seamless way for them to operate together in harmony.
                    </p>

                    <h2>Try it – free</h2>
                    <p>
                        Use the PostHog Wizard to install PostHog automatically. Each product has a generous free tier –
                        no credit card required.
                    </p>
                    <WizardCommand className="border border-primary" />
                </div>
            </Editor>
        </>
    )
}
