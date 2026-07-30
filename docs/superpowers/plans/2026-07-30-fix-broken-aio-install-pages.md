# Fix broken AI observability installation pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the three AI observability installation pages whose documented setup captures zero events, so that following each page actually sends data to PostHog.

**Architecture:** Each page is a React component in the PostHog monorepo at `docs/onboarding/ai-observability/*.tsx`, rendered both by in-app onboarding and by posthog.com (via `gatsby-source-git` and an MDX stub). The fixes are edits to the `dedent` code strings inside those components. No posthog.com changes are needed — the website picks the content up on its next build.

**Tech Stack:** TypeScript/React (docs components), Python (the documented snippets), OpenTelemetry, LiteLLM.

## Global Constraints

- **Repo:** all edits land in `PostHog/posthog` (the monorepo), NOT posthog.com. Local clone: `/Users/marcogancitano/Documents/Coding/posthog`.
- **Pull first:** the local clone was observed one commit behind what posthog.com pulls. Run `git pull` before starting.
- **Versions these fixes were verified against:** crewai 1.15.9, mirascope 2.5.0, llama-index 0.14.23, `opentelemetry-instrumentation-llamaindex` 0.62.1, openai 2.50.0, posthog 7.34.0.
- **Do not commit the verification harness.** The spec puts drift-detection out of scope; the scripts below are run from a scratch directory and thrown away.
- **Writing style:** sentence case headings, American English, Oxford comma, double quotes in prose. Do not restructure steps or change step titles/badges — these render in in-app onboarding.
- **Scope discipline:** change only what each task specifies. These pages also have session-id and span gaps, which are deliberately handled in a later plan.

## Test approach

These are documentation changes, so the unit under test is *the code the page tells a user to write*. Each task pairs the page edit with a standalone Python script that reproduces the documented setup exactly and asserts that PostHog receives events. The script must fail against today's documented code and pass after the edit.

The scripts share a harness. Build it once in Task 0.

---

### Task 0: Build the verification harness

**Files:**
- Create: `/tmp/aio-verify/harness.py`
- Create: `/tmp/aio-verify/` venvs

**Interfaces:**
- Produces: `fake_openai_server()` — context manager yielding an OpenAI-compatible base URL string. `install_recording_processor()` — returns `(forwarded: list, provider: TracerProvider)` where `forwarded` collects spans that pass PostHog's real `is_ai_span` filter. `report(name, forwarded, provider) -> int` — prints a summary, returns the span count.

- [ ] **Step 1: Create the scratch directory and two venvs**

The two venvs are needed because `chromadb` (pulled in by crewai) pins `posthog<6.0.0`, which lacks `posthog.ai.otel`. Keeping the OTel work separate avoids that conflict.

```bash
mkdir -p /tmp/aio-verify && cd /tmp/aio-verify
python3 -m venv llvenv
python3 -m venv otelvenv
./llvenv/bin/pip install -q litellm crewai
./otelvenv/bin/pip install -q "posthog[otel]" opentelemetry-sdk \
    opentelemetry-instrumentation-openai-v2 openai "mirascope[openai]" \
    llama-index llama-index-llms-openai opentelemetry-instrumentation-llamaindex
```

- [ ] **Step 2: Write the harness**

Create `/tmp/aio-verify/harness.py`:

```python
"""Fake OpenAI endpoint + the real PostHogSpanProcessor with its uploader stubbed."""
import json, threading, http.server, socketserver, contextlib

CHAT_RESPONSE = {
    "id": "chatcmpl-1", "object": "chat.completion", "created": 0, "model": "gpt-4o-mini",
    "choices": [{"index": 0, "finish_reason": "stop",
                 "message": {"role": "assistant", "content": '{"answer": "Paris is sunny."}'}}],
    "usage": {"prompt_tokens": 10, "completion_tokens": 5, "total_tokens": 15},
}


class _H(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        body = json.dumps(CHAT_RESPONSE).encode()
        self.send_response(200)
        self.send_header("content-type", "application/json")
        self.send_header("content-length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    do_GET = do_POST

    def log_message(self, *a):
        pass


@contextlib.contextmanager
def fake_openai_server():
    srv = socketserver.TCPServer(("127.0.0.1", 0), _H)
    srv.allow_reuse_address = True
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    try:
        yield f"http://127.0.0.1:{srv.server_address[1]}/v1"
    finally:
        srv.shutdown()
        srv.server_close()


def install_recording_processor():
    from opentelemetry import trace
    from opentelemetry.sdk.trace import TracerProvider
    from opentelemetry.sdk.resources import Resource
    from posthog.ai.otel import PostHogSpanProcessor

    forwarded = []
    proc = PostHogSpanProcessor(api_key="phc_test", host="http://localhost:1")

    class _Recorder:
        """Replaces the inner BatchSpanProcessor. The real is_ai_span filter still runs."""
        def on_start(self, span, parent_context=None): pass
        def on_end(self, span): forwarded.append(span)
        def shutdown(self): pass
        def force_flush(self, timeout_millis=None): return True

    proc._processor = _Recorder()

    provider = TracerProvider(resource=Resource(attributes={"service.name": "test"}))
    provider.add_span_processor(proc)
    trace.set_tracer_provider(provider)
    return forwarded, provider


def report(name, forwarded, provider):
    provider.force_flush()
    print(f"\n{'=' * 58}\n{name}: {len(forwarded)} span(s) forwarded to PostHog")
    for s in forwarded:
        print(f"  - {s.name}")
    return len(forwarded)
```

