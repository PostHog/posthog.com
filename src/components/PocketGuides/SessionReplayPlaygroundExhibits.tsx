import React from 'react'
import { searchValue } from '@posthog/twig-components/replay-lab'
import Figure from './Figure'
import PostHogInspector, { COMPACT_INSPECTOR_CLASSES, InspectorCode } from './PostHogInspector'

const typed = 'Adirondacks'

/** What a replay keeps from Twig's search box, with and without input masking. */
export function TwigReplayMaskingFigure(): JSX.Element {
    return (
        <Figure caption="The same search on Twig, recorded twice. With masking on, the typed text never leaves the browser.">
            <PostHogInspector className={COMPACT_INSPECTOR_CLASSES}>
                {[false, true].map((masked) => (
                    <InspectorCode
                        key={String(masked)}
                        label="Recorded input"
                        value={JSON.stringify({
                            event: 'input',
                            properties: { page: '/', field: 'search', value: searchValue(typed, masked) },
                        })}
                        meta={masked ? 'masking on' : 'masking off'}
                    />
                ))}
            </PostHogInspector>
        </Figure>
    )
}
