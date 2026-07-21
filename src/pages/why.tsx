import React from 'react'
import SEO from 'components/seo'
import WhyPostHogViewer from 'components/WhyPostHog'
import CloudinaryImage from 'components/CloudinaryImage'

export default function Why(): JSX.Element {
    return (
        <>
            <SEO
                title="Why we exist"
                description="How we build on the internet has changed, but customer data is still siloed across dozens of services. PostHog is the single source of truth for product decisions."
                image="/images/og/default.png"
            />
            <WhyPostHogViewer>
                <h1>Why we exist</h1>

                <h2>How we build on the internet has changed a lot lately</h2>
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
                            <p className="text-sm font-semibold text-secondary mt-1 @2xl:mt-4 mb-2">2025 - current</p>
                            <h3 className="text-lg m-0 mb-1 leading-tight">Just write a prompt</h3>
                            <p className="m-0">
                                AI now makes it possible to both analyze data <em>and</em> build new features with
                                tooling in place.
                            </p>
                        </div>
                    </div>
                </div>

                <p>
                    Product development used to mean manually writing code, running analysis, diagnosing bugs, and
                    rolling out changes using dozens of tools. AI agents now do much of that work – but they're only as
                    good as the context they're given.
                </p>

                <h2>But customer data is still siloed across dozens of services</h2>
                <p>
                    Having detailed product usage data is one thing, but when other customer data lives in other
                    services (like a CRM, ticketing system, and debugging tools – on top of your own database), you
                    can't easily make informed product decisions from the full set of data without a lot of manual
                    stitching together of services. And getting all these services working together is about as much fun
                    as trying to understand somebody else's AI slop.
                </p>
                <p>
                    PostHog's data infrastructure is built for data engineers who need to build a{' '}
                    <strong>robust and flexible data stack</strong> to house all their business data.
                </p>
                <p>
                    And because the data is <em>seamlessly connected</em> to PostHog's product ecosystem, product teams
                    get to continue using the tools they love - like product analytics, feature flags, and surveys -{' '}
                    <strong>all powered up by your clean &amp; modeled data</strong>. It's, quite literally, the best of
                    both worlds.
                </p>

                <h2>Make better decisions when your data lives all in one place</h2>
                <p>
                    We've designed PostHog to be the single source of truth for product decisions. All our tools share
                    the same underlying data. It can be used by product engineers, marketing folks, and the C-suite.
                </p>
                <p>
                    Your AI code editor can build based off actual usage data, <em>not</em> just an understanding of
                    your codebase.
                </p>
                <p>
                    And if you're using PostHog Code, our Signals suite constantly scans for bugs, issues, and UX
                    problems and creates pull requests to fix them – all automatically.
                </p>
            </WhyPostHogViewer>
        </>
    )
}
