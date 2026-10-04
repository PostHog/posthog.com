import { RightArrow } from 'components/Icons/Icons'
import Link from 'components/Link'
import React from 'react'
import jobsJson from '@data/people-jobs.json'
import departmentsJson from '@data/people-job-departments.json'
import type { JobDepartments, Jobs } from '~/data-layer/queries/people'

const jobs = jobsJson as Jobs
const departments = departmentsJson as JobDepartments

export default function AshbyOpenRoles(): JSX.Element {
    // In order to show open roles, a valid Ashby API key
    // must be added as an environment variable ASHBY_API_KEY.
    // If no Ashby API key is found, this component shows nothing
    return (
        <ul className="list-none p-0 m-0">
            {departments.map((title) => {
                return (
                    <li key={title}>
                        <h3>{title}</h3>
                        <ul className="list-none p-0 m-0 mt-4 mb-6 divide divide-y divide-primary">
                            {jobs
                                .filter((job) => job.departmentName === title)
                                .map((job) => {
                                    const { title, slug, customFields } = job
                                    const teams = JSON.parse(
                                        customFields.find(({ title }) => title === 'Teams')?.value || '[]'
                                    )
                                    const [jobTitle] = title.split(' - ')
                                    return (
                                        <li className="" key={title}>
                                            <Link
                                                className="px-4 py-3 text-base -mb-1 border border-b-3 border-transparent hover:border hover:translate-y-[-1px] hover:bg-light dark:hover:bg-dark active:translate-y-[1px] active:transition-all rounded font-bold flex justify-between"
                                                to={slug}
                                            >
                                                <div>
                                                    <div>{jobTitle}</div>
                                                    <div className="text-sm font-normal opacity-70 text-black dark:text-white">
                                                        {teams.length > 1 ? 'Multiple teams' : teams[0]}
                                                    </div>
                                                </div>

                                                <RightArrow className="w-[24px] h-[24px] opacity-50 group-hover:opacity-100 transition-opacity bounce" />
                                            </Link>
                                        </li>
                                    )
                                })}
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}
