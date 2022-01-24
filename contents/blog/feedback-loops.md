---
date: 2021-12-15
title: Aggressively seeking feedback loops for product development
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["neil-kakkar"]
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
---

I recently wrote a blog post for my personal site about the [lessons I'd learned from leading my first two projects as a Software Engineer at PostHog](https://neilkakkar.com/How-I-Own-Projects-as-a-Software-Engineer.html). In it, I lay out a five-step approach for how I own projects.  

One common theme that stood out was how feedback loops between each stage lead to much better decisions. In this post, I want to talk about why these feedback loops are useful, and how to actively seek iterative gains from these loops.

To recap, the five steps I mentioned are

>  1. Gather Context
>  2. Figure out a solution
>  3. Build
>  4. Gather Feedback
>  5. Align metrics with feedback

I expect most people are familiar with agile development, which makes the basic case for gathering feedback: Finding out you're building the wrong thing before you've built it lets you be a lot faster than finding this out once you've built something.

We can take this a step further by creating feedback loops between each of the steps mentioned above. If feedback is good, and helps keep you on the right track, getting feedback between each step should be better than getting feedback only at the end.[^1]

[^1]: There's a case to be made about diminishing returns, and the cost of effort it takes to create the feedback loop, which is why you wouldn't want to extend this argument to "gathering feedback every hour/minute/second"

For example, when gathering context and figuring out the problem, it's important to involve teammates, especially if they are product owners. Explore competitor products together. Make the thread open, so everyone in the company can see and contribute to it. It’s valuable to hear from colleagues who might have more context because they were previously an insider or have other relevant knowledge.

None of this happens automatically, but asking yourself the question: "How can I verify my thinking?" actively forces you to seek feedback. Reducing the barrier of entry for others to give feedback is one of the highest leverage activities you can do.

TODO: Challenging feedback loops? Where you confirm/reject

Another good example you might be familiar with is the maxim: "Make small pull requests". The generating function behind this maxim is faster feedback loops. Smaller pull requests are easier to review, which not only helps catch problems quickly, but ensures you get feedback faster. Imagine how much faster you get things done and how much better your code looks when you have small PRs that get reviewed quickly, vs. a 500 line change that takes reviewers ages to get to.

I like the five-step model because it provides natural schelling points to check for feedback. 

TODO: Hmm, where is this post going? Dump more thoughts, cut and refine later.

Apart from these quick feedback loops, there are slower but still important feedback loops between consecutive steps. For example, new technical constraints may show up while implementing a solution, forcing you to go back to the drawing board. My advice? Don’t get married to the initial idea you came up with. Divorces are hard.

While working on experimentation at PostHog, we decided to allow users to reuse an existing [Feature Flag](/docs/user-guides/feature-flags) to do experiments. This made sense because people would create the feature flag, test the A/B versions look alright, and then use that same Feature Flag in an experiment, without having to do any code changes.

However, during implementation I realised this clashed with one of the principles. Making things work like this meant the results would not be 100% accurate. So,  we came up with the extra constraint of not re-using Feature Flags.

