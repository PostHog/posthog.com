---
title: Instrumenting PostHog in the development process
sidebar: Handbook
showTitle: true
---

A guide for product engineering teams that want every feature to ship with its tracking. Customer-facing roles can send it to a customer's engineering team as is.

## The problem is the process, not the tool

Most tracking gaps have one cause: no step in the development process owns tracking. Nobody decides what to track before the build starts. Engineers add events late, name them in different ways, and drop them when time runs short. Then a feature launches, and nobody can say if it worked.

A better tool does not fix this. A better process does. This guide puts tracking into the steps your team already runs, so that a skipped event becomes a visible choice instead of a silent gap.

> **Running example.** A team builds scheduled reports. A user picks a report, a frequency, and recipients, and the app emails the report on that schedule. The PRD asks one question: do users who schedule a report come back more often?

## The development loop

1. **Write the tracking requirement into the PRD.** Name the question the launch answers, the metric that grades it, and the events that feed the metric.
2. **Turn the PRD into an event spec.** An agent skill or a planning prompt can draft the spec. A person approves it.
3. **Assign an owner.** The PM and the lead engineer own the spec, the launch dashboard, and the grade.
4. **Build behind a feature flag.** The events ship in the same pull request as the feature code.
5. **Verify the events.** Trigger the feature locally and confirm that each event arrives in the [activity tab](/docs/data/events) with the correct properties.
6. **Launch.** Roll out the flag.
7. **Grade the launch.** Compare the result to the PRD metric.
8. **Hold a retro.** Decide what the data changes about your next piece of work.

For the running example, the spec has two events:

| Event | Fired from | Properties |
| --- | --- | --- |
| `scheduled_reports:schedule_create` | Frontend, when the user saves a schedule | `report_type`, `frequency`, `recipient_count` |
| `scheduled_reports:report_send` | Backend, when the email goes out | `report_type`, `delivery_status` |

The second event closes the loop. It shows that the feature did its job, not only that a user clicked a button.

## Five practices

### 1. Agree on a naming convention

