---
name: feature-flag-evaluation
description: >
  Add or review PostHog feature flag checks so each flag is evaluated once, on one side, for the
  right person.
---

# Feature flag evaluation

Read the current docs first. Every PostHog docs URL returns Markdown if you append `.md`:

- https://posthog.com/docs/feature-flags/best-practices.md
- https://posthog.com/docs/feature-flags/local-evaluation.md
- https://posthog.com/docs/feature-flags/bootstrapping.md

## Rules

1. Each flag belongs to one side. Server flags are checked in server code, client flags in browser
   or device code. Never check the same flag on both sides. Set server-only flags to the
   "Server-side only" evaluation runtime.
2. Check each flag once, where the request or screen starts, and pass the value down.
3. Keep flag keys in one constants module per language. A template script that cannot import it
   gets the key from the server's constant, never a string literal.
4. Evaluate with the identified user's distinct ID. It must be the same ID on the server and in
   the browser.
5. On the server, prefer local evaluation. Never ship the feature flags secure API key to a client.
6. Give every check an explicit default for "not loaded" and "unreachable", and make that default
   the old behavior.
7. Where the server already evaluated a client flag, bootstrap it into the client SDK instead of
   waiting for /flags.

## Finally

List every flag you touched: its side, its call site, and how the distinct ID is chosen. Say which
checks you could not move to a single call site and why.
