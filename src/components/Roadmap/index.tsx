import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { UnderConsideration } from './UnderConsideration'
import { InProgress } from './InProgress'
import { StaticImage } from 'gatsby-plugin-image'
import { useRoadmap } from 'hooks/useRoadmap'
import { useNav } from 'components/Community/useNav'
import { CallToAction } from 'components/CallToAction'
import RoadmapForm, { Status } from 'components/RoadmapForm'
import { useUser } from 'hooks/useUser'

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
    roadmaps: IRoadmap[]
}

export interface IRoadmap {
    squeakId: number
    title: string
    description: string
    betaAvailable: boolean
    complete: boolean
    dateCompleted: string
    image?: {
        url: string
    }
    projectedCompletion: string
    githubPages: IGitHubPage[]
}

/*const Complete = (props: { title: string; githubPages: IGitHubPage[] }) => {
    const { title, githubPages } = props
    const url = githubPages?.length > 0 && githubPages[0]?.html_url

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
}*/

function UpdateWrapper({ id, children, status }: { id: number; children: JSX.Element; status: Status }) {
    const { user } = useUser()
    const [editing, setEditing] = useState(false)
    const [initialValues, setInitialValues] = useState<any>(null)
    const [success, setSuccess] = useState(false)

    const fetchRoadmapItem = () =>
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps/${id}?populate=*`)
            .then((res) => res.json())
            .then(({ data: { attributes } }) => {
                const { title, description, topic, teams, image, betaAvailable, milestone, category, githubUrls } =
                    attributes
                setInitialValues({
                    title,
                    body: description,
                    images: [],
                    topic: topic?.id || undefined,
                    team: teams?.data?.[0]?.id || undefined,
                    featuredImage: image?.data ? { file: null, objectURL: image.data.attributes.url } : undefined,
                    betaAvailable,
                    milestone,
                    category: category || undefined,
                    githubUrls: githubUrls?.length > 0 ? githubUrls : [''],
                })
            })

    useEffect(() => {
        if (user?.role?.type !== 'moderator') return
        fetchRoadmapItem()
    }, [user])

    return editing ? (
        <div className="mb-4">
            <RoadmapForm
                status={status}
                hideStatusSelector={false}
                initialValues={initialValues}
                buttonText="Update"
                id={id}
                onSubmit={() => {
                    fetchRoadmapItem()
                    setSuccess(true)
                    setEditing(false)
                }}
            />
        </div>
    ) : (
        <>
            {success && <RoadmapSuccess description="Roadmap will update on next build" id={id} />}
            <div className="relative">
                {initialValues && (
                    <button
                        className="absolute bottom-4 right-4 z-10 font-bold text-red"
                        onClick={() => setEditing(true)}
                    >
                        Edit
                    </button>
                )}
                <span>{children}</span>
            </div>
        </>
    )
}

const RoadmapSuccess = ({
    id,
    description = 'Roadmap item will be appear on next build',
}: {
    id: number
    description?: string
}) => {
    return (
        <div className="p-2 mb-4">
            <h4 className="m-0">Success!</h4>
            <p className="m-0">{description}</p>
            <Link
                external
                to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collectionType/api::roadmap.roadmap/${id}`}
                className="mt-2 text-sm"
            >
                View in Strapi
            </Link>
        </div>
    )
}

const AddRoadmapItem = ({ status }: { status: 'in-progress' | 'complete' | 'under-consideration' }) => {
    const [adding, setAdding] = useState(false)
    const [roadmapID, setRoadmapID] = useState(null)

    return (
        <div className="pt-4 !mt-4 border-t border-border dark:border-dark pb-4">
            {roadmapID && <RoadmapSuccess id={roadmapID} />}
            {adding ? (
                <RoadmapForm
                    status={status}
                    onSubmit={(roadmap) => {
                        setAdding(false)
                        setRoadmapID(roadmap.id)
                    }}
                />
            ) : (
                <CallToAction
                    width="full"
                    onClick={() => {
                        setAdding(true)
                        setRoadmapID(null)
                    }}
                >
                    Add
                </CallToAction>
            )}
        </div>
    )
}

export const Section = ({
    title,
    description,
    children,
    className,
}: {
    title: React.ReactNode
    description?: React.ReactNode
    children: React.ReactNode
    className?: string
}) => {
    return (
        <div className={`xl:px-7 2xl:px-8 px-5 py-8 ${className ?? ''}`}>
            <h3 className="text-xl m-0">{title}</h3>
            {description && <p className="text-[15px] m-0 text-black/60 dark:text-white/60 mb-4">{description}</p>}
            {children}
        </div>
    )
}

