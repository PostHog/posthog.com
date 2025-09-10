import Link from 'components/Link'
import ZoomHover from 'components/ZoomHover'
import React from 'react'
import { IconHandMoney } from '@posthog/icons'

type Platform = {
    label: string
    url?: string
    image?: string
    Icon?: React.ComponentType<{ className?: string }>
    comingSoon?: boolean
}
const platforms: Platform[] = [
    {
        label: 'Custom events',
        url: '/docs/revenue-analytics/capture-revenue-events',
        Icon: IconHandMoney,
    },
    {
        label: 'Stripe',
        url: '/docs/revenue-analytics/payment-platforms/stripe',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/stripe_5_M7_G5_HUZ_78e9db283e.png',
    },
    {
        label: 'Chargebee',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/chargebee_DYJTQLJ_4_61eab736bc.png',
        comingSoon: true,
    },
    {
        label: 'Polar',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/polar_AOGZF_3_CR_261be8507a.png',
        comingSoon: true,
    },
    {
        label: 'RevenueCat',
        image: 'https://res.cloudinary.com/dmukukwp6/image/upload/revenuecat_WQJWO_62_R_b8d6cc4f49.png',
        comingSoon: true,
    },
] as const

export function GettingStartedSlide(): JSX.Element {
    return (
        <div className="h-full p-12 flex flex-col justify-center text-center bg-light dark:bg-dark">
            <h2 className="text-4xl font-bold text-primary mb-8">Setup your data source</h2>

            <div className="grid grid-cols-1 @2xl:grid-cols-3 gap-4">
                {platforms.map((platform: Platform) => {
                    return (
                        <ZoomHover key={platform.label} width="full">
                            <Link
                                to={platform.url ?? ''}
                                state={{ newWindow: true }}
                                disabled={!platform.url}
                                className="flex flex-col items-center border border-primary rounded p-4 bg-primary hover:bg-accent transition-colors h-full w-full"
                            >
                                <span
                                    className={`inline-block size-8 my-4 text-primary dark:text-primary-dark ${
                                        platform.comingSoon ? 'opacity-50' : ''
                                    }`}
                                >
                                    {platform.image && <img className="icon size-8 rounded-sm" src={platform.image} />}
                                    {platform.Icon && <platform.Icon className="size-8 rounded-sm" />}
                                </span>
                                <h3 className="text-2xl font-bold text-primary mb-2">{platform.label}</h3>
                                {platform.comingSoon && (
                                    <span className="inline-flex px-2 items-center text-[12px] uppercase text-muted">
                                        Coming soon
                                    </span>
                                )}
                            </Link>
                        </ZoomHover>
                    )
                })}
            </div>
        </div>
    )
}
