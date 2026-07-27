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
            code: {
                language: 'js',
                snippet: `{
  event: '$ai_generation',
  properties: {
    $ai_model: 'claude-sonnet-5',
    $ai_provider: 'anthropic',
    $ai_input_tokens: 214,
    $ai_output_tokens: 96,
    $ai_latency: 1.4,        // seconds
    $ai_total_cost_usd: 0.0031,
    $ai_trace_id: 'trace_7f2…'
  }
}`,
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
            code: {
                language: 'bash',
                snippet: `$ai_trace  trace_7f2…
├─ $ai_span        vector search: gap reviews   112ms
├─ $ai_span        fetch: coverage map           38ms
└─ $ai_generation  claude-sonnet-5              1.4s
   # $ai_is_error: false`,
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
        dx: 1.0,
        dy: 0.5,
        title: 'Testing whether example questions help',
        body: {
            why: (
                <>
                    Half of website visitors are shown these example questions, and half see an image instead. A feature
                    flag gates the split, and the thing being tested with an experiment is whether the prompts help kick
                    off support conversations at all, not whether the AI's answers are any better.
                </>
            ),
            code: {
                language: 'js',
                snippet: `const variant = posthog.getFeatureFlag('help-prompt-examples')
if (variant === 'examples') renderSuggestions()
// whoever asks something, from a prompt or typed themselves:
posthog.capture('support_question_asked', { source: variant })
// primary metric is that event, secondary is escalated_to_human.
// PostHog computes the split and significance from there —
// no extra code, and nothing to calculate by hand`,
            },
            after: (
                <>
                    Examples win the first question comfortably and leave escalations flat, which reads as more people
                    getting unstuck rather than more people needing Joe.
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
        title: 'Rating the AI right before someone gives up on it',
        body: {
            why: (
                <>
                    Reaching this box means the conversation above didn't fully answer the question. A survey timed to
                    that moment, right as someone reaches for a human, asks one rating question, and the answer lands as
                    an event on the same person, next to the <code>$ai_generation</code> events that produced the
                    replies.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# CSAT by whether the assistant answered:
resolved by AI         4.4 / 5   (n=1,204)
escalated to Joe       4.8 / 5   (n=96)
# humans score higher, and cost more.`,
            },
            after: (
                <>
                    PostHog's surveys scout watches for CSAT regressions and recurring themes in the free-text answers,
                    so six people describing the same broken flow becomes one finding rather than six.
                </>
            ),
        },
    },
]
