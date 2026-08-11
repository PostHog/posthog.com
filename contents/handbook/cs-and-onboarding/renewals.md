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

## Renewal timeline

Starting 3 months out gives the customer time to decide and also leaves room for signature to slip without creating a billing mess: once a billing period has been invoiced, we can't backdate a contract start date into it, so a renewal that lands late leaves the customer with a separate invoice the new credits can't cover.

Work back from the end of the customer's current billing period, not from the anniversary date:

- **3 months out:** start the renewal conversation (see [When to start](#when-to-start) above).
- **2 months out:** have the renewal call and share the quote. If the customer isn't engaging by now, start the [escalation steps](#what-to-do-when-things-arent-moving-forward).
- **As soon as the amount is agreed:** order form out for signature in PandaDoc. There's no lead time that counts as "enough," so don't hold it for one. You can work out from the customer's remaining balance and burn rate which billing period the new credits need to cover. If their credits will run out before the term ends, this is an early renewal and the paper should go out well ahead of the anniversary date.
- **About a week before the period closes:** checkpoint. If it isn't signed by now, stop waiting and pick one of the options below.
- **Before the current billing period ends:** signed. This is the hard deadline: the contract has to be signed before the `period_end` date of the invoice the new credits need to cover.

Sending the paper early lowers the odds of a problem but can't remove it. Customers routinely route our order form through their own procurement or e-signature system, and once they do you no longer control when it gets signed. A form that went out three weeks early can still land after the period closes because the budget holder was on leave. Ask early whether the signer will be available and whether the form has to go through an internal system, and treat either answer as a reason to plan for the checkpoint rather than hope you won't need it.

### At the checkpoint, when signature is going to slip

Two options, in order of preference:

1. **Ask billing to pause collection.** If the invoice hasn't been issued yet, billing can hold it for a few days so the credits land first. Flag it as early as you can, because [they can't pause an invoice that has already been issued](/handbook/growth/sales/contracts#flag-insufficient-credits-before-the-invoice-is-issued).
2. **Re-paper with the next period's start date.** If the period is going to close before signature, don't hold the original start date. Move the `Contract.EffectiveDate` to the beginning of the next billing period and tell the customer the new credits apply from that date. The period we already invoiced stays payable separately.

Tell the customer which of these is happening while the order form is still out, not after they get an invoice they weren't expecting.

If a customer does end up with a balance on an already-issued invoice because the renewal slipped, that's a [refund, not a credit](/handbook/growth/sales/refunds#refund-or-credit). Credits only apply to upcoming invoices.
## Timing your renewals with billing

Once a billing period has been invoiced, we can't backdate a contract start date into it, so a renewal that lands late leaves the customer with a separate invoice the new credits can't cover. This is your true renewal deadline, and you must plan your renewals with this in mind.

Work back from the end of the customer's final billing period (if they are going to expend their credits early, work from the final billing date partially covered by credits). **As soon as the amount is agreed upon send the order form out for signature in PandaDoc**. Ideally this is at least 2 months before the end of the final billing period. Sending the paper early lowers the odds of a problem but can't remove it. Customers routinely route our order form through their own procurement or e-signature system, and once they do you no longer control when it gets signed. Ask early whether the signer will be available and whether the form has to go through an internal system.

Regardless, have a checkpoint the week before the final billing period closes. If signature is going to slip, either:
1. **Ask billlng to pause collection.** If the invoice hasn't been issued yet, billing can hold it for a few days so the credits land first. Flag it as early as you can, because [they can't pause an invoice that has already been issued](/handbook/growth/sales/contracts#flag-insufficient-credits-before-the-invoice-is-issued).
2. **Re-paper with the next period's start date.** If the period is going to close before signature, don't hold the original start date. Move the `Contract.EffectiveDate` to the beginning of the next billing period and tell the customer the new credits apply from that date. The period we already invoiced stays payable separately.

Tell the customer which of these is happening while the order form is still out, not after they get an invoice they weren't expecting. If a customer does end up with a balance on an already-issued invoice because the renewal slipped, that's a [refund, not a credit](/handbook/growth/sales/refunds#refund-or-credit). Credits only apply to upcoming invoices.
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
