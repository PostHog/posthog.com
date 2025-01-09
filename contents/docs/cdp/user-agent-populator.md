---
title: Populate event properties with user agent data
github: 'https://github.com/PostHog/user-agent-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=User%20Agent%20Populator'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/user-agent-enhancer.png
tags:
  - user-agent
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"

This transformation enhances incoming events by including browser & OS details from the `$useragent` property.

> **Note: ** This transformation is generally only needed when using clients that don't already set these properties, or when sending events directly from the server.

This transformation extracts the following properties from the provided `$useragent`:

| Property | Description | Example|
| --- | --- | --- |
| `$browser` | Name of the browser for the user | Chrome, Firefox |
| `$browser_version` | The version of the browser that was used | 70, 79 |
| `$os` | The operating system of the user | Windows, Mac OS X |
| `$browser_type` | The type of client that made the request | bot, browser |

<Requirements />

## Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline)" tab in the left sidebar.
2. Search for 'User Agent Populator'.
3. [Configure](#configure) the transformation by clicking on the settings icon.
4. Click the toggle to enable the transformation.

Once the transformation has been configured and enabled, it will begin to transform all new events which come into PostHog.

## Configuration

Before an transformation can be enabled in PostHog, it has to be configured.

<AppParameters />

## Using the User Agent Populator

This transformation works by parsing the `$useragent` property on events as they are ingested.
As a result, if an event is ingested without the `$useragent` (or `$user-agent`) property set, this transformation will do nothing.
This property can be set using any of our [client](/docs/integrate#client-libraries) or [server](/docs/integrate#server-libraries) libraries.

> **Note: ** Most of our client libraries will already automatically extract the `$browser`, `$browser_version`, and `$os` properties, so there is no need to set the `$useragent` property when using these libraries.

One common use-case for this transformation is populating client information when sending events from the server-side. Typically, a `UserAgent` header will be set when a client sends a request to your server, which your server can then forward to PostHog with the `$useragent` property.
This gives you an idea of what types of clients are using your service and allows you to create insights that filter based on these properties.

## What if my question isn't answered above?

We love answering questions. Ask us anything [in our community forums](/questions) or using the Q&A widget at the bottom of this page.

## FAQ

<CommunityMaintained />

<FeedbackQuestions />
