import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import Tooltip from 'components/Tooltip'
import { graphql, useStaticQuery } from 'gatsby'
import slugify from 'slugify'
import TeamPatch from 'components/TeamPatch'
import { CallToAction } from 'components/CallToAction'
import { useUser } from 'hooks/useUser'
import SidebarSection from 'components/PostLayout/SidebarSection'
import { Contributor } from 'components/PostLayout/Contributors'
import { productMenu } from '../navs'
import RoadmapPreview from 'components/RoadmapPreview'
import { PRODUCT_COUNT } from '../constants'

const Teams: React.FC = () => {
    const { james, supportTeam } = useStaticQuery(graphql`
        {
            james: squeakProfile(squeakId: { eq: 27732 }) {
                squeakId
                firstName
                lastName
                avatar {
                    url
                }
                companyRole
            }
            supportTeam: squeakTeam(squeakId: { eq: 128 }) {
                id
                name
                slug
                profiles {
                    data {
                        id
                        attributes {
                            color
                            firstName
                            lastName
                            avatar {
                                data {
                                    attributes {
                                        url
                                    }
                                }
                            }
                        }
                    }
                }
                crest {
                    data {
                        attributes {
                            url
                        }
                    }
                }
                crestOptions {
                    textColor
                    textShadow
                    fontSize
                    frame
                    frameColor
                    plaque
                    plaqueColor
                    imageScale
                    imageXOffset
                    imageYOffset
                }
                leadProfiles {
                    data {
                        id
                    }
                }
            }
        }
    `)

    return (
        <Layout>
            <SEO
                title="AI PostHog is coming"
                description="AI for all your data and business logic"
                image={`/images/og/why-posthog.png`}
            />

            {/* Full-width black header section */}
            <div className="w-full bg-black text-white py-24">
                <div className="max-w-screen-2xl mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">PostHog AI is coming</h1>
                        <p className="text-lg md:text-xl mb-12 opacity-80">
                            Build the AI version of every tool your product needs with us.
                        </p>

                        <div className="max-w-md mx-auto flex gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded text-black"
                            />
                            <button className="px-6 py-2 bg-red rounded font-bold text-white hover:bg-red/90">
                                Register for updates
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <PostLayout title={'Handbook'} hideSurvey>
                <section className="mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="md:flex-1">
                            <div className="@container article-content">
                                <div className="opacity-70 text-[15px] font-medium">Holy smokes</div>
                                <h1 id="posthog-is-literally-designed-to-be-a-no-brainer" className="text-2xl">
                                    We're so lucky to be in this position
                                </h1>
                                <p>
                                    We've built something special in the last 5 years - from nothing, we have shipped
                                    ten products, generated $10s of millions in revenue and we've signed up a quarter of
                                    a million engineers to our software.
                                </p>
                                <p>
                                    We are one central place for data, _and_ for business logic. And we've built this
                                    with _you_, our users. Your feedback and willingness to try new things has made this
                                    possible.
                                </p>
                                <p>It's now time for the next step on our journey with you.</p>

                                {/* New rectangles */}
                                <div className="space-y-6 my-8">
                                    {/* Rectangle 1 */}
                                    <div className="flex border border-light dark:border-dark rounded-lg overflow-hidden">
                                        <div className="w-48 h-48 bg-accent dark:bg-accent-dark flex-shrink-0">
                                            {/* Image placeholder */}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2">
                                                We have all the data, and it's cleaner than anyone else's
                                            </h3>
                                            <p className="text-[15px] opacity-70">Garbage in, garbage out.</p>
                                            <p className="text-[15px] opacity-70">
                                                Earlier this year, we shipped a data warehouse. This lets our users
                                                import data into PostHog from any source. We have built SDKs for your
                                                product and one click imports to pull in Postgres, Stripe, BigQuery, S3
                                                and whatever else we got asked for.
                                            </p>
                                            <p className="text-[15px] opacity-70">
                                                PostHog AI will have full context to answer questions or act on anything
                                                that is going on in your product. Based on clean, reliable data. No need
                                                for data engineering spaghetti.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Rectangle 2 */}
                                    <div className="flex border border-light dark:border-dark rounded-lg overflow-hidden">
                                        <div className="w-48 h-48 bg-accent dark:bg-accent-dark flex-shrink-0">
                                            {/* Image placeholder */}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2">
                                                We have all the business logic - we provide you every tool your product
                                                needs to succeed
                                            </h3>
                                            <p className="text-[15px] opacity-70">
                                                We have shipped 10 products so far. We're hiring to build another 50+.
                                                If we're going to centralize all your data, we may as well centralize
                                                all the tools you use to make your product successful.
                                            </p>
                                            <p className="text-[15px] opacity-70">
                                                We aren't just building "chat to your data"
                                            </p>
                                            <p className="text-[15px] opacity-70">
                                                Right now, PostHog AI can answer questions about your product, but the
                                                future is bigger. We want it to _do_ things - show you video replays of
                                                users no activating, tell you how well a high paying customer is using
                                                your product during a trial, or set up an email campaign for users that
                                                abandoned their cart.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Rectangle 3 */}
                                    <div className="flex border border-light dark:border-dark rounded-lg overflow-hidden">
                                        <div className="w-48 h-48 bg-accent dark:bg-accent-dark flex-shrink-0">
                                            {/* Image placeholder */}
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold mb-2">
                                                We're by far the most popular company in our space
                                            </h3>
                                            <p className="text-[15px] opacity-70">
                                                Over a quarter of a million engineers use PostHog. Over 110,000
                                                companies have installed our software.
                                            </p>
                                            <p className="text-[15px] opacity-70">
                                                We've been able to build so quickly because of _you_, our users, who
                                                have contributed feedback, code, ideas and encouragement every step of
                                                the way.
                                            </p>
                                            <p className="text-[15px] opacity-70">
                                                What we're building is monumentally ambitious. Unlike all our
                                                competitors, we've never had to pay for outbound sales - we can funnel
                                                everything we have into our products and our existing customers.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <h3 id="popular-roadmap-items" className="mb-3">
                                    The AI Roadmap - ask for what you want
                                </h3>
                                <RoadmapPreview />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bottom sign-up section */}
                <div className="w-full bg-black text-white py-24 mt-12">
                    <div className="max-w-screen-2xl mx-auto px-4">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Build PostHog AI with us</h2>

                            <div className="max-w-md mx-auto flex gap-2">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 px-4 py-2 rounded text-black"
                                />
                                <button className="px-6 py-2 bg-red rounded font-bold text-white hover:bg-red/90">
                                    Register for early access
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </PostLayout>
        </Layout>
    )
}

export default Teams
