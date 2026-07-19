import { topicIcons } from 'components/Questions/TopicsTable'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import { useUser } from 'hooks/useUser'
import { IconSparkles, IconClock } from '@posthog/icons'

const navSorted = ['Off-topic', 'Products', 'Data', 'Product OS', 'Self-hosting', 'Other']

// The community boards (#introductions, #where-in-the-world, #devrel) live in the
// Strapi group labelled "Off-topic". Lead with it and surface it as "Community"
// in the nav, without renaming the CMS group. Sorting still keys off the raw label.
const groupLabelOverrides = { 'Off-topic': 'Community' }

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
                name: groupLabelOverrides[label] ?? label,
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
