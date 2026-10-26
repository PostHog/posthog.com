---
name: error-tracking-noise-audit
description: >
  Find noisy PostHog Error Tracking issues and propose the right control for each: suppression,
  rate limits, before_send, or leaving the issue active. Changes nothing without approval.
---

# Audit error tracking noise

Read the current docs first. Every PostHog docs URL returns Markdown if you append `.md`:

- https://posthog.com/docs/error-tracking/rate-limiting.md
- https://posthog.com/docs/error-tracking/capture.md (burst protection, suppressing exceptions)
- https://posthog.com/docs/error-tracking/managing-issues.md (issue statuses)

## Find candidates

Use the PostHog MCP. List the issues from the last 7 days with their exception count and the
number of people affected.

- High volume from a few people is usually a loop or one broken client.
- Volume spread across many people, with no frames from your own code, is usually browser
  extensions or third-party scripts.
- A sudden jump in one issue during an incident is an outage.

## Propose a control

Walk each candidate through these checks in order, and stop at the first yes:

1. Does it carry sensitive data? Propose a `before_send` hook that redacts it.
2. Is it a real bug someone will fix? Leave it active and suggest an owner.
3. Does it hit paying customers or a core flow like signup, login, or checkout? Flag it for a
   human. Never propose suppressing it.
4. Is one client throwing it in a loop? Check burst protection is on in web and Node.js, and propose
   tuning it. For other SDKs, propose a per-issue rate limit.
5. Can you describe it by exception type or message, like a browser extension error? Propose a
   suppression rule.
6. Is an outage flooding it? Propose a per-issue rate limit.
7. Otherwise, propose suppressing the issue.

## Rules

1. Propose, don't apply. Ask before you suppress an issue, add a suppression rule, or change a
   rate limit.
2. Suppressed and rate-limited exceptions are dropped for good. Say so in each proposal.
3. Before you tighten rate limits, propose bypass rules for exceptions that must always arrive.

## Finally

Return a table with the issue, exception count, people affected, what you think the noise is, the
control you propose, and why.
