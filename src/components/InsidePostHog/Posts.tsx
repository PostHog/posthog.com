import { CallToAction } from 'components/CallToAction'
import { usePosts } from 'components/Edition/hooks/usePosts'
import { tagsHideFromIndex } from 'components/Edition/Posts'
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
        <Link className="text-red dark:text-yellow hover:text-red hover:dark:text-yellow font-normal" to={slug}>
            <img className="w-full" src={featuredImage?.url} />
            <p className="text-primary dark:text-primary-dark text-sm opacity-60 dark:opacity-50 mt-3 mb-1">
                {post_category?.data?.attributes?.label}
            </p>
            <h2 className="mb-2">{title}</h2>
            <p className="text-primary dark:text-primary-dark">{excerpt}</p>
        </Link>
    )
}

const PostPreview = ({ attributes: { featuredImage, title, excerpt, post_category, slug } }) => {
    return (
        <Link
            to={slug}
            className="@container font-normal grid @lg:grid-cols-[1fr_35%] @xl:grid-cols-[1fr_40%] gap-2 @lg:gap-4 items-center transition-all textred dark:text-yellow hover:text-red hover:dark:text-yellow"
        >
            <div className="@lg:order-2">
                <img className="w-full" src={featuredImage?.url} />
            </div>
            <div className="@lg:order-1">
                <p className="text-primary dark:text-primary-dark text-sm opacity-75 dark:opacity-60 m-0">
                    {post_category?.data?.attributes?.label}
                </p>
                <h3 className="text-lg @lg:text-xl @xl:text-xl mb-2 leading-tight">{title}</h3>
                <p className="hidden @2xl:block text-primary dark:text-primary-dark text-sm">{excerpt}</p>
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
                            label: {
                                $notIn: ['Changelog', 'Customers', 'Tutorials'],
                            },
                        },
                    },
                    {
                        $or: [
                            {
                                post_tags: {
                                    label: {
                                        $notIn: tagsHideFromIndex,
                                    },
                                },
                            },
                            {
                                post_tags: {
                                    label: {
                                        $null: true,
                                    },
                                },
                            },
                        ],
                    },
                    {
                        $or: [
                            {
                                hideFromIndex: {
                                    $eq: false,
                                },
                            },
                            {
                                hideFromIndex: {
                                    $null: true,
                                },
                            },
                        ],
                    },
                ],
            },
        },
    })

    return (
        <div className="@container space-y-8 @lg:space-y-4">
            {isLoading ? <FeaturedPostSkeleton /> : <FeaturedPost {...posts?.[0]} />}

            {isLoading ? (
                <PostPreviewSkeleton />
            ) : (
                posts?.slice(1, 3).map((post, index) => {
                    return <PostPreview key={index} {...post} />
                })
            )}

            <div>
                <CallToAction href="/posts" type="secondary" size="md" width="[calc(100%_+_3px)]">
                    More posts
                </CallToAction>
            </div>
        </div>
    )
}
