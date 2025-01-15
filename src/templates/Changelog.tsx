import CommunityLayout from 'components/Community/Layout'
import { topicIcons } from 'components/Questions/TopicsTable'
import React, { useEffect, useMemo, useState } from 'react'
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
import { Video } from 'cloudinary-react'
import RoadmapForm from 'components/RoadmapForm'
import { useUser } from 'hooks/useUser'
import Tooltip from 'components/Tooltip'
import { IconShieldLock } from '@posthog/icons'
import { useRoadmaps } from 'hooks/useRoadmaps'
import CloudinaryImage from 'components/CloudinaryImage'
import uniqBy from 'lodash/uniqBy'

const Select = ({ onChange, values, ...other }) => {
    const defaultValue = values[0]
    return (
        <div className="relative">
            <Listbox onChange={onChange} defaultValue={defaultValue}>
                {({ open }) => (
                    <>
                        <Listbox.Button
                            className={`group py-1 px-2 hover:bg-accent dark:hover:bg-accent-dark rounded-sm text-left border hover:border-light dark:hover:border-dark flex justify-between items-center font-semibold text-sm text-primary/75 hover:text-primary/100 dark:text-primary-dark/75 dark:hover:text-primary-dark/100 relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99] ${
                                open
                                    ? 'scale-[1.02] bg-accent dark:bg-accent-dark border-light dark:border-dark text-primary/100 dark:text-primary-dark/100'
                                    : 'border-transparent'
                            }`}
                        >
                            {({ value }) => (
                                <>
                                    <span>{other.value || value.label}</span>
                                    <Chevron className="w-2.5 ml-2 opacity-30 group-hover:opacity-50" />
                                </>
                            )}
                        </Listbox.Button>
                        <Listbox.Options className="absolute right-0 min-w-full shadow-xl bg-white dark:bg-accent-dark border border-light dark:border-dark list-none m-0 p-0.5 rounded-md mt-1 z-20 grid">
                            {values.map((value) => (
                                <Listbox.Option key={value.label} value={value} as={React.Fragment}>
                                    {({ selected }) => {
                                        return (
                                            <li
                                                className={`!m-0 py-1.5 px-3 !text-sm cursor-pointer rounded-sm hover:bg-light active:bg-accent dark:hover:bg-light/10 dark:active:bg-light/5 transition-colors hover:transition-none whitespace-nowrap ${
                                                    (other.value ? value.label === other.value : selected)
                                                        ? 'font-bold'
                                                        : ''
                                                }`}
                                            >
                                                {value.label}
                                            </li>
                                        )
                                    }}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </>
                )}
            </Listbox>
        </div>
    )
}

export const Change = ({ title, teamName, media, description, cta }) => {
    return (
        <>
            <Heading as="h3" id={slugify(title, { lower: true })} className="m-0">
                {title}
            </Heading>
            {teamName && <p className="m-0 text-sm opacity-60 font-semibold">{teamName} Team</p>}
            {media?.data?.attributes?.mime === 'video/mp4' ? (
                <div className="my-4">
                    <ZoomImage>
                        <Video
                            publicId={media?.data?.attributes?.provider_metadata?.public_id}
                            cloudName={process.env.GATSBY_CLOUDINARY_CLOUD_NAME}
                            className="max-w-2xl w-full"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                    </ZoomImage>
                </div>
            ) : media?.data?.attributes?.url ? (
                <div className="my-4">
                    <ZoomImage>
                        <CloudinaryImage src={media?.data?.attributes?.url} className="w-full" width={1500} />
                    </ZoomImage>
                </div>
            ) : null}
            <div className="mt-2">
                <Markdown regularText={true}>{description}</Markdown>
            </div>
            {cta && (
                <CallToAction type="secondary" size="md" to={cta.url}>
                    {cta.label}
                </CallToAction>
            )}
        </>
    )
}

export const Skeleton = () => {
    return (
        <div className="space-y-2">
            <div className="animate-pulse bg-accent dark:bg-accent-dark h-8 w-full rounded-md" />
            <div className="animate-pulse bg-accent dark:bg-accent-dark h-44 w-full rounded-md" />
        </div>
    )
}

export default function Changelog({ pageContext }) {
    const { user } = useUser()
    const [filters, setFilters] = useState({})
    const [adding, setAdding] = useState(false)
    const [roadmaps, setRoadmaps] = useState([])
    const {
        roadmaps: initialRoadmaps,
        isLoading,
        mutate,
        hasMore,
        fetchMore,
    } = useRoadmaps({
        limit: 100,
        params: {
            sort: 'dateCompleted:desc',
            filters: {
                $and: [
                    {
                        dateCompleted: {
                            $gte: `${pageContext.year}-01-01`,
                        },
                    },
                    {
                        dateCompleted: {
                            $lt: `${pageContext.year + 1}-01-01`,
                        },
                    },
                    {
                        complete: {
                            $eq: true,
                        },
                    },
                ],
            },
        },
    })

    const filterOptions = useMemo(() => {
        return {
            topics: uniqBy(initialRoadmaps, 'attributes.topic.data.attributes.label')
                .map((roadmap) => ({
                    field: 'attributes.topic.data.attributes.label',
                    value: roadmap.attributes.topic.data?.attributes.label,
                    label: roadmap.attributes.topic.data?.attributes.label,
                }))
                .filter((topic) => topic.value),
            types: uniqBy(initialRoadmaps, 'attributes.category')
                .map((roadmap) => ({
                    field: 'attributes.category',
                    value: roadmap.attributes.category,
                    label: roadmap.attributes.category,
                }))
                .filter((category) => category.value),
        }
    }, [initialRoadmaps])

    useEffect(() => {
        if (hasMore) {
            fetchMore()
        }
    }, [hasMore])

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
        const newRoadmaps =
            filterKeys.length <= 0
                ? initialRoadmaps
                : initialRoadmaps.filter((roadmap) =>
                      filterKeys.every((filter) => {
                          const { value, field } = filters[filter]
                          return get(roadmap, field) === value
                      })
                  )
        setRoadmaps(newRoadmaps)
    }, [filters])

    useEffect(() => {
        setRoadmaps(initialRoadmaps)
    }, [initialRoadmaps])

    const changesByMonth = groupBy(roadmaps, (roadmap) => dayjs(roadmap.attributes.dateCompleted).format('MMM'))

    const tableOfContents = Object.keys(
        groupBy(roadmaps, (roadmap) => dayjs(roadmap.attributes.dateCompleted).format('MMMM'))
    ).map((month) => {
        return { url: month, value: month, depth: 0 }
    })

    const isModerator = user?.role?.type === 'moderator'

    return (
        <CommunityLayout
            parent={companyMenu}
            activeInternalMenu={companyMenu.children.find((child) => child.name.toLowerCase() === 'changelog')}
            title="Changelog"
            tableOfContents={tableOfContents}
        >
            <section className="mb-4 flex justify-between md:items-center md:flex-row flex-col md:space-y-0 space-y-4">
                <div>
                    <div className="flex gap-4 items-center">
                        <div>
                            <h1 className="m-0 text-3xl sm:text-4xl">Changelog</h1>
                        </div>
                        <div>
                            {isModerator && !adding && (
                                <CallToAction onClick={() => setAdding(true)} size="xs" type="secondary">
                                    <Tooltip content="Only moderators can see this" placement="top">
                                        <IconShieldLock className="w-6 h-6 inline-block mr-1" />
                                    </Tooltip>
                                    Add entry
                                </CallToAction>
                            )}
                        </div>
                    </div>

                    <p className="m-0 mt-2">
                        <em>"All the updates that are fit to print"</em>
                    </p>
                </div>
                <div className="flex space-x-1 items-center relative z-[50]">
                    <Select
                        value={pageContext.year}
                        onChange={({ value }) => navigate(value)}
                        values={[
                            { label: 2025, value: '/changelog/2025' },
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

            {isModerator && (
                <>
                    {adding && (
                        <div className="mb-6 border-border dark:border-dark">
                            <RoadmapForm
                                status="complete"
                                onSubmit={() => {
                                    setAdding(false)
                                    mutate()
                                }}
                            />
                        </div>
                    )}
                </>
            )}

            <section className="grid article-content">
                {isLoading ? (
                    <Skeleton />
                ) : (
                    Object.keys(changesByMonth).map((month, index) => {
                        const nodes = changesByMonth[month]
                        return (
                            <div key={`${month}-${index}`} id={tableOfContents[index].url} className="flex gap-4">
                                <div className="shrink-0 basis-[50px] relative after:w-[1px] after:absolute after:top-0 after:bottom-0 after:left-[25px] after:bg-border dark:after:bg-border-dark after:content-['']">
                                    <div className="inline-flex flex-col items-center rounded bg-light dark:bg-dark border border-light dark:border-dark py-1 px-2 relative z-30">
                                        <h2 className="!text-sm font-bold uppercase !m-0">{month}</h2>
                                        <div className="text-xs font-semibold">{pageContext.year}</div>
                                    </div>
                                </div>
                                <ul className="list-none m-0 p-0 grid gap-y-8 flex-1 pb-12">
                                    {nodes.map(
                                        ({
                                            id: strapiID,
                                            attributes: { description, image: media, topic, teams, title, cta },
                                        }) => {
                                            const team = teams?.data[0]
                                            const topicName = topic?.data?.attributes.label
                                            const teamName = team?.attributes?.name
                                            const Icon = topicIcons[topicName?.toLowerCase()]
                                            return (
                                                <li
                                                    id={slugify(title, { lower: true })}
                                                    className="scroll-mt-[108px]"
                                                    key={strapiID}
                                                >
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
                                                        editButtonClassName="absolute -top-4 md:top-0 right-0 z-20"
                                                        roundButton={false}
                                                        id={strapiID}
                                                        onSubmit={() => mutate()}
                                                    >
                                                        <Change
                                                            cta={cta}
                                                            description={description}
                                                            media={media}
                                                            teamName={teamName}
                                                            title={title}
                                                        />
                                                    </UpdateWrapper>
                                                </li>
                                            )
                                        }
                                    )}
                                </ul>
                            </div>
                        )
                    })
                )}
            </section>
        </CommunityLayout>
    )
}
