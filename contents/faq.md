---
title: FAQ
sidebar: null
showTitle: true
---

# Why PostHog

### Will this fit what I need?

PostHog provides open source product analytics. We are an open source alternative to products like Mixpanel, Amplitude, and Heap.

The key differense is that you can self-host the platform, and it's open source.

* That makes us a very good fit for B2C applications (since we don't charge based on volume).
* We are a better fit for enterprise users since you don't need to go through information security/vendor risk management to get into production with our community version.

### What does it do?

We track user behavior across your website and applications.

* We provide event capture for front and back end events.
* We track all this at an identifiable user level (if you choose to identify your users).
* PostHog also provides a full product analytics UX. That means:
	* [Trends](/docs/features/trends)
	* [Funnels](/docs/features/funnels)
	* [Cohorts](/docs/features/cohorts)
	* [Trend Stickiness](/docs/features/trends#trend-segmentation-by-stickiness)
	* [Retention](https://posthog.com/docs/features/retention)
	* [User histories](/docs/features/users)
	* [Feature-rich Toolbar](https://posthog.com/docs/features/toolbar)

### Does it work with my stack?

PostHog is designed for any web or mobile-based website or application.

* We have frontend event capture using a snippet that goes inside your HTML ```<head></head>``` tags.
* For any other events, we have:
	* [Pre-built libraries](/docs/integrations)
	* [An API](/docs/api/overview) for anything else

### Does it work for mobile and web?

Yes. We support any kind of application.

### Is this supported properly?

Yes. We are in very [active development](https://github.com/PostHog/posthog/graphs/commit-activity). PostHog is a [well-funded](/handbook/investors) project with [thousands of stars](https://github.com/PostHog/posthog/stargazers) on GitHub and dozens of PRs being worked on weekly.

# About the Software

### How popular is the software?

Very. We have thousands of users, over [3k stars](https://github.com/PostHog/posthog/stargazers) on GitHub (even though the project only started in January 2020), and [supportive investors](/handbook/investors).

### Is the software updated regularly?

Yes. We release new versions about every two weeks and have a world-class team working daily on making the product better. It's [easy to update](docs/upgrading-posthog), and the most recent versions of the software will alert you to new updates within the application.

Pro-tip: follow us on [Twitter](https://twitter.com/PostHogHQ) / [Slack](/slack) to see our latest features.

### How many companies use it / How many well-known companies use it?

We have thousands of users including several very large enterprises.

We are currently working on creating some case studies.

If you would like to be featured, please email hey@posthog.com.

### Is this a "top quality" project?

Yes, but of course we would say that!

We are a well established [YC backed company](https://www.ycombinator.com/companies/), that gained a lot of traction on [launching](https://news.ycombinator.com/item?id=22376732) and is now [going on to disrupt](/handbook/strategy) the product analytics market by focusing more on engineering adoption.

### Is the software buggy?

Whilst there is already room for improvement, the software works well and we use it ourselves every day.

If you have any [issues or feature requests](https://github.com/PostHog/posthog/issues), we are live on [Slack](/slack) nearly 24 hours a day during the week to help.

### Is this hard to set up?

No. If you want to just try it out - you can go with the [hosted version](https://app.posthog.com/signup).

Additionally, we have various [1-click deployment](/docs/deployment) options if you self host. 

If you are at a much higher volume company and need help managing scalability and database sizing, we can offer paid help here.
 
# Deployment

### How do I deploy?

There are three options:

1. Try the [hosted version](https://app.posthog.com/signup). Free.
1. [Self deploy](/docs/deployment). Free.
1. [Managed deployment](mailto:sales@posthog.com) - we will help you set PostHog up in your own environment. We charge for this.

### Can I get it live with my favorite hosting method?

We provide 1-click deployments with Heroku, AWS, and Linode, as well as have tutorials for how to deploy from source, using Docker, and using Kubernetes. Furthermore, we offer detailed deployment instructions for how to deploy on all the main cloud providers. See our [Deployment page](/docs/deployment) for more information.

Want to set it up differently? [Raise an issue](https://github.com/PostHog/posthog/issues) in the repo.

### Will this scale?

Yes. Check out [Scaling PostHog](docs/configuring-posthog/scaling-posthog) for more information on this.

### Is there an enterprise offering?

Yes. We can help manage your deployment in your cloud for you. That means:

* All the information security and privacy advantages of self-hosting
* Full underlying data access
* We can offer SLAs around uptime and can help out your engineering team so there's no maintenance workload

Email [sales@posthog.com](mailto:sales@posthog.com) to talk to us about this.

### Can I self host?

Yes. You can have full access to [PostHog's code](https://github.com/PostHog/posthog), so it's fully flexible how you run the software.

### Will this make me better at my job?

If you work at a software company, understanding user behavior is critical to driving growth. That's what we can help you with.

The cool thing about PostHog is that you can go live into production without having to send all your user data to a SaaS company.

# Community

### What's the community like?

Active and growing! We have [more than 3k stars](https://github.com/PostHog/posthog/stargazers) on GitHub. There is a [Slack group](/slack) with daily conversations, and our repos have [issues](https://github.com/PostHog/posthog/issues) raised every day.

### How is this different from the other product analytics tools?

PostHog is the only open source product analytics tool. There are plenty of SaaS options (Mixpanel/Amplitude/Heap), but all of them require you to send your data to third-parties, and they all charge based on volume. We have written out a [features comparison](/product-features) if you want to understand what we do better.

There are multiple open source analytics offerings - Metabase, Matomo, etc. However, PostHog is the only open source software that gives you (i) full event capture (ii) full identifiable user histories (iii) full product analytics UX.

# Contributing

### How do I contribute

We love contributions big or small. [See docs for a guide on how to get started](https://posthog.com/docs/contributing).
Not sure where to start?[Book a free, no-pressure pairing session](mailto:tim@posthog.com?subject=Pairing%20session&body=I'd%20like%20to%20do%20a%20pairing%20session!) with one of our core contributors.

### What are the Docs like?

Our Docs are a top priority to us and are updated **daily**. [Check them out](/docs) for yourself!

# General Questions

### What new features does PostHog have?

As a way to improve users experience, PostHog has released new features such as [Retention Tables](https://posthog.com/docs/features/retention) and [Toolbar](https://posthog.com/docs/features/toolbar) which enables you to interact seamlessly with PostHog.

### Can I suggest new features?

Absolutely!

You can suggest new features by adding them as issues in our [Github repo](https://github.com/PostHog/posthog). You can search through already existing issues and see if your feature has already been requested. If it has, you could leave a reaction on the existing issue than to file a new one. The reactions would be used to measure how interested our community is in the new feature, so it’s better to have all of it captured on one issue.

### I'm having trouble setting up PostHog. What should I do?

If you’re having trouble setting up PostHog you can send a message to our [community Slack group](/slack), you can also contact [PostHog Support](mailto:hey@posthog.com). If its a bug you can raise an issue through our [GitHub repo](https://github.com/PostHog/posthog/issues).

### Are you hiring?

Yes, come help us make PostHog even better. We're growing like crazy, [and we would love to have you join us](https://posthog.com/careers).