export const Card = ({ team, children }: { team: string; children: React.ReactNode }) => {
    return (
        <>
            {team !== 'undefined' && <h4 className="text-base font-bold mt-0 mb-2 pt-4">{team}</h4>}
            <li className="m-0 mb-3">{children}</li>
        </>
    )
}

export const CardContainer = ({ children }: { children: React.ReactNode }) => {
    return <ul className="list-none m-0 p-0 grid space-y-2">{children}</ul>
}

export default function Roadmap() {
    const nav = useNav()
    const teams = useRoadmap()
    const { user } = useUser()
    const underConsideration: ITeam[] = teams
        .map((team) => {
            return {
                ...team,
                roadmaps: team.roadmaps.filter(
                    (roadmap) =>
                        !roadmap.dateCompleted &&
                        !roadmap.projectedCompletion &&
                        roadmap.githubPages &&
                        roadmap.githubPages.length > 0
                ),
            }
        })
        .filter((team) => team.roadmaps.length > 0)

    const inProgress: ITeam[] = teams
        .map((team) => {
            return {
                ...team,
                roadmaps: team.roadmaps.filter((roadmap) => !roadmap.complete && roadmap.projectedCompletion),
            }
        })
        .filter((team) => team.roadmaps.length > 0)

    return (
        <Layout>
            <SEO title="PostHog Roadmap" />
            <div className="">
                <PostLayout
                    article={false}
                    title={'Roadmap'}
                    hideSurvey
                    menu={nav}
                    darkMode={false}
                    contentContainerClassName="lg:-mb-12 -mb-8"
                    fullWidthContent
                >
                    <div className="relative">
                        <h1 className="font-bold text-5xl mx-8 lg:-mt-8 xl:-mt-0">Roadmap</h1>
                        <figure className="sm:-mt-12 xl:-mt-24 mb-0">
                            <StaticImage
                                className="w-full"
                                imgClassName="w-full aspect-auto"
                                placeholder="blurred"
                                alt={`Look at those views!'`}
                                src="./images/hike-hog.png"
                            />
                        </figure>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-3 xl:divide-x xl:gap-y-0 gap-y-6 divide-light dark:divide-dark pb-8">
                        <Section
                            title="Under consideration"
                            description="The top features we might build next. Your feedback is requested."
                        >
                            <CardContainer>
                                {underConsideration.sort().map((team) => {
                                    return (
                                        <Card key={team.name} team={team.name}>
                                            <CardContainer>
                                                {team.roadmaps.map((node) => {
                                                    return (
                                                        <UpdateWrapper
                                                            key={node.title}
                                                            id={node.squeakId}
                                                            status="under-consideration"
                                                        >
                                                            <UnderConsideration {...node} />
                                                        </UpdateWrapper>
                                                    )
                                                })}
                                            </CardContainer>
                                        </Card>
                                    )
                                })}
                                {user?.role?.type === 'moderator' && <AddRoadmapItem status="under-consideration" />}
                            </CardContainer>
                        </Section>

                        <Section
                            title="In progress"
                            description={
                                <>
                                    Here’s what we're building <strong>right now</strong>. (We choose milestones using
                                    community feedback.)
                                </>
                            }
                        >
                            <CardContainer>
                                {inProgress
                                    .sort((a, b) =>
                                        a.roadmaps.some((goal) => goal.betaAvailable)
                                            ? -1
                                            : b.roadmaps.some((goal) => goal.betaAvailable)
                                            ? 1
                                            : 0
                                    )
                                    .map((team) => {
                                        return (
                                            <Card key={team.name} team={team.name}>
                                                <CardContainer>
                                                    {team.roadmaps.map((node) => {
                                                        return (
                                                            <UpdateWrapper
                                                                key={node.title}
                                                                id={node.squeakId}
                                                                status="in-progress"
                                                            >
                                                                <InProgress stacked {...node} />
                                                            </UpdateWrapper>
                                                        )
                                                    })}
                                                </CardContainer>
                                            </Card>
                                        )
                                    })}
                                {user?.role?.type === 'moderator' && <AddRoadmapItem status="in-progress" />}
                            </CardContainer>
                        </Section>

                        <Section
                            title="Recently shipped"
                            // description="Here's what was included in our last array."
                            className=""
                        >
                            <p className="p-4  rounded-sm text-[15px]">
                                Check out <Link to="/changelog">our changelog</Link> on our blog to see what we've
                                shipped recently.
                            </p>
                            {user?.role?.type === 'moderator' && <AddRoadmapItem status="complete" />}
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
        </Layout>
    )
}
