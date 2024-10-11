---
title: Quick start: Ghost analytics and session replay
date: 2024-10-11
featuredTutorial: false
author:
  - danilo-campos
tags:
  - product analytics
  - web analytics
  - session replay
---

With all the drama in the world of WordPress, it’s a great time to explore Ghost, a robust blogging and newsletter CMS. You can [self-host](https://ghost.org/docs/install/) Ghost on your own server, or lean on managed hosting from [Ghost.org](https://ghost.org).

However you host, adding PostHog for [web analytics](/docs/web-analytics) and [session replay](/docs/session-replay) is a quick process that gives you immediate insight about how people are finding your site, enjoying your writing and exploring your archives. PostHog accounts are free, so sign up and follow along.

## Adding PostHog using Ghost’s code injection

Grab the PostHog script:

<Snippet />

In your Ghost publication’s settings, click the Settings button, labeled with a gear:

![Ghost settings menu](https://res.cloudinary.com/dmukukwp6/image/upload/ghost_settings_e1f6c4b436.png)

Scroll toward the bottom of the sidebar, looking for **Advanced**, and select **Code Injection**. Open the code injection setting:

![Code injection menu in Ghost](https://res.cloudinary.com/dmukukwp6/image/upload/code_injection_menu_66fa301caf.png)

Paste the PostHog script into the **Site header** code block:

![Ghost code injection settings](https://res.cloudinary.com/dmukukwp6/image/upload/ghost_settings_e1f6c4b436.png)

Click **Save**, and you’re all set. Explore your blog to generate some activity, then have a look around your PostHog account to see the results.

![PostHog analytics dashboard](https://res.cloudinary.com/dmukukwp6/image/upload/analytics_e7d33fb290.png)

Hit the web analytics tab to see the basics, including your top-performing content in the paths report. Channels will show you high level traffic sources. Use the retention report to see how often readers are coming back once they find you.

If enabled, session replay will give you a look at real reader behavior through your site. Click its tab to explore replays.

## Further reading

- [What to do after installing PostHog in 5 steps](/tutorials/next-steps-after-installing)
- [How to track performance marketing in PostHog](/tutorials/performance-marketing)
- [How to do cookieless tracking with PostHog](/tutorials/cookieless-tracking)