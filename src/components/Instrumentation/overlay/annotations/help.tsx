/* eslint-disable react/jsx-key -- table cells here are data, not rendered lists; keys are applied per row/column by ColumnsTable/FieldValueTable in InstrumentationBlocks.tsx */
import React from 'react'
import { Annotation } from '../types'

export const helpAnnotations: Annotation[] = [
    {
        id: 'help/chat-widget/llm',
        page: 'help',
        target: 'chat-widget',
        tool: 'llm',
        label: '$ai_generation',
        // On the card's left edge rather than its header bar, where the marker sat on
        // top of the "Unter AI support" title. This annotation is about the whole
        // widget, so the edge reads better than any one part of it anyway.
        dx: 0,
        dy: 0.5,
        title: 'Every LLM call is captured with its cost',
        body: {
            why: (
                <>
                    Support answers come from an LLM server-side, and every completion is captured as an{' '}
                    <code>$ai_generation</code> event. Cost, latency, and tokens land in PostHog LLM analytics next to
                    the product data.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'server-side',
                snippet: `// server-side, wrapping the completion
posthog.capture('$ai_generation', {
  $ai_model: 'claude-sonnet-5',
  $ai_provider: 'anthropic',
  $ai_input_tokens, $ai_output_tokens,
  $ai_latency, $ai_total_cost_usd,
  $ai_trace_id
})`,
            },
            output: {
                context: 'LLM analytics · today',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Generations', value: '2,141' },
                        { field: 'Model', value: <code>claude-sonnet-5</code> },
                        { field: 'Total cost', value: '$6.62 · median latency 1.4s' },
                        { field: 'CSAT gap', value: 'AI 4.4 · human 4.8' },
                    ],
                },
            },
            after: (
                <>
                    These events share person and session with everything else PostHog captures, so you can compare what
                    people who used support went on to do against people who didn't, and weigh that against the cost.
                </>
            ),
        },
    },
    {
        id: 'help/chat-bot-msg/llm',
        page: 'help',
        target: 'chat-bot-msg',
        tool: 'llm',
        label: '$ai_trace',
        dx: 1.0,
        dy: 0.5,
        title: 'Every step of the AI answer, in one trace',
        body: {
            why: (
                <>
                    The assistant looked up the coverage map before answering. The whole pipeline is one{' '}
                    <code>$ai_trace</code> with child spans, viewable as a tree in PostHog's LLM analytics.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'server-side',
                snippet: `// each step reports under one trace id
posthog.capture('$ai_span', {
  $ai_trace_id, $ai_span_name: 'vector search'
})
// the final completion is an $ai_generation
// on the same $ai_trace_id`,
            },
            output: {
                context: '$ai_trace · trace_7f2…',
                table: {
                    kind: 'columns',
                    columns: [{ label: 'Step' }, { label: 'Duration', align: 'right' }],
                    rows: [
                        [
                            <>
                                <code>$ai_span</code> vector search
                            </>,
                            '112ms',
                        ],
                        [
                            <>
                                <code>$ai_span</code> fetch coverage map
                            </>,
                            '38ms',
                        ],
                        [
                            <>
                                <code>$ai_generation</code> claude-sonnet-5
                            </>,
                            '1.4s',
                        ],
                    ],
                },
                footnote: (
                    <>
                        Shown as a tree in LLM analytics. <code>$ai_is_error</code> flags the step that failed.
                    </>
                ),
            },
            after: (
                <>
                    When an answer comes back wrong or slow, the tree shows which step did it. Either retrieval returned
                    junk, or retrieval was fine and the model ignored what it was handed. Those are different bugs with
                    different fixes.
                </>
            ),
        },
    },
    {
        id: 'help/help-suggestions/experiments',
        page: 'help',
        target: 'help-suggestions',
        tool: 'experiments',
        label: 'help-prompt-examples',
        // Bottom-center of the list, so it doesn't crowd the chat card to its right.
        dx: 0.5,
        dy: 1.0,
        title: 'Testing whether example questions help',
        body: {
            why: (
                <>
                    Half of website visitors are shown these example questions, and half see an image instead. A feature
                    flag gates the split, and the thing being tested with an experiment is whether the prompts help kick
                    off support conversations at all, not whether the AI's answers are any better.
                </>
            ),
            input: {
                kind: 'code',
                language: 'js',
                context: 'client-side',
                snippet: `const variant = posthog.getFeatureFlag('help-prompt-examples')
if (variant === 'examples') renderSuggestions()
// whoever asks something, from a prompt or typed themselves:
posthog.capture('support_question_asked', { source: variant })
// primary metric is that event, secondary is escalated_to_human.
// PostHog computes the split and significance from there —
// no extra code, and nothing to calculate by hand`,
            },
            output: {
                context: 'help-prompt-examples',
                table: {
                    kind: 'columns',
                    columns: [
                        { label: 'Variant' },
                        { label: 'Asked a Q', align: 'right' },
                        { label: 'Escalated', align: 'right' },
                    ],
                    rows: [
                        ['control (image)', '38%', '11%'],
                        ['examples', <strong>51%</strong>, '11%'],
                    ],
                },
                footnote: (
                    <>
                        Primary metric <code>support_question_asked</code>; secondary <code>escalated_to_human</code>.
                    </>
                ),
            },
            after: (
                <>
                    Examples win the first question comfortably and leave escalations flat, which reads as more people
                    getting unstuck rather than more people escalating to a human.
                </>
            ),
        },
    },
    {
        id: 'help/help-escalate/surveys',
        page: 'help',
        target: 'help-escalate',
        tool: 'surveys',
        label: 'CSAT survey',
        dx: 0.5,
        dy: 1.0,
        title: 'Triggering a survey at a chosen moment',
        body: {
            why: (
                <>
                    Reaching this box means the conversation above didn't fully answer the question. A survey timed to
                    that moment, right as someone reaches for a human, asks one rating question, and the answer lands as
                    an event on the same person, next to the <code>$ai_generation</code> events that produced the
                    replies.
                </>
            ),
            input: {
                kind: 'config',
                context: 'targeting, set in PostHog',
                rows: [
                    { field: 'Type', value: 'Rating (1-5)' },
                    { field: 'Trigger', value: 'On reaching the escalate box' },
                    { field: 'Question', value: '"How well did that answer you?"' },
                    { field: 'Frequency', value: 'once per conversation' },
                ],
            },
            output: {
                context: 'CSAT, last 30d',
                table: {
                    kind: 'columns',
                    columns: [
                        { label: 'Resolved by' },
                        { label: 'Score', align: 'right' },
                        { label: 'n', align: 'right' },
                    ],
                    rows: [
                        ['AI', '4.4 / 5', '1,204'],
                        ['Human agent', '4.8 / 5', '96'],
                    ],
                },
                footnote: <>Humans score higher, and cost more.</>,
            },
            after: (
                <>
                    PostHog's surveys scout watches for CSAT regressions and recurring themes in the free-text answers,
                    so six people describing the same broken flow becomes one finding rather than six.
                </>
            ),
        },
    },
    {
        id: 'help/chat-widget/replay',
        page: 'help',
        target: 'chat-widget',
        tool: 'replay',
        docsUrl: '/docs/replay-vision',
        docsLabel: 'Replay Vision docs',
        label: 'Replay Vision',
        // Below the chat card, clear of the $ai_generation marker on its left edge.
        dx: 0.5,
        dy: 1.05,
        title: 'An AI watches the support sessions and summarizes them',
        body: {
            why: (
                <>
                    The LLM metrics say what a session cost. Replay Vision (in closed beta) says what happened in it.
                    You write a scanner as a prompt, and PostHog sends a sped-up video of each support recording, plus
                    its events, to a vision model and saves the answer as an observation. No instrumentation code, since
                    it runs on recordings you already capture.
                </>
            ),
            input: {
                kind: 'config',
                context: 'a scanner, set in PostHog',
                rows: [
                    { field: 'Type', value: 'Summarizer' },
                    { field: 'Prompt', value: '"Did the AI resolve it, or did they give up?"' },
                    { field: 'Runs on', value: 'Recordings of the support chat' },
                    { field: 'Sampling', value: '20% of matching sessions' },
                ],
            },
            output: {
                context: 'observation · $recording_observed',
                table: {
                    kind: 'fieldValue',
                    rows: [
                        { field: 'Intent', value: 'Ask whether their area is covered' },
                        { field: 'Outcome', value: 'AI answered, no escalation' },
                        { field: 'Friction', value: 'Re-asked the same question twice' },
                        { field: 'Confidence', value: '0.79' },
                    ],
                },
                footnote: (
                    <>
                        Each observation is a <code>$recording_observed</code> event, with citations that jump the
                        player to the moment it saw.
                    </>
                ),
            },
            after: (
                <>
                    It's the qualitative side of the same session the <code>$ai_generation</code> events measure: read
                    the summary first, open the recording only when it's worth it. High-confidence findings can hand off
                    to the self-driving inbox as signals.
                </>
            ),
        },
    },
]
