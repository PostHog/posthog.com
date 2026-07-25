import React from 'react'
import { Annotation } from '../types'

export const helpAnnotations: Annotation[] = [
    {
        id: 'help/chat-widget/llm',
        page: 'help',
        target: 'chat-widget',
        tool: 'llm',
        label: '$ai_generation',
        dx: 0.5,
        dy: 0,
        title: 'The assistant is an LLM. Bill accordingly.',
        body: {
            why: (
                <>
                    Support answers come from an LLM server-side, and every completion is captured as an{' '}
                    <code>$ai_generation</code> event. Cost, latency, and tokens land in LLM analytics next to the
                    product data.
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
                    Because it shares person and session with everything else, you can ask whether visitors who use
                    support convert better than ones who don't, and whether that's worth $0.003 a conversation.
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
        title: 'The pipeline behind one answer',
        body: {
            why: (
                <>
                    The assistant pulled the CD-case rule from the gap docs before answering. The whole pipeline is one{' '}
                    <code>$ai_trace</code> with child spans, viewable as a tree in LLM analytics.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `$ai_trace  trace_7f2…
├─ $ai_span        vector search: gap reviews   112ms
├─ $ai_span        fetch: gap spec (13cm doc)    38ms
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
        id: 'help/help-escalate/surveys',
        page: 'help',
        target: 'help-escalate',
        tool: 'surveys',
        label: 'CSAT survey',
        dx: 0.5,
        dy: 1.0,
        title: 'Did the robot actually help?',
        body: {
            why: (
                <>
                    A survey fires after a conversation ends, asking one rating question. The answer lands as an event
                    on the same person, next to the <code>$ai_generation</code> that produced the reply.
                </>
            ),
            code: {
                language: 'bash',
                snippet: `# CSAT by whether the assistant answered:
resolved by AI         4.4 / 5   (n=1,204)
escalated to Margaret  4.8 / 5   (n=96)
# Margaret is better. Margaret does not scale.`,
            },
            after: (
                <>
                    The surveys scout watches for CSAT regressions and recurring themes in the free-text answers, so six
                    people describing the same broken flow becomes one finding rather than six.
                </>
            ),
        },
    },
]
