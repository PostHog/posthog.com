import React, { Fragment, useState, useEffect } from 'react'
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
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import CodeBlock from '../Home/CodeBlock'
import ContactForm from '../Home/ContactForm'
import { useLocation } from '@reach/router'
import OSTabs from 'components/OSTabs'
import IntegrationPrompt from 'components/IntegrationPrompt'
import CloudinaryImage from 'components/CloudinaryImage'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import Loading from 'components/Loading'
import ProgressBar from 'components/ProgressBar'

const AIInstall = ({ setActiveTab }) => (
    <div
        data-scheme="primary"
        className="bg-primary text-primary flex flex-col-reverse @xl:flex-row overflow-hidden rounded"
    >
        <div className="flex-1 p-4 @2xl:p-6">
            <IntegrationPrompt />
            <p className="border-t border-primary pt-4 mt-6 text-sm">
                Not into AI?{' '}
                <button className="cursor-pointer font-semibold underline" onClick={() => setActiveTab('signup')}>
                    Sign up the old fashioned way.
                </button>
            </p>
        </div>
        <div
            data-scheme="primary"
            className="w-[40%] hidden @xl:flex items-center justify-center border-l border-primary"
        >
            <div className="w-full bg-accent flex justify-center h-full text-sm relative">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/os_light_4d68fe80d8.png"
                    className="dark:hidden"
                    imgClassName=""
                />
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/os_dark_c5dab7be97.png"
                    className="hidden dark:block"
                    imgClassName=""
                />
                <div className="absolute right-[-3.5rem] top-10 rotate-[45deg] bg-red py-2 px-12 text-white font-code font-semibold">
                    Now with AI <Icons.IconSparkles className="size-4 inline-block ml-1" />
                </div>
                {/* <img src="https://res.cloudinary.com/dmukukwp6/image/upload/yc_approved_347c12b8e6.png" /> */}
            </div>
        </div>
    </div>
)

const BoomerInstall = () => (
    <div className="flex flex-1 h-full md:h-[630px] relative">
        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center">
            <Loading className="size-8 text-muted" />
            <div className="text-sm text-secondary">Loading...</div>
        </div>
        <iframe
            src="https://app.posthog.com/signup"
            className="w-full h-full border-0 rounded relative z-10"
            title="PostHog signup"
            fetchPriority="high"
        />
    </div>
)

export default function Start({ subdomain = 'app', initialTab = 'ai' }) {
    const [activeTab, setActiveTab] = useState(initialTab)
    const { search } = useLocation()
    useEffect(() => {
        const params = new URLSearchParams(search)
        const flow = params.get('flow')
        if (flow) {
            setCurrentFlow(flow)
        }
    }, [search])

    return (
        <>
            <SEO
                title="Get started – free"
                description="PostHog is the only all-in-one platform for product analytics, feature flags, session replays, experiments, and surveys that's built for developers."
                image={`/images/og/default.png`}
            />
            <OSTabs
                forceMount
                tabs={[
                    {
                        label: 'Install with AI',
                        value: 'ai',
                        content: <AIInstall setActiveTab={setActiveTab} />,
                    },
                    {
                        label: 'Web signup',
                        value: 'signup',
                        content: <BoomerInstall />,
                    },
                ]}
                triggerDataScheme="primary"
                value={activeTab}
                padding
                className="h-full pt-2 px-4 pb-4"
                contentPadding={false}
                onValueChange={setActiveTab}
                extraTabRowContent={
                    <div data-scheme="primary" className="hidden @xl:inline-block text-primary ml-auto text-sm">
                        Need help?{' '}
                        <Link
                            to="/talk-to-a-human"
                            state={{ newWindow: true }}
                            className="group font-semibold underline inline-flex items-center"
                        >
                            <span>Talk to a human</span>
                            <Icons.IconArrowUpRight className="size-3 inline-block text-secondary group-hover:text-primary" />
                        </Link>
                    </div>
                }
                scrollAreaClasses="[&>div]:h-full"
                tabContentClassName="h-full"
            />
        </>
    )
}
