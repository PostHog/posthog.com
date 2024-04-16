import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import { communityMenu } from '../navs'
import { useUser } from 'hooks/useUser'
import { useLayoutData } from 'components/Layout/hooks'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import { Link } from 'gatsby'
import { IconCake, IconConfetti } from '@posthog/icons'
import { Twitter } from 'components/Icons/Icons'
import { usePosts } from 'components/Edition/hooks/usePosts'
import Questions from 'components/InsidePostHog/Questions'

const quote =
    "Let your work shine as brightly as a hedgehog's quills, threading through life's challenges with perseverance."

const FeaturedPost = ({ attributes: { featuredImage, title, excerpt, post_category, slug } }) => {
    return (
        <Link className="text-inherit hover:text-inherit font-normal" to={slug}>
            <img className="w-full" src={featuredImage?.url} />
            <p className="text-sm opacity-60 mt-3 mb-1">{post_category?.data?.attributes?.label}</p>
            <h2 className="mb-2">{title}</h2>
            <p>{excerpt}</p>
        </Link>
    )
}

const PostPreview = ({ attributes: { featuredImage, title, excerpt, post_category, slug } }) => {
    return (
        <Link
            to={slug}
            className="text-inherit hover:text-inherit font-normal grid @xl:grid-cols-2 xl:grid-cols-[1fr_35%] 2xl:grid-cols-[1fr_40%] gap-4 items-center transition-all"
        >
            <div className="@xl:order-2">
                <img className="w-full" src={featuredImage?.url} />
            </div>
            <div className="@xl:order-1">
                <p className="text-sm opacity-75 m-0">{post_category?.data?.attributes?.label}</p>
                <h3 className="text-[17px] xl:text-xl 2xl:text-2xl mb-2">{title}</h3>
                <p>{excerpt}</p>
            </div>
        </Link>
    )
}

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

const PersonCard = ({ image, name, stat }) => {
    return (
        <li className="flex items-center gap-1">
            {image}
            <div>
                <p className="m-0 leading-tight">
                    <Link to="#">{name}</Link>
                </p>
                <p className="text-[13px] leading-tight opacity-75 m-0">{stat}</p>
            </div>
        </li>
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
            return 'No status available'
    }
}

export default function InsidePostHog() {
    const { fullWidthContent } = useLayoutData()
    const currentDate = new Date()
    const [appStatus, setAppStatus] = useState()

    const { posts, isLoading } = usePosts({
        params: {
            filters: {
                $and: [
                    {
                        featuredImage: {
                            url: {
                                $notNull: true,
                            },
                        },
                    },
                    {
                        featuredImage: {
                            image: {
                                id: {
                                    $notNull: true,
                                },
                            },
                        },
                    },
                    {
                        post_category: {
                            id: {
                                $notNull: true,
                            },
                        },
                    },
                ],
            },
        },
    })

    useEffect(() => {
        fetch('https://status.posthog.com/api/v2/status.json')
            .then((res) => res.json())
            .then((data) => {
                setAppStatus(data?.status?.indicator)
            })
    }, [])

    return (
        <Layout parent={communityMenu}>
            <SEO title="Community - PostHog" />

            <section className="bg-accent grid md:grid-cols-[200px_1fr_200px] my-4 mx-5 p-2 items-center">
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

            <section
                className={`grid md:grid-cols-[300px_1fr_300px] gap-4 mx-auto px-5 mb-12 ${
                    fullWidthContent ? 'max-w-[1400px] mx-auto' : ''
                }`}
            >
                <aside className="order-3 md:order-none flex flex-col gap-4 divide-y divide-border dark:divide-border-dark">
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

                    <div className="py-4">
                        <h3 className="text-base">From the PostHog Slack</h3>
                    </div>

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

                            <ul className="list-none grid gap-3 mt-2">
                                <PersonCard
                                    name="Zack Waterfield"
                                    stat="Growth Engineer"
                                    image={
                                        <div className="w-9 rounded-full overflow-hidden bg-salmon">
                                            <StaticImage src="../../static/images/authors/james-greenhill-posthog.png" />
                                        </div>
                                    }
                                />
                                <PersonCard
                                    name="Steven Shultz"
                                    stat="Support Engineer"
                                    image={
                                        <div className="w-9 rounded-full overflow-hidden bg-blue">
                                            <StaticImage src="../../static/images/authors/james-greenhill-posthog.png" />
                                        </div>
                                    }
                                />
                            </ul>
                        </div>

                        <div>
                            <div className="flex gap-1 items-center">
                                <div>
                                    <IconCake className="w-8 h-8 text-primary/50 dark:text-primary-dark/50" />
                                </div>
                                <h4 className="font-semibold opacity-75 text-[15px] mb-0">Thanks for being here!</h4>
                            </div>

                            <ul className="list-none grid gap-3 mt-2">
                                <PersonCard
                                    name="Marius Andra"
                                    stat="4 year anniversary"
                                    image={
                                        <div className="w-9 rounded-full overflow-hidden bg-yellow">
                                            <StaticImage src="../../static/images/authors/james-greenhill-posthog.png" />
                                        </div>
                                    }
                                />
                                <PersonCard
                                    name="Eric Duong"
                                    stat="4 year anniversary"
                                    image={
                                        <div className="w-9 rounded-full overflow-hidden bg-teal">
                                            <StaticImage src="../../static/images/authors/james-greenhill-posthog.png" />
                                        </div>
                                    }
                                />
                                <PersonCard
                                    name="James Greenhill"
                                    stat="4 year anniversary"
                                    image={
                                        <div className="w-9 rounded-full overflow-hidden bg-salmon">
                                            <StaticImage src="../../static/images/authors/james-greenhill-posthog.png" />
                                        </div>
                                    }
                                />
                            </ul>
                        </div>
                    </div>
                </aside>
                <section className="@container order-1 md:order-none md:px-4 md:border-x border-light dark:border-dark">
                    <div
                        className={`divide-y divide-border dark:divide-border-dark flex flex-col gap-4 ${
                            fullWidthContent ? 'max-w-2xl mx-auto' : ''
                        }`}
                    >
                        <div className="flex flex-col gap-4">
                            {isLoading ? null : <FeaturedPost {...posts?.[0]} />}

                            {isLoading
                                ? null
                                : posts?.slice(1, 3).map((post, index) => {
                                      return <PostPreview key={index} {...post} />
                                  })}

                            <div>
                                <CallToAction href="/posts" type="secondary" size="sm" width="[calc(100%_+_3px)]">
                                    More posts
                                </CallToAction>
                            </div>
                        </div>

                        <div className="py-4">
                            <h3>Subscribe to our newsletter</h3>
                        </div>

                        <div className="py-4">
                            <h3>WIP</h3>
                        </div>
                    </div>
                </section>
                <aside className="order-2 md:order-none flex flex-col gap-4 divide-y divide-border dark:divide-border-dark">
                    <Questions />

                    <div>
                        <div className="bg-white p-4 border border-light dark:border-dark my-4">
                            <h3 className="text-lg text-center italic leading-tight">
                                "Some of the best company swag I've ever seen"
                            </h3>
                            {/* quote source: https://posthog.slack.com/archives/C011L071P8U/p1710758940243199 */}

                            <div className="bg-accent dark:bg-accent-dark w-full aspect-square flex justify-center items-center text-xs">
                                Product screenshot placeholder
                            </div>
                        </div>
                    </div>

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
        </Layout>
    )
}
