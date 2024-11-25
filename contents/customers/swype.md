---
title: 'How Swype uses mobile session replays for testing, user insights'
customer: Swype
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/swype_34c89913d9.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/swype_logo_dark_acb437c1ef.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/swype_34c89913d9.png
featuredCustomer: false
industries:
  - 'Recruitment, Data'
users:
  - Founder
  - Engineering
toolsUsed:
  - Session replay
  - Mobile
  - Insights
date: 2024-10-22
---

Built in just over a month, [Swype](https://swype.jobs/) is an iOS app that helps people find new jobs using a tailored AI agent. Like Tinder for jobs, candidates can swipe left and right to dismiss or automatically apply for interesting roles — and the team built PostHog into the app from the start to get the insights they need. 

“We were considering options like Firebase Analytics or building our own analytics,” says Swipe’s founding full-stack engineer, David Alade. “We thought about either sending messages to our backend, or using something like Sentry to send logs from the app — but we settled on PostHog because of how easy it was to set everything up and present the data.”

Analytics was an early need, but it wasn’t the only tool the team was interested in. Swype’s app has such a streamlined and simplified interface that they quickly realized how challenging it would be to extrapolate much knowledge from event tracking alone. They needed another way to observe user behavior in a more holistic and intuitive way.

“The thing about mobile app development is you want to really reduce complexity and the number of buttons per page,” explains David. “But then it’s hard to spot in the data alone when you’re so close to what you’re building. Session replays are great because you can just _see_ what’s happening: I can see them clicking things again and again in frustration.”

Tempted by the monthly allowance of 5,000 free replays, David quickly deployed PostHog mobile replays using [the iOS SDK](/docs/libraries/ios) and using it alongside product

### One reason why PostHog is better than Netflix

Since deploying mobile replays, David watches as many recordings as he can — sometimes even watching them in an uninterrupted stream when he doesn’t have a particular event he wants to filter by. 

“Maybe I’m a little weird but sometimes I’ll just binge on mobile replays,” says David. “I’ll just put it on like it’s Netflix and I’ll watch them all and take notes as I go. I’ll use filters if I want to see what a specific user is doing, but if someone has paid in our app? I watch their replay from beginning to end and ask myself how I can make everyone else have this experience.”

David’s approach isn’t the only way to watch session recordings — there are saved filters, playlists, and an activity score that helps rank replays by value — but this process works for him. Often it helps him notice surprising details about the user experience. 

“There’s been a few times when I’ve noticed users have issues with searching or filtering,” says David. “I’ll see things like a user clicking a button that doesn’t work because they think that’s what they’re supposed to do, then clicking it over and over, and I’ll be like: ‘I have to fix that’.”

### How to get more swipe-rights with PostHog

Mobile replays have also proven useful in other areas for David, such as testing new versions or monitoring some aspects of app performance. Console logs, for example, provide information about network latency that can sometimes help add context to a user’s behaviour. 

“I’d say one of the underrated things about mobile replays is being able to see how the UI looks on smaller devices,” says David. “I don’t always want to test the UI on every device size and will often test on my phone quickly — but I have a large phone. There have been a few times where I find an issue in replays. 

The interoperability of tools in PostHog also means that David can use replays to get context on user behavior in other ways. It’s effortless to jump from a funnel in product analytics to a relevant replay, for example — and that helps the team get insights as the experiment with app design, pricing, and more. 

“For example, we used to give everyone five free job credits every day,” says David. “And now we’re taking that away. You’ll get five free credits at the start, then you have to refer friends or pay. We were expecting a huge drop off because nobody would have credits, but we haven’t seen it — so we’re investigating that a lot at the moment and it's pretty easy with PostHog!”
