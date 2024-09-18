---
title: How we built mobile replay
date: 2024-09-18
author:
 - ian-vanagas
 - manoel-aranda-netos
rootpage: /blog
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
tags:
 - Guides
---

[Session replay](/session-replay) is one of the most powerful tools for understanding user behavior. Web session replay has been a core part of PostHog for a long time now (it was built in our first hackathon), but mobile teams have had to wait longer.

Fortunately, it's finally here on [iOS](/docs/session-replay/ios) and [Android](/docs/session-replay/android) (with [React Native](https://github.com/PostHog/posthog/issues/13269) and [Flutter](https://github.com/PostHog/posthog-flutter/issues/69) coming soon). 

What took so long? Although we had the structure to ingest and playback replays, recording them in mobile apps is much trickier than in web apps. This post goes over why and how we finally managed to overcome them.

## What's so difficult about mobile session replay

Others have complained about [the lack of good mobile replay options](https://medium.com/goodones/15-years-later-there-is-still-no-good-session-replay-for-ios-f8d335999737). Why is that the case?

### 1. Multiple platforms

The secret about web session replay industry-wide is that it largely relies on a single open source library to work: [rrweb](https://github.com/rrweb-io/rrweb). It makes building web session replays a lot easier. 

Unfortunately, rrweb for mobile doesn't exist. To build mobile session replay, we needed to do all the work ourselves, and when compared to the web, this is a lot of work. This is because, instead of a single JavaScript library, language, and SDK, mobile requires multiple (like iOS, Android, and React Native). 

There are even breaking differences within platforms. For example, Jetpack Compose uses a compositional model for UI, different from Android's traditional view-based model. This means you need to develop separate ways of doing replays when using it. iOS has a similar problem with SwiftUI.

### 2. Performance

Desktops are a lot more powerful than phones. Because of this, we need to be much more sensitive about performance. 

If you've ever tried to record your phone screen, you would know its impact on performance. Apps take longer to load, animations become choppy, reactivity degrades, and your phone heats up.

Any that degrades the experience this much is not an option for many developers.

### 3. Privacy

A big difference between web and mobile apps is the DOM. 

In web apps, this provides a hierarchical tree structure that represents and uniquely identifies elements. The web also has standardized elements, like `<input type="password">`. Combining these makes it easier to identify, mask, and exclude sensitive elements on the web.

Mobile doesn't have standardized structures or elements. Accessibility identifiers are also inconsistently implemented. This means identifying, masking, and excluding content is a lot more tricky.

### 4. Testing

We're big fans of [dogfooding](/product-engineers/dogfooding) at PostHog. Often, we are our own best users. As you might know, we don't have a mobile app. 

During development, we would need to rely on demo and open source apps. We risk creating something that doesn't work well for larger, production-quality apps.

Developing a high-quality mobile replay product means relying more on our users and their feedback.

## The prerequisites for mobile session replay

First, none of this would be possible without [Manoel](/community/profiles/30206). We had mobile experience, but not the dedicated mobile SDK experience needed for this big of a feature. Manoel had that experience and this was only possible thanks to him.

When Manoel joined the first thing he worked on was [rewriting](https://github.com/PostHog/product-internal/issues/506) the SDKs in Kotlin and Swift, removing code we didn't use, improving tests, automating deployments, and making sure they worked with the latest platforms.

We already had the other prerequisite, our existing session replay infrastructure. We had the data structure, the way to store replays, as well as a complete product for playback and analysis. All this could be reused for mobile replay.

![Replay](https://res.cloudinary.com/dmukukwp6/image/upload/replay_03a8c56981.png)

Importantly, Paul and Manoel realized the mobile data needed to be transformed into a format the rrweb player could use. They wanted to keep the rrweb schema to ensure the fewest changes possible to our API and player. To do this, they wrote a [validation and testing tool](https://github.com/PostHog/mobile-replay-data-transformer) to rapidly test the transformations before deploying it in our main app. 

Once this was done, everything was ready for the mobile replay capture to be worked on. 

## How we built mobile session replay

Work started by developing a [proof of concept](https://github.com/PostHog/posthog-android/pull/69) for Android session replay. This developed from sending anything from an Android app and being replayed to basic components like text and images.

![PoC](https://res.cloudinary.com/dmukukwp6/image/upload/mobile_b85c032c93.png)

From here, there was wireframe capture along with logs and network requests. Afterwards, there were standard Android components like radios, checkboxes, Calendar, [Toggle](https://github.com/PostHog/posthog/pull/19279), RatingBar, and more. 

These need to be transformed to render as an HTML wireframe (as rrweb expects). Many of them required custom transformation and components to render properly. For example, radio buttons didn't group, padding wasn't applied, and positioning was wrong.

Beyond this, fitting the data into a service meant for web caused many challenges. For example, click events weren't showing even though the types and data were the same as data that worked. After some investigation, we found that rrweb expects touch events to be associated with specific elements. Setting the ID to the `body` element was enough to fix it.

Once we got consistent and useful results from what we built, we recruited our first test users and iterated from there. Later, we followed a similar process for [iOS](https://github.com/PostHog/posthog-ios/pull/115).

## Solving mobile replays big problems

So how did we solve some of the big problems we identified earlier? Two were relatively simple:

1. **Multiple platforms:** Do the work to develop mobile replay for all the platforms (which is still ongoing).
2. **Testing:** Use open source and test apps to develop a proof of concept. Once complete, use our large user base to find users willing to test our prototype. Luckily, this feature had massive demand and there were users who were willing to try the earliest versions of it.

The other two have more clever solutions. 

### 1. Performance

Not slowing down people's apps was core to our mission with session replay. 

Our strategy to do wireframes was much less performance-intensive than others tools' reliance on screenshots. We still built screenshot mode, which provided a more accurate representation, but mostly focused on making our wireframe mode as good as possible. 

![Screenshot vs Wireframe](https://res.cloudinary.com/dmukukwp6/image/upload/wireframe_78ce94bd4b.png)

Many performance issues users faced were either caused by screenshot mode or unsupported data being captured. Both of these were solved by making wireframe mode better.

On top of this, we try to offload as much work to our servers as possible. For example, the transformation to the rrweb schema happens on the server side. 

### 2. Privacy

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

We added this functionality on both wireframe and screenshot mode. Although as nice as it would have been to have automatic masking like we do on the web, the ability to have masking at all enables privacy-sensitive teams to actually use replay. 

## Making mobile session replay available for everyone

Because mobile replay shares pricing with web replays, PostHog now offers the most generous free tier for mobile replays on the market. Where mobile replay was once a tool only available for large enterprise plans, now anyone can get 5000 replays for free every month.

This enables us to help more developers have the tools they need to build successful products.

## Further reading

- [The 80/20 of early-stage startup analytics](/founders/early-stage-analytics)
- [We decided to make session replay cheaper](/blog/session-replay-pricing)
- [How to set up Android session replay](/tutorials/android-session-replay) and [How to set up iOS session replay](/tutorials/ios-session-replay)