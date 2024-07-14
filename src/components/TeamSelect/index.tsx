import Select from 'components/Select'
import React, { useEffect, useState } from 'react'

export default function TeamSelect({ value, onChange }) {
    const [teams, setTeams] = useState([])
    useEffect(() => {
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?populate=*`)
            .then((res) => res.json())
            .then(({ data }) => {
                setTeams(data)
            })
    }, [])

    return (
        <Select
            value={value && (teams.includes(value) ? value : teams.find((team) => team.id === value.id))}
            onChange={onChange}
            options={teams.map((team) => ({ label: team.attributes.name, value: team }))}
            placeholder="Team"
        />
    )
}
