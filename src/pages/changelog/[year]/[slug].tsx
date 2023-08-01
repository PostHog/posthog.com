import Markdown from 'components/Squeak/components/Markdown'
import { ZoomImage } from 'components/ZoomImage'
import qs from 'qs'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { Skeleton } from 'components/Questions/QuestionsTable'
import SEO from 'components/seo'

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

    const { title, featuredImage, body, date } = post || {}

    return post ? (
        <>
            <SEO title={title + ' - PostHog'} />
            {featuredImage?.url && (
                <div className="max-w-lg">
                    <ZoomImage>
                        {featuredImage?.url?.endsWith('.mp4') ? (
                            <video className="w-full rounded-md" autoPlay src={featuredImage?.url} />
                        ) : (
                            <img className="w-full rounded-md" src={featuredImage?.url} />
                        )}
                    </ZoomImage>
                </div>
            )}
            <div className={`flex flex-col py-4`}>
                <p className="m-0 opacity-70 order-last lg:order-first lg:text-white">
                    {dayjs(date).format('MMM DD, YYYY')}
                </p>
                <h1 className={`text-3xl md:text-4xl lg:text-4xl mb-1 mt-6 lg:mt-1`}>{title}</h1>
            </div>
            <div className="mt-2 article-content">
                <Markdown>{body}</Markdown>
            </div>
        </>
    ) : (
        <Skeleton />
    )
}
