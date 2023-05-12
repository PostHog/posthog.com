import CommunityLayout from 'components/Community/Layout'
import { topicIcons } from 'components/Questions/TopicsTable'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Markdown from 'components/Squeak/components/Markdown'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import groupBy from 'lodash.groupby'
import slugify from 'slugify'
import { Listbox } from '@headlessui/react'
import { Chevron } from 'components/Icons'

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const Select = ({ onChange, values }) => {
    const defaultValue = values[0]
    return (
        <div className="relative">
            <Listbox onChange={onChange} defaultValue={defaultValue}>
                <Listbox.Button className="py-2 px-4 bg-white rounded-md w-[180px] text-left shadow-md flex justify-between items-center font-semibold">
                    {({ value }) => (
                        <>
                            <span>{value.label}</span>
                            <Chevron className="w-2.5" />
                        </>
                    )}
                </Listbox.Button>
                <Listbox.Options className="absolute w-full shadow-md bg-white list-none m-0 p-0 rounded-md mt-1 z-20 grid divide-y divide-gray-accent-light/50">
                    {values.map((value) => (
                        <Listbox.Option
                            className="py-2 px-4 cursor-pointer hover:bg-gray-accent/50 transition-colors"
                            key={value.label}
                            value={value}
                            as="li"
                        >
                            {({ active, selected }) => <span>{value.label}</span>}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

export default function Changelog() {
    const { allChange, filterOptions } = useStaticQuery(graphql`
        {
            allChange(sort: { fields: date, order: DESC }) {
                nodes {
                    date
                    description
                    media {
                        data {
                            attributes {
                                url
                                mime
                            }
                        }
                    }
                    topic {
                        data {
                            attributes {
                                label
                            }
                        }
                    }
                    team {
                        data {
                            attributes {
                                name
                            }
                        }
                    }
                    cta {
                        url
                        label
                    }
                    title
                    type
                }
            }
            filterOptions: allChange {
                topics: group(field: topic___data___attributes___label) {
                    label: fieldValue
                    value: fieldValue
                }
                teams: group(field: team___data___attributes___name) {
                    label: fieldValue
                    value: fieldValue
                }
            }
        }
    `)

    const [changes, setChanges] = useState(allChange.nodes)
    const [filters, setFilters] = useState({})

    const changesByMonth = groupBy(changes, (node) => {
        const month = new Date(node.date).getMonth()
        return months[month]
    })
    const tableOfContents = Object.keys(changesByMonth).map((month) => ({ url: month, value: month, depth: 0 }))

    const handleChange = (key, { value }, match) => {
        const newFilters = { ...filters }
        if (value === null) {
            delete newFilters[key]
        } else {
            newFilters[key] = { value, match }
        }
        setFilters(newFilters)
    }

    useEffect(() => {
        const filterKeys = Object.keys(filters)
        const newChanges =
            filterKeys.length <= 0
                ? allChange.nodes
                : allChange.nodes.filter((change) =>
                      filterKeys.every((filter) => {
                          const { value, match } = filters[filter]
                          return change[filter]?.data?.attributes?.[match] === value
                      })
                  )
        setChanges(newChanges)
    }, [filters])

    return (
        <CommunityLayout title="Changelog" tableOfContents={tableOfContents}>
            <section className="mb-12 flex justify-between items-center">
                <div>
                    <h1 className="m-0 text-3xl">Changelog</h1>
                    <p className="m-0 mt-2">Here's a history of everything we've built</p>
                </div>
                <div className="flex space-x-2 items-center">
                    <Select
                        onChange={(value) => handleChange('topic', value, 'label')}
                        values={[{ label: `All topics`, value: null }, ...filterOptions.topics]}
                    />
                    <Select
                        onChange={(value) => handleChange('team', value, 'name')}
                        values={[{ label: `All teams`, value: null }, ...filterOptions.teams]}
                    />
                </div>
            </section>
            <section className="grid gap-y-12">
                {Object.keys(changesByMonth).map((month) => {
                    const nodes = changesByMonth[month]
                    return (
                        <div key={month} id={slugify(month)}>
                            <h2 className="pb-2 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark mb-8 text-2xl">
                                {month}
                            </h2>
                            <ul className="list-none m-0 p-0 grid gap-y-12">
                                {nodes.map(({ description, media, topic, team, title, type, cta, date }) => {
                                    const topicName = topic?.data?.attributes.label
                                    const teamName = team?.data?.attributes?.name
                                    const mediaURL = media?.data?.attributes?.url
                                    const Icon = topicIcons[topicName?.toLowerCase()]
                                    const Title = cta ? Link : 'span'
                                    return (
                                        <li key={title}>
                                            {topicName && (
                                                <p className="m-0 font-bold flex space-x-2 mb-3 opacity-80">
                                                    {Icon && <Icon className="w-5" />}
                                                    <span>{topicName}</span>
                                                </p>
                                            )}
                                            <h3 className="mt-0 mb-1">
                                                <Title {...(cta ? { to: cta.url } : null)}>{title}</Title>
                                            </h3>
                                            {teamName && (
                                                <p className="m-0 text-sm opacity-60 font-semibold">{teamName} Team</p>
                                            )}
                                            {mediaURL && (
                                                <div className="my-4">
                                                    {media?.data?.attributes?.mime === 'video/mp4' ? (
                                                        <video
                                                            className="w-full"
                                                            src={mediaURL}
                                                            autoPlay
                                                            loop
                                                            muted
                                                            playsInline
                                                        />
                                                    ) : (
                                                        <img src={mediaURL} className="w-full" />
                                                    )}
                                                </div>
                                            )}
                                            <div className="mt-2">
                                                <Markdown>{description}</Markdown>
                                            </div>
                                            {cta && (
                                                <CallToAction type="secondary" to={cta.url}>
                                                    {cta.label}
                                                </CallToAction>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })}
            </section>
        </CommunityLayout>
    )
}
