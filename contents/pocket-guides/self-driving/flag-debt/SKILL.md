---
name: signals-scout-flag-debt
description: >
  Finds feature flags whose decision is over but which are still evaluated in production –
  terminal rollouts left in place, or keys that no longer appear in any connected repo.
allowed_tools:
  - emit_report
  - edit_report
---

# Feature flag debt

Find flags whose decision is over while something is still evaluating them.

Narrower than `signals-scout-feature-flags`, which watches the whole flag surface – evaluation
cliffs, ghost keys, response-distribution shifts, flag debt – from PostHog data alone. This one
adds the half that scout cannot see: your repository. Run it if your flags routinely outlive
your cleanup PRs. If you want the analysis on demand rather than on a schedule, the
`cleaning-up-stale-feature-flags` and `finding-deleted-feature-flags` skills already do it, and
`auditing-experiments-flags` covers experiment-linked flags.

Weekly rather than the daily fleet default: flag debt accumulates over months, so a daily run
would re-read the same roster and write nothing six days out of seven.

**Term collision, worth knowing.** The canonical scout uses **ghost flag** for the opposite case
– code calling a key with no flag behind it, where the SDK silently returns `false`. That is a
different finding with a different fix. Don't reuse the term here.

## Discriminator

Emit a report when a flag is still emitting `$feature_flag_called` evaluations **and** either

- **(a)** it has been at 100% or 0% with no edits for 60+ days, or
- **(b)** its key does not appear in any connected repository.

Write nothing for a flag whose rollout percentage changed recently, or that was edited in the
last 30 days – that flag is mid-rollout and doing its job.

The two cases are not the same finding. **(a)** is cleanup you can do: the code is there and it
takes the same branch every time. **(b)** is a question – something is calling that key and it
isn't in the code you can see. Never treat (b) as a delete candidate on its own.

### Coverage caveat

`$feature_flag_called` fires on explicit evaluation calls. Server SDKs using local evaluation,
bootstrapped flags, and clients with flag-event capture disabled may not emit it at all, so
**absence of the event is weak evidence that a flag is unused**. Lean on PostHog's server-side
`STALE` status, which accounts for `last_called_at`, rather than on raw event absence.

## Explore

1. List flags with recent evaluations, plus their rollout percentage, tags, and last-modified
   date.
2. Search every connected repository for each candidate key. Three outcomes, not two:
   - **A string literal, or a constant that resolves to one** – a definite answer either way.
   - **Dynamically constructed** – a key assembled at the call site from a variable. A repo
     search can't resolve these, and they are the main source of false "the key is gone"
     conclusions. Treat a nearby prefix or template match as uncertainty, never as a delete
     recommendation.
   - **Not found anywhere** – case (b). Go to step 3 before concluding anything.
3. For a case (b) flag, work out what is still calling it. The plausible answers are all things
   this scout can't see: a repo that isn't connected, shipped mobile clients still running old
   code, or a third-party or SDK consumer. Name the possibilities in the report, and check the
   `$lib` and `$lib_version` spread on the evaluations – old client versions point at shipped
   code you can't deploy over.
4. Before recommending any removal, confirm the flag isn't load-bearing:
   - **Attached to an experiment**, with a non-empty `experiment_set` – leave it alone entirely;
     deleting it breaks the experiment and its results.
   - **Referenced by another flag's release conditions** – flag dependencies exist, and deleting
     the parent changes what the dependent serves.
   - **Consumed for its payload** – a flag can sit at 100% and be read only for its payload
     value, so the key shows up in a config fetch rather than in a branch.
   - **Tagged as excluded** – see the disqualifiers.
5. Quantify the reach: evaluations per day and distinct persons. That is what makes the report
   worth someone's afternoon. It is **not** a billing argument – `$feature_flag_called` is
   excluded from billable event volume – so don't put a dollar figure on it. The cost here is a
   code path nobody can reason about, not an invoice.
6. Bundle the findings into one report rather than filing one per flag, and keep the two cases
   visibly separate inside it.

## Suggested action

Deleting a flag is not a no-op. Once the flag is gone, evaluation returns `false` or `undefined`
– not the last value it served. Any live client still evaluating a deleted 100% flag flips to
the off path, which is a production behavior change.

So the order matters, and it isn't one pull request:

1. Remove the call sites, and deploy.
2. Confirm evaluations stop.
3. Then delete the flag.

Recommend step 1 – that's the PR an agent can open. Steps 2 and 3 are the follow-up you name in
the report, not something to bundle into the same diff.

## Disqualifiers

- The key appears in the repo, even only in tests or config.
- The key may be dynamically constructed and the search can't rule it out.
- The flag was edited recently, or its percentage is between 1 and 99.
- The flag is experiment-linked, has dependent flags, or is read for its payload.
- The flag carries an exclusion tag. Kill switches and ops toggles look exactly like debt and
  must never be recommended for removal – but most of them carry no description, so don't try to
  infer intent from prose. Ask the team to tag them (`keep`, `ops`, `kill-switch`) and read the
  tag. Record anything you're told to leave alone in your scratchpad so the exclusion survives
  to the next run. The durable way to stop a scout re-flagging something is to give it somewhere
  to remember, not to hope for good metadata.
- Coverage is partial. If any repo that evaluates flags isn't connected, case (b) findings are
  unsafe – report them as open questions only.
