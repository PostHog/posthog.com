---
title: Stop asking users what they want
date: 2026-11-23
author:
  - jina-yoon
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/user_interviews_hero_5c5d1bd321.png
featuredImageType: full
tags:
  - Product engineers
  - Engineering
crosspost:
  - Blog
seo:
  metaTitle: Stop asking users what they want
  metaDescription: >-
    26 user interview questions that get to what users actually want, with
    real examples from PostHog user interviews and the mistakes to avoid.
---

If you ask users what they want, they’ll say what they *think* they want. They don’t know what they *actually* want because they haven’t spent as much time thinking about it. 

That’s your job.

The best product engineers know how to ask user interview questions that surround the problem, then use those answers to get to the real solution:

![Diagram titled "What users say they want vs. what they actually want." Two overlapping dartboards: an orange one labeled "What users say they want" with blue darts scattered around its edges, and a green one labeled "What users actually want" with purple darts clustered in its bullseye. The purple darts are labeled as problem-focused user interview questions: "Tell me about the last time you used this," "How did you come up with this idea?", "What would you do differently?", and "Who on your team would use this?"](https://res.cloudinary.com/dmukukwp6/image/upload/user_interviews_say_vs_want_8b3f3da583.png)

Here are 26 of our best questions to figure out what users actually want, with examples from real PostHog user interviews.

---

## Before you begin

1. **Research their usage patterns in advance.** That way, you can ask about things specific to their account, like unusual growth trends or churn signals.

   > **Interviewer:** I noticed your error log volume dropped from about 250k to about 25k. I’m just curious, what drove that change?

2. **Can you tell me more about your background?** The answer can completely change what you ask and how you interpret their answers.

   > **Interviewer:** In your org, is there a data team or is it just you?
   >
   > **User:** I do everything. I’m the whole data team here. Even though it’s, like, 80 people, I’m doing everything.

3. **What does a typical day look like for you?** Get a sense of their routine and where your product fits into it before you narrow in on your topic.

4. **Give them permission to be honest.** Users often sugarcoat or withhold negative feedback to be polite.

   > **Interviewer:** You can be completely honest, no need to butter things up throughout this call.

<NewsletterForm />

---

## What do they actually do?

5. **Tell me about the last time you used this.** This gets to the truth. Otherwise, they'll give you a quick, general answer that [feels true](https://www.producttalk.org/2022/04/best-customer-interview-questions/) but doesn't match what actually happened.

   > **User:** Just 2 hours ago, we got this ticket saying, "I can’t even log in," which gave me a heart attack. It turned out to be a problem with their computer, not our product, which is why their Session Replay didn't even exist.

6. **What do you typically do right before and after using this product?** Walking through the sequence often reveals what you should build next.

   > **User:** I was trying to understand how many people are checking out the site, and from where. We do a lot of grassroots posting on Reddit, a Twitter presence, bit of TikTok, but we didn't know which one’s actually working.

7. **❌ Don't ask "What do you think about this product?"** It invites vague answers. Even though this response was positive, it didn't tell us anything new or useful:

   > **User:** I really like PostHog. The other engineer who works with me uses it on his product and his side projects. We've both been very impressed with it.

8. **Ask them to think out loud while they try it out instead.** You'll get specific reactions as they use it in real time.

9. **If you were to use this product again, what would you do differently?** They'll reveal exactly where the experience went wrong and what else they've tried.

   > **User:** My workaround would be to just throw it into the notebook and watch it from there, though I tried that and it makes the video smaller.

---

## What do they really mean?

10. **Tell me more about that.** You'll probably ask a version of this 20 times in a single call. It works.

    > **User:** I wanna define the personas.
    >
    > **Interviewer:** Could you say more about that?
    >
    > **User:** Looking for senior care is something that hits you like a bus, so you immediately need to act. Or, you’re like, a very concerned thinker and planning way ahead. We have internal terms for these two personas that I'd like to classify our data with and generate reports.

11. **Am I understanding this correctly?** If they use vague words, repeat what you heard so they can correct, confirm, or clarify.

    > **Interviewer:** So your team assumes something is wrong based on the spike in number of occurrences, is that right?
    >
    > **User:** It’s the spike in occurrences, but also which group of users are being affected.

12. **Could you give a rough estimate for that number?** You'd be surprised at what someone really means when they say words like "some" and "most."

    > **User:** I’ve seen a lot of times that the recordings aren’t available.
    >
    > **Interviewer:** What percentage would you say that happens? Is it around 10, or more like 90?
    >
    > **User:** It’s much closer to around 5 or 10%.

13. **What made you say you hate that?** Always follow up on strong emotional phrases like hate, love, annoyed, or frustrating. Non-verbal cues like a laugh or sigh are also worth asking about.

    > **User:** It’s expensive without a good underlying reason, which is what really pisses people off. They quoted me $2,000/month for essentially what I had in Google Sheets. Like, this is my data.

14. **What's the reason for doing it this way, instead of another way?** Offering a counterpoint helps diagnose the true reason behind their process.

    > **Interviewer:** Is there a reason why you look at your dashboard versus just asking, "Agents, tell me how my conversion is doing today"?
    >
    > **User:** That way I don’t have to worry about an agent generating the chart differently each time.

## What do they actually want?

15. **❌ Don't ask "What would you change about this?" or "What features would you like to see?"** Most users are not trained in product development. Don’t take feature requests at face value; look for the problems and reasons behind them instead.

16. **How did you come up with this feature idea?** Early Gmail users asked to see their inbox and an open email on the same screen, but [the real problem](https://www.youtube.com/watch?v=z1iF1c8w5Lg&t=653s) was that the website was really slow.

    > **User:** I'd want precise notification analysis, like how often each one gets clicked; what's the  impact; charts and visualizers for that, and so on.
    >
    > **Interviewer:** What kinds of questions would that answer for you?
    >
    > **User:** Basically we want to see which day or time period would be best to send a notification to get users to visit our app more often.

17. **What impact would this feature have on your revenue?** Check if the request is serious enough to [impact their business](/founders/product-market-fit-game), or just a nice-to-have.

    > **Interviewer:** Do you expect to see improvements on retention from doing that?
    >
    > **User:** Yeah. I mean, our retention's a little bit different than a typical SaaS product because we're selling for someone preparing for an exam, so there's a limited seasonal window when they'd really use the product.

---

## How much does this matter?

18. **❌ Don't ask "Would you want this?" or "Is this good?"** Users will say yes to be nice, especially since there's nothing at stake for them.

19. **Ask them to rank problems or ideas instead.** They'll be more honest about what actually matters, and you can see how they compare. One founder said 2 hours of [this technique](https://www.opinionx.co/blog/customer-problem-stack-ranking) was more useful than 100+ discovery interviews.

    > **User:** This one’s probably not that important, to be honest … But there's another one that I didn’t mention yet that's probably just as important as the other two.

20. **How would you feel if you could no longer use this product?** The good ol' [product-market fit (PMF) question](/product-engineers/product-survey-questions#using-surveys-to-find-product-market-fit). Most people use this in [quantitative surveys](/surveys), but in an interview, focus on why they'd be disappointed – or not.

21. **Who on your team would most likely use this?** Ideally, people describe themselves when answering this variant of the PMF question. Product Tours beta testers often described non-technical teammates outside our ICP, which helped us decide to sunset the product.

    > **User:** It's mostly non-engineering people that are building our onboarding, so there needs to be a browser extension … An easy way to do things on the fly with a UI.

22. **Use a structured pricing ladder question to understand perceived value.** Here's what we say to get real answers without pressure:

    > **Interviewer:** Nothing you say here would change your bill, this is really just about gut numbers. At what price is it so expensive you wouldn’t even consider it  expensive, but you would debate it with your co-founder? … A good deal? … So cheap that it’s suspicious?
    >
    > **User:** $500 is too much … $200 is debatable … $29 or 39 would be fine … $19 is kind of a bargain, I'd think it's a scam.

    ![Diagram titled "The pricing ladder question." It asks "At what price is it…" with sample answers: so expensive you wouldn't even consider it? $500, "too much." Expensive, but you would debate it with your co-founder? $200, "debatable." A good deal? $29–39, "would be fine." So cheap that it's suspicious? $19, "I'd think it's a scam." The range from $29–39 to $200 is highlighted as "Room to price."](https://res.cloudinary.com/dmukukwp6/image/upload/user_interviews_pricing_ladder_3ee2b93eda.png)

23. **On a scale of 1-10, how easy was it to find what you needed?** Two people can have different ideas of what "very difficult" means. Asking rating questions with the same wording each time helps you compare answers more objectively.

---

## Wrapping up

24. **Is there anything else I should have asked?** What people bring up unprompted is usually an honest signal of what matters most to them.

    > **Interviewer:** Is there anything else you wanted to bring up about AI observability that's been on your mind?
    >
    > **User:** No, I talked quite a bit already … Actually, I wanna emphasize again, it would be nice to have some agent feature where they sample 100 chats per day and give me a static report of insights.

25. **Is there anyone else you think I should talk to?** This can get you [warm intros](/blog/first-10-paying-customers) for more interviews. To reach someone with more decision-making power, try "Who owns the budget for this?" or "Where does the money come from?"

26. **Can I follow up with you once we've built something?** People are often happier to chat again than you'd expect. One of our engineers got [a reply within three minutes](/product-engineers/10x-engineers-do-user-interviews) after sending follow-up mockups over Slack.

<NewsletterForm />
