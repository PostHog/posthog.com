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
* [**Zapier**](https://zapier.com/app/home)**:** Used for numerous automations such as:  
  * Renewal reminders  
  * Stale Slack channel notifications  
  * Billing updates, failed payments

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

### **Incoorporating Posthog Signals into Automations:**

You can incoorporate PostHog signals into automation tools such as customer.io, zapier, n8n etc. to create outreach that highly resonates with users (vs. a generic 'hope all is well' type of message). To do this you can setup a Data Pipeline in PostHog and choose your desired tool i.e. wherever you manage your automations. You can then populate these autonomous tools, with context that allows them to trigger specific workflows or output, based on signals that you've ingested.

**Note**
As previously highlighted, this is not a substitution for personalized outreach and human intervention is incredibly important. Bombarding users with insignificant messages is not the intention of this recommendation. This workflow is to ensure that when we can't personally reach out to our users during important moments we have systems in place that do in a highly personalized manner.

**Importance**

This workflow is important because the way you interact and onboard a user who has been in the platform 10 times vs. 1000 is quite different. They shouldn't both be receiving the same emails, slack blasks, reminders, etc. You should have a dynamic experience based on signals that inform you of their behavior in PostHog. 

Even though we might not always be there to recognize customers accomplishments, as a user it still feels great to get emails from a team that know where you're at and what's important to you. Pulling in data from PostHog allows us to track milestones such as a 30 day streak, or completion of a key actions and subsequently interact with our customers, throughtfully.

**Use Case Example**: Customer upgrades from a free tier to a paid tier and has been a power user since 2022
**Platform**: Customer.io

A Segment is created and campaign distributed based off of subscription upgrade type. PostHog pushes event specific data to Customer.io signifying number of logins, feature breadth, streak milestones etc. Customer.io uses this information to place a user into the right segment and dynamically craft an email related to the upgrade and next steps the user should follow to take full advantage of this change, based on what we already know about them. Email is drafted. Human reviews and sends. You can also set the email to 'Send Automatically' if you'd like, and can configure Customer.io to send/receive as you vs. hello@posthog.com etc.
