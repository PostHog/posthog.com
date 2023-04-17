import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { IMenu } from 'components/PostLayout/types'

type TopicMenuData = {
    squeakTopicGroups: {
        nodes: {
            label: string
            topics: {
                id: string
                label: string
                slug: string
            }[]
        }[]
    }
}

export const useTopicMenu = (): IMenu[] => {
    const data: TopicMenuData = useStaticQuery(graphql`
        query SqueakTopicMenu {
            squeakTopicGroups: allSqueakTopicGroup {
                nodes {
                    label
                    topics {
                        id
                        label
                        slug
                    }
                }
            }
        }
    `)

    const menu = React.useMemo<IMenu[]>(() => {
        return data.squeakTopicGroups.nodes.flatMap((group) => {
            return [
                { name: group.label },
                ...group.topics.map((topic) => {
                    return {
                        name: topic.label,
                        url: `/questions/topic/${topic.slug}`,
                    }
                }),
            ]
        })
    }, [data])

    return menu
}
