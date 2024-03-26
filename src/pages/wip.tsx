import React, { useState } from 'react'
import { companyMenu } from '../navs'
import { Skeleton } from 'components/Questions/QuestionsTable'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { InProgress } from 'components/Roadmap/InProgress'
import UpdateWrapper from 'components/Roadmap/UpdateWrapper'
import RoadmapForm from 'components/RoadmapForm'
import { useUser } from 'hooks/useUser'
import { CallToAction } from 'components/CallToAction'
import groupBy from 'lodash.groupby'
import CommunityLayout from 'components/Community/Layout'
import { IconShieldLock } from '@posthog/icons'
import Tooltip from 'components/Tooltip'
import { useLocation } from '@reach/router'

export default function TeamUpdates() {
    const { user } = useUser()
    const { search } = useLocation()
    const [adding, setAdding] = useState(false)
    const { roadmaps, isLoading, mutate } = useRoadmaps({
        params: {
            filters: {
                $and: [
                    {
                        complete: {
                            $ne: true,
                        },
                    },
                    {
                        projectedCompletion: {
                            $notNull: true,
                        },
                    },
                ],
            },
        },
    })

    const roadmapsGroupedByTeam = groupBy(
        roadmaps,
        (roadmap) => `${roadmap.attributes.teams?.data?.[0]?.attributes?.name ?? 'Any'} Team`
    )
    const teams = Object.keys(roadmapsGroupedByTeam).sort()
    const isModerator = user?.role?.type === 'moderator'

    const params = new URLSearchParams(search)
    const roadmapID = params.get('id')

    return (
        <CommunityLayout
            parent={companyMenu}
            activeInternalMenu={companyMenu.children.find(({ name }) => name.toLowerCase() === 'wip')}
            title="WIP"
        >
            <section>
                <div className="relative mb-6">
                    <div className="flex gap-4 items-center">
                        <h1 className="font-bold text-3xl sm:text-4xl my-0">Work in progress</h1>
                        {isModerator && !adding && (
                            <div className="relative top-1">
                                <CallToAction onClick={() => setAdding(true)} size="xs" type="secondary">
                                    <Tooltip content="Only moderators can see this" placement="top">
                                        <IconShieldLock className="w-6 h-6 inline-block mr-1" />
                                    </Tooltip>
                                    New item
                                </CallToAction>
                            </div>
                        )}
                    </div>
                    <p className="my-0 font-semibold opacity-70 mt-1 sm:mt-2">Here's what we're building right now.</p>
                </div>

                {isModerator && adding && (
                    <div className="mt-2 mb-8">
                        <RoadmapForm
                            status="in-progress"
                            onSubmit={() => {
                                mutate()
                                setAdding(false)
                            }}
                        />
                    </div>
                )}

                <div className="pb-12">
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <ul className="@container list-none m-0 p-0 pb-4 grid gap-y-8">
                            {teams.map((team) => {
                                const roadmaps = roadmapsGroupedByTeam[team]
                                return (
                                    <li className="relative" key={team}>
                                        <h4 className="text-lg m-0 mb-6 pr-2 inline-flex items-center bg-light dark:bg-dark after:-z-10 after:absolute after:w-full after:h-[1px] after:bg-border after:dark:bg-border-dark after:translate-y-[2px]">
                                            {team}
                                        </h4>
                                        <ul className="m-0 p-0 list-none flex flex-col @3xl:grid grid-cols-2 gap-8">
                                            {roadmaps.map((roadmap) => {
                                                const { id, attributes } = roadmap
                                                return (
                                                    <li key={id}>
                                                        <UpdateWrapper
                                                            key={id}
                                                            id={id}
                                                            roundButton={true}
                                                            status="in-progress"
                                                            formClassName="mb-4"
                                                            editButtonClassName={'absolute -top-4 -right-4 z-10'}
                                                        >
                                                            <InProgress
                                                                {...attributes}
                                                                squeakId={id}
                                                                modalOpen={roadmapID == id}
                                                            />
                                                        </UpdateWrapper>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </section>
        </CommunityLayout>
    )
}
