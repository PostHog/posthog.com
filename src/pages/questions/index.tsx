import React from 'react'
import qs from 'qs'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import QuestionForm from 'components/Questions/QuestionForm'
import CommunityLayout from 'components/Community/Layout'
import useTopicsNav from '../../navs/useTopicsNav'
import QuestionsTable from 'components/Questions/QuestionsTable'
import { useQuestions } from 'hooks/useQuestions'

export const fetchTopicGroups = async () => {
    // FIXME: This is has to fetch _every_ (or probably at most 25) quesiton that's part of a topic even though we only need the most recent one
    const topicGroupsQuery = qs.stringify(
        {
            populate: {
                topics: {
                    populate: {
                        questions: {
                            sort: 'activeAt:desc',
                            fields: ['id', 'activeAt'],
                            filters: {
                                $or: [
                                    {
                                        archived: {
                                            $null: true,
                                        },
                                    },
                                    {
                                        archived: {
                                            $eq: false,
                                        },
                                    },
                                ],
                            },
                        },
                    },
                },
            },
        },
        {
            encodeValuesOnly: true,
        }
    )
    const topicGroups = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/topic-groups?${topicGroupsQuery}`)

    if (!topicGroups.ok) {
        throw new Error('Failed to fetch topic groups')
    }

    return topicGroups.json().then((topicGroups) => topicGroups.data)
}

export const topicGroupsSorted = ['Products', 'Platform', 'Data', 'Self-hosting', 'Other']

export default function Questions() {
    const { questions, isLoading, fetchMore, hasMore, refresh } = useQuestions({
        limit: 20,
        sortBy: 'activity',
        filters: {
            subject: {
                $ne: '',
            },
            slugs: {
                slug: {
                    $notContainsi: '/community/profiles',
                },
            },
        },
    })

    const topicsNav = useTopicsNav()

    return (
        <CommunityLayout menu={topicsNav} title="Questions" contentWidth="100%">
            <div className="space-y-8 pb-12">
                <section>
                    <div className="w-full sm:flex items-center mb-8">
                        <h1 className="text-4xl m-0">Community questions</h1>
                        <div className="ml-auto sm:mt-0 mt-4">
                            <QuestionForm showTopicSelector onSubmit={() => refresh()} />
                        </div>
                    </div>
                    <SidebarSearchBox filter="question" />
                    <div className="mt-8 flex flex-col">
                        <QuestionsTable
                            questions={questions}
                            showTopic
                            fetchMore={fetchMore}
                            isLoading={isLoading}
                            hasMore={hasMore}
                            sortBy="activity"
                        />
                    </div>
                </section>
            </div>
        </CommunityLayout>
    )
}
