---
title: How Witty Works created open-source plugins with the PostHog community
customer: Witty Works
logo: ../images/customers/wittyworks/witty-logo.png
featuredImage: ../images/customers/wittyworks/featured.png
industries:
    - SaaS, Browser extension
users:
    - Marketing
    - Engineering
toolsUsed:
    - Dashboards
    - Plugins
---

[Witty Works](https://www.witty.works/) is the creator of Witty, an AI-based assistant which guides users to become better, more inclusive writers. Since launching in 2018 it has been adopted by organizations such as Microsoft and Deloitte to help discourage unconscious bias in written communications. 

Initially, the team built their own tool for gathering product data, writing a JSON file into the file system for every event observed. Eventually, this proved unscalable. 

“We crashed the production platform due to having too many files in the system,” said CTO and Co-founder Lukas Smith. “We considered switching to Google Analytics, but there were a lot of concerns around GDPR and I wanted something that could be self-hosted. That’s what led me to PostHog.”
## Creating plugins to connect systems and protect user privacy
Once Witty Works’ Engineering team had deployed PostHog internally, other teams began using the platform too. Marketing, for example, wanted to use PostHog to track onboarding funnels and understand when users updated [the Witty browser extension](https://chrome.google.com/webstore/detail/witty-your-inclusive-writ/meojhlodfiihbjkcnehkdcgncnhgagog?hl=en). As a result, Witty Works used [PostHog’s plugin system](/docs/user-guides/plugins) to integrate with many tools in its stack. 

<BorderWrapper>
    <Quote
        imageSource="/images/customers/lukas-witty.jpeg"
        size="md"
        name="Lukas Smith"
        title="CTO & Co-founder, Witty Works"
        quote={`“I have a long history in open source. I found the community very responsive and open to both feedback and even to code changes. That gave me assurance that, if PostHog can’t do something, there’s a realistic path to building it myself.”`}
    />
</BorderWrapper>

“We connected all of my usual tools, such as [HubSpot](/integrations/hubspot), using PostHog’s plugins,” said Head of Marketing Alexander Groschup. “That enabled me to start putting information into [dashboards](/docs/user-guides/dashboards) and to really get started. Once I could see the dashboards, I started to understand how valuable PostHog would be.”

While ready-made integrations were available for many tools, such as Sentry and HubSpot, Witty Works’ team had far bigger plans they wanted to achieve with the plugin system. 

“User privacy is one of our key features and we’re very careful about the data we collect,” explained Lukas Smith. “PostHog has a [GeoIP plugin](/integrations/geoip), but we didn’t want to log IP addresses for every user. We only wanted to know the country they were from. So, [we built a plugin of our own](/docs/plugins/build) to achieve that.”

<BorderWrapper>
    <Quote
        imageSource="/images/customers/lukas-witty.jpeg"
        size="md"
        name="Lukas Smith"
        title="CTO & Co-founder, Witty Works"
        quote={`“The plugin system is sort of like an insurance policy. We don’t know everything we’ll need in the future, but if we need Feature X then plugins give us a path to getting it even if it isn’t part of PostHog.”`}
    />
</BorderWrapper>

[Witty Works’ Property Filter plugin](/integrations/property-filter) does this by deleting all configured properties inside an ingested event so that PostHog doesn’t collect any unwanted data. Running this plugin last in a plugin chain makes sure that it applies to data bought in by any other plugins too.

This whole process was achieved with just 26 lines of code and was released to all PostHog users as a community plugin. Plus, because the plugin is open source like PostHog, the community has been able to enhance it even further — [the current version is now 44 lines of code and even came with tests](https://github.com/witty-works/posthog-property-filter-plugin/blob/dev/index.js) made by [the PostHog community](/slack)!  and has now been released to all PostHog users as a community plugin after a quick review from PostHog’s team. 

“One of the advantages of being an open-source product is that we can collaborate with users and help them build exactly what they need,” said PostHog Software Engineer Yakko Majuri. “By building their own plugins and contributing to [our plugin library](/integrations), Witty Works has helped make PostHog a better product for everyone!”