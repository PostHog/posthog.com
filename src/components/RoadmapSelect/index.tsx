import React, { useEffect, useState } from 'react'
import qs from 'qs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Select from 'components/Select'
dayjs.extend(relativeTime)

type RoadmapOptions = {
    teamID: number
    onChange: (value: number) => void
    value: number | null
}

export default function RoadmapSelect({ teamID, onChange, value }: RoadmapOptions): JSX.Element {
    const [roadmaps, setRoadmaps] = useState([])

    useEffect(() => {
        const query = qs.stringify(
            {
                sort: ['updatedAt:desc'],
                filters: {
                    teams: {
                        id: {
                            $eq: teamID,
                        },
                    },
                    complete: {
                        $ne: true,
                    },
                    projectedCompletion: {
                        $notNull: true,
                    },
                },
            },
            { encodeValuesOnly: true }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps?${query}`)
            .then((res) => res.json())
            .then(({ data }) => {
                setRoadmaps(
                    data.map(({ attributes: { title, updatedAt }, id }) => ({
                        value: id,
                        label: title,
                        subtext: `Last updated ${dayjs(updatedAt).fromNow()}`,
                    }))
                )
            })
    }, [])

    return <Select value={value} placeholder="Select a roadmap item" onChange={onChange} options={roadmaps} />
}
