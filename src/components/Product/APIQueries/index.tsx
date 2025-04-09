import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import { IconBrackets, IconGraph, IconToggle, IconRewindPlay, IconTrends, IconUser } from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { CustomerCard } from 'components/Products/CustomerCard'
import { Hero } from 'components/Products/Hero'
import { Feature } from 'components/Products/Feature'
import { Subfeature } from 'components/Products/Subfeature'
import { docsMenu } from '../../../navs'
import { Marquee } from 'components/Products/Marquee'
import TeamMembers from '../TeamMembers'
import Questions from '../Questions'
import CTA from 'components/Home/CTA'
import { PairsWith } from 'components/Products/PairsWith'
import { PairsWithItem } from 'components/Products/PairsWith/item'
import { Question } from 'components/Products/Question'
import { DocLinks } from 'components/Products/DocsLinks'
import { SmoothScroll } from 'components/Products/SmoothScroll'
import { SEO } from 'components/seo'
import { useLayoutData } from 'components/Layout/hooks'
import Plans from 'components/Pricing/Plans'
import Profile from '../../Team/Profile'
import SideModal from '../../Modal/SideModal'
import { TutorialCard } from 'components/Products/TutorialCard'
import { useStaticQuery, graphql } from 'gatsby'
import { TextCard } from 'components/Products/TextCard'

interface ProfileData {
    firstName: string
    lastName: string
    country: string
    companyRole: string
    image: string
    bio: string
    twitter: string
    github: string
    linkedin: string
    pineappleOnPizza: boolean
    biography: string
    isTeamLead: boolean
    id: string
    location: string
}

const product = {
    slug: 'API Queries',
    lowercase: 'API queries',
    capitalized: 'API Queries',
    freeTier: '100,000 exceptions',
}

const team = 'Clickhouse'
const teamSlug = '/teams/clickhouse'

const questions = [
    {
        question: 'What are the rate limits for the API?',
        url: '/docs/api#rate-limiting',
    },
    {
        question: 'What does this error response mean?',
        url: '/docs/api#responses',
    },
    {
        question: 'What endpoints are available for actions?',
        url: '/docs/api/actions',
    },
    {
        question: 'What is the main endpoint for querying data?',
        url: '/docs/how-posthog-works/data-model',
    },
    {
        question: 'How do I capture anonymous events with the API?',
        url: '/docs/api/capture#anonymous-event-capture',
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        title: 'Product analytics',
        description:
            'Create customer-facing analytics, or retrieve information about any data in your PostHog instance.',
        icon: <IconGraph />,
        product: 'Product analytics',
        url: '/product-analytics',
        color: 'blue',
    },
    {
        title: 'Feature flags',
        description: 'Evaluate feature flags directly with the API, then update them using the `PATCH` method.',
        icon: <IconToggle />,
        product: 'Feature flags',
        url: '/feature-flags',
        color: 'seagreen',
    },
    {
        title: 'Session replays',
        description: 'Share replays outside of your organization automatically, giving others a front-row seat.',
        icon: <IconRewindPlay />,
        product: 'Session replays',
        url: '/session-replays',
        color: 'yellow',
    },
]

