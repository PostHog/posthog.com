import React from 'react'
import { CopyableCommand } from 'components/PlatformInstall/CopyableCommand'

export interface ScriptInstallCalloutProps {
    title: string
    description: React.ReactNode
    command: string
    /** Gradient text on the command (wizard branding) */
    commandGradient?: boolean
    footer?: React.ReactNode
    className?: string
}

/**
 * Reusable block for copyable install scripts (AI wizard today; more commands later).
 */
export default function ScriptInstallCallout({
    title,
    description,
    command,
    commandGradient = true,
    footer,
    className,
}: ScriptInstallCalloutProps): JSX.Element {
    const rootClass = className
        ? `border border-primary rounded p-5 bg-primary ${className}`
        : 'border border-primary rounded p-5 bg-primary'

    return (
        <div className={rootClass}>
            <h3 className="text-lg font-bold text-primary mt-0 mb-2">{title}</h3>
            <div className="text-sm text-secondary leading-relaxed m-0 mb-3">{description}</div>
            <CopyableCommand command={command} animate={commandGradient} className="mb-0" />
            {footer ? <div className="mt-2">{footer}</div> : null}
        </div>
    )
}
