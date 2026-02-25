import { useEffect, useState } from 'react'
import qs from 'qs'
import { useUser } from './useUser'

export type TeamMember = {
    id: number
    firstName: string | null
    lastName: string | null
    email: string | null
    companyRole: string | null
    location: string | null
    country: string | null
    teams: string[]
    leadsTeams: string[]
    pineappleOnPizza: boolean | null
    startDate: string | null
}

export function useTeamMembers() {
    const { getJwt, isModerator } = useUser()
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isModerator) {
            setLoading(false)
            return
        }

        const fetchAllProfiles = async () => {
            const token = await getJwt()
            if (!token) {
                setLoading(false)
                return
            }

            const allMembers: TeamMember[] = []
            let page = 1
            let hasMore = true

            while (hasMore) {
                const query = qs.stringify(
                    {
                        populate: ['user', 'teams', 'leadTeams', 'avatar'],
                        filters: {
                            teams: {
                                id: { $notNull: true },
                            },
                            id: { $ne: 28378 },
                        },
                        pagination: {
                            page,
                            pageSize: 100,
                        },
                    },
                    { encodeValuesOnly: true }
                )

                const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!res.ok) break

                const json = await res.json()
                const profiles = json.data || []

                for (const profile of profiles) {
                    const attrs = profile.attributes || profile
                    const user = attrs.user?.data?.attributes || attrs.user || null
                    const teams = (attrs.teams?.data || attrs.teams || []).map((t: any) => t.attributes?.name || t.name)
                    const leadsTeams = (attrs.leadTeams?.data || attrs.leadTeams || []).map(
                        (t: any) => t.attributes?.name || t.name
                    )

                    allMembers.push({
                        id: profile.id,
                        firstName: attrs.firstName || null,
                        lastName: attrs.lastName || null,
                        email: user?.username || null,
                        companyRole: attrs.companyRole || null,
                        location: attrs.location || null,
                        country: attrs.country || null,
                        teams,
                        leadsTeams,
                        pineappleOnPizza: attrs.pineappleOnPizza ?? null,
                        startDate: attrs.startDate || null,
                    })
                }

                if (profiles.length < 100) {
                    hasMore = false
                } else {
                    page++
                }
            }

            const deduplicated = Array.from(
                allMembers
                    .reduce((map, member) => {
                        if (!map.has(member.id)) {
                            map.set(member.id, member)
                        }
                        return map
                    }, new Map<number, TeamMember>())
                    .values()
            )
            deduplicated.sort((a, b) => (a.startDate || '').localeCompare(b.startDate || ''))
            setTeamMembers(deduplicated)
            setLoading(false)
        }

        fetchAllProfiles()
    }, [isModerator])

    const updateLocation = async (profileId: number, location: string) => {
        const token = await getJwt()
        if (!token) return

        setTeamMembers((prev) => prev.map((m) => (m.id === profileId ? { ...m, location } : m)))

        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${profileId}`, {
            method: 'PUT',
            body: JSON.stringify({ data: { location } }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
    }

    return { teamMembers, loading, updateLocation }
}
