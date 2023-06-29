import React from 'react'
import { CardContainer, IRoadmap } from 'components/Roadmap'
import { InProgress } from 'components/Roadmap/InProgress'
import Link from 'components/Link'
import { useRoadmap } from 'hooks/useRoadmap'

export default function TeamRoadmap({ team }: { team?: string }) {
    const teams = useRoadmap()

    const roadmaps = teams.find((t) => t.name === team)?.roadmaps || []

    const futureRoadmaps = roadmaps.filter((r) => r.projectedCompletion && !r.complete)

    return futureRoadmaps.length <= 0 ? (
        <p className="!m-0 py-4 px-6  dark:border-gray-accent-dark rounded-md">
            Check out the <Link to="/roadmap">company roadmap</Link> to see what we're working on next!
        </p>
    ) : (
        <CardContainer>
            {futureRoadmaps?.map((node: IRoadmap) => {
                return (
                    <InProgress
                        more
                        className="border border-light dark:border-dark rounded-md !border-t !mb-4"
                        key={node.title}
                        {...node}
                    />
                )
            })}
        </CardContainer>
    )
}
