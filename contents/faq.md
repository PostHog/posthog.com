---
title: FAQ
sidebar: Docs
showTitle: true
---

## About PostHog

### What is PostHog?

PostHog is a product analytics platform built for the modern enterprise, with the differentiators of being open source and having a broader view of the tools needed to make a product successful. 

As a result, PostHog **can be deployed on your own infrastructure** and provides a large set of tools to help improve your product, such as session recording, heatmaps, and feature flags, that are unique to PostHog in the product analytics space.

### Will this fit what I need?

PostHog provides open source product analytics. We are an open source alternative to products like Mixpanel, Amplitude, and Heap.

The key difference is that PostHog is open source, and you can self-host it.

* That makes us a very good fit for B2C applications (since we don't charge based on volume).
* We are a better fit for enterprise users since you don't need to go through information security/vendor risk management to get into production with our community version.

### What does it do?

We track user behavior across your website and applications.

**Features Overview**

* Event capture for both frontend and backend events.
* Event tracking at an identifiable user level (if you choose to identify your users).
* A full product analytics UX, including:
	* [Trends](/docs/user-guides/trends)
	* [Funnels](/docs/user-guides/funnels)
	* [Cohorts](/docs/user-guides/cohorts)
	* [Retention](/docs/user-guides/retention)
	* [Paths](/docs/user-guides/paths)
	* [User histories](/docs/user-guides/users)
* Data visualization and product experimentation tools, such as:
	* [Heatmaps](/docs/user-guides/toolbar)
	* [Feature Flags](/docs/user-guides/feature-flags)
	* [Session Recording](/docs/user-guides/session-recording)
	* [Plugins](/docs/user-guides/plugins)

You can read more about our available features on the dedicated [Product page](/product).

### Does it work for mobile and web?

Yes. We support any kind of application.

### Does it work with my stack?

Yes. PostHog can be used via:

- An HTML snippet that goes inside your ```<head></head>``` tags.
- One of our [15+ libraries](/docs/tutorials/overview) covering the main programming languages and tools
- Our [API](/docs/api/overview)

This means that it doesn't matter what your stack is - you can use PostHog with it.

### Is this supported properly?

Yes. We are in very [active development](https://github.com/PostHog/posthog/graphs/commit-activity). 

PostHog is a [well-funded](/handbook/strategy/investors) project with [thousands of stars](https://github.com/PostHog/posthog/stargazers) on GitHub, and dozens of PRs being worked on weekly, by both our [core team](/handbook/company/team) and our active community.

## About the Software

### How popular is the software?

Very. We have thousands of users, over [3k stars](https://github.com/PostHog/posthog/stargazers) on GitHub (even though the project only started in January 2020), and [supportive investors](/handbook/strategy/investors).

### Is the software updated regularly?

Yes. We release new versions about every two weeks and have a world-class team working daily on making the product better. It's [easy to update](/docs/self-host/configure/upgrading-posthog), and the software will alert you to new updates within the application.

Pro-tip: follow us on [Twitter](https://twitter.com/PostHog) or join our [Slack](/slack) to keep up with our latest features.

### How many companies use it / How many well-known companies use it?

We have thousands of users including very large enterprises.

We are currently working on creating some case studies.

If you would like to be featured, please email _[hey@posthog.com](mailto:hey@posthog.com)_.

### Is the software buggy?

Whilst there is already room for improvement, the software works well and we use it ourselves every day.

If you have any [issues or feature requests](https://github.com/PostHog/posthog/issues), we are live on [Slack](/slack) nearly 24 hours a day during the week to help.

### Is this hard to set up?

No. If you want to get started quickly you can use our [cloud version](https://app.posthog.com/signup), but we also have various [1-click deployment](/docs/deployment) options if you decide to self-host. 

Additionally, if your company has a very large userbase and you need help with scalability and managing your setup, we can offer [paid help](https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u) here.
 
## Deployment

### Can I self-host?

Yes. You can have full access to [PostHog's code](https://github.com/PostHog/posthog), so it's fully flexible how you run the software.

### How do I deploy?

There are three options:

1. [PostHog Cloud](https://app.posthog.com/signup)
2. [Self Deployment](/docs/deployment)
3. [Managed Deployment](https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u)

### Can I get it live with my favorite hosting method?

We provide 1-click deployments for Heroku, AWS, and Render, as well as have tutorials deploy using Docker, Kubernetes, or straight from source. Furthermore, we offer detailed deployment instructions for how to deploy on all the main cloud providers. See our [Deployment page](/docs/deployment) for more information.

Want to set it up differently? [Raise an issue](https://github.com/PostHog/posthog/issues) in the repo.

### Will this scale?

Yes. Check out [Scaling PostHog](/docs/self-host/deploy/configuration#scaling-up) for more information on this.

### Is there an enterprise offering?

Yes. Our [enterprise offering](/pricing) is designed for companies with massive event volumes who need a more scalable version of PostHog. It includes:

- ClickHouse as the underlying database for fast analytics at scale
- Integrations with services like Zapier
- Permissioning and multiple projects
- Dedicated support
- SSO/SAML
- Export to data lakes

Email [sales@posthog.com](mailto:sales@posthog.com) to talk to us about this.

### Will this make me better at my job?

If you work at a software company, understanding user behavior is critical to driving growth. That's what we can help you with.

The cool thing about PostHog is that you can go live into production without having to send all your user data to a SaaS company.

## Community

### What's the community like?

Active and growing! We have [more than 3k stars](https://github.com/PostHog/posthog/stargazers) on GitHub. There is a [Slack group](/slack) with daily conversations, and our repos have [issues](https://github.com/PostHog/posthog/issues) raised every day.

### How is this different from the other product analytics tools?

PostHog is the only open source product analytics tool. There are plenty of SaaS options (Mixpanel/Amplitude/Heap), but all of them require you to send your data to third-parties, and they all charge based on volume. We have written out a [features comparison](/product-features) if you want to understand what we do better.

There are multiple open source analytics offerings - Metabase, Matomo, etc. However, PostHog is the only open source software that gives you:

1. Full event capturing functionality 
2. Full identifiable user histories 
3. A complete product analytics UX, including additional features such as session recording and heatmaps.

## Contributing

### How can I contribute?

We love contributions big or small. [See docs for a guide on how to get started](https://posthog.com/docs/contributing).
Not sure where to start? [Book a free, no-pressure pairing session](mailto:tim@posthog.com?subject=Pairing%20session&body=I'd%20like%20to%20do%20a%20pairing%20session!) with one of our core contributors.

### What are the Docs like?

Our Docs are a top priority to us and are updated **daily**. [Check them out](/docs) for yourself!

## General Questions

### Can I suggest new features?

Absolutely!

You can suggest new features by adding them as issues in our [GitHub repo](https://github.com/PostHog/posthog). You can search through already existing issues and see if your feature has already been requested. If it has, you could leave a reaction on the existing issue than to file a new one. The reactions would be used to measure how interested our community is in the new feature, so it’s better to have all of it captured on one issue.

### I'm having trouble setting up PostHog. What should I do?

If you’re having trouble setting up PostHog you can send a message to our [community Slack group](/slack), you can also contact [PostHog Support](mailto:hey@posthog.com). If its a bug you can raise an issue through our [GitHub repo](https://github.com/PostHog/posthog/issues).

### Are you hiring?

Yes, come help us make PostHog even better. We're growing like crazy, [and we would love to have you join us](https://posthog.com/careers).