- [ ] **Step 3: Validate the harness with a known-good baseline**

Create `/tmp/aio-verify/t_baseline.py`:

```python
import sys; sys.path.insert(0, "/tmp/aio-verify")
from harness import fake_openai_server, install_recording_processor, report

forwarded, provider = install_recording_processor()
from opentelemetry.instrumentation.openai_v2 import OpenAIInstrumentor
OpenAIInstrumentor().instrument()

import openai
with fake_openai_server() as url:
    openai.OpenAI(api_key="sk-test", base_url=url).chat.completions.create(
        model="gpt-4o-mini", messages=[{"role": "user", "content": "hi"}])

n = report("BASELINE", forwarded, provider)
assert n > 0, "harness is broken: baseline produced no spans"
print("\nharness validated")
```

- [ ] **Step 4: Run it**

Run: `/tmp/aio-verify/otelvenv/bin/python /tmp/aio-verify/t_baseline.py`
Expected: `BASELINE: 1 span(s) forwarded` then `harness validated`.

If this fails, stop — every later task depends on it.

- [ ] **Step 5: No commit**

Nothing here is committed. The harness lives only in `/tmp`.

---

### Task 1: Fix crewai

CrewAI 1.15.9 defaults to its native `OpenAICompletion` client and bypasses LiteLLM entirely, so the documented `litellm.success_callback = ["posthog"]` never fires and **zero events** are sent. Routing through LiteLLM requires `is_litellm=True`.

**Files:**
- Modify: `docs/onboarding/ai-observability/crewai.tsx` (the "Run your crew" code block, around line 100)
- Test: `/tmp/aio-verify/t_crewai.py`

**Interfaces:**
- Consumes: nothing from other tasks (uses `llvenv`, not the harness — LiteLLM posts over HTTP rather than emitting OTel spans).
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Write the failing test**

Create `/tmp/aio-verify/t_crewai.py`:

```python
"""Does the documented CrewAI setup capture anything?"""
import json, os
from unittest.mock import patch, MagicMock

os.environ.update(POSTHOG_API_KEY="phc_test",
                  POSTHOG_API_URL="https://us.i.posthog.com",
                  OPENAI_API_KEY="sk-test")

import litellm, crewai
from crewai import Agent, LLM
from openai.types.chat import ChatCompletion, ChatCompletionMessage
from openai.types.chat.chat_completion import Choice
from openai.types.completion_usage import CompletionUsage

litellm.success_callback = ["posthog"]      # what the page tells you to do
litellm.failure_callback = ["posthog"]

fake = ChatCompletion(
    id="c1", model="gpt-4o-mini", object="chat.completion", created=0,
    choices=[Choice(index=0, finish_reason="stop",
                    message=ChatCompletionMessage(role="assistant", content="Sunny!"))],
    usage=CompletionUsage(prompt_tokens=10, completion_tokens=5, total_tokens=15))

posts = []
def fake_post(url, **kw):
    b = kw.get("data") or kw.get("content") or kw.get("json")
    posts.append(json.loads(b) if isinstance(b, (str, bytes)) else b)
    r = MagicMock(); r.status_code = 200; r.text = "ok"; r.raise_for_status = lambda: None
    return r

# TOGGLE: set to True once the page documents is_litellm=True
USE_FIX = False

llm = LLM(model="gpt-4o-mini", is_litellm=True, mock_response="Sunny!") if USE_FIX else None
agent_kwargs = {"llm": llm} if llm else {}

with patch("litellm.llms.custom_httpx.http_handler.HTTPHandler.post", side_effect=fake_post), \
     patch("openai.resources.chat.completions.Completions.create", return_value=fake):
    a = Agent(role="Researcher", goal="Find facts", backstory="Expert.", **agent_kwargs)
    a.llm.call("Research three fun facts about hedgehogs.")

events = [e for p in posts for e in (p.get("batch") or [])]
print(f"crewai {crewai.__version__}  client={type(a.llm).__module__}.{type(a.llm).__name__}")
print(f"PostHog events captured: {len(events)}")
assert events, "NOTHING CAPTURED — the documented setup sends no events"
print("PASS")
```

