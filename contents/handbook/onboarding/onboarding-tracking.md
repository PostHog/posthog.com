---
title: Onboarding process
sidebar: Handbook
showTitle: true
---

The onboarding team operates a high volume, high velocity sales pipeline with all pay-as-you-go (or YC) accounts that are forecasted to spend > $500 and are not otherwise engaged by Sales/CSM. As such, Onboarding is a linear flow moving from initial outreach to confirming the product is configured properly, ending with customers who are happy paying multiple bills. We aim to keep engagements to ~8 weeks, or 2 full billing periods, but in practice, there is some spillover depending on responsiveness.

### Principles

Our onboarding program was created to offer necessary help, increase the value our customers get from PostHog, and assist them in achieving their business goals.

The program is guided by a few key principles:

- Help with initial configuration and billing, offer advice on usage.
- Assist customers with any technical questions they have around fitting PostHog into their stack.
- Act as strategic partners in achieving business goals.
- Adapt to varied levels of engagement while ensuring value for everyone.
- Encourage time spent in PostHog, trying things out. Adoption can be fun!
- Share best practices to leverage PostHog tailored to specific use cases.

### Internal process

#### Customer Analytics view

**Comprehensive onboarding view** (<PrivateLink url="https://us.posthog.com/project/2/customer_analytics/accounts?view=01a11d0a-3430-73f3-be27-777e0b6c904b">link</PrivateLink>)

The view is automatically sorted by Onboarding Priority. The formula weights MRR, renewal date, when we last contacted the account, and more, so you mostly work from the top to the bottom of the queue. Since our role is focused on proactively providing users with value and setting them up for success, we’ve found it’s best to contact them ~14 days before their bill renews. This gives them enough time to see our email, schedule a call, and implement potential improvements in their setup.

Keep an eye on “Onboarding Pipeline,” which indicates whether the account is New or Onboarding has been initiated.

In the view, you have other useful columns like OS Priority, OS Last Messaged, forecasted MRR, or who’s assigned to the account. All these help in prioritizing your work.

Maintaining good hygiene and attention to detail is key here. Keep labels up to date and make sure not to miss accounts that were recently added to the queue—they might appear at the top of the list among accounts you’ve already worked through.

Remember to add a short summary from meetings in a Note, and if you need to follow up at some point, create a Task with a due date.

#### Onboarding program - logic and sequence

There are two paths for customers to progress through the onboarding process: those who engage with us in some way, and those who show little or no engagement.

User engagement is tracked behind the scenes with the time stamp in Vitally, thanks to which we can query relevant data. 

For day-to-day operations, these are the statuses we use to track users in the **Onboarding Pipeline** property:

