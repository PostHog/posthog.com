---
title: Hubspot
github: 'https://github.com/PostHog/hubspot-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Hubspot'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/hubspot.svg
tags:
  - hubspot
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import PostHogMaintained from "./_snippets/posthog-maintained.mdx"

Send data from PostHog to Hubspot whenever an `$identify` event occurs. That is, whenever PostHog successfully identifies a user. This is useful for syncing customer information between both PostHog and Hubspot.

<Requirements />

You'll also need a Hubspot account to connect to.

## What information can I push to Hubspot from PostHog?

Currently, this integration supports sending the following data to Hubspot:

-   Email addresses
-   First names
-   Last names
-   Phone numbers
-   Company names
-   Company website URLs

This information can be sent whenever an `$identify` event occurs in PostHog.

No other information can currently be sent to PostHog using this destination. If this destination exists in a chain where the above information would be filtered out (for example, by using the Property Filter app) then filtered information cannot be sent to Hubspot.

## Configuration

<AppParameters />

## FAQ

### How do I install the Hubspot destination on PostHog?

1. Log in to your PostHog instance
2.  Click "[Data pipeline](https://us.posthog.com/apps)" in the left sidebar
3. Search for 'Hubspot'
4. Select the destination, press 'Install' and follow the on-screen instructions

### Is the source code for this destination available?

PostHog is open-source and so are all destinations on the platform. The [source code](https://github.com/PostHog/hubspot-plugin) is available on GitHub.

### Who created this destination?

A lot of people contributed to this destination! We'd like to thank...

-   [Kunal](https://github.com/kpthatsme)
-   [Yakko Majuri](https://github.com/yakkomajuri)
-   [Marcus Hyett](https://github.com/marcushyett-ph)
-   [Marius Andra](https://github.com/mariusandra)
-   [Joe Martin](https://github.com/joethreepwood)
-   [Paul D'Ambra](https://github.com/pauldambra) and
-   [OneshotEngineering](https://github.com/oneshot-engineering)

For creating this. Thanks, all!

<PostHogMaintained />

<FeedbackQuestions />
