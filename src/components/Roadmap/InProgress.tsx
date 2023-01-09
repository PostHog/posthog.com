import { Check, ClosedIssue, OpenIssue, Plus } from 'components/Icons/Icons'
import Link from 'components/Link'
import React, { useEffect, useState } from 'react'
import { IRoadmap } from '.'
import { Login, useUser } from 'squeak-react'
import Spinner from 'components/Spinner'
import { useToast } from '../../hooks/toast'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

export function InProgress(props: IRoadmap & { className?: string; more?: boolean; stacked?: boolean }) {
    const { addToast } = useToast()
    const { user } = useUser()
    const [more, setMore] = useState(props.more ?? false)
    const [showAuth, setShowAuth] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [loading, setLoading] = useState(false)
    const { title, githubPages, description, beta_available, thumbnail, roadmapId } = props
    const completedIssues = githubPages && githubPages?.filter((page) => page.closed_at)
    const percentageComplete = githubPages && Math.round((completedIssues.length / githubPages?.length) * 100)

    async function subscribe(email: string) {
        setLoading(true)
        if (email) {
            const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmap/subscribe`, {
                method: 'POST',
                body: JSON.stringify({ id: roadmapId, organizationId: process.env.GATSBY_SQUEAK_ORG_ID }),
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            if (res.ok) {
                setSubscribed(true)
                setShowAuth(false)
                addToast({ message: `Subscribed to ${title}. We’ll email you with updates!` })
            } else {
                addToast({ error: true, message: 'Whoops! Something went wrong.' })
            }
        } else {
            setShowAuth(true)
        }
        setLoading(false)
    }

    async function unsubscribe(email: string) {
        setLoading(true)
        if (email) {
            const res = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmap/unsubscribe`, {
                method: 'POST',
                body: JSON.stringify({ id: roadmapId, organizationId: process.env.GATSBY_SQUEAK_ORG_ID }),
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            if (res.ok) {
                setSubscribed(false)
                setShowAuth(false)
                addToast({ message: `Unsubscribed from ${title}. You will no longer receive updates.` })
            } else {
                addToast({ error: true, message: 'Whoops! Something went wrong.' })
            }
        } else {
            setShowAuth(true)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (user) {
            setSubscribed(user?.profile?.subscriptions?.some((sub) => sub?.id === roadmapId))
        }
    }, [user])

    return (
        <li
            className={`border-t border-dashed border-gray-accent-light first:border-t-0 px-4 py-4 sm:py-2 xl:pb-4 bg-white rounded-sm shadow-xl ${
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
                {thumbnail && (
                    <div className="sm:flex-shrink-0">
                        <GatsbyImage className="shadow-md" image={getImage(thumbnail)} alt="" />
                    </div>
                )}
            </div>
            {githubPages && (
                <div className="mt-4 mb-4">
                    <h5 className="text-sm mb-2 font-semibold opacity-60 !mt-0">Progress</h5>
                    <div className="h-2 flex-grow bg-gray-accent-light rounded-md relative overflow-hidden">
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
                            <div className="bg-tan p-4 mb-2">
                                <p className="text-sm mb-2">
                                    <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                                </p>

                                <p className="text-sm mb-0">
                                    We suggest signing up with your personal email. Soon you'll be able to link your
                                    PostHog app account.
                                </p>
                            </div>

                            <Login
                                onSubmit={(data: { email: string }) => subscribe(data?.email)}
                                apiHost={process.env.GATSBY_SQUEAK_API_HOST}
                                organizationId={process.env.GATSBY_SQUEAK_ORG_ID}
                            />
                        </>
                    ) : (
                        <button
                            disabled={loading}
                            onClick={() => (subscribed ? unsubscribe(user?.email) : subscribe(user?.email))}
                            className="text-[15px] inline-flex items-center space-x-2 py-2 px-4 rounded-sm bg-gray-accent-light text-black hover:text-black font-bold active:top-[0.5px] active:scale-[.98] w-auto"
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
                                    : beta_available
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
