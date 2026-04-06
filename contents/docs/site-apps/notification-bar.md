---
title: Notification Bar
thumbnail: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/apps/thumbnails/notification-bar.png
topics:
  - notification-bar
---

The Notification Bar is a [site app](/docs/site-apps) that displays a customizable banner on your website to notify users about product launches, sales, events, and more.

The bar appears at the top of your page as a full-width banner with your custom text, colors, and optional links. Users can dismiss it by clicking anywhere on the bar, and PostHog remembers the dismissal so it doesn't reappear.

## Use cases

Common ways to use the Notification Bar:

- **Product launches** – Announce new features or major updates to engage returning users
- **Sales and promotions** – Highlight limited-time offers or discounts
- **Events** – Promote upcoming webinars, conferences, or community events
- **Important notices** – Communicate maintenance windows, policy changes, or other important information

## Requirements

The Notification Bar requires either PostHog Cloud, or a self-hosted PostHog instance running [version 1.41.0](https://posthog.com/blog/the-posthog-array-1-41-0#one-more-thing-site-apps) or later.

Not running 1.41.0? Find out [how to update your self-hosted PostHog deployment](/docs/runbook/upgrading-posthog)!

You'll also need to manually opt in to the site apps feature, as it's currently in beta.

## Installation

1. Enable site apps by configuring your `posthog-js` initialization to include `opt_in_site_apps: true`:

   ```js
   posthog.init("<ph_project_token>", {
     api_host: "<ph_client_api_host>",
     opt_in_site_apps: true,
   });
   ```

2. In PostHog, go to the [Site apps](https://app.posthog.com/apps) tab under **Data pipelines**.
3. Click **+ New site-app**, find **Notification Bar**, and click install.
4. Configure the bar using the settings panel (see below).
5. Enable the app to start showing it on your site.

## Configuration

<AppParameters />

## How it works

When you enable the Notification Bar site app:

1. PostHog injects the notification bar code into your website via the `posthog-js` library.
2. The bar renders at the top of the page based on your configured settings (position, colors, message). It supports HTML, so you can include links and formatted text.
3. Users dismiss the bar by clicking on it (outside of any links).
4. If **Remember close** is set to **Yes**, the dismissal state is saved in the browser's `localStorage`. The bar won't reappear for that user unless you change the notification text, which resets the dismissal state.

The bar is rendered inside a [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_shadow_DOM), so its styles don't conflict with your site's CSS. You can optionally restrict it to specific domains using the **Domains** setting.

## FAQ

### Is the source code for this app available?

PostHog is open-source and so are all apps on the platform. The [source code for the Notification Bar](https://github.com/PostHog/notification-bar-app) is available on GitHub.

### Who created this app?

We'd like to thank PostHog team member [Marius Andra](https://github.com/mariusandra) for creating this app. Thanks, Marius!

### Who maintains this app?

This app is maintained by PostHog. If you have issues with the app not functioning as intended, please [let us know](http://app.posthog.com/home#supportModal)!

### What if I have feedback on this app?

We love feature requests and feedback! Please [tell us what you think](http://app.posthog.com/home#supportModal)!

### What if my question isn't answered above?

We love answering questions. Ask us anything via [our community forum](/questions), or [drop us a message](http://app.posthog.com/home#supportModal).
