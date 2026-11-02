---
title: Common questions about billing
---

## Can I have a trial?

PostHog is usage-based and you can use it for free for as long as you want, no trial needed. See [our pricing page](/pricing) for free usage allowances.

If you have special circumstances where this doesn't work for you, contact our [sales team](/talk-to-a-human). 

## How do I estimate how much PostHog will cost?

You can check our doc on [estimating usage and costs](/docs/billing/estimating-usage-costs), or use the [pricing calculator](/pricing) to estimate costs. However, often the best way to estimate costs is to signup for free and go from there.

## Do projects share usage and free allowances?

Yes. Billing is organization-wide, so usage from all projects in an organization is combined into one bill with one free allowance. For example, if your development, staging, and production projects each send 400,000 events in a month, that counts as 1.2 million events, not three separate free tiers.

The free plan includes one project. To create more, add a card to upgrade to a paid plan. See [how to organize projects](/docs/settings/projects#how-to-organize-projects) for our recommended setup.

## How do I update billing information or see previous months' invoices or usage?

Go to your organization's [billing settings](https://app.posthog.com/organization/billing) and click **Manage card details and view past invoices** to be brought to Stripe where you can update your credit card, billing information, and see your invoice history.

You can also download invoices or receipts from here by clicking on them under **Invoice history**.

![Invoices](https://res.cloudinary.com/dmukukwp6/image/upload/Clean_Shot_2024_09_19_at_16_44_05_2x_1c2cc687c2.png)

## Can I set a billing limit?

Yes, you can set a billing limit for most of PostHog's products in your organization's [billing settings](https://app.posthog.com/organization/billing). Check out our doc on [billing limits and alerts](/docs/billing/limits-alerts) for more information.

## Are events or replays dropped when I reach billing limits?

Yes, PostHog drops data after you go over your billing limit. To capture more during the current billing period, you need to raise your billing limits. For future billing periods, you can tune your PostHog implementation to limit the number of [events](/tutorials/fewer-unwanted-events) or [session replays](/tutorials/limit-session-recordings) you capture.

## What counts toward my event bill?

PostHog bills every event it stores, except the events marked No below.

| Event | Counts toward the event bill | Notes |
| --- | --- | --- |
| Custom events | Yes | |
| `$pageview`, `$pageleave`, and `$autocapture` | Yes | |
| `$dead_click` | Yes | |
| `$web_vitals` | Yes | |
| `$identify`, `$create_alias`, and `$groupidentify` | Yes | |
| [Personless events](/docs/data/anonymous-vs-identified-events) | Yes | Billed as anonymous, unless the distinct ID already belongs to a person. |
| Heatmap data | No | Heatmap data never becomes events, and heatmaps aren't billed today. |
| Session recordings | No | [Session replay](/docs/session-replay) bills recordings. |
| `$exception` | No | [Error tracking](/docs/error-tracking) bills exceptions. |
| `$ai_` events | No | [LLM analytics](/docs/ai-observability) bills these. |
| `$feature_flag_called` and `$experiment_exposure` | No | Flag and experiment analysis adds nothing to your event bill. |
| `survey sent`, `survey shown`, and `survey dismissed` | No | [Surveys](/docs/surveys) bill responses. |
| Events dropped by a [transformation](/docs/data-pipelines/transformations/drop-events) | No | PostHog drops them before storage. |
| Events dropped after you reach a [billing limit](/docs/billing/limits-alerts) | No | PostHog drops them before storage. |

Other usage is billed by its own product. See how [feature flag requests are billed](/docs/feature-flags/cutting-costs#billing), and how [file download exports are billed](/docs/data-pipelines/file-download-exports#billing). For everything else, see [pricing](/pricing).

## I'm an early-stage startup or non-profit, can I get a discount?

Yes, early-stage startups can get $50,000 in credits, merch, and exclusive events. Find out more and apply on our [startup program page](/startups).

Non-profits can contact our [sales team](/talk-to-a-human) after signing up to discuss discount options.

## Can I change the email invoices or billing alerts are sent to?

We send billing emails to all owners and administrators in the organization. These are important emails, so we currently don't allow these notification settings to be configured.

If you'd like a specific email address to receive these communications, we recommend inviting that email to your organization and assigning them an administrator role.

## Can someone see usage and spend without being an admin?

By default, billing is only available to organization admins and owners. See our [access control docs](/docs/settings/access-control) for the full list of permissions.

If you want members to see the **Usage** and **Spend** tabs without giving them the rest of billing, [contact support](/questions) and we can enable it for your organization. They get read-only access to usage and spend data for the projects they can already see. They can't change your plan, payment details, or billing limits.
