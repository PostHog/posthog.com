import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import { communityMenu } from '../navs'
import { useLayoutData } from 'components/Layout/hooks'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { Link } from 'gatsby'
import { IconCake, IconConfetti } from '@posthog/icons'
import { Twitter } from 'components/Icons/Icons'
import { usePosts } from 'components/Edition/hooks/usePosts'
import Questions from 'components/InsidePostHog/Questions'
import { useQuestions } from 'hooks/useQuestions'
import Markdown from 'components/Squeak/components/Markdown'
import Newbies from 'components/InsidePostHog/Newbies'
import PersonCard from 'components/InsidePostHog/PersonCard'
import WIP from 'components/InsidePostHog/WIP'
import Anniversaries from 'components/InsidePostHog/Anniversaries'
import Merch from 'components/InsidePostHog/Merch'
import Posts from 'components/InsidePostHog/Posts'
import Newsletter from 'components/InsidePostHog/Newsletter'

const quote =
    "Let your work shine as brightly as a hedgehog's quills, threading through life's challenges with perseverance."

const TabButton = ({ active, onClick, children, className = '' }) => {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 md:py-1 rounded flex-1 text-[15px] md:text-sm border relative opacity-75 ${
                active
                    ? 'bg-white hover:bg-white dark:bg-dark dark:hover:bg-dark text-primary dark:text-primary-dark font-bold border border-light dark:border-dark'
                    : 'border-transparent hover:border-light dark:hover:border-dark hover:scale-[1.01] hover:top-[-.5px] active:top-[.5px] active:scale-[.99] font-semibold text-primary/75 dark:text-primary-dark/75 hover:text-primary dark:hover:text-primary-dark'
            } ${className}`}
        >
            {children}
        </button>
    )
}

const PersonSpotlight = ({ title, content, byline, image, cta }) => {
    return (
        <div>
            {image && <aside className="float-right ml-1 mb-1">{image}</aside>}
            <h3 className="text-base mb-1">{title}</h3>
            <div className="text-sm [&_*]:text-sm [&>*]:mb-2" dangerouslySetInnerHTML={{ __html: content }} />

            {byline && (
                <p className="text-[13px] opacity-75">
                    <em>{byline}</em>
                </p>
            )}

            {cta ? cta : null}
        </div>
    )
}

const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
        case 'none':
            return 'text-green'
        case 'minor':
            return 'text-yellow'
        case 'major':
            return 'text-red'
        case 'critical':
            return 'text-red'
        default:
            return 'text-gray'
    }
}

const getStatusDescription = (status?: string) => {
    switch (status?.toLowerCase()) {
        case 'none':
            return 'All systems operational'
        case 'minor':
            return 'Minor issues'
        case 'major':
            return 'Major issues'
        case 'critical':
            return 'Critical issues'
        default:
            return ''
    }
}

const SlackPosts = () => {
    const { questions } = useQuestions({
        filters: {
            topics: {
                label: {
                    $startsWith: '#',
                },
            },
        },
    })

    return questions?.data?.length > 0 ? (
        <div className="py-4">
            <h3 className="text-base">From the PostHog Slack</h3>
            <ul className="list-none m-0 p-0 space-y-4">
                {questions.data.map(({ id, attributes: { topics, body, profile } }) => {
                    const topic = topics?.data?.[0]?.attributes?.label
                    const name = [profile?.data?.attributes?.firstName, profile?.data?.attributes?.lastName]
                        .filter(Boolean)
                        .join(' ')
                    return (
                        <li key={id}>
                            <h5 className="opacity-50 text-sm m-0">{topic}</h5>
                            <p className="text-sm m-0 my-2">
                                <span className="opacity-50">Shared by</span>{' '}
                                <Link to={`/community/profiles/${profile?.data?.id}`}>{name}</Link>
                            </p>
                            <div className="article-content">
                                <Markdown>{body}</Markdown>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    ) : null
}

const Header = () => {
    const currentDate = new Date()
    const [appStatus, setAppStatus] = useState()
    const { fullWidthContent } = useLayoutData()

    useEffect(() => {
        fetch('https://status.posthog.com/api/v2/status.json')
            .then((res) => res.json())
            .then((data) => {
                setAppStatus(data?.status?.indicator)
            })
    }, [])

    return (
        <section
            className={`bg-accent grid md:grid-cols-[200px_1fr_200px] my-4 md:mb-8 mx-5 p-2 items-center transition-all ${
                fullWidthContent ? '' : 'max-w-[1400px] mx-auto'
            }`}
        >
            <div className="hidden md:block text-sm pl-4">
                {currentDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </div>
            <div className="text-center py-2">
                <h1 className="mb-0 tracking-tight uppercase font-bold text-2xl">Community news</h1>
            </div>
            <div className="hidden md:block pr-4">
                <div className="flex gap-1 items-center justify-end">
                    <span className={`text-2xl -mt-1 ${getStatusColor(appStatus)}`}>&bull;</span>
                    <span className="text-sm">{getStatusDescription(appStatus)}</span>
                </div>
            </div>
        </section>
    )
}

const Main = () => {
    const { fullWidthContent } = useLayoutData()

    return (
        <section
            className={`@container grid sm:flex sm:flex-wrap lg:grid lg:grid-cols-[220px_1fr_260px] xl:grid-cols-[300px_1fr_300px] gap-4 sm:gap-8 mx-auto px-5 mb-12 transition-all ${
                fullWidthContent ? '' : 'max-w-[1400px] mx-auto'
            }`}
        >
            <aside className="order-3 @sm:flex-[0_0_100%] sm:border-t border-light dark:border-dark lg:border-t-0 sm:pt-8 lg:pt-0 lg:order-none flex flex-col ">
                <div className="grid @sm:grid-cols-2 gap-4 @sm:gap-8 divide-y divide-border dark:divide-border-dark">
                    <PersonSpotlight
                        title="A note from the editor"
                        content="<p>Welcome to <em>Inside PostHog</em> - our community newspaper. Find our latest posts, community questions, and everything else that's happening in the world of PostHog."
                        byline="- Andy, Editor-in-Chief"
                        image={
                            <div className="w-24 rounded-full overflow-hidden bg-yellow">
                                <StaticImage src="../../static/images/authors/andy-vandervell-posthog.png" />
                            </div>
                        }
                    />

                    <div className="text-center py-4 px-2">
                        <p className="mb-2">
                            <em>"{quote}"</em>
                        </p>
                        <p className="text-sm opacity-75 mb-0">
                            <em>- Max, our resident hedgehog</em>
                        </p>
                    </div>

                    <SlackPosts />

                    <div className="py-4">
                        <PersonSpotlight
                            title="Meet a team member"
                            content="<p>James G is coming up on his 4-year anniversary. When he's not restarting servers, you can likely find him out on a trail."
                            image={
                                <div className="w-24 rounded-full overflow-hidden bg-salmon">
                                    <StaticImage src="../../static/images/authors/james-greenhill-posthog.png" />
                                </div>
                            }
                            cta={<Link to="/community/profiles/90">Learn more about James G.</Link>}
                        />
                    </div>

                    <div className="py-4 grid gap-5">
                        <div>
                            <h3 className="text-base">People news</h3>

                            <div className="flex gap-1 items-center">
                                <div>
                                    <IconConfetti className="w-8 h-8 text-primary/50 dark:text-accent-dark/50" />
                                </div>
                                <h4 className="font-semibold opacity-75 text-[15px] mb-0">Welcome to PostHog!</h4>
                            </div>
                            <Newbies />
                        </div>

                        <div>
                            <div className="flex gap-1 items-center">
                                <div>
                                    <IconCake className="w-8 h-8 text-primary/50 dark:text-primary-dark/50" />
                                </div>
                                <h4 className="font-semibold opacity-75 text-[15px] mb-0">Thanks for being here!</h4>
                            </div>

                            <Anniversaries />
                        </div>
                    </div>
                </div>
            </aside>
            <section className="order-1 sm:flex-1 lg:order-none sm:border-r sm:pr-8 lg:px-8 lg:border-x border-light dark:border-dark">
                <div
                    className={`divide-y divide-border dark:divide-border-dark flex flex-col gap-4 transition-all ${
                        fullWidthContent ? '' : 'max-w-2xl mx-auto'
                    }`}
                >
                    <Posts />

                    <div className="pt-4 pb-0 @md:pt-8 @md:pb-4">
                        <h3 className="hidden @md:block">Subscribe to our newsletter</h3>
                        <Newsletter />
                    </div>

                    <div className="py-4">
                        <WIP />
                    </div>
                </div>
            </section>
            <aside className="order-2 sm:flex-[0_0_260px] md:flex-[0_0_300px] lg:order-none flex flex-col gap-4 divide-y divide-border dark:divide-border-dark">
                <Questions />

                <Merch />

                <div className="py-4">
                    <PersonSpotlight
                        title="A musing from the CEO"
                        content="<p>what motivates us:</p>
            <ol>
                <li>building an epic product and company</li>
                <li>figuring out how far we can go</li>
                <li>helping engineers build products</li>
                <li>beating all the point solution competitors</li>
                <li>having customers buy from us instead of us selling to them</li>
            </ol>"
                        image={
                            <div className="w-24 rounded-full overflow-hidden bg-yellow">
                                <StaticImage src="../../static/images/authors/james-hawkins-posthog.png" />
                            </div>
                        }
                        cta={
                            <div className="mt-4">
                                <CallToAction
                                    href="https://x.com/james406"
                                    width="[calc(100%_+_3px)]"
                                    type="secondary"
                                    size="sm"
                                    externalNoIcon
                                >
                                    <div className="flex justify-center items-center gap-1">
                                        <span>Follow James on</span>
                                        <Twitter className="h-4 w-4 mr-1 inline-block" />
                                    </div>
                                </CallToAction>
                            </div>
                        }
                    />
                </div>
            </aside>
        </section>
    )
}

export default function InsidePostHog() {
    return (
        <Layout parent={communityMenu}>
            <SEO title="Community - PostHog" />

            <Header />
            <Main />
        </Layout>
    )
}
