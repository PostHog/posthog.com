import React, { useEffect } from 'react'
import useSWR from 'swr'
import qs from 'qs'
import { useUser } from './useUser'

const PROFILES_PER_PAGE = 25

export type CommunityProfile = {
    id: number
    firstName: string | null
    lastName: string | null
    email: string | null
    createdAt: string | null
    reputation: number | null
    avatarUrl: string | null
    color: string | null
    isTeamMember: boolean
}

export type CommunityProfilesFilters = {
    minReputation?: number | null
    search?: string
    teamMember?: 'any' | 'yes' | 'no'
    sort?: string
}

function mapProfile(profile: any): CommunityProfile {
    const attrs = profile.attributes || profile
    const user = attrs.user?.data?.attributes || attrs.user
    return {
        id: profile.id,
        firstName: attrs.firstName || null,
        lastName: attrs.lastName || null,
        email: user?.email || null,
        createdAt: attrs.createdAt || profile.createdAt || null,
        reputation: attrs.reputation ?? null,
        avatarUrl: attrs.avatar?.data?.attributes?.url || attrs.avatar?.url || null,
        color: attrs.color || null,
        isTeamMember: !!attrs.startDate,
    }
}

function buildFilters({ minReputation, search, teamMember }: CommunityProfilesFilters) {
    const and: Record<string, any>[] = []

    if (minReputation != null && minReputation > 0) {
        and.push({ reputation: { $gte: minReputation } })
    }

    const trimmedSearch = search?.trim()
    if (trimmedSearch) {
        and.push({
            $or: [
                { firstName: { $containsi: trimmedSearch } },
                { lastName: { $containsi: trimmedSearch } },
                { user: { email: { $containsi: trimmedSearch } } },
            ],
        })
    }

    if (teamMember === 'yes') {
        and.push({ startDate: { $notNull: true } })
    } else if (teamMember === 'no') {
        and.push({ startDate: { $null: true } })
    }

    if (and.length === 0) return undefined
    if (and.length === 1) return and[0]
    return { $and: and }
}

function buildQuery(filters: CommunityProfilesFilters, page: number, pageSize: number) {
    return qs.stringify(
        {
            populate: {
                avatar: { fields: ['url'] },
                user: {
                    fields: ['email'],
                },
            },
            fields: ['firstName', 'lastName', 'reputation', 'color', 'startDate', 'createdAt'],
            filters: buildFilters(filters),
            sort: [filters.sort || 'reputation:desc'],
            pagination: {
                page: page + 1,
                pageSize,
            },
        },
        { encodeValuesOnly: true }
    )
}

export async function fetchAllCommunityProfiles(
    filters: CommunityProfilesFilters,
    getJwt: () => Promise<string | null>,
    pageSize = 100
): Promise<CommunityProfile[]> {
    const allProfiles: CommunityProfile[] = []
    let page = 0
    let pageCount = 1

    while (page < pageCount) {
        const query = buildQuery(filters, page, pageSize)
        const jwt = await getJwt()
        const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`, {
            headers: jwt ? { Authorization: `Bearer ${jwt}` } : undefined,
        })
        if (!res.ok) {
            throw new Error(`Failed to export profiles (${res.status})`)
        }
        const { data, meta } = await res.json()
        allProfiles.push(...(data || []).map(mapProfile))
        pageCount = meta?.pagination?.pageCount || 1
        page++
    }

    return allProfiles
}

export function useCommunityProfiles({
    filters = {},
    pageSize = PROFILES_PER_PAGE,
    enabled = true,
}: {
    filters?: CommunityProfilesFilters
    pageSize?: number
    enabled?: boolean
} = {}) {
    const { getJwt } = useUser()
    const [currentPage, setCurrentPage] = React.useState(0)

    const query = buildQuery(filters, currentPage, pageSize)
    const key = enabled ? `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}` : null

    const { data, isLoading, error, isValidating, mutate } = useSWR(
        key,
        async (url: string) => {
            const jwt = await getJwt()
            const res = await fetch(url, jwt ? { headers: { Authorization: `Bearer ${jwt}` } } : undefined)
            if (!res.ok) {
                throw new Error(`Failed to load profiles (${res.status})`)
            }
            return res.json()
        },
        { revalidateOnFocus: false }
    )

    const profiles: CommunityProfile[] = (data?.data || []).map(mapProfile)
    const total = data?.meta?.pagination?.total ?? 0
    const totalPages = data?.meta?.pagination?.pageCount ?? (total ? Math.ceil(total / pageSize) : 0)
    const hasNextPage = currentPage < totalPages - 1
    const hasPrevPage = currentPage > 0

    useEffect(() => {
        setCurrentPage(0)
    }, [filters.minReputation, filters.search, filters.teamMember, filters.sort, pageSize])

    const goToPage = React.useCallback(
        (page: number) => {
            if (page < 0 || page >= totalPages) return
            setCurrentPage(page)
        },
        [totalPages]
    )

    const nextPage = React.useCallback(() => {
        if (hasNextPage) setCurrentPage((page) => page + 1)
    }, [hasNextPage])

    const prevPage = React.useCallback(() => {
        if (hasPrevPage) setCurrentPage((page) => page - 1)
    }, [hasPrevPage])

    return {
        profiles,
        isLoading,
        isValidating,
        error,
        total,
        currentPage,
        totalPages,
        pageSize,
        hasNextPage,
        hasPrevPage,
        nextPage,
        prevPage,
        goToPage,
        mutate,
    }
}
