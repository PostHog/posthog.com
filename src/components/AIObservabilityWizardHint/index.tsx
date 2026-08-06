import React from 'react'
import WizardHint from 'components/WizardHint'

/**
 * WizardHint preconfigured for AI observability: pushes `npx @posthog/wizard ai-observability`,
 * which installs the SDK and instruments a project's LLM calls instead of setting them up by hand.
 */
export default function AIObservabilityWizardHint({ className = '' }: { className?: string }): JSX.Element {
    return (
        <WizardHint
            className={className}
            command="ai-observability"
            dismissKey="ai-observability-wizard-hint"
            title="Let AI instrument your LLM calls for you"
            subtitle="Skip the manual setup — run this in your project and the wizard installs the SDK and wires up AI Observability for you."
        />
    )
}
