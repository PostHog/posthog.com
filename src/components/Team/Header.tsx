import Section from './Section'
import React from 'react'
import Crest from './Crest'
import Link from 'components/Link'
import { IconArrowLeft } from '@posthog/icons'
import TeamName from './TeamName'
import Description from './Description'
import { CallToAction } from 'components/CallToAction'
import TeamImage from './TeamImage'

export default function Header({
    teamName,
    description,
    tagline,
    teamImage,
    hasInProgress,
    editing,
    setFieldValue,
    values,
    handleChange,
    loading,
}: {
    teamName: string
    description: string
    tagline?: string
    teamImage: any
    hasInProgress: boolean
    editing: boolean
    setFieldValue: (field: string, value: any) => void
    values: any
    handleChange: (e: React.ChangeEvent<any>) => void
    loading: boolean
}): JSX.Element {
    return (
        <>
            <div className="flex flex-col-reverse gap-4 @xl/reader-content-container:gap-4 @xl/reader-content-container:flex-row items-center p-4 @xl/reader-content-container:p-8 w-full">
                <div className="flex-1 text-center @xl/reader-content-container:text-left">
                    {loading ? (
                        <div className="h-8 w-full bg-accent rounded" />
                    ) : (
                        <TeamName teamName={teamName} handleChange={handleChange} values={values} editing={editing} />
                    )}
                    {loading ? (
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-full bg-accent rounded" />
                            <div className="h-4 w-full bg-accent rounded" />
                            <div className="h-4 w-2/3 bg-accent rounded" />
                        </div>
                    ) : (
                        <Description
                            description={description}
                            tagline={tagline}
                            handleChange={handleChange}
                            values={values}
                            editing={editing}
                        />
                    )}
                    {hasInProgress && !editing && (
                        <CallToAction type="secondary" size="md" to="#in-progress">
                            See what we're building
                        </CallToAction>
                    )}
                </div>

                {loading ? (
                    <div className="size-[300px] bg-accent rounded" />
                ) : (
                    <Crest teamName={teamName} editing={editing} setFieldValue={setFieldValue} values={values} />
                )}
            </div>
        </>
    )
}
