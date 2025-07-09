---
title: How Qred ditched four separate tools for one source of truth
customer: Qred
logo: >- https://res.cloudinary.com/dmukukwp6/image/upload/qred_logo_light_24ad1306ee.png
logoDark: >- https://res.cloudinary.com/dmukukwp6/image/upload/qred_logo_dark_de17dafa9c.png
featuredImage: >-
Industries:
  - Fintech
users:
  - Engineering
  - Product
  - Marketing
toolsUsed:
  - Feature flags
  - Session recording
  - Experimentation
  - Product analytics
date: 2025-07-09
---
When Lezgin Bakircioglu, CTO at Swedish fintech [Qred](https://www.qred.se/en), looked at their onboarding flow, he saw a problem — not in the onboarding itself, but rather in the path to improving it and building a better product. 

“Our marketing team is very ambitious,” explains Lezgin. “They had big plans to improve the onboarding flow and to add information that would help customers. But it was a lot of back and forth, and tracking would get missed. Our front-end developers had to spend a lot of time implementing the tracking they needed to analyze users in Google Analytics.”

Eventually, Lezgin began the search for a new tool that could better track user behaviour without eating up dev time and while still meeting the strict regulatory requirements the team has to operate under. 
“I follow a lot of open source blogs and that’s where I heard about PostHog,” Lezgin explains. “I really liked that it was an open source SaaS, because that essentially gives me an easy exit plan: if I decide to leave, I can just host it myself.”

Spoiler: Lezgin did not decide to leave PostHog.

## More than autocapture: Replacing the whole stack
It wasn’t just the open-source safety net that made PostHog stand out — he also saw how much more the team could accomplish once the tracking headache was solved with PostHog’s [autocapture](/docs/product-analytics/autocapture).

“Autocapture solved my first problem because I no longer had front-end developers spending type adding the tracking our marketing team needed,” explains Lezgin. “Instead, we just captured that automatically and we could build all the dashboards we wanted, completely replacing the need for [Google Analytics](/blog/posthog-vs-ga4) in our product.”

Once Google Analytics was out of the picture, Lezgin started consolidating other tools into PostHog — swapping out [LaunchDarkly](/blog/posthog-vs-launchdarkly) and other [experimentation](/experiments) and [replay tools](/session-replay). The whole development stack got leaner, cheaper, and more powerful. 

PostHog has since become Qred’s single source of truth for an increasing amount of customer data — a place where the whole team can work together to make product decisions without bouncing between tools.

<BorderWrapper> <Quote imageSource="/images/customers/lezgin.jpg" size="md" name="Lezgin Bakircioglu" title="CTO, Qred" quote={`“One thing I have to say is that PostHog’s support is awesome. There’s no outsourced first line or call centers — you get real answers fast, straight from the actual engineers. If you find a bug, they show you the GitHub issue and you can literally watch it get fixed. I love that.”`} /> </BorderWrapper>

## From quick fixes to a single source of truth
As a bank, Qred is also beholden to additional regulations beyond the usual obligations of [GDPR](/docs/privacy/gdpr-compliance). The Bank Secrecy Act (BSA), for example, imposes certain obligations for tracking transactions — and Qred therefore doesn’t pass all customer data through to PostHog. Instead, they use reference IDs that correspond to customer details elsewhere and the team join data warehouse tables when needed for deep analysis. 

Despite these compliance constraints, tools like session recording have been a huge win for Qred — not just in terms of analytics, but also for troubleshooting. In fact, the team already has plans to further enrich [person data](/docs/data/persons) with additional properties.

“This is stuff we couldn’t do with Google Analytics or any other tool,” explains Lezgin. “Other platforms give you aggregated data and you can’t sort through it easily, or it’s difficult to connect with other tools. With PostHog it’s easy to enrich persons with internal data and then we can do feature flagging and A/B testing using it in a way that’s well-connected _and_ secure.”

Unsurprisingly (and convenient for us to highlight in this article), Legzin doesn’t regret adopting PostHog. He still sees plenty of room to expand usage further and has clear advice for other fintechs facing similar challenges.

“Hell yes, I’d recommend PostHog. It’s just important to think about your setup — you can just use autocapture to grab everything and move fast, or you can tag exactly what you want to keep the bill lower. Either way works and you can still go from a usage funnel that’s automatically posted to Slack to a specific event to a session recording of a user and see what feature flags they’ve used. It’s incredible.”

