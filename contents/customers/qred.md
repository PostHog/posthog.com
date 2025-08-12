---
title: How Qred ditched four separate tools for one source of truth
customer: Qred
logo: >- 
  https://res.cloudinary.com/dmukukwp6/image/upload/qred_logo_light_24ad1306ee.png
logoDark: >- 
  https://res.cloudinary.com/dmukukwp6/image/upload/qred_logo_dark_de17dafa9c.png
featuredImage: >- 
  https://res.cloudinary.com/dmukukwp6/image/upload/dimension_56cccccb2c.jpg
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
  - MCP
  - Data pipelines
date: 2025-07-09
---
When Lezgin Bakircioglu, CTO at Swedish fintech [Qred](https://www.qred.se/en), looked at their onboarding flow, he saw a problem — not in the onboarding itself, but rather in the path to improving it and building a better product. 

“We had big ambitions with Google Analytics which were being driven outside of the engineering team,” explains Lezgin. “There were plans to improve the onboarding flow and to add information that would help customers. But it was a lot of back and forth, and tracking would get missed. Our front-end developers had to spend a lot of time implementing the tracking they needed to analyze users in Google Analytics.”

Eventually, Lezgin began the search for a new tool that could better track user behaviour without eating up dev time and while still meeting the strict regulatory requirements the team has to operate under. 

“I follow a lot of open source blogs and that’s where I heard about PostHog,” Lezgin explains. “I really liked that it was an open source SaaS, because that essentially gives me an easy exit plan: if I decide to leave, I can just host it myself.”

Spoiler: Lezgin did not decide to leave PostHog.

<BorderWrapper> <Quote imageSource="/images/customers/lezgin.jpg" size="md" name="Lezgin Bakircioglu" title="CTO, Qred" quote={`“One thing I have to say is that PostHog’s support is awesome. There’s no outsourced first line or call centers — you get real answers fast, straight from the actual engineers. If you find a bug, they show you the GitHub issue and you can literally watch it get fixed. I love that.”`} /> </BorderWrapper>

## More than autocapture: Replacing the whole stack
It wasn’t just the open-source safety net that made PostHog stand out — he also saw how much more the team could accomplish once the tracking headache was solved with PostHog’s [autocapture](/docs/product-analytics/autocapture).

"Autocapture solved my first problem because I no longer had front-end developers spending time adding tracking," explains Lezgin. "Instead, we just captured that automatically and we could build all the dashboards we wanted, completely replacing the need for [Google Analytics](/blog/posthog-vs-ga4) in our product."

"It used to be the case that if we didn't add tracking for something in Google Analytics then we just lost that datapoint. That's not the case with PostHog though!"

Once Google Analytics was out of the picture for tracking product usage, Lezgin started consolidating other tools into PostHog — swapping out [LaunchDarkly](/blog/posthog-vs-launchdarkly) and other [experimentation](/experiments) and [replay tools](/session-replay). The whole development stack got leaner, cheaper, and more powerful. 

PostHog has since become Qred’s single source of truth for an increasing amount of frontend data — a place where the whole team can work together to make product decisions without bouncing between tools. Even non-technical staff now frequently use PostHog to make decisions. 

<BorderWrapper>
  <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 my-8">
    <div className="space-y-4">
      <img 
        src="https://res.cloudinary.com/dmukukwp6/image/upload/qred_screen1_4d8cf22b34.jpg" 
        alt="Qred experiment screenshot" 
        className="w-full rounded-md shadow-sm"
      />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Building a better onboarding flow with PostHog</h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        With PostHog as a single source of truth, Qred could back bold changes with confidence. When adding an online ID verification step to onboarding, some feared a drop in conversion. A quick A/B test proved it actually boosted retention — unblocking the team and improving the customer journey without hurting conversion at all.
      </p>
    </div>
  </div>
</BorderWrapper>

## From quick fixes to a single source of truth
As a bank, Qred is also beholden to additional regulations beyond the usual obligations of [GDPR](/docs/privacy/gdpr-compliance). The Bank Secrecy Act (BSA), for example, imposes certain obligations for tracking users — and Qred therefore doesn’t pass all customer data through to PostHog. Instead, they use reference IDs that correspond to customer details elsewhere and the team join data warehouse tables when needed for deep analysis. 

Despite these compliance constraints, tools like session recording have been a huge win for Qred — not just in terms of analytics, but also for troubleshooting. In fact, the team already has plans to further enrich [person data](/docs/data/persons) with additional properties.

"This is stuff we couldn't do with Google Analytics or any other tool," explains Lezgin. "Other platforms give you aggregated data and you can't sort through it easily, or it's difficult to connect with other tools. With PostHog it's easy to enrich persons with internal data and then we can do feature flagging and A/B testing using it in a way that's well-connected _and_ secure."

Unsurprisingly (and convenient for us to highlight in this article), Lezgin doesn't regret adopting PostHog. He still sees plenty of room to expand usage further and has clear advice for other fintechs facing similar challenges.

“Hell yes, I’d recommend PostHog. It’s just important to think about your setup — you can just use autocapture to grab everything and move fast, or you can tag exactly what you want to keep the bill lower. Either way works and you can still go from a usage funnel that’s automatically posted to Slack to a specific event to a session recording of a user and see what feature flags they’ve used. It’s incredible.”

"Especially [the MCP.](https://github.com/PostHog/mcp)"

