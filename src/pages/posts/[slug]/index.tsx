import ClientPost from 'components/Edition/ClientPost'
import { Skeleton } from 'components/Questions/QuestionsTable'
import qs from 'qs'
import React, { useEffect, useState } from 'react'

export default function Post({ params }) {
    const [post, setPost] = useState(null)

    const getPost = () => {
        const slug = `/posts/${params.slug}`
        const query = qs.stringify(
            {
                filters: {
                    slug: {
                        $eq: slug,
                    },
                },
                populate: [
                    'featuredImage.image',
                    'post_category.post_tags',
                    'post_tags',
                    'authors.avatar',
                    'likes',
                    'CTA',
                ],
            },
            {
                encodeValuesOnly: true,
            }
        )
        return fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${query}`)
            .then((res) => res.json())
            .then((post) => setPost(post?.data?.[0]))
    }

    useEffect(() => {
        getPost()
    }, [params])

    return post ? <ClientPost {...post.attributes} id={post.id} getPost={getPost} /> : <Skeleton />
}
