import React, { useState } from 'react'

import { IconMinus, IconPlus } from '@posthog/icons'

import { SingleCodeBlock } from 'components/CodeBlock'

import { ScoutSpec } from './types'

/** Clipped with `max-height`, not `focusOnLines`, which drops lines the .md mirror needs. */
export default function ScoutFile({ scout }: { scout: ScoutSpec }): JSX.Element {
    const [expanded, setExpanded] = useState(false)
    const code = (scout.raw ?? '').trim()

    return (
        <div>
            {/* Wrap locally: `whitespace-pre` scrolls long lines off a pane this narrow. */}
            <div
                className={`relative overflow-hidden [&_.min-w-fit]:min-w-0 [&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words ${
                    expanded ? '' : 'max-h-[15rem]'
                }`}
            >
                <SingleCodeBlock
                    language="markdown"
                    label={`${scout.name}/SKILL.md`}
                    showLabel
                    showCopy
                    showAskAI={false}
                >
                    {code}
                </SingleCodeBlock>
                {!expanded && (
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-primary"
                    />
                )}
            </div>
            {/* Plus/minus, as RadixUI/Accordion does – the label alone didn't read as a control. */}
            <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="mt-2 flex items-center gap-1.5 font-sans text-sm font-semibold text-secondary hover:text-primary"
            >
                {expanded ? (
                    <IconMinus className="size-4 shrink-0" aria-hidden="true" />
                ) : (
                    <IconPlus className="size-4 shrink-0" aria-hidden="true" />
                )}
                {expanded ? 'Show less' : 'Show full example'}
            </button>
        </div>
    )
}
