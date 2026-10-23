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

* <PrivateLink url="https://us.posthog.com/project/2/customer_analytics/accounts">**Customer Analytics**</PrivateLink>**:** Tracks usage patterns, billing changes, health scores, and engagement metrics.  
  * Health scores update regularly as a composite of multiple metrics with different weights  
  * Data is synced in from Salesforce, PostHog, BuildBetter, and Stripe  
* <PrivateLink url="https://us.posthog.com/project/2/pipeline/overview">**PostHog pipelines**</PrivateLink>**:** Alerts for usage milestones, new product adoption, and behavioral changes. These are sent to Salesforce or Slack via PostHog CDP for alerts and data updates.   
* [**BuildBetter**](https://app.buildbetter.app/)**:** Analyzes customer calls for feature requests, pain points, and sentiment.   
  * Notes from calls are automatically synced to Salesforce and Customer Analytics  
  * feature requests and painpoints are automatically added to Customer Analytics and sent to \#feature-request-feed channel
* [**Gong**](https://app.gong.io/)**:** Records and transcribes customer calls.
  * Gong Streams push call recordings, transcripts, and summaries for a specific account into that account's internal Slack channel
* [**Zapier**](https://zapier.com/app/home)**:** Used for numerous automations such as:  
  * Renewal reminders  
  * Stale Slack channel notifications  
  * Billing updates

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
* The first real use of a paid product that the account did not use before creates a Customer Analytics task for the account owner (see [managed customer scouts](#managed-customer-scouts))  
* Overdue invoices and failed card payments send Slack alerts to the assigned AE, CSM, or TAM (see [failed/late payments](/handbook/growth/sales/billing#failedlate-payments))  
* Paid credit that will run out at least a month before it expires sends Slack alerts to the assigned AE, CSM, or TAM (see [when they don't have enough credit](/handbook/growth/sales/contract-rules#when-they-dont-have-enough-credit-to-cover-their-term))  
* Health score changes can trigger Customer Analytics tasks or PostHog automation  
* Annual renewal dates trigger preparation workflows in advance and a ping in Slack

### **Managed customer scouts**

Three [scouts](/docs/self-driving/scouts) watch every account that has a CSM, TAM, or AE in Customer Analytics. When a scout finds something, it creates a Customer Analytics task for the account owner, due in 3 working days. It also tags the account owners in <PrivateLink url="https://posthog.slack.com/archives/C0C7GP99CP3">#project-managed-customers-consolidated-scouts</PrivateLink>.

| Scout | What it finds | Task name starts with |
|-------|---------------|-----------------------|
| Billing intent | A billing page session where the customer is quota limited, struggled, changed a setting, looked into a cost change, or checked their limits several times. Replay Vision reads the session. | `Billing:` |
| New tool adoption | The first real use of a paid product that nobody at the account used in the last 400 days. | `New tool:` |
| Survey responses | An in-app survey answer that needs action, for example a low score, a bug, a cost concern, or a request for help. Replay Vision adds what the person did before and after the answer. Each owner also gets a weekly digest on Mondays with all other answers from their accounts. | `Survey:` |

Close the task when you act on it. Reply in the Slack thread when a task was useful or was noise, so that we can tune the scouts.

### **Human-first automation philosophy**

Every automated workflow includes deliberate human decision points. For example, when an account begins using session replay, Customer Analytics can create a task suggesting outreach about their use case \- but the CSM determines whether and how to engage based on the account relationship and context.

This approach ensures automation enhances rather than replaces the human elements of customer success.

### **Working effectively with automations**

**Best practices:**

* Review automated tasks such as Customer Analytics tasks, Slack alerts, and customer health scores at least twice weekly.   
* Treat automated insights as starting points for investigation, not final answers\!  
* Set up individual alerts in Customer Analytics or PostHog for signals that the [managed customer scouts](#managed-customer-scouts) do not cover. Do not copy those scouts for your own book, because they already watch every owned account.  
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
