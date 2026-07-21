import React from 'react'
import AutosizeInput from 'react-input-autosize'
import { normalizeSlug } from './utils'

const AutosizeInputComponent = AutosizeInput as any

export default function TeamName({
    teamName,
    handleChange,
    onBlur,
    setFieldValue,
    values,
    editing,
    touched,
    errors,
}: {
    teamName: string
    handleChange: (e: React.ChangeEvent<any>) => void
    onBlur?: (e: React.FocusEvent<any>) => void
    setFieldValue: (field: string, value: any) => void
    values: any
    editing: boolean
    touched?: any
    errors?: any
}): JSX.Element {
    const handleNameBlur = (e: React.FocusEvent<any>) => {
        onBlur?.(e)
        if ((values.slug || '').trim()) return
        if (!(values.name || '').trim()) return
        setFieldValue('slug', normalizeSlug(values.name))
    }

    return (
        <div className="mb-2">
            {editing ? (
                <div>
                    <div className="font-bold flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <AutosizeInputComponent
                                inputClassName="p-2 rounded-md bg-white dark:bg-accent-dark border border-input"
                                placeholder="Team name"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleNameBlur}
                                value={values.name}
                            />
                            <span>Team</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="text-secondary font-normal whitespace-nowrap">/teams/</span>
                            <div className="relative w-full max-w-xs">
                                {touched?.slug && typeof errors?.slug === 'string' && (
                                    <p className="m-0 absolute -top-6 left-0 text-sm text-red font-normal whitespace-nowrap">
                                        {errors.slug}
                                    </p>
                                )}
                                <input
                                    name="slug"
                                    value={values.slug || ''}
                                    onChange={handleChange}
                                    onBlur={onBlur}
                                    placeholder="slug"
                                    className="w-full p-2 rounded-md bg-white dark:bg-accent-dark border border-input font-normal"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className="m-0">{teamName} Team</h1>
            )}
        </div>
    )
}
