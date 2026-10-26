import React from 'react'
import { IconBell, IconX } from '@posthog/icons'
import Modal from 'components/RadixUI/Modal'
import OSButton from 'components/OSButton'
import DialogSelect from './DialogSelect'
import { ForumSubscription } from 'lib/strapi'
import { useUser } from 'hooks/useUser'
import { DeliveryMode, useForumSubscriptions, useForumTopics } from './hooks'
import TopicIcon from './TopicIcon'

// Everyone can choose no emails or the daily digest; only moderators can get an email for each new post. Every
// subscription shows its posts in Following.
const deliveryModes: { value: DeliveryMode; label: string; moderatorOnly?: boolean }[] = [
    { value: 'none', label: 'No emails' },
    { value: 'dailyDigest', label: 'Daily digest' },
    { value: 'eachPost', label: 'Every post', moderatorOnly: true },
]

const Row = ({ subscription }: { subscription: ForumSubscription }) => {
    const { isForumModerator } = useUser()
    const { topics } = useForumTopics()
    const { subscribe, unsubscribe } = useForumSubscriptions()
    const topic = subscription.forumTopic
    const tag = subscription.forumTag
    const label = topic ? `#${topic.slug}` : tag?.label
    const icon = topic ? topics.find((t) => t.id === topic.id)?.attributes.icon : null
    const modes = deliveryModes.filter((mode) => !mode.moderatorOnly || isForumModerator)
    const target = topic ? { forumTopic: topic.id } : { forumTag: tag?.id as number }

    return (
        <li className="flex items-center gap-3 py-2 border-b border-primary last:border-b-0">
            <span className="size-7 rounded bg-accent flex items-center justify-center text-secondary">
                {topic ? <TopicIcon icon={icon} /> : <IconBell className="size-4" />}
            </span>
            <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">{label}</div>
                <div className="text-xs text-muted">{topic ? 'Topic' : 'Tag · in every topic'}</div>
            </div>
            <div className="w-40">
                <DialogSelect
                    options={modes.map((mode) => ({ label: mode.label, value: mode.value }))}
                    value={subscription.deliveryMode}
                    onChange={(mode) => subscribe(target, mode)}
                />
            </div>
            <OSButton
                size="sm"
                icon={<IconX />}
                aria-label={`Unsubscribe from ${label}`}
                onClick={() => unsubscribe(subscription.id)}
            />
        </li>
    )
}

export default function ManageSubscriptions({
    open,
    onOpenChange,
}: {
    open: boolean
    onOpenChange: (open: boolean) => void
}) {
    const { subscriptions } = useForumSubscriptions()
    const topicSubs = subscriptions.filter((sub) => sub.forumTopic)
    const tagSubs = subscriptions.filter((sub) => sub.forumTag)

    return (
        <Modal open={open} onOpenChange={onOpenChange} title="Manage subscriptions" maxWidth={560}>
            <div className="bg-primary text-primary p-4 space-y-3 text-sm max-h-[80vh] overflow-y-auto">
                {subscriptions.length === 0 ? (
                    <p className="m-0 text-secondary">You have no subscriptions yet.</p>
                ) : (
                    <>
                        {topicSubs.length > 0 && (
                            <section>
                                <h2 className="text-xs text-muted font-normal m-0">Topics</h2>
                                <ul className="list-none m-0 p-0">
                                    {topicSubs.map((sub) => (
                                        <Row key={sub.id} subscription={sub} />
                                    ))}
                                </ul>
                            </section>
                        )}
                        {tagSubs.length > 0 && (
                            <section>
                                <h2 className="text-xs text-muted font-normal m-0">Tags</h2>
                                <ul className="list-none m-0 p-0">
                                    {tagSubs.map((sub) => (
                                        <Row key={sub.id} subscription={sub} />
                                    ))}
                                </ul>
                            </section>
                        )}
                    </>
                )}
                <p className="m-0 text-secondary">
                    To add a subscription, use <strong className="text-primary">Subscribe</strong> in a topic header, or
                    the bell next to a tag in <strong className="text-primary">Filter</strong>. Reply emails for one
                    post are set on that post.
                </p>
                <div className="flex justify-end">
                    <OSButton size="md" variant="primary" onClick={() => onOpenChange(false)}>
                        Done
                    </OSButton>
                </div>
            </div>
        </Modal>
    )
}
