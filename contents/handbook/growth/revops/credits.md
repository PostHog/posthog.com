---
title: Giving credits to customers
sidebar: Handbook
showTitle: true
---

Sometimes we might want to offer a customer one time credits to cover an upcoming invoice, for example when accommodating a trial for a new product or offering compensation for a recent incident. Here’s how to do that.

- Go to <PrivateLink url="https://billing.posthog.com/admin/billing/credit/">Billing Admin → Credits</PrivateLink>
- Click Add Credit at the top right.
- Click Add credit at the top right.
  - Select the customer from dropdown or search
  - Enter the total credit amount.
  - choose from the following options for reason:
    - First Big Bill
    - Unwanted Spike
    - Trial Accommodation
    - Promo Credit
    - Incident Credit
    - Bug Credit
    - Other
  - Add any internal notes for context in Notes section.
  - Include a link to a related Slack message, Zendesk ticket, or internal discussion in reference link field
- Click Save and the credit will automatically be added to the customer’s balance in Stripe and applied to their next invoice.

## Things to keep in mind
- Credits only apply to upcoming invoices.
- If you’re trying to adjust a completed invoice, this should be handled as a [refund](/handbook/growth/sales/refunds) instead.
- Always include enough context in your notes or reference link so others understand why the credit was given.
