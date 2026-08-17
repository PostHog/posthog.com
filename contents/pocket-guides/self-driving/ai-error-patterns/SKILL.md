---
name: signals-scout-ai-observability-error-patterns
description: >
  Finds new or growing AI failure modes, including silent quality failures, and validates each
  pattern against real traces.
allowed_tools:
  - emit_report
  - edit_report
---

# AI observability error patterns

Find recurring AI failure modes by reading traces, including the ones that return HTTP 200 with no
exception.

Narrower than `signals-scout-ai-observability`, which rotates through cost, latency, errors,
volume and eval lenses and does not run every lens each tick. Distinct from
`signals-scout-error-tracking`, which owns thrown exceptions across the whole product: this one
owns failures inside an AI workflow, most of which never throw. Cost regressions belong to
`signals-scout-ai-cost` and `signals-scout-ai-observability-costly-users`.

Compare against the preceding 24 hours and the recent 7-day baseline.

## Discriminator

Emit a report when a **failure mode recurs across independent traces within one use case, is new
or materially worse than its baseline, and has a concrete next action**. Write nothing for a raw
error count that moved: counts are pointers to investigate, not findings, and a mode confirmed in
a single trace is an anecdote.

The important half is that important AI failures return HTTP 200. Ignored instructions, wrong
answers, missing context, tool misuse, loops, malformed output, and work that stopped halfway all
look like success to an error rate.

### The bar

A starting threshold, to be tuned against what this project's data actually does:

- **The mode appears in at least 3 independent traces** in the sampled set, and
- **its share of the use-case population is new or has at least doubled** against the 7-day
  baseline, and
- **a volume floor** on the use case, below which a share is noise.

Keep sample counts and population estimates separate in the report. Reading 14 of 22 traces does
not mean 64% of production.

## Explore

Work one use case at a time, because different trace types fail differently.

1. **Discover the project's trace taxonomy** from properties that actually exist: feature,
   workflow, model, span name. Don't assume a dimension is there.
2. **Choose the use case** with the clearest recent change or the stalest prior coverage.
3. **Select traces using signals that fit the data**: explicit errors, tool failures, retries,
   evaluation failures, negative feedback, latency or token outliers, semantic clusters, or a
   stratified sample.
4. **Open and read the traces.** Queries choose what to read; they do not establish a failure
   mode.
5. **Identify the first thing that went wrong** in each failing trace and group by that root
   failure, not by its downstream symptoms.
6. **Continue until the common modes stabilize**, to a maximum of 25 traces in one run.
7. **Quantify each mode** against the full use-case population.

Create one report per root failure. Create at most two reports per run, and search the inbox
before writing: a matching live report gets edited, never duplicated. Title a new report
`AI error pattern: <specific mode>`, and include one to three representative trace links or IDs.

Summarize the relevant behavior and cite trace IDs rather than copying sensitive prompt or
response content.

## Disqualifiers

- A silent failure inferred from text matching alone, with no trace read behind it.
- Expected cancellations.
- Test or synthetic evaluation traffic presented as production impact.
- A known provider incident already covered elsewhere.
- A one-off trace with no systemic impact.
- An error aggregate that was never validated by reading traces.
