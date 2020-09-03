---
date: 2020-09-03
title: Array 1.14.0
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
---


Over the past three weeks, there was one word on everyone's mind: feedback.

We did a bunch of interviews with users and had a lot of discussions with the community around one key question: **How can we make PostHog better for you?**

The result is a release with new features and a ton of bug fixes, aimed at making PostHog better, faster, and more secure for our users. 

If you're self-hosting and want to upgrade for a better experience with nicer features, remember to [update your PostHog instance](/docs/configuring-posthog/upgrading-posthog).

## Release Notes

### [Insight History](https://github.com/PostHog/posthog/pull/1379)

![Insight History Screenshot](../images/insight-history.png)

Eric really killed this one with a massive pull request where 55 files were modified. 

As a result, PostHog now allows you to look through a history of the charts you've made on 'Insights', so that you don't have to worry about forgetting the exact filters you used to reach a certain conclusion, or feeling bad about not having saved that perfect chart from a week ago.

Experiment with insights all you want, now without the fear of losing your work. 

### [Personal API Keys](https://github.com/PostHog/posthog/pull/1281)

![API Key Screenshot](../images/personal-api.png)

We also merged another huge PR (58 files changed!) from Michael that's been a long time in the making because we wanted to get this just right. 

To facilitate integrations with external services, as well as make the experience of using our API simpler and safer, we have now introduced Personal API Keys. They can be generated and deleted on the PostHog setup page. It's worth noting that this is a private API Key, compared to your public 'Team API Key' used in the snippet. 

Lastly, because of this change, we have deprecated authentication with username and password for API endpoints.

### [Public Roadmap](https://github.com/orgs/PostHog/projects/1)

![Public Roadmap](../images/public-roadmap.png)

At PostHog, one of our core values is transparency. As a result, we try to make as much information public as we can, from what we're working on to how we operate. 

As such, it felt important to us to release a public roadmap where our entire community can view what we're up to, what we'll work on next, and what our objectives are for the future. For a long time we have had a rough roadmap available in our Handbook, but, by now having our roadmap on GitHub, we can directly link issues to the board, and community members can also vote (with emojis 👍) on issues they believe to be important.

Furthermore, we have always encouraged members of our community to open issues for bugs, feature requests, or just anything at all they want to see changed. Now, issues opened by the community can be incorporated on the roadmap, so you can have an idea of how your suggestions fit in with our development process. 

Keep the tickets coming!

### [PostHog FOSS](https://github.com/PostHog/posthog-foss)

As an open core company, we have to conciliate our open source efforts with our ability to generate revenue. Generating revenue is how we're able to continue to sustain our extensive work in the open source space. 

Thus, after a lot of brainstorming and [calls with the likes of Sid Sijbrandij](/blog/a-chat-with-sid), CEO of multibillion dollar [open core company GitLab](https://about.gitlab.com/install/ce-or-ee/), we settled on a business model that allows PostHog to be a sustainable company in the open source space. 

This led to the creation of two key things: an `ee` subdirectory on our [main repo](https://github.com/PostHog/posthog), and a new repository called [posthog-foss](https://github.com/PostHog/posthog-foss). We'll be explaining these in more detail in the future, but, for now, you should know that to run fully MIT-licensed software, you can either clone the main repo and delete the `ee` subdirectory (without any consequences), or clone our posthog-foss repo, which is a mirror of the main repository without proprietary code.

In addition, if you're an enterprise customer looking for added functionality and improved performance, contact us at sales@posthog.com to discuss the license for using our proprietary features. 

### [Secret Key Requirement](https://github.com/PostHog/posthog/pull/1426)

To ensure the security of your PostHog instance, it's important that you use a randomly-generated unique `SECRET_KEY`. This key is used by Django to encrypt cookies, calculate hashes, and generate tokens, making it of high importance. 

Prior to this version, we denoted the importance of this in our Docs, but did not enforce it in our software. Now, to enhance security, PostHog will not allow you to run the server without setting it.

Many of our deployments generate and set this key by default, so that you will not need to worry about it. This is the case with our [Heroku One-Click deployment](/docs/deployment/deploy-heroku), for example. However, other methods may not automatically do this (we're working on it!). As such, if you run into any issues when updating PostHog, make sure you have a unique `SECRET_KEY` set. 

You can find more information about this on our ['Securing PostHog' page](/docs/configuring-posthog/securing-posthog#secret-key) and should always feel welcome to ask any questions on our [community Slack group](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ).



