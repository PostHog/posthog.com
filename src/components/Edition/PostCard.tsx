import Link from 'components/Link'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const Skeleton = () => {
    return (
        <div className="p-3 border border-transparent">
            <div className="aspect-video rounded-md bg-accent w-full animate-pulse" />
            <div className="h-[20px] bg-accent w-1/3 mt-2 rounded-md animate-pulse" />
            <div className="h-[20px] bg-accent w-3/5 mt-2 rounded-md animate-pulse" />
            <div className="h-[20px] bg-accent w-full mt-2 rounded-md animate-pulse" />
            <div className="h-[20px] bg-accent w-full mt-2 rounded-md animate-pulse" />
            <div className="h-[20px] bg-accent w-4/5 mt-2 rounded-md animate-pulse" />
        </div>
    )
}

export default function PostCard({ title, featuredImage, date, excerpt, slug, fetchMore, publishedAt }) {
    const postDate = dayjs(date || publishedAt).format('MMM D, YYYY')
    const imageURL = featuredImage?.image?.data?.attributes?.url || featuredImage?.url

    const { ref, inView } = useInView({
        threshold: 0,
        triggerOnce: true,
    })

    useEffect(() => {
        if (inView) {
            fetchMore()
        }
    }, [inView])

    return (
        <div className="h-full" ref={fetchMore ? ref : null}>
            <Link
                className="!text-inherit py-2 md:p-3 font-normal border border-transparent hover:border-primary rounded-md hover:bg-accent hover:scale-[1.01] transition-colors block h-full relative active:top-[1px] active:scale-[.99]"
                to={slug}
            >
                <div className="w-full aspect-[600/315] rounded-md overflow-hidden bg-accent">
                    <img className="w-full h-full object-cover" src={imageURL || '/banner.png'} />
                </div>
                <p className="m-0 text-sm mt-3 opacity-75">{postDate}</p>
                <h3 className="my-1 text-xl leading-tight">{title}</h3>
                {excerpt && <p className="m-0 text-[15px] line-clamp-3">{excerpt}</p>}
            </Link>
        </div>
    )
}
