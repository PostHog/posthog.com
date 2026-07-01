import React, { useEffect, useState } from 'react'
import qs from 'qs'
import slugify from 'slugify'
import * as Icons from '@posthog/icons'
import { getParams } from 'components/Edition/Posts'
import { tagOptions } from './CategoryGrid'
import { useCategoryTags } from './useCategoryTags'

export interface CategoryMenuItem {
    name: string
    url: string
    icon?: React.ReactNode
    children?: { name: string; url: string }[]
}

interface PostNode {
    attributes: {
        title: string
        slug: string
        post_tags?: { data?: { attributes: { label: string } }[] }
    }
}

/**
 * Builds a handbook-style nested `TreeMenu` tree for a folder: each category is a collapsible
 * parent (linking to `/${folder}/${slug}`) with its articles listed as children. Sourced from
 * the same tag API as `CategoryGrid` plus a one-shot fetch of the folder's posts (grouped by
 * tag). Returns `loading` so the caller can key/remount `TreeMenu` once data arrives (TreeMenu
 * memoizes its items on first render, so it must mount with the data already present).
 */
export function useCategoryMenu(folder: string): { items: CategoryMenuItem[]; loading: boolean } {
    const { tags, loading: tagsLoading } = useCategoryTags(folder)
    const [posts, setPosts] = useState<PostNode[]>([])
    const [postsLoading, setPostsLoading] = useState(true)

    useEffect(() => {
        const { filters } = getParams(folder, undefined, ['date:desc'])
        const query = qs.stringify(
            {
                fields: ['title', 'slug'],
                populate: ['post_tags'],
                sort: 'date:desc',
                pagination: { pageSize: 100 },
                filters,
            },
            { encodeValuesOnly: true }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${query}`)
            .then((response) => response.json())
            .then((data) => {
                setPosts(data.data || [])
                setPostsLoading(false)
            })
            .catch(() => setPostsLoading(false))
    }, [folder])

    const items = tags.map((tag) => {
        const label = tag.attributes.label
        const iconName = tagOptions[label as keyof typeof tagOptions]?.icon || 'IconApps'
        const Icon = Icons[iconName as keyof typeof Icons] as any

        const children = posts
            .filter((post) => post.attributes.post_tags?.data?.some((t) => t.attributes.label === label))
            .map((post) => ({ name: post.attributes.title, url: post.attributes.slug }))

        return {
            name: label,
            url: `/${folder}/${slugify(label, { lower: true, strict: true })}`,
            icon: <Icon className="size-4 opacity-60" />,
            ...(children.length > 0 ? { children } : {}),
        }
    })

    return { items, loading: tagsLoading || postsLoading }
}
