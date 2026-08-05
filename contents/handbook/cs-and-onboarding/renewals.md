---
title: Renewals
sidebar: Handbook
showTitle: true
---

## Renewal principles

Prepaid credit plans (usually expiring 12 months after the contract was signed) work for both sides. Customers get a discount, and we get confirmed revenue.

When estimating the renewal amount, accurately project how many credits the customer will need over the next 12 months (or whatever period applies — e.g. 6 months if they prepaid for 6). This isn't the time to upsell. Drive that later through product usage.

For mechanics, see [Contract rules](/handbook/growth/sales/contract-rules) and [How to create contracts](/handbook/growth/sales/contracts).

## When to start

- **Customers on track to use up all their credits early:** 3 months before they are due to run out of credits.
  -  The credit bot will ping you in Slack if a customer is set to run out of credits before their renewal date, but you should also keep on top of their credit burn proactively as their CSM. 
- **Other customers:** 3 months before the credit expiry date.
  - At the 3-month mark, the customer moves into the `Upcoming renewal` segment, a Vitally task is assigned to you, and Slack pings you.

Customers who fit into either of the above buckets will also appear on the <PrivateLink url="https://us.posthog.com/project/2/insights/OXGSYc9k">CSM Managed — credits expiring in next 3 months</PrivateLink> insight.

Start with a message in the shared Slack channel — the person you worked with last time might not be the right contact now. Flag the renewal date and ask about preferred next steps.

As things progress, [update the renewal opportunity](/handbook/growth/sales/crm#renewal-pipeline) in Salesforce.

## Unique renewal cases

### Customers with credits expiring at end of contract

If a customer has a balance when their contract ends, the credits expire and they move to monthly payments. We have [rules](/handbook/growth/sales/contract-rules#when-they-will-end-the-contract-term-with-credit-remaining) to let customers carry over credits on a flat renewal or higher.

If you spot a customer trending this way, reach out early to explain the credit expiry and the options. Use the call to explore projected growth and other use cases. Start the renewal conversation 3 months out so you have time to explore new features and figure out if the carry-over is worth it for them.

### Customers with irregular contracts

Many customers are on legacy contracts that don't follow our [contract rules](/handbook/growth/sales/contract-rules) — non-Net 30 payment terms, unique discounts, legacy pricing, monthly or quarterly payments.

Prioritize migrating these customers to standard pricing and discounts. The conversations may be difficult, but stick to handbook pricing whenever reasonable — and share the handbook directly to back up your point. Use your judgment on when an irregular term is a deal-breaker worth keeping, and then get approval from <TeamMember name="Simon Fisher" showOnlyFirstName photo /> (<TeamMember name="Ben Bradley" showOnlyFirstName photo /> as backup) before sharing it with the customer.

## Renewal discussions

Do these on a call. There are a lot of moving parts and talking through it works best.

Before the call:

- Review the customer's usage and start a quote in <PrivateLink url="https://quote.posthog.com/">Quotehog</PrivateLink>.
- For usage data beyond the last 6 months, use <PrivateLink url="https://us.posthog.com/project/2/dashboard/374922">this PostHog dashboard</PrivateLink> and edit the variables.
- Check if they're on a legacy pricing tier — either move them to standard pricing or factor it into your quote.

Use the call to learn about their PostHog experience so far and what's coming up next. It's also a good chance to explain how contracts, credits, and discounts work — our [pricing philosophy](/pricing/philosophy) and [contract rules](/handbook/growth/sales/contract-rules) pages are useful references.

When walking through the quote, start with past usage and anchor to their main products (there can be a lot of numbers). Explain how you projected each product's usage. Check in throughout to make sure your assumptions still hold.

After the call, share the public quote link with the customer along with any usage info you discussed.

## What to do when things aren't moving forward

If you are struggling to move things along either because the customer isn't engaging with you or you don't know who the right contact person is, ensure you do the following at least 2 months before the date when they need to renew.  If things don't move forward within 2-3 working days, move on to the next step.

1. Message active users either via Slack (ideal) or Email (less ideal) to see if they know who the right person is to engage with on the renewal.
2. Check who signed the current order form in PandaDoc - it may be that they aren't an active user of PostHog so try and get in touch with them if you haven't already.
3. Prepare an order form in PandaDoc and send it to the person who is the owner of the PostHog account, or the previous signer.  Use your best judgement here - an account owner who is active is likely the best bet, whereas if the owner hasn't been seen in months then they may have moved on from the company.  LinkedIn could help you figure out whether these folks are still at the customer.  At the very least PandaDoc will tell you if the email and order form have been viewed and forwarded.
4. Check Stripe to see if we have a finance contact on file - get in touch with them to let them know that 
   1. As we haven't got a signed order form they will lose their discount and will be paying $X more per month going forward.
   2. We need a valid credit card on file which we will automatically charge.
   3. Let them know the date of the first monthly payment and expected amount they will be billed.
5. If you still haven't heard anything from finance, send the information from step 4 to all active users and owners/admins in the account.
6. If you get to this point and you still haven't secured the renewal, Closed - Lost the renewal opportunity and follow our [failed payment process](/handbook/growth/sales/billing#failedlate-payments) if their first monthly invoice isn't paid, or we don't have a valid card on file.