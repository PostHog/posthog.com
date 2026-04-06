---
title: Notification Bar
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/apps/thumbnails/notification-bar.png
topics:
  - notification-bar
---

The Notification Bar site app displays a customizable banner at the top of your website. Use it to announce product updates, promotions, events, or important notices to visitors.

## How it works

Once installed and configured, the notification bar injects a banner at the top of every page where `posthog-js` is loaded. It renders inside a [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM) element so its styles don't conflict with your site.

The banner:

- Displays your custom message with support for HTML, including links and bold text
- Can be styled with custom background, text, and link colors
- Supports **sticky** (fixed at top of viewport) or **top of page** (scrolls with content) positioning
- Can be dismissed by clicking anywhere on the bar (outside of links)
- Optionally remembers when a user dismisses it using `localStorage`, so it won't reappear until you change the message
- Can be restricted to specific domains using a comma-separated list

<CalloutBox icon="IconInfo" title="Site apps are in beta" type="fyi">

Site apps let you inject code from PostHog into your website via `posthog-js`. You need to opt in by setting `opt_in_site_apps: true` in your posthog-js configuration.

</CalloutBox>

## Use cases

- **Product launches** – Announce new features or product releases
- **Promotions** – Highlight sales, discounts, or limited-time offers
- **Events** – Promote upcoming webinars, conferences, or community events
- **Status updates** – Communicate maintenance windows or known issues
- **Navigation** – Direct users to important pages like documentation or signup

## Requirements

The Notification Bar requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.41.0](https://posthog.com/blog/the-posthog-array-1-41-0#one-more-thing-site-apps) or later.

You also need to opt in to the site apps beta by setting `opt_in_site_apps: true` in your `posthog-js` initialization.

## Installation

1. Configure your `posthog-js` initialization to include `opt_in_site_apps: true`:

   ```js
   posthog.init("<ph_project_token>", {
     api_host: "<ph_client_api_host>",
     opt_in_site_apps: true,
   });
   ```

2. In PostHog, go to **Data** > **Pipeline** > **Destinations**
3. Search for **Notification Bar** and click **+ Create**
4. Configure the bar with your message, colors, and positioning
5. Click **Save** and enable the destination

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Notification Bar](https://github.com/PostHog/notification-bar-app) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Marius Andra](https://github.com/mariusandra) for creating this app. Thanks, Marius!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, have feedback, or your question isn't answered above, please [let us know](http://app.posthog.com/home#supportModal) or ask via [our community forum](/questions).
