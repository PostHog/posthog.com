import React, { useEffect, useState } from 'react'
import { TrackedCTA } from 'components/CallToAction'
import usePostHog from 'hooks/usePostHog'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'

const SignupEmbed = (props: any) => {
    const { setWindowTitle } = useApp()
    const { appWindow } = useWindow()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Signup trends')
        }
    }, [])

    return (
        <iframe
            className="m-0 size-full"
            width="100%"
            height="100%"
            src="https://app.posthog.com/embedded/gQMqaRP0ZH0V3P3XXrSDnNcqDGoe7Q?refresh=true"
        />
    )
}

const RegionButton = ({
    active,
    onClick,
    children,
}: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
}) => (
    <button
        onClick={onClick}
        className={`flex-1 flex flex-col items-center py-1.5 px-2 text-sm rounded border ${
            active ? 'border-yellow bg-yellow/25 dark:bg-white/5 font-bold' : 'border-primary bg-transparent'
        }`}
    >
        {children}
    </button>
)

/**
 * Region picker + the single signup CTA used across the redesigned pricing page.
 *
 * There is intentionally one CTA for both free and pay-as-you-go: signup is the
 * same flow either way, the only difference is whether you attach a card in-app.
 */
export default function SignupBlock({ className = '' }: { className?: string }): JSX.Element {
    const posthog = usePostHog()
    const { addWindow } = useApp()
    const [region, setRegion] = useState('us')
    const [signupCountToday, setSignupCountToday] = useState(0)
    const [signupCountLoading, setSignupCountLoading] = useState(true)

    useEffect(() => {
        if (posthog?.isFeatureEnabled('direct-to-eu-cloud')) {
            setRegion('eu')
        }
        fetch(`/api/signup-count`)
            .then((res) => res.json())
            .then((count) => {
                setSignupCountToday(count)
                setSignupCountLoading(false)
            })
            .catch((err) => {
                console.error(err)
                setSignupCountLoading(false)
            })
    }, [])

    return (
        <div className={className}>
            <div className="mb-4">
                <label className="block opacity-75 text-[15px] mb-1">Cloud region</label>
                <div className="flex gap-2">
                    <RegionButton active={region === 'us'} onClick={() => setRegion('us')}>
                        US (Virginia)
                    </RegionButton>
                    <RegionButton active={region === 'eu'} onClick={() => setRegion('eu')}>
                        EU (Frankfurt)
                    </RegionButton>
                </div>
            </div>

            <TrackedCTA
                state={{ initialTab: 'signup' }}
                event={{
                    name: `clicked Get started - free`,
                    type: 'cloud',
                    intent: 'free',
                }}
                size="lg"
                width="full"
                className="shadow-md !block"
                to={`https://${region === 'eu' ? 'eu' : 'app'}.posthog.com/signup`}
            >
                Get started - free
            </TrackedCTA>

            <p
                className={`text-sm text-center mt-4 mb-0 transition-opacity text-secondary ${
                    signupCountLoading ? 'opacity-0' : 'opacity-100'
                }`}
            >
                {signupCountToday ? <strong>{signupCountToday}</strong> : 'Tons of'} companies signed up{' '}
                {signupCountToday ? (
                    <button
                        onClick={() =>
                            addWindow(
                                (
                                    <SignupEmbed location={{ pathname: 'signup-embed' }} key="signup-embed" newWindow />
                                ) as any
                            )
                        }
                        className="font-bold text-red dark:text-yellow"
                    >
                        today
                    </button>
                ) : (
                    <>today</>
                )}
            </p>
        </div>
    )
}
