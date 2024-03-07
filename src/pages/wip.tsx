import Layout from 'components/Layout'
import React, { useEffect, useState } from 'react'
import qs from 'qs'
import dayjs from 'dayjs'
import groupBy from 'lodash.groupby'
import Markdown from 'components/Squeak/components/Markdown'
import SEO from 'components/seo'
import { companyMenu } from '../navs'
import { useUser } from 'hooks/useUser'
import { Skeleton } from 'components/Questions/QuestionsTable'
import TeamUpdate from 'components/TeamUpdate'
import RichText from 'components/Squeak/components/RichText'
import { useFormik } from 'formik'
import { CallToAction } from 'components/CallToAction'
import transformValues from 'components/Squeak/util/transformValues'

const Update = ({ body, questionID, fetchUpdates }) => {
    const { getJwt, user } = useUser()
    const [editing, setEditing] = useState(false)
    const [loading, setLoading] = useState(false)
    const { setFieldValue, values, handleSubmit, submitForm } = useFormik({
        initialValues: { body: '', images: [] },
        onSubmit: async ({ body, images }) => {
            const profileID = user?.profile.id
            const jwt = await getJwt()
            if (!profileID || !jwt) return
            setLoading(true)
            const transformedValues = await transformValues({ body, images: images ?? [] }, profileID, jwt)
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionID}`, {
                body: JSON.stringify({
                    data: {
                        body: transformedValues.body,
                    },
                }),
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
            })
            await fetchUpdates()
            setLoading(false)
            setEditing(false)
        },
    })
    return (
        <li className={editing ? 'list-none' : ''}>
            {editing ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="bg-white dark:bg-accent-dark border border-light dark:border-dark rounded-md overflow-hidden mb-4">
                            <RichText
                                onSubmit={submitForm}
                                autoFocus
                                setFieldValue={setFieldValue}
                                initialValue={body}
                                values={values}
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <CallToAction disabled={loading} onClick={submitForm} size="md">
                                Update
                            </CallToAction>
                            <button onClick={() => setEditing(false)} className="text-red font-bold text-sm">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    <Markdown>{body}</Markdown>
                    {user?.role?.type === 'moderator' && (
                        <button onClick={() => setEditing(true)} className="block text-red font-bold">
                            Edit
                        </button>
                    )}
                </>
            )}
        </li>
    )
}

export default function TeamUpdates() {
    const [loading, setLoading] = useState(true)
    const [updates, setUpdates] = useState<any>(null)
    const { user } = useUser()
    const isModerator = user?.role?.type === 'moderator'

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
        setLoading(false)
    }

    useEffect(() => {
        fetchUpdates()
    }, [])

    const hasUpdates = updates && Object.keys(updates).length > 0

    return (
        <Layout parent={companyMenu}>
            <SEO title="WIP - PostHog" noindex />
            <section className="max-w-[700px] mx-auto px-5 mt-8">
                <div className="relative pb-6 mb-6 border-b border-border dark:border-dark flex justify-between items-end">
                    <div>
                        <h1 className="font-bold text-5xl my-0">Work in progress</h1>
                        <p className="my-0 font-semibold opacity-70 mt-2">
                            Here's what we're building right now (week of {dayjs().startOf('week').format('MM/DD/YYYY')}
                            )
                        </p>
                    </div>
                </div>
                <div className="pb-12">
                    {isModerator && (
                        <div className="mb-8 pb-8 border-b border-border dark:border-dark">
                            <h4>Post an update</h4>
                            <TeamUpdate onSubmit={fetchUpdates} />
                        </div>
                    )}
                    {loading ? (
                        <Skeleton />
                    ) : hasUpdates ? (
                        <ul className="list-none m-0 p-0 pb-4 grid gap-y-4">
                            {Object.keys(updates).map((teamName) => {
                                return (
                                    <li key={teamName}>
                                        <h2>{teamName}</h2>
                                        <ul>
                                            {updates[teamName].map((update) => {
                                                const {
                                                    id,
                                                    attributes: {
                                                        question: {
                                                            data: {
                                                                id: questionID,
                                                                attributes: { body },
                                                            },
                                                        },
                                                    },
                                                } = update
                                                return (
                                                    <Update
                                                        key={id}
                                                        questionID={questionID}
                                                        body={body}
                                                        fetchUpdates={fetchUpdates}
                                                    />
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
