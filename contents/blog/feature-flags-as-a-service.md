---
title: "Feature flags as a service: Should you build or buy?"
date: 2023-09-04
author: ["ian-vanagas"]
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: ../images/blog/green-blog-image.jpg
featuredImageType: full
category: Engineering
tags:
 - Feature flags
 - Explainers
---

Feature flags are a tool to conditionally turn on or off code and components. They enable developers to safely roll out and roll back new features. This helps them follow the [best practice of disconnecting deployment from release](/blog/github-gitlab-feature-flags#why-do-github-and-gitlab-use-feature-flags).

The basic functionality of feature flags is simple enough to build yourself. The challenge comes as you scale and your needs become more complex. This post goes over the functionality of a feature flag service, the challenges of building a service in-house, the benefits of feature flags as a service, and how to make the build or buy decision.

## What does a feature flag service do?

In its simplest form, a feature flag service is:

- A store of flags with keys and their associated values.
- A function that takes a key, checks the store, and returns a value.

In Python, this might look like:

```python
class FeatureFlagService:
    def __init__(self):
        self.feature_flags = {
            "new_feature": True
        }

    def is_enabled(self, feature_name):
        return self.feature_flags.get(feature_name, False)

if __name__ == "__main__":
    feature_flag_service = FeatureFlagService()

    if feature_flag_service.is_enabled("new_feature"):
        print("New feature enabled")
```

This enables you to simply toggle on or off features from a centralized location.

## The challenge of rolling your own feature flag service

The big problem with this simple service is that the values are hard coded and require a redeploy to change. It isn’t remotely configurable, meaning it can’t change at runtime.

The path to improving this requires building increasingly complicated features, each with downsides:

1. Use a config to store the flag values. This still requires a redeploy to update flag values. Read more in [Feature flags vs configuration: Which should you choose?](/blog/feature-flags-vs-configuration)

2. Store flag values in your database. This requires an admin panel or root access to modify the values and puts stress on your infrastructure. Database issues also impact the resiliency of flags.

3. Write an external service or use a library to manage and evaluate feature flags. New dependencies  maintenance and optimization work to ensure they remain fast and bug-free. 

Beyond these are features like adding logic for targeting, caching for speed, or resiliency for parts of the service going down. Each adds to the likelihood of introducing bugs and creating tech debt. 

Beyond the simple example we provided above, feature flag services become a classic build vs. buy decision. Building a feature flag service works well if you have a clear, simple use case. As you scale, the benefits of "outsourcing" the work to a provider of feature flags as a service becomes stronger.

## What are feature flags as a service?

A "feature flags as a service" provider is an external application that provides all the functionality for implementing and using feature flags (like [PostHog](/feature-flags)). It is a centralized location to create, manage, evaluate, and monitor your feature flags. This enables remote configuration and the best practice of decoupling deployment from release.

Feature flags as a service integrate with your app like other external services. They have a UI to create flags and then use SDKs or an API to evaluate them. For example, in PostHog, a [feature flag call](/docs/feature-flags/adding-feature-flag-code) is as simple as this:

```python
from posthog import Posthog

posthog = Posthog('<ph_project_api_key>', host='<ph_instance_address>')

is_my_flag_enabled = posthog.feature_enabled('flag-key', 'distinct_id_of_your_user')
```

Feature flag services also contain features for more complicated use cases including: 

- Targeting feature flags for percentage rollouts, [betas](/tutorials/public-beta-program), [testing in production](/blog/testing-in-production), and more.
- Multi-variant flags that enable A/B testing.
- Integrations with other external services like product analytics, CDPs, and automations.
- Speed and resiliency optimizations like local evaluation and caching.
- Logging and analytics.

## Why use a feature flags as a service provider?

The benefit of using a feature flag service is similar to the benefit of using other external services. You get the benefits of feature flags while (theoretically) minimizing their costs. This enables you to focus on building the core functionality that creates value in your business.

> **Aren’t feature flags as a service expensive?** Although you don't pay someone else to build your own feature flag service or use an open source version, you still pay to implement, maintain, and host it. This time, energy, and focus can cost much more than the dollar amount you pay a service provider.

With feature flags as a service, you gain more confidence in:

- **Usability.** The service provides a centralized location and UI to manage flags.

- **Reliability.** The service takes care of the infrastructure, redundancy, and speed.

- **Interoperability.** The service connects to any part of your application (SDKs) and other external services.

In fewer words, you pass your potential problems off to them. 

![Problems](../images/blog/feature-flags-as-a-service/problems.png)

## Deciding whether to build or buy

Like other services, the goal of a feature flag service is to help you build a successful product. Because of this, you should build instead of buy when this is true, such as when your use case is:

1. Unique enough to require a specific implementation tied to your core competency. For example, a crypto app requiring on-chain data for targeting.

2. Extremely simple. For example, you only need to toggle a feature on or off at build time.

In more complex situations, the costs of building and maintaining your own feature flag service outweigh the benefits. The usability, reliability, and interoperability you get from buying a feature flag service enables you to focus on areas of your product you can differentiate on. Buying a feature flag service is a better help for building a successful product.

## Further reading

- [Feature flag best practices and tips (with examples)](/blog/feature-flag-best-practices)
- [Why use feature flags? Benefits, types and use cases, explained](/blog/feature-flag-benefits-use-cases)
- [What you can learn from how GitHub and GitLab use feature flags](/blog/github-gitlab-feature-flags)