import { useEffect, useState } from 'react'
import { useUser } from './useUser'
import qs from 'qs'

const teamQuery = (slug: string) =>
    qs.stringify(
        {
            filters: {
                slug: {
                    $eqi: slug,
                },
            },
            publicationState: 'preview',
            populate: {
                profiles: {
                    filters: {
                        startDate: {
                            $lte: new Date(),
                        },
                    },
                    populate: {
                        avatar: true,
                        leadTeams: {
                            populate: {
                                name: true,
                            },
                        },
                    },
                },
                leadProfiles: true,
                crest: true,
                crestOptions: true,
                teamImage: {
                    populate: {
                        image: true,
                    },
                },
                miniCrest: true,
            },
        },
        { encodeValuesOnly: true }
    )

export default function useTeam({ slug }: { slug: string }) {
    const { getJwt } = useUser()
    const [team, setTeam] = useState()
    const [loading, setLoading] = useState(true)

    const fetchTeam = async () => {
        if (!slug) return
        return fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?${teamQuery(slug)}`)
            .then((res) => res.json())
            .then(({ data }) => {
                setTeam(data?.[0] ?? [])
            })
    }

    const addTeamMember = async (profileID: number) => {
        const jwt = await getJwt()
        const body = JSON.stringify({
            data: {
                profiles: {
                    connect: [profileID],
                },
            },
        })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams/${team?.id}`, {
            method: 'PUT',
            body,
            headers: {
                Authorization: `Bearer ${jwt}`,
                'content-type': 'application/json',
            },
        })
        fetchTeam()
    }

    const removeTeamMember = async (profileID: number) => {
        const jwt = await getJwt()
        const body = JSON.stringify({
            data: {
                profiles: {
                    disconnect: [profileID],
                },
            },
        })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams/${team?.id}`, {
            method: 'PUT',
            body,
            headers: {
                Authorization: `Bearer ${jwt}`,
                'content-type': 'application/json',
            },
        })
        fetchTeam()
    }

    const handleTeamLead = async (profileID: number, remove: boolean) => {
        const jwt = await getJwt()
        const body = JSON.stringify({
            data: {
                leadProfiles: { ...(remove ? { disconnect: [profileID] } : { connect: [profileID] }) },
            },
        })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams/${team?.id}`, {
            method: 'PUT',
            body,
            headers: {
                Authorization: `Bearer ${jwt}`,
                'content-type': 'application/json',
            },
        })
        fetchTeam()
    }

    const updateDescription = async (description: string) => {
        const jwt = await getJwt()
        const body = JSON.stringify({
            data: {
                description,
            },
        })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams/${team?.id}`, {
            method: 'PUT',
            body,
            headers: {
                Authorization: `Bearer ${jwt}`,
                'content-type': 'application/json',
            },
        })
        fetchTeam()
    }

    const updateTeam = async (update: any) => {
        const jwt = await getJwt()
        const body = JSON.stringify({ data: { ...update } })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams/${team?.id}`, {
            headers: {
                Authorization: `Bearer ${jwt}`,
                'content-type': 'application/json',
            },
            method: 'PUT',
            body,
        })
        fetchTeam()
    }

    useEffect(() => {
        fetchTeam().then(() => setLoading(false))
    }, [slug])

    return {
        loading,
        fetchTeam,
        team,
        addTeamMember,
        removeTeamMember,
        handleTeamLead,
        updateDescription,
        updateTeam,
    }
}
