---
title: Advising customers on GDPR, PII, and right to be forgotten
sidebar: Handbook
showTitle: true
---

Questions about GDPR, personal data (PII), and the "right to be forgotten" come up again and again, especially with large, EU-based, or regulated prospects. They're high-stakes for the customer, and easy for us to get wrong in two opposite ways: saying too little (and looking like we don't understand our own product) or saying too much (and giving the impression we've signed off on their legal compliance).

This page is our posture for getting it right, plus the product facts you need to back it up.

## Our posture in one line

We advise confidently on **how PostHog works** and **what each setup achieves**. We do not interpret the law for the customer or tell them they're "compliant." Our job is to help them see their PII flow clearly so they — with their own legal or compliance team — can make the call.

> The compliance decision is always theirs. Our value is making that decision *informed*: showing exactly where PII lives, what each architecture does to it, and where our limits are. We can be far more helpful than most vendors here without ever owning the legal risk.

## How much should I advise vs. let the customer decide?

This is the question that started this page, so let's answer it directly with two zones.

### Advise confidently — the "how it works" zone

You should know this cold and explain it without hedging:

- How PostHog stores identity: `distinct_id` vs. person properties, and [person-on-events](#the-crux-person-on-events) (the crux).
- The consequences of each identity architecture (the [decision table](#the-one-question-that-resolves-most-cases) below).
- How deletion actually works, and what it does and doesn't remove.
- How to keep the PostHog UI human-readable without storing raw PII in risky places.
- How to set any of this up, including server-side.

These are facts about our product. Be specific, be honest about trade-offs, and recommend the option that fits their answer to the one question below.

### Don't decide for them — the "is this compliant" zone

Hand these back to the customer and their legal or compliance team:

- Whether any given setup makes them "GDPR compliant." Don't say it, don't imply it, and don't put it in writing.
- Whether a re-identifiable ID counts as personal data *for them*. Explain the principle — if an ID can be traced back to a person, regulators generally treat it as personal data — and let them apply it to their situation.
- How much they need to delete vs. anonymize. Risk appetite varies a lot between companies: some delete everything, others are comfortable with pseudonymization. That's their judgment call.
- Anything that sounds like a roadmap promise (see [limitations](#limitations-to-be-upfront-about)).

> Rule of thumb: if a sentence describes **what PostHog does**, you can say it. If it describes **whether they're legally in the clear**, it's theirs to decide.

## The one question that resolves most cases

Almost every "email, distinct IDs, and right to be forgotten" conversation comes down to a single question:

**Do they need to keep events after a deletion request?**

The answer points to one of three architectures.

| Architecture | When to use it | `distinct_id` | PII in PostHog | On a deletion request |
| --- | --- | --- | --- | --- |
| **A. PII as a person property, delete events on request** | They're fine losing a person's events when that person is deleted | Stable non-PII ID | Email, name, etc. stored as person properties | Delete the person with `delete_events=true` — removes the person *and* their events |
| **B. Keep PII out of PostHog entirely** *(recommended when events must be retained)* | They must keep events for analytics after deletion | Internal UUID only | None — PII lives only in their own system | Delete the row in *their* UUID→PII map. PostHog events are already PII-free; deleting the person profile is optional |
| **C. Pseudonymize or hash PII** | Middle ground: they want an identifier in PostHog but not the raw value | Stable non-PII ID | Hashed values only | Same as A or B, depending on whether the hash is reversible |

Three things to say alongside the table:

- **Don't recommend email as the `distinct_id`.** It writes the email into the `distinct_id` of every event — the hardest place to remove it later — and makes the ID itself personal data. Use a stable, non-PII ID instead.
- **A reversible hash is still personal data.** If they keep the key to un-hash it, regulators generally treat the hashed value as personal data. Hashing only becomes anonymization once the mapping is truly destroyed.
- **Option B is the clean one** for "we must keep our events." It's also the easiest to defend in an audit: PostHog simply never holds the PII.

## The crux: person-on-events

This is the detail that trips everyone up, including us, so make sure you understand it.

When an event is ingested, PostHog **copies the person's current properties onto the event itself**. So if `email` is a person property, every event that person fires gets a copy of that email stamped onto it.

Two consequences that matter for deletion:

1. **Deleting a person does not remove PII from their past events.** The person profile goes, but every event still carries the email that was stamped on it at capture time. To remove it, you have to delete the events too (`delete_events=true`).
2. **You can't keep the events and strip one property out of them** — at least not self-serve (see [limitations](#limitations-to-be-upfront-about)).

This is why "keep our events *and* honor deletion" is impossible to satisfy if PII was ever sent as a person property. The only way to have both is to never send the PII in the first place (option B).

> Person-on-events can't be turned off. There's a setting that affects how *queries* read person data, but it never stops properties from being written onto events at capture time. Don't tell a customer they can disable it.

## Keeping the UI readable without the risk

Customers often want email as the `distinct_id` purely so they can recognize people in the UI. They don't need to.

PostHog has a person display name setting (**Settings** > **Environment** > **Product analytics** > **Person display name**) that controls which property shows as a person's name. It defaults to `email`, then `name`, then `username`. So a person whose `distinct_id` is a UUID still shows as `jane@example.com` in the UI, as long as email is set as a person property.

That gives them the readability of option A while keeping a clean, non-PII `distinct_id`. (The email is still stamped on events, so this only fully solves deletion if they're on option A and willing to delete events — or option B, where there's no email at all and the UUID shows instead.)

## Setting it up server-side

Most of these conversations involve backend SDKs (for example, [posthog-node](/docs/libraries/node)). The same pattern applies:

- Pass a stable, non-PII `distinct_id` (a UUID from their system).
- Set PII as person properties with `$set`, via `identify()` or on a `capture()` call.
- `$process_person_profile` controls whether a person profile is created or updated at all. Set it to `false` for events that shouldn't touch a person.

> "Alias" is not the same as "set a property." `alias()` merges a value in as a *distinct ID*, which is exactly what we're trying to avoid. To attach an email to a person, use `$set`, not `alias()`.

## Limitations to be upfront about

Being honest about these early builds trust and avoids a painful surprise during an audit:

- **Deleting a person doesn't scrub PII from retained events.** Covered above. If they want events kept, the PII must never have been sent.
- **There's no self-serve way to remove a single property from events.** Keeping events while scrubbing one property out of them isn't a product feature today. In exceptional cases it may be possible via an escalation, but don't present it as a feature or a roadmap commitment.
- **Deletions are asynchronous.** Event deletion is batched and runs during off-peak times (weekends on Cloud), not instantly. Avoid reusing a deleted `distinct_id` until the deletion has finished processing.

## Being more helpful than other vendors

The bar here is low and we can clear it. What "helpful" looks like in practice:

- **Map their PII flow with them.** Walk through where each piece of PII enters, where it's stored, and what happens on deletion. The artifact of that conversation is exactly what they'll want for an audit.
- **Point to the exact controls**, not vague reassurances: the display name setting, `delete_events`, [transformations](/docs/cdp/transformations) for hashing, IP discarding.
- **Be honest about the limits** above rather than hand-waving.

What "helpful" does not mean: signing off on their compliance, or making commitments about unreleased tooling.

## Resources to share with customers

- [GDPR compliance guide](/docs/privacy/gdpr-compliance)
- [Controlling data storage](/docs/privacy/data-storage) — deletion API, transformations, and access control
- [Right to be forgotten](/docs/privacy/data-storage#right-to-be-forgotten)
- [Controlling data collection](/docs/privacy/data-collection)
- [A simple guide to personal data and PII](/blog/what-is-personal-data-pii)

## When to escalate

- Product or behavior questions you can't answer → [support](/handbook/cs-and-onboarding/handling-customer-issues), or the [owning engineering team](/handbook/engineering/feature-ownership).
- A deletion need that can't be met self-serve (for example, removing one property from retained events) → escalate to support, and don't promise an outcome.
- Anything touching contracts, DPAs, or a formal compliance sign-off → loop in the right team rather than answering yourself. See our [security and privacy guidelines](/handbook/company/security).