export const ProductAPI = () => {
    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState<ProfileData | null>(null)
    const { mintlify } = useStaticQuery(graphql`
        fragment ProductCustomerFragment on Mdx {
            fields {
                slug
            }
            frontmatter {
                logo {
                    publicURL
                }
                logoDark {
                    publicURL
                }
            }
        }
        {
            mintlify: mdx(slug: { eq: "customers/mintlify" }) {
                ...ProductCustomerFragment
            }
        }
    `)

    return (
        <>
            <SEO
                title="API Queries - PostHog"
                description="Use our API to query data, unlock end-user analytics, and more."
                image={`/images/og/api-queries.jpg`}
            />
            <SideModal open={!!activeProfile} setOpen={(open) => setActiveProfile(open ? activeProfile : null)}>
                {activeProfile && <Profile profile={activeProfile} />}
            </SideModal>
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    color="blue"
                    icon={<IconBrackets />}
                    product={product.capitalized}
                    title="Build it your way with the PostHog API"
                    description="Capture. Query. Decide."
                    image="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/error-tracking.png"
                />

                <div className="text-center">
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/screenshot_error_tracking_0f93eb652d.png"
                        alt="Screenshot of PostHog API Queries"
                        className="w-full max-w-[1440px]"
                        placeholder="none"
                    />
                </div>

                <section id="customers" className="-mt-80 pt-48">
                    <ul className="list-none p-0 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 md:mb-20">
                        <li className="hidden md:block"></li>
                        <CustomerCard
                            outcome="built and launched user-facing analytics in just three days"
                            quote="You can quote me: PostHog is awesome. It really stands out for it’s developer friendliness and user experience. It's a great tool."
                            customer={mintlify}
                            colspan={2}
                        />
                        <li className="hidden md:block"></li>
                    </ul>
                </section>
            </div>

            <SmoothScroll exclude={['Tutorials', 'Installation', 'Roadmap & changelog']} />

            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-4 pb-0`}>
                <section id="features" className="-mt-36 pt-36">
                    <section className="max-w-7xl mx-auto px-5 mb-10 md:mb-20">
                        <h2 className="text-4xl mb-2">
                            An API you'll actually <span className="text-red dark:text-yellow">want</span> to use
                        </h2>
                        <p className="max-w-2xl mb-2">
                            If your business has bespoke data visualization needs that aren't covered by a PostHog
                            product, you can build your own interface with queries using the API.
                        </p>
                        <p className="max-w-2xl mb-2">
                            There's a generous rate limit to get you started, after which we bill based on usage - just
                            like we do everywhere else.
                        </p>
                        <div className="mb-8 mt-8">
                            <CallToAction to="/docs/api" type="secondary" size="sm">
                                Explore the API
                            </CallToAction>
                        </div>

                        <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20">
                            <TextCard
                                title="Data transformations"
                                description="Capture the live event stream and do something with it - like munge PII or add geolocation."
                            />
                            <TextCard
                                title="Data out"
                                description="Access data from dashboards or metrics from saved insights."
                            />
                            <TextCard
                                title="Data augmentation"
                                description="Augment event data coming into PostHog with more context and detail."
                            />
                            <TextCard
                                title="Reverse ETL"
                                description="Update and feed context to external products like Hubspot or Salesforce."
                            />
                            <TextCard
                                title="Build apps or pipelines"
                                description="Create your own interface that uses PostHog event and customer data."
                            />
                            <TextCard
                                title="Product automation"
                                description="Activate drip campaigns or a push notification based on customer activity."
                            />
                            <TextCard
                                title="Customized CDP"
                                description="Create a singular customer view by combining event and customer data in one place."
                            />
                            <TextCard
                                title="Generous rate limits"
                                description="Create a singular customer view by combining event and customer data in one place."
                            />
                        </ul>
                    </section>

                    <section>
                        <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 pb-0`}>
                            <div className="bg-accent dark:bg-accent-dark -mx-5 md:-mx-8">
                                <Marquee product={product.capitalized} shortFade>
                                    {questions.map((question, index) => {
                                        return <Question {...question} key={index} />
                                    })}
                                </Marquee>
                            </div>
                        </div>
                    </section>

                    <section id="tutorials" className="mt-[45px]">
                        <h3 className="text-3xl lg:text-4xl text-center mb-2">Featured tutorials</h3>
                        <p className="mt-0 text-opacity-75 text-center mb-6">
                            Visit the <Link to="/tutorials">tutorials</Link> section for more.
                        </p>

                        <ul className="list-none p-0 grid md:grid-cols-4 gap-4 mb-10 md:mb-20 mx-5 md:mx-0">
                            <TutorialCard
                                title="How to use the PostHog API to get insights and persons"
                                description="Use GET requests to retrieve information on insights and persons from your project."
                                url="/tutorials/api-get-insights-persons"
                            />
                            <TutorialCard
                                title="How to use the PostHog API to capture events"
                                description="Using the API directly allows for any language that can send requests to capture events, or completely customize your implementation."
                                url="/tutorials/api-capture-events"
                            />
                            <TutorialCard
                                title="How to set up customer-facing analytics"
                                description="If you're building a B2B2C product, your users may want analytics about their users, which you can provide using the PostHog API."
                                url="/tutorials/customer-facing-analytics"
                            />
                            <TutorialCard
                                title="How to evaluate feature flags with the PostHog API"
                                description="Once your  flag is set up, the request to evaluate the flag is straightforward. All you need is the project API key, and a bit of data."
                                url="/tutorials/api-feature-flags"
                            />
                        </ul>
                    </section>

                    <section id="pricing" className="pt-20">
                        <div className="flex flex-col-reverse md:flex-row md:gap-12">
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                                <p className="">
                                    Use {product.lowercase} for free up to {product.freeTier}.
                                </p>
                            </div>
                            <div className="md:w-96 md:text-right mb-8 md:mb-0 -mt-16">
                                <CloudinaryImage
                                    alt="Just another hedgehog"
                                    placeholder="blurred"
                                    className="w-full max-w-[250px]"
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/error_hog_c2eff84e29.png"
                                />
                            </div>
                        </div>
                        <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                            <div className="flex-grow overflow-auto px-5 md:px-0 mb-8 md:mb-0">
                                <Plans showTitle={false} groupsToShow={['error_tracking']} />
                            </div>

                            <div className="px-5 md:px-0 lg:w-96 lg:mt-4">
                                {/* 
                                <h4 className="text-3xl">FAQs</h4>
                                {faqs.map((faq, index) => {
                                    return <FAQ {...faq} key={index} />
                                })}
                                 */}
                            </div>
                        </div>
                    </section>

                    <section id="docs" className="py-16">
                        <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                        <p className="mt-0 text-opacity-70 text-center">
                            Get a more technical overview of how everything works{' '}
                            <Link to="/docs/api">in our API docs</Link>.
                        </p>
                    </section>

                    <section id="team">
                        <h3 className="text-3xl lg:text-4xl text-center">Meet the team</h3>

                        <p className="text-center mb-0">
                            PostHog works in small teams. The <Link to={teamSlug}>{team}</Link> team is responsible for
                            building this product.
                        </p>
                        <TeamMembers teamName={team} setActiveProfile={setActiveProfile} />
                    </section>

                    <section id="questions" className="my-20 px-5">
                        <h3 className="text-3xl lg:text-4xl text-center mb-2">Questions?</h3>

                        <p className="text-center mb-4">
                            See more questions (or ask your own!) in our community forums.
                        </p>

                        <div className="text-center mb-8">
                            <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                                View {product.lowercase} questions
                            </CallToAction>
                        </div>

                        <Questions topicIds={[351]} />
                    </section>
                </section>

                <section className="mb-12">
                    <PairsWith items={pairsWithItemCount}>
                        {PairsWithArray.map((card, index) => {
                            return <PairsWithItem {...card} key={index} />
                        })}
                    </PairsWith>
                </section>
            </div>

            <div className="max-w-7xl mx-auto relative">
                <section className="mb-12">
                    <CTA />
                </section>
            </div>
        </>
    )
}

export default ProductAPI
