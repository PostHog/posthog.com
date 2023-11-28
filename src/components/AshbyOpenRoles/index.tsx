import { RightArrow } from 'components/Icons/Icons'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

interface OpenRoleType {
    fields: {
        title: string
        slug: string
    }
    externalLink: string
    departmentName: string
}

interface DepartmentType {
    title: string
}

export default function AshbyOpenRoles() {
    const {
        allAshbyJobPosting: { departments, jobs },
    } = useStaticQuery(query)
    // In order to show open roles, a valid Ashby API key
    // must be added as an environment variable ASHBY_API_KEY.
    // If no Ashby API key is found, this component shows nothing
    return (
        <ul className="list-none p-0 m-0">
            {departments.map((department: DepartmentType) => {
                const { title } = department
                return (
                    <li key={title}>
                        <h3>{title}</h3>
                        <ul className="list-none p-0 m-0 mt-4 mb-6 divide divide-y divide-light dark:divide-dark">
                            {jobs
                                .filter((job: OpenRoleType) => job.departmentName === title)
                                .map((job: OpenRoleType) => {
                                    const {
                                        fields: { title, slug },
                                        parent,
                                    } = job
                                    const team = parent?.customFields?.find(({ title }) => title === 'Team')?.value
                                    const [jobTitle] = title.split(' - ')
                                    return (
                                        <li className="" key={title}>
                                            <Link
                                                className="px-4 py-3 text-base -mb-1 border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] hover:bg-light dark:hover:bg-dark active:translate-y-[1px] active:transition-all rounded font-bold flex justify-between"
                                                to={slug}
                                            >
                                                <div>
                                                    <div>{jobTitle}</div>
                                                    {team && (
                                                        <div className="text-sm font-normal opacity-70 text-black dark:text-white">
                                                            {team}
                                                        </div>
                                                    )}
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

const query = graphql`
    query OpenRoles {
        allAshbyJobPosting(filter: { isListed: { eq: true } }) {
            jobs: nodes {
                fields {
                    title
                    slug
                }
                parent {
                    ... on AshbyJob {
                        customFields {
                            value
                            title
                        }
                    }
                }
                externalLink
                departmentName
            }
            departments: group(field: departmentName) {
                title: fieldValue
            }
        }
    }
`
