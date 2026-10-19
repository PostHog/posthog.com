import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { motion } from 'framer-motion'
import { useState } from 'react'
import IntegrationPrompt from 'components/IntegrationPrompt'
import Link from 'components/Link'
import { IconHeadset, IconPlayFilled } from '@posthog/icons'
import { IconDiscord, IconMCP } from 'components/OSIcons'

/**
 * Secondary links shown under the buttons. A product can change the set with
 * `ctaLinks` on its product data (e.g. `src/hooks/productData/replay_vision.tsx`),
 * which the Overview template passes through as `links`.
 */
export type CTALinkKey = 'mcp' | 'demo' | 'discord' | 'talk-to-a-human'

const ctaLinks: Record<CTALinkKey, { to: string; label: string; Icon: React.ComponentType<any> }> = {
    mcp: { to: '/docs/model-context-protocol', label: 'MCP', Icon: IconMCP },
    demo: { to: '/demo', label: 'Watch a demo', Icon: IconPlayFilled },
    discord: { to: 'https://discord.gg/t57vmkcm95', label: 'Discord', Icon: IconDiscord },
    'talk-to-a-human': { to: '/talk-to-a-human', label: 'Talk to a human', Icon: IconHeadset },
}

const DEFAULT_LINKS: CTALinkKey[] = ['mcp', 'demo', 'talk-to-a-human']

export const CTAs = ({ wizardCommand, links = DEFAULT_LINKS }: { wizardCommand?: string; links?: CTALinkKey[] }) => {
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
                    <IntegrationPrompt command={wizardCommand} />
                </div>
            </motion.div>

            <p className="!text-sm flex flex-wrap items-center gap-2 mt-4 justify-start">
                {links.map((key, index) => {
                    const { to, label, Icon } = ctaLinks[key]
                    const external = to.startsWith('http')
                    return (
                        <React.Fragment key={key}>
                            {index > 0 && <span className="text-secondary">•</span>}
                            <Link
                                to={to}
                                state={external ? undefined : { newWindow: true }}
                                externalNoIcon={external}
                                className="text-secondary hover:text-primary"
                            >
                                <Icon className="size-4 mr-1 inline-block relative -top-px" />
                                <span className="underline font-semibold">{label}</span>
                            </Link>
                        </React.Fragment>
                    )
                })}
            </p>
        </>
    )
}
