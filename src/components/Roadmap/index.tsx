import Layout from 'components/Layout'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import groupBy from 'lodash.groupby'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { UnderConsideration } from './UnderConsideration'
import { InProgress } from './InProgress'
import { OrgProvider, UserProvider } from 'squeak-react'

interface IGitHubPage {
    title: string
    html_url: string
    number: string
    closed_at: string
    reactions: {
        hooray: number
        heart: number
        eyes: number
    }
}

interface ITeam {
    name: string
}

export interface IRoadmap {
    complete: boolean
    date_completed: string
    title: string
    description: string
    team: ITeam
    githubPages: IGitHubPage[]
    projected_completion_date: string
}

const Complete = (props: { title: string; githubPages: IGitHubPage[] }) => {
    const { title, githubPages } = props
    return (
        <li className="text-base font-semibold">
            {githubPages?.length > 0 ? <Link to={githubPages[0]?.html_url}>{title}</Link> : title}
        </li>
    )
}

const Section = ({
    title,
    description,
    children,
}: {
    title: string | React.ReactNode
    description: string | React.ReactNode
    children: React.ReactNode
}) => {
    return (
        <div className="lg:px-9 lg:py-6 first:pl-0 last:pr-0">
            <h3 className="text-xl m-0">{title}</h3>
            <p className="text-[15px] m-0 text-black/60 mb-4">{description}</p>
            {children}
        </div>
    )
}

const Card = ({ team, children }: { team: string; children: React.ReactNode }) => {
    return (
        <li className="bg-white m-0 p-4 rounded-md border-gray-accent-light border-dashed border">
            {team !== 'undefined' && <p className="text-sm opacity-50 m-0 mb-2">{team}</p>}
            {children}
        </li>
    )
}

const CardContainer = ({ children }: { children: React.ReactNode }) => {
    return <ul className="list-none m-0 p-0 grid gap-y-4">{children}</ul>
}

export default function Roadmap() {
    const {
        allSqueakRoadmap: { nodes },
    } = useStaticQuery(query)

    const underConsideration = groupBy(
        nodes.filter(
            (node: IRoadmap) =>
                !node.date_completed &&
                !node.projected_completion_date &&
                node.githubPages &&
                node.githubPages.length > 0
        ),
        ({ team }: { team: ITeam }) => team?.name
    )
    const inProgress = groupBy(
        nodes.filter((node: IRoadmap) => !node.date_completed && node.projected_completion_date),
        ({ team }: { team: ITeam }) => team?.name
    )
    const complete = groupBy(
        nodes.filter((node: IRoadmap) => node.date_completed),
        ({ team }: { team: ITeam }) => team?.name
    )
    return (
        <Layout>
            <SEO title="PostHog Roadmap" />
            <OrgProvider
                value={{ organizationId: 'a898bcf2-c5b9-4039-82a0-a00220a8c626', apiHost: 'https://squeak.cloud' }}
            >
                <UserProvider>
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
                                        {Object.keys(underConsideration)
                                            .sort()
                                            .map((key) => {
                                                return (
                                                    <Card key={key} team={key}>
                                                        <CardContainer>
                                                            {underConsideration[key]?.map((node: IRoadmap) => {
                                                                return <UnderConsideration key={node.title} {...node} />
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
                                            Here’s what we’re building <strong>right now</strong>. (We choose milestones
                                            using community feedback.)
                                        </>
                                    }
                                >
                                    <CardContainer>
                                        {Object.keys(inProgress)
                                            .sort()
                                            .map((key) => {
                                                return (
                                                    <Card key={key} team={key}>
                                                        <CardContainer>
                                                            {inProgress[key]?.map((node: IRoadmap) => {
                                                                return <InProgress key={node.title} {...node} />
                                                            })}
                                                        </CardContainer>
                                                    </Card>
                                                )
                                            })}
                                    </CardContainer>
                                </Section>
                                <Section
                                    title="Recently shipped"
                                    description="Here’s what was included in our last array."
                                >
                                    <CardContainer>
                                        {Object.keys(complete)
                                            .sort()
                                            .map((key) => {
                                                return (
                                                    <Card key={key} team={key}>
                                                        <CardContainer>
                                                            {complete[key]?.map((node: IRoadmap) => {
                                                                return <Complete key={node.title} {...node} />
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
                </UserProvider>
            </OrgProvider>
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
                        hooray
                        heart
                        eyes
                    }
                }
                projected_completion_date
            }
        }
    }
`
