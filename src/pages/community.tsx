import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import SEO from 'components/seo'
import { communityMenu } from '../navs'
import { useLayoutData } from 'components/Layout/hooks'
import { StaticImage } from 'gatsby-plugin-image'
import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { IconCake, IconCoffee, IconConfetti, IconGlobe, IconHandwave } from '@posthog/icons'
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
import Changelog from 'components/InsidePostHog/Changelog'
import FeatureRequests from 'components/InsidePostHog/FeatureRequests'
import AppStatus from 'components/AppStatus'
import qs from 'qs'
import slugify from 'slugify'
import uniqBy from 'lodash/uniqBy'
import { NewsletterForm } from 'components/NewsletterForm'
import CloudinaryImage from 'components/CloudinaryImage'

const quote =
    // "Let your work shine as brightly as a hedgehog's quills, threading through life's challenges with perseverance."
    // 'Even the smallest hedgehog carries the wisdom of survival, showing us that even in a world full of thorns, one can embrace challenges with grace and courage.'
    'Why scurry through life when you can forage? Take time to sniff the mealworms. When things feel overwhelming, just curl into a ball.'

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

const Skeleton = () => {
    return <div className="animate-pulse bg-accent dark:bg-accent-dark h-[250px] w-full rounded-md" />
}

const PersonSpotlight = ({ title, content, byline, image, cta }) => {
    return (
        <div>
            {image && <aside className="float-right ml-1 mb-1">{image}</aside>}
            <h3 className="text-base mb-1 leading-tight">{title}</h3>
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

const SlackPosts = () => {
    const [loading, setLoading] = useState(true)
    const [slackPosts, setSlackPosts] = useState([])

    useEffect(() => {
        const slackPostsQuery = qs.stringify(
            {
                sort: ['createdAt:desc'],
                populate: {
                    question: {
                        populate: ['topics', 'profile'],
                    },
                },
            },
            { encodeValuesOnly: true }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/slack-posts?${slackPostsQuery}`)
            .then((res) => res.json())
            .then((data) => {
                if (data?.data?.length > 0) {
                    setSlackPosts(data.data)
                }
                setLoading(false)
            })
    }, [])

    return loading ? (
        <div className="py-4">
            <Skeleton />
        </div>
    ) : slackPosts?.length > 0 ? (
        <div className="py-4">
            <h3 className="text-base">From the PostHog Slack</h3>
            <ul className="list-none m-0 p-0 space-y-4">
                {uniqBy(slackPosts, 'attributes.question.data.attributes.topics.data[0].id').map(
                    ({
                        id,
                        attributes: {
                            question: {
                                data: {
                                    attributes: { topics, body, profile, subject, permalink },
                                },
                            },
                        },
                    }) => {
                        const topic = topics?.data?.[0]?.attributes
                        const name = [profile?.data?.attributes?.firstName, profile?.data?.attributes?.lastName]
                            .filter(Boolean)
                            .join(' ')
                        return (
                            <li key={id}>
                                <Link
                                    className="text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark leading-tight flex items-center gap-1"
                                    to={`/questions/topic/${slugify(topic.slug)}`}
                                    state={{ previous: { title: 'Community', url: '/community' } }}
                                >
                                    {topic.slug === 'witw' ? (
                                        <IconGlobe className="size-5 opacity-50" />
                                    ) : topic.slug === 'devrel' ? (
                                        <IconCoffee className="size-5 opacity-50" />
                                    ) : topic.slug === 'introductions' ? (
                                        <IconHandwave className="size-5 opacity-50" />
                                    ) : (
                                        <></>
                                    )}

                                    <h5 className="opacity-50 font-semibold text-sm m-0">{topic.label}</h5>
                                </Link>
                                <Link
                                    to={`/questions/${permalink}`}
                                    state={{ previous: { title: 'Community', url: '/community' } }}
                                >
                                    <h4 className="mt-1 mb-2 text-base leading-tight ml-6">{subject}</h4>
                                </Link>
                                {/* <p className="text-sm m-0 mb-2">
                                    <span className="opacity-50">Shared by</span>{' '}
                                    <Link to={`/community/profiles/${profile?.data?.id}`}>{name}</Link>
                                </p> */}
                                <div className="article-content ml-6 [&_p]:leading-normal [&_p]:text-sm [&_img]:rounded">
                                    <Markdown>{body}</Markdown>
                                </div>
                            </li>
                        )
                    }
                )}
            </ul>
        </div>
    ) : null
}

const CommunityNewsLogo = () => {
    return (
        <h1 className="mb-0 tracking-tight uppercase font-bold text-xl sm:text-2xl flex justify-center items-start gap-1.5 sm:gap-2 mt-1">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 295 34"
                className="w-full sm:w-auto sm:h-8"
            >
                <path d="M288.924 9.92c1.876 0 4.62.392 4.62 2.296 0 1.54-1.204 2.128-2.688 2.128 0-.84-.112-3.584-2.548-3.584-1.428 0-2.268 1.092-2.268 2.268 0 1.484.588 2.156 3.052 3.696 3.108 1.932 5.068 3.08 5.068 5.964 0 3.304-3.528 4.592-6.552 4.592-2.968 0-5.068-1.064-5.068-2.996 0-1.596 1.372-2.184 3.052-2.184a6.67 6.67 0 0 0-.196 1.652c0 1.288.448 2.688 2.576 2.688 1.764 0 3.36-.896 3.36-2.884 0-1.288-.7-2.408-3.864-4.228-2.212-1.26-4.256-2.464-4.256-5.18 0-3.192 3.164-4.228 5.712-4.228ZM275.988 23.052l2.884-10.192c.084-.28.112-.532.112-.756 0-.784-.504-1.204-1.848-1.204-.28 0-.476-.168-.476-.336s.168-.308.56-.308h5.404c.42 0 .616.168.616.336s-.168.308-.476.308c-1.512 0-1.876 1.596-2.632 3.612l-4.648 12.348c-.112.308-.336.504-.588.504-.224 0-.448-.168-.588-.616l-3.528-9.94-3.892 10.052c-.112.308-.336.504-.588.504-.196 0-.448-.168-.616-.616l-4.872-13.216c-.784-2.156-1.036-2.52-2.296-2.52-.252 0-.336-.168-.336-.336 0-.196.14-.42.364-.42h7.112c.252 0 .42.14.42.308 0 .14-.14.28-.448.308-1.204.14-1.764.42-1.764 1.064 0 .14.028.308.084.476l3.36 10.584 2.884-7.868-.588-1.596c-.784-2.156-.896-2.52-2.044-2.52-.252 0-.336-.168-.336-.336 0-.196.14-.42.364-.42h6.832c.252 0 .42.14.42.308 0 .14-.14.28-.448.308-1.204.14-1.764.42-1.764 1.064 0 .14.028.308.084.476l3.276 10.64ZM258.942 22.492c0 1.736-1.68 4.788-5.964 4.788-4.172 0-7.112-2.688-7.112-8.176 0-5.18 2.548-9.184 7.7-9.184 2.324 0 5.376 1.26 5.376 5.46 0 1.008-.504 1.372-1.708 1.372h-8.092c0 5.32 1.932 8.372 5.012 8.372 1.904 0 3.22-.588 4.256-2.744.084-.168.196-.224.308-.224.168 0 .224.14.224.336Zm-5.936-11.676c-2.352 0-3.472 2.464-3.808 5.208l5.152-.364c.924-.056 1.092-.42 1.092-1.036 0-2.576-.812-3.808-2.436-3.808ZM222.449 5.58h4.648c.224 0 .336.056.42.168l12.656 15.428v-6.86c0-3.388-.112-5.18-.168-5.852-.112-1.484-.644-2.128-2.632-2.128-.308 0-.448-.196-.448-.392 0-.168.112-.364.364-.364h6.916c.224 0 .364.168.364.336 0 .196-.168.42-.476.42-1.82 0-2.184.644-2.408 2.128-.112.672-.196 2.464-.196 5.796v12.6c0 .364-.224.56-.476.56-.168 0-.308-.084-.448-.252l-13.888-16.996v8.232c0 3.388.028 4.816.112 5.544.196 1.484.952 2.324 2.968 2.324.308 0 .476.196.476.392 0 .168-.14.336-.392.336h-7.504c-.224 0-.364-.168-.364-.336 0-.196.168-.392.476-.392 2.016 0 2.604-.672 2.744-2.128.056-.672.14-2.156.14-5.6V8.576l-.812-1.12c-.56-.756-1.12-1.12-2.1-1.12-.224 0-.364-.196-.364-.392s.112-.364.392-.364ZM213.247 14.568l-5.544 15.764c-.532 1.512-1.372 2.688-3.136 2.688s-2.464-1.148-2.464-2.128c0-.784.336-1.176.84-1.344a2.084 2.084 0 0 0 1.82 1.036c1.176 0 1.568-.504 1.988-1.512l.924-2.184-5.18-11.9c-1.428-3.276-1.708-3.976-2.884-3.976-.28 0-.392-.14-.392-.336s.168-.42.504-.42h6.972c.168 0 .28.112.28.252 0 .168-.168.336-.504.336-1.148 0-1.736.392-1.736 1.036 0 .168.056.364.14.56l4.284 10.584 2.94-10.164c.056-.252.112-.476.112-.672 0-.812-.644-1.26-2.072-1.26-.28 0-.476-.196-.476-.364 0-.14.14-.308.532-.308h6.048c.42 0 .616.196.616.364 0 .168-.168.308-.476.308-1.232 0-2.24 1.064-3.136 3.64Z" />
                <path d="M196.909 7.4v3.024c1.176 0 2.828-.224 3.752-.224.476 0 .756.308.756.616s-.28.616-.924.616h-3.584v11.816c0 1.708.532 2.352 1.568 2.352 1.12 0 1.904-.868 2.1-2.072.056-.308.224-.476.364-.476.168 0 .336.196.336.532 0 2.52-1.764 3.724-3.696 3.724-2.744 0-3.976-1.372-3.976-3.892 0-2.856.196-9.268.196-11.956h-1.372c-.224 0-.336-.084-.336-.252 0-.14.084-.28.308-.504l3.556-3.5c.252-.224.42-.364.588-.364.224 0 .364.168.364.56ZM189.314 11.628c0 .98-.112 2.996-.112 6.496v1.204c0 1.876.056 3.808.168 4.592.224 1.68.28 2.38 2.016 2.38.364 0 .532.168.532.364 0 .168-.14.336-.42.336h-7.7c-.28 0-.42-.168-.42-.336 0-.196.168-.364.504-.364 1.68 0 2.016-.728 2.156-2.38a71.1 71.1 0 0 0 .168-4.592v-1.932c0-3.5-.084-5.684-1.708-5.684h-.728c-.28 0-.392-.14-.392-.28s.084-.308.392-.392c1.148-.308 3.696-.784 4.48-.784.616 0 1.064.392 1.064 1.372Zm-3.78-5.684c0-1.12.924-2.044 2.016-2.044 1.12 0 2.044.924 2.044 2.044 0 1.092-.924 2.016-2.044 2.016-1.092 0-2.016-.924-2.016-2.016Z" />
                <path d="m171.118 13.308.84-.7c1.792-1.512 3.248-2.688 5.264-2.688 2.324 0 3.696 1.792 3.696 4.2v9.996c0 1.68.532 2.156 2.044 2.156.336 0 .504.196.504.392 0 .168-.14.336-.42.336h-7.588c-.28 0-.42-.168-.42-.336 0-.196.168-.392.504-.392 1.652 0 2.156-1.008 2.156-7.588 0-5.88-.868-6.804-2.268-6.804-1.26 0-2.38 1.036-4.368 2.604-.028.924-.028 2.296-.028 3.64v1.204c0 1.876.056 3.864.168 4.648.224 1.68.28 2.296 2.016 2.296.364 0 .532.196.532.392 0 .168-.14.336-.42.336h-7.7c-.28 0-.42-.168-.42-.336 0-.196.168-.392.504-.392 2.324-.028 2.324-1.456 2.324-6.944v-1.344c0-3.5-.028-6.244-1.82-6.244h-.784c-.28 0-.364-.14-.364-.28 0-.56 4.032-1.204 5.012-1.204.616 0 1.064.392 1.064 1.372 0 .336 0 1.092-.028 1.68ZM159.361 25.348c-1.82 1.316-3.696 1.932-5.264 1.932-2.38 0-4.088-1.428-4.088-4.06v-5.824c0-3.5-.112-5.684-1.708-5.684h-.756c-.28 0-.392-.14-.392-.28s.084-.308.392-.392c1.148-.308 3.696-.784 4.48-.784.644 0 1.092.392 1.092 1.372 0 .98-.14 2.996-.14 6.496v3.808c0 2.324.868 3.612 2.716 3.612.924 0 2.128-.336 3.556-1.036.056-.784.112-3.5.112-5.376v-1.736c0-3.5-.084-5.684-1.68-5.684h-.756c-.28 0-.392-.14-.392-.28s.084-.308.392-.392c1.148-.308 3.696-.784 4.48-.784.616 0 1.092.392 1.092 1.372 0 .98-.14 2.996-.14 6.496v4.256c0 2.128 0 3.108 1.12 3.108 1.036 0 1.064-1.344 1.456-1.344.196 0 .252.14.252.448 0 1.316-.868 2.688-2.912 2.688-1.708 0-2.548-1.036-2.912-1.932ZM136.062 13.392l.952-.784c1.82-1.484 2.912-2.688 4.928-2.688 2.324 0 3.584 1.792 3.584 4.2v9.996c0 1.68.532 2.156 2.044 2.156.336 0 .504.196.504.392 0 .168-.14.336-.42.336h-7.588c-.28 0-.42-.168-.42-.336 0-.196.168-.392.504-.392 1.652 0 2.156-1.008 2.156-7.588 0-5.88-.812-6.692-2.1-6.692-1.176 0-2.1.924-4.088 2.492v9.632c0 1.68.532 2.156 2.044 2.156.336 0 .504.196.504.392 0 .168-.14.336-.42.336h-7.588c-.28 0-.42-.168-.42-.336 0-.196.168-.392.504-.392 1.652 0 2.156-1.008 2.156-7.588 0-5.88-.812-6.692-2.1-6.692-1.176 0-2.1.924-4.088 2.492-.028.924-.028 2.296-.028 3.64v1.204c0 1.876.056 3.864.168 4.648.224 1.68.28 2.296 2.016 2.296.364 0 .532.196.532.392 0 .168-.14.336-.42.336h-7.7c-.28 0-.42-.168-.42-.336 0-.196.168-.392.504-.392 2.324-.028 2.324-1.456 2.324-6.944v-1.344c0-3.5-.028-6.244-1.82-6.244h-.784c-.28 0-.364-.14-.364-.28 0-.56 4.032-1.204 5.012-1.204.616 0 1.064.392 1.064 1.372 0 .336 0 1.092-.028 1.68l.84-.7c1.792-1.512 2.912-2.688 4.928-2.688 2.072 0 3.276 1.456 3.528 3.472ZM108.786 13.392l.952-.784c1.82-1.484 2.912-2.688 4.928-2.688 2.324 0 3.584 1.792 3.584 4.2v9.996c0 1.68.532 2.156 2.044 2.156.336 0 .504.196.504.392 0 .168-.14.336-.42.336h-7.588c-.28 0-.42-.168-.42-.336 0-.196.168-.392.504-.392 1.652 0 2.156-1.008 2.156-7.588 0-5.88-.812-6.692-2.1-6.692-1.176 0-2.1.924-4.088 2.492v9.632c0 1.68.532 2.156 2.044 2.156.336 0 .504.196.504.392 0 .168-.14.336-.42.336h-7.588c-.28 0-.42-.168-.42-.336 0-.196.168-.392.504-.392 1.652 0 2.156-1.008 2.156-7.588 0-5.88-.812-6.692-2.1-6.692-1.176 0-2.1.924-4.088 2.492-.028.924-.028 2.296-.028 3.64v1.204c0 1.876.056 3.864.168 4.648.224 1.68.28 2.296 2.016 2.296.364 0 .532.196.532.392 0 .168-.14.336-.42.336h-7.7c-.28 0-.42-.168-.42-.336 0-.196.168-.392.504-.392 2.324-.028 2.324-1.456 2.324-6.944v-1.344c0-3.5-.028-6.244-1.82-6.244h-.784c-.28 0-.364-.14-.364-.28 0-.56 4.032-1.204 5.012-1.204.616 0 1.064.392 1.064 1.372 0 .336 0 1.092-.028 1.68l.84-.7c1.792-1.512 2.912-2.688 4.928-2.688 2.072 0 3.276 1.456 3.528 3.472ZM84.587 27.28c-4.424 0-7-2.884-7-8.008 0-6.44 3.36-9.352 7.952-9.352 4.424 0 7.028 3.052 7.028 8.176 0 6.44-3.388 9.184-7.98 9.184Zm.756-.98c2.912 0 3.78-2.996 3.78-7.224 0-4.592-1.176-8.204-4.172-8.204-2.884 0-3.948 3.164-3.948 7.392 0 4.592 1.288 8.036 4.34 8.036ZM75.32 26.328c-2.464.644-4.704.952-6.692.952-7.056 0-11.088-3.78-11.088-10.864 0-6.636 4.06-11.228 11.788-11.228 1.68 0 3.556.168 5.572.644.252.084.42.196.42.588v5.376c0 .336-.14.504-.308.504-.168 0-.336-.196-.392-.56-.476-3.5-2.436-5.516-5.768-5.516-3.304 0-7.392 2.856-7.392 10.192 0 6.132 2.688 9.66 7.056 9.66 4.088 0 6.216-2.1 7-5.824.084-.364.224-.476.448-.476a.31.31 0 0 1 .308.308c0 .168-.504 5.236-.56 5.656-.056.392-.14.532-.392.588Z" />
                <g clipPath="url(#a)">
                    <path d="M10.892 17.206a1 1 0 0 1-1.789 0l-.881-1.763a1 1 0 0 1 0-.894l.881-1.763a1 1 0 0 1 1.789 0l.881 1.763a1 1 0 0 1 0 .894l-.881 1.763ZM10.892 27.203a1 1 0 0 1-1.789 0l-.881-1.763a1 1 0 0 1 0-.894l.881-1.763a1 1 0 0 1 1.789 0l.881 1.763a1 1 0 0 1 0 .894l-.881 1.763Z" />
                    <path d="M0 23.408c0-.89 1.077-1.337 1.707-.707l4.583 4.584c.63.63.184 1.707-.707 1.707H1a1 1 0 0 1-1-1v-4.584Zm0-4.828a1 1 0 0 0 .293.708l9.411 9.41a1 1 0 0 0 .707.294h5.17c.89 0 1.337-1.078.707-1.707l-14.58-14.58C1.077 12.074 0 12.52 0 13.41v5.17Zm0-9.997a1 1 0 0 0 .293.707L19.7 28.7a1 1 0 0 0 .707.293h5.17c.89 0 1.337-1.078.707-1.707L1.707 2.707C1.077 2.077 0 2.523 0 3.414v5.17Zm9.997 0a1 1 0 0 0 .293.707l17.994 17.995c.63.63 1.707.183 1.707-.708v-5.169a1 1 0 0 0-.293-.707L11.704 2.707c-.63-.63-1.707-.184-1.707.707v5.17Zm11.704-5.876c-.63-.63-1.707-.184-1.707.707v5.17a1 1 0 0 0 .293.706l7.997 7.998c.63.63 1.707.183 1.707-.708v-5.169a1 1 0 0 0-.293-.707l-7.997-7.997ZM42.525 23.53l-9.413-9.412c-.63-.63-1.707-.184-1.707.707v13.167a1 1 0 0 0 1 1h14.58a1 1 0 0 0 1-1v-1.2c0-.552-.449-.993-.996-1.064a7.723 7.723 0 0 1-4.464-2.197Zm-6.321 2.263a1.6 1.6 0 1 1 .001-3.2 1.6 1.6 0 0 1-.001 3.2Z" />
                    <path d="M0 27.992a1 1 0 0 0 1 1h4.583c.891 0 1.337-1.078.707-1.707L1.707 22.7c-.63-.63-1.707-.184-1.707.707v4.584ZM9.997 10.997l-8.29-8.29C1.077 2.077 0 2.523 0 3.414v5.17a1 1 0 0 0 .293.706l9.704 9.705v-7.998ZM1.707 12.704c-.63-.63-1.707-.184-1.707.707v5.17a1 1 0 0 0 .293.706l9.704 9.705v-7.998l-8.29-8.29ZM19.994 11.411a1 1 0 0 0-.293-.707l-7.997-7.997c-.63-.63-1.707-.184-1.707.707v5.17a1 1 0 0 0 .293.706l9.704 9.705V11.41ZM9.997 28.992h5.584c.89 0 1.337-1.078.707-1.707l-6.29-6.291v7.998Z" />
                    <path d="M9.997 10.997v7.583a1 1 0 0 0 .293.707l9.704 9.705v-7.584a1 1 0 0 0-.293-.707l-9.704-9.704Z" />
                </g>
                <defs>
                    <clipPath id="a">
                        <path fill="#fff" d="M0 0h50v30H0z" />
                    </clipPath>
                </defs>
            </svg>
        </h1>
    )
}

const Header = () => {
    const currentDate = new Date()
    const { fullWidthContent } = useLayoutData()

    return (
        <section className={`px-3 2xl:px-5 transition-all mx-auto ${fullWidthContent ? '' : 'max-w-[1400px]'}`}>
            <div className="bg-accent dark:bg-border-dark/50 grid grid-cols-2 md:grid-cols-[200px_1fr_200px] my-4 xl:mb-6 mx-auto px-2 py-1 md:p-2 items-center">
                <div className="md:block text-sm md:pl-2">
                    <div className="md:hidden">
                        {currentDate.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                    <div className="hidden md:block">
                        {currentDate.toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}
                    </div>
                </div>
                <div className="text-center py-2 md:py-1 order-3 md:order-none col-span-2 md:col-span-1  border-t border-light dark:border-dark md:border-t-0 mt-1 md:mt-0">
                    <CommunityNewsLogo />
                </div>
                <div className=" md:block md:pr-2">
                    <AppStatus />
                </div>
            </div>
        </section>
    )
}

const Main = () => {
    const { fullWidthContent } = useLayoutData()

    return (
        <section
            className={`@container grid sm:flex sm:flex-wrap lg:grid lg:grid-cols-[220px_1fr_260px] xl:grid-cols-[300px_1fr_300px] gap-6 xl:gap-8 mx-auto px-7 2xl:px-9 mb-12 transition-all ${
                fullWidthContent ? '' : 'max-w-[1400px] mx-auto'
            }`}
        >
            <aside className="@container order-3 @sm:flex-[0_0_100%] sm:border-t border-light dark:border-dark lg:border-t-0 sm:pt-8 lg:pt-0 lg:order-none flex flex-col ">
                <div className="grid @xl:grid-cols-2 gap-4 @xl:gap-x-12 @xl:gap-y-4 divide-y @lg:divide-y-0 divide-border dark:divide-border-dark">
                    <PersonSpotlight
                        title="A note from the editor"
                        content="<p>Welcome to <em>Inside PostHog</em> - our community newspaper. Explore our latest posts, community questions, and everything else that's happening in the world of PostHog."
                        byline="- Andy, Editor-in-Chief"
                        image={
                            <div className="h-24 w-24 rounded-full overflow-hidden bg-yellow">
                                <CloudinaryImage
                                    width={200}
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/andy_86a7232754.png"
                                />
                            </div>
                        }
                    />

                    <div className="text-center pt-6 pb-4 px-2">
                        <CloudinaryImage
                            className="h-20 w-20 float-left mr-2 mb-2"
                            width={200}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/detective_hog_9b2bb1da51.png"
                        />
                        <p className="mb-2 text-sm">
                            <em>"{quote}"</em>
                        </p>
                        <p className="text-sm opacity-75 mb-0">
                            <em>- Max, our resident hedgehog</em>
                        </p>
                    </div>

                    <SlackPosts />

                    <div className="pt-4">
                        <PersonSpotlight
                            title="Meet a team member"
                            content="<p>As an engineer on our Growth team, Zach is probably the reason you heard about PostHog. When he's not RBAC-ing that ass up, he's investing in early stage startups and finishing triathlons."
                            image={
                                <div className="h-24 w-24 rounded-full overflow-hidden bg-salmon">
                                    <CloudinaryImage
                                        width={200}
                                        src="https://res.cloudinary.com/dmukukwp6/image/upload/v1711452549/Zach_c7f6a5a292.png"
                                    />
                                </div>
                            }
                            cta={
                                <Link to="/community/profiles/30086" className="text-[15px]">
                                    Learn more about Zach W.
                                </Link>
                            }
                        />
                    </div>

                    <div className="py-4 grid gap-5">
                        <div>
                            <h3 className="text-base">People news</h3>

                            <div className="flex gap-1 items-center">
                                <div>
                                    <IconConfetti className="w-8 h-8 text-primary/50 dark:text-primary-dark/50" />
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
            <section className="@container order-1 sm:flex-1 lg:order-none sm:border-r pr-6 lg:px-6 xl:px-8 lg:border-x border-light dark:border-dark">
                <div
                    className={`divide-y divide-border dark:divide-border-dark flex flex-col gap-4 transition-all ${
                        fullWidthContent ? '' : 'max-w-2xl mx-auto'
                    }`}
                >
                    <Posts />

                    <div className="pt-4 pb-0 @md:pt-8 @md:pb-4">
                        <NewsletterForm placement="community" />
                    </div>
                    <div className="py-4">
                        <Changelog />
                    </div>
                </div>
            </section>
            <aside className="order-2 sm:flex-[0_0_260px] md:flex-[0_0_300px] lg:order-none flex flex-col gap-4">
                <Questions />

                <Merch />

                <div className="pt-4">
                    <PersonSpotlight
                        title="Musings from the CEO"
                        content="<p>nobody will remember:</p>
            <ul>
                <li>your salary</li>
                <li>how “busy you were”</li>
                <li>how many hours you worked</li>
            </ul>

            <p>people will remember:</p>

            <ul>
                <li>if you hopped on a quick call</li>
                <li>when you hopped on a quick call</li>
                <li>how many quick calls you hopped on</li>
                <li>how you made them feel when you hopped on a quick call</li>
            </ul>
            "
                        image={
                            <div className="h-24 w-24 rounded-full overflow-hidden bg-yellow">
                                <CloudinaryImage
                                    width={200}
                                    src="https://res.cloudinary.com/dmukukwp6/image/upload/james_b841adce96.png"
                                />
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

                <div className="py-4">
                    <FeatureRequests />
                </div>
            </aside>
        </section>
    )
}

export default function InsidePostHog() {
    return (
        <Layout parent={communityMenu}>
            <SEO
                title="Community News - PostHog"
                description="What's happening at PostHog"
                image={`/images/og/community-news.jpg`}
            />

            <Header />
            <Main />
        </Layout>
    )
}
