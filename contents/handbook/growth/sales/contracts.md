---
title: Contracts
sidebar: Handbook
showTitle: true
---

# Annual plans and more

For customers who want to sign up for an annual (or longer) plan there is some additional paperwork needed to capture their contractual commitment to a minimum term, and likely custom pricing as well. At a minimum, they should sign an Order Form which references our standard [terms](/terms) and [privacy notice](/privacy). In addition, they may want a custom Master Services Agreement (MSA) or Data Processing Agreement (DPA).

> If a customer wants to vary either our DPA, BAA, or MSA terms, it is a substantial effort for our legal team to review these changes.  At a minimum, we should only do this for contracts above $20k a year, and even higher if they are asking for big changes (e.g. adding a Service Level Agreements). The minimum is $100k to bring your own contract instead of our template - see 'Non PostHog Contracts' below.

In addition, customers requiring our Enterprise plan need to sign up for a minimum of $20k of PostHog Cloud Credit for a year, as well as adding the Teams plan to their subscription.

If you are discussing any annual plan that deviates from our standard terms, such as a plan with monthly payments or other custom terms, please consult with Simon and Mine beforehand. This is to ensure we have the capacity and resources to support the proposed terms.

Payments for annual plans are via Bank Transfer only (no checks).

### What about monthly customers?

Anyone on a monthly plan simply agrees to our [Terms](/terms) and [Privacy Policy](/privacy) when they sign up.

## Pricing calculator

While we have a transparent pricing available, you'll need to use our [pricing calculator](https://docs.google.com/spreadsheets/d/1ynNM9tbWsWki2Q0vhwCV0iYNtJ1NHz4eXtUvZDw_sjA/edit?usp=sharing) (internal only) for customers with very high volumes or bespoke needs.

## Discounts

Although our standard monthly [pricing](/pricing) has volume discounts built in, it's common practise when negotiating software contracts for the customer (and their procurement team) to ask for a discount.  We can be super transparent about the levers we have in discounting PostHog:

1. In our consumption-based pricing model, the easiest way to reduce spend is to ensure that the customer is only sending data to us which is valuable to them.  There is [different guidance here](/docs/billing/estimating-usage-costs) depending on which product(s) they are looking at.
2. **Annual Plan:** We offer a 20% discount on an annual paid-up-front plan, because it's beneficial to PostHog to have a customer committed for a year.
3. **Higher Spend:** We offer an additional 5% and then 15% on top of the annual plans when the customer spends above $60k and $100k respectively.
4. **Multi-year:** We offer an additional 5% for each additional year of commitment, as longer commitments are beneficial to PostHog.
5. **Up-front payment:** We offer an additional 3% where a *multi-year* contract is all **paid up-front**, as it's better for PostHog to have the money in the bank.

> We don't offer a discount for signing a contract by some fixed date (e.g so the deal closes in a specific quarter).

The below table summarizes the discount levels contained in points 2-4:

| Minimum Spend | 1 Year        | 2 Year         | 3 Year        |
|---------------|---------------|----------------|---------------|
| $20,000 | 20%  | 25% | 30%  |
| $60,000 | 25%  | 30%   | 35%           |
| $100,000 | 35%           | 40%            | 45%           |

Also note that the minimum amounts here are _after_ discounts e.g. they will need to purchase a minimum of $25k of credit to get a discount of 20% and contract for $20k.  The table below will help you with the list price required to enable each discount.

| Segment  | 1 Year   | 2 Year   | 3 Year   |
|----------|----------|----------|----------|
| $20,000  | $25,000  | $26,666  | $28,572  |
| $60,000  | $80,000  | $85,715  | $92,308  |
| $100,000 | $153,847 | $166,667 | $181,819 |

If a customer has an annual plan but doesn't _pay_ the whole year up front, we usually halve the discount. Our general principle is that a customer should get a discount because the cash up front is beneficial to PostHog, as it allows us to invest more in building more products, faster.

> It's worth being aware that fast growing startups, even if they have the budget to pay annually, will probably prefer to pay quarterly or even monthly as flexibility may be a priority for them over saving 20%.

Occasionally, customers may ask for a discount in return for a case study:
1. Don't proactively offer this as we have been successful in getting case studies from happy paying customers without additional discounts.
2. If a customer offers, first check with [Joe](/community/profiles/29070) as to whether he'd like one from this customer.
3. If yes, we can add an additional 5% discount in the Order Form, and a Special Term that they will work with us to publish a case study in the first 3 months of the contract. If no, do not push this through anyway - a case study needs to be actually useful to us. 

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

We do offer additional discounts to nonprofits - these are entirely at your discretion, depending on the margin of the particular product(s) you are selling. We no longer offer a straight X% across all products, as they all have slightly different pricing.

## Payment method

Our strong preference is for customers to pay by credit card, as this is easier to manage in Stripe and has a lower risk of the customer forgetting to make the payment (which means we have to spend more time chasing).

If a customer wants to pay by ACH or bank transfer, we will usually only consider this if they are paying for 1 year or more up front. This is more likely to be the case for very large customers.

