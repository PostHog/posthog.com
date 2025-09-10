---
title: Contract Rules
sidebar: Handbook
showTitle: true
---

We get it, nobody likes rules.  As we scale the Sales and CS teams we need to be consistent in how we approach contracts to ensure that we are setting ourselves up for future success.  If you have a customer situation where you'd like to vary the rules below, get approval from Dana, Simon or Charles first.  You should also have them note the approval on the Salesforce opportunity record.

## Discounts

> We don't offer discounts to customers paying monthly, irrespective of commitment. 

Although our standard monthly [pricing](/pricing) has volume discounts built in, it's common practice when negotiating software contracts for the customer (and their procurement team) to ask for a discount.  We can be super transparent about the levers we have in discounting PostHog:

1. In our consumption-based pricing model, the easiest way to reduce spend is to ensure that the customer is only sending data to us which is valuable to them.  There is [different guidance here](/docs/billing/estimating-usage-costs) depending on which product(s) they are looking at.
2. **Annual Plan:** We offer a 20% discount on an annual paid-up-front plan, because it's beneficial to PostHog to have a customer committed for a year.
3. **Higher Spend:** We offer an additional 5% and then 15% on top of the annual plans when the customer spends above $60k and $100k respectively.
4. **Multi-year:** We offer an additional 5% for each additional year of commitment, as longer commitments are beneficial to PostHog (see table below). Credits rollover in-between for multi-year contracts.
5. **Up-front payment:** We offer an additional 3% where a *multi-year* contract is all **paid up-front**, as it's better for PostHog to have the money in the bank.

> We don't offer a discount for signing a contract by some fixed date (e.g so the deal closes in a specific quarter).

> You shouldn't offer discounts above the levels outlined here. If a customer is asking for more and you feel like a genuine exception is justified then speak to Dana, Simon or Charles about it as we may be able to offer additional credit for the first year of a contract. If you go outside of these rules without clearing it with one of us, the deal may not count toward your quota.

The below table summarizes the discount levels contained in points 2-4:

<table>
<thead>
<tr>
<th>Annual Spend</th>
<th><strong>Commitment</strong></th>
<th><strong>Minimum Credit</strong></th>
<th><strong>Discount</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="3">between $20k and $60k</td>
<td><strong>1 year</strong></td>
<td>$25,000</td>
<td>20%</td>
</tr>
<tr>
<td><strong>2 year</strong></td>
<td>$26,666</td>
<td>25%</td>
</tr>
<tr>
<td><strong>3 year</strong></td>
<td>$28,572</td>
<td>30%</td>
</tr>
<tr>
<td rowspan="3">between $60k and $100k</td>
<td><strong>1 year</strong></td>
<td>$80,000</td>
<td>25%</td>
</tr>
<tr>
<td><strong>2 year</strong></td>
<td>$85,715</td>
<td>30%</td>
</tr>
<tr>
<td><strong>3 year</strong></td>
<td>$92,308</td>
<td>35%</td>
</tr>
<tr>
<td rowspan="3">$100k or more</td>
<td><strong>1 year</strong></td>
<td>$153,847</td>
<td>35%</td>
</tr>
<tr>
<td><strong>2 year</strong></td>
<td>$166,667</td>
<td>40%</td>
</tr>
<tr>
<td><strong>3 year</strong></td>
<td>$181,819</td>
<td>45%</td>
</tr>
</tbody>
</table>

Our general principle is that a customer should get a discount because the cash up front is beneficial to PostHog, as it allows us to invest more in building more products, faster. For this reason, discounts only apply if customers pay the whole year(s) up front.

As an exception, a customer can choose to contract for a year but pay quarterly - in this case, they can get a discount, but it is halved. No discounts are available for customers paying monthly. 

### Credit for case studies

