import qs from 'qs'
import React, { useEffect, useState } from 'react'
import { Skeleton } from 'components/Questions/QuestionsTable'
import ClientPost from 'components/Edition/ClientPost'

export default function RoadmapItem({ params }) {
    const [post, setPost] = useState(null)
    useEffect(() => {
        const slug = `/changelog/${params.year}/${params.slug}`
        const query = qs.stringify(
            {
                filters: {
                    slug: {
                        $eq: slug,
                    },
                },
                populate: '*',
            },
            {
                encodeValuesOnly: true,
            }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${query}`)
            .then((res) => res.json())
            .then((post) => setPost(post?.data?.[0]?.attributes))
    }, [params])

    return post ? <ClientPost {...post} /> : <Skeleton />
}
