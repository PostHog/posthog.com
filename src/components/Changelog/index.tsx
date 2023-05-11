import CommunityLayout from 'components/Community/Layout'
import { topicIcons } from 'components/Questions/TopicsTable'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'
import Markdown from 'components/Squeak/components/Markdown'
import Link from 'components/Link'
import { CallToAction } from 'components/CallToAction'
import groupBy from 'lodash.groupby'
import slugify from 'slugify'

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

export default function Changelog() {
    const { changes } = useStaticQuery(graphql`
        {
            changes: allChangelog(sort: { fields: attributes___date, order: DESC }) {
                nodes {
                    attributes {
                        change {
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
                        date(formatString: "MMM D")
                    }
                }
            }
        }
    `)

    const changesByMonth = groupBy(changes.nodes, (node) => {
        const month = new Date(node.attributes.date).getMonth()
        return months[month]
    })

    const tableOfContents = Object.keys(changesByMonth).map((month) => ({ url: month, value: month, depth: 0 }))

    return (
        <CommunityLayout title="Changelog" tableOfContents={tableOfContents}>
            <section className="mb-12">
                <h1 className="m-0 text-3xl">Changelog</h1>
                <p className="m-0 mt-2">Here's a history of everything we've built</p>
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
                                {nodes.map(({ attributes: { date, change } }) => {
                                    return (
                                        <li key={date}>
                                            <ul className="list-none m-0 p-0 grid gap-y-12">
                                                {change?.map(
                                                    ({ description, media, topic, team, title, type, cta }) => {
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
                                                                    <Title {...(cta ? { to: cta.url } : null)}>
                                                                        {title}
                                                                    </Title>
                                                                </h3>
                                                                {teamName && (
                                                                    <p className="m-0 text-sm opacity-60 font-semibold">
                                                                        {teamName} Team
                                                                    </p>
                                                                )}
                                                                {mediaURL && (
                                                                    <div className="my-4">
                                                                        {media?.data?.attributes?.mime ===
                                                                        'video/mp4' ? (
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
                                                    }
                                                )}
                                            </ul>
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
