---
title: The story behind 11x's growth engine
date: 2025-03-11
author:
  - kevan-gilbert
showTitle: true
rootpage: /blog
sidebar: Blog
hideAnchor: true
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/11x_4957aaa87c.png
featuredImageType: full
category: Startups
---

It’s on the physical screens at the front of their office: a PostHog dashboard showing the company’s key metrics. 

It’s in the habits of engineers: customer encountering an error? Check the PostHog replays. 

It’s in their leadership mindsets. Got a goal to meet? Track it in PostHog.

“PostHog powers our entire team,” says Keith Fearon, head of growth, “from product to engineering to even sales.”

A little context first: 11x is an AI-focused company, where tailored agents will get specific jobs done for their customers. Primarily, these agents focus on sales tasks: outreach and customer care. A customer will calibrate their bot to suit their brand, train it on their knowledge base, and with 11x, the bot will perform the tasks assigned. That means that the customers of 11x are people who are training, monitoring and “supervising” a new generation of automated workers. 

As a company, 11x has been around for two years. Having started in London, they relocated to San Francisco recently, and now are serving just shy of 600 customers. Meanwhile, 11x has need to somehow keep an eye on how all their customers, and all those bots, are all getting their jobs done. It’s a lot to keep track of: you're gonna need a product for that.

I asked him what they had been using previously, and Keith begins counting them off:
* For [feature flags](/docs/feature-flags), they were building in-house.
* For session recordings, they were using [HotJar](/blog/posthog-vs-hotjar).
* For product analytics, they were using [FullStory](/blog/posthog-vs-fullstory).

“It was a hodgepodge of tools we were able to consolidate into one,” says Keith. “And Posthog is the same price as each of them individually." 

When Keith first started, PostHog was only being used by the company for some light tracking. “But I saw that with PostHog,” Keith shares, "what you put into it is what you get out of it."

So Keith decided to get a lot out of it. 

He started by [unifying their Salesforce data](/docs/cdp/destinations/salesforce) into the platform. This helped connect their customer’s “break clauses” with the actual customer activity in the product, so 11x could see the link between product usage and customer continuation. “PostHog gives us almost a cockpit for our customers and our product.”

He dove into a customer success example.

“We sync all of our events,” he explained. “Any time we see a customer not getting the results they want, we take it as a predictor of churn. And we want to see that quickly. With session replay, we can do that, right down to the platform: what are they typing? What are they saying to the agent? We can then use this info to improve the product and identify rough areas, but we can also be improving customer experience, right away.”

Salesforce integration was the start, but since then, Keith says, “I’ve introduced PostHog to so many parts of our workflow. PostHog is the ten-in-one product thing that helps us get so much done,” Keith declares. “You guys have it all.”

They use it for bug detection, to help speed up resolution. “PostHog is like time travel,” says Keith. “Otherwise we are banging our heads against the wall, spending days trying to debug.”

He told a story where an engineer couldn’t reproduce a complaint raised by a customer. As he wondered whether it was unique to the user, the engineer remembered to check the session replays. Sure enough, the recording laid it all out: the customer had changed their own app settings, forgotten about it, and then submitted a complaint to 11x for support. 

“We hadn’t even thought about this,” he says. “We can just rewatch. All of our engineers use it now. It saves us building out error logs. We just rely on PostHog to be our timeline activity log.”

PostHog has even helped 11x stop a case of attempted customer hacking. The team had noticed on their logs, that 85% of their usage was coming from one tiny customer. “I could see they were trying to make unauthorized APIs calls to our platform from the product,” says Keith. “I could see all this from our PostHog. They were trying to take all our records. When we kicked them out, they threatened to sue us — but we were able to use our console logs to show their activity, and prove they had indeed violated our terms of service.”

When I asked Keith what his personal favourite PostHog use case is, he told of the automation he’s created that runs everyday, to send their key North Star metrics as an alert. They can find out how many customers are booking meetings (a key metric for them), and have it show up live on their office TV dashboards. 

“Every day, it’s so motivating, to see that go up,” he says, pointing at the line at the end of the chart that rises like a hockey stick. “The most exciting thing is, if it’s not going up, I can do something about it.” And that’s what completes the loop: PostHog is not just a tool for data visibility, it’s for jumping right back into the product to make real changes.

Throughout our conversation, I was grateful that an AI was taking notes, as Keith’s passion entirely outpaced my fingers. “PostHog is so good,” he insisted. “There are so many reasons. We use PostHog for — ” but by now, I could see him visualize how it actually spiderwebs across the whole org, before he stopped. “It’s all so relevant.”
