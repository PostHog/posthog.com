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

export function useTeamMembers() {
    const { getJwt } = useUser()
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTeamMembers = async () => {
            try {
                const token = await getJwt()
                const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {}

                const allData: any[] = []
                let page = 1
                let pageCount = 1

                while (page <= pageCount) {
                    const query = qs.stringify(
                        {
                            populate: {
                                avatar: { fields: ['url'] },
                                teams: { fields: ['name'] },
                                leadTeams: { fields: ['name'] },
                                tShirt: true,
                            },
                            filters: {
                                teams: { id: { $notNull: true } },
                                id: { $ne: 28378 },
                            },
                            pagination: { page, pageSize: 100 },
                            sort: ['startDate:asc'],
                        },
                        { encodeValuesOnly: true }
                    )

                    const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`, { headers })
                    if (!res.ok) {
                        console.error('Failed to fetch team members', res.status)
                        setLoading(false)
                        return
                    }

                    const { data, meta } = await res.json()
                    if (!data) {
                        setLoading(false)
                        return
                    }

                    allData.push(...data)
                    pageCount = meta?.pagination?.pageCount || 1
                    page++
                }

                const members: TeamMember[] = allData.map((m: any) => ({
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
                }))

                setTeamMembers(members)
                setLoading(false)
            } catch (err) {
                console.error('Failed to fetch team members', err)
                setLoading(false)
            }
        }

        fetchTeamMembers()
    }, [])

    const updateProfile = async (profileId: number, updates: Partial<TeamMember>): Promise<boolean> => {
        const token = await getJwt()
        if (!token) return false

        const current = teamMembers.find((m) => m.id === profileId)
        setTeamMembers((prev) => prev.map((m) => (m.id === profileId ? { ...m, ...updates } : m)))

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

    return { teamMembers, loading, updateProfile }
}
