import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import { IconBook, IconChat, IconCode, IconGraph, IconRewindPlay, IconThoughtBubble, IconUser } from '@posthog/icons'
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
import { VsCompetitor } from 'components/Products/Competitor'
import { VsPostHog } from 'components/Products/Competitor/VsPostHog'
import Comparison from '../Comparison'
import { useStaticQuery, graphql } from 'gatsby'
import { MaxQuestionInput } from 'components/MaxQuestionInput'

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
    slug: 'max-ai',
    lowercase: 'Max AI',
    capitalized: 'Max AI',
    freeTier: 'JOETBD',
}

const team = 'Max AI'
const teamSlug = '/teams/max-ai'

const featuresPerRow = 3
const features = [
    {
        title: '"How many sign-ups this week?"',
        description: 'Get answers as big numbers, graphs, funnels, and more',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/big_number_e3383350cb.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: '"Show me users who have rageclicked"',
        description: 'Let Max automatically build filters and playlists for you',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/table_cedb252de2.png"
                width={428}
                placeholder="none"
            />
        ),
    },
    {
        title: '"What is ARRRR?"',
        description: 'Get advice on best practices for your product',
        image: (
            <CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/short_aarrr_e2143decd4.png"
                width={428}
                placeholder="none"
            />
        ),
    },
]

const subfeaturesItemCount = 4
const subfeatures = [
    {
        title: 'Product analytics',
        description: 'Explore your product data with graphs, funnels, retention charts, and more just by asking Max',
        icon: <IconGraph />,
        color: 'blue',
    },
    {
        title: 'Session replays',
        description: 'Tell Max what behaviours you are looking for and he can find the matching session recordings',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'SQL insights',
        description: 'Tired of writing long SQL queries? Max can do that for you to help you query your data warehouse',
        icon: <IconCode />,
        color: 'seagreen',
    },
    {
        title: 'PostHog docs',
        description: 'Want advice on building your product? Max can access all our docs and give you tips',
        icon: <IconBook />,
        color: 'green',
    },
]

const questions = [
    {
        question: 'Where do my users drop off?',
        url: 'https://app.posthog.com/#panel=max:!%where%20do%users%dropoff%3F',
    },
    {
        question: 'What are my most popular pages?',
        url: 'https://app.posthog.com/#panel=max:!what are my most popular pages?',
    },
    {
        question: 'What is distribution of paid vs. organic traffic?',
        url: 'https://app.posthog.com/#panel=max:!what is the distribution of paid vs organic traffic?',
    },
    {
        question: 'Write an SQL query for me?',
        url: 'https://app.posthog.com/#panel=max:!write an sql query for me',
    },
    {
        question: 'What is my ARR?',
        url: 'https://app.posthog.com/#panel=max:!what is my arr?',
    },
    {
        question: 'How many pageviews did we get today?',
        url: 'https://app.posthog.com/#panel=max:!how many pageviews did we get today?',
    },
    {
        question: 'Show me a signup funnel',
        url: 'https://app.posthog.com/#panel=max:!show me a signup funnel',
    },
]

const comparisonColumnCount = 4
const comparison = [
    {
        feature: 'Understands natural language',
        companies: {
            ChatGPT: true,
            Anthropic: true,
            PostHog: true,
        },
    },
    {
        feature: 'Writes SQL queries',
        companies: {
            ChatGPT: true,
            Anthropic: true,
            PostHog: true,
        },
    },
    {
        feature: 'Builds insights',
        companies: {
            ChatGPT: true,
            Anthropic: true,
            PostHog: true,
        },
    },
    {
        feature: 'Understands your data',
        companies: {
            ChatGPT: false,
            Anthropic: false,
            PostHog: true,
        },
    },
    {
        feature: 'Writes haikus',
        companies: {
            ChatGPT: true,
            Anthropic: true,
            PostHog: true,
        },
    },
    {
        feature: 'Is a pretend hedgehog',
        companies: {
            ChatGPT: false,
            Anthropic: false,
            PostHog: true,
        },
    },
]

const pairsWithItemCount = 3
const PairsWithArray = [
    {
        title: 'Product Analytics',
        description: 'Ask questions about your product data, get instant answers',
        icon: <IconGraph />,
        product: 'Product Analytics',
        url: '/product-analytics',
        color: 'blue',
    },
    {
        title: 'Session Replay',
        description: 'Create filters and playlists based on user behaviours',
        icon: <IconRewindPlay />,
        product: 'Session Replay',
        url: '/session-replay',
        color: 'yellow',
    },
    {
        title: 'Documentation',
        description: "We write lots of content. Now it's at your fingertips.",
        icon: <IconBook />,
        product: 'Documentation',
        url: '/docs',
        color: 'seagreen',
    },
]

