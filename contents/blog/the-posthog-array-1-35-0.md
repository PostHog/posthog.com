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
excerpt: PostHog 1.35.0 introduces audit logs and a brand new way of visualizing where your users are coming from with the World Map. Additionally we now support organization-level SAML login on both Cloud and Self-Hosted instances. Plus check out your Project Homepage for a few additional goodies.
---

PostHog 1.35.0 introduces audit logs and a brand new World Map view to help you visualize where your users are coming from. Additionally we now support organization-level SAML login on both Cloud and Self-Hosted instances. Plus, check out your project homepage for a few additional goodies!

We've also recently launched a new newsletter, which we send once every two weeks! Subscribe today to hear about our latest news, what we're reading and how to get the most out of PostHog. Each issue also includes a bonus hedgehog cartoon!

<blockquote class='warning-note'>
<b>IMPORTANT!</b> If you use SAML, please read our <a href="deprecation-and-removal-notices">deprecation notices below</a>.
</blockquote>

## PostHog 1.35.0 release notes

> Wondering how to upgrade a self-hosted instance? Check out our [upgrade guide](/docs/self-host/configure/upgrading-posthog).

**Release highlights:**
- [Activity Log](#new-activity-log)
- [World Map](#new-world-map)
- [Multitenant SAML](#new-multitenant-saml)
- [Project Homepage Updates](#improvement-project-homepage-updates)

### New: Activity Log

<img width="827" alt="Screenshot 2022-04-21 at 15 45 07" src="https://user-images.githubusercontent.com/984817/164484091-f5dfce0b-c400-4699-ac55-642ccc2bc55b.png">

Ever wondered who deleted that feature flag, or merged those two people? Wonder no more with the new Activity Log™️!

You can now view changes to feature flags and persons made in the UI and see who made them, when. Watch out for the Activity Log being added to more pages in future releases. Or join [our community Slack](https://posthog.com/community) and tell us where we should add it next.

### New: World Map

[[TODO: screenshot goes here]]

[[TODO: @Twixes Could you give a brief spiel about world map here?]]

### New: Multitenant SAML

[[TODO: @camerondeleone do you have a screenshot that could go here about this feature? https://github.com/PostHog/posthog/pull/9225]]

You can now configure SAML login on both self-hosted and PostHog Cloud instances! You can configure up to one SAML provider per organization. 

Check out our [SSO docs](/sso) for more information on how to get started with SAML on PostHog. 

<blockquote class='warning-note'>
<b>IMPORTANT!</b> If you use SAML please read our <a href="deprecation-and-removal-notices">deprecation notices below</a>.
</blockquote>

### Improvement: Project homepage updates

[[TODO: screenshot goes here]]

To help you quickly get to the insights you're visiting frequently, we added a list of 'your recently viewed insights' to the project homepage. Additionally, we added lists for 'recent recordings' and 'newly seen persons' to give you quick access to these commonly-visited pages.

### Other improvements & fixes
Version 1.35.0 also adds hundreds of other fixes and improvements, including...

- **Improved**: Warnings before leaving an insight with unsaved changes
- **Improved**: A new, redesigned funnels view
- **Improved**: More specific breadcrumbs in the navigation
- **Improved**: "Out-of-band" events shown in sessiong recordings

### Deprecation and removal notices
- From PostHog 1.35.0 onwards, SAML will change from being instance-based to domain-based. This means that SAML configurations will take place in the PostHog UI. You will be able to have multiple SAML providers on the same instance (segment by domain, from the user's email address). Please review our [SSO docs](/sso) for more details.
- If you use SAML on a self-hosted instance and have enabled SAML enforcement (previously `SAML_ENFORCED` environment variable) then this environment configuration has been deprecated too. You will now need to configure SSO enforcement via Authentication domains. Check the [SSO docs](/sso) for more details.

## Give us your feedback
We’re always working on improving PostHog and would love to talk to you! Please [schedule a 30 minute call](https://calendly.com/posthog-feedback) with one of our Product, Engineering, or Marketing team members to help us understand how to improve. As a thank you for your time, we'll be giving away awesome [PostHog merch](https://merch.posthog.com)!

## Contributions from the community
Want to help improve PostHog? We always welcome contributions from our community! Check out our [contributing resources](/docs/contribute) to get started, or head to [our Slack group](/slack).

### Community shoutouts
This month we also want to say thank you to the following people...

[[TODO: place community shoutouts here]]

Do you want to get involved in making PostHog better? Check out our [list of Good First Issues](https://github.com/PostHog/posthog/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) for ideas on where you can contribute!

## Open roles at PostHog
Want to join us in helping make more products successful? We're currently hiring for remote candidates in any of the following roles:

- [Growth Engineers](https://apply.workable.com/posthog/j/F6B73AD2F6/)
- [Site Reliabliulity Engineers - Kubernetes](https://apply.workable.com/posthog/j/7A6F1142D0/)
- [Community Engineers](https://apply.workable.com/posthog/j/449572FD18/)
- [Full Stack Engineers](https://apply.workable.com/posthog/j/2682B00B76/)
  
Curious about what it's like to work at PostHog? Check out our [careers page](https://posthog.com/careers) for more info about our all-remote team and transparent culture. Don’t see a specific role listed? That doesn't mean we won't have a spot for you. [Send us a speculative application!](mailto:careers@posthog.com)

<hr/>

_Follow us on [Twitter](https://twitter.com/PostHog) or [LinkedIn](https://linkedin.com/company/posthog) for more PostHog news!_

<ArrayCTA />
