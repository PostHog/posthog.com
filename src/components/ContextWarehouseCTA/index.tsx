import React, { useState } from 'react'
import { RenderInClient } from 'components/RenderInClient'
import { CallToAction, TrackedCTA } from 'components/CallToAction'
import WizardCommand from 'components/WizardCommand'
import usePostHog from '../../hooks/usePostHog'
import { cn } from '../../utils'

export const CONTEXT_WAREHOUSE_CTA_FLAG = 'context-warehouse-cta'

const SOURCES_URL = 'https://app.posthog.com/data-management/sources'

const GET_STARTED_EVENT = 'contextwarehousecta-getstarted-clicked'
const INSTALL_WITH_AI_EVENT = 'contextwarehousecta-installwithai-clicked'
const COPY_EVENT = 'contextwarehousecta-copy-clicked'

/** The button the page ships with today: straight into the in-app source setup flow. */
const GetStartedButton = ({ label, width = 'auto' }: { label: string; width?: string }) => (
    <TrackedCTA to={SOURCES_URL} externalNoIcon size="md" width={width} event={{ name: GET_STARTED_EVENT }}>
        {label}
    </TrackedCTA>
)

/**
 * `npx @posthog/wizard warehouse` — the wizard scans the user's codebase for databases and APIs and
 * connects them, instead of sending them to configure one source at a time. WizardCommand displays
 * the clean form and copies the pinned `npx -y @posthog/wizard@latest warehouse`.
 */
const WizardCommandCTA = () => {
    const posthog = usePostHog()

    return <WizardCommand command="warehouse" variant="bordered" onCopy={() => posthog?.capture(COPY_EVENT)} />
}

/* -------------------------------------------------------------------------------------------------
 * control — the CTA exactly as it shipped before the experiment.
 * ---------------------------------------------------------------------------------------------- */

const VariantControl = ({ label }: { label: string }) => <GetStartedButton label={label} />

/* -------------------------------------------------------------------------------------------------
 * install-with-ai — additive. "Get started" keeps its place and "Install with AI" sits beside it,
 * revealing the command on click. This is the pattern the rest of the site already uses, and it's the
 * conservative arm: the homepage test showed that taking "Get started" away is what costs conversion,
 * not that offering the terminal route hurts.
 * ---------------------------------------------------------------------------------------------- */

const VariantInstallWithAI = ({ label }: { label: string }) => {
    const [showCommand, setShowCommand] = useState(false)
    const posthog = usePostHog()

    const toggleCommand = () => {
        setShowCommand((current) => {
            // Only count opening it — a second click is the user collapsing it again, not new intent.
            if (!current) {
                posthog?.capture(INSTALL_WITH_AI_EVENT)
            }
            return !current
        })
    }

    return (
        <div className="@container">
            <div className="flex flex-col @[340px]:flex-row gap-2">
                <GetStartedButton label={label} />
                <CallToAction type="secondary" size="md" onClick={toggleCommand}>
                    <span className="whitespace-nowrap">Install with AI</span>
                </CallToAction>
            </div>
            <div
                className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-in-out',
                    showCommand ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
            >
                <div className="overflow-hidden min-h-0">
                    <div className="pt-3 space-y-1.5">
                        <p className="!text-xs text-secondary m-0">Happier in the terminal? Skip the browser:</p>
                        <WizardCommandCTA />
                    </div>
                </div>
            </div>
        </div>
    )
}

/* -------------------------------------------------------------------------------------------------
 * wizard-command — all in. The command replaces the button outright. Worth measuring even though the
 * equivalent homepage arm didn't win, because the warehouse subcommand connects every source it finds
 * in one pass, so the upside here is more data connected rather than just a faster signup.
 * ---------------------------------------------------------------------------------------------- */

const VariantWizardCommand = () => <WizardCommandCTA />

const VARIANTS: Record<string, ({ label }: { label: string }) => JSX.Element> = {
    'install-with-ai': VariantInstallWithAI,
    'wizard-command': VariantWizardCommand,
}

const VariantSlot = ({ label }: { label: string }) => {
    const posthog = usePostHog()

    // Reading the flag here is what emits the exposure event, so it fires only for people who
    // actually load this page — which is what the experiment's exposure criteria expect.
    const variant = posthog?.getFeatureFlag?.(CONTEXT_WAREHOUSE_CTA_FLAG)
    const Variant = (typeof variant === 'string' && VARIANTS[variant]) || VariantControl

    return <Variant label={label} />
}

/**
 * The CTA slot on /context-warehouse, behind the `context-warehouse-cta` experiment. Any value other
 * than a known variant key — control, an unresolved flag, an adblocked one — falls back to the
 * "Get started" button, so the page never renders without a CTA.
 *
 * Renders client-side only, like the homepage HeroCTA — a server-rendered variant would be wrong for
 * most visitors and cause a hydration mismatch. The placeholder reserves the CTA's height so the
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
