---
title: SemVer Flattener
github: 'https://github.com/PostHog/semver-flattener-plugin'
installUrl: 'https://app.posthog.com/project/apps?name=SemVer'
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/cdp/thumbnails/semver-flattener.png
tags:
  - semver-flattener
---

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

## Requirements

This app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### Installation

1. In PostHog, click the "[Data pipeline](https://us.posthog.com/apps)" tab in the left sidebar.
2. Search for 'SemVer Flattener' and select the app, press Install.

That's it!

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the SemVer Flattener](https://github.com/PostHog/semver-flattener-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Paul D'Ambra](https://github.com/pauldambra) for creating this app. Cheers, Paul!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 
