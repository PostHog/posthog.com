import React, { useEffect } from 'react'
import { PageProps } from 'gatsby'
import Link from 'components/Link'
import { useUser } from 'hooks/useUser'
import { QuestionData } from 'lib/strapi'
import CommunityLayout, { SectionTitle } from 'components/Community/Layout'

const ListItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <li className="flex justify-between space-x-2 items-end text-lg pb-4 mb-4 border-b border-gray-accent-light dark:border-gray-accent-dark border-dashed last:border-b-0 last:pb-0 last:mb-0">
            {children}
        </li>
    )
}

const Subscription = ({ question }: { question: QuestionData }) => {
    const { permalink, numReplies, id, subject } = question
    const { setSubscription } = useUser()

    return (
        <ListItem>
            <div className="flex-grow flex flex-col overflow-hidden">
                <Link
                    className="font-bold text-ellipsis overflow-hidden whitespace-nowrap text-base"
                    to={`/questions/${permalink}`}
                >
                    {subject}
                </Link>
            </div>
            <p className={`m-0 font-semibold opacity-60 flex-shrink-0 text-sm xl:w-[200px] flex space-x-1`}>
                <span>
                    {numReplies || 0} {numReplies === 1 ? 'reply' : 'replies'}
                </span>
            </p>
            <div className="flex">
                <button className="text-red font-bold text-sm" onClick={() => setSubscription('question', id, false)}>
                    Unsubscribe
                </button>
            </div>
        </ListItem>
    )
}

const Subscriptions = () => {
    const { user, fetchUser } = useUser()
    const subscriptions = user?.profile?.questionSubscriptions

    useEffect(() => {
        if (user) fetchUser()
    }, [])

    if (!subscriptions) return null
    return (
        <div id="my-activity" className="mb-12">
            <SectionTitle>My discussions</SectionTitle>
            {subscriptions?.length > 0 ? (
                subscriptions.map((question) => {
                    return <Subscription key={question.id} user={user} question={question} />
                })
            ) : (
                <p>You're not subscribed to any questions yet</p>
            )}
        </div>
    )
}

export default function CommunityPage() {
    return (
        <CommunityLayout title="Inbox">
            <Subscriptions />
        </CommunityLayout>
    )
}
