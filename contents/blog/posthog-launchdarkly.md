---
date: 2022-08-05
title: PostHog Feature Flags vs. LaunchDarkly Feature Flags
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
keywords: ["posthog vs. launchdarkly", "feature flags"]
featuredImage: 
featuredImageType: full
author: ["nick-moore"]
categories: ["Guides", "Open source", "Comparisons"]
---

# PostHog Feature Flags vs. LaunchDarkly Feature Flags

The usefulness of Feature Flags is clear – especially to startups rapidly iterating toward product/market fit – but the process of choosing between Feature Flag vendors is less clear. 

In this article, we’ll compare the Feature Flag capabilities of a leading vendor, LaunchDarkly, with our own Feature Flag product. The goal is to show you where and how PostHog or LaunchDarkly is better and explain which features are most important when shopping for Feature Flag vendors.

## How are PostHog Feature Flags different from LaunchDarkly Feature Flags?

Feature Flags are, by and large, a commodity feature, meaning that the gap between one Feature Flag vendor and another, at least in terms of Feature Flags alone, is not going to be large. 

Feature Flags in their most basic form, after all, are IF statements that you can flip to deploy code. The differentiation between Feature Flag vendors is what they offer and layer on top of this core functionality, including the UX and any additional, complementary features. 

The differences between PostHog Feature Flags and LaunchDarkly Feature Flags, then, come less from the Feature Flags themselves than what and how those Feature Flags connect to other capabilities. 

## PostHog vs. LaunchDarkly Feature Flag comparison

