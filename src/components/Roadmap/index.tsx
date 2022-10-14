import Layout from 'components/Layout'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useState } from 'react'
import groupBy from 'lodash.groupby'
import Link from 'components/Link'
import { GitHub } from 'components/Icons/Icons'
import { Closed, Open } from 'components/Home/Timeline'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'

const InProgress = (props) => {
    const [more, setMore] = useState(false)
    const { title, githubPages, description } = props
    const completedIssues = githubPages && githubPages?.filter((page) => page.closed_at)
    const percentageComplete = githubPages && Math.round((completedIssues.length / githubPages?.length) * 100)
    return (
        <li>
            <h4 className="text-lg flex space-x-1 items-center m-0">{title}</h4>
            <p className="m-0 text-[15px] text-black/80 inline">
                {more ? description : description.substring(0, 130) + (description?.length > 130 ? '...' : '')}
            </p>
            {!more && (description || githubPages?.length > 0) && (
                <button onClick={() => setMore(true)} className="font-semibold text-red inline ml-1">
                    more
                </button>
            )}
            {githubPages && (
                <div className="mt-4">
                    <div className="h-2 flex-grow bg-gray-accent-light rounded-md relative overflow-hidden">
                        <div
                            style={{ width: `${percentageComplete}%` }}
                            className={`bg-[#3FB950] absolute inset-0 h-full`}
                        />
                    </div>
                </div>
            )}
            {githubPages && more && (
                <ul className="list-none m-0 p-0 grid gap-y-2 mt-4">
                    {githubPages.map((page) => {
                        return (
                            <li key={page.title}>
                                <Link
                                    to={page.html_url}
                                    className="text-[14px] flex items-center font-semibold space-x-1 text-black"
                                >
                                    <span>{page.closed_at ? <Closed /> : <Open />}</span>
                                    <span>{page.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </li>
    )
}

const UnderConsideration = (props) => {
    const { title, html_url, number, reactions } = props.githubPages[0]
    return (
        <li>
            <Link to={html_url} className="text-lg text-red flex space-x-1 items-center">
                <span>{title}</span>
                <span className="text-sm text-black opacity-50">#{number}</span>
            </Link>
            <ul className="list-none m-0 p-0 flex items-center space-x-2 text-sm font-semibold mt-2 mb-2">
                <li className="flex space-x-1 items-center">
                    {reactions.heart > 0 && (
                        <>
                            <span>❤️</span>
                            <span className="text-black/60">{reactions.heart}</span>
                        </>
                    )}
                </li>
                <li className="flex space-x-1 items-center">
                    {reactions.eyes > 0 && (
                        <>
                            <span>👀</span>
                            <span className="text-black/60">{reactions.eyes}</span>
                        </>
                    )}
                </li>
                <li className="flex space-x-1 items-center">
                    {reactions.hooray > 0 && (
                        <>
                            <span>🎉</span>
                            <span className="text-black/60">{reactions.hooray}</span>
                        </>
                    )}
                </li>
            </ul>
            <Link
                to={html_url}
                className="text-[15px] inline-flex items-center space-x-2 py-2 px-4 rounded-sm bg-gray-accent-light text-black hover:text-black font-bold"
            >
                <GitHub className="w-[24px]" />
                <span>Vote on GitHub</span>
            </Link>
        </li>
    )
}

const Complete = (props) => {
    const { title, githubPages } = props
    return (
        <li className="text-base font-semibold">
            {githubPages?.length > 0 ? <Link to={githubPages[0]?.html_url}>{title}</Link> : title}
        </li>
    )
}

const Section = ({ title, description, children }) => {
    return (
        <div className="lg:px-9 lg:py-6 first:pl-0 last:pr-0">
            <h3 className="text-xl m-0">{title}</h3>
            <p className="text-[15px] m-0 text-black/60 mb-4">{description}</p>
            {children}
        </div>
    )
}

const Card = ({ team, children }) => {
    return (
        <li className="bg-white m-0 p-4 rounded-md border-gray-accent-light border-dashed border">
            {team !== 'undefined' && <p className="text-sm opacity-50 m-0 mb-2">{team}</p>}
            {children}
        </li>
    )
}

const CardContainer = ({ children }) => {
    return <ul className="list-none m-0 p-0 grid gap-y-4">{children}</ul>
}

export default function Roadmap() {
    const {
        allSqueakRoadmap: { nodes },
    } = useStaticQuery(query)
    const underConsideration = groupBy(
        nodes.filter((node) => !node.date_completed && !node.projected_completion_date && node.githubPages),
        ({ team }) => team?.name
    )
    const inProgress = groupBy(
        nodes.filter((node) => !node.date_completed && node.projected_completion_date),
        ({ team }) => team?.name
    )
    const complete = groupBy(
        nodes.filter((node) => node.date_completed),
        ({ team }) => team?.name
    )
    return (
        <Layout>
            <SEO title="PostHog Roadmap" />
            <div className="border-t border-dashed border-gray-accent-light">
                <PostLayout
                    contentWidth={'100%'}
                    article={false}
                    title={'Roadmap'}
                    hideSearch
                    hideSurvey
                    menu={[
                        { name: 'Questions', url: '/questions' },
                        { name: 'Roadmap', url: '/roadmap' },
                        { name: 'Contributors', url: '/contributors' },
                        { name: 'Core team', url: '/handbook/company/team' },
                    ]}
                >
                    <h1 className="font-bold text-5xl mb-8 lg:mt-0">Roadmap</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:divide-x lg:gap-y-0 gap-y-6 divide-gray-accent-light divide-dashed lg:-mb-8 lg:border-t border-gray-accent-light border-dashed">
                        <Section
                            title="Under consideration"
                            description="The top features we might build next. Your feedback is requested."
                        >
                            <CardContainer>
                                {Object.keys(underConsideration).map((key) => {
                                    return (
                                        <Card team={key}>
                                            <CardContainer>
                                                {underConsideration[key]?.map((node) => {
                                                    return <UnderConsideration {...node} />
                                                })}
                                            </CardContainer>
                                        </Card>
                                    )
                                })}
                            </CardContainer>
                        </Section>
                        <Section
                            title="In progress"
                            description={
                                <>
                                    Here’s what we’re building <strong>right now</strong>. (We choose milestones using
                                    community feedback.)
                                </>
                            }
                        >
                            <CardContainer>
                                {Object.keys(inProgress).map((key) => {
                                    return (
                                        <Card team={key}>
                                            <CardContainer>
                                                {inProgress[key]?.map((node) => {
                                                    return <InProgress {...node} />
                                                })}
                                            </CardContainer>
                                        </Card>
                                    )
                                })}
                            </CardContainer>
                        </Section>
                        <Section title="Recently shipped" description="Here’s what was included in our last array.">
                            <CardContainer>
                                {Object.keys(complete).map((key) => {
                                    return (
                                        <Card team={key}>
                                            <CardContainer>
                                                {complete[key]?.map((node) => {
                                                    return <Complete {...node} />
                                                })}
                                            </CardContainer>
                                        </Card>
                                    )
                                })}
                            </CardContainer>
                        </Section>
                    </div>
                </PostLayout>
            </div>
        </Layout>
    )
}

const query = graphql`
    {
        allSqueakRoadmap {
            nodes {
                complete
                date_completed
                title
                description
                team {
                    name
                }
                githubPages {
                    title
                    html_url
                    number
                    closed_at
                    reactions {
                        url
                        total_count
                        laugh
                        hooray
                        confused
                        heart
                        rocket
                        eyes
                    }
                }
                projected_completion_date
            }
        }
    }
`