We don't offer additional discounts in exchange for a case study, but we can offer up to 5% additional year 1 credit in exchange for a _published_ case study on PostHog.com (ie. the credit is only applied after the case study goes live, not up front). Simon or Charles need to approve this before you offer it to the customer - most case studies are not going to be useful for us, so don't assume you can just offer this. 

This should be added as a special term into the order form as follows:

> PostHog will add an additional $XXXXX of credit to Customer account upon successful publishing of a case study on Customer's usage of PostHog on PostHog.com.

### Self-serve discounts

We also offer a way for customers to receive discounts on their usage without talking to sales or being on an Enterprise plan. In PostHog, if a customer meets certain criteria, they will see a banner on their billing page with a call-to-action (CTA) to "buy credits". The form they fill out will be auto-populated with an estimated number of credits based on their last 3 months of usage, but they can adjust this value as needed. They will have the option to pay with the card on file or to receive an invoice. Credits will be applied to their account once the invoice is paid.

Requirements for self-serve discounts:
- 3 or more paid invoices
- Average of $500 or more across the last three invoices
- No open invoices
- Not currently on the startup plan, a legacy plan, or having existing credits

Additional notes on self-serve discounts:
- The minimum purchase is $500/month, which equates to $6,000 upfront for the year.
- For credit purchases between $6,000 and $20,000, the discount is 10% off. Above $20,000 follows the standard volume discount structure above.
- Instead of providing all credits upfront, we apply 1/12 of the credits each month for the next 12 months. These credits do not expire for 1 year after they've been applied.
- If a customer uses all credits in a month, they will be billed for extra usage at the standard rate.

### Nonprofit discounts

We do offer additional discounts to nonprofits and start nonprofit discounts at 15% regardless of spend.

If signing for an annual plan with a credit purchase between $20k and $80k, an additional 5% nonprofit discount is applied. For example, purchasing $25k in credits with an additional 5% nonprofit discount would result in a 25% discount. At a credit purchase of $80k or more, the standard discounts (outlined in the table above) take effect.

We use tax law in the country of origin to determine what is a not for profit entity. If a customer can provide proof they fit their country's definition, the discount is applicable subject to the guidance above.

