import React from 'react'
import PlatformInstall from 'components/PlatformInstall'
import { RenderInClient } from 'components/RenderInClient'
import usePostHog from 'hooks/usePostHog'

/**
 * A subcommand that replaces `command` while a PostHog feature flag is on, so a page can
 * recommend a new wizard command before it is released to everyone.
 */
export type FlagCommand = {
    /** The PostHog feature flag key, evaluated in the browser. */
    flag: string
    /** The subcommand to show while the flag is on, e.g. `error-tracking`. */
    command: string
}

type WizardCommandProps = {
    className?: string
    command?: string
    selfDriving?: boolean
    slim?: boolean
    variant?: 'default' | 'bordered'
    onCopy?: () => void
    /**
     * Swap `command` for another subcommand while a feature flag is on. The server render and the
     * first client render show `command`; the swap happens once flags load, or not at all when they
     * do not load (an ad blocker), so the page always has a working command.
     */
    flagCommand?: FlagCommand
}

/**
 * Thin backward-compatible alias for the inline PlatformInstall command.
 *
 * WizardCommand was the original install-command component; PlatformInstall is now the single source
 * of truth for both rendering and command-building. This wrapper is kept so the existing
 * `<WizardCommand>` call sites (many in MDX prose, plus the global shortcode) render the consolidated
 * component with zero changes — it maps the old prop names onto `<PlatformInstall variant="inline" />`,
 * and resolves the optional `flagCommand` rollout.
 */
export default function WizardCommand({ flagCommand, ...props }: WizardCommandProps): JSX.Element {
    if (!flagCommand) {
        return <InlineWizardCommand {...props} />
    }
    return (
        <RenderInClient
            placeholder={<InlineWizardCommand {...props} />}
            render={() => <FlaggedWizardCommand flagCommand={flagCommand} {...props} />}
        />
    )
}

function FlaggedWizardCommand({
    flagCommand,
    command,
    ...props
}: Omit<WizardCommandProps, 'flagCommand'> & { flagCommand: FlagCommand }): JSX.Element {
    const posthog = usePostHog()
    const enabled = posthog?.isFeatureEnabled?.(flagCommand.flag)
    return <InlineWizardCommand {...props} command={enabled ? flagCommand.command : command} />
}

function InlineWizardCommand({
    className = '',
    command = '',
    selfDriving = false,
    slim = false,
    variant = 'default',
    onCopy,
}: Omit<WizardCommandProps, 'flagCommand'>): JSX.Element {
    return (
        <PlatformInstall
            variant="inline"
            command={command}
            selfDriving={selfDriving}
            slim={slim}
            bordered={variant === 'bordered'}
            className={className}
            onCopy={onCopy}
        />
    )
}
