---
title: Zapier
github: https://github.com/PostHog/posthog-zapier/
installUrl: https://zapier.com/apps/posthog/integrations
thumbnail: ../../cdp/thumbnails/zapier.svg
tags:
    - zapier-connector
---

The Zapier app for PostHog enables you to connect PostHog with _thousands_ of services through Zapier.

The following steps are at your disposal:

| Type    | Name               | Plan Required       |
| :------ | :----------------- | :------------------ |
| Action  | Capture Event      | Any, including free |
| Trigger | Action Performed   | Any **paid** plan   |
| Trigger | Action Defined     | Any **paid** plan   |
| Trigger | Annotation Created | Any **paid** plan   |

## Requirements

Connecting Zapier requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.30.0](https://posthog.com/blog/the-posthog-array-1-30-0) or later.

Not running 1.30.0? Find out [how to update your self-hosted PostHog deployment](https://posthog.com/docs/runbook/upgrading-posthog)!

You'll also need a Zapier account which can connect to the other services you want to use via this app.

## Connecting PostHog to other services with Zapier

[Our official Zapier app](https://zapier.com/apps/posthog/integrations) is compatible with PostHog Cloud, as well as with self-hosted instances. No additional setup needed.

## Creating a private PostHog connection with Zapier

Create a private Zapier app for PostHog easily with a few simple steps:

1. Clone or download t[his repository](https://github.com/PostHog/posthog-zapier/).
2. Enter its directory with `cd`.
3. Install Node modules.
    ```bash
    npm install
    ```
4. Update `DEFAULT_API_HOST` value in `src/utils.ts` (e.g. for PostHog Cloud it's `app.posthog.com` and for your self-hosted instance it may be `posthog.example.com`).
5. Globally install Zapier CLI.
    ```bash
    npm install -g zapier-platform-cli
    ```
6. Log into Zapier from the command line.
    ```bash
    zapier login
    ```
7. Either register a new integration on Zapier.
    ```bash
    zapier register "PostHog @ $YOUR_ORG"
    ```
    Or link to an existing one.
    ```bash
    zapier link
    ```
8. Push to Zapier.
    ```bash
    npm run push
    ```
9. Finish by filling in integration details in the [Zapier Platform dashboard](https://zapier.com/app/developer). And don't forget to invite users!

## Where can I find out more?

Further information is available in [Zapier's integration documentation](https://zapier.com/help/doc/how-to-get-started-with-posthog-on-zapier).

## FAQ

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)! to tell us what you think.

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal). 

