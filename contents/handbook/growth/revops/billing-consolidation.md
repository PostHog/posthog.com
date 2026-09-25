---
title: Consolidating billing across organizations
sidebar: Handbook
showTitle: true
---

Sometimes a parent company owns several PostHog accounts — often separate companies it acquired, sometimes across cloud regions — and asks us to bill them as one. This page describes how we handle that. It covers the choices to present to the customer and the steps to migrate existing paying accounts without a billing surprise.

The <SmallTeam slug="billing" /> runs the billing changes here. Sales and CS own the customer conversation and the confirmations below.

## Choose the target setup with the customer

There are three shapes. Agree on one with the customer before any billing change, and before the order form goes out.

1. **Keep the accounts separate, one Stripe customer for each (no change).** Each organization keeps its own subscription, invoice, and credit pool. Choose this when the customer wants a spend breakdown for each account and does not need one invoice.
2. **Keep the accounts separate, one shared Stripe customer (billing consolidation).** The organizations stay separate for access and data, but usage pools into one customer, one subscription, one invoice, and one credit pool. This is "Option B" on the [customer billing configurations](/handbook/growth/billing/customer-billing-configurations) page. Choose this when the customer wants one invoice and does not need the spend for each account.
3. **Merge the accounts into one organization.** Move the projects into a single organization and control access so each team sees only its own projects. Choose this only when the customer wants one organization, not only one invoice. This is the largest change and is rarely necessary.

Option 2 and option 3 are different. A customer that asks to "combine our accounts" usually wants one invoice, which is option 2, not a merge of their organizations. Confirm which they mean before you plan the work.

For the pros and cons of a shared Stripe customer against a separate one, see the [customer billing configurations](/handbook/growth/billing/customer-billing-configurations) page. This page covers the migration of existing paying accounts into that setup.

## Confirm with the customer before you migrate

Get a clear yes on each of these before the billing team makes a change. Each one changes what the customer pays or sees.

- **Which setup.** Which of the three shapes above.
- **Invoice email.** The email for the consolidated entity. If the customer has not decided, agree a placeholder (for example, their head of procurement) and set the final email later. Do not hold the migration for this.
- **Final partial invoices.** Usage pools only after we link the accounts. Usage before the link date is not pooled, so each account that pays today gets a final invoice for its partial period. Confirm the customer accepts these. Credits on the consolidated customer do not cover them.
- **Which account is the target.** We link the others to one account. Use the account with the largest spend, which usually already holds a credit balance. Internally, MRR and invoices attach to the canonical organization (the one with the lowest customer ID), so the other organizations show no MRR in our own tools. See the [customer billing configurations](/handbook/growth/billing/customer-billing-configurations) page.
- **Grandfathered pricing.** Check if any single account has a legacy or grandfathered grant (for example, a free feature flag allowance). Only that account keeps the grant. Decide with the billing team whether to make it the target account, or to add the same grant to the target account. Agree this before you link, because it is hard to recover after.

## Migrate the accounts

The billing team runs these steps once the customer confirms the points above.

1. **Invoice the partial periods.** For each account that pays today, other than the target account, cancel the current subscription and invoice its accrued usage for the partial period. Send these before you link.
2. **Link the accounts to the target Stripe customer.** From the day you link, all usage pools into the shared customer, one subscription, and one credit pool.
3. **Set the invoice email** on the consolidated customer (the confirmed email, or the placeholder).
4. **Move projects across regions if needed.** A project cannot move between cloud regions on its own — this needs the billing and engineering teams. See [moving projects between organizations](/docs/settings/projects#moving-projects-between-organizations).
5. **Check access after the change.** If the accounts stay separate (option 1 or 2), access does not change and each organization's users keep their own access. If you merged into one organization (option 3), set [access control](/docs/settings/access-control) so each team sees only its own projects.

## After the migration

- Watch the first consolidated invoice. The usage from all the linked organizations should appear on the shared customer.
- Confirm the customer paid the final partial invoices.
- Replace the placeholder invoice email with the final email once the customer confirms it.
