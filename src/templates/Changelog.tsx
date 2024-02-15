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
import { navigate } from 'gatsby'
import UpdateWrapper from 'components/Roadmap/UpdateWrapper'
import { Image, Video, Placeholder } from 'cloudinary-react'

const Select = ({ onChange, values, ...other }) => {
    const defaultValue = values[0]
    return (
        <div className="relative">
            <Listbox onChange={onChange} defaultValue={defaultValue}>
                <Listbox.Button className="py-2 px-4 bg-accent dark:bg-accent-dark rounded text-left border border-light dark:border-dark flex justify-between items-center font-semibold text-sm">
                    {({ value }) => (
                        <>
                            <span>{other.value || value.label}</span>
                            <Chevron className="w-2.5 ml-2 opacity-50" />
                        </>
                    )}
                </Listbox.Button>
                <Listbox.Options className="absolute right-0 min-w-full shadow-md bg-white dark:bg-accent-dark border border-light dark:border-dark list-none m-0 p-0 rounded-md mt-1 z-20 grid divide-y divide-light dark:divide-dark">
                    {values.map((value) => (
                        <Listbox.Option key={value.label} value={value} as={React.Fragment}>
                            {({ selected }) => {
                                return (
                                    <li
                                        className={`!m-0 py-2 px-4 !text-sm cursor-pointer hover:bg-accent dark:hover:bg-accent-dark transition-colors whitespace-nowrap ${
                                            (other.value ? value.label === other.value : selected) ? 'font-bold' : ''
                                        }`}
                                    >
                                        {value.label}
                                    </li>
                                )
                            }}
                        </Listbox.Option>
                    ))}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

export default function Changelog({ data: { allRoadmap, filterOptions }, pageContext }) {
    const [changes, setChanges] = useState(allRoadmap.nodes)
    const [filters, setFilters] = useState({})

    const changesByDate = groupBy(changes, (node) => {
        const date = new Date(node.date)
        return dayjs().month(date.getMonth()).year(date.getFullYear())
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
            <section className="mb-4 flex justify-between xl:items-center xl:flex-row flex-col xl:space-y-0 space-y-4">
                <div>
                    <h1 className="m-0 text-3xl">Changelog</h1>
                    <p className="m-0 mt-2">
                        <em>"All the updates that are fit to print"</em>
                    </p>
                </div>
                <div className="flex space-x-2 items-center relative z-50">
                    <Select
                        value={pageContext.year}
                        onChange={({ value }) => navigate(value)}
                        values={[
                            { label: 2024, value: '/changelog/2024' },
                            { label: 2023, value: '/changelog/2023' },
                            { label: 2022, value: '/changelog/2022' },
                            { label: 2021, value: '/changelog/2021' },
                            { label: 2020, value: '/changelog/2020' },
                        ]}
                    />
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
            <section className="grid article-content">
                {Object.keys(changesByDate).map((date) => {
                    const nodes = changesByDate[date]
                    return (
                        <div key={date} id={slugify(dayjs(date).format('MMMM'))} className="flex gap-4">
                            <div className="shrink-0 basis-[50px] relative after:w-[1px] after:absolute after:top-0 after:bottom-0 after:left-[25px] after:bg-border dark:after:bg-border-dark after:content-['']">
                                <div className="inline-flex flex-col items-center rounded bg-light dark:bg-dark border border-light dark:border-dark py-1 px-2 relative z-30">
                                    <h2 className="!text-sm font-bold uppercase !m-0">{dayjs(date).format('MMM')}</h2>
                                    <div className="text-xs font-semibold">{dayjs(date).format('YYYY')}</div>
                                </div>
                            </div>
                            <ul className="list-none m-0 p-0 grid gap-y-12 flex-1 pb-12">
                                {nodes.map(({ description, media, topic, teams, title, cta, strapiID }) => {
                                    const team = teams?.data[0]
                                    const topicName = topic?.data?.attributes.label
                                    const teamName = team?.attributes?.name
                                    const cloudinaryID = media?.data?.attributes?.provider_metadata?.public_id
                                    const { width, height } = media?.data?.attributes || {}
                                    const Icon = topicIcons[topicName?.toLowerCase()]
                                    return (
                                        <li id={slugify(title, { lower: true })} key={title}>
                                            {topicName && (
                                                <p className="font-bold flex mt-3 !-mb-2 opacity-80 relative after:absolute after:border-t after:border-light dark:after:border-dark content-[''] after:top-3 after:left-[calc(-25px_-_1rem)] after:right-0">
                                                    <span className="inline-flex space-x-2 bg-light dark:bg-dark px-2 z-20">
                                                        {Icon && <Icon className="w-5" />}
                                                        <span>{topicName}</span>
                                                    </span>
                                                </p>
                                            )}
                                            <UpdateWrapper
                                                status="complete"
                                                formClassName="mt-8"
                                                editButtonClassName="absolute bottom-0 right-0"
                                                id={strapiID}
                                            >
                                                <Heading as="h3" id={slugify(title, { lower: true })} className="m-0">
                                                    {title}
                                                </Heading>
                                                {teamName && (
                                                    <p className="m-0 text-sm opacity-60 font-semibold">
                                                        {teamName} Team
                                                    </p>
                                                )}
                                                {cloudinaryID && (
                                                    <div className="my-4">
                                                        {media?.data?.attributes?.mime === 'video/mp4' ? (
                                                            <ZoomImage>
                                                                <Video
                                                                    publicId={cloudinaryID}
                                                                    cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
                                                                    className="max-w-2xl w-full"
                                                                    autoPlay
                                                                    loop
                                                                    muted
                                                                    playsInline
                                                                    width={width}
                                                                    height={height}
                                                                />
                                                            </ZoomImage>
                                                        ) : (
                                                            <ZoomImage>
                                                                <Image
                                                                    publicId={cloudinaryID}
                                                                    cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
                                                                    loading="lazy"
                                                                    className="max-w-2xl w-full"
                                                                    width={width}
                                                                    height={height}
                                                                >
                                                                    <Placeholder />
                                                                </Image>
                                                            </ZoomImage>
                                                        )}
                                                    </div>
                                                )}
                                                <div className="mt-2">
                                                    <Markdown>{description}</Markdown>
                                                </div>
                                                {cta && (
                                                    <CallToAction type="secondary" size="md" to={cta.url}>
                                                        {cta.label}
                                                    </CallToAction>
                                                )}
                                            </UpdateWrapper>
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
                strapiID
                date
                description
                media {
                    data {
                        attributes {
                            url
                            mime
                            width
                            height
                            provider_metadata {
                                public_id
                            }
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
