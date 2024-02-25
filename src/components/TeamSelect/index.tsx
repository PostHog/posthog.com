import Select from 'components/Select'
import React, { useEffect, useState } from 'react'

export default function TeamSelect({ value, onChange }) {
    const [teams, setTeams] = useState([])
    useEffect(() => {
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams`)
            .then((res) => res.json())
            .then(({ data }) => {
                setTeams(data)
            })
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            options={teams.map(({ id, attributes }) => ({ label: attributes.name, value: id }))}
            placeholder="Team"
        />
    )
}
