import React from 'react'
import Tooltip from 'components/RadixUI/Tooltip'
import { Button } from 'components/Squeak/components/SubscribeButton'
import { useUser } from 'hooks/useUser'
import { useApp } from '../../context/App'
import { ForumTopic, useForumSubscriptions } from './hooks'

// The same bell as a thread's reply emails. It turns a daily digest on or off. Manage subscriptions can switch
// a subscription to no emails, or, for moderators, to "Every post".
export default function TopicSubscribeButton({ topic }: { topic: ForumTopic }) {
    const { user } = useUser()
    const { openSignIn } = useApp()
    const { topicSubscription, subscribe, unsubscribe } = useForumSubscriptions()
    const subscription = topicSubscription(topic.id)

    const toggle = async () => {
        if (!user) return openSignIn()
        if (subscription) await unsubscribe(subscription.id)
        else await subscribe({ forumTopic: topic.id }, 'dailyDigest')
    }

    return (
        <Tooltip
            trigger={
                <span className="relative inline-flex">
                    <Button subscribed={!!subscription} handleSubscribe={toggle} />
                </span>
            }
            delay={0}
        >
            <div style={{ maxWidth: 320 }}>
                {!user
                    ? 'Sign in to subscribe'
                    : subscription?.deliveryMode === 'none'
                    ? `Following #${topic.attributes.slug} with no emails (Press to unsubscribe)`
                    : `Emails about new posts in #${topic.attributes.slug}: ${
                          subscription ? 'ON (Press to disable)' : 'OFF (Press to enable)'
                      }`}
            </div>
        </Tooltip>
    )
}
