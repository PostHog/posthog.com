---
title: 8 things engineers should know about talking to users
date: 2024-04-22
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/newsletter/beyond-10x-engineer/super-hog.png
featuredImageType: full
tags:
  - Engineering
  - Product engineers
crosspost:
  - Product engineers
  - Blog
---

Talk to users? Isn't that a job for founders, product managers, and salespeople? Why would an engineer ever want or need to do it?

In his book *[Modern Software Engineering](https://www.davefarley.net/?p=352)*, Dave Farley writes that mastering software engineering requires becoming an expert in learning. When you prioritize learning, talking to users becomes a critical part of an engineer's toolkit.

To explain further why this is the case, and to help you get started, we wrote this guide based on what we've learned talking to users as engineers ourselves at PostHog.

## 1. Talking to users isn't a waste of time

A lot of engineers place shipping code above all else. Anything that gets in the way of this is, apparently, a waste of time. This reflects in common metrics for measuring engineering success like lead time or deployment frequency.

This creates a disregard for shipping the right code: features users value. Studies show this is more common than you might think. For example, [Microsoft](https://ai.stanford.edu/~ronnyk/ExPThinkWeek2009Public.pdf) found that only one-third of ideas tested improved metrics they were designed for.

Spending more time learning what users want is a fix for this. This helps close the gap between what users value and what you are building.

![Don't build the wrong features](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470851/posthog.com/contents/images/newsletter/talk-to-users/features.jpg)

## 2. You have an information bottleneck

You might already think you know what users want. Someone spoke to users, turned those insights into tickets, and it's on you to build them. Problem is, a lot of information is lost in the process of going from interviews to tickets.

![Information bottleneck](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/blog/10x-engineers-do-user-interviews/pm-to-engineer.png)

As an engineer, you miss out on the context and depth of information users can provide. The person talking to the user likely doesn't know the options and constraints as well as you do. You miss out on being able to dive deeper on those areas and use that information to find a good solution

Think of user interviews like automated tests. Not doing them saves you time, but also leads to pain over the long term. Both enable you to iterate faster by providing rapid feedback on whether what you've built is working, even if they aren't code you ship.

## 3. Preparing to talk to users

To make the most out of talking to users, you should know: 

1. **Who are your users.** Read about how we [defined our ICP](https://newsletter.posthog.com/p/defining-our-icp-is-the-most-important) if you don't know the answer to this.

2. **How they are using your product (or competitors).** Watch [session replays](https://posthog.com/session-replay) and use analytics to figure out popular features. Analyze competitors for their feature sets and use cases. 

3. **What you want to build next.** Understand [the significant problems you could work on](https://posthog.com/founders/product-market-fit-game#level-1---find-a-significant-problem-to-work-on) and create a potential roadmap to solve,  but be open to completely changing it.

You should also set up tools that help you automate the process. These could include PostHog's [user interview survey](https://posthog.com/tutorials/feedback-interviews-site-apps#using-surveys-to-book-user-interviews) and Calendly for scheduling, your video conferencing tool of choice, and an AI notetaker like [Superpowered](https://superpowered.me/).

## 4. Finding the right users to talk to

Just because we convinced you that talking to users isn't a waste of time doesn't mean we want to waste your time doing so. Lucky for you, you don't need a lot of users. You don't need to find a statistically significant sample. A few user interviews can be all you need to clarify the next increment of progress.

Second, you don't need to go send cold emails to find users to speak with. Once you have [product-market fit](https://posthog.com/founders/product-market-fit-game), your current users work perfectly. From our experience, these are the best ways to find them:

- Look at analytics to find power users of related features.
- Ask your sales or customer success teams for potentially interested customers.
- Check support for who is asking or requesting features.
- Your users could also be your coworkers. For example, our infrastructure team talks to our product teams to understand their upcoming requirements.

If this process is going too slow then an incentive, like a merch code or gift card, can help speed it up.

![Feedback for merch code](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470870/posthog.com/contents/images/newsletter/talk-to-users/merch.png)

## 5. What to ask during a user interview

Our experience talking to users has revealed two main discussion areas. The first is **problem exploration**. This guides future product decisions, like [what to build next](https://newsletter.posthog.com/p/how-we-decide-what-to-build). Focus on concrete situations by asking questions like:

- What is your workflow for solving this problem? Can you talk me through it?
- How are you solving your problem right now?
- How often do you do this?
- Why is it important?
- What's challenging about it?

The second is **solution validation**. This works best when someone is already using your feature or you have a demo to show them. Focus on impressions and problem areas by asking questions like:

- Have you tried using X? If not, why not?
- How are you using X now? What are your touch points with X?
- What is confusing?
- Can you show me how you are using X?

For both, **follow-up questions** are critical to get the depth you need to build a good solution. Remember, this is an opportunity to solve your information bottleneck. Do this by asking questions like:

- What do you mean by that?
- Why is that important to you?
- Can you tell me more?

Ask one question at a time. Focus on listening. Get more specific as the interview goes on.

## 6. Common mistakes in user interviews

The best information you'll get from talking to users comes from not talking. Beyond prioritizing listening, there are some specific areas you should avoid. They include:

1. **Yourself or your product.** If they are users, they probably know what your product is and what it does.

2. **Your solution or idea.** Resist the urge to explain your thinking. You will bias their answers. Focus on their problems instead. Asking "Would you use this?" leads to failure.

3. **Their solutions or ideas.** It is their job to tell you about the problem, it is your job to come up with a solution. Their ideas often don't solve their underlying problems, so reframe them to dig deeper into the underlying causes. 

4. **Macroanalysis**. Focus on an individual's specific use case rather than a company or industry one. Outside research can fill this if necessary.

Any focus other than their problems is a bad one. 

## 7. What to do after an interview

The first thing you should do after the interview is clean up and [share the notes with your team](https://posthog.com/product-engineers/interview-snapshot-guide). This helps you get more from the work you've done talking to them. We keep all of our user interview notes in a single user interview file, which is currently 378 pages long.

![User interview doc](https://res.cloudinary.com/dmukukwp6/image/upload/v1713832564/posthog.com/contents/images/newsletter/talk-to-users/interview-doc.png)

The second thing to do after the interview is to take action. The great part about being an engineer is that you can just ship small changes yourself. For example, our team often makes small UX changes to clarify a user confusion.

For larger product decisions, you can combine qualitative feedback with analytics, experience, product principles, and personal opinions to make decisions about [what to build next](https://newsletter.posthog.com/p/how-we-decide-what-to-build). The experiences of users are one of the most powerful pieces of information for deciding this. 

## 8. Talking to users doesn't stop at user interviews

Your users are still your users after you talk to them. This means you should still try to build valuable things and get feedback from them after your conversation.

At PostHog, we work closely with customers to build features and get feedback via Slack. After user interviews, we build solutions, ask customers about them, roll them out via [feature flags](https://posthog.com/feature-flags), and iterate. These customers become references for us and their usage represents broader usage.

![Feedback via Slack](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470870/posthog.com/contents/images/newsletter/talk-to-users/feedback.png)

By getting more feedback from users, we are better able to ship features they actually want. In the long run, this is a repeatable method to build the best possible product.

## Good reads for product engineers

**[An engineer's guide to behavioral analytics](https://posthog.com/product-engineers/behavioral-analytics) - Ian Vanagas**

Another source of insights to grow your knowledge is how users are actually using your app. Behavioral analytics help you discover this. 

**[How to talk to users](https://youtu.be/z1iF1c8w5Lg) - Gustaf Alströmer**

YC Group Partner gives his (rival) full guide on what users to talk with, how to run an interview, and how to interrupt their feedback. 

**[Stripe's payments APIs: The first 10 years](https://stripe.com/blog/payment-api-design) - Michelle Bu**

A success story in iteration and feedback. It takes a lot of work to handle an increasing number of payment methods while keeping an API simple.