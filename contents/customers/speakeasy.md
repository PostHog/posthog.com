---
title: How Speakeasy manages features and developer relations using PostHog
customer: Speakeasy
logo: ../images/customers/speakeasy/speakeasy-logo.png
logoDark: ../images/customers/speakeasy/speakeasy-logo-dark.png
featuredImage: ../images/customers/speakeasy/speakeasy-featured.png
industries:
    - Devtool
users:
    - Product
    - Engineering
    - Growth
    - Developer Relations
toolsUsed:
    - Feature flags
    - Product analytics
    - Templates
date: 2023-08-31
---
​
A team of veteran API engineers founded Speakeasy with a mission to make every API easy to create and consume. Dozens of teams, including Writer, Airbyte and Codat, now trust [Speakeasy](https://speakeasyapi.dev/) to provide the tools that give their APIs a great developer experience: idiomatic SDKs in 8+ languages, Terraform providers and world-class reference docs.

Internally, the team relies on PostHog for both product development and marketing activities, a practice they've maintained since the early days.

"At the beginning, we were trying to cobble together our entire product operating system in bits and pieces," says Nolan Sullivan, Speakeasy's founding developer relations expert. "Then one of our founding engineers recommended we try PostHog. He'd used PostHog's open-source for his previous startup, and loved it. Initially, we used the (now [sunset](/blog/sunsetting-helm-support-posthog)) self-hosted version, but later switched to the cloud version."

"The reason for the switch was that we wanted to use some of the features and templates available only on the cloud version," Sullivan continues. "Running on PostHog Cloud has been fantastic, it's enabled us to move twice as fast.

### Replicating Google Analytics with PostHog Dashboard Templates

By moving to the cloud and deploying PostHog on both their core product and marketing site, Speakeasy can track website traffic and marketing metrics as well as product interactions. This combined approach offers a top-to-bottom view of conversion rates and user paths, without requiring extra setup time.

"One feature of PostHog I love is the dashboard templates," Nolan says. "I wanted to recreate a Google Analytics dashboard for our marketing efforts but didn't have the time to set up everything the way I wanted. The templates got me 80% of the way there with just a few clicks."

<BorderWrapper>
<Quote
    imageSource="/images/customers/speakeasy-nolan.jpg"
    size="md"
    name="Nolan Sullivan"
    title="Founding Developer Relations Lead, Speakeasy"
    quote={`“I love that PostHog is an all-in-one tool, with all the features of LaunchDarkly and all those other enterprise platforms. It is just so nice not having to go into multiple UIs to make changes and manage things.”`}
/>
</BorderWrapper>

PostHog's dashboard templates, created during the [Aruba hackathon](/blog/aruba-hackathon), cover more than just website metrics. They also offer [templates for tracking AARRR funnels](/templates), retention, and more.

"I'd recommend the dashboard templates to anyone starting with PostHog," Nolan advises. "If you make setting up the initial event capture a team activity and carefully consider the custom events you track, the dashboards will provide a strong foundation for success."

### Improving onboarding and feature roll-out with flags
Speakeasy also employs PostHog within its product. At the time of our conversation, Nolan and his team were actively refining their product's onboarding process, using insights directly from PostHog.

"We’re revamping our onboarding process because the product has changed significantly over the past four months," Nolan explained. "We started with a hypothesis that users weren't progressing through our onboarding flow due to an unfriendly first step of onboarding. We had all assumed this was the case for months, but a new funnel I built in PostHog proved us wrong!"

"Seeing that data was incredibly useful. We realized users were progressing at a higher rate than we thought and there was a source of drop-off that we'd never considered: the signup page. As a result, we’re now testing changes to that page based on our insights from PostHog."

Being a developer-led team, Speakeasy naturally incorporates feature flags into their change management strategy.

"We have alpha features that we want to keep hidden, so we use PostHog's feature flags to control access and roll out changes," Nolan states. "The integrated insights and feature flags help us monitor how users with specific flags enabled are using features, all from a single UI as we implement changes."

"In all honesty, I love that PostHog offers all these functionalities. It has all the features of LaunchDarkly and [Amplitude](/blog/posthog-vs-amplitude), but in one tool!"