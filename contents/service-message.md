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
    subtitle="We've temporarily paused ingestion. We'll keep this page updated."
/>

<details> 
  <summary> Why is ingestion paused, and for how long? </summary>
  <br />
We're migrating the Postgres database for our US cloud to make PostHog faster, and more scalable. We can't migrate the database efficiently while it's in use, so we've temporarily paused ingestion. This is a planned event and is not related to an incident or outage.

We started work at 11:00 UTC, April 28 and expect it to take up to four hours. If it takes longer, we'll keep this page updated with the latest information. We'll remove the in-app banner once work is finished.
</details>

<details> 
<summary> What will the impact be?</summary>
  <br />
This work will only impact users on our US Cloud, regardless of where they are in the world. Self-hosted and EU Cloud users are unaffected. 
  
You'll still be able to log in and use PostHog to analyze historic data as normal, but no new data will be ingested to PostHog while this maintenance is underway. Instead, we'll store data and ingest it as normal once the work is complete. Events will be delayed, but not lost. 

Feature flags and experiments will function as expected for your users, but you won't be able to make changes to them until the maintenance is complete.   
</details>

<details> 
<summary> Will I lose any data?</summary>
  <br />
No. No events or data will be lost. Instead, data will be delayed during the maintenance period and become accessible once the work is complete. 
</details>

<details> 
  <summary> How do I report an issue not covered here? </summary>
    <br />
If you're seeing a bug or other unexpected behaviour, you can report it in the app using the drop down menu in the top right and selecting 'Report bug / get support'. Alternatively, you can ask us a question using the button below. 

If you suspect an outage or incident affecting PostHog services, we recommend checking [our status metrics](https://status.posthog.com/) before reporting.
</details>

<div className="centered py-5">
<h6>Got more questions? Let us know!</h6>
<CallToAction type="primary" width="84" to="/questions">
    Ask a question
</CallToAction>
</div>
