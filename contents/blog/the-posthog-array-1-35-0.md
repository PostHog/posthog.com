---
date: 2022-04-25
title: Array 1.35.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
categories: ["Release notes", "Product updates"]
featuredImage: ../images/blog/posthog-array-blog.png
featuredImageType: full
excerpt: PostHog 1.35.0 introduces a brand new way of visualizing where your users are coming from with the World Map. Additionally we now support organization-level SAML login on both Cloud and Self-Hosted instances. Plus check out your Project Homepage for a few additional goodies.
---

PostHog 1.35.0 introduces a brand new way of visualizing where your users are coming from with the World Map. Additionally we now support organization-level SAML login on both Cloud and Self-Hosted instances. Plus check out your Project Homepage for a few additional goodies.

<blockquote class='warning-note'>
<b>IMPORTANT!</b> If you use SAML please read our <a href="deprecation-and-removal-notices">deprecation notices below</a>.
</blockquote>

## PostHog 1.35.0 release notes

> Wondering how to upgrade a self-hosted instance? Check out our [upgrade guide](/docs/self-host/configure/upgrading-posthog).

**Release highlights:**
- [Activity Log](#new-activity-log)
- [World Map](#new-world-map)
- [Multitenant SAML](#new-multitenant-saml)
- [Project Homepage Updates](#improvement-project-homepage-updates)

### New: Activity Log

[[TODO: screenshot goes here]]

[[TODO: @pauldambra Could you give a brief spiel about activity log here?]]

### New: World Map

[[TODO: screenshot goes here]]

[[TODO: @Twixes Could you give a brief spiel about world map here?]]

### New: Multitenant SAML

[[TODO: @camerondeleone do you have a screenshot that could go here about this feature? https://github.com/PostHog/posthog/pull/9225]]

You can now configure SAML login on both self-hosted and cloud instances! You can configure up to one SAML provider per organization. 

Check out our [SSO docs](/sso) for more information on how to get started.

<blockquote class='warning-note'>
<b>IMPORTANT!</b> If you use SAML please read our <a href="deprecation-and-removal-notices">deprecation notices below</a>.
</blockquote>

### Improvement: Project Homepage Updates

[[TODO: screenshot goes here]]

[[TODO: @rcmarron Could you give a brief summary of the recent updates to project homepage that have been going on since the last version? Namely recently viewed persons, insights, and recordings.]]

### Other improvements & fixes
Version 1.35.0 also adds hundreds of other fixes and improvements, including...

- **Improved**: Warn before leaving insight with unsaved changes
- **Improved**: Redesigned funnels view
- **Improved**: More specific breadcrumbs
- **Improved**: Show "out-of-band" events in recordings

### Deprecation and removal notices
- Starting from PostHog 1.35.0 SAML will change from being instance-based to domain-based. This means that SAML configurations will take place in the PostHog UI. You will be able to have multiple SAML providers on the same instance (segment by domain, from the user's email address). Please review our [SSO docs](/sso) for more details.
- If you use SAML on a self-hosted instance and have enabled SAML enforcement (previously `SAML_ENFORCED` environment variable) then this environment configuration has been deprecated too. You will now need to configure SSO enforcement via Authentication domains (see [SSO docs](/sso) for more details.)

## Give us your feedback
We’re always working on improving the product experience and would love to talk to you! Please join one of our Product, Engineering, or Marketing team members on a quick 30-min call to help us understand how to improve. Schedule directly [on Calendly](https://calendly.com/posthog-feedback). As a thank you for your time, we'll be giving away awesome [PostHog merch](https://merch.posthog.com)!

## Contributions from the community
Want to help improve PostHog? We always welcome contributions from our community! Check out our [contributing resources](/docs/contribute) to get started, or head to [our Slack group](/slack).

We would also specifically like to thank PostHog team members [@hazzadous](https://github.com/hazzadous), [@guidoiaquinti](https://github.com/guidoiaquinti) and [@liyiy](https://github.com/liyiy) for their efforts on this particularly stubborn release. 

### Community shoutouts
This month we also want to say thank you to the following people...

[[TODO: place community shoutouts here]]

## Open roles at PostHog
Want to join us in helping make more products successful? We're currently hiring for remote candidates in any of the following roles:

[[TODO: place open roles here]]
  
Curious about what it's like to work at PostHog? Check out our [careers page](https://posthog.com/careers) for more info about our all-remote team and transparent culture. We also welcome speculative applications for roles from exceptional candidates.

<hr/>

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog) for more PostHog news!_

<ArrayCTA />
