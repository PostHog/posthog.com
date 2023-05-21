import React, { useEffect, useState } from 'react'
import qs from 'qs'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import QuestionForm from 'components/Questions/QuestionForm'
import TopicsTable from 'components/Questions/TopicsTable'
import CommunityLayout from 'components/Community/Layout'

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
    const [topicGroups, setTopicGroups] = useState([])

    useEffect(() => {
        fetchTopicGroups().then((topicGroups) => setTopicGroups(topicGroups))
    }, [])

    return (
        <CommunityLayout title="Questions">
            <div className="max-w-6xl mx-auto space-y-8 pb-12">
                <section className="max-w-6xl mx-auto">
                    <div className="w-full sm:flex items-center mb-8">
                        <h1 className="text-4xl m-0">Community questions</h1>
                        <div className="ml-auto sm:mt-0 mt-4">
                            <QuestionForm showTopicSelector onSubmit={() => null} />
                        </div>
                    </div>

                    <div className="full">
                        <SidebarSearchBox filter="question" />
                    </div>

                    {topicGroups?.length > 0 && (
                        <div className="mt-8 flex flex-col space-y-8">
                            {topicGroups
                                .sort(
                                    (a, b) =>
                                        topicGroupsSorted.indexOf(a?.attributes?.label) -
                                        topicGroupsSorted.indexOf(b?.attributes?.label)
                                )
                                .map(({ attributes: { label, topics } }) => {
                                    return <TopicsTable key={label} topicGroup={label} topics={topics} />
                                })}
                        </div>
                    )}
                </section>
            </div>
        </CommunityLayout>
    )
}
