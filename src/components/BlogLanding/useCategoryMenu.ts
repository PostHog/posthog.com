import { useEffect, useMemo, useState } from 'react'
import qs from 'qs'
import slugify from 'slugify'
import { getParams } from 'components/Edition/Posts'
import { useCategoryTags } from './useCategoryTags'

export interface CategoryMenuItem {
    name: string
    url: string
    children?: { name: string; url: string }[]
}

interface PostNode {
    attributes: {
        title: string
        slug: string
        post_tags?: { data?: { attributes: { label: string } }[] }
    }
}

const PAGE_SIZE = 100

// Strapi caps pageSize at 100, so fetch every page and concatenate.
const fetchAllPosts = async (folder: string): Promise<PostNode[]> => {
    const { filters } = getParams(folder, undefined, ['date:desc'])
    const buildQuery = (page: number) =>
        qs.stringify(
            {
                fields: ['title', 'slug'],
                populate: ['post_tags'],
                sort: 'date:desc',
                pagination: { page, pageSize: PAGE_SIZE },
                filters,
            },
            { encodeValuesOnly: true }
        )
    const first = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${buildQuery(1)}`).then((r) => r.json())
    const pageCount = first?.meta?.pagination?.pageCount || 1
    // allSettled so a single flaky page doesn't drop every post, which would empty the whole nav.
    const rest = await Promise.allSettled(
        Array.from({ length: Math.max(0, pageCount - 1) }, (_, i) =>
            fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${buildQuery(i + 2)}`).then((r) => r.json())
        )
    )
    const restData = rest.flatMap((r) => (r.status === 'fulfilled' ? r.value?.data || [] : []))
    return [...(first?.data || []), ...restData]
}

/**
 * Builds a nested `TreeMenu` tree for a folder: each category is a collapsible parent with its
 * articles as children. Categories with no articles are omitted, otherwise `TreeMenu` renders
 * them as a childless link that navigates away instead of expanding in place.
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

    const items = useMemo(
        () =>
            tags
                .map((tag) => {
                    const label = tag.attributes.label

                    return {
                        name: label,
                        url: `/${folder}/${slugify(label, { lower: true, strict: true })}`,
                        children: posts
                            .filter((post) =>
                                post.attributes.post_tags?.data?.some((t) => t.attributes.label === label)
                            )
                            .map((post) => ({ name: post.attributes.title, url: post.attributes.slug })),
                    }
                })
                .filter((item) => item.children.length > 0),
        [tags, posts, folder]
    )

    return { items, loading: tagsLoading || postsLoading }
}
