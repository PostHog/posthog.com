import Tooltip from 'components/Tooltip'
import { useUser } from 'hooks/useUser'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import React, { useEffect, useState } from 'react'
import { useQuestion } from '../hooks/useQuestion'

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
        <button className={className} onClick={handleSubscribe}>
            {subscribed ? 'Unsubscribe' : 'Subscribe'}
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
                <div style={{ maxWidth: 250 }}>
                    {user ? 'Get notified via email when someone responds to this question' : 'Sign in to subscribe!'}
                </div>
            )}
        >
            <span className="relative">
                {user ? (
                    <Button
                        subscribed={subscribed}
                        handleSubscribe={handleSubscribe}
                        className={`${className} p-0 border-0 relative font-bold text-red`}
                    />
                ) : (
                    <button
                        className={`${className} p-0 border-0 relative opacity-50 font-bold text-black dark:text-white`}
                        disabled
                    >
                        Subscribe
                    </button>
                )}
            </span>
        </Tooltip>
    )
}
