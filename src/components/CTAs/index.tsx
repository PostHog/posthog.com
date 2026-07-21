import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { motion } from 'framer-motion'
import { useState } from 'react'
import IntegrationPrompt from 'components/IntegrationPrompt'
import Link from 'components/Link'
import { IconHeadset, IconPlayFilled } from '@posthog/icons'
import { IconMCP } from 'components/OSIcons'

export const CTAs = () => {
    const [showIntegrationPrompt, setShowIntegrationPrompt] = useState(false)
    return (
        <>
            <div className="@container">
                <div className="flex flex-col @xs:flex-row gap-3 @sm:gap-2">
                    <CallToAction
                        to="https://app.posthog.com/signup"
                        size="lg"
                        state={{ newWindow: true, initialTab: 'signup' }}
                    >
                        Get started - free
                    </CallToAction>
                    <CallToAction
                        type="secondary"
                        size="lg"
                        onClick={() => setShowIntegrationPrompt((current) => !current)}
                    >
                        Install with AI
                    </CallToAction>
                </div>
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

            <p className="!text-sm flex flex-wrap items-center gap-2 mt-4 justify-start">
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
                <Link to="/talk-to-a-human" state={{ newWindow: true }} className="text-secondary hover:text-primary">
                    <IconHeadset className="size-4 mr-1 inline-block relative -top-px" />
                    <span className="underline font-semibold">Talk to a human</span>
                </Link>
            </p>
        </>
    )
}
