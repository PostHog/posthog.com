---
title: How Wowzer increased conversion rate by 10% with A/B tests and product analytics
customer: wowzer
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1715169275/posthog.com/contents/wowzer-screenshot.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1715169275/posthog.com/contents/wowzer-screenshot.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/wowzer_posthog_ee9cb61596.png
industries:
  - AI
users:
  - Growth
  - Engineering
  - Product
toolsUsed:
  - Experimentation
  - Product analytics
  - Surveys
  - LLM observability
date: 2024-05-29
---

[Wowzer](https://wowzer.ai/) is an AI image generation app. Their goal is to make it as easy as possible for any person to create beautiful images. In the last three months, they've grown rapidly from 0 to 100,000 active users and generated more than 3 million images.

This success is largely because Wowzer's product and growth teams are incredibly data-driven. "We're only able to achieve this because PostHog lets us go beyond basic metrics to deeply understand our users' behavior" says Amin Tavana, SVP of Growth at Wowzer.

## Rapid experimentation and instant insights

Wowzer is continuously tweaking and [experimenting](/experiments) with pricing strategies and features on their platform. The ability to dive deep into real-time results enables quick decisions that significantly impact conversion and engagement.

"For example, we weren't sure what effect moving our DALL-E model from our free to paid tier would have. We ran an experiment and we saw our conversion rate increased by 10%. Not only that, we saw that the average time to conversion decreased from two days to under four hours, and that the number of sessions per user increased," shares Amin.

Amin also emphasizes that uncovering these insights was only possible because of how easy it is to set up dashboards in PostHog. "With PostHog, we can understand not just the _what_, but the _why_ behind changes in our metrics."

<BorderWrapper>
<Quote
    imageSource="/images/customers/tavana-amin.jpeg"
    size="md"
    name="Amin Tavana"
    title="SVP of Growth, Wowzer"
    quote={`“Another example is when we tested daily credit refreshes instead of monthly. All our key metrics improved and PostHog showed us that this was because users returned to the product more frequently.”`}
/>
</BorderWrapper>
 

## Driving growth with surveys

Wowzer also uses PostHog [surveys](/surveys) to collect feedback and [find out what users want](/newsletter/how-to-uncover-your-users-real-problems). 

"We learned two important things from the survey: First, that users wanted a way to earn free credits. Second, they wanted daily credit refreshes instead of monthly", Amin explains.

This prompted Wowzer to create a referral program, which is now one of their biggest growth drivers. They also tested giving users 20 free credits daily instead of 100 credits monthly, which had a big effect on the number of returning users in the product.

"We track the number _one-time users_ (users who only use the app once and never come back) using [cohorts](https://posthog.com/docs/data/cohorts). By switching to daily credit refreshes, we saw 15% decrease in these users. This is because they were converting into repeat users, ultimately leading to an increase in our overall conversion rate!"

"To summarize," Amin says, "if we weren't using PostHog, we wouldn't be able to uncover the amount of insights we do!"
