import React, { useEffect, useState } from 'react'
import { IconCheck } from '@posthog/icons'
import { Link as ScrollLink } from 'react-scroll'
import { TrackedCTA } from 'components/CallToAction'
import usePostHog from 'hooks/usePostHog'
import Modal from 'components/Modal'
import Lottie from 'react-lottie'

export const FreePlanContent = ({ onFreeTierClick }) => {
    return (
        <div>
            <h4 className="text-xl mb-0">Free</h4>
            <p className="text-sm opacity-75">No credit card required</p>

            <ul className="list-none p-0 mb-4 space-y-1">
                <li className="flex items-start gap-2 text-sm">
                    <IconCheck className="text-green inline-block size-5" />
                    <span>
                        Generous{' '}
                        <button onClick={onFreeTierClick} className="text-red dark:text-yellow font-semibold">
                            monthly free tier
                        </button>
                    </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                    <IconCheck className="text-green inline-block size-5" />
                    Community support
                </li>
                <li className="flex items-start gap-2 text-sm">
                    <IconCheck className="text-green inline-block size-5" />1 project, 1-year data retention
                </li>
                <li className="flex items-start gap-2 text-sm">
                    <IconCheck className="text-green inline-block size-5" />
                    Unlimited team members
                </li>
            </ul>
        </div>
    )
}

export const PaidPlanContent = ({ onFreeTierClick }) => {
    return (
        <div>
            <span className="text-70 text-[15px]">From</span>
            <div className="flex items-baseline">
                <h4 className="text-xl mb-0">$0</h4>
                <span className="opacity-70 text-sm">/mo</span>
            </div>
            <p className="text-sm mt-2">
                <ScrollLink
                    to="calculator"
                    offset={-120}
                    smooth
                    className="text-red dark:text-yellow font-semibold text-[15px] cursor-pointer"
                >
                    Estimate your price
                </ScrollLink>
            </p>

            <ul className="list-none p-0 mb-4 space-y-1">
                <li className="flex items-start gap-2 text-sm">
                    <IconCheck className="text-green inline-block size-5" />
                    <span>
                        Generous{' '}
                        <button onClick={onFreeTierClick} className="text-red dark:text-yellow font-semibold">
                            monthly free tier
                        </button>
                    </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                    <IconCheck className="text-green inline-block size-5" />
                    <span>
                        Then,{' '}
                        <strong className="bg-yellow/50 dark:bg-white/10 p-0.5 font-semibold">
                            usage-based pricing
                        </strong>
                    </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                    <IconCheck className="text-green inline-block size-5" />
                    <span>
                        <strong className="bg-yellow/50 dark:bg-white/10 p-0.5 font-semibold">Email</strong> support
                    </span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                    <IconCheck className="text-green inline-block size-5" />6 projects, 7-year data retention
                </li>
                <li className="flex items-start gap-2 text-sm">
                    <IconCheck className="text-green inline-block size-5" />
                    Unlimited team members
                </li>
            </ul>
        </div>
    )
}

const RegionButton = ({ active, onClick, children }) => {
    return (
        <button
            onClick={onClick}
            className={`flex-1 flex flex-col items-center py-1.5 px-2 text-sm rounded border ${
                active
                    ? 'border-yellow bg-yellow/25 dark:bg-white/5 font-bold'
                    : 'border-light hover:border-dark/50 dark:border-dark dark:hover:border-light/50 bg-transparent'
            }`}
        >
            {children}
        </button>
    )
}

export default function PlanContent({ activePlan, onFreeTierClick }) {
    const posthog = usePostHog()
    const [region, setRegion] = useState('us')
    const [signupCountToday, setSignupCountToday] = useState(0)
    const [signupCoundLoading, setSignupCountLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleOpenModal = () => {
        setIsLoading(true)
        setModalOpen(true)
        setTimeout(() => setIsLoading(false), 3000)
    }

    const [hogData, setHogData] = useState<any | null>(null)

    useEffect(() => {
        import('../../../../static/lotties/loading.json').then((data) => setHogData(data.default))
    }, [])

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
        <>
            <Modal open={modalOpen} setOpen={setModalOpen}>
                {isLoading ? (
                    <>
                        {hogData ? (
                            <div className="size-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                <Lottie
                                    options={{
                                        loop: true,
                                        autoplay: true,
                                        animationData: hogData,
                                    }}
                                />
                            </div>
                        ) : (
                            <>Loading...</>
                        )}
                    </>
                ) : (
                    <div className="px-5">
                        <div className="max-w-4xl mx-auto mt-12 relative rounded-md overflow-hidden">
                            <iframe
                                className="m-0"
                                width="100%"
                                height="400"
                                src="https://app.posthog.com/embedded/gQMqaRP0ZH0V3P3XXrSDnNcqDGoe7Q?refresh=true"
                            />
                        </div>
                    </div>
                )}
            </Modal>
            {activePlan === 'free' ? (
                <FreePlanContent onFreeTierClick={onFreeTierClick} />
            ) : (
                <PaidPlanContent onFreeTierClick={onFreeTierClick} />
            )}
            <div className="mt-auto">
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
                    event={{
                        name: `clicked Get started - free`,
                        type: 'cloud',
                        intent: activePlan,
                    }}
                    size="lg"
                    width="full"
                    className="shadow-md !block"
                    to={`https://${region === 'eu' ? 'eu' : 'app'}.posthog.com/signup`}
                >
                    Get started - free
                </TrackedCTA>
                <p
                    className={`text-sm text-center mt-4 mb-0 transition-opacity text-primary/75 dark:text-primary-dark/75 ${
                        signupCoundLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                >
                    {signupCountToday ? <strong>{signupCountToday}</strong> : 'Tons of'} companies signed up{' '}
                    {signupCountToday ? (
                        <button className="font-bold text-red dark:text-yellow" onClick={handleOpenModal}>
                            today
                        </button>
                    ) : (
                        <>today</>
                    )}
                </p>
            </div>
        </>
    )
}
