---
date: 2023-12-07
title: 9 essential feature flag best practices (with code examples)
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/green-blog-image.jpg
featuredImageType: full
tags:
  - Feature management
  - Feature flags
  - Product engineers
crosspost:
  - Blog
---

Feature flags, aka feature toggles, are a simple pattern with many uses. New feature to beta test? Use a feature flag. Testing variants of a new UX? Use a feature flag. Kill switch to prevent performance problems? Yup, feature flag. We could go on, but safe to say there are [many benefits to feature flags](/blog/feature-flag-benefits-use-cases).

A [feature flag service](/blog/best-open-source-feature-flag-tools) like [PostHog](/feature-flags) provides the most important flag functionality like flag management, remote configuration, analytics, edit history, and more. 

Beyond this, there are many best practices that services can't handle for you. These include implementation, usage, naming, and removal. To help you with these, we put together this guide.

## 1. Minimize or group changes behind a single flag

It's best to use a single feature flag to control a single component, function, method, class, or other pieces of code.

Developers expect a feature flag to be used in a single location. The more locations a flag is, the more likely it is to cause problems. For example, a developer could remove the flag in one place without removing it in another.

Multiple uses of the same feature flags increase overhead and maintenance. Every time a developer sees a feature flag, they must figure out its status and impact on the code. They also need to maintain all the potential states of the flag, like fallbacks.

Like pull requests, feature flags should be small and focused. This helps ensure they are easy to understand and maintain.

## 2. Fallback to working code

If a feature flag returns `false` or fails and returns `none`, you want to make sure you fall back to functioning code. This is a best practice for a few reasons:

- Knowing you can roll back to working code helps you have the confidence to do it quickly.

- If you use experiments, the fallback is the control the test is comparing against. If your fallback doesn’t work properly, it causes the experiment to be inaccurate.

- If there is a network or PostHog-related problem with the flag, you want to make sure your app continues to function.

To fallback consistently, separate new changes from existing code behind the feature flag. Test that flags returning `false` or `none` fall back to old, functional code. This ensures your app continues to work, even if your flag doesn't.

## 3. Accurately identify users

Because PostHog evaluates flags based on the user's distinct ID, having accurate [identification](/docs/getting-started/identify-users) is critical. The more accurately you can identify users, the better you can target your flags.

Having a “sticky” ID (like a cookie, which is the default in PostHog) ensures the user gets a consistent flag evaluation in your product. Without this, PostHog may evaluate the flag differently because the user could fall into a different variant.

If you use group analytics or person properties in your flag rollout, accurate identification includes setting them up properly. Users must be a part of groups or have a property for PostHog to evaluate flags relying on these.

## 4. Use local evaluation for faster flags

An underrated feature of PostHog’s feature flag functionality is the ability to evaluate flags locally. By polling the PostHog server and/or using cached feature flag data, your app can evaluate flags without waiting for another response from PostHog.

Fewer requests mean feature flags evaluate faster. This is especially useful for code with multiple flags, such as loops. Instead of waiting for multiple requests, your code can run right away (if the flag is active). 

If you are using the JavaScript Web library or the snippet, flags are locally evaluated by default. Once your application receives flag data, it saves as cookies for local evaluation. Calling `posthog.reloadFeatureFlags()` refreshes them.

If you are using another library, PostHog defaults to making a request when evaluating flags, but you can [set it up to use local evaluation](/docs/feature-flags/local-evaluation). This requires having access to all the person or group properties the flag depends on. Here’s what the local evaluation of a flag looks like for our server libraries:

<MultiLanguage>

```js
await client.getFeatureFlag(
    'beta-feature',
    'distinct id', 
    {
        personProperties: {'is_authorized': True}
    }
)
# returns string or None
```

```python
posthog.get_feature_flag(
    'beta-feature',
    'distinct id',
    person_properties={'is_authorized': True}
)
# returns string or None
```

```php
PostHog::getFeatureFlag(
    'beta-feature',
    'some distinct id',
    [],
    ["is_authorized" => true]
)
// the third argument is for groups
```

```ruby
posthog.get_feature_flag(
    'beta-feature',
    'distinct id', 
    person_properties: {'is_authorized': True}
)
# returns string or Nil
```

```go
enabledVariant, err := client.GetFeatureFlag(
        FeatureFlagPayload{
            Key:        "multivariate-flag",
            DistinctId: "distinct-id",
      PersonProperties: posthog.NewProperties().
        Set("is_authorized", true),
        },
)
```

</MultiLanguage>

> **💡 PostHog tip:** To enable local evaluation of feature flags, you may also need to set a `personal_api_key` in your server-side initialization.

## 5. Bootstrap your flags to make them available immediately

Bootstrapping your flags makes them available in the client immediately. This is useful if you want your flags to be available before the page loads, such as for a landing page A/B test or [redirect test](/tutorials/redirect-testing). 

