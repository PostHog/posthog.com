import Tooltip from 'components/Tooltip'
import { useUser } from 'hooks/useUser'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import React, { useEffect, useState } from 'react'
import { useQuestion } from '../hooks/useQuestion'
import { Bell } from 'components/NotProductIcons'

const Button = ({
    className,
    subscribed,
    handleSubscribe,
}: {
    className?: string
    subscribed: boolean | null
    handleSubscribe: () => Promise<void>
}) =>
    subscribed === null ? null : (
        <button
            className={`flex rounded-sm p-1 ${
                subscribed
                    ? 'relative bg-gray-accent-light hover:bg-gray-accent-light-hover/50 dark:bg-gray-accent-dark dark:hover:bg-gray-accent-dark-hover/50 text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 dark:hover:text-primary-dark/75 hover:scale-[1.05] hover:top-[-.5px] active:scale-[1] active:top-[0px]'
                    : 'bg-red text-white dark:text-white'
            } ${className}`}
            onClick={handleSubscribe}
        >
            <span className="w-6 h-6 rotate-6">
                <Bell />
            </span>
            {/* {subscribed ? 'Unsubscribe' : 'Subscribe'} */}
        </button>
    )

export default function SubscribeButton({
    question,
    className = '',
}: {
    question?: StrapiRecord<QuestionData>
    className?: string
}) {
    if (!question) return null
    const [subscribed, setSubscribed] = useState<boolean | null>(null)
    const { user } = useUser()
    const { subscribe, unsubscribe, isSubscribed } = useQuestion(question.id)

    useEffect(() => {
        if (user) {
            isSubscribed().then((subscribed) => setSubscribed(subscribed))
        }
    }, [user])

    const handleSubscribe = async () => (subscribed ? await unsubscribe() : await subscribe())

    return (
        <Tooltip
            content={() => (
                <div style={{ maxWidth: 300 }}>
                    {user ? 'Thread notifications: OFF (Press to enable)' : 'Sign in to subscribe to thread replies'}
                </div>
            )}
        >
            <span className="relative">
                {user ? (
                    <Button
                        subscribed={subscribed}
                        handleSubscribe={handleSubscribe}
                        className={`${className} p-0 border-0 relative font-bold`}
                    />
                ) : (
                    <button
                        className={`${className} flex gap-1 p-0 border-0 relative opacity-50 font-bold text-black dark:text-white`}
                        disabled
                    >
                        <span className="w-6 h-6 rotate-6">
                            <Bell />
                        </span>
                    </button>
                )}
            </span>
        </Tooltip>
    )
}
