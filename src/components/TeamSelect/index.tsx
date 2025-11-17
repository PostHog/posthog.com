import { OSSelect } from 'components/OSForm'
import React, { useEffect, useState } from 'react'

export default function TeamSelect({ value, onChange }) {
    const [teams, setTeams] = useState([])
    useEffect(() => {
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?populate=*&pagination[limit]=100`)
            .then((res) => res.json())
            .then(({ data }) => {
                setTeams(data)
            })
    }, [])

    return (
        <OSSelect
            label="Team"
            direction="column"
            value={(teams.includes(value) ? value : teams.find((team) => team.id === value?.id)) || {}}
            onChange={onChange}
            options={teams.map((team) => ({ label: team.attributes.name, value: team }))}
            placeholder="Team"
            searchable={true}
            searchPlaceholder="Search teams..."
        />
    )
}
