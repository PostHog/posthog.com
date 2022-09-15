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

People currently come into HubSpot through one of 5 ways:
- They email hey@posthog.com or sales@posthog.com
- They sign up to the PostHog app
- They complete a sign-up/query form in HubSpot
- They sign up to our User Slack
- They are manually added to HubSpot by a member of the team, e.g. if you met someone interested in PostHog at an event

### Email

Emails which come in to hey@ or support@posthog.com will also create tickets in Zendesk.  Whilst many of these are 
technical in nature and usually best looked after by the [support hero](/handbook/engineering/support-hero), we should respond to the non-technical sales/account management
queries in Zendesk directly.

Emails which come into sales@ do not automatically get copied to Zendesk, and we respond to these by replying with the sales@ 
alias in BCC to ensure that everyone else on the team knows that you're handling the query.  

If you've turned on the HubSpot Chrome Extension you can see the person's HubSpot profile directly within Gmail which should give you their 
auto-computed ICP score (more on this below) so this will help you decide on the correct approach (hands-on/self-serve).

We have lots of handy templates you can use as well - just select _Template_ in the email window in Hubspot. If you find yourself sending the same type of email repeatedly, you may want to create your own template - go to 'Conversations' -> 'Templates'.

In addition to hey@posthog.com and sales@posthog.com, we sometimes create special one-off email addresses to use for specific groups, such as for an event or promotion. If you create a Google group and you want messages to flow into HubSpot to be managed, make sure you add our [HubSpot inbox email address](mailto:hello-1@posthoginc.hs-inbox.com) to your group as a member.

### New PostHog signups

