import Layout from 'components/Layout'
import React from 'react'
import SEO from 'components/seo'
import { companyMenu } from '../navs'
import { Skeleton } from 'components/Questions/QuestionsTable'
import { useRoadmaps } from 'hooks/useRoadmaps'
import { InProgress } from 'components/Roadmap/InProgress'
import UpdateWrapper from 'components/Roadmap/UpdateWrapper'

export default function TeamUpdates() {
    const { roadmaps, isLoading } = useRoadmaps({
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

    return (
        <Layout parent={companyMenu}>
            <SEO title="WIP - PostHog" />
            <section className="max-w-[700px] mx-auto px-5 mt-8">
                <div className="relative pb-6 mb-6 border-b border-border dark:border-dark flex justify-between items-end">
                    <div>
                        <h1 className="font-bold text-5xl my-0">Work in progress</h1>
                        <p className="my-0 font-semibold opacity-70 mt-2">Here's what we're building right now</p>
                    </div>
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