- [ ] **Step 2: Run it to confirm the documented setup is broken**

Run: `/tmp/aio-verify/llvenv/bin/python /tmp/aio-verify/t_crewai.py`
Expected: FAIL — `AssertionError: NOTHING CAPTURED`, and the printed client is `crewai.llms.providers.openai.completion.OpenAICompletion`.

- [ ] **Step 3: Edit the page**

In `docs/onboarding/ai-observability/crewai.tsx`, find this exact block inside the "Run your crew" step:

```
                            researcher = Agent(
                                role="Researcher",
                                goal="Find interesting facts about hedgehogs",
                                backstory="You are an expert wildlife researcher.",
                            )
```

Replace with:

```
                            # is_litellm=True routes calls through LiteLLM so the PostHog
                            # callback fires. Without it, CrewAI uses its own provider client
                            # and no events are captured.
                            llm = LLM(model="gpt-4o-mini", is_litellm=True)

                            researcher = Agent(
                                role="Researcher",
                                goal="Find interesting facts about hedgehogs",
                                backstory="You are an expert wildlife researcher.",
                                llm=llm,
                            )
```

The "Run your crew" block has no imports of its own — it relies on the import in the earlier "Configure PostHog with LiteLLM" block. That import is the **only** `from crewai import` line in the file, at line 65. Change it from:

```
                            from crewai import Agent, Task, Crew
```

to:

```
                            from crewai import Agent, Task, Crew, LLM
```

Verify there is exactly one such line before and after:

```bash
grep -c "from crewai import" docs/onboarding/ai-observability/crewai.tsx   # expect 1
```

- [ ] **Step 4: Update the explanatory callout**

Find the `CalloutBox` with title `"How this works"` and replace its `Markdown` body:

```
                            CrewAI uses LiteLLM under the hood for LLM provider access. By configuring PostHog as a
                            LiteLLM callback, all LLM calls made through CrewAI are automatically captured as
                            `$ai_generation` events without proxying your calls.
```

with:

```
                            CrewAI can route LLM calls either through its own provider clients or through
                            LiteLLM. PostHog hooks into LiteLLM's callback system, so you need
                            `is_litellm=True` on the `LLM` you pass to your agents. With it, every call is
                            captured as an `$ai_generation` event without proxying your calls.
```

- [ ] **Step 5: Add a version floor note**

Immediately after that `CalloutBox`, add:

Note the `{dedent`...`}` wrapper: a bare `<` in JSX children is a parse error, so the `posthog<6.0.0` text must live inside a template literal, with inline backticks escaped. This matches the convention already used elsewhere in this file.

```tsx
                    <CalloutBox type="caution" icon="IconWarning" title="PostHog SDK version">
                        <Markdown>
                            {dedent`
                                CrewAI installs \`chromadb\`, which pins \`posthog<6.0.0\`. The AI observability
                                wrappers and the LangChain handler work on 5.x, so CrewAI tracing is unaffected.
                                But \`posthog.ai.otel\` was added in 7.12.0, so the OpenTelemetry integration
                                cannot be installed alongside CrewAI unless you override chromadb's pin.
                            `}
                        </Markdown>
                    </CalloutBox>
```

Accuracy note, verified by bisecting published wheels (sdists omit `posthog/ai/otel` from their manifest and will mislead you): `posthog.ai.langchain` ships in 5.4.0 and importing it fails only without `langchain-core` — an optional-dependency gate, not a version gate. `posthog.ai.otel` is absent through 7.11.0 and first appears in **7.12.0**, which conflicts with chromadb's `<6.0.0` ceiling.

- [ ] **Step 6: Flip the test toggle and re-run**

Change `USE_FIX = False` to `USE_FIX = True` in `/tmp/aio-verify/t_crewai.py`, then:

Run: `/tmp/aio-verify/llvenv/bin/python /tmp/aio-verify/t_crewai.py`
Expected: PASS — `client=crewai.llm.LLM`, `PostHog events captured: 1`.

- [ ] **Step 7: Commit**

```bash
cd /Users/marcogancitano/Documents/Coding/posthog
git add docs/onboarding/ai-observability/crewai.tsx
git commit -m "fix(docs): route CrewAI through LiteLLM so PostHog captures events

