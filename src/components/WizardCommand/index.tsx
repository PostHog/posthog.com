import React from 'react'
import PlatformInstall from 'components/PlatformInstall'

/**
 * Thin backward-compatible alias for the inline PlatformInstall command.
 *
 * WizardCommand was the original install-command component; PlatformInstall is now the single source
 * of truth for both rendering and command-building. This wrapper is kept so the existing
 * `<WizardCommand>` call sites (many in MDX prose, plus the global shortcode) render the consolidated
 * component with zero changes — it owns no logic, it just maps the old prop names onto
 * `<PlatformInstall variant="inline" />`.
 */
export default function WizardCommand({
    className = '',
    command = '',
    selfDriving = false,
    slim = false,
    variant = 'default',
    onCopy,
}: {
    className?: string
    command?: string
    selfDriving?: boolean
    slim?: boolean
    variant?: 'default' | 'bordered'
    onCopy?: () => void
}): JSX.Element {
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
