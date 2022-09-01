import { CallToAction } from 'components/CallToAction'
import { Slack } from 'components/Icons/Icons'
import Layout from 'components/Layout'
import PostLayout, { SidebarSection } from 'components/PostLayout'
import { SEO } from 'components/seo'
import { sentenceCase } from 'lib/utils'
import React from 'react'
import { Squeak } from 'squeak-react'

interface ITopic {
    label: string
    slug: string
}

interface IProps {
    pageContext: {
        label: string
        topics: ITopic[]
    }
}

const labelOverrides: Record<string, string> = {
    api: 'API',
    'migrating to posthog': 'Migrating to PostHog',
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

export default function SqueakTopics({ pageContext: { label, topics } }: IProps) {
    const menu = topics.map(({ label, slug }) => {
        return {
            name: labelOverrides[label.toLowerCase()] || sentenceCase(label),
            url: `/questions/${slug}`,
        }
    })

    console.log(label, topics)

    return (
        <>
            <SEO title={`${labelOverrides[label.toLowerCase()] || sentenceCase(label)} - PostHog`} />
            <Layout>
                <PostLayout
                    title={label}
                    menu={[{ name: 'Questions', url: '/questions', children: [{ name: 'Topics' }, ...menu] }]}
                    sidebar={<TopicSidebar />}
                    hideSurvey
                >
                    <section className="my-8 lg:my-0">
                        <Squeak
                            limit={5}
                            topics={false}
                            slug={null}
                            apiHost={'https://squeak.cloud'}
                            organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                            topic={label}
                        />
                    </section>
                </PostLayout>
            </Layout>
        </>
    )
}
