---
title: What can we learn from how Duolingo uses A/B tests?
date: 2024-09-24
author:
  - bijan-boustani
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/experiment-hog.jpg
featuredImageType: full
tags:
  - Experiments
  - Product engineers
crosspost:
  - Blog
---

Duolingo has experienced insane growth over the past few years, with a market cap recently exceeding $10B. ["Test everything"](https://blog.duolingo.com/improving-duolingo-one-experiment-at-a-time/) is one of their core principles, and it credits **A/B testing** as _the_ source of the company's success. [source](https://www.youtube.com/watch?v=9KqrnBiyBQ8)

In this article, we'll try to extract a few lessons from Duolingo's experimentation process.

- add engaging details to your product until it stands out in a sea of uninspired competitors
- build a massive audience by offering a generous free tier
- decrease friction until users develop ~~an unhealthy addiction~~ a healthy craving for your app
- align the goals of your users with the goals of your company

## 🕹️ Lesson 1: Think of your product as a detailed game

Luis von Ahn, the CEO of Duolingo, credits Duolingo's rapid rise to the app being mobile, free, and _fun_. In other words, it was easy to try and it was built around an engaging, _game-like_ experience. They were able to take a market that has been around for thousands of years (learning new languages) and introduce modern game design to make it sticky.

And what's interesting about game design is that it's all about how tiny details can have a surprisingly large impact on the overall experience. There's a term called _"game juice"_ (or game feel) that attempts to capture the intangible feeling you get from playing a game, and it can apply to products as well. Certain products just seem to have a certain "feel" baked into them, right?

- We can test subtle changes to copy
- Or test responses to a distinctive color palette (doesn't _Bluey_ just feel comforting to watch?)
- Or test a sound effect like a little _\*ding\*_ when you get the right answer to a question
- Or test how a detailed animation can add resonance to a particular milestone

![Duolingo Animation Example](https://res.cloudinary.com/dmukukwp6/image/upload/duo_animation_07292d1c86.gif)
<Caption>Duolingo incorporates detailed animations in their lessons. Here's an example of where they added some resonance to the milestone of reaching a year-long streak.</Caption>

All those details add up! There's a conference talk about this topic called [_The Art of Screenshake_](https://www.youtube.com/watch?v=AJdEqssNZ-U), where game designer Jan Willem Nijman takes a banal example of a platform game and keeps adding tiny details to it until the game is noticeably better at the end.

> "Think of any feature that you’ve come across while using Duolingo. Animated skill icons? The result of an experiment. Adding five new leagues to the Leaderboard? Also the result of an experiment. The amount of tears that our owl mascot, Duo, cries in your inbox when you forget to do your lessons? You guessed it." [source](https://blog.duolingo.com/improving-duolingo-one-experiment-at-a-time/)

What Duolingo is doing is taking all the tiny details of their product experience and A/B testing them to see what users respond to. For more specifics on how they run their tests, check out [improving Duolingo, one experiment at a time](https://blog.duolingo.com/improving-duolingo-one-experiment-at-a-time/) on their blog.

## 🆓 Lesson 2: Build your audience with a free tier

Before we can start running experiments on all those tiny details, we need real-world usage data. And we'll need a lot of data for our experiments to yield conclusive results. Duolingo's recipe looked something like this:

1. Give away their product for free
2. Grow rapidly as a result of that free tier
3. Collect a treasure trove of usage data
4. Run experiments against all that data

Duolingo has 34M daily active users 😳. And 90% of those are non-paying users. But those free users complete 13B exercises every week, which allows Duolingo to not only run experiments, but ensure that their findings are [statistically significant](/docs/experiments/experiment-significance).

Not every startup is going to have an audience that size. If you're running an early stage startup with a small number of users, it may be more effective to watch [session replays](/session-replay) to see how people are interacting with your product. But offering a generous free tier (send me an invite!) can drive more users that you can leverage for continual improvements to the product over time. If you're getting started, check out these additional guidelines about [when to run your first A/B test](/product-engineers/how-to-do-ab-testing#when-to-run-your-first-ab-test).

## 📈 Lesson 3: Use tests to strive for a more seamless onboarding

Once we have some user data to work with, we can look at a more concrete example where Duolingo was able to use A/B testing to improve their onboarding experience. They identified an early leak in the funnel and found a cohort of people that were downloading the app but balked at going through the sign up process.

Having users sign up is still a critical part of the flow, because it allows them to track their progress and receive emails and notifications. But the solution was to use an A/B test to change where the sign up experience happens.

> "Simply moving the sign-up screen back a few steps led to about a 20% increase in DAUs." Gina Gotthilf

Rather than prompting people to sign up immediately, they gave new users the ability to try a lesson first. That solved the problem of losing an early cohort of users, and then they were able to prompt the users later in the experience to sign up after they had already gotten value from the lessons. You can read more about this in the [tenets of A/B testing](https://review.firstround.com/the-tenets-of-a-b-testing-from-duolingos-master-growth-hacker/).

![Super Mario Bros. Visual](https://res.cloudinary.com/dmukukwp6/image/upload/mario_onboarding_4d694891db.jpg)

The first level of Super Mario Bros. is considered a masterclass in onboarding. There is no expository pop-up that says "Welcome! Press the right arrow button to start moving right." Instead, you start situated at the left of the screen; so it's intuitively obvious that you should probably start moving to the right, where Mario is pointing and all the stuff seems to be located. We can take onboarding cues from examples like this and Duolingo to decrease friction in the onboarding experiences we build.

## 🎯 Lesson 4: Help people with _their_ goals (not yours)

If word of mouth is your primary marketing vehicle, you want people to tell their friends about how awesome your product made _them_, not just how awesome your product is. Consider the following:

> "I just got back from my dream vacation to Venice!"<br>
> "Really? Do you speak Italian?"<br>
> "I didn't have time to take a long course. But I did a couple Duolingo lessons every day for the past few months. By the time I got to Venice, I had no problem getting by."

For Duolingo, it's important that users keep coming back. Not only because it's good for their company, but also because that's how learning works. It's hard to learn a new language if you're only studying once a week. If you can build a consistent study habit, you can chip away at it and learn over time. It's a huge opportunity for Duolingo to make their product more engaging, but also to help users achieve their goals of learning a language.

When it comes to product engagement, there is a fine line between:

- spamming people with reminders to get them to keep using your product
- encouraging using your product because it's genuinely helping them achieve a goal

A/B testing streak reminders provides a great example of aligning these goals. They tinkered with the copy, the timing, the frequency, and personalization of these reminders to get them just right. If you think about it, it doesn't make sense to get a streak reminder while you're asleep. And users probably have different times of the day when they are able to allocate time for study. Running experiments allowed them to find compounding improvements for personalized copy at just the right time of day.

## 🧪 Actionable things to try

Here are a couple of actionable takeaways to think about when building your product:

- Try going through the full onboarding experience for your product. Can you identify the top 2 friction points? Is there a quicker path for users to get value from your product? Can you run a test to figure out whether or not removing a superfluous form field makes a difference?
- Run a test on the copy for your sign up button. Should it say "Sign up" or "Register" or "Get started" or "Try it for free"? Does it matter? This is a good place to start because you want to find something that's [easy to implement with a large potential impact](/product-engineers/how-to-do-ab-testing#where-to-run-your-first-ab-test). Does that test lead to others? What if you change the color, or the size, or add some fancy animations and hover states? Can you incorporate testing into your product development process?

## 📚 Further reading

- [How Duolingo Turned a Free Language App Into a $7.7B Business](https://www.youtube.com/watch?v=9KqrnBiyBQ8) from the Wall Street Journal
- [Improving Duo, One Experiment at a Time](https://blog.duolingo.com/improving-duolingo-one-experiment-at-a-time/) from the Duolingo Blog
- [The Tenets of A/B Testing](https://review.firstround.com/the-tenets-of-a-b-testing-from-duolingos-master-growth-hacker/) from First Round
- [A/B Testing Mistakes](/product-engineers/ab-testing-mistakes) from PostHog
- [Getting Real: Free Samples](https://basecamp.com/gettingreal/12.1-free-samples) from Basecamp
- [The Art of Screenshake](https://www.youtube.com/watch?v=AJdEqssNZ-U) from Jan Willem Nijman
- [Badass: Making Users Awesome](https://www.amazon.com/Badass-Making-Awesome-Kathy-Sierra/dp/1491919019) by Kathy Sierra

<NewsletterForm />
