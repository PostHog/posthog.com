import { RightArrow } from 'components/Icons/Icons'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

interface OpenRoleType {
    title: string
    url: string
}

interface DepartmentType {
    title: string
    openRoles: [OpenRoleType]
}

export default function WorkableOpenRoles({ department = '' }: { department?: string }) {
    const data = useStaticQuery(query)
    const departments = data?.allJobs?.departments
    // In order to show open roles, a valid Workable API key
    // must be added as an environment variable WORKABLE_API_KEY.
    // If no Workable API key is found, this component shows nothing
    return (
        <ul className="list-none p-0 m-0">
            {(department
                ? departments.filter(({ title }: { title: string }) => title.toLowerCase() === department.toLowerCase())
                : departments
            ).map((department: DepartmentType) => {
                const { title, openRoles } = department
                return (
                    <li key={title}>
                        <h3>{title}</h3>
                        <ul className="list-none p-0 m-0 mt-4 mb-6">
                            {openRoles.map((role) => {
                                const { title, url } = role
                                return (
                                    <li
                                        className="border border-dashed border-gray-accent-light even:border-t-0 group"
                                        key={title}
                                    >
                                        <a
                                            className="px-4 py-3 text-base text-primary hover:text-primary font-bold flex justify-between"
                                            href={url}
                                        >
                                            <span>{title}</span>
                                            <RightArrow className="w-[24px] h-[24px] opacity-50 group-hover:opacity-100 transition-opacity bounce" />
                                        </a>
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
        allJobs {
            departments: group(field: department) {
                title: fieldValue
                openRoles: nodes {
                    url
                    title
                }
            }
        }
    }
`
