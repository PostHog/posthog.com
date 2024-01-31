---
title: Support hero
sidebar: Handbook
showTitle: true
---

Every week, one person in each engineering team is designated the Support Hero. If this is you this week, congratulations!

As Support Hero, your job is to investigate and resolve issues reported by customers. A single case of suspicious data or a show-stopping bug can really undermine one's confidence in a data product, so it's important that we get to the bottom of all issues.

You'll see some teams using a term of endearment for Support Hero, examples being "Infra Hero" or… "Luigi". Don't ask – we don't know.

[Marcus](https://posthog.com/community/profiles/1036), our Support Engineer, triages tickets for the Product Analytics and Pipeline team, due to the high volume of tickets those teams get. He will resolve tickets if possible, and escalate to the engineering team responsible if he needs further help.

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
- [Feature Success](https://posthoghelp.zendesk.com/agent/filters/14507099125531)
- [Replay](https://posthoghelp.zendesk.com/agent/filters/14507048415771)
- [Pipeline](https://posthoghelp.zendesk.com/agent/filters/14506794017051)
- [Infrastructure](https://posthoghelp.zendesk.com/agent/filters/14507148758939)
- [Auth & Billing, handled by Growth](https://posthoghelp.zendesk.com/agent/filters/14507107058843)

Your job is simple: resolve ticket after ticket from your team's list.

There are three sources of tickets:

1. In-app bug reports/feedback/support tickets sent from the [Support panel](https://us.posthog.com/home#panel=support). They include a bunch of useful links, e.g. to the admin panel and to the relevant session recording.
1. Community questions asked on PostHog.com.
1. Slack threads that have been marked with the 🎫 reaction in customer support channels.

Some of them will ask for new features. If the feature would be widely useful for users matching [our ICP](/handbook/who-we-are-building-for), it might be a good idea to build it. Otherwise, feel free to just create a feature request issue in GitHub or +1 on an existing one – you can then send a link to the user, giving them a way of tracking progress. Also make sure to let the [Customer Success team](https://posthog.com/handbook/small-teams/customer-success) know, since they will track feature requests for paying customers.

Others will report bugs or suspected bugs. Get to the bottom of each one - you never know what you'll find. If the issue decidedly affects only that one user under one-in-a-million circumstances, it might not be worth fixing. But if it's far-reaching, a proper fix is in order. And then there are "bugs" which turn out to be pure cases of confusing UX. Try to improve these too.

If not much is happening, feel free to do feature work – but in the case of a backlog in Zendesk, drop other things and roll up your sleeves. When you're Support Hero, supporting users comes first.

It's going to be an intense week, but you're also going to solve so many real problems, and that feels great.

## How do I communicate?

As an engineer, when a question comes in your first instinct is to give them an answer as quickly as possible. That means we often forget pleasantries, or will ignore a question until we've found the answer. Hence the following guidelines:

- Always respond to a question within a reasonable timeframe during your working day (<15 minutes is great, <1 hour is okay, anything over a day is too late)
  - If you're ready to look into the issue and you think it might take a while/require a fix, just mention that and say you'll get back to them
  - If you have no idea how to answer or fix their issue, @mention someone who does
- Start your response with `Hey [insert name], ...` and make sure you're polite, not everyone you talk to is an engineer and as accepting of terse messages
- Follow up!
- Housekeeping. Once a customer issue/question has been addressed, close the ticket in [Zendesk](#zendesk) to make it easy to identify outstanding conversations.

## How do I prioritize?

As a business we need to ensure we are focusing support on our paying customers, as such this is the prioritization order you should apply as Support Hero. At the end of your rotation you need to ensure that any items in 1-4 are resolved or passed to the next Support Hero _as a minimum_.

1. Any requests where you are tagged by the Customer Success team in a dedicated Slack channel, as there will be some urgency needed.
1. Open Zendesk tickets for your team that have `high` priority.
1. Open Zendesk tickets for your team that have `normal` priority.
1. Open Zendesk tickets for your team that have `low` priority.

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

2. After the user responded and confirmed the change, delete their [TOTP device](https://app.posthog.com/admin/otp_totp/totpdevice/) ([EU link](https://eu.posthog.com/admin/otp_totp/totpdevice/)).

## How do I use Zendesk?

We use [Zendesk Support](https://zendesk.com/) as our internal platform to manage support tickets. This ensures that we don't miss anyone, especially when their request is passed from one person to another at PostHog, or if they message us over the weekend.

Zendesk allows us to manage all our customer conversations in one place and reply through Slack or email.

Zendesk will get populated with new issues from people outside the PostHog organization on the `posthog` and `posthog.com` repos, and also community questions. These tickets will come with links to the issue or the question posted in the community so you can answer them in the appropriate platform, rather than on Zendesk itself.

### Accessing Zendesk

You can access the app via [posthoghelp.zendesk.com](https://posthoghelp.zendesk.com).

The first time you sign into Zendesk, please make sure you include your name and [profile picture](https://posthog.com/handbook/company/team) so our users know who they are chatting with!

### Using Zendesk

You’ll spend most of your time in the Views pane, where you’ll find all tickets divided into different lists depending on who they are assigned to, and whether they have been solved or not.

Tips:

* If need more information from the customer to solve the issue, respond and mark as pending. 
* If you think you solved the issue mark as solved (if they reply it will re-open and it's easier for everyone if there's less open tickets around).
* Provide actionable information as _Note_ (e.g. links to internal slack threads, partial investigation, ...)
* Low priority tickets don't send emails to the requester and can be viewed in aggregation and closed without a public reply. High and normal priority tickets send an email about a helpdesk ticket being created, so we should respond publicly there.

#### Content Warnings

We have a clear definition of [who we do business with](/handbook/growth/sales/who-we-do-business-with) which means that customers who track adult or other potentially offensive content aren't automatically excluded.  To avoid team members inadvertently seeing anything offensive when impersonating a customer we will automatically tag tickets from Organizations known to have this type of content with a `content_warning` tag.

This looks at the Content Warning field on the Zendesk Organization, and adds the tag if there is text in that field.  If you see this tag on a ticket and want to understand more then click on the Organization name in the top left corner of the Zendesk UI and scroll down the list of fields on the left.

If you do discover any potentially offensive content in a customer account then please update this field on the Zendesk Organization so that other team members are aware of the content.


### Pylon

Our Customer Success team uses [Pylon](https://usepylon.com) to turn Slack threads into Zendesk tickets. When creating a ticket by adding the :ticket: emoji, the customer or CS team can assign the thread to a team which will route the Zendesk ticket to the correct place. These will normally be marked as high priority and you can respond to them either in Zendesk or Slack, as there is a two-way sync.

### Community questions

At the end of every page in the docs and handbook is a form where visitors can ask questions about the content of that page. (These questions also appear in the relevant category in the [PostHog community](/questions).)

Community questions appear in Zendesk but tickets are closed automatically if they're resolved directly on the website.

## How do I answer community questions?

When a question is posted, it'll appear in Zendesk with a direct link to the question. A notification is also sent to the [#community-questions](https://posthog.slack.com/archives/C03B04XGLAZ) channel in Slack. (You can also receive notifications about specific topics in your own small team's Slack channel. Ask the Website & Docs team for help in setting this up if you like.)

You can answer a question directly on the page where it was asked. When a reply is posted, the person who asked the question will receive an email notification. (**Important:** Don't reply to community questions directly from Zendesk.)

The first time you answer a question, you'll need to create a community account. (You'll be prompted to do this after answering a question, as posting/responding requires authentication.)

Ask in [#team-website-and-docs](https://posthog.slack.com/archives/C01V9AT7DK4) to be upgraded to a moderator. This will also give you access to moderator controls available for each question.

_Note: The PostHog.com community currently uses a separate authentication system from PostHog Cloud. There are [plans](https://github.com/PostHog/posthog.com/issues/5847) to support other types of authentication so a visitor doesn't have to create a separate account for asking questions._