Without bootstrapping, you must wait for the library to load and then make a request. By the time your application gets the flag data, it is too late. Your page loads without the feature flag data and any code behind the flags (after this, it saves in cookies for easy access).

To bootstrap your flags, add the relevant distinct ID and feature flag data when initializing. In Javascript, this looks like this:

```js
posthog.init('<ph_project_api_key>', {
    api_host: '<ph_instance_address>',
    bootstrap: {
        distinctID: 'your-anonymous-id',
        featureFlags: {
            'flag-1': true,
            'variant-flag': 'control',
            'other-flag': false
        }
    }
})
```

You can get values for the bootstrap object by using a server-side library. Call `getAllFlags` with a server-side library, then add those values as the `featureFlags` object in your client-side initialization. 

Bootstrapping also ensures events have accurate feature flag data. If you capture events before receiving feature flags data, data can be missing.

> You can read more about bootstrapping in [our docs](/docs/feature-flags/bootstrapping) or tutorials for [Next.js](/tutorials/nextjs-bootstrap-flags) or [React and Express](/tutorials/bootstrap-feature-flags-react).

## 6. Name your feature flags well

Here is some practical advice on naming your feature flags to avoid confusion. None of these are laws. You can create your own conventions, but consistency is critical. As an example, for us, names should:

- Relate to the feature you are flagging. Make them predictable to the next person who reads them. Their key and name should provide insight into what they do.

- Be searchable in your code. If they are too similar to other code, you can’t find them easily or people will mistake their functionality.

- Get saved as constants in a single file. PostHog saves our feature flags as [constants](https://github.com/PostHog/posthog/blob/master/frontend/src/lib/constants.tsx) that get accessed to maintain consistency and legibility.

- Use positive wording. PostHog does the same. Our library checks feature flags by calling `isFeatureEnabled`. Using “negative” wording, such as `disable-feature`, can be confusing.

- Use name “types” if you have a large number of flags. This helps organize them and makes their purpose clear. Types might include experiments, releases, and permissions. For example, instead of `new-billing`, they would be `new-billing-experiment` or `new-billing-release`.

## 7. Roll out progressively

When testing a change behind a feature flag, it is best to roll it out to a small group of users and increase that group over time. This is also known as a [phased rollout](/tutorials/phased-rollout).

At PostHog, a flag often starts rolled out to just the responsible developer. It then moves on to the internal team, then beta users, and finally into a full rollout. This enables us to [test in production](/product-engineers/testing-in-production), get multiple rounds of feedback, identify issues, and polish the feature before the full release.

Throughout the rollout, the responsible developer monitors metrics to ensure the feature is working as expected. If there are issues, they can pause the rollout or roll it back without affecting everyone.

## 8. Roll out for specific groups

Feature flags are usually checked at the person level, but there are other ways. One useful and under-utilized way is rolling out based on groups.

For example, a customer complains about an issue with your product. You create a fix for them but aren’t sure it works for everyone. You can roll it out behind a feature flag and set the distribution to members of that company.

![Group release](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/feature-flags-best-practices/group-release.png)

Enabling flags for specific groups allows the experience to be consistent for those groups. Members of an organization aren’t seeing different UIs or getting different experiences. They also act as a “permission” to access those changes.

This enables you to coordinate and communicate with those groups while rolling out features. This is especially useful for massive features, organizations, and integrations. It enables you to [beta test functionality](/tutorials/public-beta-program), do [canary releases](/tutorials/canary-release), and deal with issues before a [larger rollout](/tutorials/phased-rollout).

> **💡 PostHog tip:** Be sure to identify users as part of that group using [group analytics](/docs/product-analytics/group-analytics).

## 9. Remove flags at the right time

Leaving flags in your code for too long can confuse future developers and create technical debt, especially if it's already rolled out and integrated. It can confuse those reading the code and the flag’s details in PostHog.

Stale flags are liabilities in code. For example, old flags could hide untested code. If a flag failure causes this code to run, it can cause unexpected issues.

Everyone has different opinions on when to remove their feature flags, but here are some ideas:

- If there were multiple release cycles without an issue. Schedule cleanup along with other post-release or sprint work.

- If they are old and deal with core functionality.

- If the feature causes problems and the flag is permanently turned off. Create a new flag for the fix.

- If there are active feature flags under or over that feature flag.

- Provide a date or guidance on when to remove a feature flag in the description or comment.

- Restrict full rollout to removing the flag, such as limiting rolls out to 95% of users until removed.

Whatever you choose, it should be clear to your team when to remove a feature flag. This limits the overhead and staleness of flags. It even enables you to scan your code for flags and remove them automatically. 

## Further reading

- [What you can learn from how GitHub and GitLab use feature flags](/product-engineers/github-gitlab-feature-flags)
- [How we build features users love (really fast)](/product-engineers/measuring-feature-success)
- [Why we test in production (and you should too)](/product-engineers/testing-in-production)
