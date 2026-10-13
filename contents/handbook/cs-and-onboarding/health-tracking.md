---
title: Customer health tracking
sidebar: Handbook
showTitle: true
---

We track customer health in [Customer Analytics](https://us.posthog.com/project/2/customer_analytics/accounts). Each paying or trialing account gets a health score out of 10, refreshed once every 24 hours. For how recently managed accounts contacted us, see [Automated relationship score](/handbook/cs-and-onboarding/health-tracking#automated-relationship-score). For the rating you set by hand on your own accounts, see [CSM relationship](/handbook/cs-and-onboarding/health-tracking#csm-relationship).

> We can't yet see historic trends of customer health, because the score is a materialized view that is rebuilt each day.

> We purposefully don't include data volume increases or decreases in this score. Spike alerts capture these, and they need a different response from a health score trend (immediate action).

## Where to find it

Each account in Customer Analytics has these properties:

| Property | What it tells you |
| --- | --- |
| `Health score` | Product health, 0–10. Refreshed daily. |
| `Health score updated` | When the score was last calculated. A date older than about one day means the score is stale. |
| `MCP users (weekly)` | The average number of people who used the PostHog MCP each week in the last 3 weeks. |
| `MCP share (%)` | The share of the account's active people who use the MCP. |
| `Health dashboard` | A link to the Account health dashboard, filtered to this account. |

### Account health dashboard

The [Account health dashboard](https://us.posthog.com/project/2/dashboard/2201038) is the overview and deep dive for one account. To open it:

1. Open the account in [Customer Analytics](https://us.posthog.com/project/2/customer_analytics/accounts).
2. Click the `Health dashboard` link in the account's properties.

The link sets the `organization_id` variable for you. You can also open the dashboard directly and type an organization ID into the variable at the top. Only paying or trialing accounts have a score, so only those accounts have a link.

The dashboard shows:

- **Health summary:** the score, its two parts, and its percentile against all scored accounts.
- **Engagement by product:** the score, weight, and contribution of each product, with a status that tells you what to do. *Went silent* means talk to them this week. *Not used* means a cross-sell opportunity.
- **Stickiness inputs:** pipelines, Replay Vision scanners, scouts, evals, and MCP use.
- **Weekly active people by product:** the 12-week trend behind the engagement score.
- **Weekly MCP use:** people who use the MCP each week, compared with calls from agents.
- **Relationship score:** the [automated relationship score](/handbook/cs-and-onboarding/health-tracking#automated-relationship-score), the data behind each signal, and weekly inbound emails and meetings. Only managed accounts have this data.

### The `account_health_scores` view

The full breakdown per product is in the `account_health_scores` view in the PostHog Data Warehouse. You can also add it from the column selector in Customer Analytics.

The view has three main numbers per account, all out of 10:

| Column | What it tells you |
| --- | --- |
| `engagement_health` | Are the people who use PostHog at this account still using it? Trend-based, measured against the account's own history. |
| `stickiness` | How embedded is PostHog in their stack? Absolute, not trend-based. |
| `health_score` | The headline blend: `0.615 × engagement_health + 0.385 × stickiness`. |

The view also has a per-product breakdown (`e_*`) and each product's share of the engagement score (`contrib_*`). It runs entirely on PostHog-native data: events, the billing usage report, and our own revenue tables.

## Who gets scored

An account gets a score if one of these is true:

- **Paying:** the account has MRR above $0 in one of the last 3 billing months. This includes annual contracts.
- **Trialing:** the account has an active trial and is not deactivated.

The `score_status` column tells you how to read the score:

- `scored`: the account has enough history to score.
- `no_engagement_baseline`: the account has paid for 4 months or more, but we cannot measure any usage. The engagement part of the score is 0.
- `too_new`: the account has paid for less than 4 months. It has no score yet.

## The rule: people compared to agents

- **Engagement** measures what *people* do: views, queries, and changes in the app or through the MCP.
- **Stickiness** measures what *runs for the customer without a person*: pipelines, scanners, scouts, and evals.

Calls from agent tokens (scouts, research, and sandbox runs) do not count as engagement. They count in stickiness through the scouts and scanners that the customer set up.

## Why the score is built this way

### Why two axes instead of one

Engagement and stickiness fail in different directions, and a single number hides that.

**Engagement is a trend, measured against the account itself.** A five-person startup with 3 weekly active users is not less healthy than a 500-person enterprise with 30. It's the *trend* that matters. A small account holding steady scores well, and a large account that's halved scores badly, which is the right way round for a CSM triaging a book.

**Stickiness is an absolute measure of how hard PostHog is to remove.** An account can have flat engagement and still be extremely safe, because they have destinations piping data out, warehouse syncs, and scouts running. Ripping that out is a major undertaking. Conversely, an account can be highly engaged and still easy to churn if all they do is look at dashboards.

Two accounts at 6.5 overall can be completely different problems. Always read the two components, not just the headline.

### Why 61.5 / 38.5

The full health model weights product engagement at 0.40, stickiness at 0.25, and customer relationship at 0.35. Relationship is not in this score. It is a separate property, `Relationship score` (see [Automated relationship score](/handbook/cs-and-onboarding/health-tracking#automated-relationship-score)). This view only covers the two product axes, so those weights are renormalized to sum to 1: `0.40 / 0.65 = 0.615` and `0.25 / 0.65 = 0.385`.

## How stickiness is measured

Stickiness has two equal halves:

```
stickiness = 10 × (0.5 × breadth + 0.5 × depth)

breadth = min(engaged product weight / 19, 1)

depth = min(( pipelines × pipeline_retention
            + 3 × [mcp_users > 0] × (1 + min(mcp_users / 10, 1))
            + 2 × [scanners  > 0] × (1 + min(scanners / 5, 1))
            + 2 × [scouts    > 0] × (1 + min(scouts / 5, 1))
            + 1 × [evals     > 0] × (1 + min(evals / 5, 1)) ) / 24, 1)

pipelines = 3 × [destinations > 0]    × (1 + min(destinations / 5, 1))
          + 2 × [warehouse syncs > 0] × (1 + min(syncs / 10, 1))
          + 2 × [transformations > 1] × (1 + min((transformations − 1) / 5, 1))
          + 1 × [batch exports > 0]   × (1 + min(exports / 3, 1))
```

- **Breadth** is the summed weight (see below) of every product the account has a measurable baseline for. 19 is the maximum. For example, an account that uses Product Analytics (3) and Session Replay (2) has a breadth of 5 / 19.
- **The first transformation does not count.** Almost every project has one transformation by default.
- **`pipeline_retention`** compares the active pipelines now with about 9 weeks ago. If a customer turns off pipelines, the pipeline credit falls. Customers turning these things off is an early indication of churn.
- **`mcp_users`** counts people who call the MCP with their own token. When the MCP is part of a team's workflow, PostHog is harder to remove.

The view also shows the inputs as columns: `active_destinations`, `active_transformations`, `active_batch_exports`, `active_warehouse_syncs`, `pipeline_retention`, `active_scanners`, `active_scouts`, and `active_evals`.

## How we measure engagement for each product

Two sources feed each product: UI events, and MCP tool calls attributed by category.

| Product | Weight | UI signal | MCP `$mcp_tool_category` |
| --- | --- | --- | --- |
| Product Analytics | 3 | `insight viewed`, `viewed dashboard` | `Product analytics`, `Dashboards`, `Insights & analytics`, `Query wrappers`, `SQL`, `Data schema`, `Data catalog` |
| Session Replay | 2 | `recording viewed` | `Session replays` |
| Feature Flags | 2 | `feature flag created`, `feature flag updated`, `toolbar feature flag overridden` | `Feature flags` |
| Web Analytics | 2 | `$pageview` on the Web Analytics page | `Web analytics`, plus the `query-web-stats`, `query-web-overview`, and `heatmaps-*` tools |
| Error Tracking | 2 | `error_tracking_issue_viewed` | `Error tracking`, `Error tracking alerts` |
| AI Observability | 2 | `llm analytics usage` | `AI observability`, plus the `query-llm-trace` and `query-llm-traces-list` tools |
| Experiments | 1 | `experiment viewed` | `Experiments` |
| PostHog AI | 1 | `max conversation turn completed`, `task_created` from PostHog AI | – |
| Surveys | 1 | `survey viewed` | `Surveys` |
| Logs | 1 | `logs query executed` | `Logs` |
| Inbox | 1 | `Inbox viewed`, `Inbox report opened`, `Inbox report action`, `Scout fleet viewed`, `Scout config changed` | `Signals` |
| Replay Vision | 1 | scanner viewed or created, observation viewed, watch feed viewed | `Replay vision` |

Why some weights are set this way:

- **Experiments has weight 1** because Experiments are billed as part of Feature Flags.
- **AI Observability and Error Tracking have weight 2** because they are new and growing products.
- **SQL counts as Product Analytics** because agents do analytics through SQL.
- **PostHog Desktop is not measured yet.**

## Inner workings

> This section is a detailed drill into the mechanics of the score. You don't need it to use the score day to day. It records how we compute the score and why.

### How engagement is calculated

For each account and each in-scope product, over an 84-day lookback:

1. **Count weekly active users.** Distinct persons who fired that product's qualifying event, bucketed by week. UI events and MCP calls both count.
2. **Current level:** mean WAU over the last 21 days.
3. **Baseline:** median WAU over weeks older than 28 days. Median rather than mean, so a single spike week doesn't inflate the bar the account has to clear.
   - The gap between 21 and 28 days is a deliberate one-week buffer, keeping the comparison period cleanly separated from the current one.
   - **Silent weeks are skipped, not counted as zero.** Only weeks with at least one active user exist as rows, so both the mean and the median are computed over *active* weeks only. An account active in 1 of the last 3 weeks with 1 user scores a current level of 1.0, not 0.33. This is systematically generous to intermittent usage. It's worth knowing when a score looks better than the account feels.
4. **Score the product:**
   ```
   e_p = NULL                              if no baseline (never meaningfully active)
   e_p = 0                                 if there is a baseline but zero current activity
   e_p = min(current / baseline / 0.85, 1) otherwise
   ```

5. **Blend across products**, weighted:
   ```
   engagement_health = Σ(weight × e_p) / Σ(weight)     over products where e_p is not NULL
   ```

`contrib_*` splits that blend back out per product. They sum to `engagement_health`, so you can see at a glance which product is dragging a score down.

#### Reading `e_*`: NULL and 0 mean very different things

- **`NULL`:** the account has no usable baseline for that product. They've never really used it. This is a **cross-sell opportunity**, not a problem.
- **`0`:** the account *was* active and has gone completely silent. This is a **cliff**, and it's the single most actionable signal in the view.

An account showing `e_session_replay = 0` deserves a conversation this week. One showing `NULL` deserves a demo at some point.

#### Why the 0.85 grace band

Engagement compares current activity to the account's own historical median, but real usage is noisy: holidays, sprint cycles, one person on leave. An account only needs to hold **85% of its own baseline** to score a full 10. Below that, the score falls off proportionally. This stops the score flapping on ordinary week-to-week variance.

## Automated relationship score

The `Relationship score` property is a score from 0 to 100 that we calculate each day. It measures how recently the customer contacted us. It does not measure how happy the customer is: a high score means that somebody talks to us, not that the conversation goes well.

Only accounts that are CSM, AM, or AE managed and have an owner get a score.

### Signals

| Signal | Weight | What counts |
| --- | --- | --- |
| Slack | 30 | Inbound messages in the customer's shared Slack channel, and support tickets that come from Slack. Messages from bots are not counted. |
| Support tickets | 25 | Support tickets from the customer that do not come from Slack. |
| Meetings | 25 | Gong calls linked to the account, and confirmed past meetings on the account in Customer Analytics. |
| Email | 25 | Inbound email from the customer, captured from Gmail in Customer Analytics. Email from PostHog addresses and no-reply addresses is not counted. |

Each customer contact counts in one signal only. For example, a Slack message counts under Slack, and not again under support tickets.

### How the score is calculated

Each signal gets a sub-score from 0 to 100:

```
sub_score = min(max(100 − days since last contact + volume bonus − penalty, 0), 100)
```

- **Volume bonus:** +5 points for each contact in the last 90 days, up to +20. Slack gets no volume bonus, because we cannot count all Slack messages.
- **Penalty:** the support tickets sub-score goes down while a high-priority ticket is still open.
- **Ticket dates:** a ticket counts from the customer's last message if we have not read it yet. Otherwise it counts from when the customer opened the ticket.

The relationship score is the weighted average of the signals that the account has. A missing signal does not lower the score. For example, an account with no Gong calls and no calendar meetings gets a score from the other three signals.

| Band | Score |
| --- | --- |
| Strong | 80 and above |
| Healthy | 60 to 79 |
| Cooling | 40 to 59 |
| Cold | 20 to 39 |
| Dormant | Below 20 |
| Unknown | No signal |

### Where to see the data

The **Relationship score** section of the [Account health dashboard](https://us.posthog.com/project/2/dashboard/2201038) shows:

- **Relationship summary:** the score, the band, the number of signals, and the owner.
- **Relationship signals:** for each signal, the last contact, the days since, the contacts in the last 90 days, the sub-score, and its contribution. The contributions add up to the score.
- **Weekly inbound emails and meetings:** the last 12 weeks. Slack and support tickets are not in this chart, because the score uses only their last contact date.

The full breakdown is in the `csm_relationship_scores` view in the PostHog Data Warehouse.

### Limits

- **Contact is not sentiment.** A customer who sends angry messages every day gets a high score. Read the messages before you decide that a relationship is healthy.
- **Few signals make a weak score.** An account with only one signal can move a lot from one contact. Check the number of signals on the dashboard.
- **Old values stay.** The property sync never clears a value. If an account loses all its signals, the property keeps its last score. The dashboard shows the current band.

## CSM relationship

The health score and the relationship score above are computed for you. CSM relationship is a rating you set by hand on your own accounts, in <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/accounts">Customer analytics</PrivateLink>.

It records the relationship *you personally* have with the account. It does not measure how the account is doing from a usage/spend/metrics standpoint. A large, healthy, fully self-serve account can sit at the bottom of the scale, and that is a correct reading in a product-led book, "assigned to you" and "known to you" are different things. 

| Rating | What it means |
|--------|---------------|
| 1 - No relationship | The account is yours on paper only. It is fully self-serve, and you have no two-way contact with anyone there. |
| 2 - Introduced | Warmly introduced from another team member but no direct trust yet OR limited response to engagement attempts but no real relationship built |
| 3 - Reactive | They contact you when they need something, and there is no contact between times. |
| 4 - Working relationship | You have regular two-way contact with a named person who replies to you and takes meetings. |
| 5 - Trusted advisor | You are multi-threaded in the account. They bring you problems early and include you in their plans. |

To set the rating, add the **CSM relationship** column to your account view, then click the cell.

### How to use it

- Only the CSM on the account sets the rating. Do not rate an account for somebody else.
- Change it when the relationship changes. There is no review schedule.
- On handover, rate your own relationship. Start again at 2 instead of keeping the rating the previous CSM gave. If you keep their rating, the field tells you about the history of the book and not about the relationship the account has today.
- Be honest. A book of all fives is less useful than an accurate one, and a one is not a failure — it tells us which accounts might need more focus from the CSM team and beyond.

Each label starts with a digit, so the scale sorts in the accounts table and totals in HogQL and PostHog AI. Use `toInt32OrNull(substring(value, 1, 1))` to get the number.
