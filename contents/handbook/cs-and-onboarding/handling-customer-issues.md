---
title: Handling customer issues
sidebar: Handbook
showTitle: true
---
As a dedicated PostHog human for customers, you're the first point of contact for customer issues. This helps build your relationship as a technical point of contact, plus you have the most context on the customer and can help with proper escalation.

The support team and engineering teams are always available to help, but you should try to solve issues yourself before handing off to other teams. This also helps you level up your product knowledge.

## Raising issues

### Zendesk
We use [Zendesk Support](https://posthoghelp.zendesk.com/agent) as our internal platform to manage support tickets. For specifics on how we use Zendesk, [look here](/handbook/engineering/support-hero#how-do-i-use-zendesk).

### Tickets created from Slack
Customers can [create tickets from Slack](/handbook/engineering/support-hero#pylon-to-create-zendesk-tickets-from-slack-posts) by adding the 🎫 emoji reaction to their message. This is useful as customers can receive help even when you're asleep or on holiday. Make sure you let your customer know about this capability and it's also worth periodically reminding them about it.

If this isn't working as expected, make sure you've [invited Pylon to the channel](/handbook/growth/sales/slack-channels). Fill out the [automated message asking for `Group` and `Severity`](/handbook/engineering/support-hero#pylon-to-create-zendesk-tickets-from-slack-posts) so the ticket is routed to the right team (customers sometimes forget so help fill it for them). Check [feature ownership](/handbook/engineering/feature-ownership) if you're unsure which team is responsible for a product area. 

If you're investigating a ticket that your customer raised in Slack, let support know you're on it to avoid duplicate effort. You can do this by leaving an internal note directly in Zendesk. 

> Tip: Customer messages from channels with Pylon also go to [#support-customer-success](https://posthog.slack.com/archives/C05MUMZLC13). You can find the ticket in the channel and leave a message in the thread. This also creates an internal note in Zendesk.

## Investigating issues

When investigating customer issues, it's helpful to ask for specifics – e.g. links to the insight, feature flag, or dashboard; a screenshot of the error or the specific error message. 

If helpful, you can log in as the customer into their PostHog org. Clicking a link from a customer's PostHog instance will sometimes give you the option to login as the customer. Alternatively, log into <PrivateLink url="https://us.posthog.com/admin/"> US admin </PrivateLink> (<PrivateLink url="https://eu.posthog.com/admin/"> EU admin </PrivateLink>), search for the org or user, and click "Log in as user". If you're not seeing this option, ask <TeamMember name="Dana Zou" photo /> to add you as a staff member in admin.

When investigating, use our [docs](/docs), look at [troubleshooting tips](/handbook/support/troubleshooting-tips), search through Slack, Zendesk, GitHub, or Pylon for similar issues. If you've just joined, try to spend 30 mins to 1 hour investigating by yourself before asking for help. Onboarding is the best time to learn about PostHog products! Obviously, balance this with the urgency of the issue and use common sense.

While investigating, keep the customer in the loop by communicating progress, blockers, next steps etc.

## Escalating tickets

You can escalate tickets to either the support team or the [relevant engineering team](/handbook/engineering/feature-ownership). The decision depends on:
- You need help with additional context or further digging ➡️ support 
- The issue requires deep technical domain knowledge ➡️ engineering

Our support team are technical engineers and can answer the majority of tickets. If in doubt, escalate to support. 

If you're escalating to support, you don't need to do anything special - the ticket will stay in the support queue. 

If you're escalating to engineering, in Zendesk, set the `esc.` dropdown in the left sidebar to escalated and double check the group assignee makes sense. You might need to [upgrade your Zendesk role to full agent](/handbook/engineering/support-hero#i-cant-assign-tickets-or-make-public-replies), just remember to downgrade after. 

When escalating tickets, leave an internal note saying whether you're escalating this to engineering or support (and why) – so it's clear who should pick it up. Also include details about the investigation you've done and observations you've made. Even if it's confirming that you followed the customer's reproduction steps and saw the same issue, that context is incredibly valuable.

## Auditing impersonations

Customers sometimes ask who from PostHog has accessed their account. You can use the following <PrivateLink url="https://us.posthog.com/project/2/sql">SQL query on project 2</PrivateLink> to get a log of impersonations for a specific organization. You can get the organization ID from [Vitally](https://posthog.vitally-eu.io/).

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
