import React, { useState } from 'react'
import Link from 'components/Link'
import { IconHeadset, IconPlayFilled } from '@posthog/icons'
import { IconMCP } from 'components/OSIcons'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import HeroCarousel from 'components/Home/HeroCarousel'
import Logo from 'components/Logo'
import { useApp } from '../../../context/App'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

export const Hero = () => {
    const { siteSettings } = useApp()
    const [showIntegrationPrompt, setShowIntegrationPrompt] = useState(false)

    return (
        <>
            <div className="text-center @xl:text-left mb-12">
                <CloudinaryImage
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
                    className="w-64 @xl:w-48 @xl:float-right @xl:ml-8 @2xl:w-56 @3xl:w-64 @2xl:float-right -scale-x-100 @xl:mt-16 @3xl:mt-8"
                />
                <h1 className="[&_p]:m-0 flex gap-1 flex-wrap justify-center @xl:justify-start !text-2xl mb-8 pt-2">
                    <Logo className="inline-block h-9" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />{' '}
                </h1>

                <h1 className="!text-2xl pt-4">The new way to build products</h1>
                <p className="text-balance @xl:text-wrap @5xl:text-balance">
                    Product development used to mean manually writing code, running analysis, diagnosing bugs, and
                    rolling out changes using dozens of tools.
                </p>

                <p className="text-balance @xl:text-wrap @5xl:text-balance">
                    PostHog is the only platform that acts like a co-pilot for you (and your AI agents) to do it all –{' '}
                    <em>autonomously</em>.
                </p>

                <div>
                    <div className="flex flex-col @xs:flex-row @xs:justify-center @xl:justify-start gap-3 @sm:gap-2">
                        <CallToAction
                            to="https://app.posthog.com/signup"
                            size="md"
                            state={{ newWindow: true, initialTab: 'signup' }}
                        >
                            Get started - free
                        </CallToAction>
                        <CallToAction
                            type="secondary"
                            size="md"
                            onClick={() => setShowIntegrationPrompt((current) => !current)}
                        >
                            Install with AI
                        </CallToAction>
                    </div>
                    <motion.div
                        className="overflow-hidden"
                        initial={{ height: 0 }}
                        animate={{ height: showIntegrationPrompt ? 'auto' : 0 }}
                    >
                        <div
                            data-scheme="secondary"
                            className="mt-4 p-4 border border-primary rounded-md bg-primary [&_h3]:mt-0 [&_ul]:mb-0 [&_ul]:p-0"
                        >
                            <IntegrationPrompt />
                        </div>
                    </motion.div>
                    <p className="!text-sm flex items-center gap-2 mt-4 justify-center @xl:justify-start">
                        <Link
                            to="/docs/model-context-protocol"
                            state={{ newWindow: true }}
                            className="text-secondary hover:text-primary"
                        >
                            <IconMCP className="size-4 mr-1 inline-block relative -top-px" />
                            <span className="underline font-semibold">MCP</span>
                        </Link>
                        <span className="text-secondary">•</span>
                        <Link to="/demo" state={{ newWindow: true }} className="text-secondary hover:text-primary">
                            <IconPlayFilled className="size-4 mr-1 inline-block relative -top-px" />
                            <span className="underline font-semibold">Watch a demo</span>
                        </Link>
                        <span className="text-secondary">•</span>
                        <Link
                            to="/talk-to-a-human"
                            state={{ newWindow: true }}
                            className="text-secondary hover:text-primary"
                        >
                            <IconHeadset className="size-4 mr-1 inline-block relative -top-px" />
                            <span className="underline font-semibold">Talk to a human</span>
                        </Link>
                    </p>
                </div>
            </div>
            <div className="@container">
                <HeroCarousel />
            </div>
        </>
    )
}

export default Hero
