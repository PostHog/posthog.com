---
title: How Qred Bank ditched four separate tools for one source of truth
customer: Qred
featuredImage: >-
    https://res.cloudinary.com/dmukukwp6/image/upload/dimension_56cccccb2c.jpg
date: 2025-08-26
---

When Lezgin Zilan, CTO at Swedish fintech [Qred Bank](https://www.qred.se/en), looked at their onboarding flow, he saw a problem — not in the onboarding itself, but rather in the path to improving it and building a better product.

“We had big ambitions with Google Analytics which were being driven outside of the engineering team,” explains Lezgin. “There were plans to improve the onboarding flow and to add information that would help customers. But it was a lot of back and forth, and tracking would get missed. Our front-end developers had to spend a lot of time implementing the tracking they needed to analyze users in Google Analytics.”

Eventually, Lezgin began the search for a new tool that could better track user behavior without eating up dev time and while still meeting the strict regulatory requirements the team has to operate under.

“I follow a lot of open source blogs and that’s where I heard about PostHog,” Lezgin explains. “I really liked that it was an open source SaaS, because that essentially gives me an easy exit plan: if I decide to leave, I can just host it myself.”

Spoiler: Lezgin did not decide to leave PostHog.

<OSQuote
  customer="qred"
  author="lezgin_zilan"
  quote={0}
 />

## More than autocapture: Replacing the whole stack

It wasn’t just the open-source safety net that made PostHog stand out, he also saw how much more the team could accomplish once the tracking headache was solved with PostHog’s [autocapture](/docs/product-analytics/autocapture).

"Autocapture solved my first problem because I no longer had front-end developers spending time adding tracking," explains Lezgin. "Instead, we just captured that automatically and we could build all the dashboards we wanted, completely replacing the need for [Google Analytics](/blog/posthog-vs-ga4) in our product."

"It used to be the case that if we didn't add tracking for something in Google Analytics then we just lost that datapoint. That's not the case with PostHog though!"

Once Google Analytics was out of the picture for tracking product usage, Lezgin started consolidating other tools into PostHog — swapping out [LaunchDarkly](/blog/posthog-vs-launchdarkly) and other [experimentation](/experiments) and [replay tools](/session-replay). The whole development stack got leaner, cheaper, and more powerful.

PostHog has since become Qred Bank’s single source of truth for an increasing amount of frontend data — a place where the whole team can work together to make product decisions without bouncing between tools. Even non-technical staff now frequently use PostHog to make decisions.

<BorderWrapper>
  <div className="bg-[#E5E7E0] dark:bg-[#2C2C2C] rounded-lg p-6 my-8">
    <div className="space-y-4">
      <img 
        src="https://res.cloudinary.com/dmukukwp6/image/upload/group_9575_6f6f3c544d.jpg" 
        alt="Qred Bank experiment screenshot" 
        className="w-full rounded-md shadow-sm"
      />
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Building a better onboarding flow with PostHog</h3>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Backed by PostHog as a single source of truth, Qred can make bold changes with confidence. When trying to find the optimal onboarding flow length and structure, for example, some feared a drop in conversion. However, an A/B test proved it actually boosted retention — unblocking the team and improving the user journey without hurting conversion.
      </p>
    </div>
  </div>
</BorderWrapper>

## From quick fixes to a single source of truth

As a bank, Qred is also beholden to additional regulations beyond the usual obligations of [GDPR](/docs/privacy/gdpr-compliance). The Bank Secrecy Act (BSA), for example, imposes certain obligations for tracking users, and Qred therefore doesn’t pass all customer data through to PostHog. Instead, they use reference IDs that correspond to customer details elsewhere and the team join data warehouse tables when needed for deep analysis.

Despite these compliance constraints, tools like session recording have been a huge win for Qred Bank — not just in terms of analytics, but also for troubleshooting. In fact, the team already has plans to further enrich [person data](/docs/data/persons) with additional properties.

"This is stuff we couldn't do with Google Analytics or any other tool," explains Lezgin. "Other platforms give you aggregated data and you can't sort through it easily, or it's difficult to connect with other tools. With PostHog it's easy to enrich persons with internal data and then we can do feature flagging and A/B testing using it in a way that's well-connected _and_ secure."

Unsurprisingly (and convenient for us to highlight in this article), Lezgin doesn't regret adopting PostHog. He still sees plenty of room to expand usage further and has clear advice for other fintechs facing similar challenges.

“Hell yes, I’d recommend PostHog. It’s just important to think about your setup — you can just use autocapture to grab everything and move fast, or you can tag exactly what you want to keep the bill lower. Either way works and you can still go from a usage funnel that’s automatically posted to Slack to a specific event to a session recording of a user and see what feature flags they’ve used. It’s incredible.”

"Especially [the MCP.](https://github.com/PostHog/posthog/tree/master/services/mcp)"
