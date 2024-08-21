---
title: Support hero
sidebar: Handbook
showTitle: true
---

Every week, one person in each engineering team is designated the Support Hero. If this is you this week, congratulations!

As Support Hero, your job is to investigate and resolve issues reported by customers. A single case of suspicious data or a show-stopping bug can really undermine one's confidence in a data product, so it's important that we get to the bottom of all issues.

You'll see some teams using a term of endearment for Support Hero, examples being "Infra Hero" or… "Luigi". Don't ask – we don't know.

<TeamMember name="Marcus Hof" photo />, <TeamMember name="Steven Shults" photo />, and <TeamMember name="Abigail Richardson" photo />, our Support Engineers, triage tickets for the Product Analytics, CDP, Session Replay, and Feature Success teams, due to the high volume of tickets those teams get. They will resolve tickets if possible, and escalate to the engineering team responsible if they need further help.

## When is my turn?

Most engineering teams run a PagerDuty schedule:

- [Product Analytics](https://posthog.pagerduty.com/schedules#PXUZ9XL)
- [Feature Success](https://posthog.pagerduty.com/schedules#P04FUTJ)
- [Replay](https://posthog.pagerduty.com/schedules#PLGXQIF)
- [Pipeline](https://posthog.pagerduty.com/schedules#PM8YSH8)
- [Infrastructure](https://posthog.pagerduty.com/schedules#P78OOWZ)
- [Growth](https://posthog.pagerduty.com/schedules#PN1Q6BO)

The schedules consist of contiguous blocks, but that definitely doesn't mean working 24/7 – you should just work your normal hours.

## What if I'm scheduled for a week when I won't be available?

Swap with a teammate in advance! Find a volunteer by asking in Slack, then use PagerDuty schedule overrides. You can trade whole weeks, but also just specific days. Remember not to alter the rotation's core order, as that's an easy way to accidentally shift the schedule for everyone.

## What do I do as Support Hero?

Each engineering team has its own list of tickets in Zendesk:

- [Product Analytics](https://posthoghelp.zendesk.com/agent/filters/17989255082139) (escalated tickets only)
- [Web Analytics](https://posthoghelp.zendesk.com/agent/filters/21786368880027)
- [Feature Success](https://posthoghelp.zendesk.com/agent/filters/25210600744731) (escalated only)
- [Replay](https://posthoghelp.zendesk.com/agent/filters/25210723706907) (escalated only)
- [CDP](https://posthoghelp.zendesk.com/agent/filters/28134703633179) (escalated only)
- [Infrastructure](https://posthoghelp.zendesk.com/agent/filters/14507148758939)
- [Auth & Billing, handled by Growth](https://posthoghelp.zendesk.com/agent/filters/14507107058843)

Your job is simple: resolve ticket after ticket from your team's list.

There are three sources of tickets:

1. In-app bug reports/feedback/support tickets sent from the [Support panel](https://us.posthog.com/home#panel=support) (The `Help` tab in the righthand sidebar.) They include a bunch of useful links, e.g. to the admin panel and to the relevant session recording.
1. Community questions asked on PostHog.com.
1. Slack threads that have been marked with the 🎫 reaction in customer support channels.

Some of them will ask for new features. If the feature would be widely useful for users matching [our ICP](/handbook/who-we-are-building-for), it might be a good idea to build it. Otherwise, feel free to just create a feature request issue in GitHub or +1 on an existing one – you can then send a link to the user, giving them a way of tracking progress. Also make sure to let the [Customer Success team](/teams/customer-success) know, since they will track feature requests for paying customers.

Others will report bugs or suspected bugs. Get to the bottom of each one - you never know what you'll find. If the issue decidedly affects only that one user under one-in-a-million circumstances, it might not be worth fixing. But if it's far-reaching, a proper fix is in order. And then there are "bugs" which turn out to be pure cases of confusing UX. Try to improve these too.

If not much is happening, feel free to do feature work – but in the case of a backlog in Zendesk, drop other things and roll up your sleeves. When you're Support Hero, supporting users comes first.

It's going to be an intense week, but you're also going to solve so many real problems, and that feels great.

## How do I communicate?

As an engineer, when a question comes in your first instinct is to give them an answer as quickly as possible. That means we often forget pleasantries, or will ignore a question until we've found the answer. Hence the following guidelines:

- Always respond to a question within a reasonable timeframe during your working day. Our SLAs are [explained here](/handbook/comms/customer-support#response-targets), but you should always try to respond to tickets quickly. 
  - If you're ready to look into the issue and you think it might take a while/require a fix, just mention that and say you'll get back to them
  - If you have no idea how to answer or fix their issue, @mention someone who does
- Start your response with `Hey [insert name], ...` and make sure you're polite, not everyone you talk to is an engineer and as accepting of terse messages
  - If they expressed frustration, acknowledging it ("Sorry for the confusion", "Apologies for the trouble" etc.) can earn goodwill quickly.
  - Be sure to thank them for reporting problems, giving feedback, creating issues, PRs, etc.
- Follow up!
- Housekeeping. Once a customer issue/question has been addressed, close the ticket in [Zendesk](#zendesk) (mark it `Solved`) to make it easy to identify outstanding conversations.
- If a user has been particularly helpful, such as raising a security or bug report, feel free to offer a small credit for the merch store. 

If you have any questions about how or when to communicate with users, you can always ask [the Comms team](/handbook/comms/comms-team) for help. 

## How do I prioritize?

As a business we need to ensure we are focusing support on our paying customers, as such this is the prioritization order you should apply as Support Hero. At the end of your rotation you need to ensure that any items in 1-4 are resolved or passed to the next Support Hero _as a minimum_.

1. Any requests where you are tagged by the Customer Success team in a dedicated Slack channel, as there will be some urgency needed.
1. Open Zendesk tickets for your team that have `high` priority.
1. Open Zendesk tickets for your team that have `normal` priority.
1. Open Zendesk tickets for your team that have `low` priority.

### What if I need to confirm priority by checking a customer's MRR?

You've got a couple of options.  By order of quickness:

1. Use the VIP Lookup Bot:
 
    In any Slack channel, type `@VIP Lookup Bot [Customer]` (without the brackets.) 
    'Customer' can be the organization name (case-sensitive), or their organization ID.
2. In ZenDesk: 

   Click the org name near the upper-left of the ticket. The left sidebar opens. 
   There you'll see which plan they're on. If they've already paid some bills, you'll also see MRR there.

## How should I handle self-hosted setups?

It's fine to politely direct users to the docs for [self-serve open-source support](/docs/self-host/open-source/support#support-for-open-source-deployments-of-posthog) and ask them to file a GitHub issue if they believe something is broken in the docs or deployment setup. We do not otherwise provide support for self-hosted PostHog.

## How should I handle organization ownership transfers?

In case a user requests for organization permissions to be altered (e.g. the admin left the company) follow these steps:

1. Ask them to get the current owner to log in and transfer the ownership.
2. If they have access to the current owner’s email, ask them do a password reset and then login as the owner and perform the action themselves.
3. If not, we should email the account owner’s email to see if we get a bounce back. Also check how long it is since they logged in.
4. If they’re on a paid plan we might need to switch the contact on Stripe.

## How should I handle 2FA removal?

1. Send the following email to the account owner:

```
Subject: Confirmation Required: Removal of 2FA on your PostHog Account

Hi [name],

According to ticket #XXXX, you mentioned wanting to remove the current 2FA method. Could you please confirm this by replying to this email?

If you haven't requested this change, please let me know immediately.

Best,
[your name]
```

2. After the user responded and confirmed the change, delete their [TOTP device](https://us.posthog.com/admin/otp_totp/totpdevice/) ([EU link](https://eu.posthog.com/admin/otp_totp/totpdevice/)).

## How do I use Zendesk?

We use [Zendesk Support]([https://zendesk.com/](https://posthoghelp.zendesk.com)) as our internal platform to manage support tickets. This ensures that we don't miss anyone, especially when their request is passed from one person to another at PostHog, or if they message us over the weekend.

Zendesk allows us to manage all our customer conversations in one place and reply through Slack or email.

Zendesk is populated with new tickets when issues are sent via the in-app [Support panel](https://us.posthog.com/home#panel=support) (the `Help` tab in the righthand sidebar), from people outside the PostHog GitHub organization adding issues to the `posthog` and `posthog.com` repos, and new [community questions](/questions).  High priority customers also have Slack channels they can post support questions in. We can [create ZenDesk tickets from Slack questions via Pylon.](#pylon-to-create-zendesk-tickets-from-slack-posts)
 
The ZenDesk tickets will include links to the GitHub issue, Slack thread, or the community question so we can answer in the appropriate platform.  After replying to a community question, make an `internal note` on the ZenDesk ticket confirming that you've replied outside of ZenDesk, and set the [ticket status](#ticket-status) accordingly when submitting the internal note.

### Accessing Zendesk

You can access the app via [posthoghelp.zendesk.com](https://posthoghelp.zendesk.com).

The first time you sign into Zendesk, please make sure you include your name and [profile picture](/people) so our users know who they are chatting with!

### Using Zendesk

You’ll spend most of your time in the Views pane, where you’ll find all tickets divided into different lists depending on who they are assigned to, and whether they have been solved or not.

Tips:

* Err on the side of Solving tickets (see below) if you expect no further input from the customer, as a lot of them don't reply to confirm that the problem has been solved.
* Provide actionable information as an _Internal Note_ on the ZenDesk ticket (e.g. links to internal slack threads, partial investigation, ...)

### Creating tickets on behalf of users or from existing tickets

Sometimes users will contact us over Twitter, or email, asking support questions. Sometimes they will respond to old, solved ticket threads with new problems, or tickets will spiral into multiple issues. In both situations it's best to create a new ticket for the user so we can apply the correct SLAs and keep issues distinct for easy assignment. 

You can ask a user to create a new ticket themselves, but it's best if we do it for them. The easiest way to do this correctly is to login to PostHog as the user, and then create a fresh ticket on their behalf using the information you have. This will ensure the correct tags, SLAs, and so on are automatically applied. 

If the user raised the issue in a public forum, such as Twitter, it can be a good idea to tell them you've opened a ticket on their behalf. If the user was replying to an old, already solved ticket, you should mark the old issue to `Closed`. 

#### Avoiding duplication of effort in ZenDesk

Each team handles ZenDesk queues (views) in slightly different ways.  Check in with your team about whether or not to assign tickets to yourself, or keep them assigned to the team/group level. Comms team folks, who work on tickets from multiple queues, often assign tickets to themselves, (and when escalating, will assign the ticket back to the team/group.) 

For unassigned tickets, keep an eye out for whether someone else is already viewing a ticket (will appear in the upper-left of a ticket you're viewing, with their name, avatar and `also viewing`.)  Use those as clues to avoid working on a ticket that someone is already working on (and communicate with each other when in doubt.  Err on the side of making sure the ticket gets responded to within SLA/response target times.)

Also, avoid cherry-picking tickets. Pick the ticket that is closest to breaching our [response targets](/handbook/comms/customer-support#response-targets).

#### Ticket Status

When responding to a ticket you should also choose an appropriate status according to the following:

* **New** - A newly created ticket, you shouldn't need to use this when responding (Note: Some tickets, such as tickets created via Slack, are changed from `New` to `Open` by automated internal notes added just after the ticket is created.)
* **Open** - The ticket is still awaiting a response/further investigation from someone in PostHog (if you've worked on the ticket and expect someone else to work on it next, make sure the other person/team knows about it by leaving an internal note on the ticket.)
* **On-Hold** - (*pauses the SLA timer*) Use this one sparingly, GitHub is better for tracking open bugs, feature requests, and technical debt, and `On-Hold` tickets are too easily overlooked.  If you do need to put a ticket `On-Hold`, reply to the ticket to let the customer know.  (If you've opened a bug ticket or feature request, `On-Hold` isn't needed, see `Solved` below.)
* **Pending** - (*pauses the SLA timer*) Use this for most replies to customers. Even if you think the issue is solved, the user may disagree, so `Solved` may not spark joy. When a user doesn't reply to a `Pending` ticket within 7 days, the ticket is auto-solved.
* **Solved** - (*stops the SLA timer*) The user has replied to confirm that the ticket is resolved, or you've created a bug report or feature request and shared the link with the user so they can follow it for updates. 

#### Temp orgs for free email users

To reduce some unintended consequences of ZenDesk's unavoidable use of email address domain names to associate users with organizations, we have ZenDesk orgs for common free email providers.  

An example of these orgs: `Gmail user - please assign to correct org`

When we get a ticket from a user with an `@gmail.com` address who has not already been manually assigned to an existing ZenDesk org, that user will be assigned to the `Gmail user - ...` org (unless their PostHog org doesn't exist in ZenDesk yet, in which case the correct org will be created in ZenDesk.)

When you see a user assigned to a free email org on a ticket, and it is not a 'community question' ticket, please assign the user to their correct org, which is found on the `Admin` info line in the body of the ticket:

1. Click on the user's name, to the right of the org name
2. Click in the `Org.` field to change the org name
3. Click anywhere outside the field to save the change
Tickets which have been set to **Pending** will auto-solve after 7 days.  Customers can also respond within 20 days to a **Solved** ticket to re-open it. After 20 days, responses will create a follow-up ticket with a link to the original ticket.

Tickets that have been `Solved` will receive a CSAT survey after 3 days.

#### Content Warnings

We have a clear definition of [who we do business with](/handbook/growth/sales/who-we-do-business-with) which means that customers who track adult or other potentially offensive content aren't automatically excluded.  To avoid team members inadvertently seeing anything offensive when impersonating a customer we will automatically tag tickets from Organizations known to have this type of content with a `content_warning` tag.

This looks at the Content Warning field on the Zendesk Organization, and adds the tag if there is text in that field.  If you see this tag on a ticket and want to understand more then click on the Organization name in the top left corner of the Zendesk UI and scroll down the list of fields on the left.

If you do discover any potentially offensive content in a customer account then please update this field on the Zendesk Organization so that other team members are aware of the content.


### Pylon to create ZenDesk tickets from Slack posts

We use [Pylon](https://usepylon.com/) to create Zendesk tickets from Slack posts. To do so, add the `:ticket:` (🎫) emoji reaction to the post that you want to create a ZenDesk ticket from.  

Adding the `:ticket:` emoji reaction will cause Pylon to add a couple of replies in a thread under the post. The last of those replies includes options for the ZenDesk ticket you're creating: Use the `Group` menu to send the ticket to the appropriate team, and the `Severity` menu to set the severity flag on the ZenDesk ticket, then hit the `Submit` button.

ZenDesk tickets created this way will normally be marked as high priority tickets. You can respond to them either in Zendesk or Slack, as there is a two-way sync.

### Community questions

At the end of every page in the docs and handbook is a form where visitors can ask questions about the content of that page. (These questions also appear in the relevant category in the [PostHog community](/questions).)

Community questions appear in Zendesk but tickets are closed automatically if they're resolved directly on the website.

## How do I answer community questions?

When a question is posted, it'll appear in Zendesk with a direct link to the question. A notification is also sent to the [#community-questions](https://posthog.slack.com/archives/C03B04XGLAZ) channel in Slack. (You can also receive notifications about specific topics in your own small team's Slack channel. Ask the Website & Docs team for help in setting this up if you like.)

You can answer a question directly on the page where it was asked. When a reply is posted, the person who asked the question will receive an email notification. (**Important:** Don't reply to community questions directly from Zendesk.)

The first time you answer a question, you'll need to create a community account. (You'll be prompted to do this after answering a question, as posting/responding requires authentication.)

Ask in [#team-website-and-docs](https://posthog.slack.com/archives/C01V9AT7DK4) to be upgraded to a moderator. This will also give you access to moderator controls available for each question.

_Note: The PostHog.com community currently uses a separate authentication system from PostHog Cloud. There are [plans](https://github.com/PostHog/posthog.com/issues/5847) to support other types of authentication so a visitor doesn't have to create a separate account for asking questions._

## How do I handle a bug report or feature request?

For feature requests from low priority users, [give them this link](https://github.com/PostHog/posthog/issues/new/choose) and suggest they open a feature request.

For bug reports from normal and high priority users (assuming you've confirmed it's a bug, and that there's not already an open bug report):

1. [Open a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&projects=&template=bug_report.yml) on our GitHub repo
2. Be sure to include a link to the insight (or other), below the repo steps
3. Include "From: `https://URL_for_ZenDesk_ticket`" in the `additional info` section of the bug comment (where the URL is for the ZenDesk ticket where the customer reported the bug)
4. Reply to the user to thank* them for alerting us to the bug. Let them know you've opened a bug report and provide a link to it.
5. Let them know they can follow the bug report on GitHub for updates.
6. When sending the reply, change the ticket from `Open` to `Pending`
7. In Slack, go to the team channel for the team that handles the feature that the bug report applies to (e.g. `#team-product-analytics`) and alert them with a post like "New bug report from a high priority customer: `https://github.com/PostHog/posthog/issues/nnnnnn`"

`*` consider sparking additional joy with a [credit for merch](/handbook/company/merch-store#how-do-we-give-away-merch-for-free)

Steps for feature requests from normal and high priority users are pretty much the same, but [use this form](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&projects=&template=feature_request.yml) instead. If you find that there's already a matching feature request open, reply with a link to the feature request, and let them know they can upvote it by adding a "`+1`" comment.

## How do I handle user requests to delete groups/organizations?

> **_WARNING:_**  Do NOT click the `DELETE` button! That will delete the entire project!
> Just use the `Save` button after clicking the `delete` checkbox for the group.

1. Visit the Django Admin page for the project at `https://us.posthog.com/admin/posthog/team/:project_id/change/` (Make sure you use the project ID for the project where the group/org is found)
2. In the lower part of the page, find `GROUP TYPE MAPPINGS` and click on `SHOW`
3. In the righthand column, check the box for the group(s) to be deleted
4. Click the **`SAVE`** button. (**Do NOT use the `DELETE` button!**)
5. Reply to the user to confirm


