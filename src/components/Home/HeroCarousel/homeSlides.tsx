import React from 'react'
import { IconPlug, IconRewindPlay, IconSupport, IconWarning } from '@posthog/icons'
import Link from 'components/Link'
import { SignupCTA } from 'components/SignupCTA'
import useSourcePlatforms from 'hooks/useSourcePlatforms'
import AskAnythingDemo from './AskAnythingDemo'
import { useToolsProducts } from 'components/Home/ToolsTicker'
import ToolsTickerStrip from 'components/Home/ToolsTicker/ToolsTickerStrip'
import ProductContextDemo from './ProductContextDemo'
import InboxDemo from './InboxDemo'
import MCPInstallCTA from 'components/MCPInstallCTA'
import { useTranslation } from 'i18n'

// The analytics event keeps the English label, so a translated button reports the same event.
const SIGNUP_EVENT = { name: 'clicked Get started - free', type: 'cloud' }

const signalSources = [
    {
        Icon: IconWarning,
        color: 'text-yellow',
        name: 'Error tracking',
        description: 'section.2c.signals.1.body',
        href: '/error-tracking',
    },
    {
        Icon: IconRewindPlay,
        color: 'text-orange',
        name: 'Session replay',
        description: 'section.2c.signals.2.body',
        href: '/session-replay',
    },
    {
        Icon: IconSupport,
        color: 'text-blue',
        name: 'Support',
        nameKey: 'section.2c.signals.3.title',
        description: 'section.2c.signals.3.body',
        href: '/support',
    },
    {
        Icon: IconPlug,
        color: 'text-purple',
        name: 'External tools',
        nameKey: 'section.2c.signals.4.title',
        description: 'section.2c.signals.4.body',
        href: '/docs/self-driving/signals',
    },
]

export const GiveAgentsContext = () => {
    const { t } = useTranslation()

    return (
        <div className="@container rounded p-4 @md:p-6 h-full bg-accent/20">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-start">
                <ProductContextDemo />
                <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold m-0">{t('section.2b.heading')}</h2>
                    <p className="text-secondary m-0">{t('section.2b.body')}</p>
                    <MCPInstallCTA />
                </div>
            </div>
        </div>
    )
}

export const ShipWithPostHogSlide = () => {
    const { t } = useTranslation()

    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-start">
                <InboxDemo />
                <div className="flex flex-col gap-3">
                    <h2 className="text-2xl font-bold m-0">{t('section.2c.heading')}</h2>
                    <p className="text-secondary m-0">{t('section.2c.body')}</p>
                    <SignupCTA
                        size="md"
                        state={{ initialTab: 'signup' }}
                        text={t('section.2c.button')}
                        event={SIGNUP_EVENT}
                    />
                    <p className="text-sm text-secondary mb-0 mt-2">{t('section.2c.signals.heading')}</p>
                    <ul className="not-prose grid grid-cols-2 gap-x-4 gap-y-3 list-none p-0 m-0">
                        {signalSources.map(({ Icon, color, name, nameKey, description, href }) => (
                            <li key={name}>
                                <Link
                                    to={href}
                                    state={{ newWindow: true }}
                                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline underline-offset-2"
                                >
                                    <Icon
                                        aria-hidden="true"
                                        className={`size-5 shrink-0 fill-current [&_g]:[clip-path:none] ${color}`}
                                    />
                                    {nameKey ? t(nameKey) : name}
                                </Link>
                                <p className="text-xs leading-snug text-secondary m-0 mt-1">{t(description)}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export const AskAnythingSlide = () => {
    const sourcePlatforms: { label: string; url: string; image: string }[] = useSourcePlatforms()
    const products = useToolsProducts()
    const { t, rich } = useTranslation()

    return (
        <div className="@container rounded p-4 @md:p-6 h-full">
            <div className="grid grid-cols-1 @2xl:grid-cols-[1.4fr_1fr] gap-6 @2xl:gap-8 items-start">
                <AskAnythingDemo />

                <div className="flex flex-col gap-3">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold m-0">{t('section.2a.heading')}</h2>
                    </div>
                    <p className="text-secondary m-0">{t('section.2a.body.1')}</p>
                    <p className="text-secondary m-0">
                        {rich(
                            'section.2a.body.2',
                            {
                                link: (text) => (
                                    <Link
                                        to="/docs/cdp/sources"
                                        state={{ newWindow: true }}
                                        className="underline underline-offset-2"
                                    >
                                        {text}
                                    </Link>
                                ),
                            },
                            { count: Math.round(sourcePlatforms.length / 100) * 100 }
                        )}
                    </p>
                    <SignupCTA
                        size="md"
                        state={{ initialTab: 'signup' }}
                        text={t('section.2a.button')}
                        event={SIGNUP_EVENT}
                    />
                    <div className="@container/tools mt-2 min-w-0">
                        <ToolsTickerStrip products={products} compact />
                    </div>
                </div>
            </div>
        </div>
    )
}