When evaluating a discount, it’s important to review our margin calculations (available in [this sheet](https://docs.google.com/spreadsheets/d/1ynNM9tbWsWki2Q0vhwCV0iYNtJ1NHz4eXtUvZDw_sjA/edit?usp=sharing)) to ensure we remain margin positive, especially for larger accounts. 

To set up the nonprofit discount in Stripe, follow the [instructions here](/handbook/growth/sales/billing#coupons-and-discounts).

> Nonprofit discounts only stack with annual discounts at a rate of 5%, and only if the credit purchase amount is less than $80,000.

### Legacy discounts

You might see some customers with a 30% discount on their monthly Stripe subscription.  These were added when the only way we billed for PostHog was through event pricing.  This was originally designed to offset the cost versus competitors who had unbundled Group Analytics or Data Pipelines.  These customers will typically be on a higher per-event price plan, so we should look to get them migrated to standard pricing as soon as possible.

### Startup plan discounts
For customers on our [startup plan](https://posthog.com/startups), we offer two months free when signing an annual deal. This encourages startups to use their credits to understand usage, and then commit to a long term plan with PostHog. 

## Additional credit purchase

As it's often difficult to right-size the credit needed for the term of the annual plan as a standard we offer to honor the discount provided in the original purchase for any additional credit purchased in the first half of a contract term (e.g. 6 months for an annual plan).  Within the first 6 months given our billing usage reports we should be able to predict whether the customer is going to run out of credit or not.  There are also alerts set up in #sales-alerts to help notify account owners about this.

## Multi-year credit allocation

### Paid up-front

We will allocate all the credit purchased to the Stripe account when the contract is signed.  As above, they can purchase additional credit in the first half of the contract term and take advantage of the same discount as specified in the original contract.

### Paid yearly

We will allocate the credit for that year to the Stripe account when the contract is signed, and then again when subsequent annual invoices are raised.

If a customer wishes to use subsequent year's credit early they must agree to pay the invoice for that year early before the credit is transferred.

The additional credit purchase applies to each year separately, e.g. they can purchase additional credits at the same discount level in the first 6 months of each year.

You can see a signed multi-year contract set up in this way by navigating to Documents -> Examples (folder) inside of [PandaDoc](https://app.pandadoc.com).

## Uptime SLA

Customers only get an uptime SLA if:

1. They have subscribed to the Enterprise add-on; or
2. You agree it with them as a special term as part of their annual contract if they are spending $100k+

An uptime SLA are not available to customers outside of these cases. You should certainly not agree to an SLA for customers on regular monthly contracts, and even for annual contracts it is not a given - it's one of multiple pieces you may have in play as you negotiate terms (much like a case study).

More details on how exactly the uptime SLA works can be found in our [terms](/terms).

## Payment method

Our strong preference is for customers to pay by credit card, as this is easier to manage in Stripe and has a lower risk of the customer forgetting to make the payment (which means we have to spend more time chasing).

If a customer wants to pay by ACH or bank transfer, we will usually only consider this if they are paying for 1 year or more up front. This is more likely to be the case for very large customers.

For customers in an annual contract but paying quarterly we require them to pay via credit card - ACH or bank transfer are not accepted.

> We absolutely do not allow payment by check.

## Contract buyouts

Sometimes customers will be locked into a contract with a competitor, but want to switch to PostHog when their contract is up. In this case, we are willing to let them use PostHog for free for up to 6 months. This is beneficial to PostHog as well, as we can get them set up and using PostHog sooner, capitalizing on the momentum of their interest today, and giving them more time to get comfortable with the platform.

Some rules:

* They need to share a copy of their current contract/pricing/bank statement as proof.
* They sign up to an annual contract worth $20k+/year, paid up front. Their PostHog contract starts when their current one expires.
* Their usage in the overlap period needs to be proportionate to the contract they've signed, ie. if they sign a $50k contract and have 6 months to run, they get $25k of PostHog credit for free.
* The competitor they're using has to be 'real', ie. not some random side project. As a general rule, anyone we have written a [comparison article](/blog/tags/comparisons) about counts.
* We have final discretion on deciding who gets the deal.
* We can still provide a standard free trial period of 2-4 weeks before they sign the contract, as they will likely need to figure out whether PostHog is right for them before committing.

> Normal commission rules apply here - commission is paid in the quarter in which the customer pay their annual invoice.

## Credit over/under usage for annual contracts

### When they don't have enough credit to cover their term

We have CreditBot alerts set up in [#sales-alerts](https://posthog.slack.com/archives/C071PGWKBQS) when a customer is going to run out of credit before their contract term ends, with the estimated runway remaining.  The Vitally account owner (AE or CSM) will be tagged in this message.  It's best to be proactive here so that the customer is right-sized well before the credit runs out:

* If they will run out of credit or wish to buy more within the **first 6 months** of the contract term, they can still take advantage of their initial discount.  You'll need to have them sign a new order form which adds the additional credit, and it should expire on the date of the original order form.
    * Example: Their original order form was signed on 1st January with a 12-month term.  Their expansion order form could be signed on 1st June with a 7-month term.  Make sure the end date lines up with the end date of the original contract to avoid any issues with the billing server and ARR calculation.
* If they will run out of credit with **less than 2 months** remaining on their initial term, as long as they sign a renewal order form to start at the end of the original contract term we will cover their usage for free until the renewal date, assuming the renewal order form is signed before they run out of credit and their new contract amount is equal to or greater than the current contract amount.
* If they fall **in between** the two cases above (running out of credit with <6 months and >2 months to go) then we need them to sign a new 12 month (or longer) order form lined up with their monthly billing date.  This makes ARR calculation slightly trickier as there are two overlapping contracts in play at the same time.
    * Example: Their original order form was signed on 1st January with a 12-month term and they run out of credits in September.  We need a new 12-month order form in place with a Contract Start Date of September 1st.

For any of the above scenarios you should use our [discounting principles](contract-rules#discounts) which apply to the annual spend.  

> In scenario one above, if their expansion contract spend takes them over the threshold for additional discounts we should include this discount tier for them in the expansion contract. We won't issue a refund for the difference in spend when the expansion order form discount tier is greater than the discount tier of the original order form.

### When they will end the contract term with credit remaining

We can roll up to half the amount of credit from the original order form to a new contract term, provided that the customer signs a renewal contract of equal or higher spend than the original contract.

## Varying terms

> If a customer wants to vary either our DPA, BAA, or MSA terms, it is a substantial effort for our legal team to review these changes.  At a minimum, we should only do this for contracts above $20k a year, and even higher if they are asking for big changes (e.g. adding a Service Level Agreements). The minimum is $100k to bring your own contract instead of our template - see 'Non PostHog Contracts' below. A customer needs to either be spending this amount at present, or agree to commit to this spend via an annual contract, in order to initiate legal review of potential changes.

The customer should redline the .docx version of the document in question.  You can find the latest versions of the templates in the Team Internal Info tab in the #team-sales Slack channel.  Once they have returned the redlines to you first check to ensure that they have used the template which you provided, and then share the document for review in the #legal channel.  There will usually be a few rounds of back and forth as we converge on an agreement.  

> We don't accept redlines on our standard terms of service and if a customer has proposed this you should share the correct templates with them before involving legal.

We also sometimes receive unsolicited requests to vary our terms.  In these instances the legal team will redirect the customer to work with their PostHog contact person for this, as we will only review redlines for a managed customer or opportunity.

## Varying terms for trials and proofs of concept (POCs)

We don't vary PostHog's standard terms for trials and proofs of concepts (POCs) for prospective customers. 

All prospective customers are welcome to try PostHog for free and under our standard terms (including our standard DPA and BAA, if applicable).

We don't negotiate terms for trials and POCs for three reasons:

1. Unlike many of our competitors, an annual subscription is not required to access PostHog, so a negotiated agreement is not necessary to use our services. Our product-led motion is designed to support customers trying PostHog. 
2. When [evaluating custom legal terms](/handbook/growth/sales/contract-rules#varying-terms), PostHog evaluates legal risk assumed against annual revenue received. 
3. Because prospective customers are paying us $0 for a free, sales-led trial or POC, there is no frame of reference for us to evaluate any potential custom terms.  Spending our time and legal resources negotiating these terms is premature when a prospective customer doesn't know that they want to proceed with PostHog at all, much more at a qualifying level of annual usage. 

Once the trial concludes, and [per our guidance on varying terms](/handbook/growth/sales/contract-rules#varying-terms), we will be happy to evaluate custom legal terms for an otherwise qualified PostHog customer. 

## Non-PostHog contracts

If a customer requests to use a non-PostHog drafted contract for documents such as a DPA, MSA, Order Form, or BAA, we generally decline, except in special circumstances.  We avoid doing this as it adds too much risk for us, and also because reviewing and negotiating non-standard terms introduces significant operational inefficiencies and doesn't scale well as we continue to grow. We typically do not even consider using customer paper unless the deal is over $100k annually or involves an extremely blue-chip company. It is best to manage this expectation early and just avoid entertaining the idea with customers as soon as possible. 

We are somewhat more flexible when it comes to NDAs. That said, since we contract through our U.S. entity, we require customer NDAs to be governed by U.S. law. This is necessary to maintain consistency and ensure we’re not taking on legal or operational risk in jurisdictions where we don’t operate or fully understand the legal landscape. This is mainly about ensuring we can review and manage agreements efficiently with our limited legal resources.
