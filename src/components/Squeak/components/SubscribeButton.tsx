import Tooltip from 'components/Tooltip'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { useQuestion } from '../hooks/useQuestion'
import { IconBell } from '@posthog/icons'

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
        <button
            className={`flex rounded-sm p-1 ${
                !subscribed
                    ? 'relative bg-accent dark:bg-accent-dark border border-light dark:border-dark text-primary/50 hover:text-primary/75 dark:text-primary-dark/50 hover:scale-[1.05] hover:top-[-.5px] active:scale-[1] active:top-[0px]'
                    : 'bg-red text-white dark:text-white'
            } ${className}`}
            onClick={handleSubscribe}
        >
            <span className={`w-6 h-6 rotate-6 ${subscribed ? 'animate-wiggle origin-top' : ''}`}>
                <IconBell />
            </span>
        </button>
    )

export default function SubscribeButton({
    contentType,
    id,
    className = '',
}: {
    contentType: 'topic' | 'question'
    id: number | string
    className?: string
}) {
    if (!id || !contentType) return null
    const [subscribed, setSubscribed] = useState<boolean | null>(null)
    const { user, isSubscribed, setSubscription } = useUser()

    useEffect(() => {
        if (user) {
            isSubscribed(contentType, id).then((subscribed) => setSubscribed(subscribed))
        }
    }, [user])

    const handleSubscribe = async () => {
        setSubscribed(!subscribed)
        await setSubscription(contentType, id, !subscribed)
    }

    return (
        <Tooltip
            content={() => (
                <div style={{ maxWidth: 320 }}>
                    {user
                        ? `Email notifications: ${subscribed ? 'ON (Press to disable)' : 'OFF (Press to enable)'}`
                        : 'Sign in to subscribe'}
                </div>
            )}
        >
            <span className="relative">
                {user ? (
                    <Button
                        subscribed={subscribed}
                        handleSubscribe={handleSubscribe}
                        className={`${className} p-0 relative font-bold`}
                    />
                ) : (
                    <button
                        className={`${className} flex gap-1 p-0 relative opacity-50 font-bold text-black dark:text-white`}
                        disabled
                    >
                        <span className="w-6 h-6 rotate-6">
                            <IconBell />
                        </span>
                    </button>
                )}
            </span>
        </Tooltip>
    )
}
