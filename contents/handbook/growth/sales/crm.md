---
title: Managing our CRM
sidebar: Handbook
showTitle: true
---

## Overview

We use [HubSpot](https://www.hubspot.com/) as our customer relationship management ('CRM') platform. If you need access, you can ask Charles or James H and they will send you an invite to create an account. 

As a first step, it is _really important_ that you [connect your personal PostHog Gmail account](https://app.hubspot.com/crm-settings-email/6958578/email/connectedEmails), so that if you start a conversation in HubSpot but continue it in Gmail, we'll have a complete record. This will also make it generally easier for you to sync contacts with HubSpot. 

You might also find it useful to install HubSpot's [Chrome extension](https://chrome.google.com/webstore/detail/hubspot-sales/oiiaigjnkhngdbnoookogelabohpglmd?hl=en), as it means you can manage most things directly in Gmail. 

As a general principle, we try to ensure as much customer communication as possible is captured in HubSpot, rather than in individual email inboxes, so that we make sure our users are getting a great experience (and not confusing or duplicate messages from different team members!). You should use the channel that suits the user, not us. Just make sure you keep HubSpot up to date with your interactions. We've seen much higher response rates on Slack than email. You can copy paste from there into Hubspot until we have a way to integrate the two.

You are most likely to use the following regularly:

- _Contacts_ - pretty straightforward, under 'Contacts'. You can create contacts manually, or sync with your Gmail. 
- _Companies_ - also under 'Contacts'. You will also want to create a company record to associate with any contact (and you can associate multiple contacts with a single company). If you enter the company's domain name, HubSpot is pretty good at pulling in additional data to fill out the record. 
- _Inbox_ - this is under 'Conversations' and is where we deal with messages that come into our public-facing email addresses. New messages will come in as 'Unassigned' and then get assigned to someone.
- _Deals_ - under 'Sales'. This is where we manage our customers who are interested in an Enterprise or Startup plan and is the core of our sales ops process. 
- _Tasks_ - also under 'Sales'. This is a useful place to see a summary of all the tasks that you have created or that have been assigned to you. 

If you'd like to dig deeper, HubSpot have a ton of [documentation](https://knowledge.hubspot.com/) and resources that you can refer to as well.

## Managing our CRM

People currently come into HubSpot through one of 4 ways:
- They email hey@posthog.com or sales@posthog.com
- They sign up to the PostHog app
- They complete [this form](https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u)
- They are manually added to HubSpot by a member of the team, e.g. if you met someone interested in PostHog at an event

### Email

New conversations come into 'Unassigned', whereas ongoing conversations will go straight to your inbox.

We do not have super defined roles here, but generally:
- Charles deals with Scale queries, and oversees general sales ops
- Yakko takes care of Cloud and YC queries
- Paolo focuses on existing customers

However, anyone can and should jump in if they can help or they see someone hasn't been responded to, especially when folks are on holiday!

We have lots of handy templates you can use as well - just select _Templates_ in the email window in Hubspot. If you find yourself sending the same type of email repeatedly, you may want to create your own template - go to 'Conversations' -> 'Templates'.

If an inbound email is about our Scale Paid plan, you should create a Deal - more on this below. _Deals are only used for managing Scale Paid customers - you do not need to create a deal for Cloud or Scale Free customers._

In addition to hey@posthog.com and sales@posthog.com, we sometimes create special one-off email addresses to use for specific groups, such as for an event or promotion. If you create a Google group and you want messages to flow into HubSpot to be managed, make sure you add our [HubSpot inbox email address](mailto:hello-1@posthoginc.hs-inbox.com) to your group as a member.

### New PostHog signups

All new users are automatically added via our Zapier app to the 'New PostHog User' stage of our Scale Paid pipeline. Sorting these ensures that we can keep communication clear with a customer when they have multiple users on the account - it's really annoying for a customer if we are having parallel conversations with different people on their team!

More on how we manage these users in the Deals section below. 

### Manually adding new users

You can also just manually add a user to HubSpot under 'Contacts'. When creating a new contact, try to add as much useful information as possible, especially about the type of company they work for and what their needs are. This enables us to provide them with the best possible experience. 

## Deals

We currently maintain a single pipeline, for current and potential Scale Paid customers.

Making sure you have a Company with a Contact should be the _first_ thing you do when you are setting up a deal in HubSpot. It's then really easy to add a Deal from within a Company record in the right hand pane.

Creating a new Deal is quite intuitive, but here are a few tips:
- Generally, try to fill out as much information as possible - this is useful for you, but also gives context to other people working with a customer.
- Every Deal needs an owner - this is the customer's main point of contact at PostHog.
- Tag every deal by 'Deal Type' - use your judgement to determine which category makes sense.
- Put the deal in the right _Deal Stage_ - again, use your judgement! 

You can also easily add a customer to a deal directly from the Inbox as well - just select 'Create a Deal' in the right hand pane when you have their message selected. 

### Managing the pipeline

We don't have a super detailed process on this yet. That being said, here are a few things to bear in mind:
- Use private notes to tag relevant people for their attention, ask questions etc. Do this in HubSpot (not Slack) so everyone can stay on the same page. If you need to tag someone who doesn't have a HubSpot account, as Charles to add them. **You have to tag someone every time if you want them to get a notification** - even if they created the note, HubSpot will not notify them automatically for some reason. 
- Be clear, direct and open - see other Deals for examples on tone. We are very opposed to the use of any kind of corporate language.  
- Be responsive! 

Within a deal, you can also set Tasks such as a follow up reminder for yourself. We are working on automating these, but in the meantime you can manually create tasks really easily, e.g. 'Follow up in 3 days'. HubSpot will automatically notify you of your tasks due each day by email.

As a conversation progresses (or not) with a customer, you should move them into the relevant stage as appropriate. 

### Quotes

Our Scale Paid pricing is usage-based, so we don't generate quotes unless we are dealing with a very large company and their internal procurement process requires one. 

We do not offer free trials because they are not necessary - customers can either try out the Cloud version (up to 1m monthly events free) or the free self-hosted version. Similarly, we do not offer discounting because our price per monthly event is discounted massively as we scale and we only charge month to month, with no contracts to lock people in. 

If you do need to generate a manual Quote in HubSpot, go to 'Sales' -> 'Quotes'. 

The process is fairly straightforward. A couple of points to note:

- It is really important that you add our standard payment terms to the quote, so it is clear when the customer should expect to pay.
- You can use 'Snippets' when building a quote to insert frequently used text (like payment terms). 
- Do not use the Stripe billing integration as it is very basic and does not enable you to have different types of line item (e.g. 1 month free trial and then an ongoing monthly subscription). 

### Billing

Once a customer is ready to proceed, you should create a payment link in Stripe and generating a license key for them. See instructions on how to do this on the [Billing](/handbook/growth/sales/billing) page. Paolo takes care of these right now. 

## All done - now what?

This is just the beginning of what will hopefully be an awesome relationship with a new customer!

We are just getting started here, but a few things that you should do:
- Make sure you invite the customer to our PostHog Users Slack!
- If they are a Scale customer, they should also already have a private Slack channel in there with us.
- Set a couple of tasks in HubSpot to check in with them - depending on who they are you may want to check in after 1 week/month/quarter.
