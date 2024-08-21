---
title: Managing our CRM
sidebar: Handbook
showTitle: true
---

## Overview

We use [Salesforce](https://posthog.lightning.force.com/lightning/page/home) as our customer relationship management ('CRM') platform. If you need access, you can ask Mine for an invite. 

As a first step, you might find it useful to install Salesforce's [Chrome extension](https://chromewebstore.google.com/detail/Salesforce/jjghhkepijgakdammjldcbnjehfkfmha?hl=en-US), as it means you can manage most things directly in Gmail. 

As a general principle, we try to ensure as much customer communication as possible is captured in Salesforce, rather than in individual email inboxes, so that we make sure our users are getting a great experience (and not confusing or duplicate messages from different team members!). You should use the channel that suits the user, not us. Just make sure you keep Salesforce up to date with your interactions. We've seen much higher response rates on Slack than email. 

All Slack messages sync up with the corresponding account in Salesforce. We use [Pylon](https://app.usepylon.com) for this sync, so make sure Pylon is added to the customer Slack channel integrations and the channel is [linked to the Salesforce account](https://app.usepylon.com/integrations/salesforce?tab=account-mapping) properly for the sync to work smoothly.

You are most likely to use the following regularly:
- _Leads_ - A lead is a potential customer who has shown interest but hasn't yet been qualified. We create leads for every new user emailing sales@posthog.com or filling out contact sales form on our website. You can also create them manually if you are introduced through other sources (e.g. events, referrals). 
- _Opportunities_ - An opportunity is a qualified lead that has been assessed and is considered a potential sales deal (with an estimated revenue and an expected close date). This is where we manage our customers through their buying cycle. 
- _Contacts_ - Contacts are individuals who use PostHog or contacts we interact with. You can create contacts manually or convert a Lead to a Contact after evaluating the lead and deciding to continue working with them.
- _Accounts_ - You will also create an account record to associate with any contact. You can associate multiple contacts with a single account. If you enter the company's domain name, we have data enrichment in place to pull in additional data on the organization. 

Salesforce offers a ton of [resources](https://trailhead.Salesforce.com) if you want to dig deeper.

## Managing our CRM

People currently come into Salesforce through one of the following ways:
- They email sales@posthog.com
- They fill in a contact/demo request form through the website
- They are manually added to Salesforce by a member of the team, e.g. if you met someone interested in PostHog at an event

### Email

We respond to emails which come into sales@posthog.com by replying with sales@ in BCC to ensure that everyone else on the team knows that you're handling the query. 

If you've turned on the Salesforce Chrome Extension you can see the person's Salesforce profile directly within Gmail which should give you their auto-computed ICP score (more on this below) so this will help you decide on the correct approach (hands-on/self-serve).

We have lots of handy templates you can use as well - just select _Template_ in the email window in Salesforce. If you find yourself sending the same type of email repeatedly, you may want to create your own template - go to 'App Launcher' (the grid icon) > 'Email Templates' > 'New Email Template'.

### New PostHog signups

When a `user signed up` (Cloud signup) or `license purchased` (Self-host license purchase) event is ingested into PostHog 
we use the [Salesforce App](https://github.com/PostHog/Salesforce-plugin) to sync contact data into Salesforce. We also populate
the following Salesforce properties if they are set in the PostHog event:
- selected_deployment_type - usually `cloud` or `hosted_clickhouse`
- product_signup_ts - the time they signed up/purchased a license
- is_organization_first_user - whether they have created a new organization or joined an existing one
- role_at_organization - the role they self-selected when signing up (used in ICP scoring)

### Completed contact form

We have a [contact us form](/talk-to-a-human) on posthog.com where we ask users can get in touch with us. The sales@ alias gets an email notification and a notification is also sent to [#website-contact-sales](https://posthog.slack.com/archives/C054BJSHG82) in Slack when one of these forms is submitted - respond to them in the same way as the email section above.

> If you receive a lead where someone completes the contact form but it is clearly just a regular support request, you should add :ticket: to the relevant thread in the `#website-contact-sales` channel in Slack and mark it as "Unqualified" in Salesforce.

### Manually adding new records

You can also just manually add a user or an organization to Salesforce if they come through different channels. When creating a new contact, try to add as much useful information as possible, especially about the type of company they work for and what their needs are. This enables us to provide them with the best possible experience. 

Our preferred way to keep track of outreach is by creating Salesforce Leads, Contacts, and Opportunities, depending on the stage of the relationship:

- Leads: If a contact is in the initial evaluation stage, it should be entered as a Lead. This allows us to track and manage potential clients who are not yet qualified or who are still in the early stages of engagement. This is typically how we add potential customers who do not use PostHog yet.
- Opportunities: If you identify potential for growth with an existing user, such as expansion or commitment to an annual plan, you can create an Opportunity directly. This is appropriate for contacts or customers where you've already completed the lead assessment (more on that below).


## How we do lead assessment
Any user who submits a “contact sales” form on our website shows up as a lead in Salesforce and gets assigned to an Account Executive (AE). This is how we do lead assignment within our sales team:
- Based on Territory: Leads are assigned based on their geographical location.
  - Territory 1: Users based in the US, Canada, Central and Latin America are assigned to this territory.
  - Territory 2: Users based in Europe, the Middle East, Australia, and Africa are assigned to this territory.
  - Territory 3: All other geographies, or if the country information is missing, assigned to this territory.

- Round Robin Within Territory: Leads are assigned in a round-robin fashion to the AEs who own that territory, ensuring equal distribution among them.

### How we process leads in our pipeline
We have the following lead statuses to manage the lead assessment process before we decide if a user is a right fit to use PostHog.

New: A lead that has just been entered into Salesforce and has not yet been contacted.

- Review lead details and ensure all necessary information is captured.
- Perform an initial qualification check based on lead information.

Working: A lead that you are actively engaging with.
- Reach out to the lead via email, schedule a meeting if they’re interested.
- Gather additional information to further qualify the lead.
- Update lead details with any new information obtained.
- Assess lead needs and match with PostHog solutions.

Nurturing: A lead that requires further development before they are ready to make a purchasing decision (e.g. if they said let’s chat again in 3 months).
- Schedule follow-up activities (e.g., calls, emails, meetings).
- Provide valuable content (e.g., feature updates, product launches, blogs) to build the relationship.
- Monitor engagement with the content and interactions.

Converted: A lead that has been qualified and is ready to become an opportunity.
- Convert the lead to an account, contact, and opportunity in Salesforce.
- Ensure all relevant information is transferred accurately and opportunity type is selected properly (more on that below).

Unqualified: A lead that does not meet the criteria to become an opportunity.
- Document the reasons for disqualification in the “Disqualification reason” field in Salesforce (e.g., budget constraints, lack of fit).
- Update the lead status to 'Unqualified'.

### Lead Qualification Criteria
- Do they match our ideal customer profile?
- Do they have a need that PostHog can help with?
- Have they shown interest in our product/service?
- Are they looking to make a purchasing decision within a reasonable timeframe?

### Best Practices
- Make sure all new leads are contacted within 24 hours.
- Keep all lead information up-to-date and accurate in Salesforce.
- Periodically review lead statuses and update them as needed.

## Opportunities

Opportunities track potential deals in Salesforce. Managing opportunities effectively is important for tracking progress, forecasting revenue, and ensuring accurate reporting. In our sales process, for each lead conversion we create a Contact, an Account, and an Opportunity. Correctly identifying the appropriate opportunity record type is important to optimize our processes.

### Opportunity Record Types

New Business: Select this type when engaging with a new customer for the first time or when selling a product/service to an existing customer for the first time.

Existing Business (Expansion Opportunity): Choose this type when selling additional products or services to a customer with whom we already have a business relationship.

Existing - Convert to Annual: Choose this when discussing an annual contract with a pay-as-you-go customer.

Self Serve: Represents opportunities where the customer does not fit our hands-on Ideal Customer Profile (ICP) and is better suited for a self-service approach. Select this type when the customer is likely to benefit more from our self-serve offerings rather than direct sales engagement. This will move these opportunities to the self-serve pipeline.

Renewal: Choose this type when an existing customer is renewing their contract or subscription for our products or services. We automatically create a renewal opportunity if an 'Annual Plan' opportunity is Closed (more on these later).

### Opportunity Types
Annual Plan: Select this type when the customer agrees to pay for a year-long+ subscription to our services.

Monthly Plan: Choose this type when the customer opts for a month-to-month subscription to our services.

### How to Create an Opportunity

#### Convert a Lead
When converting a lead, Salesforce will prompt you to create a Contact, an Account, and an Opportunity. Under Opportunity:
- Select New Opportunity
- Choose the correct Opportunity Record Type from the dropdown menu
- Complete Opportunity Details: Ensure all mandatory fields are completed, including Name, Type, Close Date, and Amount.

#### Creating an Opportunity from Scratch
You can also create an opportunity directly from scratch, but make sure to connect it to a Contact and an Account so all relevant data is linked properly. To do so:
- Go to the Opportunities tab by clicking on the App Launcher (the grid icon) and searching for "Opportunities."
- Click the "New" button and select the correct record type
- Fill in Opportunity Details:
 - Opportunity Name
 - Close Date: Choose the estimated date when the opportunity is expected to close.
 - Amount: Enter the potential revenue amount for the opportunity (if blank this will be $20,000 by default). This should be the amount before any discounts are applied.
 - Stage: Select the current stage of the opportunity in the sales process.
 - Type: If you know whether they're interested in paying on a monthly or an annual basis (if blank this will be Monthly by default)
 - Connect to an Account: In the "Account Name" field, search for and select the account associated with the opportunity. If the account does not exist, create a new account first.
 - Connect to a Contact: link any specific contact you're in touch with regarding this opportunity by adding them to the "Contact Roles" list.

### Opportunity Stages
Stages will differ depending on the chosen Opportunity Record Type. The following stages are for the New and Existing Business Record Types:
1. Inbound Lead (10%) - Customer has submitted a contact us form/demo request
2. Meeting Booked (20%) - Customer has booked a demo or other meeting with us
3. Demo Completed (40%) - The first demo meeting has happened. At this point we should decide whether to manage them through the hands-on or self-serve pipeline and switch accordingly.
4. Product Evaluation (50%) - We are assisting them in a guided evaluation of PostHog. We should have a Slack Connect channel and a time-boxed trial period agreed with them.
5. Commercial & Legal Review (80%) - They have completed their evaluation and PostHog is the right tool for them. We are now working with them on contractual items such as custom pricing, MSAs etc.
6. Closed Won (100%) - They have signed the contract and are officially a PostHog customer.
7. Closed Lost (0%) - At some point in the pipeline they decided not to use us. The Loss Reason field is required for any opportunity to be marked as Closed lost.

### Self-Serve Opportunity Record Type
If after a demo call you feel like a customer doesn't fit our hands-on ICP, then you should convert the lead to an opportunity and mark the Opportunity Record Type as "Self Serve". This will add the lead to our self-serve pipeline and then automation will take care of the rest. 

Points to consider:
- Usage Volume: If their usage volume is around 5 million monthly events and 100,000 recordings, they should be hands-on.
- Annual Commitment: If they want an annual commitment, keep them in the hands-on pipeline.
- Guided Evaluation Help: If they need help with a guided evaluation and their potential value is high enough, create a Slack Connect channel to assist them during the evaluation and keep them in the hands-on pipeline.
- None of the Above: If none of the above apply, move them to self-serve.

When moving someone to self-serve we should set them up for success by using the [Post Demo route to self-serve](https://posthog.lightning.force.com/lightning/r/EmailTemplate/00XHp000001vNpqMAE/view). This encourages them to sign up to PostHog Cloud and provides some helpful getting started pointers. If there were any follow-up questions from initial meeting we should answer those in this email as well.

### Renewal pipeline
When an opportunity with Annual Plan type is Closed Won, a Salesforce [flow](https://posthog.lightning.force.com/builder_platform_interaction/flowBuilder.app?flowId=301Hp0000019zhnIAA) will create an opportunity associated with the contact and account from the original opportunity. The following fields will also be set:

* **Amount** - Copied over from the original opportunity
* **ARR up for renewal** - Copied over from the original amount; so that we can track expansion/churn
* **Close date** - 4 weeks in the future (may need adjusting if the opportunity record isn't closed on the contract start date)

The renewal pipeline stages are:

1. Qualification (10%) - They have just became a PostHog customer and we're helping them getting set up.
2. Meeting booked (20%) - They have reached a steady state where we consider them self-sufficient with PostHog.
5. Product Evaluation (50%) - This step becomes relevant if decision makers have changed in organization or if new teams within the company are considering using us.
6. Commercial & Legal Review (80%) - We are now working with them on contractual items such as custom pricing, MSAs etc.
7. Closed Won (100%) - They have signed the contract.
8. Closed Lost (0%) - At some point in the pipeline they decided not to renew. We should make a note as to the reasons why and optionally set a reminder task to follow up with them if we have improvements that could change their mind on our roadmap.

## All done - now what?

This is just the beginning of what will hopefully be an awesome relationship with a new customer!

We are just getting started here, but a few things that you should do:
- If they are a large/target customer, they should already have a Slack Connect channel in our company workspace.
- Check in with them regularly and ensure they aren't blocked by support/other issues