On our [Feature Flags page](https://posthog.com/product/feature-flags), you can see a comparison table that compares PostHog to LaunchDarkly, Optimizely, Flagsmith, and Growthbook. The below focuses on the major similarities and differences between PostHog and LaunchDarkly in greater detail.

<table>
  <tr>
   <td>
   </td>
   <td><strong>LaunchDarkly</strong>
   </td>
   <td><strong>PostHog</strong>
   </td>
  </tr>
  <tr>
   <td><strong>Platform</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Free plan
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Open source
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Self hostable
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Cloud hosting
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Product analytics
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td><strong>Feature flags</strong>
   </td>
   <td>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Target by percentage
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Target by user properties
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Flag scheduling
   </td>
   <td>✅
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Experimentation
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Multivariate flags
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Unlimited flags for free
   </td>
   <td>❌
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>3rd party plugins for free
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Activity logs
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Data export
   </td>
   <td>✅
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Multi-environment support
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
  </tr>
  <tr>
   <td>Streaming architecture
   </td>
   <td>✅
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Flag approvals
   </td>
   <td>✅
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Flag triggers
   </td>
   <td>✅
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Approval workflows
   </td>
   <td>✅
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Workflow templates
   </td>
   <td>✅
   </td>
   <td>❌
   </td>
  </tr>
  <tr>
   <td>Custom role-based access control (RBAC)
   </td>
   <td>✅
   </td>
   <td>❌
   </td>
  </tr>
</table>

## PostHog Feature Flags complement a product analytics suite

PostHog, and we’re not secretive about this, is a product analytics company and that’s what our platform is dedicated to helping with. It just so happens, however, that one of the things companies want to analyze is new features. That’s why it made sense for us to add Feature Flags to a larger product analytics platform. 

Say, for instance, you want to run an experiment and see how a select group of users respond to a new feature. Feature Flags are the go-to way to do this. But where do you go once you’ve selectively enabled the feature and users are using it? With LaunchDarkly, you’ll need to instrument analytics to go alongside the deployed Feature Flags and capture analytics from your Feature Flag events. You’ll likely be using and integrating another product, such as Amplitude. 

PostHog offers a more “out-of-the-box” experience, meaning that when users start using this new, toggled-on feature, you can immediately begin analyzing their usage of it without having to use or integrate another tool. From within the same tool, you can toggle features on and off and then analyze the user journey that emerges from that new feature. 

For PostHog users, then, Feature Flags are a piece of a larger product analytics picture, one that leads from toggled features to funnels, trends, user paths, and more. Feature Flags aren’t, in this context, merely a way to turn features on and off but a way to understand your users better and improve your product.

## LaunchDarkly Feature Flags benefit from precise focus

LaunchDarkly is not a product analytics platform and makes no claim to be one. Instead, LaunchDarkly focuses almost entirely on Feature Flags and the company and product benefit from that focus. 

Here’s one way this difference breaks out: ingestion delays. An ingestion delay is when a new user with a distinct ID arrives and sends a `$pageview` event that requests Feature Flags. If the ID has nothing associated with it, the Feature Flag will return empty. Meanwhile, the `$pageview` event is making its way through an ingestion pipeline that adds a property to the user that does end up triggering a Feature Flag. The end result is that there’s a delay between when a user arrives on the site and when a feature that’s supposed to be toggled on actually toggles on. 

LaunchDarkly, because it’s not working from within a product analytics paradigm, doesn’t have this problem. Instead, the client defines all flags based on a user object and you (not LaunchDarkly) have to compute properties for your users. Two routes result: Either you bootstrap the client and load it with a set of existing flags or everything makes an API call and every API call passes the user object as well as any new properties alongside it. 

This example reveals a subtle but generalizable result from your choice of vendors. PostHog faces different challenges than LaunchDarkly because we’re building an event pipeline and they’re not. These challenges don’t mean our Feature Flags will always be behind LaunchDarkly’s – we actually anticipate achieving feature parity within two months of this post’s publish date – but it does mean each company is working from different circumstances and frameworks. 

The consequences of this matter to you, the user, depending on how you plan to use Feature Flags. The advantages and disadvantages of a single-feature vendor become clearer the more you imagine using the product and integrating it with the rest of your tools. 

Feature Flags are necessary but not sufficient for experimentation and iteration, meaning many LaunchDarkly customers likely complement LaunchDarkly with a product analytics tool like Amplitude. When you’re considering Feature Flag vendors, then, you can’t only compare capability by capability but have to compare the entire experience involved in using the product – up to and including integrating it with other products as necessary. 

There’s a tradeoff. When you purchase from a single-feature vendor, you’re more likely to get the very best version of that feature the market has to offer. But when you make that purchase, you’re stuck with the work of integrating that feature into the rest of your product–a process that can be clumsy, cumbersome, and, depending on vendor partnerships, incomplete. 

## Who should buy which?

Feature Flags are a means to an end so when you start shopping for Feature Flag vendors, focus less on the slight differences between the means and focus more on the major differences between the ends. PostHog offers Feature Flags as a means to product and user analysis, whereas LaunchDarkly offers, until you add a product analytics tool, Feature Flags as ends in themselves. 

We recommend here, as we would with other purchase decisions, taking both a short and long-term view: What do I need today? What do I think I’ll need tomorrow? And how soon will that tomorrow arrive?

One great reason to choose LaunchDarkly is because all you want is Feature Flags and you don’t want or need all this product analytics stuff. That makes sense. 

But when making that call, chart the progress of your company three, six, and twelve months into the future: If you need to run experiments on Feature Flags and see how users are actually using the features you’re toggling, then you’ll need product analytics. 

The sooner that tomorrow state is coming, the smarter it will be to buy something like PostHog today, so that you can turn on product analytics when you need it, at no additional cost, rather than having to start a separate product analytics vendor search, paying for the tool once you find the one you want, and integrating it with your Feature Flags vendor. 

## How is PostHog different from LaunchDarkly?: The big picture

Before we close out, let’s step back and compare companies and product suites. You are, after all, never buying a single feature but instead signing on to a company, its product vision, and its growing platform. 

The primary difference between PostHog and LaunchDarkly is that PostHog is an all-in-one suite of products for helping companies build better products that includes Feature Flags (as well as session recording, funnels, trends, user paths, and [more](https://posthog.com/product)) whereas LaunchDarkly is primarily a Feature Flag deployment and management tool. If you want product analytics _and_ Feature Flags, your options are PostHog or a combination of tools, such as LaunchDarkly and Amplitude. 

The DNA of PostHog and LaunchDarkly are also fundamentally different: PostHog is open source and LaunchDarkly is not. PostHog isn’t the only [open source Feature Flag tool](https://posthog.com/blog/best-open-source-feature-flag-tools), but it’s a key differentiator. Open source provides some major benefits, including greater transparency into the code supporting the product as well as the ability to contribute to it. Vendasta, for example, a platform that helps companies sell to local businesses, [embedded PostHog into its tech stack](https://posthog.com/customers/vendasta) more deeply than would otherwise be possible without PostHog being open source.

Similarly, PostHog also offers different deployment options than LaunchDarkly, with PostHog offering both a self-hostable version and a cloud version, whereas LaunchDarkly only offers a cloud version. Depending on the industry you're in and your preferences for running and maintaining software, this could be an important factor. Data privacy laws in industries like healthcare and finance might make self-hosting a legal requirement. 

## Coming soon to PostHog

We ship weirdly fast. Here's a quick snapshot of what we're working on right now:

* In-app setup guided tour
* PostHog Cloud EU
* Session Recordings DevTools
* Turbo feature flags
* Unified querying across events, persons, sessions, groups
* Automated insight recommendations
* Lightning fast querying at billion event and person scale
* Extended insight visualizations

You can also take a look at [recent issues](https://github.com/PostHog/posthog/issues) and [pull requests](https://github.com/PostHog/posthog/pulls) on the [PostHog repo](https://github.com/PostHog/posthog) to see what we're working on.

At PostHog, nearly everything we do is done in the open. You can chat with our engineers directly in the [community Slack](https://posthog.com/slack), or ask them questions on [any of our docs pages](https://posthog.com/docs).

You can read all about how we work in our [company handbook](https://posthog.com/handbook/getting-started/start-here).
