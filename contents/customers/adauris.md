---
title: How Adauris tracks performance, tailors activation and grew traffic by 500%
customer: Adauris
logo: ../images/customers/adauris/logo.png
logoDark: ../images/customers/adauris/logo-dark.png
featuredImage: ../images/customers/adauris/featured.svg
featuredCustomer: false
industries:
    - SaaS, Publishing
users:
    - Growth
    - Engineering
    - Product
    - Marketing
toolsUsed:
    - Experiments
    - Session Replay
    - PostHog Cloud
    - Insights
date: 2023-11-05
---

[Adauris](https://www.adauris.ai/) is an audio AI company offering end-to-end generative audio production for some of the largest digital media companies in the world, including Dezeen and The Stanford Daily. Every day, dozens of globally recognized brands use Adauris’ platform to repurpose written content and expand their distribution. 

“The data stack evolution of Adauris has been really interesting on the engineering side,” says Co-founder and CTO Varun Sharma. “The initial MVP used Google Tag Manager and just basic API calls. Then we started to put in much more refined data points with Mongo, and eventually progressed from there to Mixpanel and Segment.”

“I quickly got just completely exhausted with each of those solutions, however. Mongo was very difficult for us to use, for example, while Segment was very expensive. It was only when I found PostHog did I find a platform that was magically a perfect fit!” 

After some initial research, Varun signed Adauris up to the [PostHog for Startups](/startups) program and began thinking about how the team could use PostHog to replace multiple tools in its stack.

## Creating a full end-to-end view of the product experience

Varun immediately integrated PostHog throughout the Adauris platform, including the player and website. This enabled the team to have a full end-to-end view of their product, both in terms of performance and also customer experience. 

“It was very easy for us to whip up some events and get PostHog setup out of the box,” says Varun. “Now the whole team uses analytics when we’re making product decisions, while on the engineering side we appreciate the data integrity that comes from a consistent and opinionated approach. That’s the best way to make sure data is reliable, and that events match.” 

In addition to monitoring performance and tracking errors, the team also uses PostHog to track adoption for each feature and to get a sense of what resonates with users. 

“[Session replays](/session-replay) are a great way to get a sense for a users’ sentiment as they go through your product,” says Co-founder and COO Tina Haertel. “We even pass some of the data we get back to our customers, telling them how many users are clicking on the audio player and how long they listen for.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/varun.jpg"
    size="md"
    name="Varun Sharma"
    title="Co-founder & CTO, Adauris"
    quote={`“I saw some engineers raving about PostHog and decided to check it out. I gave it a go, integrated it in a few minutes, and the team has just loved it ever since.”`}
/>
</BorderWrapper>

## Tailoring the onboarding experience based on user needs

[Group analytics](/docs/product-analytics/group-analytics) has been an especially important feature for the team, as Adauris offers both B2B and B2C products. The team simply identifies publications they partner with as a group, then associate all child events with that group to understand how usage differs within each partner and how patterns in usage may vary. 

An early learning, for example, was that the audio player embedded in partners’ content was a huge traffic driver — and that user behavior could vary based on which publication the user came from. 

“We’re able to really narrow in on this and give users different onboarding and website experiences based on where they come from,” says Tina. “It’s been really helpful in refining our sales funnel and we’re constantly referring back to it in PostHog to find more ways to grow.” 

One example of how Adauris tailors the onboarding flow is by limiting which features are available until users complete necessary setup steps such as registering an RSS feed. This option ensures users have a positive experience from the start, and don’t get distracted until it’s _really_ time to explore.

“We’ve been running these sorts of experiments for a couple of months,” says Varun. “We’ve already increased the number of visits to our landing pages by over 500%, widening the top of our funnel dramatically.” 

“A lot of the ideas come from insights we collect in PostHog, and naturally we track success there too — so it becomes a self-fulfilling loop. The results end up deployed everywhere across the web, wherever our audio player is installed!”

