import { topicIcons } from 'components/Questions/TopicsTable'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useUser, User } from 'hooks/useUser'
import { IconSparkles } from '@posthog/icons'

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

    const { user, getJwt, logout, isModerator } = useUser()
    const isLoggedIn = !!user

    const nav = [
        { name: 'Topics' },
        { name: 'Latest', url: '/questions', icon: 'IconClock' },
        ...(isLoggedIn ? [{ name: 'My discussions', url: '/community/dashboard', icon: 'IconNotification' }] : []),
    ]
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
