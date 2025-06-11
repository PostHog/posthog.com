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
]

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
                maxWidth="screen-2xl"
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
                <ScrollArea>
                    {posts.length > 0 && (
                        <OSTable
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
                            rows={posts.map((post, index) => ({
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
                                            <Link className="font-semibold" to={post.attributes.slug}>
                                                {post.attributes.title}
                                            </Link>
                                        ),
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
                            }))}
                        />
                    )}
                </ScrollArea>
            </Editor>
        </>
    )
}
