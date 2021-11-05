---
title: Support Hero and Rotations
sidebar: Handbook
showTitle: true
---

We have two types of rotations for engineering:

1. Support Hero, first line responder to customer questions and bug reports
2. Secondary on-call, responsible for prioritizing and solving escalated issues, sentry errors and alerts.

When someone is Support Hero, they are also the secondary on-call person for their team

## 1. Support Hero

Every week, we assign one person to be the "Support Hero." If this is you this week, congratulations! Support hero is an intense but super fun week where you get to talk to a bunch of users, get the statisfaction of helping them out and contribute to a lot of different parts of our system.

All other work takes a back seat while you're doing support, so don't plan on doing any 'normal' work.

### Availability

You should work your 'normal' hours during this week. Right now people in other timezones will jump in ad-hoc to catch messages that fall outside of the Support Hero's hours. Just make sure that as support hero you are doing the bulk of the debugging/fixing.

If you are planning on taking a day off or you won't be available, please find someone to swap with and update the rotation on PagerDuty. Be sure to schedule an override for both swaps and **do not alter the rotation order** to avoid affecting other members.

### Rotation

You can view the Support Hero rotation [in PagerDuty here](https://posthog.pagerduty.com/schedules#PPLGE4G). 

### Channels

There are a couple of channels that customer requests come in so make sure you keep an eye on all of them, but the **most stuff will happen in Papercups**:

- [PostHog Users's Slack](https://posthog.com/slack), specifically #_customer_support, where all messages will come in from the other channels (also on Papercups).
- GitHub issues, with [the main repo](https://github.com/posthog/posthog/issues) being the most important one.
- Sentry issues, either [directly](https://sentry.io/organizations/posthog/issues/?project=1899813) or in #sentry in our main Slack.

### Communication

As an engineer, when a question comes in your first instinct is to give them an answer as quickly as possible. That means we often forget pleasantries, or will ignore a question until we've found the answer. Hence the following guidelines:

- Always respond to a question within a reasonable timeframe during your working day (<15 minutes is great, <1 hour is okay, anything over a day is too late)
  - If you're ready to look into the issue and you think it might take a while/require a fix, just mention that and say you'll get back to them
  - If you have no idea how to answer or fix their issue, @mention someone who does
- Start your response with `Hey [insert name], ...` and make sure you're polite, not everyone you talk to is an engineer and as accepting of terse messages
  - If it's an email (if the source in #_customer_support is email), make sure you format your message as an email and only send a single message, not multiple
- Follow up!
    - [Papercups](https://app.papercups.io/) has an overview of Slack conversations that haven't been closed or answered yet. Occasionally have a look to see if you've missed anything
- Housekeeping. Once a customer issue/question has been addressed, close the conversastions on Papercups to make it easy to identify outstanding conversations.

### Prioritizing requests

1. Respond to and debug issues for _Focus_ customers (customers on Scale and Enterprise, either current or in our sales process, plus any high-paying Cloud customers)
2. Respond to and debug issues for _Subscriber_ customers (paying subscribers on Cloud, usually paying $1-500/month)
3. Respond to and debug issues for _Community_ users (all other free Open Source or free Cloud users)
4. Fix issues, create PRs

We tag customers in Papercups according to these categories so you can easily filter them - you can view the tags in the right hand pane in the Papercups app:

<img width="219" alt="Screenshot 2021-11-05 at 15 51 02" src="https://user-images.githubusercontent.com/70321811/140539495-565598d1-9245-429b-b860-1d0ea1906ca9.png">

At the moment, Charles manually tags customers based on Stripe and HubSpot data once a week. The vast majority of customers fall into the Community category, so make sure you are giving Focus customers enough time if you see a query come in from them. 

### Escalating issues

You should always try to figure out the issues customers are having by yourself before escalating. This means gathering more information from the customer, reproducing the issue and ideally fixing the issue yourself by creating a PR. Only if you are completely swamped, you really don't have any knowledge about the area (most common with deployment questions) or you can't figure out what's going on should you escalate to secondary on call.

### How to help customers

- The reason it's so great to have engineers do support is that you can actually help customers solve their issues, rather than just escalating it. Hence you should aim to **go deep** and **actually solve people's issues**, whether that involves going deep on our functionality or spending half a day writing a PR to fix someone's issue
- On app.posthog.com, you can log in as a user to help debug their issues.
    - Do this by going to https://app.posthog.com/admin/posthog/user/, finding the relevant user and clicking 'log in as them'
    - To go back to your old user, just log out
    - If they have asked for help it is safe to assume they've given permission for you to log in as them.
- When trying to debug an issue with a customer and it's not immediately obvious, it's usually much faster to do a Zoom session. You also tend to get other useful product feedback.
- When dealing with slowness, ask users to send a screenshot of their "System Status" page (under settings)
  - If they have a lot of volume and they're still on Postgres they should probably upgrade to Clickhouse
- Sometimes questions will have been asked earlier in the User's Slack so it's worth searching through that if you're not sure.

#### Debugging helm charts

Issues around deployments can be tricky to solve. It's useful to ask for context around:
1. What is their `values.yml` file
2. What guide they were following
3. What is the output of `kubectl get pods -A`
4. If any pod is not healthy, what is the output of `kubectl logs -n posthog <podname>`
5. Helm chart version


## Secondary on-call

Every team has a Secondary on-call rotation. Unlike support hero, you are still expected to do feature work. During the week that you are on-call, you are responsible for prioritizing and solving escalated issues, sentry errors and alerts that happen within your team. It also means helping out the support hero where necessary.

### Rotation

- [Core Experience Rotation](https://posthog.pagerduty.com/schedules#PXUZ9XL)
- [Core Analytics Rotation](https://posthog.pagerduty.com/schedules#P04FUTJ)
- [Platform Rotation](https://posthog.pagerduty.com/schedules#PM8YSH8)

PagerDuty doesn't let us have a rotation that automatically selects the person that is support hero to also be the secondary on-call for their team. This means we'll occasionally need to manually shuffle the schedule around.

