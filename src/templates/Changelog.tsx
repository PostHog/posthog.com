import CommunityLayout from 'components/Community/Layout'
import { topicIcons } from 'components/Questions/TopicsTable'
import React, { useEffect, useMemo, useState } from 'react'
import Markdown from 'components/Squeak/components/Markdown'
import { CallToAction } from 'components/CallToAction'
import lodashGroupBy from 'lodash.groupby'
import get from 'lodash.get'
import slugify from 'slugify'
import { Listbox } from '@headlessui/react'
import { Chevron } from 'components/Icons'
import { Heading } from 'components/Heading'
import { ZoomImage } from 'components/ZoomImage'
import { companyMenu } from '../navs'
import dayjs from 'dayjs'
import { Link, navigate } from 'gatsby'
import UpdateWrapper from 'components/Roadmap/UpdateWrapper'
import { Video } from 'cloudinary-react'
import RoadmapForm from 'components/RoadmapForm'
import { useUser } from 'hooks/useUser'
import Tooltip from 'components/Tooltip'
import { IconChevronDown, IconShieldLock } from '@posthog/icons'
import { useRoadmaps } from 'hooks/useRoadmaps'
import CloudinaryImage from 'components/CloudinaryImage'
import uniqBy from 'lodash/uniqBy'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSTable from 'components/OSTable'
import TeamMember from 'components/TeamMember'
import { FeaturedImage } from './PostListing'
import { motion } from 'framer-motion'
import qs from 'qs'
import useProduct from 'hooks/useProduct'
import ProgressBar from 'components/ProgressBar'
import OSTabs from 'components/OSTabs'
import { useCompanyNavigation } from 'hooks/useCompanyNavigation'

