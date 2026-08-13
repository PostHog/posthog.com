import React, { useState } from 'react'
import { CallToAction, TrackedCTA } from 'components/CallToAction'
import WizardCommand from 'components/WizardCommand'
import usePostHog from '../../hooks/usePostHog'
import { cn } from '../../utils'

const SOURCES_URL = 'https://app.posthog.com/data-management/sources'

const GET_STARTED_EVENT = 'contextwarehousecta-getstarted-clicked'
const INSTALL_WITH_AI_EVENT = 'contextwarehousecta-installwithai-clicked'
const COPY_EVENT = 'contextwarehousecta-copy-clicked'

/**
 * The CTA slot on /context-warehouse: "Get started" into the in-app source setup, with "Install with
 * AI" beside it revealing `npx @posthog/wizard warehouse` — the wizard scans the user's codebase for
 * databases and APIs and connects every source it finds, instead of asking them to configure sources
 * one at a time. WizardCommand displays the clean command and copies the pinned
 * `npx -y @posthog/wizard@latest warehouse`.
 *
 * Additive on purpose: the button keeps its place and the terminal route is offered next to it, which
 * is the pattern the rest of the site already uses. Both CTAs on the page render through this
 * component so a visitor gets one consistent path from top to bottom.
 *
 * The three events below aren't wired to an experiment — they're here so the split between the two
 * routes stays visible in the data.
 */
export default function ContextWarehouseCTA({ label = 'Get started' }: { label?: string }): JSX.Element {
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
                <TrackedCTA to={SOURCES_URL} externalNoIcon size="md" event={{ name: GET_STARTED_EVENT }}>
                    {label}
                </TrackedCTA>
                <CallToAction type="secondary" size="md" onClick={toggleCommand}>
                    <span className="whitespace-nowrap">Install with AI</span>
                </CallToAction>
            </div>
            {/* Animating grid rows rather than height keeps the reveal smooth without measuring the
                command's height, which varies with the card's width. */}
            <div
                className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-in-out',
                    showCommand ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
            >
                <div className="overflow-hidden min-h-0">
                    <div className="pt-3 space-y-1.5">
                        <p className="!text-xs text-secondary m-0">Happier in the terminal? Skip the browser:</p>
                        <WizardCommand
                            command="warehouse"
                            variant="bordered"
                            onCopy={() => posthog?.capture(COPY_EVENT)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
