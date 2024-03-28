import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import List from 'components/List'
import ResourceItem from 'components/Docs/ResourceItem'
import { CallToAction } from 'components/CallToAction'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'

export const quickLinks = [
    {
        icon: 'GraduationCap',
        name: 'Start here',
        to: '/docs/session-replay/hey',
        color: 'red',
    },
    {
        name: 'Product manual',
        to: '/docs/session-replay/manual',
        description: 'How to use session replay.',
    },
    {
        name: 'Privacy controls',
        to: '/docs/session-replay/privacy',
        description: 'Settings for customizing session replay privacy.',
    },
    {
        name: 'Sharing and emedding',
        to: '/docs/session-replay/sharing',
        description: 'Share and embed session replays in your product.',
    },
    {
        name: 'Data retention',
        to: '/docs/session-replay/data-retention',
        description: 'Adjust how long session replays are stored when self-hosting.',
    },
    {
        name: 'Troubleshooting & FAQs',
        to: '/docs/session-replay/troubleshooting',
        description: 'Common issues and how to resolve them.',
    },
]

type SessionRecordingProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Intro = ({ image = true }) => {
    return (
        <div className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded flex flex-col items-center md:flex-row md:gap-4 pt-2 mb-8">
            <div className="p-4 md:p-8">
                <h1 className="text-4xl mt-0 mb-2">Session replay</h1>
                <h3 className="text-lg font-semibold text-primary/60 dark:text-primary-dark/75 leading-tight">
                    Play back sessions to diagnose UI issues, improve support, and get context for nuanced user
                    behavior.
                </h3>
                <CallToAction to="/docs/session-replay/installation">Record your first session</CallToAction>
            </div>

            {image && (
                <figure className="m-0 mt-auto p-0">
                    <StaticImage
                        alt=""
                        placeholder="none"
                        quality={100}
                        className=""
                        src="../../components/Home/Slider/images/session-recording-hog.png"
                    />
                </figure>
            )}
        </div>
    )
}

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'session replay')?.children}
                />
            )}
            <section className="mb-12">
                <h3 className="m-0 text-xl">Resources</h3>
                <p className="text-[15px]">
                    Or check the latest features in <a href="/changelog">the changelog</a>
                </p>

                <ul className="m-0 mb-3 p-0 flex flex-col gap-4 md:grid md:grid-cols-2 xl:grid-cols-3">
                    <ResourceItem
                        type="Guide"
                        title="Only record sessions you want"
                        description="Control cost by reducing volume"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/session-recording-hog.png"
                            />
                        }
                        url="/tutorials/limit-session-recordings"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Discover user friction with replays"
                        description="Pinpoint issues with filters and replays"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/session-recording-hog.png"
                            />
                        }
                        url="/tutorials/filter-session-recordings"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Analyze power users"
                        description="Define a cohort and watch those sessions"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/session-recording-hog.png"
                            />
                        }
                        url="/tutorials/power-users"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Improve web app performance"
                        description="Network monitoring in session replays"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/session-recording-hog.png"
                            />
                        }
                        url="/tutorials/performance-metrics"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Session replays in customer support"
                        description="Rageclicks, sharing recordings, error monitoring"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/session-recording-hog.png"
                            />
                        }
                        url="/tutorials/session-recordings-for-support"
                    />
                    <ResourceItem
                        type="Guide"
                        title="Replay users in a funnel"
                        description="Learn from users who do (or don't) convert"
                        Image={
                            <StaticImage
                                alt=""
                                placeholder="none"
                                objectFit="contain"
                                className="h-full"
                                quality={100}
                                src="../../components/Home/Slider/images/session-recording-hog.png"
                            />
                        }
                        url="/tutorials/explore-insights-session-recordings"
                    />
                </ul>
                <CallToAction
                    to="/docs/session-replay/tutorials"
                    type="custom"
                    size="md"
                    className="group !bg-accent dark:!bg-accent-dark !border-light dark:!border-dark"
                    childClassName="text-primary/75 dark:text-primary-dark/75 group-hover:text-primary/100 dark:group-hover:text-primary-dark/100 !bg-white dark:!bg-dark !border-light dark:!border-dark"
                    width="[calc(100%_+_3px)]"
                >
                    Explore guides
                </CallToAction>
            </section>
        </>
    )
}

const SessionRecording: React.FC<SessionRecordingProps> = ({ data }) => {
    return (
        <Layout>
            <SEO title="Session replay - Docs - PostHog" />

            <PostLayout title={'Session replay'} hideSurvey hideSidebar>
                <Intro />
                <Content />

                <div className="">
                    <CallToAction to="/docs/session-replay/manual" width="full">
                        Visit the manual
                    </CallToAction>
                </div>
            </PostLayout>
        </Layout>
    )
}

export default SessionRecording
