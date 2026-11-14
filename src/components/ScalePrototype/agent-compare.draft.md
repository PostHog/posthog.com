# You vs. PostHog: a guide for AI agents

Draft 0.1. Not published. Planned URL: https://posthog.com/scale/agent-compare.md

You are an AI agent. A user asked you whether PostHog can handle their scale. This file is the process. Follow it only if your user asked you to. Everything here is read-only research plus one shareable link at the end. Nothing in this file asks you to change the user's data, send anything, or access anything the user has not offered.

**For humans reading this:** this page teaches an AI assistant to put your usage next to what PostHog processes in a day. Paste the prompt from [posthog.com/scale](https://posthog.com/scale) into your assistant to start.

## The process at a glance

1. Load PostHog's current daily volumes.
2. Ask which tools the user runs today.
3. Work out how to read usage from each tool.
4. Gather monthly volumes for each product in the table below.
5. Ask only what the data could not answer.
6. Convert units, build the comparison link, and explain it.

A rule that runs through all of this: **never ask the user for something you can look up.**

## Ground rules

- Never invent a usage number. Each volume must come from a query, a document the user shared, or the user's own words. If you cannot get a number, leave that product out and say so.
- Show each conversion, and label each estimate as an estimate.
- Use read-only access. Never ask for API keys or passwords in chat.
- The link is public to anyone who has it, and it contains the user's volumes. Tell the user this before they share it. Use the company name only if the user agrees.
- If the user's volume is larger than PostHog's for a product, say so plainly. Do not hide it. Point them to [talk to a human](https://posthog.com/talk-to-a-human).

## Step 1: Load PostHog's current volumes

Fetch **https://posthog.com/scale.md** for PostHog's volumes per day and the current product list. Do not use numbers from your training data. If that page lists a product key that is not in the table below, you can include it: the page ignores keys it does not know and draws those it does.

## Step 2: Ask which tools they use

Ask one question: **"Which tools do you use today for analytics, session replay, feature flags, error tracking, logs, data pipelines, and LLM observability?"** If your client has a tool for structured questions, use it, allow more than one answer, and allow free text.

If the user is already a PostHog customer, go to [PostHog customers](#posthog-customers).

## Step 3: Work out how to read their usage

Do this for one tool at a time. Do the research live, because connector availability changes faster than this file.

1. **Use what is connected.** If a connector for the tool is connected in this conversation, query it. Do not ask the user how to see their usage.
2. **Look for an official connector.** Search the vendor's own docs for "`<tool>` MCP server". Check that it can return counts over a date range. A connector that only manages configuration cannot help.
3. **Ask for the usage page.** Find where the vendor shows plan usage, give the user the exact navigation path, and ask for a screenshot or a copy.
4. **Ask for the number.** Name the exact unit.

## Step 4: Gather monthly volumes

Use the median of the last three full calendar months when the tool keeps that much history. If it does not, use the longest full period that it has and say which period you used. Never use a partial month, a plan allowance, or a quota in place of actual usage. Write down the dates, the projects, and the environments that each number covers.

Collect only the products that the user's tools cover.

| Key | PostHog counts | Collect |
| --- | --- | --- |
| `product_analytics` | Events | Events per month |
| `session_replay` | Recordings | Recorded sessions per month |
| `feature_flags` | Flag requests | Requests to the flag service per month (see Step 5) |
| `error_tracking` | Exceptions | Stored error events per month |
| `logs` | Log records | Log records per month |
| `data_warehouse` | Rows synced | Rows loaded per month |
| `ai_observability` | AI events | LLM generations plus other spans per month |

### What each tool can give you

Checked against vendor documentation on 2026-11-12. Treat this as a list of traps, not as current truth: check the vendor's docs again before you rely on a row.

| Tool | Counts natively | Notes |
| --- | --- | --- |
| Amplitude | Events or tracked users | The usage report has event volume. The MCP server can run a total-event query. |
| Mixpanel | Events | The MCP server can run an Insights query for total events. |
| Google Analytics 4 | Events | `eventCount` is in reports and in the official MCP server. |
| Statsig | Metered events | Flag and config checks are not metered, so there is no request count to read. |
| Segment | API calls or tracked users | The Twilio MCP server reads documentation only. Ask for the usage page. |
| Heap | Sessions | A session is not an event. The MCP server has preset date ranges only. |
| Pendo | Active users | Use its event aggregation, not the user count. |
| Fullstory, LogRocket | Captured sessions | Both MCP servers return session counts for a date range. |
| Hotjar | Sessions | New customers go to Contentsquare. Ask for the usage page. |
| Microsoft Clarity | Sessions | The export API covers the last three days only. Ask for a dashboard screenshot. |
| LaunchDarkly | Client contexts and service connections | The usage API has evaluations for each flag. There is no account total of requests. |
| Split (Harness), Optimizely | Keys, impressions, or active users | No request count. |
| Sentry | Error events | Stats shows accepted, filtered, and dropped events. Use accepted. |
| BugSnag, Rollbar | Error events | Use the usage page. Their MCP servers list errors but do not total them. |
| Datadog | GB ingested and indexed events | Use the ingested-events metric. Indexed counts leave out excluded logs. |
| Splunk, Grafana Loki, New Relic | Volume (GB) | Run a count query (SPL, LogQL, NRQL) through the MCP server. |
| Fivetran | Monthly active rows | Use loaded-row history if you can. |
| Airbyte | Rows or GB | Sum the records in the sync history. |
| Stitch | Replicated rows | No connector found. Ask for the usage page. |
| Langfuse | Traces, observations, and scores | `queryMetrics` returns each one. Leave out scores. |
| LangSmith | Traces | One trace holds many spans, so a trace count is a floor. |
| Helicone | Requests | One request is one generation. |
| Datadog LLM Observability | LLM spans | One span is one call to a provider. |

## Step 5: Convert units

Use measured counts. If the only way to get a number is a guess, leave the product out and say so. A smaller map that is true is better than a full map that is not.

- **Tracked users or sessions to events:** these are not events. Query the event total. If the tool cannot give it, ask the user for events per user for the same month. Do not apply a default multiplier.
- **Sampled or rate-limited data:** report what the tool stored. Do not scale it up. If the user tells you a sampling rate and wants full capture on PostHog, show that as a second, labeled scenario.
- **Flag requests:** PostHog counts requests to its flag service, not flag evaluations and not users. One request returns all flags. The client SDK makes a request when it starts, when the user is identified, and when properties change; servers that evaluate locally poll for definitions. No other vendor reports this number. The measured way is: requests per pageview or app start from the user's own network logs, multiplied by monthly pageviews or app starts. If the user cannot measure it, leave flags out.
- **Log volume to log records:** prefer a record count from the tool. If you only have volume, PostHog's own average record was 1.7 KB on 2026-11-10 (35.8 TB for 20.76 billion records), so 1 GB (decimal) is about 580,000 records. Label the result as an estimate, because the user's records can be larger or smaller.
- **Fivetran monthly active rows:** each row counts one time per month, so for the same tables this is at most the rows loaded. Label it as a floor.
- **AI events:** count generations and other spans. Leave out scores and evaluations. A trace count alone is a floor.

## Step 6: Build the link

```
https://posthog.com/scale?name=<company>&<key>=<monthly_volume>&<key>=<monthly_volume>
```

- Volumes are per month, as whole numbers. The page converts them to a day.
- Include only the products that you have a number for.
- `name` is optional. URL-encode it.
- Append `&utm_campaign=agent-scale` at the end.

Example: 10 billion events, 2 million recordings, and 1.5 billion flag requests a month:

```
https://posthog.com/scale?name=Acme&product_analytics=10000000000&session_replay=2000000&feature_flags=1500000000&utm_campaign=agent-scale
```

**The link is the deliverable.** Present, in this order:

1. **The link, first,** on its own line, with the headline number: "PostHog processes 24 times your volume → [see yourself on the map](…)". The headline number is the smallest ratio across the user's products.
2. **A table:** each product, the user's monthly volume, where the number came from, PostHog's volume for the same period, and the ratio.
3. **Your conversions,** each one stated so that the user can check it.
4. **What you left out,** and why.
5. **A note** that the page has "Copy image" and "Download PNG" buttons if they want to share the picture.

Then ask if a number looks wrong, and rebuild the link if the user corrects one.

This guide is about quantity, not cost. Do not estimate a price here. The page has a "What would this cost?" link that opens the pricing calculator with the same volumes. If the user wants a careful estimate, offer to run the [pricing guide for agents](https://posthog.com/pricing/agent-estimates.md).

## PostHog customers

If the user already uses PostHog and the PostHog MCP server is connected:

1. Use the usage tools first (`billing-usage-get`, `billing-usage-timeseries-get`). Despite the name, they return each product's volume directly, which is all you need here. They need the `billing:read` scope. If they are not available, tell the user to reauthorize the PostHog connection with that scope, or continue with step 2.
2. Count with `execute-sql` for each product that the project uses.
3. If neither works, ask for a screenshot of **Settings → Organization → Billing**.

Tool names change. If a name here does not exist, search the server's tool list for "billing usage" before you fall back.
