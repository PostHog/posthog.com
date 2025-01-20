---
title: Don't make these classic feature flag mistakes
date: 2025-01-13
author:
 - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/gitlab-github-flags.jpeg
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Founders
  - Blog
---

Product engineers succeed when they can ship quickly, understand if a change is working, and iterate from there. Because they let you ship, deploy, and release software safely, [feature flags](/feature-flags) are a powerful tool for doing this.

The catch? When flags are misused, they can cause disaster. They have caused downtime for the largest apps in the world, created a mountain of tech debt, and nearly bankrupted a company (we'll cover this later). Luckily, these are all avoidable mistakes we can learn from and avoid.

They boil down to two main issues:

1. **Complexity creates confusion.** Embed and interlinked flags create many potential states that can quickly become untestable and unpredictable.

2. **Poor maintainability creates tech debt.** The longer flags stick around the more likely they are to get reused in unintended ways or negatively react with new changes. 

Both create situations where mistakes and unintended consequences can happen. Avoiding them means avoiding the issues we've put together here:

## 1. Mixing business and flag logic

Structuring your usage of flags well is critical to using them. One of the biggest ways this can go wrong is by mixing flag logic with business logic.

This means having feature flag checks in your application code. For example, if you wanted to roll out a new pricing algorithm with a feature flag, a bad way structure would look like this: 

```js
// Bad mixed logic
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

This structure is difficult to test, difficult to understand the core logic, and easy to break the functionality if/when the flag changes. It is better to separate the pricing logic from the feature flag logic like this:

```js
// Good separated logic
function calculatePrice(product, pricingStrategy) {
  return pricingStrategy.calculatePrice(product);
}

// Flag logic separated into configuration/initialization
const pricingStrategy = posthog.isFeatureEnabled('new_pricing_algorithm') 
  ? new NewPricingStrategy()
  : new StandardPricingStrategy();
```

An ideal structure would use the flag in as few places as possible and abstract as much as possible behind a single flag. This creates a clear separation and isolation of flag-related code which limits complexity and improves maintainability.

Good goals for avoiding this mistake are only using the feature flag in a single spot and making it easy to remove. Accomplishing both reveals your code is structured well. 

## 2. Being surprised when flags are turned off

The core of a feature flag's value to developers is the ability to turn them off. They need to be ready for this at any point, which isn't always the case.

![Shocked by feature flag](https://res.cloudinary.com/dmukukwp6/image/upload/turnoff_941966283f.png)

As an example, a [commenter on Hacker News](https://news.ycombinator.com/item?id=24550442) shared that they had two major incidents in two years due to their feature flag service failing to return flag states and old flags unintentionally being set to false.

This hits close to home. Last year, we had an [incident](https://github.com/PostHog/post-mortems/blob/main/investigations/2024-02-28-decide%20is%20down.md) with our feature flag service that caused flags to fallback to empty responses. On top of this, some requests had exceeding long timeouts. The combination of these caused some of our customer's applications to crash. 

Of course, after fixing this, we learned and made changes like enabling customized timeouts, lowering the default timeout from 10 to 3 seconds, and moving flag requests out of our Django monolith. Regardless, it shows you a situation where flags can have an unexpected state and cause issues.

Preventing this issue is a two step process: 

1. Test each potential state of the flag. This includes a flag returning `null`. 
2. Fall back to code that works. The default should always be that your app works. 

## 3. Holding on to stale flags forever

As the saying goes: "If you love something, set it free." The same is true of feature flags. 

The opposite of this is [Knight Capital Group](https://www.henricodolfing.com/2019/06/project-failure-case-study-knight-capital.html) (KCG), a financial services firm that was *formerly* the largest U.S. equities trader on the NYSE.

To support a new private market being launched by the NYSE, KCG's team needed to build and deploy an updated trade execution system, responsible for thousands of orders per second, in a month. 

After rushing to meet an August 1st, 2012 deadline, they shipped an update replacing code in a part of their system unused since 2003. This old code wasn't meant to be used in production, but was left behind a feature flag in their codebase anyways.

As part of the release, they reused this old feature flag controlling the old code. When they deployed the update and enabled the flag, 7/8 servers worked as expected, but the 8th one triggered the old code to process orders. This server executed over 4 million executions with a value of $7.65 billion in 45 minutes, costing them $440M. KCG's shares plummeted 70%, requiring them to be rescued by outside investors and eventually get acquired. 

![Knight Capital Group](https://res.cloudinary.com/dmukukwp6/image/upload/kcg_031bb613a9.png)

The story shows the importance of removing stale flags (AKA zombie flags). These are old, unused flags that haven't been removed yet. They risk triggering unintended side effects and being used as permanent configurations. In simple terms, they are tech debt.

Of course, it is easy to say "just remove the flag" but that is too simplistic. Even "have a process for removing your flags" is too generic advice. Instead, you need to create a process that actually gets used. For example:

1. **Have criteria for when flags are stale.** For example, [PostHog](https://github.com/PostHog/posthog/blob/master/posthog/models/feature_flag/flag_status.py) considers a flag stale when it is rolled out to 100% and it hasn't been evaluated (used) in the last 30 days.

2. **All flags must have owners.** This makes someone responsible for maintaining and then removing the flag. We store flag ownership [in code](https://github.com/PostHog/posthog/blob/e34f627bf514757e88d88c097e895dd352da4d59/frontend/src/lib/constants.tsx#L138).

3. **Automate detecting and alerting stale flags.** When a flag hits the criteria, alert someone (like the owner) that it might be time to remove it. Keep reminding them until they do. Uber built a tool called [Piranha](https://www.uber.com/en-CA/blog/piranha/) to help do this. 

## 4. Red flags in flag names

Developers know that [names](https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/) matter a lot. The same is true for feature flags. 

If you need to go into Jira to figure out what a flag is for, it likely isn't a good flag. An autogenerated name might work if no one needs to implement them, but having them in code is a mistake waiting to happen. 

![Beautiful name for a child](https://res.cloudinary.com/dmukukwp6/image/upload/name_83d1189ea9.png)

Bad names are ones that:

- **Lack clarity and purpose.** Vague names can make them more likely to be reused or misinterpreted.
- **Have poor searchability.** Generic or inconsistent names require more overhead to figure out and harder to find in a codebase.
- **Have unclear functionality.** Just looking at a flag name should give you some idea if it is used in an experiment, configuration, or release. The name should also hint whether it returns a string, array, or boolean.

What does a [good name](/docs/feature-flags/best-practices#5-naming-tips) look like? They:

- **Are descriptive.** For example, `is-v2-billing-dashboard-enabled` is much clearer than `is-dashboard-enabled`. It includes useful version and product context.
- **Use name "types".** This helps organize them and makes their purpose clear. Types might include experiments, releases, and permissions. For example, instead of `new-billing`, they would be `new-billing-experiment` or `new-billing-release`.
- **Reflect their return type.** For example, `is-premium-user` for a boolean, `enabled-integrations` for an array, or `selected-theme` for a single string.
- **Use positive language for boolean flags.** For example, `is-premium-user` instead of `is-not-premium-user`. This helps avoid confusing double negatives when checking the flag value (e.g. `if !is_not_premium_user`).

## 5. Not monitoring them

On May 6th, 2020, [reports started piling in](https://github.com/facebook/facebook-ios-sdk/issues/1373) on Facebook's iOS SDK repo about crashes it was causing. Commenters discovered the cause was Facebook changing a configuration flag property from a dictionary to boolean. When the SDK pulled this value, it would error and crash the end user's app.

![Facebook SDK crash](https://res.cloudinary.com/dmukukwp6/image/upload/fbsdk_29dd24d929.png)

Compounding this issue was Facebook's lack of visibility into end user app crashes. Comments show that crashes were happening for hours before the issue was reported. Facebook's monitoring missed this issue, the fix was delayed, and it caused a significant impact on end user experience. This shows the potential impact of not monitoring your flags sufficiently.

The power of feature flags is diminished without monitoring. You can kill a broken feature if you don't know it's broken. It's like having a sprinkler system without a smoke detector. 

[A feature flag tool that has analytics built-in](/docs/feature-flags) is really helpful for this (shocking coming from us, I know). That way you can see if a release is having a negative impact on your metrics, you can quickly roll it back. [Alerts](/docs/alerts) (which we recently released) are especially helpful for this.

## 6. Letting flags be a bottleneck

As flags are related to critical code paths, even a small slowdown from them can cause major issues and stack up for end users.

For example, a common problem with using flags in A/B tests is that they flicker and show a "[flash of unstyled content](/tutorials/prevent-fouc-ab-tests)." The only real way to solve this on the client side is to slow down the page load until the flag evaluates, which isn't an option for many people.

![Flicker video](https://res.cloudinary.com/dmukukwp6/video/upload/flicker_1495a01998.mp4)

If implemented properly, bottlenecks like this should never happen. Preventing this is done through two techniques:

1. **Caching flags.** This means evaluating flags and storing them in memory for use. For example, PostHog recommends requesting flags for a user on the server-side and [bootstrapping](/docs/feature-flags/bootstrapping) them into the client.

2. **Evaluate locally.** The other part you need to do is evaluate the flags locally. That means using the flag values cached instead of making more network requests. By default, our JavaScript Web SDK does this for you and [our server-side SDKs](/docs/feature-flags/local-evaluation) can be set up to do this too.

## 7. Not using them

After showcasing all the ways feature flags can go wrong, let me end by saying that the biggest potential mistake of them all is **not using feature flags**. 

At [PostHog](/feature-flags) (and many other companies), they provide two main benefits:

1. **Safety.** Flags enable progressive rollouts and kill switch rollbacks enabling you to deploy and release new code safely.

2. **Speed.** By [separating deployment from release](/product-engineers/decouple-deployment-from-release), they enable us to do [trunk-based development](/product-engineers/trunk-based-development) meaning we can [ship more changes faster](https://newsletter.posthog.com/p/how-to-design-your-company-for-speed). 

On top of this, they let us run [A/B tests](/experiments), [beta programs](/tutorials/public-beta-program), and [dogfood](/product-engineers/dogfooding) our changes. As a [remote and async team](https://newsletter.posthog.com/p/how-we-work-asynchronously), this is critical to our success. Our tactics for developing and releasing software would be a lot more limited without them.

<NewsletterForm />