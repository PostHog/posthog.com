import ClientPost from 'components/Edition/ClientPost'
import { useLayoutData } from 'components/Layout/hooks'
import qs from 'qs'
import React, { useEffect, useState } from 'react'

const Skeleton = () => {
    const { fullWidthContent } = useLayoutData()
    return (
        <div className={`article-content flex-1 transition-all md:pt-8 w-full overflow-auto`}>
            <div
                className={`mx-auto transition-all ${fullWidthContent ? 'max-w-full' : 'max-w-3xl'}  md:px-8 2xl:px-12`}
            >
                <div>
                    <div className="bg-accent dark:bg-accent-dark h-[37px] w-2/3 rounded-md" />
                    <div className="bg-accent dark:bg-accent-dark h-[27px] w-1/3 rounded-md mt-2" />
                    <div className="bg-accent dark:bg-accent-dark aspect-video w-full rounded-md mt-2" />
                </div>
            </div>
        </div>
    )
}

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
