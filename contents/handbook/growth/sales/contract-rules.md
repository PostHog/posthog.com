---
title: Contract rules
sidebar: Handbook
showTitle: true
---

We get it, nobody likes rules. As we scale the Sales and CS teams we need to be consistent in how we approach contracts to ensure that we are setting ourselves up for future success. If you have a customer situation where you'd like to vary the rules below, get approval from <TeamMember name="Dana Zou" showOnlyFirstName photo />, <TeamMember name="Simon Fisher" showOnlyFirstName photo /> or <TeamMember name="Charles Cook" showOnlyFirstName photo /> first. You should also have them note the approval on the Salesforce opportunity record.

## Discounts

> We don't offer discounts to customers paying monthly, irrespective of commitment.

Although our standard monthly [pricing](/pricing) has volume discounts built in, it's common practice when negotiating software contracts for the customer (and their procurement team) to ask for a discount. We can be super transparent about the levers we have in discounting PostHog:

1. In our consumption-based pricing model, the easiest way to reduce spend is to ensure that the customer is only sending data to us which is valuable to them. There is [different guidance here](/docs/billing/estimating-usage-costs) depending on which product(s) they are looking at.
2. **Prepaid credit:** We offer a 20% discount on a paid-up-front plan of >$20k, because it's beneficial to PostHog to have a customer committed.
3. **Higher spend:** We offer an additional 5% and then 15% on top of the prepaid credit plans when the customer spends above $60k and $100k respectively.
4. **Multi-year:** We offer an additional 5% for each additional committed credit renewal under a prepaid contract, as longer commitments are beneficial to PostHog (see table below). Credits rollover in-between for multi-year contracts.
5. **Up-front payment:** We offer an additional 2.5% per year where a _multi-year_ contract is all **paid up-front**, as it's better for PostHog to have the money in the bank.

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
<td class="pl-4"><strong>2 year</strong></td>
<td>$26,666</td>
<td>25%</td>
</tr>
<tr>
<td class="pl-4"><strong>3 year</strong></td>
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
<td class="pl-4"><strong>2 year</strong></td>
<td>$85,715</td>
<td>30%</td>
</tr>
<tr>
<td class="pl-4"><strong>3 year</strong></td>
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
<td class="pl-4"><strong>2 year</strong></td>
<td>$166,667</td>
<td>40%</td>
</tr>
<tr>
<td class="pl-4"><strong>3 year</strong></td>
<td>$181,819</td>
<td>45%</td>
</tr>
</tbody>
</table>

Our general principle is that a customer should get a discount because the cash up front is beneficial to PostHog, as it allows us to invest more in building more products, faster. Pre-paid discounts must be paid up-front. We do not offer monthly or quarterly payment plans for discounted contracts. If a customer prefers quarterly or monthly payments, we can offer them a lower credit value, which will reduce their discount.

### Why we require up-front payment for credit purchases

We've found that split payment terms create friction for both teams – customers chasing internal approvals, us chasing invoices, nobody focused on delivering value. When customers pay quarterly or monthly, they often consume credits faster than they pay for them, effectively turning us into a line of credit. We are vendors, not lenders. Our focus is on [building the best product](/handbook/how-we-make-money), not managing accounts receivable. Up-front payments keep everyone focused on customer success and let us invest cash immediately into building features and support. If a customer needs payment flexibility, we're happy to adjust the credit amount and discount, per guidelines above, to fit their budget while maintaining up-front payment.

### Credit for case studies

We don't offer additional discounts in exchange for a case study, as paying for case studies can devalue them. We should be working to get our customers to a state of happiness such that they are willing to tell everyone how great PostHog is without needing to pay for it.

### Self-serve discounts

We also offer a way for customers to receive discounts on their usage without talking to sales or being on an Enterprise plan. In PostHog, if a customer meets certain criteria, they will see a banner on their billing page with a call-to-action (CTA) to "buy credits". The form they fill out will be auto-populated with an estimated number of credits based on their last 3 months of usage, but they can adjust this value as needed. They will have the option to pay with the card on file or to receive an invoice. Credits will be applied to their account once the invoice is paid.

Requirements for self-serve discounts:

-   3 or more paid invoices
-   Average of $280 or more across the last three invoices
-   No open invoices
-   Not currently on the up plan, a legacy plan, or having existing credits

Additional notes on self-serve discounts:

