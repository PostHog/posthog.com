---
title: Filter event properties
github: 'https://github.com/PostHog/property-filter-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=Property%20Filter'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/property-filter.png
tags:
  - property-filter
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import CommunityMaintained from "./_snippets/community-maintained.mdx"

This transformation sets all specified properties on ingested events to `null`, effectively preventing PostHog from collecting information you do not want it to use.

It is [used by teams such as WittyWorks to protect user privacy](https://posthog.com/customers/wittyworks) by removing unneeded geographic data.

<Requirements />

## Installation

1. Log in to your PostHog instance
2. Click "[Data pipeline](https://us.posthog.com/pipeline)" in the left sidebar
3. Search for 'Property Filter' press 'Install'
4. Configure the by transformation by following the onscreen instructions.

> **Note:** This transformation effectively removes information from PostHog events by setting properties to `null`. Apps on PostHog run in sequence, so it usually makes sense to place this transformation at the _end_ of a sequence.

Note: If you are filtering `$ip`, `event.ip` will also be set to null.

## Does this filter properties for retrospective events?

No. The Property Filter transformation will only work on events ingested _after_ it was enabled.

## Configuration

<AppParameters />

## FAQ

### Is the source code for this transformation available?

PostHog is open-source and so are all transformations on the platform. The [source code for the Property Filter transformation](https://github.com/PostHog/property-filter-plugin) is available on GitHub.

### Who created this transformation?

This transformation was created by [community members at WittyWorks](/customers/wittyworks) to protect the privacy of their users. We'd like to thank [Christian](https://github.com/Christian-aman-insurely) and [Lukas Kahwe Smnith](https://github.com/lsmith77) for creating the Property Filter.

<CommunityMaintained />

<FeedbackQuestions />