CrewAI 1.15.9 defaults to its native OpenAICompletion client and bypasses
LiteLLM, so the documented litellm.success_callback never fired and no
events were captured. Pass is_litellm=True on the LLM given to agents.

Also notes the chromadb posthog<6.0.0 pin."
```

---

### Task 2: Fix mirascope

Two independent breakages. The documented import `from mirascope.core import ...` is v1 and raises `ModuleNotFoundError` on 2.5.0, which exposes only `mirascope.llm`. And v2 routes through the OpenAI **Responses API**, which `OpenAIInstrumentor` does not wrap — it covers only `chat.completions.{Completions,AsyncCompletions}.create` and the two embeddings methods.

**Files:**
- Modify: `docs/onboarding/ai-observability/mirascope.tsx` (the call example, around lines 86–104)
- Test: `/tmp/aio-verify/t_mirascope.py`

**Interfaces:**
- Consumes: `harness.py` from Task 0.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Write the failing test**

Create `/tmp/aio-verify/t_mirascope.py`:

```python
"""Does the documented mirascope setup capture anything?"""
import sys, os
sys.path.insert(0, "/tmp/aio-verify")
from harness import fake_openai_server, install_recording_processor, report

forwarded, provider = install_recording_processor()
from opentelemetry.instrumentation.openai_v2 import OpenAIInstrumentor
OpenAIInstrumentor().instrument()

from mirascope import llm

# TOGGLE: set to True once the page documents register_provider
USE_FIX = False

with fake_openai_server() as url:
    os.environ["OPENAI_BASE_URL"] = url
    os.environ["OPENAI_API_KEY"] = "sk-test"

    if USE_FIX:
        llm.register_provider("openai:completions")

    @llm.call("openai/gpt-4o-mini")
    def fun_fact(topic: str) -> str:
        return f"Tell me a fun fact about {topic}"

    response = fun_fact("hedgehogs")
    print("response.text() ->", repr(response.text())[:60])

n = report("mirascope", forwarded, provider)
assert n == 1, f"expected exactly 1 generation span, got {n}"
print("PASS")
```

- [ ] **Step 2: Run it to confirm the documented setup is broken**

Run: `/tmp/aio-verify/otelvenv/bin/python /tmp/aio-verify/t_mirascope.py`
Expected: FAIL — `mirascope: 0 span(s) forwarded`, then `AssertionError: expected exactly 1 generation span, got 0`.

- [ ] **Step 3: Replace the call example**

In `docs/onboarding/ai-observability/mirascope.tsx`, find this exact code string:

```
                            from mirascope.core import openai, prompt_template

                            @openai.call("gpt-4o-mini")
                            @prompt_template("Tell me a fun fact about {topic}")
                            def fun_fact(topic: str): ...

                            response = fun_fact("hedgehogs")
                            print(response.content)
```

Replace with:

```
                            from mirascope import llm

                            # Route OpenAI calls through chat.completions. Mirascope defaults to the
                            # Responses API, which the OpenTelemetry instrumentation does not cover.
                            llm.register_provider("openai:completions")

                            @llm.call("openai/gpt-4o-mini")
                            def fun_fact(topic: str) -> str:
                                return f"Tell me a fun fact about {topic}"

                            response = fun_fact("hedgehogs")
                            print(response.text())
```

- [ ] **Step 4: Add the explanatory callout**

Immediately after that `CodeBlock`, add:

```tsx
                    <CalloutBox type="caution" icon="IconWarning" title="Use the completions provider">
                        <Markdown>
                            `opentelemetry-instrumentation-openai-v2` instruments `chat.completions` and
                            `embeddings` only. Mirascope v2 uses the OpenAI Responses API by default, which
                            produces no spans. `llm.register_provider("openai:completions")` switches it to
                            `chat.completions` so calls are captured. This page targets Mirascope 2.x — the
                            `mirascope.core` API was v1 and no longer exists.
                        </Markdown>
                    </CalloutBox>
