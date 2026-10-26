import React from 'react'
import { aiCode, aiReducer, fixtureRequest, initialAiState } from '@posthog/twig-components/ai-lab'
import type { AiRun } from '@posthog/twig-components/ai-lab'
import { SingleCodeBlock } from 'components/CodeBlock'
import Figure from './Figure'
import PostHogInspector, { COMPACT_INSPECTOR_CLASSES, InspectorCode } from './PostHogInspector'
import TraceTree from './TraceTree'

/** Twig's AI trip planner, fully instrumented: one recommendation and one timeout, from the lab's own reducer. */
const fullConfig = { input: true, output: true, linked: true, errors: true }
const runs: AiRun[] = (['success', 'timeout'] as const).reduce(
    (state, scenario) => aiReducer(state, { type: 'run', prompt: fixtureRequest, scenario }),
    aiReducer(aiReducer(initialAiState, { type: 'edit', config: fullConfig }), { type: 'apply' })
).runs

const latency = (run: AiRun): string => `${run.event.properties.$ai_latency}s`

/** The inspector shows flat values, so message arrays become their text. */
function eventPayload(run: AiRun): string {
    const properties = Object.fromEntries(
        Object.entries(run.event.properties).map(([key, value]) => [
            key,
            Array.isArray(value) ? value.map((message) => message.content).join(' ') : value,
        ])
    )
    return JSON.stringify({ event: run.event.event, properties })
}

export function TwigTripTracesFigure(): JSX.Element {
    return (
        <Figure caption="Two trips on Twig’s AI planner: one recommendation, and one request that timed out.">
            <TraceTree
                rows={runs.flatMap((run) => [
                    { kind: 'trace' as const, label: run.traceId, meta: latency(run) },
                    {
                        kind: 'generation' as const,
                        label: String(run.event.properties.$ai_span_name),
                        meta: `${run.event.properties.$ai_model} · ${latency(run)}${
                            run.event.properties.$ai_is_error ? ' · error' : ''
                        }`,
                        depth: 1,
                    },
                ])}
            />
        </Figure>
    )
}

export function TwigAiEventFigure(): JSX.Element {
    return (
        <Figure caption="The $ai_generation event for each trip. The timeout keeps the request and records the error.">
            <PostHogInspector className={COMPACT_INSPECTOR_CLASSES}>
                {runs.map((run) => (
                    <InspectorCode
                        key={run.id}
                        label="Event payload"
                        value={eventPayload(run)}
                        meta={run.scenario === 'success' ? 'recommendation' : 'timeout'}
                    />
                ))}
            </PostHogInspector>
        </Figure>
    )
}

export function TwigAiCaptureFigure(): JSX.Element {
    return (
        <Figure caption="The capture call behind both events, from Twig’s AI lab.">
            <SingleCodeBlock language="js" showLineNumbers={false} showAskAI={false} showCopy>
                {aiCode(fullConfig)}
            </SingleCodeBlock>
        </Figure>
    )
}
