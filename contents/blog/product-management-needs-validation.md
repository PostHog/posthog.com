---
date: 2021-08-30
title: Product Management 101 - How to work out what your users need
rootPage: /blog
sidebar: Blog
showTitle: true
hideAnchor: true
author: ["marcus-hyett"]
featuredImage: ../images/blog/needs-validation.png
featuredImageType: full
---

Understanding the needs of your users better than anyone else is critical for the success of any product.

For years, taxis solved the primary user need of “Getting from A to B quickly.” Someone would wait by the roadside until an available taxi drove past, hail the taxi, and travel to their destination. 

However, Uber, Lyft, and co. came along and disrupted this market by understanding and solving the user’s needs better than any taxi company. They made it possible to quickly hail vehicles from wherever you are, and also built trust in the service through driver and car identification, driver ratings, and sharing your trip with trusted contacts - things previously impossible with ordinary taxis. This gave ride-sharing apps a massive advantage over normal taxis drivers.

When building a product, your users don’t always know what they need; and when they do, they might not be able to express it clearly. The role of a Product Manager is to piece together multiple pieces of information to identify actual user needs and empower a team to solve them. Below are a few ways you can gather this information.

## Interviews
Speaking 1:1 with customers is a great way to immerse yourself in their experience and the daily problems they encounter. It’s key when interviewing customers that you avoid biased or leading questions. To get unfiltered answers, ask open questions such as “Can you talk me through how you would travel home from an airport?” rather than “Can you tell me about the last time you took a taxi?” or “Did you take a taxi in the last 7 days?”.

Have an approximate structure for the interview, and vary the questions to get a range of insights that will help you understand their needs. But don’t be too rigid - if the conversation goes off on a relevant tangent, follow it. It might lead to some subconsciously valuable insights.

## Specifications / Requirements 
Customers (especially large enterprises) enjoy providing detailed requirements and specifications around user experiences and their product’s performance. As a Product Manager, it’s easy to dismiss these requirements as “prescriptive”, “solutionizing” or “bespoke”, but they’re often a valuable source of insights.

I always read through any list of customer requirements diligently (no matter how long or detailed), and try to piece together the core needs that motivate them to state these requirements. Solving these core needs leads to a much better solution and a lot less work.

## Surveys
Asking people what their needs are at scale is a great way to validate the need for your product and get a sense of which problems to prioritize. When surveying people, ask the right mix of open and closed questions to increase response rates and allow for more creative answers.

Keep your surveys short so that people can complete them quickly and easily. You may need to incentivize people to respond - but be aware that heavy incentives may provide biased answers. Additionally, look to reduce bias by randomly sampling your user base.

Another option to a scaled survey is to hold a focus group - a cross between the customer interview and a small survey which can yield high-confidence results. It’s essential to limit the opportunity of people influencing each other to give the same answer, and it can be helpful to get people to write down their answers before sharing them with the group.

## Metrics
Monitor how people are using your product,  as they may be getting stuck when trying to accomplish something. You can piece together key pieces of information from success metrics to see what differs between users who are successful and those who are not, to shed light on unmet user needs.

You can use PostHog to monitor user behaviors through metrics across your product using our [trends tool](https://posthog.com/product-features/trends).

## Session recordings
There is no substitute for observing a user use your product in their natural environment. As long as you randomly sample customers you’re likely to get unbiased results here - the users will not change their behavior due to your presence. Watching session recordings can give valuable insights into why people are failing to achieve something with your product: perhaps they’re accessing your product through their mobile browser and it’s much harder to use. Watching session recordings provides a lot of context for this type of issue, and Posthog can [record and replay user sessions](https://posthog.com/docs/user-guides/session-recording) in your product.

## Competitive research
Leveraging first principles is a great way to understand needs without being biased by current market solutions, but looking at these existing solutions can help you validate and understand your users’ needs.

Look at your competitor’s products and ask yourself, “Why do they have this feature?”. This will help you identify the problems they were solving for and build a better solution.

Identify core needs through different means, filter out the noise, and focus on the unique problems you can solve better than anyone else. Look for connections between different data sources that are describing the same problem and separate must-solve problems from nice-to-solve ones to prioritize your focus.

PostHog combines two great features for understanding needs by connecting freeform analysis of metrics with qualitative research powered by reviewing session recordings. [Deploy PostHog Free today](https://posthog.com/docs/self-host#deploy).

_Enjoyed this? Subscribe to our [newsletter](https://posthog.com/newsletter) for more posts on startups, growth, and analytics._