```

- [ ] **Step 5: Flip the test toggle and re-run**

Change `USE_FIX = False` to `USE_FIX = True`, then:

Run: `/tmp/aio-verify/otelvenv/bin/python /tmp/aio-verify/t_mirascope.py`
Expected: PASS — `mirascope: 1 span(s) forwarded`, span named `chat gpt-4o-mini`.

- [ ] **Step 6: Commit**

```bash
cd /Users/marcogancitano/Documents/Coding/posthog
git add docs/onboarding/ai-observability/mirascope.tsx
git commit -m "fix(docs): update Mirascope page to v2 API and completions provider

The documented mirascope.core import is v1 and fails on 2.5.0. Mirascope v2
also routes through the OpenAI Responses API, which
opentelemetry-instrumentation-openai-v2 does not wrap, so no spans were
produced. register_provider('openai:completions') routes via chat.completions."
```

---

### Task 3: Fix llamaindex

`opentelemetry-instrumentation-llamaindex` 0.62.1 with llama-index 0.14.23 installs and runs without error but emits **no spans at all**, including with the documented `VectorStoreIndex` + `query_engine` shape. Swapping to the OpenAI instrumentation captures the underlying LLM calls.

LlamaIndex's own `llama-index-observability-otel` was evaluated and rejected: it emits 19 spans that are bare Python class-method traces with zero attributes — no model, tokens, or messages — and it fights for ownership of the TracerProvider.

**Files:**
- Modify: `docs/onboarding/ai-observability/llamaindex.tsx` (lines 33, 56, 73)
- Test: `/tmp/aio-verify/t_llamaindex.py`

**Interfaces:**
- Consumes: `harness.py` from Task 0.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Write the failing test**

Create `/tmp/aio-verify/t_llamaindex.py`:

```python
"""Does the documented LlamaIndex setup capture anything?"""
import sys
sys.path.insert(0, "/tmp/aio-verify")
from harness import fake_openai_server, install_recording_processor, report

forwarded, provider = install_recording_processor()

# TOGGLE: set to True once the page documents the OpenAI instrumentor
USE_FIX = False

if USE_FIX:
    from opentelemetry.instrumentation.openai_v2 import OpenAIInstrumentor
    OpenAIInstrumentor().instrument()
else:
    from opentelemetry.instrumentation.llamaindex import LlamaIndexInstrumentor
    LlamaIndexInstrumentor().instrument()

with fake_openai_server() as url:
    from llama_index.llms.openai import OpenAI
    from llama_index.core import VectorStoreIndex, Document, Settings
    from llama_index.core.embeddings import MockEmbedding

    Settings.embed_model = MockEmbedding(embed_dim=8)
    llm = OpenAI(model="gpt-4o-mini", api_key="sk-test", api_base=url)
    index = VectorStoreIndex.from_documents([Document(text="Paris weather report.")], llm=llm)
    answer = index.as_query_engine(llm=llm).query("What is this about?")
    print("query ok:", str(answer)[:40])

n = report("llamaindex", forwarded, provider)
assert n > 0, "NOTHING CAPTURED — the documented setup produces no spans"
print("PASS")
```

- [ ] **Step 2: Run it to confirm the documented setup is broken**

Run: `/tmp/aio-verify/otelvenv/bin/python /tmp/aio-verify/t_llamaindex.py`
Expected: FAIL — the query succeeds but `llamaindex: 0 span(s) forwarded`, then `AssertionError: NOTHING CAPTURED`.

- [ ] **Step 3: Change the install line**

In `docs/onboarding/ai-observability/llamaindex.tsx`, line 33, replace:

```
                            pip install llama-index llama-index-llms-openai opentelemetry-sdk "posthog[otel]" opentelemetry-instrumentation-llamaindex
```

with:

```
                            pip install llama-index llama-index-llms-openai opentelemetry-sdk "posthog[otel]" opentelemetry-instrumentation-openai-v2
```

- [ ] **Step 4: Change the import**

Line 56, replace:

```
                            from opentelemetry.instrumentation.llamaindex import LlamaIndexInstrumentor
```

with:

```
                            from opentelemetry.instrumentation.openai_v2 import OpenAIInstrumentor
```

- [ ] **Step 5: Change the instrument call**

Line 73, replace:

```
                            LlamaIndexInstrumentor().instrument()
```

with:

```
                            OpenAIInstrumentor().instrument()
```

- [ ] **Step 6: Add a scope callout**

Immediately after the `CodeBlock` containing the instrument call, add:

```tsx
                    <CalloutBox type="fyi" icon="IconInfo" title="What gets captured">
                        <Markdown>
                            This instruments the OpenAI calls LlamaIndex makes underneath, so you get one
                            `$ai_generation` per LLM call. Retrieval and query-engine steps are not captured
                            as spans. To record those, capture `$ai_span` events yourself with a shared
                            `$ai_trace_id` — see [manual capture](/docs/ai-observability/installation/manual-capture).
                        </Markdown>
                    </CalloutBox>
