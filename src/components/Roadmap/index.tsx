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
import { StaticImage } from 'gatsby-plugin-image'

interface IGitHubPage {
    title: string
    html_url: string
    number: string
    closed_at: string
    reactions: {
        hooray: number
        heart: number
        eyes: number
        plus1: number
    }
}

interface ITeam {
    name: string
}

export interface IRoadmap {
    beta_available: boolean
    complete: boolean
    date_completed: string
    title: string
    description: string
    team: ITeam
    githubPages: IGitHubPage[]
    projected_completion_date: string
}

const Complete = (props: { title: string; githubPages: IGitHubPage[]; otherLinks: string[] }) => {
    const { title, githubPages, otherLinks } = props
    const url = (githubPages?.length > 0 && githubPages[0]?.html_url) || (otherLinks?.length > 0 && otherLinks[0])
    return (
        <li className="text-base font-semibold">
            {url ? (
                <Link
                    to={url}
                    className="flex px-4 py-2 bg-white rounded-sm relative active:top-[0.5px] active:scale-[.99] shadow-xl"
                >
                    {title}
                </Link>
            ) : (
                <span className="flex bg-white px-4 py-2 rounded-sm shadow-xl relative">{title}</span>
            )}
        </li>
    )
}

export const Section = ({
    title,
    description,
    children,
    className,
}: {
    title: string | React.ReactNode
    description: string | React.ReactNode
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className={`xl:px-7 2xl:px-8 xl:pt-2 first:pl-0 last:pr-0 pb-6 xl:pb-12 ${className}`}>
            <h3 className="text-xl m-0">{title}</h3>
            <p className="text-[15px] m-0 text-black/60 mb-4">{description}</p>
            {children}
        </div>
    )
}

export const Card = ({ team, children }: { team: string; children: React.ReactNode }) => {
    return (
        <>
            {team !== 'undefined' && <h4 className="oh5acity-50 text-base font-bold mt-0 mb-2 pt-4">{team}</h4>}
            <li className="m-0 mb-3">{children}</li>
        </>
    )
}

export const CardContainer = ({ children }: { children: React.ReactNode }) => {
    return <ul className="list-none m-0 p-0 grid">{children}</ul>
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
        nodes.filter((node: IRoadmap) => {
            const goalDate = node.date_completed && new Date(node.date_completed)
            const currentDate = new Date()
            const currentQuarter = Math.floor(currentDate.getMonth() / 3 + 1)
            const goalQuarter = goalDate && Math.floor(goalDate.getMonth() / 3 + 1)
            return (
                goalDate && goalDate.getUTCFullYear() === currentDate.getUTCFullYear() && goalQuarter === currentQuarter
            )
        }),
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
                            <div className="relative">
                                <h1 className="font-bold text-5xl mb-8 lg:-mt-8 xl:-mt-0">Roadmap</h1>
                                <figure className="-mx-5 -mt-8 sm:-mt-20 lg:-mx-12 xl:-mt-32">
                                    <StaticImage
                                        imgClassName="w-full aspect-auto"
                                        placeholder="blurred"
                                        alt={`Look at those views!'`}
                                        src="./images/hike-hog.png"
                                    />
                                </figure>
                            </div>
                            <div className="grid grid-cols-1 xl:grid-cols-3 xl:divide-x xl:gap-y-0 gap-y-6 divide-gray-accent-light divide-dashed xl:-mb-8">
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
                                            Here’s what we're building <strong>right now</strong>. (We choose milestones
                                            using community feedback.)
                                        </>
                                    }
                                >
                                    <CardContainer>
                                        {Object.keys(inProgress)
                                            .sort((a, b) =>
                                                inProgress[a].some((goal) => goal.beta_available)
                                                    ? -1
                                                    : inProgress[b].some((goal) => goal.beta_available)
                                                    ? 1
                                                    : 0
                                            )
                                            .map((key) => {
                                                return (
                                                    <Card key={key} team={key}>
                                                        <CardContainer>
                                                            {inProgress[key]?.map((node: IRoadmap) => {
                                                                return <InProgress stacked key={node.title} {...node} />
                                                            })}
                                                        </CardContainer>
                                                    </Card>
                                                )
                                            })}
                                    </CardContainer>
                                </Section>
                                <Section
                                    title="Recently shipped"
                                    // description="Here's what was included in our last array."
                                    className=""
                                >
                                    <p className="p-4 border border-dashed border-gray-accent-light rounded-sm text-[15px]">
                                        Check out <Link to="/blog/categories/product-updates">product updates</Link> on
                                        our blog to see what we've shipped recently.
                                    </p>
                                    {/*
                                        hidden until we have more historical content loaded
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
                                    */}
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
                beta_available
                complete
                date_completed
                title
                description
                team {
                    name
                }
                thumbnail {
                    childImageSharp {
                        gatsbyImageData(width: 75, placeholder: NONE, quality: 100)
                    }
                }
                otherLinks
                githubPages {
                    title
                    html_url
                    number
                    closed_at
                    reactions {
                        hooray
                        heart
                        eyes
                        plus1
                    }
                }
                projected_completion_date
            }
        }
    }
`
