import { RightArrow } from 'components/Icons/Icons'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import slugify from 'slugify'

interface OpenRoleType {
    title: string
    externalLink: string
    departmentName: string
}

interface DepartmentType {
    title: string
}

export default function AshbyOpenRoles() {
    const {
        allAshbyJob: { departments, jobs },
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
                        <ul className="list-none p-0 m-0 mt-4 mb-6 border border-dashed border-gray-accent-light border-b-0">
                            {jobs
                                .filter((job: OpenRoleType) => job.departmentName === title)
                                .map((job: OpenRoleType) => {
                                    const { title } = job
                                    return (
                                        <li className="border-b border-dashed border-gray-accent-light" key={title}>
                                            <Link
                                                className="px-4 py-3 text-lg text-primary hover:text-primary font-bold flex justify-between"
                                                to={`/careers/${slugify(title, { lower: true })}`}
                                            >
                                                <span>{title}</span>
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
        allAshbyJob(filter: { isListed: { eq: true } }) {
            jobs: nodes {
                title
                externalLink
                departmentName
            }
            departments: group(field: departmentName) {
                title: fieldValue
            }
        }
    }
`
