---
title: How we built mobile replay (and why it took so long)
date: 2024-10-16
author:
 - ian-vanagas
 - manoel-aranda-neto
rootpage: /blog
featuredImage: >- 
  https://res.cloudinary.com/dmukukwp6/image/upload/mobile_replay_7ff47733d8.png
featuredImageType: full
tags:
 - Guides
---

Web session replay has been a core part of PostHog since our first hackathon way back in 2020, but we only released our first betas for mobile apps in April of this year.

Why the long wait? 

1. We had more demand from web-based B2B customers during our early-stage phase.

2. We went wide instead of deep. We shipped a whole suite of products, including feature flags, experiments, surveys and (more recently) our own data warehouse.

3. Building performant and functional replay for mobile apps is way harder than web.

Happily, after several months of hard work from the replay team, we have betas for [iOS](/docs/session-replay/ios), [Android](/docs/session-replay/android), [React Native](/docs/session-replay/react-native), and [Flutter](/docs/session-replay/flutter).

This post covers how it works and some of the technical challenges we overcame it make it.

## What's so difficult about mobile session replay?

Developers frequently complain about [the lack of good mobile replay options](https://medium.com/goodones/15-years-later-there-is-still-no-good-session-replay-for-ios-f8d335999737). 

The existing options were too expensive, ruined performance, lacked privacy controls, or locked behind [annoying salespeople](/founders/negotiate-software-better). These are all antithetical to how we do things at PostHog.

But why was it this way for so long?

### 1. Multiple platforms

The industry's big secret about web session replay is that it largely relies on a single open-source library to work: [rrweb](https://github.com/rrweb-io/rrweb). It includes tools for recording web interactions and state changes, structuring session data, and playback.

Unfortunately, rrweb for mobile doesn't exist. To build mobile session replay, you simply need to do a lot of work. Instead of a single JavaScript SDK, mobile requires multiple (like iOS, Android, React Native, and Flutter) and all the building and testing that goes with it.

There are even breaking differences within platforms. Jetpack Compose, for example, uses a compositional model for UI, which is different from Android's traditional view-based model. This means you need to develop separate ways of doing replays when using it. iOS has a similar problem with SwiftUI versus UIKit.

### 2. Performance

Phones are much less powerful than desktops, and not all phones are a top-of-the-line iPhone. Because of this, we need to be much more sensitive about performance. 

If you've ever tried to record your screen on an older phone, you would know its impact on performance. Apps take longer to load, animations become choppy, reactivity degrades, and your phone heats up.

Developers need to support a wide range of devices, so they need to be especially careful about performance. Anything that degrades user experience is not an option for many developers.

### 3. Privacy

To protect user privacy, developers often mask and exclude sensitive information. The tricky part of this is identifying what information is sensitive.

Web apps rely on the DOM to do this. The DOM provides a hierarchical tree structure that represents and uniquely identifies elements. The web also has standardized elements, like `<input type="password">`. Combining these makes it easier to identify, mask, and exclude sensitive elements on the web.

Mobile doesn't have standardized structures or elements. Accessibility identifiers are also inconsistently implemented. This means identifying, masking, and excluding content is a lot trickier.

### 4. Testing

We're big fans of [dogfooding](/product-engineers/dogfooding) at PostHog. This helps us [test in production](/product-engineers/testing-in-production), find issues, and fix them before they affect users. We can often ship a feature early because we can test it ourselves.

Unfortunately, like most analytics tools, PostHog is built for the desktop and we don't have a mobile app. We can't dogfood mobile replay and need to spend more time testing in development to make up for it.

This means relying more on demo and open source apps as well as our users and their feedback. If we were not careful, we would ship more bugs and build something that doesn't work well for larger, production-quality apps.

## How we solved these problems

### 1. Multiple platforms

The solution to this problem is plastered on motivation posters everywhere: **do the work** (to develop for each platform).

The one thing that made this easier was reusing our existing session replay infrastructure. This included the data structure, the way to store replays, as well as a complete product for playback and analysis.

![Replay](https://res.cloudinary.com/dmukukwp6/image/upload/replay_03a8c56981.png)

The first platform-specific work we did was rewriting the SDKs in Kotlin and Swift, removing code we didn't use, improving tests, automating deployments, and making sure they worked with the latest platforms.

Once updated, we could get on with the work developing platform-specific proof-of-concepts.

### 2. Performance

Not slowing down people's apps was core to our mission with session replay. 

To do this, we initially focused on capturing wireframes instead of screenshots. Using wireframes enabled us to have better control over what and how we captured recordings. We could optimize performance-intensive components like images and animations.

![Screenshot vs Wireframe](https://res.cloudinary.com/dmukukwp6/image/upload/wireframe_78ce94bd4b.png)

Building wireframe mode meant starting from capturing and rendering the smallest amount of data and building up to more complex components. In our [Android proof-of-concept](https://github.com/PostHog/posthog-android/pull/69), we started by using `Curtains` to capture the view hierarchy, listen for changes, and track touch events. We then transformed this data to render it as an HTML wireframe (as rrweb expects).

![PoC](https://res.cloudinary.com/dmukukwp6/image/upload/mobile_b85c032c93.png)

Once this was working, we worked to capture standard Android components like radios, checkboxes, Calendar, [Toggle](https://github.com/PostHog/posthog/pull/19279), and RatingBar. Many of them required custom transformation and components to render properly. For example, radio buttons didn't group, padding wasn't applied, and positioning was wrong.

Beyond this, fitting the data into a service meant for the web caused many challenges. For example, click events weren't showing even though the types and data were the same as the web data. After investigation, we found that rrweb expects touch events to be associated with specific elements. Setting the ID to the `body` element was enough to fix it.

Once we got consistent and useful results from what we built, we recruited our first test users and iterated from there. Later, we followed a similar process for [iOS](https://github.com/PostHog/posthog-ios/pull/115).

> **What about screenshot mode?** We didn't forget about it. After developing wireframe mode, we continued to make improvements to screenshot mode. This included:
> - Doing as much work as possible off the main thread to avoid blocking.
> - Converting images to JPEGs at 30% of original quality.
> - Only taking a screenshot when there is interactions, so if the app does nothing for 10 minutes, there's no screenshot taken.
>
> Screenshots now tend to be around 20kb (each) before compression, and for most of our users, this has become their preferred option.

### 3. Privacy

As for privacy, we built the ability to mask all text inputs and images as well as redact certain views by adding `ph-no-capture` tags like this:

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

<ProductScreenshot
  imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/v1725526016/posthog.com/contents/Screenshot_2024-09-05_at_9.46.17_AM.png"
  imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/v1725526016/posthog.com/contents/Screenshot_2024-09-05_at_9.46.32_AM.png" 
  alt="iOS session replays in PostHog" 
  classes="rounded"
/>

We want to change this. Mobile replay is free while in beta, and once it's out of beta, we'll follow [our pricing principles](/handbook/engineering/feature-pricing), making it as affordable as possible.

This enables us to help more developers have the tools they need to build successful products.

## Further reading

- [What's the best Hotjar for mobile apps?](/blog/hotjar-for-mobile-ios-android-react-native-flutter)
- [We decided to make session replay cheaper](/blog/session-replay-pricing)
- How to set up [Android](/tutorials/android-session-replay), [iOS](/tutorials/ios-session-replay), and [React Native](/docs/session-replay/react-native) session replay
