---
title: How we use automation in Customer Success
sidebar: Handbook
showTitle: true
---

## **How we use automation** 

Customer Success at PostHog means managing \~30 accounts per CSM while maintaining deep, meaningful relationships with each customer. Automation and AI tools can help surface important signals and streamline repetitive tasks, allowing CSMs to focus on strategic guidance and relationship building.  

Automation should never be used as a replacement for human connection and interaction, but mainly as a tool to help a CSM be better prepared, informed, and effective. 

### **Current automation stack**

PostHog CS leverages several integrated tools to monitor account health and identify opportunities:

**Core monitoring systems:**

* <PrivateLink url="https://posthog.vitally-eu.io/">**Vitally**</PrivateLink>**:** Tracks usage patterns, billing changes, health scores, and engagement metrics.  
  * Opportunities and Risks are surfaced via "Indicators"  
  * Health scores update regularly as a composite of multiple metrics with different weights  
  * Data is synced in from Salesforce, PostHog, BuildBetter, and Stripe  
* <PrivateLink url="https://us.posthog.com/project/2/pipeline/overview">**PostHog pipelines**</PrivateLink>**:** Alerts for usage milestones, new product adoption, and behavioral changes. These are sent to Vitally, Salesforce, or Slack via PostHog CDP for alerts and data updates.   
* [**BuildBetter**](https://app.buildbetter.app/)**:** Analyzes customer calls for feature requests, pain points, and sentiment.   
  * Notes from calls are automatically synced to Salesforce and Vitally  
  * feature requests and painpoints are automatically added to Vitally and sent to \#feature-request-feed channel
* [**Gong**](https://app.gong.io/)**:** Records and transcribes customer calls.
  * Gong Streams push call recordings, transcripts, and summaries for a specific account into that account's internal Slack channel
* [**Zapier**](https://zapier.com/app/home)**:** Used for numerous automations such as:  
  * Renewal reminders  
  * Stale Slack channel notifications  
  * Billing updates, failed payments

### **How to surface calls for shared accounts**
On larger accounts, a TAM and a CSM share ownership. Both need visibility of every customer call, not just the ones they attended.
For each shared customer, we keep a dedicated internal Slack channel named `customer-name-internal`. This sits alongside the customer-facing Slack Connect channel, but stays internal only.
To surface calls there, set up a Gong Stream:
* In Gong, open **Your Library** and find **Streams** (ask Simon for access)
* Configure a stream for the account
* Point it at that account's `customer-name-internal` channel
Once live, the stream posts each call to the channel after it ends. Everyone working the account is notified once the call is done, with the transcript and summary to hand.

### **Key automated workflows**

**Account monitoring triggers include:**

* MRR changes exceeding certain thresholds generate investigation tasks  
* inactivity periods to flag engagement reviews  
* New product usage (any amount) creates cross-sell opportunity indicator  
* Payment failures and low credit balances to send Slack alerts to assigned CSM  
* Health score changes trigger Vitally indicators  
* Annual renewal dates trigger preparation workflows in advance and a ping in Slack

### **Human-first automation philosophy**

Every automated workflow includes deliberate human decision points. For example, when an account begins using session replay, Vitally creates an indicator suggesting outreach about their use case \- but the CSM determines whether and how to engage based on the account relationship and context.

This approach ensures automation enhances rather than replaces the human elements of customer success.

### **Working effectively with automations**

**Best practices:**

* Review automated tasks such as Vitally indicators, Slack alerts, and customer health scores at least twice weekly.   
* Treat automated insights as starting points for investigation, not final answers\!  
* Set-up individual alerts in Vitally or PostHog CDP that match your own portfolio and experiences  
  * As an example, setting up your accounts as a Cohort in PostHog and then setting up CDP alerts/notifications to Slack based on product usage and activity.

**What remains purely human:**

* Initial customer responses and relationship building  
* Renewal negotiations and strategic planning  
* Technical implementation guidance  
* Complex problem-solving and consultative conversations

### **Requesting new automations**

CSMs are encouraged (as are all PostHog employees) to experiment and surface new ideas frequently in Slack or team stand-up. Examples of areas where automations could be useful include, but are not limited to: 

* Time savings versus implementation complexity  
* Impact on customer experience  
* Requirement for human judgment  
* Scalability across the team