Follow the [naming convention in our product analytics best practices](/docs/product-analytics/best-practices#3-implement-a-naming-convention). The short version:

- Name events `category:object_action`, in lowercase snake case.
- Take the action from a fixed list of present-tense verbs, such as `create`, `view`, `submit`, `send`, and `fail`.
- Give every text property a fixed list of allowed values. `frequency` is `daily`, `weekly`, or `monthly`, never free text.
- Never put personal data in an event name or a property. Send `recipient_count`, not the recipients' email addresses.
- Never rename an event that has history. [Version the event](/docs/product-analytics/best-practices#5-version-your-events) instead, and create an [action](/docs/data/actions) that matches the old and the new name. The action gives you one trend line across the change, and the history stays intact.

### 2. Send every event through one module

Put every event name and its property types in one file. Give the file one function that calls PostHog, and let nothing else call `posthog.capture`. A misspelled event name or a wrong property type then fails your normal typecheck, before the code reaches review.

```ts
import posthog from 'posthog-js'

type ReportType = 'usage' | 'billing' | 'activity'
type Frequency = 'daily' | 'weekly' | 'monthly'

type AnalyticsEvents = {
    'scheduled_reports:schedule_create': {
        report_type: ReportType
        frequency: Frequency
        recipient_count: number
    }
    'scheduled_reports:schedule_delete': {
        report_type: ReportType
    }
}

export function track<E extends keyof AnalyticsEvents>(event: E, properties: AnalyticsEvents[E]): void {
    posthog.capture(event, properties)
}
```

A feature then calls `track()`:

```ts
track('scheduled_reports:schedule_create', {
    report_type: 'usage',
    frequency: 'weekly',
    recipient_count: recipients.length,
})
```

The typecheck rejects `'scheduled_reports:schedule_crate'`, a `frequency` of `'hourly'`, and a call with no `recipient_count`. A lint rule stops a direct `posthog.capture` call anywhere outside the module:

```js
export default [
    {
        rules: {
            'no-restricted-properties': [
                'error',
                { object: 'posthog', property: 'capture', message: 'Use track() from src/analytics/events.ts.' },
            ],
        },
    },
    {
        files: ['src/analytics/events.ts'],
        rules: { 'no-restricted-properties': 'off' },
    },
]
```

The module is also the one place for shared behavior, such as error handling or default properties. Put that logic in `track()`, not around each call.

Your backend needs the same pattern in its own language. [Schema management](/docs/product-analytics/schema-management) can generate TypeScript, Go, and Python types from event definitions in PostHog. It is experimental today, so treat it as an option for later, not a dependency.

**How PostHog does it:** PostHog's own frontend keeps its usage events in one file, [`eventUsageLogic.ts`](https://github.com/PostHog/posthog/blob/master/frontend/src/lib/utils/eventUsageLogic.ts).

### 3. Give your coding agents the same rules

Agents write a growing share of feature code. Put the tracking rules where your agent reads them: `AGENTS.md`, `CLAUDE.md`, or your tool's equivalent. The agent then follows the same convention as the team.

```markdown
## Product analytics tracking

- Before you add an event, search `src/analytics/events.ts` for an event that answers the same question. Reuse it if it exists.
- Name new events `category:object_action`. Use only these verbs: click, submit, create, view, add, invite, update, delete, remove, start, end, cancel, fail, generate, send.
- Send every event through `track()`. Never call `posthog.capture` directly.
- Give each text property a fixed list of values. Never send names, email addresses, or free text.
- Never rename an event. Add a versioned event, and name the action that joins the two names in the pull request.
- Trigger the feature locally and confirm that each new event arrives before you open the pull request.
- Add the tracking line to the pull request description.
```

**How PostHog does it:** PostHog's `AGENTS.md` sends agents to [`feature-usage-tracking.md`](https://github.com/PostHog/posthog/blob/master/.agents/feature-usage-tracking.md), which requires end-to-end tracking for every feature.

### 4. Put a tracking line on every pull request

Add a tracking section to your pull request template. The author keeps exactly one line and deletes the other two:

```markdown
## Tracking

- Event added: <event names>
- No event added: <reason>
- Follow-up linked: <issue link>
```

A small CI job reads the pull request description. It fails when the description does not hold exactly one tracking line. The job does not judge the answer. It only makes sure that somebody gave one.

```yaml
name: Tracking line

on:
    pull_request:
        types: [opened, edited, synchronize, reopened]

jobs:
    tracking-line:
        runs-on: ubuntu-latest
        steps:
            - name: Check for exactly one tracking line
              env:
                  PR_BODY: ${{ github.event.pull_request.body }}
              run: |
                  count=$(printf '%s\n' "$PR_BODY" | grep -cE '^- (Event added|No event added|Follow-up linked):' || true)
                  if [ "$count" -ne 1 ]; then
                      echo "Keep exactly one tracking line: Event added, No event added, or Follow-up linked."
                      exit 1
                  fi
```

The job reads the description through an environment variable, not by inline expansion, so text in a pull request cannot run as a shell command.

**How PostHog does it:** the [PostHog pull request template](https://github.com/PostHog/posthog/blob/master/.github/pull_request_template.md) has a release status section with three lines. The author keeps exactly one.

### 5. Keep one launch dashboard

Keep one dashboard for launches, and rotate it. While a feature launches, the dashboard holds the insights for that feature: the funnel from entry to outcome, the PRD metric, and the failure events. Filter or break down each insight by the release flag. The web SDK adds the active flags to each event. On the server, set `sendFeatureFlags: true` when you [capture an event](/docs/feature-flags/adding-feature-flag-code).

After the launch window, move the insights that still matter to the dashboard for that product area. Then clear the launch dashboard for the next launch, and [clean up the flag](/docs/feature-flags/cleaning-up-stale-flags).

A large number of dashboards is not the real problem. The real problem is that nobody can find the one they need. A few core dashboards for top-level questions, plus one launch dashboard, keep each answer easy to find.

## Start backend events with one closed loop

Frontend events show what users try. Backend events show what happened. [Backend tracking is also more reliable](/docs/product-analytics/best-practices#7-prefer-backend-to-frontend-tracking), because ad blockers and browser network errors do not drop it.

If your team sends few backend events today, do not instrument the whole backend at once. Pick one workflow with a clear outcome, and send its outcome event from the server. In the running example, that event is `scheduled_reports:report_send`. This call belongs in your backend events module:

```ts
posthog.capture({
    distinctId: userId,
    event: 'scheduled_reports:report_send',
    properties: { report_type: 'usage', delivery_status: 'delivered' },
    groups: { company: accountId },
    sendFeatureFlags: true,
})
```

Send the account ID with each backend event, and use [group analytics](/docs/product-analytics/group-analytics) to report per account or per plan. Group analytics is a paid add-on. Without it, you cannot split a metric by customer, and that analysis moves to another tool.

## Anti-patterns

- **A flag evaluated in a latency hot path.** Each remote evaluation is a network request. Use [server-side local evaluation](/docs/feature-flags/local-evaluation), and [evaluate the flag once, not on every request](/docs/feature-flags/best-practices#evaluate-once-not-continuously).
- **A launch with no list of the events it fires.** If nobody can name the events, nobody can grade the launch. Step 5 of the loop prevents this.
- **An agent that builds a whole feature with no tracking plan.** The agent invents names and properties, and nobody checks them against the PRD metric. Give the agent the event spec and the rules first.

## Common questions

**Do more events mean a bigger bill?** Product analytics [bills by the number of events](/docs/product-analytics/pricing), so a property adds no cost. A clean event with useful properties costs the same as a junk event. The goal is fewer and better events, not fewer properties. For more ways to reduce cost, see [cutting costs](/docs/product-analytics/cutting-costs).

**Our features change often. Should we add events after the design settles?** No. Ship the events with each version of the feature. Then you can compare each version to the last one. If a change alters what an event means, [version the event](/docs/product-analytics/best-practices#5-version-your-events).

**We already have events with inconsistent names. Do we fix them?** Leave the old events as they are, and apply the convention to new events from now on. When an old event and a new event track the same thing, create an [action](/docs/data/actions) that matches both.

## The one-line version

**Decide what to track before you build, send every event through one typed module, and make every pull request say what it tracks.**
