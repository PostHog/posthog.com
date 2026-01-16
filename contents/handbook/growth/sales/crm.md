---
title: Managing our CRM
sidebar: Handbook
showTitle: true
---

## Overview

We use [Salesforce](https://posthog.lightning.force.com/lightning/page/home) as our customer relationship management ('CRM') platform. If you need access, you can ask <TeamMember name="Mine Kansu" photo /> for an invite.

As a first step, make sure you connect your Gmail account under your Salesforce settings. Go to Settings → Connected Accounts → Gmail and connect it. This ensures all your customer emails sync automatically with Salesforce. 
Next, make sure your Gmail account is connected in <PrivateLink url="https://posthog.vitally-eu.io/settings/profile/gmail">Vitally</PrivateLink>. This is essential so that we capture the full customer context and avoid duplicate or conflicting outreach.

As a general principle, we try to make sure as much customer communication as possible is captured in Salesforce rather than in individual email inboxes so that we make sure our users are getting a great experience (and not confusing or duplicate messages from different team members!). You should use the channel that suits the user, not us. Just make sure you keep Salesforce up to date with your interactions. We’ve found Slack messages usually get better response rates than email.

For existing customers, you'll sometimes send emails directly from <PrivateLink url="https://posthog.vitally-eu.io/">Vitally</PrivateLink>. To ensure these also make it to Salesforce, first look up your _Email to Salesforce Address_ from the [personal settings page](https://posthog.lightning.force.com/lightning/settings/personal/EmailToSalesforceUserSetup/home) in Salesforce, and then add it to your <PrivateLink url="https://posthog.vitally-eu.io/settings/profile/gmail">Vitally gmail settings</PrivateLink>.

All Slack messages sync up with the corresponding account in Salesforce. We use [Pylon](https://app.usepylon.com) for this sync, so make sure Pylon is added to the customer Slack channel integrations and the channel is [linked to the Salesforce account](https://app.usepylon.com/integrations/salesforce?tab=account-mapping) properly for the sync to work smoothly.

You are most likely to use the following regularly:

-   _Tasks_ A task represents a potential sales follow up or engagement. Every new inbound inquiry (via form or email) is now created as a task on an account and contact.
-   _Opportunities_ - An opportunity is a qualified lead that has been assessed and is considered a potential sales deal (with an estimated revenue and an expected close date). This is where we manage our customers through their buying cycle.
-   _Contacts_ - Contacts are individuals who use PostHog or contacts we interact with. You can create contacts manually or convert a Lead to a Contact after evaluating the lead and deciding to continue working with them.
-   _Accounts_ - You will also create an account record to associate with any contact. You can associate multiple contacts with a single account. If you enter the company's domain name, we have data enrichment in place to pull in additional data on the organization.

Salesforce offers a ton of [resources](https://trailhead.Salesforce.com) if you want to dig deeper.

## Managing our CRM

People currently come into Salesforce through one of the following ways:

-   Email inquiries: messages sent to sales@posthog.com
-   Website forms: when they complete a contact or demo request form on our website
-   Product sign ups: All signups are saved as a contact record in Salesforce
-   Manual Entry: When a team member manually adds a contact, such as meeting someone interested in PostHog at an event

### New PostHog signups

When a `user signed up` (Cloud signup) event is ingested into PostHog
we use the [Salesforce App](https://github.com/PostHog/Salesforce-plugin) to sync contact data into Salesforce. We also populate
the following Salesforce properties if they are set in the PostHog event:

-   selected_deployment_type - usually `cloud` or `hosted_clickhouse`
-   product_signup_ts - the time they signed up/purchased a license
-   is_organization_first_user - whether they have created a new organization or joined an existing one
-   role_at_organization - the role they self-selected when signing up (used in Lead scoring)

### Completed contact form

We have a [contact us form](/talk-to-a-human) on posthog.com where we ask users can get in touch with us. The sales@ alias gets an email notification and a notification is also sent to [#sales-leads](https://posthog.slack.com/archives/C054BJSHG82) in Slack when one of these forms is submitted.

These submissions are processed through the Default app and routed into Salesforce as tasks. Tasks are then automatically assigned to the right team member based on account ownership and territory (see below).

If the submission is clearly a support or billing request, you don’t need to reach out manually:
- Select the Disqualification reason “Billing Support Request” or “Support Request.”
- This automatically creates a Zendesk ticket for the correct team.
- No manual outreach is needed, automation handles it.

### Zendesk Integration

If you add "sf-lead" tag to a ticket in Zendesk, a new lead will be automatically created in Salesforce. This helps streamline the process of converting support questions or tickets into potential sales opportunities directly from Zendesk.

If you see "Zendesk" as the lead source, please review the ticket under the Zendesk widget in Salesforce which allows you to view the full context within salesforce. It will also appear in sales_form_message field for quick review of last request before the Zendesk ticket is converted to a lead.

### Forwarding sales opportunities

If you are not in the sales team but are engaged with a client and identify a sales opportunity, forward the email chain to sales@posthog.com. A new lead will be automatically created in salesforce and assigned to the appropriate AE based on existing criteria. This way we can smoothly hand off potential opportunities and track things properly!

**Important:** The email must be forwarded (not replied to), and sales@posthog.com must be in the "To:" field—not CC or BCC—for the automation to work correctly.

## Task assignment logic

When a new task is created, we first check whether the associated account already has an owner:

- If the account has an owner, task is automatically assigned to that person.
- If the account is unowned, account and task are assigned to a salesperson via round robin within their territory.

This ensures we avoid double assignments and maintain clear ownership.

Territories
- U.S. West
- U.S. East
- Europe & Africa
- Asia & Middle East
- Australia & New Zealand (ANZ)

Each territory runs its own round robin assignment for new, unowned accounts.

### Converting tasks to opportunities

If a task represents a qualified opportunity:
- Open the task and check the box labeled “Create new opportunity.”
- Choose the appropriate Opportunity record type:
    - New Revenue for brand-new customers.
    - New Revenue – Existing Customer for upsells, cross-sells, or expansions.
    - Existing – Convert to Annual for pay as you go customers moving to an annual plan.
    - Renewal for existing annual customers renewing their plan.
- This automatically creates and links the opportunity to the task.
- You can then click the opportunity link to add deal details (value, close date, etc.)

Use the following criteria (loosely based on traditional BANT qualification) to determine when a task should be converted to an opportunity:

- You've had at least one call with the customer to establish a relationship.
- There's a clearly identified problem that PostHog can solve.
- They have acknowledged that the problem is important enough to work on solving now.
- You've had a rough pricing discussion, and confirmed that their budget is in the same ballpark.
- The person you're in touch with is the decision maker, or has committed to introducing you to the decision maker.
- You have an agreed next step which moves things forwards such as:
  -   Signing up for a PostHog organization
  -   Implementing PostHog
  -   Getting an MNDA in place
  -   Accepting a Slack Connect invite and asking questions in a Slack channel
  -   Accepting a call invite with their boss/buying committee

All of the above criteria should be met before creating an opportunity.  By doing so you drastically increase the odds of bringing them onboard as a successful customer.

If you aren't able to confidently say that you have covered the above, you should keep them as a Lead in the Nurturing stage.

### Manual entry

If you meet a potential customer elsewhere (e.g., events, introductions, referrals):
- Create the Account and Contact manually.
- Assign the correct Lead Source from drop down.
- Create a Lead Task for any action item or sales follow up.
 
### Support requests

If you receive a lead for a self serve customer who has used the Sales Contact Form to submit a support request, you should:

-   Set the 'Disqualification reason' to 'Support Request'
-   Update the lead status to 'Unqualified'

This will [automatically create a ticket](https://zapier.com/editor/274433115/published) in Zendesk for the Brand team to review and address. You will be CC'd on the ticket and the ticket link will be added to the Lead's 'Next Steps' field in Salesforce.

### Below Sales Assist Threshold

If you determine a lead is not a fit for hands on sales engagement, you can mark the task as **Below Sales Assist Threshold - Auto Emails**.

When you do this, it triggers an automated onboarding flow in <PrivateLink url="https://fly.customer.io/workspaces/127208/journeys/campaigns/109/overview">customer.io</PrivateLink>. These emails help guide them through a self-serve onboarding path without requiring manual outreach.

### Spam

These mostly come into the sales inbox rather than the contact form. Whilst there is a `Spam` disqualification reason in Salesforce we can also prevent users from emailing the group again by banning them in the [Sales Google Group](https://groups.google.com/a/posthog.com/g/sales/banned-users). If you do ban someone bear in mind they won't be able to email our sales email until the ban is lifted so only use this for genuine spam (e.g. people trying to sell us competitor user lists).

### Lead qualification criteria

-   Do they match our ideal customer profile?
-   Do they have a need that PostHog can help with?
-   Have they shown interest in our product/service?
-   Are they looking to make a purchasing decision within a reasonable timeframe?

### Best practices

-   Make sure all new leads are contacted within 24 hours.
-   Keep all lead information up-to-date and accurate in Salesforce.
-   Periodically review lead statuses and update them as needed.

## Handling time off (PTO)

By default, when you are out leads will still be routed to you, and as we have no expectation of you being available whilst on PTO leads may be missed and not followed up on.  To mitigate this we need to temporarily remove you from lead round robin:

- If you are out for 1 consecutive day or less:
  - Ensure your calendar is up to date with your time off, so that Default doesn't schedule meetings for when you are out.
- If you are out for longer than 1 consecutive day:
  - Ensure your calendar is up to date with your time off, so that Default doesn't schedule meetings for when you are out.
  - Let Mine or Simon know 2 working days before you leave that you are out and need to be taken out of the round robin temporarily
    - Mine or Simon will then set you to inactive on the <PrivateLink url='https://posthog.lightning.force.com/lightning/o/Lead_Assignment_Tracker__c/list?filterName=All'>Leads assignment tracker</PrivateLink> in Salesforce.
    - They will also set a reminder to re-add you the day before you are back.

## Opportunities

Opportunities track potential deals in Salesforce. Managing opportunities effectively is important for tracking progress, forecasting revenue, and ensuring accurate reporting. In our sales process, for each lead conversion we create an Opportunity. Correctly identifying the appropriate opportunity record type is important to optimize our processes.

### Opportunity record types

New Revenue: Select this type when engaging with a customer who has never paid us before. This includes new customers and startup customers transitioning to a paid plan for the first time.

New Revenue – Existing Customer: Choose this type for additional credits to a customer who is already paying us. This includes upsells, cross sells, or expansion within the same account.

Existing - Convert to Annual: Choose this when discussing an annual contract with a pay-as-you-go customer.

Renewal: Choose this type when an existing customer is renewing their contract or subscription for our products or services. We automatically create a renewal opportunity if an 'Annual Plan' type opportunity is Closed (more on these later).

### Opportunity types

Annual Plan: Select this type when the customer agrees to pay for a year-long+ subscription to our services.

Monthly Plan: Choose this type when the customer opts for a month-to-month subscription to our services. Amount field still reflects ARR here.

### How to create an opportunity

#### Convert a task

If you're working a lead and want to create an opportunity from a task, simply check the Create New Opp checkbox and select the appropriate Opportunity Record Type from the dropdown.

This ensures the Lead Source is correctly carried over to the new Opportunity, and the task and opportunity remain linked for full visibility.

#### Creating an opportunity from scratch

You can also create an opportunity directly from scratch, but make sure to connect it to a Contact and an Account so all relevant data is linked properly. To do so:

-   Go to the Opportunities tab by clicking on the App Launcher (the grid icon) and searching for "Opportunities."
-   Click the "New" button and select the correct record type
-   Fill in Opportunity Details:
-   Opportunity Name
-   Close Date: Choose the estimated date when the opportunity is expected to close.
-   Term (Months): Default is 12, update for multi year deals.
-   Total Credit Amount: Total value of the contract before discounts.
-   Discount (%): Percent discount applied to the total.
-   ARR Discounted: Automatically calculated annualized revenue after discount.
-   Contract Start Date: Date the contract begins.
-   Contract End Date: Automatically calculated based on Start Date + Term.
-   Stage: Select the current stage of the opportunity in the sales process.
-   Type: If you know whether they're interested in paying on a monthly or an annual basis (if blank this will be Monthly by default)
-   Connect to an Account: In the "Account Name" field, search for and select the account associated with the opportunity. If the account does not exist, create a new account first.
-   Connect to a Contact: link any specific contact you're in touch with regarding this opportunity by adding them to the "Contact Roles" list.

### Opportunity stages

Stages will differ depending on the chosen Opportunity Record Type. The following stages are for the New and Existing Business Record Types:

1. Problem Agreement - Buyer explicitly acknowledges they have a meaningful problem that can be qualified (e.g. "What happens if you don't solve this problem?")
Exit criteria:
-   **Identified & implicated pain with specific, quantifiable metrics (time/money/risk)**
-   Answer to "What happens if you do nothing?" documented with real consequence
-   Buyer explicitly said "This is a problem we need to solve" (not just "interesting")

2. Solution Agreement - Buyer confirms our solution is best suited to solve their problem. Can be as simple as "We think PostHog will work for us"
Exit criteria:
-   **Active product usage OR completed POC/trial**
-   **Clear, documentable decision made for PostHog (with or without comparing alternatives)**
-   Economic Buyer identified (name + title)
-   Champion identified (name)

3. Priority Agreement - A senior decision-maker acknowledges the problem as a priority and validates our solution.
Exit criteria:
-   **Budget confirmed (amount range OR "yes, funded")**
-   **Decision process mapped (who approves, what steps, timeline)**
-   Economic Buyer said this is a priority (exact quote documented)
-   Champion tested (evidence they're advocating internally)
-   Compelling event known (deadline: budget cycle, launch, renewal, etc.)

4. Commercial Agreement - Mutual agreement is reached on price and all contractual terms.
Exit criteria:
-   **Price agreed in writing (email/quote with amount + terms)**
-   **All commercial terms agreed (payment terms, contract length, prepaid amount)**
-   **Paper process mapped (legal, security, procurement steps + owners + timeline)**

5. Vendor Approval - Buyer completes internal processes (legal, security, procurement) and contract is executed.
Exit criteria:
-   **Contract signed**

6. Closed Won (100%) - They have signed the contract and are officially a PostHog customer.
7. Closed Lost (0%) - At some point in the pipeline they decided not to use us. The Loss Reason field is required for any opportunity to be marked as Closed lost.

Bolded exit criteria indicate the minimum standard for the opportunity to advance stages (for typically smaller, more transational deals). More detail is available on the stages and the exit criteria for each state <PrivateLink url='https://docs.google.com/spreadsheets/d/1BpLMHZ52iE1Ni0-Hf0Y68RSq0ohNNnJv7Jd90lgSI6s/edit?usp=sharing'>in this spreadsheet</PrivateLink>

### Forecast categories

**Commit:** PostHog is integrated and the buyer has stated an intent to purchase within the Close Date quarter.

**Best case:** PostHog is or is being implemented, volume justifies an annual commitment, and the buyer has stated interest in purchasing with the Close Date quarter.

**Pipeline:** Buyer is actively evaluating PostHog or intends to evaluate PostHog within the Close Date quarter and early volume/discussion indicates an annual contract could be justified.

**Omitted:** Not used. You can omit from Forecast by moving the Opportunity to a new quarter or marking it as Closed - Lost.

Forecast categories should be re-evaluated on an ongoing basis. While it is not ideal for Opportunities to move to an earlier category, we should do so if this reflects reality, especially as quarter end approaches. In addition, we should think about what we can do differently in future to make the forecast more accurate.

### Renewal pipeline

When an opportunity with Annual Plan type is Closed Won, a Salesforce [flow](https://posthog.lightning.force.com/builder_platform_interaction/flowBuilder.app?flowId=301Hp0000019zhnIAA) will create an opportunity associated with the contact and account from the original opportunity. The following fields will also be set:

-   **Amount** - Copied over from the original opportunity
-   **ARR up for renewal** - Copied over from the original amount; so that we can track expansion/churn
-   **Close date** - 4 weeks in the future (may need adjusting if the opportunity record isn't closed on the contract start date)

The renewal pipeline stages are:

1. Qualification (10%) - They have just became a PostHog customer and we're helping them getting set up.
2. Meeting booked (20%) - They have reached a steady state where we consider them self-sufficient with PostHog.
3. Product Evaluation (50%) - This step becomes relevant if decision makers have changed in organization or if new teams within the company are considering using us.
4. Commercial & Legal Review (80%) - We are now working with them on contractual items such as custom pricing, MSAs etc.
5. Closed Won (100%) - They have signed the contract.
6. Closed Lost (0%) - At some point in the pipeline they decided not to renew. We should make a note as to the reasons why and optionally set a reminder task to follow up with them if we have improvements that could change their mind on our roadmap.

### Opportunity notes

The "Opportunity Notes" section is to track key actions and next steps to manage an opportunity and avoid missed follow-ups. It has the following fields:

-   Next Steps: Add actions or tasks required to move the opportunity forward. Be clear and concise to ensure anyone reviewing the opportunity understands what needs to happen next.
  -   For the New Business Sales Team, the Next Step should have three specific elements:  1) a timestamp  -- when was this change made, 2) the owner at the customer for the next step -- who do we expect to take the action? 3) a binary outcome - (what will we/you get) related to the stage, with the next step date reflecting when the outcome is expected.
-   Next Step Date: Enter the date by which the next step should be completed. This helps in maintaining timelines and keeping follow-ups on track.

### Opportunity closure details

This section is to add additional information for opportunities that are won or lost to capture context and details to setup customer account correctly:

-   Loss Reason: A required field for any opportunity marked as "Closed - Lost." Pick the most appropriate option from the dropdown to help identify patterns.
-   Additional Loss Context: Optional field to add further insights into the loss. It's great to include specific customer feedback if available.
-   Contract Start Date: Especially important for correct account setup and tracking renewals. This date must match the start date of the customer’s current billing period for which they intend to apply credits. Setting this correctly ensures that any purchased or applied credits can be used immediately for the intended billing cycle.
    - Example: if a customer’s billing period runs from September 21 to October 21, and they purchase credits on October 15, the contract start date must be September 21 for credits to be applied to their current billing period. If instead the start date is set to a later date, credits would only apply to the next billing period, meaning the customer won't be able to use them right away. [see more info on under contracts](https://posthog.com/handbook/growth/sales/contracts)
-   Products: Select the products discussed/planned to be used as part of the opportunity. Make sure to include all addons so RevOps can ensure the customer’s subscription is set up correctly.
-   Contract Link: Link to the contract in PandaDoc for easy access and reference.

### Self-serve opportunities

If you feel like a customer doesn't fit a hands-on flow, then you mark the lead or opportunity as self serve. There are two ways to do this:

#### 1. Self serve - no interaction

Use this checkbox when you decide to move a new lead to the automated self serve flow without any personal interaction or discussion. You can use this checkbox when a lead does not meet the necessary qualifications for direct engagement and the automated self serve emails would be sufficient for successful onboarding.

How to use:

-   Go to the lead record in Salesforce.
-   Click the checkbox labeled "Self Serve - No Interaction" under the Lead Details section.
-   Once marked, the automated self serve email flow will be triggered, no need to do anything else.

#### 2. Self serve - post-engagement

Use this checkbox if you have engaged with the lead in some form, such as a demo or discussion, but you believe they can proceed without further involvement.

How to use:

-   Go to the opportunity record in Salesforce.
-   Click the checkbox labeled "Self Serve - Post Engagement" under the Opportunity Information section.

Important notes:

-   There are no automated email flows attached to this checkbox. Once you have spoken with a customer at least once, all future communications should come directly from you.
-   Separately, these customers will still receive the standard onboarding emails from the app regardless of their self serve status in salesforce.

#### Points to consider when marking leads as self serve:

-   Usage Volume: If their usage volume is around 5 million monthly events and 100,000 recordings, they should be hands-on.
-   Annual Commitment: If they want an annual commitment, keep them in the hands-on pipeline.
-   Guided Evaluation Help: If they need help with a guided evaluation and their potential value is high enough, create a Slack Connect channel to assist them during the evaluation and keep them in the hands-on pipeline.
-   None of the Above: If none of the above apply, move them to self-serve.

When moving someone to self-serve we should set them up for success by using the [Post Demo route to self-serve](https://posthog.lightning.force.com/lightning/r/EmailTemplate/00XHp000001vNpqMAE/view). This encourages them to sign up to PostHog Cloud and provides some helpful getting started pointers. If there were any follow-up questions from initial meeting we should answer those in this email as well.

> If you move an opportunity to self-serve then it won't be included in your quota retirement/commission calculation (as you aren't working on it).

## All done - now what?

This is just the beginning of what will hopefully be an awesome relationship with a new customer!

We are just getting started here, but a few things that you should do:

-   If they are a large/target customer, they should already have a Slack Connect channel in our company workspace.
-   Check in with them regularly and ensure they aren't blocked by support/other issues
