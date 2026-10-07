---
title: Closed-won deal desk automation
sidebar: Handbook
showTitle: true
---

For a standard annual contract, a closed-won alert in <PrivateLink url="https://posthog.slack.com/archives/C08UNFX75ST">#closed-won</PrivateLink> now leads to a checked Zapier table row and a draft Stripe invoice without anyone touching the table. A person still sends the invoice. A `:moneybag:` reaction on the alert then applies the credits.

The manual steps in [credit-based plan automation](/handbook/growth/sales/billing#credit-based-plan-automation) still apply to everything this automation does not cover. The full manual runbook is <PrivateLink url="https://github.com/PostHog/billing/blob/main/notes/process-annual-contracts.md">process-annual-contracts.md</PrivateLink> in the billing repo.

## How a plain deal flows

1. **Alert.** Salesforce posts the closed-won alert in #closed-won.
2. **Triage.** A PostHog workflow runs the `closed-won-deal-desk-triage` skill. The skill reads the opportunity from the warehouse. It resolves the PostHog org and the Stripe customer from billing tables, not from Salesforce ID fields. It checks billing period alignment, credit balance, and coverage. It classifies the deal as plain, rule-based, specialist, needs org pick, or not annual. It posts one short reply in the alert thread and tags the deal owner when it needs an answer.
3. **Zap B.** For a plain deal, triage calls Zap B. Zap B finds or creates the table row, reads the address and billing email from the signed PandaDoc order form, fills a missing Stripe address, and creates a draft invoice. For a brand-new customer whose org a person confirmed, it first creates the Stripe customer.
4. **Send.** RevOps checks the draft invoice in Stripe and sends it.
5. **Credits.** Someone in RevOps reacts `:moneybag:` on the alert. A second Zap checks that the invoice is sent, that the customer matches, and that no credits were applied yet. Then it applies the prepurchase credits.

Rule-based deals wait for `approve <opportunity id>` in the thread. Specialist deals get the triage note only, and RevOps sets them up by hand. Specialist deals are quarterly payment plans, [AWS Marketplace](/handbook/growth/sales/selling-via-aws) deals, and deals with a bad billing state.

## What you do

Everything happens in the alert's thread in #closed-won. Replies must be thread replies in plain text from a person, not from a bot.

| You do | When | What happens |
| --- | --- | --- |
| Nothing | Plain deal, org and Stripe customer found | Triage replies. Zap B fills the row and creates the draft invoice. |
| Reply `use org <number or org id> <opportunity id>` | Triage asks which org is right, or it is a new customer with no Stripe account | Triage runs again with that org. For a new customer, Zap B creates the Stripe customer, then the draft invoice. |
| Reply `approve <opportunity id>` (add `org <org id>` if the org was picked) | Rule-based deal (notes such as a credit rollover, a named billing email, or bank transfer) | Zap B fills the row. RevOps creates and sends the invoice by hand. |
| React `:moneybag:` on the alert | After the invoice is sent | Credits are applied, or the Zap replies why not. |

**Who can react `:moneybag:`:** Mine, Erika, and Abhischek. The list is hardcoded in the Zap, because Zapier's Slack app cannot read the `@revops-folks` group. Add new people in the Zap's first code step.

**Deal owners get tagged** when triage needs an answer from them: the right org, a coverage gap, or a missing Salesforce field. Their Slack IDs live in the skill's `deal-owners.md` file.

**Before you send a draft invoice,** check the dates, the amount, and the billing email. If the reply flags a PO, add it from the Salesforce opportunity first.

## Where everything lives

The triage logic lives in PostHog. Anything that writes to the table or to Stripe lives in Zapier.

### PostHog

| Piece | What it does | Status |
| --- | --- | --- |
| <PrivateLink url="https://us.posthog.com/project/2/workflows/01a0d0f4-649a-0000-de47-e2526a6dda75">Closed-won deal desk triage</PrivateLink> (workflow) | Runs triage on each new Salesforce alert in #closed-won | Live (only alerts that contain "just closed a deal") |
| <PrivateLink url="https://us.posthog.com/project/2/workflows/01a1125d-51a9-0000-1f5d-ce2c94859842">Continue after org pick</PrivateLink> (workflow) | Runs triage again when someone replies `use org …` | Live |
| <PrivateLink url="https://us.posthog.com/project/2/workflows/01a0d13a-7224-0000-47de-425450029cfe">Fill Zap row on approval</PrivateLink> (workflow) | Runs the approval path when someone replies `approve …` | Live (only replies that contain "approve 006…") |
| <PrivateLink url="https://us.posthog.com/project/2/llm-analytics/skills/closed-won-deal-desk-triage">closed-won-deal-desk-triage</PrivateLink> (skill) | The triage instructions that all three workflows run. Includes `deal-owners.md` (owner email to Slack ID). | Live, versioned in the skills store |
| <PrivateLink url="https://us.posthog.com/project/2/endpoints/contract_org_lookup">contract_org_lookup</PrivateLink> (endpoint) | Finds candidate orgs by domain and company name, with Stripe IDs from billing tables | Live |
| <PrivateLink url="https://us.posthog.com/project/2/endpoints/prepurchase_credit_by_invoice">prepurchase_credit_by_invoice</PrivateLink> (endpoint) | Tells the `:moneybag:` Zap whether credits were already applied for an invoice | Live |

### Zapier

| Piece | What it does |
| --- | --- |
| Zap B: Webhook to Prepurchase credit processing table | Receives the triage payload. Finds or creates the row, reads the order form, fills the Stripe address, creates the Stripe customer for new customers, creates the draft invoice, and reports in the thread. |
| Deal desk: apply credits on `:moneybag:` reaction | Checks the reactor, the invoice, and existing credits. Then applies prepurchase credits and marks the row. |
| <PrivateLink url="https://tables.zapier.com/app/tables/t/01KFEYNYKVS60GR4A5PSXDX74Y">Prepurchase credit processing table</PrivateLink> | One row per contract. The buttons still work for manual setup. |
| Create Stripe Customer button Zap | Manual button. Zap B copies its logic. |
| Apply Credit button Zap | Manual button. The `:moneybag:` Zap copies its credit webhook. |

## Still manual

Brand-new customers need four manual steps between sending the invoice and applying credits. The Billing Admin linking must happen before credits are applied, so the order matters.

Order for a brand-new customer (no Stripe customer before this deal):

1. Check the Stripe customer and the draft invoice that Zap B created, then send the invoice.
2. Tick any addons in the table row and click **Schedule Subscription**.
3. In Billing Admin, link the new Stripe customer ID and subscription ID to the org, and update the plans map. Move the org off free or legacy plans, and match the products and addons on the Salesforce opportunity.
4. Only then react `:moneybag:` on the alert to apply credits.
5. Set the Contract setup calendar event to green.

Not automated yet:

- Schedule Subscription for new customers (button in the table).
- Linking the Stripe customer and subscription in Billing Admin, and updating the plans map.
- A check in the `:moneybag:` Zap that a new customer is linked in Billing Admin before it applies credits. Today it only checks the invoice and existing credits.
- Invoices for rule-based deals (credit rollovers, named billing emails, bank transfer). RevOps creates them by hand after `approve`.
- Specialist deals: quarterly payment plans, AWS Marketplace, backdated starts that do not match the billing period, and finalized monthly invoices to cover.
- The Contract setup calendar event is still turned green by hand.
- The PandaDoc-to-table Zap still looks up orgs in Vitally. Vitally is being turned off in mid-October 2026, so that lookup must move to PostHog (`contract_org_lookup`).

## Known limits and troubleshooting

Most failures leave a message in the alert thread that says what to fix. None of them create anything in Stripe.

| Symptom | Cause | Fix |
| --- | --- | --- |
| "Salesforce data in PostHog is behind" | The Salesforce opportunity sync is a daily full refresh, so a deal won today may not be in the warehouse yet | Reload the `salesforce.opportunity` sync in the PostHog data warehouse, then reply `use org …` again |
| "Couldn't find the order form" | The Contract Link field on the opportunity is not a PandaDoc document link (template or token links do not work), and no completed PandaDoc document matches the company name | Paste the PandaDoc document link into Contract Link, or fill the row's address, Country, and billing email by hand, then reply `use org …` again |
| Zap B says it is reading the order form but never replies | Zapier's AI timed out while it read the PDF (seen with DocuSign PDFs uploaded to PandaDoc). Zapier retries on its own | After 15 minutes, delete the scheduled retry in Zap history, fill the row by hand, then reply `use org …` again |
| "Didn't create a Stripe customer … the row is missing …" | A row exists but has no address, Country, or billing email | Fill those fields in the row, then reply `use org …` again |
| "Stripe already has customer … for this org id" | A Stripe customer is already tagged with this org | Add that customer ID to the row instead of creating a new one |
| "Didn't apply credits" after `:moneybag:` | Reactor not on the allow list, invoice not sent yet, customer mismatch, or credits already applied | The message says which. Fix it and react again |

**Editing the Zaps:** reload the Zapier editor before you publish. If you publish from an editor tab that you opened before someone else saved a change, you overwrite that change.

**Reruns are safe.** Zap B checks Stripe for a customer with the org ID right before it creates one, and it only drafts an invoice when the row has none.
