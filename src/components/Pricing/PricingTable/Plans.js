import { TrackedCTA } from 'components/CallToAction/index.tsx'
import { Check2 } from 'components/Icons/Icons'
import Link from 'components/Link'
import CallToAction from 'components/MainNav/Submenus/CallToAction'
import React from 'react'
import { SelfHostIcon } from '../Calculator'
import {
    CLOUD_ENTERPRISE_MINIMUM_PRICING,
    CLOUD_MINIMUM_PRICING,
    ENTERPRISE_MINIMUM_PRICING,
    features,
    SCALE_MINIMUM_PRICING,
} from '../constants'
import { Features, Plan, Price, Section } from './Plan'

const Feature = ({ children }) => {
    return (
        <li className={`text-black font-semibold text-[15px] flex space-x-2 items-center leading-tight`}>
            <span className="w-4 flex justify-center items-center flex-shrink-0 opacity-75">
                <Check2 />
            </span>
            <span>{children}</span>
        </li>
    )
}

export const SelfHosted = ({ hideActions, hideBadge, hideCalculator, className = '' }) => {
    return (
        <Plan
            icon={<SelfHostIcon />}
            title="Self-Host"
            subtitle="with community support"
            badge={'Self-Serve'}
            className={className}
        >
            <div className="h-full flex flex-col">
                <div className="py-3 my-4 border-y border-gray-accent-light border-dashed">
                    <h5 className="text-[15px] opacity-50 m-0 font-medium"> Starts at</h5>
                    <p className="m-0">
                        <span>
                            <strong>$0.00045</strong>
                            <span className="text-[13px] opacity-50">/event</span>
                        </span>
                    </p>
                    <p className="text-blue font-semibold mb-0 text-[14px]">First 1 million events free every month</p>
                </div>
                <ul className="list-none p-0 m-0 grid gap-y-3 mb-6">
                    <Feature>Unlimited tracked users</Feature>
                    <Feature>Unlimited teammates</Feature>
                    <Feature>Unlimited event tracking</Feature>
                </ul>
                <TrackedCTA
                    href="https://license.posthog.com/"
                    className="mt-7 mb-3 mx-auto"
                    event={{ name: `clicked Choose Self-Serve`, type: 'self-hosted' }}
                >
                    Choose Self-Serve
                </TrackedCTA>
            </div>
        </Plan>
    )
}

export const Enterprise = ({ setOpen, hideActions, hideBadge, hideCalculator, className = '' }) => {
    return (
        <Plan
            icon={<SelfHostIcon />}
            title="Self-Host"
            subtitle="with dedicated, proactive support"
            badge={'Enterprise'}
            className={className}
        >
            <div className="h-full flex flex-col">
                <div className="py-3 my-4 border-y border-gray-accent-light border-dashed">
                    <h5 className="text-[15px] opacity-50 m-0 font-medium"> Starts at</h5>
                    <p className="m-0">
                        <strong>$450</strong>
                        <span className="text-[13px] opacity-50">/monthly</span>
                        <span className="inline-block opacity-50 mx-2">+</span>

                        <span>
                            <strong>$0.00045</strong>
                            <span className="text-[13px] opacity-50">/event</span>
                        </span>
                    </p>

                    <p className="text-blue font-semibold mb-0 text-[14px]">First 1 million events free every month</p>
                </div>
                <p className="text-[13px] text-black/50 mb-2">Self-Serve benefits plus...</p>
                <ul className="list-none p-0 m-0 grid gap-y-3 mb-6">
                    <Feature>SQL access</Feature>
                    <Feature>Team training</Feature>
                    <Feature>SSO/SAML</Feature>
                    <Feature>Project permissions</Feature>
                    <Feature>Configurable backups</Feature>
                </ul>
                <TrackedCTA
                    href="https://license.posthog.com/?price_id=price_1L1AeWEuIatRXSdzj0Y5ioOU"
                    className="mt-7 mb-3 mx-auto"
                    event={{ name: `clicked Choose Enterprise`, type: 'self-hosted-enterprise' }}
                >
                    Choose Enterprise
                </TrackedCTA>
            </div>
        </Plan>
    )
}
