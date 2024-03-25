---
title: How ElevenLabs uses every tool PostHog has to launch new features
customer: ElevenLabs
logo: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1711377704/posthog.com/contents/images/customers/elevenlabs/ElevenLabs_logo.png
logoDark: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1711377739/posthog.com/contents/images/customers/elevenlabs/ElevenLabs_logo-dark.png
featuredImage: >-
  https://res.cloudinary.com/dmukukwp6/image/upload/v1711377962/posthog.com/contents/images/customers/elevenlabs/elevenlabs.png
industries:
  - AI
users:
  - Marketing
  - Growth
  - Engineering
toolsUsed:
  - Feature flags
  - Product analytics
  - Feature flags
  - User surveys
date: 2024-03-25
---

[ElevenLabs](https://elevenlabs.io/) is a cutting-edge AI audio research company that enables teams to generate realistic-sounding voices and effects for use in videos, audiobooks, and more. Founded in 2022, the company is already one of the leaders in the recent AI boom. 

“We use basically everything in PostHog to understand more about our users and to plan new launches,” says Sam Sklar, one of ElevenLabs’ growth engineers. “We have an onboarding survey which is the first thing you see when you sign up, for example. Users tell us about themselves, we add that info to PostHog, and then we track usage across the different personas.”

Sam’s team uses product analytics to monitor a variety of metrics across these personas — conversion rates, retention, repeat visits, and more. This data isn’t a goal in and of itself, it’s the start of ElevenLabs’ entire feature development cycle.

## How ElevenLabs tests new features and develops ideas

Using this data, teams at ElevenLabs plan new features and iterative improvements that will increase adoption and activation. These ideas aren’t released blindly — they're tested behind feature flags so they can be targeted to specific cohorts, deployed, or rolled back if needed. 

“We’ve tested changes as simple as changing the null state of a page to include more educational content, through to trialling entirely new onboarding flows,” explains Sam. “Right now, for example, we’ve just rolled out an annual pricing experiment to 100% of users.”

<BorderWrapper>
<Quote
    imageSource="/images/customers/elevenlabs-sam.jpg"
    size="md"
    name="Sam Sklar"
    title="Growth, ElevenLabs"
    quote={`“During testing we monitor weekly retention especially. We’ve got a mobile app in TestFlight at the moment and we’re tracking how it retains the users we invite to it. We want to make sure it’s not a leaky bucket before we invite all our web users to try it out.”`}
/>
</BorderWrapper>

Once a feature flag is deployed, ElevenLabs’ product and engineering teams switch to other PostHog features to go beyond the data and understand what users really think.

“We watch session replays _a lot_ whenever we roll out a new feature,” says Sam. “We also love how easy it is to launch a survey and throw a Calendly link in there, so users can book their customer interviews. That info helps us keep improving, and sometimes we’ll send surveys to a specific cohort to get information on what specific types of customers think.”

## Using PostHog for growth, marketing and G2 reviews

PostHog doesn’t become less relevant once a feature is rolled out and is receiving good feedback, however. The fact that a flag is fully deployed is instead a cue for the growth and marketing teams to get to work.

“Whenever we have a launch we’ll usually have a video that will go viral,” says Sam. “We’ll track that in PostHog using UTM parameters and we’ll monitor the traffic, sign-ups, and affiliate performance. I even use surveys to send a little pop-up to people and ask them to review us on G2.”

From here, the data and feedback Sam collects is disseminated across the company and the feature development cycle begins anew — from analytics, to flags, to replays, to surveys, to analytics. 

“We used to have a lot of Looker dashboards, and other tools,” says Sam. “Now, it’s just PostHog, BigQuery, and Stripe. For a business like ours where we have so many different types of users, PostHog is amazing. It reins in the chaos to have everything in one place. Otherwise it’s quite overwhelming to try and understand what’s working and what’s not.”
