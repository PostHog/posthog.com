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

<h1 className="text-center px-2 pt-4 pb-2 md:px-8 text-3xl md:text-5xl xl:text-6xl relative z-20" style={{ marginTop: "-2rem", marginBottom: "-.5rem" }}>We've <span className="text-red">finished</span> some scheduled maintenance</h1>

<Hero
    subtitle="We finished at 10:30 UTC. Event ingestion is catching back up."
/>

<details> 
  <summary>Who was impacted by the maintenance?</summary>
The maintenance only impacted users on our US cloud, who access PostHog via app.posthog.com. We notified these users about this work last week, by email. Self-hosted and EU cloud users were not impacted and will have enjoyed normal service.
</details>

<details> 
  <summary>Was there any disruption?</summary>
We ensured there was minimal disruption for PostHog users. Ingestion was briefly paused while the work was done, and events were stored to be processed once it was complete. There may have been some unusual behaviour within insights while the maintenance was underway, and feature flag persistence did not function for new incoming users only. All other feature flags and experiments continued to function as expected. We notified all impacted users by email the week previous to starting this maintenance, to give them time to prepare and scheduled the work to ensure minimal impact to users.
</details>

<details>
  <summary>Was any data lost?</summary>
No. No events or data was lost, as we paused event ingestion for the duration of the work and stored data to be processed once the work was complete. We're now ingesting all events from the  maintenance period. It may take a few hours for PostHog to completely recover from this ingestion lag. 
</details>

<details> 
  <summary>How long will event ingestion take to catch up?</summary>
In order to ensure no data was lost, we stored all events that occurred during the maintenance period so that they could be ingested once the work was complete. We're now processing those events. It may take a few hours for PostHog to catch up, and once the system is back to normal we'll remove the in-app notification. 
</details>

<details> 
  <summary>Were feature flags or experiments disrupted?</summary>
Persistent feature flags did not persist for new incoming users for the duration of the maintenance, but continued working as expected for existing users. Feature flags and experiments were otherwise unaffected and continued to function as normal. Now that the work is complete, feature flag persistence is now back to normal.</details>

<details> 
  <summary> What was upgraded and why? </summary>
We migrated our Postgres database from Heroku, to Amazon services. This was essential work to make sure PostHog remains scalable and will unlock improved performance for users on our US cloud.
</details>

<details> 
  <summary> Was the work successful? </summary>
Yes. The maintenance took a little over the two hour period we anticipated, but was otherwise entirely successful. We'd like to thank the Infrastructure Team for their hard work with this migration. Thanks, team!
</details>

<div className="centered py-5">
<h6>Got more questions? Let us know!</h6>
<CallToAction type="primary" width="84" to="/questions">
    Ask a question
</CallToAction>
</div>
