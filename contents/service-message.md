---
title: Scheduled Maintenance
showTitle: false
showSidebar: true
noindex: true
---

import { StaticImage } from 'gatsby-plugin-image'
import Table from './_includes/example-table.mdx'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'

![Builder Hog](./images/service-message/worker-hog.png)
<br />

<h1 className="text-center px-2 pt-4 pb-2 md:px-8 text-3xl md:text-5xl xl:text-6xl relative z-20" style={{ marginTop: "-2rem", marginBottom: "-.5rem" }}>PostHog is undergoing <span className="text-red">scheduled</span> maintenance</h1>

<Hero
    subtitle="Updates are taking longer than expected. We'll keep this page updated."
/>

<details> 
  <summary> Who does this maintenance effect? </summary>
  <br />
This disruption will only impact users on our US Cloud, regardless of where they are in the world. Self-hosted and EU Cloud users are unaffected.
</details>

<details> 
<summary> What will the impact be?</summary>
  <br />
  At around 12:00 UTC we ran into an unexpected issue which mean some users may experience a 503 error and be unable to access PostHog. We are investigating the cause and recommend impacted users subscribe for incident updates at status.posthog.com. We can assure users that no data is being lost as a result of this disruption.

  We still expect only temporarily inconvenience for most users. No data or events will be lost, as new events and sessions will be delayed until the work is complete. Some insights may experience errors and feature flags will not persist for new incoming users for the duration of the maintenance. Persistent flags will continue working as expected for existing users.
</details>

<details> 
<summary> Will I lose any data?</summary>
  <br />
No. No events or data will be lost. Events during the maintenance period will be delayed, and become accessible once the updates are complete. 
</details>

<details> 
<summary> What about feature flags and experiments?</summary>
  <br />
Persistent feature flags will not persist for new incoming users for the duration of the maintenance. Persistent flags will continue working as expected for existing users. Feature flags and experiments will otherwise be unaffected and continue to function as normal for existing users. Normal service will immediately recover once the maintenance is completed. We strongly recommend not editing or creating new experiments or feature flags during the maintenance period.
</details>

<details> 
  <summary> What is being worked on? </summary>
Our Infrastructure Team is making some changes which are required to move PostHog's US Cloud to a new database. Specifically, we're migrating our Postgres database from Heroku, to Amazon services. This is part of essential work needed to make sure PostHog remains scalable. Additionally, we expect the new hosting to offer improved performance.
</details>

<details> 
  <summary> How long will this take? </summary>
    <br />
We started the maintenance work at 07:00 UTC on 1 Feb 2023 and expected it to take no more than two hours. Unfortunately, we've hit some unexpected delays and work is still ongoing. We'll keep this page updated with more information as it becomes available. 
</details>

<details> 
  <summary> I'm unable to access PostHog, why? </summary>
    <br />
Some users are reporting a 503 error caused by an unexpected issue. We've declared an incident for this and recommend impacted users subscribe for updates at status.posthog.com, for the latest information. We can assure users that no data is being lost as a result of this disruption.
</details>

<div className="centered py-5">
<h6>Got more questions? Let us know!</h6>
<CallToAction type="primary" width="84" to="/questions">
    Ask a question
</CallToAction>
</div>
