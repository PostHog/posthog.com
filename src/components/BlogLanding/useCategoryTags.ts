import { useEffect, useState } from 'react'
import qs from 'qs'

export interface CategoryTag {
    attributes: {
        label: string
    }
}

/** Fetches a folder's post-tags. Shared by `CategoryGrid` and `useCategoryMenu`. */
export function useCategoryTags(folder: string): { tags: CategoryTag[]; loading: boolean } {
    const [tags, setTags] = useState<CategoryTag[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false
        setLoading(true)
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
                if (cancelled) return
                setTags(data.data || [])
                setLoading(false)
            })
            .catch(() => !cancelled && setLoading(false))
        return () => {
            cancelled = true
        }
    }, [folder])

    return { tags, loading }
}
