import { getParams } from 'components/Edition/Posts'
import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import SEO from 'components/seo'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getSortOption } from './BlogPost'
import Link from 'components/Link'
import TeamMember from 'components/TeamMember'
import qs from 'qs'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import ProgressBar from 'components/ProgressBar'
import { graphql, useStaticQuery } from 'gatsby'
import { usePaginatedPosts } from 'components/Edition/hooks/usePaginatedPosts'
import { IconSpinner } from '@posthog/icons'

dayjs.extend(relativeTime)

export const FeaturedImage = ({ url }: { url: string }) => {
    const [isSmallImageLoaded, setIsSmallImageLoaded] = useState(false)
    const [isLargeImageLoaded, setIsLargeImageLoaded] = useState(false)

    return (
        <Tooltip
            trigger={
                <div data-scheme="secondary" className="bg-primary max-h-8 max-w-48">
                    <CloudinaryImage
                        src={url as `https://res.cloudinary.com/${string}`}
                        imgClassName={`max-h-8 max-w-48 ${!isSmallImageLoaded ? 'hidden' : ''}`}
                        width={200}
                        onLoad={() => setIsSmallImageLoaded(true)}
                    />
                </div>
            }
        >
            <div className="relative min-h-4 min-w-12 max-h-72 max-w-72 transition-all">
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
    const { allPostCategory } = useStaticQuery(graphql`
        {
            allPostCategory(
                filter: {
                    attributes: {
                        folder: { nin: [null, "customers", "spotlight", "changelog", "comparisons", "notes", "repost"] }
                    }
                }
            ) {
                nodes {
                    attributes {
                        label
                        folder
                        post_tags {
                            data {
                                attributes {
                                    label
                                    folder
                                }
                            }
                        }
                    }
                }
            }
        }
    `)
    const articleRef = useRef<HTMLDivElement>(null)
    const [authors, setAuthors] = useState<any[]>([])
    const [selectedTag, setSelectedTag] = useState(pageContext.selectedTag)
    const [root, setRoot] = useState(pageContext.root || null)
    const [selectedAuthor, setSelectedAuthor] = useState()
    const [params, setParams] = useState(
        getParams(pageContext.root, pageContext.selectedTag, getSortOption(pageContext.root).sort, selectedAuthor)
    )
    const allTags = useMemo(
        () =>
            allPostCategory.nodes
                .flatMap((category) => category.attributes.post_tags.data)
                .sort((a, b) => a.attributes.label.localeCompare(b.attributes.label))
                .filter(
                    (tag, index, self) => index === self.findIndex((t) => t.attributes.label === tag.attributes.label)
                ),
        []
    )
    const selectedCategory = useMemo(
        () => allPostCategory.nodes.find((category) => category.attributes.folder === root),
        [root]
    )
    const tags = root === null ? allTags : selectedCategory?.attributes.post_tags.data
    const allCategories = useMemo(
        () =>
            allPostCategory.nodes.filter(
                (category, index, self) =>
                    index === self.findIndex((c) => c.attributes.folder === category.attributes.folder)
            ),
        []
    )

    const scrollToTop = () => {
        const viewport = articleRef.current?.closest('[data-radix-scroll-area-viewport]')
        viewport?.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const handlePageChange = () => {
        scrollToTop()
    }

    const { posts, isValidating, totalPages, currentPage, nextPage, prevPage, hasNextPage, hasPrevPage, goToPage } =
        usePaginatedPosts({ params, onPageChange: handlePageChange })

    const handleFilterChange = (filters) => {
        if (filters.post_tags) {
            const currentRoot = filters.root?.value || root
            const exists = allCategories
                .find((category) => category.attributes.folder === currentRoot)
                ?.attributes.post_tags.data.some((tag) => tag.attributes.label === filters.post_tags.value)
            const selectedTag = currentRoot === null || exists ? filters.post_tags.value : null
            setSelectedTag(selectedTag)
        }
        if (filters.root) {
            setRoot(filters.root.value)
        }
        if (filters.authors) {
            setSelectedAuthor(filters.authors.value)
        }
    }

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
        scrollToTop()
    }, [selectedTag, root, selectedAuthor])

    return (
        <>
            <SEO title="Posts - PostHog" />
            <Editor
                articleRef={articleRef}
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
                        options: [
                            {
                                label: 'All',
                                value: null,
                            },
                            ...allCategories.map((category) => ({
                                label: category.attributes.label,
                                value: category.attributes.folder,
                            })),
                        ],
                        operator: 'eq',
                    },
                    ...(tags?.length > 0
                        ? [
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
                          ]
                        : []),
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
                        pagination={{
                            totalPages,
                            currentPage,
                            nextPage,
                            prevPage,
                            hasNextPage,
                            hasPrevPage,
                            goToPage,
                        }}
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
                {isValidating && !posts.length && (
                    <div className="flex items-center justify-center">
                        <IconSpinner className="size-7 opacity-60 animate-spin" />
                    </div>
                )}
            </Editor>
        </>
    )
}
