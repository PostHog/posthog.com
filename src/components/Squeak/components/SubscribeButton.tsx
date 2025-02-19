import Tooltip from 'components/Tooltip'
import { User, useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import { useQuestion } from '../hooks/useQuestion'
import { IconBell } from '@posthog/icons'
import SideModal from 'components/Modal/SideModal'
import Authentication from './Authentication'

export const Button = ({
    className,
    subscribed,
    handleSubscribe,
}: {
    className?: string
    subscribed: boolean | null
    handleSubscribe: () => Promise<void>
}) => (
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
    show = true,
}: {
    contentType: 'topic' | 'question'
    id: number | string
    className?: string
    show?: boolean
}) {
    if (!id || !contentType) return null
    const [authModalOpen, setAuthModalOpen] = useState(false)
    const [subscribed, setSubscribed] = useState<boolean | null>(null)
    const { user, isSubscribed, setSubscription } = useUser()

    useEffect(() => {
        if (user) {
            isSubscribed(contentType, id).then((subscribed) => setSubscribed(subscribed))
        }
    }, [user])

    const handleSubscribe = async () => {
        if (!user) {
            return setAuthModalOpen(true)
        }
        setSubscribed(!subscribed)
        await setSubscription({ contentType, id, subscribe: !subscribed })
    }

    const onAuth = (user: User) => {
        setSubscribed(true)
        setSubscription({ contentType, id, subscribe: true, user })
        setAuthModalOpen(false)
    }

    return show || subscribed ? (
        <>
            <SideModal open={authModalOpen} setOpen={setAuthModalOpen}>
                <h4 className="mb-4">Sign into PostHog.com</h4>
                <div className="bg-border dark:bg-border-dark p-4 mb-2">
                    <p className="text-sm mb-2">
                        <strong>Note: PostHog.com authentication is separate from your PostHog app.</strong>
                    </p>

                    <p className="text-sm mb-0">
                        We suggest signing up with your personal email. Soon you'll be able to link your PostHog app
                        account.
                    </p>
                </div>

                <Authentication onAuth={onAuth} initialView="sign-in" showBanner={false} showProfile={false} />
            </SideModal>
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
                    <Button
                        subscribed={subscribed}
                        handleSubscribe={handleSubscribe}
                        className={`${className} p-0 relative font-bold`}
                    />
                </span>
            </Tooltip>
        </>
    ) : null
}
