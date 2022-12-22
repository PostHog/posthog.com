import React, { useEffect, useState } from 'react'
import { CallToAction } from 'components/CallToAction'
import { Slack } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import PostLayout, { SidebarSection } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { squeakProfileLink } from 'lib/utils'
import { Squeak } from 'squeak-react'
import { graphql } from 'gatsby'
import Link from 'components/Link'
import { community } from '../../../sidebars/sidebars.json'
import useSWRInfinite from 'swr/infinite'
import QuestionsTable from 'components/Questions/QuestionsTable'

interface ITopic {
    label: string
    slug: string
}

interface IProps {
    data: {
        squeakTopic: {
            id: string
            topicId: string
            label: string
        }
    }
    pageContext: {
        id: string
        topics: ITopic[]
    }
}

const TopicSidebar = () => {
    return (
        <div>
            <SidebarSection>
                <div className="flex items-center space-x-2">
                    <Slack className="w-5" />
                    <h3 className="m-0 text-lg">Slack community</h3>
                </div>
                <p className="mt-2 mb-3">Chat with the PostHog team and other community members</p>
                <CallToAction type="secondary" size="sm" width="full" to="/slack" className="inline-block">
                    Join our Slack
                </CallToAction>
            </SidebarSection>
        </div>
    )
}

export default function SqueakTopics({ data: pageData }: IProps) {
    const [sortBy] = useState<'newest' | 'activity' | 'popular'>('newest')

    const { data, size, setSize, isLoading, mutate } = useSWRInfinite<any[]>(
        (offset) =>
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/v1/questions?organizationId=${
                process.env.GATSBY_SQUEAK_ORG_ID
            }&start=${offset * 20}&perPage=20&published=true&sortBy=${sortBy}&topic=${pageData.squeakTopic.topicId}`,
        (url: string) =>
            fetch(url)
                .then((r) => r.json())
                .then((r) => r.questions)
    )

    const questions = React.useMemo(() => {
        return data?.flat() || []
    }, [size, data])

    return (
        <>
            <SEO title={`${pageData.squeakTopic.label} - PostHog`} />
            <Layout>
                <PostLayout title={pageData.squeakTopic.label} menu={community} sidebar={<TopicSidebar />} hideSurvey>
                    <section className="my-8 lg:my-0 pb-12">
                        <div className="mb-4">
                            <Link to="/questions" className="text-gray hover:text-gray-accent-light">
                                ← Back to Questions
                            </Link>
                        </div>
                        <QuestionsTable
                            hideLoadMore
                            questions={questions}
                            size={size}
                            setSize={setSize}
                            isLoading={isLoading}
                        />
                    </section>
                </PostLayout>
            </Layout>
        </>
    )
}

export const query = graphql`
    query ($id: String!) {
        squeakTopic(id: { eq: $id }) {
            id
            topicId
            label
        }
    }
`
