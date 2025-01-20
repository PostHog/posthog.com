import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default function TeamName({
    teamName,
    handleChange,
    values,
    editing,
}: {
    teamName: string
    handleChange: (e: React.ChangeEvent<any>) => void
    values: any
    editing: boolean
}): JSX.Element {
    return (
        <div className="mb-2">
            {editing ? (
                <div className="font-bold flex space-x-1 items-baseline">
                    <AutosizeInput
                        inputClassName="p-2 rounded-md bg-white dark:bg-accent-dark border border-border dark:border-dark"
                        placeholder="Team name"
                        type="text"
                        name="name"
                        onChange={handleChange}
                        value={values.name}
                    />
                    <span>Team</span>
                </div>
            ) : (
                <h1 className="m-0">{teamName} Team</h1>
            )}
        </div>
    )
}
