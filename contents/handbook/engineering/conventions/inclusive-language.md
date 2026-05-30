---
title: Inclusive language in engineering
sidebar: Handbook
showTitle: true
---

PostHog is built by and for people from many backgrounds. Clear, specific language helps everyone understand our code, product, docs, and operations. Some common technical terms carry unnecessary historical, cultural, or exclusionary baggage. Use neutral, precise alternatives when naming new things.

This is guidance for engineering work. For docs-specific style, see the [docs style guide](/handbook/docs-and-wizard/docs-style-guide).

## What this applies to

Use this guidance for:

- Product UI copy, settings, labels, tooltips, and errors
- Code identifiers, comments, tests, fixtures, and examples
- Public APIs, SDK options, CLI commands, environment variables, event names, and property names
- Database tables, columns, migrations, queues, jobs, dashboards, and alerts
- Handbook pages, docs, runbooks, incidents, post-mortems, issues, and PR descriptions

## How to choose language

When you add new names or copy:

- **Be specific first.** `blocked_email_domains` is clearer than a generic `email_denylist`. `trusted_proxy_ips` is clearer than `proxy_allowlist`.
- **Use neutral fallback terms.** If a generic list term is the clearest option, use `allowlist`, `denylist`, or `blocklist`.
- **Use common sense.** This page is guidance, not a complete dictionary. Choose language that is clear, specific, and respectful for the context.
- **Do not mirror external language unless needed.** If a vendor API, protocol, or file format uses a term, quote it when needed for accuracy, but use our preferred language in PostHog-owned names.

For existing names, see [Changing existing code](#changing-existing-code).

## Preferred language

This table is not exhaustive.

| Instead of | Prefer | Notes |
|------------|--------|-------|
| `whitelist` | `allowlist`, `permitted`, `included`, `trusted`, or a specific name like `allowed_domains` | Prefer the specific noun over a generic list when possible. |
| `blacklist` | `denylist`, `blocklist`, `blocked`, `excluded`, or a specific name like `blocked_ips` | Use `blocklist` when the behavior is blocking access or traffic. |
| `whitelisted` | `allowed`, `permitted`, `trusted`, `included` | Use the verb that describes what the system does. |
| `blacklisted` | `blocked`, `denied`, `excluded`, `filtered` | Use `filtered` when the item is removed from results rather than blocked from access. |
| `master` / `slave` | `primary` / `replica`, `primary` / `secondary`, `leader` / `follower`, `source` / `replica` | For databases, prefer `primary` and `replica`. For consensus systems, `leader` and `follower` may be clearer. |
| `master` branch | `main` | Use `main` for new repositories. Do not rename existing default branches without an owner and migration plan. |
| `sanity check` | `validation`, `verification`, `health check`, `smoke test`, `quick check` | Pick the term that describes the actual check. |
| `grandfathered` | `legacy`, `existing`, `retained access`, or explicit wording like "available on old plans" | Be clear about why something still applies. |
| `dummy` | `placeholder`, `sample`, `test`, `fake`, `stub`, `mock` | Use the term that matches the role in the code or test. |
| Gendered defaults like `he`, `she`, `his`, or `her` | `they`, `their`, role names, or direct address | In docs, prefer addressing the reader directly with "you". |
| `guys` | `team`, `folks`, `everyone`, `people` | Use a word that includes the whole group. |
| `cripple`, `crippled` | `break`, `disable`, `hamper`, `severely limit` | Common in incident write-ups when describing breakages. |
| `normal`, when describing users or behavior | `typical`, `default`, `common`, `expected` | Calling one group or behavior `normal` can imply others are abnormal. |
| `suffers from`, `afflicted with` | `has`, `is` | Avoid pathologizing language, particularly in accessibility. For example, write `a user who is colorblind` instead of `a user who suffers from colorblindness`. |
| Casual uses of `crazy`, `insane`, or `lame` | `unexpected`, `surprising`, `broken`, `high-volume`, `difficult`, `unhelpful` | Describe the behavior or impact instead. |

## Examples

Prefer names that explain the rule or behavior:

| Less clear | Better |
|------------|--------|
| `ip_whitelist` | `allowed_ip_addresses` |
| `proxy_whitelist` | `trusted_proxy_ips` |
| `property_blacklist` | `excluded_properties` |
| `is_user_blacklisted` | `is_user_blocked` |
| `master_database` | `primary_database` |
| `slave_database` | `replica_database` |
| `dummy_user` | `test_user` |
| `sanity_check_query()` | `validate_query()` |

User-facing copy should follow the same pattern:

| Instead of | Use |
|------------|-----|
| `This domain is whitelisted.` | `This domain is allowed.` |
| `This IP is blacklisted.` | `This IP is blocked.` |
| `Run a sanity check before deploying.` | `Run a smoke test before deploying.` |
| `This customer is grandfathered into the old plan.` | `This customer has retained access to the old plan.` |

## Changing existing code

Changing old names is valuable, but stability matters more than a tidy diff.

Use these principles for existing names:

- **Do not break users for a rename.** Public APIs, SDK options, environment variables, event names, properties, and stored data need aliases, migrations, deprecations, or a compatibility plan.
- **Improve old language when it is safe.** UI text, docs, comments, tests, local variables, and private helper names are usually safe to update when you touch nearby code.

Low-risk changes are usually fine when they are near the code you are already touching:

- UI copy
- Docs and handbook text
- Comments
- Tests and fixtures
- Local variables
- Private helper functions

Higher-risk changes need a plan:

- Public SDK options
- API request or response fields
- Environment variables
- Event names and properties
- Database table or column names
- Queue names, topic names, and persisted job payloads
- Dashboard, alert, or metric names that other teams depend on

For broad, cross-cutting changes, align with [Developer Experience](/handbook/engineering/developer-experience) and the relevant feature owners before starting. They can help plan rollout, CI impact, compatibility, and repository-wide linting changes.

For higher-risk changes, prefer an additive migration:

1. Add the new name.
2. Keep the old name as a deprecated alias.
3. Make precedence explicit if both names are present.
4. Update docs and examples.
5. Add telemetry or logging if you need to know when the old name is no longer used.
6. Remove the old name only after the owning team has approved the migration.

Avoid large rename-only PRs across unrelated areas. They create review noise and merge conflicts. If a broad rename is needed, split it by owned area and keep each PR mechanical.

## Reviewing PRs

Treat inclusive language like any other naming feedback:

- Request changes for new user-facing copy, public APIs, SDK options, config names, and docs.
- Suggest changes for private code when the fix is low risk.
- Do not block urgent fixes because of old internal names unless the PR introduces new user-facing language.
- If a rename could break users, ask for a compatibility plan instead of asking for a direct replacement.

## Tooling

Vale checks handbook and docs content for some inclusive language issues. The shared rule lives in `.vale/styles/PostHogBase/Inclusivity.yml`.

Enable inclusive language linting in codebases whenever the ecosystem supports it. For example, Swift projects that use SwiftLint can enable its [`inclusive_language`](https://realm.github.io/SwiftLint/inclusive_language.html) rule.

If you add a new pattern to this page and want it enforced automatically, update the Vale rule in the same PR. Keep automated checks focused on clear cases with low false positives.
