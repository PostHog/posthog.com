import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconChevronRight } from '@posthog/icons'
import { navigate } from 'gatsby'
import OSButton from 'components/OSButton'
import usePostHog from 'hooks/usePostHog'
import { useUser } from 'hooks/useUser'
import { useForumProgress, useForumTopics } from './hooks'

type Task = {
    key: 'introduced' | 'replied' | 'shared' | 'subscribed'
    title: string
    description: string
    topic: string
    // New post: open the composer in the topic. Otherwise open the topic's feed.
    newPost?: boolean
}

const tasks: Task[] = [
    {
        key: 'introduced',
        title: 'Introduce yourself',
        description: 'Say hello, and tell us what you are building.',
        topic: 'introductions',
        newPost: true,
    },
    {
        key: 'replied',
        title: 'Add your two cents',
        description: 'Find a post that interests you and reply to it.',
        topic: 'thinking-out-loud',
    },
    {
        key: 'shared',
        title: 'Share what you are learning',
        description: 'Tell us about something that you shipped, and what you learned.',
        topic: 'shipped-and-learned',
        newPost: true,
    },
    {
        key: 'subscribed',
        title: 'Subscribe to a topic',
        description: "Press the bell beside a topic's name to get a daily digest of its new posts.",
        topic: 'introductions',
    },
]

// A checklist for signed-in members at the top of All posts. A task disappears when the member does it, and the
// checklist disappears when all tasks are done.
export default function GettingStarted() {
    const { user } = useUser()
    const posthog = usePostHog()
    const { progress, isLoading } = useForumProgress()
    const { getTopic } = useForumTopics()
    const remaining = progress ? tasks.filter((task) => !progress[task.key] && getTopic(task.topic)) : []

    const open = (task: Task) => {
        const topic = getTopic(task.topic)
        if (!topic) return
        posthog?.capture('forum getting started task clicked', { task: task.key })
        if (task.newPost) navigate('/forum/new', { state: { topicId: topic.id } })
        else navigate(`/forum/t/${topic.attributes.slug}`)
    }

    if (!user || isLoading || remaining.length === 0) return null

    return (
        <section className="mx-4 @xl:mx-5 mt-4 border border-primary rounded-md bg-accent">
            <header className="px-2 pt-3 pb-2">
                <h2 className="text-base font-bold text-primary m-0">Get started in the forum</h2>
                <p className="text-sm text-secondary m-0">
                    {tasks.length - remaining.length} of {tasks.length} done
                </p>
            </header>
            <ul className="list-none m-0 p-0">
                <AnimatePresence initial={false}>
                    {remaining.map((task) => (
                        <motion.li
                            key={task.key}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-t border-primary overflow-hidden"
                        >
                            <OSButton
                                width="full"
                                align="left"
                                size="md"
                                icon={<IconChevronRight />}
                                iconPosition="right"
                                onClick={() => open(task)}
                                className="!rounded-none"
                            >
                                <span className="flex-1 min-w-0 text-left">
                                    <span className="block font-semibold text-primary">{task.title}</span>
                                    <span className="block text-sm text-secondary font-normal">{task.description}</span>
                                </span>
                            </OSButton>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ul>
        </section>
    )
}