export const ProductMaxAI = () => {
    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState<ProfileData | null>(null)

    return (
        <>
            <SEO
                title="Max AI - PostHog"
                description="Your AI-powered, product-managing hedgehog"
                image={`/images/og/max-ai.jpg`}
            />
            <SideModal open={!!activeProfile} setOpen={(open) => setActiveProfile(open ? activeProfile : null)}>
                {activeProfile && <Profile profile={activeProfile} />}
            </SideModal>
            <div className={`${fullWidthContent ? 'max-w-full px-8' : 'max-w-7xl mx-auto'} px-5 py-10 md:pt-20 pb-0`}>
                <Hero
                    icon={<IconThoughtBubble />}
                    product={product.capitalized}
                    title='These days everyone has an AI. <br /><span class="text-red dark:text-yellow">But ours is a hedgehog powered by Product OS.</span>'
                    description="Use natural language to get instant answers, find replays, and more"
                    image="https://res.cloudinary.com/dmukukwp6/image/upload/robot_f2dfddda15.png"
                />

                <div className="max-w-3xl mx-auto mt-18 mb-18">
                    <MaxQuestionInput />
                </div>

                <div className="text-center mt-18 mb-18"></div>

                <section id="features" className="-mt-28 pt-36 mt-18">
                    <h3 className="text-2xl md:text-2xl text-center">
                        No data in PostHog yet? Here's how Max can help you across multiple products.
                    </h3>
                </section>

                <div className="mt-12">
                    <ul
                        className={`grid md:grid-cols-2 lg:grid-cols-${subfeaturesItemCount} gap-8 mt-12 list-none p-0`}
                    >
                        {subfeatures.map((subfeature, index) => (
                            <Subfeature key={index} {...subfeature} />
                        ))}
                    </ul>
                </div>

                <div className="py-12">
                    <ul className={`grid md:grid-cols-2 lg:grid-cols-${featuresPerRow} gap-8 list-none p-0`}>
                        {features.map((feature, index) => (
                            <Feature key={index} {...feature} />
                        ))}
                    </ul>
                </div>

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

                <section id="pricing" className="pt-20">
                    <div className="flex flex-col-reverse md:flex-row md:gap-12">
                        <div className="flex-1">
                            <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                            <p className="">Use Max AI for free up to {product.freeTier} queries per month.</p>
                        </div>
                        <div className="md:w-96 md:text-right mb-8 md:mb-0 -mt-16">
                            <CloudinaryImage
                                alt="Max AI assistant"
                                placeholder="blurred"
                                className="w-full max-w-[250px]"
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/robot_f2dfddda15.png"
                            />
                        </div>
                    </div>

                    <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                        <div className="flex-grow overflow-auto px-5 md:px-0 mb-8 md:mb-0">
                            <Plans showTitle={false} groupsToShow={['max_ai']} />
                        </div>
                    </div>
                </section>

                <section id="posthog-vs">
                    <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                    <Comparison comparison={comparison} columnCount={comparisonColumnCount} />
                </section>

                <section>
                    <div className="flex flex-col-reverse items-center md:flex-row gap-8 mb-20">
                        <div className="flex-1">
                            <h2 className="text-4xl">
                                "Hang on,{' '}
                                <span className="text-red dark:text-yellow">how does Max AI use my data?</span>"
                            </h2>
                            <p>
                                Max can access any data which is already stored in PostHog, such as events, persons,
                                sessions and groups, as well as various schema. You can also give him additional
                                information directly.
                            </p>
                            <p>
                                When you ask a question, relevant data gets shared with{' '}
                                <a href="/docs/max-ai#is-my-data-shared-with-third-parties">our LLM providers</a>. All
                                of these providers are bound by regulations such as GDPR, CCPA, and others. We also
                                offer a <a href="/dpa">DP-yay policy</a>, which you can sign if you want additional
                                peace of mind.
                            </p>
                            <p>
                                Want more info about how PostHog handles GDPR, HIPAA, and other regulations? Check{' '}
                                <a href="/docs/privacy">our privacy docs</a>.
                            </p>
                        </div>
                        <aside className="shrink-0 md:basis-[400px] self-end">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/confused_small_8cc411c714.png"
                                alt="confused hedgehog"
                                className="w-full max-w-[350px]"
                            />
                        </aside>
                    </div>
                </section>

                <section>
                    <h3 className="text-center mb-8">So, what's best for you?</h3>
                    <div className="@container mb-8 mx-5 md:mx-0 grid md:grid-cols-2 gap-4">
                        <VsCompetitor
                            title="Reasons a competitor may be best for you (for now...)"
                            image={
                                <CloudinaryImage
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/images/products/competitors-ff.png"
                                    className="max-w-[176px]"
                                />
                            }
                        >
                            <ul>
                                <li>You like alt-tabbing out to other tools, like ChatGPT or Anthropic</li>
                                <li>You prefer only to share copy-pasted info with an AI, piece by piece</li>
                            </ul>
                        </VsCompetitor>
                        <VsPostHog>
                            <ul>
                                <li>You want questions and answers in one place</li>
                                <li>
                                    You want the AI to have access to data by default, with no copy-pasting or context
                                    adding
                                </li>
                                <li>You want it to help create insights you can directly edit yourself later</li>
                                <li>You want to query your data, replays, and more</li>
                            </ul>
                        </VsPostHog>
                    </div>

                    <p className="text-center text-sm font-medium">
                        Have questions about Max AI? <br className="md:hidden" />
                        <Link to={`/questions/${product.slug}`}>Ask the community</Link> or{' '}
                        <Link to="/talk-to-a-human">book a demo</Link>.
                    </p>
                </section>

                <section id="docs" className="py-16">
                    <h3 className="text-3xl lg:text-4xl text-center mb-2">Explore the docs</h3>
                    <p className="mt-0 text-opacity-70 text-center">
                        Get a more technical overview of how everything works <Link to="/docs">in our docs</Link>.
                    </p>
                    <DocLinks
                        menu={docsMenu.children.find(({ name }) => name.toLowerCase() === 'max ai')?.children || []}
                    />
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

                    <p className="text-center mb-4">See more questions (or ask your own!) in our community forums.</p>

                    <div className="text-center mb-8">
                        <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                            <span>View {product.lowercase} questions</span>
                        </CallToAction>
                    </div>

                    <Questions topicIds={[391]} />
                </section>

                <section className="pb-12">
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

export default ProductMaxAI
