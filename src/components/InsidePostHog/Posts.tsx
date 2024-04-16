import { CallToAction } from 'components/CallToAction'
import { usePosts } from 'components/Edition/hooks/usePosts'
import Link from 'components/Link'
import React from 'react'

const PostPreviewSkeleton = () => {
    return <div className="w-full h-28 animate-pulse bg-accent dark:bg-accent-dark rounded-md" />
}

const FeaturedPostSkeleton = () => {
    return <div className="w-full h-96 animate-pulse bg-accent dark:bg-accent-dark rounded-md" />
}

const FeaturedPost = ({ attributes: { featuredImage, title, excerpt, post_category, slug } }) => {
    return (
        <Link className="text-inherit hover:text-inherit font-normal" to={slug}>
            <img className="w-full" src={featuredImage?.url} />
            <p className="text-sm opacity-60 mt-3 mb-1">{post_category?.data?.attributes?.label}</p>
            <h2 className="mb-2">{title}</h2>
            <p>{excerpt}</p>
        </Link>
    )
}

const PostPreview = ({ attributes: { featuredImage, title, excerpt, post_category, slug } }) => {
    return (
        <Link
            to={slug}
            className="text-inherit hover:text-inherit font-normal grid @xl:grid-cols-2 xl:grid-cols-[1fr_35%] 2xl:grid-cols-[1fr_40%] gap-4 items-center transition-all"
        >
            <div className="@xl:order-2">
                <img className="w-full" src={featuredImage?.url} />
            </div>
            <div className="@xl:order-1">
                <p className="text-sm opacity-75 m-0">{post_category?.data?.attributes?.label}</p>
                <h3 className="text-[17px] xl:text-xl 2xl:text-2xl mb-2">{title}</h3>
                <p>{excerpt}</p>
            </div>
        </Link>
    )
}

export default function Posts() {
    const { posts, isLoading } = usePosts({
        params: {
            filters: {
                $and: [
                    {
                        featuredImage: {
                            url: {
                                $notNull: true,
                            },
                        },
                    },
                    {
                        featuredImage: {
                            image: {
                                id: {
                                    $notNull: true,
                                },
                            },
                        },
                    },
                    {
                        post_category: {
                            id: {
                                $notNull: true,
                            },
                        },
                    },
                ],
            },
        },
    })

    return (
        <div className="space-y-4">
            {isLoading ? <FeaturedPostSkeleton /> : <FeaturedPost {...posts?.[0]} />}

            {isLoading ? (
                <PostPreviewSkeleton />
            ) : (
                posts?.slice(1, 3).map((post, index) => {
                    return <PostPreview key={index} {...post} />
                })
            )}

            <div>
                <CallToAction href="/posts" type="secondary" size="sm" width="[calc(100%_+_3px)]">
                    More posts
                </CallToAction>
            </div>
        </div>
    )
}
