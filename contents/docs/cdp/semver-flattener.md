---
title: SemVer Flattener
github: 'https://github.com/PostHog/semver-flattener-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=SemVer'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/semver-flattener.png
tags:
  - semver-flattener
---

import Requirements from "./_snippets/requirements.mdx"
import FeedbackQuestions from "./_snippets/feedback-questions.mdx"
import PostHogMaintained from "./_snippets/posthog-maintained.mdx"

The SemVer Flattener splits a valid SemVer version into the following 

```
export interface VersionParts {
    major: number
    minor: number
    patch?: number
    preRelease?: string
    build?: string
}
```

And then flattens them onto an event. So, this...

```
{
    properties: {
        app_version: '22.7.11'
    }
}
```

Becomes this...


```
{
    properties: {
        app_version: '22.7.11'
        app_version__major: 22,
        app_version__minor: 7,
        app_version__patch: 11
    }
}
```

This is especially helpful for comparing versions when filtering in PostHog insights, as it isn't possible to correctly use string comparison in all situations. 

<Requirements />

### Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/pipeline)" tab in the left sidebar.
2. Search for 'SemVer Flattener' and select the transformation, press Install.

That's it!

## FAQ

### Is the source code for this transformation available?

PostHog is open-source and so are all transformations on the platform. The [source code for the SemVer Flattener](https://github.com/PostHog/semver-flattener-plugin) is available on GitHub.

### Who created this transformation?

We'd like to thank PostHog team member [Paul D'Ambra](https://github.com/pauldambra) for creating this transformation. Cheers, Paul!

<PostHogMaintained />

<FeedbackQuestions />
