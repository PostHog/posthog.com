import { useEffect, useState } from 'react'
import { useUser } from './useUser'
import qs from 'qs'

export type TeamMember = {
    id: number
    avatarUrl: string | null
    color: string | null
    firstName: string | null
    lastName: string | null
    companyRole: string | null
    location: string | null
    country: string | null
    teams: string[]
    leadsTeams: string[]
    pineappleOnPizza: boolean | null
    startDate: string | null
    tShirtFit: string | null
    tShirtSize: string | null
    tShirtAdditionalInfo: string | null
}

function mapProfile(m: any): TeamMember {
    return {
        id: m.id,
        avatarUrl: m.attributes?.avatar?.data?.attributes?.url || null,
        color: m.attributes?.color || null,
        firstName: m.attributes?.firstName || null,
        lastName: m.attributes?.lastName || null,
        companyRole: m.attributes?.companyRole || null,
        location: m.attributes?.location || null,
        country: m.attributes?.country || null,
        teams: (m.attributes?.teams?.data || []).map((t: any) => t.attributes?.name),
        leadsTeams: (m.attributes?.leadTeams?.data || []).map((t: any) => t.attributes?.name),
        pineappleOnPizza: m.attributes?.pineappleOnPizza ?? null,
        startDate: m.attributes?.startDate || null,
        tShirtFit: m.attributes?.tShirt?.fit || null,
        tShirtSize: m.attributes?.tShirt?.size || null,
        tShirtAdditionalInfo: m.attributes?.tShirt?.additionalInfo || null,
    }
}

async function fetchPaginated(
    url: string,
    headers: HeadersInit,
    filters: Record<string, any>,
    populate: Record<string, any>,
    sort: string[]
): Promise<any[] | null> {
    const allData: any[] = []
    let page = 1
    let pageCount = 1

    while (page <= pageCount) {
        const query = qs.stringify(
            { populate, filters, pagination: { page, pageSize: 100 }, sort },
            { encodeValuesOnly: true }
        )
        const res = await fetch(`${url}?${query}`, { headers })
        if (!res.ok) return null

        const { data, meta } = await res.json()
        if (!data) return null

        allData.push(...data)
        pageCount = meta?.pagination?.pageCount || 1
        page++
    }

    return allData
}

export function useTeamMembers() {
    const { getJwt } = useUser()
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [futureJoiners, setFutureJoiners] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const token = await getJwt()
                const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}
                const apiUrl = `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles`
                const populate = {
                    avatar: { fields: ['url'] },
                    teams: { fields: ['name'] },
                    leadTeams: { fields: ['name'] },
                    tShirt: true,
                }

                const today = new Date().toISOString().split('T')[0]
                const isFuture = (m: TeamMember) => m.startDate != null && m.startDate > today

                const [teamData, futureData] = await Promise.all([
                    fetchPaginated(
                        apiUrl,
                        headers,
                        { teams: { id: { $notNull: true } }, id: { $ne: 28378 } },
                        populate,
                        ['startDate:asc']
                    ),
                    fetchPaginated(apiUrl, headers, { startDate: { $gt: today }, id: { $ne: 28378 } }, populate, [
                        'startDate:asc',
                    ]),
                ])

                const allWithTeams = (teamData || []).map(mapProfile)
                const members = allWithTeams.filter((m) => !isFuture(m))

                const futureFromTeams = allWithTeams.filter(isFuture)
                const futureWithoutTeams = (futureData || []).map(mapProfile)
                const seenIds = new Set(futureFromTeams.map((m) => m.id))
                const joiners = [...futureFromTeams, ...futureWithoutTeams.filter((m) => !seenIds.has(m.id))]

                setTeamMembers(members)
                setFutureJoiners(joiners)
                setLoading(false)
            } catch (err) {
                console.error('Failed to fetch team members', err)
                setLoading(false)
            }
        }

        fetchAll()
    }, [])

    const updateProfile = async (profileId: number, updates: Partial<TeamMember>): Promise<boolean> => {
        const token = await getJwt()
        if (!token) return false

        const current = teamMembers.find((m) => m.id === profileId) || futureJoiners.find((m) => m.id === profileId)
        setTeamMembers((prev) => prev.map((m) => (m.id === profileId ? { ...m, ...updates } : m)))
        setFutureJoiners((prev) => prev.map((m) => (m.id === profileId ? { ...m, ...updates } : m)))

        const apiData: Record<string, any> = {}
        const hasTShirtField = 'tShirtFit' in updates || 'tShirtSize' in updates || 'tShirtAdditionalInfo' in updates
        if (hasTShirtField) {
            apiData.tShirt = {
                fit: current?.tShirtFit ?? null,
                size: current?.tShirtSize ?? null,
                additionalInfo: current?.tShirtAdditionalInfo ?? null,
            }
            if ('tShirtFit' in updates) apiData.tShirt.fit = updates.tShirtFit
            if ('tShirtSize' in updates) apiData.tShirt.size = updates.tShirtSize
            if ('tShirtAdditionalInfo' in updates) apiData.tShirt.additionalInfo = updates.tShirtAdditionalInfo
        }
        for (const [key, value] of Object.entries(updates)) {
            if (key === 'tShirtFit' || key === 'tShirtSize' || key === 'tShirtAdditionalInfo') continue
            apiData[key] = value
        }

        try {
            const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${profileId}`, {
                method: 'PUT',
                body: JSON.stringify({ data: apiData }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            return res.ok
        } catch (err) {
            console.error('Failed to update profile', err)
            return false
        }
    }

    return { teamMembers, futureJoiners, loading, updateProfile }
}
