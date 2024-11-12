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
    teamImage: any
    hasInProgress: boolean
    editing: boolean
    setFieldValue: (field: string, value: any) => void
    values: any
    handleChange: (e: React.ChangeEvent<any>) => void
    loading: boolean
}): JSX.Element {
    return (
        <Section className="mb-6">
            <div className="flex flex-col md:flex-row space-x-4 items-center">
                {loading ? (
                    <div className="size-[300px] bg-accent dark:bg-accent-dark rounded" />
                ) : (
                    <Crest teamName={teamName} editing={editing} setFieldValue={setFieldValue} values={values} />
                )}
                <div className="max-w-xl w-full">
                    <Link
                        to="/teams"
                        className="-ml-2 mb-1 inline-flex items-center gap-1 text-sm text-primary/50 dark:text-primary-dark/50 hover:text-primary dark:hover:text-primary-dark relative px-2 pt-1.5 pb-1 rounded hover:bg-light/50 hover:dark:bg-dark/50 border border-b-3 border-transparent md:hover:border-light dark:md:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                    >
                        <IconArrowLeft className="size-5" />
                        <span>Teams</span>
                    </Link>
                    {loading ? (
                        <div className="h-8 w-full bg-accent dark:bg-accent-dark rounded" />
                    ) : (
                        <TeamName teamName={teamName} handleChange={handleChange} values={values} editing={editing} />
                    )}
                    {loading ? (
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-full bg-accent dark:bg-accent-dark rounded" />
                            <div className="h-4 w-full bg-accent dark:bg-accent-dark rounded" />
                            <div className="h-4 w-2/3 bg-accent dark:bg-accent-dark rounded" />
                        </div>
                    ) : (
                        <Description
                            description={description}
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
                    <div className="max-w-sm w-full aspect-video bg-accent dark:bg-accent-dark rounded rotate-2" />
                ) : (
                    <TeamImage values={values} setFieldValue={setFieldValue} teamImage={teamImage} editing={editing} />
                )}
            </div>
        </Section>
    )
}
