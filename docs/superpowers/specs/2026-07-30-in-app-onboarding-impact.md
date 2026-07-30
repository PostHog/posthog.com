# In-app onboarding impact — AI observability installation docs

Date: 2026-07-30
Status: for review by whoever owns in-app onboarding
Companion to: `2026-07-30-ai-observability-install-docs-design.md`

## Why this document exists

AI observability installation content lives once in `PostHog/posthog` at `docs/onboarding/ai-observability/*.tsx` and renders in two places: the in-app onboarding wizard and posthog.com. Editing those components to fix the docs necessarily changes what users see in the product.

This document states exactly what changes in-app so that impact can be reviewed on its own terms, separately from the docs work.

## What does not change

**No step gets longer.** The complete session-tree examples are added on the posthog.com side via `modifySteps`, the mechanism the onboarding runbook already documents for website-only steps. In-app step count and length stay as they are.

**No page structure changes.** Steps keep their existing titles, `required`/`optional` badges, and ordering.

## What does change

### 1. The recommended integration changes on most pages

Today 35 of the 42 shared components recommend OpenTelemetry. The design switches the primary path to a first-party PostHog integration wherever one exists.

| Page | Today | After |
|---|---|---|
| openai, anthropic, google + the 18 OpenAI-standard pages | OTel + `OpenAIInstrumentor` | `posthog.ai.<provider>` wrapper |
| langchain, langgraph | Traceloop OTel instrumentation | `CallbackHandler` |
| openai-agents | already first-party | unchanged, plus `RunConfig(group_id=…)` |
| vercel-ai | OTel | unchanged — OTel is correct here |
| family-5 pages | OTel | unchanged, plus a limitation note |

**Why:** OTel cannot set `$ai_session_id` per call for these integrations. It can only be set on the OTel Resource, which is fixed at SDK init, so every conversation in a long-lived server collapses into a single session. This fails silently. The wrapper and callback-handler paths accept a session id per call or per request.

**Practical effect in-app:** the code a user copies is different — a PostHog-wrapped client instead of an OTel provider plus instrumentor. It is typically shorter, since the OTel setup block (TracerProvider, Resource, span processor) goes away.

### 2. Three pages currently capture nothing and start working

These are corrections, not preference changes. Each was confirmed by execution.

- **crewai** — CrewAI 1.15.9 defaults to its native `OpenAICompletion` client and bypasses LiteLLM, so the documented `litellm.success_callback` never fires. Zero events today.
- **mirascope** — the documented import is from mirascope v1 and raises `ModuleNotFoundError` on 2.5.0. Even with correct v2 code, mirascope routes through the OpenAI Responses API, which `OpenAIInstrumentor` does not instrument. Zero spans today.
- **llamaindex** — `opentelemetry-instrumentation-llamaindex` 0.62.1 emits no spans at all with llama-index 0.14.23. Zero spans today.

Anyone who completed onboarding for these three has an empty AI Observability tab.

### 3. Two pages gain accuracy notes

- **langchain / langgraph (Node)** — LangChain JS does not propagate callbacks implicitly the way Python does. Without threading `config` into nested calls, users get a single root trace with no generations or spans, silently. The step gains this instruction.
- **langgraph** — the page currently states no callback handler is needed. That is true only of the OTel path. PostHog's own LangGraph app uses the `CallbackHandler`, as do all four LangChain/LangGraph call sites in the monorepo. The page is reconciled with the new recommendation.

## Risks

**Version dependency.** The `openai-agents` guidance depends on three unmerged PRs (posthog-python#819, posthog-js#4335, posthog-js#4336). Published `@posthog/ai` is 8.5.0 and has none of them. Those pages must state minimum versions, or land after release. Every other change is independent.

**Dependency conflict.** `chromadb` pins `posthog>=2.4.0,<6.0.0`, and CrewAI pulls chromadb. Those environments get posthog 5.4.0, where `posthog.ai.langchain` and `posthog.ai.otel` do not exist. Affected pages need a version floor.

**Existing users are unaffected.** Nothing here changes ingestion or event schemas. Users who already completed onboarding keep working; the change only affects what new users are told to install.

## Resolved: depth stays website-only

In-app users get the corrected integration but not the complete session-tree examples, since depth is website-only by design. An in-app user therefore still captures generations without sessions or spans unless they visit the docs.

This was raised and accepted: both in-app onboarding and the docs are expected to move to the wizard command as the primary install recommendation, so the in-app step content becomes less load-bearing over time. No `optional` in-app steps for sessions and spans will be added in this pass.

Worth noting for whoever picks up the wizard work: the design's page matrix is the same information the wizard needs to emit a correct instrumentation, since it records, per integration, which session mechanism exists and whether tool spans are automatic or need manual capture.
