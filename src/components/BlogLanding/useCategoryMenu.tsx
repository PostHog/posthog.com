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

// Strapi caps pageSize at 100, so fetch every page and concatenate.
const fetchAllPosts = async (folder: string): Promise<PostNode[]> => {
    const { filters } = getParams(folder, undefined, ['date:desc'])
    const buildQuery = (page: number) =>
        qs.stringify(
            {
                fields: ['title', 'slug'],
                populate: ['post_tags'],
                sort: 'date:desc',
                pagination: { page, pageSize: 100 },
                filters,
            },
            { encodeValuesOnly: true }
        )
    const first = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${buildQuery(1)}`).then((r) => r.json())
    const pageCount = first?.meta?.pagination?.pageCount || 1
    const rest = await Promise.all(
        Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) =>
            fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${buildQuery(i + 2)}`).then((r) => r.json())
        )
    )
    return [first, ...rest].flatMap((d) => d?.data || [])
}

/**
 * Builds a handbook-style nested `TreeMenu` tree for a folder: each category is a collapsible
 * parent with its articles listed as children. Sourced from the same tag API as `CategoryGrid`
 * plus a fetch of every post in the folder (grouped by tag). Categories with no articles are
 * omitted — otherwise `TreeMenu` renders them as a childless link that navigates away when
 * clicked (breaking the expand-in-place UX). Returns `loading` so the caller can mount
 * `TreeMenu` only once the data is present (it memoizes its items on first render).
 */
export function useCategoryMenu(folder: string): { items: CategoryMenuItem[]; loading: boolean } {
    const { tags, loading: tagsLoading } = useCategoryTags(folder)
    const [posts, setPosts] = useState<PostNode[]>([])
    const [postsLoading, setPostsLoading] = useState(true)

    useEffect(() => {
        let cancelled = false
        setPostsLoading(true)
        fetchAllPosts(folder)
            .then((all) => {
                if (cancelled) return
                setPosts(all)
                setPostsLoading(false)
            })
            .catch(() => !cancelled && setPostsLoading(false))
        return () => {
            cancelled = true
        }
    }, [folder])

    const items = tags
        .map((tag) => {
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
                children,
            }
        })
        // Hide categories with no articles (e.g. duplicate/empty tags like "Finance & ops").
        .filter((item) => item.children.length > 0)

    return { items, loading: tagsLoading || postsLoading }
}
