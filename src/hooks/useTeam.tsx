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
            publicationState: 'preview',
            populate: [
                'profiles.avatar',
                'profiles.leadTeams.name',
                'leadProfiles',
                'crest',
                'crestOptions',
                'teamImage.image',
            ],
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
    }, [])

    return { loading, fetchTeam, team, addTeamMember, removeTeamMember, handleTeamLead, updateDescription, updateTeam }
}
