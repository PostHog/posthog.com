import Tooltip from 'components/Tooltip'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'

export const Button = ({
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
    contentType,
    id,
    className = '',
    tooltipMessage,
}: {
    contentType: 'topic' | 'question'
    id: number | string
    className?: string
    tooltipMessage: string
}) {
    if (!id || !contentType || !tooltipMessage) return null
    const [subscribed, setSubscribed] = useState<boolean | null>(null)
    const { user, isSubscribed, setSubscription } = useUser()

    useEffect(() => {
        if (user) {
            isSubscribed(contentType, id).then((subscribed) => setSubscribed(subscribed))
        }
    }, [user])

    const handleSubscribe = async () => {
        await setSubscription(contentType, id, !subscribed)
    }

    return (
        <Tooltip content={() => <div style={{ maxWidth: 250 }}>{user ? tooltipMessage : 'Sign in to subscribe'}</div>}>
            <span className="relative">
                {user ? (
                    <Button subscribed={subscribed} handleSubscribe={handleSubscribe} className={className} />
                ) : (
                    <button className={className} disabled>
                        Subscribe
                    </button>
                )}
            </span>
        </Tooltip>
    )
}
