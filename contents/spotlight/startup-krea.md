---
title: How Krea analyzes data from its generative AI tool
date: 2025-02-27
author:
  - kevan-gilbert
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/413293711_2ad62f5e_8fca_44cf_b73a_0848f9537a56_3e39fca48c.jpg
featuredImageType: full
category: Startups
---
The irony of going viral is that everybody wants it, but nobody’s ready for it. 

There is often such a sudden increase in data usage that servers strain, performance degrades, and costs can shoot up for founding teams.

The team at [Krea](https://www.krea.ai/) surfed that wave — when their app went viral in Southeast Asia, hitting 200,000 sign-ups in a single day. Having already [set up PostHog to track events](/product-analytics#installation), Krea was ready in advance for such a surge.

Diego Rodriguez, co-founder at Krea, senses that startups often feel they don't need to care about data volume — until it’s too late. 

His advice? If you’re building an AI-first app, then you need to be ready for massive surges of data, regardless of virality. Here’s how founders can prepare with a stronger foundation.

## 1. AI-first apps generate more data than you can imagine

Generative AI apps give you data on an entirely different scale than conventional apps.

“People don't go to a website and spend money a thousand times on a visit. That just doesn't happen. But people do come to Krea and they may make 1,000 images in a single session.”

Diego explains: “Let’s say your product is Canva. How much data is passing through your product? A user creates one artifact: let’s say, a poster. There it is. They’ll create one poster. You don't make many posters per second, or many posters within one minute. You make *A* poster. You work on it, and then you finish and then you save it. But in the world of AI?"

"For me, the equivalent of an artifact that the user made is not a poster — it’s a frame that you make on the [Krea Realtime](https://www.krea.ai/apps/image/realtime) tool. But the thing is, within one minute you can make a _lot_ of images, right? Yet, each frame is an artifact of a kind — one moment or “event” in terms of product analytics. The person is making images, but suddenly you are not processing few of them in a few seconds; instead, you are processing many frames per second during, say, 20 minutes. We are not talking about percentage differences anymore—it's in the orders of magnitude.”

It means if you're building in generative AI, you need an analytics tool that can handle the question of scale. Viral or not, the data is coming. 

 ## 2. Analytics are your early-detection system

If you're building in AI, it means treating analytics data like a sailor might track the weather. While a founder's focus can be pulled in many directions (between product, team, customer care and beyond), Diego's advice would be: always keep one eye on your analytics.  

It was Krea's viral take-off that drove this home. Diego can still recall the moment he needed to instruct his team to turn off access in the very regions of the world where the app's popularity was surging. 

They hadn't accounted for the prevalence of mobile users in Southeast Asia, using devices for which the app wasn't optimized. "We weren't ready for it," he admits. 

They could see it coming: a rush of users at a Gen AI data scale would mean a ballooning infrastructure bill. But coupled with the degraded performance from non-optimal screens, it would also lead to frustrated users — undercutting the value of the virality in the first place. As the analytics data began to pour in, Diego's team realized they needed to take action. 

This quick pivot was only possible because Diego had stayed close to the data. “Especially in generative AI," says Diego, "any increase in user activity can greatly impact the whole system. It means paying attention and moving quickly."

 ## 3. LLM analytics are the new frontier

It's not the usual round-up of [pirate metrics](/product-engineers/aarrr-pirate-funnel) alone when we're building in AI. In the realm of LLM analytics, there are entirely new stats to track.

How much is each LLM call costing you? Is the user getting the result they want from the agent? Are there errors happening that might be entirely off-screen? 

Or, the one piece of information Diego is curious about: “What happened in the LLM that influenced a customer? If products once spread via word of mouth — we will start seeing them spread through word of... next token prediction?"

It's quite possible that a founder might not know to ask these questions, let alone where to look to answer them, and it's why staying alert matters. Towards this, PostHog has just launched a new beta product in this category, introducing [LLM analytics](/docs/llm-analytics) to help you follow more closely what's happening with your LLM calls. 

It's an exciting area that has us paying attention alongside Diego and other AI-focused founders. 

**More success stories from PostHog for Startups**
- [How Golioth designs new software and drives product development](/spotlight/startup-golioth)
- [How Documenso got 4,000 stars and grew an active GitHub community](/spotlight/startup-documenso)
- [How BeforeSunset AI achieved 'Product of the Month' on Product Hunt](/spotlight/startup-before-sunset-ai)
