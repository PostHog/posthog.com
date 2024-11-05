---
title: Why you're bad at giving feedback
date: 2024-10-24
author:
 - lior-neu-ner
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/trojan_hog_4d7a29594a.png
featuredImageType: full
tags:
  - Engineering
crosspost:
  - Product engineers
  - Founders
  - Blog
---

_"Feedback is a gift…"_ or so they say.

But are your gifts useful, or are they more like the third pair of socks you get at Christmas?

Delivering actionable feedback is hard. You need to be brutally honest while at the same time not discouraging.

In this issue, I’m diving into all the things you might be doing wrong, and how to give feedback people will love.

## 1. You're giving them a "shit sandwich"

When giving tough feedback, some people feel the need to layer it between two nice compliments.

It's called a sandwich because it has three parts:

1. Praise
2. Criticism – i.e. the thing you really want to say
3. More praise

But it's also called a shit sandwich, because no matter how much praise you put on top and bottom, you're still eating shit.

![Feedback sandwich](https://res.cloudinary.com/dmukukwp6/image/upload/1fb3c8bc_a49e_4088_b6a3_7835c78597b5_2505x1296_99182882a8.webp)
<Caption> Source: <a href="https://adhddd.com/portfolio/compliment-sandwiches/">Dani Donovan</a></Caption>

Although the intention is to reduce defensiveness, in reality it creates confusion and makes you seem fake and insincere.

Instead, you should get straight to the point when giving feedback, which brings me to the next point...

## 2. You're watering down your message

People shy away from being direct because they're afraid of how the other person is going to react. A good sign you’re holding back is if you're using words like "quite", "kind of", or "might" in your feedback.

Luckily, there’s an easy fix for this: Make it about the work and its impact on you, instead of making it about them.

For example, instead of saying:

> "Max, your pull requests are kind of difficult to review. It might lead to buggy code."

Say this instead:

> "Max, your pull requests lack detailed descriptions. It makes it hard for me to understand the context and give an effective review. This causes us to ship buggy code. Going forward, can you include more information such as the problem you're solving for, the approach you took, and any important factors you considered?"

By being specific and focusing on the impact, you're more likely to get your point across.

## 3. You're not being specific enough

Imagine if your GPS told you to "go in a general northward direction" instead of "turn right in 100 meters." You'd end up lost, frustrated, and probably in a different country.

That's what happens when your feedback isn't specific enough. Great feedback should leave the recipient walking away without any doubt about what to do next.

The best way to do this is to anchor your feedback in specific examples and observations. Take for example one of our engineers, <TeamMember name="Neil Kakkar" showOnlyFirstName />. He noticed that <TeamMember name="Juraj Majerik" showOnlyFirstName /> had a tendency to break backwards compatibility whenever he refactored API responses.

Instead of saying "Juraj, you need to pay better attention", he said this instead:

> "Juraj, your last PR changed the API response and broke the old UI. It's not the first time backwards compatibility has broken, so this is a pattern of issues worth working on.
>
>Let’s discuss how we can improve the process so that we can prevent this from happening again. One useful way I know of is to create a list of things that need to be tested whenever you make changes to an existing endpoint."

Neil gave Juraj a specific example of what went wrong, focused the discussion on the code, and avoided personal criticism. The result is that Juraj didn't feel attacked and had an actionable path forward.

And our API hasn’t broken since. Good job, Neil and Juraj!

![Neil and Juraj](https://res.cloudinary.com/dmukukwp6/image/upload/5289cf24_d5d5_499b_be27_0781df426243_1080x930_760317db50.webp)

<NewsletterForm />

## 4. You wait for the "right" time

Because we have a tendency to avoid confrontation and conflict, we make up excuses not to give feedback. You’ve probably told yourself before:

- "It's not a big deal"
- "Someone else will tell them"
- "This was a one-off thing"

The danger here is that small, unresolved problems can stack up, leading to much bigger issues down the line.

I experienced this first-hand when I was a software engineer at Meta.

Our PM focused on shipping small features instead of building a clear product strategy for our team. I chickened out of having a hard conversation with him and quietly hoped his manager would tell him. As time passed, I grew frustrated with him and our lack of progress, but I still didn’t say anything.

![When to give feedback](https://res.cloudinary.com/dmukukwp6/image/upload/7c4df430_3ea0_4331_adbe_72008a1d3a2a_2377x1426_d563b340e0.webp)

Eventually, the team was shut down because we weren’t making a meaningful contribution to the org's overall goals. Had I spoken up earlier, we could have saved the team – and our relationship!

The lesson I learned is that the best time to give feedback is as soon as you notice it. It's often easier to do, and it gives your team the best chance of success.

## 5. You tell a story instead of sticking to the facts

It's entirely possible that your feedback is misplaced and that you don’t have the full context. This is the difference between a "fact" and a "story".

A **fact** is objective. It can be proven or observed. For example, "Alex’s new feature shipped four weeks late".

A **story** is a conclusion made from the facts. It's subjective. For example, "Alex’s new feature shipped four weeks late because they underestimated the complexity of the project. They need to get better at this.".

We create stories in our heads all the time, but if we’re missing facts they can be wrong. To avoid this trap, first lay out your facts and be open to theirs, then build a story together.

Continuing on the above example, a conversation could go like this:

> **You:** "Alex, I noticed your new feature shipped four weeks late. I think this is because you underestimated the complexity of the feature. Before we dig into a solution, can you tell me what exactly happened?"

> **Alex:** "During the last month I worked on two projects at once. I thought I could handle both, but ultimately I fell behind. I should have communicated better."

So the initial assumption about Alex is wrong. It’s a communication issue, not an estimation one.

But what’s causing the problem? Is it because Alex is a poor communicator? Or was Alex worried about how you would react if they told you about the second project? Or is it something else entirely?

You need to build up facts together to find out. By doing so, you create a safe space to work on problems as a team.

## 6. You don’t dedicate time for it

Feedback can easily get pushed to the bottom of the priority list, especially when we're dealing with deadlines.

This is a mistake. Without consistent, intentional feedback, you're leaving growth and improvement on the table.

Here are a few strategies to ensure you and your team are regularly sharing quality feedback:

- Schedule monthly or quarterly 1-on-1 feedback sessions with the people you work most closely.
- When doing project retrospectives, dedicate time where everyone can share what they thought each person did well and what they can improve on.
- Allocate a few minutes at the end of your regular team meetings to discuss team wins and areas of improvement.

At PostHog, our approach is to have [feedback dinners](/handbook/people/feedback#full-team-feedback-sessions) with the entire team. It gives everyone a chance to share feedback with each other in front of the rest of the team.

Although this sounds intimidating (it isn’t!), we find that they work really well in building trust across the team.

![Feedback dinner trojan horse](https://res.cloudinary.com/dmukukwp6/image/upload/92b76bbd_451e_4cf0_beb6_46c90bbf2a83_1200x630_849e83988f.webp)

## 7. You only give constructive feedback

Finally, don’t forget that feedback is more than just pointing out what needs to be better. It's also about celebrating people's wins and praising great work. This reinforces good habits and lets people know what they should do more of.

This recently happened to one of our engineers, <TeamMember name="Paul D'Ambra" showOnlyFirstName />.

Paul felt he was too easily distracted, which lead him to work on many projects at the same time. He was trying to address this by limiting the number of things he worked on until <TeamMember name="Marius Andra" showOnlyFirstName/> gave him feedback that suggested otherwise.

![Paul getting distracted](https://res.cloudinary.com/dmukukwp6/image/upload/49edbc2a_9675_4750_86de_1bc79498ede7_750x500_f27c1e9836.webp)

Marius told him that he's actually really good at multitasking, and his “distractions” were actually useful contributions to the product. He suggested Paul lean into this behavior instead of fighting it.

Paul tried this and it worked much better for him! Instead of fighting his nature, he embraced his natural curiosity. The result is that we now have features like [web vitals autocapture](/docs/product-analytics/web-vitals) that otherwise wouldn't have been shipped.

<NewsletterForm />
