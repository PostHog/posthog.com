---
title: 'How ResearchGate tests product changes for over 25M users'
customer: ResearchGate
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/researchgate_logo_1627258295.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/resaerchgate_logo_dark_e8ea7ae745.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/researchgate_posthog_7a5a2cf3ac.png
featuredCustomer: false
industries:
  - Science
  - Social network
users:
  - Growth
  - Engineering
  - Product
  - Marketing
toolsUsed:
  - Experiments
  - Feature Flags
  - PostHog Cloud
  - Insights
date: 2024-06-25
---

ResearchGate, the world’s largest professional network for scientists, helps millions of professionals discover and disseminate groundbreaking research annually. The company is driven by a mission to promote access to science — but, with over 160 million publications, the scale of the community can present significant challenges.

“We grew up in a time when there weren’t a lot of third party services to solve the sorts of problems that arise from having so many publications and users,” says Paul McCloud, ResearchGate’s Head of Product Engineering. “Thankfully, we’ve built a strong engineering team over the last 15 years and we’ve been able to build what we needed in-house.”

Over the years ResearchGate’s team has built everything from internal experimentation frameworks and feature flagging systems to traffic experimentation systems and GraphQL clients. Many of these tools functioned to a high standard, but eventually the maintenance burden became too much. 

“We built these tools well, but there comes a time when we can’t iterate on them as fast and we need to focus elsewhere,” says Paul. “This eventually became a strategic focus: How are we going to migrate more of our stack to third-party services so we can focus on our core competencies?”

“And that’s what led us to PostHog.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/paul_mccloud.jpg"
    size="md"
    name="Paul McCloud"
    title="Head of Product Engineering, ResearchGate"
    quote={`“Something I didn't get at the start was the clip at which PostHog adds new products. What you don't really understand until you've experienced it is that, because all these tools are built on the same fundamental architecture, the value of PostHog becomes exponential as new tools get connected!”`}
/>
</BorderWrapper>

### Scalability, support, and on-site trips to say hello

The scale of ResearchGate’s community meant that the decision to switch wasn’t made lightly, or quickly. Paul spoke with multiple providers before making a decision, with many conversations ending due to pricing and scalability issues. 

“We have hundreds of millions of pageviews per month,” explains Paul. “So, based just on our volume, we’re always in that custom enterprise package and have to ‘Talk to Sales’. I had explicit conversations with [LaunchDarkly](/blog/posthog-vs-launchdarkly), [Optimizely](/blog/posthog-vs-optimizely), and others, but they were way out of our price range.”

In addition to offering lower and more transparent pricing, PostHog also worked closely with Paul’s team to provide proactive support — including in an on-site visit earlier this year. 

“If I email my Cloudflare support engineer it’ll be a few days before I get a reply and it’ll be a subpar response,” says Paul. “With PostHog though I get to deal with the relevant engineering expert on a topic. [Simon](/community/profiles/28895) will loop in [Neil](/community/profiles/28695), or [Marius](/community/profiles/30202), or [whoever](/people), and I don’t waste time playing the telephone game.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/simon.png"
    size="md"
    name="Simon Fisher"
    title="Customer Success Team Lead, PostHog"
    quote={`“It was really valuable to spend time with the ResearchGate team. Time in person helped us understand their roadmap and how we can support it. It also helps shape our roadmap now that we understand how visible and integral PostHog is in letting them make business-critical decisions!”`}
/>
</BorderWrapper>

### Testing algorithmic models to boost discovery with 25M users

Now that Paul’s team have replaced their internal tools with PostHog they’ve started running progressively bigger and more ambitious experiments. The biggest so far is focused on the user home feed, where the team is testing multiple algorithms against each other to drive more content discovery.

“Our home feed was very old and only surfaced content chronologically, like a subscription,” says Paul. “We’ve switched to an algorithmic model and PostHog has enabled us to test different algorithms so we can give users the right content at the right time. We’ve been testing these models for a year now, across hundreds of millions of sessions.”

Although they’ve been running for a year, these tests don’t have an endpoint or fixed decision in mind. Instead, ResearchGate is constantly tweaking and optimizing the models to perform better, armed in part by the fact that they can analyze experiment results alongside other data. 

“All the data is in PostHog and it only takes 10 minutes to set up really detailed insights, so all of a sudden we’ve got these powerful visualizations that help us break down the conversion funnels. Our data scientists are able to rapidly, and most importantly, autonomously iterate on the data models that power the feed as we don't need to change the underlying feature flags. With each iteration, we can further improve the home feed which, as the primary scientific discovery mechanism on the platform, drives user engagement.”