---
title: Working in PostHog Support
sidebar: Handbook
showTitle: true
---

We use [PostHog Support](https://us.posthog.com/project/2/support/tickets) as our support ticketing system. This ensures that we don't miss anyone, especially when their request is passed from one team to another at PostHog, or if they message us out of hours or over the weekend. PostHog Support allows us to manage all our customer conversations (email, widget, Slack, MS Teams) in one place and reply back on the same medium.

This page covers the practical, day-to-day mechanics of working tickets: where to find yours, how to prioritize them, what each status means, and how to escalate or hand a ticket off cleanly.

## How do tickets get created?

Customers can reach us through several channels, and every one of them lands as a ticket in PostHog Support.

**Email.** Customers can email any of the addresses we've set up in our [email channel settings](https://us.posthog.com/project/2/support/settings#channel=email).

**Support widget.** Customers can open the support side panel by opening the bottom-left **More** menu and clicking **Support** ([direct link](https://us.posthog.com/home#panel=support)). This raises a widget channel ticket. Widget tickets are also raised when a customer gives feedback on a feature, or whenever they hit an error in the app.

**Slack.** Enterprise and high-paying customers may have a shared Slack channel with us. Any channel listed as a support channel in our [Slack settings](https://us.posthog.com/project/2/support/settings#channel=slack) will automatically raise a ticket every time a message is posted. For any other channel that has `@SupportHog` in it, anyone can either react to a message with a `:ticket:` emoji **or** mention `@SupportHog`, and a ticket will be raised in PostHog Support. In shared channels, `@SupportHog` also watches for messages that look like potential support cases. When it spots one, it replies on the thread asking the customer whether they'd like to open a ticket (**Open ticket** or **No thanks**), and reminds them they can always raise one with the `:ticket:` emoji or by mentioning `@SupportHog`.

**MS Teams.** Enterprise and high-paying customers may also have a shared MS Teams channel with us. Any channel listed as a support channel in our [Teams settings](https://us.posthog.com/project/2/support/settings#channel=teams) will automatically raise a ticket every time a message is posted. For any other channel that has `@SupportHog` in it, anyone can `@mention` SupportHog to raise a ticket. **Note:** unlike Slack, reacting with a `:ticket:` emoji in MS Teams does **not** raise a ticket.

To set up `@SupportHog` in customer channels, see [the sales/CS handbook page on customer channels](/handbook/growth/sales/slack-channels).

### How does a customer know their ticket was created?

- For **email and widget** channel tickets, we use a [workflow](https://us.posthog.com/project/2/workflows/019d9050-b1d1-0000-edd7-cf9697ad56d9/workflow) to send the customer an email letting them know we've got their ticket.
- For **Slack and MS Teams** customers, the `@SupportHog` bot replies on the thread with a message confirming that a ticket has been created.

## Creating tickets on behalf of customers

Sometimes a user will reach us somewhere that isn't a proper channel — a reply to an old, already-solved ticket thread, a question over Twitter, or an email that spirals into several separate issues. In these cases it's best to create a fresh ticket for them, so the correct SLAs apply and each issue stays distinct and easy to assign.

You can ask a user to open a new ticket themselves, but it's better if we do it for them. At the top of the [PostHog Support](https://us.posthog.com/project/2/support/tickets) page you can create a new ticket and fill in their details — this makes sure the right tags, SLAs, and so on are applied automatically.

A couple of things worth doing depending on where the issue came from:

- If the user raised it somewhere public, like Twitter, it's a nice touch to let them know you've opened a ticket on their behalf.
- If they were replying to an old, already-resolved ticket, mark that old ticket as resolved once you've moved the new issue into its own ticket.

### Forwarding customer emails

If a customer has emailed you directly and the conversation should live in support, you don't need to copy anything over manually — forward the email to one of the support addresses in our [email channel settings](https://us.posthog.com/project/2/support/settings#channel=email) and a ticket will be created. Default to the address set as **primary** unless you have a reason to use another.

**Make sure the customer's email address is included as a cc on the forward.** This is how the ticket gets associated with the customer, so that they receive our replies and the right tags and SLAs are applied.

## Where do the tickets live?

It depends on your role:

- **Support team members** work from their **SME view**. This is available to you as a bookmark in your SME Slack channel.
- **Support heroes** work from their **team view**. This is available to you in your team's `#support-<team-name>` channel.

If you ever forget where your view is, or you want to look at another team's view, click the **Saved views** button in [PostHog Support](https://us.posthog.com/project/2/support/tickets) to see every available view.

## Tags and what they mean

Tickets are tagged automatically to tell us who the customer is, what plan they're on, and which part of PostHog the ticket relates to. Understanding the tags makes prioritizing, escalating, and transferring tickets much easier.

### Customer and account tags

- **`top_20`** — this set is regularly reviewed by the sales team, and the priority is applied to the customers we'd like to have an especially fantastic support experience.
- **`churn_risk`** — customers that sales/CS have flagged as a risk of churning. We want to be more responsive with these customers.
- **`new_customer_onboarding`** — applied to tickets from recently created organizations. We want new customers to have a great onboarding experience, so these tickets get a tighter SLA.
- **`plan_*`** — describes which plan the customer is on (for example `plan_enterprise`).
- **`goodwill_enterprise`** — there's a sales/CS person assigned to the account, so we treat them as enterprise.
- **`unknown_slack_default_enterprise`** — applied when we know a ticket came from a Slack channel but we can't identify the organization associated with the individual's account. This usually happens when the email isn't present in someone's Slack account, or the email in their Slack account doesn't match the email they use for PostHog. We default these tickets to `plan_enterprise`.
- **`unknown_msteams_default_enterprise`** — the same as above, but for MS Teams. These are also defaulted to `plan_enterprise`.
- **`ae_*`** and **`csm_*`** — applied if the account can be identified in customer analytics and has an AE and/or CSM assigned to it.

### Categorization tags

- **`support_sme_*`** — applied based on the [SME handbook groupings](/handbook/support/support-smes).
- **`team_*`** — describes which team the ticket relates to. Applied based on the current state of the [teams page](/teams) and the [feature ownership page](/handbook/engineering/feature-ownership).
- **`support_needs_triage`** — applied when the classifier can't determine which small team the ticket relates to.
- **`exclude_from_reporting`** — add this when a ticket is spam, an auto-response, or anything else that genuinely shouldn't count towards our total metrics and numbers.
- **`auto_closed_security`** and **`auto_closed_merch`** — applied when the [security](#security-tickets) or [merch](#merch-tickets) workflows auto-close a ticket as known spam. These tickets are also tagged `exclude_from_reporting`.
- **`content_warning`** — applied automatically to tickets from organizations known to track adult or otherwise potentially offensive content. We have a clear definition of [who we do business with](/handbook/growth/sales/who-we-do-business-with), which means customers tracking this kind of content aren't automatically excluded. The tag exists so that team members don't inadvertently see anything offensive when impersonating a customer. If you ever discover potentially offensive content in a customer account, please update the workflow that applies this tag so the rest of the team is aware.

## Prioritizing tickets

As a rough order of priority, work through:

1. `top_20` and `churn_risk` customers
2. Customers on an enterprise plan (`plan_enterprise`)
3. All other paying customers, by most-breached ticket

That ordering is simply a starting point, not a rulebook. Use your judgement about what the next most important thing to work on actually is:

- If something has been **breached for a long time**, work on it regardless of plan.
- If something comes in that **looks like it could be a wider issue**, work on it regardless of plan.

Prioritization is not a set of hard-and-fast rules — we trust you to figure it out.

### How will I know if a ticket is nearing a breach of our SLA targets?

TBD - SLA alerts coming soon.


## Ticket statuses

Getting statuses right matters — it's how the rest of the team (and our reporting) knows what's actually happening with a ticket.

- **New** - a new ticket that we haven't responded to yet.
- **Open** - an open ticket that has either had a response from the customer, or one where we're continuing to investigate.
- **Pending** - a ticket we've responded to and are now waiting on the customer for. Use this when we're asking something of the customer, or when we're not yet certain the ticket is resolved.
- **On hold** - use this sparingly, and when you do, pair it with a **snooze**. The snooze means the ticket doesn't sit on hold forever — it comes back to you on a set date when you plan to check something or follow up. You might use this while waiting to confirm a billing invoice went through, or when you have a PR in review and intend to let the customer know once it ships. Do **not** use on hold while you're actively investigating — tickets we're actively working on should stay **open**.
- **Resolved** - for tickets that are done. Use this when a ticket is obviously closed (for example, the customer has confirmed a fix or suggestion worked), and also when you're 90% confident that your response will resolve the customer's issue or question.

## Working on a ticket

When you start working on a ticket, **assign it and save it**. This is the single easiest way to avoid two people investigating the same thing. Who you assign it to depends on your role:

- If you're a **support team member**, assign the ticket to yourself.
- If you're a **support hero**, you'll likely want to keep the ticket assigned to your team, so that every ticket your team is responsible for stays visible in your team's view.

To reply to a customer, write your message in the message box and click send. Once your message has gone out, double-check the ticket is in the correct status.

If you're a support hero and you ever have trouble responding to a customer — for any reason at all, including that you're not sure how to phrase something or you're just feeling stuck — reach out in `#team-support`. We're always happy to help.

### How does a customer know we've responded?

- For **Slack and MS Teams** tickets, your reply is posted directly on the thread.
- For **email** channel tickets, your full response is sent to the customer via email.
- For **widget** channel tickets, we use a [workflow](https://us.posthog.com/project/2/workflows/019d903d-d7e6-0000-5c1d-1d184ed0da2a/workflow) to send the customer an email letting them know we've responded and that they can see the full response in the support sidebar.

### AI private notes

On some tickets you may see a private note from `PostHog Assistant`. This is an AI-generated note containing a response that the AI thinks is correct for the ticket.

**Never copy and paste these responses** — especially without checking them. AI can make mistakes, and it's your job to verify anything it says before it goes anywhere near a customer. By all means review these notes and rate them — it helps the <SmallTeam slug="conversations" /> improve them.

The direction for support at PostHog is set out in [Stop adding AI between you and your customers](/blog/future-of-support-is-human) — support at PostHog stays human.

## Private notes

Attach private notes as you investigate. Future travelers will thank you: notes help the next person understand your thought process, they help engineers if you need to escalate, and they make it far easier for a teammate to pick up the ticket if you're on holiday or off sick.

Don't use private notes to communicate internally about a ticket — it's far too easy to miss them. If you need to ask something internally, **raise it in Slack** and then attach a private note with a link to the Slack thread. If you start any Slack conversation about a ticket, always leave a private note linking to it.

## Escalating a ticket

To escalate a ticket to an engineering team, **assign the ticket to that team**. That's it.

Most tickets are [default assigned](https://us.posthog.com/project/2/workflows/019f5ae1-273d-0000-0f78-6d4b55c8c042/workflow) to the support team, and are [automatically tagged](https://us.posthog.com/project/2/workflows/019f46e8-6374-0000-60a1-79b42c416535/workflow) with the engineering team and SME grouping that best fit. To escalate to the relevant engineering team, all you need to do is assign the ticket to them.

If a ticket has been mis-categorized and is heading to a different team than the one it's tagged with, update the team and SME tags as needed.

## Transferring a ticket to another SME group (within support)

If you're transferring a ticket to another SME group entirely, **remove your SME tag and add theirs**. Make sure the engineering team tag is up to date too — this keeps our reporting accurate.

If instead you want to give another SME group **visibility** without transferring ownership — for example, adding `support_sme_accounts_billing` so they can later enact a refund — just add their SME tag alongside your own.

Whenever you add an additional SME tag or transfer a ticket to a different SME group, **attach a private note explaining why and what you're expecting** to happen next.

## Transferring a ticket to another team

To transfer a ticket to another team, **assign the ticket to that team**. As with SME transfers, whenever you change the assignee to a different team, **attach a private note explaining why and what you're expecting**. If you believe the ticket was mis-categorized, update the team tag as well so our reporting stays accurate.

## Ticket activity history

If you're ever unsure how a ticket ended up in a particular state, or where a certain tag came from, check the **ticket activity history**. It shows every update that's happened on the ticket, including who actioned it — and that includes changes made automatically by a [workflow](#automations-and-workflows).

## Automations and workflows

A lot of the ticket flow runs automatically through PostHog workflows and realtime destinations — classification, tagging, SLA deadlines, notifications, CSAT, and more. You don't need to memorize all of this, but it's useful to know what's happening behind the scenes so you understand how a ticket got into a particular state (and where to look if something isn't behaving as expected).

### Categorization

- A [classification workflow](https://us.posthog.com/project/2/workflows/019f46e8-6374-0000-60a1-79b42c416535/workflow) classifies tickets via a PostHog code task. It sets the `team_` and `support_sme_` tags by looking at the current versions of the [teams](/teams), [feature ownership](/handbook/engineering/feature-ownership), and [support SME](/handbook/support/support-smes) handbook pages — so the tags are always derived from the current team names and SME groupings. The task then creates a `support_ticket_classified` PostHog event with the interpreted team's support Slack channel as a property. That event is consumed by a [realtime destination](https://us.posthog.com/project/2/functions/019f46e6-c08f-0000-51df-a95e57711a7f) which posts the ticket notification into the team's `#support-<team-name>` channel.

### Assignment notifications

- When a ticket is **assigned to an engineering team's role** — for example when support routes a ticket to Team Ingestion, or one team passes a ticket to another — a [realtime destination](https://us.posthog.com/project/2/functions/019f83db-d0fe-0000-1f47-4134c9d318cc) posts a notification into the team's `#support-<team-name>` channel with the customer, the latest message, and a link to the ticket. The channel is derived from the assignee role's name, so it always matches the current [teams page](/teams) naming — this is one of the reasons role names, team names, and `#support-*` channel names need to [stay in sync](/handbook/engineering/operations/support-hero#setting-your-team-up-for-support).
- Assignments to the support, security, People & Ops (merch), and sales/CS teams are excluded — those have their own notification flows (see below). Assignments to individual people don't notify either: the ping is for "your team's queue just got a ticket", not for tickets someone has already picked up.
- The same ticket and assignee combination notifies at most once per hour, so repeated or bulk re-assignments don't spam the channel. If a message can't be delivered to the team's channel (usually because the channel doesn't exist under the expected name, or the PostHog Slack app isn't in it), it's posted to `#alerts-support` instead with a warning.
### Ticket lifecycle

- When a ticket receives a response from the customer, we [reopen it](https://us.posthog.com/project/2/workflows/019f5ae3-545f-0000-5b22-2d87ddb1da8a/workflow). If the responding customer is a `top_20` or `churn_risk` customer, we also notify `#support-top20`.
- When a ticket is in **pending** (i.e. we're expecting a response from the customer), we use [this workflow](https://us.posthog.com/project/2/workflows/019c5746-a12b-0000-3145-a62dca023f64/workflow?node) to send the customer a reminder email after 5 days, and then resolve the ticket if it's still in pending after a total of 7 days.
- When a PostHog team member responds on a ticket, we [set the ticket status to open](https://us.posthog.com/project/2/workflows/019c51aa-631b-0000-266f-def63de34f90/workflow?node) so the ticket is no longer marked as new.

### SLAs / target response times

- When a **new ticket is created**, [this workflow](https://us.posthog.com/project/2/workflows/019f5ae1-273d-0000-0f78-6d4b55c8c042/workflow) identifies the customer's plan / account type and sets the relevant **First Response Time (FRT)** SLA deadline on the ticket. If the ticket is from a `top_20` or `churn_risk` customer, we notify `#support-top20`. This workflow also assigns most tickets to the support team by default.
- When a **response is received from a customer**, [this workflow](https://us.posthog.com/project/2/workflows/019f5ac5-5f0f-0000-7038-e480e5fb0d07/workflow) uses similar logic to the FRT workflow to identify the plan / account type — we redo these checks in case the customer's plan has changed since the ticket was created — and sets the relevant **Next Response Time (NRT)** SLA deadline. The NRT is not applied if the ticket already has an SLA set that is shorter than the NRT the workflow would apply.
- After a **PostHog team member responds**, [this workflow](https://us.posthog.com/project/2/workflows/019eac53-1b80-0000-e2ff-106649acce49/workflow) sets the **update** SLA deadline — the time within which the customer should receive an update from us about the progress of our investigation.
- If a ticket is **reopened by a team member** (e.g. they change the status from resolved back to open because it was resolved by mistake), [this workflow](https://us.posthog.com/project/2/workflows/019eacc1-94cf-0000-d40d-8f93f16b3fe5/workflow) sets the NRT SLA deadline.
- If a ticket is set to **on hold**, **pending**, or **resolved**, the SLA deadline on the ticket is cleared (via the [on hold](https://us.posthog.com/project/2/workflows/019eacb9-159e-0000-f228-d0d4db904444/workflow), [pending](https://us.posthog.com/project/2/workflows/019eac17-7ba7-0000-6074-0427dcb05940/workflow), and [resolved](https://us.posthog.com/project/2/workflows/019eac13-34dd-0000-cbed-eb0e3963b855/workflow) workflows).
- If any of the SLA workflows can't set an SLA deadline, they alert `#alerts-support` — see [Alerts](#alerts).

### CSAT

- If we've **auto-resolved** a ticket that was left in pending, a CSAT email is sent to the customer from [this workflow](https://us.posthog.com/project/2/workflows/019c5746-a12b-0000-3145-a62dca023f64/workflow?node).
- If we've **changed a ticket's status to resolved**, [this workflow](https://us.posthog.com/project/2/workflows/019f3834-8dbd-0000-4b19-073031109b21/workflow) sends the customer a CSAT email one day later. We don't send CSAT emails for security or merch tickets.
- We post some CSAT responses into `#team-support` using [this workflow](https://us.posthog.com/project/2/workflows/019f3cc1-e893-0000-06c0-e1ac27b075fb/workflow). If a comment is provided we always post the response. If there's no comment but the customer has given a low support or low product score, we also post the response into `#team-support` so we can investigate.

### Sales / CS

- When a new ticket comes in, [this workflow](https://us.posthog.com/project/2/workflows/019eee77-511f-0000-b0fa-a29acb514f74/workflow) checks the ticket's account in customer analytics for any assigned AE or CSM. If the account has an AE, it adds the `ae_*` tag; if it has a CSM, it adds the `csm_*` tag. If at least one of those tags is set, the workflow notifies the relevant account owner(s) in `#support-managed-customers`.

### Security tickets

- When a new security ticket is received, [this workflow](https://us.posthog.com/project/2/workflows/019d9146-223a-0000-8165-1a3489e88b3d/workflow) auto-closes some known spam. If the ticket isn't known spam, we tag it with `team_security`, assign it to the security team, auto-respond to the customer letting them know about our disclosure program, and then notify `#security-reports`.
- We use [this workflow](https://us.posthog.com/project/2/workflows/019db5af-0548-0000-0075-af3c956357ad/workflow) to notify `#security-reports` when a customer responds on a security ticket.

### Merch tickets

- When a new merch ticket is received, [this workflow](https://us.posthog.com/project/2/workflows/019d90a4-4865-0000-4d50-6608b74f5fc6/workflow) auto-closes some known spam. If the ticket isn't known spam, we assign the ticket to the merch team and notify `#merch-alerts`.
- We use [this workflow](https://us.posthog.com/project/2/workflows/019dba6b-1574-0000-329f-24ddd0fe7417/workflow) to notify `#merch-alerts` when a customer responds on a merch ticket.

### Alerts

Alerts about tickets needing attention are posted into `#alerts-support`:

- If any of the SLA workflows can't identify a customer's plan / account type, no SLA deadline gets set. When that happens, the workflow posts an alert so we can investigate and set one manually. This applies to the [FRT](https://us.posthog.com/project/2/workflows/019f5ae1-273d-0000-0f78-6d4b55c8c042/workflow), [NRT](https://us.posthog.com/project/2/workflows/019f5ac5-5f0f-0000-7038-e480e5fb0d07/workflow), [update](https://us.posthog.com/project/2/workflows/019eac53-1b80-0000-e2ff-106649acce49/workflow), and [reopened ticket](https://us.posthog.com/project/2/workflows/019eacc1-94cf-0000-d40d-8f93f16b3fe5/workflow) SLA workflows.
- If a new email ticket arrives **from** one of our own addresses (merch@, security@, billing@, or support@posthog.com), [this workflow](https://us.posthog.com/project/2/workflows/019dddb1-cd7f-0000-04bd-b59086b5e666/workflow) posts an alert so we can check that nothing is misbehaving. Tickets tagged `exclude_from_reporting` are skipped.