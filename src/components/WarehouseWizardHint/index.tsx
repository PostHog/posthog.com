import React, { useEffect, useState } from 'react'
import { IconSparkles, IconX } from '@posthog/icons'
import WizardCommand from 'components/WizardCommand'

// Persist dismissal so the hint doesn't nag a user who has already seen it. Mirrors the
// product app's WarehouseWizardHint, which uses the same localStorage key.
const DISMISSED_KEY = 'warehouse-wizard-hint-dismissed'

/**
 * Agent-flavored nudge that pushes the `npx @posthog/wizard warehouse` CLI, which auto-detects
 * and connects a user's databases/APIs straight from their codebase instead of setting up a
 * source by hand. Ported from the PostHog product app so the same prompt shows on the marketing
 * site's data-source pages.
 */
export default function WarehouseWizardHint({ className = '' }: { className?: string }): JSX.Element | null {
    // Start hidden so SSR renders nothing and a user who already dismissed it never sees a flash.
    // The effect reveals the hint on the client unless it was previously dismissed.
    const [hidden, setHidden] = useState(true)

    useEffect(() => {
        setHidden(localStorage.getItem(DISMISSED_KEY) === '1')
    }, [])

    if (hidden) {
        return null
    }

    const handleDismiss = () => {
        localStorage.setItem(DISMISSED_KEY, '1')
        setHidden(true)
    }

    return (
        <div
            data-scheme="secondary"
            className={`not-prose relative rounded-md border border-dashed border-primary bg-accent p-4 flex flex-col gap-3 ${className}`}
        >
            <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss"
                className="absolute top-2 right-2 text-secondary hover:text-primary cursor-pointer"
            >
                <IconX className="size-4" />
            </button>
            <div className="flex items-center gap-2 pr-6">
                <IconSparkles className="size-5 shrink-0" />
                <h4 className="m-0 text-[15px] font-semibold">Let AI connect your sources for you</h4>
            </div>
            <p className="m-0 text-sm text-secondary">
                Skip the manual setup — run this in your project and the wizard auto-detects your databases and APIs and
                connects them to PostHog.
            </p>
            <div>
                <WizardCommand command="warehouse" slim />
            </div>
        </div>
    )
}
