import CloudinaryImage from 'components/CloudinaryImage'
import { CallToAction } from 'components/CallToAction'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

const RoadmapColumn = ({ children }) => {
    return <div className="md:border-r last:border-r-0 border-light dark:border-dark">{children}</div>
}

const RoadmapItem = ({ children }) => {
    return (
        <li className="list-none m-0 pt-2 px-1 pb-3 text-[15px] text-primary/75 dark:text-primary-dark/75 w-full font-semibold border-light dark:border-dark border-b last:border-b-0 whitespace-normal md:whitespace-nowrap overflow-hidden text-ellipsis">
            {children}
        </li>
    )
}

const sortByVotes = (nodes) => {
    return nodes
        .map((node) => ({
            ...node,
            votes: (node.githubPages?.reactions?.total_count || 0) + (node.likes?.data?.length || 0),
        }))
        .sort((a, b) => b.votes - a.votes)
}

const Roadmap = () => {
    const { initialWip, initialRoadmap } = useStaticQuery(graphql`
        {
            initialWip: allSqueakRoadmap(
                filter: { complete: { ne: true }, projectedCompletion: { ne: null } }
                sort: { fields: id }
            ) {
                nodes {
                    squeakId
                    title
                    githubPages {
                        reactions {
                            total_count
                        }
                    }
                    likes {
                        data {
                            id
                        }
                    }
                }
            }
            initialRoadmap: allSqueakRoadmap(
                filter: { dateCompleted: { eq: null }, projectedCompletion: { eq: null } }
            ) {
                nodes {
                    title
                    githubPages {
                        reactions {
                            total_count
                        }
                    }
                    likes {
                        data {
                            id
                        }
                    }
                }
            }
        }
    `)

    const wip = sortByVotes(initialWip.nodes)
    const roadmaps = sortByVotes(initialRoadmap.nodes).slice(0, wip.length)

    return (
        <div className="px-4 mb-12 max-w-7xl mx-auto md:grid md:grid-cols-3 md:gap-12">
            <figure className="w-64 mx-auto md:w-auto">
                <CloudinaryImage
                    width={367}
                    height={348}
                    imgClassName=""
                    placeholder="blurred"
                    alt={`Here's what's cookin', good lookin'`}
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Home/images/experiment-hog.png"
                />
            </figure>
            <div className="col-span-2">
                <h2 className="m-0 text-5xl md:text-6xl text-primary dark:text-primary-dark text-center md:text-left">
                    The future of PostHog <span className="text-red inline-block">depends on you</span>
                </h2>
                <h3 className="m-0 text-lg leading-tight md:text-xl text-center md:text-left font-semibold mt-2 md:mt-3 opacity-75 text-primary dark:text-primary-dark">
                    We publish our product roadmap. Tell us what we should build next – and get early access.
                </h3>

                <div className="mt-4 mb-12 text-center md:text-left">
                    <CallToAction type="outline" to="/roadmap">
                        Explore our roadmap
                    </CallToAction>
                </div>

                <div className="grid border border-light dark:border-dark text-primary dark:text-primary-dark md:grid-cols-2 relative after:bg-gradient-to-b after:from-light/0 after:to-light/70 md:after:to</h3>-light/90 dark:after:from-dark/0 dark:after:to-dark/70 dark:md:after:to-dark/90 after:bottom-0 after:left-0 after:w-full after:h-36 after:absolute">
                    <RoadmapColumn>
                        <div className="text-base py-1 font-bold text-center bg-accent dark:bg-accent-dark border-b border-light dark:border-dark">
                            Under consideration
                        </div>
                        <ul className="m-0 px-4 pt-1 bg-accent dark:bg-accent-dark">
                            {roadmaps.map((roadmap) => (
                                <RoadmapItem key={roadmap.squeakId}>{roadmap.title}</RoadmapItem>
                            ))}
                        </ul>
                    </RoadmapColumn>
                    <RoadmapColumn>
                        <div className="text-base py-1 font-bold text-center bg-accent dark:bg-accent-dark border-b border-light dark:border-dark">
                            In progress
                        </div>
                        <ul className="m-0 px-4 pt-1 bg-accent dark:bg-accent-dark">
                            {wip.map((roadmap) => (
                                <RoadmapItem key={roadmap.squeakId}>{roadmap.title}</RoadmapItem>
                            ))}
                        </ul>
                    </RoadmapColumn>
                </div>
            </div>
        </div>
    )
}

export default Roadmap
