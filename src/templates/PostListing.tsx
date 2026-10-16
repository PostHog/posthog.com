import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import SEO from 'components/seo'
import React, { useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'components/Link'
import TeamMember from 'components/TeamMember'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import ProgressBar from 'components/ProgressBar'
import slugify from 'slugify'
import { graphql, useStaticQuery } from 'gatsby'
import useSWR from 'swr'

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

export default function Posts({ pageContext }: { pageContext?: any }) {
    const { allBlogMdx, categories } = useStaticQuery(graphql`
        {
            allBlogMdx: allMdx(
                sort: { order: DESC, fields: [frontmatter___date] }
                filter: {
                    isFuture: { ne: true }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/blog/" } }
                }
            ) {
                nodes {
                    id
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date
                        category
                        tags
                        featuredImage {
                            publicURL
                        }
                        authors: authorData {
                            name
                            handle
                        }
                    }
                }
            }
            categories: allMdx(
                filter: {
                    isFuture: { ne: true }
                    frontmatter: { date: { ne: null } }
                    fields: { slug: { regex: "/^/blog/" } }
                }
            ) {
                categories: group(field: frontmatter___category) {
                    totalCount
                    category: fieldValue
                }
                tags: group(field: frontmatter___tags) {
                    totalCount
                    tag: fieldValue
                }
            }
        }
    `)

    // Also support live updates from local /api/admin-posts if available
    const { data: adminData } = useSWR(
        '/api/admin-posts',
        (url) => fetch(url).then((r) => r.json()),
        { revalidateOnFocus: true }
    )

    const articleRef = useRef<HTMLDivElement>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedTag, setSelectedTag] = useState<string | null>(pageContext?.selectedTag || null)
    const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const PAGE_SIZE = 20

    const authorMap = useMemo(() => {
        const map = new Map<string, string>()
        if (adminData?.authors && Array.isArray(adminData.authors)) {
            adminData.authors.forEach((a: any) => {
                if (a.handle && a.name) {
                    map.set(a.handle.toLowerCase(), a.name)
                }
            })
        }
        return map
    }, [adminData])

    const formatAuthor = (handle: string) => {
        if (!handle) return { name: 'PostHog Team', handle: 'posthog' }
        const name =
            authorMap.get(handle.toLowerCase()) ||
            handle
                .split(/[-_]+/)
                .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ')
        return { name, handle }
    }

    // Build unified posts list (prioritizing live local API data, fallback to build-time GraphQL)
    const allPosts = useMemo(() => {
        if (adminData?.posts && Array.isArray(adminData.posts) && adminData.posts.length > 0) {
            return adminData.posts.map((p: any) => ({
                id: p.slug || p.filename,
                slug: p.slug?.startsWith('/') ? p.slug : `/blog/${p.slug}`,
                title: p.title || 'Untitled',
                date: p.date,
                category: p.category || 'General',
                tags: Array.isArray(p.tags) ? p.tags : [],
                featuredImage: p.featuredImage || null,
                authors: Array.isArray(p.author)
                    ? p.author.map((a: string) => formatAuthor(a))
                    : typeof p.author === 'string' && p.author
                    ? [formatAuthor(p.author)]
                    : [{ name: 'PostHog Team', handle: 'posthog' }],
            }))
        }

        return (allBlogMdx?.nodes || []).map((node: any) => {
            const fm = node.frontmatter || {}
            return {
                id: node.id,
                slug: node.fields?.slug,
                title: fm.title || 'Untitled',
                date: fm.date,
                category: fm.category || 'General',
                tags: Array.isArray(fm.tags) ? fm.tags : [],
                featuredImage: fm.featuredImage?.publicURL || null,
                authors:
                    Array.isArray(fm.authors) && fm.authors.length > 0
                        ? fm.authors.map((a: any) => ({
                              name: a?.name || a?.handle || 'PostHog Team',
                              handle: a?.handle || '',
                          }))
                        : [{ name: 'PostHog Team', handle: 'posthog' }],
            }
        })
    }, [adminData, allBlogMdx])

    // Available categories, tags, authors
    const allCategories = useMemo(() => {
        if (adminData?.categories && adminData.categories.length > 0) {
            return adminData.categories
        }
        return (categories?.categories?.map((c: any) => c.category) || []).filter(Boolean).sort()
    }, [adminData, categories])

    const allTags = useMemo(() => {
        if (adminData?.tags && adminData.tags.length > 0) {
            return adminData.tags
        }
        return (categories?.tags?.map((t: any) => t.tag) || []).filter(Boolean).sort()
    }, [adminData, categories])

    const allAuthors = useMemo(() => {
        const map = new Map<string, { name: string; handle: string }>()
        allPosts.forEach((post) => {
            post.authors.forEach((author) => {
                if (author.name && !map.has(author.name)) {
                    map.set(author.name, author)
                }
            })
        })
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name))
    }, [allPosts])

    // Filter posts
    const filteredPosts = useMemo(() => {
        return allPosts.filter((post) => {
            if (selectedCategory && post.category !== selectedCategory) {
                return false
            }
            if (selectedTag && !post.tags.includes(selectedTag)) {
                return false
            }
            if (selectedAuthor) {
                const match = post.authors.some(
                    (a) => a.handle === selectedAuthor || a.name === selectedAuthor
                )
                if (!match) return false
            }
            return true
        })
    }, [allPosts, selectedCategory, selectedTag, selectedAuthor])

    const totalPages = Math.ceil(filteredPosts.length / PAGE_SIZE) || 1
    const paginatedPosts = useMemo(() => {
        const start = currentPage * PAGE_SIZE
        return filteredPosts.slice(start, start + PAGE_SIZE)
    }, [filteredPosts, currentPage, PAGE_SIZE])

    const scrollToTop = () => {
        const viewport = articleRef.current?.closest('[data-radix-scroll-area-viewport]')
        viewport?.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    const handleFilterChange = (filters: any) => {
        if ('category' in filters) {
            setSelectedCategory(filters.category?.value || null)
        } else if ('root' in filters) {
            setSelectedCategory(filters.root?.value || null)
        }
        if ('tags' in filters) {
            setSelectedTag(filters.tags?.value || null)
        } else if ('post_tags' in filters) {
            setSelectedTag(filters.post_tags?.value || null)
        }
        if ('author' in filters) {
            setSelectedAuthor(filters.author?.value || null)
        } else if ('authors' in filters) {
            setSelectedAuthor(filters.authors?.value || null)
        }
        setCurrentPage(0)
        scrollToTop()
    }

    const nextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((p) => p + 1)
            scrollToTop()
        }
    }

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage((p) => p - 1)
            scrollToTop()
        }
    }

    const goToPage = (page: number) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page)
            scrollToTop()
        }
    }

    return (
        <>
            <SEO title="Posts - PostHog" />
            <Editor
                articleRef={articleRef}
                title="posts"
                type="psheet"
                maxWidth="100%"
                dataToFilter={paginatedPosts}
                handleFilterChange={handleFilterChange}
                showFilters
                availableFilters={[
                    {
                        label: 'category',
                        value: 'category',
                        initialValue: selectedCategory,
                        options: [
                            { label: 'All', value: null },
                            ...allCategories.map((c: string) => ({ label: c, value: c })),
                        ],
                        operator: 'eq',
                    },
                    ...(allTags.length > 0
                        ? [
                              {
                                  label: 'tags',
                                  value: 'tags',
                                  initialValue: selectedTag,
                                  options: [
                                      { label: 'All', value: null },
                                      ...allTags.map((t: string) => ({ label: t, value: t })),
                                  ],
                                  operator: 'includes',
                              },
                          ]
                        : []),
                    ...(allAuthors.length > 0
                        ? [
                              {
                                  label: 'author',
                                  value: 'author',
                                  initialValue: selectedAuthor,
                                  options: [
                                      { label: 'All', value: null },
                                      ...allAuthors.map((a: any) => ({
                                          label: a.name,
                                          value: a.handle || a.name,
                                      })),
                                  ],
                                  operator: 'includes',
                              },
                          ]
                        : []),
                ]}
            >
                {paginatedPosts.length > 0 && (
                    <OSTable
                        pagination={{
                            totalPages,
                            currentPage,
                            nextPage,
                            prevPage,
                            hasNextPage: currentPage < totalPages - 1,
                            hasPrevPage: currentPage > 0,
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
                        rows={paginatedPosts.map((post) => {
                            const featuredImageURL = post.featuredImage
                            return {
                                cells: [
                                    {
                                        content: (
                                            <span className="text-muted font-semibold">
                                                {dayjs(post.date).format('MMM D, YYYY')}
                                            </span>
                                        ),
                                    },
                                    {
                                        content: (
                                            <div className="flex justify-between items-start w-full">
                                                <Link className="font-semibold flex-1" to={post.slug}>
                                                    {post.title}
                                                </Link>
                                                {featuredImageURL ? (
                                                    <Link to={post.slug}>
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
                                                    {post.tags.map((tag: string, index: number) => {
                                                        const url = `/blog/tags/${slugify(tag, { lower: true })}`
                                                        const isLast = index === post.tags.length - 1
                                                        return (
                                                            <React.Fragment key={tag}>
                                                                <Link to={url}>{tag}</Link>
                                                                {!isLast && ', '}
                                                            </React.Fragment>
                                                        )
                                                    })}
                                                </li>
                                            </ul>
                                        ),
                                    },
                                    {
                                        content: (
                                            <ul className="list-none m-0 p-0 flex flex-wrap gap-1">
                                                {post.authors.map((author: any) => (
                                                    <li key={author.handle || author.name}>
                                                        <TeamMember name={author.name} photo />
                                                    </li>
                                                ))}
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
