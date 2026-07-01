import { useEffect, useState } from 'react'
import qs from 'qs'

export interface CategoryTag {
    attributes: {
        label: string
    }
}

/**
 * Fetches the post-tags for a folder from the Squeak/Strapi API. Shared by `CategoryGrid`
 * (tile/row rendering) and `useCategoryMenu` (handbook-style TreeMenu items).
 */
export function useCategoryTags(folder: string): { tags: CategoryTag[]; loading: boolean } {
    const [tags, setTags] = useState<CategoryTag[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const query = qs.stringify(
            {
                pagination: { pageSize: 100 },
                sort: ['label:asc'],
                filters: {
                    post_category: {
                        folder: {
                            $eq: folder,
                        },
                    },
                },
            },
            { encodeValuesOnly: true }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/post-tags?${query}`)
            .then((response) => response.json())
            .then((data) => {
                setTags(data.data || [])
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [folder])

    return { tags, loading }
}
