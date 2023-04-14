import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import community from 'sidebars/community.json'
import PostLayout from 'components/PostLayout'
import SidebarSearchBox from 'components/Search/SidebarSearchBox'
import QuestionForm from 'components/Questions/QuestionForm'
import TopicsTable from 'components/Questions/TopicsTable'

const fetchTopicGroups = async () => {
    const topicGroupsQuery = qs.stringify(
        {
            populate: {
                topics: {
                    populate: {
                        questions: {
                            fields: ['id', 'createdAt'],
                        },
                    },
                },
            },
            filters: {
                topics: {
                    questions: {
                        resolved: {
                            $eq: false,
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

const topicGroupsSorted = ['Products', 'Platform', 'Data', 'Self-hosting']

export default function Questions() {
    const [topicGroups, setTopicGroups] = useState([])

    useEffect(() => {
        fetchTopicGroups().then((topicGroups) => setTopicGroups(topicGroups))
    }, [])

    return (
        <Layout>
            <PostLayout hideSidebar title={'Questions'} menu={community} hideSurvey>
                <SEO title={'Questions - PostHog'} />

                <div className="max-w-6xl mx-auto space-y-8 pb-12">
                    <section className="max-w-6xl mx-auto">
                        <div className="w-full sm:flex items-center mb-8">
                            <h1 className="text-4xl m-0">Community questions</h1>
                            <div className="ml-auto sm:mt-0 mt-4">
                                <QuestionForm onSubmit={() => null} />
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
            </PostLayout>
        </Layout>
    )
}
