import { usePosts } from 'components/Edition/hooks/usePosts'
import { getParams, Sidebar } from 'components/Edition/Posts'
import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'
import SEO from 'components/seo'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getSortOption } from './BlogPost'
import Link from 'components/Link'
import TeamMember from 'components/TeamMember'
import qs from 'qs'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import ProgressBar from 'components/ProgressBar'

dayjs.extend(relativeTime)

const categories = [
    {
        label: 'Tutorials',
        root: 'tutorials',
    },
    {
        label: 'Blog',
        root: 'blog',
    },
    {
        label: 'Founders',
        root: 'founders',
    },
    {
        label: 'Product engineers',
        root: 'product-engineers',
    },
    {
        label: 'Newsletter',
        root: 'newsletter',
    },
]

export const FeaturedImage = ({ url }: { url: string }) => {
    const [isSmallImageLoaded, setIsSmallImageLoaded] = useState(false)
    const [isLargeImageLoaded, setIsLargeImageLoaded] = useState(false)

    return (
        <Tooltip
            trigger={
                <div className="max-h-8 max-w-48">
                    <CloudinaryImage
                        src={url as `https://res.cloudinary.com/${string}`}
                        imgClassName={`max-h-8 max-w-48 ${!isSmallImageLoaded ? 'hidden' : ''}`}
                        width={200}
                        onLoad={() => setIsSmallImageLoaded(true)}
                    />
                </div>
            }
        >
            <div className="relative min-h-4 min-w-12 max-h-72 max-w-72 transition-all bg-accent">
                {!isLargeImageLoaded && (
                    <div className="flex items-center justify-center">
                        <div className="w-full">
                            <ProgressBar title="image" chrome={false} />
                        </div>
                    </div>
                )}
                <CloudinaryImage
                    src={url as `https://res.cloudinary.com/${string}`}
                    width={400}
                    onLoad={() => setIsLargeImageLoaded(true)}
                    className={!isLargeImageLoaded ? 'hidden' : ''}
                />
            </div>
        </Tooltip>
    )
}

export default function Posts({ pageContext }) {
    const [tags, setTags] = useState([])
    const [authors, setAuthors] = useState([])
    const [selectedTag, setSelectedTag] = useState(pageContext.selectedTag)
    const [root, setRoot] = useState(pageContext.root)
    const [selectedAuthor, setSelectedAuthor] = useState()
    const [params, setParams] = useState(
        getParams(pageContext.root, pageContext.selectedTag, getSortOption(pageContext.root).sort, selectedAuthor)
    )

    const { posts, isLoading, isValidating, fetchMore, mutate, hasMore } = usePosts({ params })

    const handleFilterChange = (filters) => {
        if (filters.post_tags) {
            setSelectedTag(filters.post_tags.value)
        }
        if (filters.root) {
            setRoot(filters.root.value)
        }
        if (filters.authors) {
            setSelectedAuthor(filters.authors.value)
        }
    }

    useEffect(() => {
        const query = qs.stringify({
            pagination: {
                page: 1,
                pageSize: 100,
            },
            filters: {
                post_category: {
                    folder: {
                        $eq: pageContext.root,
                    },
                },
            },
        })
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/post-tags?${query}`)
            .then((res) => res.json())
            .then((data) => {
                setTags(data?.data)
            })
    }, [root])

    useEffect(() => {
        const query = qs.stringify(
            {
                sort: ['firstName'],
                pagination: {
                    page: 1,
                    pageSize: 100,
                },
                filters: {
                    authorPosts: {
                        title: {
                            $notNull: true,
                        },
                    },
                },
            },
            {
                encodeValuesOnly: true,
            }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`)
            .then((res) => res.json())
            .then((data) => {
                setAuthors(data?.data)
            })
    }, [])

    useEffect(() => {
        setParams(getParams(root, selectedTag, getSortOption(root).sort, selectedAuthor))
    }, [selectedTag, root, selectedAuthor])

    return (
        <>
            <SEO title="Posts - PostHog" />
            <Editor
                title="posts"
                type="psheet"
                maxWidth="100%"
                dataToFilter={posts}
                handleFilterChange={handleFilterChange}
                showFilters
                availableFilters={[
                    {
                        label: 'category',
                        value: 'root',
                        initialValue: root,
                        options: categories.map((category) => ({
                            label: category.label,
                            value: category.root,
                        })),
                        operator: 'eq',
                    },
                    {
                        label: 'tags',
                        value: 'post_tags',
                        initialValue: selectedTag,
                        options: [
                            {
                                label: 'All',
                                value: null,
                            },
                            ...tags.map((tag) => ({
                                label: tag.attributes.label,
                                value: tag.attributes.label,
                            })),
                        ],
                        operator: 'includes',
                    },
                    ...(authors.length > 0
                        ? [
                              {
                                  label: 'author',
                                  value: 'authors',
                                  options: [
                                      {
                                          label: 'All',
                                          value: null,
                                      },
                                      ...authors.map((author) => {
                                          const name = [author.attributes.firstName, author.attributes.lastName]
                                              .filter(Boolean)
                                              .join(' ')
                                          return {
                                              label: name,
                                              value: author.id,
                                          }
                                      }),
                                  ],
                                  operator: 'includes',
                              },
                          ]
                        : []),
                ]}
            >
                {posts.length > 0 && (
                    <OSTable
                        fetchMore={hasMore ? fetchMore : undefined}
                        loading={isValidating}
                        rowAlignment="top"
                        columns={[
                            {
                                name: 'Date',
                                align: 'left',
                                width: '120px',
                            },
                            {
                                name: 'Title',
                                align: 'left',
                                width: '3fr',
                            },
                            {
                                name: 'Tags',
                                align: 'left',
                                width: '1fr',
                            },
                            {
                                name: 'Author(s)',
                                align: 'left',
                                width: '1fr',
                            },
                        ]}
                        rows={posts.map((post, index) => {
                            const featuredImageURL = post.attributes?.featuredImage?.url
                            return {
                                cells: [
                                    {
                                        content: (
                                            <span className="text-muted font-semibold">
                                                {dayjs(post.attributes.date).format('MMM D, YYYY')}
                                            </span>
                                        ),
                                    },
                                    {
                                        content: (
                                            <div className="flex justify-between items-start w-full">
                                                <Link className="font-semibold flex-1" to={post.attributes.slug}>
                                                    {post.attributes.title}
                                                </Link>
                                                {featuredImageURL ? (
                                                    <Link to={post.attributes.slug}>
                                                        <FeaturedImage url={featuredImageURL} />
                                                    </Link>
                                                ) : null}
                                            </div>
                                        ),
                                        className: '!flex-row !pl-[.3rem] gap-2 text-left',
                                    },
                                    {
                                        content: (
                                            <ul className="list-none m-0 p-0">
                                                <li className="text-sm">
                                                    {post.attributes.post_tags.data
                                                        .map((tag) => tag.attributes.label)
                                                        .join(', ')}
                                                </li>
                                            </ul>
                                        ),
                                    },
                                    {
                                        content: (
                                            <ul className="list-none m-0 p-0 flex flex-wrap gap-1">
                                                {post.attributes.authors.data.map((author) => {
                                                    const name = [
                                                        author.attributes.firstName,
                                                        author.attributes.lastName,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(' ')
                                                    return (
                                                        <li key={author.id}>
                                                            <TeamMember name={name} photo />
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        ),
                                    },
                                ],
                            }
                        })}
                    />
                )}
            </Editor>
        </>
    )
}
