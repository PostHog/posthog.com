import React from 'react'
import WizardHint from 'components/WizardHint'

/**
 * WizardHint preconfigured for the data warehouse: pushes `npx @posthog/wizard warehouse`, which
 * auto-detects and connects a user's databases/APIs straight from their codebase instead of
 * setting up a source by hand. The dismissal key mirrors the product app's WarehouseWizardHint,
 * which uses the same localStorage key.
 */
export default function WarehouseWizardHint({ className = '' }: { className?: string }): JSX.Element {
    return (
        <WizardHint
            className={className}
            command="warehouse"
            dismissKey="warehouse-wizard-hint"
            title="Let AI connect your sources for you"
            subtitle="Skip the manual setup — run this in your project and the wizard auto-detects your databases and APIs and connects them to PostHog."
        />
    )
}
