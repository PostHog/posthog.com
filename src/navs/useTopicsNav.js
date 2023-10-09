import { topicIcons } from 'components/Questions/TopicsTable'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

const navSorted = ['Products', 'Product OS', 'Data', 'Self-hosting', 'Other']

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

    const nav = [{ name: 'Latest', url: '/questions', icon: 'Clock' }]
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

    return nav
}
