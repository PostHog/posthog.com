import React from 'react'

import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import { docsMenu } from '../../navs'
import { useLayoutData } from 'components/Layout/hooks'
import QuickLinks from 'components/QuickLinks'
import Intro from 'components/Docs/Intro'
import AskMax from 'components/AskMax'
import { CallToAction } from 'components/CallToAction'

type MessagingProps = {
    data: {
        tutorials: {
            edges: {
                node: any
            }[]
        }
    }
}

export const Content = ({ quickLinks = false }) => {
    const { compact } = useLayoutData()
    return (
        <>
            {(quickLinks || compact) && (
                <QuickLinks
                    items={docsMenu.children.find(({ name }) => name.toLowerCase() === 'Messaging')?.children}
                />
            )}
        </>
    )
}

const Messaging: React.FC<MessagingProps> = () => {
    return (
        <Layout>
            <SEO title="Messaging - Documentation - PostHog" />

            <PostLayout title={'Messaging'} hideSurvey hideSidebar>
                <Intro
                    subheader="Getting started"
                    title="Messaging"
                    description="Send emails to your early access lists, newsletter subscribers, or app users."
                    buttonText="Start sending emails"
                    buttonLink="/docs/messaging/getting-started"
                    imageColumnClasses="max-w-96 mt-8 md:mt-0"
                    imageUrl="https://res.cloudinary.com/dmukukwp6/image/upload/v1743523365/messaging_crest_8de90d3c39.png"
                    imageClasses="max-h-48 md:max-h-64"
                />

                <AskMax
                    quickQuestions={[
                        'How do I send an email after a user signs up?',
                        'How do I send an email to my newsletter subscribers?',
                    ]}
                />

                <Content />

                <CallToAction to="/docs/messaging/getting-started" width="full">
                    Visit the manual
                </CallToAction>
            </PostLayout>
        </Layout>
    )
}

export default Messaging
