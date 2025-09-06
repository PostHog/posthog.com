import React from 'react'
import Editor from 'components/Editor'
import SEO from 'components/seo'
import useProduct from 'hooks/useProduct'
import CloudinaryImage from 'components/CloudinaryImage'
import OSButton from 'components/OSButton'

export default function EarlyAccessFeatures() {
    const earlyAccessProduct = useProduct({ handle: 'early_access' }) as any

    if (!earlyAccessProduct) {
        return <div>Product not found</div>
    }

    const { name, overview, features, Icon, color, screenshots, seo } = earlyAccessProduct

    return (
        <>
            <SEO
                title={seo?.title || 'Early Access Features - PostHog'}
                description={seo?.description}
                image="/images/og/product-analytics.jpg"
            />
            <Editor>
                <div className="space-y-8">
                    <div>
                        <div className="flex gap-2 items-center">
                            {Icon && (
                                <div className={`size-8 my-4 text-${color}`}>
                                    <Icon />
                                </div>
                            )}
                            <h1 className="!m-0">{name}</h1>
                        </div>
                        <h2 className="!m-0 pb-2">Run beta programs without custom code</h2>
                        <p>
                            Let users opt into betas, create waitlists, and manage feature lifecycle from concept to GA.
                            Build a community of engaged users who help shape your product.
                        </p>
                    </div>

                    {screenshots && screenshots.overview && (
                        <CloudinaryImage
                            src={
                                screenshots.overview.src ||
                                'https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/features/feature-flags/early-access-feature-demo.png'
                            }
                            alt={screenshots.overview.alt || 'Early access features modal'}
                            className="w-full rounded-md shadow-lg"
                        />
                    )}

                    <div>
                        <h2>How it works</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="text-4xl mb-4">1️⃣</div>
                                <h3 className="text-lg">Create a beta feature</h3>
                                <p className="text-sm">
                                    Define your feature and set enrollment criteria directly in PostHog.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">2️⃣</div>
                                <h3 className="text-lg">Users opt in</h3>
                                <p className="text-sm">
                                    Users discover and join betas through an in-app modal or custom UI.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl mb-4">3️⃣</div>
                                <h3 className="text-lg">Manage rollout</h3>
                                <p className="text-sm">
                                    Control access with feature flags and graduate features to GA.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>Key features</h2>
                        <div className="space-y-6">
                            <div>
                                <h3>No-code beta management</h3>
                                <p>
                                    Create and manage beta programs entirely through PostHog. No engineering work
                                    required to set up opt-in flows, waitlists, or access control. Your team can launch
                                    betas independently.
                                </p>
                            </div>

                            <div>
                                <h3>Built-in enrollment UI</h3>
                                <p>
                                    PostHog provides a customizable modal that displays available betas to your users.
                                    They can browse features, read descriptions, and opt in with one click. Or build
                                    your own UI using our APIs.
                                </p>
                            </div>

                            <div>
                                <h3>Automatic feature flag integration</h3>
                                <p>
                                    When users opt into a beta, they're automatically added to the corresponding feature
                                    flag. No manual list management or custom code needed - it just works.
                                </p>
                            </div>

                            <div>
                                <h3>Waitlist management</h3>
                                <p>
                                    Build anticipation with waitlists. Collect interest for upcoming features and
                                    control when users get access. Perfect for managing limited beta slots or staged
                                    rollouts.
                                </p>
                            </div>

                            <div>
                                <h3>Feedback collection</h3>
                                <p>
                                    Gather feedback from beta users through integrated surveys. Understand what's
                                    working, what's not, and what features to build next based on real user input.
                                </p>
                            </div>

                            <div>
                                <h3>Usage analytics</h3>
                                <p>
                                    Track adoption, engagement, and retention for beta features. See which users are
                                    most active and identify your power users and champions.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-accent rounded-md p-6">
                        <h3 className="mt-0">Perfect for</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-base font-semibold mb-2">Product teams</h4>
                                <ul className="text-sm mb-0">
                                    <li>Test features with real users before GA</li>
                                    <li>Build a community of engaged testers</li>
                                    <li>Validate product-market fit early</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-base font-semibold mb-2">Developer platforms</h4>
                                <ul className="text-sm mb-0">
                                    <li>Run API beta programs</li>
                                    <li>Give early access to power users</li>
                                    <li>Manage preview features</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>Use cases</h2>
                        <div className="space-y-6">
                            <div>
                                <h3>Feature validation</h3>
                                <p>
                                    Test new features with a subset of users before committing to a full launch. Get
                                    feedback early and iterate based on real usage data.
                                </p>
                            </div>
                            <div>
                                <h3>Community building</h3>
                                <p>
                                    Create a community of power users who get early access to new features. Build
                                    loyalty and turn users into advocates for your product.
                                </p>
                            </div>
                            <div>
                                <h3>Risk mitigation</h3>
                                <p>
                                    Reduce the risk of launching features that don't resonate. Test with a small group
                                    first, gather feedback, and only roll out winners.
                                </p>
                            </div>
                            <div>
                                <h3>Enterprise previews</h3>
                                <p>
                                    Give key customers early access to enterprise features. Build stronger relationships
                                    and get valuable feedback from your most important users.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2>How to implement</h2>
                        <div className="space-y-4">
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-semibold">Step 1: Create your beta feature</h4>
                                <p className="text-sm mb-0">
                                    In PostHog, navigate to Early Access Features and create a new beta. Add a name,
                                    description, and documentation URL.
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-semibold">Step 2: Link to a feature flag</h4>
                                <p className="text-sm mb-0">
                                    Connect your beta to a feature flag. Users who opt in will automatically be added to
                                    this flag.
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-semibold">Step 3: Add the enrollment modal</h4>
                                <p className="text-sm mb-0">
                                    Include PostHog's JavaScript snippet with <code>opt_in_site_apps: true</code> to
                                    show the beta modal to users.
                                </p>
                            </div>
                            <div className="border-l-4 border-primary pl-4">
                                <h4 className="font-semibold">Step 4: Monitor and iterate</h4>
                                <p className="text-sm mb-0">
                                    Track adoption, gather feedback, and iterate based on user behavior and survey
                                    responses.
                                </p>
                            </div>
                        </div>
                    </div>

                    {screenshots && screenshots.additional && (
                        <div className="space-y-4">
                            {screenshots.additional.map((screenshot: any, index: number) => (
                                <CloudinaryImage
                                    key={index}
                                    src={screenshot.src}
                                    srcDark={screenshot.srcDark}
                                    alt={screenshot.alt || ''}
                                    className="w-full rounded-md shadow-lg"
                                />
                            ))}
                        </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                        <OSButton
                            asLink
                            variant="primary"
                            size="md"
                            to="/docs/feature-flags/early-access-feature-management"
                            state={{ newWindow: true }}
                            width="full"
                        >
                            Read the documentation
                        </OSButton>
                        <OSButton
                            asLink
                            variant="secondary"
                            size="md"
                            to="/tutorials/early-access"
                            state={{ newWindow: true }}
                            width="full"
                        >
                            View tutorial
                        </OSButton>
                    </div>
                </div>
            </Editor>
        </>
    )
}
