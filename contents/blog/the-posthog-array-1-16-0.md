---
date: 2020-11-04
title: Array 1.16.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
---

Following our largest release to date, we are now back on a more regular release schedule. And, given that scalability was the focus of the previous release, we thought it was time for some fresh new features. 

So, without further ado, here they are:

## Release Notes

### [Session Recording (Beta)](https://github.com/PostHog/posthog/pulls?q=is%3Apr+session+recording+)

![Session Recording Page Screenshot](../images/blog/array/session-recording.png)

Given that our stated mission at PostHog is to increase the number of successful projects in the world, session recording felt like a feature that fits in perfectly with that goal.

PostHog already provides various features to help you understand and improve your UX - but watching real users use your product is a _whole nother ball game_. 

With PostHog's session recording, you are able to truly feel the pain point of your users first-hand, seeing where they get stuck, debugging exceptions faster, and making your UX smoother. 

![Session Recording Screenshot](../images/blog/array/session-recording-ss.png)

Additionally, you can do so while still preserving the privacy of your users, by determining what shouldn't be captured, as well as being able to turn session recording on and off as you wish.

However, please note that our session recording feature is in **Beta** at the moment. This means that it can be unstable and have bugs. To report bugs you find while using it, please [open an issue for us on GitHub](https://github.com/PostHog/posthog/issues). 


### [Plugins (Beta)](https://github.com/PostHog/posthog/pulls?q=is%3Apr+plugins)

![Plugins Screenshot](../images/blog/array/plugins.png)

Plugins is another **Beta** feature that we're extremely excited for. Currently only available for self-hosted instances, plugins allow you to add additional logic to your event processing pipeline, in order to do things like enrich your data or send it somewhere else, like a data warehouse. 

At the moment, we have created a few example plugins for you to test out the functionality, and have the intention of launching more for the next release. We will also be launching tutorials on how to make your own plugins, so stay tuned for that.

As of right now, if you're on a self-hosted instance, you should head over to 'Project' -> 'Plugins' to enable the functionality. You can start testing it out with our "Hello World" plugin, which adds a property to your events called `foo` with a value that is up to you to decide in setup. 

Our overall vision for plugins is to enable seamless integration with other relevant data analytics platforms, as well as allow users to more easily customize PostHog's functionality by adding their own logic and data to the event pipeline.

Finally, as is the case with session recording, please report any bugs in the functionality on [GitHub](https://github.com/PostHog/posthog/issues).


### [Multiple Projects](https://github.com/PostHog/posthog/pull/1562)

![Multiple Projects Screenshot](../images/blog/array/org-project.png)

You asked and we delivered!

As per feedback from many in our community, PostHog now offers support for managing multiple projects under one "umbrella" organization. 

This allows you to segregate concerns, such as keeping tracking for your dev and prod environments separately, as well as track multiple domains and apps without mixing data.  

In addition, we also enhanced our invite and permissioning system as a by-product of this feature. 

As this is an Enterprise Edition feature, please contact us at _sales@posthog.com_ if you are interested in using it.

### [Dashboard Templates](https://github.com/PostHog/posthog/pull/1942)

![Dashboard Templates Screenshot](../images/blog/array/dashboard-template.png)

In order to make it easier to create valuable dashboards to keep track of your business metrics, PostHog now offers the option to create new dashboards based on a template. We will be expanding the power of dashboard templates, but, as of right now, you can already create a dashboard using our web app dashboard template, which provides you with a good starting point for determining and tracking relevant metrics.

### [Documentation Level Up](https://github.com/PostHog/posthog.com)

![Docs Screenshot](../images/blog/array/docs.png)

We have been working hard to improve our product documentation and had a few big upgrades recently:

- Our Docs now have a Dark Mode option
- You can search our entire documentation without ever using your mouse
- We are actively releasing new tutorials on how to use PostHog to track key metrics and improve your product
- Our Docs pages now load faster
- New screenshots have been added throughout the Docs, as well as functionality walkthrough videos

...and a lot more!

If you have any suggestions for new tutorials or improvements to our documentation, [do not hesitate to let us know!](https://github.com/PostHog/posthog.com/issues)

### [User Interviews](calendly.com/posthog-feedback)

We’re working hard to improve PostHog and would love to talk to you about your experience with the product. 

If you're interested in helping us out, you can schedule a quick 30-min call with us [on Calendly](https://calendly.com/posthog-feedback). 

Oh, and we're giving away some awesome [PostHog merch](https://merch.posthog.com) as a thank you!

## Bug Fixes and Performance Improvements

In addition to the main features mentioned above, we also merged over 100 PRs improving PostHog's performance and fixing bugs:



## Favorite Issue

### [Strategy - open questions](https://github.com/PostHog/posthog.com/issues/444)

Our team has been actively engaged in discussions about company strategy, culture, and values over the past few weeks. 

And, since we value transparency, most of that is openly available for anyone to read, such as our [public strategy](https://posthog.com/handbook/strategy/strategy).

## PostHog News

Karl joined our Engineering team last week and hit the ground running from the start, squashing bugs left and right, while helping us build cool new functionality. 

He believes pineapple belongs on pizza, which has further increased the divide within our team.

## Open Roles

Are you a Fullstack Engineer or Frontend Developer? 

Or perhaps you're not either but think you'd still be a good fit for PostHog? 

[We want you!](https://posthog.com/careers) 


