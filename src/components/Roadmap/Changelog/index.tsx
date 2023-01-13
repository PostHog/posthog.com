import Layout from 'components/Layout'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'
import groupBy from 'lodash.groupby'
import { SEO } from 'components/seo'
import PostLayout from 'components/PostLayout'
import Link from 'components/Link'
import Checkbox from 'components/Checkbox'
import community from 'sidebars/community.json'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface IGitHubPage {
    title: string
    html_url: string
    number: string
    closed_at: string
    reactions: {
        hooray: number
        heart: number
        eyes: number
    }
}

interface ITeam {
    name: string
}

export interface IRoadmap {
    complete: boolean
    date_completed: string
    title: string
    description: string
    team: ITeam
    githubPages: IGitHubPage[]
    projected_completion_date: string
}

function group(nodes) {
    return groupBy(
        nodes
            .filter((node: IRoadmap) => node.date_completed)
            .sort((a, b) => new Date(b.date_completed) > new Date(a.date_completed)),
        (node) =>
            `${months[new Date(node.date_completed).getUTCMonth()]} ${new Date(node.date_completed).getUTCFullYear()}`
    )
}

export default function Changelog() {
    const {
        allSqueakRoadmap: { nodes, teams, categories },
    } = useStaticQuery(query)
    const [roadmap, setRoadmap] = useState(group(nodes))
    const [filters, setFilters] = useState({})

    const handleCategoryChange = (e, type, checked) => {
        const newFilters = { ...filters }
        const { value } = e.target
        if (checked) {
            if (newFilters[type]) {
                newFilters[type].push(value)
            } else {
                newFilters[type] = [value]
            }
        } else {
            if (newFilters[type] && newFilters[type].includes(value)) {
                newFilters[type].splice(newFilters[type].indexOf(value), 1)
            }
        }
        setFilters(newFilters)
    }

    useEffect(() => {
        const newRoadmap = nodes.filter((goal) =>
            Object.keys(filters).some((filter) => filters[filter].includes(goal[filter]?.name || goal[filter]))
        )
        setRoadmap(group(newRoadmap.length > 0 ? newRoadmap : nodes))
    }, [filters])

    return (
        <Layout>
            <SEO title="PostHog Changelog" />
            <PostLayout contentWidth={'100%'} article={false} title={'Changelog'} hideSurvey menu={community}>
                <h1 className="font-bold text-5xl mb-2 lg:mt-0">Changelog</h1>
                <p className="text-black/80">Here's a history of everything we've built.</p>
                <div className="border-y border-dashed border-gray-accent-light py-4 flex space-x-6 flex-nowrap overflow-auto whitespace-nowrap scrollbar-hide">
                    <div>
                        <h5 className="m-0 mb-2">Type</h5>
                        <ul className="list-none m-0 p-0 flex space-x-4">
                            {categories.map(({ fieldValue }, index) => {
                                const checked = filters?.category?.includes(fieldValue) || false
                                return (
                                    <li key={fieldValue}>
                                        <Checkbox
                                            className="!text-sm"
                                            checked={checked}
                                            onChange={(e) => handleCategoryChange(e, 'category', !checked)}
                                            value={fieldValue}
                                            id={`category-${index}`}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div>
                        <h5 className="m-0 mb-2">Team</h5>
                        <ul className="list-none m-0 p-0 flex space-x-4">
                            {teams.map(({ fieldValue }, index) => {
                                const checked = filters?.team?.includes(fieldValue) || false
                                return (
                                    <li key={fieldValue}>
                                        <Checkbox
                                            className="!text-sm"
                                            checked={checked}
                                            onChange={(e) => handleCategoryChange(e, 'team', !checked)}
                                            value={fieldValue}
                                            id={`team-${index}`}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <ul className="list-none p-0 m-0 mt-12">
                    {Object.keys(roadmap).map((date, index) => {
                        return (
                            <li key={date}>
                                <div className="flex space-x-6">
                                    <div className="pb-8 relative">
                                        <p
                                            className={`m-0 bg-white px-2 rounded-md max-w-[60px] text-center font-semibold text-sm ${
                                                index + 1 !== Object.keys(roadmap).length
                                                    ? 'before:border before:border-gray-accent-light before:border-dashed before:h-full before:left-1/2 before:-translate-x-1/2 before:absolute before:z-[-1]'
                                                    : ''
                                            }`}
                                        >
                                            {date}
                                        </p>
                                    </div>
                                    <ul className="list-none p-0 m-0 grid gap-y-1 pb-8 ">
                                        {roadmap[date].map(({ title, githubPages, otherLinks, team }: IRoadmap) => {
                                            const url =
                                                (githubPages?.length > 0 && githubPages[0]?.html_url) ||
                                                (otherLinks?.length > 0 && otherLinks[0])
                                            return (
                                                <li key={title} className="flex items-center space-x-2">
                                                    <span className="font-semibold">
                                                        {url ? <Link to={url}>{title}</Link> : title}
                                                    </span>
                                                    {team && <span className="text-black/50">{team.name}</span>}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </PostLayout>
        </Layout>
    )
}

const query = graphql`
    {
        allSqueakRoadmap(sort: { fields: date_completed }, filter: { date_completed: { ne: null } }) {
            nodes {
                category
                complete
                date_completed
                title
                description
                team {
                    name
                }
                githubPages {
                    title
                    html_url
                    number
                    closed_at
                    reactions {
                        hooray
                        heart
                        eyes
                    }
                }
                projected_completion_date
            }
            teams: group(field: team___name) {
                fieldValue
            }
            categories: group(field: category) {
                fieldValue
            }
        }
    }
`
