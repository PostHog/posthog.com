---
date: 2024-02-05
title: "How we built our onboarding email flow (with actual performance data)"
rootPage: /blog
category: Inside PostHog
author: ["joe-martin"]
featuredImage: ../images/blog/blog_onboarding.jpg
featuredImageType: full
---

At PostHog there's a lot of room for people to build things they have a personal interest in, even if it's outside their normal purview. That’s how I ended up owning PostHog’s email onboarding: I thought it was interesting and impactful, so I got involved. 

Now, with our email onboarding flow in its fifth iteration, I want to explain all the different versions we’ve been through and reflect on what we’ve learned.

## Onboarding 1.0 to Onboarding 1.5
**RFC:** [Emails, Newsletters and Email Lists](https://github.com/PostHog/posthog.com/issues/3202)
**RFC:** [Onboarding 1.5 emails](https://github.com/PostHog/posthog/issues/9784)

Back in 2022 we used Mailchimp to power email announcements and a monthly changelog email. We didn’t do much email onboarding for new users outside of transactional emails, and our changelog email was opt-in only, with just 660 people signed up. Internally nobody really knew what the email experience looked like, so I mapped it in Miro.

![Onboarding 1.0](../images/blog/onboarding/onboarding_1.png)
<caption>The first map we did of what our email onboarding flow looked like</caption>

Turns out we only had basic re-engagement emails which were sent if we detected a user hadn’t ingested any data – nothing else, not even a welcome email.

The first change was to start sending monthly changelog emails to _all_ users and letting them opt-out instead. That meant bringing more than 30,000 users into the system overnight though and our Mailchimp costs skyrocketed. We started to look for alternative tooling.

> **What we learned:**  It was important firstly to understand how other similar products handle onboarding. I signed up to Amplitude, LogRocket, and others and mapped their email flows too. We decided we would take a different approach to these products however, as many of them involved sales outreach from various business representatives. 

## Onboarding 2.0
**RFC:** [Onboarding 2.0](https://github.com/PostHog/meta/issues/64)

![Onboarding 2.0](../images/blog/onboarding/onboarding_2.png)
<caption>Onboarding 2.0 added more checks to try and validate ingestion and three simple introductory emails</caption>

The goal for this flow was to lay a simple best-practice foundation. That would involve a welcome email and checks for successful ingestion after 24, 96, and 168 hours. After each check we’d send different advice to try and resolve issues – focusing on enabling users, rather than selling to them or offering demos.

We also sent different email content depending on if recipients were engineers or not, which is an idea we returned to again later. 

Onboarding 2.0 took a while to launch and didn’t go live until December 2022. Part of this was due to a long sales process with our new provider – Customer.io is a fantastic tool, but the purchasing process took many weeks longer than we would have liked despite our efforts to force it along!

> **What we learned:** An important thing about our welcome email is that we don’t send it immediately after sign-up. This email gives users tips on how to get started with PostHog, but we learned that they first need time to set up ingestion and send us some data – so we added a one hour delay before we send.

## Onboarding 3.0
**RFC:** [Messaging: Cloud Onboarding Emails 3.0](https://github.com/PostHog/meta/issues/123)

There were countless small tweaks and changes in the interim, but in August 2023 I decided that we needed to overhaul the entire flow. Among the changes I introduced were…

- Abandoning the logic around validating ingestion, which never worked as intended
- Targeting users based on their role to give them recommendations focused on either [PostHog for Startups](/startups) or [Product for Engineers](https://newsletter.posthog.com/)
- Adding checks to see if users were subscribed to products before we sent new emails that told them about them

At this time PostHog offered two paid products – analytics and replays. I was worried sending one email for each would feel spammy, but this proved to be unfounded based on the performance data. 

![Onboarding 3.0](../images/blog/onboarding/onboarding_3.png)
<caption>New emails for 3.0 tried to emphasize what was possible with PostHog, directing users to helpful blog content</caption>

Performance data, which we could track in Customer.io, was becoming increasingly important. What was nice though was that, because the personalized recommendations were sent from [my email](mailto:joe@posthog.com), we also got a steady trickle of direct feedback to fuel further improvements. 

> What does good look like for an email onboarding flow?
> Benchmarks vary wildly by industry, implementation, and product. As a rule though, the guideline benchmarks I use from my experience in other startups are:
>
> - **Open rate:** Anything above 40% is OK. 50% is the goal.
> - **Click-through-rate:** Anything above 4% is OK. 6% is the goal. 
> - **Conversion rate:** Anything above 3% is OK. 5% is the goal. 
> - **Unsubscribe rate:** Anything below 1% is OK. 0% is the goal.

At this point our conversion event was a simple user login within 1 day of opening an email in the campaign and Onboarding 3.0 was performing roughly as follows:

- **Open rate:** 56%
- **Click-through-rate:** 7.4%
- **Conversion rate:** 3%
- **Unsubscribe rate:** 0.6%

## Onboarding 3.1 - 3.3
**RFCs:** [Messaging: Onboarding 3.1](https://github.com/PostHog/meta/issues/127) and [Onboarding 3.3: Tweaks & Experiments](https://github.com/PostHog/meta/issues/140)

We removed the email which invited founders to join PostHog for Startups because it was _too_ successful and cannibalising teams into a free program. However, with a strong conversion rate proven for this personal approach, I wanted to expand the idea in other ways.

![Onboarding 3.1](../images/blog/onboarding/onboarding_31.png)
<caption>Onboarding 3.1 was when we really started tailoring emails based on what we knew about users</caption>

My hypothesis was that less technical users might struggle to get the most out of PostHog and would appreciate some friendly direction. [Actions](/docs/data/actions) fit the bill because they can be created without code. So, I added a `role_at_organization` check 12 hours after sign-up. This field is based on an optional field users can complete at sign-up.

- If a user was a `founder` or `engineer` they still got a personal email from me inviting them to subscribe to [Product for Engineers]( ttps://newsletter.posthog.com/)
- If they were `marketing`, `sales`, `product`, or ‘unknown’ they got tailored advice about how to create actions _unless_ they had already created an action 

This experiment bore immediate fruit, with a 6% click-through-rate and a steady trickle of user thank yous in my inbox. I admit, it was this thank yous that I found most persuasive.

> **What we learned:** Other experiments included changing up subject lines and copy, as well as a personal email inviting users to try session replays. None performed well, though we did learn users prefer [Lottie’s](https://posthog.com/community/profiles/227) hedgehog art over screenshots of the app!

## Onboarding 4.0
**RFC:** [Onboarding Emails 4.0](https://github.com/PostHog/meta/pull/150)

4.0 represented a _massive_ step up in the complexity of our flow, bringing in new logic that reflected the greater variety of products we offered by late 2023. It also built on top of the previous email flows, resulting in an onboarding experience that involved 28 separate emails – though the logic meant each user only got a fraction of that.

![Onboarding 4.0](../images/blog/onboarding/onboarding_31.png)
<caption>Onboarding 4.0 split high-ICP users out into their own email flow because our CS team would reach out directly</caption>

The intent of Onboarding 4.0 was to increase the number of emails we sent and begin driving awareness of other tools in the PostHog suite. For this reason I changed the conversion event to mean a new subscription to any product within one week of opening an email in the flow. 

However, because we had no way to gauge which product users were primarily interested in, Onboarding 4.0 takes the approach of assuming a specific order for upsell emails: analytics, replays, flags, surveys. I tried to stop these emails becoming too salesy, but it was still the case that a user who was interested mostly in surveys might not get an email about it for four weeks. This impacted performance significantly. 

- **Open rate:** 52%
- **Click-through-rate:** 4%
- **Conversion rate:** 6%
- **Unsubscribe rate:** 0.4%

The good news, I felt, was that the low unsubscribe rate and high open rate reflected that the emails weren’t too salesy – and the conversion rate was healthy too! However the open rate and click-through rate were still down on the previous version.

**What we learned:** An important step for 4.0 was using a scoring system, called `hubspot_score` to filter out users who seemed especially close to [our Ideal Customer Persona (ICP)](/founders/creating-ideal-customer-profile). High-scoring users would be filtered out of the standard flow so [our customer success team](/handbook/small-teams/customer-success) could give them high-touch support. 

## Onboarding 5.0
**RFC:** [Messaging: Onboarding 5.0](https://github.com/PostHog/meta/issues/172)

At the time of writing this is the current onboarding flow. It’s features over 53 emails and 38 timed events within it and was, quite simply, a pain in the ass to explain to everyone internally.

Many of the changes built on work [our Growth Team](/handbook/small-teams/growth) had done to improve product activation, including adding an in-app onboarding step where users select which product they are most interested in. The email flow reflects that selection and builds on it by demonstrating how other tools intersect with the initial product.

![Onboarding 5.0](../images/blog/onboarding/onboarding_31.png)
<caption>Onboarding 5.0: Messy, complex, and highly personalized to user interests</caption>

Other changes worth calling attention to include:

- We reintroduced the idea of giving technical and non-technical users different welcome emails. Technical users get directed to the docs as a CTA, while non-technical users get encouraged to invite a colleague. 
- We removed the entire high-ICP flow, as it was proving difficult to maintain and operate. 
- We removed the sequence which encouraged non-technical users to create actions and incorporated that content elsewhere. 

> **What we learned:** Doubling the number of emails in the flow made us very aware of how many emails we were sending. To avoid annoying users we added a time block based on our activation criteria. If a user hasn’t activated after two emails then we stop sending them emails for six weeks to avoid bothering them. We also use an unsubscribe notice that tells users how many emails they can typically expect. 

## What’s next?

At the time of writing Onboarding 5.0 has only been rolled out for one week, meaning it’s too early to judge any of the metrics because users will have only received the first email. The plan, however, is to keep an eye on the data (and user feedback) and find new ways to improve the flow even further. 

One way we’re already experimenting with this is by bringing back checks to see if users are ingesting events or not. We’re testing this with the session replay product by running the following flow for the first email after the welcome email: 

1. Check if a user has activated with session replays
    1. If YES, we invite them to subscribe to our newsletter
    1. If NO we check if they have ingested 10+ recordings since signing up
        1. If YES we know they have product configured, so we email them some tips about getting value out of session replays
        1. If NO we know they haven’t managed to install PostHog correctly and we send them one of two emails to help them get started

Hopefully we’ll see this test prove successful and we’ll be able to replicate these secondary checks across all products soon – in Onboarding 6.0!
