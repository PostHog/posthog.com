---
title: How Y Combinator used PostHog experiments to boost engagement by 40%
customer: Y Combinator
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/ycombinator/logo.svg
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/ycombinator/logo_dark.svg
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/contents/images/customers/ycombinator/featured.svg
featuredCustomer: true
industries:
  - 'SaaS, Education'
users:
  - Leadership
  - Engineering
  - Product
toolsUsed:
  - Experiments
  - Autocapture
  - PostHog Cloud
  - Insights
date: 2022-10-05T00:00:00.000Z
---

Y Combinator is the world’s top startup accelerator, helping to fund, train and nurture the next generation of innovative businesses. Since 2005, thousands of successful companies have emerged from Y Combinator, including Dropbox, Airbnb, PagerDuty, Reddit, Amplitude... and PostHog. 

"Many people, including us, find Y Combinator to be the most productive period of their lives,” said PostHog CEO James Hawkins in [a blogpost he wrote about his Y Combinator experience](/blog/moving-to-sf). Now, PostHog is used by Y Combinator to improve many of the products and processes PostHog benefitted from! 

“We use PostHog for [Startup School](https://www.startupschool.org/), our public [YC Startup Library](https://www.ycombinator.com/library), and for [Co-Founder Matching](https://www.ycombinator.com/cofounder-matching),” said Cat Li, Product and Engineering Lead for Y Combinator Startup School. “PostHog is especially useful for Co-Founder Matching, which is essentially a dating app for co-founders.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/cat.jpeg"
    size="md"
    name="Cat Li"
    title="Product & Engineering Lead, Y Combinator"
    quote={`“One thing I love about PostHog is that we have a shared Slack channel, for support and feedback. We can chat directly to the engineers building PostHog and they're always really responsive.”`}
/>
</BorderWrapper>


## How Y Combinator gathers 30% more data with PostHog than Google Analytics
Y Combinator empowers each team to choose its own processes, tools, and OKRs. Some teams use tools like Segment or Amplitude — but for the flagship Startup School project, Cat's team decided PostHog was the best tool for the job. 

“Startup School is hugely popular, so we thought a lot about what tools to use,” said Cat. “Many platforms we looked at, including Google Analytics, dropped 30% of user data due to adblockers, or third-party cookies. PostHog became the obvious choice because it didn't have those issues.”

PostHog also offered the benefit of autocapture, which enabled the team to get started quickly without wasting weeks defining tracking plans. 

“Tools we looked at either weren't robust enough, or required a huge amount of work to instrument,” said Cat. “But with PostHog, we could autocapture most events using [the JS snippet](/docs/integrate/client/js) and still [configure custom events](/tutorials/event-tracking-guide) when we needed to. It was the perfect balance.”

![Y Combinator analytics screenshot](https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/customers/ycombinator/ycombinator-analytics.png)

## How Y Combinator boosted Co-founder Matching engagement by 40% 
Since starting with PostHog, Y Combinator has gone beyond analytics and begun using more PostHog features, such as [experiments](/product/experimentation-suite) and [session replays](/product/session-recording), to explore data from multiple angles at once.

For Startup School, for example, the team uses [trends insights](/manual/trends) to monitor weekly users and share results in [dashboards](/manual/dashboards). For Co-Founder Matching, Y Combinator uses PostHog's [experimentation suite](/manual/experimentation) to try new ideas, some of which have led to significant improvements.  

“PostHog's experimentation suite is really great,” said Cat. “We recently used it to improve our matching algorithm by running an experiment which hides profiles that have been stale for 3, 6, 9 or 12 weeks. We found that users in the 6-week group sent 40% more messages than the control group - a huge improvement for us!”

“And, perhaps more importantly, this experiment group had 35% more of their requests accepted - which translates to having 35% more matches than the control group.”

Experiments and session replays have also helped Y Combinator avoid pitfalls borne from misleading feedback.

"A lot of people asked us to build a feature that let co-founders collaborate on a trial project," said Cat. "But, when we ran that experiment and looked at the results, we found nobody actually used it at all. Thanks to that, we were able to redirect our efforts and avoid wasting resources.”

“It's just like founders in our Startup School learn," explained Cat. "Building things is never just one-and-done - you always need to be testing new theories and finding ways to improve. PostHog is central to how we do that at Y Combinator, helping us try new ideas and make our products better.”
