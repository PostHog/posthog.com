---
title: Managing our CRM
sidebar: Handbook
showTitle: true
---

## Overview

We use [HubSpot](https://www.hubspot.com/) as our customer relationship management ('CRM') platform. If you need access, you can ask Cameron or Simon and they will send you an invite to create an account. 

As a first step, it is _really important_ that you [connect your personal PostHog Gmail account](https://app.hubspot.com/crm-settings-email/6958578/email/connectedEmails), so that if you start a conversation in HubSpot but continue it in Gmail, we'll have a complete record. This will also make it generally easier for you to sync contacts with HubSpot. 

You might also find it useful to install HubSpot's [Chrome extension](https://chrome.google.com/webstore/detail/hubspot-sales/oiiaigjnkhngdbnoookogelabohpglmd?hl=en), as it means you can manage most things directly in Gmail. 

As a general principle, we try to ensure as much customer communication as possible is captured in HubSpot, rather than in individual email inboxes, so that we make sure our users are getting a great experience (and not confusing or duplicate messages from different team members!). You should use the channel that suits the user, not us. Just make sure you keep HubSpot up to date with your interactions. We've seen much higher response rates on Slack than email. You can copy paste from there into Hubspot until we have a way to integrate the two.

You are most likely to use the following regularly:

- _Contacts_ - pretty straightforward, under 'Contacts'. You can create contacts manually, or sync with your Gmail. 
- _Companies_ - also under 'Contacts'. You will also want to create a company record to associate with any contact (and you can associate multiple contacts with a single company). If you enter the company's domain name, HubSpot is pretty good at pulling in additional data to fill out the record. 
- _Deals_ - under 'Sales'. This is where we manage our customers through their buying cycle. 
- _Tasks_ - also under 'Sales'. This is a useful place to see a summary of all the tasks that you have created or that have been assigned to you. 

If you'd like to dig deeper, HubSpot have a ton of [documentation](https://knowledge.hubspot.com/) and resources that you can refer to as well.

## Managing our CRM

People currently come into HubSpot through one of the following ways:
- They email sales@posthog.com
- They sign up to the PostHog app
- They fill in a contact/demo request HubSpot form through the website
- They sign up to our User Slack
- They are manually added to HubSpot by a member of the team, e.g. if you met someone interested in PostHog at an event

### Email

We respond to emails which come into sales@posthog.com by replying with sales@ in BCC to ensure that everyone else on the team knows that you're handling the query.  

If you've turned on the HubSpot Chrome Extension you can see the person's HubSpot profile directly within Gmail which should give you their 
auto-computed ICP score (more on this below) so this will help you decide on the correct approach (hands-on/self-serve).

We have lots of handy templates you can use as well - just select _Template_ in the email window in Hubspot. If you find yourself sending the same type of email repeatedly, you may want to create your own template - go to 'Conversations' -> 'Templates'.

In addition to sales@posthog.com, we sometimes create special one-off email addresses to use for specific groups, such as for an event or promotion. If you create a Google group and you want messages to flow into HubSpot to be managed, make sure you add our [HubSpot inbox email address](mailto:hello-1@posthoginc.hs-inbox.com) to your group as a member.

### New PostHog signups

When a `user signed up` (Cloud signup) or `license purchased` (Self-host license purchase) event is ingested into PostHog 
we use the [HubSpot App](/apps/hubspot-connector) to sync contact data into HubSpot.  We also populate
the following HubSpot properties if they are set in the PostHog event:
- selected_deployment_type - usually `cloud` or `hosted_clickhouse`
- product_signup_ts - the time they signed up/purchased a license
- is_organization_first_user - whether they have created a new organization or joined an existing one
- role_at_organization - the role they self-selected when signing up (used in ICP scoring)

This [HubSpot view](https://app.hubspot.com/contacts/6958578/objects/0-1/views/7112066/list) shows contacts who have been created this way, and have an ICP score above 12 - review this at least once
a day and reach out to the people who've not been contacted yet.  We also have a similar view for [lower ICP scores](https://app.hubspot.com/contacts/6958578/objects/0-1/views/9214739/list).

### Completed HubSpot forms

We have a [contact us form](/contact-sales) on posthog.com where we ask users can get in touch with us.  The sales@ alias gets an email notification and a notification is also sent to [#website-contact-sales](https://posthog.slack.com/archives/C054BJSHG82) in Slack when one of these forms is submitted - respond to them in the same way as the email section above.

### New Slack signups

When a user signs up to Slack, we use Zapier to automatically create a contact in HubSpot.  This [view](https://app.hubspot.com/contacts/6958578/objects/0-1/views/11328202) shows you contacts who have been created this way along with their ICP score.  Check for any existing HubSpot activity on their contact/company record and reach out on Slack to say Hi if we don't have anything going with them already. 

### Manually adding new users

You can also just manually add a user to HubSpot under 'Contacts'. When creating a new contact, try to add as much useful information as possible, especially about the type of company they work for and what their needs are. This enables us to provide them with the best possible experience. 

## How we calculate Ideal Customer Profile (ICP)

Aligned with our Strategic [Ideal Customer Profile](/newsletter/ideal-customer-profile-framework), ICP scoring helps us to focus our efforts on those customers who are likely to help us hit our growth targets quickly.
We use [Clearbit](https://clearbit.com/) to enhance our contact information as it is created and then compute a score out of 24 in [HubSpot](https://app.hubspot.com/property-settings/6958578/properties?action=edit&property=hubspotscore&search=hubspot&type=0-1) based on the following parameters:

- *Employee count* - we use this as a strong indicator for product market fit.  Smaller companies are less likely to have achieved this so our highest score here goes to companies in the 15-500 employee range.  We score companies over 500 employees lower as they will generally be slower to deal with.
- *Ability to pay* - indicates whether a company is likely to pay for a product like PostHog to solve their problems.  This is computed from a combination the estimated company revenue. If their revenue is between $1m and $100m they get the highest score (6 points).
- *Role* - from experience we sell best to people in an engineering role (6 points) and score those the highest.  We also do well with leadership (3 points) and product (3 points) folks, so they have a favourable score.
- *Company Type* - private companies are ideal here and get 3 points
- *Founded Year* - here we want to capture scale-ups so give 3 points to companies founded 2017-2021
- *Country* - from experience we know that certain countries have a lower inclination to pay for software so we downweight those.
- *Email provider* - if someone signs up with a non-work email they are less likely to become a high-paying customer so we downweight those.

| Metric         | Value                                                                                                                                                                                                                                                                                                | Score |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------|
| Employee Count | 0-14                                                                                                                                                                                                                                                                                                 | 0     |
|                | 15-500                                                                                                                                                                                                                                                                                               | 6     |
|                | 500-1000                                                                                                                                                                                                                                                                                             | 3     |
|                | 1000+                                                                                                                                                                                                                                                                                                | 0     |
| Ability to pay | Estimated Revenue $1m-$100m                                                                                                                                                                                                                                                                          | 6     |
|                | Estimated Revenue $100m-$1b                                                                                                                                                                                                                                                                          | 3     |
| Role           | engineering                                                                                                                                                                                                                                                                                          | 6     |
|                | leadership                                                                                                                                                                                                                                                                                           | 6     |
|                | product (technical e.g. do they have a Github ID)                                                                                                                                                                                                                                                    | 6     |
|                | product (non-techical)                                                                                                                                                                                                                                                                               | 3     |
|                | marketing                                                                                                                                                                                                                                                                                            | 3     |
| Company type   | private                                                                                                                                                                                                                                                                                              | 3     |
| Founded year   | 2017-2021                                                                                                                                                                                                                                                                                            | 3     |
| Country        | Not in Australia, Austria, Belgium, Brazil, Canada, Denmark, Estonia, Finland, France, Germany, Iceland, Ireland, Israel, Italy, Japan, Latvia, Lithuania, Netherlands, New Zealand, Norway, Portugal, Singapore, South Korea, Spain, Sweden, Switzerland, United Kingdom, United States             | -5    |
| Email provider | Non-work email | -10  |


We also sync the HubSpot score back into PostHog as the `hubspot_score` person property using the [HubSpot App](/apps/hubspot-connector).  Our current dividing line between High and Low ICP score is **12**.

## Deals

Making sure you have a Company with a Contact should be the _first_ thing you do when you are setting up a deal in HubSpot. It's then really easy to add a Deal from within a Company record in the right hand pane.

Creating a new Deal is quite intuitive, but here are a few tips:
- Generally, try to fill out as much information as possible - this is useful for you, but also gives context to other people working with a customer.
- Every Deal needs an owner - this is the customer's main point of contact at PostHog.
- Put the deal in the right _Deal Stage_ - again, use your judgement!
- Associating the deal with a contact will track any email correspondence against the deal - useful for others to see context.
- Use private notes to tag relevant people for their attention, ask questions etc. Do this in HubSpot (not Slack) so everyone can stay on the same page. **You have to tag someone every time if you want them to get a notification** - even if they created the note, HubSpot will not notify them automatically for some reason.

Also, if a customer is signed up/evaluating make sure deals have an amount - this isn't a hard commitment but a ballpark figure we calculate based on the customer's event volume and situation.  The amount will automatically be populated if we generate a quote (see below).

We currently maintain three new business pipelines, for Inbound Hands-on, Inbound Self-serve and Product Qualified Lead (PQL) hands-on customers.  In addition, we have a renewals pipeline to manage the renewals of our annual contracts.

### Inbound Hands-on pipeline

We automatically create a hands-on pipeline deal when a new customer books a demo or 15-minute meeting via Calendly.  After the demo it's up to us to decide whether it's a hands-on or self-serve opportunity and route it accordingly.

Hands-on is for companies who are following a more traditional buying cycle, and will generally end up being larger revenue-wise.  They also:
- May wish to contract and pay annually rather than monthly (the default)
- May want to not be billed based on usage, but pay a fixed amount monthly/annually
- May be looking for higher volume discounts as they are B2C
- May need to do a custom MSA, DPA or BAA with us

The hands-on pipeline stages with associated deal probabilities are as follows:
1. Inbound Lead (10%) - Customer has submitted a contact us form/demo request
2. Meeting Booked (20%) - Customer has booked a demo or other meeting via Calendly with us
3. Demo Completed (40%) - The first demo meeting has happened.  At this point we should decide whether to manage them through the hands-on or self-serve pipeline and switch accordingly.
4. Product Evaluation (60%) - We are assisting them in a guided evaluation of PostHog.  We should have a Slack Connect channel and a time-boxed trial period agreed with them.
5. Commercial & Legal Review (80%) - They have completed their evaluation and PostHog is the right tool for them.  We are now working with them on contractual items such as custom pricing, MSAs etc.
6. Closed won (Won) - They have signed the contract and are officially a PostHog customer.
7. Closed lost (Lost) - At some point in the pipeline they decided not to use us.  We should make a note as to the reasons why and optionally set a reminder task to follow up with them if we have improvements that could change their mind on our roadmap.
8. Closed admin (Lost) - Deal was created in error (e.g. a duplicate) but we still want to keep a record of it.

#### Moving to self-serve pipeline

If after a demo call you feel like a customer doesn't fit our hands-on ICP then you should move them to the self-serve pipeline's Demo Completed stage, and then automation will take care of it.  Points to consider:
* What is their usage volume?  Around 5m monthly events and 100k recordings should be hands-on
* Do they want an annual commitment? If so then we should keep them in the hands-on pipeline
* Will they need help with a guided evaluation? If so and their potential value is high enough then create a Slack Connect channel to assist them during the evaluation and keep them in the hands-on pipeline
* If none of the above apply, move them to self-serve

When moving someone to self-serve we should set them up for success by using the [Post Demo route to self-serve](https://app.hubspot.com/templates/6958578/edit/37311756?q=route%20to&page=1).  This encourages them to sign up to PostHog Cloud and our User Slack and provides some helpful getting started pointers.  If there were any follow-up questions from initial meeting we should answer those in this email as well.

#### Quotes

If you do need to generate a manual Quote in HubSpot, go to 'Sales' -> 'Quotes'.

The process is fairly straightforward. A couple of points to note:

- It is really important that you add our standard payment terms to the quote, so it is clear when the customer should expect to pay.
- You can use 'Snippets' when building a quote to insert frequently used text (like payment terms). 
- Ensure you select the correct term (Annually/Monthly)
- Do not use the Stripe billing integration as it is very basic and does not enable you to have different types of line item (e.g. 1 month free trial and then an ongoing monthly subscription). 


### Inbound Self-serve pipeline

If after a demo or initial conversation we feel a customer doesn't fit our target profile for hands-on then we should move them to the self-serve pipeline.  We have various automations in place to move deals along this pipeline:

1. Inbound Lead (10%) - Customer has submitted a contact us form/demo request
2. Meeting Booked (20%) - Customer has booked a demo or other meeting via Calendly with us
3. Demo Completed (20%) - The first demo meeting has happened.  They will likely have been moved here from the hands-on pipeline and we should have sent them a templated email containing information on how to get started with PostHog.
4. Signed up to PostHog (60%) - Deals will automatically move to this stage if someone from the associated company signs up to PostHog.
5. First invoice paid (90%) - Deals will automatically move to this stage when they pay their first Stripe invoice (above $0).
6. Retained (Won) - They have paid at least 2 consecutive invoices.  We don't have automation in place for this yet so periodically should review the deals in the First invoice paid stage to see if any need to be moved along.
7. Closed lost (Lost) - At some point in the pipeline they decided not to use us.  This is not currently automated but in future we could look at 'aging out' deals so if they've been in the self-serve pipeline for 3 months with no update they would automatically move to the lost stage.
8. Closed admin (Lost) - Deal was created in error (e.g. a duplicate) but we still want to keep a record of it.

Whilst after the demo stage the is largely automated, we can move customers back to the hands-on pipeline if we feel their value criteria has changed.

### PQL Hands-on pipeline

We use Pocus as a Product-led Sales (PLS) tool to give us oversight of new Product Qualified Leads (PQL).  Our criteria for identifying new PQLs is currently:

1. Customers who have not yet set up a billing subscription who are
   * Predicted to send over 7m events
   * Predicted to send over 4m events and 200k recordings
2. Customers who have set up a billing subscription but who haven't paid yet and are
   * Predicted to have a first bill over $1,666
   * Predicted to send over 7 million events

Pocus will also provide indicators to how engaged the users in the organization are with the product, so we can identify Power users and Champions.  Our main aim here is to make contact and ensure they are happy with PostHog, ideally setting up a Slack Connect channel and having an intro call with their team.

We also have a deal pipeline for any high-value PQLs:

1. Product Qualified Lead (20%) - We have identified a PQL using Pocus
2. Contact Made (30%) - We've reached out to them and had a response, and have a meeting booked or Slack connect channel with them.
3. Meeting Completed (50%) - We've had a meeting with them and understand their evaluation criteria / preferred buying process.
4. Product Evaluation (80%) - We are actively supporting them to evaluate and be successful with PostHog.  We may have enabled a trial period so that they don't feel burdened by usage limits.
5. Commercial & Legal Review (90%) - They have completed their evaluation and PostHog is the right tool for them.  We are now working with them on contractual items such as custom pricing, MSAs etc.
6. Closed won (Won) - They have signed the contract or paid 2 consecutive monthly bills and are officially a PostHog customer.
7. Closed lost (Lost) - At some point in the pipeline they decided not to use us.  We should make a note as to the reasons why and optionally set a reminder task to follow up with them if we have improvements that could change their mind on our roadmap.
8. Closed admin (Lost) - Deal was created in error (e.g. a duplicate) but we still want to keep a record of it.

### Renewal pipeline

When a deal in either of the **hands-on** pipelines above is Closed Won, if the `Billing Term` is not monthly, a HubSpot [workflow](https://app.hubspot.com/workflows/6958578/platform/flow/326853180/edit) will create a deal associated with the contact and company from the original deal.  The following fields will also be set:

* **Amount** - Copied over from the original deal
* **ARR up for renewal** - Copied over from the original deal amount; so that we can track expansion/churn
* **Close date** - 365 days in the future (may need adjusting if the deal record isn't closed on the contract start date)

The renewal pipeline stages are:

1. Onboarding (40%) - They have just became a PostHog customer and we're helping them getting set up.
2. Onboarded (50%) - They have reached a steady state where we consider them self-sufficient with PostHog.
3. Churn Risk (20%) - We're concerned that the renewal might not happen.
4. Verbal Confirmation (80%) - We've asked whether they intend to renew and they have said yes.
5. Commercial & Legal Review (90%) - We are now working with them on contractual items such as custom pricing, MSAs etc.
6. Closed won (Won) - They have signed the contract.
7. Closed lost (Lost) - At some point in the pipeline they decided not to renew.  We should make a note as to the reasons why and optionally set a reminder task to follow up with them if we have improvements that could change their mind on our roadmap.

## All done - now what?

This is just the beginning of what will hopefully be an awesome relationship with a new customer!

We are just getting started here, but a few things that you should do:
- Make sure you invite the customer to our PostHog Users Slack!
- Or if they are a large/target customer, they should also already have a Slack Connect channel in our company workspace.
- Check in with them regularly and ensure they aren't blocked by support/other issues