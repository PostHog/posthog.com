import React from 'react'

import usePostHog from '../../hooks/usePostHog'

import { SingleCodeBlock } from 'components/shared/ui/CodeBlock'
import { CopyableCommand } from 'components/PlatformInstall/CopyableCommand'
import { buildWizardCommand } from 'components/PlatformInstall/buildCommand'
import OSButton from 'components/shared/ui/OSButton'

import { useEntry } from './bookContext'
import { BookPageCta } from './bookModel'

/** Opens PostHog AI with the prompt prefilled and submitted – the site's standard Max deep link. */
const maxPromptUrl = (prompt: string) => `https://app.posthog.com/#panel=max:!${encodeURIComponent(prompt)}`

/** Where the button goes, and the analytics kind that names the action it is. */
function destination(cta: BookPageCta): { href: string; kind: string } {
    if (cta.kind === 'prompt' && cta.prompt) {
        return { href: cta.href || maxPromptUrl(cta.prompt), kind: 'ai_prompt_click' }
    }
    return { href: cta.href || 'https://app.posthog.com', kind: 'cta_link_click' }
}

/**
 * A chapter's one action, for volumes whose answer isn't a scout. Same job as `<Enable />`:
 * every use case ends on something the reader can do, authored in `pocketGuideCta:` frontmatter so the
 * pinned bar and the page's own block never drift apart.
 */
export default function Action(): JSX.Element | null {
    const posthog = usePostHog()
    const entry = useEntry()?.entry
    const cta = entry?.cta
    if (!cta?.label) {
        return null
    }
    const { href, kind } = destination(cta)

    return (
        <div>
            {cta.kind === 'prompt' && cta.prompt && (
                // The prompt is the deliverable, so it's set like the scout file in vol. 1 – same
                // code block, wrapped locally because `whitespace-pre` scrolls a sentence sideways.
                <div className="mb-4 [&_.min-w-fit]:min-w-0 [&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words">
                    <SingleCodeBlock language="text" label="Prompt for PostHog AI" showLabel showCopy showAskAI={false}>
                        {cta.prompt}
                    </SingleCodeBlock>
                </div>
            )}

            <div className="flex flex-wrap items-center gap-2">
                <OSButton
                    asLink
                    to={href}
                    external
                    variant="primary"
                    size="md"
                    onClick={() =>
                        posthog?.capture('pocket_guide_interaction', {
                            kind,
                            guide: entry?.url,
                            placement: 'action_section',
                        })
                    }
                >
                    {cta.label}
                </OSButton>
                {cta.note && <span className="text-xs text-secondary">{cta.note}</span>}
            </div>

            {cta.requires && <Prerequisite requires={cta.requires} />}
        </div>
    )
}

/** The wizard subcommand that instruments LLM calls – see /docs/ai-observability/installation. */
const AI_OBSERVABILITY_SUBCOMMAND = 'ai-observability'

/**
 * The setup command on its own, for a volume's front matter – the prerequisite stated once,
 * before anyone reaches a chapter. `<Prerequisite />` repeats it under each CTA.
 */
export function Setup(): JSX.Element {
    const wizard = buildWizardCommand({ subcommand: AI_OBSERVABILITY_SUBCOMMAND })
    return <CopyableCommand className="my-[0.8em]" command={wizard.displayCommand} copyCommand={wizard.copyCommand} />
}

/**
 * What has to be true before the CTA can work, with the command that gets you there – the same
 * move `<Enable />` makes with the self-driving wizard command. Every prompt in this book asks
 * PostHog AI to read events the reader may not be sending yet, and a prompt that returns "there's
 * no data in this project" is a worse first impression than a sentence saying so up front.
 */
function Prerequisite({ requires }: { requires: NonNullable<BookPageCta['requires']> }): JSX.Element {
    const wizard = buildWizardCommand({ subcommand: AI_OBSERVABILITY_SUBCOMMAND })
    return (
        <div className="mt-4 border-t border-light pt-3 dark:border-dark">
            <p className="mb-2 text-xs text-secondary">{requires.label}</p>
            <CopyableCommand command={wizard.displayCommand} copyCommand={wizard.copyCommand} />
        </div>
    )
}

/** Pinned shortcut to the action, for a reader convinced before the end of the chapter. */
export function ActionBar({
    cta,
    title,
    guide,
}: {
    cta: BookPageCta
    title: string
    guide: string
}): JSX.Element | null {
    const posthog = usePostHog()
    if (!cta.label) {
        return null
    }
    const { href, kind } = destination(cta)

    return (
        <div className="flex items-center gap-3 border-t border-primary bg-primary px-6 py-3">
            <span className="min-w-0 flex-1 truncate text-sm text-secondary">{title}</span>
            <OSButton
                asLink
                to={href}
                external
                variant="primary"
                size="sm"
                onClick={() => posthog?.capture('pocket_guide_interaction', { kind, guide, placement: 'pinned_bar' })}
            >
                {cta.label}
            </OSButton>
        </div>
    )
}
