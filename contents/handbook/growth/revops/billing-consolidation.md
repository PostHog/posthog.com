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
3. **Merge the accounts into one organization.** Move the projects into a single organization and control access so each team sees only its own projects. Choose this only when the customer wants one organization, not only one invoice. This is the largest change and is rarely necessary. See [merge paying accounts into one organization](#merge-paying-accounts-into-one-organization).

Option 2 and option 3 are different. A customer that asks to "combine our accounts" usually wants one invoice, which is option 2, not a merge of their organizations. Confirm which they mean before you plan the work.

For the pros and cons of a shared Stripe customer against a separate one, see the [customer billing configurations](/handbook/growth/billing/customer-billing-configurations) page. This page covers the migration of existing paying accounts into that setup.

## Confirm with the customer before you migrate

Get a clear yes on each of these before the billing team makes a change. Each one changes what the customer pays or sees.

- **Which setup.** Which of the three shapes above.
- **Invoice email.** The email for the consolidated entity. If the customer has not decided, agree a placeholder (for example, their head of procurement) and set the final email later. Do not hold the migration for this.
- **Final partial invoices.** Usage pools only after we link the accounts. Usage before the link date is not pooled, so each account that pays today gets a final invoice for its partial period. Confirm the customer accepts these. Credits on the consolidated customer do not cover them.
- **Which account is the target.** We link the others to one account. Use the account with the largest spend, which usually already holds a credit balance. Internally, MRR and invoices attach to the canonical organization (the one with the lowest customer ID), so the other organizations show no MRR in our own tools. See the [customer billing configurations](/handbook/growth/billing/customer-billing-configurations) page.
- **Grandfathered pricing.** Check if any single account has a legacy or grandfathered grant (for example, a free feature flag allowance). Only that account keeps the grant. Decide with the billing team whether to make it the target account, or to add the same grant to the target account. Agree this before you link, because it is hard to recover after.

## Migrate to one shared Stripe customer

The billing team runs these steps for option 2, once the customer confirms the points above.

1. **Invoice the partial periods.** For each account that pays today, other than the target account, cancel the current subscription and invoice its accrued usage for the partial period. Send these before you link.
2. **Link the accounts to the target Stripe customer.** From the day you link, all usage pools into the shared customer, one subscription, and one credit pool.
3. **Set the invoice email** on the consolidated customer (the confirmed email, or the placeholder).
4. **Tell the customer that access does not change.** The organizations stay separate, so each organization's users keep their own access.

## Merge paying accounts into one organization

Use these steps for option 3, when the customer wants one organization and more than one of their organizations pays today. The organization that stays is the target organization. The organizations that you move projects out of are the source organizations.

### Confirm before you merge

Get a clear yes on each of these in addition to the confirmations above:

- **The target organization.** Use the organization with the largest spend, which usually already holds a credit balance. Its subscription stays. The source organizations stop billing.
- **Final partial invoices.** Each source organization that pays today gets a final invoice for its usage up to the day its projects move. Credits on the target organization do not cover these invoices.
- **Grandfathered pricing on a source organization.** A grant on a source organization stops when that organization stops billing. If the customer must keep it, the billing team adds the same grant to the target organization before the move.
- **Access for each team.** Get the list of users for each team, and which projects each team must see. Users lose access to a project when it moves, unless they are a member of the target organization.
- **The plan supports the access setup.** Access controls for each member need the Boost or Scale package. Role-based access control needs the Enterprise package. On other plans, all members see all projects. See [access control](/docs/settings/access-control#feature-availability).
- **Cross-region moves.** A move between the US and EU clouds needs the Scale or Enterprise plan, and a PostHog engineer runs it. Agree on a date with the customer and the engineering team. See [moving projects between organizations](/docs/settings/projects#moving-projects-between-organizations).
- **A short loss of access.** Between the move and the invite, the team of a moved project cannot open it. Agree on a time with the customer.

### Merge steps

1. **Add any grandfathered grants to the target organization.** Do this before any project moves.
2. **Set access in the target organization.** Set the default access for the existing projects so that only their current team can open them. Do this before you invite new users, or they see all the existing projects.
3. **Move the projects.** In the same region, an owner or admin of both organizations moves each project from project settings. Across regions, a PostHog engineer moves it. A source organization must have at least two projects to move one, so create an empty project in each source organization before you move its last project.
4. **Set access on each moved project.** Give access only to the team that owns the project.
5. **Invite the users of each source organization to the target organization.** Each user then sees only the projects that you gave their team.
6. **Cancel and invoice each source organization.** After all its projects move, cancel its subscription and invoice its accrued usage for the partial period. Do not cancel a subscription while the organization still has active projects. A free plan organization has usage limits, and the customer can lose data.
7. **Set the invoice email** on the target organization (the confirmed email, or the placeholder).

## After the migration

- Watch the first consolidated invoice. The usage from all the linked organizations, or from all the moved projects, should appear on the target customer.
- Confirm the customer paid the final partial invoices.
- Replace the placeholder invoice email with the final email once the customer confirms it.
- For a merge, ask each team to confirm that they can open their projects and cannot open the projects of the other teams.