const Select = ({ onChange, values, ...other }) => {
    const defaultValue = values[0]
    return (
        <div className="relative">
            <Listbox onChange={onChange} defaultValue={defaultValue}>
                {({ open }) => (
                    <>
                        <Listbox.Button
                            className={`group py-1 px-2 hover:bg-accent rounded-sm text-left border hover:border flex justify-between items-center font-semibold text-sm text-secondary hover:text-primary dark:text-primary-dark/75 dark:hover:text-primary-dark/100 relative hover:scale-[1.02] active:top-[.5px] active:scale-[.99] ${open ? 'scale-[1.02] bg-accent border-primary text-primary' : 'border-transparent'
                                }`}
                        >
                            {({ value }) => (
                                <>
                                    <span>{other.value || value.label}</span>
                                    <Chevron className="w-2.5 ml-2 opacity-30 group-hover:opacity-50" />
                                </>
                            )}
                        </Listbox.Button>
                        <Listbox.Options className="absolute right-0 min-w-full shadow-xl bg-white dark:bg-accent-dark border border-primary list-none m-0 p-0.5 rounded-md mt-1 z-20 grid">
                            {values.map((value) => (
                                <Listbox.Option key={value.label} value={value} as={React.Fragment}>
                                    {({ selected }) => {
                                        return (
                                            <li
                                                className={`!m-0 py-1.5 px-3 !text-sm cursor-pointer rounded-sm hover:bg-light active:bg-accent dark:hover:bg-light/10 dark:active:bg-light/5 transition-colors hover:transition-none whitespace-nowrap ${(other.value ? value.label === other.value : selected)
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
            <div className="animate-pulse bg-accent h-8 w-full rounded-md" />
            <div className="animate-pulse bg-accent h-44 w-full rounded-md" />
        </div>
    )
}

const Description = ({ description, title, expandAll }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(expandAll)
    }, [expandAll])

    return (
        <button onClick={() => setOpen(!open)}>
            <div className="flex justify-start items-start text-left">
                <IconChevronDown className={`size-6 ${open ? '' : '-rotate-90'} flex-shrink-0 transition-transform`} />
                <strong className="font-semibold">{title}</strong>
            </div>
            <motion.div
                className={`text-left overflow-hidden ml-6`}
                initial={{ height: 0 }}
                animate={{ height: open ? 'auto' : 0 }}
                transition={{ duration: 0.2 }}
            >
                <div className="mt-2">
                    <Markdown>{description}</Markdown>
                </div>
            </motion.div>
        </button>
    )
}

const DescriptionWithImage = ({ description, title, expandAll, imageURL }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(expandAll)
    }, [expandAll])

    const handleToggle = () => setOpen(!open)

    return (
        <>
            <button onClick={handleToggle}>
                <div className="flex justify-start items-start text-left">
                    <IconChevronDown
                        className={`size-6 ${open ? '' : '-rotate-90'} flex-shrink-0 transition-transform`}
                    />
                    <strong className="font-semibold">{title}</strong>
                </div>
                <motion.div
                    className={`text-left overflow-hidden ml-6`}
                    initial={{ height: 0 }}
                    animate={{ height: open ? 'auto' : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className="mt-2">
                        <Markdown>{description}</Markdown>
                    </div>
                </motion.div>
            </button>
            {imageURL ? (
                <button onClick={handleToggle}>
                    <FeaturedImage url={imageURL} />
                </button>
            ) : null}
        </>
    )
}

interface TopicProps {
    topic: string
}

export const Topic = ({ topic }: TopicProps) => {
    const products = useProduct() // This returns all products when no handle is provided

    // Try to find a matching product by name
    const matchingProduct = products?.find((product) => product.name?.toLowerCase() === topic?.toLowerCase())

    if (matchingProduct) {
        const ProductIcon = matchingProduct.Icon
        const color = matchingProduct.color
        return (
            <p className="m-0 flex items-center space-x-1 font-semibold text-sm">
                {ProductIcon && <ProductIcon className={`size-5 text-${color}`} />}
                <span>
                    <Link
                        to={`/${matchingProduct.slug}`}
                        className="text-red dark:text-yellow font-semibold"
                        state={{ newWindow: true }}
                    >
                        {topic}
                    </Link>
                </span>
            </p>
        )
    }

    // Fall back to existing topicIcons logic
    const Icon = topicIcons[topic?.toLowerCase()]
    return (
        <p className="m-0 flex items-center space-x-1 font-semibold text-sm">
            {Icon && <Icon className="size-5 opacity-75" />}
            <span>{topic}</span>
        </p>
    )
}

const Authors = ({ authors, className }) => {
    return (
        <ul className={`list-none m-0 p-0 flex flex-wrap gap-1 ${className}`}>
            {authors.map((author) => {
                const name = [author.attributes.firstName, author.attributes.lastName].filter(Boolean).join(' ')
                return (
                    <li key={author.id}>
                        <TeamMember name={name} photo />
                    </li>
                )
            })}
        </ul>
    )
}

const TeamLink = ({
    team,
    className,
}: {
    team: {
        id: number
        attributes: {
            name: string
            slug: string
            miniCrest?: {
                data?: {
                    attributes: {
                        formats?: {
                            thumbnail?: {
                                url: string
                            }
                        }
                        url: string
                    }
                }
            }
        }
    }
    className?: string
}): JSX.Element => {
    const teamName = team.attributes.name
    const teamSlug = team.attributes.slug
    const miniCrestUrl =
        team.attributes.miniCrest?.data?.attributes?.formats?.thumbnail?.url ||
        team.attributes.miniCrest?.data?.attributes?.url

    return (
        <span className="relative inline-block">
            <a href={`/teams/${teamSlug}`}>
                <span
                    className={`inline-flex items-center gap-1.5 p-0.5 pr-1.5 border border-light hover:border-bg-dark/50 dark:border-dark dark:hover:border-bg-light/50 rounded-full ${className}`}
                >
                    <span className="h-6 shrink-0 rounded-full overflow-hidden">
                        {miniCrestUrl ? (
                            <img src={miniCrestUrl} alt={`${teamName} crest`} className="w-6" />
                        ) : (
                            <CloudinaryImage
                                alt=""
                                width={40}
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/pages-content/images/hog-9.png"
                                className="w-6 bg-red"
                            />
                        )}
                    </span>
                    <span className="!text-sm text-red dark:text-yellow font-semibold inline-flex">
                        Team {teamName}
                    </span>
                </span>
            </a>
        </span>
    )
}

const Teams = ({ teams, className }) => {
    return (
        <ul className={`list-none m-0 p-0 flex flex-wrap gap-1 ${className}`}>
            {teams.map((team) => {
                return (
                    <li key={team.id}>
                        <TeamLink team={team} />
                    </li>
                )
            })}
        </ul>
    )
}

const RoadmapTable = ({
    roadmaps,
    loading,
    onLastRowInView,
    expandAll,
}: {
    roadmaps: any[]
    loading?: boolean
    onLastRowInView?: () => void
    expandAll?: boolean
}) => {
    return (
        <OSTable
            loading={loading}
            onLastRowInView={onLastRowInView}
            columns={[
                {
                    name: 'Date',
                    align: 'left',
                    width: '120px',
                },
                {
                    name: 'Topic',
                    align: 'left',
                },
                {
                    name: 'Description',
                    align: 'left',
                    width: '1fr',
                },
                {
                    name: 'Author',
                    align: 'left',
                },
            ]}
            rowAlignment="top"
            rows={roadmaps.map((roadmap) => {
                const teams = roadmap.attributes.teams?.data
                const imageURL = roadmap.attributes.image?.data?.attributes?.url
                const topic = roadmap.attributes.topic?.data?.attributes?.label
                const authors = roadmap.attributes.profiles?.data

                return {
                    cells: [
                        {
                            content: roadmap.attributes.dateCompleted ? (
                                <span className="text-sm text-secondary">
                                    {dayjs(roadmap.attributes.dateCompleted).format('MMM D, YYYY')}
                                </span>
                            ) : null,
                            className: '!pt-[10px]',
                        },
                        {
                            content: topic ? <Topic topic={topic} /> : null,
                            className: '!pt-[10px]',
                        },
                        {
                            content: (
                                <>
                                    <DescriptionWithImage
                                        title={roadmap.attributes.title}
                                        description={roadmap.attributes.description}
                                        expandAll={expandAll}
                                        imageURL={imageURL}
                                    />
                                </>
                            ),
                            className: '!flex-row !pl-[.3rem]',
                        },
                        {
                            content:
                                authors?.length > 0 ? (
                                    <Authors authors={authors} className="-my-1" />
                                ) : (
                                    <Teams teams={teams} className="-my-1" />
                                ),
                        },
                    ],
                }
            })}
        />
    )
}

const getStrapiFilters = (filters) => {
    const strapiFilters = {}
    if (filters.team?.value) {
        strapiFilters.teams = {
            id: {
                $eq: filters.team.value,
            },
        }
    }
    if (filters.topic?.value) {
        strapiFilters.topic = {
            id: {
                $eq: filters.topic.value,
            },
        }
    }
    if (filters.year?.value) {
        strapiFilters.$and = [
            {
                dateCompleted: {
                    $gte: `${filters.year.value}-01-01`,
                },
            },
            {
                dateCompleted: {
                    $lt: `${filters.year.value + 1}-01-01`,
                },
            },
            {
                complete: {
                    $eq: true,
                },
            },
        ]
    }
    return strapiFilters
}
export default function Changelog({ pageContext }) {
    const [strapiFilters, setStrapiFilters] = useState(getStrapiFilters({ year: { value: pageContext.year } }))
    const [teams, setTeams] = useState([])
    const [topics, setTopics] = useState([])
    const [expandAll, setExpandAll] = useState(false)
    const [groupBy, setGroupBy] = useState<string>()
    const { roadmaps, isValidating, mutate, hasMore, fetchMore } = useRoadmaps({
        limit: 100,
        params: {
            sort: ['dateCompleted:desc'],
            filters: { dateCompleted: { $notNull: true }, ...strapiFilters },
        },
    })

    useEffect(() => {
        const query = qs.stringify({
            sort: 'name:asc',
            pagination: {
                pageSize: 100,
            },
        })
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?${query}`)
            .then((res) => res.json())
            .then(({ data }) => {
                setTeams(data)
            })
    }, [])

    useEffect(() => {
        const query = qs.stringify({
            sort: 'label:asc',
            pagination: {
                pageSize: 100,
            },
            filters: {
                label: {
                    $notContains: '#',
                },
            },
        })
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/topics?${query}`)
            .then((res) => res.json())
            .then(({ data }) => {
                setTopics(data)
            })
    }, [])

    const handleFilterChange = (filters) => {
        setStrapiFilters(getStrapiFilters(filters))
    }

    const groupedRoadmaps = lodashGroupBy(roadmaps, groupBy)

    const { handleTabChange, tabs, tabContainerClassName, className } = useCompanyNavigation({
        value: '/changelog/2025',
        content: (
            <div className="p-4 @xl:p-8">
                <div className="flex justify-between items-baseline pb-4">
                    <h1>Changelog</h1>
                    <div>
                        <button
                            onClick={() => setExpandAll(!expandAll)}
                            className="text-sm font-semibold text-red dark:text-yellow hover:text-red/80 dark:hover:text-yellow/80 mb-4"
                        >
                            {expandAll ? 'Collapse all' : 'Expand all'}
                        </button>
                    </div>
                </div>
                <ScrollArea>
                    {isValidating && roadmaps.length === 0 ? (
                        <ProgressBar title="changelog" />
                    ) : roadmaps.length > 0 ? (
                        groupBy ? (
                            <ul className="list-none m-0 p-0 space-y-4">
                                {Object.keys(groupedRoadmaps).map((key) => {
                                    return (
                                        <li key={key}>
                                            <h3 className="text-lg font-semibold mb-2">{key}</h3>
                                            <RoadmapTable
                                                key={key}
                                                roadmaps={groupedRoadmaps[key]}
                                                expandAll={expandAll}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <RoadmapTable
                                roadmaps={roadmaps}
                                loading={isValidating}
                                onLastRowInView={() => {
                                    if (hasMore && !isValidating) {
                                        fetchMore()
                                    }
                                }}
                                expandAll={expandAll}
                            />
                        )
                    ) : null}
                </ScrollArea>
            </div>
        ),
    })

    return (
        <>
            <SEO title="Changelog - PostHog" />
            <Editor
                type="changelog"
                maxWidth="full"
                dataToFilter={roadmaps}
                handleFilterChange={handleFilterChange}
                showFilters={false}
                availableGroups={[
                    {
                        label: 'Topic',
                        value: 'attributes.topic.data.attributes.label',
                    },
                ]}
                onGroupChange={(group) => {
                    setGroupBy(group === 'none' ? undefined : group)
                }}
                availableFilters={[
                    {
                        label: 'year',
                        operator: 'eq',
                        initialValue: pageContext.year,
                        options: [
                            { label: '2025', value: 2025 },
                            { label: '2024', value: 2024 },
                            { label: '2023', value: 2023 },
                            { label: '2022', value: 2022 },
                            { label: '2021', value: 2021 },
                            { label: '2020', value: 2020 },
                        ],
                    },
                    ...(topics.length > 0
                        ? [
                            {
                                label: 'topic',
                                operator: 'eq',
                                options: [
                                    {
                                        label: 'All',
                                        value: null,
                                    },
                                    ...topics.map((topic) => ({
                                        label: topic.attributes.label,
                                        value: topic.id,
                                    })),
                                ],
                            },
                        ]
                        : []),
                    ...(teams.length > 0
                        ? [
                            {
                                label: 'team',
                                operator: 'includes',
                                options: [
                                    {
                                        label: 'All',
                                        value: null,
                                    },
                                    ...teams.map((team) => ({
                                        label: team.attributes.name,
                                        value: team.id,
                                    })),
                                ],
                            },
                        ]
                        : []),
                ]}
                bookmark={{
                    title: 'Changelog',
                    description: 'Latest updates and releases',
                }}
            >
                <OSTabs
                    tabs={tabs}
                    defaultValue="/changelog/2025"
                    onValueChange={handleTabChange}
                    frame={false}
                    tabContainerClassName={tabContainerClassName}
                    className={className}
                    triggerDataScheme="primary"
                />
            </Editor>
        </>
    )
}
