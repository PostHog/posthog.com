---
date: 2022-04-25
title: 'Array 1.35.0: Introducing SAML, world map view and new plugins'
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-array-blog.png
featuredImageType: full
excerpt: >-
  PostHog 1.35.0 introduces activity logs and a brand new way of visualizing
  where your users are coming from with the World Map. Additionally we now
  support organization-level SAML login on both Cloud and Self-Hosted instances.
  Plus check out your Project Homepage for a few additional goodies.
category: PostHog news
tags:
  - Product updates
  - Release notes
---

PostHog 1.35.0 introduces audit logs and a brand new world map view to help you visualize where your users are coming from. Additionally, we now support organization-level SAML login on both Cloud and Self-Hosted instances. Plus, check out your project homepage for a few additional goodies!

We've also recently launched a new newsletter, which we send once every two weeks! [Subscribe today](http://newsletter.posthog.com/subscribe) to hear about our latest news, what we're reading and how to get the most out of PostHog. 

<blockquote class='warning-note'>
<b>IMPORTANT!</b> If you use SAML, please read our <a href="#deprecation-and-removal-notices">deprecation notices below</a>.
</blockquote>

## PostHog 1.35.0 release notes

> Wondering how to upgrade a self-hosted instance? Check out our [upgrade guide](/docs/runbook/upgrading-posthog).

**Release highlights:**
- [Activity log](#new-activity-log)
- [World map](#new-world-map)
- [Multi-tenant SAML](#new-multitenant-saml)
- [Project homepage updates](#improvement-project-homepage-updates)
- [New Avo plugin](#new-avo-plugin)

### New: Activity log
<img width="827" alt="A screenshot of the app showing the new 'history' tab on the feature flags page. In the screenshot you can see three recent changes by PostHog staff to our feature flags" src="https://user-images.githubusercontent.com/984817/164484091-f5dfce0b-c400-4699-ac55-642ccc2bc55b.png" />

Ever wondered who deleted that feature flag, or merged those two people? Wonder no more with the new activity log!

You can now view changes to feature flags and persons made in the UI and see who made them, when. Watch out for the activity log being added to more pages in future releases. Or [tell us](https://app.posthog.com/home#supportModal) where we should add it next!

### New: World map
![PostHog - World Map](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/1_35_0_map.png)

A staple request of every PostHog hackathon has finally been realized, with the introduction of **world map** – a new Trends chart type which visualizes breakdowns by country (based on [GeoIP](https://posthog.com/integrations/geoip) data). Intuitively compare how your traffic and usage differ across countries of the world!

### New: Multi-tenant SAML

SAML has been a big focus point in this update (check the deprecation notices below for more info) and the upshot is that you can now configure SAML login on both self-hosted and PostHog Cloud instances! 

You can configure up to one SAML provider per organization, but check out our [SSO docs](/sso) for more information on how to get started with SAML on PostHog. 

<blockquote class='warning-note'>
<b>IMPORTANT!</b> If you use SAML please read our <a href="#deprecation-and-removal-notices">deprecation notices below</a>. SAML support is only available on Enterprise plans.
</blockquote>

### Improvement: Project homepage updates
![PostHog - Project Homepages](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/1_34_0-homepage.png)

In the last update, we introduced [project homepages](/blog/the-posthog-array-1-34-0#new-homepage) to help you find information quickly. Now, we've made them even better!

We've added a new homepage card which lists your recently viewed insights to the project homepage, as well as lists of recent recordings and newly identified persons. All of this is to help give you quick access to commonly-visited pages and recent insights.

### New: Avo plugin
![PostHog - Avo plugin](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/array/1_35_0_avo.png)

We're big fans of [the Avo data governance platform](https://www.avo.app/) and were lucky enough to meet the team in person at our recent Iceland offsite. Now, we've launched a new plugin too!

The plugin sends event schemas to the Avo Inspector as they are ingested by PostHog, enabling you to detect inconsistencies in your schema without sharing any user data. Install it from the plugin tab to get started, or find out more in [Avo's documentation](https://www.avo.app/docs/workspace/connect-inspector-to-posthog#step-2-enable-avo-inspector-plugin-in-posthog). 

### Other improvements & fixes
Version 1.35.0 also adds hundreds of other fixes and improvements, including...

- **New**: Warnings before leaving an insight with unsaved changes
- **New**: Page titles that fully reflect your place in the PostHog app
- **New**: "Out-of-band" events shown in session recordings

### Deprecation and removal notices
- From PostHog 1.35.0 onwards, SAML will change from being instance-based to domain-based. This means that SAML configurations will take place in the PostHog UI. You will be able to have multiple SAML providers on the same instance (segment by domain, from the user's email address). Please review our [SSO docs](/sso) for more details.
- If you use SAML on a self-hosted instance and have enabled SAML enforcement (previously `SAML_ENFORCED` environment variable) then this environment configuration has been deprecated too. You will now need to configure SSO enforcement via Authentication domains. Check the [SSO docs](/sso) for more details.

## Share your feedback
We'd love to hear anything you have to say about PostHog, good or bad. As a thank you, we'll share some awesome [PostHog merch](https://merch.posthog.com).

Want to get involved? [Email us to schedule a 30 minute call](mailto:hey@posthog.com) with one of our teams to help us make PostHog even better!

## Contributions from the community
We always welcome contributions from our community and this time we want to thank the following people...

- [Michael Cavallaro](https://github.com/Cavallando), for Android bug fixes
- [Rory Crispin](https://github.com/RoryCrispin), for Docs improvements
- [Rahul](https://github.com/rahul3v), for website improvements
- [Alberto](https://github.com/albtsantos), for plugin enhancements
- [Joe Trollo](https://github.com/joetrollo), for Kafka and SASL support
- [Björn and the rest of the Avo team](https://github.com/bjornj12), for the Avo plugin

Do you want to get involved in making PostHog better? Check out our [contributing resources](/docs/contribute) to get started, or head to [our community page](/posts). We also have a [list of Good First Issues](https://github.com/PostHog/posthog/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) for ideas on where you can contribute!

## Open roles at PostHog
Want to join us in helping make more products successful? We're currently hiring for remote candidates in any of the following roles:

- [Growth Engineer](https://apply.workable.com/posthog/j/F6B73AD2F6/)
- [Site Reliabliulity Engineer - Kubernetes](https://apply.workable.com/posthog/j/7A6F1142D0/)
- [Community Engineer](https://apply.workable.com/posthog/j/449572FD18/)
- [Full Stack Engineer](https://apply.workable.com/posthog/j/2682B00B76/)
  
Curious about what it's like to work at PostHog? Check out our [careers page](https://posthog.com/careers) for more info about our all-remote team and transparent culture. Don’t see a specific role listed? That doesn't mean we won't have a spot for you. [Send us a speculative application!](mailto:careers@posthog.com)

<hr/>

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog) for more PostHog news!_

<ArrayCTA />