```

- [ ] **Step 7: Flip the test toggle and re-run**

Change `USE_FIX = False` to `USE_FIX = True`, then:

Run: `/tmp/aio-verify/otelvenv/bin/python /tmp/aio-verify/t_llamaindex.py`
Expected: PASS — `llamaindex: 1 span(s) forwarded`, span named `chat gpt-4o-mini`.

- [ ] **Step 8: Commit**

```bash
cd /Users/marcogancitano/Documents/Coding/posthog
git add docs/onboarding/ai-observability/llamaindex.tsx
git commit -m "fix(docs): instrument OpenAI directly on the LlamaIndex page

opentelemetry-instrumentation-llamaindex 0.62.1 emits no spans with
llama-index 0.14.23, so the documented setup captured nothing. Instrumenting
the underlying OpenAI calls captures generations; retrieval spans need manual
capture, which the page now says."
```

---

### Task 4: Verify all three pages render

The edits are inside `dedent` template strings in TSX. A stray backtick or `${` breaks the build for every page.

**Files:**
- Test: none created; uses the monorepo's own tooling.

**Interfaces:**
- Consumes: the three edited `.tsx` files from Tasks 1–3.
- Produces: nothing.

- [ ] **Step 1: Syntax-check the three files**

The monorepo uses `tsgo`, not `tsc` — `pnpm exec tsc` fails with "Command not found". Run each file individually. Import-resolution noise (`TS2307`, `TS2686`) is expected because the files are checked outside their project config; filter to the two error classes that actually indicate a broken template string:

```bash
cd /Users/marcogancitano/Documents/Coding/posthog
for f in crewai mirascope llamaindex; do
  echo "--- $f"
  pnpm exec tsgo --noEmit --ignoreConfig --jsx react --esModuleInterop \
    --skipLibCheck --target es2020 --module esnext --moduleResolution bundler \
    "docs/onboarding/ai-observability/$f.tsx" 2>&1 \
    | grep -E "TS2304|TS1[0-9]{3}" || echo "  clean"
done
```

Expected: `clean` for all three.

`TS1xxx` means a syntax error, typically an unescaped backtick. `TS2304 Cannot find name 'x'` means a stray `${x}` inside a `dedent` block is being interpolated as JavaScript instead of printed literally — escape it as `\${x}`.

This check is known to have teeth: introducing `${oops}` into a code string produces `error TS2304: Cannot find name 'oops'`.

- [ ] **Step 2: Confirm no unintended interpolation was introduced**

```bash
cd /Users/marcogancitano/Documents/Coding/posthog
grep -nE '\$\{' docs/onboarding/ai-observability/crewai.tsx \
  docs/onboarding/ai-observability/mirascope.tsx \
  docs/onboarding/ai-observability/llamaindex.tsx
```

Expected: no hits from the edits. The mirascope example uses `f"Tell me a fun fact about {topic}"` — a Python f-string with single braces, which is not template interpolation and is safe.

Note: the authoritative render check is the posthog.com Gatsby build, which pulls these components. That build is out of scope for this plan.

- [ ] **Step 3: Commit if anything needed fixing**

```bash
cd /Users/marcogancitano/Documents/Coding/posthog
git add docs/onboarding/ai-observability/
git commit -m "fix(docs): escape template syntax in AI observability pages"
```

If nothing needed fixing, skip the commit.

---

## Follow-on plans

This plan covers only the three pages that capture nothing. Two further plans complete the spec:

1. **Monorepo primary-recommendation rewrite** — switch `openai`, `anthropic`, `google` and the 18 OpenAI-standard pages from OTel to the PostHog wrapper; `langchain`/`langgraph` to `CallbackHandler`; add the `$ai_span` how-to to `manual.tsx`; session guidance for `openai-agents`, `claude-agent-sdk`, `vercel-ai`, `litellm`/`crewai`/`dspy`; limitation notes for the OTel-only pages. Blocked on posthog-python#819, posthog-js#4335 and posthog-js#4336 for the `openai-agents` pages only.
2. **posthog.com website-only session-tree snippets** — the `session-tree/` snippets and `addSessionTreeStep(family)` helper.

They are sequenced after this one because the pages fixed here must capture at all before it is worth improving what they capture.
