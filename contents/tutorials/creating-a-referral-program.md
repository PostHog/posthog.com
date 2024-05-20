---
title: >-
  How to create a referral program in PostHog
sidebar: Docs
showTitle: true
author:
  - joe-martin
date: 2024-05-20
tags:
  - referrals
  - product os
---

At a hackathon during our 2024 company offsite in Mykonos, we decided to build [the tools you need to create your own referral program](/docs/referrals). We also put them to use ourselves, creating a referral program we affectionately call the PostHog Pyramid Scheme. 

In this tutorial, we'll explain how you can create a similar referral program for your product that rewards users for spreading the word about your product. We'll use the same tools and details from our own referral program, specifically:

- **PostHog** - Used to power the referral program, track fulfillment, and monitor usage
- **Zapier** - Used to generate reward codes and trigger Customer.io emails
- **Shopify** - Not used directly, but powers [the PostHog merch store](/merch)
- **Customer.io** - Used to message referrers and redeemers about successful referrals

## 1. Create a referral program in PostHog

// TO DO
// Explains the step-by-step, captures screenshots of the final product.
// output should be the specific name of the event as `referral redeemed`.  

## 2. Generate Shopify reward codes
Next, we'll create a Zapier function which will link together the next steps in the program. The completed zap will:

1. Listen for a specified referral event from PostHog
2. Create a random reward code, and use it to create a $25 Shopify gift card for the referrer
4. Repeat the previous step to create a random $25 Shopify gift card for the redeemer
5. Send a specified event to Customer.io that triggers reward emails

### Creating a Zapier trigger 
[PostHog's Zapier integration](https://zapier.com/apps/posthog/integrations) features a single 'Action Performed' trigger. It only works for [actions](/docs/data/actions), not [events](/docs/data/events) though, so we'll have to first create an action from the `referral redeemed` event.

To do this, head the Data Management page in PostHog, switch to the Actions page. Select 'New Action', then 'From event or pageview'. In Match Group 1, select `referral redeemed` in the Event name drop down. Name your action `referral redeemed action` and hit save. 

Next, switch to Zapier and create a new zap using the PostHog 'Action Performed' trigger. Specify the correct org and project in PostHog, then specify `referral redeemed action` as the trigger for the rest of the zap. 

Now, whenever PostHog detects the `referral redeemed` event it will also trigger `referral redeemed action`, which Zapier can also detect.

### Create the referrer reward
Create a new step in the zap using the 'Code by Zapier' action and specify the 'Run Python' event. Use the following code to create a randomly generated eight chracter reward code:

```Python
import secrets
import string

code =  "".join(secrets.choice(string.ascii_letters + string.digits) for _ in range(8))
output = [{'code': code}]
```

Next, create a new step in the zap using the 'Webhooks by Zapier' action and the 'Custom Request' event. Specify POST as the step method, the URL as `https://your-development-store.myshopify.com/admin/api/2024-01/gift_cards.json`. 

In the Headers section, specify `application/json` as the Content-Type. You'll also need to add your X-Shopify-Access-Token. Visit [Shopify's API documentation](https://shopify.dev/docs/api/admin-rest/2024-01/resources/gift-card#post-gift-cards) for more information. 

Finally, in the Data field, add the following string and replace `INSERT_HERE` with the `Code` field from the previous step (Step 2) to pull that randomly generated code:

```
{"discount_code":{"code":"INSERT_HERE"}}
```

### Create the redeemer reward
Create a new 'Code by Zapier' action to generate a second random code for your redeemer reward. You can use the same code snippet as before. 

Next, create a second 'Webhooks by Zapier' action and configure it just as you did before for the referrer reward. The only difference is that you need to insert the `Code` field from Step 4 - the step which creates a randomized code for the redeemer (not the referrer).

### Trigger a Customer.io journey
Next, we need to send the reward codes to the relevant users and ensure they both get the same code. At PostHog, we use Customer.io for sending such emails - so the final step in our zap uses [the Customer.io Zapier integration](https://customer.io/docs/journeys/setting-up-and-using-zapier-with-customerio/) and the 'Create Event' action. 

Connect Zapier to the correct Customer.io account, and then configure the action you want to send as follows: 

- **ID:** Insert the `Person Properties Email` field from Step 1 of your Zap (the PostHog action) to specify who the event is sent for. 
- **Event Name:** Give your event a unique name. We'll call ours `pyramid_scheme_fulfillment`
- **Event Data:** Add the following four data fields to your event:
  - A field named `discountreferrer`, using the `Discount Code Code` field from Step 3 of your Zap
  - A field named `discountreferee`, using the `Discount Code Code` field from Step 5 of your Zap
  - A field named `referreremail`, using the `Properties Referrer Email` field from Step 1 of your Zap
  - A field named `refereeemail`, using the `Properties Redeemer Email` field from Step 1 of your Zap

Your completed Customer.io event should look as follow:

![Customer.io referral program](https://res.cloudinary.com/dmukukwp6/image/upload/v1716216219/posthog.com/contents/images/tutorials/referral-program/referral_zap1.png)

Now, when your zap completes it will send an event to Customer.io which contains all of the details you need to correctly inform both users. 

## 3. Send reward codes to the referrer and redeemer
In Customer.io, create a new Campaign for notifying both referrers and redeemers about a successful referral. Set the campaign to trigger whenever a user triggers the `pyramid_scheme_fulfillment` event, with no limits on how many times users can enter the segment.

> Optionally, you can set additional criteria in Customer.io such as a conversion event, or a filter to ensure only valid email addresses are accepted. Find out more about how PostHog uses Customer.io in [our article about creating onboarding email flows](/blog/how-we-built-email-onboarding).

In your campaign workflow, create two separate Email Message events - one for the referrer and one for the redeemer. Fill them with whatever content reflects your brand and will help your users. Here's what our referrer reward email looks like:

![Customer.io referral email](https://res.cloudinary.com/dmukukwp6/image/upload/v1716216218/posthog.com/contents/images/tutorials/referral-program/referral_email.png)

In the referrer email, you must override the default email address which the email is sent to. Replace it with `{{event.referreremail}}` to instead use the `referreremail` property you created in Zapier. Also make sure to include `{{event.discountreferrer}}` in the body of your email, to give users their $25 Shopify gift code.

Follow the same process for your redeemer email, but instead using `{{event.refereeemail}}` as the email address and using `{{event.discountreferee}}` to surface the redeemer's discount code.

With everything finally in place, you can now activate your Customer.io campaign and turn on your Zapier zap!

## 4. Track results in PostHog

// TO DO
// INSERT INFO ON HOW TO TRACK REFERRAL PERFORMANCE
// IF NOTHING ELSE, INCLUDE INFO ABOUT A BASIC INSIGHT TO MAKE