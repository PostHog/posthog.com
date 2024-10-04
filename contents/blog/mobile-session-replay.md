---
title: How we built mobile replay (and why it took so long)
date: 2024-10-04
author:
 - ian-vanagas
 - manoel-aranda-neto
rootpage: /blog
featuredImage: >- 
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
tags:
 - Guides
---

[Session replay](/session-replay) is one of the most powerful tools for understanding user behavior. Web session replay has been a core part of PostHog for a long time now (it was built in our first hackathon), but mobile teams have had to wait longer.

Fortunately, it's finally here on [iOS](/docs/session-replay/ios), [Android](/docs/session-replay/android), and [React Native](/docs/session-replay/react-native) (with [Flutter](https://github.com/PostHog/posthog-flutter/issues/69) coming soon). 

What took so long? Although we had the structure to ingest and playback replays, recording them in mobile apps is much trickier than in web apps. This post goes over why and how we finally managed to overcome them.

## What's so difficult about mobile session replay?

Others have complained about [the lack of good mobile replay options](https://medium.com/goodones/15-years-later-there-is-still-no-good-session-replay-for-ios-f8d335999737). Why is that the case?

### 1. Multiple platforms

The industry's big secret about web session replay is that it largely relies on a single open source library to work: [rrweb](https://github.com/rrweb-io/rrweb). It includes tools for recording web interactions and state changes, structuring session data, and playback. 

Unfortunately, rrweb for mobile doesn't exist. To build mobile session replay, we needed to do all the work ourselves, and when compared to the web, this is a lot. Instead of a single JavaScript SDK, mobile requires multiple (like iOS, Android, React Native, and Flutter). 

There are even breaking differences within platforms. For example, Jetpack Compose uses a compositional model for UI, which is different from Android's traditional view-based model. This means you need to develop separate ways of doing replays when using it. iOS has a similar problem with SwiftUI versus UIKit.

### 2. Performance

Phones are much less powerful than desktops. Because of this, we need to be much more sensitive about performance. 

If you've ever tried to record your phone screen, you would know its impact on performance. Apps take longer to load, animations become choppy, reactivity degrades, and your phone heats up.

Anything that degrades your user experience is not an option for many developers.

### 3. Privacy

A big difference between web and mobile apps is the DOM. 

In web apps, this provides a hierarchical tree structure that represents and uniquely identifies elements. The web also has standardized elements, like `<input type="password">`. Combining these makes it easier to identify, mask, and exclude sensitive elements on the web.

Mobile doesn't have standardized structures or elements. Accessibility identifiers are also inconsistently implemented. This means identifying, masking, and excluding content is a lot trickier.

### 4. Testing

We're big fans of [dogfooding](/product-engineers/dogfooding) at PostHog. Often, we are our own best users, but we don't have a mobile app. 

This meant that during development we relied on demo and open source apps. This risks creating something that doesn't work well for larger, production-quality apps.

Developing a high-quality mobile replay product means relying more on our users and their feedback.

## Solving mobile session replay's big problems

Here's how we tackled all four of these:

### 1. Multiple platforms

We took a simple approach to solving this problem: do the work to develop for each platform.

The one thing that made this easier was reusing our existing session replay infrastructure. This included the data structure, the way to store replays, as well as a complete product for playback and analysis.

![Replay](https://res.cloudinary.com/dmukukwp6/image/upload/replay_03a8c56981.png)

The first platform-specific work we did was rewriting the SDKs in Kotlin and Swift, removing code we didn't use, improving tests, automating deployments, and making sure they worked with the latest platforms.

Once updated, we could get on with the work developing platform-specific proof-of-concepts.

### 2. Performance

Not slowing down people's apps was core to our mission with session replay. 

To do this, we decided to focus on capturing wireframes instead of screenshots. Although we built both in the end, wireframe mode is much less performance-intensive, meaning it is the mode users prefer.

![Screenshot vs Wireframe](https://res.cloudinary.com/dmukukwp6/image/upload/wireframe_78ce94bd4b.png)

Building wireframe mode meant starting from capturing and rendering the smallest amount of data and building up to more complex components. In our [Android proof-of-concept](https://github.com/PostHog/posthog-android/pull/69), we started by using `Curtains` to capture the view hierarchy, listen for changes, and track touch events. We then transformed this data to render it as an HTML wireframe (as rrweb expects).

![PoC](https://res.cloudinary.com/dmukukwp6/image/upload/mobile_b85c032c93.png)

Once this was working, we worked to capture standard Android components like radios, checkboxes, Calendar, [Toggle](https://github.com/PostHog/posthog/pull/19279), and RatingBar. Many of them required custom transformation and components to render properly. For example, radio buttons didn't group, padding wasn't applied, and positioning was wrong.

Beyond this, fitting the data into a service meant for the web caused many challenges. For example, click events weren't showing even though the types and data were the same as the web data. After investigation, we found that rrweb expects touch events to be associated with specific elements. Setting the ID to the `body` element was enough to fix it.

Once we got consistent and useful results from what we built, we recruited our first test users and iterated from there. Later, we followed a similar process for [iOS](https://github.com/PostHog/posthog-ios/pull/115).

Beyond our focus on wireframe mode, the biggest performance improvements came from getting mobile replay into the hands of our users. We found and solved multiple performance issues thanks to their feedback.

### 3. Privacy

As for privacy, we built the ability to mask all text inputs and images as well as redact certain views with `ph-no-capture` like this:

<MultiLanguage>

```xml
<ImageView
    android:id="@+id/imvProfilePhoto"
    android:layout_width="200dp"
    android:layout_height="200dp"
    android:tag="ph-no-capture"
/>
```

```swift
let imvProfilePhoto = UIImageView(frame: CGRect(x: 50, y: 50, width: 100, height: 100))
imvProfilePhoto.accessibilityIdentifier = "ph-no-capture"
```

</MultiLanguage>

We added this functionality on both wireframe and screenshot mode. As nice as it would have been to have automatic masking like we do on the web, the ability to have masking at all enables privacy-sensitive teams to actually use replay. 

There are more challenges to solve, specifically around [SwiftUI](https://github.com/PostHog/posthog-ios/issues/162) and Jetpack Compose, since the way they transpile code causes the representation to not be a 1:1 match and properties are lost.

### 4. Testing

We solved the testing problem in 3 key ways:

1. **Building testing tools:** <TeamMember name="Paul D'Ambra" /> and <TeamMember name="Manoel Aranda Neto"/> wanted to keep the rrweb schema for mobile replay to ensure the fewest changes possible to our API and player. To do this, they wrote a [validation and testing tool](https://github.com/PostHog/mobile-replay-data-transformer) to rapidly test the transformations before deploying it in our main app.

2. **Using open source apps:** The team found a [list of open source apps](https://github.com/pcqpcq/open-source-android-apps) they could test with. This helped find issues, support more edge cases, and build test coverage.

3. **Testing in production:** Luckily, mobile replay had massive demand. We could rely on our users to test in production and give us feedback. We recruited users from the public issues for mobile replay, sales conversations, and existing mobile SDK users.

## Making mobile session replay available for everyone

In many ways, mobile has been neglected by the analytics industry. Tools like session replay have either not existed, been locked behind enterprise plans, or been too expensive for most developers.

We want to change this. Mobile replay is free while in beta, and once it's out of beta, we'll follow [our pricing principles](/handbook/engineering/feature-pricing), making it as affordable as possible.

This enables us to help more developers have the tools they need to build successful products.

## Further reading

- [The 80/20 of early-stage startup analytics](/founders/early-stage-analytics)
- [We decided to make session replay cheaper](/blog/session-replay-pricing)
- How to set up [Android](/tutorials/android-session-replay), [iOS](/tutorials/ios-session-replay), and [React Native](/docs/session-replay/react-native) session replay
