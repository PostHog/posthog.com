import { topicIcons } from 'components/Questions/TopicsTable'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useUser } from 'hooks/useUser'
import { IconSparkles, IconClock } from '@posthog/icons'

const navSorted = ['Products', 'Data', 'Product OS', 'Self-hosting', 'Off-topic', 'Other']

export default function useTopicsNav() {
    const { topicGroups } = useStaticQuery(graphql`
        {
            topicGroups: allSqueakTopicGroup {
                nodes {
                    label
                    slug
                    topics {
                        label
                        slug
                    }
                }
            }
        }
    `)

    const { isModerator } = useUser()

    const nav = [{ name: 'Latest', url: '/questions', icon: <IconClock /> }]
    topicGroups.nodes
        .sort((a, b) => navSorted.indexOf(a.label) - navSorted.indexOf(b.label))
        .forEach(({ label, topics }) => {
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
        nav.push({ name: 'Max AI', url: '/questions/topic/max', icon: <IconSparkles /> })
    }

    return nav
}
