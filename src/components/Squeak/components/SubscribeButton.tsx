import Tooltip from 'components/Tooltip'
import { useUser } from 'hooks/useUser'
import { QuestionData, StrapiRecord } from 'lib/strapi'
import React, { useEffect, useState } from 'react'
import { useQuestion } from '../hooks/useQuestion'

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
            isSubscribed(user?.profile).then((subscribed) => setSubscribed(subscribed))
        }
    }, [user])

    const handleSubscribe = async () => (subscribed ? await unsubscribe(user?.profile) : await subscribe(user?.profile))

    return subscribed !== null ? (
        <Tooltip
            content={() => (
                <div style={{ maxWidth: 250 }}>Get notified via email when someone responds to this question</div>
            )}
        >
            <button className={className} onClick={handleSubscribe}>
                {subscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
        </Tooltip>
    ) : null
}
