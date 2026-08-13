import React from 'react'
import { RenderInClient } from 'components/RenderInClient'
import { TrackedCTA } from 'components/CallToAction'
import WizardCommand from 'components/WizardCommand'
import usePostHog from '../../hooks/usePostHog'

export const CONTEXT_WAREHOUSE_CTA_FLAG = 'context-warehouse-cta'

const SOURCES_URL = 'https://app.posthog.com/data-management/sources'

const GET_STARTED_EVENT = 'contextwarehousecta-getstarted-clicked'
const COPY_EVENT = 'contextwarehousecta-copy-clicked'

/**
 * Control. The CTA exactly as it shipped before the experiment: a button into the in-app source
 * setup flow. Tracked so the experiment can compare click-through against the wizard variant, not
 * just the downstream source-connected rate.
 */
const GetStartedButton = ({ label }: { label: string }) => (
    <TrackedCTA to={SOURCES_URL} externalNoIcon size="md" event={{ name: GET_STARTED_EVENT }}>
        {label}
    </TrackedCTA>
)

/**
 * Test. `npx @posthog/wizard warehouse` in place of the button — the wizard auto-detects databases
 * and APIs in the user's codebase and connects them, rather than sending them to configure a source
 * by hand. WizardCommand copies the pinned `npx -y @posthog/wizard@latest warehouse` form.
 */
const WizardCommandCTA = () => {
    const posthog = usePostHog()

    return <WizardCommand command="warehouse" variant="bordered" onCopy={() => posthog?.capture(COPY_EVENT)} />
}

const VariantSlot = ({ label }: { label: string }) => {
    const posthog = usePostHog()

    // Reading the flag here is what emits the exposure event, so it fires only for people who
    // actually load this page — which is what the experiment's exposure criteria expect.
    return posthog?.getFeatureFlag?.(CONTEXT_WAREHOUSE_CTA_FLAG) === 'wizard-command' ? (
        <WizardCommandCTA />
    ) : (
        <GetStartedButton label={label} />
    )
}

/**
 * The CTA slot on /context-warehouse, behind the `context-warehouse-cta` experiment: the existing
 * "Get started" button (control) vs the warehouse wizard command (test). Both of the page's CTAs
 * render through this component so a visitor sees one consistent path down the whole page.
 *
 * Renders client-side only, like the homepage HeroCTA — a server-rendered variant would be wrong for
 * half of visitors and cause a hydration mismatch. The placeholder reserves the CTA's height so the
 * surrounding card doesn't shift once flags resolve.
 */
export default function ContextWarehouseCTA({ label = 'Get started' }: { label?: string }): JSX.Element {
    return (
        <RenderInClient
            placeholder={<div className="h-10" aria-hidden />}
            render={() => <VariantSlot label={label} />}
        />
    )
}
