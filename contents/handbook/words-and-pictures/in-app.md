---
title: In-app comms
sidebar: Handbook
showTitle: true
---

> These are instructions for internal in-app comms tools at PostHog. To do in-app comms of your own, check out [surveys](/docs/surveys). 

Occasionally, we use in-app messages to tell users about certain things. We recognize that in-app messages can be intrusive and we want to avoid spamming our users with too many of them, too frequently. For that reason, we're judicious about the way in which we use them. 

We currently don't have a separate system for tracking in-app messages, so Words & Pictures currently owns the channel and is responsible for ensuring that messages aren't used excessively.

## Types of in-app message

Currently, there are three ways in which we can send in-app messages.

- **Notification bar:** A message displayed across the top of the page, activated using the [Notification Bar](https://github.com/PostHog/notification-bar-app) app.
- **In-app prompt:** A customizable pop-up which can be targeted to certain URLs and made to appear in the center of the page, or anchored in the corner. Activated using the `prompt` feature flag. [More info](/handbook/product/in-app-prompts).
- **Notifications:** A notification which is pushed into the navigation bar, as a number on the bell icon. Activated using the `changelog-notification` feature flag. 

## How we use in-app messages

We use each of the three channels above for different purposes, guided by the needs of a message and the level of intrustion. 

- The notification bar is only used for messages which must be urgently communicated to all users, such as messages about service disruption.
- In-app prompts can be used for a wide variety of purposes, including promotion of new features. However, users will only see one in-app prompt per day and should be targeted to appear only on relevant pages and to relevant users. In-app prompts shouldn't be used to message all users at once, or to direct users to another part of the app.
- Notifications can be used for a wide variety of purposes and are minimally intrusive. We regularly use notifications to promote new features via the PostHog changelog. 

## Creating new in-app prompts

In-app prompts are intrusive to users, but can be used for a wide variety of reasons. Therefore, if you create one we ask that you...

- Add the `Marketing` tag to the feature flag used to power your in-app prompt

This will enable others in the team to more easily keep track of what in-app messages are being shown, and what their content is. As a reminder:

- Users will only see one in-app prompt per day, at most
- In-app prompts should be used only on relevant pages and towards targeted cohorts

If you have any questions, please ask in #ask-posthog-anything on Slack. 


