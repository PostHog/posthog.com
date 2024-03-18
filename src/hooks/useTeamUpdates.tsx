import { useEffect, useState } from 'react'
import qs from 'qs'

export type Update = {
    thingOfTheWeek: boolean
    roadmap: boolean
    roadmapID: number | null
    question: number
    team: number
}

export default function useTeamUpdates({ teamName, filters }: { teamName: string; filters?: any }) {
    const [teamID, setTeamID] = useState()
    const [updates, setUpdates] = useState([])
    const fetchUpdates = async () => {
        const {
            data: [{ id: teamID }],
        } = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?${qs.stringify(
                {
                    filters: {
                        name: {
                            $eqi: teamName,
                        },
                    },
                },
                { encodeValuesOnly: true }
            )}`
        ).then((res) => res.json())
        setTeamID(teamID)
        const { data } = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/team-updates?${qs.stringify(
                {
                    populate: ['question.id', 'roadmap.id', 'team.id'],
                    sort: ['createdAt:desc'],
                    filters: {
                        $and: [
                            {
                                team: {
                                    id: {
                                        $eq: teamID,
                                    },
                                },
                            },
                            ...[filters || {}],
                        ],
                    },
                },
                { encodeValuesOnly: true }
            )}`
        ).then((res) => res.json())

        const updates = data?.map(({ attributes: { thingOfTheWeek, roadmap, question, team } }) => {
            return {
                thingOfTheWeek,
                roadmap: roadmap?.data?.id,
                question: question?.data.id,
                team: team?.data?.id,
            }
        })
        setUpdates(updates ?? [])
    }

    useEffect(() => {
        fetchUpdates()
    }, [])

    return { updates, teamID }
}
