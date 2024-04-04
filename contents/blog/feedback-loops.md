---
date: 2022-02-04
title: How I learned to love feedback loops (and make better products)
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author:
  - neil-kakkar
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/blog/posthog-engineering-blog.png
featuredImageType: full
category: Engineering
---

I recently wrote a blog post for my personal site about the <a target='_blank' rel="noopener" href='https://neilkakkar.com/How-I-Own-Projects-as-a-Software-Engineer.html'>lessons I'd learned from leading my first two projects as a Software Engineer at PostHog </a>. In it, I lay out a five-step approach for how I own projects.  

One common theme that stood out was how feedback loops between each stage lead to much better decisions. In this post, I want to talk about why these feedback loops are useful, and how to actively seek iterative gains from these loops.

## My aggressive approach to feedback loops

To recap, the five steps I mentioned are

>  1. Gather Context
>  2. Figure out a solution
>  3. Build
>  4. Gather Feedback
>  5. Align metrics with feedback

I expect most people are familiar with agile development, which makes the basic case for gathering feedback: Finding out you're building the wrong thing before you've built it lets you be a lot faster than finding this out once you've built something.

But what if, instead of getting feedback on the product, you get feedback on each stage you go through? If feedback is good, and helps keep you on the right track, getting feedback between each step should be better than getting feedback only at the end.[^1]

[^1]: There's a case to be made about diminishing returns, and the cost of effort it takes to create the feedback loop, which is why you wouldn't want to extend this argument to "gathering feedback every hour/minute/second"

I like the five-step model because it provides [natural schelling points](https://en.wikipedia.org/wiki/Focal_point_(game_theory)) to check for feedback.

For example, when gathering context and figuring out the problem, I love involving teammates, especially product owners. We explore competitor products together. We make discussion and strategy threads open, so everyone in the company can see and contribute to it. It’s valuable to hear from colleagues who might have more context because they were previously an insider or have other relevant knowledge. [Here's a recent example for automated insights](https://github.com/PostHog/posthog/issues/8261)

None of this happens automatically, but asking the question: "How can I verify my thinking?" actively forces me to seek feedback. One of the highest leverage activities I can do here is reducing the barrier of entry for others to give feedback.

Another good example you might be familiar with is the maxim: "Make small pull requests". The generating function behind this maxim is faster feedback loops. Smaller pull requests are easier to review, which not only helps catch problems quickly, but ensures you get feedback faster. Imagine how much faster you get things done and how much better your code looks when you have small PRs that get reviewed quickly, vs. a 500 line change that takes reviewers ages to get to.
 
Threading together feedback loops like these allows you to explore a larger sample space of solutions.

For example, consider you're in the build phase. You've come up with a solution, and are building out the solution. It may happen that you hit a technical snag. Now, usually, you'd look for technical solutions to a technical problem. However, this can sometimes be counterproductive.

## How feedback loops helped make PostHog better – an example

Here's a concrete example. [Experimentation](/docs/user-guides/experimentation) is a new feature we've been building that allows users to run A/B tests. We have feature flags, and you can use these in your code to show A & B variants of a website, and we automatically measure results like significance, and whether you should switch or not.

We decided to allow users to reuse an existing [Feature Flag](/docs/user-guides/feature-flags) to do experiments. This made sense because people would create the feature flag, test the A/B versions look alright, and then use that same Feature Flag in an experiment, without having to do any code changes.

However, during implementation I found that this made variant distribution very tricky. Making things work like this meant the results would not be 100% accurate, unless I go through several technical hoops to guarantee distribution.[^2] This would've taken much longer.

[^2]: [The specifics are in this GitHub comment](https://github.com/PostHog/posthog/issues/7462#issuecomment-987868293). Have I told you yet how much I love open source companies because I can link to examples like these?

Instead, we treated this as valuable feedback and went back to the drawing board. "Can we come up with a better flow, given that we can't reuse existing feature flags?". If this led nowhere, I would've revisited the technical solution. But, this turned out to be very much possible, and we formalised the extra constraint of not re-using Feature Flags.

Seeking feedback loops between stages allowed us to think of non-technical solutions to a technical problem, and led us to a UX flow that was a lot less confusing. Every experiment has three stages now: Creation, Implementation, and Results.

Sometimes, it can be hard to get feedback at each stage.

We recently reached the "Gathering feedback" stage of Experimentation, and this surfaced a new problem: Running A/B tests takes a while, which means feedback is delayed. We want to hear how users run their experiments, but to get feedback around this, we need to wait 2+ weeks for users to finish running experiments. Usually, we'd continue building important stuff until we get feedback and iterate.

But, if I want to aggressively seek feedback at every stage, this doesn't work. Here, we came up with an alternative solution: once basic experimentation features were in place, we switched focus away from building Experimentation. Instead, we focused on other priorities, and getting users to use experiments. This meant tying up any loose ends, writing up documentation, and ensuring that basic features were obvious-bugs free.

The benefits here are three-fold: 

1. We aren't building features we'll later scrap because some basic assumption was invalidated 
2. We're making progress on other priorities
3. We're increasing the number of users running experiments. This means a larger surface area of people who finish experiments and more feedback, allowing us to iterate well

Note how gathering feedback was not an afterthought, but an important part of planning out our sprint, which justified the change in direction.

I go through all these examples to serve as an intuition pump: feedback loops don't arise out of thin air, but aggressively seeking them yourself allows you to move quicker, come up with solutions you wouldn't have otherwise thought of, and leads to a higher quality product.

> PostHog is an open source analytics platform you can host yourself. We help you build better products faster, without user data ever leaving your infrastructure.

<ArrayCTA />

