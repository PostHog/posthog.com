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
    return []
}
