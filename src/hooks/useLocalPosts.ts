import { graphql, useStaticQuery } from 'gatsby'
import { useMemo, useState } from 'react'
import useSWR from 'swr'

interface UseLocalPostsProps {
    root?: string
    tag?: string
    sort?: { label: string; sort?: any }
    pageSize?: number
}

export const useLocalPosts = ({ root, tag, sort, pageSize = 30 }: UseLocalPostsProps = {}) => {
    const data = useStaticQuery(graphql`
        query LocalPostsSidebarQuery {
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
                    }
                }
            }
        }
    `)

    const { data: adminData } = useSWR(
        '/api/admin-posts',
        (url) => fetch(url).then((r) => r.json()),
        { revalidateOnFocus: true }
    )

    const [limit, setLimit] = useState(pageSize)

    // Base list of all local posts
    const allPosts = useMemo(() => {
        if (adminData?.posts && Array.isArray(adminData.posts) && adminData.posts.length > 0) {
            return adminData.posts.map((p: any) => ({
                id: p.slug || p.filename,
                title: p.title || 'Untitled',
                slug: p.slug?.startsWith('/') ? p.slug : `/blog/${p.slug}`,
                date: p.date,
                category: p.category || 'General',
                tags: Array.isArray(p.tags) ? p.tags : [],
            }))
        }

        return (data?.allBlogMdx?.nodes || []).map((node: any) => {
            const fm = node.frontmatter || {}
            return {
                id: node.id,
                title: fm.title || 'Untitled',
                slug: node.fields?.slug,
                date: fm.date,
                category: fm.category || 'General',
                tags: Array.isArray(fm.tags) ? fm.tags : [],
            }
        })
    }, [adminData, data])

    // Filter by tag / category
    const filteredPosts = useMemo(() => {
        let result = allPosts
        if (tag) {
            const lowerTag = tag.toLowerCase()
            result = result.filter(
                (p) =>
                    p.category?.toLowerCase() === lowerTag ||
                    p.tags.some((t: string) => t.toLowerCase() === lowerTag)
            )
        }
        if (sort?.label === 'Oldest') {
            return [...result].sort((a, b) => (a.date > b.date ? 1 : -1))
        }
        // Default: Newest first (already sorted by date desc)
        return result
    }, [allPosts, tag, sort])

    const visiblePosts = useMemo(() => {
        return filteredPosts.slice(0, limit)
    }, [filteredPosts, limit])

    const hasMore = visiblePosts.length < filteredPosts.length

    const fetchMore = () => {
        setLimit((prev) => prev + pageSize)
    }

    return {
        posts: visiblePosts,
        total: filteredPosts.length,
        isLoading: false,
        isValidating: false,
        hasMore,
        fetchMore,
    }
}
