---
title: How to use session recordings to improve your support experience
sidebar: Docs
showTitle: true
author: ['ian-vanagas']
date: 2022-12-22
featuredImage: ../images/tutorials/banners/session-recordings-for-support.png
topics: ['session recordings', 'sentry']
---

On top of being useful for understanding users’ behavior in your product, session recordings can help you solve problems with your product. You can use them to figure out issues, understand why those issues are happening, and work to fix them. Using session recordings helps you provide a better experience to users, and this is what we’ll go over in this tutorial.

## Finding relevant sessions and users needing support

When a user reports an issue, a session recording can turn a long conversation into a short recording viewing. They also include easy access to relevant properties (like OS, browser, and custom properties). This helps your team diagnose issues and find solutions faster.

To find recordings from a specific user needing support, you can search for the user in PostHog and check their session recordings tab. You can also filter on the sessions recording page for specific users or properties. For example, to find a session recording where I was having a problem, I can filter for the Rageclick event, email is mine, and within the last 24 hours.

![Filters](../images/tutorials/session-recordings-for-support/filter.png)

Once you’ve found a relevant recording, you click the toggle above the events to show the ones matching your filters. You can also search for other events within the session (such as errors) and go straight there. This brings you to times when those events happened, and added context through event properties.

Finding the session recording connected to the issue saves you time in multiple ways. You don’t have to go back and forth with the user for details. You get the session and data context which enables you to respond better. Finally, if it is a bug, you have the steps to debug and recreate you can easily share with your team.

### Sharing recordings as a support team

Once you’ve found a session recording, you can share a link with your teammates (including a timestamp). This helps them access the recording and details (like the user and their properties) quickly. Just click the share button at the top of the recording viewer to open this modal.

![Share](../images/tutorials/session-recordings-for-support/share.png)

You can share these links on the platforms you do support such as Zendesk, Slack, GitHub, HubSpot, and Salesforce. This is valuable context for other people supporting that user. It is also useful for development teams who require data on the user and “steps to recreate the issue” so they can solve the issue. It is a simple, useful connection between your support tools and PostHog.

## Combining error monitoring and session recording

You can combine PostHog’s suite of product tools for a better support experience. Because errors hurt user experience, capturing and monitoring them is vital to triage and resolve them. Using custom event capture and integrations can enable PostHog to capture errors. You can then use that error data to analyze session recordings and provide support.

The most basic way to do this is to send custom error events in problem areas using a basic capture call. In an extremely basic form, it looks like this:

```js
function get_pizza() {
  return 'pineapple'
}

try {
  let pizza = get_pizza()
  if (pizza === 'pineapple') throw "no pineapple on pizza"
}

catch(err) {
  posthog.capture('error', { details: err });
}
```

You could then use the `error` event to understand their frequency, details, and context in session recordings. Every language, library, framework, and project has a different way of handling errors, and the customizability of PostHog can fit into all of them.

### Console logs in recordings

PostHog also includes the option to record console logs. This is useful for getting errors that log to the console. To turn this on, go to project settings and under recordings toggle on “Capture console logs.” This adds console logs (as well as errors and warnings) to a separate tab with the details for each.

![Console](../images/tutorials/session-recordings-for-support/console.png)

Within a recording, you can search for the specific console logs you’re looking for, and see the details about them (such as strings or objects they include).

### Setting up and using Sentry to get error monitoring data

A more automated way of getting error data into PostHog is using our Sentry integration. Sentry is an application performance and error monitoring product that integrates with your code to capture errors and provide details about them (like the stack trace).

You can set up our two-way integration to send user data related to an error to Sentry and an `$exception` event to PostHog with a link to Sentry. This enables you to combine Sentry’s error monitoring tools with PostHog’s product tools for a better support experience.

To set up Sentry, initialize it along with PostHog and call the PostHog Sentry integrations.

<MultiLanguage>

```js
import posthog from 'posthog-js'
import * as Sentry from '@sentry/browser'

posthog.init('<ph_project_api_key>')

Sentry.init({
    dsn: '<your Sentry DSN>',
    integrations: [new posthog.SentryIntegration(posthog, 'your organization', project-id)],
})
```

```python
import sentry_sdk
from posthog.sentry.posthog_integration import PostHogIntegration

PostHogIntegration.organization = "orgname"

sentry_sdk.init(
    dsn="https://examplePublicKey@o0.ingest.sentry.io/0",
    integrations=[PostHogIntegration()],
)

# Also set `posthog_distinct_id` tag
from sentry_sdk import configure_scope

with configure_scope() as scope:
    scope.set_tag('posthog_distinct_id', 'some distinct id')
```

</MultiLanguage>

Once set up, this creates exception events with the properties `Sentry URL` (with a link to the details in Sentry) and `Sentry tags` (with a link to the user and recording in PostHog). You can use these events to filter session recordings further, combining session recordings with the error data Sentry captures.

![Exceptions](../images/tutorials/session-recordings-for-support/exception.png)

Doing this enables you to further improve the support experience for users, especially technical ones. It speeds up the debugging and triaging process for your team, giving you data and details on what is going wrong. Finally, it enables the product to be continually improved and fixed faster, which leads to a higher quality overall product.

## Further reading

- [How to use filters + session recordings to understand user friction](/tutorials/filter-session-recordings)
- [How to correlate errors with product performance using Sentry](/tutorials/sentry-plugin-tutorial)
- [A non-technical guide to understanding data in PostHog](/tutorials/non-technical-guide-to-data)
