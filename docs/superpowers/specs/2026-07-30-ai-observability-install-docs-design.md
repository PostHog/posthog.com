# AI observability installation docs — design

Date: 2026-07-30
Status: approved, ready for implementation planning

## Problem

The AI observability installation docs recommend OpenTelemetry almost universally. There are 45 MDX stubs on posthog.com backed by 42 shared components in the monorepo; **35 of those 42 are OTel-primary**. Only `openai-agents` and `claude-agent-sdk` use a first-party PostHog integration. The remaining 5 use neither: litellm, crewai and dspy go through LiteLLM callbacks, mastra uses `@mastra/posthog`, and manual is manual capture.

That default is wrong for two reasons.

**Sessions.** OTel has no per-call metadata channel for most integrations, so `$ai_session_id` can only be set on the OTel Resource, which is fixed at SDK init. In any long-lived server every conversation collapses into one session. This is silent — no error, just wrong grouping.

**Completeness.** Pages show how to capture generations and stop there. Sessions and spans are barely mentioned, so readers end up with a flat list of LLM calls rather than a session → trace → generation/span tree.

Separately, three pages are outright broken and capture nothing, which only surfaced by executing them.

## Verified findings

Everything below was confirmed by running code, unless marked otherwise. Test scripts are in the session scratchpad.

### Broken pages

| Page | Failure | Fix |
|---|---|---|
| crewai | CrewAI 1.15.9 defaults to its native `OpenAICompletion` client and bypasses LiteLLM entirely, so `litellm.success_callback = ["posthog"]` never fires. **Zero events.** | `LLM(model=..., is_litellm=True)` |
| mirascope | Documented `from mirascope.core import ...` is v1; mirascope 2.5.0 exposes only `mirascope.llm`. And v2 routes through the OpenAI **Responses API**, which `OpenAIInstrumentor` does not wrap — it covers only `chat.completions.{Completions,AsyncCompletions}.create` plus the two embeddings methods. **Zero spans even with correct v2 code.** | `llm.register_provider("openai:completions")` plus v2 imports |
| llamaindex | `opentelemetry-instrumentation-llamaindex` 0.62.1 with llama-index 0.14.23 emits **17 junk spans and zero generations** — `SentenceSplitter.task`, `MockEmbedding.workflow` and similar, carrying no model, tokens, or messages. All 17 pass PostHog's filter because they carry `traceloop.*` attributes, so noise is shipped with no product value. | Swap to `opentelemetry-instrumentation-openai-v2` |

For llamaindex, the alternative `llama-index-observability-otel` was evaluated and rejected: it emits 19 spans that are bare Python class-method traces with **zero attributes** — no model, tokens, or messages — so they carry nothing useful and PostHog correctly filters them. It also fights for ownership of the TracerProvider.

**Measurement caveat, learned the hard way:** the Traceloop instrumentor's output depends on import order. Importing `llama_index` *after* `LlamaIndexInstrumentor().instrument()` yields 0 spans; importing it first — as any real script does, with imports at the top — yields the 17. Any future check of this page must import the framework before instrumenting, or it will measure an artifact of the test harness rather than user reality.

**Related SDK observation, out of scope:** PostHog's `is_ai_span` filter forwards any span carrying a `traceloop.*`-prefixed attribute regardless of content, which is why 17 contentless spans were shipped. Worth a follow-up issue.

### Working, verified by execution

Python and Node: OpenAI / Anthropic / Gemini wrappers (per-call session, `$ai_tools`, `$ai_output_choices`, no spans); LangChain `CallbackHandler` (per-invocation session, automatic tool spans with real latency).

Python only: `claude_agent_sdk` (per-query `posthog_properties`, automatic spans); LiteLLM, CrewAI, DSPy (per-call `metadata`, no spans); smolagents, semantic-kernel, instructor, pydantic-ai (bare OTel, LLM spans only).

Verified by reading ingestion source: Vercel AI SDK — `STRING_AI_METADATA_KEYS` confirms `$ai_session_id` works via `experimental_telemetry.metadata`.

### Language-specific findings

**LangChain JS does not propagate callbacks implicitly.** Python threads them through contextvars; JS requires passing `config` into every nested call. Omitting it produces a single root trace with no generations or spans — silently. Docs must show the threading.

