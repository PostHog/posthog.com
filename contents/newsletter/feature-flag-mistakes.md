---
title: Don't make these feature flag mistakes
date: 2025-01-23
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/maxachu_6b6bcc0983.png
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Founders
  - Blog
---


Here are two important, related facts:

1. [Product engineers](/blog/what-is-a-product-engineer) succeed when they ship quickly, understand if a change is working, and iterate.

2. You need [feature flags](/feature-flags) to do so because they let you ship, deploy, and release software safely, and quickly, at scale.

The catch? Flags are dangerous when misused.

As I’ll reveal shortly, badly managed flags have caused huge outages, a mountain of tech debt and, on one infamous occasion, almost bankrupted a company.

Typically, this happens because:

- **Complexity creates confusion.** Embedded and interlinked flags create many potential states that can quickly become untestable and unpredictable.

- **Poor maintainability creates tech debt.** Old “zombie” flags get reused in unintended ways, or negatively react with new changes.

In this issue, I’m going to share how you can avoid these problems, so you can enjoy the [benefits of feature flags](/product-engineers/feature-flag-benefits-use-cases) in peace.

## 1. Mixing business and flag logic

Correctly structuring your flag-related code is critical.

One of the biggest ways this can go wrong is by mixing flag logic with business logic.

If you wanted to roll out a new pricing algorithm with a feature flag, for example, a bad structure would look like this:

```js
// Bad mixed logic ❌

function calculatePrice(product) {
  let price = product.basePrice;
  
  if (posthog.isFeatureEnabled('new_pricing_algorithm')) {
    price = price * 1.1;
  }
  
  if (posthog.isFeatureEnabled('holiday_discount')) {
    price = price * 0.8;
  }
  
  if (posthog.isFeatureEnabled('member_pricing')) {
    if (user.isMember) {
      price = price * 0.9;
    }
  }

  return price;
}
```

The is bad because:

1. Three boolean flags create eight different states than need testing.

2. Combining the pricing rules makes each difficult to test in isolation.

3. Adding or changing rules can have unexpected consequences.

What if we added an absolute discount of $5?

This might break our tests if we expected the price to be a specific number, or always be above zero. Every test would need to handle the newly added absolute discount.

Instead, it’s better to separate the pricing logic from the feature flag logic like this:

```js
// Good separated logic ✅

function calculatePrice(product, pricingStrategy) {
  return pricingStrategy.calculatePrice(product);
}

// Flag logic separated into configuration/initialization
const pricingStrategy = posthog.isFeatureEnabled('new_pricing_algorithm') 
  ? new NewPricingStrategy()
  : new StandardPricingStrategy();
```

With this, each pricing strategy can have its own set of tests, and there are fewer states to worry about for the `calculatePrice` function. When we want to change or add a pricing strategy, we don’t need to worry about it affecting the others.

Ideally, use flags in as few places as possible and abstract as much as possible behind a single flag. This creates a clear separation and isolation of flag-related code, which limits complexity and improves maintainability.

Good goals for avoiding this mistake are to only use the feature flag in a single spot and making it easy to remove. Achieving both keeps your code well-structured.

## 2. Being surprised when flags are turned off

