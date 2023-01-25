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

<h1 className="text-center px-2 pt-4 md:px-8 text-3xl md:text-5xl xl:text-6xl relative z-20" style={{ marginTop: "-2rem", marginBottom: "-.5rem" }}>PostHog is undergoing <span className="text-red">scheduled</span> maintenance</h1>

<Hero
    subtitle="At TIME we began upgrading PostHog's infrastructure. The maintenance is expected to take approximately two hours."
/>

<details> 
  <summary> Who does this maintenance effect? </summary>
  <br />
This disruption will only impact users on our US Cloud, regardless of where they are in the world. Self-hosted and EU Cloud users are unaffected.
</details>

<details> 
<summary> What will the impact be?</summary>
  <br />
We expect only temporarily inconvenience. <b>No data or events will be lost</b>. New events and sessions will be delayed and some insights may experience errors until the maintenance is complete. New data and events will become accessible once the maintenance is complete, and PostHog will remain operational and accessible throughout.
</details>

<details> 
<summary> Will I lose any data?</summary>
  <br />
No, no events or data will be lost. Data and events which occur during the maintenance period will be delayed, and made accessible once the updates are complete. 
</details>

<details> 
  <summary> What is being worked on? </summary>
  <br />
Our Infrastructure Team is making some changes which are required to move PostHog's US Cloud to a new database. This is part of essential work to make sure PostHog remains scalable. We're open source, so you can find out more about the work we're doing in [our Github repos](https://github.com/PostHog). 
</details>

<details> 
  <summary> How long will this take? </summary>
  <br />
We started the maintenance work at XXXXXXXX and expect it to take no more than two hours. Once the work is complete we will remove the in-app banner and service will return to normal. 
</details>

<div className="centered py-5">
<h6>Got more questions? Let us know!</h6>
<CallToAction type="primary" width="84" to="/questions">
    Ask a question
</CallToAction>
</div>
