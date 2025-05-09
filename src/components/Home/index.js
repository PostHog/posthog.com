import React, { Fragment, useState } from 'react'
import SEO from 'components/seo'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import { productMenu } from '../../navs'
import * as Icons from '@posthog/icons'
import Link from 'components/Link'
import { IconBold, IconLink } from 'components/OSIcons'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from 'components/Logo'
import { RadioGroup } from 'components/RadixUI/RadioGroup'
import { navigate } from 'gatsby'
import usePostHog from '../../hooks/usePostHog'

const menuOptions = [
    {
        label: 'Try it – free',
        value: '/signup',
        default: true,
    },
    {
        label: 'Install with AI',
        value: '/ai-install',
    },
    {
        label: 'Talk to a human',
        value: '/contact-sales',
    },
]

export default function Home() {
    const posthog = usePostHog()
    const [selectedOption, setSelectedOption] = useState(menuOptions[0].value)

    const handleContinue = () => {
        if (selectedOption) {
            navigate(selectedOption)
        }
    }
    return (
        <>
            <SEO
                title="PostHog - How developers build successful products"
                description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                image={`/images/home.png`}
            />
            <Wizard
                rightNavigation={
                    <>
                        <CallToAction type="secondary" size="sm">
                            Continue
                        </CallToAction>
                    </>
                }
            >
                <div className="flex flex-1 w-full border-y border-primary">
                    <div
                        data-scheme="primary"
                        className="w-[40%] flex items-center justify-center p-2 border-r border-primary"
                    >
                        <div className="w-full bg-accent flex items-center justify-center h-full text-sm relative border border-primary overflow-hidden">
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/3000_773e0d4c49.png"
                                className=""
                            />
                            <img
                                src="https://res.cloudinary.com/dmukukwp6/image/upload/yc_approved_347c12b8e6.png"
                                className="absolute -right-24 top-6 rotate-[45deg]"
                            />
                        </div>
                    </div>
                    <div className="w-[60%] flex flex-col justify-center px-8 py-4">
                        <Logo className="h-10 mb-4" />
                        <h1 className="text-xl font-bold mb-1">The toolkit for building successful products</h1>
                        <p className="text-secondary text-[15px]">
                            PostHog is the single platform to build products, talk to users, and ship new features
                        </p>
                        <div className="mt-4">
                            <RadioGroup
                                title="Menu options"
                                options={menuOptions}
                                value={selectedOption}
                                onValueChange={setSelectedOption}
                            />

                            <div className="mt-6 text-sm border-t border-primary pt-6">
                                You can also{' '}
                                <Link to="/tour" className="text-red font-semibold">
                                    take a tour
                                </Link>{' '}
                                or learn{' '}
                                <Link to="/#" className="text-red font-semibold">
                                    why our website looks like this
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Wizard>
        </>
    )
}
