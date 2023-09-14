import Link from 'components/Link'
import dayjs from 'dayjs'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

export const Skeleton = () => {
    return (
        <div className="p-3 border border-transparent">
            <div className="aspect-video rounded-md bg-accent dark:bg-accent-dark w-full animate-pulse" />
            <div className="h-[20px] bg-accent dark:bg-accent-dark w-1/3 mt-2 rounded-md animate-pulse" />
            <div className="h-[20px] bg-accent dark:bg-accent-dark w-3/5 mt-2 rounded-md animate-pulse" />
            <div className="h-[20px] bg-accent dark:bg-accent-dark w-full mt-2 rounded-md animate-pulse" />
            <div className="h-[20px] bg-accent dark:bg-accent-dark w-full mt-2 rounded-md animate-pulse" />
            <div className="h-[20px] bg-accent dark:bg-accent-dark w-4/5 mt-2 rounded-md animate-pulse" />
        </div>
    )
}

export default function PostCard({ title, featuredImage, date, excerpt, slug, fetchMore }) {
    const postDate = dayjs(date).format('MMM D, YYYY')
    const imageURL = featuredImage?.url && `https://posthog.com${featuredImage?.url}`

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
        <div ref={fetchMore ? ref : null}>
            <Link
                className="!text-inherit p-3 border border-transparent hover:border-border dark:hover:border-dark rounded-md hover:bg-accent dark:hover:bg-accent-dark transition-colors block h-full relative active:top-[1px] active:scale-[.99]"
                to={slug}
            >
                <div className="w-full aspect-video rounded-md overflow-hidden">
                    <img className="w-full h-full object-cover" src={imageURL || '/banner.png'} />
                </div>
                <p className="m-0 text-sm mt-2">{postDate}</p>
                <h3 className="my-1 text-xl leading-tight">{title}</h3>
                {excerpt && <p className="m-0 text-sm">{excerpt}</p>}
            </Link>
        </div>
    )
}
