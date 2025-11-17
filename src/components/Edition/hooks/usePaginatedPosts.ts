import React, { useEffect } from 'react'
import useSWR from 'swr'
import qs from 'qs'

const POSTS_PER_PAGE = 20

const query = (params: any, page: number, limit: number = POSTS_PER_PAGE) => {
    return qs.stringify(
        {
            populate: ['featuredImage.image', 'post_category.defaultImage', 'authors.avatar', 'likes', 'post_tags'],
            sort: 'date:desc',
            pagination: {
                start: page * limit,
                limit: limit,
            },
            ...params,
        },
        {
            encodeValuesOnly: true,
        }
    )
}

interface UsePaginatedPostsProps {
    params?: any
    pageSize?: number
    onPageChange?: (page: number) => void
}

export const usePaginatedPosts = ({ params, pageSize = POSTS_PER_PAGE, onPageChange }: UsePaginatedPostsProps = {}) => {
    const [currentPage, setCurrentPage] = React.useState(0)

    const { data, isLoading, error, mutate, isValidating } = useSWR(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/posts?${query(params, currentPage, pageSize)}`,
        (url: string) => fetch(url).then((r) => r.json())
    )

    const posts = data?.data ?? []
    const total = data?.meta?.pagination?.total
    const totalPages = total ? Math.ceil(total / pageSize) : 0
    const hasNextPage = currentPage < totalPages - 1
    const hasPrevPage = currentPage > 0

    const goToPage = React.useCallback(
        (page: number) => {
            if (page < 0 || page >= totalPages) return
            setCurrentPage(page)
            onPageChange?.(page)
        },
        [totalPages]
    )

    const nextPage = React.useCallback(() => {
        if (hasNextPage) {
            setCurrentPage(currentPage + 1)
            onPageChange?.(currentPage + 1)
        }
    }, [currentPage, hasNextPage])

    const prevPage = React.useCallback(() => {
        if (hasPrevPage) {
            setCurrentPage(currentPage - 1)
            onPageChange?.(currentPage - 1)
        }
    }, [currentPage, hasPrevPage])

    const reset = React.useCallback(() => {
        setCurrentPage(0)
        onPageChange?.(0)
    }, [])

    useEffect(() => {
        setCurrentPage(0)
    }, [params])

    return {
        posts,
        isLoading,
        isValidating,
        error,
        currentPage,
        totalPages,
        total,
        pageSize,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
        goToPage,
        reset,
        mutate,
    }
}
