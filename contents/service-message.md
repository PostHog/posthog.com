---
title: Scheduled Maintencace
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
    subtitle="We started work at 07:00 UTC on 1 Feb 2023. The maintenance is expected to take approximately two hours."
/>

<details> 
  <summary> Who does this maintenance effect? </summary>
This disruption will only impact users on our US Cloud, regardless of where they are in the world. Self-hosted and EU Cloud users are unaffected.
</details>

<details> 
<summary> What will the impact be?</summary>
We expect only temporarily inconvenience. <b>No data or events will be lost</b>. New events and sessions will be delayed and some insights may experience errors until the maintenance is complete. New data and events will become accessible once the maintenance is complete, and PostHog will remain operational and accessible throughout. Feature flags and experiments will be unaffected for existing users; _new_ users may not experience persistent feature flags for the duration of the maintenance. 
</details>

<details> 
<summary> Will I lose any data?</summary>
No. No events or data will be lost. Events during the maintenance period will be delayed, and become accessible once the updates are complete. 
</details>

<details> 
<summary> What about feature flags and experiments?</summary>
Feature flags and experiments will be unaffected and continue to function as normal for existing users. _New_ users may not experience persistent feature flags for the duration of the maintenance. Service will immediately recover once the maintenance is completed. We strongly recommend not editing or creating new experiments or feature flags during the maintenance period.
</details>

<details> 
  <summary> What is being worked on? </summary>
Our Infrastructure Team is making some changes which are required to move PostHog's US Cloud to a new database. Specifically, we're migrating our Postgres database from Heroku, to Amazon services. This is part of essential work needed to make sure PostHog remains scalable. Additionally, we expect the new hosting to offer improved performance.
</details>

<details> 
  <summary> How long will this take? </summary>
We started the maintenance work at 07:00 UTC on 1 Feb 2023 and expect it to take no more than two hours. Once the work is complete we will remove the in-app banner and service will return to normal. 
</details>

<div className="centered py-5">
<h6>Got more questions? Let us know!</h6>
<CallToAction type="primary" width="84" to="/questions">
    Ask a question
</CallToAction>
</div>
