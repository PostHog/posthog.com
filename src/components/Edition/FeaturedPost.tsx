import { CallToAction } from 'components/CallToAction'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import { PostsContext } from './Posts'
import Link from 'components/Link'

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

export default function FeaturedPost({
    title,
    date,
    authors,
    featuredImage,
    slug,
    excerpt,
    publishedAt,
    isLoading: isLoadingProp,
    containerStack = false,
    titleClassName,
}) {
    const ctx = useContext(PostsContext)
    // Callers outside the Edition provider tree (e.g. the founders landing) pass `isLoading` in.
    const isLoading = isLoadingProp ?? ctx?.isLoading
    const postDate = dayjs(date || publishedAt).format('MMM D, YYYY')
    const imageURL = featuredImage?.image?.data?.attributes?.url || featuredImage?.url

    // containerStack stacks on the container instead of the viewport, and only splits into
    // columns at @3xl, so a resizable window column never leaves a gap beside the image.
    const sectionClasses = containerStack
        ? 'grid @3xl:grid-cols-2 gap-6 @3xl:gap-8 items-center rounded-md border border-input p-5 bg-accent'
        : 'grid md:grid-cols-2 gap-6 md:gap-8 items-center rounded-md border border-input p-5 md:mx-4 bg-accent'
    const imageWrapperClasses = containerStack
        ? 'w-full aspect-video rounded-md overflow-hidden'
        : 'w-full aspect-[600/315] rounded-md overflow-hidden'

    const section = (
        <section className={sectionClasses}>
            {isLoading ? (
                <Skeleton />
            ) : (
                <>
                    <div className={imageWrapperClasses}>
                        <Link to={slug}>
                            <img className="w-full h-full object-cover" src={imageURL || '/images/og/default.png'} />
                        </Link>
                    </div>
                    <div>
                        <p className="m-0 text-[15px] opacity-75">{postDate}</p>
                        <h2 className={`mt-2 mb-3 ${titleClassName || 'text-3xl lg:text-4xl'}`}>
                            <Link
                                to={slug}
                                className="text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark"
                            >
                                {title}
                            </Link>
                        </h2>
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

    return containerStack ? <div className="@container">{section}</div> : section
}
