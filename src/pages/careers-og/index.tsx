import React, { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import ScrollArea from 'components/RadixUI/ScrollArea'

const query = graphql`
    query CareersOGJobListings {
        allAshbyJobPosting(filter: { isListed: { eq: true } }) {
            jobs: nodes {
                fields {
                    title
                    slug
                    locations
                }
                parent {
                    ... on AshbyJob {
                        customFields {
                            value
                            title
                        }
                    }
                }
                departmentName
            }
        }
        allTeams: allSqueakTeam {
            nodes {
                name
            }
        }
    }
`

// Custom ordering for role groupings
const roleGroupingOrder = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations']

const hideTeamsByJob = ['Technical ex-founder', 'Speculative application']

const columns = [
    { name: 'Job Title', width: 'minmax(250px,1.5fr)', align: 'left' as const },
    { name: 'Team(s)', width: 'minmax(150px,1fr)', align: 'left' as const },
    { name: 'Timezone(s)', width: 'minmax(150px,1fr)', align: 'left' as const },
]

export default function CareersOG(): JSX.Element {
    const {
        allAshbyJobPosting: { jobs: originalJobs },
        allTeams: { nodes: allTeams },
    } = useStaticQuery(query)

    const jobGroups = useMemo(() => {
        // Group jobs by role grouping
        const groups: { [key: string]: any[] } = {}

        originalJobs.forEach((job: any) => {
            const roleGroupingField = job.parent.customFields.find(
                (field: { title: string }) => field.title === 'Role grouping'
            )
            const groupName = roleGroupingField?.value || 'Other'

            if (!groups[groupName]) {
                groups[groupName] = []
            }
            groups[groupName].push(job)
        })

        // Sort groups according to custom order
        const sortedGroupNames = Object.keys(groups).sort((a, b) => {
            if (a === 'Other') return 1
            if (b === 'Other') return -1

            const aIndex = roleGroupingOrder.indexOf(a)
            const bIndex = roleGroupingOrder.indexOf(b)

            if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex
            }
            if (aIndex !== -1) return -1
            if (bIndex !== -1) return 1
            return a.localeCompare(b)
        })

        // Create groups with formatted job rows
        const formattedGroups: { name: string; rows: any[] }[] = []

        sortedGroupNames.forEach((groupName) => {
            const groupJobs = [...groups[groupName]]

            // Custom sorting within groups
            const productEngineerIndex = groupJobs.findIndex((job: any) => job.fields.title === 'Product Engineer')
            if (productEngineerIndex !== -1) {
                const [productEngineerJob] = groupJobs.splice(productEngineerIndex, 1)
                groupJobs.unshift(productEngineerJob)
            }

            const speculativeIndex = groupJobs.findIndex((job: any) => job.fields.title === 'Speculative application')
            if (speculativeIndex !== -1) {
                const [speculativeJob] = groupJobs.splice(speculativeIndex, 1)
                groupJobs.push(speculativeJob)
            }

            // Create rows for this group
            const groupRows = groupJobs.map((job: any) => {
                const teamsField = job.parent.customFields.find((field: { title: string }) => field.title === 'Teams')
                const teams = teamsField ? JSON.parse(teamsField.value) : []
                const validTeams = teams.filter((teamName: string) =>
                    allTeams.some((team: any) => team.name.toLowerCase() === teamName.toLowerCase())
                )

                const timezoneField = job.parent.customFields.find(
                    (field: { title: string }) => field.title === 'Timezone(s)'
                )

                // Prepare location string for potential future use
                const locationString = `Remote${
                    job.fields.locations?.length > 0 ? ` (${job.fields.locations.join(', ')})` : ''
                }`

                return {
                    key: `${job.fields.title}-${groupName}`,
                    cells: [
                        {
                            content: (
                                <>
                                    {job.fields.title}
                                    {/* {' - ' + locationString} */}
                                </>
                            ),
                            className: 'font-semibold',
                        },
                        {
                            content: hideTeamsByJob.includes(job.fields.title)
                                ? '-'
                                : validTeams.length > 1
                                ? 'Multiple teams'
                                : validTeams[0] || '-',
                            className: 'text-sm',
                        },
                        {
                            content: timezoneField?.value || '-',
                            className: 'text-sm',
                        },
                    ],
                }
            })

            formattedGroups.push({
                name: groupName,
                rows: groupRows,
            })
        })

        return formattedGroups
    }, [originalJobs, allTeams])

    const totalJobs = useMemo(() => {
        return jobGroups.reduce((sum, group) => sum + group.rows.length, 0)
    }, [jobGroups])

    return (
        <>
            <SEO title="Careers @ PostHog" description="PostHog job opportunities" />
            <Editor
                title="roles"
                type="mdx"
                slug="/careers-og"
                bookmark={{
                    title: 'Careers OG',
                    description: 'PostHog open positions',
                }}
            >
                <ScrollArea>
                    <h2 className="!mt-0 mb-4">
                        our small teams are looking to add{' '}
                        <strong className="whitespace-nowrap">{totalJobs} team members</strong>
                    </h2>
                    {jobGroups.map((group) => (
                        <div key={group.name} className="mb-6">
                            <h3 className="text-lg font-bold mb-2">{group.name}</h3>
                            <OSTable columns={columns} rows={group.rows} rowAlignment="top" size="sm" />
                        </div>
                    ))}
                </ScrollArea>
            </Editor>
        </>
    )
}