![Shocked by feature flag](https://res.cloudinary.com/dmukukwp6/image/upload/maxachu_meme_eacc429b59.jpg)

The whole point of a feature flag is you can turn it off when needed, so they need to be ready for this at any point.

As an example, a [commenter on Hacker News](https://news.ycombinator.com/item?id=24550442) shared how they had two major incidents in two years due to their feature flag service failing to return flag states, and old flags unintentionally being set to false.

This hits close to home. Last year, we had an [incident](https://github.com/PostHog/post-mortems/blob/main/investigations/2024-02-28-decide%20is%20down.md) with our feature flag service that caused flags to fallback to empty responses. On top of this, some requests had exceedingly long timeouts. This combination caused some of our customer's applications to crash.

Of course, after fixing this, we learned and made changes, such as enabling customized timeouts, lowering the default timeout from 10 to 3 seconds, and moving flag requests out of our Django monolith.

Regardless, it’s a good example of how flags can have an unexpected state and cause issues. There are two simple things you can do avoid this mistake:

1. **Test each potential state of the flag.** This includes a flag returning `null`.

2. **Fall back to code that works.** The default should always be that your app works.

## 3. Being overrun by zombie flags

"If you love something, set it free." The same is true of feature flags.

Indeed, leaving stale flags in your code can be catastrophic, as former employees of [Knight Capital Group](https://www.henricodolfing.com/2019/06/project-failure-case-study-knight-capital.html) (KCG), once the largest U.S. equities trader on the New York Stock Exchange (NYSE), can attest.

In 2012, KCG’s team was tasked with building and deploying an updated trade execution system for a new private market. The system would be responsible for thousands of orders per second. They had just one month.1

In their rush to meet the deadline, they shipped an update that replaced code in a part of their system unused since 2003. This old code wasn't meant to be used in production, but was left behind a feature flag in their codebase anyway.

As part of the release, they reused this old feature flag controlling the old code. When they deployed the update and enabled the flag, 7/8 servers worked as expected, but the 8th one triggered the old code to process orders.

This was the impact…

![Knight Capital Group](https://res.cloudinary.com/dmukukwp6/image/upload/kcg_031bb613a9.png)

The server executed over 4 million trades with a value of $7.65 billion in 45 minutes. The trades cost KCG $440 million and wiped 70% off the value of its shares. Eventually, KCG was rescued by outside investors and acquired.

As this story shows, old and unused flags can trigger unintended side effects, and be used as permanent configurations. In simple terms, they are tech debt that can break your app and – in some cases – do unspeakable damage.

So, what’s the solution?

It’s easy to say "just remove the flag", but that’s reductive. Even "have a process for removing your flags" is too generic advice. Instead, you need a simple, process of accountability, such as:

1. **Consistent stale flag criteria.** In PostHog, for example, a flag is stale when it is rolled out to 100% and it hasn't been evaluated (used) in the last 30 days.

2. **Flags must have owners.** This makes someone responsible for maintaining and then removing the flag. We store flag ownership [in code](https://github.com/PostHog/posthog/blob/e34f627bf514757e88d88c097e895dd352da4d59/frontend/src/lib/constants.tsx#L138).

3. **Automated detection and alerts.** When a flag hits the criteria, alert someone (like the owner) that it might be time to remove it. Keep reminding them until they do. Uber built a tool called [Piranha](https://www.uber.com/en-CA/blog/piranha/) to do this.

## 4. Red flags in flag names

![Beautiful name for a child](https://res.cloudinary.com/dmukukwp6/image/upload/name_83d1189ea9.png)

There’s no excuse for flags names that don’t make sense.

**Bad names:**

- **Lack clarity and purpose.** Vague names can make flags more likely to be reused or misinterpreted.

- **Have poor searchability.** Generic or inconsistent names require more overhead to figure out and are harder to find in a codebase.

- **Have unclear functionality.** Just looking at a flag name should give you some idea if it is used in an experiment, configuration, or release. The name should also hint whether it returns a string, array, or boolean.

**Good names:**

- **Are descriptive.** For example, `is-v2-billing-dashboard-enabled` is much clearer than `is-dashboard-enabled`. It includes useful version and product context.

- **Use name "types".** This helps organize them and makes their purpose clear. Types might include experiments, releases, and permissions. For example, instead of `new-billing`, they would be `new-billing-experiment` or `new-billing-release`.

- **Reflect their return type.** For example, `is-premium-user` for a boolean, `enabled-integrations` for an array, or `selected-theme` for a single string.

- **Use positive language for boolean flags.** For example, `is-premium-user` instead of `is-not-premium-user`. This helps avoid confusing double negatives when checking the flag value (e.g. `if !is_not_premium_user`).

## 5. Not monitoring them

Here’s a textbook example of what can happen when you don’t

On May 6th, 2020, Facebook’s iOS SDK repo was inundated with [reports](https://github.com/facebook/facebook-ios-sdk/issues/1373) it was causing apps to crash.

Comments show that crashes were happening for hours before the issue was reported, but Facebook's monitoring missed this issue, the fix was delayed, and user experience was significantly degraded.

![Facebook SDK crash](https://res.cloudinary.com/dmukukwp6/image/upload/fbsdk_29dd24d929.png)

The community eventually discovered the cause was Facebook changing a configuration flag property from a dictionary to boolean. When the SDK pulled this value, it would error and crash the end user's app.

You can’t kill a broken feature if you don't know it's broken. It's like having a sprinkler system without a smoke detector, which is why feature flags + monitoring = success.

[A feature flag tool that has analytics built-in](/docs/feature-flags) is really helpful for this (shocking coming from us, I know). That way you can see if a release is having a negative impact on your metrics, you can quickly roll it back. [Alerts](/docs/alerts) (which we recently released) are especially helpful for this, too.

## 6. Letting flags be a bottleneck

As flags are related to critical code paths, even a small slowdown from them can cause major issues and stack up for end users.

A common problem with using flags in A/B tests is that they flicker and show a "[flash of unstyled content](/tutorials/prevent-fouc-ab-tests)." The only real way to solve this on the client side is to slow down the page load until the flag evaluates, which isn't an option for many people.

![Flicker video](https://res.cloudinary.com/dmukukwp6/video/upload/flicker_1495a01998.mp4)

If implemented properly, bottlenecks like this should never happen. Preventing this is done through two techniques:

1. **Caching flags.** This means evaluating flags and storing them in memory for use. For example, we recommend requesting flags for a user on the server-side and [bootstrapping](/docs/feature-flags/bootstrapping) them into the client.

2. **Evaluate locally.** The other part you need to do is evaluate the flags locally. That means using the flag values cached instead of making more network requests. By default, our JavaScript Web SDK does this for you and our [server-side SDKs](/docs/feature-flags/local-evaluation) can be set up to do this too.

## 7. Not using them

After showcasing all the ways feature flags can go wrong, let me end by saying that the biggest potential mistake of them all is **not using feature flags**.

At [PostHog](/feature-flags) (and many other companies), they provide two main benefits:

1. **Safety.** Flags enable progressive rollouts and kill switch rollbacks enabling you to deploy and release new code safely.

2. **Speed.** By [separating deployment from release](/product-engineers/decouple-deployment-from-release), they enable us to do [trunk-based development](/product-engineers/trunk-based-development) meaning we can [ship more changes faster](https://newsletter.posthog.com/p/how-to-design-your-company-for-speed). 

On top of this, they let us run [A/B tests](/experiments), [beta programs](/tutorials/public-beta-program), and [dogfood](/product-engineers/dogfooding) our changes. 

As a [remote and async team](https://newsletter.posthog.com/p/how-we-work-asynchronously), this is critical to our success. Our tactics for developing and releasing software would be a lot more limited without them.

For more tips using feature flags, read our [feature flag best practices](/docs/feature-flags/best-practices) in our docs.

<NewsletterForm />