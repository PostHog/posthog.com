import CommunityLayout from 'components/Community/Layout'
import { topicIcons } from 'components/Questions/TopicsTable'
import { graphql, useStaticQuery } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Markdown from 'components/Squeak/components/Markdown'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import groupBy from 'lodash.groupby'
import get from 'lodash.get'
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
                <Listbox.Button className="py-2 px-4 bg-white dark:bg-gray-accent-dark rounded-md text-left shadow-md flex justify-between items-center font-semibold text-sm">
                    {({ value }) => (
                        <>
                            <span>{value.label}</span>
                            <Chevron className="w-2.5 ml-2 opacity-50" />
                        </>
                    )}
                </Listbox.Button>
                <Listbox.Options className="absolute min-w-full shadow-md bg-white dark:bg-gray-accent-dark list-none m-0 p-0 rounded-md mt-1 z-20 grid divide-y divide-gray-accent-light/50">
                    {values.map((value) => (
                        <Listbox.Option key={value.label} value={value} as={React.Fragment}>
                            {({ selected }) => (
                                <li
                                    className={`py-2 px-4 text-sm cursor-pointer hover:bg-gray-accent-light/40 dark:hover:bg-gray-accent-light/20 transition-colors whitespace-nowrap ${
                                        selected ? 'bg-gray-accent-light/80 dark:bg-gray-accent-light/40' : ''
                                    }`}
                                >
                                    {value.label}
                                </li>
                            )}
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
                    field
                }
                types: group(field: type) {
                    label: fieldValue
                    value: fieldValue
                    field
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

    const handleChange = (key, { value }, field) => {
        const newFilters = { ...filters }
        if (value === null) {
            delete newFilters[key]
        } else {
            newFilters[key] = { value, field }
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
                          const { value, field } = filters[filter]
                          return get(change, field) === value
                      })
                  )
        setChanges(newChanges)
    }, [filters])

    return (
        <CommunityLayout title="Changelog" tableOfContents={tableOfContents}>
            <section className="mb-12 flex justify-between xl:items-center xl:flex-row flex-col xl:space-y-0 space-y-4">
                <div>
                    <h1 className="m-0 text-3xl">Changelog</h1>
                    <p className="m-0 mt-2">
                        <em>"All the updates that are fit to print"</em>
                    </p>
                </div>
                <div className="flex space-x-2 items-center">
                    {Object.keys(filterOptions).map((filter) => {
                        const { field } = filterOptions[filter][0]
                        return (
                            <Select
                                key={filter}
                                onChange={(value) => handleChange(filter, value, field)}
                                values={[{ label: `All ${filter}`, value: null }, ...filterOptions[filter]]}
                            />
                        )
                    })}
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
                                {nodes.map(({ description, media, topic, team, title, cta }) => {
                                    const topicName = topic?.data?.attributes.label
                                    const teamName = team?.data?.attributes?.name
                                    const mediaURL = media?.data?.attributes?.url
                                    const Icon = topicIcons[topicName?.toLowerCase()]
                                    return (
                                        <li key={title}>
                                            {topicName && (
                                                <p className="m-0 font-bold flex space-x-2 mb-3 opacity-80">
                                                    {Icon && <Icon className="w-5" />}
                                                    <span>{topicName}</span>
                                                </p>
                                            )}
                                            <h3 className="mt-0 mb-1">{title}</h3>
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
                                                <CallToAction type="secondary" size="sm" to={cta.url}>
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