## Contract buyouts

Sometimes customers will be locked into a contract with a competitor, but want to switch to PostHog when their contract is up. In this case, we are willing to let them use PostHog for free for up to 6 months. This is beneficial to PostHog as well, as we can get them set up and using PostHog sooner, capitalizing on the momentum of their interest today, and giving them more time to get comfortable with the platform.

Some rules:

* They need to share a copy of their current contract/pricing/bank statement as proof.
* They sign up to an annual contract worth $20k+/year, paid up front. Their PostHog contract starts when their current one expires. 
* Their usage in the overlap period needs to be proportionate to the contract they've signed, ie. if they sign a $50k contract and have 6 months to run, they get $25k of PostHog credit for free.
* The competitor they're using has to be 'real', ie. not some random side project. As a general rule, anyone we have written a [comparison article](/blog/tags/comparisons) about counts.
* We have final discretion on deciding who gets the deal.

> Normal commission rules apply here - commission is paid in the quarter in which the customer pay their annual invoice.

## Order Form

An Order Form is a lightweight document that captures the customer details, credit amount, discount, term, and signatures from both
PostHog and the Customer.  They are either governed by our standard terms or a custom MSA (see below).

You will likely need to use the [Pricing Calculator](https://docs.google.com/spreadsheets/d/1QsDV2ECtMwM9IfC_D7Embmpu7K7q6qbq60t8ARglQaI/edit#gid=358353731) to get the correct credit amount to be included in the order form.

### Creating an Order Form

We use [PandaDoc](https://app.pandadoc.com/a/#/) to handle document generation, routing and signature.  Ask Cameron or Simon for access if you don't have it.

1. The [order form template](https://app.pandadoc.com/a/#/templates/87jsEEeg8rvYYri9Y8gK5B) to use is titled `[Client.Company] PostHog Cloud Order Form - <MMM YYYY>`
2. When looking at the template, click the link to **Use this template** in the top bar.
3. In the Add recipients box which pops up:
    1. Replace `<MMM YYYY>` with the month and year the contract starts (e.g. March 2023)
    2. Add the Client email, first and last name
    3. Add the PostHog Signer email - normally Cameron or Simon
    4. Click continue
4. In the pricing table, set the total amount of credit in the Amount box next to **PostHog Cloud Credit**
5. At the bottom of the pricing table, set the **Discount %** just above the Total
6. On the right of the screen there is a sidebar, select the **Variables** tab and populate them as follows:
    * **Client Address Information** - Needs to be their legal correspondence address (check with your customer contact)
    * **Client.Company** - The legal company name
    * **Contract.Discount** - The discount % (appears in the Additional credit purchase section)
    * **Contract.EffectiveDate**
        - Set the start date of the contract in the format DD MMM YYYY (e.g., 01 Feb 2023). For a new customer, this would be the date they choose to start their subscription. For an existing customer, we have two options:
            - **Immediate Activation:** If the customer wishes to start using the credits immediately, set the start date to the beginning of their current billing period. This backdating ensures that the credits are applied correctly to the current billing cycle.
            - **Next Billing Cycle:** If the customer prefers to begin their annual plan at the start of their next billing cycle, set the start date accordingly. This option aligns the contract start date with the upcoming billing period.
            - For example, let’s say it’s October 15 and you’re setting up an annual plan. You have a pay-as-you-go subscription that started on September 1, and the next billing date is November 1.
                - If a customer wants to start using credits immediately for the October cycle, your contract start date should be October 1.
                - If a customer wants to start using credits starting the next billing cycle, your contract start date should be November 1.
                - If you set the start date correctly, our Zapier automation flow will create the invoices with correct dates so our revenue calculations are not affected from the transition.
        - **Note:** Pay-as-you-go products are charged after the end of the period, while flat-rate subscriptions are charged at the beginning of the period. As a result the first two payments on a monthly schedule may occur within the same billing period as part of the transition. Make sure to send a note to the customer to ensure they're fully informed!

    * **Contract.Term** - The term in months of the contract (12 months by default)
7. If an MSA is being used rather than the standard terms you will need to replace the following text:
   > PostHog Cloud License Terms appearing at: https://www.posthog.com/terms and Privacy Policy appearing at: /privacy (collectively the “Agreement”)

   with

   > PostHog Cloud License Terms executed by and between PostHog, Inc. and CUSTOMER LEGAL NAME (the “Agreement”)

8. You should link the order form to the opportunity record in Salesforce using the `Contract Link` field in the "Opportunity Closure Details" so that we have a reference to the completed paperwork from our CRM.

### Routing an Order Form for review and signature

1. When viewing the order form, check the recipients tab in the sidebar.  The Client and PostHog roles should be filled in.
2. A signing order should also be set, with the Client signing first (so they can review it before we sign).
3. Ensure Document forwarding and Signature forwarding are set to on so that our Contact can re-assign the document if needed.
4. Click Send at the top of the document and add a message explaining the context of the order form.
5. Once the Client and then PostHog have signed it you should get an email to confirm completion.
6. Don't forget to link to an opportunity in Salesforce and mark the associated opportunity as Closed Won.
7. Zapier will [automatically add](https://zapier.com/editor/217375860) a record in the [Annual Plan Table](https://tables.zapier.com/app/tables/t/01HGX2N9JXNV2EEDYARD24901R) with the PandaDoc Order Form ID.
8. Celebrate!


### Manual upload of signed Order Form

We prefer to keep all signatures in PandaDoc, but sometimes clients may prefer to sign a PDF copy. One way to minimize this is to send contracts for initial review via PandaDoc when possible. It is ok to have multiple drafts in PandaDoc as long as we have the final signed copy in there as well. When a client signs an order form outside of PandaDoc, please follow these steps to complete the process:

1. If you have previously created a draft, find the document in PandaDoc.
    - Select "Change Status" from the three-dot menu on the right.
    - Upload the signed PDF of the document.
    - Mark the status as completed.
    - Check Audit Trail to make sure the signed version is uploaded correctly.
    - Link to an opportunity in Salesforce and close the associated opportunity as Closed Won.
2. If no draft exists, upload the signed document directly ad a new document in PandaDoc.
    - Mark the status as completed.
    - Link to an opportunity in Salesforce and close the associated opportunity as Closed Won.

Once you the signed form in PandaDoc is marked as complete and the Salesforce opportunity status is set to Closed Won, the RevOps team will get a notification and handle setting up the subscription and invoicing. See the [Billing](/handbook/growth/sales/billing) page for steps on how the billing setup works for more information.


## Master Services Agreement (MSA)

Occasionally, customers will want to sign an MSA instead of referencing our terms in an order form.  We don't have this templated in PandaDoc yet as it's so infrequent.

1. Download a copy of the [PostHog Cloud MSA](https://docs.google.com/document/d/155w70ZAHecVZcDqTq2_415dvaq2Bk-8QlEOozjq1hG8/edit#heading=h.y38xfjgcg4xm) as a Word Document (legal teams prefer this format) and share it with your Customer contact.
2. They may want to propose changes (also known as 'redlines').  Work with Fraser to get these agreed.
3. Create a new document in PandaDoc, you can choose to either import from Google Drive or upload from your local machine.  This should be the clean, non-redlined document as agreed by both parties.
4. Change the name to be `PostHog Cloud MSA - CUSTOMER LEGAL NAME`.
5. Add the Client and PostHog (fraser@posthog.com) as roles.
6. Add a Signature, Name and Title field for both PostHog and the Customer.
7. Check the signing order (Client, then PostHog normally).
8. Send for signature.

Sometimes large customers will ask for changes to our MSA. We have a list of the kinds of changes we will/won't consider in a private repo [here](https://github.com/PostHog/company-internal/blob/master/finance/sales%20contract%20changes) that you can generally agree to without the Ops team reviewing. However, if you are ever in doubt, ask Fraser. 

## Business Associate Agreement (BAA)

We offer HIPAA Compliance on PostHog Cloud and as such health companies will require us to sign a Business Associate Agreement with them. As this means we take on increased financial risk in case of a breach we ask them as a minimum to subscribe to the Teams plan which is a guaranteed monthly payment. A maximum of one BAA per organization will be signed. Under most circumstances, it should be the company that owns the org/pays us.

1. Ask the customer to subscribe to the Teams plan (as well as any other paid plans they wish to use).
2. Create a new document from the [PandaDoc Template](https://app.pandadoc.com/a/#/templates/4psCXzU527sNE6WEbFBg3a).
3. All you need to do it set the `Client.Company` variable and then send it to them for review and signature.
4. Once the client has signed it then it will get routed to Fraser for countersignature.
5. You'll get a notification when everybody has signed it - _don't forget to update the *HIPAA BAA Signed Date* property on the customer's Salesforce Accountrecord,_ so we can keep track of who we have signed a BAA with.

> We only provide our default BAA for Teams plan subscribers - customization requires >$20k annual spend. The BAA only remains active for as long as the customer is subscribed to Teams - if they unsubscribe, we send them a message that their BAA will become inactive at the end of the month in which they cancelled. A customer who is on a Teams trial (with a credit card in PostHog) is eligible to sign a default BAA, but you should make it clear to them that the default BAA will be voided if/when the Teams subscription lapses. If the lead is not sure whether they will need a custom BAA and their usage wouldn't put them at $20K, then it is worth pushing them to get legal feedback by sending them our BAA before moving forward, else you risk spending a lot of time on an evaluation that ends up at $450/month.

## Non-PostHog contracts

If a customer requests to use a non-PostHog drafted contract for DPA, MSA, Order Form, or BAA generally we avoid doing this as it adds too much risk for us. We usually would not even consider this for deals not above $100k or for extremely blue chip companies. It is best to manage this expectation early and just avoid entertaining the idea with customers as soon as possible. An exception to this rule is for NDAs - these are usually fine. 
