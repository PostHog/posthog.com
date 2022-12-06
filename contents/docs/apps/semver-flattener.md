---
title: SemVer Flattener
github: https://github.com/PostHog/semver-flattener-plugin
installUrl: https://app.posthog.com/project/apps?name=SemVer
thumbnail: ../../apps/thumbnails/semver-flattener.png
topics:
    - semver-flattener
---

### What does the SemVer Flattener do?

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

### What are the requirements for this app?

This app requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the Downsampler app?

1. Visit the 'Apps' page in your instance of PostHog.
2. Search for 'SemVer Flattener' and select the app, press Install.

That's it!

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the SemVer Flattener](https://github.com/PostHog/semver-flattener-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Paul D'Ambra](https://github.com/pauldambra) for creating this app. Cheers, Paul!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
