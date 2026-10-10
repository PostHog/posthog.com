import React from 'react'
import { IconArrowUpRight, IconLaptop } from '@posthog/icons'
import { IconOpenAI } from 'components/OSIcons'
import Link from 'components/Link'
import PlatformInstall, { mcpInstallSchema } from 'components/PlatformInstall'
import type { InstallSchema } from 'components/PlatformInstall'
import { useTranslation } from 'i18n'

const compactMcpSchema: InstallSchema = {
    ...mcpInstallSchema,
    supports: undefined,
    secondaryAction: { label: 'Docs', to: '/docs/model-context-protocol', state: { newWindow: true } },
    platforms: [
        ...mcpInstallSchema.platforms.filter(({ id }) => id === 'claude'),
        {
            id: 'chatgpt',
            label: 'ChatGPT',
            group: 'platforms',
            icon: <IconOpenAI className="size-4" />,
            href: 'https://chatgpt.com/plugins/plugin_asdk_app_699caef2d680819188727b0ddbb349dd',
        },
        ...mcpInstallSchema.platforms.filter(({ id }) => ['codex', 'cursor', 'vscode'].includes(id)),
    ],
}

interface MCPInstallCTAProps {
    className?: string
    /** The link to PostHog Desktop below the card. The MCP page hides it. */
    showDesktopLink?: boolean
}

export default function MCPInstallCTA({ className = '', showDesktopLink = true }: MCPInstallCTAProps): JSX.Element {
    const { t, rich } = useTranslation()

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <PlatformInstall
                schema={{ ...compactMcpSchema, title: t('section.2b.cta.label') }}
                linkOnly
                hideSecondaryAction
                className="!shadow-none !mb-0"
            />
            {showDesktopLink && (
                <p className="text-sm text-secondary m-0 inline-flex gap-1">
                    {rich('section.2b.cta.alt', {
                        link: (text) => (
                            <Link
                                to="/desktop"
                                state={{ newWindow: true }}
                                className="inline-flex items-center gap-1 underline underline-offset-2"
                            >
                                <IconLaptop className="size-4" /> {text} <IconArrowUpRight className="size-3" />
                            </Link>
                        ),
                    })}
                </p>
            )}
        </div>
    )
}
