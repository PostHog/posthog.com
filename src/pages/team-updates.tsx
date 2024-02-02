import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import dayjs from 'dayjs'
import groupBy from 'lodash.groupby'
import Markdown from 'components/Squeak/components/Markdown'
import SEO from 'components/seo'
import { companyMenu } from '../navs'
import { useUser } from 'hooks/useUser'

export default function TeamUpdates() {
    const [copied, setCopied] = useState(false)
    const [updates, setUpdates] = useState<any>(null)
    const { user } = useUser()

    const fetchUpdates = async () => {
        const { data } = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/team-updates?${qs.stringify(
                {
                    populate: ['question', 'team'],
                    sort: ['createdAt:desc'],
                    filters: {
                        thingOfTheWeek: true,
                        question: {
                            createdAt: {
                                $gte: dayjs().startOf('week').format(),
                            },
                        },
                    },
                },
                { encodeValuesOnly: true }
            )}`
        ).then((res) => res.json())

        const updates = groupBy(data, (update) => update?.attributes?.team?.data?.attributes?.name)
        setUpdates(updates)
    }

    const handleCopy = () => {
        const text = Object.keys(updates)
            .map((teamName) => {
                return (
                    `**${teamName}**\n` +
                    updates[teamName]
                        .map((update) => {
                            const {
                                attributes: {
                                    question: {
                                        data: {
                                            attributes: { body },
                                        },
                                    },
                                },
                            } = update
                            return body
                        })
                        .join('\n\n')
                )
            })
            .join('\n\n')

        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000)
    }

    useEffect(() => {
        fetchUpdates()
    }, [])

    const hasUpdates = updates && Object.keys(updates).length > 0

    return (
        <Layout parent={companyMenu}>
            <SEO title="Team updates - PostHog" noindex />
            <section className="max-w-[700px] mx-auto px-5 mt-8">
                <div className="relative pb-6 mb-6 border-b border-border dark:border-dark flex justify-between items-end">
                    <div>
                        <h1 className="font-bold text-5xl my-0">Team updates</h1>
                        <p className="my-0 font-semibold opacity-70 mt-2">
                            Week of {dayjs().startOf('week').format('MM/DD/YYYY')}
                        </p>
                    </div>
                    {user?.role.type === 'moderator' && hasUpdates && (
                        <div>
                            {copied ? (
                                <strong className="opacity-80 text-sm">Copied!</strong>
                            ) : (
                                <button onClick={handleCopy} className="font-bold text-red text-sm">
                                    Copy as Markdown
                                </button>
                            )}
                        </div>
                    )}
                </div>
                <div className="pb-12">
                    {hasUpdates ? (
                        <ul className="list-none m-0 p-0 pb-4 grid gap-y-8">
                            {Object.keys(updates).map((teamName) => {
                                return (
                                    <li key={teamName}>
                                        <h1>{teamName}</h1>
                                        <ul className="list-none m-0 p-0 grid gap-y-4">
                                            {updates[teamName].map((update) => {
                                                const {
                                                    id,
                                                    attributes: {
                                                        question: {
                                                            data: {
                                                                attributes: { body },
                                                            },
                                                        },
                                                    },
                                                } = update
                                                return (
                                                    <li
                                                        key={id}
                                                        className="p-5 flex-shrink-0 bg-accent dark:bg-accent-dark border border-border dark:border-dark rounded-md"
                                                    >
                                                        <Markdown>{body}</Markdown>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <>
                            <h1 className="m-0 mb-1">We're still cookin'</h1>
                            <p className="m-0 opacity-70 font-semibold">Check back later!</p>
                        </>
                    )}
                </div>
            </section>
        </Layout>
    )
}
