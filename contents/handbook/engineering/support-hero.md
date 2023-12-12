---
title: Support hero
sidebar: Handbook
showTitle: true
---

## 1. Support Hero

Every week, we assign one person to be the "Support Hero" per engineering team (alternative names "Secondary", "Support Sidekick", "Infra Hero", "Luigi"). If this is you this week, congratulations! Support hero is an intense but super fun week where you get to talk to a bunch of users, get the satisfaction of helping them out, and contribute to a lot of different parts of our system. Your first priority should be dealing with alerts or Sentry alerts are high priority. After that, it's responding to customer support requests. Depending on how busy the week is you can do some feature work too.

[Marcus](https://posthog.com/community/profiles/1036), our Support Engineer, will triage tickets for the Product Analytics and Pipeline team, due to the high volume of tickets those teams get. He will resolve tickets if possible, and escalate to the Engineering team responsible if he needs further help.

### Expectations

You should work your 'normal' hours during this week. There will likely be more issues than you'll have time to fix so be sure to prioritise. If there's an important and urgent issue near the end of your day, hand it off to someone on the other side of the Atlantic.

If you are planning on taking a day off or you won't be available, please find someone to swap with and update the rotation on PagerDuty. Be sure to schedule an override for both swaps and **do not alter the rotation order** to avoid affecting other members.

### Rotations

- [Secondary - Product Analytics](https://posthog.pagerduty.com/schedules#PXUZ9XL)
- [Secondary - Feature Success](https://posthog.pagerduty.com/schedules#P04FUTJ)
- [Secondary - Monitoring](https://posthog.pagerduty.com/schedules#PUPERAV)
- [Secondary – Pipeline](https://posthog.pagerduty.com/schedules#PM8YSH8)
- [Secondary - Infrastructure](https://posthog.pagerduty.com/schedules#P78OOWZ)

### Channels

There are a couple of channels that customer requests come in so make sure you keep an eye on all of them (in order of priority):
- [Zendesk](https://posthoghelp.zendesk.com/agent/filters/5586845866651) - look for the dedicated folder for your team. If new tickets are created, then a slack notification will be sent also to your team's dedicated support channel.
- [PostHog Users' Slack](/slack), specifically `#community` and `#general` or elsewhere should be redirected to using [the bug button](https://app.posthog.com/home#supportModal) within the app, which provides us with all the context and helps triage. We do not commit to providing support through Slack, and should suggest users who prefer this channel ask @Max-AI as a first port of call.
- Sentry issues, either [directly](https://sentry.io/organizations/posthog/issues/?project=1899813) or in `#sentry` in our main Slack.
- [Community forums](/questions) - each small team can decide how to handle questions pertaining to their part of the product, but we suggest working with your small team's marketing representative to make sure each question gets answered. (Read more in the [Community](/handbook/small-teams/website-docs/community) section of the handbook.)

### Communication

As an engineer, when a question comes in your first instinct is to give them an answer as quickly as possible. That means we often forget pleasantries, or will ignore a question until we've found the answer. Hence the following guidelines:

- Always respond to a question within a reasonable timeframe during your working day (<15 minutes is great, <1 hour is okay, anything over a day is too late)
  - If you're ready to look into the issue and you think it might take a while/require a fix, just mention that and say you'll get back to them
  - If you have no idea how to answer or fix their issue, @mention someone who does
- Start your response with `Hey [insert name], ...` and make sure you're polite, not everyone you talk to is an engineer and as accepting of terse messages
- Follow up!
- Housekeeping. Once a customer issue/question has been addressed, close the ticket in [Zendesk](#zendesk) to make it easy to identify outstanding conversations.

### Prioritizing requests

As a business we need to ensure we are focusing support on our paying customers, as such this is the prioritization order you should apply as Support Hero. At the end of your rotation you need to ensure that any items in 1-4 are resolved or passed to the next Support Hero _as a minimum_.

1. Any requests where you are tagged by the Customer Success team in a dedicated Slack channel as there will be some urgency needed
1. Open Zendesk tickets for your team that have `high` priority (high-paying customers)
1. Open Zendesk tickets for your team that have `normal` priority (paying customers)
1. [Community questions](https://posthog.com/questions/)
1. Open Zendesk tickets for your team that have `low` priority (non-paying users)

### Support for self-hosted users

It's fine to politely direct users to the docs for [self-serve open-source support](/docs/self-host/open-source/support#support-for-open-source-deployments-of-posthog) and ask them to file a GitHub issue if they believe something is broken in the docs or deployment setup. We do not otherwise provide support for self-hosted PostHog.

### How to help customers

- The reason it's so great to have engineers do support is that you can actually help customers solve their issues, rather than just escalating it. Hence you should aim to **go deep** and **actually solve people's issues**, whether that involves going deep on our functionality or spending half a day writing a PR to fix someone's issue
- On app.posthog.com, you can log in as a user to help debug their issues.
    - Do this by going to https://app.posthog.com/admin/posthog/user/, finding the relevant user and clicking 'log in as them'
    - To go back to your old user, just log out
    - If they have asked for help it is safe to assume they've given permission for you to log in as them.
    - You can also check to see sentry errors tied to the user via the `user.username` parameter for e.g. [for test@posthog.com](https://sentry.io/organizations/posthog2/issues/?project=1899813&query=is%3Aunresolved+user.username%3Atest%40posthog.com&statsPeriod=14d)
- When trying to debug an issue with a customer and it's not immediately obvious, it's usually much faster to do a video call. You also tend to get other useful product feedback.
- Sometimes questions will have been asked earlier in the User's Slack so it's worth searching through that if you're not sure.

#### Reviewing new apps

From time to time, customers will request to get their apps added to PostHog Cloud, based on [this tutorial](https://posthog.com/docs/apps/build/tutorial#submitting-your-app). When this happens, do the following:

1. Review the app: check it doesn't do anything dangerous, like making an arbitrary number of requests, or attempt to DDOS some server.
2. Ensure it has a `logo.png` file
3. Fork their GitHub project
4. Add the forked project to our [Integrations Repository](https://github.com/PostHog/integrations-repository)
5. Tell the marketing team about this new integration
6. Install it on Cloud, and make it global

#### Updating existing apps

1. Open a PR against our forked version of the plugin with the new changes (syncing from the main repo).
2. Review the code changes and merge the PR. Look out for:
  - Proper error handling (plugin emits [RetryError](https://posthog.com/docs/apps/build/reference#maximizing-reliability-with-retryerror) when relevant, instead of throwing unhandled exceptions)
  - Proper use of resources (bounded memory and CPU usage, external requests kept to a minimum)
  - Good security practices (the plugin cannot be used to DDoS some server) 
  - Unit testing coverage when possible
3. Update the app in our Cloud instances via the `Browse Apps` page, both on [prod-eu](https://eu.posthog.com/project/apps?tab=installed) and [prod-us](https://app.posthog.com/project/apps?tab=installed). You need instance staff permissions to do this.

#### Ownership transfer

In case a user requests for organization permissions to be altered (e.g the admin left the company) follow these steps:

1. Ask them to get the current owner to log in and transfer the ownership.
2. If they have access to the current owner’s email, ask them do a password reset and then login as the owner and perform the action themself.
3. If not, we should email the account owner’s email to see if we get a bounce back. Also check how long it is since they logged in.
4. If they’re on a paid plan we might need to switch the contact on Stripe.

#### 2FA method removal

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


### Zendesk

We use [Zendesk Support](https://zendesk.com/) as our internal platform to manage support tickets. This ensures that we don't miss anyone, especially when their request is passed from one person to another at PostHog, or if they message us over the weekend.

Zendesk allows us to manage all our customer conversations in one place and reply through Slack or email.

Zendesk will get populated with new issues from people outside the PostHog organization on the `posthog` and `posthog.com` repos, and also community questions. These tickets will come with links to the issue or the question posted in the community so you can answer them in the appropriate platform, rather than on Zendesk itself.

#### How to access Zendesk

You can access the app via [posthoghelp.zendesk.com](https://posthoghelp.zendesk.com).

The first time you sign into Zendesk, please make sure you include your name and [profile picture](https://posthog.com/handbook/company/team) so our users know who they are chatting with!

#### How to use Zendesk

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

Our Customer Success team uses [Pylon](https://app.usepylon.com) to turn Slack threads into Zendesk tickets.  When creating a ticket by adding the :ticket: emoji, the customer or CS team can assign the thread to a team which will route the Zendesk ticket to the correct place.  These will normally be marked as high priority and you can respond to them either in Zendesk or Slack, as there is a two-way sync.

### Community questions

At the end of every page in the docs and handbook is a form where visitors can ask questions about the content of that page. (These questions also appear in the relevant category in the [PostHog community](/questions).)

Community questions appear in Zendesk but tickets are closed automatically if they're resolved directly on the website.

#### Answering questions

When a question is posted, it'll appear in Zendesk with a direct link to the question. A notification is also sent to the [#community-questions](https://posthog.slack.com/archives/C03B04XGLAZ) channel in Slack. (You can also receive notifications about specific topics in your own small team's Slack channel. Ask the Website & Docs team for help in setting this up if you like.)

You can answer a question directly on the page where it was asked. When a reply is posted, the person who asked the question will receive an email notification. (**Important:** Don't reply to community questions directly from Zendesk.)

The first time you answer a question, you'll need to create a community account. (You'll be prompted to do this after answering a question, as posting/responding requires authentication.)

Ask in [#team-website-and-docs](https://posthog.slack.com/archives/C01V9AT7DK4) to be upgraded to a moderator. This will also give you access to moderator controls available for each question.

_Note: The PostHog.com community currently uses a separate authentication system from PostHog Cloud. There are [plans](https://github.com/PostHog/posthog.com/issues/5847) to support other types of authentication so a visitor doesn't have to create a separate account for asking questions._