**A root run is required for tool spans.** The handler decides event type by `parentRunId ? '$ai_span' : '$ai_trace'`. Without a parent, a tool emits `$ai_trace`, producing a malformed two-root trace. One `RunnableLambda` wrapper fixes it. This applies to both languages.

### Dependency and version hazards

- `chromadb` pins `posthog>=2.4.0,<6.0.0`. CrewAI pulls chromadb, so those environments resolve to posthog 5.4.0.

  Verified by bisecting published wheels — note that sdists omit `posthog/ai/otel` from their manifest and will mislead you:

  | posthog | `posthog.ai.openai` / `.anthropic` / `.gemini` / `.langchain` | `posthog.ai.otel` |
  |---|---|---|
  | 5.4.0, 6.0.0, 6.3.0, 7.0.0, 7.11.0 | present | **absent** |
  | 7.12.0 and later | present | present |

  So `posthog.ai.langchain` **does** work on 5.x — importing it fails only when the separate `langchain-core` package is missing, which is an optional-dependency gate, not a version gate. Only `posthog.ai.otel` is affected, and it needs **7.12.0 or later**.

  Because 7.12.0 conflicts with chromadb's `<6.0.0` ceiling, `posthog.ai.otel` cannot be installed alongside CrewAI at all unless the pin is overridden. Wrapper and LangChain-handler tracing are unaffected.
- All three breakages were version drift. Pages should state tested versions: crewai 1.15.9, mirascope 2.5.0, llama-index 0.14.23.

## Design decisions

1. **Depth is website-only.** In-app onboarding keeps its current length; the complete session-tree example is added via `modifySteps` on the posthog.com side.
2. **Sessions where a native channel exists.** Use the framework's own field. Where none exists, leave the page's integration as-is and state the limitation — no hand-rolled `SpanProcessor` stampers. "As-is" refers to the session approach only: mirascope and llamaindex still get their correctness fixes, because those pages capture nothing at all today.
3. **Bare-OTel pages link out** to manual capture for tool spans rather than inlining a long snippet on low-traffic pages.
4. **One complete example per family, not composed snippets.** Session and span code are joined by shared `trace_id`, `session_id`, and the response object; splitting them across snippets makes the second fragment open with variables from nowhere. Verified: a wrapper generation plus a manual tool span land in one trace and one session only because all three identifiers are threaded through a single block.
5. **Both repos change**, with in-app impact documented separately for review (see `2026-07-30-in-app-onboarding-impact.md`).

## Page matrix

| Session mechanism | Inline manual span | Pages |
|---|---|---|
| `posthog_properties` / `posthogProperties` per call | yes | openai, anthropic, google + the 18 OpenAI-standard pages |
| `metadata` per call | yes | litellm, crewai, dspy |
| `properties=` per-request handler | no — automatic | langchain, langgraph |
| `group_id` / `posthog_properties` | no — automatic | openai-agents, claude-agent-sdk |
| `experimental_telemetry.metadata` | no — automatic | vercel-ai (with tool-stripping caveat) |
| resource attribute only | link out | smolagents, semantic-kernel, mirascope, llamaindex, instructor, pydantic-ai, aws-bedrock, autogen, opentelemetry |

The 18 OpenAI-standard pages are the 6 gateways (portkey, helicone, openrouter, cloudflare-ai-gateway, dedalus, vercel-ai-gateway) and 12 compatible providers (deepseek, groq, mistral, together-ai, fireworks-ai, xai, perplexity, ollama, cerebras, hugging-face, cohere, azure-openai). All 18 were confirmed present. They mirror the openai page exactly and cascade from it.

`aws-bedrock` does not cascade — it uses boto3 with `opentelemetry-instrumentation-botocore` and has no PostHog wrapper.

## What changes where

### Monorepo (`PostHog/posthog`) — primary recommendation

```
docs/onboarding/ai-observability/
  manual.tsx          add the $ai_span how-to (currently covers only $ai_generation)
  openai.tsx          OTel → posthog.ai.openai wrapper; 18 pages cascade
  anthropic.tsx       → wrapper
  google.tsx          → wrapper
  langchain.tsx       → CallbackHandler; JS config-threading + RunnableLambda root
  langgraph.tsx       → CallbackHandler; reconcile "no callback handler needed"
  openai-agents.tsx   → RunConfig(group_id=…), min-version note
  crewai.tsx          is_litellm=True + posthog version floor
  mirascope.tsx       register_provider("openai:completions") + v2 imports
  llamaindex.tsx      swap to opentelemetry-instrumentation-openai-v2
  vercel-ai.tsx       session via experimental_telemetry.metadata + tool-stripping caveat
  <family-5 pages>    session limitation note + link to manual capture
```

