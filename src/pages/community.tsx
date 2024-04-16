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

const InsidePostHogLogo = ({ className }) => {
    return (
        <svg className={className} fill="none" viewBox="0 0 195 78">
            <path
                fill="#000"
                d="M116.196 26.721c0 2.418-2.34 6.669-8.307 6.669-5.811 0-9.906-3.744-9.906-11.388 0-7.215 3.549-12.792 10.725-12.792 3.237 0 7.488 1.755 7.488 7.605 0 1.404-.702 1.911-2.379 1.911h-11.271c0 7.41 2.691 11.661 6.981 11.661 2.652 0 4.485-.819 5.928-3.822.117-.234.273-.312.429-.312.234 0 .312.195.312.468Zm-8.268-16.263c-3.276 0-4.836 3.432-5.304 7.254l7.176-.507c1.287-.078 1.521-.585 1.521-1.443 0-3.588-1.131-5.304-3.393-5.304ZM88.095 22.743v-6.63c0-3.237-1.95-5.304-4.368-5.304-3.861 0-6.162 4.602-6.162 10.92 0 5.148 1.91 9.36 6.045 9.36 1.248 0 2.574-.429 4.29-1.404.078-1.092.195-4.368.195-6.942Zm-.078-11.856v-2.34c0-4.056-.273-5.07-2.535-5.07h-.975c-.39 0-.624-.156-.624-.351 0-.195.195-.39.624-.507 1.638-.429 5.226-1.56 6.318-1.56.858 0 1.482.546 1.482 1.911v23.595c0 2.964.117 4.329 1.56 4.329s1.482-1.872 2.028-1.872c.273 0 .35.195.35.624 0 1.833-1.208 3.744-4.055 3.744-2.38 0-3.55-1.443-4.056-2.691-1.833 1.755-4.017 2.691-6.591 2.691-5.85 0-8.658-4.68-8.658-10.647 0-8.541 3.9-13.533 10.023-13.533 1.755 0 3.549.39 5.109 1.677ZM67.454 11.589c0 1.365-.156 4.173-.156 9.048v1.677c0 2.613.078 5.304.233 6.396.313 2.34.39 3.315 2.808 3.315.508 0 .742.234.742.507 0 .234-.196.468-.585.468H59.77c-.39 0-.586-.234-.586-.468 0-.273.234-.507.703-.507 2.34 0 2.808-1.014 3.003-3.315.078-1.092.233-3.783.233-6.396v-2.691c0-4.875-.117-7.917-2.379-7.917h-1.014c-.39 0-.546-.195-.546-.39s.117-.429.546-.546c1.6-.429 5.148-1.092 6.24-1.092.858 0 1.483.546 1.483 1.911Zm-5.265-7.917c0-1.56 1.286-2.847 2.807-2.847a2.863 2.863 0 0 1 2.848 2.847c0 1.521-1.287 2.808-2.847 2.808-1.522 0-2.809-1.287-2.809-2.808ZM50.667 9.21c2.613 0 6.435.546 6.435 3.198 0 2.145-1.677 2.964-3.744 2.964 0-1.17-.156-4.992-3.549-4.992-1.989 0-3.159 1.521-3.159 3.159 0 2.067.82 3.003 4.251 5.148 4.33 2.691 7.06 4.29 7.06 8.307 0 4.602-4.915 6.396-9.127 6.396-4.134 0-7.059-1.482-7.059-4.173 0-2.223 1.911-3.042 4.251-3.042a9.29 9.29 0 0 0-.273 2.301c0 1.794.624 3.744 3.588 3.744 2.457 0 4.68-1.248 4.68-4.017 0-1.794-.975-3.354-5.382-5.889-3.08-1.755-5.928-3.432-5.928-7.215 0-4.446 4.407-5.889 7.956-5.889ZM24.154 13.929l1.17-.975c2.495-2.106 4.523-3.744 7.332-3.744 3.236 0 5.148 2.496 5.148 5.85v13.923c0 2.34.74 3.003 2.846 3.003.468 0 .703.273.703.546 0 .234-.196.468-.586.468H30.198c-.39 0-.585-.234-.585-.468 0-.273.235-.546.703-.546 2.3 0 3.003-1.404 3.003-10.569 0-8.19-1.21-9.477-3.16-9.477-1.755 0-3.314 1.443-6.083 3.627-.04 1.287-.04 3.198-.04 5.07v1.677c0 2.613.078 5.382.234 6.474.313 2.34.39 3.198 2.808 3.198.508 0 .742.273.742.546 0 .234-.195.468-.585.468H16.508c-.39 0-.585-.234-.585-.468 0-.273.235-.546.703-.546 3.236-.039 3.236-2.028 3.236-9.672v-1.872c0-4.875-.038-8.697-2.535-8.697h-1.091c-.39 0-.507-.195-.507-.39 0-.78 5.616-1.677 6.98-1.677.858 0 1.482.546 1.482 1.911 0 .468 0 1.521-.038 2.34ZM9.452 16.815v2.691c0 5.265.078 8.112.234 9.204.312 2.34 1.014 3.237 3.86 3.237.508 0 .742.312.742.585 0 .234-.195.468-.585.468H.638c-.39 0-.585-.234-.585-.468 0-.273.234-.585.74-.585 3.043 0 3.628-.936 3.823-3.237.078-1.092.234-3.861.234-9.243v-2.574c0-5.343-.156-8.502-.234-9.594C4.42 5.037 3.914 4.218.989 4.218c-.468 0-.702-.273-.702-.546s.195-.507.585-.507h12.285c.39 0 .585.234.585.507s-.234.546-.741.546c-2.964 0-3.003.78-3.315 3.081-.156 1.092-.234 4.251-.234 9.516ZM184.146 44.96c1.794 0 3.393.195 4.719.663a6.896 6.896 0 0 1-.312-2.028c0-1.833.819-3.627 3.159-3.627 1.443 0 2.418.936 2.418 2.184 0 .624-.234 1.326-.819 1.989-.429-.39-.897-.585-1.326-.585-1.053 0-1.95 1.131-1.989 2.535 2.223 1.092 3.471 3.042 3.471 6.006 0 4.68-4.212 6.552-8.775 6.552-.975 0-1.95-.078-2.925-.234-.975.663-1.443 1.56-1.443 2.379 0 .936.624 1.755 1.911 1.911l5.889.702c3.978.468 6.552 2.847 6.552 6.669 0 4.368-3.198 7.02-10.257 7.02-6.084 0-9.984-1.716-9.984-5.46 0-2.457 2.145-3.9 4.446-3.9.624 0 1.287.117 1.872.429-1.209.936-1.716 1.755-1.716 3.12 0 2.223 1.599 4.602 6.006 4.602 4.056 0 6.357-1.56 6.357-4.134 0-2.028-.819-3.861-4.329-4.251l-5.343-.585c-3.042-.351-4.524-1.482-4.524-3.861 0-2.067 1.638-4.095 3.51-4.953-3.315-.858-5.421-2.964-5.421-6.006 0-4.758 4.329-7.137 8.853-7.137Zm-4.212 7.137c0 3.159 1.092 5.07 4.173 5.07 3.354 0 4.68-2.301 4.68-5.46 0-3.198-1.287-5.46-4.446-5.46-3.237 0-4.407 2.652-4.407 5.85ZM162.019 69.14c-6.162 0-9.75-4.017-9.75-11.154 0-8.97 4.68-13.026 11.076-13.026 6.162 0 9.789 4.251 9.789 11.388 0 8.97-4.719 12.792-11.115 12.792Zm1.053-1.365c4.056 0 5.265-4.173 5.265-10.062 0-6.396-1.638-11.427-5.811-11.427-4.017 0-5.499 4.407-5.499 10.296 0 6.396 1.794 11.193 6.045 11.193ZM144.843 52.565v2.691c0 5.265.078 8.112.234 9.204.312 2.34 1.014 3.237 3.861 3.237.507 0 .741.312.741.585 0 .234-.195.468-.585.468h-13.065c-.39 0-.585-.234-.585-.468 0-.273.234-.585.741-.585 3.042 0 3.627-.936 3.822-3.237.078-1.092.234-3.861.234-9.243v-.819h-14.157v.858c0 5.265.078 8.112.234 9.204.312 2.34 1.014 3.237 3.861 3.237.507 0 .741.312.741.585 0 .234-.195.468-.585.468H117.27c-.39 0-.585-.234-.585-.468 0-.273.234-.585.741-.585 3.042 0 3.627-.936 3.822-3.237.078-1.092.234-3.861.234-9.243v-2.574c0-5.343-.156-8.502-.234-9.594-.195-2.262-.702-3.081-3.627-3.081-.468 0-.702-.273-.702-.546s.195-.507.585-.507h12.285c.39 0 .585.234.585.507s-.234.546-.741.546c-2.964 0-3.003.78-3.315 3.081-.156 1.092-.234 4.251-.234 9.516v.39h14.157v-.312c0-5.343-.156-8.502-.234-9.594-.195-2.262-.702-3.081-3.627-3.081-.468 0-.702-.273-.702-.546s.195-.507.585-.507h12.285c.39 0 .585.234.585.507s-.234.546-.741.546c-2.964 0-3.003.78-3.315 3.081-.156 1.092-.234 4.251-.234 9.516ZM108.952 41.45v4.212c1.638 0 3.939-.312 5.226-.312.663 0 1.053.429 1.053.858s-.39.858-1.287.858h-4.992v16.458c0 2.379.741 3.276 2.184 3.276 1.56 0 2.652-1.209 2.925-2.886.078-.429.312-.663.507-.663.234 0 .468.273.468.741 0 3.51-2.457 5.187-5.148 5.187-3.822 0-5.538-1.911-5.538-5.421 0-3.978.273-12.909.273-16.653h-1.911c-.312 0-.468-.117-.468-.351 0-.195.117-.39.429-.702l4.953-4.875c.351-.312.585-.507.819-.507.312 0 .507.234.507.78ZM93.374 44.96c2.613 0 6.435.546 6.435 3.198 0 2.145-1.677 2.964-3.744 2.964 0-1.17-.156-4.992-3.549-4.992-1.989 0-3.159 1.521-3.159 3.159 0 2.067.82 3.003 4.251 5.148 4.33 2.691 7.059 4.29 7.059 8.307 0 4.602-4.914 6.396-9.126 6.396-4.134 0-7.059-1.482-7.059-4.173 0-2.223 1.911-3.042 4.251-3.042a9.29 9.29 0 0 0-.273 2.301c0 1.794.624 3.744 3.588 3.744 2.457 0 4.68-1.248 4.68-4.017 0-1.794-.975-3.354-5.382-5.889-3.08-1.755-5.928-3.432-5.928-7.215 0-4.446 4.407-5.889 7.956-5.889ZM71.603 69.14c-6.162 0-9.75-4.017-9.75-11.154 0-8.97 4.68-13.026 11.075-13.026 6.163 0 9.79 4.251 9.79 11.388 0 8.97-4.72 12.792-11.115 12.792Zm1.053-1.365c4.055 0 5.264-4.173 5.264-10.062 0-6.396-1.638-11.427-5.81-11.427-4.017 0-5.5 4.407-5.5 10.296 0 6.396 1.794 11.193 6.046 11.193ZM46.827 41.021v16.887c0 2.769.117 5.46.195 6.552.156 2.847 1.365 3.237 5.265 3.237.507 0 .74.312.74.585 0 .234-.194.468-.584.468h-14.43c-.39 0-.585-.234-.585-.468 0-.273.234-.585.74-.585 3.043 0 3.628-.936 3.823-3.237.078-1.092.234-3.744.234-9.126v-2.496c0-5.343-.156-8.346-.234-9.477-.195-2.262-.468-3.237-3.627-3.237-.468 0-.702-.351-.702-.663 0-.273.195-.546.585-.546h12.285c6.24 0 10.062 3.276 10.062 8.892 0 7.254-6.201 9.633-10.296 9.633-.82 0-1.092-.273-1.092-.546 0-.234.117-.468.585-.468 2.73 0 5.81-2.925 5.81-7.8 0-4.212-1.013-8.112-6.434-8.112-1.014 0-1.56.117-2.34.507Z"
            />
        </svg>
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
                <div className="text-center py-4">
                    <InsidePostHogLogo className="h-[78px] mx-auto" />
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
                            <WIP />
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
