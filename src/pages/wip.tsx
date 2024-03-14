import Layout from 'components/Layout'
import React, { useState } from 'react'
import SEO from 'components/seo'
import { companyMenu } from '../navs'
import { Skeleton } from 'components/Questions/QuestionsTable'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { InProgress } from 'components/Roadmap/InProgress'
import UpdateWrapper from 'components/Roadmap/UpdateWrapper'
import RoadmapForm from 'components/RoadmapForm'
import { useUser } from 'hooks/useUser'
import { CallToAction } from 'components/CallToAction'

export default function TeamUpdates() {
    const { user } = useUser()
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

    const isModerator = user?.role?.type === 'moderator'

    return (
        <Layout parent={companyMenu}>
            <SEO title="WIP - PostHog" />
            <section className="max-w-[700px] mx-auto px-5 mt-8">
                <div className="relative pb-6 mb-6 border-b border-border dark:border-dark">
                    <h1 className="font-bold text-3xl sm:text-5xl my-0">Work in progress</h1>
                    <p className="my-0 font-semibold opacity-70 mt-1 sm:mt-2">Here's what we're building right now</p>
                    {isModerator &&
                        (adding ? (
                            <div className="mt-4">
                                <RoadmapForm
                                    status="in-progress"
                                    onSubmit={() => {
                                        mutate()
                                        setAdding(false)
                                    }}
                                />
                            </div>
                        ) : (
                            <CallToAction onClick={() => setAdding(true)} size="sm" type="primary" className="mt-4">
                                New WIP
                            </CallToAction>
                        ))}
                </div>

                <div className="pb-12">
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <ul className="list-none m-0 p-0 pb-4 grid gap-y-4">
                            {roadmaps.map((roadmap) => {
                                const { id, attributes } = roadmap
                                return (
                                    <li key={id}>
                                        <UpdateWrapper
                                            key={id}
                                            id={id}
                                            status="in-progress"
                                            formClassName="mb-4"
                                            editButtonClassName={'absolute top-4 right-4 z-10'}
                                        >
                                            <InProgress {...attributes} squeakId={id} />
                                        </UpdateWrapper>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </section>
        </Layout>
    )
}