### posthog.com — website-only depth

```
contents/docs/ai-observability/installation/_snippets/
  session-tree/
    wrapper.mdx           per-call session + inline manual span
    callback-handler.mdx  per-request handler, spans automatic
    agent-sdk.mdx         native session field, spans automatic
    otel-limitation.mdx   resource-only caveat + link to manual capture
  shared-helpers.tsx      addSessionTreeStep(family), composed with addNextStepsStep
```

Each MDX stub declares its family: `modifySteps={addSessionTreeStep('wrapper')}`.

## Reference example

The validated family-1 pattern, which the `wrapper.mdx` snippet is built from:

```python
session_id  = "conversation-abc"      # same across every turn
trace_id    = str(uuid.uuid4())       # one per turn
distinct_id = "user_123"

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[...], tools=tools,
    posthog_distinct_id=distinct_id,
    posthog_trace_id=trace_id,
    posthog_properties={"$ai_session_id": session_id},
)

for call in response.choices[0].message.tool_calls:
    start = time.time()
    result = get_weather(**json.loads(call.function.arguments))
    posthog.capture(distinct_id=distinct_id, event="$ai_span", properties={
        "$ai_trace_id":     trace_id,          # ties the span to the generation
        "$ai_session_id":   session_id,        # ties it to the conversation
        "$ai_span_id":      str(uuid.uuid4()),
        "$ai_span_name":    call.function.name,
        "$ai_input_state":  call.function.arguments,
        "$ai_output_state": result,
        "$ai_latency":      time.time() - start,
    })
```

Produces one `$ai_generation` and one `$ai_span` sharing a trace and session.

## Sequencing

1. **Broken-page fixes** — crewai, mirascope, llamaindex. Independent one-liners; land first so they are not blocked behind the rewrite.
2. **`manual.tsx`** — the `$ai_span` how-to. Everything else references it.
3. **`openai.tsx` + `wrapper.mdx`** — validates the pattern end to end.
4. **Cascade the 18 OpenAI-standard pages.**
5. **Remaining families** — langchain/langgraph, openai-agents, claude-agent-sdk, vercel-ai, litellm/crewai/dspy.
6. **Family-5 limitation notes.**

## Dependencies

Three PRs must merge and release before the `openai-agents` pages are accurate. All three were reviewed and confirmed correct:

- [posthog-python#819](https://github.com/PostHog/posthog-python/pull/819) — `group_id` → `$ai_session_id`
- [posthog-js#4335](https://github.com/PostHog/posthog-js/pull/4335) — same for JS
- [posthog-js#4336](https://github.com/PostHog/posthog-js/pull/4336) — LangChain spans named from the bare `runName` string

Published `@posthog/ai` is 8.5.0, which has none of these. Pages describing post-fix behaviour must state minimum versions.

## Out of scope

Named here so they are deferred deliberately, not dropped:

- **convex, mastra, eve** — never verified; left untouched this pass. Mastra's packages are actively maintained and eve's `PostHogTraceExporter` export exists, but neither was executed.
- **autogen** — deemed not worth the effort; gets a limitation note only. It instruments the OpenAI SDK underneath AutoGen, so it captures no AutoGen agent or tool spans.
- **claude-code, pi, openclaw** — verified healthy (86/86 plugin tests pass; Pi's env vars match exactly). Only missing a few undocumented options.
- **chromadb's `posthog<6.0.0` pin** — a dependency problem, not a docs one.
- **Vercel tool-stripping fix** — `ai.prompt.tools` and `ai.response.toolCalls` are deleted in `STRIP_KEYS`, so `$ai_tools` is never populated and tool calls are lost from `$ai_output_choices`. Tool *executions* still become `$ai_span`s. Needs a fourth ingestion PR; the page gets a caveat meanwhile.
- **Drift-detection harness** — a fake OpenAI endpoint plus the real `PostHogSpanProcessor` with its uploader stubbed, asserting each documented setup yields at least one span. Needs no API keys, runs in seconds per framework, and would have caught all three breakages. Worth a follow-up issue.
