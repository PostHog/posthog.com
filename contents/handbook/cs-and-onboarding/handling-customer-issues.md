---
title: Handling customer issues
sidebar: Handbook
showTitle: true
---

As the dedicated PostHog human for your customers, you're the first stop for issues. You have the most context on them, so you're best placed to triage and escalate.

Support and engineering are always available to help, but try to solve issues yourself first. You'll level up your product knowledge faster.

## Raising issues

### PostHog Support

We use [PostHog Support](https://us.posthog.com/project/2/support/tickets) as our support ticketing system. For specifics on how to work in it, see [Working in PostHog Support](/handbook/support/posthog-support).

### Tickets from Slack

Customers can [create tickets from Slack](/handbook/support/posthog-support#how-do-tickets-get-created) by adding the 🎫 emoji reaction (or mentioning `@SupportHog`). This means they can get help even when you're asleep or on holiday. Let your customer know about this, and remind them now and then.


If you're working on a ticket the customer raised in Slack, assign yourself as the owner in PostHog Support, and then either resolve it or assign it to Team Support if you need to escalate it.

> Tip: Customer messages from SupportHog channels also go to [#support-managed-customers](https://posthog.slack.com/archives/C05MUMZLC13). Find the ticket there and follow the link to see the ticket in PostHog.

### Tickets from email

If a customer emails you directly and the conversation should live in support, [forward the email to one of our support addresses and cc the customer](/handbook/support/posthog-support#forwarding-customer-emails) — a ticket will be created and associated with them.

## Investigating issues

Ask for specifics: links to the insight, feature flag, or dashboard; a screenshot or the exact error message.

If it helps, log in as the customer. Clicking a link from their PostHog instance will sometimes offer a "log in as" option. Otherwise, go to <PrivateLink url="https://us.posthog.com/admin/">US admin</PrivateLink> (<PrivateLink url="https://eu.posthog.com/admin/">EU admin</PrivateLink>), search for the org or user, and click "Log in as user". If you don't see that option, ask <TeamMember name="Dana Zou" photo /> to add you as a staff member in admin.

Use our [docs](/docs), [troubleshooting tips](/handbook/support/troubleshooting-tips), and search Slack, PostHog Support, and GitHub for similar issues. If you've just joined, spend 30 mins to an hour investigating yourself before asking for help — onboarding is when you learn the products best. Use common sense based on urgency.

Keep the customer in the loop while you investigate — progress, blockers, next steps.

## Escalating tickets

Escalate to support or the [relevant engineering team](/handbook/engineering/feature-ownership):

- Need more context or further digging → support
- Issue needs deep technical domain knowledge → engineering

Our support team are technical engineers and handle most tickets. When in doubt, escalate to support.

If you're escalating to support, assign the ticket to the support team.

If you're escalating to engineering, [assign the ticket to that team](/handbook/support/posthog-support#escalating-a-ticket) and check the team tag makes sense.

Either way, attach a [private note](/handbook/support/posthog-support#private-notes) explaining what you're escalating and why, plus what you've already tried. Even confirming you followed the customer's repro steps and saw the same issue is valuable context.

## Auditing impersonations

Customers sometimes ask who from PostHog has accessed their account. Use this <PrivateLink url="https://us.posthog.com/project/2/sql">SQL query on project 2</PrivateLink> to get an impersonation log for a specific organization. Get the organization ID from [Vitally](https://posthog.vitally-eu.io/).

```sql
-- Get all user emails for an organization from persons table
WITH org_users AS (
    SELECT DISTINCT
        properties.email as user_email,
        properties.org__name as org_name
    FROM persons
    WHERE properties.organization_id = 'ORGANIZATION_ID'
        AND properties.email IS NOT NULL
)
SELECT
    e.timestamp,
    ou.org_name,
    e.properties.target_user_id as target_user_id,
    e.properties.target_user_email as target_email,
    e.event,
    e.properties.staff_user_email as staff_email,
    e.properties.mode as mode,
    e.properties.reason as reason
FROM events e
JOIN org_users ou ON e.properties.target_user_email = ou.user_email
WHERE
    e.event IN ('impersonation_started', 'impersonation_upgraded')
    AND e.timestamp >= now() - INTERVAL 30 DAY
ORDER BY e.timestamp DESC
```
