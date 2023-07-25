import { Check, ClosedIssue, OpenIssue, Plus } from 'components/Icons/Icons'
import Link from 'components/Link'
import React, { useState } from 'react'
import { IRoadmap } from '.'
import { Authentication } from 'components/Squeak'
import { useUser } from 'hooks/useUser'
import Spinner from 'components/Spinner'
import { useToast } from '../../hooks/toast'
import useSWR from 'swr'
import qs from 'qs'
import usePostHog from 'hooks/usePostHog'

type RoadmapSubscriptions = {
    data: {
        id: number
        attributes: {
            roadmapSubscriptions: {
                data: {
                    id: number
                }[]
            }
        }
    }
}

export function InProgress(props: IRoadmap & { className?: string; more?: boolean; stacked?: boolean }) {
    const { addToast } = useToast()
    const { user, getJwt } = useUser()
    const posthog = usePostHog()

    const [more, setMore] = useState(props.more ?? false)
    const [showAuth, setShowAuth] = useState(false)
    const [loading, setLoading] = useState(false)

    const { title, githubPages, description, betaAvailable, image, squeakId } = props
    const completedIssues = githubPages && githubPages?.filter((page) => page.closed_at)
    const percentageComplete = githubPages && Math.round((completedIssues.length / githubPages?.length) * 100)

    const query = qs.stringify(
        {
            fields: ['id'],
            populate: {
                roadmapSubscriptions: {
                    fields: ['id'],
                },
            },
        },
        {
            encodeValuesOnly: true, // prettify URL
        }
    )

    const { data, error, mutate } = useSWR<RoadmapSubscriptions>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${user?.profile?.id}?${query}`,
        async (url: string) => {
            if (!user) return { data: { attributes: { roadmapSubscriptions: [] } } }
            return fetch(url).then((r) => r.json())
        }
    )

    if (error) {
        console.error(error)

        posthog?.capture('squeak error', {
            source: 'InProgress',
            error: JSON.stringify(error),
        })
    }

    const { data: roadmapData } = data || {}

    const subscribed = roadmapData?.attributes?.roadmapSubscriptions?.data?.some(({ id }) => id === squeakId)

    async function subscribe() {
        if (!roadmapData) {
            return
        }

        setLoading(true)

        try {
            posthog?.capture('roadmap subscribe start', {
                roadmapId: squeakId,
            })

            const token = await getJwt()

            if (!token) {
                setShowAuth(true)
                return
            }

            const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmap/${props.squeakId}/subscribe`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.ok) {
                setShowAuth(false)
                addToast({ message: `Subscribed to ${title}. We’ll email you with updates!` })
                mutate({
                    data: {
                        id: roadmapData?.id,
                        attributes: {
                            roadmapSubscriptions: {
                                data: [
                                    ...roadmapData?.attributes?.roadmapSubscriptions?.data,
                                    {
                                        id: props.squeakId,
                                    },
                                ],
                            },
                        },
                    },
                })

                posthog?.capture('roadmap subscribe', {
                    roadmapId: squeakId,
                })
            } else {
                addToast({ error: true, message: 'Whoops! Something went wrong.' })
                throw new Error('Failed to subscribe to roadmap')
            }
        } catch (error) {
            console.error(error)

            posthog?.capture('squeak error', {
                source: 'InProgress.subscribe',
                roadmapId: squeakId,
                error: JSON.stringify(error),
            })
        } finally {
            setLoading(false)
        }
    }

    async function unsubscribe() {
        if (!roadmapData) {
            return
        }

        setLoading(true)

        try {
            posthog?.capture('roadmap unsubscribe start', {
                roadmapId: squeakId,
            })

            const token = await getJwt()

            if (!token) {
                setShowAuth(true)
                return
            }

            const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmap/${props.squeakId}/unsubscribe`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.ok) {
                setShowAuth(false)
                addToast({ message: `Unsubscribed from ${title}. You will no longer receive updates.` })
                mutate({
                    data: {
                        id: roadmapData?.id,
                        attributes: {
                            roadmapSubscriptions: {
                                data: roadmapData?.attributes?.roadmapSubscriptions?.data.filter(
                                    ({ id }) => id !== props.squeakId
                                ),
                            },
                        },
                    },
                })

                posthog?.capture('roadmap unsubscribe', {
                    roadmapId: squeakId,
                })
            } else {
                addToast({ error: true, message: 'Whoops! Something went wrong.' })
                throw new Error('Failed to unsubscribe from roadmap')
            }
        } catch (error) {
            console.error(error)

            posthog?.capture('squeak error', {
                source: 'InProgress.subscribe',
                roadmapId: squeakId,
                error: JSON.stringify(error),
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <li
            className={`px-4 py-4 sm:py-2 xl:pb-4 border border-light dark:border-dark bg-accent dark:bg-accent-dark rounded-sm ${
                props?.className ?? ''
            }`}
        >
            <div className="sm:mt-2 flex sm:flex-row sm:space-x-4 flex-col-reverse space-y-reverse sm:space-y-0 space-y-4">
                <div className="sm:flex-grow">
                    <h4 className="text-lg flex space-x-1 items-center !m-0">{title}</h4>
                    <p className="m-0 text-[15px] opacity-80 inline">
                        {more ? description : description.substring(0, 125) + (description?.length > 125 ? '...' : '')}
                    </p>
                    {!more && (description?.length > 125 || githubPages?.length > 0) && (
                        <button onClick={() => setMore(true)} className="font-semibold text-red inline text-sm ml-1">
                            more
                        </button>
                    )}
                </div>
                {image && (
                    <div className="sm:flex-shrink-0">
                        <img src={image.url} className="shadow-md" alt="" />
                        {/*<GatsbyImage className="shadow-md" image={getImage(thumbnail)} alt="" />*/}
                    </div>
                )}
            </div>

            {githubPages && (
                <div className="mt-4 mb-4">
                    <h5 className="text-sm mb-2 font-semibold opacity-60 !mt-0">Progress</h5>
                    <div className="h-2 flex-grow bg-border dark:bg-border-dark rounded-md relative overflow-hidden">
                        <div
                            style={{ width: `${percentageComplete}%` }}
                            className={`bg-[#3FB950] absolute inset-0 h-full`}
                        />
                    </div>
                </div>
            )}

            {githubPages && more && (
                <ul className="list-none m-0 p-0 pb-4 grid gap-y-2 mt-4">
                    {githubPages.map((page) => {
                        return (
                            <li key={page.title}>
                                <Link
                                    to={page.html_url}
                                    className="text-[14px] flex items-start font-semibold space-x-1 text-black dark:text-white leading-tight cta"
                                >
                                    <span className="inline-block mt-.5">
                                        {page.closed_at ? <ClosedIssue /> : <OpenIssue />}
                                    </span>
                                    <span>{page.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}

            <div className="sm:flex-[0_0_250px] xl:flex-1 flex sm:justify-end xl:justify-start">
                <div className="mt-2 w-full">
                    {showAuth ? (
                        <>
                            <h4 className="mb-1 text-red">Sign into PostHog.com</h4>
                            <div className="bg-border dark:bg-border-dark p-4 mb-2">
                                <p className="text-sm mb-2">
                                    <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                                </p>

                                <p className="text-sm mb-0">
                                    We suggest signing up with your personal email. Soon you'll be able to link your
                                    PostHog app account.
                                </p>
                            </div>

                            <Authentication
                                initialView="sign-in"
                                onAuth={() => subscribe()}
                                showBanner={false}
                                showProfile={false}
                            />
                        </>
                    ) : (
                        <button
                            disabled={loading}
                            onClick={() => (subscribed ? unsubscribe() : subscribe())}
                            className="flex border border-b-3 border-light dark:border-dark rounded gap-2 p-2 font-bold bg-white dark:bg-accent-dark text-red dark:text-yellow"
                            data-attr={subscribed ? `roadmap-unsubscribe:${title}` : `roadmap-subscribe:${title}`}
                        >
                            <span className="w-[24px] h-[24px] flex items-center justify-center bg-blue/10 text-blue rounded-full">
                                {loading ? (
                                    <Spinner className="w-[14px] h-[14px] !text-blue" />
                                ) : subscribed ? (
                                    <Check className="w-[14px] h-[14px]" />
                                ) : (
                                    <Plus className="w-[14px] h-[14px]" />
                                )}
                            </span>
                            <span>
                                {subscribed
                                    ? 'Unsubscribe'
                                    : betaAvailable
                                    ? 'Get early access'
                                    : 'Subscribe for updates'}
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </li>
    )
}
