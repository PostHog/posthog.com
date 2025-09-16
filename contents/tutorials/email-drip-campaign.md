---
title: "Set up an Email Drip Campaign"
date: 2025-09-15
author:
  - abe-basu
showTitle: true
tags:
  - feature flags
---

In this tutorial we’ll walk through creating a simple **drip campaign**:  
send a welcome email when a user signs up, then follow up 1 day later if they don't have a property set.

---

## Step 1: Create a campaign

Go to **Messaging → New campaign**.  
You’ll see a trigger block connected to an exit.

---

## Step 2: Configure the trigger

Click on the trigger and configure it for your signup event (`user signed up`).  It should look something like:

![Trigger](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/trigger_event_74ae2e44d9.png)

---

## Step 3: Send the first email

Drag an **Email** action beneath the trigger.  
Select your welcome email template or create a new one.

![Email](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/onboarding_email_acb053e59d.png)


## Step 4: Wait until condition branch

After the delay, add a **Wait until Condition branch**.  

By default there will be 1 branch, so add one more by clicking on then the `add filter` button.

For the `add filter` branch set the condition so that "`onboarding_completed = true`"

For the wait time make it 1 day.

This means if after 1 day the onbaording_completed person property is not set to true, then go down `no match` the branch, otherwise the condition matches, and we proceed down the `if condition matches` branch

![Wait](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/wait_until_cond_50ec1f7eea.png)

## Step 5: Follow up email or exit

We now drag one more email to the `no match` branch of the `wait until condition`

![next](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/next_email_ebb71d38d8.png)

This means:

- **Yes branch:** Exit (they’ve already activated).
- **No branch:** Add another Email step with a follow-up.


---

## Step 6: Review and launch

Now the campaign should look like this![this](https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/complete_onboarding_workflow_09c6e2c6ad.png)

Click **Create**, and voila the campaign is published.

Your new users will now automatically receive the drip sequence!
