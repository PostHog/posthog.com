import { CallToAction } from 'components/CallToAction'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import { PostsContext } from './Posts'

const Skeleton = () => {
    return (
        <>
            <div className="aspect-video rounded-md bg-light dark:bg-dark w-full animate-pulse" />
            <div>
                <div className="h-[20px] bg-light dark:bg-dark w-1/5 mt-2 rounded-md animate-pulse" />
                <div className="h-[20px] bg-light dark:bg-dark w-3/5 mt-2 rounded-md animate-pulse" />
                <div className="h-[20px] bg-light dark:bg-dark w-full mt-2 rounded-md animate-pulse" />
                <div className="h-[20px] bg-light dark:bg-dark w-full mt-2 rounded-md animate-pulse" />
                <div className="h-[20px] bg-light dark:bg-dark w-4/5 mt-2 rounded-md animate-pulse" />
            </div>
        </>
    )
}

export default function FeaturedPost({ title, date, authors, featuredImage, slug, excerpt }) {
    const { isLoading } = useContext(PostsContext)
    const postDate = dayjs(date).format('MMM D, YYYY')
    const imageURL = featuredImage?.image?.data?.attributes?.url || `https://posthog.com${featuredImage?.url}`
    return (
        <section className="grid md:grid-cols-2 gap-6 md:gap-8 items-center rounded-md border border-border dark:border-dark p-5 bg-accent dark:bg-accent-dark">
            {isLoading ? (
                <Skeleton />
            ) : (
                <>
                    <div className="w-full aspect-video rounded-md overflow-hidden">
                        <img className="w-full h-full object-cover" src={imageURL} />
                    </div>
                    <div>
                        <p className="m-0 text-[15px] opacity-75">{postDate}</p>
                        <h2 className="mt-2 mb-3 text-3xl lg:text-4xl">{title}</h2>
                        {authors?.data?.length > 0 && (
                            <ul className="list-none m-0 p-0 flex space-x-2 items-center">
                                {authors.data.map(({ id, attributes: { firstName, lastName, avatar } }) => {
                                    const image = avatar?.data?.attributes?.url
                                    const name = [firstName, lastName].filter(Boolean).join(' ')
                                    return (
                                        <li className="font-semibold flex space-x-2 items-center" key={id}>
                                            {image && (
                                                <span>
                                                    <img className="w-[25px] rounded-full" src={image} />
                                                </span>
                                            )}
                                            <span>{name}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                        {excerpt && <p className="my-4">{excerpt}</p>}
                        <CallToAction size="md" type="secondary" to={slug}>
                            Continue reading
                        </CallToAction>
                    </div>
                </>
            )}
        </section>
    )
}
