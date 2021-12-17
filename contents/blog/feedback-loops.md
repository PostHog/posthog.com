---
date: 2021-12-15
title: What I've learned about project feedback at PostHog
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["neil-kakkar"]
featuredImage: ../images/blog/posthog-engineering-blog.png
featuredImageType: full
---

I recently wrote a blog post for my personal site all about the [lessons I'd learned from leading my first two projects as a Software Engineer at PostHog](https://neilkakkar.com/How-I-Own-Projects-as-a-Software-Engineer.html). In it, I lay out a five-step approach for how I own projects.  

Something I wanted to elaborate upon here is the common theme across those steps of getting feedback from others and using feedback loops as a process for iterative improvement. To work quickly and to make sure you’re doing the right things, you need several feedback loops. Both, long-term and short-term.

For example, getting feedback during the research phase of a project can have a long-term impact on the whole project. When gathering context it's important not to do it on your own and to involve teammates, especially if they are product owners. Explore competitor products together. Make the thread open, so everyone in the company can see and contribute to it. It’s valuable to hear from colleagues who might have more context because they were previously an insider or have other relevant knowledge.

However, in the building phase of a project it's important to have fast loops that provide short-term feedback. That usually means small pull requests and quick reviews! Imagine how much faster you get things done and how much better your code looks when you have small PRs that get reviewed quickly, vs. a 500 line change that takes reviewers ages to get to.

Apart from these quick feedback loops, there are slower but still important feedback loops between consecutive steps. For example, new technical constraints may show up while implementing a solution, forcing you to go back to the drawing board. My advice? Don’t get married to the initial idea you came up with. Divorces are hard.

While working on experimentation at PostHog, we decided to allow users to reuse an existing [Feature Flag](/docs/user-guides/feature-flags) to do experiments. This made sense because people would create the feature flag, test the A/B versions look alright, and then use that same Feature Flag in an experiment, without having to do any code changes.

However, during implementation I realised this clashed with one of the principles. Making things work like this meant the results would not be 100% accurate. So,  we came up with the extra constraint of not re-using Feature Flags.

