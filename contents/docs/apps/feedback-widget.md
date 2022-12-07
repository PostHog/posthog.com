---
title: Feedback Widget
github: https://github.com/PostHog/feedback-app
installUrl: https://app.posthog.com/project/apps?name=Feedback-App
thumbnail: ../../apps/thumbnails/feedback-widget.png
topics:
    - feedback-widget
---

### What does the Feedback Widget app do?

This app enables you to gather feedback from your users and ingest it as an event into PostHog. The app accomplishes this by injecting code into your website, such that a small widget appears to prompt users to share feedback. 

It looks like this...

![site-apps](../images/blog/feedback-widget.gif)

### What are the requirements for this app?

First, you need to opt in to the site apps beta. You'll need to be on PostHog 1.41.0 or later to do this, or PostHog Cloud. 

You can opt in to the beta by configuring your `posthog-js` initialization to include `opt_in_site_apps: true`. Please be aware you do this at your own risk.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

### How do I install the Feedback Widget?

1. First, opt into the site apps beta by setting your `posthog-js` initialization to include `opt_in_site_apps: true`.  
2. Visit the 'Apps' page in your instance of PostHog.
3. Search for 'Feedback App' and select the app, press Install.
4. Follow the on-screen steps to configure the app.

## Can I make my own site apps?

You certainly can. Check our tutorial about [how to build a site app in PostHog](/tutorials/build-site-app) to get started. 

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Feedback Widget](https://github.com/PostHog/downsampling-plugin) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team members [Luke Harries](https://github.com/lharries), [Marius Andra](https://github.com/mariusandra), and user [Ankit Ghosh](https://github.com/Growthfyi). Thanks, all!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [raise a bug report](https://github.com/PostHog/posthog/issues/new?assignees=&labels=bug&template=bug_report.md) to let us know!

### What if I have feedback on this app?

We love feature requests and feedback! Please [create an issue](https://github.com/PostHog/posthog/issues/new?assignees=&labels=enhancement%2C+feature&template=feature_request.md) to tell us what you think.

Or, if you see the feedback widget enabled, use that!

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our Support page](/questions).

You can also [join the PostHog Community Slack group](/slack) to collaborate with others and get advice on developing your own PostHog apps.