- `1. New Account` - Where new customers land when they get the `Onboarding Lead` tag. During the outreach, we audit the account and share observations on current usage and optimization tips. We point out any configuration issues affecting their bill or ability to use the product properly. Our main objective is oriented towards trimming unnecessary spending, and communicating our position that [we are the cheapest for every product](https://posthog.com/why). This step can also involve refunding/adjusting bills for misconfigurations, per [our policy](https://posthog.com/handbook/growth/sales/refunds).
- `2. Onboarding Initiated` - Assigned as soon as we send out the initial outreach email.
- `3. Onboarded` -  The onboarding program has been completed. The status chances automatically after the Graduation email is sent, or we change it manually for some reason.
- `Sales Handoff` - Assigned to customers that we [hand over to sales](/handbook/onboarding/sales-handover). This can happen at any stage throughout the process.
- `Paid call purchased` - Assigned when someone buys our consultation via the merch store. The status is applied automatically via [this Workflow](https://us.posthog.com/project/2/workflows/019ae005-7196-0000-2099-ab41737ab9f6/workflow). 

The last two are not numbered, as they happen "outside" of the regular pipeline.

For higher-spend accounts ($500+), we have `Check-in` **Onboarding Status** property that's triggered between 15-21 day in the Onboarding Journey. It serves us as a visual helper and reminder to circle back to the account, see if our advice was followed, record a Loom video, or share some extra resources. It's a great opportunity to re-engage customers and show them some other PostHog's capabilities that they may not know about.

The complete Onboarding Journey looks as follows:

| Weeks | Actions |
| -------- | -------- |
| Week 1    | First outreach to a New Account|
| Week 2    |          |
| Week 3    | Extra check-in for $500+ accounts|
| Week 4    |          |
| Week 5    | 2nd outreach (automated) - all accounts|
| Week 6    |          |
| Week 7    |          |
| Week 8    | Graduation (automated) - all accounts|

The last two stages of the Onboarding Journey are automated with Vitally playbooks. Second outreach prompts users to surface unanswered questions and book a session with us, and the Graduation email is a nice way to conclude the journey and point out other avenues where users can get help. It's also where we ask for feedback about our Onboarding. 

#### Email link tracking

Every link in the automated onboarding emails carries UTM parameters, so we can measure what customers actually click and report on notebooks created and prompts clicked rather than calls booked. The scheme is `utm_source=onboarding`, `utm_medium=email`, `utm_campaign=onb_e1` through `onb_e4` (one value per email in the sequence), and `utm_content` naming the individual link:

| Email | Tracked links (`utm_content`) |
| -------- | -------- |
| E1 - first outreach (cost + implementation) | `audit_prompt`, `billing`, `wizard_docs`, `calendly` |
| E2 - second outreach (adoption) | `audit_prompt`, `calendly` |
| E3 - last chance | `ai_assistant`, `prompts`, `calendly` |

Where the numbers live:

- The main view is the **Onboarding email link tracking** dashboard (<PrivateLink url="https://us.posthog.com/project/2/dashboard/1946614">link</PrivateLink>): per-email sections, per-link breakdowns, and all-time totals.
- App links (the audit prompts, PostHog AI) sit behind a login: a logged-out click bounces to the sign-in page and its UTM properties are lost. The executive **Onboarding email link clicks (E1-E4)** insight (<PrivateLink url="https://us.posthog.com/project/2/insights/TKyFrkIR">link</PrivateLink>) therefore matches the campaign tag inside the page URL, which survives the redirect in double-encoded form, so every click counts whether or not the customer was logged in. A separate insight on the dashboard isolates the login-wall bounces.
- Calendly clicks never reach PostHog. Calendly stores the UTMs on each booking instead, so filter the Calendly Meetings page by `utm_campaign` to attribute booked calls to emails.
- The YouTube link in E3 is deliberately untracked (YouTube ignores UTM parameters, and we cannot read its analytics).

The live templates and their sending playbooks (the templates are the canonical copies of the audit prompts and the full tracked URLs; we avoid pasting the tracked URLs here so stray clicks from this page do not pollute the data):

- E1: <PrivateLink url="https://posthog.vitally-eu.io/settings/templates/conversations/dcf5f62b-463d-47b2-81df-ea522c240463">template</PrivateLink>, <PrivateLink url="https://posthog.vitally-eu.io/settings/playbooks/427384ad-f753-40fd-9473-c705d9911cbb">playbook</PrivateLink>
- E2: <PrivateLink url="https://posthog.vitally-eu.io/settings/templates/conversations/4d8b1690-1a1e-4de2-a71e-3c08839df8aa">template</PrivateLink>, <PrivateLink url="https://posthog.vitally-eu.io/settings/playbooks/34522df1-065a-449b-9fc3-16a97c7921cf">playbook</PrivateLink>
- E3: <PrivateLink url="https://posthog.vitally-eu.io/settings/templates/conversations/5e2637d8-29e9-4700-b227-33e1fe282f62">template</PrivateLink>, <PrivateLink url="https://posthog.vitally-eu.io/settings/playbooks/c8e8cd60-2af3-4f8b-945a-7eafae4148eb">playbook</PrivateLink>

#### Account analysis for outreach and meetings

-   Take a look at the [Metabase primer](https://posthog.com/handbook/onboarding/metabase-account-analysis) and follow the tips included there.
-   Check and get familiar with the [Account health check](https://posthog.com/handbook/cs-and-onboarding/health-tracking) and the [Onboarding conversations](https://posthog.com/handbook/onboarding/onboarding-conversations-playbook) pages.
-   Use our docs, and link to relevant information.
-   Check the [Matching PostHog to a business type](https://posthog.com/handbook/growth/sales/utilization-by-business-type) page to understand your customers better in general.
-   Use Wappalyzer (browser or extension) to understand the customer's tech stack better. Credentials available in 1password.

### How this is organized in Workflows

All onboarding automation lives in the `Onboarding::` [workflows](https://us.posthog.com/project/2/workflows):

- **Enter queue** - Every day, moves eligible accounts with no onboarding stage to `1. New Account` and adds the `Onboarding Lead` tag.
- **Email sequence** - Sends all four onboarding emails (first outreach, second outreach, last chance, and graduation) and moves the account through the stages. It skips accounts that have an owner, a referral tag, a booked call, or that opted out.
- **Stage reactor** - Keeps the tags, stage dates, and Onboarding specialist in step with the stage. It also moves referral accounts to `Sales Handoff`.
- **Set "Onboarding Initiated" when contacted by OS** - Moves an account from `1. New Account` to `2. Onboarding Initiated` when someone on the team emails it from their own inbox.
- **Automated 'check-in' status removal** - Clears the Check-in status after a specialist emails the account.
- **Check in after the meeting** - Creates a task for the Onboarding specialist 14 days after a meeting.
- **Consider referring to Sales** - Every week, creates a task for high-spend accounts that can be a good fit for Sales.
- **Close out finished sequences** - Every day, moves accounts that finished the sequence from `2. Onboarding Initiated` to `3. Onboarding Completed`.
- **Automated Payment Failed** - Emails accounts in stage 1 or 2 when a payment fails.
- **Gong call summaries to account notes** - Every hour, adds a summary note to the account for each new Gong call.
- **Create customer tasks from scout reports** - Creates a "Review onboarding brief" task for each onboarding research report from the scout.
- **User orders an onboarding consultation from the merch store** - Sets the account to `Purchased Onboarding Call`, emails the buyer the booking link, and tells the team.

#### Other

- [Post-onboarding satisfaction survey trigger](https://posthog.vitally-eu.io/settings/playbooks/5d5c0361-5565-4d5f-89e7-21744378a2fb)

### Tags

We only have one main tag: `Onboarding Lead`.

We also use the `Onboarding Lead 100-500MRR` auxiliary tag to provide us with more information about the account and help us prioritize the work. 

`Onboarding Completed` tag corresponds with `3.Onboarded` trait and it serves as a visual indicator for other teams that the Onboarding has been completed.

### Alerts and revenue tracking

We occasionally shift our attention to help customers who may need more urgent assistance. For these, we have a few types of alerts (tasks) in Customer Analytics, where Magda is a failsafe if the account doesn't have an assigned OS.

-   **Failed payments alert** - This is more of a safety net, as users are informed when it happens. It's a good moment to reach out and offer help in figuring out their volume/billing.
-   **Upcoming large invoice alert** - It lets us prioritize the customer to touch base and make sure the bill doesn't come as a surprise.
-   **Event/Feature Flag/Replay/Error tracking spike indicator for OS** - unusually high usage that may point to a misconfiguration and require our assistance.

### Specific cases

#### How to stop automation

WIP

#### Failed payments

We may get a Failed Payment alert on a customer we still haven't engaged with. In this case, since we're unsure whether the customer is going to stay with us, we don't have to do a deep account analysis. It's enough to remind them to settle the invoice, offer help, and briefly point out obvious spikes and main drivers of the bill. 

It's enough to reach out just once, as the finance team monitors the payments and handles the account deactivation.

When you reach out regarding a failed payment, the account should stay as `New Account` and resurface in the Customer Analytics queue before the next renewal, if the customer settles the payment. When that happens, do our regular outreach with a deep account analysis and enroll them in the program.


