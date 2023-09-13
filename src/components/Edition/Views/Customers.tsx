import React, { useContext, useEffect } from 'react'
import { PostsContext } from '../Posts'
import FeaturedPost from '../FeaturedPost'
import Breadcrumb from '../Breadcrumb'
import dayjs from 'dayjs'
import { useInView } from 'react-intersection-observer'
import Link from 'components/Link'
import { Skeleton } from '../PostCard'

const Row = ({ title, featuredImage, date, excerpt, slug, fetchMore }) => {
    const postDate = dayjs(date).format('MMM D, YYYY')
    const imageURL = `https://posthog.com${featuredImage?.url}`

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
                    <img className="w-full h-full object-cover" src={imageURL} />
                </div>
                <p className="m-0 text-sm mt-2">{postDate}</p>
                <h3 className="my-1 text-xl leading-tight">{title}</h3>
            </Link>
        </div>
    )
}

export default function Customers() {
    const { posts, isLoading, isValidating, fetchMore } = useContext(PostsContext)
    const [featuredPost, ...rest] = posts

    return (
        <div className="mx-auto max-w-screen-xl">
            <Breadcrumb title="Customer stories" />
            <FeaturedPost {...featuredPost?.attributes} />
            <ul className="list-none m-0 p-0 grid sm:grid-cols-2 md:grid-cols-3 gap-2 mt-12">
                {isLoading
                    ? Array.from(Array(9)).map((_, i) => <Skeleton key={i} />)
                    : rest.map(({ id, attributes }, index) => {
                          return (
                              <li key={id}>
                                  <Row fetchMore={rest.length === index + 1 && fetchMore} {...attributes} />
                              </li>
                          )
                      })}
                {isValidating && <Skeleton />}
            </ul>
        </div>
    )
}
