---
title: 'Targeting feature flags on groups, pages, machines, and more'
date: 2023-08-14T00:00:00.000Z
author:
  - ian-vanagas
showTitle: true
sidebar: Docs
tags:
  - feature flags
---

To decide what value to return, PostHog’s feature flag service uses a flag key and an entity. Which entity to use it up to you, and these don't necessarily need to be _users_ – you can also target organizations, pages, machines, and more. 

This tutorial shows you how to target these non-user entities in your use of feature flags.

## Targeting groups, teams, or organizations

If you enabled [group analytics](/docs/product-analytics/group-analytics) and set up group idenitifcation, targeting by groups, teams, or organizations is easy. When creating your feature flag, change the "Match by" value under "Release conditions" your group type name, add any conditions you want, and roll out the flag.

![Match by organization](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/group-page-machine-flags/org.png)

### Property or cohort filter

Another way to target an organization or team is to use the email or similar repeated identifier of a user. This enables you to filter for groups without using group analytics. Similarly, you can create a cohort for the organization, then use that as a condition.

![Email condition](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/tutorials/group-page-machine-flags/email.png)

## Targeting pages

Another target you might want is pages. For example, to ensure components are consistent across a set of pages, test a new pricing page, or customize a page's experience based on how many times it has been viewed.

### Payloads

You can use [feature flag payloads](/docs/feature-flags/payloads) to customize the experience depending on the page. For example, if you want a button to change colors depending on the page URL. Payloads lets you set multiple values on one feature flag which you can evaluate and use in your app.

To do this, create your flag with a payload such as:

```json
{
  "signup": "red",
  "login": "blue",
  "home": "green"
}
```

In your app, get feature flag payloads, write logic to check the page URL, and use a combination of the page URL and flag payload to adjust your button. For a Next.js component, this would look like this:

```js-web
'use client'
import { useFeatureFlagPayload } from 'posthog-js/react'
import { usePathname } from 'next/navigation'

export default function Button() {

  const payload = useFeatureFlagPayload('button-colors')
  const pathname = usePathname()

  let color = 'blue'
  if (payload && Object.keys(payload).includes(pathname.slice(1))) {
    color = payload[pathname.slice(1)]
  } 

  return (
    <button style={{ backgroundColor: color }}>
      Click me! I am a useful button component
    </button>
  )
}
```

### Cohort

If instead, you want to target users who visited a page repeatedly, you can create and use a static cohort. For example, if you wanted to target a flag to show a new pricing page for people who have visited the pricing page repeatedly.

1. Create a cohort for people who had multiple pageview events
2. Duplicate as a static cohort.
3. Use the static cohort as a condition for your feature flag

> **Why can’t I use a behavioral cohort directly?** Calculating a behavioral (based on events) cohorts is slow. Feature flags care about speed. Adding behavioral cohorts to flag evaluation would significantly slow them down. Read [a full explanation in our docs](/docs/feature-flags/common-questions#why-cant-i-use-a-cohort-with-behavioral-filters-in-my-feature-flag).

![Cohort creation video](https://res.cloudinary.com/dmukukwp6/video/upload/v1710055416/posthog.com/contents/images/tutorials/group-page-machine-flags/cohort.mp4)

## Targeting services, machines, devices, applications

Another entity you might want to target is services, machines, or devices. For example, you might want to roll out a [canary release](/tutorials/canary-release) to some of your servers or activate a flag in one region but not another.

### Custom user value

A user in PostHog is just a distinct ID string connected to events. Although on the frontend, it is generated and connected to a real user's sessions, on the backend it could represent anything. This means you can use service, machine, device, or application IDs as the distinct ID and feature flags will still work with them this way.

To do this, start by capturing an event with the entity ID (like server ID).

```python
from posthog import Posthog

posthog = Posthog('<ph_project_api_key>', host='<ph_instance_address>')

posthog.capture(
  "canada-cloud-1", 
  "server_identify", 
  {
    "server_id": "canada-cloud-1"
  }
)
```

Next, create a feature flag and roll it out to match the properties of your desired servers. In this case, `server_id` equals `canada-cloud-1`.

Finally, add your feature flag call using your server ID:

```python
from posthog import Posthog

posthog = Posthog('<ph_project_api_key>', host='<ph_instance_address>')

posthog.feature_enabled('server-rollout', 'canada-cloud-1')
```

Now, you can target your server with feature flags. You can use a similar workflow with services, machines, or devices as well as any of our other [backend SDKs](/docs/libraries) or even our [API](/docs/api).

### One-time property value

A common pattern we use for many of our site apps is show a feature, set a property on the user once the "business code" executes, and check for that property to not show again. This pattern is useful if you want interactions with features or services to only happen once.

> 📖 Read a full implementation of this in "[How to set up one-time feature flags](/tutorials/one-time-feature-flags)."

To do this, create a flag where `is_first_interaction` is not `false`. 

Next, implement the flag and add a capture call after the flag to flip the `is_first_interaction` property.

```python
from posthog import Posthog

posthog = Posthog('<ph_project_api_key>', host='<ph_instance_address>')

is_first_interaction = posthog.feature_enabled(
  'first-interaction', 
  'ian@posthog.com'
)

if (is_first_interaction):
	# Do cool stuff here
	
	posthog.capture(
    'did_cool_stuff',
    'ian@posthog.com',
    {
      'is_first_interaction': False
    }
  )

```

The flag now returns `false` meaning the user gets a different experience on all subsequent interactions.

## Further reading

- [How to bootstrap feature flags in React and Express](/tutorials/bootstrap-feature-flags-react)
- [How to add popups to your React app with feature flags](/tutorials/react-popups)
- [How to use Next.js middleware to bootstrap feature flags](/tutorials/nextjs-bootstrap-flags)
