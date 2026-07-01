import React from 'react'
import dayjs from 'dayjs'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import ImagePlaceholder from './ImagePlaceholder'

const HeroSkeleton = () => (
    <section className="@container">
        <div className="grid @2xl:grid-cols-2 gap-6 @2xl:gap-8 items-center rounded-md border border-primary p-5 bg-accent">
            <div className="w-full aspect-video rounded-md bg-primary/40 animate-pulse" />
            <div className="space-y-3">
                <div className="h-5 w-1/4 bg-primary/40 rounded-md animate-pulse" />
                <div className="h-7 w-3/4 bg-primary/40 rounded-md animate-pulse" />
                <div className="h-5 w-full bg-primary/40 rounded-md animate-pulse" />
                <div className="h-5 w-2/3 bg-primary/40 rounded-md animate-pulse" />
            </div>
        </div>
    </section>
)

/**
 * The large featured/hero slot. Self-contained (mirrors `components/Edition/FeaturedPost` but
 * uses `@container` so it stacks based on its column width, not the viewport) and crops the
 * image to a standard 16:9 so it never looks squished. Falls back to a placeholder when the
 * post has no featured image.
 *
 * `titleClassName` lets the caller tune the article-title size relative to the page title
 * (e.g. the sidebar layout keeps "Founder's hub" larger than the article name).
 */
export default function Hero({
    post,
    isLoading,
    titleClassName = 'text-xl @2xl:text-2xl @5xl:text-3xl',
}: {
    post: any | undefined
    isLoading?: boolean
    titleClassName?: string
}) {
    if (isLoading || !post) {
        return <HeroSkeleton />
    }

    const { title, date, publishedAt, authors, featuredImage, slug, excerpt } = post.attributes
    const postDate = dayjs(date || publishedAt).format('MMM D, YYYY')
    const imageURL = featuredImage?.image?.data?.attributes?.url || featuredImage?.url

    return (
        <section className="@container">
            <div className="grid @2xl:grid-cols-2 gap-6 @2xl:gap-8 items-center rounded-md border border-primary p-5 bg-accent">
                <Link
                    to={slug}
                    className="w-full aspect-video rounded-md overflow-hidden bg-accent block relative"
                    aria-label={title}
                >
                    {imageURL ? (
                        <img className="w-full h-full object-cover" src={imageURL} alt={title} />
                    ) : (
                        <ImagePlaceholder />
                    )}
                </Link>
                <div>
                    <p className="m-0 text-[15px] opacity-75">{postDate}</p>
                    <h2 className={`mt-2 mb-3 leading-tight ${titleClassName}`}>
                        <Link to={slug} className="text-primary hover:text-primary">
                            {title}
                        </Link>
                    </h2>
                    {authors?.data?.length > 0 && (
                        <ul className="list-none m-0 p-0 flex flex-wrap gap-x-3 gap-y-1 items-center">
                            {authors.data.map(({ id, attributes: { firstName, lastName, avatar } }: any) => {
                                const image = avatar?.data?.attributes?.url
                                const name = [firstName, lastName].filter(Boolean).join(' ')
                                return (
                                    <li className="font-semibold flex space-x-2 items-center text-[15px]" key={id}>
                                        {image && <img className="w-[25px] rounded-full" src={image} alt={name} />}
                                        <span>{name}</span>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                    {excerpt && <p className="my-4 text-[15px] line-clamp-3">{excerpt}</p>}
                    <CallToAction size="md" type="secondary" to={slug}>
                        Continue reading
                    </CallToAction>
                </div>
            </div>
        </section>
    )
}
