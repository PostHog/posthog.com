import { Check, ClosedIssue, OpenIssue, Plus } from 'components/Icons/Icons'
import Link from 'components/Link'
import React, { useState } from 'react'
import { IRoadmap } from '.'
import { Login, useUser } from 'squeak-react'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import Spinner from 'components/Spinner'
import { useToast } from '../../hooks/toast'

export function InProgress(props: IRoadmap) {
    const { addToast } = useToast()
    const { user } = useUser()
    const [more, setMore] = useState(false)
    const [showAuth, setShowAuth] = useState(false)
    const [subscribed, setSubscribed] = useState(false)
    const [loading, setLoading] = useState(false)
    const { title, githubPages, description, beta_available } = props
    const completedIssues = githubPages && githubPages?.filter((page) => page.closed_at)
    const percentageComplete = githubPages && Math.round((completedIssues.length / githubPages?.length) * 100)

    async function subscribe(email: string) {
        setLoading(true)
        if (email) {
            await addToMailchimp(
                email,
                undefined,
                'https://posthog.us19.list-manage.com/subscribe/post?u=292207b434c26e77b45153b96&amp;id=ef3044881e&amp;f_id=00178ae4f0'
            )
            const res = await fetch('/api/mailchimp', {
                method: 'POST',
                body: JSON.stringify({ email: email, tag: title }),
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

    return (
        <li className="sm:flex xl:flex-col space-y-2 sm:space-y-0 border-t border-dashed border-gray-accent-light first:border-t-0 px-4 py-4 sm:py-2 xl:pb-4 bg-white rounded-sm shadow-xl">
            <div className="flex-1 sm:mt-2">
                <h4 className="text-lg flex space-x-1 items-center m-0">{title}</h4>
                <p className="m-0 text-[15px] text-black/80 inline">
                    {more ? description : description.substring(0, 125) + (description?.length > 125 ? '...' : '')}
                </p>
                {!more && (description?.length > 125 || githubPages?.length > 0) && (
                    <button onClick={() => setMore(true)} className="font-semibold text-red inline text-sm ml-1">
                        more
                    </button>
                )}
                {githubPages && (
                    <div className="mt-4 mb-4">
                        <h5 className="text-sm mb-2 font-semibold opacity-60">Progress</h5>
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
                                        className="text-[14px] flex items-start font-semibold space-x-1 text-black leading-tight"
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
            </div>
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
                                apiHost="https://squeak.cloud"
                                organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                            />
                        </>
                    ) : (
                        <button
                            disabled={subscribed || loading}
                            onClick={() => subscribe(user?.email)}
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
                                    ? 'Subscribed!'
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
