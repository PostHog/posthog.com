import CommunityLayout from 'components/Community/Layout'
import { topicIcons } from 'components/Questions/TopicsTable'
import { graphql } from 'gatsby'
import React, { useEffect, useState } from 'react'
import Markdown from 'components/Squeak/components/Markdown'
import { CallToAction } from 'components/CallToAction'
import groupBy from 'lodash.groupby'
import get from 'lodash.get'
import slugify from 'slugify'
import { Listbox } from '@headlessui/react'
import { Chevron } from 'components/Icons'
import { Heading } from 'components/Heading'
import { ZoomImage } from 'components/ZoomImage'
import { companyMenu } from '../navs'
import dayjs from 'dayjs'

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
                <Listbox.Options className="absolute right-0 min-w-full shadow-md bg-white dark:bg-gray-accent-dark list-none m-0 p-0 rounded-md mt-1 z-20 grid divide-y divide-gray-accent-light/50">
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

export default function Changelog({ data: { allRoadmap, filterOptions } }) {
    const [changes, setChanges] = useState(allRoadmap.nodes)
    const [filters, setFilters] = useState({})

    const changesByDate = groupBy(changes, (node) => {
        const month = new Date(node.date).getMonth()
        return dayjs().month(month)
    })
    const tableOfContents = Object.keys(changesByDate).map((date) => {
        const month = dayjs(date).format('MMMM')
        return { url: month, value: month, depth: 0 }
    })

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
                ? allRoadmap.nodes
                : allRoadmap.nodes.filter((change) =>
                      filterKeys.every((filter) => {
                          const { value, field } = filters[filter]
                          return get(change, field) === value
                      })
                  )
        setChanges(newChanges)
    }, [filters])

    return (
        <CommunityLayout
            parent={companyMenu}
            activeInternalMenu={companyMenu.children[2]}
            title="Changelog"
            tableOfContents={tableOfContents}
        >
            <section className="mb-12 flex justify-between xl:items-center xl:flex-row flex-col xl:space-y-0 space-y-4">
                <div>
                    <h1 className="m-0 text-3xl">Changelog</h1>
                    <p className="m-0 mt-2">
                        <em>"All the updates that are fit to print"</em>
                    </p>
                </div>
                <div className="flex space-x-2 items-center">
                    {Object.keys(filterOptions).map((filter) => {
                        const { field } = filterOptions[filter][0] ?? {}
                        if (!field) return null
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
            <section className="grid">
                {Object.keys(changesByDate).map((date) => {
                    const nodes = changesByDate[date]
                    return (
                        <div key={date} id={slugify(dayjs(date).format('MMMM'))} className="flex gap-4">
                            <div className="shrink-0 basis-[50px] relative after:w-[1px] after:absolute after:top-0 after:bottom-0 after:left-[25px] after:bg-border dark:after:bg-border-dark after:content-['']">
                                <div className="inline-flex flex-col items-center rounded bg-light dark:bg-dark border border-light dark:border-dark py-1 px-2 relative z-30">
                                    <h2 className="text-sm font-bold uppercase m-0">{dayjs(date).format('MMM')}</h2>
                                    <div className="text-xs font-semibold">2023</div>
                                </div>
                            </div>
                            <ul className="list-none m-0 p-0 grid gap-y-12 flex-1 pb-12">
                                {nodes.map(({ description, media, topic, teams, title, cta }) => {
                                    const team = teams?.data[0]
                                    const topicName = topic?.data?.attributes.label
                                    const teamName = team?.attributes?.name
                                    const mediaURL = media?.data?.attributes?.url
                                    const Icon = topicIcons[topicName?.toLowerCase()]
                                    return (
                                        <li key={title}>
                                            {topicName && (
                                                <p className="font-bold flex my-3 opacity-80 relative after:absolute after:border-t after:border-light dark:after:border-dark content-[''] after:top-3 after:left-[calc(-25px_-_1rem)] after:right-0">
                                                    <span className="inline-flex space-x-2 bg-light dark:bg-dark px-2 z-20">
                                                        {Icon && <Icon className="w-5" />}
                                                        <span>{topicName}</span>
                                                    </span>
                                                </p>
                                            )}
                                            <Heading as="h3" id={slugify(title, { lower: true })} className="mt-0 mb-1">
                                                {title}
                                            </Heading>
                                            {teamName && (
                                                <p className="m-0 text-sm opacity-60 font-semibold">{teamName} Team</p>
                                            )}
                                            {mediaURL && (
                                                <div className="my-4">
                                                    {media?.data?.attributes?.mime === 'video/mp4' ? (
                                                        <ZoomImage>
                                                            <video
                                                                className="max-w-2xl w-full"
                                                                src={mediaURL}
                                                                autoPlay
                                                                loop
                                                                muted
                                                                playsInline
                                                            />
                                                        </ZoomImage>
                                                    ) : (
                                                        <ZoomImage>
                                                            <img src={mediaURL} className="max-w-2xl w-full" />
                                                        </ZoomImage>
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

export const query = graphql`
    query ChangelogQuery($year: Int!) {
        allRoadmap(sort: { fields: date, order: DESC }, filter: { year: { eq: $year }, complete: { eq: true } }) {
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
                teams {
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
        filterOptions: allRoadmap(filter: { year: { eq: $year } }) {
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
`
