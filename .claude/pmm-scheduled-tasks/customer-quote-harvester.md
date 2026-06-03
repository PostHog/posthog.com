> **Disclaimer:** This is Sara's scheduled task. Please edit it so it fits your needs.

```markdown
# Customer Quote Harvester

Every other Monday at 9am PT, run a customer quote harvest for me.

**What I want:** verbatim customer lines about PostHog's Error Tracking, Logs, Session Replay, and Replay Vision from the last 14 days. Nothing about other products unless it's a comparative jab that makes one of these four look good.

## Where to look

1. **Customer Slack Connect channels** — anything named #posthog-\<customer\> or #\<customer\>-posthog. Skip internal channels (#team-, #ask-, #alerts-, #sales-, etc.). Pull only customer-side messages, never a PostHogger's reply.
2. **PostHog surveys** — NPS – Error Tracking, NPS – Session Replay, Logs Feedback, Session Replay Filters Feedback, and the open-feedback variants. Open-text answers live inside properties.$survey_questions.
3. **BuildBetter** — user interview calls from the last 14 days. Pull the customer's words, not the interviewer's.

## What counts as a quote

Mentions of: error tracking, exceptions, Sentry, Bugsnag, session replay, replay AI/vision, FullStory, LogRocket, Hotjar, logs, observability, Datadog, New Relic, Splunk. Verbatim only — use … for trimmed middles. Drop duplicates. **5 strong quotes beat 20 mediocre ones.**

## Permission tagging

Tag every quote with a permission flag:
- 🟢 public (HN, Reddit, X, G2)
- 🟡 needs permission (Slack Connect, NPS, interview)
- 🔴 internal only (PostHogger paraphrase)

Default to 🟡 in doubt — never 🟢.

## Case study candidates

Pick 1–3 case study candidates. A good one has at least 2 of: a clear switch story, strong positive sentiment, concrete impact (cost / time / tools dropped), multiple positive touchpoints, recognizable brand, or active engagement. Be picky — say "no candidates this cycle" rather than reach.

## Delivery

Deliver as a Google Drive doc titled **Customer Quote Bank — \<date range\>** with:
- Sections per product
- Case study candidates
- Highlights (which quote suits landing page vs. sales deck vs. social)
- Coverage notes (channels scanned, surveys reviewed, BuildBetter calls reviewed, what came back empty)

Under 1500 words. Drop the doc link in Slack DM to me when it's ready.
```
