---
title: When a champion leaves
sidebar: Handbook
showTitle: true
---

A [champion](/handbook/growth/sales/customer-journey#champions-and-coaches) who leaves is one of the most [common churn reasons](/handbook/customer-success/churn-reasons#champion-leaves). The account rarely churns on the day they leave. It churns later, when an API key stops working, invoices go to an inbox that nobody reads, or nobody at the company remembers why they pay for PostHog.

The best defense is still to [multi-thread](/handbook/growth/sales/risk-mitigation-and-churn-prevention#de-risking-common-churn-scenarios) before it happens. This page is what to do when it happens anyway.

## How you find out

- The **People changes** [scout](/handbook/customer-success/how-we-use-automation#managed-customer-scouts) sends you a weekly digest of the people who left your accounts.
- The **Churn risk** scout creates a task when it finds a champion who left.
- Your email bounces, or the champion goes quiet in your shared Slack channel.
- They tell you, or they change their job on LinkedIn.

If the champion tells you before they leave, that is the best case. Do the handover checklist below with them, and ask them to introduce you to the person who takes over their work.

## 1. Flag the account

Do this as soon as you find out:

- If the account has no other champion, add the **Churn Risk** tag in <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/accounts">Customer Analytics</PrivateLink>. See [when to flag an account as at risk](/handbook/growth/sales/risk-mitigation-and-churn-prevention#when-to-flag-an-account-as-at-risk).
- Add a note on the account that says who left and when, so that the next person on the account has the context.

## 2. Run the handover checklist

Things that are tied to one person break without a warning when that person leaves. Things often break on their last day, when the customer removes their accounts. Check each item below as soon as you can.

You can see most of these items in Customer Analytics or in a read-only impersonation session. Follow our rules for [impersonating users](/handbook/company/security#impersonating-users). Tell the customer what you find and let them make the changes. Do not change their setup without their consent.

### Organization owner

- Check who is an owner in [**Settings** > **Organization** > **Members**](https://app.posthog.com/settings/organization-members).
- An owner cannot leave an organization. Only an owner can transfer ownership or delete the organization. If the champion is the only owner, ask them to make someone else an owner before they leave.
- If the only owner has already left, the customer must go through our [organization ownership transfer process](/handbook/support/customer-support#how-should-i-handle-organization-ownership-transfers). This needs access to the old owner's email or proof that they own the domain, so it is slow. Start it early.

### Billing details in Stripe

- Check the billing email in <PrivateLink url="https://billing.posthog.com/admin/billing/customer/">billing admin</PrivateLink>. If it is the champion's email, invoices and failed payment emails go to an inbox that nobody reads.
- Ask the customer for the new billing contact and [update the billing email yourself](/handbook/growth/sales/contracts#updating-the-billing-email-and-address).
- Ask if the card on file is the champion's company card. Companies often cancel these cards when a person leaves.
- We send billing emails to all owners and admins, so make sure that at least one owner or admin is still at the company.

### Personal API keys

- Owners and admins can see every key with access to the organization in [**Settings** > **Organization** > **Security**](https://app.posthog.com/settings/organization-security#organization-personal-api-keys). Look for keys that the champion owns and that were used recently.
- A [personal API key](/docs/api/personal-api-keys) belongs to a user. When the customer removes the champion from the organization, any script or service that uses the champion's key stops working.
- The most common example is [feature flag local evaluation](/docs/feature-flags/local-evaluation). Move it to a [project secret API key](/docs/api/project-secret-api-keys/overview), which does not belong to a person. For scopes that project secret API keys do not support yet, the customer must make a new personal API key with a person who stays.

### Integrations and data warehouse sources

- Check the integrations in project settings (for example Slack) and the [data warehouse sources](/docs/data-warehouse).
- If the champion connected a tool with their own login in that tool, the connection can stop working when the customer turns off their account there. Syncs fail, and alerts stop arriving.
- Ask the customer to connect it again with a service account or with a person who stays.

### Batch exports and destinations

- Check the [batch exports](/docs/data-pipelines/batch-exports) and destinations in **Data pipelines**.
- If the credentials belong to the champion (for example their own Snowflake user), the exports fail when the customer removes that user.
- Find out who uses the exported data. That team often depends on PostHog and is a good place to look for a new champion.

### Subscriptions and alerts

- Check [subscriptions](/docs/product-analytics/subscriptions) and [alerts](/docs/alerts) that go to the champion's email.
- If nobody gets these reports, the company stops seeing value from PostHog without anybody noticing. Ask the customer who must get them now, or move them to a team Slack channel.

### Shared Slack channel

- If the champion was the only person from the customer in your [shared Slack channel](/handbook/growth/sales/slack-channels), you have lost your main channel to the account. Add more people now.

## 3. Find a new champion

You need a champion, not a coach. The test is the same as always: when they say something must happen, it happens. A friendly power user who cannot make decisions is a coach.

Where to look:

- **The people who use PostHog now.** Customer Analytics shows the active users on the account. Look for the people who make insights and dashboards, own feature flags, or write SQL.
- **New owners and admins.** The People changes scout creates a `New stakeholder:` task when one joins.
- **The people who own the items from the checklist.** The new owner, the new billing contact, and the team that uses the exports all have a reason to talk to you.
- **The person who takes over the champion's role.** A warm introduction from the champion is the best way in. Ask for it before they leave.
- **Someone more senior.** If you cannot find anybody, email a senior person, even if they do not use PostHog. They can tell you who owns PostHog now.

How to approach them:

- Start with something useful, not "your champion left." The checklist gives you good reasons. For example, "Your feature flag local evaluation uses an API key that stops working when your previous admin's account is removed. Here is how to move it to a project secret API key."
- Offer a call to walk through their setup. A new owner often does not know why the company chose PostHog. Show them what the team uses, what it costs, and what it replaced. A [health check](/handbook/customer-success/health-checks) is a good structure for this call.
- See [getting people to talk to you](/handbook/account-management/getting-people-to-talk-to-you) for more tactics, especially [which channel and which person](/handbook/account-management/getting-people-to-talk-to-you#which-channel-and-which-person) and [asking for introductions](/handbook/account-management/getting-people-to-talk-to-you#asking-for-introductions).

When you find them, record them as a champion or a coach, with what they can and cannot decide. Then build a second champion in a different team, so that the next departure does not put the account at risk again.

## 4. Close the loop

- Remove the **Churn Risk** tag when you have a relationship with a new champion and nothing from the checklist is still open.
- If the account churns anyway, do a [churn retro](/handbook/customer-success/customer-churn-retros) and record which part of this process came too late.
