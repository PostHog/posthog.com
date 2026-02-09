import CloudinaryImage from 'components/CloudinaryImage'
import React, { useState } from 'react'
import Link from 'components/Link'
import {
    IconBook,
    IconChat,
    IconCode,
    IconGraph,
    IconRewindPlay,
    IconThoughtBubble,
    IconUser,
    IconBell,
    IconUndo,
    IconInfo,
    IconThumbsUp,
    IconCheck,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
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
import { PostHogAIQuestionInput } from 'components/MaxQuestionInput'
import { CalloutBox } from 'components/Docs/CalloutBox'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { useUser } from 'hooks/useUser'
import { VoteBox } from 'components/Roadmap'
import { useToast } from '../../../hooks/toast'
import Tooltip from 'components/Tooltip'
import Spinner from 'components/Spinner'
import { Authentication } from 'components/Squeak'
import Markdown from 'components/Squeak/components/Markdown'
import headlineImg from './headline.svg'
import betaDesktopImg from './beta-desktop.svg'
import betaMobileImg from './beta-mobile.svg'
import descriptionDesktopImg from './description-desktop.svg'
import descriptionMobileImg from './description-mobile.svg'
import usePostHog from 'hooks/usePostHog'
import IntegrationPrompt from 'components/IntegrationPrompt'

interface MaxPromptButtonProps {
    text: string
    className?: string
}

const MaxPromptButton = ({ text, className = '' }: MaxPromptButtonProps): JSX.Element => {
    const encodedText = encodeURIComponent(text.toLowerCase())
    const maxUrl = `https://app.posthog.com/#panel=max:${encodedText}`

    return (
        <button
            onClick={() => window.open(maxUrl, '_blank')}
            className={`text-red font-sans font-semibold border border-light rounded-full px-2 py-0.5 inline-block text-sm ${className}`}
        >
            {text}
        </button>
    )
}

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

interface RoadmapItem {
    id: string
    attributes: {
        title: string
        description: string
        projectedCompletion: string | null
        dateCompleted: string | null
        complete: boolean
        betaAvailable: boolean
        likes: {
            data: { id: number }[]
        }
    }
}

const Roadmap = () => {
    const [activeProfile, setActiveProfile] = useState<ProfileData | null>(null)
    const { user, likeRoadmap, getJwt } = useUser()
    const { addToast } = useToast()
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [loading, setLoading] = useState<{ [id: string]: boolean }>({})
    const [subscribed, setSubscribed] = useState<{ [id: string]: boolean }>({})
    const [voteLoading, setVoteLoading] = useState<{ [id: string]: boolean }>({})
    const { roadmaps, isLoading, mutate } = useRoadmaps({
        params: {
            filters: {
                $or: [
                    {
                        teams: {
                            name: {
                                $eq: 'PostHog AI',
                            },
                        },
                    },
                    {
                        topic: {
                            id: { $eq: 391 },
                        },
                    },
                ],
            },
        },
        limit: 100,
    })

    const handleLike = async (roadmap: RoadmapItem) => {
        if (!user) {
            setAuthModalOpen(true)
            return
        }
        setVoteLoading((prev) => ({ ...prev, [roadmap.id]: true }))
        const liked = roadmap.attributes.likes.data.some(({ id }) => id === user.profile?.id)
        await likeRoadmap({
            id: parseInt(roadmap.id),
            unlike: liked,
            title: roadmap.attributes.title,
        })
        mutate()
        setVoteLoading((prev) => ({ ...prev, [roadmap.id]: false }))
        addToast({
            description: liked ? 'Removed your vote.' : 'Thanks for voting!',
        })
    }

    const handleSubscribe = async (roadmap: RoadmapItem) => {
        if (!user) {
            setAuthModalOpen(true)
            return
        }

        setLoading((prev) => ({ ...prev, [roadmap.id]: true }))
        try {
            const token = await getJwt()
            const isSubscribed = !!subscribed[roadmap.id]
            const res = await fetch(
                `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmap/${roadmap.id}/${
                    isSubscribed ? 'unsubscribe' : 'subscribe'
                }`,
                {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.ok) {
                setSubscribed((prev) => ({ ...prev, [roadmap.id]: !isSubscribed }))
                addToast({
                    description: isSubscribed
                        ? `Unsubscribed from ${roadmap.attributes.title}. You will no longer receive updates.`
                        : `Subscribed to ${roadmap.attributes.title}. We'll email you with updates!`,
                })
            } else {
                addToast({ error: true, description: 'Whoops! Something went wrong.' })
            }
        } catch (error) {
            console.error(error)
            addToast({ error: true, description: 'Whoops! Something went wrong.' })
        } finally {
            setLoading((prev) => ({ ...prev, [roadmap.id]: false }))
        }
    }

    return (
        <>
            <SideModal title="Sign into PostHog.com" open={authModalOpen} setOpen={setAuthModalOpen}>
                <h4 className="mb-1 text-red">Sign into PostHog.com</h4>
                <div className="bg-border dark:bg-border-dark p-4 mb-2">
                    <p className="text-sm mb-2">
                        <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                    </p>
                    <p className="text-sm mb-0">
                        We suggest signing up with your personal email. Soon you'll be able to link your PostHog app
                        account.
                    </p>
                </div>
                <Authentication
                    initialView="sign-in"
                    onAuth={() => {
                        setAuthModalOpen(false)
                    }}
                    showBanner={false}
                    showProfile={false}
                />
            </SideModal>
            <h2 className="text-4xl text-center mb-8">Roadmap</h2>
            <div className="grid mdlg:grid-cols-3 border border-light">
                <div>
                    <h3 className="text-base text-center bg-[#F5E2B2] px-4 py-2 mb-0 border-b border-light">
                        Under consideration
                    </h3>
                    <div className="flex flex-col h-full divide-y divide-light">
                        {roadmaps
                            .filter(
                                (roadmap: RoadmapItem) =>
                                    !roadmap.attributes.projectedCompletion && !roadmap.attributes.complete
                            )
                            .map((roadmap: RoadmapItem) => (
                                <div key={roadmap.id} className="p-4">
                                    <div className="flex space-x-4 [&>div.vote-box]:bg-[#F5E2B2]">
                                        <VoteBox
                                            likeCount={roadmap.attributes.likes.data.length}
                                            liked={roadmap.attributes.likes.data.some(
                                                ({ id }) => id === user?.profile?.id
                                            )}
                                        />
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold mb-1 leading-tight">
                                                {roadmap.attributes.title}
                                            </h4>
                                            <Markdown className="dark:text-primary">
                                                {roadmap.attributes.description}
                                            </Markdown>
                                            <div className="mt-4">
                                                <CallToAction
                                                    size="sm"
                                                    type={
                                                        roadmap.attributes.likes.data.some(
                                                            ({ id }) => id === user?.profile?.id
                                                        )
                                                            ? 'outline'
                                                            : 'primary'
                                                    }
                                                    disabled={voteLoading[roadmap.id]}
                                                    onClick={() => handleLike(roadmap)}
                                                >
                                                    <span className="flex items-center space-x-1">
                                                        {roadmap.attributes.likes.data.some(
                                                            ({ id }) => id === user?.profile?.id
                                                        ) ? (
                                                            <>
                                                                <IconUndo className="w-4 h-4" />
                                                                <span>Unvote</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <IconThumbsUp className="w-4 h-4" />
                                                                <span>Vote</span>
                                                            </>
                                                        )}
                                                    </span>
                                                </CallToAction>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="mdlg:border-x border-light ">
                    <h3 className="text-base text-center bg-[#F5E2B2] px-4 py-2 mb-0 border-b border-light">
                        In progress
                    </h3>
                    <div className="divide-y divide-light">
                        {roadmaps
                            .filter(
                                (roadmap: RoadmapItem) =>
                                    roadmap.attributes.projectedCompletion && !roadmap.attributes.complete
                            )
                            .map((roadmap: RoadmapItem) => (
                                <div key={roadmap.id} className="p-4">
                                    <div className="flex space-x-4">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold mb-1 leading-tight">
                                                {roadmap.attributes.title}
                                            </h4>
                                            <Markdown className="dark:text-primary">
                                                {roadmap.attributes.description}
                                            </Markdown>
                                            <div className="mt-4 flex gap-2">
                                                <CallToAction
                                                    size="sm"
                                                    type={subscribed[roadmap.id] ? 'outline' : 'primary'}
                                                    disabled={loading[roadmap.id]}
                                                    onClick={() => handleSubscribe(roadmap)}
                                                    className="text-sm font-semibold [&>span]:flex [&>span]:gap-1.5 [&>span]:items-center"
                                                >
                                                    <>
                                                        {loading[roadmap.id] ? (
                                                            <Spinner className="w-[14px] h-[14px] !text-blue" />
                                                        ) : subscribed[roadmap.id] ? (
                                                            <IconUndo className="w-5 h-5 inline-block" />
                                                        ) : roadmap.attributes.betaAvailable ? null : (
                                                            <IconBell className="w-5 h-5 inline-block" />
                                                        )}
                                                        <span>
                                                            {subscribed[roadmap.id]
                                                                ? 'Unsubscribe'
                                                                : roadmap.attributes.betaAvailable
                                                                ? 'Request early access'
                                                                : 'Get updates'}
                                                            {!subscribed[roadmap.id] &&
                                                                !roadmap.attributes.betaAvailable && (
                                                                    <Tooltip
                                                                        content="Get email notifications when the team shares updates about this feature or when it's released."
                                                                        contentContainerClassName="max-w-xs"
                                                                    >
                                                                        <div className="inline-block relative">
                                                                            <IconInfo className="w-4 h-4 ml-1 opacity-50 inline-block" />
                                                                        </div>
                                                                    </Tooltip>
                                                                )}
                                                        </span>
                                                    </>
                                                </CallToAction>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-base text-center bg-[#F5E2B2] px-4 py-2 mb-0 border-b border-light">Shipped</h3>
                    <div className="divide-y divide-light">
                        {roadmaps
                            .filter((roadmap: RoadmapItem) => roadmap.attributes.complete)
                            .map((roadmap: RoadmapItem) => (
                                <div key={roadmap.id} className="p-4">
                                    <div>
                                        <div className="flex-1">
                                            <h4 className="text-lg font-bold mb-1 leading-tight">
                                                {roadmap.attributes.title}
                                            </h4>
                                            {roadmap.attributes.dateCompleted && (
                                                <p className="text-sm opacity-60 mt-2 mb-2">
                                                    Shipped:{' '}
                                                    {new Date(roadmap.attributes.dateCompleted).toLocaleDateString()}
                                                </p>
                                            )}
                                            <Markdown className="dark:text-primary">
                                                {roadmap.attributes.description}
                                            </Markdown>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className="mt-auto text-center pt-8 flex flex-col gap-2 mdlg:flex-row mdlg:justify-center mdlg:items-center pb-8">
                <strong className="">Have an idea for PostHog AI?</strong>
                <CallToAction
                    href="https://github.com/PostHog/posthog/issues"
                    type="secondary"
                    size="sm"
                    childClassName="!text-primary !bg-[#FFF6DE]"
                >
                    Request a feature on GitHub
                </CallToAction>
            </div>
        </>
    )
}

const product = {
    slug: 'max-ai',
    lowercase: 'PostHog AI',
    capitalized: 'PostHog AI',
    freeTier: 'JOETBD',
}

const team = 'PostHog AI'
const teamSlug = '/teams/posthog-ai'

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
        description: 'Let PostHog AI automatically build filters and playlists for you',
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
        description:
            'Explore your product data with graphs, funnels, retention charts, and more just by asking PostHog AI',
        icon: <IconGraph />,
        color: 'blue',
    },
    {
        title: 'Session replays',
        description:
            'Tell PostHog AI what behaviors you are looking for and he can find the matching session recordings',
        icon: <IconRewindPlay />,
        color: 'yellow',
    },
    {
        title: 'SQL insights',
        description:
            'Tired of writing long SQL queries? PostHog AI can do that for you to help you query your data warehouse',
        icon: <IconCode />,
        color: 'seagreen',
    },
    {
        title: 'PostHog docs',
        description: 'Want advice on building your product? PostHog AI can access all our docs and give you tips',
        icon: <IconBook />,
        color: 'green',
    },
]

const comparisonColumnCount = 4
const comparison = [
    {
        feature: 'Understands natural language',
        companies: {
            ChatGPT: true,
            Claude: true,
            PostHog: true,
        },
    },
    {
        feature: 'Writes SQL queries',
        companies: {
            ChatGPT: true,
            Claude: true,
            PostHog: true,
        },
    },
    {
        feature: 'Builds insights',
        companies: {
            ChatGPT: false,
            Claude: false,
            PostHog: true,
        },
    },
    {
        feature: 'Has access to all your data',
        companies: {
            ChatGPT: false,
            Claude: false,
            PostHog: true,
        },
    },
    {
        feature: 'Writes haikus',
        companies: {
            ChatGPT: true,
            Claude: true,
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
        description: 'Create filters and playlists based on user behaviors',
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

export const ProductMax = () => {
    const { fullWidthContent } = useLayoutData()
    const [activeProfile, setActiveProfile] = useState<ProfileData | null>(null)
    const { user, likeRoadmap, getJwt } = useUser()
    const { addToast } = useToast()
    const [loading, setLoading] = useState<{ [id: string]: boolean }>({})
    const [subscribed, setSubscribed] = useState<{ [id: string]: boolean }>({})
    const [voteLoading, setVoteLoading] = useState<{ [id: string]: boolean }>({})
    const [email, setEmail] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [showBeta, setShowBeta] = useState(false)
    const [showMorePrompts, setShowMorePrompts] = useState(false)
    const posthog = usePostHog()

    return (
        <>
            <SEO
                title="PostHog AI - PostHog"
                description="Your AI-powered, product-managing hedgehog"
                image={`/images/og/max-ai.jpg`}
            />
            <SideModal open={!!activeProfile} setOpen={(open) => setActiveProfile(open ? activeProfile : null)}>
                {activeProfile && <Profile profile={activeProfile} />}
            </SideModal>
            <link
                rel="preload"
                as="font"
                type="font/woff"
                href="https://res.cloudinary.com/dmukukwp6/raw/upload/charter_bold_webfont_479d813f7d.woff"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                as="font"
                type="font/woff"
                href="https://res.cloudinary.com/dmukukwp6/raw/upload/charter_bold_webfont_ee994b940c.eot"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                as="font"
                type="font/woff"
                href="https://res.cloudinary.com/dmukukwp6/raw/upload/charter_bold_webfont_cfd6a9556e.ttf"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                as="font"
                type="font/woff"
                href="https://res.cloudinary.com/dmukukwp6/raw/upload/charter_regular_webfont_5fd18ab8a9.ttf"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                as="font"
                type="font/woff"
                href="https://res.cloudinary.com/dmukukwp6/raw/upload/charter_regular_webfont_a7b51e1a63.woff"
                crossOrigin="anonymous"
            />
            <link
                rel="preload"
                as="font"
                type="font/woff"
                href="https://res.cloudinary.com/dmukukwp6/raw/upload/charter_regular_webfont_f2e9d7f011.eot"
                crossOrigin="anonymous"
            />
            <div className="max-ai-body bg-[#FFF6DE] text-primary">
                <div
                    className={`${
                        fullWidthContent ? 'max-w-full' : 'max-w-7xl mx-auto'
                    } px-2 mdlg:px-5 py-4 md:pt-20 pb-0`}
                >
                    <div className="flex flex-col-reverse mdlg:grid mdlg:grid-cols-2 gap-8 xl:gap-16 mb-12 xl:mb-16 px-2 mdlg:px-0">
                        <div className="flex flex-col gap-8 items-center justify-center max-w-4xl mx-auto">
                            <img src={headlineImg} alt="PostHog AI" className="w-full max-w-[604px]" />

                            <div>
                                <img
                                    src={betaMobileImg}
                                    alt="PostHog AI"
                                    className="w-full mdlg:hidden max-w-[222px] mx-auto"
                                />
                                <img
                                    src={betaDesktopImg}
                                    alt="PostHog AI"
                                    className="w-full hidden mdlg:block max-w-[437px] mx-auto"
                                />

                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault()
                                        posthog?.capture('max_ai_subscribed', { email })
                                        setFormSubmitted(true)
                                    }}
                                    className="mt-4 text-center"
                                >
                                    <div
                                        className={`subscription-form-container text-center duration-500 bg-white shadow-2xl rounded-full p-4 inline-flex items-center transition[max-width_0.5s_cubic-bezier(0.4,0,0.2,1)]`}
                                        style={{
                                            maxWidth: formSubmitted ? 120 : 600,
                                            margin: '0 auto',
                                        }}
                                    >
                                        {!formSubmitted ? (
                                            <>
                                                <input
                                                    type="email"
                                                    placeholder="Enter your email"
                                                    className="flex-1 border border-light rounded-l-full rounded-r-none px-4 py-2 bg-[#E5E7E0] text-lg w-full"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <div>
                                                    <CallToAction
                                                        type="primary"
                                                        size="lg"
                                                        className="rounded-r-full rounded-l-none"
                                                        childClassName="rounded-l-none rounded-r-full whitespace-nowrap"
                                                    >
                                                        Join the list
                                                    </CallToAction>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="bg-green text-white p-3 rounded-full">
                                                <IconCheck className="size-6" />
                                            </div>
                                        )}
                                    </div>
                                </form>

                                <div className="mt-4 text-center">
                                    Want to{' '}
                                    <button onClick={() => setShowBeta(!showBeta)} className="text-red font-semibold">
                                        try the beta?
                                    </button>
                                </div>
                            </div>
                        </div>
                        <aside className="bg-[#F5E2B2] px-4 pt-4 max-w-2xl w-full mx-auto rounded-lg shadow-2xl leading-[0] text-center">
                            <CloudinaryImage
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/i_just_asked_max_a4bd43bb9f.png"
                                className="max-w-[442px] mx-auto"
                            />
                        </aside>
                    </div>

                    <div
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${
                            showBeta ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="bg-white border border-light rounded p-4 mb-12 font-serif">
                            <h3 className="font-bold">Try PostHog AI beta</h3>
                            <div className="mb-4">
                                <p className="mb-2">
                                    <strong>1. New to PostHog?</strong> <br />
                                    <span className="inline-block pl-5">
                                        Install with PostHog AI in 90 seconds or{' '}
                                        <CallToAction
                                            href="https://app.posthog.com/signup"
                                            type="custom"
                                            size="sm"
                                            className="!bg-transparent !top-0 !border-none"
                                            childClassName="!p-0 !bg-transparent !text-red !border-none !font-semibold !text-base !border-none !m-0 !border-none !translate-y-0"
                                        >
                                            sign up the old fashioned way
                                        </CallToAction>
                                        .
                                    </span>
                                </p>
                                <div className="pl-5">
                                    <IntegrationPrompt />
                                </div>
                            </div>
                            <p className="mb-0">
                                <strong>2. Already use PostHog?</strong> <br />
                                <span className="inline-block pl-5">
                                    Look for the PostHog AI button in the side panel in the app (top right)!
                                </span>
                            </p>
                        </div>
                    </div>

                    <div className="text-center mb-12">
                        <img
                            src={descriptionMobileImg}
                            alt="PostHog AI"
                            className="w-full mdlg:hidden max-w-[412px] mx-auto"
                        />
                        <img
                            src={descriptionDesktopImg}
                            alt="PostHog AI"
                            className="w-full hidden mdlg:block max-w-[619px] mx-auto"
                        />
                    </div>

                    <div className="mb-12">
                        <div className="max-w-3xl mx-auto p-4 mdlg:p-8 bg-white shadow-xl rounded-lg prose dark:text-primary font-serif">
                            <h3 className="font-bold">We're building a real product manager in your browser.</h3>
                            <p>PostHog AI is so much more than just a chat interface for your data. </p>

                            <h3 className="font-bold">What PostHog AI can do today</h3>
                            <ol className="space-y-1">
                                <li>
                                    Answers product usage questions
                                    <div className="flex flex-wrap gap-1 my-1">
                                        <MaxPromptButton text="What's my churn rate?" />
                                        <MaxPromptButton text="Show me user retention by country" />
                                        <MaxPromptButton text="What's our most popular feature?" />
                                        <MaxPromptButton text="What's my ARR?" />
                                        <MaxPromptButton text="Where do my users drop off?" />
                                        {!showMorePrompts && (
                                            <button
                                                onClick={() => setShowMorePrompts(true)}
                                                className="text-red font-semibold border border-light rounded-full px-2 py-0.5 inline-block text-sm font-sans"
                                            >
                                                Show more prompts
                                            </button>
                                        )}

                                        {showMorePrompts && (
                                            <>
                                                <MaxPromptButton text="What are my most popular pages?" />
                                                <MaxPromptButton text="What is distribution of paid vs. organic traffic?" />
                                                <MaxPromptButton text="Write an SQL query for me?" />
                                                <MaxPromptButton text="How many pageviews did we get today?" />
                                                <MaxPromptButton text="Show me a signup funnel" />
                                            </>
                                        )}
                                    </div>
                                    <small className="block mb-1">
                                        (If you're signed into PostHog, click one of these prompts to try it out!)
                                    </small>
                                </li>
                                <li>Filter a playlist of session recordings</li>
                                <li>Generate SQL queries without having to understand SQL at all.</li>
                                <li>Explain how to use PostHog features, or best practices for using our products</li>
                                <li>Add PostHog's tracking code to your new project automatically</li>
                            </ol>

                            <h3 className="font-bold">What PostHog AI doesn't do... yet!</h3>
                            <p>
                                PostHog AI works great for precise questions or requests. "How many companies signed up
                                in the last month" will likely work well, "What should I build next" won't.
                            </p>

                            <h3 className="font-bold">What's next for PostHog AI?</h3>
                            <p>
                                Wider tool use across all our products. The whole shebang. Automatic feature flag use,
                                finding important errors and so on.
                            </p>
                            <p>
                                Deep research mode. PostHog AI will build a deep understanding of your customers and
                                product to answer questions, pulling together context from all our tools and data – like
                                an automatic PM or analyst.
                            </p>
                            <p>
                                Automatic event and feature capture. PostHog AI will integrate with your codebase to
                                detect and add event tracking to new features that we detect automatically.
                            </p>
                            <p>
                                Feel free to{' '}
                                <Link to="https://github.com/PostHog/posthog/issues" external>
                                    create a GitHub issue
                                </Link>{' '}
                                and we'll add new ideas to our roadmap when we're considering PostHog AI's future
                                superpowers.
                            </p>
                        </div>
                    </div>

                    <div className="mb-12">
                        <PostHogAIQuestionInput
                            className="bg-[#f5e2b1] border-[#F5E2B2] shadow-xl"
                            placeholder="Ask PostHog AI anything about your product data..."
                        />
                    </div>

                    <section id="roadmap" className="mt-20 dark:text-primary">
                        <Roadmap />
                    </section>

                    <section id="pricing" className="pt-20">
                        <div className="flex flex-col-reverse md:flex-row md:gap-12">
                            <div className="flex-1">
                                <h2 className="text-4xl md:text-5xl">Usage-based pricing</h2>
                                <p className="mb-2">We have big free tiers on all our products.</p>
                                <p>
                                    <strong>PostHog AI is free during beta</strong> and doesn't cost anything extra. We
                                    will charge something, but with a generous free tier, when it's out of beta.
                                </p>
                            </div>
                            <div className="md:w-96 md:text-right mb-8 md:mb-0 -mt-16">
                                <CloudinaryImage
                                    alt="PostHog AI assistant"
                                    placeholder="blurred"
                                    className="w-full max-w-[250px]"
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/robot_f2dfddda15.png"
                                />
                            </div>
                        </div>

                        <div className="lg:flex justify-between items-start gap-12 -mx-5 md:mx-0">
                            <div className="flex-grow overflow-auto px-5 md:px-0 mb-8 md:mb-0">
                                <Plans showTitle={false} groupsToShow={['posthog_ai']} />
                            </div>
                        </div>
                    </section>

                    <section id="posthog-vs">
                        <h2 className="text-center text-3xl lg:text-4xl">PostHog vs...</h2>
                        <Comparison
                            comparison={comparison}
                            columnCount={comparisonColumnCount}
                            truncate={false}
                            className="text-primary"
                        />
                    </section>

                    <section className="">
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
                                className="!bg-transparent"
                            >
                                <ul>
                                    <li>
                                        You like alt-tabbing and copy-pasting to other tools, like ChatGPT or Claude
                                    </li>
                                    <li>
                                        You'd like to talk with your assistant out loud (PostHog AI doesn't have voice
                                        mode yet)
                                    </li>
                                    <li>You want to remake a pic in Studio Ghibli's style (ChatGPT is still best)</li>
                                </ul>
                            </VsCompetitor>
                            <VsPostHog className="!bg-transparent">
                                <ul>
                                    <li>You want questions and answers in one place</li>
                                    <li>
                                        You want the AI to have access to data by default, with no copy-pasting or
                                        context adding
                                    </li>
                                    <li>You want it to help create insights you can directly edit yourself later</li>
                                    <li>You want to query your data, replays, and more</li>
                                </ul>
                            </VsPostHog>
                        </div>

                        <p className="text-center text-sm font-medium">
                            Have questions about PostHog AI? <br className="md:hidden" />
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
                            menu={
                                docsMenu.children.find(({ name }) => name.toLowerCase() === 'posthog ai')?.children ||
                                []
                            }
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

                    <section id="questions" className="my-20 px-5 hidden">
                        <h3 className="text-3xl lg:text-4xl text-center mb-2">Questions?</h3>

                        <p className="text-center mb-4">
                            See more questions (or ask your own!) in our community forums.
                        </p>

                        <div className="text-center mb-8">
                            <CallToAction href={`/questions/${product.slug}`} type="secondary" size="sm">
                                <span>View {product.lowercase} questions</span>
                            </CallToAction>
                        </div>

                        <Questions topicIds={[391]} />
                    </section>

                    <section className="py-12">
                        <PairsWith items={pairsWithItemCount}>
                            {PairsWithArray.map((card, index) => {
                                return <PairsWithItem {...card} key={index} />
                            })}
                        </PairsWith>
                    </section>
                </div>
            </div>
            <div className="max-ai-body bg-[#FFF6DE]">
                <div className="max-w-7xl mx-auto relative">
                    <section>
                        <CTA />
                    </section>
                </div>
            </div>
        </>
    )
}

export default ProductMax