-   For credit purchases between $3,333 and $25,000, the discount is 10% off. Above $25,000 follows the standard volume discount structure above.
-   Instead of providing all credits upfront, we apply 1/12 of the credits each month for the next 12 months. These credits do not expire for 1 year after they've been applied.
-   If a customer uses all credits in a month, they will be billed for extra usage at the standard rate.

### Non-profit discounts

We do offer additional discounts to non-profits and  non-profit discounts at 15% regardless of spend.

If signing for a prepaid credit plan with a credit purchase between $25k and $80k, an additional 5% non-profit discount is applied. For example, purchasing $25k in credits with an additional 5% non-profit discount would result in a 25% discount. At a credit purchase of $80k or more, the standard discounts (outlined in the table above) take effect.

We use tax law in the country of origin to determine what is a not for profit entity. If a customer can provide proof they fit their country's definition, the discount is applicable subject to the guidance above.

When evaluating a discount, it’s important to <PrivateLink url="https://docs.google.com/spreadsheets/d/1ynNM9tbWsWki2Q0vhwCV0iYNtJ1NHz4eXtUvZDw_sjA/edit?usp=sharing">review our margin calculations</PrivateLink> to ensure we remain margin positive, especially for larger accounts.

To set up the non-profit discount in Stripe, [follow these instructions](/handbook/growth/sales/billing#coupons-and-discounts).

> Non-profit discounts only stack with prepaid discounts at a rate of 5%, and only if the credit purchase amount is less than $80,000.

### Legacy discounts

You might see some customers with a 30% discount on their monthly Stripe subscription. These were added when the only way we billed for PostHog was through event pricing. This was originally designed to offset the cost versus competitors who had unbundled Group Analytics or Data Pipelines. These customers will typically be on a higher per-event price plan, so we should look to get them migrated to standard pricing as soon as possible.

### Startup plan discounts

For customers on our [startup plan](/startups), we offer two months free credit when signing a prepaid deal. This encourages startups to use their credits to understand usage, and then commit to a longer term plan with PostHog. This offer is available until the first billing date after the credits expire. If a customer has used up their credits before the expiration date, they still have until the original expiration date to decide and claim the offer. The amount of free credits is determined by how much they purchase on a prepaid plan. By default, we work with customers on prepaid plans that will cover their usage for the next 12 months.

> Important clarification: operationally this is implemented as free credits applied before the contract start date, not as extra credits inside the contract term unless a specific dollar amount for the free credits is explicitly included under Special Terms.

You should follow the same [inbound sales process](https://posthog.com/handbook/growth/sales/new-sales) and work with the customer on understanding and optimizing their usage. Then follow these additional steps take to present the prepaid plan + free credits option(s):
1. Review the customer's average monthly cost
2. Estimate the prepaid equivalent for 12 months of coverage (e.g. [monthly cost x 12])
3. Inform them they can take advantage of this offer, which allows them to:
   - purchase credits equivalent to ~10 months of usage (expiring 10 months after the contract start date), and
   - receive ~2 months of additional usage for free, applied before the contract start date.
4. Check whether buying [monthly cost x 10] gives them a lower [discount rate](https://posthog.com/handbook/growth/sales/contract-rules#discounts)
5. If so, you should ALSO present the option to buy [monthly cost x12], and they'll receive [monthly cost x14] AND take advantage of the higher discount.
   - two months of this free usage should again be applied before the contract start date, unless explicitly priced and included under Special Terms.
7. If the customer wants to purchase fewer credits than either option above, then they will receive an additional 1/6 of the amount they wish to purchase for free.

All free credits associated with startup plan roll-offs are one-time only, and should be denoted in the special terms of the contract as "An additional, one-time credit (offered to customers in exchange for rolling off the Startup plan) in the amount of USD XXXXX will be applied upon contract start date with the same expiration date."

For contracting purposes, these free credits should either be applied before the contract term or included in the 12 month credit amount. If they are being applied before the contract term, adjust the contract date to start 2 months later and the one-time credits can be applied to cover the 2 invoices before the contract start date.

### Margin negative deals

In exceptional circumstances, we may explore providing additional discounts which eat into our operating margin for the following cases:

1. They are a strategic logo we'd like to land as a brand-new customer.
2. We are taking their business from a competitor.
3. We are preventing them from churning to a competitor.

If you believe you have a customer who falls into one of these categories and would like to provide additional credit/discount then in the first instance run through the opportunity details including margin calculation with Charles.  If he's happy that it's the right thing to do, then you also need to check with Raquel from a product support perspective.

## Additional credit purchase

As it's often difficult to right-size the credit needed for a longer term plan as a standard we offer to honor the discount provided in the original purchase for any additional credit purchased in the first half of a contract term (e.g. 6 months for an annual plan). Within the first 6 months given our billing usage reports we should be able to predict whether the customer is going to run out of credit or not. There are also alerts set up in #sales-alerts to help notify account owners about this.

## Price Guarantees & Lock-ins

Our default stance is to not offer price guarantees for the following reasons:

1. We regularly *lower* prices, which would result in higher costs for customers who've locked in a price
2. We occasionally split or restructure products (e.g. Data Pipelines unbundled), which makes guarantees administratively complex
3. Customers are in full control of their usage and can thus adjust their spending patterns as needed

This request most often comes from procurement teams unfamiliar with our pricing philosophy. Address it proactively in commercial discussions, but if there is push back, reference the above points. As an example:

> "We've dropped Events pricing [X]% over [timeframe]. A price guarantee would have cost you more. We're committed to being the cheapest at every scale—if we're not, tell us. Our prepaid credits for usage based pricing gives budget control without betting against our commitment to low prices."

## Multi-year credit allocation

### Paid up-front

We will allocate all the credit purchased to the Stripe account when the contract is signed. As above, they can purchase additional credit in the first half of the contract term and take advantage of the same discount as specified in the original contract.

### Paid yearly

We will allocate the credit for that year to the Stripe account when the contract is signed, and then again when subsequent annual invoices are raised.

If a customer wishes to use subsequent year's credit early they must agree to pay the invoice for that year early before the credit is transferred.

The additional credit purchase applies to each year separately, e.g. they can purchase additional credits at the same discount level in the first 6 months of each year.

You can see a signed multi-year contract set up in this way by navigating to Documents -> Examples (folder) inside of [PandaDoc](https://app.pandadoc.com).

## Uptime SLA

Customers only get an uptime SLA if:

1. They have subscribed to the Enterprise add-on; or
2. You agree it with them as a special term as part of their contract if they are spending $100k+ ARR post discount

An uptime SLA are not available to customers outside of these cases. You should certainly not agree to an SLA for customers on regular monthly contracts, and even for annual contracts it is not a given - it's one of multiple pieces you may have in play as you negotiate terms (much like a case study).

More details on how exactly the uptime SLA works can be found in our [terms](/terms).

## Payment method

For customers paying monthly, we only accept credit card payments, which will be taken automatically via Stripe at the end of their monthly billing period.

For customers purchasing credits upfront, bank transfer is the default and highly preferred payment method for the following reasons:

- For large payment amounts, the fees we incur are higher for credit card payments.
- Our Sales Ops automations are set up to handle bank transfer payments.

You should confirm ahead of the customer signing the order form that they are happy and set up to pay by bank transfer.  If they are absolutely unable to accommodate bank transfer we can accept credit card payments under the following conditions:

- We have a card on file which we can immediately charge for the full invoice amount.
- They pay immediately on the contract start date (i.e. no Net 30)

If your customer must pay via credit card, you absolutely _need_ to let Mine (Simon as backup) know ahead of the order form being signed as there is a lot of manual work needed up front to make this work.

> We absolutely do not allow payment by check.

## Contract buyouts

> **Want to speak to us about a contract buyout?** Get in touch with the Sales team via your shared Slack channel, or [reach out directly](/talk-to-a-human).

Sometimes customers will be locked into a contract with a competitor, but want to switch to PostHog when their contract is up. In this case, we are willing to let them use PostHog for free for up to 6 months. This is beneficial to PostHog as well, as we can get them set up and using PostHog sooner, capitalizing on the momentum of their interest today, and giving them more time to get comfortable with the platform.

Some rules:

-   They need to share a copy of their current contract/pricing/bank statement as proof.
-   They sign up to an annual contract worth $20k+/year, paid up front. Their PostHog contract starts when their current one expires.
-   Their usage in the overlap period needs to be proportionate to the contract they've signed, ie. if they sign a $50k contract and have 6 months to run, they get $25k of PostHog credit for free.
-   The competitor they're using has to be 'real', ie. not some random side project. As a general rule, anyone we have written a [comparison article](/blog/tags/comparisons) about counts.
-   We have final discretion on deciding who gets the deal.
-   We can still provide a standard free trial period of 2-4 weeks before they sign the contract, as they will likely need to figure out whether PostHog is right for them before committing.

> Normal commission rules apply here - commission is paid in the quarter in which the customer pays their invoice.

## New business renewal credits

If a customer is currently _not_ a paying user of PostHog, but is a user of one of [our competitors](/blog/tags/comparisons), about to renew, and is shopping for a better deal, we are willing to significantly undercut the quoted renewal price. This is because those customers are not that likely to move over to us anyway, and quoting them a lower price works out in our favour either way:

1. If the competitor matches our much lower offer, and the customer accepts, we've reduced their revenue by a significant amount
2. If the customer accepts, we've gained net new revenue we otherwise would have missed out on, and we have the opportunity to sell more.

In order for this to not mess up later renewals, the way we do this is by giving them credit for the first year in order to reach a total discount of 40%. For example, if the quote from the competitor is $50k, and the total cost for our product (including other discounts) is $40k, we will give them additional credits worth $10k, in order to undercut the total quote by 40%.

In order to qualify for this, the customer needs to send us the full quote document from the competitor.

## Credit over/under usage for contracts

### When they don't have enough credit to cover their term

We have CreditBot alerts set up in <PrivateLink url="https://posthog.slack.com/archives/C071PGWKBQS">#sales-alerts</PrivateLink> when a customer is going to run out of credit before their contract term ends, with the estimated runway remaining. The Vitally account owner (AE or CSM) will be tagged in this message. It's best to be proactive here so that the customer is right-sized well before the credit runs out:

-   If they will run out of credit or wish to buy more within the **first 6 months** of the contract term, they can still take advantage of their initial discount. You'll need to have them sign a new order form which adds the additional credit, and it should expire on the date of the original order form.
    -   Example: Their original order form was signed on 1st January with a 12-month term. Their expansion order form could be signed on 1st June with a 7-month term. Make sure the end date lines up with the end date of the original contract to avoid any issues with the billing server and ARR calculation.
-   If they will run out of credit with **less than 2 months** remaining on their initial term, as long as they sign a renewal order form to start at the end of the original contract term we will cover their usage for free until the renewal date, assuming the renewal order form is signed before they run out of credit and their new contract amount is equal to or greater than the current contract amount.
-   If they fall **in between** the two cases above (running out of credit with <6 months and >2 months to go) then we need them to sign a new 12 month (or longer) order form lined up with their monthly billing date. This makes ARR calculation slightly trickier as there are two overlapping contracts in play at the same time.
    -   Example: Their original order form was signed on 1st January with a 12-month term and they run out of credits in September. We need a new 12-month order form in place with a Contract Start Date of September 1st.

For any of the above scenarios you should use our [discounting principles](contract-rules#discounts) which apply to the spend.

> In scenario one above, if their expansion contract spend takes them over the threshold for additional discounts we should include this discount tier for them in the expansion contract. We won't issue a refund for the difference in spend when the expansion order form discount tier is greater than the discount tier of the original order form.

### When they will end the contract term with credit remaining

We can roll up to half the amount of credit from the original order form to a new contract term, provided that the customer signs a renewal contract of equal or higher spend than the original contract.

### When a customer doesn't renew their credit purchase
When a customer chooses not to renew a prepaid credit contract we automatically remove any remaining credits on the expiry date. Their account will then roll onto our standard monthly plan and they'll be charged for usage. It's the customer's responsibility to stop sending us events or cancel their subscription and downgrade to the free tier if they don't want to keep paying.

## Varying contractual terms

### When we vary terms

If a customer wants to vary either our standard template DPA, BAA, or MSA terms, it is a substantial effort for our legal team to review these suggested changes (also known as "redlines").

At a minimum, we will only do this for contracts above $20k a year, and we should expect even higher amounts of committed revenue if they are asking for big changes (e.g. changing significant provisions, adding Service Level Agreements, etc.). A customer needs to either be spending this amount at present, or agree to commit to this spend via an annual contract, in order to initiate legal review of suggested changes. We [evaluate all requested changes proportionally against their annual committed spend](/handbook/growth/sales/contract-rules#what-customers-should-expect) with PostHog. A customers annual committed spend needs to be defined before proceeding to a negotiation over legal terms, otherwise there is no frame of reference for the negotiation.

We also sometimes receive unsolicited requests to vary our terms. In these instances the legal team will redirect the customer to work with their PostHog contact person for this, as we will only review redlines for a managed customer or opportunity where the potential annual revenue is understood.

> See the guidance below if the customer asks to use their own contract instead of ours

### How customers should suggest requested terms

The customer should redline the current .docx version of the document in question. You can find the latest versions of the templates in the Team Internal Info tab in the #team-sales Slack channel (do not save versions locally).

> We don't accept redlines on our standard terms of service and if a customer has proposed this you should share the correct templates with them before involving legal.

Once they have returned the redlines to you first check to ensure that they have used the template which you provided, and then share the document for review in the #legal channel. There will usually be a few rounds of back and forth as we converge on an agreement. You will continue to represent PostHog's position to your customer throughout the negotiation. Please work with #legal on the appropriate responses and speak clearly to our customers.

### What customers should expect

PostHog evaluates legal risk assumed against annual revenue received. In other words, contractual terms will be varied in proportion to the customer's committed annual spend with PostHog.

To illustrate with examples:

-   A customer committing to spend just $20k USD annually should not expect significant deviations from PostHog's standard terms. Minor, clarifying edits will be acceptable. We will not spend our time going back and forth for this amount. We may respond to significant changes with a polite, "no," rather than negotiating, to communicate clearly.
-   A customer committing to spend $80k USD annually would be able to request slightly more sigificant deviations from PostHog's standard terms, and we will evaluate the suggested terms through the lens of legal risk assumed against annual revenue received. This will be a negotiation, and we will represent PostHog's position clearly as we go along.
-   A customer committing to spend $160k USD annually (or more) would be able request even more sigificant deviations from PostHog's standard terms, and we will evaluate the suggested terms through the lens of legal risk assumed against annual revenue received. This will be a negotiation, and we will represent PostHog's position clearly as we go along.

At any potential level of annual spend, PostHog will not proceed under unreasonable legal terms. Certain suggested terms may be non-starters for PostHog.

### Varying terms for trials and proofs of concept (POCs) for prospective customers

We don't vary PostHog's standard terms for trials and proofs of concepts (POCs) for prospective customers.

All prospective customers are welcome to try PostHog for free and under our standard terms (including our standard DPA and BAA, if applicable).

We don't negotiate terms for trials and POCs for three reasons:

1. Unlike many of our competitors, an annual subscription is not required to access PostHog, so a negotiated agreement is not necessary to use our services. Our product-led motion is designed to support customers trying PostHog.
2. When [evaluating custom legal terms](/handbook/growth/sales/contract-rules#what-customers-should-expect), PostHog evaluates legal risk assumed against annual revenue received.
3. Because prospective customers are paying us $0 for a free, sales-led trial or POC, there is no frame of reference for us to evaluate any potential custom terms. Spending our time and legal resources negotiating these terms is premature when a prospective customer doesn't know that they want to proceed with PostHog at all, much more at a qualifying level of annual usage.

Once the trial concludes, and [per our guidance on varying terms](/handbook/growth/sales/contract-rules#varying-contractual-terms), we will be happy to evaluate custom legal terms for an otherwise qualified PostHog customer.

## Using non-PostHog contracts

If a customer requests to use a non-PostHog drafted contract for documents such as a DPA, MSA, Order Form, or BAA, we generally decline, except in special circumstances (see ['When we vary terms for customers'](/handbook/growth/sales/contract-rules#when-we-vary-terms)). We avoid doing this as it adds too much risk for us, and also because reviewing and negotiating non-standard terms introduces significant operational inefficiencies and doesn't scale well as we continue to grow. We typically do not even consider using customer paper unless the deal is over $200k annually or involves an extremely blue-chip company. It is best to manage this expectation early and just avoid entertaining the idea with customers as soon as possible.

We are somewhat more flexible when it comes to NDAs. That said, since we contract through our U.S. entity, we require customer NDAs to be governed by U.S. law. This is necessary to maintain consistency and ensure we’re not taking on legal or operational risk in jurisdictions where we don’t operate or fully understand the legal landscape. This is mainly about ensuring we can review and manage agreements efficiently with our limited legal resources.
