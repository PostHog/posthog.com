---
title: How Phantom enhanced its product and cut failure rates by 90%
customer: Phantom
logo: ../images/customers/phantom/phantom_logo.svg
logoDark: ../images/customers/phantom/phantom_logo_dark.svg
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1710055416/posthog.com/contents/images/customers/phantom/featured.png
industries:
  - Cryptocurrency & blockchain
users:
  - Leadership
  - Product
  - Engineering
toolsUsed:
  - Data warehouse
  - Cloud-hosted
  - Feature flags
date: 2021-12-01
---

[Phantom](https://phantom.app/) is a crypto wallet which makes it easy to store, send, receive, stake and swap Solana through a friendly Chrome extension. Since launching in 2021 Phantom has used PostHog as part of its long-term vision for leveraging data within the product. 

“I really value owning your own data from an engineering standpoint and wanted a data pipeline to funnel blockchain information into our data warehouse,” said Francesco Agosti, Phantom’s CTO and Co-founder. “I’d used Heap before elsewhere, but it’s a lot more expensive. Heap makes you pay at an enterprise level just for this one feature, regardless of the amount of data or usage.”

After discovering PostHog, Phantom went through a rapid testing process with the open-source version of the platform. After validating that PostHog met the teams’ needs, Phantom rolled PostHog out fully. 

<BorderWrapper>
<Quote
    imageSource="/images/customers/francesco.jpg"
    size="md"
    name="Francesco Agosti"
    title="CTO & Co-founder, Phantom"
    quote={`“I liked how PostHog was open-source and how it just worked out of the box from the get-go. It lets you use your own database and it was really easy to deploy and get going.”`}
/>
</BorderWrapper>

## Using analytics to identify growth drivers and improve RPC infrastructure

Phantom’s team uses PostHog on a daily basis to track metrics such as daily active users (DAU), swap volumes, stake volumes and more on internal dashboards. Failure rates for SOL token transfers have also been an important metric, especially when Phantom first launched in private beta. 

“At one point during the beta failure rates started to get pretty high,” said Francesco. “At that stage we were using public RPC endpoints, which basically act as our backend. Tracking failure rates in PostHog helped trigger the decision to pay for better RPC providers, which resulted in a better user experience.” 

Phantom’s failure rate fell by 90% as a result of this switch and the team now uses PostHog’s [feature flags](/product/feature-flags) to keep failure rates at 1% or below.

“Feature flags are crucial for us,” says Francesco. “We use them as kill switches for all our features, because a Chrome extension is similar to a mobile app in the sense that we can’t deploy a new version on demand. Feature flags give us a level of remote control to protect the user experience.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/francesco.jpg"
    size="md"
    name="Francesco Agosti"
    title="CTO & Co-founder, Phantom"
    quote={`“Feature flags are really, really critical for us and you don’t see them as a feature in other analytics tools. They are very valuable though, because you can often use feature flag data to make other product decisions.”`}
/>
</BorderWrapper>

## Scaling to (and tracking) one million users within a year

This emphasis on maintaining a good user experience has enabled Phantom to grow incredibly quickly, from zero users in a private beta one year ago to more than a million users today. Yet, while Phantom continues to add almost 100,000 new users every week, the team is still able to bring product insights into their day-to-day operations.

“From the get-go we’ve used PostHog dashboards in our weekly all-hands meetings,” said Francesco. “Or we’ll often share information that’s important with each other directly. Our biggest power user is probably Brandon, the CEO, who is sort of addicted to PostHog - but it’s also popular with the developers too.”

“I liked how PostHog was open-source and how it just worked out of the box from the get-go,” said Francesco. “It lets you use your own database and it was really easy to deploy and get going.”
