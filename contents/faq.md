---
title: FAQ
sidebar: null
showTitle: true
---

## Will this fit what I need?

PostHog provides open source product analytics. We are an open source alternative to Mixpanel / Amplitude or Heap.

The key difference is that you can self-host the platform, and it's open source.

* That makes us a very good fit for B2C applications (since we don't charge based on volume).
* We are a better fit for enterprise users since you don't need to go through information security / vendor risk management to get into production with our community version.

### What does it do?

We track user behavior across your website and applications.

* We provide event capture for front and back end events.
* We track this all at an identifiable user level (if you choose to identify your users).
* PostHog also provides a full product analytics UX. That means:
	* [Trends](/docs/features/trends)
	* [Funnels](/docs/features/funnels)
	* [Cohorts](/docs/features/cohorts)
	* [Retention](/docs/features/trends#trend-segmentation-by-stickiness)
	* [User histories](/docs/features/users)

### Does it work with my stack?

PostHog is designed for any web or mobile based website or application.

* We have front end event capture using a snippet that goes into your ```<head></head>``` tags.
* For any other events, we have:
	* [Pre-built libraries](/docs/integrations)
	* [An API](/docs/integrations/api) for anything else

### Does it do mobile and web?

Yes. We support any kind of application.

## Is this supported properly?

Yes. We are in very [active development](https://github.com/PostHog/posthog/graphs/commit-activity). PostHog is a [well-funded](/handbook/investors) project with [thousands of stars](https://github.com/PostHog/posthog/stargazers) on GitHub and dozens of PRs being worked on weekly.

### How popular is the software?

Very. We have thousands of users, over [2K stars](https://github.com/PostHog/posthog/stargazers) on GitHub, even though the project only started in January (!), and [supportive investors](/handbook/investors).

### Is the software updated regularly?

Yes. We release new features [every week](https://github.com/PostHog/posthog/graphs/commit-activity). It's [easy to update](docs/upgrading-posthog), and the most recent versions of the software will alert you to new updates within the application.

Pro-tip: follow us on [Twitter](https://twitter.com/PostHogHQ) / [Slack](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ) to see our latest features.

### How many companies use it / how many well known companies use it?

We have thousands of users including at several very large enterprises.

We are currently working on creating some case studies.

If you would like to be featured, please email hey@posthog.com.

## Is this a "top quality" project?

Yes, but we would say that!

We are a well established [YC backed company](https://www.ycombinator.com/companies/), that gained a lot of traction on [launching](https://news.ycombinator.com/item?id=22376732) and is now [going on to disrupt](/handbook/strategy) the product analytics market by focussing more on engineering adoption.

### Is the software buggy?

Whilst there is already room for improvement, the software works well and we use it ourselves every day.

If you have any [issues or feature requests](https://github.com/PostHog/posthog/issues), we are live on [Slack](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ) nearly 24 hours a day during the week to help.

## Is this hard to set up?

No. If you want to just try it out - you can go with the [hosted version](https://app.posthog.com/signup).

If you are at a much higher volume company and need help managing scalability and database sizing, we can offer paid help here.

### How do I deploy?

There are three options:

1. Try the [hosted version](https://app.posthog.com/signup). Free.
1. [Self deploy](/docs/deployment). Free.
1. [Managed deployment](mailto:sales@posthog.com) - we will help set it up in your environment. We charge for this.

### Can I get it live with my favorite hosting method?

The software is available from source, on Heroku, as a Docker image or in Kubernetes, which should cover many use cases.

Want to set it up differently? [Raise an issue](https://github.com/PostHog/posthog/issues) in the repo.

## Will this scale?

Yes. We've written out information on [scaling PostHog](/docs/scaling-posthog).

### Is there an enterprise offering?

Yes. We can help manage your deployment in your cloud for you. That means:

* All the info security and privacy advantages of self
* Full underlying data access
* We can offer SLAs around uptime, and can help out your engineering team so there's no maintenance workload

Email [sales@posthog.com](mailto:sales@posthog.com) to talk to us about this.

### Can I self host?

Yes. You can have full access to [PostHog's code](https://github.com/PostHog/posthog), so it's fully flexible how you run the software.

## Will this make me better at my job?

If you work at a software company, an understanding of user behavior is critical to driving growth. That's what we can help you with.

The cool thing about PostHog is that you can go live into production without having to send all your user data to a SaaS company.

### What's the community like?

Active and growing! We have [more than 2K stars](https://github.com/PostHog/posthog/stargazers) on GitHub. There is a [Slack group](https://join.slack.com/t/posthogusers/shared_invite/enQtOTY0MzU5NjAwMDY3LTc2MWQ0OTZlNjhkODk3ZDI3NDVjMDE1YjgxY2I4ZjI4MzJhZmVmNjJkN2NmMGJmMzc2N2U3Yjc3ZjI5NGFlZDQ) with daily conversations, and the repo itself has [issues](https://github.com/PostHog/posthog/issues) raised every week.

### What are the docs like?

[Check them out](/docs) for yourself!

## How is this different to the other product analytics tools?

PostHog is the only open source product analytics tool. There are plenty of SaaS options (Mixpanel/Amplitude/Heap), but all of them require you sending your data to 3rd parties, and they all charge based on volume. We have written out a [features comparison](/product-features).

There are multiple open source analytics offerings - Metabase, Matomo, etc. PostHog is the only open source software that gives you (i) full event capture (ii) full identifiable user histories (iii) full product analytics UX.

Todo: We will put together content to walk you through the difference with the rest of the open source analytics stack that is available :)