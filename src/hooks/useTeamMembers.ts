import { useEffect, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
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
    const { getJwt, isModerator } = useUser()

    const {
        team: { teamMembers: staticMembers },
    } = useStaticQuery(graphql`
        query TeamDirectoryQuery {
            team: allSqueakProfile(
                filter: { teams: { data: { elemMatch: { id: { ne: null } } } }, squeakId: { ne: 28378 } }
                sort: { fields: startDate, order: ASC }
            ) {
                teamMembers: nodes {
                    squeakId
                    avatar {
                        url
                    }
                    color
                    firstName
                    lastName
                    companyRole
                    country
                    location
                    pineappleOnPizza
                    startDate
                    teams {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                    leadTeams {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                }
            }
        }
    `)

    const baseMembers: TeamMember[] = staticMembers.map((m: any) => ({
        id: m.squeakId,
        avatarUrl: m.avatar?.url || null,
        color: m.color || null,
        firstName: m.firstName || null,
        lastName: m.lastName || null,
        companyRole: m.companyRole || null,
        location: m.location || null,
        country: m.country || null,
        teams: (m.teams?.data || []).map((t: any) => t.attributes?.name),
        leadsTeams: (m.leadTeams?.data || []).map((t: any) => t.attributes?.name),
        pineappleOnPizza: m.pineappleOnPizza ?? null,
        startDate: m.startDate || null,
        tShirtFit: null,
        tShirtSize: null,
        tShirtAdditionalInfo: null,
    }))

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(baseMembers)

    useEffect(() => {
        const fetchTShirtData = async () => {
            const token = await getJwt()
            if (!token) return
            try {
                const query = qs.stringify(
                    {
                        populate: { tShirt: true },
                        filters: { teams: { id: { $notNull: true } } },
                        pagination: { pageSize: 300 },
                        fields: ['id'],
                    },
                    { encodeValuesOnly: true }
                )
                const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                if (!res.ok) return
                const { data } = await res.json()
                if (!data) return
                const tShirtMap = new Map<
                    number,
                    { fit: string | null; size: string | null; additionalInfo: string | null }
                >()
                for (const profile of data) {
                    if (profile.attributes?.tShirt) {
                        tShirtMap.set(profile.id, profile.attributes.tShirt)
                    }
                }
                setTeamMembers((prev) =>
                    prev.map((m) => {
                        const tShirt = tShirtMap.get(m.id)
                        if (!tShirt) return m
                        return {
                            ...m,
                            tShirtFit: tShirt.fit || null,
                            tShirtSize: tShirt.size || null,
                            tShirtAdditionalInfo: tShirt.additionalInfo || null,
                        }
                    })
                )
            } catch (err) {
                console.error('Failed to fetch t-shirt data', err)
            }
        }
        fetchTShirtData()
    }, [])

    const updateLocation = async (profileId: number, location: string) => {
        const token = await getJwt()
        if (!token) return

        const member = teamMembers.find((m) => m.id === profileId)
        const name = [member?.firstName, member?.lastName].filter(Boolean).join(' ') || `#${profileId}`

        setTeamMembers((prev) => prev.map((m) => (m.id === profileId ? { ...m, location } : m)))

        try {
            const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${profileId}`, {
                method: 'PUT',
                body: JSON.stringify({ data: { location } }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.ok) {
                console.log(`%c✓ Saved location for ${name}: "${location}"`, 'color: #22c55e; font-weight: bold')
            } else {
                console.log(
                    `%c✗ Failed to save location for ${name} (${res.status})`,
                    'color: #ef4444; font-weight: bold'
                )
            }
        } catch (err) {
            console.log(`%c✗ Network error saving location for ${name}`, 'color: #ef4444; font-weight: bold', err)
        }
    }

    return { teamMembers, loading: false, updateLocation }
}
