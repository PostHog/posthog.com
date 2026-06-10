---
title: Onboarding and lifecycle emails
sidebar: Handbook
showTitle: true
---

How PostHog's automated onboarding and lifecycle emails work in Customer.io, and what to do when you launch a new product. Aimed at product marketers. These are the patterns we use *today* — conventions, not hard rules. Build something new when a launch calls for it.

> **Launching something, or want a second pair of eyes?** <TeamMember name="Joe Martin" photo /> owns customer comms — loop him in early.

This is about *marketing* onboarding (emails new users get automatically), not the Sales/CS [onboarding program](/handbook/onboarding/onboarding-program). For the underlying email setup — topics, unsubscribes, sending addresses — see [email marketing](/handbook/marketing/email-comms).

## How the system works

Four layers, stacked:

1. **Data** — events and attributes synced from PostHog (`user signed up`, `user showed product intent`, activation events).
2. **Segments** — saved groups built from that data ("signed up but not activated", "interested in flags").
3. **Campaigns** — the automated flows: *triggered* by data, *branched* by segments, and they *exit* people on conversion.
4. **Subscription topics** — the consent category each campaign sends under ("Welcome emails", "Changelog updates").

Two data concepts drive most of the logic, and both are owned by **Growth Engineering** — so if they don't exist for your product yet, that's step one:

- **[Product intent](/handbook/growth/growth-engineering/product-intents)** — which product someone actually came for (primary, secondary, or basic), from the `user showed product intent` event.
- **[Activation](/handbook/growth/growth-engineering/per-product-activation)** — whether they got value, defined per product by a qualifying event or set of events.

### Segments come in families

There are hundreds; you only need the families. Before building one, check it doesn't already exist — duplicates are the biggest source of mess. Prefer **dynamic** (auto-updating) over **static** lists.

| Family | Purpose |
| --- | --- |
| Hygiene / deliverability ("Unsubscribed", "Valid Email Address") | Protect deliverability — almost every flow excludes these |
| Instance & geography ("All Cloud Users", "Self-hosted Users") | Who can be messaged, and how |
| Lifecycle / recency ("New Signups", "Logged in last 30 days") | Where someone is in their journey |
| ICP / role ("High ICP", "Org owners or admins") | Tailor by fit and seniority |
| Product intent ("Primary Intent: Session Replay") | Route people to content for the product they care about |
| Activation ("Activated – Replays") | Know who succeeded, so we stop nudging them |
| Beta ("Beta Users – Error Tracking") | Follow up with beta participants |
| Programs ("Startups & YC") | Power program-specific flows |

### The core flows

| Flow | Trigger | What it does | Goal |
| --- | --- | --- | --- |
| **Onboarding 8.0** (flagship) | `user signed up` | 130+ emails that branch on product intent and behavior to tailor the first-run experience | Activate within 7 days |
| **Long-running onboarding** | `user signed up` | Slower, spaced-out nurture over a longer window | Logs in again |
| **Beta onboarding** | `$feature_enrollment_update` | One feedback email after someone joins *any* beta — you get this free for every beta | Activates a product |
| **Startups & YC** | *enters a segment* | Program-specific content (credits, job board, integrations) | Activation |

The idea behind the flagship: **it's intent-aware and activation-aware** — it sends people content about the product they came for, and exits the moment they activate. (Avoid Customer.io's legacy "behavioral" campaign type for anything new — it silently excludes existing and backfilled people.)

## The personalized "next steps" block

Inside the onboarding emails is a block that recommends each person's best next product, based on what they've already activated and shown intent in. One quirk shapes how it's built: **Customer.io's Liquid can't read segments or event history** — inside an email you only get the person's profile attributes. So we copy segment membership onto attributes first:

> **Segments → "Attr sync" campaigns → attributes → email content.** For each Activated/Intent segment, a tiny `seg_attr` campaign fires when someone *enters* it and runs one **Update attributes** action — no email, it just writes data. They share an `Attr sync` name prefix so they group together.

| Attribute | Set when the person enters | Example |
| --- | --- | --- |
| `activated_[product]` | "Activated – [product]" | `"true"` |
| `activated_mcp` | "Activated: MCP" | `"true"` |
| `intent_primary_product` | "Primary Intent: [product]" | `"session_replay"` |
| `intent_secondary_product` | "Secondary Intent: [product]" | `"feature_flags"` |

The email's Liquid reads these to pick the person's top un-activated product (biased toward their primary, then secondary intent) and personalizes the bullets, **subject line, headline, CTA, and a closing "ask PostHog AI this" prompt** — all tied to that same product. The editable copy lives in aligned lists at the top of the snippet, which lives in the email in Customer.io (ask <TeamMember name="Joe Martin" photo /> for the current version).

> **If you edit the Liquid:** variables are **per-block** (include the logic in every block/field that uses it — including the subject), and use **single quotes only** (code blocks HTML-encode double quotes and break Liquid).

## Launching a new product: the checklist

Not every step applies to every launch, but this is the path of least surprise:

1. **Confirm intent + activation exist** (Growth Engineering owns these). Without them the system is blind — do this *before* public beta.
2. **In beta, lean on what's there.** The beta flow already collects feedback for every opt-in, for free. Want more? Build a "Beta Users – [product]" segment and a small, single-purpose flow.
3. **Decide: extend or build new.**
   - *Extend Onboarding 8.0* for a core product — add your intent branch and a few product emails to the main flow. Usually the right call.
   - *Build a standalone flow* for a distinct audience or behavior — event trigger for "when X happens", segment trigger for "everyone who is X".
4. **Build the segments** you need (intent, activation, plus any launch-specific audience).
5. **Wire up the flow** — trigger, entry filters, delays and send windows, branches, a real conversion goal, exit-on-conversion, subscription topic, and keep message limits on.
6. **Add it to the personalized recommendations**, if it should appear there (see below).
7. **Test, then launch** — preview and test-send every message, sanity-check the branches, move from draft to live, then watch conversion to activation.

### Adding a product to the personalized recommendations

1. **Source segments must exist** — an "Activated – [product]" segment and "Primary/Secondary Intent: [product]" segments (from step 1 above).
2. **Create the "Attr sync" campaigns** — one `seg_attr` campaign per segment that sets the attribute (`activated_[product] = "true"`, or `intent_primary_product = "[product]"`). **Launch each with backfill** so people already in the segment get the attribute, not just new entrants.
3. **Add the product to the snippet** — its key, display name, app URL, and recommendation sentence to the aligned lists (keep them the same length and order), its `activated_[product]` check, and its PostHog AI question.
4. **Test** against a profile with the new attributes set.

It's fiddly and easy to get subtly wrong (misaligned lists, or a campaign that wasn't backfilled) — loop in <TeamMember name="Joe Martin" photo /> rather than guessing.

## Rules of practice

- **Respect consent** — pick the right [subscription topic](/handbook/marketing/email-comms), and never email unsubscribed users.
- **Always exit on conversion** — stop the moment someone activates.
- **Set a real conversion goal** (almost always activation) so you can tell if the flow works.
- **Keep message limits on** — people are in several flows at once.
- **Prefer extending the main flow over rebuilding.**
- **Name things clearly**, and check for an existing segment/campaign before creating a near-duplicate.
- **Test before you launch.**

These are conventions, not a cage — launches often need something the structure doesn't quite cover, and that's expected. For anything substantial (a new flow, a big change to the main campaign), talk to <TeamMember name="Joe Martin" photo /> first.