When a `user signed up` (Cloud signup) or `license purchased` (Self-host license purchase) event is ingested into PostHog 
we use the [HubSpot App](https://posthog.com/apps/hubspot-connector) to sync contact data into HubSpot.  We also populate
the following HubSpot properties if they are set in the PostHog event:
- selected_deployment_type - usually `cloud` or `hosted_clickhouse`
- product_signup_ts - the time they signed up/purchased a license
- is_organization_first_user - whether they have created a new organization or joined an existing one

This [HubSpot view](https://app.hubspot.com/contacts/6958578/objects/0-1/views/7112066/list) shows contacts who have been created this way, and have an ICP score above 3 - review this at least once
a day and reach out to the people who've not been contacted yet.  We also have a similar view for [lower ICP scores](https://app.hubspot.com/contacts/6958578/objects/0-1/views/9214739/list).

### Completed HubSpot forms

There are a few places on posthog.com where we ask users to complete a form to get in touch with us:

- [B2C](/signup/b2c) - linked from the pricing page, capturing B2C customers looking for a volume discount
- [Enterprise](/signup/cloud/enterprise) - linked from the signup page, capturing customers wanting Enterprise features on Cloud
- [EU Cloud](/signup/eu-cloud) - linked from GDPR blog posts, capturing customers looking to use our upcoming EU Cloud

The sales@ alias gets an email notification when one of these forms is submitted - respond to them in the same way as the email section above.

### New Slack signups

When a user signs up to Slack, we use Zapier to automatically create a contact in HubSpot.  This [view](https://app.hubspot.com/contacts/6958578/objects/0-1/views/9214867/list) shows you contacts who have been created this way along with their ICP score.  Check for any existing HubSpot activity on their contact/company record and reach out on Slack to say Hi if we don't have anything going with them already. 

### Manually adding new users

You can also just manually add a user to HubSpot under 'Contacts'. When creating a new contact, try to add as much useful information as possible, especially about the type of company they work for and what their needs are. This enables us to provide them with the best possible experience. 

## How we calculate Ideal Customer Profile (ICP)

ICP scoring helps us to focus our efforts on those customers who are likely to help us hit our growth targets quickly.
We use [Clearbit](https://clearbit.com/) to enhance our contact information as they are created and then compute a score out of 5 based on the following parameters:

- *Industry* - customers in certain industries have stricter privacy requirements which mean a privacy-focused solution like PostHog is ideal for them.  We give the highest score to the following industries:
  - Financial Services
  - Health Care
  - Biotechnology
  - Health Care Services
  - Legal Services
  - Health & Wellness
  
  Whilst we score them slightly lower, we also focus on customers from:
  - Internet Software & Services
  - Consulting
  - Computer Networking
- *Employee count* - we use this as a strong indicator for product market fit.  Smaller companies are less likely to have achieved this so our highest score here goes to companies in the 100-1000 employee range.  We score companies over 1000 employees slightly lower as they will generally be slower to deal with.
- *Ability to pay* - indicates whether a company is likely to pay for a product like PostHog to solve their problems.  This is computed from a combination of company revenue and/or the amount of money they have raised.  If their revenue is over $10m, or they have raised over $20m they get the highest score.
- *Role* - from experience we sell best to people in an engineering role and score those the highest.  We also do well with leadership and product folks, so they have a favourable score.
- *B2B/B2C* - our event-based pricing works best for business-to-business companies where the value per event is higher.

## Deals

We currently maintain a two pipelines, for self-serve and hands-on customers.

### Self-serve pipeline

For all new sign-ups (Cloud and Self-host) we will create a deal automatically; this lets us track customers as they
go through the lifecycle of signing up, ingesting events, using our features and eventually paying their first subscription invoice.

### Hands-on pipeline

This is for companies who are following a more traditional buying cycle, and will generally end up being larger revenue-wise.  They also:
- May wish to contract and pay annually rather than monthly (the default)
- May want to not be billed based on usage, but pay a fixed amount monthly/annually
- May be looking for higher volume discounts as they are B2C
- May need to do a custom MSA, DPA or BAA with us
- Can deploy on either Cloud or Self-hosted

Making sure you have a Company with a Contact should be the _first_ thing you do when you are setting up a deal in HubSpot. It's then really easy to add a Deal from within a Company record in the right hand pane.

Creating a new Deal is quite intuitive, but here are a few tips:
- Generally, try to fill out as much information as possible - this is useful for you, but also gives context to other people working with a customer.
- Every Deal needs an owner - this is the customer's main point of contact at PostHog.
- Put the deal in the right _Deal Stage_ - again, use your judgement! 
- Associating the deal with a contact will track any email correspondence against the deal - useful for others to see context.
- Use private notes to tag relevant people for their attention, ask questions etc. Do this in HubSpot (not Slack) so everyone can stay on the same page. If you need to tag someone who doesn't have a HubSpot account, as Charles to add them. **You have to tag someone every time if you want them to get a notification** - even if they created the note, HubSpot will not notify them automatically for some reason. 

Also make sure deals have an amount - this isn't a hard commitment but a ballpark figure we calculate based on the customer's event volume and situation.  The amount will automatically be populated if we generate a quote (see below).

### Quotes

Our pricing is usage-based, so we don't generate quotes unless we are dealing with a very large company and their internal procurement process requires one. 

We do not offer free trials because they are not necessary - customers can either try out the Cloud version (up to 1m monthly events free) or the free self-hosted version.

If you do need to generate a manual Quote in HubSpot, go to 'Sales' -> 'Quotes'.

The process is fairly straightforward. A couple of points to note:

- It is really important that you add our standard payment terms to the quote, so it is clear when the customer should expect to pay.
- You can use 'Snippets' when building a quote to insert frequently used text (like payment terms). 
- Ensure you select the correct term (Annually/Monthly)
- Do not use the Stripe billing integration as it is very basic and does not enable you to have different types of line item (e.g. 1 month free trial and then an ongoing monthly subscription). 

### Billing

Once a customer is ready to proceed, you should create a payment link in Stripe and generate a license key for them. See instructions on how to do this on the [Billing](/handbook/growth/sales/billing) page. 

## All done - now what?

This is just the beginning of what will hopefully be an awesome relationship with a new customer!

We are just getting started here, but a few things that you should do:
- Make sure you invite the customer to our PostHog Users Slack!
- If they are a large/target customer, they should also already have a Slack Connect channel in our company workspace.
- Check in with them regularly and ensure they aren't blocked by support/other issues
