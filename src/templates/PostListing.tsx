import { getParams, PostsContext } from 'components/Edition/Posts'
import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import SEO from 'components/seo'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'components/Link'
import TeamMember from 'components/TeamMember'
import qs from 'qs'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import ProgressBar from 'components/ProgressBar'
import slugify from 'slugify'
import postCategoriesJson from '@data/roadmap-post-categories.json'
import type { PostCategories } from '~/data-layer/queries/roadmap'
import { usePaginatedPosts } from 'components/Edition/hooks/usePaginatedPosts'
import { IconSpinner } from '@posthog/icons'
import LikeButton from 'components/Edition/LikeButton'
import Modal from 'components/Modal'
import { Authentication } from 'components/Squeak'
import { navigate } from 'lib/navigation'

dayjs.extend(relativeTime)

const sortOptions = [
    {
        sort: ['score:desc', 'date:desc'],
        label: 'Popularity',
    },
    {
        sort: ['date:desc'],
        label: 'Newest',
    },
]

const getSortOption = (root?: string | null) =>
    sortOptions[root && ['blog', 'changelog', 'newsletter', 'spotlight'].includes(root) ? 1 : 0]

export const FeaturedImage = ({ url }: { url: string }) => {
    const [isSmallImageLoaded, setIsSmallImageLoaded] = useState(false)
    const [isLargeImageLoaded, setIsLargeImageLoaded] = useState(false)

    return (
        <Tooltip
            trigger={
                <div data-scheme="secondary" className="bg-primary max-h-8 max-w-48 overflow-hidden">
                    <CloudinaryImage
                        src={url as `https://res.cloudinary.com/${string}`}
                        imgClassName={`max-h-8 max-w-48 h-auto w-auto object-contain ${
                            !isSmallImageLoaded ? 'hidden' : ''
                        }`}
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

// Categories (one per folder) with their tag labels, and every tag across them, sorted.
const { categories, allTags } = postCategoriesJson as PostCategories

export interface PostListingProps {
    /** The post category folder to filter by. Unset on /posts. */
    root?: string
    /** The tag label to filter by, on /<folder>/<tag> pages. */
    selectedTag?: string
    location: { pathname: string; search: string }
}

export default function Posts({ root: rootFolder, selectedTag: rootTag, location }: PostListingProps) {
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const articleRef = useRef<HTMLDivElement>(null)
    const initialFilters = useMemo(() => {
        const searchParams = new URLSearchParams(location?.search)
        const category = searchParams.get('category')
        const tag = searchParams.get('tag')
        return {
            root: category ? (category === 'all' ? null : category) : rootFolder || null,
            tag: tag ? (tag === 'all' ? null : tag) : rootTag,
            author: searchParams.get('author') ? Number(searchParams.get('author')) : undefined,
        }
    }, [])
    const [authors, setAuthors] = useState<any[]>([])
    const [selectedTag, setSelectedTag] = useState(initialFilters.tag)
    const [root, setRoot] = useState(initialFilters.root)
    const [selectedAuthor, setSelectedAuthor] = useState(initialFilters.author)
    const [sort, setSort] = useState(getSortOption(initialFilters.root).label)
    const [params, setParams] = useState(
        getParams(
            initialFilters.root,
            initialFilters.tag,
            getSortOption(initialFilters.root).sort,
            initialFilters.author
        )
    )
    const tags = root === null ? allTags : categories.find((category) => category.folder === root)?.tags

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
            const exists = categories
                .find((category) => category.folder === currentRoot)
                ?.tags.includes(filters.post_tags.value)
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
        fetch(`${import.meta.env.PUBLIC_SQUEAK_API_HOST}/api/profiles?${query}`)
            .then((res) => res.json())
            .then((data) => {
                setAuthors(data?.data)
            })
    }, [])

    useEffect(() => {
        const sortValue = sortOptions.find((option) => option.label === sort)?.sort
        setParams(getParams(root, selectedTag, sortValue, selectedAuthor))
        scrollToTop()
    }, [selectedTag, root, selectedAuthor, sort])

    useEffect(() => {
        if (typeof window === 'undefined') return
        const searchParams = new URLSearchParams()
        if (root !== (rootFolder || null)) {
            searchParams.set('category', root ?? 'all')
        }
        if ((selectedTag || null) !== (rootTag || null)) {
            searchParams.set('tag', selectedTag ?? 'all')
        }
        if (selectedAuthor) {
            searchParams.set('author', String(selectedAuthor))
        }
        const search = searchParams.toString()
        const newUrl = `${location.pathname}${search ? `?${search}` : ''}`
        if (newUrl !== window.location.pathname + window.location.search) {
            navigate(newUrl, { replace: true })
        }
    }, [selectedTag, root, selectedAuthor])

    return (
        <PostsContext.Provider value={{ setLoginModalOpen }}>
            <SEO title="Posts - PostHog" />
            <Modal open={loginModalOpen} setOpen={setLoginModalOpen}>
                <div className="px-4">
                    <div className="p-4 max-w-[450px] mx-auto relative rounded-md dark:bg-dark bg-light mt-12 border border-input">
                        <p className="m-0 text-sm font-bold dark:text-white">
                            Note: PostHog.com authentication is separate from your PostHog app.
                        </p>
                        <p className="text-sm my-2 dark:text-white">
                            We suggest signing up with your personal email. Soon you'll be able to link your PostHog app
                            account.
                        </p>
                        <Authentication
                            onAuth={() => setLoginModalOpen(false)}
                            showBanner={false}
                            showProfile={false}
                        />
                    </div>
                </div>
            </Modal>
            <Editor
                articleRef={articleRef}
                title="posts"
                type="psheet"
                maxWidth="100%"
                dataToFilter={posts}
                handleFilterChange={handleFilterChange}
                showFilters
                sortOptions={sortOptions.map((option) => ({
                    label: option.label,
                    value: option.label,
                }))}
                onSortChange={(value) => setSort(value)}
                defaultSortValue={sort}
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
                            ...categories.map((category) => ({
                                label: category.label,
                                value: category.folder,
                            })),
                        ],
                        operator: 'eq',
                    },
                    ...(tags && tags.length > 0
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
                                          label: tag,
                                          value: tag,
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
                                  initialValue: selectedAuthor,
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
                        width="full"
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
                                name: '',
                                align: 'center',
                                width: '40px',
                            },
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
                                        content: <LikeButton postID={post.id} slug={post.attributes.slug} />,
                                    },
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
                                                    {post.attributes.post_tags.data.map((tag, index) => {
                                                        const label = tag.attributes.label
                                                        const base =
                                                            post.attributes.post_category.data.attributes.folder
                                                        const url = `/${base}/${slugify(label, { lower: true })}`
                                                        const isLast =
                                                            index === post.attributes.post_tags.data.length - 1
                                                        return (
                                                            <>
                                                                <Link key={tag.id} to={url}>
                                                                    {label}
                                                                </Link>
                                                                {!isLast && ', '}
                                                            </>
                                                        )
                                                    })}
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
        </PostsContext.Provider>
    )
}
