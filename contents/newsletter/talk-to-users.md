---
title: An engineer’s guide to talking to users
date: 2024-04-25
author:
  - ian-vanagas
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1713888662/posthog.com/contents/images/newsletter/talk-to-users/talk-to-users-big.png
featuredImageType: full
tags:
  - Engineering
  - Product engineers
crosspost:
  - Product engineers
  - Blog
---

## 1. You have an information bottleneck

We have a simple theory about building successful products: the people building them should be as close to people using them as possible.

You might think you already know what users want. Someone spoke to users, turned those insights into tickets, and it's on you to build them. That’s all you need.

The process probably looks something like this:

![Information bottleneck](https://res.cloudinary.com/dmukukwp6/image/upload/v1713894881/posthog.com/contents/images/newsletter/talk-to-users/bottleneck3.png)

Engineers in this scenario get a sanitized version of the truth. They miss out on the context and depth users can provide, and they’re subject to the preferences and biases of the person doing the talking.

Worse still, often that person won’t understand the options and constraints as well as you do. Sometimes, only an engineer can understand the full context of a problem and ask the right questions to find a good solution.

Not convinced? Think of user interviews like automated tests. Like automated tests, talking to users is a short-term investment in your long-term productivity. They both enable you to iterate faster by providing rapid feedback on whether what you've built is working, even if you’re not shipping code.

> This post was first published in our newsletter, [Product for Engineers](https://newsletter.posthog.com/). It's all about helping engineers and founders build better products by learning product skills. We send it every week. [Subscribe here](https://newsletter.posthog.com/subscribe).

## 2. How to prepare to talk to users

A good user interview starts with researching:

1. **Who are your users.** Read about how we [defined our ICP](https://newsletter.posthog.com/p/defining-our-icp-is-the-most-important) if you don't know the answer to this. A hypothesis is better than nothing at all.

2. **How they are using your product or competitors.** Watch [session replays](/session-replay) and use analytics to see what they value. Analyze competitors to understand gaps in your product.

3. **What you want to build next.** Understand [the significant problems you could work on](/founders/product-market-fit-game#level-1---find-a-significant-problem-to-work-on) and create a potential roadmap, but be open to completely changing it.

You don’t need a dossier – a few notes and educated assumptions are enough to get your started.

Beyond research, save time by automating as much as possible. This could include using PostHog's [user interview survey](/tutorials/feedback-interviews-site-apps#using-surveys-to-book-user-interviews),  Calendly for scheduling, and an AI notetaker like [Superpowered](https://superpowered.me/) so you don’t miss anything.

## 3. How to find the right users to talk to

A handful of interviews can be all you need to clarify where to focus your time. You don’t need a statistically significant sample

You also don't need to send cold emails to find users to speak with. Once you have [product-market fit](/founders/product-market-fit-game), your current users work perfectly. 

From our experience, these are the best ways to find them:

- Use your analytics to find power users of related features.
- Ask your sales or customer success teams for potentially interested customers.
- Check support to find who’s asking questions or requesting features.

Your users could also be your co-workers. Our infrastructure team, for example, talks to our product teams to understand their upcoming requirements. And product teams will often talk to the marketing or growth teams about how they use PostHog.

If you struggle to find people, try adding an incentive, like a merch code or gift card.

![Feedback for merch code](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470870/posthog.com/contents/images/newsletter/talk-to-users/merch.png)

<NewsletterForm />

## 4. What to ask during a user interview

Our experience talking to users has revealed two main discussion areas. 

The first is **problem exploration**. This guides future product decisions, like [what to build next](https://newsletter.posthog.com/p/how-we-decide-what-to-build). Focus on concrete situations by asking questions like:

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

**Follow-up questions** are critical to get the depth needed to build a good solution, too. Remember, this is an opportunity to solve your information bottleneck. Do this by asking questions like:

- What do you mean by that?
- Why is that important to you?
- Can you tell me more?

Ask one question at a time. Focus on listening. Get more specific as the interview goes on.

## 5. Avoid these common mistakes

The less you talk the better, so prioritizing listening. Also avoid:

1. **Explaining yourself or your product.** If they are users, they probably know what your product is and what it does.

2. **Explaining your solution or idea.** Resist the urge to explain your thinking. You will bias their answers. Focus on their problems instead. Asking "Would you use this?" leads to failure.

3. **Focusing on their solutions or ideas.** It’s their job to tell you about the problem, it’s your job to come up with a solution. Their ideas often don’t solve their underlying problems, so reframe them to dig deeper into the underlying causes

4. **Macroanalysis**. Focus on an individual's specific use case rather than a company or industry one. Outside research can fill this if necessary.

## 6. What to do after an interview

The first thing you should do after the interview is clean up and [share the notes with your team](/product-engineers/interview-snapshot-guide). This helps you get more from the work you've done.

We keep all of our user interview notes in a single Google Doc, which is currently 378 pages long.

![User interview doc](https://res.cloudinary.com/dmukukwp6/image/upload/v1713832564/posthog.com/contents/images/newsletter/talk-to-users/interview-doc.png)

The second thing to do after the interview is to take action. The great part about being an engineer is that you can just ship small changes yourself. There’s no better way to delight a user than fixing a small problem right after they told you about it.

For larger product decisions, you can combine qualitative feedback with analytics, experience, product principles, and personal opinions to make decisions about [what to build next](https://newsletter.posthog.com/p/how-we-decide-what-to-build). The experiences of users are one of the most powerful pieces of information for deciding this. 

## 7. Talking to users doesn't stop at user interviews

Your users are still your users after you talk to them. This means you should still try to build valuable things and get feedback from them after your conversation.

At PostHog, we work closely with customers to build features and get feedback via Slack. After user interviews, we build solutions, ask customers about them, roll them out via [feature flags](/feature-flags), and iterate. These customers become references for us and their usage represents broader usage.

![Feedback via Slack](https://res.cloudinary.com/dmukukwp6/image/upload/v1713470870/posthog.com/contents/images/newsletter/talk-to-users/feedback.png)

By getting more feedback from users, we are better able to ship features they actually want. In the long run, this is a repeatable method to build the best possible product.

## Good reads for product engineers

**[An engineer's guide to behavioral analytics](/product-engineers/behavioral-analytics) - Ian Vanagas:** Another source of insights to grow your knowledge is how users are actually using your app. Behavioral analytics help you discover this. 

**[How to talk to users](https://youtu.be/z1iF1c8w5Lg) - Gustaf Alströmer:** YC Group Partner gives his (rival) full guide on what users to talk with, how to run an interview, and how to interrupt their feedback. 

**[Stripe's payments APIs: The first 10 years](https://stripe.com/blog/payment-api-design) - Michelle Bu:** A success story in iteration and feedback. It takes a lot of work to handle an increasing number of payment methods while keeping an API simple.

<NewsletterForm />