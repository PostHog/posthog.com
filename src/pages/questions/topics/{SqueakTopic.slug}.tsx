import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { Slack } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import PostLayout, { SidebarSection } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { squeakProfileLink } from 'lib/utils'
import { Squeak } from 'squeak-react'
import { graphql } from 'gatsby'
import { useTopicMenu } from 'lib/useTopicMenu'
import Link from 'components/Link'

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

export default function SqueakTopics({ data }: IProps) {
    const menu = useTopicMenu()

    return (
        <>
            <SEO title={`${data.squeakTopic.label} - PostHog`} />
            <Layout>
                <PostLayout title={data.squeakTopic.label} menu={menu} sidebar={<TopicSidebar />} hideSurvey>
                    <section className="my-8 lg:my-0">
                        <div className="mb-4">
                            <Link to="/questions" className="text-gray hover:text-gray-accent-light">
                                ← Back to Questions
                            </Link>
                        </div>

                        <Squeak
                            profileLink={squeakProfileLink}
                            limit={5}
                            topics={false}
                            slug={null}
                            apiHost={process.env.GATSBY_SQUEAK_API_HOST as string}
                            organizationId={process.env.GATSBY_SQUEAK_ORG_ID as string}
                            topic={data.squeakTopic.topicId}
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
