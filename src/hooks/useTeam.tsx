import { useEffect, useState } from 'react'
import { useUser } from './useUser'
import qs from 'qs'

const teamQuery = (name: string) =>
    qs.stringify(
        {
            filters: {
                name: {
                    $eqi: name,
                },
            },
            populate: ['profiles.avatar', 'profiles.leadTeams.name'],
        },
        { encodeValuesOnly: true }
    )

export default function useTeam({ teamName }: { teamName: string }) {
    const { getJwt } = useUser()
    const [team, setTeam] = useState()
    const [loading, setLoading] = useState(true)

    const fetchTeam = () => {
        return fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?${teamQuery(teamName)}`)
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

    useEffect(() => {
        fetchTeam().then(() => setLoading(false))
    }, [])

    return { loading, fetchTeam, team, addTeamMember, removeTeamMember, handleTeamLead }
}
