import { topicIcons } from 'components/Questions/TopicsTable'
import React from 'react'
import { useUser } from 'hooks/useUser'
import { IconSparkles, IconClock } from '@posthog/icons'
import topicGroups from '@data/roadmap-topic-groups.json'

const navSorted = ['Builder-lounge', 'Products', 'Data', 'Product OS', 'Self-hosting', 'Other']
const sortedTopicGroups = [...topicGroups].sort((a, b) => navSorted.indexOf(a.label) - navSorted.indexOf(b.label))

export default function useTopicsNav() {
    const { isModerator } = useUser()

    const nav = [{ name: 'Latest', url: '/questions', icon: <IconClock /> }]
    sortedTopicGroups.forEach(({ label, topics }) => {
        nav.push({
            name: label,
        })
        topics.forEach(({ label, slug }) => {
            const Icon = topicIcons[label.toLowerCase()]
            nav.push({
                name: label,
                url: `/questions/topic/${slug}`,
                icon: Icon && <Icon />,
            })
        })
    })

    if (isModerator) {
        nav.push({ name: 'PostHog AI', url: '/questions/topic/ai', icon: <IconSparkles /> })
    }

    return nav
}
