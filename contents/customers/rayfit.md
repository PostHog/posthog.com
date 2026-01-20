---
title: How RayFit uses PostHog AI to make all their data accessible
customer: RayFit
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/Rayfit_1aa197cafd.png
date: 2025-11-24
---

[RayFit](https://www.rayfit.com/) is building an AI personal training app that solves for the hardest part of fitness: showing up consistently. Their conversational AI coach, _Ray_, generates personalized workouts based on equipment, energy level, and available time.

Alan, RayFit’s Full Stack Engineering Lead, manages product development and data infrastructure. We asked him why he chose PostHog:

"As an early stage startup, we're cost sensitive," Alan says. “Initially we planned to stitch together an analytics tool and Metabase, but then we looked at PostHog. It's just so cheap and easy. We connected our database and built our pipeline with almost no work."

For a team deep in the technical trenches of machine learning and computer vision, PostHog's "one-stop shop" setup meaningfully reduced the time and effort of building out their stack. [Analytics](/docs/product-analytics), [feature flags](/docs/feature-flags), and a [data warehouse](/docs/data-warehouse) could all live one in place.

That solved the infrastructure problem. Next was ensuring the entire team was on board.

## Making data accessible with PostHog AI

For RayFit, the early friction wasn’t collecting data, it was making sure everyone could access it. 

"PostHog can present as really technical," Alan explains. “Our CEO and designer had used Mixpanel and Amplitude before — which felt more approachable since PostHog is built for engineers.”

Like many, their in-app data was also tricky to access. It requires [SQL skills](/product-engineers/sql-for-analytics) not everyone has. "A lot of the data we use for the generated workouts lives in the app itself," Alan says. "It wouldn't make sense to send a unique event for each one. With the warehouse, we can join it to a person and learn more about their behaviors."

That’s where [PostHog AI](/ai) comes in. For Alan, SQL is second nature — AI just removes friction. For non-technical stakeholders, it's a game-changer. "PostHog AI has actually been a deciding factor in our decision to stick with PostHog," he told us. "It made analytics accessible to our non-technical stakeholders who just need answers to business questions. SQL is just a means to an end for them, and PostHog AI removes that barrier to entry."

<OSQuote
  customer="rayfit"
  author="alan_yang"
  product="posthog_ai"
/>

## Realistic expectations, real results

As an early adopter of AI products (in and outside of PostHog), Alan is pragmatic about AI capabilities. “All LLMs right now are about 30–50%,” he says. “But it’s a nice problem space because that’s still a win when it gets it right.”

So when PostHog AI doesn’t nail the syntax on the first try, he doesn’t see it as a failure — just part of the workflow. In fact, it mirrors how both RayFit and PostHog operate. “We're shipping to learn, just like PostHog,” he says. “When AI features don't work perfectly, everyone is willing to try again.”

Even 30–50% accuracy is a win when the alternative is teammates getting stuck or pinging Alan for every question. “It’s saved me countless hours because the data we have is so much more self-serve,” he says. “Anyone on the team can ask questions to PostHog AI.”

What surprised him most is how quickly others leaned into it. “Some of the engineers are using PostHog AI way more than me,” Alan admits. “They're building insights and dashboards, and each of them has workflows I never really thought about.”

![screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/Screenshot_2025_11_21_at_12_44_44_PM_8bbeaf8389.png)
<Caption>How many exercises in a workout have their AI rep counting feature available</Caption>

_"PostHog AI helped us add a moving average to this insight. This was really cool to build because it quantifies that we're getting better over time."_ 

![screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/rayfit_exercises_chart_b8a00f06de.png)
<Caption>Rep Counting Performance (blue means high accuracy outcomes)</Caption>

_"One of our early computer vision features uses AI to count how many reps you're doing in an exercise. PostHog AI helped us build the visualization in seconds."_

## AI that gets out of your way

For his own work with SQL, Alan says "I usually know exactly what I want to write, so I hammer it out 75-80% of the way. If I run into something I don't know off the top of my head — extracting from JSON, complex aggregation — I'll have PostHog iterate on the query. I do that almost every time."

About 25% of the time, he has PostHog start from scratch. "Usually when I just don't have time to really think about it and want to do something in parallel. I'll kick it off, come back, and then collaborate.” 

Alan also uses PostHog AI to ask questions about the docs. “It’s really helpful that PostHog AI is context aware of the page or insight I’m looking at,” he says. “I can ask vague things like _what does this mean_ or _how do I configure this setting_ without having to explain much.”

## So what’s the real superpower here?

For RayFit, PostHog AI solved a critical adoption problem: As powerful as data can be, it's not valuable if your team can't access it. “PostHog AI helps the rest of the team feel like the tool we've chosen is easy to use," Alan says.

And PostHog AI specifically? According to Alan, "It's definitely one of the better AI tools I've used so far." His recommendation to product engineers: "If you’re using PostHog, it's a no-brainer to use PostHog AI to help make business decisions." 
